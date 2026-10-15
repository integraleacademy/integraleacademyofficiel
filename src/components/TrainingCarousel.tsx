"use client";

import Link from 'next/link';
import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react';
import styles from './TrainingCarousel.module.css';

export type TrainingCarouselItem = {
  slug: string;
  shortTitle: string;
  title: string;
  category: string;
  description: string;
  ctaLabel: string;
  imageSrc: string;
  imageAlt: string;
  tabPrefix?: string;
  tabLabel?: string;
  details?: ReactNode;
  caption?: ReactNode;
};

function Arrow({ previous = false }: { previous?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={previous ? 'M19 12H5m6-6-6 6 6 6' : 'M5 12h14m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function TrainingCarousel({ items, label, tabListLabel, previousLabel, nextLabel }: {
  items: TrainingCarouselItem[];
  label: string;
  tabListLabel: string;
  previousLabel: string;
  nextLabel: string;
}) {
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
    <div className={styles.carousel} style={{ '--tab-count': items.length } as CSSProperties} role="region" aria-roledescription="carrousel" aria-label={label} data-direction={direction}>
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
              {item.details}
              <Link href={item.slug} className={styles.discover}>
                {item.ctaLabel}<Arrow />
              </Link>
            </div>
            <div className={styles.visual}>
              <figure className={styles.artwork}>
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </figure>
              {item.caption && <div className={styles.caption}>{item.caption}</div>}
            </div>
          </article>
        ))}
      </div>

      <div className={styles.navigation}>
        <div className={styles.tabs} role="tablist" aria-label={tabListLabel}>
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
              {item.tabPrefix && <span className={styles.tabPrefix}>{item.tabPrefix}</span>}{item.tabLabel ?? item.shortTitle}
            </button>
          ))}
        </div>
        <div className={styles.controls}>
          <span className={styles.counter} aria-hidden="true"><strong>{String(activeIndex + 1).padStart(2, '0')}</strong> / {String(items.length).padStart(2, '0')}</span>
          <button type="button" aria-label={previousLabel} aria-controls={`${carouselId}-slides`} onClick={() => selectSlide(activeIndex - 1, 'previous')}><Arrow previous /></button>
          <button type="button" aria-label={nextLabel} aria-controls={`${carouselId}-slides`} onClick={() => selectSlide(activeIndex + 1, 'next')}><Arrow /></button>
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{activeItem.shortTitle} — {activeItem.title}. Formation {activeIndex + 1} sur {items.length}.</p>
    </div>
  );
}
