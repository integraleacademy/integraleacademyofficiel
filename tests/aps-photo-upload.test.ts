import assert from 'node:assert/strict';
import test from 'node:test';
import sharp from 'sharp';
import { APS_PHOTO_MAX_UPLOAD_BYTES, parseApsPhotoCaption, parseApsPhotoSlot } from '../src/lib/aps-gallery';
import { prepareApsPhoto } from '../src/lib/aps-photo-processing';

test('only the six APS photo slots are accepted', () => {
  for (const gallery of ['pc-securite', 'ecole']) {
    for (const slot of [1, 2, 3]) assert.deepEqual(parseApsPhotoSlot(gallery, String(slot)), { gallery, slot });
  }
  for (const slot of [0, 4, 1.5, '01', '1e0', [1], null, undefined]) {
    assert.throws(() => parseApsPhotoSlot('ecole', slot));
  }
  assert.throws(() => parseApsPhotoSlot('other-page', 1));
  assert.throws(() => parseApsPhotoSlot({}, 1));
});

test('captions are trimmed and require a useful, bounded description', () => {
  assert.equal(parseApsPhotoCaption('  Le PC sécurité  '), 'Le PC sécurité');
  for (const value of ['', '  ', 'ab', 'x'.repeat(201), null, 123]) assert.throws(() => parseApsPhotoCaption(value));
});

test('JPEG, PNG and WebP uploads become valid resized WebP images without metadata', async () => {
  for (const format of ['jpeg', 'png', 'webp'] as const) {
    const input = await sharp({ create: { width: 2200, height: 1600, channels: 3, background: '#375375' } })
      .withMetadata().toFormat(format).toBuffer();
    const result = await prepareApsPhoto(input);
    const metadata = await sharp(result).metadata();
    assert.equal(metadata.format, 'webp');
    assert.equal(metadata.width, 1800);
    assert.ok(metadata.height! <= 1400);
    assert.equal(metadata.exif, undefined);
    assert.equal(metadata.icc, undefined);
    assert.ok(result.length <= 2 * 1024 * 1024);
  }
});

test('portrait orientation is applied before metadata is removed', async () => {
  const input = await sharp({ create: { width: 800, height: 400, channels: 3, background: '#375375' } })
    .withMetadata({ orientation: 6 }).jpeg().toBuffer();
  const metadata = await sharp(await prepareApsPhoto(input)).metadata();
  assert.equal(metadata.width, 400);
  assert.equal(metadata.height, 800);
  assert.equal(metadata.orientation, undefined);
});

test('non-images, corrupt raster files and oversized uploads are rejected', async () => {
  for (const input of [
    Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>'),
    Buffer.from('<html>not a photo</html>'),
    Buffer.from([0xff, 0xd8, 0xff, 0, 0]),
    Buffer.alloc(0),
    Buffer.alloc(APS_PHOTO_MAX_UPLOAD_BYTES + 1),
  ]) await assert.rejects(prepareApsPhoto(input));
});

test('compressed images with excessive dimensions are rejected', async () => {
  const input = await sharp({ create: { width: 6100, height: 6100, channels: 3, background: '#375375' } }).png().toBuffer();
  assert.ok(input.length < APS_PHOTO_MAX_UPLOAD_BYTES);
  await assert.rejects(prepareApsPhoto(input), /36 mégapixels/);
});
