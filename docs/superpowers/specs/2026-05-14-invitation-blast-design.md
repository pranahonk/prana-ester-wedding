# Wedding Invitation Blast — Design Spec

**Date:** 2026-05-14
**Status:** Approved

## Overview

A GitHub Actions workflow that reads the wedding guest list from Google Sheets, sends each guest a personalized WhatsApp invitation via Fonnte, and marks them as sent in the sheet. Default trigger is manual (`workflow_dispatch`) with a dry-run safety flag.

---

## Architecture

```
Google Sheet (guest list)
  └── Phone column (added manually)
  └── RSVP Sent column (existing, used as send-tracking flag)
        │
        ▼
GitHub Actions (workflow_dispatch)
  └── scripts/blast.js (Node.js)
        │  1. Auth → Google Sheets API (service account)
        │  2. Read rows where Phone set + RSVP Sent = FALSE
        │  3. Filter by group input (all / red / yellow / green)
        │  4. For each guest:
        │       a. Build personalized message + link
        │       b. POST to Fonnte API
        │       c. Mark RSVP Sent = TRUE in sheet
        │       d. Wait 1 second
        │  5. Print summary (sent / skipped / failed)
        ▼
Fonnte (free tier)
  └── Sends from user's own WhatsApp number (QR-connected)
        ▼
Guest's WhatsApp
```

---

## Google Sheet Changes

Add one `Phone` column to the existing guest sheet, between `Description` and `RSVP Sent`:

| Name | Status | Importance | Description | Pax | Phone | RSVP Sent | Gift Received |
|---|---|---|---|---|---|---|---|
| Billy Gunawan | GMS | Green | Possibly attended | 1 | +6285777224040 | FALSE | FALSE |

- Phone numbers in international format: `+62...`
- `RSVP Sent = FALSE` = not yet sent; script sets it to `TRUE` after sending
- Rows with empty `Phone` are skipped with a warning

The sheet has two guest tabs (Prana's and Ester's). The script reads both tabs.

---

## Fonnte Setup (one-time)

1. Register at fonnte.com (free)
2. Add Device → scan QR with your WhatsApp number
3. Copy the API token from the Fonnte dashboard
4. Add to GitHub repo → Settings → Secrets → Actions:
   - `FONNTE_TOKEN` — Fonnte API token
   - `GOOGLE_SHEETS_CREDS` — Google service account JSON (base64-encoded)
   - `SPREADSHEET_ID` — Google Sheet ID (`1SpL2nR1lEyveiOsNA4Ow9M8JQqX43cHXyTGnyjbZCx8`)

**Free plan:** Unlimited messages, 1 device, messages sent from your own number.

---

## GitHub Actions Workflow

**File:** `.github/workflows/blast-invitations.yml`

```yaml
on:
  workflow_dispatch:
    inputs:
      group:
        description: 'Guest group to send to'
        required: true
        default: 'all'
        type: choice
        options: [all, red, yellow, green]
      dry_run:
        description: 'Dry run — print messages but do not send'
        type: boolean
        default: true
```

- `dry_run: true` is the default — must explicitly uncheck to send real messages
- Job runs `node scripts/blast.js` with inputs as environment variables
- Node.js 20, packages: `googleapis` and `node-fetch` only

---

## Blast Script (`scripts/blast.js`)

### Inputs (env vars set by workflow)

| Var | Source |
|---|---|
| `FONNTE_TOKEN` | GitHub Secret |
| `GOOGLE_SHEETS_CREDS` | GitHub Secret (base64 service account JSON) |
| `SPREADSHEET_ID` | GitHub Secret |
| `GROUP` | workflow input |
| `DRY_RUN` | workflow input |

### Sheet columns expected

`Name`, `Status`, `Importance`, `Description`, `Pax`, `Phone`, `RSVP Sent`, `Gift Received`

The script reads the header row to find column positions dynamically — column order changes won't break it.

### Guest tab names

- `Prana` — Prana's guest tab
- `Ester` — Ester's guest tab

Tab names must match exactly.

### Honorific logic

| Name prefix | Honorific in greeting |
|---|---|
| `Pak` / `Bapak` | Pak |
| `Bu` / `Ibu` | Bu |
| `Ko` | Ko |
| `Ci` | Ci |
| `Kak` / `Kakak` | Kak |
| `Mas` | Mas |
| `Mbak` / `Mba` | Mbak |
| `Om` | Om |
| `Tante` | Tante |
| _(no prefix)_ | first name only |

### Message template

```
Halo {honorific} {firstName}! 👋

Kami, Prana & Ester, dengan penuh sukacita mengundang {honorific} {firstName}
ke hari istimewa kami. 🎊

📅 Sabtu, 30 Mei 2026
📍 GMS Kelapa Gading, Jakarta

Lihat undangan lengkapnya di sini:
👉 https://pranaester.com/?to={encodedName}

Mohon konfirmasi kehadiran melalui link di atas.
Kami sangat berharap dapat merayakannya bersama {honorific} {firstName}! 🙏

– Prana & Ester
```

`{encodedName}` = guest's `Name` field URL-encoded (spaces → `+`).

### Fonnte API call

```
POST https://api.fonnte.com/send
Authorization: {FONNTE_TOKEN}
Body (JSON): { target: "+62...", message: "...", countryCode: "62" }
```

### Send loop behavior

- 1-second delay between each message
- On HTTP error or non-200: log failure, continue to next guest
- After loop: print `✅ Sent: N | ⏭ Skipped: N | ❌ Failed: N`
- Exit code 1 if any message failed (marks GitHub Actions run as failed)

### RSVP Sent update

After a successful send, script calls Sheets API to set that guest's `RSVP Sent` cell to `TRUE`. Does NOT update on dry run or failed send.

---

## File Structure

```
prana-ester-wedding/
  .github/
    workflows/
      blast-invitations.yml
  scripts/
    blast.js
  package.json          ← add googleapis, node-fetch
```

No changes to the Next.js app.

---

## Out of Scope

- Email sending
- Automated scheduling (cron) — always manual trigger
- RSVP response collection (handled by the existing website)
- Re-sending to guests already marked `RSVP Sent = TRUE` (must manually reset the flag)
