import { getPrisma } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[a-zA-Z0-9-]{1,64}$/.test(id)) return new Response(null, { status: 404 });
  try {
    const prisma = await getPrisma();
    if (!prisma) return new Response(null, { status: 503 });
    const photo = await prisma.apsGalleryPhoto.findUnique({ where: { id }, select: { image: true } });
    if (!photo) return new Response(null, { status: 404 });
    return new Response(new Uint8Array(photo.image), { headers: {
      'Content-Type': 'image/webp',
      'Content-Length': String(photo.image.length),
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
    } });
  } catch {
    return new Response(null, { status: 503 });
  }
}
