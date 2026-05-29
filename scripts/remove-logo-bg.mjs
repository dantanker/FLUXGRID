import fs from 'fs';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logoPath = path.join(__dirname, '../src/assets/fluxgrid-logo.png');
const tempPath = `${logoPath}.tmp`;

function isBackground(r, g, b, threshold = 42) {
  return r <= threshold && g <= threshold && b <= threshold;
}

const image = sharp(logoPath);
const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const pixels = new Uint8Array(data);

const visited = new Uint8Array(width * height);
const queue = [];

for (let x = 0; x < width; x += 1) {
  queue.push([x, 0], [x, height - 1]);
}

for (let y = 0; y < height; y += 1) {
  queue.push([0, y], [width - 1, y]);
}

while (queue.length > 0) {
  const [x, y] = queue.pop();
  if (x < 0 || y < 0 || x >= width || y >= height) continue;

  const idx = y * width + x;
  if (visited[idx]) continue;

  const offset = idx * channels;
  const r = pixels[offset];
  const g = pixels[offset + 1];
  const b = pixels[offset + 2];

  if (!isBackground(r, g, b)) continue;

  visited[idx] = 1;
  pixels[offset + 3] = 0;

  queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
}

await sharp(Buffer.from(pixels), {
  raw: { width, height, channels },
})
  .png()
  .toFile(tempPath);

fs.renameSync(tempPath, logoPath);

console.log(`Removed black background from ${logoPath}`);
