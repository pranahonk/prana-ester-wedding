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
