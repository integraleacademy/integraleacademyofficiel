"use client";

import Link from 'next/link';
import { useRef } from 'react';
import styles from './SecurityTrainingGrid.module.css';
import { useTrainingCardAnimations } from './useTrainingCardAnimations';

type TrainingVisual = 'aps' | 'ssiap' | 'sst' | 'a3p' | 'desp';

export type SecurityTrainingHighlight = {
  slug: string;
  shortTitle: string;
  title: string;
  description: string;
  duration: string;
  modality: string;
  location: string;
  financing: string;
  nextSession: string;
  visual: TrainingVisual;
  featured?: boolean;
};

const labels: Record<TrainingVisual, string> = {
  aps: 'Surveillance humaine',
  ssiap: 'Sécurité incendie',
  sst: 'Secourisme',
  a3p: 'Protection rapprochée',
  desp: 'Direction',
};

function TrainingIcon({ type }: { type: TrainingVisual }) {
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

function FactIcon({ type }: { type: 'duration' | 'modality' | 'location' | 'funding' | 'calendar' }) {
  if (type === 'duration') return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" /><path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
  if (type === 'modality') return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5" width="17" height="11.5" rx="1.8" stroke="currentColor" strokeWidth="1.8" /><path d="M8.5 20h7M12 16.5V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
  if (type === 'location') return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s6.5-5.8 6.5-11.5a6.5 6.5 0 1 0-13 0C5.5 15.2 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.8" /></svg>;
  if (type === 'calendar') return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="5.5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="M8 3.5v4M16 3.5v4M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 8.2h15M7 4.5h10c1.4 0 2.5 1.1 2.5 2.5v10c0 1.4-1.1 2.5-2.5 2.5H7A2.5 2.5 0 0 1 4.5 17V7C4.5 5.6 5.6 4.5 7 4.5Z" stroke="currentColor" strokeWidth="1.8" /><path d="M15.5 14.5h4M15.5 11.5h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
}

function FeaturedCard({ item }: { item: SecurityTrainingHighlight }) {
  return (
    <div data-training-card className={styles.featuredSlot}>
      <Link href={item.slug} aria-label={`Découvrir la formation ${item.shortTitle}`} className={styles.featuredLink}>
        <article data-training-tilt data-tone={item.visual} className={styles.featuredCard}>
          <span className={styles.featuredOrb} aria-hidden="true" />

          <header className={styles.featuredHeader}>
            <span className={styles.popularBadge}><span aria-hidden="true">✦</span> La plus demandée</span>
            <span className={styles.featuredIcon}><TrainingIcon type={item.visual} /></span>
          </header>

          <div className={styles.featuredContent}>
            <span className={styles.category}>{labels[item.visual]}</span>
            <h3><strong>{item.shortTitle}</strong><span>{item.title}</span></h3>
            <p>{item.description}</p>
          </div>

          <div className={styles.featuredFacts}>
            <span><FactIcon type="duration" /><span><small>Durée</small><strong>{item.duration}</strong></span></span>
            <span><FactIcon type="modality" /><span><small>Modalité</small><strong>{item.modality}</strong></span></span>
            <span><FactIcon type="location" /><span><small>Lieu</small><strong>{item.location}</strong></span></span>
          </div>

          <div className={styles.featuredSession}>
            <FactIcon type="calendar" />
            <span><small>Prochaine session</small><strong>{item.nextSession}</strong></span>
            <span className={styles.sessionStatus}><i aria-hidden="true" /> Inscriptions ouvertes</span>
          </div>

          <footer className={styles.featuredFooter}>
            <span className={styles.financing}><FactIcon type="funding" /> {item.financing}</span>
            <span className={styles.featuredCta}>Voir la formation <span aria-hidden="true">→</span></span>
          </footer>
        </article>
      </Link>
    </div>
  );
}

function CompactCard({ item }: { item: SecurityTrainingHighlight }) {
  return (
    <div data-training-card className={styles.compactSlot}>
      <Link href={item.slug} aria-label={`Découvrir la formation ${item.shortTitle}`} className={styles.compactLink}>
        <article data-training-tilt data-tone={item.visual} className={styles.compactCard}>
          <span className={styles.compactAccent} aria-hidden="true" />
          <header className={styles.compactHeader}>
            <span className={styles.compactIcon}><TrainingIcon type={item.visual} /></span>
            <span className={styles.durationBadge}>{item.duration}</span>
          </header>

          <div className={styles.compactContent}>
            <span className={styles.compactCategory}>{labels[item.visual]}</span>
            <h3>{item.shortTitle}</h3>
            <p>{item.title}</p>
          </div>

          <div className={styles.compactFacts}>
            <span><FactIcon type="modality" /> {item.modality}</span>
            <span><FactIcon type="location" /> {item.location}</span>
          </div>

          <footer className={styles.compactFooter}>
            <span><small>Prochaine session</small><strong>{item.nextSession}</strong></span>
            <span className={styles.compactArrow} aria-hidden="true">→</span>
          </footer>
        </article>
      </Link>
    </div>
  );
}

export function SecurityTrainingGrid({ items }: { items: SecurityTrainingHighlight[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  useTrainingCardAnimations(gridRef);

  const featured = items.find((item) => item.featured) ?? items[0];
  const compactItems = items.filter((item) => item !== featured);

  if (!featured) return null;

  return (
    <div ref={gridRef} className={styles.wrapper}>
      <div className={styles.bentoGrid}>
        <FeaturedCard item={featured} />
        <div className={styles.compactGrid}>
          {compactItems.map((item) => <CompactCard key={item.slug} item={item} />)}
        </div>
      </div>

      <div className={styles.orientationStrip}>
        <span className={styles.orientationIcon} aria-hidden="true">?</span>
        <span className={styles.orientationCopy}><strong>Vous hésitez entre plusieurs formations&nbsp;?</strong><small>Notre assistant vous aide à choisir en moins de deux minutes.</small></span>
        <Link href="#assistant-orientation" className={styles.orientationButton}>Être orienté <span aria-hidden="true">→</span></Link>
      </div>
    </div>
  );
}
