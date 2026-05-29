import fs from 'fs';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.join(
  process.env.USERPROFILE ?? '',
  '.cursor/projects/c-Users-peter-FLUXGRID/assets/c__Users_peter_AppData_Roaming_Cursor_User_workspaceStorage_ea106f5f020cf6791c3fe3601b831af2_images_Gemini_Generated_Image_um89youm89youm89-e0502245-9309-4dcd-bb59-256b06ea34df.png',
);
const fallbackPath = path.join(__dirname, '../src/assets/hero-iphone.png');
const outputPath = path.join(__dirname, '../src/assets/hero-iphone.png');
const tempPath = `${outputPath}.tmp`;

const inputPath = fs.existsSync(sourcePath) ? sourcePath : fallbackPath;

if (!fs.existsSync(inputPath)) {
  throw new Error(`Hero iPhone source not found at ${inputPath}`);
}

const TARGET_WIDTH = 1010;
const TARGET_HEIGHT = 2048;

function isOuterBackground(r, g, b) {
  const channelSpread = spread(r, g, b);
  const avg = (r + g + b) / 3;
  if (channelSpread < 25 && avg >= 45 && avg <= 210) return true;
  if (channelSpread < 45 && avg > 205) return true;
  return false;
}

function enhancePixel(r, g, b, y, height) {
  let nr = r;
  let ng = g;
  let nb = b;

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const contrast = 1.1;
  const pivot = 128;
  nr = Math.min(255, Math.max(0, (nr - pivot) * contrast + pivot));
  ng = Math.min(255, Math.max(0, (ng - pivot) * contrast + pivot));
  nb = Math.min(255, Math.max(0, (nb - pivot) * contrast + pivot));

  const isRedUi = r > g + 18 && r > b + 18 && r > 90;
  if (isRedUi) {
    nr = Math.min(255, Math.round(r * 1.22 + 18));
    ng = Math.max(0, Math.round(g * 0.72));
    nb = Math.max(0, Math.round(b * 0.72));
  }

  const inLowerScreen = y / height > 0.62;
  if (inLowerScreen && isRedUi) {
    nr = Math.min(255, nr + 20);
    ng = Math.max(0, ng - 8);
    nb = Math.max(0, nb - 8);
  }

  return [nr, ng, nb];
}

function spread(r, g, b) {
  return Math.max(r, g, b) - Math.min(r, g, b);
}

const upscaled = await sharp(inputPath)
  .resize(TARGET_WIDTH, TARGET_HEIGHT, {
    kernel: sharp.kernel.lanczos3,
    fit: 'fill',
  })
  .modulate({
    brightness: 1.04,
    saturation: 1.18,
  })
  .sharpen({
    sigma: 0.85,
    m1: 1.15,
    m2: 0.45,
    x1: 2,
    y2: 10,
    y3: 20,
  })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { data, info } = upscaled;
const { width, height, channels } = info;
const pixels = new Uint8Array(data);

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const offset = (y * width + x) * channels;
    const alpha = pixels[offset + 3];
    if (alpha === 0) continue;

    const [nr, ng, nb] = enhancePixel(
      pixels[offset],
      pixels[offset + 1],
      pixels[offset + 2],
      y,
      height,
    );

    pixels[offset] = nr;
    pixels[offset + 1] = ng;
    pixels[offset + 2] = nb;
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

  if (!isOuterBackground(r, g, b)) continue;

  visited[idx] = 1;
  pixels[offset + 3] = 0;

  queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
}

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

for (let pass = 0; pass < 10; pass += 1) {
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
      const avg = (r + g + b) / 3;
      const channelSpread = spread(r, g, b);

      const isDarkBezel = avg < 82 && channelSpread < 45;
      if (isDarkBezel) continue;

      if (avg > 100 || (b > r + 10 && avg > 78)) {
        toClear.push(idx);
      }
    }
  }

  for (const idx of toClear) {
    pixels[idx * channels + 3] = 0;
  }
}

for (let y = Math.floor(height * 0.76); y < height; y += 1) {
  for (let x = Math.floor(width * 0.5); x < width; x += 1) {
    const idx = y * width + x;
    const offset = idx * channels;
    if (pixels[offset + 3] === 0) continue;
    if (!hasTransparentNeighbor(x, y, width, height, pixels, channels)) continue;

    const r = pixels[offset];
    const g = pixels[offset + 1];
    const b = pixels[offset + 2];
    const avg = (r + g + b) / 3;
    if (avg > 88) {
      pixels[offset + 3] = 0;
    }
  }
}

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const offset = (y * width + x) * channels;
    const alpha = pixels[offset + 3];
    if (alpha === 0) continue;

    const r = pixels[offset];
    const g = pixels[offset + 1];
    const b = pixels[offset + 2];
    const avg = (r + g + b) / 3;

    if (isOuterBackground(r, g, b)) {
      pixels[offset + 3] = 0;
    }
  }
}

await sharp(Buffer.from(pixels), {
  raw: { width, height, channels },
})
  .trim({ threshold: 1 })
  .png({ compressionLevel: 6, adaptiveFiltering: true })
  .toFile(tempPath);

fs.renameSync(tempPath, outputPath);

console.log(`Enhanced hero iPhone saved to ${outputPath} (${width}x${height})`);
