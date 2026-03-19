// Run with: node generate-icons.mjs
// Requires: npm install sharp (one-time, not added to package.json)

import sharp from 'sharp';
import { readFileSync } from 'fs';

const svg = readFileSync('./public/icon.svg');

await sharp(svg).resize(192, 192).png().toFile('./public/pwa-192x192.png');
console.log('✓ pwa-192x192.png');

await sharp(svg).resize(512, 512).png().toFile('./public/pwa-512x512.png');
console.log('✓ pwa-512x512.png');

await sharp(svg).resize(180, 180).png().toFile('./public/apple-touch-icon.png');
console.log('✓ apple-touch-icon.png');

console.log('Done!');
