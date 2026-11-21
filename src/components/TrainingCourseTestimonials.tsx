import { listPublicGoogleReviews } from '@/lib/google-reviews-data';
import { GOOGLE_REVIEWS_URL } from '@/lib/google-reviews';
import styles from './SsiapReferencePage.module.css';
import cards from './GoogleReviewsSection.module.css';
import { GoogleReviewsSection, type ReviewSectionCopy } from './GoogleReviewsSection';

export const courseReviewCopy: ReviewSectionCopy = {
  headingId: 'course-reviews-title', title: 'Leur formation. Leurs mots', eyebrow: 'Les retours de nos stagiaires',
  empty: 'Découvrez les expériences de nos stagiaires sur la fiche Google d’Intégrale Academy.',
  sourceLabel: 'Consulter les avis sur Google ↗',
};

function ReviewQuote({ text }: { text: string }) {
  if (text.length <= 240) return <blockquote>« {text} »</blockquote>;
  return <details className={styles.reviewMore}>
    <summary><span className={styles.reviewExcerpt}>« {text.slice(0, 220).trimEnd()}… »</span><span className={styles.reviewReadMore}>Lire l’avis complet</span></summary>
    <blockquote>« {text} »</blockquote>
  </details>;
}

export async function TrainingCourseTestimonials({ category, layout = 'course', audience = 'stagiaires', copy }: { category: string; copy?: ReviewSectionCopy; layout?: 'course' | 'home' | 'editorial'; audience?: 'stagiaires' | 'étudiants' }) {
  const courseReviews = (await listPublicGoogleReviews()).filter(review => review.categories.includes(category) && review.excerpt.trim());
  if (layout === 'home') return <GoogleReviewsSection reviews={courseReviews} audience={audience} copy={copy} />;
  const reviews = courseReviews.slice(0, 3);
  if (layout === 'editorial') return <section aria-labelledby="course-reviews-title" className="relative scroll-mt-24 bg-academy-bg px-4 py-20">
    <div className="page-container max-w-6xl">
      <header className="mx-auto max-w-3xl text-center">
        <p className={styles.eyebrow}>Les retours de nos stagiaires</p>
        <h2 id="course-reviews-title" className="mt-6 text-3xl font-black tracking-tight text-academy-ink md:text-5xl">Leur formation. Leurs mots</h2>
      </header>
      {reviews.length ? <div className={cards.reviewRow} data-count={reviews.length}>
        {reviews.map((review, index) => <figure key={review.id} className={`${cards.card} ${index === 0 ? cards.featured : ''}`}>
          <figcaption className={cards.header}>
            <div className="flex min-w-0 items-center gap-3">
              <span className={cards.avatar} aria-hidden="true">{review.author.charAt(0)}</span>
              <div><strong className={cards.author}>{review.author}</strong><div className={cards.stars} aria-label="5 étoiles sur 5">★★★★★</div></div>
            </div>
            <span className={cards.category}>Avis Google · {category}</span>
          </figcaption>
          <div className={`${cards.quote} ${index === 0 ? cards.largeQuote : ''}`}><ReviewQuote text={review.excerpt} /></div>
          <div className={cards.footer}><a className={cards.sourceLink} href={review.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`Lire l’avis de ${review.author} sur Google`}>↗</a></div>
        </figure>)}
      </div> : <p className="mt-6 text-center">Découvrez les expériences de nos stagiaires sur la fiche Google d’Intégrale Academy.</p>}
      <div className="mt-8 text-center"><a className="inline-flex rounded-full border border-academy-line px-5 py-3 text-sm font-bold" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">Consulter les avis sur Google ↗</a></div>
    </div>
  </section>;
  return <section className={styles.testimonials} aria-labelledby="course-reviews-title"><div className={styles.container}>
    <div className={styles.sectionHead}><div><p className={styles.eyebrow}>Les retours de nos stagiaires</p><h2 id="course-reviews-title" className={styles.sectionTitle}>Leur formation.<br /><em>Leurs mots</em></h2></div><a className={styles.textLink} href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">Consulter les avis sur Google ↗</a></div>
    {reviews.length ? <div className={styles.reviewGrid}>{reviews.map((review, index) => <figure key={review.id} className={`${styles.review} ${index === 0 ? styles.reviewFeatured : ''}`}><span className={styles.stars} aria-label="5 étoiles sur 5">★★★★★</span><ReviewQuote text={review.excerpt} /><figcaption><span className={styles.avatar} aria-hidden="true">{review.author.charAt(0)}</span><div><strong>{review.author}</strong><span>Avis Google · {category}</span></div><a href={review.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`Lire l’avis de ${review.author} sur Google`}>↗</a></figcaption></figure>)}</div> : <p className={styles.intro}>Découvrez les expériences de nos stagiaires sur la fiche Google d’Intégrale Academy.</p>}
  </div></section>;
}
