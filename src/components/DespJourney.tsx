'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { TrainingJourney } from './TrainingJourney';
import styles from './DespJourney.module.css';

const steps = [
  { label: 'Votre projet', title: 'Créer, reprendre, diriger : commencez par votre ambition.', description: 'Vous souhaitez prendre la tête d’une entreprise de sécurité privée ? Votre expérience et vos objectifs sont le point de départ pour choisir entre formation initiale et VAE.', link: 'Parlons de votre projet', href: '/contact?formation=desp' },
  { label: 'La formation initiale', title: 'Apprenez le métier de dirigeant, étape par étape.', description: 'Un parcours de 7 semaines : 5 à distance, puis 2 en présentiel. Réglementation, gestion, management et développement commercial : vous construisez les compétences pour piloter votre activité.', link: 'Découvrir le DESP initial', href: '/dirigeant' },
  { label: 'La VAE', title: 'Vous avez l’expérience. Faites reconnaître vos compétences.', description: 'Vous exercez déjà des responsabilités de gestion, de management ou de direction ? Après étude de votre parcours, vous constituez votre dossier de preuves et préparez votre présentation devant le jury.', link: 'Découvrir le DESP en VAE', href: '/vaedirigeant' },
  { label: 'Votre prochain chapitre', title: 'Deux parcours. Un même titre. À vous de choisir votre chemin.', description: 'Apprendre avec la formation initiale ou faire reconnaître vos acquis avec la VAE : notre équipe vous aide à choisir le parcours adapté et à préparer votre inscription et votre financement.', link: 'Comparer les deux parcours', href: '#choisir-desp' },
] as const;

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function CardHeader({ label }: { label: string }) {
  return <div className={styles.cardHeader}><span className={styles.brand}>INTÉGRALE<span>ACADEMY</span></span><span className={styles.cardLabel}>{label}</span></div>;
}

function Pictogram({ kind }: { kind: 'screen' | 'school' | 'rise' }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === 'screen' ? <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 21h8m-4-5v5" /></> : kind === 'school' ? <><path d="m3 9 9-6 9 6M5 10v10h14V10M10 20v-6h4v6M2 21h20" /><path d="M8 10h.01M16 10h.01" /></> : <><path d="M5 19 19 5M5 5h14v14" /></>}
  </svg>;
}

function CardAction({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className={styles.cardAction}><span>{children}</span><span className={styles.actionArrow}><Arrow /></span></Link>;
}

function CardNextAction({ onNext, label }: { onNext: () => void; label: string }) {
  return <button type="button" onClick={onNext} className={`${styles.cardAction} ${styles.cardNextAction}`} aria-label={`Étape suivante : ${label}`}><span className={styles.actionArrow}><Arrow /></span></button>;
}

function JourneyVisual({ index, onNext }: { index: number; onNext: () => void }) {
  if (index === 0) return (
    <div className={`${styles.card} ${styles.ambitionCard}`}>
      {/* Existing school photo remains editable at the same path in GitHub. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.ambitionPhoto} src="/images/desp-initial-hero.jpg" alt="L’accueil de l’école Intégrale Academy" loading="lazy" decoding="async" width="1600" height="1200" />
      <div className={styles.ambitionOrbit} aria-hidden="true" />
      <CardHeader label="Le déclic" />
      <div className={styles.ambitionBody}>
        <p className={styles.cardEyebrow}>ET SI C’ÉTAIT VOUS ?</p>
        <p className={styles.ambitionTitle}>Faites place<br />à votre <span>ambition.</span></p>
        <p className={styles.ambitionSubtitle}>Votre entreprise de sécurité.<br />Votre vision. Votre prochain chapitre.</p>
        <span className={styles.openingArrow} aria-hidden="true"><Pictogram kind="rise" /></span>
      </div>
      <div className={styles.ambitionVerbs}><span><small>01</small>Créer</span><span><small>02</small>Reprendre</span><span><small>03</small>Diriger</span></div>
      <CardNextAction onNext={onNext} label={steps[1].label} />
    </div>
  );

  if (index === 1) return (
    <div className={`${styles.card} ${styles.trainingCard}`}>
      <CardHeader label="Formation initiale" />
      <div className={styles.durationHeadline}>
        <strong>7</strong><div><span className={styles.cardEyebrow}>SEMAINES · 245 HEURES</span><p>Un nouveau<br /><span>cap à prendre.</span></p></div>
      </div>
      <div className={styles.studyPlan}>
        <div className={styles.remoteStudy}><div className={styles.studyTop}><span>À DISTANCE</span><Pictogram kind="screen" /></div><p><strong>5</strong><span>semaines<small>175 heures</small></span></p><div className={styles.weekMarks} aria-hidden="true"><i /><i /><i /><i /><i /></div></div>
        <div className={styles.schoolStudy}><div className={styles.studyTop}><span>EN PRÉSENTIEL</span><Pictogram kind="school" /></div><p><strong>2</strong><span>semaines<small>70 heures</small></span></p><div className={styles.weekMarks} aria-hidden="true"><i /><i /></div></div>
      </div>
      <div className={styles.expertise}>
        <p className={styles.cardEyebrow}>POUR PILOTER VOTRE ACTIVITÉ</p>
        <div>{['Réglementation', 'Gestion d’entreprise', 'Management', 'Développement commercial'].map((topic, i) => <span key={topic}><small>0{i + 1}</small>{topic}</span>)}</div>
      </div>
      <CardNextAction onNext={onNext} label={steps[2].label} />
    </div>
  );

  if (index === 2) return (
    <div className={`${styles.card} ${styles.experienceCard}`}>
      <CardHeader label="Le parcours VAE" />
      <div className={styles.experienceHeading}><p className={styles.cardEyebrow}>VOUS AVEZ DÉJÀ LE VÉCU.</p><p className={styles.cardTitle}>L’expérience,<br /><span>c’est votre force.</span></p></div>
      <div className={styles.proofScene}>
        <div className={styles.proofBack} aria-hidden="true" />
        <div className={styles.proofPaper}>
          <div className={styles.paperHeading}><span>DOSSIER DE VALIDATION</span><span>DESP</span></div>
          <strong>Votre parcours<br />a de la valeur.</strong>
          <p>Vos missions. Vos réalisations.</p>
        </div>
        <div className={styles.experienceSeal} aria-hidden="true"><Pictogram kind="rise" /></div>
      </div>
      <ol className={styles.vaeRoute}>
        <li><span>01</span><strong>Votre expérience</strong></li>
        <li><span>02</span><strong>Votre dossier</strong></li>
        <li><span>03</span><strong>Le jury</strong></li>
      </ol>
      <CardNextAction onNext={onNext} label={steps[3].label} />
    </div>
  );

  return (
    <div className={`${styles.card} ${styles.futureCard}`}>
      <div className={styles.futureOrbit} aria-hidden="true" />
      <CardHeader label="Votre prochain chapitre" />
      <p className={styles.futureHeading}>Deux chemins.<br /><span>Une nouvelle dimension.</span></p>
      <div className={styles.despDestination}><strong>DESP<span aria-hidden="true"><Pictogram kind="rise" /></span></strong><p>Dirigeant d’entreprise<br />de sécurité privée.</p></div>
      <div className={styles.futurePaths}>
        <Link href="/dirigeant"><span>FORMATION INITIALE<Pictogram kind="rise" /></span><strong>J’apprends.</strong><small>Acquérir les compétences</small></Link>
        <Link href="/vaedirigeant"><span>VAE<Pictogram kind="rise" /></span><strong>Je valorise.</strong><small>Faire reconnaître mes acquis</small></Link>
      </div>
      <p className={styles.validationNote}>Un même titre, après validation.</p>
      <CardAction href="#choisir-desp">Trouver mon parcours</CardAction>
    </div>
  );
}

export function DespJourney() {
  return <TrainingJourney
    id="parcours-desp"
    name="DESP"
    eyebrow="DEVENIR DIRIGEANT · DESP"
    title={<>De votre ambition au titre DESP,<br /><span>trouvez votre chemin.</span></>}
    steps={steps.map((step, index) => ({ ...step, visual: (onNext: () => void) => <JourneyVisual index={index} onNext={onNext} /> }))}
    continuationHref="#choisir-desp"
  />;
}
