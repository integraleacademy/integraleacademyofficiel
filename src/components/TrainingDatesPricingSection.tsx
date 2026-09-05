import Link from 'next/link';
import type { ReactNode } from 'react';
import { formatSessionPeriod } from '@/lib/public-sessions';
import { formatTrainingPrice } from '@/lib/training-price';

export type TrainingDatesPricingSession = {
  id?: string | number | null;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  inPersonStartDate?: string | Date | null;
  inPersonEndDate?: string | Date | null;
  remoteStartDate?: string | Date | null;
  remoteEndDate?: string | Date | null;
  examDate?: string | Date | null;
  status?: string | null;
  seatsLeft?: number | string | null;
  showSeatsLeft?: boolean | null;
  location?: string | null;
  priceLabel?: string | number | null;
  priceCents?: string | number | null;
};

type Action = {
  href: string;
  label: string;
  external?: boolean;
};

type TrainingDatesPricingSectionProps = {
  sessions: TrainingDatesPricingSession[];
  defaultPrice: string;
  defaultLocation?: string;
  priceDescription: string;
  registrationHref: (session: TrainingDatesPricingSession) => string;
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  benefits?: string[];
  showDeliveryPeriods?: boolean;
  remotePeriodFallback?: string;
  inPersonPeriodFallback?: string;
  priceAction: Action;
  emptyAction?: Action;
  children?: ReactNode;
};

const defaultBenefits = ['CPF', 'France Travail', 'Paiement x3 / x4 / x10', 'Conseiller dédié'];
const fundingOptions = [
  ['CPF', 'selon éligibilité'],
  ['France Travail', 'selon accord'],
  ['Employeur / OPCO', 'selon dossier'],
  ['Paiement personnel', 'facilités étudiées'],
];

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

function formatDate(value?: string | Date | null) {
  if (!value) return 'À confirmer';

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return 'À confirmer';

  return new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date).replace(/^0/, '');
}

function formatPublicPeriod(startDate?: string | Date | null, endDate?: string | Date | null, fallback = 'Dates à confirmer') {
  if (!startDate || !endDate) return fallback;
  const period = formatSessionPeriod(startDate, endDate);
  return period.includes('administration') ? fallback : period;
}

function isFull(session: TrainingDatesPricingSession) {
  const hasSeatCount = session.seatsLeft !== null && session.seatsLeft !== undefined && session.seatsLeft !== '';
  return session.status === 'FULL' || (hasSeatCount && Number(session.seatsLeft) === 0);
}

function seatsLabel(session: TrainingDatesPricingSession) {
  if (isFull(session)) return 'Session complète';
  if (session.showSeatsLeft === false || session.seatsLeft === null || session.seatsLeft === undefined || session.seatsLeft === '') return 'Places limitées';

  const seats = Number(session.seatsLeft);
  if (Number.isNaN(seats)) return 'Places limitées';
  return seats === 1 ? '1 place restante' : `${seats} places restantes`;
}

function ActionLink({ action, variant = 'dark', className = '' }: { action: Action; variant?: 'dark' | 'gold' | 'light' | 'blue'; className?: string }) {
  const styles = {
    dark: 'bg-academy-ink text-white hover:bg-black',
    gold: 'bg-academy-gold text-academy-gold-text hover:brightness-105',
    light: 'border border-academy-line bg-white text-academy-ink hover:bg-academy-bg',
    blue: 'bg-gradient-to-r from-blue-700 to-sky-500 text-white hover:brightness-105',
  };
  const classes = `inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-center text-sm font-black transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-academy-gold/25 ${styles[variant]} ${className}`;

  if (action.external) {
    return <a href={action.href} target="_blank" rel="noopener noreferrer" className={classes}>{action.label}</a>;
  }

  return <Link href={action.href} className={classes}>{action.label}</Link>;
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-[.66rem] font-black uppercase tracking-[.24em] ${light ? 'text-emerald-300' : 'text-yellow-700'}`}>{children}</p>;
}

export function TrainingDatesPricingSection({
  sessions,
  defaultPrice,
  defaultLocation = 'Puget-sur-Argens',
  priceDescription,
  registrationHref,
  id = 'dates-tarifs',
  eyebrow = 'Dates & tarifs',
  title = 'Choisissez votre prochaine session.',
  intro = 'Les dates, examens, tarifs et places restantes proviennent des informations enregistrées par l’administration.',
  benefits = defaultBenefits,
  showDeliveryPeriods = false,
  remotePeriodFallback = 'Dates à confirmer',
  inPersonPeriodFallback = 'Dates à confirmer',
  priceAction,
  emptyAction,
  children,
}: TrainingDatesPricingSectionProps) {
  const displayedPrice = formatTrainingPrice(
    sessions.find((session) => (
      session.priceCents !== null && session.priceCents !== undefined
      || session.priceLabel !== null && session.priceLabel !== undefined
    )),
    defaultPrice,
  );

  return <section id={id} className="scroll-mt-24 bg-academy-bg px-4 py-14 text-academy-ink sm:py-16 lg:py-20">
    <div className="page-container">
      <div className="mb-8 grid gap-5 lg:grid-cols-[.75fr_1.25fr] lg:items-end lg:gap-16">
        <div><Eyebrow>{eyebrow}</Eyebrow><h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-.045em] sm:text-4xl lg:text-5xl">{title}</h2></div>
        <div className="max-w-3xl text-base font-medium leading-8 text-academy-muted">{intro}</div>
      </div>

      {sessions.length ? <div className="grid gap-4 lg:grid-cols-2">
        {sessions.map((session, index) => {
          const full = isFull(session);
          const deliveryPeriods = [
            { label: 'Période complète', value: formatPublicPeriod(session.startDate, session.endDate), icon: 'calendar' as const, confirmed: Boolean(session.startDate && session.endDate) },
            { label: 'À distance', value: formatPublicPeriod(session.remoteStartDate, session.remoteEndDate, remotePeriodFallback), icon: 'screen' as const, confirmed: Boolean(session.remoteStartDate && session.remoteEndDate) },
            { label: 'En présentiel', value: formatPublicPeriod(session.inPersonStartDate, session.inPersonEndDate, inPersonPeriodFallback), icon: 'location' as const, confirmed: Boolean(session.inPersonStartDate && session.inPersonEndDate) },
          ];
          const [mainPeriod, ...detailPeriods] = deliveryPeriods;
          return <article key={session.id ?? index} className={`flex h-full flex-col rounded-[1.8rem] border p-5 shadow-soft ${index === 0 ? 'border-emerald-300 bg-emerald-50/60' : 'border-academy-line bg-[#FFFDF8]'}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[.64rem] font-black uppercase tracking-[.15em] text-emerald-800">{index === 0 ? 'Prochaine session' : 'Session ouverte'}</span>
              <span className={`rounded-full border px-3 py-1.5 text-xs font-black ${full ? 'border-stone-300 bg-stone-100 text-stone-700' : 'border-yellow-300 bg-yellow-50 text-yellow-800'}`}>{seatsLabel(session)}</span>
            </div>
            {showDeliveryPeriods ? <div className="mt-5 rounded-[1.35rem] border border-academy-line/70 bg-white/65 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,.8)]">
              <div className="flex items-center gap-3 rounded-[1.05rem] bg-[#101a29] px-4 py-3.5 text-white shadow-[0_12px_28px_rgba(16,26,41,.16)]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-academy-gold text-academy-gold-text">
                  <PeriodIcon name={mainPeriod.icon} className="h-[1.1rem] w-[1.1rem]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[.58rem] font-black uppercase tracking-[.16em] text-academy-gold">{mainPeriod.label}</span>
                  <span className="mt-1 block text-[.95rem] font-black leading-5 text-white">{mainPeriod.value}</span>
                </span>
              </div>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {detailPeriods.map((period) => <div key={period.label} className={`flex items-start gap-3 rounded-[1rem] border px-3.5 py-3 ${period.confirmed ? 'border-academy-line/70 bg-[#FBF8F1]' : 'border-dashed border-academy-line bg-white/75'}`}>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-academy-line/70 bg-white text-academy-gold-strong">
                    <PeriodIcon name={period.icon} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[.57rem] font-black uppercase tracking-[.15em] text-academy-muted">{period.label}</span>
                    <span className={`mt-1 block text-sm font-black leading-5 ${period.confirmed ? 'text-academy-ink' : 'text-academy-muted'}`}>{period.value}</span>
                  </span>
                </div>)}
              </div>
            </div> : <h3 className="mt-5 text-2xl font-black">{formatSessionPeriod(session.startDate, session.endDate)}</h3>}
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 border-t border-academy-line/60 pt-3 text-sm font-bold text-academy-muted">
              <span className="inline-flex items-center gap-2"><PeriodIcon name="calendar" className="h-4 w-4 text-academy-gold-strong" />Examen : {formatDate(session.examDate)}</span>
              <span className="inline-flex items-center gap-2"><PeriodIcon name="location" className="h-4 w-4 text-academy-gold-strong" />{session.location || defaultLocation}</span>
            </div>
            <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-5">
              <strong className="text-3xl">{formatTrainingPrice(session, defaultPrice)}</strong>
              <ActionLink action={{ href: registrationHref(session), label: full ? 'Être alerté' : 'Choisir cette session →' }} variant={full ? 'light' : 'dark'} />
            </div>
          </article>;
        })}
      </div> : <article className="rounded-[1.8rem] border border-dashed border-academy-line bg-[#FFFDF8] p-6 shadow-soft">
        <span className="rounded-full border border-yellow-300 bg-yellow-50 px-3 py-1.5 text-[.64rem] font-black uppercase tracking-[.15em] text-yellow-800">Planning en préparation</span>
        <h3 className="mt-5 text-2xl font-black">La prochaine session est en cours de programmation.</h3>
        <p className="mt-2 font-bold text-academy-muted">Laissez-nous vos coordonnées pour recevoir les dates dès leur ouverture.</p>
        {emptyAction && <ActionLink action={emptyAction} className="mt-5" />}
      </article>}

      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        <article className="rounded-[2rem] border border-academy-line bg-white p-6 shadow-soft">
          <Eyebrow>Tarif</Eyebrow>
          <p className="mt-3 text-5xl font-black">{displayedPrice}</p>
          <p className="mt-2 font-semibold text-academy-muted">{priceDescription}</p>
          <div className="mt-5 grid grid-cols-2 gap-3">{benefits.map((item) => <div key={item} className="rounded-2xl bg-academy-bg p-4 text-center text-sm font-black">{item}</div>)}</div>
          <ActionLink action={priceAction} variant="blue" className="mt-5 w-full" />
        </article>

        <article className="rounded-[2rem] bg-[#0D1725] p-6 text-white shadow-card">
          <Eyebrow light>Financement</Eyebrow>
          <h3 className="mt-3 text-3xl font-black">Simulez votre reste à charge.</h3>
          <p className="mt-3 leading-7 text-white/65">Estimez le montant restant après vos aides et votre CPF.</p>
          <ActionLink action={{ href: '/financements#simulateur', label: 'Ouvrir le simulateur →' }} variant="gold" className="mt-5 w-full" />
          <div className="mt-5 grid grid-cols-2 gap-3">{fundingOptions.map(([optionTitle, text]) => <div key={optionTitle} className="rounded-2xl border border-white/10 bg-white/7 p-4"><p className="font-black">{optionTitle}</p><p className="mt-1 text-xs text-white/50">{text}</p></div>)}</div>
        </article>
      </div>

      {children}
    </div>
  </section>;
}
