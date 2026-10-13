import { createHash } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin/guard';
import { isAllowedAdminOrigin } from '@/lib/admin/request-origin';
import { getPrisma } from '@/lib/db';
import { parseNewReview, parseReviewEdit } from '@/lib/google-reviews';
import { listAdminGoogleReviews, serializeGoogleReview } from '@/lib/google-reviews-data';

export const runtime = 'nodejs';

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  try { return NextResponse.json({ reviews: await listAdminGoogleReviews() }, { headers: { 'Cache-Control': 'private, no-store' } }); }
  catch { return NextResponse.json({ error: 'La lecture des avis est temporairement indisponible.' }, { status: 503 }); }
}

async function readInput(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return { denied };
  if (!isAllowedAdminOrigin(request)) return { denied: NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 }) };
  const text = await request.text();
  if (text.length > 24000) return { denied: NextResponse.json({ error: 'L’avis est trop long.' }, { status: 413 }) };
  try { return { body: JSON.parse(text) }; }
  catch { return { denied: NextResponse.json({ error: 'Avis invalide.' }, { status: 400 }) }; }
}

function refresh() {
  revalidatePath('/');
  revalidatePath('/admin/ia/avis-google');
}

export async function PATCH(request: NextRequest) {
  const { denied, body } = await readInput(request);
  if (denied) return denied;
  let data;
  try {
    data = parseReviewEdit(body);
    if (typeof body.id !== 'string' || typeof body.updatedAt !== 'string' || !Number.isFinite(Date.parse(body.updatedAt))) throw new Error('Avis invalide.');
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Avis invalide.' }, { status: 400 }); }
  try {
    const db = await getPrisma();
    if (!db) throw new Error('Database unavailable');
    // The version guard prevents two open admin tabs from silently overwriting each other.
    const saved = await db.$transaction(async tx => {
      const existing = await tx.googleReview.findUnique({ where: { id: body.id } });
      if (!existing) return { status: 404, error: 'Cet avis est introuvable.' };
      if (existing.originalText && !data.excerpt) return { status: 400, error: 'Sélectionnez un extrait de cet avis avant d’enregistrer.' };
      const result = await tx.googleReview.updateMany({
        where: { id: body.id, updatedAt: new Date(body.updatedAt), rating: 5 }, data,
      });
      if (!result.count) return { status: 409, error: 'Cet avis a été modifié dans une autre fenêtre. Rechargez la page avant de réessayer.' };
      const review = await tx.googleReview.findUniqueOrThrow({ where: { id: body.id } });
      return { review: serializeGoogleReview(review) };
    });
    if ('error' in saved) return NextResponse.json({ error: saved.error }, { status: saved.status });
    refresh();
    return NextResponse.json(saved);
  } catch {
    return NextResponse.json({ error: 'L’avis n’a pas été enregistré. Réessayez dans un instant.' }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  const { denied, body } = await readInput(request);
  if (denied) return denied;
  let data;
  try { data = parseNewReview(body); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Avis invalide.' }, { status: 400 }); }
  try {
    const db = await getPrisma();
    if (!db) throw new Error('Database unavailable');
    const sourceId = `manual:${createHash('sha256').update(`${data.author.toLowerCase()}|${data.reviewedAt?.toISOString() ?? ''}|${data.originalText}`).digest('hex')}`;
    const duplicate = await db.googleReview.findFirst({ where: { OR: [
      { sourceId },
      { author: { equals: data.author, mode: 'insensitive' }, reviewedAt: data.reviewedAt },
    ] } });
    if (duplicate) return NextResponse.json({ error: 'Cet avis existe déjà. Retrouvez-le dans la liste pour le modifier.' }, { status: 409 });
    const review = await db.googleReview.create({ data: { ...data, sourceId } });
    refresh();
    return NextResponse.json({ review: serializeGoogleReview(review) }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'L’avis n’a pas été ajouté. Réessayez dans un instant.' }, { status: 503 });
  }
}
