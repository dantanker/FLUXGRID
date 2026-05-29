import fs from 'fs';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logoPath = path.join(__dirname, '../src/assets/fluxgrid-logo.png');
const tempPath = `${logoPath}.tmp`;

function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function isOrange(r, g, b) {
  return r > 130 && g > 65 && b < 110 && r >= g && g > b * 0.8;
}

function isNavy(r, g, b) {
  return b > r + 8 && b >= g - 4 && luminance(r, g, b) < 130;
}

function isNeutralDark(r, g, b) {
  const lum = luminance(r, g, b);
  const channelSpread = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
  return lum < 32 && channelSpread < 16;
}

const { data, info } = await sharp(logoPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const pixels = new Uint8Array(data);

const orangeNear = new Uint8Array(width * height);

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const idx = y * width + x;
    const offset = idx * channels;
    if (pixels[offset + 3] === 0) continue;

    const r = pixels[offset];
    const g = pixels[offset + 1];
    const b = pixels[offset + 2];
    if (!isOrange(r, g, b)) continue;

    for (let dy = -3; dy <= 3; dy += 1) {
      for (let dx = -3; dx <= 3; dx += 1) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        orangeNear[ny * width + nx] = 1;
      }
    }
  }
}

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const idx = y * width + x;
    const offset = idx * channels;
    if (pixels[offset + 3] === 0) continue;

    const r = pixels[offset];
    const g = pixels[offset + 1];
    const b = pixels[offset + 2];

    if (isOrange(r, g, b)) {
      pixels[offset] = Math.min(255, Math.round(r * 1.03));
      pixels[offset + 1] = Math.min(255, Math.round(g * 1.02));
      continue;
    }

    if (isNeutralDark(r, g, b) && !orangeNear[idx]) {
      pixels[offset + 3] = 0;
      continue;
    }

    if (isNavy(r, g, b)) {
      const shade = Math.min(1, luminance(r, g, b) / 90);
      pixels[offset] = Math.round(228 + shade * 27);
      pixels[offset + 1] = Math.round(232 + shade * 23);
      pixels[offset + 2] = Math.round(240 + shade * 15);
    }
  }
}

await sharp(Buffer.from(pixels), {
  raw: { width, height, channels },
})
  .png()
  .toFile(tempPath);

fs.renameSync(tempPath, logoPath);

console.log(`Brightened logo for dark backgrounds: ${logoPath}`);
