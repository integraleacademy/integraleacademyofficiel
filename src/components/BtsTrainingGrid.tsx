"use client";

import Link from 'next/link';
import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import styles from './BtsTrainingGrid.module.css';

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

const illustrationDescriptions: Record<BtsVisual, string> = {
  mos: 'Une responsable coordonne une équipe de sécurité dans un poste de contrôle.',
  mco: 'Les métiers du management et du commerce en situation professionnelle.',
  ndrc: 'Les métiers de la négociation et de la relation client.',
  ci: 'Les métiers du commerce et des échanges internationaux.',
  pi: 'Les métiers de la transaction et de la gestion immobilière.',
  cg: 'Les métiers de la comptabilité et de la gestion.',
};

function Arrow({ previous = false }: { previous?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={previous ? 'M19 12H5m6-6-6 6 6 6' : 'M5 12h14m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function BtsTrainingGrid({ items }: { items: BtsTrainingHighlight[] }) {
  const carouselId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'previous'>('next');
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const pointerStart = useRef<{ x: number; y: number; id: number } | null>(null);

  if (!items.length) return null;
  const activeItem = items[activeIndex];

  function selectSlide(index: number, nextDirection?: 'next' | 'previous') {
    const nextIndex = (index + items.length) % items.length;
    setDirection(nextDirection ?? (nextIndex < activeIndex ? 'previous' : 'next'));
    setActiveIndex(nextIndex);
    return nextIndex;
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;
    if (event.key === 'ArrowRight') nextIndex = selectSlide(index + 1, 'next');
    else if (event.key === 'ArrowLeft') nextIndex = selectSlide(index - 1, 'previous');
    else if (event.key === 'Home') nextIndex = selectSlide(0);
    else if (event.key === 'End') nextIndex = selectSlide(items.length - 1);
    else return;
    event.preventDefault();
    tabsRef.current[nextIndex]?.focus();
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    pointerStart.current = null;
    if (event.pointerType === 'mouse' || !event.isPrimary) return;
    if ((event.target as Element).closest('a, button')) return;
    pointerStart.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || start.id !== event.pointerId) return;
    const distanceX = event.clientX - start.x;
    const distanceY = event.clientY - start.y;
    if (Math.abs(distanceX) < 50 || Math.abs(distanceX) < Math.abs(distanceY) * 1.3) return;
    selectSlide(activeIndex + (distanceX < 0 ? 1 : -1), distanceX < 0 ? 'next' : 'previous');
  }

  return (
    <div className={styles.carousel} role="region" aria-roledescription="carrousel" aria-label="Découvrir nos BTS" data-direction={direction}>
      <div
        className={styles.stage}
        id={`${carouselId}-slides`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { pointerStart.current = null; }}
      >
        {items.map((item, index) => (
          <article
            key={item.slug}
            id={`${carouselId}-panel-${index}`}
            role="tabpanel"
            aria-labelledby={`${carouselId}-tab-${index}`}
            aria-hidden={index !== activeIndex}
            inert={index !== activeIndex}
            data-active={index === activeIndex}
            className={styles.slide}
          >
            <div className={styles.copy}>
              <p className={styles.category}>{item.category}</p>
              <h3 className={styles.title}>
                <strong>{item.shortTitle}</strong>
                <em>{item.title}</em>
              </h3>
              <p className={styles.description}>{item.description}</p>
              <Link href={item.slug} className={styles.discover}>
                Découvrir le {item.shortTitle}<Arrow />
              </Link>
            </div>
            <figure className={styles.artwork}>
              <img
                src={`/images/bts/manuel/${item.visual}.webp`}
                alt={illustrationDescriptions[item.visual]}
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </figure>
          </article>
        ))}
      </div>

      <div className={styles.navigation}>
        <div className={styles.tabs} role="tablist" aria-label="Choisir un BTS">
          {items.map((item, index) => (
            <button
              key={item.slug}
              ref={(element) => { tabsRef.current[index] = element; }}
              id={`${carouselId}-tab-${index}`}
              type="button"
              role="tab"
              aria-label={item.shortTitle}
              aria-selected={index === activeIndex}
              aria-controls={`${carouselId}-panel-${index}`}
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => selectSlide(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              <span className={styles.tabPrefix}>BTS </span>{item.shortTitle.replace(/^BTS\s+/, '')}
            </button>
          ))}
        </div>
        <div className={styles.controls}>
          <span className={styles.counter} aria-hidden="true"><strong>{String(activeIndex + 1).padStart(2, '0')}</strong> / {String(items.length).padStart(2, '0')}</span>
          <button type="button" aria-label="BTS précédent" aria-controls={`${carouselId}-slides`} onClick={() => selectSlide(activeIndex - 1, 'previous')}><Arrow previous /></button>
          <button type="button" aria-label="BTS suivant" aria-controls={`${carouselId}-slides`} onClick={() => selectSlide(activeIndex + 1, 'next')}><Arrow /></button>
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{activeItem.shortTitle} — {activeItem.title}. Formation {activeIndex + 1} sur {items.length}.</p>
    </div>
  );
}
