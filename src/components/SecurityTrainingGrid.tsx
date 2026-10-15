"use client";

import { TrainingCarousel } from './TrainingCarousel';
import styles from './TrainingCarousel.module.css';

export type TrainingVisual = 'aps' | 'ssiap' | 'sst' | 'a3p' | 'desp';

export type SecurityTrainingHighlight = {
  slug: string;
  shortTitle: string;
  title: string;
  description: string;
  duration: string;
  modality: string;
  location: string;
  financing?: string;
  pathway?: string;
  nextSession: string;
  visual: TrainingVisual;
  featured?: boolean;
};

const presentations: Record<TrainingVisual, { category: string; image: string; alt: string }> = {
  aps: {
    category: 'Surveillance humaine',
    image: 'formation-scenes-manuel/aps-mission-acces.webp',
    alt: 'Un agent de sécurité contrôle les accès à un site professionnel.',
  },
  ssiap: {
    category: 'Sécurité incendie',
    image: 'formation-scenes-manuel/ssiap-1-galerie-ssi.webp',
    alt: 'Des agents de sécurité incendie travaillent au poste de sécurité.',
  },
  sst: {
    category: 'Secourisme',
    image: 'sst/manuel/formation.webp',
    alt: 'Des stagiaires apprennent les gestes de premiers secours avec leur formateur.',
  },
  a3p: {
    category: 'Protection rapprochée',
    image: 'a3p/manuel/protection.webp',
    alt: 'Une équipe de protection rapprochée accompagne une personne lors de ses déplacements.',
  },
  desp: {
    category: 'Direction',
    image: 'desp/manuel/direction.webp',
    alt: 'Un dirigeant organise les activités d’une entreprise de sécurité avec son équipe.',
  },
};

export function SecurityTrainingGrid({ items }: { items: SecurityTrainingHighlight[] }) {
  return <TrainingCarousel
    label="Découvrir les formations en sécurité"
    tabListLabel="Choisir une formation en sécurité"
    previousLabel="Formation précédente"
    nextLabel="Formation suivante"
    items={items.map((item) => ({
      ...item,
      category: presentations[item.visual].category,
      ctaLabel: `Découvrir la formation ${item.shortTitle}`,
      imageSrc: `/images/${presentations[item.visual].image}`,
      imageAlt: presentations[item.visual].alt,
      details: <>
        {item.pathway && <p className={styles.pathway}>{item.pathway}</p>}
        <dl className={styles.courseFacts}>
          <div><dt className="sr-only">Durée</dt><dd>{item.duration}{item.pathway ? ' en initial' : ''}</dd></div>
          <div><dt className="sr-only">Modalités</dt><dd>{item.modality}</dd></div>
          <div className={styles.courseLocation}><dt className="sr-only">Lieu</dt><dd>{item.location}</dd></div>
        </dl>
      </>,
      caption: <><span>Prochaine session</span><strong>{item.nextSession}</strong></>,
    }))}
  />;
}
