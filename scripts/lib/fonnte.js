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

  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.status === false) {
    throw new Error(`Fonnte error: ${body.reason ?? body.message ?? res.status}`);
  }

  return { sent: true, dryRun: false };
}
