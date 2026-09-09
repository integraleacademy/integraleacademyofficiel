import 'server-only';
import { getPrisma } from './db';
import type { ApsGallery, ApsPhoto } from './aps-gallery';

export const apsPhotoMetadata = { id: true, gallery: true, slot: true, caption: true } as const;

export function serializeApsPhoto(photo: { id: string; gallery: string; slot: number; caption: string }): ApsPhoto {
  return { ...photo, gallery: photo.gallery as ApsGallery, src: `/api/aps/photos/${photo.id}` };
}

export async function listApsPhotos(): Promise<{ photos: ApsPhoto[]; available: boolean }> {
  try {
    const prisma = await getPrisma();
    if (!prisma) return { photos: [], available: false };
    const rows = await prisma.apsGalleryPhoto.findMany({ select: apsPhotoMetadata, orderBy: [{ gallery: 'asc' }, { slot: 'asc' }] });
    return { photos: rows.map(serializeApsPhoto), available: true };
  } catch {
    // The page remains usable while the photo table is created during deployment.
    console.warn('[APS_GALLERY] Photo storage temporarily unavailable.');
    return { photos: [], available: false };
  }
}
