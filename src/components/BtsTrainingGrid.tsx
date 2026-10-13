"use client";

import Link from 'next/link';
import { useRef } from 'react';
import styles from './BtsTrainingGrid.module.css';
import cardStyles from './SecurityTrainingGrid.module.css';
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

function CourseFactIcon({ type }: { type: 'duration' | 'level' | 'rhythm' }) {
  if (type === 'duration') return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" /><path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
  if (type === 'rhythm') return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 7.5h14M5 16.5h14M8 4.5 5 7.5l3 3M16 13.5l3 3-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m3 9 9-5 9 5-9 5-9-5Zm4 2.3v5.5c3 2.3 7 2.3 10 0v-5.5M21 9v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function FeaturedCard({ item }: { item: BtsTrainingHighlight }) {
  return (
    <div data-training-card className={cardStyles.featuredSlot}>
      <Link href={item.slug} aria-label={'Découvrir le ' + item.shortTitle} className={cardStyles.featuredLink}>
        <article data-training-tilt className={`${cardStyles.featuredCard} ${styles.featuredCard}`}>
          <span className={cardStyles.featuredOrb} aria-hidden="true" />
          <span className={cardStyles.featuredMonogram} aria-hidden="true">MOS</span>
          <header className={cardStyles.featuredHeader}>
            <span className={cardStyles.popularBadge}><span aria-hidden="true">✦</span> {item.certification}</span>
            <span className={cardStyles.featuredIcon}><BtsIcon type={item.visual} /></span>
          </header>
          <div className={cardStyles.featuredContent}>
            <span className={cardStyles.category}>{item.category}</span>
            <h3><strong>{item.shortTitle}</strong><span>{item.title}</span></h3>
            <p>{item.description}</p>
          </div>
          <div className={`${cardStyles.featuredFacts} ${styles.featuredFacts}`}>
            <span><CourseFactIcon type="duration" /><span><small>Durée</small><strong>{item.duration}</strong></span></span>
            <span><CourseFactIcon type="level" /><span><small>Niveau</small><strong>{item.level}</strong></span></span>
            <span><CourseFactIcon type="rhythm" /><span><small>Rythme</small><strong>{item.rhythm}</strong></span></span>
          </div>
          <div className={styles.skillsPanel}>
            <strong>Au cœur de votre formation</strong>
            <ul>
              <li>Organisation des prestations de sécurité</li>
              <li>Management et coordination des équipes</li>
              <li>Développement de la relation client</li>
            </ul>
          </div>
          <footer className={cardStyles.featuredFooter}>
            <span className={cardStyles.featuredCta}>Découvrir le {item.shortTitle} <span aria-hidden="true">→</span></span>
          </footer>
        </article>
      </Link>
    </div>
  );
}

function CompactCard({ item, wide }: { item: BtsTrainingHighlight; wide: boolean }) {
  return (
    <div data-training-card className={`${cardStyles.compactSlot} ${wide ? styles.wideSlot : ''}`}>
      <Link href={item.slug} aria-label={'Découvrir le ' + item.shortTitle} className={cardStyles.compactLink}>
        <article data-training-tilt className={`${cardStyles.compactCard} ${styles.compactCard} ${wide ? styles.wideCard : ''}`}>
          <span className={cardStyles.compactAccent} aria-hidden="true" />
          <header className={`${cardStyles.compactHeader} ${styles.compactHeader}`}>
            <span className={cardStyles.compactIcon}><BtsIcon type={item.visual} /></span>
            <span className={cardStyles.durationBadge}>{item.duration}</span>
          </header>
          <div className={`${cardStyles.compactContent} ${styles.compactContent}`}>
            <span className={cardStyles.compactCategory}>{item.category}</span>
            <h3>{item.shortTitle}</h3>
            <p>{item.title}</p>
          </div>
          <div className={`${cardStyles.compactFacts} ${styles.compactFacts}`}>
            <span><CourseFactIcon type="level" /> {item.level}</span>
            <span><CourseFactIcon type="rhythm" /> {item.rhythm}</span>
          </div>
          <footer className={`${cardStyles.compactFooter} ${styles.compactFooter}`}>
            <span><small>{item.certification}</small><strong>Découvrir le BTS</strong></span>
            <span className={cardStyles.compactArrow} aria-hidden="true">→</span>
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
  if (!featured) return null;
  const compactItems = items.filter((item) => item !== featured);

  return (
    <div ref={gridRef} className={styles.wrapper}>
      <div className={styles.studyModes} role="group" aria-label="Modalités des cours de BTS">
        <div className={styles.studyMode}>
          <span className={styles.modeIcon}><StudyModeIcon type="location" /></span>
          <div><span>Sur notre campus</span><strong>{featured.onsiteLocation}</strong></div>
        </div>
        <span className={styles.modeOr}>ou</span>
        <div className={styles.studyMode}>
          <span className={styles.modeIcon}><StudyModeIcon type="video" /></span>
          <div><span>À distance</span><strong>{featured.distanceMode}</strong></div>
        </div>
      </div>
      <div className={cardStyles.bentoGrid}>
        <FeaturedCard item={featured} />
        <div className={`${cardStyles.compactGrid} ${styles.compactGrid}`}>
          {compactItems.map((item, index) => <CompactCard key={item.slug} item={item} wide={index === compactItems.length - 1 && compactItems.length % 2 === 1} />)}
        </div>
      </div>
      <div className={cardStyles.orientationStrip}>
        <span className={cardStyles.orientationIcon} aria-hidden="true">?</span>
        <span className={cardStyles.orientationCopy}><strong>Vous hésitez entre plusieurs BTS&nbsp;?</strong><small>Trouvez le parcours qui correspond à votre projet professionnel.</small></span>
        <Link href="#assistant-orientation" className={cardStyles.orientationButton}>Être orienté <span aria-hidden="true">→</span></Link>
      </div>
    </div>
  );
}
