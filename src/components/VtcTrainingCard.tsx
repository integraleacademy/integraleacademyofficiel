"use client";

import Link from 'next/link';
import { useRef } from 'react';
import styles from './VtcTrainingCard.module.css';
import { useTrainingCardAnimations } from './useTrainingCardAnimations';

type VtcTrainingCardProps = {
  title: string;
  description: string;
  duration: string;
  price: string;
  href: string;
};

function CarIcon() {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path d="m6.2 18 2.6-7.1A3 3 0 0 1 11.6 9h8.8a3 3 0 0 1 2.8 1.9l2.6 7.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.5 16.5h17c1.7 0 3 1.3 3 3V24H4.5v-4.5c0-1.7 1.3-3 3-3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M8 24v2.2M24 24v2.2M8.5 20.2h2.2m10.6 0h2.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>;
}

function BookIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 5.5h5.2A2.8 2.8 0 0 1 12 8.3v10.2a3.2 3.2 0 0 0-3-2H4V5.5Zm16 0h-5.2A2.8 2.8 0 0 0 12 8.3v10.2a3.2 3.2 0 0 1 3-2h5V5.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  </svg>;
}

function SteeringIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.7" />
    <path d="M3.9 10.2h16.2M10.5 13.5 8 19m5.5-5.5L16 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>;
}

function CheckIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="m8.2 12.2 2.5 2.5 5.5-5.7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

function ClockIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>;
}

function MedalIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="9" r="4.5" stroke="currentColor" strokeWidth="1.7" />
    <path d="m9 12.5-1.2 7 4.2-2.3 4.2 2.3-1.2-7" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  </svg>;
}

function TagIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4.5 5.5v6.2L12.8 20l7.2-7.2-8.3-8.3H5.5a1 1 0 0 0-1 1Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <circle cx="8.2" cy="8.2" r="1.2" fill="currentColor" />
  </svg>;
}

function PersonIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="7.5" r="3.2" stroke="currentColor" strokeWidth="1.7" />
    <path d="M5.5 20c.4-4 2.6-6 6.5-6s6.1 2 6.5 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>;
}

function RouteGraphic() {
  return <svg viewBox="0 0 320 250" fill="none" className={styles.routeGraphic} aria-hidden="true">
    <path d="M58 211c32-45 80-1 96-48 16-46-35-53-11-95 24-41 70-10 103-52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 7" />
    <path d="M58 211c32-45 80-1 96-48 16-46-35-53-11-95 24-41 70-10 103-52" stroke="url(#routeGradient)" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="58" cy="211" r="5" fill="#7c3aed" />
    <circle cx="154" cy="163" r="5" fill="#7c3aed" />
    <circle cx="143" cy="68" r="5" fill="#7c3aed" />
    <path d="M246 5a13 13 0 0 0-13 13c0 10 13 24 13 24s13-14 13-24a13 13 0 0 0-13-13Zm0 18a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z" fill="#7c3aed" />
    <defs><linearGradient id="routeGradient" x1="58" y1="211" x2="246" y2="5" gradientUnits="userSpaceOnUse"><stop stopColor="#7c3aed" stopOpacity=".05" /><stop offset="1" stopColor="#7c3aed" /></linearGradient></defs>
  </svg>;
}

export function VtcTrainingCard({ title, description, duration, price, href }: VtcTrainingCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useTrainingCardAnimations(containerRef);

  return (
    <div ref={containerRef} className={styles.wrapper}>
      <div className={styles.bentoGrid}>
        <div data-training-card className={styles.featuredSlot}>
          <Link href={href} aria-label={`Découvrir ${title}`} className={styles.featuredLink}>
            <article data-training-tilt className={styles.featuredCard}>
              <span className={styles.featuredGlow} aria-hidden="true" />
              <RouteGraphic />

              <header className={styles.featuredHeader}>
                <span className={styles.carIcon}><CarIcon /></span>
                <span className={styles.certificationBadge}>
                  <strong>Certification RS n°5637</strong>
                  <small>Agrément préfectoral VTC-26-001</small>
                </span>
              </header>

              <div className={styles.featuredContent}>
                <span className={styles.featuredEyebrow}>Parcours tout inclus</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>

              <div className={styles.featuredFacts} aria-label="Informations principales">
                <span><ClockIcon /> {duration}</span>
                <span><MedalIcon /> CPF selon éligibilité</span>
                <span><TagIcon /> {price}</span>
              </div>

              <footer className={styles.featuredFooter}>
                <span>Découvrir la formation</span><span aria-hidden="true">→</span>
              </footer>
            </article>
          </Link>
        </div>

        <div className={styles.stepsColumn}>
          <div data-training-card className={styles.theorySlot}>
            <article data-training-tilt className={`${styles.stepCard} ${styles.theoryCard}`}>
              <span className={styles.stepNumber}>01 <i aria-hidden="true" /> Théorie</span>
              <span className={`${styles.stepIcon} ${styles.theoryIcon}`}><BookIcon /></span>
              <h3>100 h en e-learning</h3>
              <p>Accès 24 h/24 et 7 j/7, livre officiel inclus.</p>
            </article>
          </div>

          <div className={styles.lowerSteps}>
            <div data-training-card>
              <article data-training-tilt className={`${styles.stepCard} ${styles.compactStep}`}>
                <span className={styles.stepNumber}>02 <i aria-hidden="true" /> Pratique</span>
                <span className={styles.stepIcon}><SteeringIcon /></span>
                <h3>5 h en présentiel</h3>
                <p>Nice · Cannes · Toulon · Fréjus</p>
              </article>
            </div>

            <div data-training-card>
              <article data-training-tilt className={`${styles.stepCard} ${styles.compactStep}`}>
                <span className={styles.stepNumber}>03 <i aria-hidden="true" /> Examen</span>
                <span className={styles.stepIcon}><CheckIcon /></span>
                <h3>Frais d’examen inclus</h3>
                <p>Véhicule, essence et péages inclus.</p>
              </article>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.supportStrip}>
        <span className={styles.supportIcon} aria-hidden="true"><PersonIcon /></span>
        <span className={styles.supportTitle}>Un projet VTC&nbsp;?</span>
        <span className={styles.supportCopy}>Notre équipe vous accompagne dans votre inscription et votre demande de financement.</span>
        <Link href="/contact?formation=vtc" className={styles.supportButton}>Être accompagné <span aria-hidden="true">→</span></Link>
      </div>
    </div>
  );
}
