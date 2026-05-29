import fs from 'fs';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.join(
  process.env.USERPROFILE ?? '',
  '.cursor/projects/c-Users-peter-FLUXGRID/assets/c__Users_peter_AppData_Roaming_Cursor_User_workspaceStorage_ea106f5f020cf6791c3fe3601b831af2_images_Gemini_Generated_Image_um89youm89youm89-e0502245-9309-4dcd-bb59-256b06ea34df.png',
);
const outputPath = path.join(__dirname, '../src/assets/hero-iphone.png');
const tempPath = `${outputPath}.tmp`;

function spread(r, g, b) {
  return Math.max(r, g, b) - Math.min(r, g, b);
}

function isGrayBackground(r, g, b) {
  const channelSpread = spread(r, g, b);
  const avg = (r + g + b) / 3;
  return channelSpread < 22 && avg >= 50 && avg <= 195;
}

function shouldPeelExterior(r, g, b, x, width) {
  const avg = (r + g + b) / 3;
  const channelSpread = spread(r, g, b);

  if (channelSpread < 45 && avg >= 168 && avg <= 235) return true;
  if (x >= Math.floor(width * 0.905) && channelSpread < 32 && avg >= 18 && avg <= 62) return true;

  return false;
}

const { data, info } = await sharp(sourcePath)
  .resize(1010, 2048, { kernel: sharp.kernel.lanczos3, fit: 'fill' })
  .modulate({ brightness: 1.03, saturation: 1.12 })
  .sharpen({ sigma: 0.6, m1: 1.05, m2: 0.3, x1: 2, y2: 10, y3: 20 })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const pixels = new Uint8Array(data);

for (let i = 0; i < pixels.length; i += channels) {
  const r = pixels[i];
  const g = pixels[i + 1];
  const b = pixels[i + 2];
  if (r > g + 18 && r > b + 18 && r > 90) {
    pixels[i] = Math.min(255, Math.round(r * 1.15 + 8));
    pixels[i + 1] = Math.max(0, Math.round(g * 0.78));
    pixels[i + 2] = Math.max(0, Math.round(b * 0.78));
  }
}

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
  const alpha = pixels[offset + 3];

  if (alpha === 0) {
    visited[idx] = 1;
    queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    continue;
  }

  if (!isGrayBackground(r, g, b)) continue;

  visited[idx] = 1;
  pixels[offset + 3] = 0;
  queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
}

let peeled = 0;

for (let pass = 0; pass < 12; pass += 1) {
  const toClear = [];

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = y * width + x;
      const offset = idx * channels;
      if (pixels[offset + 3] === 0) continue;

      let touchesTransparent = false;
      for (let dy = -1; dy <= 1; dy += 1) {
        for (let dx = -1; dx <= 1; dx += 1) {
          if (dx === 0 && dy === 0) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            touchesTransparent = true;
            break;
          }
          if (pixels[(ny * width + nx) * channels + 3] === 0) {
            touchesTransparent = true;
            break;
          }
        }
        if (touchesTransparent) break;
      }

      if (!touchesTransparent) continue;

      const r = pixels[offset];
      const g = pixels[offset + 1];
      const b = pixels[offset + 2];
      if (!shouldPeelExterior(r, g, b, x, width)) continue;

      toClear.push(idx);
    }
  }

  for (const idx of toClear) {
    pixels[idx * channels + 3] = 0;
    peeled += 1;
  }
}

await sharp(Buffer.from(pixels), {
  raw: { width, height, channels },
})
  .trim({ threshold: 1 })
  .png({ compressionLevel: 6, adaptiveFiltering: true })
  .toFile(tempPath);

fs.renameSync(tempPath, outputPath);

const meta = await sharp(outputPath).metadata();
console.log(`Restored hero iPhone, peeled ${peeled} exterior pixels: ${meta.width}x${meta.height}`);
