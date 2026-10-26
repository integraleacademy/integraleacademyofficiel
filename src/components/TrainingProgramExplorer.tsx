'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent } from 'react';
import type { ManualIllustration } from '@/data/manualIllustrations';
import styles from './ApsExperience.module.css';

export type TrainingProgramUnit = {
  number: string; title: string; duration?: string; delivery: string;
  description?: string; items?: readonly string[];
};

export function TrainingProgramExplorer({ units, idPrefix, hours, overview, subtitle, facts, menuTitle, tabListLabel, illustration, nextLabel, restartLabel }: {
  units: readonly TrainingProgramUnit[]; idPrefix: string; hours: string; overview: string;
  subtitle: string; facts: ReadonlyArray<readonly [string, string]>; menuTitle: string;
  tabListLabel: string; illustration: ManualIllustration; nextLabel: string; restartLabel: string;
}) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const tabList = useRef<HTMLDivElement | null>(null);
  function select(index: number, focus = false) {
    setActive(index);
    const button = buttons.current[index];
    const list = tabList.current;
    if (focus) button?.focus({ preventScroll: true });
    // Reveal the selected tab within its own list without moving the page.
    if (button && list) {
      const item = button.getBoundingClientRect();
      const viewport = list.getBoundingClientRect();
      list.scrollBy({
        top: item.top < viewport.top ? item.top - viewport.top : Math.max(0, item.bottom - viewport.bottom),
        left: item.left < viewport.left ? item.left - viewport.left : Math.max(0, item.right - viewport.right),
        behavior: 'instant',
      });
    }
  }
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? units.length - 1
      : ['ArrowDown', 'ArrowRight'].includes(event.key) ? (index + 1) % units.length
      : ['ArrowUp', 'ArrowLeft'].includes(event.key) ? (index + units.length - 1) % units.length : null;
    if (next === null) return;
    event.preventDefault(); select(next, true);
  }
  return <div className={styles.program} data-program-explorer={idPrefix}>
    <div className={styles.programOverview}>
      <div className={styles.programSummary}>
        <div className={styles.programHours}><strong>{hours}<span>h</span></strong><p>{overview}<br /><span>{subtitle}</span></p></div>
        <dl>{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </div>
      <Image className={styles.programImage} src={illustration.src} alt={illustration.alt} width={1536} height={1024} sizes="(max-width: 550px) 90vw, 260px" />
    </div>
    <div className={styles.programBody}>
      <div className={styles.programMenu}>
        <p className={styles.kicker}>{menuTitle} <span>Faites défiler ↓</span></p>
        <div ref={tabList} className={styles.programTabs} role="tablist" aria-label={tabListLabel} aria-orientation="vertical">
          {units.map(({ number, title, duration }, index) => <button key={number} ref={node => { buttons.current[index] = node; }} type="button" role="tab" id={`${idPrefix}-tab-${index}`} aria-controls={`${idPrefix}-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => select(index)} onKeyDown={event => navigate(event, index)}><span>{number}</span><strong>{title}</strong><small>{duration}</small><span aria-hidden="true">↗</span></button>)}
        </div>
      </div>
      <div className={styles.programDetail}>
        {units.map(({ number, title, duration, delivery, description, items }, index) => <article key={number} id={`${idPrefix}-panel-${index}`} role="tabpanel" aria-labelledby={`${idPrefix}-tab-${index}`} hidden={active !== index} aria-hidden={active !== index} inert={active !== index} tabIndex={0} className={styles.programPanel}>
          <div className={styles.unitHeading}><p className={styles.kicker}>{number} · Ce que vous allez apprendre</p>{duration && <span>{duration}</span>}</div>
          <h3>{title}</h3>{description && <p>{description}</p>}
          {items && <ul className={styles.programTopics}>{items.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>}
          <div className={styles.delivery}>{delivery}</div>
          <div className={styles.panelNavigation}><span>{index + 1} / {units.length}</span><button type="button" onClick={() => select((index + 1) % units.length, true)}>{index === units.length - 1 ? restartLabel : nextLabel} <span aria-hidden="true">→</span></button></div>
        </article>)}
      </div>
    </div>
  </div>;
}
