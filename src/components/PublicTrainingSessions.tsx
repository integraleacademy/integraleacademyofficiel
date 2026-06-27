import Link from 'next/link';

export type PublicTrainingSession = any;

function parisDateKey(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}

function daysUntilParis(value: string) {
  const toUtcMidnight = (key: string) => { const [year, month, day] = key.split('-').map(Number); return Date.UTC(year, month - 1, day); };
  return Math.ceil((toUtcMidnight(parisDateKey(new Date(value))) - toUtcMidnight(parisDateKey())) / 86400000);
}

function formatDate(value?: string) {
  if (!value) return '';
  return new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value));
}

function computedSeats(session: PublicTrainingSession): number | null {
  if (session.showSeatsLeft === false) return null;
  if (session.seatsLeft !== null && session.seatsLeft !== undefined && session.seatsLeft !== '') return Number(session.seatsLeft);
  const days = daysUntilParis(session.startDate);
  if (days <= 15) return 2;
  if (days <= 30) return 4;
  if (days <= 45) return 5;
  if (days <= 60) return 6;
  return null;
}

function seatsBadge(seats: number | null) {
  if (seats === null || Number.isNaN(seats)) return null;
  if (seats <= 1) return { label: `${seats} place restante`, className: 'border-rose-300 bg-rose-100 text-rose-800 shadow-[0_0_24px_rgba(244,63,94,.18)]' };
  if (seats === 2) return { label: 'Plus que 2 places', className: 'border-rose-300 bg-rose-100 text-rose-800 shadow-[0_0_24px_rgba(244,63,94,.18)]' };
  if (seats === 4) return { label: '4 places restantes', className: 'border-orange-300 bg-orange-100 text-orange-800 shadow-[0_0_22px_rgba(249,115,22,.16)]' };
  if (seats === 5) return { label: '5 places restantes', className: 'border-amber-300 bg-amber-100 text-amber-800' };
  if (seats === 6) return { label: '6 places restantes', className: 'border-emerald-300 bg-emerald-100 text-emerald-800 shadow-[0_0_22px_rgba(16,185,129,.14)]' };
  return { label: `${seats} places restantes`, className: 'border-amber-300 bg-amber-100 text-amber-800' };
}

function primaryHref(session: PublicTrainingSession) {
  const base = session.registrationUrl || '/contact';
  const params = new URLSearchParams({ formation: session.training?.slug || session.training?.name || '', session: session.id });
  return base.includes('?') ? base : `${base}?${params.toString()}`;
}

function infoHref(session?: PublicTrainingSession) {
  const params = new URLSearchParams();
  if (session?.training?.slug) params.set('formation', session.training.slug);
  if (session?.id) params.set('session', session.id);
  return `/contact${params.toString() ? `?${params.toString()}` : ''}`;
}

export function isPublicUpcomingSession(session: PublicTrainingSession) {
  if (!session?.training?.isActive || session.status === 'HIDDEN') return false;
  return parisDateKey(new Date(session.startDate)) >= parisDateKey();
}

export function PublicTrainingSessions({ sessions, title = 'Prochaines dates', intro = 'Dates, places et informations issues de l’administration.', displayLimit = 3, moreHref = '/planning#sessions' }: { sessions: PublicTrainingSession[]; title?: React.ReactNode; intro?: string; displayLimit?: number; moreHref?: string }) {
  const rows = sessions.filter(isPublicUpcomingSession).sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate));
  const visibleRows = displayLimit > 0 ? rows.slice(0, displayLimit) : rows;
  const hiddenCount = Math.max(rows.length - visibleRows.length, 0);
  return <section className="mx-auto max-w-7xl px-4 py-10 sm:py-12">
    <div className="mb-6 max-w-3xl"><p className="text-xs font-black uppercase tracking-[.24em] text-academy-gold">Planning admin</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{title}</h2><p className="mt-3 text-base leading-7 text-academy-muted">{intro}</p></div>
    {rows.length ? <div className="space-y-3">{rows.map((session, index) => { const badge = seatsBadge(computedSeats(session)); const details = [
      { label: 'Début', value: formatDate(session.startDate) },
      { label: 'Fin', value: formatDate(session.endDate) },
      session.examDate ? { label: 'Examen', value: formatDate(session.examDate) } : null,
      session.location ? { label: 'Lieu', value: session.location } : null,
      session.priceLabel ? { label: 'Prix', value: session.priceLabel } : null,
    ].filter(Boolean) as { label: string; value: string }[];
      const titleLabel = session.training?.name || session.title;
      const categoryLabel = session.training?.category === 'sécurité' ? 'Formations sécurité privée' : session.training?.category;
      return <article key={session.id} className="group reveal relative overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/88 p-4 shadow-[0_18px_46px_rgba(54,40,20,.10)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-academy-gold/45 hover:shadow-[0_24px_62px_rgba(54,40,20,.16)] dark:border-white/10 dark:bg-white/10 dark:hover:border-academy-gold/40">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-academy-gold to-yellow-200" />
      <div className="grid gap-3 xl:grid-cols-[minmax(13rem,.85fr)_minmax(0,1.7fr)_minmax(13rem,.75fr)] xl:items-center">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">{index === 0 ? <span className="rounded-full bg-academy-ink px-3 py-1 text-[10px] font-black uppercase tracking-[.12em] text-academy-gold">Prochaine session</span> : null}{badge ? <span className={`session-seats-badge rounded-full border px-3 py-1 text-[10px] font-black transition duration-300 hover:-translate-y-0.5 ${badge.className}`}>{badge.label}</span> : null}{session.status === 'FULL' ? <span className="rounded-full bg-stone-200 px-3 py-1 text-[10px] font-black uppercase tracking-[.12em] text-stone-700">Complet</span> : null}</div>
          <h3 className="mt-2 truncate text-xl font-black leading-tight tracking-tight text-academy-ink dark:text-white sm:text-2xl">{titleLabel}</h3>
          {categoryLabel ? <p className="mt-0.5 truncate text-sm font-bold text-academy-gold-strong">{categoryLabel}</p> : null}
        </div>
        <div className="grid gap-2 text-sm text-academy-muted sm:grid-cols-2 lg:grid-cols-3">
          {details.map(item => <p key={item.label} className="min-w-0 rounded-[1rem] border border-white/70 bg-academy-bg/75 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,.55)] dark:border-white/10 dark:bg-black/20"><span className="block text-[10px] font-black uppercase tracking-[.15em] text-academy-muted/70">{item.label}</span><span className="mt-0.5 block truncate font-black leading-snug text-academy-ink dark:text-white" title={item.value}>{item.value}</span></p>)}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row xl:flex-col"><Link href={primaryHref(session)} className="inline-flex flex-1 items-center justify-center rounded-full bg-academy-ink px-5 py-3 text-center text-sm font-black text-white shadow-[0_12px_28px_rgba(23,19,13,.16)] transition hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_16px_36px_rgba(23,19,13,.22)]">Je souhaite m’inscrire</Link><Link href={infoHref(session)} className="inline-flex flex-1 items-center justify-center rounded-full border border-academy-line bg-white px-5 py-3 text-center text-sm font-black text-academy-ink transition hover:-translate-y-0.5 hover:border-academy-gold/50 hover:bg-stone-50">Demander des infos</Link></div>
      </div>{session.fundingNotes ? <p className="mt-3 rounded-2xl border border-academy-line/70 bg-academy-gold/10 p-3 text-sm font-bold leading-6 text-academy-muted">{session.fundingNotes}</p> : null}
    </article>; })}</div> : <div className="rounded-[2rem] border border-dashed border-academy-line bg-white p-8 text-center shadow-soft"><p className="text-2xl font-black">Aucune date disponible actuellement</p><p className="mx-auto mt-3 max-w-xl text-academy-muted">Les dates seront affichées ici dès qu’une session sera ouverte dans l’administration.</p><Link href="/contact?motif=alerte-planning" className="mt-6 inline-flex rounded-full bg-academy-gold px-5 py-3 text-sm font-black text-academy-gold-text">Être prévenu</Link></div>}
  </section>;
}
