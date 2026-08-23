'use client';

import { useMemo, useState } from 'react';

const googleRating = '4,8';
const googleReviewsCount = '15 avis sélectionnés';

const reviews = [
  {
    name: 'Mee-Kyung K.',
    rating: 5,
    category: 'A3P',
    text: 'Une formation A3P exceptionnelle, clairement au-dessus de ce que j’ai pu voir ailleurs. Exigeante, réaliste et ultra-professionnalisante, elle prépare vraiment au terrain.',
  },
  {
    name: 'Emma-Rosa B.',
    rating: 5,
    category: 'APS',
    text: 'J’ai passé la formation APS avec Abdel, que je souhaite remercier infiniment pour son professionnalisme, sa pédagogie et son attention. J’ai passé cinq semaines remplies de connaissances, de compétences, mais aussi de bons moments.',
  },
  {
    name: 'Mathys C.',
    rating: 5,
    category: 'Agent de sécurité',
    text: 'Les locaux sont propres, bien équipés et agréables. L’ambiance est sérieuse mais conviviale. La formation est complète, bien organisée, avec un bon équilibre entre théorie et pratique.',
  },
  {
    name: 'Nelson D.',
    rating: 5,
    category: 'Sécurité privée',
    text: 'L’équipe est professionnelle, à l’écoute et très investie dans la réussite des stagiaires. Les formations sont claires, dynamiques et parfaitement adaptées aux exigences du terrain.',
  },
  {
    name: 'Mehdi A.',
    rating: 5,
    category: 'Protection rapprochée',
    text: '9 semaines de formation très enrichissantes et de qualité. Une équipe en or. Nous avons tous obtenu notre titre à finalité professionnelle : 100 % de réussite à cette session.',
  },
  {
    name: 'Joëlle B.',
    rating: 5,
    category: 'APS',
    text: 'Excellent établissement de formation. Je recommande cet établissement pour son sérieux et sa qualité pédagogique. La méthodologie de travail, la pédagogie et le sens du travail structuré ont rendu la formation vivante et accessible à tous.',
  },
  {
    name: 'Mee-Kyung K.',
    rating: 5,
    category: 'APS',
    text: 'Une formation de grande qualité avec un accompagnement au top. Le formateur prend vraiment le temps d’expliquer, de répondre aux questions et de mettre tout le monde en confiance.',
  },
  {
    name: 'Shin S.',
    rating: 5,
    category: 'APS',
    text: 'Une formation APS sérieuse et très complète, qui vous propulse en un mois dans le monde de la sécurité en vous accompagnant jusqu’à la réussite.',
  },
  {
    name: 'Marie M.',
    rating: 5,
    category: 'APS',
    text: 'Un formateur vraiment au top : bienveillant, à l’écoute, patient et très pédagogue. Il a su me mettre en confiance, me motiver et m’accompagner jusqu’au bout.',
  },
  {
    name: 'Romain F.',
    rating: 5,
    category: 'Protection rapprochée',
    text: 'Une formation très intéressante dans tous les domaines de la protection rapprochée. Une formation sérieuse à conseiller.',
  },
  {
    name: 'Amélie M.',
    rating: 5,
    category: 'VTC',
    text: 'Très bon centre de formation. Les cours sont très complets pour la formation VTC. Le personnel est disponible et très agréable. Examens obtenus avec succès.',
  },
  {
    name: 'TheKaiman1981',
    rating: 5,
    category: 'VTC',
    text: 'J’ai suivi la formation de chauffeur VTC avec Intégrale Formation en e-learning. Ils ont été à l’écoute et disponibles. Je recommande.',
  },
  {
    name: 'Sheyveen E.',
    rating: 5,
    category: 'Protection rapprochée',
    text: 'La formation était vraiment qualitative en tout point. Les professeurs et intervenants sont très pédagogues et savent nous amener vers le monde exigeant de la protection rapprochée.',
  },
  {
    name: 'Scorpion O.',
    rating: 5,
    category: 'Protection rapprochée',
    text: 'Centre superbe, accueil et bureaux très professionnels. Cette formation a répondu à mes attentes. Une superbe équipe, une grande famille.',
  },
  {
    name: 'Sascha A.',
    rating: 5,
    category: 'Protection rapprochée',
    text: 'Un très bon centre de formation. Le directeur du centre est toujours présent et à l’écoute des stagiaires. Le niveau d’équipement est très correct. Je recommande.',
  },
];

const featuredCategories = ['Tous', 'APS', 'A3P', 'Protection rapprochée', 'VTC'];
const apsEquivalentCategories = ['APS', 'Sécurité privée', 'Agent de sécurité'];
const excerptLimit = 165;

type Review = (typeof reviews)[number];
type ReviewFilter = (typeof featuredCategories)[number];

function matchesReviewFilter(review: Review, filter: ReviewFilter){
  if(filter === 'Tous') return true;
  if(filter === 'APS') return apsEquivalentCategories.includes(review.category);
  return review.category === filter;
}

function getFilterLabel(filter: ReviewFilter){
  if(filter === 'APS') return 'APS / Sécurité privée / Agent de sécurité';
  return filter;
}

function Stars({ rating, subtle = false }: { rating: number; subtle?: boolean }){
  return <div className={`flex gap-0.5 ${subtle ? 'text-sm' : 'text-base'} text-academy-gold-strong`} aria-label={`${rating} étoiles sur 5`}>
    {Array.from({ length: 5 }).map((_, index) => <span key={index} className={index < rating ? 'text-academy-gold-strong' : 'text-academy-line'} aria-hidden="true">★</span>)}
  </div>
}

function getInitial(name: string){
  return name.trim().charAt(0).toUpperCase() || 'A';
}

function getShortText(text: string, limit = excerptLimit){
  if(text.length <= limit) return text;
  const cut = text.lastIndexOf(' ', limit);
  return `${text.slice(0, cut > 90 ? cut : limit).trim()}…`;
}

function FormationBadge({ category }: { category: string }){
  return <span className="rounded-full bg-academy-ink/[.055] px-2.5 py-1 text-[0.68rem] font-bold text-academy-muted ring-1 ring-academy-ink/[.06] dark:bg-white/[.06] dark:text-white/70 dark:ring-white/10">{category}</span>
}

function ReviewHeader({ review, compact = false }: { review: Review; compact?: boolean }){
  return <div className="flex items-start justify-between gap-4">
    <div className="flex min-w-0 items-center gap-3">
      <div className={`${compact ? 'h-10 w-10 rounded-2xl text-sm' : 'h-12 w-12 rounded-[1.15rem] text-base'} grid shrink-0 place-items-center bg-academy-ink text-white shadow-[0_14px_35px_rgba(15,23,42,.12)]`} aria-hidden="true">{getInitial(review.name)}</div>
      <div className="min-w-0">
        <h3 className="truncate font-black text-academy-ink">{review.name}</h3>
        <div className="mt-1 flex items-center gap-2"><Stars rating={review.rating} subtle/><span className="text-xs font-bold text-academy-muted">{review.rating}/5</span></div>
      </div>
    </div>
    <FormationBadge category={review.category}/>
  </div>
}

function ExpandableReviewText({ text, limit, className }: { text: string; limit: number; className: string }){
  const isLong = text.length > limit;
  if(!isLong) return <p className={className}>“{text}”</p>;

  return <details className={`${className} group/text`}>
    <summary className="list-none [&::-webkit-details-marker]:hidden">
      <span className="group-open/text:hidden">“{getShortText(text, limit)}”</span>
      <span className="hidden group-open/text:inline">“{text}”</span>
      <span className="mt-3 block w-fit cursor-pointer rounded-full bg-academy-ink/[.06] px-3 py-1.5 text-xs font-black text-academy-ink transition hover:bg-academy-gold/20 dark:bg-white/10 dark:text-white">
        <span className="group-open/text:hidden">Lire l’avis complet</span>
        <span className="hidden group-open/text:inline">Réduire l’avis</span>
      </span>
    </summary>
  </details>
}

function FeaturedCard({ review }: { review: Review }){
  return <article className="relative overflow-hidden rounded-[2.25rem] bg-white p-7 shadow-[0_28px_80px_rgba(15,23,42,.10)] ring-1 ring-academy-ink/[.06] md:p-9 dark:bg-academy-elevated dark:ring-white/10">
    <div className="pointer-events-none absolute right-8 top-8 text-6xl font-black leading-none text-academy-gold/[.12]" aria-hidden="true">“</div>
    <ReviewHeader review={review}/>
    <ExpandableReviewText text={review.text} limit={188} className="mt-8 max-w-2xl text-xl font-black leading-9 tracking-tight text-academy-ink md:text-2xl md:leading-10"/>
    <p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-academy-muted">Avis Google sélectionné</p>
  </article>
}

function ReviewCard({ review, compact = false }: { review: Review; compact?: boolean }){
  return <article className="flex h-full flex-col rounded-[1.65rem] bg-white/88 p-5 shadow-[0_18px_55px_rgba(15,23,42,.07)] ring-1 ring-academy-ink/[.055] backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_65px_rgba(15,23,42,.10)] dark:bg-academy-elevated/85 dark:ring-white/10">
    <ReviewHeader review={review} compact/>
    <ExpandableReviewText text={review.text} limit={compact ? 132 : 152} className={`${compact ? 'mt-5 text-sm leading-7' : 'mt-6 text-[0.95rem] leading-7'} flex-1 text-academy-muted`}/>
  </article>
}

export function GoogleReviewsSection(){
  const [activeFilter, setActiveFilter] = useState<ReviewFilter>('Tous');
  const filteredReviews = useMemo(() => reviews.filter((review) => matchesReviewFilter(review, activeFilter)), [activeFilter]);
  const [featuredReview, ...remainingReviews] = filteredReviews;
  const secondaryReviews = remainingReviews.slice(0, 2);
  const moreReviews = remainingReviews.slice(2);

  return <section id="avis-google" className="relative isolate scroll-mt-24 overflow-visible px-4 pb-20 pt-[4.5rem] md:pb-20 md:pt-24">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(230,176,58,.14),transparent_28%),linear-gradient(180deg,rgb(var(--surface-elevated)),rgb(var(--background))_76%)]" aria-hidden="true"/>
    <div className="page-container max-w-6xl overflow-visible">
      <div className="mx-auto max-w-3xl text-center reveal">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-[0.7rem] font-black uppercase tracking-[.22em] text-academy-gold-text shadow-sm ring-1 ring-academy-ink/[.06] backdrop-blur dark:bg-white/5 dark:ring-white/10"><span aria-hidden="true">★</span> Avis Google</span>
        <h2 className="mt-6 text-3xl font-black tracking-tight text-academy-ink md:text-5xl">Ce sont nos stagiaires qui en parlent le mieux.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-academy-muted md:text-lg">Formations APS, A3P, protection rapprochée, VTC… découvrez les retours de celles et ceux qui nous ont fait confiance.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-bold text-academy-muted">
          <Stars rating={5} subtle/>
          <span className="text-academy-ink">{googleRating}/5</span>
          <span aria-hidden="true">·</span>
          <span>{googleReviewsCount}</span>
          <span aria-hidden="true">·</span>
          <span>aucune réponse établissement affichée</span>
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2" role="list" aria-label="Filtrer les avis par formation">
          {featuredCategories.map((category) => {
            const isActive = activeFilter === category;
            return <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              aria-pressed={isActive}
              title={getFilterLabel(category)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-gold ${isActive ? 'bg-academy-ink text-white shadow-[0_10px_24px_rgba(15,23,42,.12)] dark:bg-white dark:text-academy-ink' : 'text-academy-muted ring-1 ring-academy-ink/[.08] hover:bg-academy-ink/[.04] dark:ring-white/10 dark:hover:bg-white/[.06]'}`}
            >{category}</button>
          })}
        </div>
        <p className="mt-3 text-xs font-semibold text-academy-muted" aria-live="polite">
          {filteredReviews.length} avis affiché{filteredReviews.length > 1 ? 's' : ''}{activeFilter === 'APS' ? ' · APS, Sécurité privée et Agent de sécurité regroupés' : ''}
        </p>
      </div>

      <div className="reveal mt-12 grid gap-5 lg:grid-cols-[1.18fr_.82fr] lg:items-stretch">
        <FeaturedCard review={featuredReview}/>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {secondaryReviews.map((review) => <ReviewCard key={`${review.name}-${review.category}`} review={review}/>)}
        </div>
      </div>

      <details className="group/more reveal mt-7 h-auto overflow-visible">
        <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 rounded-full bg-academy-ink px-5 py-3 text-sm font-black text-white shadow-[0_18px_45px_rgba(15,23,42,.14)] transition hover:-translate-y-0.5 hover:bg-black [&::-webkit-details-marker]:hidden">
          <span className="group-open/more:hidden">Voir plus d’avis</span>
          <span className="hidden group-open/more:inline">Masquer les avis</span>
          <span aria-hidden="true" className="transition group-open/more:rotate-180">↓</span>
        </summary>
        <div className="mt-8 grid h-auto gap-4 overflow-visible pb-0 sm:grid-cols-2 lg:grid-cols-3">
          {moreReviews.map((review, index) => <div key={`${review.name}-${review.category}-${index}`} className="min-w-0"><ReviewCard review={review} compact/></div>)}
        </div>
      </details>

      <div className="reveal mx-auto mt-12 flex max-w-3xl flex-col items-center justify-between gap-5 rounded-[2rem] bg-white/70 p-5 text-center shadow-[0_18px_60px_rgba(15,23,42,.07)] ring-1 ring-academy-ink/[.055] backdrop-blur sm:flex-row sm:text-left dark:bg-white/[.04] dark:ring-white/10">
        <div>
          <p className="text-sm font-black text-academy-ink">Prêt à choisir votre formation ?</p>
          <p className="mt-1 text-sm leading-6 text-academy-muted">Un conseiller peut vous orienter vers le parcours le plus adapté.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="/formations-securite" className="rounded-full border border-academy-ink/10 bg-white px-4 py-2.5 text-sm font-black text-academy-ink transition hover:-translate-y-0.5 hover:border-academy-gold/40 dark:border-white/10 dark:bg-white/5">Découvrir nos formations</a>
          <a href="/contact" className="rounded-full bg-academy-gold px-4 py-2.5 text-sm font-black text-academy-gold-text shadow-gold transition hover:-translate-y-0.5">Parler à un conseiller</a>
        </div>
      </div>
    </div>
  </section>
}
