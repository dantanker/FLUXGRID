import fs from 'fs';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagePath = path.join(__dirname, '../src/assets/hero-iphone.png');
const tempPath = `${imagePath}.tmp`;

function hasTransparentNeighbor(x, y, width, height, pixels, channels) {
  for (let dy = -1; dy <= 1; dy += 1) {
    for (let dx = -1; dx <= 1; dx += 1) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) return true;
      if (pixels[(ny * width + nx) * channels + 3] === 0) return true;
    }
  }
  return false;
}

const { data, info } = await sharp(imagePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const pixels = new Uint8Array(data);

for (let pass = 0; pass < 2; pass += 1) {
  const toClear = [];

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = y * width + x;
      const offset = idx * channels;
      if (pixels[offset + 3] === 0) continue;
      if (!hasTransparentNeighbor(x, y, width, height, pixels, channels)) continue;

      const r = pixels[offset];
      const g = pixels[offset + 1];
      const b = pixels[offset + 2];
      const spread = Math.max(r, g, b) - Math.min(r, g, b);
      const avg = (r + g + b) / 3;

      if (spread < 28 && avg > 175) {
        toClear.push(idx);
      }
    }
  }

  for (const idx of toClear) {
    pixels[idx * channels + 3] = 0;
  }
}

await sharp(Buffer.from(pixels), {
  raw: { width, height, channels },
})
  .trim({ threshold: 1 })
  .png({ compressionLevel: 6, adaptiveFiltering: true })
  .toFile(tempPath);

fs.renameSync(tempPath, imagePath);

const meta = await sharp(imagePath).metadata();
console.log(`Removed outer halo only: ${meta.width}x${meta.height}`);
