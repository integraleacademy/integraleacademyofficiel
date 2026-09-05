'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { formatSessionPeriod } from '@/lib/public-sessions';
import { sessionLocationFilters, sessionMatchesLocation, type SessionLocationFilterKey } from '@/lib/session-location-filter';
import { formatTrainingPrice } from '@/lib/training-price';

type TrainingTheme = 'blue' | 'green' | 'violet' | 'orange' | 'red' | 'gold';

type Action = {
  href: string;
  label: string;
  external?: boolean;
};

type SessionTheme = {
  featuredCard: string;
  badge: string;
  disclosure: string;
  disclosureIcon: string;
  periodIcon: string;
  periodLabel: string;
  detailIcon: string;
};

export type TrainingSessionCardItem = {
  id?: string | number | null;
  title?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  inPersonStartDate?: string | null;
  inPersonEndDate?: string | null;
  remoteStartDate?: string | null;
  remoteEndDate?: string | null;
  examDate?: string | null;
  status?: string | null;
  seatsLeft?: number | string | null;
  showSeatsLeft?: boolean | null;
  location?: string | null;
  priceLabel?: string | number | null;
  priceCents?: string | number | null;
  registrationHref: string;
};

type TrainingSessionCardsProps = {
  sessions: TrainingSessionCardItem[];
  theme: TrainingTheme;
  sessionTheme: SessionTheme;
  showDeliveryPeriods: boolean;
  remotePeriodFallback: string;
  inPersonPeriodFallback: string;
  defaultLocation: string;
  defaultPrice: string;
  initialSessionLimit?: number;
  showLocationFilter?: boolean;
  showSessionTitle?: boolean;
  emptyAction?: Action;
};

const actionStyles: Record<TrainingTheme | 'light', string> = {
  light: 'border border-academy-line bg-white text-academy-ink hover:bg-academy-bg focus:ring-stone-300/55',
  blue: 'bg-gradient-to-r from-blue-700 to-sky-500 text-white hover:brightness-105 focus:ring-blue-300/55',
  green: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-300/55',
  violet: 'bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-300/55',
  orange: 'bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-300/55',
  red: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-300/55',
  gold: 'bg-academy-gold text-academy-gold-text hover:brightness-105 focus:ring-academy-gold/25',
};

type PeriodIconName = 'calendar' | 'location' | 'screen';

function PeriodIcon({ name, className = 'h-4 w-4' }: { name: PeriodIconName; className?: string }) {
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

  if (name === 'calendar') {
    return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>;
  }
  if (name === 'screen') {
    return <svg {...common}><rect x="3" y="4" width="18" height="13" rx="2.5" /><path d="M8 21h8M12 17v4" /></svg>;
  }
  return <svg {...common}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
}

function formatDate(value?: string | null) {
  if (!value) return 'À confirmer';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'À confirmer';

  return new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date).replace(/^0/, '');
}

function formatPublicPeriod(startDate?: string | null, endDate?: string | null, fallback = 'Dates à confirmer') {
  if (!startDate || !endDate) return fallback;
  const period = formatSessionPeriod(startDate, endDate);
  return period.includes('administration') ? fallback : period;
}

function isFull(session: TrainingSessionCardItem) {
  const hasSeatCount = session.seatsLeft !== null && session.seatsLeft !== undefined && session.seatsLeft !== '';
  return session.status === 'FULL' || (hasSeatCount && Number(session.seatsLeft) === 0);
}

function seatsLabel(session: TrainingSessionCardItem) {
  if (isFull(session)) return 'Session complète';
  if (session.showSeatsLeft === false || session.seatsLeft === null || session.seatsLeft === undefined || session.seatsLeft === '') return 'Places limitées';

  const seats = Number(session.seatsLeft);
  if (Number.isNaN(seats)) return 'Places limitées';
  return seats === 1 ? '1 place restante' : `${seats} places restantes`;
}

function ActionLink({ action, variant, className = '' }: { action: Action; variant: TrainingTheme | 'light'; className?: string }) {
  const classes = `inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-center text-sm font-black transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 ${actionStyles[variant]} ${className}`;

  if (action.external) {
    return <a href={action.href} target="_blank" rel="noopener noreferrer" className={classes}>{action.label}</a>;
  }

  return <Link href={action.href} className={classes}>{action.label}</Link>;
}

function SessionCard({
  session,
  index,
  theme,
  sessionTheme,
  showDeliveryPeriods,
  remotePeriodFallback,
  inPersonPeriodFallback,
  defaultLocation,
  defaultPrice,
  showSessionTitle,
}: {
  session: TrainingSessionCardItem;
  index: number;
  theme: TrainingTheme;
  sessionTheme: SessionTheme;
  showDeliveryPeriods: boolean;
  remotePeriodFallback: string;
  inPersonPeriodFallback: string;
  defaultLocation: string;
  defaultPrice: string;
  showSessionTitle: boolean;
}) {
  const full = isFull(session);
  const sessionTitle = String(session.title || '').trim();
  const deliveryPeriods = [
    { label: 'Période complète', value: formatPublicPeriod(session.startDate, session.endDate), icon: 'calendar' as const, confirmed: Boolean(session.startDate && session.endDate) },
    { label: 'À distance', value: formatPublicPeriod(session.remoteStartDate, session.remoteEndDate, remotePeriodFallback), icon: 'screen' as const, confirmed: Boolean(session.remoteStartDate && session.remoteEndDate) },
    { label: 'En présentiel', value: formatPublicPeriod(session.inPersonStartDate, session.inPersonEndDate, inPersonPeriodFallback), icon: 'location' as const, confirmed: Boolean(session.inPersonStartDate && session.inPersonEndDate) },
  ];
  const [mainPeriod, ...detailPeriods] = deliveryPeriods;

  return <article className={`flex h-full flex-col rounded-[1.8rem] border p-5 shadow-soft ${index === 0 ? sessionTheme.featuredCard : 'border-academy-line bg-[#FFFDF8]'}`}>
    <div className="flex flex-wrap items-center justify-between gap-3">
      <span className={`rounded-full border px-3 py-1.5 text-[.64rem] font-black uppercase tracking-[.15em] ${sessionTheme.badge}`}>{index === 0 ? 'Prochaine session' : 'Session ouverte'}</span>
      <span className={`rounded-full border px-3 py-1.5 text-xs font-black ${full ? 'border-stone-300 bg-stone-100 text-stone-700' : sessionTheme.badge}`}>{seatsLabel(session)}</span>
    </div>
    {showSessionTitle && sessionTitle ? <h3 className="mt-5 text-xl font-black tracking-tight text-academy-ink">{sessionTitle}</h3> : null}
    {showDeliveryPeriods ? <div className={`${showSessionTitle && sessionTitle ? 'mt-3' : 'mt-5'} rounded-[1.35rem] border border-academy-line/70 bg-white/65 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,.8)]`}>
      <div className="flex items-center gap-3 rounded-[1.05rem] bg-[#101a29] px-4 py-3.5 text-white shadow-[0_12px_28px_rgba(16,26,41,.16)]">
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${sessionTheme.periodIcon}`}>
          <PeriodIcon name={mainPeriod.icon} className="h-[1.1rem] w-[1.1rem]" />
        </span>
        <span className="min-w-0">
          <span className={`block text-[.58rem] font-black uppercase tracking-[.16em] ${sessionTheme.periodLabel}`}>{mainPeriod.label}</span>
          <span className="mt-1 block text-[.95rem] font-black leading-5 text-white">{mainPeriod.value}</span>
        </span>
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {detailPeriods.map((period) => <div key={period.label} className={`flex items-start gap-3 rounded-[1rem] border px-3.5 py-3 ${period.confirmed ? 'border-academy-line/70 bg-[#FBF8F1]' : 'border-dashed border-academy-line bg-white/75'}`}>
          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-academy-line/70 bg-white ${sessionTheme.detailIcon}`}><PeriodIcon name={period.icon} /></span>
          <span className="min-w-0">
            <span className="block text-[.57rem] font-black uppercase tracking-[.15em] text-academy-muted">{period.label}</span>
            <span className={`mt-1 block text-sm font-black leading-5 ${period.confirmed ? 'text-academy-ink' : 'text-academy-muted'}`}>{period.value}</span>
          </span>
        </div>)}
      </div>
    </div> : <h3 className="mt-5 text-2xl font-black">{formatSessionPeriod(session.startDate, session.endDate)}</h3>}
    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 border-t border-academy-line/60 pt-3 text-sm font-bold text-academy-muted">
      <span className="inline-flex items-center gap-2"><PeriodIcon name="calendar" className={`h-4 w-4 ${sessionTheme.detailIcon}`} />Examen : {formatDate(session.examDate)}</span>
      <span className="inline-flex items-center gap-2"><PeriodIcon name="location" className={`h-4 w-4 ${sessionTheme.detailIcon}`} />{session.location || defaultLocation}</span>
    </div>
    <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-5">
      <strong className="text-3xl">{formatTrainingPrice(session, defaultPrice)}</strong>
      <ActionLink action={{ href: session.registrationHref, label: full ? 'Être alerté' : 'Choisir cette session →' }} variant={full ? 'light' : theme} />
    </div>
  </article>;
}

export function TrainingSessionCards({
  sessions,
  theme,
  sessionTheme,
  showDeliveryPeriods,
  remotePeriodFallback,
  inPersonPeriodFallback,
  defaultLocation,
  defaultPrice,
  initialSessionLimit,
  showLocationFilter = false,
  showSessionTitle = false,
  emptyAction,
}: TrainingSessionCardsProps) {
  const [locationFilter, setLocationFilter] = useState<SessionLocationFilterKey>('all');
  const filteredSessions = useMemo(
    () => showLocationFilter
      ? sessions.filter((session) => sessionMatchesLocation(session, locationFilter))
      : sessions,
    [locationFilter, sessions, showLocationFilter],
  );
  const normalizedInitialLimit = initialSessionLimit && initialSessionLimit > 0
    ? Math.floor(initialSessionLimit)
    : filteredSessions.length;
  const initiallyVisibleSessions = filteredSessions.slice(0, normalizedInitialLimit);
  const additionalSessions = filteredSessions.slice(normalizedInitialLimit);
  const additionalSessionsId = 'dates-tarifs-sessions-supplementaires';
  const selectedLocationLabel = sessionLocationFilters.find((filter) => filter.key === locationFilter)?.label ?? 'Tous';

  const cardProps = {
    theme,
    sessionTheme,
    showDeliveryPeriods,
    remotePeriodFallback,
    inPersonPeriodFallback,
    defaultLocation,
    defaultPrice,
    showSessionTitle,
  };

  return <>
    {showLocationFilter ? <div className="mb-6 flex flex-col gap-3 rounded-[1.5rem] border border-orange-200 bg-white p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div>
        <p className="text-[.64rem] font-black uppercase tracking-[.18em] text-orange-700">Centre de formation</p>
        <p className="mt-1 text-sm font-bold text-academy-muted" aria-live="polite">
          {filteredSessions.length} {filteredSessions.length > 1 ? 'sessions disponibles' : 'session disponible'}
        </p>
      </div>
      <div className="flex w-fit max-w-full items-center overflow-x-auto rounded-full border border-academy-line bg-academy-bg p-1" role="group" aria-label="Filtrer les sessions par centre">
        {sessionLocationFilters.map((filter) => {
          const selected = locationFilter === filter.key;
          return <button
            key={filter.key}
            type="button"
            aria-pressed={selected}
            onClick={() => setLocationFilter(filter.key)}
            className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-black transition focus:outline-none focus:ring-4 focus:ring-orange-300/45 ${selected ? 'bg-orange-600 text-white shadow-sm' : 'text-academy-muted hover:text-academy-ink'}`}
          >
            {filter.label}
          </button>;
        })}
      </div>
    </div> : null}

    {filteredSessions.length ? <>
      <div className="grid gap-4 lg:grid-cols-2">
        {initiallyVisibleSessions.map((session, index) => <SessionCard key={session.id ?? index} session={session} index={index} {...cardProps} />)}
      </div>
      {additionalSessions.length ? <details className="group/session-list mt-5">
        <summary
          aria-controls={additionalSessionsId}
          className={`mx-auto flex min-h-11 w-fit cursor-pointer list-none items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-black underline decoration-2 underline-offset-4 outline-none transition focus-visible:ring-4 [&::-webkit-details-marker]:hidden ${sessionTheme.disclosure}`}
        >
          <span className="group-open/session-list:hidden">Voir les prochaines sessions</span>
          <span className="hidden group-open/session-list:inline">Masquer les prochaines sessions</span>
          <span aria-hidden="true" className={`grid h-7 w-7 place-items-center rounded-full border text-base no-underline transition group-open/session-list:rotate-180 ${sessionTheme.disclosureIcon}`}>↓</span>
        </summary>
        <div id={additionalSessionsId} className="mt-4 grid gap-4 lg:grid-cols-2">
          {additionalSessions.map((session, additionalIndex) => {
            const index = initiallyVisibleSessions.length + additionalIndex;
            return <SessionCard key={session.id ?? index} session={session} index={index} {...cardProps} />;
          })}
        </div>
      </details> : null}
    </> : <article className="rounded-[1.8rem] border border-dashed border-academy-line bg-[#FFFDF8] p-6 shadow-soft">
      <span className={`rounded-full border px-3 py-1.5 text-[.64rem] font-black uppercase tracking-[.15em] ${sessionTheme.badge}`}>{showLocationFilter && sessions.length ? `Centre : ${selectedLocationLabel}` : 'Planning en préparation'}</span>
      <h3 className="mt-5 text-2xl font-black">{showLocationFilter && sessions.length ? `Aucune session disponible actuellement pour ${selectedLocationLabel}.` : 'La prochaine session est en cours de programmation.'}</h3>
      <p className="mt-2 font-bold text-academy-muted">Laissez-nous vos coordonnées pour recevoir les dates dès leur ouverture.</p>
      {emptyAction && <ActionLink action={emptyAction} variant={theme} className="mt-5" />}
    </article>}
  </>;
}
