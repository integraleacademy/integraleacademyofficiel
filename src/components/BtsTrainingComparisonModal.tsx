"use client";

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { BtsIcon, type BtsTrainingHighlight, type BtsVisual } from './BtsTrainingGrid';
import styles from './SecurityTrainingComparisonModal.module.css';

type BtsComparisonDetails = {
  badge?: string;
  idealFor: string;
  capabilities: string[];
  careers: string;
  rncp: string;
  cta: string;
};

const btsComparisonDetails: Record<BtsVisual, BtsComparisonDetails> = {
  mos: {
    badge: 'Le plus demandé',
    idealFor: 'Manager des équipes et des prestations dans la sécurité privée.',
    capabilities: [
      'Organiser une prestation de sécurité',
      'Coordonner et encadrer les équipes',
      'Gérer la relation avec les clients',
      'Suivre la qualité et la performance du service',
    ],
    careers: 'Chef d’équipe · coordinateur · assistant d’exploitation',
    rncp: 'RNCP 41000',
    cta: 'Découvrir le BTS MOS',
  },
  mco: {
    idealFor: 'Vendre, animer et piloter une unité commerciale.',
    capabilities: [
      'Conseiller, vendre et fidéliser les clients',
      'Animer une offre commerciale omnicanale',
      'Gérer les opérations et les résultats',
      'Recruter, organiser et manager une équipe',
    ],
    careers: 'Conseiller de vente · manager adjoint · responsable d’unité',
    rncp: 'RNCP 38362',
    cta: 'Découvrir le BTS MCO',
  },
  ndrc: {
    idealFor: 'Prospecter, négocier et développer une relation client omnicanale.',
    capabilities: [
      'Prospecter et développer un portefeuille',
      'Négocier, vendre et fidéliser',
      'Gérer la relation client à distance et en ligne',
      'Créer et animer des réseaux commerciaux',
    ],
    careers: 'Commercial · chargé de clientèle · animateur de réseau',
    rncp: 'RNCP 38368',
    cta: 'Découvrir le BTS NDRC',
  },
  ci: {
    idealFor: 'Travailler avec des clients, fournisseurs et partenaires internationaux.',
    capabilities: [
      'Développer une relation commerciale interculturelle',
      'Gérer des opérations import-export',
      'Coordonner les flux logistiques et administratifs',
      'Prospecter et communiquer en langues étrangères',
    ],
    careers: 'Assistant import-export · ADV export · agent de transit',
    rncp: 'RNCP 41759',
    cta: 'Découvrir le BTS CI',
  },
  pi: {
    idealFor: 'Accompagner des projets de vente, de location et de gestion immobilière.',
    capabilities: [
      'Prospecter, estimer et valoriser des biens',
      'Organiser les visites et négocier',
      'Gérer la location et la copropriété',
      'Sécuriser les dossiers juridiques et administratifs',
    ],
    careers: 'Négociateur · gestionnaire locatif · assistant copropriété',
    rncp: 'RNCP 38380',
    cta: 'Découvrir le BTS PI',
  },
  cg: {
    idealFor: 'Comprendre les chiffres et sécuriser la gestion d’une organisation.',
    capabilities: [
      'Enregistrer et contrôler les opérations comptables',
      'Préparer les obligations fiscales et sociales',
      'Analyser l’activité et la santé financière',
      'Contribuer aux budgets et aux décisions de gestion',
    ],
    careers: 'Assistant comptable · collaborateur cabinet · gestionnaire',
    rncp: 'RNCP 39159',
    cta: 'Découvrir le BTS CG',
  },
};

function BtsComparisonCard({ item }: { item: BtsTrainingHighlight }) {
  const details = btsComparisonDetails[item.visual];

  return (
    <article className={styles.courseCard} data-kind="bts" data-tone={item.visual} data-featured={item.featured || undefined}>
      <span className={styles.cardAccent} aria-hidden="true" />
      <header className={styles.cardHeader}>
        <span className={styles.courseIcon}><BtsIcon type={item.visual} /></span>
        {details.badge && <span className={styles.recommendedBadge}><i aria-hidden="true" /> {details.badge}</span>}
      </header>

      <span className={styles.category}>{item.category}</span>
      <h3>{item.shortTitle}</h3>
      <p className={styles.fullTitle}>{item.title}</p>

      <div className={styles.idealBox}>
        <small>Idéal pour</small>
        <p>{details.idealFor}</p>
      </div>

      <dl className={styles.facts}>
        <div><dt>Durée</dt><dd>{item.duration}</dd></div>
        <div><dt>Rythme</dt><dd>2 j / 3 j</dd></div>
        <div><dt>Formats</dt><dd>Puget + visio</dd></div>
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
        <div><small>Après le BTS</small><strong>{details.careers}</strong><p>Diplôme d’État · niveau 5 · {details.rncp}</p></div>
      </div>

      <div className={styles.cardBottom}>
        <div className={styles.financing}><span aria-hidden="true">●</span>iPad offert · Voyage à Londres pris en charge</div>
        <div className={styles.priceBlock}>
          <small>Frais de scolarité</small>
          <strong>0 €*</strong>
          <p>Pour l’apprenti · sous réserve du contrat et de sa prise en charge</p>
        </div>
        <Link href={item.slug} className={styles.courseButton}>{details.cta}<span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}

export function BtsTrainingComparisonModal({ items, className = '' }: { items: BtsTrainingHighlight[]; className?: string }) {
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
        Comparer les BTS
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
                <span className={styles.eyebrow}><i aria-hidden="true" /> Comparateur de BTS</span>
                <h2 id={titleId}>Comparez les BTS.<br /><em>Choisissez votre voie.</em></h2>
                <p id={descriptionId}>Métiers, compétences, débouchés, rythme et coût : les différences essentielles sont réunies au même endroit.</p>
              </div>
              <div className={styles.headerMeta}>
                <span><strong>{items.length}</strong> BTS comparés</span>
                <button ref={closeButtonRef} type="button" onClick={() => setOpen(false)} className={styles.closeButton} aria-label="Fermer le comparateur de BTS">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </header>

            <div className={styles.mobileHint}><span aria-hidden="true">↔</span> Faites glisser pour comparer les BTS</div>

            <div className={styles.scrollRegion}>
              <div className={styles.comparisonGrid} data-columns="6">
                {items.map((item) => <BtsComparisonCard key={item.slug} item={item} />)}
              </div>
            </div>

            <footer className={styles.dialogFooter}>
              <span className={styles.footerMark} aria-hidden="true">?</span>
              <p><strong>Vous hésitez entre plusieurs BTS&nbsp;?</strong> Notre assistant vous aide à identifier le parcours le plus adapté.</p>
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
