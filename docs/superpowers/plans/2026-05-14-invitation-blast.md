# Invitation Blast Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A GitHub Actions workflow that reads the `Prana` guest tab, sends each guest a personalized WhatsApp invitation via Fonnte, and marks `RSVP Sent = TRUE` in the sheet.

**Architecture:** A standalone Node.js script in `scripts/` (completely separate from the Next.js app) split into three pure-logic modules (`honorific.js`, `sheets.js`, `fonnte.js`) and a main entry point (`blast.js`). Tested with Node's built-in `node:test` — no extra test dependencies. GitHub Actions runs the script manually via `workflow_dispatch`.

**Tech Stack:** Node.js 20 (ESM), `googleapis` v144, `node-fetch` v3, `node:test` (built-in), Google Sheets API v4, Fonnte REST API.

---

## File Map

| File | Purpose |
|---|---|
| `scripts/package.json` | Isolated deps for blast script — does NOT affect Next.js |
| `scripts/lib/honorific.js` | `extractHonorific(name)`, `buildMessage(name)` — pure functions |
| `scripts/lib/sheets.js` | `getGuests(auth, id, group)`, `markSent(auth, id, rowIndex)`, `findColumn(headers, name)`, `parseGuests(headers, rows)`, `filterByGroup(guests, group)` |
| `scripts/lib/fonnte.js` | `sendWhatsApp(token, phone, message, dryRun)` |
| `scripts/blast.js` | Entry point — wires all three modules, prints summary |
| `scripts/test/honorific.test.js` | Tests for honorific parser + message builder |
| `scripts/test/sheets.test.js` | Tests for guest parsing and group filtering |
| `scripts/test/fonnte.test.js` | Tests for dry-run guard and request shape |
| `.github/workflows/blast-invitations.yml` | Manual workflow with dry_run + group inputs |

---

## Task 1: scripts/ skeleton + package.json

**Files:**
- Create: `scripts/package.json`
- Create: `scripts/lib/honorific.js`
- Create: `scripts/lib/sheets.js`
- Create: `scripts/lib/fonnte.js`
- Create: `scripts/blast.js`

- [ ] **Step 1: Create `scripts/package.json`**

```json
{
  "name": "prana-ester-blast",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test test/*.test.js",
    "blast": "node blast.js"
  },
  "dependencies": {
    "googleapis": "^144.0.0",
    "node-fetch": "^3.3.2"
  }
}
```

- [ ] **Step 2: Create empty module stubs**

`scripts/lib/honorific.js`:
```js
export function extractHonorific(name) {}
export function buildMessage(name) {}
```

`scripts/lib/sheets.js`:
```js
export function findColumn(headers, name) {}
export function parseGuests(headers, rows) {}
export function filterByGroup(guests, group) {}
export async function getGuests(auth, spreadsheetId, group) {}
export async function markSent(auth, spreadsheetId, rowIndex) {}
```

`scripts/lib/fonnte.js`:
```js
export async function sendWhatsApp(token, phone, message, dryRun) {}
```

`scripts/blast.js`:
```js
// entry point — implemented in Task 5
```

- [ ] **Step 3: Install dependencies**

```bash
cd scripts && npm install
```

Expected: `node_modules/` created with `googleapis` and `node-fetch`.

- [ ] **Step 4: Commit**

```bash
git add scripts/
git commit -m "feat: scaffold scripts/ directory for invitation blast"
```

---

## Task 2: Honorific parser and message builder

**Files:**
- Create: `scripts/test/honorific.test.js`
- Modify: `scripts/lib/honorific.js`

- [ ] **Step 1: Create failing tests**

Create `scripts/test/honorific.test.js`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractHonorific, buildMessage } from '../lib/honorific.js';

test('extracts Ko prefix', () => {
  const r = extractHonorific('Ko Randy CG');
  assert.equal(r.honorific, 'Ko');
  assert.equal(r.firstName, 'Randy');
});

test('extracts Bu prefix', () => {
  const r = extractHonorific('Bu Maria');
  assert.equal(r.honorific, 'Bu');
  assert.equal(r.firstName, 'Maria');
});

test('extracts Pak prefix', () => {
  const r = extractHonorific('Pak Miko Raharja');
  assert.equal(r.honorific, 'Pak');
  assert.equal(r.firstName, 'Miko');
});

test('extracts Mas prefix', () => {
  const r = extractHonorific('Mas Deni');
  assert.equal(r.honorific, 'Mas');
  assert.equal(r.firstName, 'Deni');
});

test('extracts Mbak prefix', () => {
  const r = extractHonorific('Mbak Siti');
  assert.equal(r.honorific, 'Mbak');
  assert.equal(r.firstName, 'Siti');
});

test('extracts Ci prefix', () => {
  const r = extractHonorific('Ci Lina');
  assert.equal(r.honorific, 'Ci');
  assert.equal(r.firstName, 'Lina');
});

test('extracts Kak prefix', () => {
  const r = extractHonorific('Kak Septy');
  assert.equal(r.honorific, 'Kak');
  assert.equal(r.firstName, 'Septy');
});

test('extracts Om prefix', () => {
  const r = extractHonorific('Om Teguh');
  assert.equal(r.honorific, 'Om');
  assert.equal(r.firstName, 'Teguh');
});

test('extracts Tante prefix', () => {
  const r = extractHonorific('Tante Cahaya');
  assert.equal(r.honorific, 'Tante');
  assert.equal(r.firstName, 'Cahaya');
});

test('no prefix returns empty honorific and first word as firstName', () => {
  const r = extractHonorific('Billy Gunawan');
  assert.equal(r.honorific, '');
  assert.equal(r.firstName, 'Billy');
});

test('single word name with no prefix', () => {
  const r = extractHonorific('Friska');
  assert.equal(r.honorific, '');
  assert.equal(r.firstName, 'Friska');
});

test('buildMessage contains personalized link', () => {
  const msg = buildMessage('Billy Gunawan');
  assert.ok(msg.includes('pranaester.com/?to=Billy+Gunawan'), 'link missing');
});

test('buildMessage with Ko honorific uses Ko in greeting', () => {
  const msg = buildMessage('Ko Randy');
  assert.ok(msg.includes('Halo Ko Randy'), 'greeting missing');
  assert.ok(msg.includes('pranaester.com/?to=Ko+Randy'), 'link missing');
});

test('buildMessage with no honorific uses first name', () => {
  const msg = buildMessage('Billy Gunawan');
  assert.ok(msg.includes('Halo Billy'), 'greeting missing');
});
```

- [ ] **Step 2: Run tests — verify they all fail**

```bash
cd scripts && node --test test/honorific.test.js
```

Expected: all 14 tests fail with `is not a function` or assertion errors.

- [ ] **Step 3: Implement `extractHonorific` and `buildMessage`**

Replace `scripts/lib/honorific.js`:

```js
const PREFIXES = [
  'Bapak', 'Pak', 'Ibu', 'Bu', 'Mbak', 'Mba', 'Mas',
  'Tante', 'Kakak', 'Kak', 'Ko', 'Ci', 'Om',
];

export function extractHonorific(name) {
  const trimmed = name.trim();
  for (const prefix of PREFIXES) {
    const pattern = new RegExp(`^${prefix}\\s+`, 'i');
    if (pattern.test(trimmed)) {
      const rest = trimmed.slice(prefix.length).trim();
      const firstName = rest.split(/\s+/)[0];
      return { honorific: prefix, firstName };
    }
  }
  const firstName = trimmed.split(/\s+/)[0];
  return { honorific: '', firstName };
}

export function buildMessage(name) {
  const { honorific, firstName } = extractHonorific(name);
  const greeting = honorific ? `${honorific} ${firstName}` : firstName;
  const encodedName = name.trim().replace(/\s+/g, '+');
  return [
    `Halo ${greeting}! 👋`,
    '',
    `Kami, Prana & Ester, dengan penuh sukacita mengundang ${greeting}`,
    `ke hari istimewa kami. 🎊`,
    '',
    `📅 Sabtu, 30 Mei 2026`,
    `📍 GMS Kelapa Gading, Jakarta`,
    '',
    `Lihat undangan lengkapnya di sini:`,
    `👉 https://pranaester.com/?to=${encodedName}`,
    '',
    `Mohon konfirmasi kehadiran melalui link di atas.`,
    `Kami sangat berharap dapat merayakannya bersama ${greeting}! 🙏`,
    '',
    `– Prana & Ester`,
  ].join('\n');
}
```

- [ ] **Step 4: Run tests — verify all pass**

```bash
cd scripts && node --test test/honorific.test.js
```

Expected: `14 pass, 0 fail`.

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/honorific.js scripts/test/honorific.test.js
git commit -m "feat: honorific parser and message builder with tests"
```

---

## Task 3: Google Sheets reader

**Files:**
- Create: `scripts/test/sheets.test.js`
- Modify: `scripts/lib/sheets.js`

- [ ] **Step 1: Create failing tests**

Create `scripts/test/sheets.test.js`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findColumn, parseGuests, filterByGroup } from '../lib/sheets.js';

test('findColumn finds exact match', () => {
  const headers = ['Name', 'Phone', 'RSVP Sent'];
  assert.equal(findColumn(headers, 'Phone'), 1);
});

test('findColumn is case-insensitive', () => {
  const headers = ['name', 'phone', 'rsvp sent'];
  assert.equal(findColumn(headers, 'RSVP Sent'), 2);
});

test('findColumn throws when column missing', () => {
  const headers = ['Name', 'Phone'];
  assert.throws(() => findColumn(headers, 'Importance'), /not found/);
});

test('parseGuests skips rows with empty Name', () => {
  const headers = ['Name', 'Importance', 'Phone', 'RSVP Sent'];
  const rows = [
    ['Billy Gunawan', 'Green', '+6285777224040', 'FALSE'],
    ['', 'Green', '+628111', 'FALSE'],
  ];
  const guests = parseGuests(headers, rows);
  assert.equal(guests.length, 1);
  assert.equal(guests[0].name, 'Billy Gunawan');
});

test('parseGuests skips rows with empty Phone', () => {
  const headers = ['Name', 'Importance', 'Phone', 'RSVP Sent'];
  const rows = [
    ['Billy Gunawan', 'Green', '', 'FALSE'],
    ['Ko Randy', 'Yellow', '+6281234567890', 'FALSE'],
  ];
  const guests = parseGuests(headers, rows);
  assert.equal(guests.length, 1);
  assert.equal(guests[0].name, 'Ko Randy');
});

test('parseGuests skips rows where RSVP Sent is TRUE', () => {
  const headers = ['Name', 'Importance', 'Phone', 'RSVP Sent'];
  const rows = [
    ['Billy Gunawan', 'Green', '+6285777224040', 'TRUE'],
    ['Ko Randy', 'Yellow', '+6281234567890', 'FALSE'],
  ];
  const guests = parseGuests(headers, rows);
  assert.equal(guests.length, 1);
  assert.equal(guests[0].name, 'Ko Randy');
});

test('parseGuests includes correct rowIndex (1-based, header = row 1)', () => {
  const headers = ['Name', 'Importance', 'Phone', 'RSVP Sent'];
  const rows = [
    ['Billy Gunawan', 'Green', '+6285777224040', 'FALSE'],
  ];
  const guests = parseGuests(headers, rows);
  assert.equal(guests[0].rowIndex, 2);
});

test('filterByGroup all returns all guests', () => {
  const guests = [
    { name: 'A', importance: 'Red' },
    { name: 'B', importance: 'Green' },
  ];
  assert.equal(filterByGroup(guests, 'all').length, 2);
});

test('filterByGroup red returns only Red guests', () => {
  const guests = [
    { name: 'A', importance: 'Red' },
    { name: 'B', importance: 'Green' },
    { name: 'C', importance: 'Red' },
  ];
  const result = filterByGroup(guests, 'red');
  assert.equal(result.length, 2);
  assert.ok(result.every(g => g.importance === 'Red'));
});
```

- [ ] **Step 2: Run tests — verify they all fail**

```bash
cd scripts && node --test test/sheets.test.js
```

Expected: all 9 tests fail.

- [ ] **Step 3: Implement sheets.js**

Replace `scripts/lib/sheets.js`:

```js
import { google } from 'googleapis';

const SHEET_TAB = 'Prana';

export function findColumn(headers, name) {
  const idx = headers.findIndex(h => h.trim().toLowerCase() === name.toLowerCase());
  if (idx === -1) throw new Error(`Column "${name}" not found in sheet headers`);
  return idx;
}

export function parseGuests(headers, rows) {
  const nameCol       = findColumn(headers, 'Name');
  const importanceCol = findColumn(headers, 'Importance');
  const phoneCol      = findColumn(headers, 'Phone');
  const rsvpCol       = findColumn(headers, 'RSVP Sent');

  return rows
    .map((row, i) => ({
      name:       (row[nameCol]       || '').trim(),
      importance: (row[importanceCol] || '').trim(),
      phone:      (row[phoneCol]      || '').trim(),
      rsvpSent:   (row[rsvpCol]       || '').trim().toUpperCase() === 'TRUE',
      rowIndex:   i + 2, // header = row 1, first data row = row 2
    }))
    .filter(g => g.name && g.phone && !g.rsvpSent);
}

export function filterByGroup(guests, group) {
  if (group === 'all') return guests;
  const target = group.charAt(0).toUpperCase() + group.slice(1);
  return guests.filter(g => g.importance === target);
}

export async function getGuests(auth, spreadsheetId, group) {
  const sheets = google.sheets({ version: 'v4', auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_TAB}!A1:Z`,
  });
  const [headerRow, ...dataRows] = res.data.values ?? [];
  if (!headerRow) throw new Error('Sheet appears empty');
  const guests = parseGuests(headerRow, dataRows);
  return filterByGroup(guests, group);
}

export async function markSent(auth, spreadsheetId, rowIndex) {
  const sheets = google.sheets({ version: 'v4', auth });
  const headerRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_TAB}!1:1`,
  });
  const headers = headerRes.data.values?.[0] ?? [];
  const colIdx = findColumn(headers, 'RSVP Sent');
  const colLetter = String.fromCharCode(65 + colIdx);
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${SHEET_TAB}!${colLetter}${rowIndex}`,
    valueInputOption: 'RAW',
    requestBody: { values: [['TRUE']] },
  });
}
```

- [ ] **Step 4: Run tests — verify all pass**

```bash
cd scripts && node --test test/sheets.test.js
```

Expected: `9 pass, 0 fail`.

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/sheets.js scripts/test/sheets.test.js
git commit -m "feat: Google Sheets guest reader and filter with tests"
```

---

## Task 4: Fonnte sender

**Files:**
- Create: `scripts/test/fonnte.test.js`
- Modify: `scripts/lib/fonnte.js`

- [ ] **Step 1: Create failing tests**

Create `scripts/test/fonnte.test.js`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sendWhatsApp } from '../lib/fonnte.js';

test('dry run returns { sent: false, dryRun: true } without fetching', async () => {
  const result = await sendWhatsApp('fake-token', '+6281234567890', 'hello', true);
  assert.equal(result.dryRun, true);
  assert.equal(result.sent, false);
});

test('sendWhatsApp posts correct shape to Fonnte API', async () => {
  let capturedUrl, capturedOpts;
  globalThis.fetch = async (url, opts) => {
    capturedUrl = url;
    capturedOpts = opts;
    return { ok: true, status: 200, json: async () => ({ status: true }) };
  };

  const result = await sendWhatsApp('my-token', '+6281234567890', 'Test message', false);

  assert.equal(capturedUrl, 'https://api.fonnte.com/send');
  assert.equal(capturedOpts.method, 'POST');
  assert.equal(capturedOpts.headers['Authorization'], 'my-token');
  const body = JSON.parse(capturedOpts.body);
  assert.equal(body.target, '+6281234567890');
  assert.equal(body.message, 'Test message');
  assert.equal(body.countryCode, '62');
  assert.equal(result.sent, true);
  assert.equal(result.dryRun, false);
});

test('sendWhatsApp throws on non-200 response', async () => {
  globalThis.fetch = async () => ({
    ok: false,
    status: 429,
    text: async () => 'rate limited',
  });

  await assert.rejects(
    () => sendWhatsApp('my-token', '+6281234567890', 'msg', false),
    /Fonnte error 429/,
  );
});
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
cd scripts && node --test test/fonnte.test.js
```

Expected: first test fails (`result.dryRun` is undefined).

- [ ] **Step 3: Implement `sendWhatsApp`**

Replace `scripts/lib/fonnte.js`:

```js
const FONNTE_URL = 'https://api.fonnte.com/send';

export async function sendWhatsApp(token, phone, message, dryRun) {
  if (dryRun) {
    console.log(`[DRY RUN] → ${phone}`);
    console.log(message);
    console.log('---');
    return { sent: false, dryRun: true };
  }

  const res = await fetch(FONNTE_URL, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ target: phone, message, countryCode: '62' }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Fonnte error ${res.status}: ${text}`);
  }

  return { sent: true, dryRun: false };
}
```

- [ ] **Step 4: Run tests — verify all pass**

```bash
cd scripts && node --test test/fonnte.test.js
```

Expected: `3 pass, 0 fail`.

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/fonnte.js scripts/test/fonnte.test.js
git commit -m "feat: Fonnte WhatsApp sender with dry-run guard and tests"
```

---

## Task 5: Main blast entry point

**Files:**
- Modify: `scripts/blast.js`

- [ ] **Step 1: Implement `blast.js`**

Replace `scripts/blast.js`:

```js
import { google } from 'googleapis';
import { getGuests, markSent } from './lib/sheets.js';
import { buildMessage } from './lib/honorific.js';
import { sendWhatsApp } from './lib/fonnte.js';

const FONNTE_TOKEN   = process.env.FONNTE_TOKEN;
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const SHEETS_CREDS   = process.env.GOOGLE_SHEETS_CREDS;
const GROUP          = process.env.GROUP ?? 'all';
const DRY_RUN        = process.env.DRY_RUN !== 'false';

if (!FONNTE_TOKEN)   throw new Error('FONNTE_TOKEN env var is required');
if (!SPREADSHEET_ID) throw new Error('SPREADSHEET_ID env var is required');
if (!SHEETS_CREDS)   throw new Error('GOOGLE_SHEETS_CREDS env var is required');

const credentials = JSON.parse(Buffer.from(SHEETS_CREDS, 'base64').toString('utf8'));
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

console.log(`\n🚀 Invitation Blast`);
console.log(`   Group:   ${GROUP}`);
console.log(`   Dry run: ${DRY_RUN}\n`);

const guests = await getGuests(auth, SPREADSHEET_ID, GROUP);
console.log(`Found ${guests.length} guests to send to\n`);

let sent = 0, skipped = 0, failed = 0;

for (const guest of guests) {
  const message = buildMessage(guest.name);
  try {
    const result = await sendWhatsApp(FONNTE_TOKEN, guest.phone, message, DRY_RUN);
    if (result.dryRun) {
      skipped++;
    } else {
      await markSent(auth, SPREADSHEET_ID, guest.rowIndex);
      sent++;
      console.log(`✅ Sent to ${guest.name} (${guest.phone})`);
    }
  } catch (err) {
    failed++;
    console.error(`❌ Failed for ${guest.name}: ${err.message}`);
  }
  if (!DRY_RUN) await new Promise(r => setTimeout(r, 1000));
}

console.log(`\n${'='.repeat(40)}`);
console.log(`✅ Sent: ${sent} | ⏭ Skipped (dry run): ${skipped} | ❌ Failed: ${failed}`);

if (failed > 0) process.exit(1);
```

- [ ] **Step 2: Run all tests to confirm nothing is broken**

```bash
cd scripts && node --test test/*.test.js
```

Expected: `26 pass, 0 fail`.

- [ ] **Step 3: Commit**

```bash
git add scripts/blast.js
git commit -m "feat: main blast entry point — wires sheets, honorific, fonnte"
```

---

## Task 6: GitHub Actions workflow

**Files:**
- Create: `.github/workflows/blast-invitations.yml`

- [ ] **Step 1: Create the workflow file**

Create `.github/workflows/blast-invitations.yml`:

```yaml
name: Blast Invitations

on:
  workflow_dispatch:
    inputs:
      group:
        description: 'Guest group to send to'
        required: true
        default: 'all'
        type: choice
        options:
          - all
          - red
          - yellow
          - green
      dry_run:
        description: 'Dry run — print messages but do NOT send'
        type: boolean
        default: true

jobs:
  blast:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install blast dependencies
        run: npm install
        working-directory: scripts

      - name: Run blast script
        working-directory: scripts
        env:
          FONNTE_TOKEN: ${{ secrets.FONNTE_TOKEN }}
          GOOGLE_SHEETS_CREDS: ${{ secrets.GOOGLE_SHEETS_CREDS }}
          SPREADSHEET_ID: ${{ secrets.SPREADSHEET_ID }}
          GROUP: ${{ inputs.group }}
          DRY_RUN: ${{ inputs.dry_run }}
        run: node blast.js
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/blast-invitations.yml
git commit -m "feat: GitHub Actions workflow for invitation blast"
```

---

## Task 7: Google service account setup (one-time, manual)

No code. Do this once before the first real run.

- [ ] **Step 1: Create a Google Cloud project**

Go to https://console.cloud.google.com → New project → name it `prana-ester-blast`.

- [ ] **Step 2: Enable Google Sheets API**

APIs & Services → Enable APIs → search "Google Sheets API" → Enable.

- [ ] **Step 3: Create a service account**

APIs & Services → Credentials → Create Credentials → Service Account.
- Name: `blast-bot`
- Skip role assignment
- Open the service account → Keys → Add Key → JSON → Download the file

- [ ] **Step 4: Share the Google Sheet with the service account**

Open the spreadsheet → Share → paste the service account email (e.g. `blast-bot@prana-ester-blast.iam.gserviceaccount.com`) → give **Editor** access.

- [ ] **Step 5: Base64-encode the credentials JSON**

Run this in Terminal (replace the filename with your downloaded file):

```bash
base64 -i ~/Downloads/prana-ester-blast-*.json | tr -d '\n' | pbcopy
```

This copies the base64 string to your clipboard.

- [ ] **Step 6: Add GitHub Secrets**

Repo → Settings → Secrets and variables → Actions → New repository secret:

| Name | Value |
|---|---|
| `FONNTE_TOKEN` | Token from Fonnte dashboard |
| `GOOGLE_SHEETS_CREDS` | Base64 string from Step 5 |
| `SPREADSHEET_ID` | `1SpL2nR1lEyveiOsNA4Ow9M8JQqX43cHXyTGnyjbZCx8` |

---

## Task 8: Add Phone column to Google Sheet (one-time, manual)

- [ ] **Step 1: Open the sheet**

Go to https://docs.google.com/spreadsheets/d/1SpL2nR1lEyveiOsNA4Ow9M8JQqX43cHXyTGnyjbZCx8 → open the `Prana` tab.

- [ ] **Step 2: Insert Phone column**

Insert a new column between `Description` and `RSVP Sent`. Name the header exactly `Phone`.

- [ ] **Step 3: Fill in phone numbers**

Use `/Users/pranawijaya/Downloads/guests_with_phones.csv` as a reference:
- Review every `FUZZY(...)` match — verify each one is correct
- Fill in the 54 unmatched guests manually from memory or Google Contacts
- All numbers must be in `+62...` format (no spaces, no dashes)

- [ ] **Step 4: Verify the header row**

The header row must be exactly:
```
Name | Status | Importance | Description | Pax | Phone | RSVP Sent | Gift Received
```

The script reads columns by name — spelling and capitalisation must match.

---

## Task 9: End-to-end dry-run verification

- [ ] **Step 1: Push all commits to GitHub**

```bash
git push origin main
```

- [ ] **Step 2: Run dry-run workflow**

GitHub → Actions → Blast Invitations → Run workflow:
- Group: `all`
- Dry run: ✅ (checked, default)

- [ ] **Step 3: Verify output in the Actions log**

You should see each guest printed as:
```
[DRY RUN] → +62812345...
Halo Ko Randy! 👋
...
---
```

No WhatsApp messages are sent. `RSVP Sent` column unchanged.

- [ ] **Step 4: Spot-check one guest message**

Find one guest in the log and verify:
- Honorific is correct (e.g. `Halo Ko Randy` not `Halo Ko Randy CG`)
- Link is correct: `https://pranaester.com/?to=Ko+Randy`
- Date and venue: `30 Mei 2026`, `GMS Kelapa Gading`

- [ ] **Step 5: When ready to send for real**

Run workflow again:
- Group: `red` (start with priority/family guests)
- Dry run: ☐ unchecked

Watch the log. Each successful send marks `RSVP Sent = TRUE` in the sheet live.
