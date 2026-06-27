const googleRating = '4,9';
const googleReviewsCount = 'à remplacer';
const googleReviewsUrl = '#'; // TODO: remplacer par l’URL officielle de la fiche Google / des avis Google.

const reviews = [
  {
    name: 'Nom à remplacer',
    rating: 5,
    date: 'Il y a 2 mois',
    text: 'Avis Google à remplacer par un vrai avis. Exemple temporaire : un accompagnement clair, une équipe disponible et une expérience de formation rassurante.',
  },
  {
    name: 'Prénom à remplacer',
    rating: 5,
    date: 'Il y a 3 mois',
    text: 'Avis Google à remplacer par un vrai avis. Exemple temporaire : des conseils utiles, un parcours lisible et un suivi sérieux jusqu’à l’inscription.',
  },
  {
    name: 'Initiale à remplacer',
    rating: 5,
    date: 'Il y a 4 mois',
    text: 'Avis Google à remplacer par un vrai avis. Exemple temporaire : une équipe humaine, professionnelle et attentive au projet de chaque apprenant.',
  },
  {
    name: 'Nom à remplacer',
    rating: 5,
    date: 'Il y a 5 mois',
    text: 'Avis Google à remplacer par un vrai avis. Exemple temporaire : des informations précises, une prise en charge rapide et une formation bien structurée.',
  },
  {
    name: 'Prénom à remplacer',
    rating: 5,
    date: 'Il y a 6 mois',
    text: 'Avis Google à remplacer par un vrai avis. Exemple temporaire : un centre sérieux, une pédagogie accessible et un cadre de travail motivant.',
  },
  {
    name: 'Initiale à remplacer',
    rating: 5,
    date: 'Il y a 7 mois',
    text: 'Avis Google à remplacer par un vrai avis. Exemple temporaire : un contact fluide, des réponses concrètes et un sentiment de confiance dès le départ.',
  },
];

type Review = (typeof reviews)[number];

function Stars({ rating }: { rating: number }){
  return <div className="flex gap-0.5 text-academy-gold-strong" aria-label={`${rating} étoiles sur 5`}>
    {Array.from({ length: 5 }).map((_, index) => <span key={index} className={index < rating ? 'text-academy-gold-strong' : 'text-academy-line'} aria-hidden="true">★</span>)}
  </div>
}

function getInitial(name: string){
  return name.trim().charAt(0).toUpperCase() || 'A';
}

function ReviewCard({ review }: { review: Review }){
  return <article className="group flex h-full min-h-[17rem] flex-col rounded-[1.75rem] border border-academy-line bg-academy-surface p-6 shadow-[0_18px_45px_rgba(54,40,20,.08)] transition duration-300 hover:-translate-y-1 hover:border-academy-gold/45 hover:shadow-soft dark:border-white/10 dark:bg-academy-elevated">
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-academy-gold-soft to-academy-gold text-base font-black text-academy-gold-text shadow-gold" aria-hidden="true">{getInitial(review.name)}</div>
        <div>
          <h3 className="font-black text-academy-ink">{review.name}</h3>
          <p className="mt-1 text-xs font-semibold text-academy-muted">{review.date}</p>
        </div>
      </div>
      <span className="rounded-full border border-academy-line bg-academy-bg px-3 py-1 text-[0.68rem] font-black uppercase tracking-[.14em] text-academy-muted dark:border-white/10">Google</span>
    </div>
    <div className="mt-5"><Stars rating={review.rating}/></div>
    <p className="mt-5 flex-1 text-sm leading-7 text-academy-muted">“{review.text}”</p>
    <div className="mt-6 h-px bg-gradient-to-r from-transparent via-academy-line to-transparent" aria-hidden="true"/>
  </article>
}

export function GoogleReviewsSection(){
  return <section className="relative isolate overflow-hidden px-4 py-16 md:py-20">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_10%,rgba(230,176,58,.18),transparent_30%),linear-gradient(180deg,rgb(var(--surface-elevated)),rgb(var(--background)))]" aria-hidden="true"/>
    <div className="absolute -right-28 top-10 -z-10 h-72 w-72 rounded-full bg-academy-gold/15 blur-3xl" aria-hidden="true"/>
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
        <div className="reveal">
          <span className="inline-flex rounded-full bg-academy-gold/25 px-3 py-1 text-xs font-black uppercase tracking-[.22em] text-academy-gold-text">AVIS GOOGLE</span>
          <h2 className="mt-5 max-w-2xl text-3xl font-black tracking-tight text-academy-ink md:text-5xl">Ils nous font confiance</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-academy-muted md:text-lg">Découvrez les retours de nos apprenants sur leur expérience au sein d’Intégrale Academy.</p>
        </div>
        <div className="reveal rounded-[2rem] border border-academy-line bg-academy-surface/90 p-6 shadow-soft backdrop-blur dark:border-white/10 dark:bg-academy-elevated/90">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-end gap-2"><span className="text-5xl font-black tracking-tight text-academy-ink">{googleRating}</span><span className="pb-2 text-lg font-black text-academy-muted">/5</span></div>
              <div className="mt-3 flex items-center gap-3"><Stars rating={5}/><span className="text-sm font-bold text-academy-muted">Avis Google · {googleReviewsCount}</span></div>
            </div>
            <a href={googleReviewsUrl} className="inline-flex items-center justify-center rounded-full bg-academy-ink px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-black" aria-disabled={googleReviewsUrl === '#'}>Voir tous les avis Google</a>
          </div>
        </div>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => <ReviewCard key={`${review.name}-${index}`} review={review}/>)}
      </div>
    </div>
  </section>
}
