import fs from 'fs';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagePath = path.join(__dirname, '../src/assets/hero-iphone.png');
const tempPath = `${imagePath}.tmp`;

function spread(r, g, b) {
  return Math.max(r, g, b) - Math.min(r, g, b);
}

function isDarkBezel(r, g, b) {
  const avg = (r + g + b) / 3;
  return avg < 82 && spread(r, g, b) < 45;
}

function shouldClearEdgePixel(r, g, b) {
  if (isDarkBezel(r, g, b)) return false;

  const avg = (r + g + b) / 3;
  const channelSpread = spread(r, g, b);

  if (b > 205 && g > 195 && r > 120) return true;
  if (channelSpread < 42 && avg >= 150 && avg <= 240) return true;
  if (channelSpread < 35 && avg >= 100 && avg <= 155) return true;

  return false;
}

const { data, info } = await sharp(imagePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const pixels = new Uint8Array(data);

const visited = new Uint8Array(width * height);
const queue = [];

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const idx = y * width + x;
    if (pixels[idx * channels + 3] === 0) {
      visited[idx] = 1;
      queue.push([x, y]);
    }
  }
}

let removed = 0;

while (queue.length > 0) {
  const [x, y] = queue.pop();

  for (const [dx, dy] of [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;

    const idx = ny * width + nx;
    if (visited[idx]) continue;

    const offset = idx * channels;
    const alpha = pixels[offset + 3];
    if (alpha === 0) {
      visited[idx] = 1;
      queue.push([nx, ny]);
      continue;
    }

    const r = pixels[offset];
    const g = pixels[offset + 1];
    const b = pixels[offset + 2];

    if (!shouldClearEdgePixel(r, g, b)) continue;

    visited[idx] = 1;
    pixels[offset + 3] = 0;
    removed += 1;
    queue.push([nx, ny]);
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
console.log(`Removed ${removed} fringe pixels from outside in. Size: ${meta.width}x${meta.height}`);
