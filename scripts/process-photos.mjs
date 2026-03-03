#!/usr/bin/env node

/**
 * Photo processing script for wedding gallery.
 * Usage: node scripts/process-photos.mjs <source-directory>
 *
 * Selects photos from the source directory and converts them to WebP format.
 * Outputs full-size (1200px wide) and thumbnail (400px wide) versions.
 */

import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import { join, extname } from "node:path";

const SOURCE_DIR = process.argv[2];
const OUTPUT_DIR = join(process.cwd(), "public", "photos");

if (!SOURCE_DIR) {
  console.error("Usage: node scripts/process-photos.mjs <source-directory>");
  process.exit(1);
}

const PHOTO_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".tiff"]);
const MAX_PHOTOS = 12;
const GALLERY_WIDTH = 1200;
const THUMB_WIDTH = 400;
const HERO_WIDTH = 1920;
const QUALITY = 80;

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const allFiles = await readdir(SOURCE_DIR);
  const photoFiles = allFiles
    .filter((f) => PHOTO_EXTENSIONS.has(extname(f).toLowerCase()))
    .sort();

  if (photoFiles.length === 0) {
    console.error("No photos found in", SOURCE_DIR);
    process.exit(1);
  }

  // Select evenly spaced photos if more than MAX_PHOTOS
  let selected;
  if (photoFiles.length <= MAX_PHOTOS) {
    selected = photoFiles;
  } else {
    const step = photoFiles.length / MAX_PHOTOS;
    selected = Array.from(
      { length: MAX_PHOTOS },
      (_, i) => photoFiles[Math.floor(i * step)]
    );
  }

  console.log(`Processing ${selected.length} photos from ${photoFiles.length} total...`);

  // Process first photo as hero (wider)
  const heroFile = selected[0];
  const heroInput = join(SOURCE_DIR, heroFile);
  await sharp(heroInput)
    .resize(HERO_WIDTH, null, { withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(join(OUTPUT_DIR, "hero.webp"));
  console.log(`  Hero: ${heroFile} -> hero.webp`);

  // Process all selected photos for gallery
  for (let i = 0; i < selected.length; i++) {
    const file = selected[i];
    const input = join(SOURCE_DIR, file);
    const baseName = `gallery-${String(i + 1).padStart(2, "0")}`;

    // Full size
    await sharp(input)
      .resize(GALLERY_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(join(OUTPUT_DIR, `${baseName}.webp`));

    // Thumbnail
    await sharp(input)
      .resize(THUMB_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY - 10 })
      .toFile(join(OUTPUT_DIR, `${baseName}-thumb.webp`));

    console.log(`  ${i + 1}/${selected.length}: ${file} -> ${baseName}.webp`);
  }

  console.log(`\nDone! ${selected.length} photos processed to ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
