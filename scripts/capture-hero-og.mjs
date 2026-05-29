import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outPath = path.join(root, 'public', 'og-preview.png');
const url = process.env.OG_CAPTURE_URL || 'http://127.0.0.1:4173';

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});

await page.goto(url, { waitUntil: 'networkidle', timeout: 120_000 });
await page.waitForSelector('.hero-scroll-section', { timeout: 30_000 });
await page.waitForTimeout(3500);

const hero = page.locator('.hero-scroll-section');
const box = await hero.boundingBox();

if (!box) {
  await browser.close();
  throw new Error('Hero section not found');
}

const clipWidth = Math.min(Math.round(box.width), 1200);
const clipHeight = Math.min(Math.round(box.height), 630);

await page.screenshot({
  path: outPath,
  clip: {
    x: box.x,
    y: box.y,
    width: clipWidth,
    height: clipHeight,
  },
});

await browser.close();
console.log(`Saved ${outPath} (${clipWidth}x${clipHeight})`);
