/**
 * Generates a 1200x630 OG image as JPG using sharp.
 * Navy+gold branded with couple names and date.
 */

import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#1B2A4A" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#060a14"/>
      <stop offset="30%" stop-color="#0F1D33"/>
      <stop offset="50%" stop-color="#1B2A4A"/>
      <stop offset="70%" stop-color="#0F1D33"/>
      <stop offset="100%" stop-color="#060a14"/>
    </linearGradient>
    <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4AF37"/>
      <stop offset="50%" stop-color="#f5e7a3"/>
      <stop offset="100%" stop-color="#D4AF37"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Border -->
  <rect x="20" y="20" width="1160" height="590" fill="none" stroke="#D4AF37" stroke-opacity="0.12" stroke-width="1"/>
  <rect x="35" y="35" width="1130" height="560" fill="none" stroke="#D4AF37" stroke-opacity="0.06" stroke-width="1"/>

  <!-- Corner ornaments -->
  <path d="M20 80 Q20 20 80 20" fill="none" stroke="#D4AF37" stroke-opacity="0.3" stroke-width="1.2"/>
  <path d="M1120 20 Q1180 20 1180 80" fill="none" stroke="#D4AF37" stroke-opacity="0.3" stroke-width="1.2"/>
  <path d="M20 550 Q20 610 80 610" fill="none" stroke="#D4AF37" stroke-opacity="0.3" stroke-width="1.2"/>
  <path d="M1120 610 Q1180 610 1180 550" fill="none" stroke="#D4AF37" stroke-opacity="0.3" stroke-width="1.2"/>

  <!-- Corner diamonds -->
  <rect x="26" y="26" width="8" height="8" transform="rotate(45 30 30)" fill="#D4AF37" fill-opacity="0.35"/>
  <rect x="1166" y="26" width="8" height="8" transform="rotate(45 1170 30)" fill="#D4AF37" fill-opacity="0.35"/>
  <rect x="26" y="596" width="8" height="8" transform="rotate(45 30 600)" fill="#D4AF37" fill-opacity="0.35"/>
  <rect x="1166" y="596" width="8" height="8" transform="rotate(45 1170 600)" fill="#D4AF37" fill-opacity="0.35"/>

  <!-- Top flourish line -->
  <line x1="400" y1="170" x2="540" y2="170" stroke="#D4AF37" stroke-opacity="0.2" stroke-width="0.5"/>
  <line x1="660" y1="170" x2="800" y2="170" stroke="#D4AF37" stroke-opacity="0.2" stroke-width="0.5"/>
  <circle cx="600" cy="170" r="2" fill="#D4AF37" fill-opacity="0.3"/>

  <!-- Top label -->
  <text x="600" y="210" text-anchor="middle" font-family="Georgia, serif" font-size="16" letter-spacing="8" fill="#D4AF37" fill-opacity="0.5">THE WEDDING OF</text>

  <!-- Names -->
  <text x="600" y="310" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="80" fill="url(#gold-grad)" font-style="italic">Prana &amp; Ester</text>

  <!-- Divider -->
  <line x1="420" y1="345" x2="580" y2="345" stroke="#D4AF37" stroke-opacity="0.3" stroke-width="0.8"/>
  <line x1="620" y1="345" x2="780" y2="345" stroke="#D4AF37" stroke-opacity="0.3" stroke-width="0.8"/>
  <rect x="596" y="341" width="8" height="8" transform="rotate(45 600 345)" fill="#D4AF37" fill-opacity="0.5"/>

  <!-- Date -->
  <text x="600" y="400" text-anchor="middle" font-family="Georgia, serif" font-size="24" letter-spacing="8" fill="#F0E6C8" fill-opacity="0.5">30 . 05 . 2026</text>

  <!-- Venue -->
  <text x="600" y="440" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" letter-spacing="5" fill="#D4AF37" fill-opacity="0.35">GMS KELAPA GADING · JAKARTA</text>

  <!-- Bottom flourish line -->
  <line x1="400" y1="480" x2="540" y2="480" stroke="#D4AF37" stroke-opacity="0.15" stroke-width="0.5"/>
  <line x1="660" y1="480" x2="800" y2="480" stroke="#D4AF37" stroke-opacity="0.15" stroke-width="0.5"/>
  <circle cx="600" cy="480" r="2" fill="#D4AF37" fill-opacity="0.2"/>

  <!-- Verse -->
  <text x="600" y="530" text-anchor="middle" font-family="Georgia, serif" font-size="14" fill="#F0E6C8" fill-opacity="0.2" font-style="italic">"Apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia."</text>
  <text x="600" y="555" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" letter-spacing="4" fill="#D4AF37" fill-opacity="0.2">MARKUS 10:9</text>
</svg>`;

const outPath = join(__dirname, "..", "public", "og-image.jpg");

await sharp(Buffer.from(svg))
  .jpeg({ quality: 90 })
  .toFile(outPath);

console.log(`OG image generated at ${outPath}`);
