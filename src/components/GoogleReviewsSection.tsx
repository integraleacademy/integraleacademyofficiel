'use client';

import { useMemo, useState } from 'react';
import { GOOGLE_REVIEWS_URL, REVIEW_CATEGORIES, type PublicGoogleReview } from '@/lib/google-reviews';

function ReviewHeader({ review, featured }: { review: PublicGoogleReview; featured: boolean }) {
  return <div className="flex flex-wrap items-start justify-between gap-4">
    <div className="flex min-w-0 items-center gap-3">
      <div aria-hidden="true" className={`${featured ? 'h-12 w-12 rounded-[1.15rem]' : 'h-10 w-10 rounded-2xl text-sm'} grid shrink-0 place-items-center bg-academy-ink font-black text-white shadow-[0_14px_35px_rgba(15,23,42,.12)]`}>{review.author.trim().charAt(0).toUpperCase() || 'A'}</div>
      <div className="min-w-0">
        <h3 className="break-words font-black text-academy-ink">{review.author}</h3>
        <div className="mt-1 flex items-center gap-2"><span className="text-sm text-academy-gold-strong" aria-label="5 étoiles sur 5">★★★★★</span><span aria-hidden="true" className="text-xs font-bold text-academy-muted">5/5</span></div>
      </div>
    </div>
    {review.categories.length > 0 && <div className="flex flex-wrap gap-1.5">{review.categories.map(category => <span key={category} className="rounded-full bg-academy-ink/[.055] px-2.5 py-1 text-[0.68rem] font-bold text-academy-muted ring-1 ring-academy-ink/[.06] dark:bg-white/[.06] dark:ring-white/10">{category}</span>)}</div>}
  </div>;
}

function ReviewText({ text, featured }: { text: string; featured: boolean }) {
  const limit = featured ? 188 : 152;
  const className = featured
    ? 'mt-8 max-w-2xl whitespace-pre-line text-xl font-black leading-9 tracking-tight text-academy-ink md:text-2xl md:leading-10'
    : 'mt-5 whitespace-pre-line text-[0.95rem] leading-7 text-academy-muted';
  if (!text) return <p className="mt-5 text-sm italic text-academy-muted">Avis 5 étoiles sans commentaire.</p>;
  if (text.length <= limit) return <blockquote className={className}>« {text} »</blockquote>;

  const cut = text.lastIndexOf(' ', limit);
  const shortText = `${text.slice(0, cut > 90 ? cut : limit).trim()}…`;
  return <details className={`${className} group/text`}>
    <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
      <span className="group-open/text:hidden">« {shortText} »</span>
      <span className="hidden group-open/text:inline">« {text} »</span>
      <span className="mt-3 block w-fit rounded-full bg-academy-ink/[.06] px-3 py-1.5 text-xs font-black text-academy-ink transition hover:bg-academy-gold/20 dark:bg-white/10 dark:text-white">
        <span className="group-open/text:hidden">Lire la suite</span>
        <span className="hidden group-open/text:inline">Réduire</span>
      </span>
    </summary>
  </details>;
}

function ReviewCard({ review, featured = false }: { review: PublicGoogleReview; featured?: boolean }) {
  return <article className={`relative flex h-full min-w-0 flex-col overflow-hidden bg-white ring-1 ring-academy-ink/[.06] dark:bg-academy-elevated dark:ring-white/10 ${featured ? 'rounded-[2.25rem] p-7 shadow-[0_28px_80px_rgba(15,23,42,.10)] md:p-9' : 'rounded-[1.65rem] p-5 shadow-[0_18px_55px_rgba(15,23,42,.07)]'}`}>
    {featured && <div className="pointer-events-none absolute right-8 top-8 text-6xl font-black leading-none text-academy-gold/[.12]" aria-hidden="true">“</div>}
    <ReviewHeader review={review} featured={featured} />
    <div className="flex-1"><ReviewText text={review.excerpt} featured={featured} /></div>
    {featured && <p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-academy-muted">Avis Google sélectionné</p>}
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-academy-muted">{review.reviewedAt && <time dateTime={review.reviewedAt}>{new Date(review.reviewedAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' })}</time>}<a className="font-bold underline underline-offset-4 hover:text-academy-ink" href={review.sourceUrl} target="_blank" rel="noopener noreferrer">Voir sur Google ↗</a></div>
  </article>;
}

export function GoogleReviewsSection({ reviews }: { reviews: PublicGoogleReview[] }) {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const publicReviews = useMemo(() => reviews.filter(review => review.rating === 5), [reviews]);
  const categories = useMemo(() => REVIEW_CATEGORIES.filter(category => publicReviews.some(r => r.categories.includes(category))), [publicReviews]);
  const filtered = useMemo(() => publicReviews.filter(r => activeFilter === 'Tous' || r.categories.includes(activeFilter)), [publicReviews, activeFilter]);
  const [featuredReview, ...remainingReviews] = filtered;
  const secondaryReviews = remainingReviews.slice(0, 2);
  const moreReviews = remainingReviews.slice(2);

  return <section id="avis-google" className="relative isolate scroll-mt-24 px-4 py-20">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(230,176,58,.14),transparent_28%),linear-gradient(180deg,rgb(var(--surface-elevated)),rgb(var(--background))_76%)]" aria-hidden="true" />
    <div className="page-container max-w-6xl"><div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex rounded-full bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[.2em] text-academy-gold-text shadow-sm dark:bg-white/5">★ Avis Google</span>
      <h2 className="mt-6 text-3xl font-black tracking-tight text-academy-ink md:text-5xl">Ce sont nos stagiaires qui en parlent le mieux.</h2>
      <p className="mt-4 text-sm font-bold text-academy-muted">{publicReviews.length > 0 ? `${publicReviews.length} avis à découvrir` : 'Retrouvez les témoignages de nos stagiaires sur Google.'}</p>
      {publicReviews.length > 0 && <div className="mt-7 flex flex-wrap justify-center gap-2" aria-label="Filtrer les avis par formation">{['Tous', ...categories].map(category => <button key={category} type="button" aria-pressed={activeFilter === category} onClick={() => setActiveFilter(category)} className={`rounded-full px-4 py-2 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-gold ${activeFilter === category ? 'bg-academy-ink text-white dark:bg-white dark:text-academy-ink' : 'bg-white/70 text-academy-muted ring-1 ring-academy-ink/10 dark:bg-white/5 dark:ring-white/10'}`}>{category} <span className="ml-1 opacity-70">{category === 'Tous' ? publicReviews.length : publicReviews.filter(r => r.categories.includes(category)).length}</span></button>)}</div>}
    </div>
    <p className="mt-6 text-center text-sm text-academy-muted" role="status">{publicReviews.length > 0 && `${filtered.length} avis${activeFilter !== 'Tous' ? ` · ${activeFilter}` : ''}`}</p>
    {featuredReview && <div className={`mt-10 grid gap-5 ${secondaryReviews.length > 0 ? 'lg:grid-cols-[1.18fr_.82fr] lg:items-stretch' : ''}`}>
      <ReviewCard key={featuredReview.id} review={featuredReview} featured />
      {secondaryReviews.length > 0 && <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">{secondaryReviews.map(review => <ReviewCard key={review.id} review={review} />)}</div>}
    </div>}
    {moreReviews.length > 0 && <details key={activeFilter} className="group/more mt-7">
      <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 rounded-full bg-academy-ink px-5 py-3 text-sm font-black text-white shadow-[0_18px_45px_rgba(15,23,42,.14)] transition hover:-translate-y-0.5 hover:bg-black [&::-webkit-details-marker]:hidden">
        <span className="group-open/more:hidden">Voir plus d’avis ({moreReviews.length})</span>
        <span className="hidden group-open/more:inline">Masquer les avis</span>
        <span aria-hidden="true" className="transition group-open/more:rotate-180">↓</span>
      </summary>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{moreReviews.map(review => <ReviewCard key={review.id} review={review} />)}</div>
    </details>}
    <div className="mx-auto mt-8 max-w-2xl text-center"><p className="text-xs leading-6 text-academy-muted">Sélection d’avis notés 5 étoiles. Extraits abrégés et orthographe corrigée, sans modification du sens.</p><a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex rounded-full border border-academy-line px-5 py-3 text-sm font-bold text-academy-ink">Consulter tous les avis sur Google ↗</a></div>
    </div>
  </section>;
}
