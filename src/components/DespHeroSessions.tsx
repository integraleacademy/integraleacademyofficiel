import Link from 'next/link';
import { OrientationAssistant } from '@/components/OrientationAssistant';
import { trainingRegistrationUrl } from '@/components/TrainingHero';
import type { TrainingDatesPricingSession } from '@/components/TrainingDatesPricingSection';
import { nextSessionForLocation } from '@/lib/session-location-filter';
import { getSessionSeatAvailability } from '@/lib/session-seat-availability';
import { formatTrainingPrice } from '@/lib/training-price';
import styles from './TrainingHero.module.css';

const locations = [
  { key: 'cote-azur', label: 'Côte d’Azur', fallback: 'Puget-sur-Argens / Côte d’Azur' },
  { key: 'paris', label: 'Paris', fallback: 'Paris' },
] as const;

function formatDate(value?: string | Date | null) {
  if (!value) return 'À confirmer';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'À confirmer';
  return new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}

export function DespHeroSessions({ sessions, defaultPrice }: {
  sessions: TrainingDatesPricingSession[];
  defaultPrice: string;
}) {
  return <aside className={`${styles.sessionCard} rounded-[2rem] border border-white/80 bg-[#FFFDF8] p-5 text-academy-ink sm:p-6 lg:p-7`} data-theme="orange" aria-label="Prochaines sessions DESP par ville">
    <h2 className={`${styles.sessionLabel} inline-flex`}>Prochaines sessions</h2>
    <p className="mt-3 text-sm font-bold text-academy-muted">245 heures · Distanciel + présentiel</p>
    <div className="mt-4 grid gap-3">
      {locations.map(({ key, label, fallback }) => {
        const session = nextSessionForLocation(sessions, key);
        const availability = session ? getSessionSeatAvailability(session, 12) : null;
        const full = availability?.tone === 'full';
        const actionLabel = full ? 'Être alerté des prochaines dates →' : session ? 'Réserver ma place →' : 'Recevoir les prochaines dates →';
        return <section key={key} aria-labelledby={`desp-hero-${key}`} className="min-w-0 rounded-2xl border border-[#E8DECE] bg-[#F5EFE4] p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 id={`desp-hero-${key}`} className="text-xl font-black tracking-tight">{label}</h3>
            <span className={`rounded-full border px-2.5 py-1 text-[.68rem] font-black ${availability?.badgeClassName || 'border-stone-200 bg-stone-100 text-stone-700'}`}>{availability?.label || 'Dates à confirmer'}</span>
          </div>
          <p className="mt-3 text-xl font-black leading-snug tracking-[-.035em] sm:text-2xl">
            {session ? <><span className="inline-block">{formatDate(session.startDate)}</span> <span className={styles.sessionAccent}>→</span>{' '}<span className="inline-block">{formatDate(session.endDate)}</span></> : 'Prochaines dates à confirmer'}
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm">
            <p className="font-semibold text-academy-muted">{session?.examDate ? `Examen le ${formatDate(session.examDate)}` : 'Contactez-nous pour préparer votre inscription.'}</p>
            <p className="font-black">{formatTrainingPrice(session, defaultPrice)}</p>
          </div>
          <p className="mt-2 text-xs font-semibold leading-5 text-academy-muted">{session?.location || fallback}</p>
          <Link href={trainingRegistrationUrl} aria-label={`${actionLabel.replace(' →', '')} — ${label}`} className={`${styles.action} ${full ? styles.waitingAction : styles.primaryAction} mt-3 w-full`}>{actionLabel}</Link>
        </section>;
      })}
    </div>
    <p className="mt-3 text-center text-xs font-semibold leading-5 text-academy-muted">Un conseiller vérifie votre dossier avant validation.</p>
    <div className="mt-3"><OrientationAssistant initialFormationKey="desp" hideInfoAction variant="modalTrigger" /></div>
  </aside>;
}
