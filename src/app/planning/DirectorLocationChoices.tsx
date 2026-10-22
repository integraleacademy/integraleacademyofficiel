'use client';

import { directorPlanningLocations, sessionMatchesLocation, type DirectorLocationFilterKey } from '@/lib/session-location-filter';
import styles from './planning.module.css';

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
        <span className={styles.directorLocationIcon} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg></span>
        <strong>{location.label}</strong>
        <span className={styles.directorLocationDetail}>{location.detail}</span>
        <span className={styles.directorLocationAction}><span>{count ? `${count} ${count > 1 ? 'sessions disponibles' : 'session disponible'}` : 'Aucune date publiée'}</span><span aria-hidden="true">→</span></span>
      </button>;
    })}
  </div>;
}
