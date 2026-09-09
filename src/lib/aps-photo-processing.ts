import sharp from 'sharp';
import { APS_PHOTO_MAX_STORED_BYTES, APS_PHOTO_MAX_UPLOAD_BYTES } from './aps-gallery';

export async function prepareApsPhoto(bytes: Buffer): Promise<Buffer> {
  if (!bytes.length || bytes.length > APS_PHOTO_MAX_UPLOAD_BYTES) {
    throw new Error('La photo doit faire moins de 8 Mo.');
  }
  const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const png = bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  const webp = bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP';
  if (!jpeg && !png && !webp) throw new Error('Utilisez une photo JPG, PNG ou WebP.');

  let image: Buffer;
  try {
    image = await sharp(bytes, { limitInputPixels: 36_000_000, failOn: 'warning' })
      .rotate()
      .resize({ width: 1800, height: 1400, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer();
  } catch {
    throw new Error('Cette photo est illisible ou trop grande. Choisissez une autre image (36 mégapixels maximum).');
  }
  if (image.length > APS_PHOTO_MAX_STORED_BYTES) throw new Error('La photo reste trop volumineuse. Choisissez une image plus petite.');
  return image;
}
