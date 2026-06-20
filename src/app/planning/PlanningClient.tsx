'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type Session = any;
type CategoryKey = 'security' | 'fire' | 'vtc' | 'bts';
type SecurityGroupKey = 'aps' | 'a3p' | 'desp';

const filters: { key: 'all' | CategoryKey; label: string }[] = [
  { key: 'all', label: 'Toutes' },
  { key: 'security', label: 'Sécurité privée' },
  { key: 'fire', label: 'Incendie' },
  { key: 'vtc', label: 'VTC' },
  { key: 'bts', label: 'BTS' },
];

const categorySections: { key: CategoryKey; title: string; intro: string; slugs: string[]; accent: string }[] = [
  { key: 'security', title: 'Formations sécurité privée', intro: 'Les parcours APS, A3P / APR et DESP sont affichés séparément pour choisir la bonne voie sans mélanger les objectifs.', slugs: ['aps', 'a3p', 'a3p-apr', 'desp', 'desp-dssp', 'desp-initial', 'desp-vae'], accent: 'from-amber-300 to-orange-500' },
  { key: 'fire', title: 'Formations incendie', intro: 'SSIAP 1 : développez une compétence recherchée en sécurité incendie et assistance à personnes.', slugs: ['ssiap-1', 'ssiap1'], accent: 'from-red-300 to-rose-500' },
  { key: 'vtc', title: 'Formation Chauffeur VTC', intro: 'Préparez votre projet VTC avec une session claire, accompagnée et orientée passage à l’action.', slugs: ['vtc'], accent: 'from-sky-300 to-cyan-500' },
  { key: 'bts', title: 'BTS en alternance', intro: 'Les prochaines rentrées BTS en alternance pour construire un diplôme d’État avec l’entreprise.', slugs: ['bts', 'bts-mos', 'bts-mco', 'bts-ndrc', 'bts-ci', 'commerce-international', 'bts-professions-immobilieres', 'bts-pi', 'comptabilite-gestion'], accent: 'from-violet-300 to-fuchsia-500' },
];


const securityGroups: { key: SecurityGroupKey; title: string; intro: string; slugs: string[]; badge: string }[] = [
  { key: 'aps', title: 'APS', intro: 'Agent de Prévention et de Sécurité : entrée métier, surveillance humaine et carte professionnelle.', slugs: ['aps'], badge: 'Surveillance humaine' },
  { key: 'a3p', title: 'A3P / APR', intro: 'Protection physique des personnes : parcours protection rapprochée, missions et déplacements sécurisés.', slugs: ['a3p', 'a3p-apr'], badge: 'Protection rapprochée' },
  { key: 'desp', title: 'DESP / DSSP', intro: 'Dirigeant d’entreprise de sécurité privée : création, reprise, management ou VAE.', slugs: ['desp', 'desp-dssp', 'desp-initial', 'desp-vae'], badge: 'Direction sécurité' },
];

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

function sessionCategory(session: Session): CategoryKey | null {
  const slug = session.training?.slug;
  return categorySections.find(section => section.slugs.includes(slug))?.key || null;
}

function computedSeats(session: Session): number | null {
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

function infoHref(session?: Session) {
  const params = new URLSearchParams();
  if (session?.training?.slug) params.set('formation', session.training.slug);
  if (session?.id) params.set('session', session.id);
  return `/contact${params.toString() ? `?${params.toString()}` : ''}`;
}

function SessionCard({ session, isNext, onRegister }: { session: Session; isNext: boolean; onRegister: (session: Session) => void }) {
  const badge = seatsBadge(computedSeats(session));
  const category = categorySections.find(section => section.key === sessionCategory(session));
  const title = session.training?.name || session.title;
  const infoItems = [
    { label: 'Début', value: formatDate(session.startDate) },
    { label: 'Fin', value: formatDate(session.endDate) },
    session.examDate ? { label: 'Examen', value: formatDate(session.examDate) } : null,
    session.location ? { label: 'Lieu', value: session.location } : null,
    session.priceLabel ? { label: 'Prix', value: session.priceLabel } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return <article className="group reveal relative overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/88 p-4 shadow-[0_18px_46px_rgba(54,40,20,.10)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-academy-gold/45 hover:shadow-[0_24px_62px_rgba(54,40,20,.16)] dark:border-white/10 dark:bg-white/10 dark:hover:border-academy-gold/40">
    <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${category?.accent || 'from-academy-gold to-yellow-200'}`} />
    <div className="grid gap-3 xl:grid-cols-[minmax(13rem,.85fr)_minmax(0,1.7fr)_minmax(13rem,.75fr)] xl:items-center">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5">
          {isNext ? <span className="rounded-full bg-academy-ink px-3 py-1 text-[10px] font-black uppercase tracking-[.12em] text-academy-gold">Prochaine session</span> : null}
          {badge ? <span className={`session-seats-badge rounded-full border px-3 py-1 text-[10px] font-black transition duration-300 hover:-translate-y-0.5 ${badge.className}`}>{badge.label}</span> : null}
        </div>
        <h3 className="mt-2 truncate text-xl font-black leading-tight tracking-tight text-academy-ink dark:text-white sm:text-2xl">{title}</h3>
        <p className="mt-0.5 truncate text-sm font-bold text-academy-gold-strong">{category?.title}</p>
      </div>
      <div className="grid gap-2 text-sm text-academy-muted sm:grid-cols-2 lg:grid-cols-3">
        {infoItems.map((item) => <p key={item.label} className="min-w-0 rounded-[1rem] border border-white/70 bg-academy-bg/75 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,.55)] dark:border-white/10 dark:bg-black/20">
          <span className="block text-[10px] font-black uppercase tracking-[.15em] text-academy-muted/70">{item.label}</span>
          <span className="mt-0.5 block truncate font-black leading-snug text-academy-ink dark:text-white" title={item.value}>{item.value}</span>
        </p>)}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row xl:flex-col">
        <button type="button" onClick={() => onRegister(session)} className="inline-flex flex-1 items-center justify-center rounded-full bg-academy-ink px-5 py-3 text-sm font-black text-white shadow-[0_12px_28px_rgba(23,19,13,.16)] transition hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_16px_36px_rgba(23,19,13,.22)]">Je souhaite m’inscrire</button>
        <Link href={infoHref(session)} className="inline-flex flex-1 items-center justify-center rounded-full border border-academy-line bg-white px-5 py-3 text-sm font-black text-academy-ink transition hover:-translate-y-0.5 hover:border-academy-gold/50 hover:bg-stone-50">Demander des infos</Link>
      </div>
    </div>
    {session.fundingNotes ? <p className="mt-3 rounded-2xl border border-academy-line/70 bg-academy-gold/10 p-3 text-sm font-bold leading-6 text-academy-muted">{session.fundingNotes}</p> : null}
  </article>;
}


function RegistrationModal({ session, onClose }: { session: Session | null; onClose: () => void }) {
  useEffect(() => {
    if (!session) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [session, onClose]);

  if (!session) return null;

  const title = session.training?.name || session.title;
  const sessionLabel = `${formatDate(session.startDate)} → ${formatDate(session.endDate)}`;
  const hiddenSession = `${title} — ${sessionLabel}`;

  return <div className="fixed inset-0 z-50 grid place-items-center px-4 py-6" role="dialog" aria-modal="true" aria-labelledby="registration-modal-title">
    <button type="button" aria-label="Fermer la modale" onClick={onClose} className="absolute inset-0 bg-academy-ink/55 backdrop-blur-sm" />
    <div className="reveal relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/75 bg-white p-5 shadow-[0_30px_110px_rgba(23,19,13,.30)] dark:border-white/10 dark:bg-[#211d18] sm:p-7">
      <button type="button" onClick={onClose} aria-label="Fermer" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-academy-line bg-white text-xl font-black text-academy-ink transition hover:-translate-y-0.5 hover:border-academy-gold/60 dark:bg-white/10 dark:text-white">×</button>
      <div className="pr-10">
        <p className="text-xs font-black uppercase tracking-[.2em] text-academy-gold-strong">Inscription session</p>
        <h2 id="registration-modal-title" className="mt-2 text-3xl font-black tracking-tight text-academy-ink dark:text-white">Réserver un rendez-vous téléphonique</h2>
        <p className="mt-2 text-base leading-7 text-academy-muted">Un conseiller vous recontacte pour finaliser votre inscription à cette session.</p>
      </div>
      <div className="mt-5 rounded-[1.5rem] border border-academy-line/70 bg-academy-bg/70 p-4 dark:bg-black/20">
        <p className="text-xs font-black uppercase tracking-[.18em] text-academy-muted/70">Formation choisie</p>
        <p className="mt-1 text-xl font-black text-academy-ink dark:text-white">{title}</p>
        <p className="mt-1 text-sm font-bold text-academy-gold-strong">{sessionLabel}</p>
      </div>
      <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
        <Link href={`/contact?motif=rdv&formation=${encodeURIComponent(session.training?.slug || title)}&session=${encodeURIComponent(session.id)}`} className="rounded-full bg-academy-ink px-4 py-3 text-center text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-black">Prendre rendez-vous</Link>
        <Link href={`/contact?motif=rappel&formation=${encodeURIComponent(session.training?.slug || title)}&session=${encodeURIComponent(session.id)}`} className="rounded-full bg-academy-gold px-4 py-3 text-center text-sm font-black text-academy-gold-text transition hover:-translate-y-0.5">Être rappelé</Link>
        <Link href={infoHref(session)} className="rounded-full border border-academy-line bg-white px-4 py-3 text-center text-sm font-black text-academy-ink transition hover:-translate-y-0.5 hover:border-academy-gold/60 dark:bg-white/10 dark:text-white">Demander des informations</Link>
      </div>
      <form action="/contact" method="get" className="mt-5 grid gap-3 sm:grid-cols-2">
        <input type="hidden" name="motif" value="inscription-session" />
        <input type="hidden" name="session" value={session.id} />
        <input type="hidden" name="formation_session" value={hiddenSession} />
        <input name="nom" placeholder="Nom" className="rounded-2xl border px-4 py-3 text-sm font-bold" />
        <input name="prenom" placeholder="Prénom" className="rounded-2xl border px-4 py-3 text-sm font-bold" />
        <input name="telephone" placeholder="Téléphone" className="rounded-2xl border px-4 py-3 text-sm font-bold" />
        <input name="email" type="email" placeholder="E-mail" className="rounded-2xl border px-4 py-3 text-sm font-bold" />
        <input name="formation" value={hiddenSession} readOnly className="rounded-2xl border px-4 py-3 text-sm font-bold sm:col-span-2" />
        <button type="submit" className="rounded-full bg-academy-ink px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-black sm:col-span-2">Envoyer ma demande</button>
      </form>
    </div>
  </div>;
}


function SecurityGroupedSessions({ rows, expandedGroups, onToggleMore, onRegister }: { rows: Session[]; expandedGroups: Record<SecurityGroupKey, boolean>; onToggleMore: (group: SecurityGroupKey) => void; onRegister: (session: Session) => void }) {
  return <div className="space-y-8">
    {securityGroups.map(group => {
      const groupRows = rows.filter(session => group.slugs.includes(session.training?.slug)).sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate));
      const isExpanded = expandedGroups[group.key];
      const visibleRows = isExpanded ? groupRows : groupRows.slice(0, 3);
      const hiddenCount = Math.max(groupRows.length - visibleRows.length, 0);
      return <section key={group.key} className="rounded-[2rem] border border-academy-line/70 bg-white/55 p-4 shadow-[0_18px_58px_rgba(54,40,20,.08)] backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[.2em] text-academy-gold-strong">{group.badge}</p>
            <h3 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">{group.title}</h3>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-academy-muted md:text-base">{group.intro}</p>
          </div>
          <Link href={`/contact?motif=alerte-planning&formation=${group.key}`} className="inline-flex shrink-0 rounded-full border border-academy-line bg-white px-4 py-2.5 text-sm font-black text-academy-ink transition hover:-translate-y-0.5 hover:border-academy-gold/60 dark:bg-white/10 dark:text-white">Être prévenu</Link>
        </div>
        {groupRows.length ? <><div className="grid gap-5">{visibleRows.map((session, index) => <SessionCard key={session.id} session={session} isNext={index === 0} onRegister={onRegister} />)}</div>{hiddenCount > 0 ? <div className="mt-5 text-center"><button type="button" onClick={() => onToggleMore(group.key)} className="inline-flex rounded-full border border-academy-line bg-white px-6 py-3 text-sm font-black text-academy-ink shadow-soft transition hover:-translate-y-0.5 hover:border-academy-gold/60 dark:bg-white/10 dark:text-white">Voir plus de dates ({hiddenCount})</button></div> : null}</> : <div className="rounded-[1.5rem] border border-dashed border-academy-line bg-white/70 p-5 text-sm font-bold text-academy-muted dark:bg-black/20">Aucune date {group.title} disponible actuellement. Demandez une alerte pour être prévenu de la prochaine session.</div>}
      </section>;
    })}
  </div>;
}

function EmptyState({ category }: { category: CategoryKey }) {
  return <div className="rounded-[2rem] border border-dashed border-academy-line bg-white/70 p-8 text-center shadow-soft dark:bg-white/10">
    <p className="text-2xl font-black">Aucune date disponible actuellement</p>
    <p className="mx-auto mt-3 max-w-xl text-academy-muted">L’équipe peut vous prévenir dès qu’une nouvelle session est ouverte dans cette catégorie.</p>
    <Link href={`/contact?motif=alerte-planning&categorie=${category}`} className="mt-6 inline-flex rounded-full bg-academy-gold px-5 py-3 text-sm font-black text-academy-gold-text transition hover:-translate-y-0.5">Être prévenu des prochaines dates</Link>
  </div>;
}

export function PlanningClient({ initialSessions }: { initialSessions: Session[] }) {
  const [active, setActive] = useState<'all' | CategoryKey>('all');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [expandedSecurityGroups, setExpandedSecurityGroups] = useState<Record<SecurityGroupKey, boolean>>({ aps: false, a3p: false, desp: false });
  const [expandedCategories, setExpandedCategories] = useState<Record<CategoryKey, boolean>>({ security: false, fire: false, vtc: false, bts: false });
  const sessionsByCategory = useMemo(() => Object.fromEntries(categorySections.map(section => [section.key, initialSessions.filter(session => sessionCategory(session) === section.key).sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate))])) as Record<CategoryKey, Session[]>, [initialSessions]);
  const visibleSections = categorySections.filter(section => active === 'all' || active === section.key);

  return <main className="overflow-hidden pb-24">
    <section className="relative isolate overflow-hidden bg-[#090b10] px-4 py-16 text-white sm:py-20 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_18%,rgba(230,176,58,.40),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(59,130,246,.22),transparent_28%),linear-gradient(135deg,#08090d_0%,#141a27_55%,#2b1c06_100%)]" />
      <div className="absolute -left-24 top-16 -z-10 h-80 w-80 rounded-full bg-academy-gold/20 blur-3xl" />
      <div className="absolute -right-24 bottom-0 -z-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <div className="reveal"><span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[.22em] text-academy-gold backdrop-blur">Planning des formations</span><h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl">Planning des prochaines formations</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/76 sm:text-xl">Choisissez votre prochaine session et réservez votre place chez Intégrale Academy.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#sessions" className="rounded-full bg-academy-gold px-6 py-4 text-center text-sm font-black text-academy-gold-text transition hover:-translate-y-0.5">Voir les prochaines dates</a><Link href="/contact?motif=rappel" className="rounded-full border border-white/20 bg-white/10 px-6 py-4 text-center text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5">Être rappelé</Link><Link href="/financements" className="rounded-full border border-white/20 bg-white/10 px-6 py-4 text-center text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5">Demander un financement</Link></div></div>
        <div className="reveal rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-[0_30px_100px_rgba(0,0,0,.35)] backdrop-blur"><p className="text-sm font-black uppercase tracking-[.2em] text-academy-gold">Trouver ma formation</p><div className="mt-5 grid gap-3">{['Sécurité privée', 'Incendie', 'VTC', 'BTS en alternance'].map((item, index) => <a key={item} href="#sessions" className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 p-4 font-black transition hover:bg-white/15"><span>{item}</span><span className="grid h-8 w-8 place-items-center rounded-full bg-academy-gold text-academy-gold-text transition group-hover:translate-x-1">{index + 1}</span></a>)}</div></div>
      </div>
    </section>
    <div id="sessions" className="sticky top-[4.5rem] z-30 border-y border-academy-line bg-academy-surface/86 px-4 py-3 backdrop-blur-xl"><div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto pb-1">{filters.map(filter => <button key={filter.key} onClick={() => setActive(filter.key)} className={`shrink-0 rounded-full px-5 py-3 text-sm font-black transition ${active === filter.key ? 'bg-academy-ink text-white shadow-soft' : 'bg-white text-academy-muted ring-1 ring-academy-line hover:text-academy-ink'}`}>{filter.label}</button>)}</div></div>
    <section className="mx-auto max-w-7xl space-y-14 px-4 py-14 sm:py-20">{visibleSections.map(section => { const rows = sessionsByCategory[section.key]; return <div key={section.key} className="transition-all duration-300"><div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-black uppercase tracking-[.22em] text-academy-gold-strong">{section.title}</p><h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">{section.title}</h2><p className="mt-4 max-w-3xl text-lg leading-8 text-academy-muted">{section.intro}</p></div></div>{section.key === 'security' ? (rows.length ? <SecurityGroupedSessions rows={rows} expandedGroups={expandedSecurityGroups} onToggleMore={(group) => setExpandedSecurityGroups(current => ({ ...current, [group]: true }))} onRegister={setSelectedSession} /> : <EmptyState category={section.key} />) : (rows.length ? (() => { const visibleRows = expandedCategories[section.key] ? rows : rows.slice(0, 3); const hiddenCount = Math.max(rows.length - visibleRows.length, 0); return <><div className="grid gap-3">{visibleRows.map((session, index) => <SessionCard key={session.id} session={session} isNext={index === 0} onRegister={setSelectedSession} />)}</div>{hiddenCount > 0 ? <div className="mt-6 text-center"><button type="button" onClick={() => setExpandedCategories(current => ({ ...current, [section.key]: true }))} className="inline-flex rounded-full border border-academy-line bg-white px-6 py-3 text-sm font-black text-academy-ink shadow-soft transition hover:-translate-y-0.5 hover:border-academy-gold/60 dark:bg-white/10 dark:text-white">Voir plus de dates ({hiddenCount})</button></div> : null}</>; })() : <EmptyState category={section.key} />)}</div>; })}</section>
    <RegistrationModal session={selectedSession} onClose={() => setSelectedSession(null)} />
    <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-2 rounded-[1.5rem] border border-white/70 bg-white/90 p-2 shadow-[0_18px_60px_rgba(17,17,17,.18)] backdrop-blur md:hidden"><Link href="tel:0422470768" className="rounded-2xl bg-academy-ink px-3 py-3 text-center text-xs font-black text-white">Appeler</Link><Link href="/contact" className="rounded-2xl bg-academy-gold px-3 py-3 text-center text-xs font-black text-academy-gold-text">Infos</Link><Link href="/contact?motif=rdv" className="rounded-2xl border border-academy-line bg-white px-3 py-3 text-center text-xs font-black text-academy-ink">RDV</Link></div>
  </main>;
}
