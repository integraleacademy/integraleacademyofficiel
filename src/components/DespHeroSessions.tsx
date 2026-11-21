"use client";

import { useState } from 'react';
import { TrainingHeroSessionCard, trainingRegistrationUrl } from '@/components/TrainingHero';
import type { TrainingDatesPricingSession } from '@/components/TrainingDatesPricingSection';
import { directorPlanningLocations, nextSessionForLocation } from '@/lib/session-location-filter';
import { despInitialAdminData } from '@/data/despInitial';
import styles from './TrainingHero.module.css';

export function DespHeroSessions({ sessions, defaultPrice, rncp }: {
  sessions: TrainingDatesPricingSession[];
  defaultPrice: string;
  rncp: string;
}) {
  const [location, setLocation] = useState(() =>
    directorPlanningLocations.find(item => nextSessionForLocation(sessions, item.key)) ?? directorPlanningLocations[0]
  );
  const session = nextSessionForLocation(sessions, location.key);

  return <TrainingHeroSessionCard
    session={session} theme="orange" defaultPrice={defaultPrice}
    defaultLocation={location.defaultLocation} assistantKey="desp"
    registrationHref={trainingRegistrationUrl}
    overviewControls={<div className={styles.locationChoices} role="group" aria-label="Lieu de la prochaine session DESP">
      {directorPlanningLocations.map(item => <button key={item.key} type="button" aria-pressed={location.key === item.key} onClick={() => setLocation(item)}>{item.label}</button>)}
    </div>}
    facts={[
      { label: 'Certification', value: 'Titre DESP', details: ['Dirigeant d’entreprise de sécurité privée', `Niveau 5 · ${rncp}`] },
      { label: 'Durée et format', value: despInitialAdminData.duration.total, details: [despInitialAdminData.duration.remote, despInitialAdminData.duration.inPerson] },
      { label: 'Rythme et objectif', value: '7 semaines', details: ['Parcours intensif', 'Préparer l’agrément dirigeant CNAPS'] },
    ]}
  />;
}
