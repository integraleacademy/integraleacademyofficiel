import Link from 'next/link';
import type { ReactNode } from 'react';
import { TrainingSessionCards, type TrainingSessionCardItem } from '@/components/TrainingSessionCards';
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
  initialSessionLimit?: number;
  showLocationFilter?: boolean;
  theme?: TrainingTheme;
  priceAction: Action;
  emptyAction?: Action;
  children?: ReactNode;
};

type TrainingTheme = 'blue' | 'green' | 'violet' | 'orange' | 'red' | 'gold';

const defaultBenefits = ['CPF', 'France Travail', 'Paiement x3 / x4 / x10', 'Conseiller dédié'];
const fundingOptions = [
  ['CPF', 'selon éligibilité'],
  ['France Travail', 'selon accord'],
  ['Employeur / OPCO', 'selon dossier'],
  ['Paiement personnel', 'facilités étudiées'],
];

const themeStyles: Record<TrainingTheme, { featuredCard: string; badge: string; disclosure: string; disclosureIcon: string; eyebrow: string; periodIcon: string; periodLabel: string; detailIcon: string }> = {
  blue: {
    featuredCard: 'border-blue-300 bg-blue-50/60',
    badge: 'border-blue-200 bg-blue-50 text-blue-800',
    disclosure: 'text-blue-700 hover:text-blue-900 focus-visible:ring-blue-300/55',
    disclosureIcon: 'border-blue-200 bg-blue-50 text-blue-800',
    eyebrow: 'text-blue-700',
    periodIcon: 'bg-blue-600 text-white',
    periodLabel: 'text-blue-200',
    detailIcon: 'text-blue-700',
  },
  green: {
    featuredCard: 'border-emerald-300 bg-emerald-50/60',
    badge: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    disclosure: 'text-emerald-700 hover:text-emerald-900 focus-visible:ring-emerald-300/55',
    disclosureIcon: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    eyebrow: 'text-emerald-700',
    periodIcon: 'bg-emerald-600 text-white',
    periodLabel: 'text-emerald-200',
    detailIcon: 'text-emerald-700',
  },
  violet: {
    featuredCard: 'border-violet-300 bg-violet-50/60',
    badge: 'border-violet-200 bg-violet-50 text-violet-800',
    disclosure: 'text-violet-700 hover:text-violet-900 focus-visible:ring-violet-300/55',
    disclosureIcon: 'border-violet-200 bg-violet-50 text-violet-800',
    eyebrow: 'text-violet-700',
    periodIcon: 'bg-violet-600 text-white',
    periodLabel: 'text-violet-200',
    detailIcon: 'text-violet-700',
  },
  orange: {
    featuredCard: 'border-orange-300 bg-orange-50/60',
    badge: 'border-orange-200 bg-orange-50 text-orange-800',
    disclosure: 'text-orange-700 hover:text-orange-900 focus-visible:ring-orange-300/55',
    disclosureIcon: 'border-orange-200 bg-orange-50 text-orange-800',
    eyebrow: 'text-orange-700',
    periodIcon: 'bg-orange-600 text-white',
    periodLabel: 'text-orange-200',
    detailIcon: 'text-orange-700',
  },
  red: {
    featuredCard: 'border-red-300 bg-red-50/60',
    badge: 'border-red-200 bg-red-50 text-red-800',
    disclosure: 'text-red-700 hover:text-red-900 focus-visible:ring-red-300/55',
    disclosureIcon: 'border-red-200 bg-red-50 text-red-800',
    eyebrow: 'text-red-700',
    periodIcon: 'bg-red-600 text-white',
    periodLabel: 'text-red-200',
    detailIcon: 'text-red-700',
  },
  gold: {
    featuredCard: 'border-yellow-300 bg-yellow-50/60',
    badge: 'border-yellow-300 bg-yellow-50 text-yellow-800',
    disclosure: 'text-yellow-800 hover:text-yellow-950 focus-visible:ring-yellow-300/55',
    disclosureIcon: 'border-yellow-300 bg-yellow-50 text-yellow-800',
    eyebrow: 'text-yellow-700',
    periodIcon: 'bg-academy-gold text-academy-gold-text',
    periodLabel: 'text-academy-gold',
    detailIcon: 'text-academy-gold-strong',
  },
};

function ActionLink({ action, variant = 'dark', className = '' }: { action: Action; variant?: 'dark' | 'light' | TrainingTheme; className?: string }) {
  const styles = {
    dark: 'bg-academy-ink text-white hover:bg-black focus:ring-academy-gold/25',
    light: 'border border-academy-line bg-white text-academy-ink hover:bg-academy-bg focus:ring-stone-300/55',
    blue: 'bg-gradient-to-r from-blue-700 to-sky-500 text-white hover:brightness-105 focus:ring-blue-300/55',
    green: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-300/55',
    violet: 'bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-300/55',
    orange: 'bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-300/55',
    red: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-300/55',
    gold: 'bg-academy-gold text-academy-gold-text hover:brightness-105 focus:ring-academy-gold/25',
  };
  const classes = `inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-center text-sm font-black transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 ${styles[variant]} ${className}`;

  if (action.external) {
    return <a href={action.href} target="_blank" rel="noopener noreferrer" className={classes}>{action.label}</a>;
  }

  return <Link href={action.href} className={classes}>{action.label}</Link>;
}

function serializeDate(value?: string | Date | null) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function serializeSession(
  session: TrainingDatesPricingSession,
  registrationHref: (session: TrainingDatesPricingSession) => string,
): TrainingSessionCardItem {
  return {
    id: session.id,
    startDate: serializeDate(session.startDate),
    endDate: serializeDate(session.endDate),
    inPersonStartDate: serializeDate(session.inPersonStartDate),
    inPersonEndDate: serializeDate(session.inPersonEndDate),
    remoteStartDate: serializeDate(session.remoteStartDate),
    remoteEndDate: serializeDate(session.remoteEndDate),
    examDate: serializeDate(session.examDate),
    status: session.status,
    seatsLeft: session.seatsLeft,
    showSeatsLeft: session.showSeatsLeft,
    location: session.location,
    priceLabel: session.priceLabel,
    priceCents: session.priceCents,
    registrationHref: registrationHref(session),
  };
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
  initialSessionLimit,
  showLocationFilter = false,
  theme = 'green',
  priceAction,
  emptyAction,
  children,
}: TrainingDatesPricingSectionProps) {
  const sessionTheme = themeStyles[theme];
  const serializedSessions = sessions.map((session) => serializeSession(session, registrationHref));
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
        <div><p className={`text-[.66rem] font-black uppercase tracking-[.24em] ${sessionTheme.eyebrow}`}>{eyebrow}</p><h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-.045em] sm:text-4xl lg:text-5xl">{title}</h2></div>
        <div className="max-w-3xl text-base font-medium leading-8 text-academy-muted">{intro}</div>
      </div>

      <TrainingSessionCards
        sessions={serializedSessions}
        theme={theme}
        sessionTheme={sessionTheme}
        showDeliveryPeriods={showDeliveryPeriods}
        remotePeriodFallback={remotePeriodFallback}
        inPersonPeriodFallback={inPersonPeriodFallback}
        defaultLocation={defaultLocation}
        defaultPrice={defaultPrice}
        initialSessionLimit={initialSessionLimit}
        showLocationFilter={showLocationFilter}
        emptyAction={emptyAction}
      />

      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        <article className="rounded-[2rem] border border-academy-line bg-white p-6 shadow-soft">
          <p className={`text-[.66rem] font-black uppercase tracking-[.24em] ${sessionTheme.eyebrow}`}>Tarif</p>
          <p className="mt-3 text-5xl font-black">{displayedPrice}</p>
          <p className="mt-2 font-semibold text-academy-muted">{priceDescription}</p>
          <div className="mt-5 grid grid-cols-2 gap-3">{benefits.map((item) => <div key={item} className="rounded-2xl bg-academy-bg p-4 text-center text-sm font-black">{item}</div>)}</div>
          <ActionLink action={priceAction} variant={theme} className="mt-5 w-full" />
        </article>

        <article className="rounded-[2rem] bg-[#0D1725] p-6 text-white shadow-card">
          <p className={`text-[.66rem] font-black uppercase tracking-[.24em] ${sessionTheme.periodLabel}`}>Financement</p>
          <h3 className="mt-3 text-3xl font-black">Simulez votre reste à charge.</h3>
          <p className="mt-3 leading-7 text-white/65">Estimez le montant restant après vos aides et votre CPF.</p>
          <ActionLink action={{ href: '/financements#simulateur', label: 'Ouvrir le simulateur →' }} variant={theme} className="mt-5 w-full" />
          <div className="mt-5 grid grid-cols-2 gap-3">{fundingOptions.map(([optionTitle, text]) => <div key={optionTitle} className="rounded-2xl border border-white/10 bg-white/7 p-4"><p className="font-black">{optionTitle}</p><p className="mt-1 text-xs text-white/50">{text}</p></div>)}</div>
        </article>
      </div>

      {children}
    </div>
  </section>;
}
