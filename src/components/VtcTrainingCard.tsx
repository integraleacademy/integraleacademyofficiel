import Link from 'next/link';

type VtcTrainingCardProps = {
  title: string;
  description: string;
  duration: string;
  href: string;
};

function CarIcon() {
  return <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6" aria-hidden="true">
    <path d="m6.2 18 2.6-7.1A3 3 0 0 1 11.6 9h8.8a3 3 0 0 1 2.8 1.9l2.6 7.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.5 16.5h17c1.7 0 3 1.3 3 3V24H4.5v-4.5c0-1.7 1.3-3 3-3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M8 24v2.2M24 24v2.2M8.5 20.2h2.2m10.6 0h2.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>;
}

export function VtcTrainingCard({ title, description, duration, href }: VtcTrainingCardProps) {
  return <article className="group relative mx-auto flex min-h-[21rem] max-w-3xl flex-col overflow-hidden rounded-[1.8rem] border border-academy-line/90 bg-academy-surface p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-academy-gold/50 hover:shadow-card sm:p-7">
    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-600" aria-hidden="true"/>
    <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-violet-400/20 opacity-70 blur-3xl transition duration-500 group-hover:scale-125" aria-hidden="true"/>

    <div className="relative flex flex-wrap items-start justify-between gap-3">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet-500/10 text-violet-700 ring-1 ring-current/10 dark:bg-violet-400/10 dark:text-violet-300"><CarIcon/></span>
      <div className="ml-auto flex max-w-full flex-wrap justify-end gap-2">
        <span className="rounded-full border border-academy-line bg-academy-elevated/80 px-3 py-1.5 text-xs font-black text-academy-muted shadow-sm">{duration}</span>
        <span className="rounded-full border border-academy-line bg-academy-elevated/80 px-3 py-1.5 text-xs font-black text-academy-muted shadow-sm">CPF selon éligibilité</span>
      </div>
    </div>

    <div className="relative mt-6 flex items-center gap-3 text-[0.68rem] font-black uppercase tracking-[.18em] text-academy-muted">
      <span>01</span>
      <span className="h-px w-7 bg-academy-line" aria-hidden="true"/>
      <span>Transport de personnes</span>
    </div>

    <h3 className="relative mt-4 text-[1.3rem] font-black leading-[1.22] tracking-tight text-academy-ink sm:text-[1.4rem]">{title}</h3>
    <p className="relative mt-4 text-[0.95rem] font-medium leading-7 text-academy-muted">{description}</p>

    <div className="relative mt-5 flex flex-wrap gap-2">
      {['Théorie en e-learning', 'Pratique en présentiel', 'Frais d’examen inclus'].map(tag => <span key={tag} className="rounded-full border border-academy-line bg-academy-elevated/70 px-3 py-1.5 text-xs font-bold text-academy-muted">{tag}</span>)}
    </div>

    <div className="relative mt-auto pt-6">
      <Link href={href} className="inline-flex items-center gap-2 text-sm font-black text-academy-ink transition group-hover:text-academy-gold-strong">
        Découvrir
        <span className="grid h-8 w-8 place-items-center rounded-full bg-academy-ink text-white transition duration-300 group-hover:translate-x-1 group-hover:bg-academy-gold group-hover:text-academy-gold-text" aria-hidden="true">→</span>
      </Link>
    </div>
  </article>;
}
