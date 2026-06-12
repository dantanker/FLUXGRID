import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');
const svgPath = path.join(publicDir, 'favicon.svg');

const png32 = path.join(publicDir, 'favicon-32.png');
const appleTouch = path.join(publicDir, 'apple-touch-icon.png');

await sharp(svgPath).resize(32, 32).png().toFile(png32);
await sharp(svgPath).resize(180, 180).png().toFile(appleTouch);

console.log(`Saved ${png32}`);
console.log(`Saved ${appleTouch}`);
