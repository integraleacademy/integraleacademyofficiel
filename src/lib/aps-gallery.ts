export const APS_GALLERIES = ['pc-securite', 'ecole'] as const;
export type ApsGallery = typeof APS_GALLERIES[number];
export const APS_PHOTO_MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
export const APS_PHOTO_MAX_STORED_BYTES = 2 * 1024 * 1024;

export type ApsPhoto = {
  id: string;
  gallery: ApsGallery;
  slot: number;
  caption: string;
  src: string;
};

export function parseApsPhotoSlot(gallery: unknown, slot: unknown): { gallery: ApsGallery; slot: number } {
  if (!APS_GALLERIES.includes(gallery as ApsGallery) || !['string', 'number'].includes(typeof slot) || !/^[123]$/.test(String(slot))) {
    throw new Error('Choisissez l’un des trois emplacements du PC sécurité ou de l’école.');
  }
  return { gallery: gallery as ApsGallery, slot: Number(slot) };
}

export function parseApsPhotoCaption(value: unknown): string {
  if (typeof value !== 'string' || value.trim().length < 3 || value.trim().length > 200) {
    throw new Error('Ajoutez une légende de 3 à 200 caractères qui décrit la photo.');
  }
  return value.trim();
}
