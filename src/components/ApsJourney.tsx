'use client';

import { originalArtwork } from '@/data/originalArtwork';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { TrainingJourney } from './TrainingJourney';
import styles from './ApsJourney.module.css';

const steps = [
  {
    label: 'Votre projet',
    title: 'Puis-je entrer en formation APS ?',
    description: 'Avant de choisir une session, faites le point sur les conditions d’admission et les pièces à réunir pour votre dossier.',
    link: 'Vérifier les prérequis', href: '#admission',
  },
  {
    label: 'Votre formation',
    title: 'Comment organiser ma formation ?',
    description: 'Le calendrier de chaque session précise les jours à réserver pour votre présence à l’école.',
    link: 'Voir la répartition des heures', href: '#hybride',
  },
  {
    label: 'L’immersion terrain',
    title: 'Comment se déroule un exercice ?',
    description: 'Le formateur vous donne une consigne. Vous faites un premier essai, puis vous reprenez l’exercice en tenant compte de ses observations.',
    link: 'Découvrir les mises en situation', href: '#pratique',
  },
  {
    label: 'Votre prochain chapitre',
    title: 'Et après l’examen ?',
    description: 'Une fois votre titre obtenu, vous pouvez demander votre carte professionnelle auprès du Ministère de l’Intérieur (CNAPS).',
    link: 'Découvrir les débouchés', href: '#debouches',
  },
] as const;

function Icon({ kind = 'arrow' }: { kind?: 'arrow' | 'rise' | 'screen' | 'school' }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === 'rise' ? <path d="M5 19 19 5M5 5h14v14" /> : kind === 'screen' ? <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 21h8m-4-5v5" /></> : kind === 'school' ? <><path d="m3 9 9-6 9 6M5 10v10h14V10M10 20v-6h4v6M2 21h20" /><path d="M8 10h.01M16 10h.01" /></> : <path d="M4 12h15m-6-6 6 6-6 6" />}
  </svg>;
}

function CardHeader({ label }: { label: string }) {
  return <div className={styles.cardHeader}><span className={styles.brand}>INTÉGRALE<span>ACADEMY</span></span><span className={styles.cardLabel}>{label}</span></div>;
}

function CardAction({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className={styles.cardAction}><span>{children}</span><span className={styles.actionArrow}><Icon /></span></Link>;
}

function CardNextAction({ onNext, label }: { onNext: () => void; label: string }) {
  return <button type="button" onClick={onNext} className={`${styles.cardAction} ${styles.cardNextAction}`} aria-label={`Étape suivante : ${label}`}><span className={styles.actionArrow}><Icon /></span></button>;
}

function JourneyVisual({ index, onNext }: { index: number; onNext: () => void }) {
  if (index === 0) return <div className={`${styles.card} ${styles.ambitionCard}`}>
    {/* Illustration from the APS manual. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img className={styles.coverPhoto} src={originalArtwork['aps-arrivee'].src} alt={originalArtwork['aps-arrivee'].alt} width="1536" height="1024" loading="lazy" decoding="async" />
    <div className={styles.coverOrbit} aria-hidden="true" />
    <CardHeader label="Le déclic" />
    <div className={styles.ambitionBody}>
      <p className={styles.ambitionTitle}>Votre premier poste<br /><span>dans la sécurité privée</span></p>
      <p className={styles.subtitle}>Vous pouvez intégrer la formation sans expérience préalable dans le secteur.</p>
      <span className={styles.openingArrow} aria-hidden="true"><Icon kind="rise" /></span>
    </div>
    <CardNextAction onNext={onNext} label={steps[1].label} />
  </div>;

  if (index === 1) return <div className={`${styles.card} ${styles.trainingCard}`}>
    <CardHeader label="Votre formation" />
    <p className={styles.durationHeadline}><strong>5</strong><span>semaines<br />de formation</span></p>
    <div className={styles.studyPlan}>
      <div className={styles.remoteStudy}><div className={styles.studyTop}><span>À distance</span><Icon kind="screen" /></div><p>Des cours à suivre depuis votre espace personnel.</p></div>
      <div className={styles.schoolStudy}><div className={styles.studyTop}><span>À l’école</span><Icon kind="school" /></div><p>Des séances en groupe avec vos formateurs.</p></div>
    </div>
    <CardNextAction onNext={onNext} label={steps[2].label} />
  </div>;

  if (index === 2) return <div className={`${styles.card} ${styles.practiceCard}`}>
    <CardHeader label="Immersion terrain" />
    <div className={styles.practiceBody}>
      <p className={styles.practiceTitle}>En binôme,<br /><span>à la radio</span></p>
      <figure className={styles.practicePhoto}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={originalArtwork['aps-atelier-radio'].src} alt={originalArtwork['aps-atelier-radio'].alt} width="1536" height="1024" loading="lazy" decoding="async" />
      </figure>
      <p className={styles.practiceNote}>Votre collègue a-t-il compris votre message dès la première écoute ?</p>
    </div>
    <CardNextAction onNext={onNext} label={steps[3].label} />
  </div>;

  return <div className={`${styles.card} ${styles.futureCard}`}>
    <div className={styles.futureOrbit} aria-hidden="true" />
    <CardHeader label="Votre prochain chapitre" />
    <p className={styles.futureHeading}>Du titre<br /><span>au premier poste</span></p>
    <div className={styles.destination}><strong>APS<span><Icon kind="rise" /></span></strong><p>Agent de prévention<br />et de sécurité</p></div>
    <div className={styles.futureSteps}>
      <Link href="#examen"><span>01 · LE TITRE<Icon kind="rise" /></span><strong>Le TFP APS</strong><small>Réussir votre examen</small></Link>
      <Link href="#debouches"><span>02 · LA CARTE<Icon kind="rise" /></span><strong>La carte professionnelle</strong><small>Ministère de l’Intérieur (CNAPS)</small></Link>
    </div>
    <CardAction href="#inscription-financement">Préparer mon inscription</CardAction>
  </div>;
}

export function ApsJourney({ children }: { children: ReactNode }) {
  return <TrainingJourney
    id="parcours-aps"
    continuationHref="#metier"
    name="APS"
    theme="blue"
    eyebrow="DEVENIR AGENT DE SÉCURITÉ · APS"
    title={<>De votre projet au métier d’APS,<br /><span>passez à l’action</span></>}
    steps={steps.map((step, index) => ({ ...step, visual: (onNext: () => void) => <JourneyVisual index={index} onNext={onNext} /> }))}
  >{children}</TrainingJourney>;
}
