import Link from 'next/link';

type BtsVisual = 'mos' | 'mco' | 'ndrc' | 'ci' | 'pi' | 'cg';

export type BtsTrainingHighlight = {
  slug: string;
  title: string;
  description: string;
  modality: string;
  tags: string[];
  visual: BtsVisual;
};

const visualStyles: Record<BtsVisual, { line: string; icon: string; glow: string; label: string }> = {
  mos: {
    line: 'from-sky-400 via-blue-500 to-indigo-600',
    icon: 'bg-sky-500/10 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300',
    glow: 'bg-sky-400/20',
    label: 'Management sécurité',
  },
  mco: {
    line: 'from-amber-300 via-orange-400 to-rose-500',
    icon: 'bg-orange-500/10 text-orange-700 dark:bg-orange-400/10 dark:text-orange-300',
    glow: 'bg-orange-400/20',
    label: 'Commerce',
  },
  ndrc: {
    line: 'from-fuchsia-400 via-violet-500 to-indigo-600',
    icon: 'bg-violet-500/10 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300',
    glow: 'bg-violet-400/20',
    label: 'Relation client',
  },
  ci: {
    line: 'from-cyan-400 via-teal-400 to-emerald-500',
    icon: 'bg-cyan-500/10 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300',
    glow: 'bg-cyan-400/20',
    label: 'International',
  },
  pi: {
    line: 'from-lime-400 via-emerald-500 to-teal-600',
    icon: 'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300',
    glow: 'bg-emerald-400/20',
    label: 'Immobilier',
  },
  cg: {
    line: 'from-slate-400 via-indigo-500 to-blue-600',
    icon: 'bg-indigo-500/10 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300',
    glow: 'bg-indigo-400/20',
    label: 'Comptabilité',
  },
};

function BtsIcon({ type }: { type: BtsVisual }) {
  const common = 'h-6 w-6';

  if (type === 'mos') {
    return <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true"><path d="M12 3.5 19 6v5.2c0 4.5-2.8 7.8-7 9.3-4.2-1.5-7-4.8-7-9.3V6l7-2.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M8.2 14.7c.8-1.5 2.1-2.3 3.8-2.3s3 .8 3.8 2.3M12 9.8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>;
  }

  if (type === 'mco') {
    return <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true"><path d="M4 10h16l-1.4-5H5.4L4 10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M5.5 10v9h13v-9M9 19v-5h6v5M7.2 10c0 1.2-.7 2-1.6 2s-1.6-.8-1.6-2m6.4 0c0 1.2-.7 2-1.6 2s-1.6-.8-1.6-2m6.4 0c0 1.2-.7 2-1.6 2s-1.6-.8-1.6-2m6.4 0c0 1.2-.7 2-1.6 2s-1.6-.8-1.6-2m6.4 0c0 1.2-.7 2-1.6 2s-1.6-.8-1.6-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  }

  if (type === 'ndrc') {
    return <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true"><path d="M4 5.5h10.5v8H9l-3.5 3v-3H4v-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M14.5 9.5H20v8h-1.5v2l-3-2H11v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 9.5h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>;
  }

  if (type === 'ci') {
    return <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true"><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8"/><path d="M3.8 12h16.4M12 3.5c2.1 2.3 3.2 5.1 3.2 8.5S14.1 18.2 12 20.5C9.9 18.2 8.8 15.4 8.8 12S9.9 5.8 12 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>;
  }

  if (type === 'pi') {
    return <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true"><path d="m3.5 11 8.5-7 8.5 7M5.5 9.5v10h13v-10M9 19.5v-6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M16.5 6V4.5h2V8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>;
  }

  return <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true"><rect x="5" y="3.5" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 7h8v3H8V7ZM8 13h1m3 0h1m3 0h.1M8 16.5h1m3 0h1m3 0h.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function BtsTrainingGrid({ items }: { items: BtsTrainingHighlight[] }) {
  return <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
    {items.map((item, index) => {
      const style = visualStyles[item.visual];

      return <article key={item.slug} className="group relative flex min-h-[22rem] flex-col overflow-hidden rounded-[1.8rem] border border-academy-line/90 bg-academy-surface p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-academy-gold/50 hover:shadow-card sm:p-7">
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${style.line}`} aria-hidden="true"/>
        <div className={`absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-70 blur-3xl transition duration-500 group-hover:scale-125 ${style.glow}`} aria-hidden="true"/>

        <div className="relative flex items-center justify-between gap-4">
          <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ring-1 ring-current/10 ${style.icon}`}><BtsIcon type={item.visual}/></span>
          <span className="rounded-full border border-academy-line bg-academy-elevated/80 px-3 py-1.5 text-xs font-black text-academy-muted shadow-sm">Diplôme d’État</span>
        </div>

        <div className="relative mt-6 flex items-center gap-3 text-[0.68rem] font-black uppercase tracking-[.18em] text-academy-muted">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span className="h-px w-7 bg-academy-line" aria-hidden="true"/>
          <span>{style.label}</span>
        </div>

        <h3 className="relative mt-4 text-[1.3rem] font-black leading-[1.22] tracking-tight text-academy-ink sm:text-[1.4rem]">{item.title}</h3>
        <p className="relative mt-4 text-[0.95rem] font-medium leading-7 text-academy-muted">{item.description}</p>

        <div className="relative mt-5 flex w-fit max-w-full items-center gap-2 rounded-2xl border border-academy-gold/35 bg-academy-gold/10 px-3.5 py-2.5 text-xs font-black text-academy-ink shadow-sm">
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-academy-gold-strong" aria-hidden="true"><rect x="3.5" y="5" width="17" height="11.5" rx="1.8" stroke="currentColor" strokeWidth="1.8"/><path d="M8.5 20h7M12 16.5V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          <span>{item.modality}</span>
        </div>

        <div className="relative mt-4 flex flex-wrap gap-2">
          {item.tags.map(tag => <span key={tag} className={tag === 'Prochainement' ? 'rounded-full border border-academy-gold/40 bg-academy-gold/10 px-3 py-1.5 text-xs font-black text-academy-gold-strong' : 'rounded-full border border-academy-line bg-academy-elevated/70 px-3 py-1.5 text-xs font-bold text-academy-muted'}>{tag}</span>)}
        </div>

        <div className="relative mt-auto pt-6">
          <Link href={item.slug} className="inline-flex items-center gap-2 text-sm font-black text-academy-ink transition group-hover:text-academy-gold-strong">
            Découvrir
            <span className="grid h-8 w-8 place-items-center rounded-full bg-academy-ink text-white transition duration-300 group-hover:translate-x-1 group-hover:bg-academy-gold group-hover:text-academy-gold-text" aria-hidden="true">→</span>
          </Link>
        </div>
      </article>;
    })}
  </div>;
}
