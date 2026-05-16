import { google } from 'googleapis';

const SHEET_TAB = 'Prana';

export function findColumn(headers, name) {
  const idx = headers.findIndex(h => h.trim().toLowerCase() === name.toLowerCase());
  if (idx === -1) throw new Error(`Column "${name}" not found in sheet headers`);
  return idx;
}

function normalizePhone(raw) {
  if (!raw) return '';
  // Strip Unicode directional/invisible chars
  let p = raw.replace(/[‪‫‬‭‮​‌‍﻿\s]/g, '');
  // Strip dashes (regular, non-breaking ‑, en –, em —, figure ‒)
  p = p.replace(/[-‑‒–—]/g, '');
  if (p.startsWith('0')) return '+62' + p.slice(1);
  if (p.startsWith('62') && !p.startsWith('+')) return '+' + p;
  return p;
}

export function parseGuests(headers, rows) {
  const nameCol       = findColumn(headers, 'Name');
  const importanceCol = findColumn(headers, 'Importance');
  const phoneCol      = findColumn(headers, 'Phone number');
  const rsvpCol       = findColumn(headers, 'RSVP Sent');

  return rows
    .map((row, i) => ({
      name:       (row[nameCol]       || '').trim(),
      importance: (row[importanceCol] || '').trim(),
      phone:      normalizePhone(row[phoneCol] || ''),
      rsvpSent:   (row[rsvpCol]       || '').trim().toUpperCase() === 'TRUE',
      rowIndex:   i + 2,
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
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [['TRUE']] },
  });
}
