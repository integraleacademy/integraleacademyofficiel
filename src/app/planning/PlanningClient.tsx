'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { formatSessionDate, formatSessionPeriod, hasDetailedDeliveryPeriods } from '@/lib/public-sessions';
import { getSessionSeatAvailability, resolveSessionSeatCapacity } from '@/lib/session-seat-availability';
import { sessionLocationFilters, sessionMatchesLocation, type SessionLocationFilterKey } from '@/lib/session-location-filter';
import { formatTrainingPrice } from '@/lib/training-price';
import { planningFormationHref } from '@/lib/planning-data';
import { vtcCourse } from '@/data/vtc';
import school from '../ecole/ecole.module.css';
import styles from './planning.module.css';

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

function SessionCard({ session, isNext }: { session: Session; isNext: boolean }) {
  const date = shortDate(session.startDate);
  const seatAvailability = planningSeatAvailability(session);
  const showDeliveryPeriods = hasDetailedDeliveryPeriods(session);
  const isVtcExam = session.scheduleKind === 'vtc-exam';

  return (
    <article className={`${planningThemeForSession(session)} ${styles.sessionCard} ${isNext ? styles.nextSession : ''}`}>
      {isNext && <span className={styles.nextLabel}>{isVtcExam ? 'Prochaine échéance VTC' : 'Prochaine session'}</span>}
      <div className={styles.sessionGrid}>
        <div className={styles.dateColumn}>
          <div className={styles.dateTile}><strong>{date.day}</strong><span>{date.month}</span></div>
          <span className={styles.dateYear}>{new Date(session.startDate).getUTCFullYear()}</span>
        </div>
        <div className={styles.sessionCopy}>
          <div className={styles.sessionTitle}>
            <h3>{sessionTitle(session)}</h3>
            {!isVtcExam && <span className={`session-seats-badge ${styles.seatBadge} ${seatAvailability.badgeClassName}`}>{seatAvailability.label}</span>}
          </div>
          {isVtcExam ? <div className={styles.deliveryDetails}>
            <p>{vtcCourse.startDescription}</p>
            <dl className={styles.vtcDates}>
              {[
                ['Date limite d’inscription', session.vtcDates.deadline],
                ['Examen théorique', session.vtcDates.theory],
                ['Examen pratique', session.vtcDates.practical],
              ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{formatSessionDate(value)}</dd></div>)}
            </dl>
            <p>Hybride : théorie en ligne et pratique en présentiel. Frais d’examen et véhicule double commande inclus.</p>
            <p className={styles.examNotice}>{vtcCourse.examNotice}</p>
          </div> : showDeliveryPeriods ? <div className={styles.periodGrid}>
            {deliveryPeriodRows(session).map((period, index) => <div key={period.label || 'dates'} className={index === 0 ? styles.fullPeriod : styles.period}>
              <Icon name={period.icon} />
              <span>{period.label && <small>{period.label}</small>}<strong>{period.value}</strong></span>
            </div>)}
          </div> : <p className={styles.sessionPeriod}>
            {formatSessionPeriod(session.startDate, session.endDate)}
            {session.examDate ? ' · Examen le ' + formatSessionDate(session.examDate) : ''}
          </p>}
          {showDeliveryPeriods && session.examDate && <p className={styles.sessionPeriod}>Examen le {formatSessionDate(session.examDate)}</p>}
          {session.location && <p className={styles.sessionLocation}><Icon name="location" /><span>{session.location}</span></p>}
        </div>
        <dl className={styles.sessionFacts}>
          <div><dt>Tarif</dt><dd>{displayPrice(session)}</dd></div>
          <div><dt>Durée</dt><dd><Icon name="clock" />{displayDuration(session)}</dd></div>
        </dl>
        <Link href={planningFormationHref(session)} className={`${school.button} ${styles.sessionAction}`}>En savoir plus <Icon name="arrow" /></Link>
      </div>
    </article>
  );
}

function CalendarView({
  sessions,
}: {
  sessions: Session[];
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
    <div className={styles.calendarPanel}>
      <p className={school.eyebrow}>Vue calendrier</p>
      <h3>Visualisez les parcours <em>dans le temps.</em></h3>
      <p className={styles.calendarIntro}>Comparez les sessions, anticipez les examens et identifiez rapidement la meilleure rentrée.</p>
      <p className={styles.calendarHint}>Faites glisser le calendrier horizontalement</p>
      <div className={styles.calendarScroll} role="region" aria-label="Calendrier des sessions, défilement horizontal" tabIndex={0}>
        <div className={styles.timeline}>
          <div className={styles.timelineHeader}>
            <span>Formation</span>
            <div className={styles.timelineMonths}>{timeline.months.map(item => <div key={item.key} style={{ left: item.left + '%', width: item.width + '%' }}>{item.label}</div>)}</div>
          </div>
          {sessions.map(session => {
            const position = sessionPosition(session);
            const formation = formationFilterForSession(session);
            const hasExam = Boolean(session.examDate);
            return <div key={session.id} className={styles.timelineRow}>
              <div className={`${planningThemeForSession(session)} ${styles.timelineLabel}`}>
                <p><span aria-hidden="true" className="planning-accent-indicator" />{timelineTitle(session)}</p>
                <span>{formation?.eyebrow || session.training?.shortDescription || 'Formation professionnelle'}</span>
              </div>
              <div className={styles.timelineTrack}>
                {timeline.months.map(item => <span key={item.key} aria-hidden="true" className={styles.timelineGridline} style={{ left: item.left + '%' }} />)}
                <Link
                  href={planningFormationHref(session)}
                  aria-label={'En savoir plus sur ' + sessionTitle(session)}
                  title={session.scheduleKind === 'vtc-exam' ? 'Inscription avant le ' + formatSessionDate(session.startDate) + ' · Examen théorique le ' + formatSessionDate(session.endDate) + ' · Examen pratique le ' + formatSessionDate(session.examDate) : hasExam ? 'Examen le ' + formatSessionDate(session.examDate) : 'En savoir plus'}
                  className={`${planningThemeForSession(session)} planning-calendar-bar ${styles.timelineBar}`}
                  style={{ left: position.left + '%', width: position.width + '%' }}
                >
                  <span>{session.scheduleKind === 'vtc-exam' ? 'Inscription → examen' : timelineDateLabel(session.startDate) + ' → ' + timelineDateLabel(session.endDate)}</span>
                  <span>{hasExam ? 'E' : '›'}</span>
                </Link>
              </div>
            </div>;
          })}
          <p className={styles.timelineLegend}>E = examen · cliquez sur un parcours pour en savoir plus sur la formation</p>
        </div>
      </div>
    </div>
  );
}

function BtsIntakes({ year }: { year: number }) {
  return <article className={styles.btsCard}>
    <div><p className={school.eyebrow}>Alternance</p><h3>BTS en alternance</h3>
      <div className={styles.intakeDates}>
        <p>Prochaine rentrée <strong>Septembre {year}</strong></p>
        <p>Rentrée suivante <strong>Septembre {year + 1}</strong></p>
      </div>
    </div>
    <Link href="/bts" className={school.button}>En savoir plus <Icon name="arrow" /></Link>
  </article>;
}

function MissingDates({ sessions, activeFormation }: { sessions: Session[]; activeFormation: FormationFilterKey }) {
  const selectedFormation = activeFormation === 'all' ? null : formationFilters.find(formation => formation.key === activeFormation);
  const missing = alertOptions.filter(option => {
    if (selectedFormation && !option.slugs.some(slug => selectedFormation.slugs.includes(slug))) return false;
    return !sessions.some(session => option.slugs.includes(session.training?.slug));
  });
  if (!missing.length) return null;

  return <section className={`${school.section} ${styles.alertSection}`} aria-labelledby="alerts-title">
    <div className={school.container}>
      <div className={school.sectionHeading}>
        <div><p className={school.eyebrow}>Alertes personnalisées</p><h2 id="alerts-title">Pas encore de date ?<br /><em>Gardez une longueur d’avance.</em></h2></div>
        <p>Les formations sans session ouverte restent accessibles : créez une alerte et soyez prévenu dès la publication d’une nouvelle rentrée.</p>
      </div>
      <div className={styles.alertGrid}>
        {missing.map((option, index) => <Link key={option.title} href={alertHref(option.formation)} className={`${planningThemeClass(option.accent)} ${styles.resourceCard}`}>
          <span className={school.eyebrow}>0{index + 1} / {option.label}</span><h3>{option.title}</h3><p>{option.description}</p>
          <span className={styles.resourceAction}>Être prévenu à l’ouverture <Icon name="arrow" /></span>
        </Link>)}
      </div>
      <div className={styles.alertBanner}>
        <div><p className={school.eyebrow}>Mon alerte planning</p><h3>Recevez uniquement les dates qui vous intéressent.</h3><p>Formation, centre et période souhaitée : l’équipe vous recontacte dès qu’une session adaptée est ouverte.</p></div>
        <Link href="/contact?motif=alerte-planning" className={school.button}>Créer mon alerte <Icon name="arrow" /></Link>
      </div>
    </div>
  </section>;
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
    <div className={`${school.page} ${styles.page}`}>
      <section className={`${school.hero} ${styles.hero}`} aria-labelledby="planning-title">
        <div className={`${school.container} ${school.heroGrid} ${styles.heroGrid}`}>
          <div className={school.heroCopy}>
            <p className={school.eyebrow}><span className={school.smallLine} /> Planning des formations</p>
            <h1 id="planning-title">Trouvez votre<br />formation.<br /><em>Choisissez<br /> votre date.</em></h1>
            <p className={school.intro}>APS, A3P, Dirigeant, SSIAP 1, VTC ou BTS : comparez les prochaines rentrées et trouvez la session qui correspond à votre projet.</p>
            <div className={school.heroActions}>
              <a href="#choisir-formation" className={school.button}>Choisir ma formation <Icon name="arrow" /></a>
              <button type="button" onClick={showCalendar} className={school.textLink}>Voir le calendrier <Icon name="calendar" /></button>
            </div>
            <p className={school.heroTrust}><span aria-hidden="true">✦</span> Les prochaines dates, les lieux et les places disponibles.</p>
          </div>
          <figure className={`${school.heroPhoto} ${styles.heroPhoto}`}>
            <Image src="/images/campus/campus-accueil.jpg" alt="L’accueil d’Intégrale Academy à Puget-sur-Argens, avec ses fauteuils jaunes et l’entrée des salles de formation" fill priority sizes="(max-width: 800px) 100vw, 50vw" />
            <span className={school.photoLabel}>Votre prochain chapitre.</span>
            <figcaption><span>INTÉGRALE ACADEMY</span><span>Une date pour commencer. <Icon name="arrow" /></span></figcaption>
          </figure>
        </div>
        <nav className={`${school.container} ${school.chapterNav}`} aria-label="Les rubriques du planning">
          <span>PRÉPARONS VOTRE RENTRÉE</span>
          <a href="#choisir-formation"><span>01</span> Votre formation</a>
          <a href="#sessions"><span>02</span> Les prochaines dates</a>
          <a href="#preparer-inscription"><span>03</span> Votre inscription</a>
          <a href="#questions"><span>04</span> Vos questions</a>
        </nav>
      </section>

      <section className={styles.stepsSection} aria-label="Du projet à l’inscription en trois étapes">
        <div className={`${school.container} ${styles.stepsGrid}`}>
          {[
            ['01', 'Choisissez la formation', 'Accès direct à chaque parcours.'],
            ['02', 'Comparez les dates', 'Liste détaillée ou frise calendrier.'],
            ['03', 'Découvrez la formation', 'Programme, prérequis et inscription.'],
          ].map(([number, label, description]) => <div key={number}><span>{number}</span><div><h2>{label}</h2><p>{description}</p></div></div>)}
        </div>
      </section>

      <section id="choisir-formation" className={`${school.section} ${styles.formationSection}`} aria-labelledby="formations-title">
        <div className={school.container}>
          <div className={school.sectionHeading}>
            <div><p className={school.eyebrow}>01 / Votre formation</p><h2 id="formations-title">Quel parcours<br /><em>vous ressemble ?</em></h2></div>
            <p>Cliquez sur votre formation pour afficher les dates correspondantes, puis choisissez le centre et la session qui vous conviennent.</p>
          </div>
          <button type="button" aria-pressed={activeFormation === 'all'} onClick={() => chooseFormation('all')} className={`${styles.allFormations} ${activeFormation === 'all' ? styles.activeFilter : ''}`}>Toutes les formations <Icon name="arrow" /></button>
          <div className={styles.formationGrid}>
            {formationFilters.map((formation, index) => {
              const count = formationSessionCounts[formation.key];
              const selected = activeFormation === formation.key;
              return <button key={formation.key} type="button" aria-pressed={selected} onClick={() => chooseFormation(formation.key)} className={`${planningThemeClass(formation.accent)} ${styles.formationCard} ${selected ? styles.selectedFormation : ''}`}>
                <span className={styles.formationEyebrow}><span aria-hidden="true" className="planning-accent-indicator" />0{index + 1} / {formation.eyebrow}</span>
                <strong>{formation.label}</strong><span className={styles.formationDescription}>{formation.description}</span>
                <span className={styles.formationAction}>{formation.key === 'bts' ? `Rentrées ${btsIntakeYear} et ${btsIntakeYear + 1}` : count ? count + (count > 1 ? ' sessions' : ' session') : 'Créer une alerte'}<Icon name="arrow" /></span>
              </button>;
            })}
          </div>
        </div>
      </section>

      <section id="sessions" className={`${school.section} ${styles.sessionsSection} ${activePlanningTheme}`} aria-labelledby="sessions-title">
        <div className={school.container}>
          <div className={school.sectionHeading}>
            <div><p className={school.eyebrow}>02 / Les prochaines dates</p><h2 id="sessions-title">Votre prochaine rentrée,<br /><em>à portée de main.</em></h2></div>
            <p>Consultez les dates, les lieux et les disponibilités. Chaque session vous donne accès au programme, aux prérequis et aux modalités d’inscription.</p>
          </div>
          <div className={styles.sessionToolbar}>
            <div className={styles.sessionCount} aria-live="polite" aria-atomic="true"><strong>{activeFormation === 'bts' ? 'Rentrées BTS' : filteredSessions.length + (filteredSessions.length > 1 ? ' sessions disponibles' : ' session disponible')}</strong><p>{activeFormation === 'bts' ? 'BTS en alternance' : view === 'list' ? 'Triées par prochaine date de rentrée ou échéance d’inscription' : 'Affichées dans le calendrier'}</p></div>
            {activeFormation !== 'bts' && <div className={styles.filters}>
              <div className={styles.filterGroup} role="group" aria-label="Filtrer les sessions par centre">
                {sessionLocationFilters.map(filter => <button key={filter.key} type="button" aria-pressed={locationFilter === filter.key} onClick={() => { setLocationFilter(filter.key); setShowAll(false); }} className={locationFilter === filter.key ? styles.activeFilter : ''}>{filter.label}</button>)}
              </div>
              <div className={styles.filterGroup} role="group" aria-label="Affichage des sessions">
                <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')} className={view === 'list' ? styles.activeFilter : ''}>Vue liste</button>
                <button type="button" aria-pressed={view === 'calendar'} onClick={() => setView('calendar')} className={view === 'calendar' ? styles.activeFilter : ''}>Vue calendrier</button>
              </div>
            </div>}
          </div>
          {activeFormation === 'bts' ? <BtsIntakes year={btsIntakeYear} /> : filteredSessions.length ? (
            view === 'list' ? <>
              <div className={styles.sessionList}>{visibleSessions.map((session, index) => <SessionCard key={session.id} session={session} isNext={index === 0} />)}</div>
              {filteredSessions.length > visibleSessions.length && <div className={styles.showMore}><button type="button" onClick={() => setShowAll(true)} className={school.button}>Voir toutes les dates ({filteredSessions.length}) <Icon name="arrow" /></button></div>}
            </> : <CalendarView sessions={filteredSessions} />
          ) : <div className={styles.emptyState}>
            <Icon name="search" /><h3>Aucune session ouverte pour cette sélection.</h3><p>Choisissez un autre centre, consultez toutes les sessions ou créez une alerte pour être prévenu de la prochaine date disponible.</p>
            <div><button type="button" onClick={() => { setLocationFilter('all'); chooseFormation('all'); }} className={school.button}>Voir toutes les sessions</button><Link href="/contact?motif=alerte-planning" className={school.textLink}>Créer une alerte <Icon name="arrow" /></Link></div>
          </div>}
          {activeFormation === 'all' && <BtsIntakes year={btsIntakeYear} />}
        </div>
      </section>

      <MissingDates sessions={sortedSessions} activeFormation={activeFormation} />

      <section id="preparer-inscription" className={school.section} aria-labelledby="prepare-title">
        <div className={school.container}>
          <div className={school.sectionHeading}>
            <div><p className={school.eyebrow}>03 / Préparez votre inscription</p><h2 id="prepare-title">Toutes les réponses.<br /><em>Pour faire votre choix.</em></h2></div>
            <p>Découvrez les formations, vérifiez votre financement et échangez avec l’équipe avant de réserver votre place.</p>
          </div>
          <div className={styles.resourceGrid}>
            {[
              ['01', 'Découvrir les formations', 'Comparer APS, A3P, SSIAP 1, VTC et BTS.', '/formations-securite'],
              ['02', 'Trouver un financement', 'CPF, France Travail, employeur et autres solutions.', '/financements'],
              ['03', 'Recruter ou former', 'Alternance, POEI et montée en compétences.', '/entreprises'],
              ['04', 'Parler à Cassandre', 'Valider mon projet et mes prochaines étapes.', '/contact?motif=rdv'],
            ].map(([number, label, description, href]) => <Link key={number} href={href} className={styles.resourceCard}>
              <span className={school.eyebrow}>{number}</span><h3>{label}</h3><p>{description}</p><span className={styles.resourceAction}>En savoir plus <Icon name="arrow" /></span>
            </Link>)}
          </div>
          <div id="questions" className={styles.questionsGrid}>
            <div><p className={school.eyebrow}>04 / Questions fréquentes</p><h3 className={styles.questionsTitle}>Avant de réserver une place</h3>
              <div className={styles.faq}>
                {[
                  ['Comment savoir s’il reste des places ?', 'Le nombre affiché sur chaque session est synchronisé avec les informations publiées par l’équipe.'],
                  ['Puis-je demander un financement avant de m’inscrire ?', 'Oui. Nous pouvons étudier votre situation avant la validation définitive de votre inscription.'],
                  ['Que faire si aucune date ne me convient ?', 'Créez une alerte planning : l’équipe vous préviendra dès qu’une nouvelle session sera ouverte.'],
                ].map(([question, answer]) => <details key={question}><summary>{question}<span className={school.plus} aria-hidden="true">+</span></summary><p>{answer}</p></details>)}
              </div>
            </div>
            <div className={styles.adviserPanel}>
              <p className={school.eyebrow}>Besoin d’un conseil ?</p><h3>Parlons de votre<br /><em>prochaine rentrée.</em></h3><p>Cassandre vous aide à choisir la formation, la session et le financement adaptés à votre projet.</p>
              <div className={styles.adviser}><span aria-hidden="true">CM</span><div><strong>Cassandre</strong><p>Responsable commerciale</p></div></div>
              <Link href="/contact?motif=rdv" className={school.button}>Réserver un échange <Icon name="arrow" /></Link>
            </div>
          </div>
        </div>
      </section>
      <nav className={styles.mobileActions} aria-label="Contacter l’équipe admissions">
        <a href="tel:0422470768">Appeler</a><Link href="/contact?motif=alerte-planning">Alerte</Link><Link href="https://assistance-alw9.onrender.com/demande-informations-formations">S’inscrire</Link>
      </nav>
    </div>
  );
}
