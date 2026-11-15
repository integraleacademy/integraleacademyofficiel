import { createHash } from 'node:crypto';
import { readdir, mkdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sizes = JSON.parse(await readFile(new URL('../src/data/image-widths.json', import.meta.url), 'utf8'));
const widths = [...sizes.imageSizes, ...sizes.deviceSizes];
const root = 'public/images';
const output = 'public/responsive-images';
const manifest = {};
sharp.concurrency(1);
sharp.cache(false);
await mkdir(output, { recursive: true });

async function build(directory) {
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a,b) => a.name.localeCompare(b.name, 'en'))) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await build(file);
      continue;
    }
    if (!/\.(webp|png|jpe?g)$/i.test(file)) continue;
    const bytes = await readFile(file);
    // Four retired campus JPGs in the archive are plain-text placeholders.
    if (bytes.subarray(0,22).toString().startsWith('Placeholder image file')) continue;
    const { width, height, orientation } = await sharp(bytes).metadata();
    const displayWidth = orientation >= 5 && orientation <= 8 ? height : width;
    const key = createHash('sha256').update(bytes).digest('hex').slice(0,16);
    manifest['/' + file.slice('public/'.length)] = [key, displayWidth];
    for (const w of widths.filter(w => w < displayWidth)) {
      const dest = path.join(output, key + '-' + w + '.webp');
      try { await access(dest); } catch {
        await sharp(bytes).rotate().resize({ width: w, withoutEnlargement: true }).webp({quality:82, effort:2}).toFile(dest);
      }
    }
  }
}
await build(root);
await writeFile('src/data/image-variants.json', JSON.stringify(manifest, null, 2) + '\n');
console.log('Images prêtes pour la diffusion statique :', Object.keys(manifest).length);
