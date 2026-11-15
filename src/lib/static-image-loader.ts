import type { ImageLoaderProps } from 'next/image';
import sources from '@/data/image-variants.json';

const assets: Record<string, (string | number)[]> = sources;

/** Serve build-time variants; keep original URLs for SVGs, uploads and small originals. */
export default function staticImageLoader({ src, width }: ImageLoaderProps): string {
  const asset = assets[src.split('?')[0]];
  if (!asset || width >= Number(asset[1])) return src;
  return `/responsive-images/${asset[0]}-${width}.webp`;
}
