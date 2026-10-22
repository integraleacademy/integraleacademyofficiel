'use client';

import Image from 'next/image';
import { directorPlanningLocations, sessionMatchesLocation, type DirectorLocationFilterKey } from '@/lib/session-location-filter';
import styles from './planning.module.css';

const destinationArtwork: Record<DirectorLocationFilterKey, string> = {
  paris: '/images/planning-metiers/paris-destination.svg',
  'cote-azur': '/images/planning-metiers/cote-azur-destination.svg',
};

export function DirectorLocationChoices({ sessions, onChoose, selected, compact = false }: {
  sessions: { location?: string | null }[];
  onChoose: (location: DirectorLocationFilterKey) => void;
  selected?: DirectorLocationFilterKey | null;
  compact?: boolean;
}) {
  return <div className={`${styles.directorLocations} ${compact ? styles.directorLocationsCompact : ''}`} role="group" aria-label="Choisir le lieu de formation DIRIGEANT">
    {directorPlanningLocations.map(location => {
      const count = sessions.filter(session => sessionMatchesLocation(session, location.key)).length;
      return <button key={location.key} type="button" className={styles.directorLocation} aria-label={`Choisir ${location.label}`} aria-pressed={selected === location.key} onClick={() => onChoose(location.key)}>
        <span className={styles.directorLocationImage}>
          <Image src={destinationArtwork[location.key]} alt="" width={800} height={500} sizes={compact ? '(max-width: 640px) 42vw, 320px' : '(max-width: 640px) 92vw, 650px'} />
          <span className={styles.directorLocationBadge}><span aria-hidden="true" />{count ? `${count} ${count > 1 ? 'sessions' : 'session'}` : 'Dates à venir'}</span>
          <span className={styles.directorLocationCheck} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4 4L19 6" /></svg></span>
        </span>
        <span className={styles.directorLocationBody}>
          <span className={styles.directorLocationEyebrow}>Intégrale Academy</span>
          <strong className={styles.directorLocationTitle}>{location.label}</strong>
          <span className={styles.directorLocationDetail}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>{location.detail}</span>
          <span className={styles.directorLocationAction}><span>{count ? 'Voir les dates' : 'Me renseigner'}</span><span className={styles.directorLocationArrow} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></span></span>
        </span>
      </button>;
    })}
  </div>;
}
