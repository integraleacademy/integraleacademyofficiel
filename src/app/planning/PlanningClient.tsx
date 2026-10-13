'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { formatSessionDate, formatSessionPeriod, hasDetailedDeliveryPeriods } from '@/lib/public-sessions';
import { getSessionSeatAvailability, resolveSessionSeatCapacity } from '@/lib/session-seat-availability';
import { sessionLocationFilters, sessionMatchesLocation, type SessionLocationFilterKey } from '@/lib/session-location-filter';
import { formatTrainingPrice } from '@/lib/training-price';
import { planningFormationHref } from '@/lib/planning-data';
import { vtcCourse } from '@/data/vtc';
import styles from './planning.module.css';
import { PlanningHelp } from './PlanningHelp';
import { PlanningPreview } from './PlanningPreview';
import { PlanningCalendar } from './PlanningCalendar';
import { PlanningRegistration } from './PlanningRegistration';

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
  image: string;
}[] = [
  {
    key: 'aps',
    image: '/images/formation-scenes-manuel/aps-arrivee.webp',
    label: 'APS',
    eyebrow: 'Surveillance humaine',
    description: 'Agent de prévention et de sécurité',
    category: 'security',
    slugs: ['aps'],
    accent: 'blue',
  },
  {
    key: 'a3p',
    image: '/images/formation-scenes-manuel/a3p-parcours.webp',
    label: 'A3P',
    eyebrow: 'Protection rapprochée',
    description: 'Agent privé de protection de personnes',
    category: 'security',
    slugs: ['a3p', 'a3p-apr'],
    accent: 'green',
  },
  {
    key: 'director',
    image: '/images/formation-scenes-manuel/desp-initial-parcours.webp',
    label: 'DIRIGEANT',
    eyebrow: 'DESP / DSSP',
    description: 'Diriger une entreprise de sécurité privée',
    category: 'security',
    slugs: ['desp', 'desp-dssp', 'desp-initial', 'desp-vae'],
    accent: 'orange',
  },
  {
    key: 'ssiap',
    image: '/images/formation-scenes-manuel/ssiap-1-mission-ensemble.webp',
    label: 'SSIAP 1',
    eyebrow: 'Sécurité incendie',
    description: 'Agent de sécurité incendie',
    category: 'fire',
    slugs: ['ssiap-1', 'ssiap1', 'ssiap-2', 'ssiap2', 'ssiap-3', 'ssiap3', 'recyclage-remise-a-niveau-ssiap'],
    accent: 'red',
  },
  {
    key: 'vtc',
    image: '/images/formation-scenes-manuel/vtc-parcours.webp',
    label: 'VTC',
    eyebrow: 'Transport de personnes',
    description: 'Préparer le métier et l’examen VTC',
    category: 'vtc',
    slugs: ['vtc'],
    accent: 'violet',
  },
  {
    key: 'bts',
    image: '/images/formation-scenes-manuel/bts-mco-ventes.webp',
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
  selected,
  onSelect,
}: {
  session: Session;
  isNext: boolean;
  selected: boolean;
  onSelect: (session: Session) => void;
}) {
  const date = shortDate(session.startDate);
  const seatAvailability = planningSeatAvailability(session);
  const showDeliveryPeriods = hasDetailedDeliveryPeriods(session);
  const isVtcExam = session.scheduleKind === 'vtc-exam';
  const themeClass = planningThemeForSession(session);

  return (
    <article data-selected={selected || undefined} className={styles.sessionCard + ' ' + themeClass + ' group relative overflow-hidden rounded-[1.6rem] border bg-white p-4 shadow-[0_18px_55px_rgba(54,40,20,.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(54,40,20,.14)] dark:bg-white/5 sm:p-5 ' + (isNext ? 'planning-accent-border' : 'border-academy-line/70 dark:border-white/10')}>
      <span aria-hidden="true" className="planning-accent-indicator absolute inset-y-0 left-0 w-1" />
      {isNext ? (
        <span className="absolute left-4 top-0 rounded-b-xl bg-[#101a29] px-3 py-1 text-[9px] font-black uppercase tracking-[.14em] text-white sm:left-5">
          {isVtcExam ? 'Prochaine échéance VTC' : 'Prochaine session'}
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
            {!isVtcExam ? <span className={'session-seats-badge rounded-full border px-3 py-1 text-[10px] font-black ' + seatAvailability.badgeClassName}>
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
                <dt className="text-[9px] font-black uppercase tracking-[.1em] text-academy-muted">{label}</dt>
                <dd className="mt-1 text-sm font-black text-academy-ink dark:text-white">{formatSessionDate(value)}</dd>
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
                {period.label ? <span className="block text-[9px] font-black uppercase tracking-[.14em] text-academy-muted/70">{period.label}</span> : null}
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

        <div className="flex flex-wrap gap-2 lg:flex-col">
          <button type="button" onClick={() => onSelect(session)} aria-haspopup="dialog" aria-label={'Découvrir la session ' + sessionTitle(session)} className={styles.sessionInterest}>{selected ? 'Session sélectionnée' : 'Cette session m’intéresse'} <Icon name="arrow" className="h-4 w-4" /></button>
          <Link
            href={planningFormationHref(session)}
            className="planning-neutral-action inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-black transition hover:-translate-y-0.5"
          >
            En savoir plus
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function SessionDetails({ session, onClose, onRequest }: { session: Session; onClose: () => void; onRequest: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    node?.showModal();
    return () => { node?.close(); document.body.style.overflow = previousOverflow; };
  }, []);
  const isVtc = session.scheduleKind === 'vtc-exam';
  const availability = planningSeatAvailability(session);
  return <dialog ref={dialog} onCancel={onClose} aria-labelledby="planning-session-title" className={`${styles.sessionDialog} ${planningThemeForSession(session)}`}>
    <div className={styles.dialogHeader}><p className={styles.eyebrow}>Votre session sélectionnée</p><button type="button" onClick={onClose} aria-label="Fermer le détail de la session">×</button></div>
    <h2 id="planning-session-title">{sessionTitle(session)}</h2>
    {!isVtc ? <span className={'session-seats-badge mt-4 inline-block rounded-full border px-3 py-1 text-xs font-bold ' + availability.badgeClassName}>{availability.label}</span> : null}
    <div className={styles.dialogDates}>
      {isVtc ? <><p>{vtcCourse.startDescription}</p><dl>{[['Date limite d’inscription', session.startDate], ['Examen théorique', session.endDate], ['Examen pratique', session.examDate]].map(([label, date]) => <div key={label}><dt>{label}</dt><dd>{date ? formatSessionDate(date) : 'À confirmer'}</dd></div>)}</dl><p className={styles.examNotice}>{vtcCourse.examNotice}</p></> : <><p className={styles.dialogPeriod}>{formatSessionPeriod(session.startDate, session.endDate)}</p>{hasDetailedDeliveryPeriods(session) ? <dl>{deliveryPeriodRows(session).slice(1).map(period => <div key={period.label}><dt>{period.label}</dt><dd>{period.value}</dd></div>)}</dl> : null}{session.examDate ? <p>Examen le <strong>{formatSessionDate(session.examDate)}</strong></p> : null}</>}
    </div>
    <p className={styles.dialogLocation}><Icon name="location" />{session.location || 'Centre à confirmer'}</p>
    <dl className={styles.dialogFacts}><div><dt>Tarif</dt><dd>{displayPrice(session)}</dd></div><div><dt>Durée</dt><dd>{displayDuration(session)}</dd></div></dl>
    <div className={styles.dialogActions}><button type="button" onClick={onRequest}>Parler de cette session <Icon name="arrow" /></button><Link href={planningFormationHref(session)}>Découvrir le programme <Icon name="arrow" /></Link></div>
    <p className={styles.dialogFootnote}>Votre choix est repris dans la demande. L’équipe vous accompagne pour les prérequis, le financement et l’inscription.</p>
  </dialog>;
}

function BtsIntakes({ year }: { year: number }) {
  return <article className="planning-theme-gold mt-6 rounded-[1.6rem] border border-academy-line/70 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/5 sm:p-7">
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h3 className="text-2xl font-black text-academy-ink dark:text-white">BTS en alternance</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <p className="rounded-2xl border border-academy-line/60 bg-academy-bg/55 p-4 text-sm font-semibold text-academy-muted dark:border-white/10 dark:bg-white/5">
            Prochaine rentrée : <strong className="text-academy-ink dark:text-white">septembre {year}</strong>
          </p>
          <p className="rounded-2xl border border-academy-line/60 bg-academy-bg/55 p-4 text-sm font-semibold text-academy-muted dark:border-white/10 dark:bg-white/5">
            Rentrée suivante : <strong className="text-academy-ink dark:text-white">septembre {year + 1}</strong>
          </p>
        </div>
      </div>
      <Link href="/bts" className="planning-neutral-action inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-black transition hover:-translate-y-0.5">
        En savoir plus <Icon name="arrow" className="h-4 w-4" />
      </Link>
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

export function PlanningClient({ initialSessions, btsIntakeYear }: { initialSessions: Session[]; btsIntakeYear: number }) {
  const sortedSessions = useMemo(
    () => [...initialSessions].sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate)),
    [initialSessions],
  );
  const [activeFormation, setActiveFormation] = useState<FormationFilterKey>('all');
  const [locationFilter, setLocationFilter] = useState<SessionLocationFilterKey>('all');
  const [view, setView] = useState<ViewMode>('list');
  const [showAll, setShowAll] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [detailSession, setDetailSession] = useState<Session | null>(null);
  const [registrationSession, setRegistrationSession] = useState<Session | null>(null);
  const sessionTrigger = useRef<HTMLElement | null>(null);

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
  const selectedSession = filteredSessions.find(session => session.id === selectedSessionId) || null;
  const previewFormations = formationFilters.map(formation => ({ ...formation, session: sortedSessions.find(session => formationMatchesSlug(formation, session.training?.slug)) }));
  const resultKey = `${activeFormation}-${locationFilter}-${view}`;

  function selectSession(session: Session) {
    sessionTrigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSelectedSessionId(session.id);
    setDetailSession(session);
  }

  function openRegistration(session: Session, fromDetails = false) {
    if (!fromDetails) sessionTrigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setDetailSession(null);
    setRegistrationSession(session);
  }

  function closeSessionDialog() {
    setDetailSession(null);
    setRegistrationSession(null);
    window.requestAnimationFrame(() => sessionTrigger.current?.focus({ preventScroll: true }));
  }

  function scrollToSessions() {
    window.requestAnimationFrame(() => {
      const section = document.getElementById('sessions');
      section?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      section?.querySelector('select')?.focus({ preventScroll: true });
    });
  }

  function chooseFormation(formation: FormationFilterKey) {
    setActiveFormation(formation);
    setShowAll(false);
    setSelectedSessionId(null);
    scrollToSessions();
  }

  function showCalendar() {
    setView('calendar');
    scrollToSessions();
  }

  return (
    <main className={`${styles.page} pb-24`}>
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
              <em className="text-[#b9820a]">Choisissez votre date.</em>
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[#5f625f] sm:text-lg">
              APS, A3P, Dirigeant, SSIAP 1, VTC ou BTS : accédez directement au bon parcours, comparez les rentrées et vérifiez les places disponibles.
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

          <PlanningPreview key={activeFormation} formations={previewFormations} initialFormation={activeFormation} btsIntakeYear={btsIntakeYear} onChoose={key => chooseFormation(key as FormationFilterKey)} />
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
                  className={styles.formationCard + ' ' + planningThemeClass(formation.accent) + ' planning-formation-card group flex min-h-[13.5rem] flex-col rounded-[1.45rem] border p-5 text-left transition duration-300 hover:-translate-y-1 ' + (selected ? 'planning-formation-card-selected' : '')}
                >
                  <span className={styles.formationImage}><Image src={formation.image} alt="" width={300} height={190} sizes="(max-width: 640px) 90vw, (max-width: 1280px) 33vw, 200px" /><span className={styles.formationCheck} aria-hidden="true"><Icon name="check" className="h-4 w-4" /></span></span>
                  <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.14em] text-white/55">
                    <span aria-hidden="true" className="planning-accent-indicator h-2 w-2 shrink-0 rounded-full" />
                    0{index + 1} · {formation.eyebrow}
                  </span>
                  <span className="mt-5 block text-xl font-black tracking-tight">{formation.label}</span>
                  <span className="mt-2 block text-xs font-semibold leading-5 text-white/48">{formation.description}</span>
                  <span className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-black uppercase tracking-[.08em]">
                    {formation.key === 'bts' ? `Rentrées ${btsIntakeYear} et ${btsIntakeYear + 1}` : count ? count + (count > 1 ? ' sessions' : ' session') : 'Créer une alerte'}
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
        <div className={styles.filterBar}>
          <div>
            <p role="status" aria-live="polite" aria-atomic="true" className="text-2xl font-black text-academy-ink dark:text-white"><span key={`${activeFormation}-${locationFilter}`} className={styles.countEnter}>
              {activeFormation === 'bts' ? 'Rentrées BTS' : filteredSessions.length + (filteredSessions.length > 1 ? ' sessions disponibles' : ' session disponible')}
            </span></p>
            <p className="mt-1 text-sm font-semibold text-academy-muted">
              {activeFormation === 'bts' ? 'BTS en alternance' : view === 'list' ? 'Triées par prochaine date de rentrée ou échéance d’inscription' : 'Affichées dans le calendrier'}
            </p>
          </div>

          <div className={styles.filterControls}>
            <label className={styles.formationSelect}><span className="sr-only">Filtrer par formation</span><select value={activeFormation} onChange={event => chooseFormation(event.target.value as FormationFilterKey)}><option value="all">Toutes les formations</option>{formationFilters.map(formation => <option key={formation.key} value={formation.key}>{formation.label}</option>)}</select></label>
          {activeFormation !== 'bts' ? <>
            <div className={styles.centreFilters} aria-label="Filtrer les sessions par centre">
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
                      setSelectedSessionId(null);
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
          </> : null}
          </div>
        </div>

        <div key={resultKey} className={styles.resultEnter}>
        {activeFormation === 'bts' ? <BtsIntakes year={btsIntakeYear} /> : filteredSessions.length ? (
          view === 'list' ? (
            <>
              <div className="mt-6 grid gap-4">
                {visibleSessions.map((session, index) => (
                  <div key={session.id} className={styles.sessionEnter} style={{ '--session-delay': `${Math.min(index, 5) * 45}ms` } as CSSProperties}><SessionCard session={session} isNext={index === 0} selected={selectedSessionId === session.id} onSelect={selectSession} /></div>
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
            <div className="mt-8"><PlanningCalendar sessions={filteredSessions} onSelect={selectSession} selectedId={selectedSessionId || undefined} themeForSession={planningThemeForSession} /></div>
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
        {activeFormation === 'all' ? <BtsIntakes year={btsIntakeYear} /> : null}
        </div>
      </section>

      <MissingDates sessions={sortedSessions} activeFormation={activeFormation} />

      <PlanningHelp selectedSession={selectedSession ? { title: sessionTitle(selectedSession), dates: selectedSession.scheduleKind === 'vtc-exam' ? 'Inscription avant le ' + formatSessionDate(selectedSession.startDate) + ' · Examen théorique le ' + formatSessionDate(selectedSession.endDate) : formatSessionPeriod(selectedSession.startDate, selectedSession.endDate), location: selectedSession.location } : undefined} formation={selectedFormationDetails?.label} formationSlug={selectedFormationDetails?.slugs[0]} onRequest={() => selectedSession && openRegistration(selectedSession)} onClear={() => setSelectedSessionId(null)} />

      {detailSession ? <SessionDetails session={detailSession} onClose={closeSessionDialog} onRequest={() => openRegistration(detailSession, true)} /> : null}
      {registrationSession ? <PlanningRegistration session={registrationSession} onClose={closeSessionDialog} /> : null}

      <div className="fixed inset-x-3 bottom-[calc(.75rem+env(safe-area-inset-bottom))] z-40 grid grid-cols-3 gap-2 rounded-[1.5rem] border border-white/70 bg-white/92 p-2 shadow-[0_18px_60px_rgba(17,17,17,.18)] backdrop-blur md:hidden">
        <Link href="tel:0422470768" className="rounded-2xl bg-[#101a29] px-3 py-3 text-center text-xs font-black text-white">Appeler</Link>
        <Link href="/contact?motif=alerte-planning" className="rounded-2xl border border-academy-line bg-white px-3 py-3 text-center text-xs font-black text-academy-ink">Alerte</Link>
        <button type="button" onClick={() => selectedSession ? openRegistration(selectedSession) : document.getElementById('planning-advice-title')?.scrollIntoView({ behavior: 'auto', block: 'center' })} className="planning-neutral-action rounded-2xl px-3 py-3 text-center text-xs font-black">{selectedSession ? 'Ma session' : 'Mon projet'}</button>
      </div>
    </main>
  );
}
