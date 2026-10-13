export const REVIEW_CATEGORIES = [
  'APS', 'MAC APS', 'A3P', 'DESP', 'VAE DESP', 'SSIAP 1', 'SSIAP 2', 'SSIAP 3',
  'Recyclage SSIAP', 'VTC', 'SST', 'MAC SST', 'Habilitations électriques',
  'BTS MOS', 'BTS MCO', 'BTS NDRC', 'BTS CI', 'BTS PI', 'BTS CG',
] as const;

export type ReviewCategory = (typeof REVIEW_CATEGORIES)[number];
export const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps?cid=14373460169956988061';

export type PublicGoogleReview = {
  id: string;
  author: string;
  rating: number;
  excerpt: string;
  categories: string[];
  sourceUrl: string;
  reviewedAt: string | null;
};

export type AdminGoogleReview = PublicGoogleReview & {
  originalText: string;
  published: boolean;
  featured: boolean;
  updatedAt: string;
};

export function parseReviewCategories(value: unknown): ReviewCategory[] {
  if (!Array.isArray(value) || value.some(v => !REVIEW_CATEGORIES.includes(v))) {
    throw new Error('Choisissez les formations dans la liste proposée.');
  }
  return [...new Set(value)] as ReviewCategory[];
}

function requiredText(value: unknown, label: string, max: number): string {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max) {
    throw new Error(`${label} est obligatoire (${max} caractères maximum).`);
  }
  return value.trim();
}

export function parseReviewEdit(value: unknown) {
  if (!value || typeof value !== 'object') throw new Error('Avis invalide.');
  const input = value as Record<string, unknown>;
  if (typeof input.published !== 'boolean' || typeof input.featured !== 'boolean') {
    throw new Error('Statut de publication invalide.');
  }
  const excerpt = typeof input.excerpt === 'string' ? input.excerpt.trim() : '';
  if (excerpt.length > 700) throw new Error('L’extrait doit faire 700 caractères maximum.');
  return {
    excerpt,
    categories: parseReviewCategories(input.categories),
    published: input.published,
    featured: input.featured,
  };
}

export function parseNewReview(value: unknown) {
  const edit = parseReviewEdit(value);
  const input = value as Record<string, unknown>;
  if (input.rating !== 5) throw new Error('Seuls les avis Google notés 5 étoiles peuvent être ajoutés.');
  const author = requiredText(input.author, 'Le nom', 120);
  const originalText = typeof input.originalText === 'string' ? input.originalText.trim() : '';
  if (originalText.length > 15000) throw new Error('Le texte d’origine est trop long.');
  if (originalText && !edit.excerpt) throw new Error('Sélectionnez un extrait de cet avis.');
  let sourceUrl: string;
  try {
    const url = new URL(String(input.sourceUrl));
    if (url.protocol !== 'https:' || url.username || url.password ||
      !['google.com', 'www.google.com', 'maps.google.com', 'google.fr', 'www.google.fr', 'maps.app.goo.gl', 'g.co'].includes(url.hostname)) throw new Error();
    sourceUrl = url.href;
  } catch { throw new Error('Indiquez un lien Google valide en https.'); }
  let reviewedAt: Date | null = null;
  if (input.reviewedAt) {
    if (typeof input.reviewedAt !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(input.reviewedAt)) throw new Error('Date invalide.');
    reviewedAt = new Date(`${input.reviewedAt}T12:00:00Z`);
    if (!Number.isFinite(reviewedAt.getTime()) || reviewedAt.toISOString().slice(0, 10) !== input.reviewedAt) throw new Error('Date invalide.');
  }
  return { ...edit, author, rating: 5, originalText, sourceUrl, reviewedAt };
}

export function matchesReviewCategory(review: Pick<PublicGoogleReview, 'categories'>, filter: string) {
  return filter === 'Tous' || (filter === 'Non classés' ? review.categories.length === 0 : review.categories.includes(filter));
}
