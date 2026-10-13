import 'server-only';
import { getPrisma } from '@/lib/db';
import type { AdminGoogleReview, PublicGoogleReview } from './google-reviews';

type ReviewRow = {
  id: string; author: string; rating: number; originalText: string; excerpt: string;
  categories: string[]; sourceUrl: string; reviewedAt: Date | null;
  published: boolean; featured: boolean; updatedAt: Date;
};

export function serializeGoogleReview(row: ReviewRow): AdminGoogleReview {
  return { ...row, reviewedAt: row.reviewedAt?.toISOString() ?? null, updatedAt: row.updatedAt.toISOString() };
}

export async function listAdminGoogleReviews() {
  const db = await getPrisma();
  if (!db) throw new Error('La gestion des avis est temporairement indisponible.');
  return (await db.googleReview.findMany({ orderBy: [{ featured: 'desc' }, { reviewedAt: 'desc' }, { id: 'asc' }] })).map(serializeGoogleReview);
}

export async function listPublicGoogleReviews(): Promise<PublicGoogleReview[]> {
  try {
    const db = await getPrisma();
    if (!db) return [];
    const rows = await db.googleReview.findMany({
      where: { rating: 5, published: true },
      orderBy: [{ featured: 'desc' }, { reviewedAt: 'desc' }, { id: 'asc' }],
      select: { id: true, author: true, rating: true, excerpt: true, categories: true, sourceUrl: true, reviewedAt: true },
    });
    return rows.map(row => ({ ...row, reviewedAt: row.reviewedAt?.toISOString() ?? null }));
  } catch (error) {
    console.error('Lecture des avis Google indisponible.', error instanceof Error ? error.name : 'Erreur');
    return [];
  }
}
