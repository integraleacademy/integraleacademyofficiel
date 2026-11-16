"use client";

import Link from 'next/link';
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react';
import type { TrainingStatus } from '@/data/upcoming-trainings';
import { TrainingStatusBadge } from './TrainingStatusBadge';
import styles from './TrainingCarousel.module.css';

export type TrainingCarouselItem = {
  shortTitle: string;
  title: string;
  description: string;
  jobs?: readonly string[];
  certificationStatus?: string;
  imageSrc: string;
  imageAlt: string;
  tabPrefix?: string;
  tabLabel?: string;
  details?: ReactNode;
  caption?: ReactNode;
} & (
  | { slug: string; ctaLabel: string; category: string; status?: never; anchorId?: never; preview?: never }
  | {
      status: TrainingStatus; anchorId: string; ctaLabel: string; slug?: never; category?: never;
      topics: string[];
      preview: { name: string; family: string; level?: string; location?: string };
    }
);

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
  const didSwipe = useRef(false);

  const previewDialog = useRef<HTMLDialogElement>(null);
  const dialogId = `${carouselId}-preview`;

  useEffect(() => {
    if (!items.some(item => item.anchorId)) return;
    function showLinkedCourse() {
      const anchor = window.location.hash.slice(1);
      const index = items.findIndex(item => item.anchorId === anchor);
      if (index >= 0) setActiveIndex(index);
    }
    showLinkedCourse();
    window.addEventListener('hashchange', showLinkedCourse);
    return () => window.removeEventListener('hashchange', showLinkedCourse);
  }, [items]);

  if (!items.length) return null;
  const activeItem = items[activeIndex];

  function selectSlide(index: number, nextDirection?: 'next' | 'previous') {
    const nextIndex = (index + items.length) % items.length;
    setDirection(nextDirection ?? (nextIndex < activeIndex ? 'previous' : 'next'));
    setActiveIndex(nextIndex);
    const nextAnchor = items[nextIndex].anchorId;
    if (nextAnchor && items.some(item => item.anchorId === window.location.hash.slice(1))) {
      window.history.replaceState(window.history.state, '', `#${nextAnchor}`);
    }
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
    didSwipe.current = false;
    if (event.pointerType === 'mouse' || !event.isPrimary) return;
    const control = (event.target as Element).closest('a, button');
    if (control && !control.classList.contains(styles.artworkLink)) return;
    pointerStart.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || start.id !== event.pointerId) return;
    const distanceX = event.clientX - start.x;
    const distanceY = event.clientY - start.y;
    if (Math.abs(distanceX) < 50 || Math.abs(distanceX) < Math.abs(distanceY) * 1.3) return;
    didSwipe.current = true;
    selectSlide(activeIndex + (distanceX < 0 ? 1 : -1), distanceX < 0 ? 'next' : 'previous');
  }

  return (
    <div className={styles.carousel} style={{ '--tab-count': items.length } as CSSProperties} role="region" aria-roledescription="carrousel" aria-label={label} data-direction={direction}>
      {items.map(item => item.anchorId && <span key={item.anchorId} id={item.anchorId} className={styles.courseAnchor} aria-hidden="true" />)}
      <div
        className={styles.stage}
        id={`${carouselId}-slides`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { pointerStart.current = null; }}
        onClickCapture={event => {
          if (didSwipe.current && event.detail > 0) {
            didSwipe.current = false;
            event.preventDefault();
            event.stopPropagation();
          }
        }}
      >
        {items.map((item, index) => {
          function courseAction(children: ReactNode, className: string, ariaLabel?: string) {
            return item.slug
              ? <Link href={item.slug} className={className} data-academy-action={className === styles.discover ? 'training' : undefined} aria-label={ariaLabel}>{children}</Link>
              : <button type="button" className={className} data-academy-action={className === styles.discover ? 'training' : undefined} aria-label={ariaLabel} aria-haspopup="dialog" aria-controls={dialogId}
                  onClick={() => previewDialog.current?.showModal()}>{children}</button>;
          }
          const heading = <><strong>{item.shortTitle}</strong>{' '}<em>{item.title}</em></>;
          const artwork = (
            <img src={item.imageSrc} alt={item.imageAlt} width={1200} height={800}
              loading="lazy" decoding="async" draggable={false} />
          );

          return (
            <article
              key={item.slug ?? item.shortTitle}
              id={`${carouselId}-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`${carouselId}-tab-${index}`}
              aria-hidden={index !== activeIndex}
              inert={index !== activeIndex}
              data-active={index === activeIndex}
              className={styles.slide}
            >
              <div className={styles.copy}>
                <p className={styles.category}>
                  {item.status ? <TrainingStatusBadge status={item.status} /> : item.category}
                </p>
                <h3 className={styles.title}>
                  {courseAction(heading, styles.titleLink)}
                </h3>
                <p className={styles.description}>{item.description}</p>
                {item.certificationStatus && <p className={styles.certificationNote}>{item.certificationStatus}</p>}
                {item.details}
                {courseAction(<>{item.ctaLabel}<Arrow /></>, styles.discover)}
              </div>
              <div className={styles.visual}>
                <figure className={styles.artwork}>
                  {courseAction(artwork, styles.artworkLink, item.ctaLabel)}
                </figure>
                {item.caption && <div className={styles.caption}>{item.caption}</div>}
              </div>
            </article>
          );
        })}
      </div>

      <div className={styles.navigation}>
        <div className={styles.tabs} role="tablist" aria-label={tabListLabel}>
          {items.map((item, index) => (
            <button
              key={item.slug ?? item.shortTitle}
              ref={(element) => { tabsRef.current[index] = element; }}
              id={`${carouselId}-tab-${index}`}
              type="button"
              role="tab"
              aria-label={item.status ? item.tabLabel ?? item.shortTitle : item.shortTitle}
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
      {activeItem.preview && (
        <dialog ref={previewDialog} id={dialogId} aria-labelledby={`${dialogId}-heading`} className={styles.previewDialog}
          onClick={event => { if (event.target === event.currentTarget) previewDialog.current?.close(); }}>
          <div className={styles.previewBody}>
            <div className={styles.previewTop}>
              <TrainingStatusBadge status={activeItem.status} />
              <button type="button" onClick={() => previewDialog.current?.close()} aria-label="Fermer l’aperçu" className={styles.previewClose}>×</button>
            </div>
            <p className={styles.previewFamily}>{[activeItem.preview.family, activeItem.preview.level, activeItem.preview.location].filter(Boolean).join(' · ')}</p>
            <h2 id={`${dialogId}-heading`}>{activeItem.preview.name}</h2>
            {activeItem.certificationStatus && <p className={styles.previewCertification}>{activeItem.certificationStatus}</p>}
            <h3>Ce que vous apprendrez</h3>
            <ul>{activeItem.topics.map(topic => <li key={topic}>{topic}</li>)}</ul>
            {activeItem.jobs && activeItem.jobs.length > 0 && <div className={styles.previewCareers}><h3>Exemples de métiers visés</h3><ul>{activeItem.jobs.map(job => <li key={job}>{job}</li>)}</ul></div>}
            <Link href="/contact" onClick={() => previewDialog.current?.close()} className={styles.discover}>Poser une question à l’école <Arrow /></Link>
          </div>
        </dialog>
      )}
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{activeItem.preview?.name ?? `${activeItem.shortTitle} – ${activeItem.title}`}. {activeItem.status && `${activeItem.status}. `}Formation {activeIndex + 1} sur {items.length}.</p>
    </div>
  );
}
