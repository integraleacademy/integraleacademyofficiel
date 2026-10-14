import { listPublicGoogleReviews } from '@/lib/google-reviews-data';
import { GOOGLE_REVIEWS_URL } from '@/lib/google-reviews';
import styles from './SsiapReferencePage.module.css';
import experience from './SsiapExperience.module.css';

export async function SsiapTestimonials() {
  const reviews = (await listPublicGoogleReviews()).filter(review => review.categories.includes('SSIAP 1') && review.excerpt.trim()).slice(0, 3);
  const reviewFigure = (review: typeof reviews[number], featured = false) => <figure key={review.id} className={featured ? experience.featuredReview : undefined} data-long={review.excerpt.length > 300}><span className={experience.reviewStars} aria-label="5 étoiles sur 5">★★★★★</span><blockquote>« {review.excerpt} »</blockquote><figcaption className={experience.reviewAuthor}><span aria-hidden="true">{review.author.charAt(0)}</span><div><strong>{review.author}</strong><small>Avis Google · SSIAP 1</small></div><a href={review.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`Lire l’avis de ${review.author} sur Google`}>↗</a></figcaption></figure>;
  return <section id="avis-ssiap" className={experience.reviewsSection} aria-labelledby="avis-ssiap-title"><div className={styles.container}>
    <div className={experience.reviewHeading}><div><p className={experience.eyebrow}>Les retours de nos stagiaires</p><h2 id="avis-ssiap-title" className={styles.sectionTitle}>Leur formation.<br /><em>Leurs mots.</em></h2></div><a className={styles.textLink} href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">Consulter les avis sur Google ↗</a></div>
    {reviews.length > 0 ? <div className={experience.reviewsComposition}>{reviewFigure(reviews[0], true)}{reviews.length > 1 && <div className={experience.otherReviews}>{reviews.slice(1).map(review => reviewFigure(review))}</div>}</div> : <p className={styles.intro}>Découvrez les expériences de nos stagiaires sur la fiche Google d’Intégrale Academy.</p>}
  </div></section>;
}
