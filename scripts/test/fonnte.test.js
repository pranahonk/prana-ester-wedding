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
