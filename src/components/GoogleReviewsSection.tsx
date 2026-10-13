'use client';

import { useMemo, useState } from 'react';
import { GOOGLE_REVIEWS_URL, REVIEW_CATEGORIES, type PublicGoogleReview } from '@/lib/google-reviews';

function ReviewCard({ review }: { review: PublicGoogleReview }) {
  return <article className="flex h-full flex-col rounded-[1.65rem] bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,.07)] ring-1 ring-academy-ink/[.06] dark:bg-academy-elevated dark:ring-white/10">
    <div className="flex items-center gap-3"><div aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-academy-ink font-black text-white">{review.author.charAt(0).toUpperCase()}</div><div className="min-w-0"><h3 className="break-words font-black text-academy-ink">{review.author}</h3><div className="text-academy-gold-strong" aria-label="5 étoiles sur 5">★★★★★</div></div></div>
    {review.categories.length > 0 && <div className="mt-4 flex flex-wrap gap-1.5">{review.categories.map(category => <span key={category} className="rounded-full bg-academy-ink/[.055] px-2.5 py-1 text-xs font-bold text-academy-muted dark:bg-white/[.06]">{category}</span>)}</div>}
    {review.excerpt ? <blockquote className="mt-5 flex-1 whitespace-pre-line text-[0.95rem] leading-7 text-academy-muted">« {review.excerpt} »</blockquote> : <p className="mt-5 flex-1 text-sm italic text-academy-muted">Avis 5 étoiles sans commentaire.</p>}
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-academy-muted">{review.reviewedAt && <time dateTime={review.reviewedAt}>{new Date(review.reviewedAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' })}</time>}<a className="font-bold underline underline-offset-4 hover:text-academy-ink" href={review.sourceUrl} target="_blank" rel="noopener noreferrer">Voir sur Google ↗</a></div>
  </article>;
}

export function GoogleReviewsSection({ reviews }: { reviews: PublicGoogleReview[] }) {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [visibleCount, setVisibleCount] = useState(6);
  const publicReviews = useMemo(() => reviews.filter(review => review.rating === 5), [reviews]);
  const categories = useMemo(() => REVIEW_CATEGORIES.filter(category => publicReviews.some(r => r.categories.includes(category))), [publicReviews]);
  const filtered = useMemo(() => publicReviews.filter(r => activeFilter === 'Tous' || r.categories.includes(activeFilter)), [publicReviews, activeFilter]);

  return <section id="avis-google" className="relative isolate scroll-mt-24 px-4 py-20">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(230,176,58,.14),transparent_28%),linear-gradient(180deg,rgb(var(--surface-elevated)),rgb(var(--background))_76%)]" aria-hidden="true" />
    <div className="page-container max-w-6xl"><div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex rounded-full bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[.2em] text-academy-gold-text shadow-sm dark:bg-white/5">★ Avis Google 5 étoiles</span>
      <h2 className="mt-6 text-3xl font-black tracking-tight text-academy-ink md:text-5xl">Ce sont nos stagiaires qui en parlent le mieux.</h2>
      <p className="mt-5 text-base leading-8 text-academy-muted md:text-lg">APS, A3P, DESP, VTC… découvrez leurs expériences et choisissez les avis de la formation qui vous intéresse.</p>
      <p className="mt-4 text-sm font-bold text-academy-muted">{publicReviews.length > 0 ? `${publicReviews.length} avis 5 étoiles à découvrir` : 'Retrouvez les témoignages de nos stagiaires sur Google.'}</p>
      {publicReviews.length > 0 && <div className="mt-7 flex flex-wrap justify-center gap-2" aria-label="Filtrer les avis par formation">{['Tous', ...categories].map(category => <button key={category} type="button" aria-pressed={activeFilter === category} onClick={() => { setActiveFilter(category); setVisibleCount(6); }} className={`rounded-full px-4 py-2 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-gold ${activeFilter === category ? 'bg-academy-ink text-white dark:bg-white dark:text-academy-ink' : 'bg-white/70 text-academy-muted ring-1 ring-academy-ink/10 dark:bg-white/5 dark:ring-white/10'}`}>{category} <span className="ml-1 opacity-70">{category === 'Tous' ? publicReviews.length : publicReviews.filter(r => r.categories.includes(category)).length}</span></button>)}</div>}
    </div>
    <p className="mt-6 text-center text-sm text-academy-muted" role="status">{publicReviews.length > 0 && `${filtered.length} avis${activeFilter !== 'Tous' ? ` · ${activeFilter}` : ''}`}</p>
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtered.slice(0, visibleCount).map(review => <ReviewCard key={review.id} review={review} />)}</div>
    {filtered.length > visibleCount && <div className="mt-8 text-center"><button type="button" onClick={() => setVisibleCount(count => count + 9)} className="rounded-full bg-academy-ink px-6 py-3 text-sm font-black text-white">Voir plus d’avis ({filtered.length - visibleCount}) ↓</button></div>}
    <div className="mx-auto mt-8 max-w-2xl text-center"><p className="text-xs leading-6 text-academy-muted">Sélection d’avis notés 5 étoiles. Extraits abrégés et orthographe corrigée, sans modification du sens.</p><a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex rounded-full border border-academy-line px-5 py-3 text-sm font-bold text-academy-ink">Consulter tous les avis sur Google ↗</a></div>
    </div>
  </section>;
}
