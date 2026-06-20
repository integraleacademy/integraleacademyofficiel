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
  if (seats <= 1) return { label: `${seats} place restante`, className: 'border-rose-300 bg-rose-100 text-rose-800' };
  if (seats === 2) return { label: 'Plus que 2 places', className: 'border-rose-300 bg-rose-100 text-rose-800' };
  if (seats === 4) return { label: '4 places restantes', className: 'border-orange-300 bg-orange-100 text-orange-800' };
  if (seats === 5) return { label: '5 places restantes', className: 'border-amber-300 bg-amber-100 text-amber-800' };
  if (seats === 6) return { label: '6 places disponibles', className: 'border-emerald-300 bg-emerald-100 text-emerald-800' };
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

export function PublicTrainingSessions({ sessions, title = 'Prochaines dates', intro = 'Dates, places et informations issues de l’administration.' }: { sessions: PublicTrainingSession[]; title?: string; intro?: string }) {
  const rows = sessions.filter(isPublicUpcomingSession).sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate));
  return <section className="mx-auto max-w-7xl px-4 py-12 sm:py-14">
    <div className="mb-8 max-w-3xl"><p className="text-xs font-black uppercase tracking-[.24em] text-academy-gold">Planning admin</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{title}</h2><p className="mt-4 text-lg leading-8 text-academy-muted">{intro}</p></div>
    {rows.length ? <div className="grid gap-5 lg:grid-cols-2">{rows.map((session, index) => { const badge = seatsBadge(computedSeats(session)); return <article key={session.id} className={`reveal rounded-[2rem] border p-5 shadow-soft ${index === 0 ? 'border-academy-gold bg-gradient-to-br from-academy-gold-soft to-white shadow-card' : 'border-academy-line bg-academy-elevated'}`}>
      <div className="flex flex-wrap items-center gap-2">{index === 0 ? <span className="rounded-full bg-academy-ink px-3 py-1 text-xs font-black uppercase tracking-[.14em] text-academy-gold">Prochaine session</span> : null}{badge ? <span className={`rounded-full border px-3 py-1 text-xs font-black ${badge.className}`}>{badge.label}</span> : null}{session.status === 'FULL' ? <span className="rounded-full bg-stone-200 px-3 py-1 text-xs font-black uppercase tracking-[.14em] text-stone-700">Complet</span> : null}</div>
      <h3 className="mt-5 text-2xl font-black">{session.title || session.training?.name}</h3>
      <div className="mt-5 grid gap-3 text-sm font-semibold text-academy-muted sm:grid-cols-2"><p className="rounded-2xl bg-academy-bg/80 p-4"><span className="block text-xs uppercase tracking-[.16em] opacity-70">Début</span>{formatDate(session.startDate)}</p><p className="rounded-2xl bg-academy-bg/80 p-4"><span className="block text-xs uppercase tracking-[.16em] opacity-70">Fin</span>{formatDate(session.endDate)}</p>{session.examDate ? <p className="rounded-2xl bg-academy-bg/80 p-4"><span className="block text-xs uppercase tracking-[.16em] opacity-70">Examen</span>{formatDate(session.examDate)}</p> : null}{session.location ? <p className="rounded-2xl bg-academy-bg/80 p-4"><span className="block text-xs uppercase tracking-[.16em] opacity-70">Lieu</span>{session.location}</p> : null}{session.durationLabel ? <p className="rounded-2xl bg-academy-bg/80 p-4"><span className="block text-xs uppercase tracking-[.16em] opacity-70">Durée</span>{session.durationLabel}</p> : null}{session.priceLabel ? <p className="rounded-2xl bg-academy-bg/80 p-4"><span className="block text-xs uppercase tracking-[.16em] opacity-70">Prix</span>{session.priceLabel}</p> : null}</div>
      {session.publicNotes ? <p className="mt-4 rounded-2xl border border-academy-line bg-white/80 p-4 text-sm font-bold leading-6 text-academy-muted">{session.publicNotes}</p> : null}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row"><Link href={primaryHref(session)} className="inline-flex flex-1 justify-center rounded-full bg-academy-ink px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5">Je réserve cette session</Link><Link href={infoHref(session)} className="inline-flex flex-1 justify-center rounded-full border border-academy-line bg-white px-5 py-3 text-sm font-black text-academy-ink transition hover:-translate-y-0.5">Demander des infos</Link></div>
    </article>; })}</div> : <div className="rounded-[2rem] border border-dashed border-academy-line bg-white p-8 text-center shadow-soft"><p className="text-2xl font-black">Aucune date disponible actuellement</p><p className="mx-auto mt-3 max-w-xl text-academy-muted">Les dates seront affichées ici dès qu’une session sera ouverte dans l’administration.</p><Link href="/contact?motif=alerte-planning" className="mt-6 inline-flex rounded-full bg-academy-gold px-5 py-3 text-sm font-black text-academy-gold-text">Être prévenu</Link></div>}
  </section>;
}
