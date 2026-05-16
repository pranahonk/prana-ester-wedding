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
  const encodedName = name.trim().replace(/\s+/g, '+');
  return [
    'Kepada Yth.',
    'Bapak/Ibu/Saudara/i',
    `*${name.trim()}*`,
    'di tempat',
    '',
    'Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami:',
    '',
    '🤵🏻 : *Prana Apsara Wijaya*',
    'dengan',
    '👰🏼‍♀️ : *Ester Siwi Prihardani*',
    '',
    `🔗 https://www.pranaester.com/?to=${encodedName}`,
    '',
    'yang akan dilaksanakan pada :',
    '',
    '*📍 PEMBERKATAN NIKAH*',
    '🗓️ *Sabtu, 30 Mei 2026 ~ 09:30 WIB*',
    '📍 *GMS Kelapa Gading*',
    '    Jl. Kelapa Gading, Jakarta Utara',
    '📍 https://www.google.com/maps/search/GMS+Kelapa+Gading+Jakarta+Utara',
    '',
    '*🍽️ RESEPSI*',
    '🗓️ *Sabtu, 30 Mei 2026 ~ 13:00 WIB*',
    '📍 *Roemah Kopi Sandjaja*',
    '    Jl. Kelapa Gading, Jakarta Utara',
    '📍 https://www.google.com/maps/search/Roemah+Kopi+Sandjaja+Kelapa+Gading',
    '',
    'Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.',
    '',
    'Kami yang berbahagia,',
    'Prana & Ester',
  ].join('\n');
}
