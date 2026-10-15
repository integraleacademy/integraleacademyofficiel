"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { vtcArtwork } from '@/data/manualIllustrations';
import styles from './VtcTrainingCard.module.css';
import { useTrainingCardAnimations } from './useTrainingCardAnimations';

type VtcTrainingCardProps = {
  title: string;
  description: string;
  duration: string;
  price: string;
  href: string;
};

const steps = [
  {
    label: 'La théorie',
    title: '100 h en e-learning',
    description: 'Des cours accessibles 24 h/24, 7 j/7, avec le livre officiel inclus.',
    illustration: vtcArtwork.apprentissage,
  },
  {
    label: 'La pratique',
    title: '5 h au volant',
    description: 'En présentiel à Nice, Cannes, Toulon ou Fréjus.',
    illustration: vtcArtwork.conduite,
  },
  {
    label: 'L’examen',
    title: 'Les frais sont inclus',
    description: 'Véhicule, carburant et péages également compris.',
    illustration: vtcArtwork.pratique,
  },
];

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

function CheckIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="m8 12 2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

export function VtcTrainingCard({ title, description, duration, price, href }: VtcTrainingCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useTrainingCardAnimations(containerRef);

  return (
    <div ref={containerRef} className={styles.wrapper}>
      <article data-training-card className={styles.featured}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}><span aria-hidden="true" />{title}</span>
          <h2 id="formation-vtc-title">Prenez le volant de <em>votre avenir.</em></h2>
          <p className={styles.description}>{description}</p>
          <div className={styles.actions}>
            <Link href={href} className={styles.primaryButton}>Découvrir la formation <ArrowIcon /></Link>
            <Link href="/contact?formation=vtc" className={styles.contactLink}>Parlons de votre projet <ArrowIcon /></Link>
          </div>
        </div>

        <div className={styles.visual}>
          <Image src={vtcArtwork.accueil.src} alt={vtcArtwork.accueil.alt} width={1200} height={800}
            sizes="(max-width: 760px) 92vw, (max-width: 1100px) 46vw, 560px" />
        </div>

        <dl className={styles.facts}>
          <div className={styles.price}>
            <dt>Votre formule</dt>
            <dd>{price}</dd>
          </div>
          <div>
            <dt>Durée du parcours</dt>
            <dd>{duration}</dd>
          </div>
          <div className={styles.funding}>
            <dt>Financement possible</dt>
            <dd>CPF <span>selon éligibilité</span></dd>
          </div>
        </dl>
      </article>

      <div className={styles.journeyHeading}>
        <h3>Un parcours complet, en 3 étapes.</h3>
        <span aria-hidden="true" />
      </div>
      <ol className={styles.steps} aria-label="Les étapes de la formation VTC">
        {steps.map((step, index) => (
          <li key={step.label} data-training-card className={styles.step}>
            <div className={styles.stepHeading}>
              <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
              <span>{step.label}</span>
              {index < steps.length - 1 ? <ArrowIcon /> : <CheckIcon />}
            </div>
            <div className={styles.stepBody}>
              <div className={styles.stepVisual}>
                <Image src={step.illustration.src} alt={step.illustration.alt} width={1200} height={800}
                  sizes="(max-width: 520px) 90px, (max-width: 1000px) 150px, 104px" />
              </div>
              <div className={styles.stepCopy}>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <p className={styles.accreditation}><CheckIcon /><span>Certification RS n°5637 <span aria-hidden="true">·</span> Agrément préfectoral VTC-26-001</span></p>
    </div>
  );
}
