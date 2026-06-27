type CampusImage = {
  id: string;
  label: string;
  src?: string;
  alt?: string;
};

const campusImages: CampusImage[] = [
  { id: 'main-room', label: 'Salle principale' },
  { id: 'classroom', label: 'Salle de cours' },
  { id: 'practice-area', label: 'Zone pratique' },
  { id: 'meeting-room', label: 'Espace pédagogique' },
  { id: 'reception', label: 'Accueil campus' },
];

function CampusPlaceholder({ image, priority = false }: { image: CampusImage; priority?: boolean }) {
  const label = image.alt ?? image.label;

  return <figure className={`group relative isolate h-full min-h-[15rem] overflow-hidden rounded-[1.75rem] border border-academy-line/80 bg-[linear-gradient(135deg,rgb(var(--surface-elevated))_0%,rgb(var(--surface-soft))_48%,rgb(var(--surface-elevated))_100%)] ${priority ? 'lg:min-h-[32rem]' : 'lg:min-h-[15.25rem]'}`}>
    {image.src ? <img src={image.src} alt={label} className="h-full w-full object-cover" /> : <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,.72),transparent_28%),linear-gradient(135deg,rgba(255,255,255,.36),transparent_40%,rgba(0,0,0,.035))]" aria-hidden="true" />
      <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" aria-hidden="true" />
      <div className="absolute -right-16 -top-14 h-44 w-44 rounded-full bg-white/35 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-5 left-5 rounded-full border border-white/60 bg-white/45 px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[.16em] text-academy-muted backdrop-blur-sm">Image à venir</div>
    </div>}
    <figcaption className="sr-only">{label}</figcaption>
  </figure>;
}

export function CampusSection() {
  const [featuredImage, ...secondaryImages] = campusImages;

  return <section className="relative isolate overflow-hidden bg-academy-bg px-4 py-16 sm:py-20 lg:py-24">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-academy-line to-transparent" aria-hidden="true" />
    <div className="pointer-events-none absolute left-1/2 top-10 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-academy-gold/10 blur-3xl" aria-hidden="true" />

    <div className="mx-auto max-w-7xl">
      <div className="grid gap-8 lg:grid-cols-[1.12fr_.88fr] lg:items-end">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[.22em] text-academy-gold-strong">NOS CAMPUS</p>
          <h2 className="mt-4 max-w-4xl text-4xl font-black leading-[.98] tracking-tight text-academy-ink sm:text-5xl lg:text-6xl">Des locaux pensés pour la pratique</h2>
        </div>
        <p className="max-w-xl text-base font-medium leading-8 text-academy-muted sm:text-lg lg:justify-self-end lg:pb-3">400 m² dédiés aux enseignements pratiques et théoriques, sur trois implantations en France.</p>
      </div>

      <div className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-[1.04fr_1fr] lg:gap-5">
        <CampusPlaceholder image={featuredImage} priority />
        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {secondaryImages.map((image) => <CampusPlaceholder key={image.id} image={image} />)}
        </div>
      </div>
    </div>
  </section>;
}
