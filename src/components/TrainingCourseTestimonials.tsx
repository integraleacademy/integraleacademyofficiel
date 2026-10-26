import { listPublicGoogleReviews } from '@/lib/google-reviews-data';
import { GOOGLE_REVIEWS_URL } from '@/lib/google-reviews';
import styles from './SsiapReferencePage.module.css';
import { GoogleReviewsSection } from './GoogleReviewsSection';

export async function TrainingCourseTestimonials({ category, layout = 'course', audience = 'stagiaires' }: { category: string; layout?: 'course' | 'home'; audience?: 'stagiaires' | 'étudiants' }) {
  const courseReviews = (await listPublicGoogleReviews()).filter(review => review.categories.includes(category) && review.excerpt.trim());
  if (layout === 'home') return <GoogleReviewsSection reviews={courseReviews} audience={audience} />;
  const reviews = courseReviews.slice(0, 3);
  return <section className={styles.testimonials} aria-labelledby="course-reviews-title"><div className={styles.container}>
    <div className={styles.sectionHead}><div><p className={styles.eyebrow}>Les retours de nos stagiaires</p><h2 id="course-reviews-title" className={styles.sectionTitle}>Leur formation.<br /><em>Leurs mots.</em></h2></div><a className={styles.textLink} href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">Consulter les avis sur Google ↗</a></div>
    {reviews.length ? <div className={styles.reviewGrid}>{reviews.map(review => <figure key={review.id} className={styles.review}><span className={styles.stars} aria-label="5 étoiles sur 5">★★★★★</span><blockquote>« {review.excerpt} »</blockquote><figcaption><span className={styles.avatar} aria-hidden="true">{review.author.charAt(0)}</span><div><strong>{review.author}</strong><span>Avis Google · {category}</span></div><a href={review.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`Lire l’avis de ${review.author} sur Google`}>↗</a></figcaption></figure>)}</div> : <p className={styles.intro}>Découvrez les expériences de nos stagiaires sur la fiche Google d’Intégrale Academy.</p>}
  </div></section>;
}
