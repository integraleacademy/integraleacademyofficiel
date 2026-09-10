'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { TrainingJourney } from './TrainingJourney';
import styles from './ApsJourney.module.css';

const steps = [
  {
    label: 'Votre projet',
    title: 'Un nouveau départ. Un métier qui compte.',
    description: 'Vous souhaitez vous reconvertir ou découvrir la sécurité privée ? Apprenez à observer, prévenir les risques et protéger les personnes. Notre équipe vous accompagne pour préparer votre entrée en formation.',
    link: 'Parlons de ma formation', href: '#inscription-financement',
  },
  {
    label: 'Votre formation',
    title: 'Les bases pour comprendre. La pratique pour agir.',
    description: '175 heures de formation : 51 heures à distance et 124 heures à l’école, à Puget-sur-Argens. Vous avancez avec un programme structuré et préparez aussi le certificat Sauveteur Secouriste du Travail.',
    link: 'Découvrir l’organisation', href: '#hybride',
  },
  {
    label: 'L’immersion terrain',
    title: 'Entraînez-vous aux situations de votre futur quotidien.',
    description: 'Rondes, contrôle d’accès, palpation, inspection des bagages, gestion des incidents : vous répétez les gestes professionnels lors d’exercices encadrés. Le PC sécurité et le matériel pédagogique font partie de votre apprentissage.',
    link: 'Explorer la pratique', href: '#pratique',
  },
  {
    label: 'Votre prochain chapitre',
    title: 'Préparez le titre APS. Avancez vers votre futur métier.',
    description: 'La réussite à l’examen permet d’obtenir le TFP APS. Vous pouvez ensuite demander votre carte professionnelle auprès du CNAPS. Notre équipe vous aide à préparer votre parcours, votre dossier et votre financement.',
    link: 'Préparer mon inscription', href: '#inscription-financement',
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
    {/* Existing training image; it remains editable in the APS image folder. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img className={styles.coverPhoto} src="/images/aps/aps-hero-round.jpg" alt="Exercice pratique de ronde de sécurité pendant la formation APS" width="1536" height="1024" loading="lazy" decoding="async" />
    <div className={styles.coverOrbit} aria-hidden="true"><Icon kind="rise" /></div>
    <CardHeader label="Le déclic" />
    <div className={styles.ambitionBody}>
      <p className={styles.eyebrow}>ET SI C’ÉTAIT VOTRE TOUR ?</p>
      <p className={styles.ambitionTitle}>Un métier de terrain.<br /><span>Un rôle essentiel.</span></p>
      <p className={styles.subtitle}>Prévenir. Protéger. Rassurer.<br />Votre vigilance peut faire la différence.</p>
    </div>
    <div className={styles.verbs}><span><small>01</small>Observer</span><span><small>02</small>Alerter</span><span><small>03</small>Agir</span></div>
    <CardNextAction onNext={onNext} label={steps[1].label} />
  </div>;

  if (index === 1) return <div className={`${styles.card} ${styles.trainingCard}`}>
    <CardHeader label="Votre formation" />
    <div className={styles.durationHeadline}><strong>5</strong><div><span className={styles.eyebrow}>SEMAINES · 175 HEURES</span><p>Un nouveau<br /><span>cap à prendre.</span></p></div></div>
    <div className={styles.studyPlan}>
      <div className={styles.remoteStudy}><div className={styles.studyTop}><span>À DISTANCE</span><Icon kind="screen" /></div><p><strong>51</strong><span>heures<small>pour les bases</small></span></p><div className={styles.studyBar} aria-hidden="true"><i /></div></div>
      <div className={styles.schoolStudy}><div className={styles.studyTop}><span>À L’ÉCOLE</span><Icon kind="school" /></div><p><strong>124</strong><span>heures<small>pour progresser</small></span></p><div className={styles.studyBar} aria-hidden="true"><i /></div></div>
    </div>
    <div className={styles.learningSkills}><p className={styles.eyebrow}>LES FONDAMENTAUX DU MÉTIER</p><div>{['Cadre professionnel', 'Prévention des risques', 'Gestion des conflits', 'Secourisme · SST inclus'].map((label, i) => <span key={label}><small>0{i + 1}</small>{label}</span>)}</div></div>
    <CardNextAction onNext={onNext} label={steps[2].label} />
  </div>;

  if (index === 2) return <div className={`${styles.card} ${styles.practiceCard}`}>
    <CardHeader label="Immersion terrain" />
    <p className={styles.practiceTitle}>Les bons gestes.<br /><span>Les bons réflexes.</span></p>
    <figure className={styles.practicePhoto}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/aps/aps-training-bag-inspection.jpg" alt="Mise en situation pédagogique autour du contrôle des bagages" width="1536" height="1024" loading="lazy" decoding="async" />
      <figcaption><strong>63,5 h</strong><span>de pratique dans le parcours</span></figcaption>
    </figure>
    <div className={styles.practiceSkills}><span>Rondes de sécurité</span><span>Contrôle d’accès</span><span>Gestion d’incidents</span></div>
    <p className={styles.practiceNote}>Des exercices expliqués, répétés et débriefés.</p>
    <CardNextAction onNext={onNext} label={steps[3].label} />
  </div>;

  return <div className={`${styles.card} ${styles.futureCard}`}>
    <div className={styles.futureOrbit} aria-hidden="true" />
    <CardHeader label="Votre prochain chapitre" />
    <p className={styles.futureHeading}>Votre formation.<br /><span>Un nouvel horizon.</span></p>
    <div className={styles.destination}><strong>APS<span><Icon kind="rise" /></span></strong><p>Agent de prévention<br />et de sécurité.</p></div>
    <div className={styles.futureSteps}>
      <Link href="#examen"><span>01 · LE TITRE<Icon kind="rise" /></span><strong>Le TFP APS.</strong><small>Réussir votre examen</small></Link>
      <Link href="#debouches"><span>02 · LA CARTE<Icon kind="rise" /></span><strong>Le CNAPS.</strong><small>Demander votre carte professionnelle</small></Link>
    </div>
    <p className={styles.validationNote}>Le titre obtenu, la demande de carte est une démarche distincte.</p>
    <CardAction href="#inscription-financement">Préparer mon inscription</CardAction>
  </div>;
}

export function ApsJourney() {
  return <TrainingJourney
    id="parcours-aps"
    name="APS"
    theme="blue"
    eyebrow="DEVENIR AGENT DE SÉCURITÉ · APS"
    title={<>De votre projet au métier d’APS,<br /><span>passez à l’action.</span></>}
    steps={steps.map((step, index) => ({ ...step, visual: (onNext: () => void) => <JourneyVisual index={index} onNext={onNext} /> }))}
  />;
}
