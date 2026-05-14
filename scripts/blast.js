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
