"use client";

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { SecurityTrainingHighlight, TrainingVisual } from './SecurityTrainingGrid';
import styles from './SecurityTrainingComparisonModal.module.css';

type ComparisonDetails = {
  category: string;
  badge?: string;
  idealFor: string;
  capabilities: string[];
  certification: string;
  certificationNote: string;
  price: string;
  priceNote: string;
  cta: string;
};

const comparisonDetails: Record<TrainingVisual, ComparisonDetails> = {
  aps: {
    category: 'Surveillance humaine',
    badge: 'La plus demandée',
    idealFor: 'Accéder aux métiers de la surveillance et du gardiennage.',
    capabilities: [
      'Surveiller un site et contrôler les accès',
      'Effectuer des rondes et signaler les anomalies',
      'Prévenir et gérer les incidents',
      'Porter les premiers secours grâce au SST inclus',
    ],
    certification: 'TFP APS · niveau 3',
    certificationNote: 'Puis demande de carte professionnelle au CNAPS',
    price: '1 650 €',
    priceNote: 'Formation complète · SST inclus',
    cta: 'Découvrir l’APS',
  },
  ssiap: {
    category: 'Sécurité incendie',
    idealFor: 'Travailler en sécurité incendie ou évoluer vers l’encadrement.',
    capabilities: [
      'SSIAP 1 · Prévenir et intervenir face au risque incendie',
      'SSIAP 2 · Encadrer une équipe et piloter le poste de sécurité',
      'SSIAP 3 · Diriger le service et conseiller l’établissement',
      'Maintenir son diplôme par recyclage ou remise à niveau',
    ],
    certification: 'Diplôme SSIAP 1, 2 ou 3',
    certificationNote: 'Ou attestation réglementaire de maintien des acquis',
    price: 'Dès 980 €',
    priceNote: 'SSIAP 1 · autres parcours sur devis',
    cta: 'Voir les parcours SSIAP',
  },
  sst: {
    category: 'Secourisme',
    idealFor: 'Devenir acteur du secours et de la prévention en entreprise.',
    capabilities: [
      'Protéger une zone et examiner une victime',
      'Alerter efficacement les secours',
      'Réaliser les gestes de premiers secours',
      'Contribuer à la prévention des risques professionnels',
    ],
    certification: 'Certificat SST',
    certificationNote: 'Certification de Sauveteur secouriste du travail',
    price: 'Sur devis',
    priceNote: 'Selon le format individuel ou équipe',
    cta: 'Découvrir le SST',
  },
  a3p: {
    category: 'Protection rapprochée',
    idealFor: 'Protéger des personnes exposées et sécuriser leurs déplacements.',
    capabilities: [
      'Analyser les risques et préparer une mission',
      'Organiser et sécuriser les déplacements',
      'Protéger et évacuer une personne menacée',
      'Réagir aux conflits, urgences et situations dégradées',
    ],
    certification: 'TFP A3P',
    certificationNote: 'Agent de protection physique des personnes',
    price: '4 200 €',
    priceNote: 'Formation complète de 327 heures',
    cta: 'Découvrir l’A3P',
  },
  desp: {
    category: 'Direction',
    idealFor: 'Créer, reprendre ou piloter une entreprise de sécurité privée.',
    capabilities: [
      'Construire le projet et le modèle économique',
      'Maîtriser le cadre réglementaire et les démarches CNAPS',
      'Gérer les contrats, le budget et la conformité',
      'Recruter, manager et développer l’activité commerciale',
    ],
    certification: 'Titre DESP',
    certificationNote: 'Puis demande d’agrément dirigeant au CNAPS',
    price: '3 800 à 4 300 €',
    priceNote: 'Selon VAE ou parcours initial',
    cta: 'Découvrir le DESP',
  },
};

function CourseGlyph({ type }: { type: TrainingVisual }) {
  if (type === 'ssiap') {
    return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13.8 3.2c.4 3-1.7 4.1-1.7 6.5 0 1.1.7 2 1.8 2.4-.1-1.3.4-2.6 1.5-3.6 2.2 1.8 3.6 4.1 3.6 6.6A7 7 0 1 1 6.7 10.5c.4 2.1 1.5 3.1 2.8 3.5-.5-3.9 1.4-7.7 4.3-10.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }
  if (type === 'sst') {
    return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9.2 4.5h5.6v4.7h4.7v5.6h-4.7v4.7H9.2v-4.7H4.5V9.2h4.7V4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>;
  }
  if (type === 'a3p') {
    return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3.5 19 6v5.2c0 4.5-2.8 7.8-7 9.3-4.2-1.5-7-4.8-7-9.3V6l7-2.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="12" cy="9.2" r="2" stroke="currentColor" strokeWidth="1.6" /><path d="M8.8 15.1c.7-1.4 1.8-2.1 3.2-2.1s2.5.7 3.2 2.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>;
  }
  if (type === 'desp') {
    return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 7V5.8C8 4.8 8.8 4 9.8 4h4.4c1 0 1.8.8 1.8 1.8V7M4 11.5h16M4.5 7h15c.8 0 1.5.7 1.5 1.5v9.8c0 .9-.7 1.7-1.7 1.7H4.7c-.9 0-1.7-.7-1.7-1.7V8.5C3 7.7 3.7 7 4.5 7Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 11.5v1.4h4v-1.4" stroke="currentColor" strokeWidth="1.8" /></svg>;
  }
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3.5 19 6v5.2c0 4.5-2.8 7.8-7 9.3-4.2-1.5-7-4.8-7-9.3V6l7-2.5Z" stroke="currentColor" strokeWidth="1.8" /><path d="m8.8 11.8 2.1 2.1 4.5-4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
}

function ComparisonCard({ item }: { item: SecurityTrainingHighlight }) {
  const details = comparisonDetails[item.visual];

  return (
    <article className={styles.courseCard} data-tone={item.visual} data-featured={item.featured || undefined}>
      <span className={styles.cardAccent} aria-hidden="true" />
      <header className={styles.cardHeader}>
        <span className={styles.courseIcon}><CourseGlyph type={item.visual} /></span>
        {details.badge && <span className={styles.recommendedBadge}><i aria-hidden="true" /> {details.badge}</span>}
      </header>

      <span className={styles.category}>{details.category}</span>
      <h3>{item.shortTitle}</h3>
      <p className={styles.fullTitle}>{item.title}</p>

      <div className={styles.idealBox}>
        <small>Idéal pour</small>
        <p>{details.idealFor}</p>
      </div>

      <dl className={styles.facts}>
        <div><dt>Durée</dt><dd>{item.duration}</dd></div>
        <div><dt>Format</dt><dd>{item.modality}</dd></div>
        <div><dt>Lieu</dt><dd>{item.location}</dd></div>
      </dl>

      <section className={styles.capabilities}>
        <h4>Ce que cela permet de faire</h4>
        <ul>
          {details.capabilities.map((capability) => (
            <li key={capability}><span aria-hidden="true">✓</span>{capability}</li>
          ))}
        </ul>
      </section>

      <div className={styles.certification}>
        <span className={styles.certificationIcon} aria-hidden="true">↗</span>
        <div><small>À l’issue du parcours</small><strong>{details.certification}</strong><p>{details.certificationNote}</p></div>
      </div>

      <div className={styles.cardBottom}>
        {item.financing ? <div className={styles.financing}><span aria-hidden="true">●</span>{item.financing}</div> : null}
        <div className={styles.priceBlock}>
          <small>Tarif</small>
          <strong>{details.price}</strong>
          <p>{details.priceNote}</p>
        </div>
        <Link href={item.slug} className={styles.courseButton}>{details.cta}<span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}

export function SecurityTrainingComparisonModal({ items, className = '' }: { items: SecurityTrainingHighlight[]; className?: string }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const descriptionId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open]);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)} aria-haspopup="dialog">
        Comparer les formations
      </button>

      {open && typeof document !== 'undefined' && createPortal(
        <div className={styles.overlay} onMouseDown={() => setOpen(false)}>
          <section
            ref={dialogRef}
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className={styles.dialogHeader}>
              <div className={styles.headingCopy}>
                <span className={styles.eyebrow}><i aria-hidden="true" /> Comparateur de formations</span>
                <h2 id={titleId}>Comparez les parcours.<br /><em>Choisissez votre métier.</em></h2>
                <p id={descriptionId}>Durée, format, compétences, certification et tarif : les différences essentielles sont réunies au même endroit.</p>
              </div>
              <div className={styles.headerMeta}>
                <span><strong>{items.length}</strong> parcours comparés</span>
                <button ref={closeButtonRef} type="button" onClick={() => setOpen(false)} className={styles.closeButton} aria-label="Fermer le comparateur">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </header>

            <div className={styles.mobileHint}><span aria-hidden="true">↔</span> Faites glisser pour comparer les formations</div>

            <div className={styles.scrollRegion}>
              <div className={styles.comparisonGrid}>
                {items.map((item) => <ComparisonCard key={item.slug} item={item} />)}
              </div>
            </div>

            <footer className={styles.dialogFooter}>
              <span className={styles.footerMark} aria-hidden="true">?</span>
              <p><strong>Vous hésitez encore&nbsp;?</strong> Notre assistant vous oriente selon votre projet, votre expérience et vos contraintes.</p>
              <Link href="#assistant-orientation" onClick={() => setOpen(false)} className={styles.orientationLink}>
                Être orienté en 2 minutes <span aria-hidden="true">→</span>
              </Link>
            </footer>
          </section>
        </div>,
        document.body,
      )}
    </>
  );
}
