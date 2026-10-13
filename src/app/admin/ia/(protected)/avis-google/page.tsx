import { listAdminGoogleReviews } from '@/lib/google-reviews-data';
import { GoogleReviewManager } from './GoogleReviewManager';

export const dynamic = 'force-dynamic';

export default async function GoogleReviewsAdminPage() {
  let reviews;
  try { reviews = await listAdminGoogleReviews(); }
  catch { return <div role="alert" className="rounded-2xl bg-white p-6 text-red-800">La gestion des avis est temporairement indisponible. Rechargez la page dans un instant.</div>; }
  return <GoogleReviewManager initialReviews={reviews} />;
}
