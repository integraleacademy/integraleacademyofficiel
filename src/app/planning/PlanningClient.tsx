'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { computedSeats, formatSessionDate } from '@/lib/public-sessions';

type Session = any;
type CategoryKey = 'security' | 'fire' | 'vtc' | 'bts';
type FilterKey = 'all' | CategoryKey;
type ViewMode = 'list' | 'calendar';

type IconName =
  | 'arrow'
  | 'calendar'
  | 'check'
  | 'clock'
  | 'filter'
  | 'location'
  | 'people'
  | 'search'
  | 'sparkles';

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Toutes' },
  { key: 'security', label: 'Sécurité privée' },
  { key: 'fire', label: 'Incendie' },
  { key: 'vtc', label: 'VTC' },
  { key: 'bts', label: 'BTS' },
];

const categorySections: {
  key: CategoryKey;
  title: string;
  shortTitle: string;
  intro: string;
  slugs: string[];
}[] = [
  {
    key: 'security',
    title: 'Formations sécurité privée',
    shortTitle: 'Sécurité privée',
    intro: 'APS, A3P / APR et direction d’entreprise de sécurité privée.',
    slugs: ['aps', 'a3p', 'a3p-apr', 'desp', 'desp-dssp', 'desp-initial', 'desp-vae'],
  },
  {
    key: 'fire',
    title: 'Formations sécurité incendie',
    shortTitle: 'Incendie',
    intro: 'SSIAP 1 et parcours dédiés à la sécurité incendie.',
    slugs: ['ssiap-1', 'ssiap1'],
  },
  {
    key: 'vtc',
    title: 'Formation Chauffeur VTC',
    shortTitle: 'VTC',
    intro: 'Préparation complète au métier et à l’examen VTC.',
    slugs: ['vtc'],
  },
  {
    key: 'bts',
    title: 'BTS en alternance',
    shortTitle: 'BTS',
    intro: 'Diplômes d’État préparés en alternance avec l’entreprise.',
    slugs: [
      'bts',
      'bts-mos',
      'bts-mco',
      'bts-ndrc',
      'bts-ci',
      'commerce-international',
      'bts-professions-immobilieres',
      'bts-pi',
      'comptabilite-gestion',
    ],
  },
];

const alertOptions: {
  title: string;
  label: string;
  description: string;
  category: CategoryKey;
  formation: string;
  slugs: string[];
}[] = [
  {
    title: 'DESP / DSSP',
    label: 'Direction sécurité',
    description: 'Créer, reprendre ou diriger une entreprise de sécurité privée.',
    category: 'security',
    formation: 'desp',
    slugs: ['desp', 'desp-dssp', 'desp-initial', 'desp-vae'],
  },
  {
    title: 'SSIAP 1',
    label: 'Sécurité incendie',
    description: 'Devenir agent de sécurité incendie et d’assistance à personnes.',
    category: 'fire',
    formation: 'ssiap-1',
    slugs: ['ssiap-1', 'ssiap1'],
  },
  {
    title: 'Chauffeur VTC',
    label: 'Mobilité',
    description: 'Préparer l’examen et structurer son projet professionnel.',
    category: 'vtc',
    formation: 'vtc',
    slugs: ['vtc'],
  },
  {
    title: 'BTS en alternance',
    label: 'Diplôme d’État',
    description: 'Construire son diplôme en entreprise avec un accompagnement dédié.',
    category: 'bts',
    formation: 'bts',
    slugs: [
      'bts',
      'bts-mos',
      'bts-mco',
      'bts-ndrc',
      'bts-ci',
      'commerce-international',
      'bts-professions-immobilieres',
      'bts-pi',
      'comptabilite-gestion',
    ],
  },
];

function Icon({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) {
  const common = {
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.8,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
  };

  if (name === 'arrow') {
    return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
  }
  if (name === 'calendar') {
    return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>;
  }
  if (name === 'check') {
    return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>;
  }
  if (name === 'clock') {
    return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
  }
  if (name === 'filter') {
    return <svg {...common}><path d="M4 6h16M7 12h10M10 18h4" /></svg>;
  }
  if (name === 'location') {
    return <svg {...common}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
  }
  if (name === 'people') {
    return <svg {...common}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
  }
  if (name === 'search') {
    return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
  }
  return <svg {...common}><path d="m12 3 1.4 4.1L18 8.5l-4.6 1.4L12 14l-1.4-4.1L6 8.5l4.6-1.4L12 3ZM5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15ZM19 13l.8 2.2L22 16l-2.2.8L19 19l-.8-2.2L16 16l2.2-.8L19 13Z" /></svg>;
}

function sessionCategory(session: Session): CategoryKey | null {
  const slug = session.training?.slug;
  return categorySections.find((section) => section.slugs.includes(slug))?.key || null;
}

function sessionTitle(session: Session) {
  return session.training?.name || session.training?.title || session.title || 'Formation';
}

function monthKey(value?: string | Date) {
  if (!value) return '';
  const date = new Date(value);
  return date.getUTCFullYear() + '-' + String(date.getUTCMonth() + 1).padStart(2, '0');
}

function monthLabel(value?: string | Date) {
  if (!value) return '';
  return new Intl.DateTimeFormat('fr-FR', {
    month: 'long',
    timeZone: 'Europe/Paris',
    year: 'numeric',
  }).format(new Date(value));
}

function shortDate(value?: string | Date) {
  if (!value) return { day: '--', month: '' };
  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      timeZone: 'Europe/Paris',
    }).format(date),
    month: new Intl.DateTimeFormat('fr-FR', {
      month: 'short',
      timeZone: 'Europe/Paris',
    }).format(date).replace('.', '').toUpperCase(),
  };
}

function displayPrice(session: Session) {
  const raw = String(session.priceLabel || '').trim();
  if (!raw) return 'Sur devis';
  if (raw.includes('€')) return raw;
  const normalized = Number(raw.replace(/\s/g, '').replace(',', '.'));
  if (!Number.isNaN(normalized)) {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(normalized) + ' €';
  }
  return raw;
}

function seatText(session: Session) {
  const seats = computedSeats(session);
  if (seats === null || Number.isNaN(seats)) return null;
  if (seats <= 0) return 'Session complète';
  if (seats === 1) return '1 place restante';
  return seats + ' places restantes';
}

function infoHref(session?: Session) {
  const params = new URLSearchParams();
  if (session?.training?.slug) params.set('formation', session.training.slug);
  if (session?.id) params.set('session', session.id);
  return '/contact' + (params.toString() ? '?' + params.toString() : '');
}

function alertHref(formation: string) {
  return '/contact?motif=alerte-planning&formation=' + encodeURIComponent(formation);
}

function SessionCard({
  session,
  isNext,
  onRegister,
}: {
  session: Session;
  isNext: boolean;
  onRegister: (session: Session) => void;
}) {
  const date = shortDate(session.startDate);
  const seats = seatText(session);

  return (
    <article className={'group relative overflow-hidden rounded-[1.6rem] border bg-white p-4 shadow-[0_18px_55px_rgba(54,40,20,.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(54,40,20,.14)] dark:bg-white/5 sm:p-5 ' + (isNext ? 'border-academy-gold' : 'border-academy-line/70 dark:border-white/10')}>
      {isNext ? (
        <span className="absolute left-4 top-0 rounded-b-xl bg-academy-gold px-3 py-1 text-[9px] font-black uppercase tracking-[.14em] text-academy-gold-text sm:left-5">
          Prochaine session
        </span>
      ) : null}

      <div className="grid gap-4 pt-2 lg:grid-cols-[5.5rem_minmax(0,1.3fr)_minmax(17rem,.8fr)_auto] lg:items-center">
        <div className="flex items-center gap-3 lg:block">
          <div className="grid h-[4.6rem] w-[4.6rem] shrink-0 place-items-center rounded-2xl bg-[#101a29] text-center shadow-[0_12px_30px_rgba(16,26,41,.18)]">
            <span>
              <span className="block text-2xl font-black leading-none text-white">{date.day}</span>
              <span className="mt-1 block text-[10px] font-black uppercase tracking-[.12em] text-academy-gold">{date.month}</span>
            </span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[.14em] text-academy-muted lg:mt-2 lg:text-center">
            {new Date(session.startDate).getUTCFullYear()}
          </p>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-black tracking-tight text-academy-ink dark:text-white sm:text-2xl">
              {sessionTitle(session)}
            </h3>
            {seats ? (
              <span className={'session-seats-badge rounded-full border px-3 py-1 text-[10px] font-black ' + (seats === 'Session complète' ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700')}>
                {seats}
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-sm font-semibold leading-6 text-academy-muted">
            Du {formatSessionDate(session.startDate)} au {formatSessionDate(session.endDate)}
            {session.examDate ? ' · Examen le ' + formatSessionDate(session.examDate) : ''}
          </p>
          {session.location ? (
            <p className="mt-2 flex items-center gap-2 text-sm font-black text-academy-muted">
              <Icon name="location" className="h-4 w-4 shrink-0 text-academy-gold-strong" />
              <span>{session.location}</span>
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
          <div className="rounded-2xl border border-academy-line/60 bg-academy-bg/65 px-3 py-2.5 dark:border-white/10 dark:bg-black/15">
            <span className="block text-[9px] font-black uppercase tracking-[.14em] text-academy-muted/70">Tarif</span>
            <span className="mt-1 block text-base font-black text-academy-ink dark:text-white">{displayPrice(session)}</span>
          </div>
          <div className="rounded-2xl border border-academy-line/60 bg-academy-bg/65 px-3 py-2.5 dark:border-white/10 dark:bg-black/15">
            <span className="block text-[9px] font-black uppercase tracking-[.14em] text-academy-muted/70">Financement</span>
            <span className="mt-1 block text-sm font-black text-academy-ink dark:text-white">{session.fundingNotes ? 'À étudier' : 'Accompagnement'}</span>
          </div>
        </div>

        <div className="flex gap-2 lg:flex-col">
          <button
            type="button"
            onClick={() => onRegister(session)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#101a29] px-5 py-3.5 text-sm font-black text-white shadow-[0_12px_28px_rgba(16,26,41,.16)] transition hover:-translate-y-0.5 hover:bg-black"
          >
            Voir la session
            <Icon name="arrow" className="h-4 w-4" />
          </button>
          <Link
            href={infoHref(session)}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-academy-line bg-white px-5 py-3 text-sm font-black text-academy-ink transition hover:border-academy-gold dark:bg-white/10 dark:text-white"
          >
            Infos
          </Link>
        </div>
      </div>
    </article>
  );
}

function CalendarView({
  sessions,
  onRegister,
}: {
  sessions: Session[];
  onRegister: (session: Session) => void;
}) {
  const groups = useMemo(() => {
    const result = new Map<string, Session[]>();
    sessions.forEach((session) => {
      const key = monthKey(session.startDate);
      result.set(key, [...(result.get(key) || []), session]);
    });
    return Array.from(result.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [sessions]);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-academy-line/70 bg-white/65 p-4 shadow-soft dark:border-white/10 dark:bg-white/5 sm:p-6">
      <div className="flex gap-4 overflow-x-auto pb-3">
        {groups.map(([key, rows]) => (
          <section key={key} className="min-w-[18rem] flex-1 rounded-[1.5rem] border border-academy-line/70 bg-academy-bg/70 p-4 dark:border-white/10 dark:bg-black/15 sm:min-w-[21rem]">
            <div className="flex items-center justify-between border-b border-academy-line/60 pb-4 dark:border-white/10">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.18em] text-academy-gold-strong">Rentrées</p>
                <h3 className="mt-1 text-xl font-black capitalize text-academy-ink dark:text-white">
                  {monthLabel(rows[0]?.startDate)}
                </h3>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#101a29] text-sm font-black text-academy-gold">
                {rows.length}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {rows.map((session) => {
                const date = shortDate(session.startDate);
                return (
                  <button
                    key={session.id}
                    type="button"
                    onClick={() => onRegister(session)}
                    className="group flex w-full items-center gap-3 rounded-2xl border border-academy-line/70 bg-white p-3 text-left transition hover:-translate-y-0.5 hover:border-academy-gold dark:border-white/10 dark:bg-white/5"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#101a29] text-center">
                      <span>
                        <span className="block text-lg font-black leading-none text-white">{date.day}</span>
                        <span className="mt-1 block text-[8px] font-black text-academy-gold">{date.month}</span>
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-black text-academy-ink dark:text-white">{sessionTitle(session)}</span>
                      <span className="mt-1 block truncate text-xs font-semibold text-academy-muted">{session.location || 'Lieu communiqué prochainement'}</span>
                    </span>
                    <Icon name="arrow" className="h-4 w-4 shrink-0 text-academy-gold-strong transition group-hover:translate-x-1" />
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function RegistrationModal({
  session,
  onClose,
}: {
  session: Session | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!session) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [session, onClose]);

  if (!session) return null;

  const title = sessionTitle(session);
  const sessionLabel = formatSessionDate(session.startDate) + ' → ' + formatSessionDate(session.endDate);
  const hiddenSession = title + ' — ' + sessionLabel;
  const seats = seatText(session);
  const date = shortDate(session.startDate);

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center px-3 py-4 sm:px-5" role="dialog" aria-modal="true" aria-labelledby="registration-modal-title">
      <button type="button" aria-label="Fermer la fenêtre" onClick={onClose} className="absolute inset-0 bg-[#07101e]/75 backdrop-blur-md" />

      <div className="reveal relative grid max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border border-white/20 bg-academy-surface shadow-[0_35px_120px_rgba(0,0,0,.42)] lg:grid-cols-[1.35fr_.85fr]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-[#192537] text-xl font-black text-white transition hover:-translate-y-0.5"
        >
          ×
        </button>

        <div className="p-5 sm:p-8 lg:p-10">
          <p className="text-[11px] font-black uppercase tracking-[.2em] text-academy-gold-strong">Détail de la session</p>
          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="grid h-24 w-24 shrink-0 place-items-center rounded-[1.5rem] bg-academy-gold text-center text-academy-gold-text">
              <span>
                <span className="block text-4xl font-black leading-none">{date.day}</span>
                <span className="mt-2 block text-[10px] font-black uppercase tracking-[.12em]">{date.month} {new Date(session.startDate).getUTCFullYear()}</span>
              </span>
            </div>
            <div>
              <h2 id="registration-modal-title" className="text-3xl font-black tracking-tight text-academy-ink dark:text-white sm:text-4xl">{title}</h2>
              <p className="mt-2 text-base font-semibold text-academy-muted">{session.training?.shortDescription || 'Formation professionnelle certifiante'}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {seats ? <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-black text-emerald-700">{seats}</span> : null}
                <span className="rounded-full border border-academy-gold/40 bg-academy-gold/15 px-3 py-1.5 text-[10px] font-black text-academy-gold-strong">Accompagnement financement</span>
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {[
              ['Période', sessionLabel],
              ['Examen', session.examDate ? formatSessionDate(session.examDate) : 'Selon le calendrier de la session'],
              ['Lieu', session.location || 'Communiqué prochainement'],
              ['Tarif', displayPrice(session)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-academy-line/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                <p className="text-[9px] font-black uppercase tracking-[.16em] text-academy-gold-strong">{label}</p>
                <p className="mt-2 text-sm font-black leading-6 text-academy-ink dark:text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-black text-academy-ink dark:text-white">Ce que vous allez recevoir</h3>
            <ul className="mt-4 grid gap-3 text-sm font-semibold text-academy-muted">
              {[
                'Un échange avec Cassandre pour valider votre projet',
                'La liste exacte des prérequis et des pièces à fournir',
                'Une étude des solutions de financement possibles',
                'La confirmation de votre place après validation du dossier',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 rounded-2xl border border-academy-line/70 bg-academy-bg/70 p-4 dark:border-white/10 dark:bg-black/15">
            <p className="text-[9px] font-black uppercase tracking-[.16em] text-academy-gold-strong">Financement</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-academy-muted">
              CPF, France Travail, employeur ou paiement personnel : l’équipe vous aide à identifier le dispositif adapté.
            </p>
          </div>
        </div>

        <div className="bg-[#101a29] p-5 text-white sm:p-8 lg:p-10">
          <p className="text-[11px] font-black uppercase tracking-[.2em] text-academy-gold">Votre inscription</p>
          <h3 className="mt-3 pr-10 text-2xl font-black tracking-tight sm:text-3xl">Finalisez votre demande</h3>
          <p className="mt-2 text-sm leading-6 text-white/65">L’équipe vous répond sous 24 h ouvrées.</p>

          <div className="mt-7 grid grid-cols-3 gap-2">
            {['Projet', 'Coordonnées', 'Confirmation'].map((step, index) => (
              <div key={step} className="text-center">
                <span className={'mx-auto grid h-8 w-8 place-items-center rounded-full text-xs font-black ' + (index === 0 ? 'bg-academy-gold text-academy-gold-text' : 'bg-white/10 text-white/55')}>
                  {index + 1}
                </span>
                <span className={'mt-2 block text-[8px] font-black uppercase tracking-[.1em] ' + (index === 0 ? 'text-academy-gold' : 'text-white/45')}>{step}</span>
              </div>
            ))}
          </div>

          <form action="/contact" method="get" className="mt-7 grid gap-3">
            <input type="hidden" name="motif" value="inscription-session" />
            <input type="hidden" name="session" value={session.id} />
            <input type="hidden" name="formation_session" value={hiddenSession} />
            <label className="grid gap-1.5 text-[9px] font-black uppercase tracking-[.14em] text-white/55">
              Votre situation
              <select name="situation" className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm font-bold normal-case tracking-normal text-white">
                <option value="">Sélectionner</option>
                <option>Demandeur d’emploi</option>
                <option>Salarié</option>
                <option>Indépendant</option>
                <option>Étudiant</option>
              </select>
            </label>
            <label className="grid gap-1.5 text-[9px] font-black uppercase tracking-[.14em] text-white/55">
              Mode de financement envisagé
              <select name="financement" className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm font-bold normal-case tracking-normal text-white">
                <option value="">Je souhaite être conseillé</option>
                <option>CPF</option>
                <option>France Travail</option>
                <option>Employeur / OPCO</option>
                <option>Financement personnel</option>
              </select>
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="nom" placeholder="Nom" required className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm font-bold text-white placeholder:text-white/45" />
              <input name="prenom" placeholder="Prénom" required className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm font-bold text-white placeholder:text-white/45" />
              <input name="telephone" placeholder="Téléphone" required className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm font-bold text-white placeholder:text-white/45" />
              <input name="email" type="email" placeholder="E-mail" required className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm font-bold text-white placeholder:text-white/45" />
            </div>
            <textarea name="message" rows={3} placeholder="Précisez votre projet ou vos contraintes…" className="resize-none rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm font-bold text-white placeholder:text-white/45" />
            <button type="submit" className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-academy-gold px-5 py-4 text-sm font-black text-academy-gold-text transition hover:-translate-y-0.5">
              Envoyer ma demande
              <Icon name="arrow" className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link href={'/contact?motif=rappel&formation=' + encodeURIComponent(session.training?.slug || title) + '&session=' + encodeURIComponent(session.id)} className="rounded-full border border-white/15 bg-white/5 px-4 py-3 text-center text-xs font-black text-white">Être rappelé</Link>
            <Link href={infoHref(session)} className="rounded-full border border-white/15 bg-white/5 px-4 py-3 text-center text-xs font-black text-white">Poser une question</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MissingDates({
  sessions,
  active,
}: {
  sessions: Session[];
  active: FilterKey;
}) {
  const missing = alertOptions.filter((option) => {
    if (active !== 'all' && option.category !== active) return false;
    return !sessions.some((session) => option.slugs.includes(session.training?.slug));
  });

  if (!missing.length) return null;

  return (
    <section className="border-y border-academy-line/70 bg-academy-soft/55 py-16 sm:py-20">
      <div className="page-container">
        <div className="max-w-4xl">
          <p className="text-[11px] font-black uppercase tracking-[.22em] text-academy-gold-strong">Alertes personnalisées</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-academy-ink dark:text-white sm:text-5xl">
            Pas encore de date ? Gardez une longueur d’avance.
          </h2>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-academy-muted sm:text-lg">
            Les formations sans session ouverte restent accessibles : créez une alerte et soyez prévenu dès la publication d’une nouvelle rentrée.
          </p>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {missing.map((option, index) => (
            <Link
              key={option.title}
              href={alertHref(option.formation)}
              className="group rounded-[1.5rem] border border-academy-line/70 bg-academy-surface p-5 shadow-[0_16px_45px_rgba(54,40,20,.06)] transition hover:-translate-y-1 hover:border-academy-gold"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#101a29] text-[10px] font-black text-academy-gold">
                  0{index + 1}
                </span>
                <span className="text-[9px] font-black uppercase tracking-[.14em] text-academy-gold-strong">{option.label}</span>
              </div>
              <h3 className="mt-6 text-xl font-black text-academy-ink dark:text-white">{option.title}</h3>
              <p className="mt-3 min-h-[3.5rem] text-sm font-semibold leading-6 text-academy-muted">{option.description}</p>
              <span className="mt-6 flex items-center justify-between border-t border-academy-line/60 pt-4 text-xs font-black text-academy-ink dark:text-white">
                Être prévenu à l’ouverture
                <span className="grid h-8 w-8 place-items-center rounded-full bg-academy-gold text-academy-gold-text transition group-hover:translate-x-1">
                  <Icon name="arrow" className="h-4 w-4" />
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="relative mt-8 overflow-hidden rounded-[2rem] bg-[#101a29] p-6 text-white shadow-[0_25px_80px_rgba(16,26,41,.22)] sm:p-8">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-academy-gold/15" />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-academy-gold">Mon alerte planning</p>
              <h3 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">Recevez uniquement les dates qui vous intéressent.</h3>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-white/65">Formation, centre et période souhaitée : l’équipe vous recontacte dès qu’une session adaptée est ouverte.</p>
            </div>
            <Link href="/contact?motif=alerte-planning" className="inline-flex items-center justify-center gap-2 rounded-full bg-academy-gold px-6 py-4 text-sm font-black text-academy-gold-text transition hover:-translate-y-0.5">
              Créer mon alerte
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PlanningClient({ initialSessions }: { initialSessions: Session[] }) {
  const sortedSessions = useMemo(
    () => [...initialSessions].sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate)),
    [initialSessions],
  );
  const nextSession = sortedSessions[0] || null;
  const [active, setActive] = useState<FilterKey>('all');
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('all');
  const [month, setMonth] = useState('all');
  const [view, setView] = useState<ViewMode>('list');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const locations = useMemo(
    () => Array.from(new Set(sortedSessions.map((session) => session.location).filter(Boolean))) as string[],
    [sortedSessions],
  );
  const months = useMemo(() => {
    const unique = new Map<string, string>();
    sortedSessions.forEach((session) => unique.set(monthKey(session.startDate), monthLabel(session.startDate)));
    return Array.from(unique.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [sortedSessions]);
  const formationCount = useMemo(
    () => new Set(sortedSessions.map((session) => session.training?.slug || sessionTitle(session))).size,
    [sortedSessions],
  );

  const filteredSessions = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('fr');
    return sortedSessions.filter((session) => {
      if (active !== 'all' && sessionCategory(session) !== active) return false;
      if (location !== 'all' && session.location !== location) return false;
      if (month !== 'all' && monthKey(session.startDate) !== month) return false;
      if (!normalizedQuery) return true;
      const haystack = [
        sessionTitle(session),
        session.training?.slug,
        session.location,
        session.publicNotes,
      ].filter(Boolean).join(' ').toLocaleLowerCase('fr');
      return haystack.includes(normalizedQuery);
    });
  }, [active, location, month, query, sortedSessions]);

  const visibleSessions = showAll ? filteredSessions : filteredSessions.slice(0, 6);

  function resetFilters() {
    setActive('all');
    setQuery('');
    setLocation('all');
    setMonth('all');
    setShowAll(false);
  }

  return (
    <main className="overflow-hidden pb-24">
      <section className="relative isolate overflow-hidden bg-[#101a29] px-4 py-14 text-white sm:py-20 lg:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_5%_10%,rgba(234,183,53,.22),transparent_32%),radial-gradient(circle_at_92%_85%,rgba(234,183,53,.12),transparent_27%),linear-gradient(135deg,#101a29_0%,#111c2d_55%,#172235_100%)]" />
        <div className="absolute -left-32 top-8 -z-10 h-96 w-96 rounded-full border border-academy-gold/15 bg-academy-gold/5" />
        <div className="absolute -right-28 bottom-[-10rem] -z-10 h-[30rem] w-[30rem] rounded-full border border-academy-gold/15 bg-academy-gold/5" />

        <div className="page-container grid gap-10 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-academy-gold/35 bg-academy-gold/10 px-4 py-2 text-[11px] font-black uppercase tracking-[.2em] text-academy-gold">
              <Icon name="calendar" className="h-4 w-4" />
              Planning des formations
            </span>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-[4.2rem] lg:leading-[1.04]">
              Choisissez votre prochaine <span className="text-academy-gold">session de formation.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/72 sm:text-lg">
              Dates, places restantes, centres et financement : retrouvez toutes les informations utiles pour vous inscrire sereinement.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#sessions" className="inline-flex items-center justify-center gap-2 rounded-full bg-academy-gold px-6 py-4 text-sm font-black text-academy-gold-text transition hover:-translate-y-0.5">
                Voir toutes les sessions
                <Icon name="arrow" className="h-4 w-4" />
              </a>
              <Link href="/contact?motif=alerte-planning" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10">
                Créer une alerte
                <Icon name="sparkles" className="h-4 w-4 text-academy-gold" />
              </Link>
            </div>
          </div>

          {nextSession ? (
            <div className="reveal rounded-[2rem] border border-white/15 bg-white/[.055] p-5 shadow-[0_35px_110px_rgba(0,0,0,.28)] backdrop-blur-xl sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-academy-gold/40 bg-academy-gold/10 px-4 py-2 text-[10px] font-black uppercase tracking-[.18em] text-academy-gold">Prochaine rentrée</span>
                {seatText(nextSession) ? <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-black text-emerald-300">{seatText(nextSession)}</span> : null}
              </div>

              <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="grid h-24 w-24 shrink-0 place-items-center rounded-[1.5rem] bg-academy-gold text-center text-academy-gold-text">
                  <span>
                    <span className="block text-4xl font-black leading-none">{shortDate(nextSession.startDate).day}</span>
                    <span className="mt-2 block text-[10px] font-black uppercase tracking-[.12em]">{shortDate(nextSession.startDate).month} {new Date(nextSession.startDate).getUTCFullYear()}</span>
                  </span>
                </div>
                <div className="min-w-0">
                  <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{sessionTitle(nextSession)}</h2>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white/60">{nextSession.training?.shortDescription || 'Formation professionnelle certifiante'}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 border-y border-white/10 py-5 sm:grid-cols-2">
                <div className="flex gap-3">
                  <Icon name="calendar" className="mt-0.5 h-5 w-5 shrink-0 text-academy-gold" />
                  <span>
                    <span className="block text-[9px] font-black uppercase tracking-[.14em] text-white/45">Période</span>
                    <span className="mt-1 block text-sm font-black">{formatSessionDate(nextSession.startDate)} → {formatSessionDate(nextSession.endDate)}</span>
                  </span>
                </div>
                <div className="flex gap-3">
                  <Icon name="location" className="mt-0.5 h-5 w-5 shrink-0 text-academy-gold" />
                  <span>
                    <span className="block text-[9px] font-black uppercase tracking-[.14em] text-white/45">Centre</span>
                    <span className="mt-1 block text-sm font-black">{nextSession.location || 'Communiqué prochainement'}</span>
                  </span>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xl font-black">{displayPrice(nextSession)}</p>
                <button type="button" onClick={() => setSelectedSession(nextSession)} className="inline-flex items-center justify-center gap-2 rounded-full bg-academy-gold px-5 py-3.5 text-sm font-black text-academy-gold-text transition hover:-translate-y-0.5">
                  Voir la session
                  <Icon name="arrow" className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-[2rem] border border-white/15 bg-white/[.055] p-8 text-center backdrop-blur-xl">
              <Icon name="calendar" className="mx-auto h-10 w-10 text-academy-gold" />
              <h2 className="mt-4 text-2xl font-black">De nouvelles dates arrivent bientôt.</h2>
              <Link href="/contact?motif=alerte-planning" className="mt-6 inline-flex rounded-full bg-academy-gold px-5 py-3 text-sm font-black text-academy-gold-text">Créer une alerte</Link>
            </div>
          )}
        </div>

        <div className="page-container mt-12 grid grid-cols-2 gap-4 border-t border-white/10 pt-7 lg:grid-cols-4">
          {[
            [String(sortedSessions.length), 'sessions ouvertes'],
            [String(formationCount), 'formations disponibles'],
            [String(locations.length), locations.length > 1 ? 'centres actuellement' : 'centre actuellement'],
            ['100 %', 'données administrables'],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="text-2xl font-black text-white sm:text-3xl">{value}</p>
              <p className="mt-1 text-[9px] font-black uppercase tracking-[.15em] text-academy-gold">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-academy-line/70 bg-academy-soft/45 py-10">
        <div className="page-container">
          <p className="text-[10px] font-black uppercase tracking-[.2em] text-academy-gold-strong">En un coup d’œil</p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-academy-ink dark:text-white sm:text-3xl">Un planning clair pour décider plus vite.</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              ['01', 'Cherchez', 'Par formation, catégorie ou mot-clé.'],
              ['02', 'Filtrez', 'Lieu, mois, disponibilité et parcours.'],
              ['03', 'Inscrivez-vous', 'Un parcours guidé sans quitter la page.'],
            ].map(([number, label, description]) => (
              <div key={number} className="flex items-start gap-4 rounded-[1.35rem] border border-academy-line/70 bg-academy-surface p-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-academy-gold text-[10px] font-black text-academy-gold-text">{number}</span>
                <span>
                  <span className="block text-base font-black text-academy-ink dark:text-white">{label}</span>
                  <span className="mt-1 block text-sm font-semibold leading-6 text-academy-muted">{description}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sessions" className="page-container py-14 sm:py-20">
        <div className="max-w-4xl">
          <p className="text-[11px] font-black uppercase tracking-[.22em] text-academy-gold-strong">Toutes les sessions</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-academy-ink dark:text-white sm:text-5xl">Trouvez la date qui correspond à votre projet.</h2>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-academy-muted sm:text-lg">Les résultats, les places restantes et les tarifs sont mis à jour depuis l’administration du site.</p>
        </div>

        <div className="sticky top-[4.4rem] z-30 mt-8 rounded-[1.6rem] border border-academy-line/70 bg-academy-surface/95 p-3 shadow-[0_16px_50px_rgba(54,40,20,.10)] backdrop-blur-xl">
          <div className="grid gap-3 xl:grid-cols-[minmax(16rem,1fr)_auto] xl:items-center">
            <label className="relative block">
              <span className="sr-only">Rechercher une formation</span>
              <Icon name="search" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-academy-muted" />
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setShowAll(false);
                }}
                placeholder="Rechercher une formation…"
                className="w-full rounded-full border border-academy-line bg-white py-3.5 pl-12 pr-4 text-sm font-bold text-academy-ink placeholder:text-academy-muted/60 dark:bg-white/5 dark:text-white"
              />
            </label>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 xl:pb-0">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  aria-pressed={active === filter.key}
                  onClick={() => {
                    setActive(filter.key);
                    setShowAll(false);
                  }}
                  className={'shrink-0 rounded-full px-4 py-3 text-xs font-black transition ' + (active === filter.key ? 'bg-[#101a29] text-white shadow-soft' : 'border border-academy-line bg-white text-academy-muted hover:border-academy-gold hover:text-academy-ink dark:bg-white/5')}
                >
                  {filter.label}
                </button>
              ))}
              <button type="button" onClick={() => setFiltersOpen((value) => !value)} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-academy-line bg-academy-gold px-4 py-3 text-xs font-black text-academy-gold-text xl:hidden">
                <Icon name="filter" className="h-4 w-4" />
                Filtrer
              </button>
            </div>
          </div>

          <div className={(filtersOpen ? 'grid' : 'hidden') + ' mt-3 gap-3 border-t border-academy-line/60 pt-3 sm:grid-cols-2 xl:grid xl:grid-cols-[1fr_1fr_auto_auto] xl:items-end'}>
            <label className="grid gap-1.5 text-[9px] font-black uppercase tracking-[.14em] text-academy-muted">
              Centre
              <select value={location} onChange={(event) => { setLocation(event.target.value); setShowAll(false); }} className="rounded-full border border-academy-line bg-white px-4 py-3 text-sm font-bold normal-case tracking-normal dark:bg-white/5">
                <option value="all">Tous les centres</option>
                {locations.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label className="grid gap-1.5 text-[9px] font-black uppercase tracking-[.14em] text-academy-muted">
              Période
              <select value={month} onChange={(event) => { setMonth(event.target.value); setShowAll(false); }} className="rounded-full border border-academy-line bg-white px-4 py-3 text-sm font-bold normal-case tracking-normal dark:bg-white/5">
                <option value="all">Toutes les dates</option>
                {months.map(([key, label]) => <option key={key} value={key}>{label}</option>)}
              </select>
            </label>
            <div className="flex rounded-full border border-academy-line bg-white p-1 dark:bg-white/5">
              <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')} className={'rounded-full px-4 py-2.5 text-xs font-black transition ' + (view === 'list' ? 'bg-[#101a29] text-white' : 'text-academy-muted')}>Liste</button>
              <button type="button" aria-pressed={view === 'calendar'} onClick={() => setView('calendar')} className={'rounded-full px-4 py-2.5 text-xs font-black transition ' + (view === 'calendar' ? 'bg-[#101a29] text-white' : 'text-academy-muted')}>Calendrier</button>
            </div>
            <button type="button" onClick={resetFilters} className="rounded-full border border-academy-line bg-white px-4 py-3 text-xs font-black text-academy-muted transition hover:border-academy-gold hover:text-academy-ink dark:bg-white/5">Réinitialiser</button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-2xl font-black text-academy-ink dark:text-white">
              {filteredSessions.length} {filteredSessions.length > 1 ? 'sessions disponibles' : 'session disponible'}
            </p>
            <p className="mt-1 text-sm font-semibold text-academy-muted">Triées par prochaine date de rentrée</p>
          </div>
          <div className="hidden rounded-full border border-academy-line bg-white p-1 dark:bg-white/5 xl:flex">
            <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')} className={'rounded-full px-4 py-2.5 text-xs font-black transition ' + (view === 'list' ? 'bg-[#101a29] text-white' : 'text-academy-muted')}>Vue liste</button>
            <button type="button" aria-pressed={view === 'calendar'} onClick={() => setView('calendar')} className={'rounded-full px-4 py-2.5 text-xs font-black transition ' + (view === 'calendar' ? 'bg-[#101a29] text-white' : 'text-academy-muted')}>Vue calendrier</button>
          </div>
        </div>

        {filteredSessions.length ? (
          view === 'list' ? (
            <>
              <div className="mt-6 grid gap-4">
                {visibleSessions.map((session, index) => (
                  <SessionCard key={session.id} session={session} isNext={index === 0} onRegister={setSelectedSession} />
                ))}
              </div>
              {filteredSessions.length > visibleSessions.length ? (
                <div className="mt-7 text-center">
                  <button type="button" onClick={() => setShowAll(true)} className="rounded-full border border-academy-line bg-white px-6 py-3.5 text-sm font-black text-academy-ink shadow-soft transition hover:-translate-y-0.5 hover:border-academy-gold dark:bg-white/5 dark:text-white">
                    Voir toutes les dates ({filteredSessions.length})
                  </button>
                </div>
              ) : null}
            </>
          ) : (
            <div className="mt-6"><CalendarView sessions={filteredSessions} onRegister={setSelectedSession} /></div>
          )
        ) : (
          <div className="mt-6 rounded-[2rem] border border-dashed border-academy-line bg-white/65 p-8 text-center shadow-soft dark:bg-white/5 sm:p-12">
            <Icon name="search" className="mx-auto h-10 w-10 text-academy-gold-strong" />
            <h3 className="mt-4 text-2xl font-black text-academy-ink dark:text-white">Aucune session ne correspond à ces critères.</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-6 text-academy-muted">Modifiez les filtres ou créez une alerte pour être prévenu de la prochaine date disponible.</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" onClick={resetFilters} className="rounded-full bg-[#101a29] px-5 py-3 text-sm font-black text-white">Réinitialiser les filtres</button>
              <Link href="/contact?motif=alerte-planning" className="rounded-full bg-academy-gold px-5 py-3 text-sm font-black text-academy-gold-text">Créer une alerte</Link>
            </div>
          </div>
        )}
      </section>

      <MissingDates sessions={sortedSessions} active={active} />

      <section className="page-container py-16 sm:py-20">
        <div className="max-w-4xl">
          <p className="text-[11px] font-black uppercase tracking-[.22em] text-academy-gold-strong">Préparez votre inscription</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-academy-ink dark:text-white sm:text-5xl">Toutes les réponses avant de choisir votre session.</h2>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-academy-muted">Découvrez les formations, vérifiez votre financement et échangez avec l’équipe avant de réserver votre place.</p>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['01', 'Découvrir les formations', 'Comparer APS, A3P / APR, SSIAP 1, VTC et BTS.', '/formations-securite'],
            ['02', 'Trouver un financement', 'CPF, France Travail, employeur et autres solutions.', '/financements'],
            ['03', 'Recruter ou former', 'Alternance, POEI et montée en compétences.', '/entreprises'],
            ['04', 'Parler à Cassandre', 'Valider mon projet et mes prochaines étapes.', '/contact?motif=rdv'],
          ].map(([number, label, description, href]) => (
            <Link key={number} href={href} className="group flex min-h-[15rem] flex-col rounded-[1.5rem] border border-academy-line/70 bg-academy-surface p-5 shadow-[0_16px_45px_rgba(54,40,20,.06)] transition hover:-translate-y-1 hover:border-academy-gold">
              <span className="text-2xl font-black text-academy-gold">{number}</span>
              <h3 className="mt-6 text-lg font-black text-academy-ink dark:text-white">{label}</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-academy-muted">{description}</p>
              <span className="mt-auto flex items-center justify-between border-t border-academy-line/60 pt-4 text-xs font-black text-academy-ink dark:text-white">
                En savoir plus
                <Icon name="arrow" className="h-4 w-4 text-academy-gold-strong transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.18em] text-academy-gold-strong">Questions fréquentes</p>
            <h3 className="mt-3 text-2xl font-black text-academy-ink dark:text-white sm:text-3xl">Avant de réserver une place</h3>
            <div className="mt-5 grid gap-3">
              {[
                ['Comment savoir s’il reste des places ?', 'Le nombre affiché sur chaque session est synchronisé avec les informations publiées par l’équipe.'],
                ['Puis-je demander un financement avant de m’inscrire ?', 'Oui. Nous pouvons étudier votre situation avant la validation définitive de votre inscription.'],
                ['Que faire si aucune date ne me convient ?', 'Créez une alerte planning : l’équipe vous préviendra dès qu’une nouvelle session sera ouverte.'],
              ].map(([question, answer]) => (
                <details key={question} className="group rounded-2xl border border-academy-line/70 bg-academy-surface p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-black text-academy-ink dark:text-white">
                    {question}
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-academy-gold text-academy-gold-text transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 border-t border-academy-line/60 pt-3 text-sm font-semibold leading-6 text-academy-muted">{answer}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-[#101a29] p-6 text-white shadow-[0_25px_80px_rgba(16,26,41,.20)] sm:p-8">
            <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-academy-gold/15" />
            <div className="relative">
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-academy-gold">Besoin d’un conseil ?</p>
              <h3 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">Parlons de votre prochaine rentrée.</h3>
              <p className="mt-4 text-sm font-semibold leading-6 text-white/65">Cassandre vous aide à choisir la formation, la session et le financement adaptés à votre projet.</p>
              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-academy-gold text-sm font-black text-academy-gold-text">CM</span>
                  <span>
                    <span className="block text-xs font-black uppercase tracking-[.12em]">Cassandre</span>
                    <span className="mt-1 block text-xs font-semibold text-white/50">Responsable commerciale</span>
                  </span>
                </div>
                <Link href="/contact?motif=rdv" className="inline-flex items-center justify-center gap-2 rounded-full bg-academy-gold px-5 py-3.5 text-sm font-black text-academy-gold-text transition hover:-translate-y-0.5">
                  Réserver un échange
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RegistrationModal session={selectedSession} onClose={() => setSelectedSession(null)} />

      <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-2 rounded-[1.5rem] border border-white/70 bg-white/92 p-2 shadow-[0_18px_60px_rgba(17,17,17,.18)] backdrop-blur md:hidden">
        <Link href="tel:0422470768" className="rounded-2xl bg-[#101a29] px-3 py-3 text-center text-xs font-black text-white">Appeler</Link>
        <Link href="/contact?motif=alerte-planning" className="rounded-2xl border border-academy-line bg-white px-3 py-3 text-center text-xs font-black text-academy-ink">Alerte</Link>
        {nextSession ? (
          <button type="button" onClick={() => setSelectedSession(nextSession)} className="rounded-2xl bg-academy-gold px-3 py-3 text-center text-xs font-black text-academy-gold-text">S’inscrire</button>
        ) : (
          <Link href="/contact" className="rounded-2xl bg-academy-gold px-3 py-3 text-center text-xs font-black text-academy-gold-text">Infos</Link>
        )}
      </div>
    </main>
  );
}
