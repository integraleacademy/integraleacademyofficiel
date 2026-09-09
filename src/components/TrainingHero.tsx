import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { OrientationAssistant, type FormationKey } from '@/components/OrientationAssistant';
import type { TrainingDatesPricingSession } from '@/components/TrainingDatesPricingSection';
import { getSessionSeatAvailability } from '@/lib/session-seat-availability';
import { formatTrainingPrice } from '@/lib/training-price';
import styles from './TrainingHero.module.css';

type HeroTheme = 'orange' | 'red' | 'green';
type HeroFacts = ReadonlyArray<ReadonlyArray<string>>;

export const trainingRegistrationUrl = 'https://assistance-alw9.onrender.com/demande-informations-formations';

export function TrainingHero({
  theme, imageSrc, badge, title, tagline, taglineAccent, description,
  primaryAction, highlights = [], facts, children, additionalAction,
}: {
  theme: HeroTheme;
  imageSrc: string;
  badge: string;
  title: string;
  tagline: string;
  taglineAccent: string;
  description: ReactNode;
  primaryAction: { href: string; label: string };
  highlights?: string[];
  facts: HeroFacts;
  children: ReactNode;
  additionalAction?: ReactNode;
}) {
  return <section className={`${styles.hero} px-4 text-white`} data-theme={theme}>
    <Image src={imageSrc} alt="" fill priority sizes="100vw" className={styles.heroPhoto} />
    <div className={styles.heroOverlay} />
    <div className={`page-container ${styles.heroContent}`}>
      <div className="max-w-4xl">
        <span className={styles.heroBadge}><span aria-hidden="true" />{badge}</span>
        <h1 className={`${styles.heroTitle} mt-7 max-w-4xl text-[2.65rem] font-black leading-[.98] tracking-[-.055em] sm:text-[3.75rem] lg:text-[4.75rem] xl:text-[5.15rem]`}>{title}</h1>
        <p className={`${styles.heroTagline} mt-5 max-w-3xl text-2xl font-black tracking-[-.035em] sm:text-3xl`}>{tagline} <span className={styles.heroTitleAccent}>{taglineAccent}</span></p>
        <div className="mt-5 max-w-2xl space-y-4 text-lg font-medium leading-8 text-white/80 sm:text-xl">{description}</div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href={primaryAction.href} className={`${styles.action} ${styles.primaryAction}`}>{primaryAction.label}</Link>
          <Link href="tel:0422470768" className={`${styles.action} ${styles.secondaryAction}`}>Parler à un conseiller</Link>
        </div>
        {additionalAction}
        {highlights.length > 0 && <div className="mt-7 flex flex-wrap gap-2 text-xs font-bold text-white/80">{highlights.map(label => <span key={label} className={styles.highlight}>✓ {label}</span>)}</div>}
      </div>
      {children}
    </div>
    <div className={`page-container ${styles.heroFacts} grid grid-cols-2 overflow-hidden rounded-[1.6rem] border border-white/20 bg-white/[.07] lg:grid-cols-6`}>
      {facts.map(([label, value, detail]) => <div key={label} className="min-w-0 border-b border-r border-white/15 p-4 last:border-r-0 lg:border-b-0">
        <p className="text-[.58rem] font-black uppercase tracking-[.18em] text-white/65">{label}</p>
        <p className="mt-1 font-black text-white">{value}</p>
        {detail && <p className="mt-1 text-[.68rem] font-semibold leading-4 text-white/65">{detail}</p>}
      </div>)}
    </div>
  </section>;
}

function formatDate(value?: string | Date | null) {
  if (!value) return 'À confirmer';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'À confirmer';
  return new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}

export function TrainingHeroSessionCard({
  session, theme, duration, defaultPrice, defaultLocation = 'Puget-sur-Argens',
  modality = 'Présentiel', capacity = 12, assistantKey, label = 'Prochaine session',
  emptyTitle = 'Prochaines dates à confirmer',
  emptyDescription = 'Contactez-nous pour recevoir les prochaines dates et préparer votre inscription.',
  emptyActionLabel = 'Recevoir les prochaines dates →', examLabel = 'Examen le',
}: {
  session?: TrainingDatesPricingSession | null;
  theme: HeroTheme;
  duration: string;
  defaultPrice: string;
  defaultLocation?: string;
  modality?: string;
  capacity?: number;
  assistantKey: FormationKey;
  label?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyActionLabel?: string;
  examLabel?: string;
}) {
  const availability = session ? getSessionSeatAvailability(session, capacity) : null;
  const full = availability?.tone === 'full';
  return <aside className={`${styles.sessionCard} rounded-[2rem] border border-white/80 bg-[#FFFDF8] p-5 text-academy-ink sm:p-6 lg:p-7`} data-theme={theme} aria-label="Dates et inscription">
    <div className="flex flex-wrap items-center gap-2">
      <span className={styles.sessionLabel}>{label}</span>
      <span className={`rounded-full border px-3 py-1.5 text-[.68rem] font-black ${availability?.badgeClassName || 'border-stone-200 bg-stone-100 text-stone-700'}`}>{availability?.label || 'Dates à confirmer'}</span>
    </div>
    <h2 className="mt-5 text-3xl font-black tracking-[-.04em] sm:text-4xl">{session ? <>{formatDate(session.startDate)} <span className={styles.sessionAccent}>→</span><br />{formatDate(session.endDate)}</> : emptyTitle}</h2>
    <p className="mt-2 text-sm font-extrabold text-academy-muted">{session?.examDate ? `${examLabel} ${formatDate(session.examDate)}` : emptyDescription}</p>
    <div className="mt-5 grid grid-cols-2 gap-2.5">
      {[
        ['Durée', duration],
        ['Tarif', formatTrainingPrice(session, defaultPrice)],
        ['Lieu', session?.location || defaultLocation],
        ['Modalité', modality],
      ].map(([key, value]) => <div key={key} className="min-w-0 rounded-2xl border border-[#E8DECE] bg-[#F5EFE4] p-3.5"><p className="text-[.6rem] font-black uppercase tracking-[.16em] text-[#837968]">{key}</p><p className="mt-1 text-sm font-black sm:text-base">{value}</p></div>)}
    </div>
    <Link href={trainingRegistrationUrl} className={`${styles.action} ${full ? styles.waitingAction : styles.primaryAction} mt-5 w-full`}>{full ? 'Être alerté de la prochaine session' : session ? 'Réserver ma place →' : emptyActionLabel}</Link>
    <p className="mt-3 text-center text-xs font-semibold leading-5 text-academy-muted">Un conseiller vérifie votre dossier avant validation.</p>
    <div className="mt-3"><OrientationAssistant initialFormationKey={assistantKey} hideInfoAction variant="modalTrigger" /></div>
  </aside>;
}
