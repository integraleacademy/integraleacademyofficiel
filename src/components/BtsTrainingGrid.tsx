"use client";

import Link from 'next/link';
import { useRef } from 'react';
import styles from './BtsTrainingGrid.module.css';
import { useTrainingCardAnimations } from './useTrainingCardAnimations';

export type BtsVisual = 'mos' | 'mco' | 'ndrc' | 'ci' | 'pi' | 'cg';

export type BtsTrainingHighlight = {
  slug: string;
  shortTitle: string;
  title: string;
  category: string;
  description: string;
  certification: string;
  level: string;
  duration: string;
  rhythm: string;
  onsiteLocation: string;
  distanceMode: string;
  visual: BtsVisual;
  featured?: boolean;
};

export function BtsIcon({ type }: { type: BtsVisual }) {
  if (type === 'mos') {
    return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3.5 19 6v5.2c0 4.5-2.8 7.8-7 9.3-4.2-1.5-7-4.8-7-9.3V6l7-2.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M8.2 14.7c.8-1.5 2.1-2.3 3.8-2.3s3 .8 3.8 2.3M12 9.8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>;
  }

  if (type === 'mco') {
    return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10h16l-1.4-5H5.4L4 10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M5.5 10v9h13v-9M9 19v-5h6v5M7.2 10c0 1.2-.7 2-1.6 2S4 11.2 4 10m6.4 0c0 1.2-.7 2-1.6 2s-1.6-.8-1.6-2m6.4 0c0 1.2-.7 2-1.6 2s-1.6-.8-1.6-2m6.4 0c0 1.2-.7 2-1.6 2s-1.6-.8-1.6-2m6.4 0c0 1.2-.7 2-1.6 2s-1.6-.8-1.6-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  }

  if (type === 'ndrc') {
    return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5.5h10.5v8H9l-3.5 3v-3H4v-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M14.5 9.5H20v8h-1.5v2l-3-2H11v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 9.5h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>;
  }

  if (type === 'ci') {
    return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8"/><path d="M3.8 12h16.4M12 3.5c2.1 2.3 3.2 5.1 3.2 8.5S14.1 18.2 12 20.5C9.9 18.2 8.8 15.4 8.8 12S9.9 5.8 12 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>;
  }

  if (type === 'pi') {
    return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m3.5 11 8.5-7 8.5 7M5.5 9.5v10h13v-10M9 19.5v-6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M16.5 6V4.5h2V8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>;
  }

  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="3.5" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 7h8v3H8V7ZM8 13h1m3 0h1m3 0h.1M8 16.5h1m3 0h1m3 0h.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function StudyModeIcon({ type }: { type: 'location' | 'video' }) {
  if (type === 'location') return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s6.5-5.8 6.5-11.5a6.5 6.5 0 1 0-13 0C5.5 15.2 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.8"/></svg>;
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5" width="13.5" height="12" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="m17 9 3.5-2v8L17 13V9ZM8 20h5M10.5 17v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function TrainingCard({ item }: { item: BtsTrainingHighlight }) {
  return (
    <div data-training-card className={styles.cardSlot}>
      <Link href={item.slug} aria-label={'Découvrir le ' + item.shortTitle} className={styles.cardLink}>
        <article className={styles.card} data-featured={item.featured || undefined}>
          <header className={styles.cardHeader}>
            <span className={styles.cardIcon}><BtsIcon type={item.visual} /></span>
            <span className={styles.category}>{item.category}</span>
          </header>
          <div className={styles.cardContent}>
            <h3>{item.shortTitle}</h3>
            <p className={styles.courseTitle}>{item.title}</p>
            <p className={styles.description}>{item.description}</p>
          </div>
          <footer className={styles.cardFooter}>
            <span>Découvrir ce BTS</span><span aria-hidden="true">→</span>
          </footer>
        </article>
      </Link>
    </div>
  );
}

export function BtsTrainingGrid({ items }: { items: BtsTrainingHighlight[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  useTrainingCardAnimations(gridRef);

  const featured = items.find((item) => item.featured) ?? items[0];
  const orderedItems = featured ? [featured, ...items.filter((item) => item !== featured)] : [];

  if (!featured) return null;

  return (
    <div ref={gridRef} className={styles.wrapper}>
      <div className={styles.studyModes} role="group" aria-label="Modalités des cours de BTS">
        <div className={styles.studyMode}>
          <StudyModeIcon type="location" />
          <div><span>En présentiel</span><strong>{featured.onsiteLocation}</strong></div>
        </div>
        <span className={styles.modeOr}>ou</span>
        <div className={styles.studyMode}>
          <StudyModeIcon type="video" />
          <div><span>À distance</span><strong>{featured.distanceMode}</strong></div>
        </div>
      </div>

      <div className={styles.trainingGrid}>
        {orderedItems.map((item) => <TrainingCard key={item.slug} item={item} />)}
      </div>

      <div className={styles.orientationStrip}>
        <span className={styles.orientationIcon} aria-hidden="true">✦</span>
        <strong className={styles.orientationCopy}>Vous hésitez entre plusieurs BTS&nbsp;?</strong>
        <Link href="#assistant-orientation" className={styles.orientationButton}>Être orienté <span aria-hidden="true">→</span></Link>
      </div>
    </div>
  );
}
