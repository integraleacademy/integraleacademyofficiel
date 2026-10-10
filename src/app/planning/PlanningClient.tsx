'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { formatSessionDate, formatSessionPeriod, hasDetailedDeliveryPeriods } from '@/lib/public-sessions';
import { getSessionSeatAvailability, resolveSessionSeatCapacity } from '@/lib/session-seat-availability';
import { sessionLocationFilters, sessionMatchesLocation, type SessionLocationFilterKey } from '@/lib/session-location-filter';
import { formatTrainingPrice } from '@/lib/training-price';
import { planningFormationHref } from '@/lib/planning-data';
import { vtcCourse } from '@/data/vtc';
import { planningMonths, sessionMatchesMonth } from '@/lib/planning-filters';
import { planningRegistrationAction } from '@/lib/planning-registration';
import { PlanningRegistration } from './PlanningRegistration';

type Session = any;
type CategoryKey = 'security' | 'fire' | 'vtc' | 'bts';
type FormationFilterKey = 'all' | 'aps' | 'a3p' | 'director' | 'ssiap' | 'vtc' | 'bts' | 'other';
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
    intro: 'APS, A3P et direction d’entreprise de sécurité privée.',
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
    label: 'A3P',
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
    label: 'SSIAP',
    eyebrow: 'Sécurité incendie',
    description: 'SSIAP 1, 2, 3 et maintien des compétences',
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
    description: 'MOS, MCO, NDRC, CI, PI et CG',
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
  return session.title || session.training?.name || session.training?.title || 'Formation';
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
  return sessionTitle(session);
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
  aps: '1 700 € TTC',
  a3p: '4 250 € TTC',
  'a3p-apr': '4 250 € TTC',
  desp: '4 350 € TTC',
  'desp-dssp': '4 350 € TTC',
  'desp-initial': '4 350 € TTC',
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

function maximumSeatCapacity(session: Session) {
  const slug = String(session.training?.slug || '').toLocaleLowerCase('fr');
  if (slug === 'sst' || slug.startsWith('sst-')) return 10;
  return 12;
}

function planningSeatAvailability(session: Session) {
  const capacity = resolveSessionSeatCapacity(session, maximumSeatCapacity(session));
  return getSessionSeatAvailability(session, capacity);
}

function alertHref(formation: string) {
  return '/contact?motif=alerte-planning&formation=' + encodeURIComponent(formation);
}

function displayPlanningPeriod(startDate?: string | Date | null, endDate?: string | Date | null) {
  return startDate && endDate ? formatSessionPeriod(startDate, endDate) : 'Dates à confirmer';
}

function deliveryPeriodRows(session: Session): { label: string; value: string; icon: IconName }[] {
  return [
    { label: '', value: displayPlanningPeriod(session.startDate, session.endDate), icon: 'calendar' },
    { label: 'À distance', value: displayPlanningPeriod(session.remoteStartDate, session.remoteEndDate), icon: 'screen' },
    { label: 'En présentiel', value: displayPlanningPeriod(session.inPersonStartDate, session.inPersonEndDate), icon: 'location' },
  ];
}

function SessionCard({
  session,
  isNext,
  onSelect,
}: {
  session: Session;
  isNext: boolean;
  onSelect: (session: Session) => void;
}) {
  const date = shortDate(session.startDate);
  const seatAvailability = planningSeatAvailability(session);
  const showDeliveryPeriods = hasDetailedDeliveryPeriods(session);
  const isVtcExam = session.scheduleKind === 'vtc-exam';
  const themeClass = planningThemeForSession(session);
  const action = planningRegistrationAction(session);

  return (
    <article className={themeClass + ' group relative overflow-hidden rounded-[1.6rem] border bg-white p-4 shadow-[0_18px_55px_rgba(54,40,20,.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(54,40,20,.14)] dark:bg-white/5 sm:p-5 ' + (isNext ? 'planning-accent-border' : 'border-academy-line/70 dark:border-white/10')}>
      <span aria-hidden="true" className="planning-accent-indicator absolute inset-y-0 left-0 w-1" />
      {isNext ? (
        <span className="absolute left-4 top-0 rounded-b-xl bg-[#101a29] px-3 py-1 text-xs font-black uppercase tracking-[.14em] text-white sm:left-5">
          {isVtcExam ? 'Prochaine échéance VTC' : 'Prochaine session'}
        </span>
      ) : null}

      <div className="grid gap-4 pt-2 lg:grid-cols-[5.5rem_minmax(0,1fr)_13rem] lg:items-start">
        <div className="flex items-center gap-3 lg:block">
          <div className="planning-neutral-action grid h-[4.6rem] w-[4.6rem] shrink-0 place-items-center rounded-2xl text-center">
            <span>
              <span className="block text-2xl font-black leading-none">{date.day}</span>
              <span className="mt-1 block text-xs font-black uppercase tracking-[.12em] text-white/58">{date.month}</span>
            </span>
          </div>
          <p className="text-xs font-black uppercase tracking-[.14em] text-academy-muted lg:mt-2 lg:text-center">
            {new Date(session.startDate).getUTCFullYear()}
          </p>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-black tracking-tight text-academy-ink dark:text-white sm:text-2xl">
              {sessionTitle(session)}
            </h3>
            {session.status === 'COMING_SOON' ? <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-sm font-bold text-amber-900">Ouverture prochaine</span> : session.status === 'FULL' || !isVtcExam ? <span className={'session-seats-badge rounded-full border px-3 py-1 text-xs font-black ' + seatAvailability.badgeClassName}>
              {seatAvailability.label}
            </span> : null}
          </div>
          {isVtcExam ? <div className="mt-4">
            <p className="text-sm font-semibold leading-6 text-academy-muted">{vtcCourse.startDescription}</p>
            <dl className="mt-3 grid gap-2 sm:grid-cols-3">
              {[
                ['Date limite d’inscription', session.vtcDates.deadline],
                ['Examen théorique', session.vtcDates.theory],
                ['Examen pratique', session.vtcDates.practical],
              ].map(([label, value]) => <div key={label} className="rounded-2xl border border-academy-line/60 bg-academy-bg/55 px-3 py-3 dark:border-white/10 dark:bg-white/5">
                <dt className="text-xs font-black uppercase tracking-[.1em] text-academy-muted">{label}</dt>
                <dd className="mt-1 text-sm font-black text-academy-ink dark:text-white">{value ? formatSessionDate(value) : 'À confirmer'}</dd>
              </div>)}
            </dl>
            <p className="mt-3 text-xs font-semibold leading-5 text-academy-muted">Hybride : théorie en ligne et pratique en présentiel. Frais d’examen et véhicule double commande inclus.</p>
            <p className="mt-2 text-xs leading-5 text-academy-muted">{vtcCourse.examNotice}</p>
          </div> : showDeliveryPeriods ? <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {deliveryPeriodRows(session).map((period, periodIndex) => <div key={period.label || 'dates'} className={`flex items-start gap-3 rounded-[1rem] border px-3.5 py-3 ${periodIndex === 0 ? 'planning-accent-soft sm:col-span-2' : 'border-academy-line/60 bg-academy-bg/55 dark:border-white/10 dark:bg-white/5'}`}>
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${periodIndex === 0 ? 'planning-accent-icon' : 'planning-accent-text border border-academy-line/70 bg-white dark:border-white/10 dark:bg-white/10'}`}>
                <Icon name={period.icon} className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                {period.label ? <span className="block text-xs font-black uppercase tracking-[.14em] text-academy-muted/70">{period.label}</span> : null}
                <span className={`${period.label ? 'mt-1 ' : ''}block text-[13px] font-black leading-5 text-academy-ink dark:text-white sm:text-sm`}>{period.value}</span>
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

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl border border-academy-line/60 bg-academy-bg/65 px-3 py-2.5 dark:border-white/10 dark:bg-black/15">
            <span className="block text-xs font-black uppercase tracking-[.14em] text-academy-muted/70">Tarif</span>
            <span className="mt-1 block text-base font-black text-academy-ink dark:text-white">{displayPrice(session)}</span>
          </div>
          <div className="rounded-2xl border border-academy-line/60 bg-academy-bg/65 px-3 py-2.5 dark:border-white/10 dark:bg-black/15">
            <span className="block text-xs font-black uppercase tracking-[.14em] text-academy-muted/70">Durée</span>
            <span className="mt-1 flex items-center gap-1.5 text-base font-black text-academy-ink dark:text-white">
              <Icon name="clock" className="planning-accent-text h-4 w-4" />
              {displayDuration(session)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center lg:col-start-2 lg:col-span-2">
          <button type="button" onClick={() => onSelect(session)} className="planning-neutral-action inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold">
            {action.label}<Icon name="arrow" className="h-4 w-4" />
          </button>
          <Link href={planningFormationHref(session)} className="py-2 text-center text-sm font-semibold underline underline-offset-4">Programme et prérequis</Link>
        </div>
      </div>
    </article>
  );
}

function CalendarView({ sessions, onSelect, monthFilter }: { sessions: Session[]; onSelect: (session: Session) => void; monthFilter: string }) {
  const months = monthFilter === 'all' ? planningMonths(sessions) : [monthFilter];
  const [selectedMonth, setSelectedMonth] = useState('');
  const month = months.includes(selectedMonth) ? selectedMonth : months[0];
  if (!month) return null;
  const index = months.indexOf(month);
  const label = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(month + '-01T12:00:00Z'));
  const visible = sessions.filter((session) => sessionMatchesMonth(session, month));
  return <div className="mt-5 overflow-hidden rounded-3xl border border-academy-line bg-academy-surface shadow-soft">
    <div className="flex items-center justify-between gap-3 bg-[#101a29] p-4 text-white sm:p-6">
      <button type="button" disabled={index === 0} onClick={() => setSelectedMonth(months[index - 1])} aria-label="Mois précédent" className="h-11 w-11 rounded-full border border-white/30 text-xl disabled:opacity-30">‹</button>
      <h3 className="text-center text-xl font-black capitalize sm:text-2xl">{label}</h3>
      <button type="button" disabled={index === months.length - 1} onClick={() => setSelectedMonth(months[index + 1])} aria-label="Mois suivant" className="h-11 w-11 rounded-full border border-white/30 text-xl disabled:opacity-30">›</button>
    </div>
    <p className="border-b border-academy-line px-5 py-3 text-sm text-academy-muted">Sessions qui se déroulent sur ce mois. Les périodes de formation et les examens sont indiqués séparément.</p>
    <div className="divide-y divide-academy-line">
      {visible.map((session) => {
        const vtc = session.scheduleKind === 'vtc-exam';
        const rows = vtc ? [
          ['Inscription avant le', formatSessionDate(session.startDate)],
          ['Examen théorique', formatSessionDate(session.endDate)],
          ['Examen pratique', session.examDate ? formatSessionDate(session.examDate) : 'À confirmer'],
        ] : [
          ['Formation', formatSessionPeriod(session.startDate, session.endDate)],
          ...(session.remoteStartDate && session.remoteEndDate ? [['À distance', formatSessionPeriod(session.remoteStartDate, session.remoteEndDate)]] : []),
          ...(session.inPersonStartDate && session.inPersonEndDate ? [['En présentiel', formatSessionPeriod(session.inPersonStartDate, session.inPersonEndDate)]] : []),
          ...(session.examDate ? [['Examen', formatSessionDate(session.examDate)]] : []),
        ];
        return <article key={session.id} className={planningThemeForSession(session) + ' p-5 sm:p-6'}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div><h4 className="text-lg font-black">{timelineTitle(session)}</h4><p className="mt-1 text-sm text-academy-muted">{session.location}</p></div>
            <span className="planning-accent-soft rounded-full border px-3 py-1 text-sm font-bold">{session.status === 'COMING_SOON' ? 'Ouverture prochaine' : session.status === 'FULL' ? 'Complet' : vtc ? 'Échéances VTC' : planningSeatAvailability(session).label}</span>
          </div>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{rows.map(([title, value]) => <div key={title} className="rounded-xl border border-academy-line p-3"><dt className="text-xs font-bold text-academy-muted">{title}</dt><dd className="mt-1 text-sm font-semibold">{value}</dd></div>)}</dl>
          <div className="mt-4 flex flex-wrap items-center gap-4"><button type="button" onClick={() => onSelect(session)} className="planning-neutral-action min-h-11 rounded-full px-5 py-3 text-sm font-bold">{planningRegistrationAction(session).label}</button><Link href={planningFormationHref(session)} className="text-sm font-semibold underline underline-offset-4">Programme et prérequis</Link></div>
        </article>;
      })}
    </div>
  </div>;
}

function BtsIntakes({ year }: { year: number }) {
  return <article className="mt-5 rounded-2xl border border-academy-line bg-academy-surface p-5 sm:p-6">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div><h3 className="text-xl font-black">BTS en alternance</h3><p className="mt-2 font-semibold">Prochaine rentrée annuelle : septembre {year}</p><p className="mt-1 text-sm text-academy-muted">Les dates détaillées par BTS seront précisées par l’équipe.</p></div>
      <Link href="/bts" className="planning-neutral-action rounded-full px-5 py-3 text-center text-sm font-bold">Découvrir les BTS</Link>
    </div>
  </article>;
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
          <p className="text-xs font-black uppercase tracking-[.22em] text-academy-gold-strong">Alertes personnalisées</p>
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
                <span className="planning-accent-icon grid h-9 w-9 place-items-center rounded-full text-xs font-black">
                  0{index + 1}
                </span>
                <span className="planning-accent-text text-xs font-black uppercase tracking-[.14em]">{option.label}</span>
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
              <p className="text-xs font-black uppercase tracking-[.2em] text-academy-gold">Mon alerte planning</p>
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

export function PlanningClient({ initialSessions, btsIntakeYear }: { initialSessions: Session[]; btsIntakeYear: number }) {
  const sortedSessions = useMemo(() => [...initialSessions].sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate)), [initialSessions]);
  const [activeFormation, setActiveFormation] = useState<FormationFilterKey>('all');
  const [locationFilter, setLocationFilter] = useState<SessionLocationFilterKey>('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [view, setView] = useState<ViewMode>('list');
  const [showAll, setShowAll] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const selectedFormation = formationFilters.find((formation) => formation.key === activeFormation);
  const activePlanningTheme = planningThemeClass(selectedFormation?.accent || 'gold');
  const baseSessions = sortedSessions.filter((session) => {
    if (activeFormation === 'other' && formationFilterForSession(session)) return false;
    if (selectedFormation && !formationMatchesSlug(selectedFormation, session.training?.slug)) return false;
    return sessionMatchesLocation(session, locationFilter);
  });
  const monthOptions = planningMonths(baseSessions);
  const filteredSessions = baseSessions.filter((session) => sessionMatchesMonth(session, monthFilter) && (!onlyOpen || planningRegistrationAction(session).kind === 'registration'));
  const visibleSessions = showAll ? filteredSessions : filteredSessions.slice(0, 6);
  const openCount = filteredSessions.filter((session) => planningRegistrationAction(session).kind === 'registration').length;
  const hasBts = sortedSessions.some((session) => formationMatchesSlug(formationFilters.find((formation) => formation.key === 'bts')!, session.training?.slug));
  const showBtsIntake = !hasBts && (activeFormation === 'all' || activeFormation === 'bts') && locationFilter === 'all' && monthFilter === 'all' && !onlyOpen;
  const nextOpenId = filteredSessions.find((session) => planningRegistrationAction(session).kind === 'registration')?.id;
  function resetFilters() { setActiveFormation('all'); setLocationFilter('all'); setMonthFilter('all'); setOnlyOpen(false); setShowAll(false); }
  function changeFormation(value: FormationFilterKey) { setActiveFormation(value); setMonthFilter('all'); setShowAll(false); }

  return <div className={'pb-24 ' + activePlanningTheme}>
    <section className="border-b border-academy-line bg-academy-surface">
      <div className="page-container py-7 sm:py-10">
        <p className="text-xs font-bold uppercase tracking-widest text-academy-gold-strong">Planning des formations</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">Choisissez votre prochaine session.</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-academy-muted">Retrouvez les dates, les lieux et les tarifs, puis sélectionnez la session qui vous convient.</p>
      </div>
    </section>

    <section id="sessions" className="page-container scroll-mt-24 py-6 sm:py-8" aria-label="Recherche de sessions">
      <div className="rounded-2xl border border-academy-line bg-academy-surface p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="text-sm font-bold">Formation<select value={activeFormation} onChange={(event) => changeFormation(event.target.value as FormationFilterKey)} className="mt-1.5 min-h-12 w-full rounded-xl border border-academy-line bg-academy-surface px-3 text-sm font-semibold">
            <option value="all">Toutes les formations</option>{formationFilters.map((formation) => <option key={formation.key} value={formation.key}>{formation.label} — {formation.description}</option>)}
            {sortedSessions.some((session) => !formationFilterForSession(session)) ? <option value="other">Autres formations</option> : null}
          </select></label>
          <label className="text-sm font-bold">Centre<select value={locationFilter} onChange={(event) => { setLocationFilter(event.target.value as SessionLocationFilterKey); setMonthFilter('all'); setShowAll(false); }} className="mt-1.5 min-h-12 w-full rounded-xl border border-academy-line bg-academy-surface px-3 text-sm font-semibold">{sessionLocationFilters.map((filter) => <option key={filter.key} value={filter.key}>{filter.key === 'all' ? 'Tous les centres' : filter.label}</option>)}</select></label>
          <label className="text-sm font-bold">Mois<select value={monthFilter} onChange={(event) => { setMonthFilter(event.target.value); setShowAll(false); }} className="mt-1.5 min-h-12 w-full rounded-xl border border-academy-line bg-academy-surface px-3 text-sm font-semibold"><option value="all">Toutes les périodes</option>{monthOptions.map((month) => <option key={month} value={month}>{new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(month + '-01T12:00:00Z'))}</option>)}</select></label>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={onlyOpen} onChange={(event) => { setOnlyOpen(event.target.checked); setShowAll(false); }} className="h-5 w-5 accent-[#101a29]" />Uniquement les sessions ouvertes</label>
          {activeFormation !== 'all' || locationFilter !== 'all' || monthFilter !== 'all' || onlyOpen ? <button type="button" onClick={resetFilters} className="min-h-11 px-2 text-sm font-semibold underline underline-offset-4">Réinitialiser</button> : null}
        </div>
      </div>

      <div className="my-5 flex flex-wrap items-center justify-between gap-3">
        <div role="status" aria-live="polite"><h2 className="text-xl font-black">{filteredSessions.length} {filteredSessions.length === 1 ? 'session programmée' : 'sessions programmées'}</h2><p className="mt-1 text-sm text-academy-muted">{openCount} {openCount === 1 ? 'session ouverte aux demandes d’inscription' : 'sessions ouvertes aux demandes d’inscription'}</p></div>
        {filteredSessions.length > 0 ? <div className="flex rounded-full border border-academy-line bg-academy-surface p-1" aria-label="Affichage du planning">
          <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')} className={'min-h-11 rounded-full px-4 text-sm font-bold ' + (view === 'list' ? 'planning-neutral-action' : '')}>Liste</button>
          <button type="button" aria-pressed={view === 'calendar'} onClick={() => setView('calendar')} className={'min-h-11 rounded-full px-4 text-sm font-bold ' + (view === 'calendar' ? 'planning-neutral-action' : '')}>Calendrier</button>
        </div> : null}
      </div>

      {filteredSessions.length ? view === 'list' ? <>
        <div className="grid gap-4">{visibleSessions.map((session) => <SessionCard key={session.id} session={session} isNext={session.id === nextOpenId} onSelect={setSelectedSession} />)}</div>
        {filteredSessions.length > visibleSessions.length ? <div className="mt-6 text-center"><button type="button" onClick={() => setShowAll(true)} className="min-h-12 rounded-full border border-academy-line px-6 py-3 text-sm font-bold">Voir les {filteredSessions.length - visibleSessions.length} autres sessions</button></div> : null}
      </> : <CalendarView key={activeFormation + locationFilter + monthFilter + onlyOpen} sessions={filteredSessions} onSelect={setSelectedSession} monthFilter={monthFilter} /> : !showBtsIntake ? <div className="rounded-2xl border border-dashed border-academy-line bg-academy-surface p-7 text-center">
        <h3 className="text-xl font-black">Aucune session pour ces critères.</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-academy-muted">Essayez un autre mois ou un autre centre, ou contactez notre équipe pour connaître les prochaines dates.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3"><button type="button" onClick={resetFilters} className="planning-neutral-action rounded-full px-5 py-3 text-sm font-bold">Voir toutes les sessions</button><Link href="/contact?motif=alerte-planning" className="rounded-full border border-academy-line px-5 py-3 text-sm font-bold">Créer une alerte</Link></div>
      </div> : null}
      {showBtsIntake ? <BtsIntakes year={btsIntakeYear} /> : null}
    </section>

    <MissingDates sessions={sortedSessions} activeFormation={activeFormation} />
    <section className="page-container py-6 sm:py-10">
      <div className="grid gap-6 rounded-2xl border border-academy-line bg-academy-surface p-5 sm:p-7 lg:grid-cols-[1.5fr_1fr]">
        <div><h2 className="text-xl font-black">Avant de choisir votre session</h2><div className="mt-4 space-y-3">
          {[
            ['Comment savoir s’il reste des places ?', 'Le nombre affiché sur chaque session est synchronisé avec les informations publiées par l’équipe.'],
            ['Puis-je demander un financement avant de m’inscrire ?', 'Oui. Nous pouvons étudier votre situation avant la validation définitive de votre inscription.'],
            ['Que faire si aucune date ne me convient ?', 'Créez une alerte planning : l’équipe vous préviendra dès qu’une nouvelle session sera ouverte.'],
          ].map(([question, answer]) => <details key={question} className="rounded-xl border border-academy-line p-4"><summary className="cursor-pointer text-sm font-bold">{question}</summary><p className="mt-3 text-sm leading-6 text-academy-muted">{answer}</p></details>)}
        </div></div>
        <div className="rounded-2xl bg-[#101a29] p-5 text-white"><p className="text-xs font-bold uppercase tracking-widest text-academy-gold">Besoin d’un conseil ?</p><h3 className="mt-3 text-xl font-black">Parlons de votre projet.</h3><p className="mt-3 text-sm leading-6 text-white/80">Notre équipe vous aide à choisir votre session et à préparer votre financement.</p><a href="tel:0422470768" className="mt-5 inline-flex rounded-full bg-academy-gold px-5 py-3 text-sm font-bold text-academy-gold-text">04 22 47 07 68</a><Link href="/financements" className="mt-4 block text-sm underline underline-offset-4">Découvrir les financements</Link></div>
      </div>
    </section>
    <div className="fixed inset-x-3 bottom-[calc(.75rem+env(safe-area-inset-bottom))] z-40 grid grid-cols-2 gap-2 rounded-2xl border border-academy-line bg-academy-surface p-2 shadow-lg md:hidden">
      <a href="tel:0422470768" className="min-h-11 rounded-full border border-academy-line px-3 py-3 text-center text-sm font-bold">Appeler</a>
      <a href="#sessions" className="planning-neutral-action min-h-11 rounded-full px-3 py-3 text-center text-sm font-bold">Choisir une session</a>
    </div>
    {selectedSession ? <PlanningRegistration key={selectedSession.id} session={selectedSession} onClose={() => setSelectedSession(null)} /> : null}
  </div>;
}

