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
  const headers = ['Name', 'Importance', 'Phone number', 'RSVP Sent'];
  const rows = [
    ['Billy Gunawan', 'Green', '+6285777224040', 'FALSE'],
    ['', 'Green', '+628111', 'FALSE'],
  ];
  const guests = parseGuests(headers, rows);
  assert.equal(guests.length, 1);
  assert.equal(guests[0].name, 'Billy Gunawan');
});

test('parseGuests skips rows with empty Phone', () => {
  const headers = ['Name', 'Importance', 'Phone number', 'RSVP Sent'];
  const rows = [
    ['Billy Gunawan', 'Green', '', 'FALSE'],
    ['Ko Randy', 'Yellow', '+6281234567890', 'FALSE'],
  ];
  const guests = parseGuests(headers, rows);
  assert.equal(guests.length, 1);
  assert.equal(guests[0].name, 'Ko Randy');
});

test('parseGuests skips rows where RSVP Sent is TRUE', () => {
  const headers = ['Name', 'Importance', 'Phone number', 'RSVP Sent'];
  const rows = [
    ['Billy Gunawan', 'Green', '+6285777224040', 'TRUE'],
    ['Ko Randy', 'Yellow', '+6281234567890', 'FALSE'],
  ];
  const guests = parseGuests(headers, rows);
  assert.equal(guests.length, 1);
  assert.equal(guests[0].name, 'Ko Randy');
});

test('parseGuests includes correct rowIndex (1-based, header = row 1)', () => {
  const headers = ['Name', 'Importance', 'Phone number', 'RSVP Sent'];
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
