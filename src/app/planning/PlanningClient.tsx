'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { computedSeats, formatSessionDate, formatSessionPeriod, hasDetailedDeliveryPeriods } from '@/lib/public-sessions';
import { sessionLocationFilters, sessionMatchesLocation, type SessionLocationFilterKey } from '@/lib/session-location-filter';
import { formatTrainingPrice } from '@/lib/training-price';

type Session = any;
type CategoryKey = 'security' | 'fire' | 'vtc' | 'bts';
type FormationFilterKey = 'all' | 'aps' | 'a3p' | 'director' | 'ssiap' | 'vtc' | 'bts';
type ViewMode = 'list' | 'calendar';
type PlanningAccent = 'blue' | 'green' | 'orange' | 'red' | 'violet' | 'gold';

const planningThemeClasses: Record<PlanningAccent, string> = {
  blue: 'planning-theme-blue',
  green: 'planning-theme-green',
  orange: 'planning-theme-orange',
  red: 'planning-theme-red',
  violet: 'planning-theme-violet',
  gold: 'planning-theme-gold',
};

type IconName =
  | 'arrow'
  | 'calendar'
  | 'check'
  | 'clock'
  | 'location'
  | 'people'
  | 'search'
  | 'screen'
  | 'sparkles';

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
    slugs: ['ssiap-1', 'ssiap1', 'ssiap-2', 'ssiap2', 'ssiap-3', 'ssiap3', 'recyclage-remise-a-niveau-ssiap'],
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

const formationFilters: {
  key: Exclude<FormationFilterKey, 'all'>;
  label: string;
  eyebrow: string;
  description: string;
  category: CategoryKey;
  slugs: string[];
  accent: PlanningAccent;
}[] = [
  {
    key: 'aps',
    label: 'APS',
    eyebrow: 'Surveillance humaine',
    description: 'Agent de prévention et de sécurité',
    category: 'security',
    slugs: ['aps'],
    accent: 'blue',
  },
  {
    key: 'a3p',
    label: 'A3P / APR',
    eyebrow: 'Protection rapprochée',
    description: 'Agent privé de protection de personnes',
    category: 'security',
    slugs: ['a3p', 'a3p-apr'],
    accent: 'green',
  },
  {
    key: 'director',
    label: 'DIRIGEANT',
    eyebrow: 'DESP / DSSP',
    description: 'Diriger une entreprise de sécurité privée',
    category: 'security',
    slugs: ['desp', 'desp-dssp', 'desp-initial', 'desp-vae'],
    accent: 'orange',
  },
  {
    key: 'ssiap',
    label: 'SSIAP 1',
    eyebrow: 'Sécurité incendie',
    description: 'Agent de sécurité incendie',
    category: 'fire',
    slugs: ['ssiap-1', 'ssiap1', 'ssiap-2', 'ssiap2', 'ssiap-3', 'ssiap3', 'recyclage-remise-a-niveau-ssiap'],
    accent: 'red',
  },
  {
    key: 'vtc',
    label: 'VTC',
    eyebrow: 'Transport de personnes',
    description: 'Préparer le métier et l’examen VTC',
    category: 'vtc',
    slugs: ['vtc'],
    accent: 'violet',
  },
  {
    key: 'bts',
    label: 'BTS',
    eyebrow: 'Alternance',
    description: 'MOS, MCO, NDRC, CI et PI',
    category: 'bts',
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
    accent: 'gold',
  },
];

const alertOptions: {
  title: string;
  label: string;
  description: string;
  category: CategoryKey;
  formation: string;
  slugs: string[];
  accent: PlanningAccent;
}[] = [
  {
    title: 'DESP / DSSP',
    label: 'Direction sécurité',
    description: 'Créer, reprendre ou diriger une entreprise de sécurité privée.',
    category: 'security',
    formation: 'desp',
    slugs: ['desp', 'desp-dssp', 'desp-initial', 'desp-vae'],
    accent: 'orange',
  },
  {
    title: 'SSIAP 1',
    label: 'Sécurité incendie',
    description: 'Devenir agent de sécurité incendie et d’assistance à personnes.',
    category: 'fire',
    formation: 'ssiap-1',
    slugs: ['ssiap-1', 'ssiap1'],
    accent: 'red',
  },
  {
    title: 'Chauffeur VTC',
    label: 'Mobilité',
    description: 'Préparer l’examen et structurer son projet professionnel.',
    category: 'vtc',
    formation: 'vtc',
    slugs: ['vtc'],
    accent: 'violet',
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
    accent: 'gold',
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
  if (name === 'location') {
    return <svg {...common}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
  }
  if (name === 'people') {
    return <svg {...common}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
  }
  if (name === 'search') {
    return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
  }
  if (name === 'screen') {
    return <svg {...common}><rect x="3" y="4" width="18" height="13" rx="2.5" /><path d="M8 21h8M12 17v4" /></svg>;
  }
  return <svg {...common}><path d="m12 3 1.4 4.1L18 8.5l-4.6 1.4L12 14l-1.4-4.1L6 8.5l4.6-1.4L12 3ZM5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15ZM19 13l.8 2.2L22 16l-2.2.8L19 19l-.8-2.2L16 16l2.2-.8L19 13Z" /></svg>;
}

function planningThemeClass(accent: PlanningAccent = 'gold') {
  return planningThemeClasses[accent];
}

function planningAccentForSlug(value?: string): PlanningAccent {
  const slug = String(value || '').toLocaleLowerCase('fr');
  if (slug === 'aps' || slug.startsWith('aps-')) return 'blue';
  if (slug === 'a3p' || slug.startsWith('a3p-') || slug === 'apr') return 'green';
  if (slug.startsWith('desp') || slug.startsWith('dssp')) return 'orange';
  if (slug.includes('ssiap')) return 'red';
  if (slug === 'vtc' || slug.includes('chauffeur-vtc')) return 'violet';
  return 'gold';
}

function formationMatchesSlug(formation: (typeof formationFilters)[number], slug?: string) {
  if (!slug) return false;
  if (formation.slugs.includes(slug)) return true;
  if (formation.key === 'director') return slug.startsWith('desp') || slug.startsWith('dssp');
  if (formation.key === 'ssiap') return slug.includes('ssiap');
  if (formation.key === 'bts') return slug.startsWith('bts-');
  return false;
}

function sessionTitle(session: Session) {
  return session.training?.name || session.training?.title || session.title || 'Formation';
}

function formationFilterForSession(session: Session) {
  return formationFilters.find((formation) => formationMatchesSlug(formation, session.training?.slug));
}

function planningAccentForSession(session: Session): PlanningAccent {
  return formationFilterForSession(session)?.accent || planningAccentForSlug(session.training?.slug);
}

function planningThemeForSession(session: Session) {
  return planningThemeClass(planningAccentForSession(session));
}

function timelineTitle(session: Session) {
  return formationFilterForSession(session)?.label || sessionTitle(session);
}

function monthKey(value?: string | Date) {
  if (!value) return '';
  const date = new Date(value);
  return date.getUTCFullYear() + '-' + String(date.getUTCMonth() + 1).padStart(2, '0');
}

function timelineMonthLabel(value: Date) {
  const label = new Intl.DateTimeFormat('fr-FR', {
    month: 'short',
    timeZone: 'Europe/Paris',
    year: 'numeric',
  }).format(value).replace('.', '');
  return label.toUpperCase();
}

function timelineDateLabel(value?: string | Date) {
  if (!value) return '';
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    timeZone: 'Europe/Paris',
  }).format(new Date(value)).replace('.', '');
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

const fallbackPrices: Record<string, string> = {
  aps: '1 650 €',
  a3p: '4 200 €',
  'a3p-apr': '4 200 €',
  desp: '4 300 €',
  'desp-dssp': '4 300 €',
  'desp-initial': '4 300 €',
  'ssiap-1': '980 €',
  ssiap1: '980 €',
};

function displayPrice(session: Session) {
  return formatTrainingPrice(session, fallbackPrices[session.training?.slug || ''] || 'Sur devis');
}

const fallbackDurationHours: Record<string, number> = {
  aps: 175,
  a3p: 328,
  'a3p-apr': 328,
  desp: 245,
  'desp-dssp': 245,
  'desp-initial': 245,
  'ssiap-1': 67,
  ssiap1: 67,
};

function displayDuration(session: Session) {
  const slug = session.training?.slug || '';
  if (slug === 'a3p' || slug === 'a3p-apr') return '328 h';

  const durationSources = [session.durationLabel, session.publicNotes]
    .map((value) => String(value || '').trim())
    .filter(Boolean);

  for (const value of durationSources) {
    const match = value.match(/\b(\d[\d\s]{0,4})\s*(?:h|heures?)\b/i);
    if (match) return Number(match[1].replace(/\s/g, '')).toLocaleString('fr-FR') + ' h';
  }

  const fallback = fallbackDurationHours[slug];
  return fallback ? fallback.toLocaleString('fr-FR') + ' h' : 'À confirmer';
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

function displayPlanningPeriod(startDate?: string | Date | null, endDate?: string | Date | null) {
  return startDate && endDate ? formatSessionPeriod(startDate, endDate) : 'Dates à confirmer';
}

function deliveryPeriodRows(session: Session): { label: string; value: string; icon: IconName }[] {
  return [
    { label: 'À distance', value: displayPlanningPeriod(session.remoteStartDate, session.remoteEndDate), icon: 'screen' },
    { label: 'En présentiel', value: displayPlanningPeriod(session.inPersonStartDate, session.inPersonEndDate), icon: 'location' },
  ];
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
  const showDeliveryPeriods = hasDetailedDeliveryPeriods(session);
  const themeClass = planningThemeForSession(session);

  return (
    <article className={themeClass + ' group relative overflow-hidden rounded-[1.6rem] border bg-white p-4 shadow-[0_18px_55px_rgba(54,40,20,.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(54,40,20,.14)] dark:bg-white/5 sm:p-5 ' + (isNext ? 'planning-accent-border' : 'border-academy-line/70 dark:border-white/10')}>
      <span aria-hidden="true" className="planning-accent-indicator absolute inset-y-0 left-0 w-1" />
      {isNext ? (
        <span className="absolute left-4 top-0 rounded-b-xl bg-[#101a29] px-3 py-1 text-[9px] font-black uppercase tracking-[.14em] text-white sm:left-5">
          Prochaine session
        </span>
      ) : null}

      <div className="grid gap-4 pt-2 lg:grid-cols-[5.5rem_minmax(0,1.3fr)_minmax(17rem,.8fr)_auto] lg:items-center">
        <div className="flex items-center gap-3 lg:block">
          <div className="planning-neutral-action grid h-[4.6rem] w-[4.6rem] shrink-0 place-items-center rounded-2xl text-center">
            <span>
              <span className="block text-2xl font-black leading-none">{date.day}</span>
              <span className="mt-1 block text-[10px] font-black uppercase tracking-[.12em] text-white/58">{date.month}</span>
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
          {showDeliveryPeriods ? <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {deliveryPeriodRows(session).map((period) => <div key={period.label} className="flex items-start gap-3 rounded-[1rem] border border-academy-line/60 bg-academy-bg/55 px-3.5 py-3 dark:border-white/10 dark:bg-white/5">
              <span className="planning-accent-text grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-academy-line/70 bg-white dark:border-white/10 dark:bg-white/10">
                <Icon name={period.icon} className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-[9px] font-black uppercase tracking-[.14em] text-academy-muted/70">{period.label}</span>
                <span className="mt-1 block text-[13px] font-black leading-5 text-academy-ink dark:text-white sm:text-sm">{period.value}</span>
              </span>
            </div>)}
          </div> : <p className="mt-2 text-sm font-semibold leading-6 text-academy-muted">
            {formatSessionPeriod(session.startDate, session.endDate)}
            {session.examDate ? ' · Examen le ' + formatSessionDate(session.examDate) : ''}
          </p>}
          {showDeliveryPeriods && session.examDate ? <p className="mt-2 text-sm font-semibold leading-6 text-academy-muted">Examen le {formatSessionDate(session.examDate)}</p> : null}
          {session.location ? (
            <p className="mt-2 flex items-center gap-2 text-sm font-black text-academy-muted">
              <Icon name="location" className="planning-accent-text h-4 w-4 shrink-0" />
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
            <span className="block text-[9px] font-black uppercase tracking-[.14em] text-academy-muted/70">Durée</span>
            <span className="mt-1 flex items-center gap-1.5 text-base font-black text-academy-ink dark:text-white">
              <Icon name="clock" className="planning-accent-text h-4 w-4" />
              {displayDuration(session)}
            </span>
          </div>
        </div>

        <div className="flex gap-2 lg:flex-col">
          <button
            type="button"
            onClick={() => onRegister(session)}
            className="planning-neutral-action inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-black transition hover:-translate-y-0.5"
          >
            Voir la session
            <Icon name="arrow" className="h-4 w-4" />
          </button>
          <Link
            href={infoHref(session)}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-academy-line bg-white px-5 py-3 text-sm font-black text-academy-ink transition hover:border-academy-ink/35 dark:bg-white/10 dark:text-white"
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
  const timeline = useMemo(() => {
    const firstSessionDate = new Date(Math.min(...sessions.map((session) => +new Date(session.startDate))));
    const finalSessionDate = new Date(Math.max(...sessions.map((session) => +new Date(session.examDate || session.endDate || session.startDate))));
    const start = new Date(Date.UTC(firstSessionDate.getUTCFullYear(), firstSessionDate.getUTCMonth(), 1));
    const end = new Date(Date.UTC(finalSessionDate.getUTCFullYear(), finalSessionDate.getUTCMonth() + 1, 1));
    const total = Math.max(+end - +start, 1);
    const months: { key: string; label: string; left: number; width: number }[] = [];

    for (let cursor = new Date(start); cursor < end; cursor = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 1))) {
      const next = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 1));
      months.push({
        key: monthKey(cursor),
        label: timelineMonthLabel(cursor),
        left: ((+cursor - +start) / total) * 100,
        width: ((+next - +cursor) / total) * 100,
      });
    }

    return { start, end, total, months };
  }, [sessions]);

  function sessionPosition(session: Session) {
    const start = Math.max(+new Date(session.startDate), +timeline.start);
    const finish = Math.min(+new Date(session.examDate || session.endDate || session.startDate), +timeline.end);
    const rawLeft = ((start - +timeline.start) / timeline.total) * 100;
    const rawWidth = ((Math.max(finish, start) - start) / timeline.total) * 100;
    const width = Math.min(100, Math.max(10, rawWidth));
    return { left: Math.min(rawLeft, 100 - width), width };
  }

  return (
    <div className="relative overflow-hidden rounded-[2.4rem] bg-[#101a29] px-4 py-8 text-white shadow-[0_30px_90px_rgba(16,26,41,.24)] sm:px-7 sm:py-10 lg:px-10 lg:py-12">
      <div className="absolute -right-40 -top-48 h-[32rem] w-[32rem] rounded-full bg-academy-gold/[.08]" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="inline-flex rounded-full border border-academy-gold/45 bg-academy-gold/10 px-4 py-2 text-[10px] font-black uppercase tracking-[.16em] text-academy-gold">
            Vue calendrier
          </span>
          <h3 className="mt-5 max-w-4xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Visualisez les parcours dans le temps.
          </h3>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-6 text-white/62 sm:text-base">
            Comparez les sessions, anticipez les examens et identifiez rapidement la meilleure rentrée.
          </p>
        </div>

      </div>

      <p className="relative mt-5 text-[10px] font-black uppercase tracking-[.14em] text-white/45 sm:hidden">
        Faites glisser le calendrier horizontalement
      </p>

      <div className="relative mt-7 overflow-x-auto rounded-[1.7rem] bg-[#f8f4ec] text-[#171712] shadow-[inset_0_0_0_1px_rgba(255,255,255,.2)]">
        <div className="min-w-[68rem] p-5 sm:p-7">
          <div className="grid grid-cols-[15rem_minmax(48rem,1fr)] border-b border-[#d9cfbd]">
            <div className="px-2 pb-5 text-[11px] font-black uppercase tracking-[.12em] text-[#6d685f]">Formation</div>
            <div className="relative min-h-10">
              {timeline.months.map((item) => (
                <div key={item.key} className="absolute inset-y-0 border-l border-[#dfd5c4] px-3 text-center text-[11px] font-black uppercase tracking-[.08em] text-[#6d685f]" style={{ left: item.left + '%', width: item.width + '%' }}>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <div>
            {sessions.map((session) => {
              const position = sessionPosition(session);
              const formation = formationFilterForSession(session);
              const hasExam = Boolean(session.examDate);
              const themeClass = planningThemeForSession(session);

              return (
                <div key={session.id} className="grid min-h-24 grid-cols-[15rem_minmax(48rem,1fr)] border-b border-[#e6dece] last:border-b-0">
                  <div className={themeClass + ' flex flex-col justify-center px-2 py-4'}>
                    <div className="flex items-center gap-2">
                      <span aria-hidden="true" className="planning-accent-indicator h-2 w-2 shrink-0 rounded-full" />
                      <p className="text-lg font-black tracking-tight">{timelineTitle(session)}</p>
                    </div>
                    <p className="mt-1 text-[11px] font-semibold text-[#6d685f]">{formation?.eyebrow || session.training?.shortDescription || 'Formation professionnelle'}</p>
                  </div>

                  <div className="relative min-h-24 overflow-hidden">
                    {timeline.months.map((item) => (
                      <span key={item.key} aria-hidden="true" className="pointer-events-none absolute inset-y-0 border-l border-[#dfd5c4]" style={{ left: item.left + '%' }} />
                    ))}

                    <button
                      type="button"
                      onClick={() => onRegister(session)}
                      title={hasExam ? 'Examen le ' + formatSessionDate(session.examDate) : 'Voir la session'}
                      className={themeClass + ' planning-calendar-bar group absolute top-1/2 flex h-12 -translate-y-1/2 items-center justify-between gap-3 rounded-full px-4 text-left text-xs font-black transition hover:-translate-y-[54%]'}
                      style={{ left: position.left + '%', width: position.width + '%' }}
                    >
                      <span className="truncate">{timelineDateLabel(session.startDate)} → {timelineDateLabel(session.endDate)}</span>
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#111923] text-[9px] font-black text-white transition group-hover:scale-110">
                        {hasExam ? 'E' : '›'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="ml-[15rem] mt-1 px-2 pt-4 text-[10px] font-black uppercase tracking-[.08em] text-[#6d685f]">
            E = examen · cliquez sur un parcours pour voir la session
          </p>
        </div>
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
  const sessionLabel = formatSessionPeriod(session.startDate, session.endDate);
  const hiddenSession = title + ' — ' + sessionLabel;
  const seats = seatText(session);
  const date = shortDate(session.startDate);
  const themeClass = planningThemeForSession(session);
  const sessionDetails: [string, string][] = [
    ...(hasDetailedDeliveryPeriods(session) ? deliveryPeriodRows(session).map(({ label, value }) => [label, value] as [string, string]) : [['Période', sessionLabel] as [string, string]]),
    ['Examen', session.examDate ? formatSessionDate(session.examDate) : 'Selon le calendrier de la session'],
    ['Lieu', session.location || 'Communiqué prochainement'],
    ['Durée', displayDuration(session)],
    ['Tarif', displayPrice(session)],
  ];

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center px-3 py-4 sm:px-5" role="dialog" aria-modal="true" aria-labelledby="registration-modal-title">
      <button type="button" aria-label="Fermer la fenêtre" onClick={onClose} className="absolute inset-0 bg-[#07101e]/75 backdrop-blur-md" />

      <div className={themeClass + ' reveal relative grid max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border border-white/20 bg-academy-surface shadow-[0_35px_120px_rgba(0,0,0,.42)] lg:grid-cols-[1.35fr_.85fr]'}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-[#192537] text-xl font-black text-white transition hover:-translate-y-0.5"
        >
          ×
        </button>

        <div className="p-5 sm:p-8 lg:p-10">
          <p className="planning-accent-text text-[11px] font-black uppercase tracking-[.2em]">Détail de la session</p>
          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="planning-neutral-action grid h-24 w-24 shrink-0 place-items-center rounded-[1.5rem] text-center">
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
                <span className="planning-accent-soft planning-accent-text inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-black">
                  <Icon name="clock" className="h-3.5 w-3.5" />
                  {displayDuration(session)} de formation
                </span>
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {sessionDetails.map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-academy-line/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                <p className="text-[9px] font-black uppercase tracking-[.16em] text-academy-muted/70">{label}</p>
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
            <p className="text-[9px] font-black uppercase tracking-[.16em] text-academy-muted/70">Financement</p>
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
            <button type="submit" className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-academy-gold px-5 py-4 text-sm font-black text-academy-gold-text shadow-soft transition hover:-translate-y-0.5">
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
  activeFormation,
}: {
  sessions: Session[];
  activeFormation: FormationFilterKey;
}) {
  const selectedFormation = activeFormation === 'all' ? null : formationFilters.find((formation) => formation.key === activeFormation);
  const missing = alertOptions.filter((option) => {
    if (selectedFormation && !option.slugs.some((slug) => selectedFormation.slugs.includes(slug))) return false;
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
              className={planningThemeClass(option.accent) + ' planning-accent-card group rounded-[1.5rem] border bg-academy-surface p-5 shadow-[0_16px_45px_rgba(54,40,20,.06)] transition hover:-translate-y-1'}
            >
              <div className="flex items-center justify-between">
                <span className="planning-accent-icon grid h-9 w-9 place-items-center rounded-full text-[10px] font-black">
                  0{index + 1}
                </span>
                <span className="planning-accent-text text-[9px] font-black uppercase tracking-[.14em]">{option.label}</span>
              </div>
              <h3 className="mt-6 text-xl font-black text-academy-ink dark:text-white">{option.title}</h3>
              <p className="mt-3 min-h-[3.5rem] text-sm font-semibold leading-6 text-academy-muted">{option.description}</p>
              <span className="mt-6 flex items-center justify-between border-t border-academy-line/60 pt-4 text-xs font-black text-academy-ink dark:text-white">
                Être prévenu à l’ouverture
                <span className="planning-neutral-action grid h-8 w-8 place-items-center rounded-full transition group-hover:translate-x-1">
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
  const [activeFormation, setActiveFormation] = useState<FormationFilterKey>('all');
  const [locationFilter, setLocationFilter] = useState<SessionLocationFilterKey>('all');
  const [view, setView] = useState<ViewMode>('list');
  const [showAll, setShowAll] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const locations = useMemo(
    () => Array.from(new Set(sortedSessions.map((session) => session.location).filter(Boolean))) as string[],
    [sortedSessions],
  );
  const formationCount = useMemo(
    () => new Set(sortedSessions.map((session) => session.training?.slug || sessionTitle(session))).size,
    [sortedSessions],
  );
  const formationSessionCounts = useMemo(
    () => Object.fromEntries(formationFilters.map((formation) => [formation.key, sortedSessions.filter((session) => formationMatchesSlug(formation, session.training?.slug)).length])) as Record<Exclude<FormationFilterKey, 'all'>, number>,
    [sortedSessions],
  );
  const selectedFormationDetails = activeFormation === 'all' ? null : formationFilters.find((formation) => formation.key === activeFormation) || null;
  const activePlanningTheme = planningThemeClass(selectedFormationDetails?.accent || 'gold');

  const filteredSessions = useMemo(() => {
    const selectedFormation = activeFormation === 'all' ? null : formationFilters.find((formation) => formation.key === activeFormation);
    return sortedSessions.filter((session) => {
      if (selectedFormation && !formationMatchesSlug(selectedFormation, session.training?.slug)) return false;
      return sessionMatchesLocation(session, locationFilter);
    });
  }, [activeFormation, locationFilter, sortedSessions]);

  const visibleSessions = showAll ? filteredSessions : filteredSessions.slice(0, 6);

  function scrollToSessions() {
    window.requestAnimationFrame(() => document.getElementById('sessions')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  function chooseFormation(formation: FormationFilterKey) {
    setActiveFormation(formation);
    setShowAll(false);
    setView('list');
    scrollToSessions();
  }

  function showCalendar() {
    setView('calendar');
    scrollToSessions();
  }

  return (
    <main className="overflow-hidden pb-24">
      <section className="relative isolate overflow-hidden border-b border-academy-line/70 bg-[#f7f1e7] px-4 py-14 text-[#141820] sm:py-16 lg:py-20">
        <div className="absolute -right-40 -top-48 -z-10 h-[34rem] w-[34rem] rounded-full bg-academy-gold/20" />
        <div className="absolute -bottom-48 left-[38%] -z-10 h-[28rem] w-[28rem] rounded-full border border-academy-gold/20" />

        <div className="page-container grid gap-9 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d9b548] bg-white/60 px-4 py-2 text-[10px] font-black uppercase tracking-[.2em] text-[#8f6810]">
              <Icon name="calendar" className="h-4 w-4" />
              Planning des formations
            </span>
            <h1 className="mt-6 max-w-5xl text-4xl font-black tracking-[-.045em] sm:text-5xl lg:text-[4.35rem] lg:leading-[1.02]">
              Trouvez votre formation.<br />
              <span className="text-[#b9820a]">Choisissez votre date.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[#5f625f] sm:text-lg">
              APS, A3P / APR, Dirigeant, SSIAP 1, VTC ou BTS : accédez directement au bon parcours, comparez les rentrées et vérifiez les places disponibles.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#choisir-formation" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111b2a] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5">
                Choisir ma formation
                <Icon name="arrow" className="h-4 w-4 text-academy-gold" />
              </a>
              <button type="button" onClick={showCalendar} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#cfc3ae] bg-white/70 px-6 py-4 text-sm font-black text-[#141820] transition hover:-translate-y-0.5 hover:border-academy-gold">
                Voir le calendrier
                <Icon name="calendar" className="h-4 w-4 text-[#b9820a]" />
              </button>
            </div>
          </div>

          <div className="reveal relative overflow-hidden rounded-[2rem] bg-[#111b2a] p-6 text-white shadow-[0_30px_90px_rgba(17,27,42,.18)] sm:p-8">
            <div className="absolute -right-24 -top-28 h-64 w-64 rounded-full bg-academy-gold/12" />
            <div className="relative">
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-academy-gold">Votre planning, simplement</p>
              <h2 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">Du projet à l’inscription en trois étapes.</h2>
              <div className="mt-7 divide-y divide-white/10 border-y border-white/10">
                {[
                  ['01', 'Choisissez la formation', 'Accès direct à chaque parcours.'],
                  ['02', 'Comparez les dates', 'Liste détaillée ou frise calendrier.'],
                  ['03', 'Demandez votre inscription', 'Sans quitter la page.'],
                ].map(([number, label, description]) => (
                  <div key={number} className="grid grid-cols-[2.7rem_1fr] gap-4 py-4">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-academy-gold text-[10px] font-black text-academy-gold-text">{number}</span>
                    <span>
                      <span className="block text-sm font-black">{label}</span>
                      <span className="mt-1 block text-xs font-semibold text-white/50">{description}</span>
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-5 flex items-center gap-2 text-xs font-bold text-white/55">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Dates et places mises à jour depuis l’administration
              </p>
            </div>
          </div>
        </div>

        <div className="page-container mt-10 grid grid-cols-2 gap-4 border-t border-[#d9cfbd] pt-6 lg:grid-cols-4">
          {[
            [String(sortedSessions.length), 'sessions ouvertes'],
            [String(formationCount), 'formations avec dates'],
            [String(locations.length), locations.length > 1 ? 'centres disponibles' : 'centre disponible'],
            ['Temps réel', 'places et calendrier'],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="text-xl font-black text-[#141820] sm:text-2xl">{value}</p>
              <p className="mt-1 text-[9px] font-black uppercase tracking-[.14em] text-[#8f6810]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="choisir-formation" className="relative overflow-hidden bg-[#101a29] py-14 text-white sm:py-16">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-academy-gold/[.07]" />
        <div className="page-container relative">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-academy-gold">Accès direct</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Quelle formation recherchez-vous ?</h2>
              <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-white/58 sm:text-base">Cliquez sur votre parcours pour afficher immédiatement les dates correspondantes.</p>
            </div>
            <button type="button" onClick={() => chooseFormation('all')} className={'w-fit rounded-full px-5 py-3 text-xs font-black transition ' + (activeFormation === 'all' ? 'bg-academy-gold text-academy-gold-text' : 'border border-white/15 bg-white/5 text-white hover:bg-white/10')}>
              Toutes les formations
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {formationFilters.map((formation, index) => {
              const count = formationSessionCounts[formation.key];
              const selected = activeFormation === formation.key;
              return (
                <button
                  key={formation.key}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => chooseFormation(formation.key)}
                  className={planningThemeClass(formation.accent) + ' planning-formation-card group flex min-h-[13.5rem] flex-col rounded-[1.45rem] border p-5 text-left transition duration-300 hover:-translate-y-1 ' + (selected ? 'planning-formation-card-selected' : '')}
                >
                  <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.14em] text-white/55">
                    <span aria-hidden="true" className="planning-accent-indicator h-2 w-2 shrink-0 rounded-full" />
                    0{index + 1} · {formation.eyebrow}
                  </span>
                  <span className="mt-5 block text-xl font-black tracking-tight">{formation.label}</span>
                  <span className="mt-2 block text-xs font-semibold leading-5 text-white/48">{formation.description}</span>
                  <span className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-black uppercase tracking-[.08em]">
                    {count ? count + (count > 1 ? ' sessions' : ' session') : 'Créer une alerte'}
                    <span className={'grid h-7 w-7 place-items-center rounded-full transition group-hover:translate-x-1 ' + (selected ? 'bg-academy-gold text-academy-gold-text' : 'bg-white/10 text-white')}>
                      <Icon name="arrow" className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="sessions" className={activePlanningTheme + ' page-container py-14 sm:py-20'}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-2xl font-black text-academy-ink dark:text-white">
              {filteredSessions.length} {filteredSessions.length > 1 ? 'sessions disponibles' : 'session disponible'}
            </p>
            <p className="mt-1 text-sm font-semibold text-academy-muted">
              {view === 'list' ? 'Triées par prochaine date de rentrée' : 'Affichées dans le calendrier'}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex w-fit items-center rounded-full border border-academy-line bg-white p-1 dark:bg-white/5" aria-label="Filtrer les sessions par centre">
              <span className="hidden px-3 text-[9px] font-black uppercase tracking-[.12em] text-academy-muted sm:inline">Centre</span>
              {sessionLocationFilters.map((filter) => {
                const selected = locationFilter === filter.key;
                return (
                  <button
                    key={filter.key}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      setLocationFilter(filter.key);
                      setShowAll(false);
                    }}
                    className={'rounded-full px-3.5 py-2.5 text-xs font-black transition sm:px-4 ' + (selected ? 'planning-neutral-action' : 'text-academy-muted hover:text-academy-ink')}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            <div className="flex w-fit rounded-full border border-academy-line bg-white p-1 dark:bg-white/5">
              <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')} className={'rounded-full px-4 py-2.5 text-xs font-black transition ' + (view === 'list' ? 'planning-neutral-action' : 'text-academy-muted hover:text-academy-ink')}>Vue liste</button>
              <button type="button" aria-pressed={view === 'calendar'} onClick={() => setView('calendar')} className={'rounded-full px-4 py-2.5 text-xs font-black transition ' + (view === 'calendar' ? 'planning-neutral-action' : 'text-academy-muted hover:text-academy-ink')}>Vue calendrier</button>
            </div>
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
                  <button type="button" onClick={() => setShowAll(true)} className="planning-accent-hover rounded-full border border-academy-line bg-white px-6 py-3.5 text-sm font-black text-academy-ink shadow-soft transition hover:-translate-y-0.5 dark:bg-white/5 dark:text-white">
                    Voir toutes les dates ({filteredSessions.length})
                  </button>
                </div>
              ) : null}
            </>
          ) : (
            <div className="mt-8"><CalendarView sessions={filteredSessions} onRegister={setSelectedSession} /></div>
          )
        ) : (
          <div className="mt-6 rounded-[2rem] border border-dashed border-academy-line bg-white/65 p-8 text-center shadow-soft dark:bg-white/5 sm:p-12">
            <Icon name="search" className="planning-accent-text mx-auto h-10 w-10" />
            <h3 className="mt-4 text-2xl font-black text-academy-ink dark:text-white">Aucune session ouverte pour cette sélection.</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-6 text-academy-muted">Choisissez un autre centre, consultez toutes les sessions ou créez une alerte pour être prévenu de la prochaine date disponible.</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" onClick={() => { setLocationFilter('all'); chooseFormation('all'); }} className="rounded-full bg-[#101a29] px-5 py-3 text-sm font-black text-white">Voir toutes les sessions</button>
              <Link href="/contact?motif=alerte-planning" className="planning-neutral-action rounded-full px-5 py-3 text-sm font-black">Créer une alerte</Link>
            </div>
          </div>
        )}
      </section>

      <MissingDates sessions={sortedSessions} activeFormation={activeFormation} />

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

      <div className="fixed inset-x-3 bottom-[calc(.75rem+env(safe-area-inset-bottom))] z-40 grid grid-cols-3 gap-2 rounded-[1.5rem] border border-white/70 bg-white/92 p-2 shadow-[0_18px_60px_rgba(17,17,17,.18)] backdrop-blur md:hidden">
        <Link href="tel:0422470768" className="rounded-2xl bg-[#101a29] px-3 py-3 text-center text-xs font-black text-white">Appeler</Link>
        <Link href="/contact?motif=alerte-planning" className="rounded-2xl border border-academy-line bg-white px-3 py-3 text-center text-xs font-black text-academy-ink">Alerte</Link>
        {nextSession ? (
          <button type="button" onClick={() => setSelectedSession(nextSession)} className="planning-neutral-action rounded-2xl px-3 py-3 text-center text-xs font-black">S’inscrire</button>
        ) : (
          <Link href="/contact" className="rounded-2xl bg-academy-gold px-3 py-3 text-center text-xs font-black text-academy-gold-text">Infos</Link>
        )}
      </div>
    </main>
  );
}
