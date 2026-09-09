import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin/guard';
import { isAllowedAdminOrigin } from '@/lib/admin/request-origin';
import { getPrisma } from '@/lib/db';
import { APS_PHOTO_MAX_UPLOAD_BYTES, parseApsPhotoCaption, parseApsPhotoSlot } from '@/lib/aps-gallery';
import { apsPhotoMetadata, serializeApsPhoto } from '@/lib/aps-gallery-data';
import { prepareApsPhoto } from '@/lib/aps-photo-processing';

export const runtime = 'nodejs';

async function guard(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!isAllowedAdminOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });
  return null;
}

function refreshPhotos() {
  revalidatePath('/formations-securite/aps');
  revalidatePath('/admin/ia/photos-aps');
}

export async function POST(request: NextRequest) {
  const denied = await guard(request);
  if (denied) return denied;
  if (Number(request.headers.get('content-length') || 0) > APS_PHOTO_MAX_UPLOAD_BYTES + 64 * 1024) {
    return NextResponse.json({ error: 'La photo doit faire moins de 8 Mo.' }, { status: 413 });
  }
  let input: { gallery: 'pc-securite' | 'ecole'; slot: number; caption: string; image?: Buffer };
  try {
    const form = await request.formData();
    const target = parseApsPhotoSlot(form.get('gallery'), form.get('slot'));
    const caption = parseApsPhotoCaption(form.get('caption'));
    const file = form.get('photo');
    if (file instanceof File && file.size > APS_PHOTO_MAX_UPLOAD_BYTES) throw new Error('La photo doit faire moins de 8 Mo.');
    const image = file instanceof File && file.size ? await prepareApsPhoto(Buffer.from(await file.arrayBuffer())) : undefined;
    input = { ...target, caption, image };
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Vérifiez le fichier et la légende.' }, { status: 400 });
  }
  try {
    const prisma = await getPrisma();
    if (!prisma) return NextResponse.json({ error: 'Gestion des photos temporairement indisponible.' }, { status: 503 });
    const { gallery, slot, caption, image } = input;
    const where = { gallery_slot: { gallery, slot } };
    if (!image && !await prisma.apsGalleryPhoto.findUnique({ where, select: { id: true } })) {
      return NextResponse.json({ error: 'Choisissez une photo pour cet emplacement.' }, { status: 400 });
    }
    const storedImage = image ? new Uint8Array(image) : undefined;
    const row = storedImage
      ? await prisma.apsGalleryPhoto.upsert({ where, create: { id: randomUUID(), gallery, slot, caption, image: storedImage }, update: { id: randomUUID(), caption, image: storedImage }, select: apsPhotoMetadata })
      : await prisma.apsGalleryPhoto.update({ where, data: { caption }, select: apsPhotoMetadata });
    refreshPhotos();
    return NextResponse.json({ photo: serializeApsPhoto(row) });
  } catch {
    return NextResponse.json({ error: 'La photo n’a pas été enregistrée. Réessayez dans un instant.' }, { status: 503 });
  }
}

export async function DELETE(request: NextRequest) {
  const denied = await guard(request);
  if (denied) return denied;
  let target;
  try {
    const body = await request.json();
    target = parseApsPhotoSlot(body.gallery, body.slot);
  } catch {
    return NextResponse.json({ error: 'Emplacement photo invalide.' }, { status: 400 });
  }
  try {
    const prisma = await getPrisma();
    if (!prisma) return NextResponse.json({ error: 'Gestion des photos temporairement indisponible.' }, { status: 503 });
    await prisma.apsGalleryPhoto.deleteMany({ where: target });
    refreshPhotos();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'La suppression a échoué. Réessayez dans un instant.' }, { status: 503 });
  }
}
