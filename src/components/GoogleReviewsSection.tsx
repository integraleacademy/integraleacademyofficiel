const googleRating = '5,0';
const googleReviewsCount = '15 extraits sélectionnés';
const googleReviewsUrl = '#'; // TODO: remplacer par l’URL officielle de la fiche Google / des avis Google.

const reviews = [
  {
    name: 'Emma-Rosa B.',
    rating: 5,
    category: 'APS',
    text: 'J’ai passé la formation APS avec Abdel, que je souhaite remercier infiniment pour son professionnalisme, sa pédagogie et son attention. J’ai passé cinq semaines remplies de connaissances, de compétences, mais aussi de bons moments.',
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
    category: 'A3P',
    text: 'Une formation A3P exceptionnelle, clairement au-dessus de ce que j’ai pu voir ailleurs. Exigeante, réaliste et ultra-professionnalisante, elle prépare vraiment au terrain.',
  },
  {
    name: 'Mee-Kyung K.',
    rating: 5,
    category: 'APS',
    text: 'Une formation de grande qualité avec un accompagnement au top. Le formateur prend vraiment le temps d’expliquer, de répondre aux questions et de mettre tout le monde en confiance.',
  },
  {
    name: 'Nelson D.',
    rating: 5,
    category: 'Sécurité privée',
    text: 'L’équipe est professionnelle, à l’écoute et très investie dans la réussite des stagiaires. Les formations sont claires, dynamiques et parfaitement adaptées aux exigences du terrain.',
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
    name: 'Mathys C.',
    rating: 5,
    category: 'Agent de sécurité',
    text: 'Les locaux sont propres, bien équipés et agréables. L’ambiance est sérieuse mais conviviale. La formation est complète, bien organisée, avec un bon équilibre entre théorie et pratique.',
  },
  {
    name: 'Romain F.',
    rating: 5,
    category: 'Protection rapprochée',
    text: 'Une formation très intéressante dans tous les domaines de la protection rapprochée. Une formation sérieuse à conseiller.',
  },
  {
    name: 'Mehdi A.',
    rating: 5,
    category: 'Protection rapprochée',
    text: '9 semaines de formation très enrichissantes et de qualité. Une équipe en or. Nous avons tous obtenu notre titre à finalité professionnelle : 100 % de réussite à cette session.',
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

const featuredCategories = ['APS', 'A3P', 'Protection rapprochée', 'VTC'];
const excerptLimit = 152;

type Review = (typeof reviews)[number];

function Stars({ rating }: { rating: number }){
  return <div className="flex gap-0.5 text-[1.05rem] text-academy-gold-strong" aria-label={`${rating} étoiles sur 5`}>
    {Array.from({ length: 5 }).map((_, index) => <span key={index} className={index < rating ? 'text-academy-gold-strong drop-shadow-[0_2px_8px_rgba(230,176,58,.35)]' : 'text-academy-line'} aria-hidden="true">★</span>)}
  </div>
}

function getInitial(name: string){
  return name.trim().charAt(0).toUpperCase() || 'A';
}

function getShortText(text: string){
  if(text.length <= excerptLimit) return text;
  const cut = text.lastIndexOf(' ', excerptLimit);
  return `${text.slice(0, cut > 90 ? cut : excerptLimit).trim()}…`;
}

function ReviewText({ text }: { text: string }){
  const isLong = text.length > excerptLimit;

  if(!isLong){
    return <p className="mt-5 flex-1 text-[0.95rem] leading-7 text-academy-muted">“{text}”</p>
  }

  return <details className="group/details mt-5 flex-1 text-[0.95rem] leading-7 text-academy-muted">
    <summary className="list-none [&::-webkit-details-marker]:hidden">
      <span className="group-open/details:hidden">“{getShortText(text)}”</span>
      <span className="hidden group-open/details:inline">“{text}”</span>
      <span className="mt-4 inline-flex cursor-pointer items-center rounded-full border border-academy-line bg-white/70 px-3 py-1.5 text-xs font-black text-academy-ink transition hover:border-academy-gold/60 hover:text-academy-gold-text dark:border-white/10 dark:bg-white/5">
        <span className="group-open/details:hidden">Lire plus</span>
        <span className="hidden group-open/details:inline">Réduire</span>
      </span>
    </summary>
  </details>
}

function ReviewCard({ review }: { review: Review }){
  return <article className="group relative flex h-full min-h-[20rem] snap-center scroll-mx-4 flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_70px_rgba(36,28,12,.10)] ring-1 ring-academy-gold/10 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-academy-gold/45 hover:shadow-[0_30px_85px_rgba(36,28,12,.16)] dark:border-white/10 dark:bg-academy-elevated/85">
    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-academy-gold via-academy-gold-strong to-academy-gold-soft" aria-hidden="true"/>
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-academy-ink to-black text-base font-black text-white shadow-[0_14px_30px_rgba(0,0,0,.20)]" aria-hidden="true">{getInitial(review.name)}</div>
        <div>
          <h3 className="font-black text-academy-ink">{review.name}</h3>
          <p className="mt-1 text-xs font-black uppercase tracking-[.16em] text-academy-muted">Avis Google</p>
        </div>
      </div>
      <span className="rounded-full border border-academy-gold/30 bg-academy-gold/15 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[.14em] text-academy-gold-text">{review.category}</span>
    </div>
    <div className="mt-6 flex items-center gap-3"><Stars rating={review.rating}/><span className="text-sm font-black text-academy-ink">{review.rating}/5</span></div>
    <ReviewText text={review.text}/>
    <div className="mt-6 flex items-center justify-between border-t border-academy-line/70 pt-4 text-xs font-bold text-academy-muted dark:border-white/10">
      <span>Extrait sélectionné</span>
      <span className="text-academy-gold-text">Google</span>
    </div>
  </article>
}

export function GoogleReviewsSection(){
  return <section className="relative isolate overflow-hidden px-4 py-16 md:py-24">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_8%,rgba(230,176,58,.24),transparent_31%),radial-gradient(circle_at_86%_22%,rgba(19,30,51,.10),transparent_30%),linear-gradient(180deg,rgb(var(--surface-elevated)),rgb(var(--background)))]" aria-hidden="true"/>
    <div className="absolute -right-28 top-10 -z-10 h-72 w-72 rounded-full bg-academy-gold/15 blur-3xl" aria-hidden="true"/>
    <div className="page-container">
      <div className="mx-auto max-w-4xl text-center reveal">
        <span className="inline-flex items-center gap-2 rounded-full border border-academy-gold/30 bg-white/75 px-4 py-2 text-xs font-black uppercase tracking-[.22em] text-academy-gold-text shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"><span aria-hidden="true">★</span> Avis Google</span>
        <h2 className="mt-6 text-3xl font-black tracking-tight text-academy-ink md:text-5xl">Ce sont nos stagiaires qui en parlent le mieux.</h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-academy-muted md:text-lg">Formations APS, A3P, protection rapprochée, VTC… découvrez les retours de celles et ceux qui nous ont fait confiance.</p>
      </div>

      <div className="reveal mx-auto mt-8 flex max-w-4xl flex-col items-center justify-between gap-5 rounded-[2rem] border border-white/70 bg-white/75 p-5 shadow-soft backdrop-blur md:flex-row dark:border-white/10 dark:bg-academy-elevated/75">
        <div className="flex items-center gap-4">
          <div className="flex items-end gap-2"><span className="text-5xl font-black tracking-tight text-academy-ink">{googleRating}</span><span className="pb-2 text-lg font-black text-academy-muted">/5</span></div>
          <div><Stars rating={5}/><p className="mt-1 text-sm font-bold text-academy-muted">{googleReviewsCount} · aucune réponse établissement affichée</p></div>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {featuredCategories.map((category) => <span key={category} className="rounded-full border border-academy-line bg-academy-bg/80 px-3 py-1.5 text-xs font-black text-academy-ink dark:border-white/10">{category}</span>)}
        </div>
      </div>

      <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3">
        {reviews.map((review, index) => <div key={`${review.name}-${review.category}-${index}`} className="w-[86%] shrink-0 md:w-auto"><ReviewCard review={review}/></div>)}
      </div>
    </div>
  </section>
}
