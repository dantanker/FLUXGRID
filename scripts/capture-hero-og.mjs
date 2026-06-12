import { chromium } from 'playwright';
import sharp from 'sharp';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outPath = path.join(root, 'public', 'og-preview.png');
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const previewUrl = process.env.OG_CAPTURE_URL || 'http://127.0.0.1:4173';
const managePreview = !process.env.OG_CAPTURE_URL;

function waitForServer(url, timeoutMs = 60_000) {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const tick = async () => {
      try {
        const res = await fetch(url, { signal: AbortSignal.timeout(2_000) });
        if (res.ok) {
          resolve();
          return;
        }
      } catch {
        // server not ready yet
      }

      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Timed out waiting for ${url}`));
        return;
      }

      setTimeout(tick, 400);
    };

    tick();
  });
}

function startPreview() {
  return spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173'], {
    cwd: root,
    shell: true,
    stdio: 'ignore',
  });
}

let previewProcess;

if (managePreview) {
  previewProcess = startPreview();
  await waitForServer(previewUrl);
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});

try {
  await page.goto(previewUrl, { waitUntil: 'networkidle', timeout: 120_000 });
  await page.waitForSelector('.hero-section', { timeout: 30_000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1500);

  const hero = page.locator('.hero-section').first();
  const box = await hero.boundingBox();

  if (!box) {
    throw new Error('Hero section not found');
  }

  const screenshot = await page.screenshot({
    type: 'png',
    clip: {
      x: box.x,
      y: box.y,
      width: box.width,
      height: box.height,
    },
  });

  await sharp(screenshot)
    .resize(OG_WIDTH, OG_HEIGHT, {
      fit: 'cover',
      position: 'top',
    })
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  console.log(`Saved ${outPath} (${OG_WIDTH}x${OG_HEIGHT})`);
} finally {
  await browser.close();
  previewProcess?.kill('SIGTERM');
}
