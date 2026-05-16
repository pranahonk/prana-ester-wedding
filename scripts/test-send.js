// Quick test script — bypasses Google Sheets.
// Edit TEST_GUESTS, then: DRY_RUN=true node test-send.js
import { buildMessage } from './lib/honorific.js';
import { sendWhatsApp } from './lib/fonnte.js';

const FONNTE_TOKEN = process.env.FONNTE_TOKEN ?? 'dry-run-token';
const DRY_RUN = process.env.DRY_RUN !== 'false';

const TEST_GUESTS = [
  { name: 'Prana Wijaya', phone: '+6281314941385' },
  { name: 'Prana Wijaya', phone: '+6285155428863' },
  { name: 'Ester Siwi', phone: '+6281226946845' },
];

for (const guest of TEST_GUESTS) {
  const message = buildMessage(guest.name);
  console.log(`\n${'='.repeat(60)}`);
  console.log(`TO: ${guest.name} → ${guest.phone}`);
  console.log('='.repeat(60));
  console.log(message);
  if (!DRY_RUN) {
    await sendWhatsApp(FONNTE_TOKEN, guest.phone, message, false);
    await new Promise(r => setTimeout(r, 1000));
  }
}

console.log(`\n${'='.repeat(60)}`);
console.log(DRY_RUN ? '✅ Dry run complete — nothing sent.' : '✅ Done sending.');
