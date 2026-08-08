import Link from 'next/link';

type TrainingVisual = 'aps' | 'ssiap' | 'sst' | 'a3p' | 'desp';

export type SecurityTrainingHighlight = {
  slug: string;
  title: string;
  description: string;
  duration: string;
  secondaryDuration?: string;
  visual: TrainingVisual;
};

const visualStyles: Record<TrainingVisual, { line: string; icon: string; glow: string; label: string }> = {
  aps: {
    line: 'from-sky-400 via-cyan-400 to-blue-500',
    icon: 'bg-sky-500/10 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300',
    glow: 'bg-sky-400/20',
    label: 'Surveillance',
  },
  ssiap: {
    line: 'from-orange-400 via-red-400 to-rose-500',
    icon: 'bg-red-500/10 text-red-700 dark:bg-red-400/10 dark:text-red-300',
    glow: 'bg-red-400/20',
    label: 'Sécurité incendie',
  },
  sst: {
    line: 'from-emerald-400 via-green-400 to-teal-500',
    icon: 'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300',
    glow: 'bg-emerald-400/20',
    label: 'Secourisme',
  },
  a3p: {
    line: 'from-lime-400 via-green-500 to-emerald-600',
    icon: 'bg-lime-500/10 text-green-700 dark:bg-lime-400/10 dark:text-lime-300',
    glow: 'bg-lime-400/20',
    label: 'Protection rapprochée',
  },
  desp: {
    line: 'from-amber-400 via-orange-400 to-orange-600',
    icon: 'bg-orange-500/10 text-orange-700 dark:bg-orange-400/10 dark:text-orange-300',
    glow: 'bg-orange-400/20',
    label: 'Direction',
  },
};

function TrainingIcon({ type }: { type: TrainingVisual }) {
  const common = 'h-6 w-6';

  if (type === 'ssiap') {
    return <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true"><path d="M13.8 3.2c.4 3-1.7 4.1-1.7 6.5 0 1.1.7 2 1.8 2.4-.1-1.3.4-2.6 1.5-3.6 2.2 1.8 3.6 4.1 3.6 6.6A7 7 0 1 1 6.7 10.5c.4 2.1 1.5 3.1 2.8 3.5-.5-3.9 1.4-7.7 4.3-10.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  }

  if (type === 'sst') {
    return <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true"><path d="M9.2 4.5h5.6v4.7h4.7v5.6h-4.7v4.7H9.2v-4.7H4.5V9.2h4.7V4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>;
  }

  if (type === 'a3p') {
    return <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true"><path d="M12 3.5 19 6v5.2c0 4.5-2.8 7.8-7 9.3-4.2-1.5-7-4.8-7-9.3V6l7-2.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="12" cy="9.2" r="2" stroke="currentColor" strokeWidth="1.6"/><path d="M8.8 15.1c.7-1.4 1.8-2.1 3.2-2.1s2.5.7 3.2 2.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>;
  }

  if (type === 'desp') {
    return <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true"><path d="M8 7V5.8C8 4.8 8.8 4 9.8 4h4.4c1 0 1.8.8 1.8 1.8V7M4 11.5h16M4.5 7h15c.8 0 1.5.7 1.5 1.5v9.8c0 .9-.7 1.7-1.7 1.7H4.7c-.9 0-1.7-.7-1.7-1.7V8.5C3 7.7 3.7 7 4.5 7Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 11.5v1.4h4v-1.4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>;
  }

  return <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true"><path d="M12 3.5 19 6v5.2c0 4.5-2.8 7.8-7 9.3-4.2-1.5-7-4.8-7-9.3V6l7-2.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="m8.8 11.8 2.1 2.1 4.5-4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function SecurityTrainingGrid({ items }: { items: SecurityTrainingHighlight[] }) {
  return <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
    {items.map((item, index) => {
      const style = visualStyles[item.visual];
      const span = index < 3 ? 'lg:col-span-2' : index === items.length - 1 ? 'md:col-span-2 lg:col-span-3' : 'lg:col-span-3';

      return <article key={item.slug} className={`group relative flex min-h-[21rem] flex-col overflow-hidden rounded-[1.8rem] border border-academy-line/90 bg-academy-surface p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-academy-gold/50 hover:shadow-card sm:p-7 ${span}`}>
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${style.line}`} aria-hidden="true"/>
        <div className={`absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-70 blur-3xl transition duration-500 group-hover:scale-125 ${style.glow}`} aria-hidden="true"/>

        <div className="relative flex flex-wrap items-start justify-between gap-3">
          <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ring-1 ring-current/10 ${style.icon}`}><TrainingIcon type={item.visual}/></span>
          <div className="ml-auto flex max-w-full flex-wrap justify-end gap-2">
            <span className="rounded-full border border-academy-line bg-academy-elevated/80 px-3 py-1.5 text-right text-xs font-black text-academy-muted shadow-sm">{item.duration}</span>
            {item.secondaryDuration&&<span className="rounded-full border border-academy-gold/40 bg-academy-gold/10 px-3 py-1.5 text-right text-xs font-black text-academy-gold-strong shadow-sm">{item.secondaryDuration}</span>}
          </div>
        </div>

        <div className="relative mt-6 flex items-center gap-3 text-[0.68rem] font-black uppercase tracking-[.18em] text-academy-muted">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span className="h-px w-7 bg-academy-line" aria-hidden="true"/>
          <span>{style.label}</span>
        </div>

        <h3 className="relative mt-4 text-[1.3rem] font-black leading-[1.22] tracking-tight text-academy-ink sm:text-[1.4rem]">{item.title}</h3>
        <p className="relative mt-4 text-[0.95rem] font-medium leading-7 text-academy-muted">{item.description}</p>

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
