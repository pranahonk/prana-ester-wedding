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
  assert.ok(msg.includes('https://www.pranaester.com/?to=Billy+Gunawan'), 'link missing');
});

test('buildMessage contains guest name in bold', () => {
  const msg = buildMessage('Merry Purnama');
  assert.ok(msg.includes('*Merry Purnama*'), 'bold name missing');
});

test('buildMessage contains formal header and event details', () => {
  const msg = buildMessage('Ko Randy');
  assert.ok(msg.includes('Kepada Yth.'), 'header missing');
  assert.ok(msg.includes('https://www.pranaester.com/?to=Ko+Randy'), 'link missing');
  assert.ok(msg.includes('PEMBERKATAN NIKAH'), 'ceremony missing');
  assert.ok(msg.includes('RESEPSI'), 'reception missing');
});
