"use client";

import { useState } from 'react';
import { TrainingHeroSessionCard, trainingRegistrationUrl } from '@/components/TrainingHero';
import type { TrainingDatesPricingSession } from '@/components/TrainingDatesPricingSection';
import { nextSessionForLocation } from '@/lib/session-location-filter';
import { despInitialAdminData } from '@/data/despInitial';
import styles from './TrainingHero.module.css';

const locations = [
  { key: 'cote-azur', label: 'Côte d’Azur', fallback: 'Puget-sur-Argens / Côte d’Azur' },
  { key: 'paris', label: 'Paris', fallback: 'Paris' },
  { key: 'auvergne', label: 'Aurillac', fallback: 'Aurillac / Auvergne' },
] as const;

export function DespHeroSessions({ sessions, defaultPrice, rncp }: {
  sessions: TrainingDatesPricingSession[];
  defaultPrice: string;
  rncp: string;
}) {
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[number]['key']>(() =>
    locations.find(location => nextSessionForLocation(sessions, location.key))?.key || 'cote-azur'
  );
  const location = locations.find(item => item.key === selectedLocation)!;
  const session = nextSessionForLocation(sessions, selectedLocation);

  return <TrainingHeroSessionCard
    session={session} theme="orange" defaultPrice={defaultPrice}
    defaultLocation={location.fallback} assistantKey="desp"
    registrationHref={trainingRegistrationUrl}
    overviewControls={<div className={styles.locationChoices} role="group" aria-label="Lieu de la prochaine session DESP">
      {locations.map(item => <button key={item.key} type="button" aria-pressed={selectedLocation === item.key} onClick={() => setSelectedLocation(item.key)}>{item.label}</button>)}
    </div>}
    facts={[
      { label: 'Certification', value: 'Titre DESP', details: ['Dirigeant d’entreprise de sécurité privée', `Niveau 5 · ${rncp}`] },
      { label: 'Durée et format', value: despInitialAdminData.duration.total, details: [despInitialAdminData.duration.remote, despInitialAdminData.duration.inPerson] },
      { label: 'Rythme et objectif', value: '7 semaines', details: ['Parcours intensif', 'Préparer l’agrément dirigeant CNAPS'] },
    ]}
  />;
}
