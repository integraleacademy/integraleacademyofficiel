'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent } from 'react';
import styles from './ApsExperience.module.css';

export function ApsProgramExplorer({ units }: { units: string[][] }) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  function select(index: number, focus = false) {
    setActive(index);
    if (focus) {
      buttons.current[index]?.focus({ preventScroll: true });
      buttons.current[index]?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
    }
  }
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? units.length - 1
      : ['ArrowDown', 'ArrowRight'].includes(event.key) ? (index + 1) % units.length
      : ['ArrowUp', 'ArrowLeft'].includes(event.key) ? (index + units.length - 1) % units.length : null;
    if (next === null) return;
    event.preventDefault();
    select(next, true);
  }
  return <div className={styles.program}>
    <div className={styles.programOverview}>
      <div><strong>175<span>h</span></strong><p>14 unités de valeur<br /><span>Un parcours complet vers le métier</span></p></div>
      <dl><div><dt>Socle de base</dt><dd>41 h</dd></div><div><dt>Spécialité APS</dt><dd>134 h</dd></div><div><dt>Pratique au total</dt><dd>63,5 h</dd></div></dl>
    </div>
    <div className={styles.programBody}>
      <div className={styles.programMenu}>
        <p className={styles.kicker}>Explorez les 14 UV <span>Faites défiler ↓</span></p>
        <div className={styles.programTabs} role="tablist" aria-label="Les 14 UV du programme APS" aria-orientation="vertical">
          {units.map(([number, title, duration], index) => <button key={number} ref={node => { buttons.current[index] = node; }} type="button" role="tab" id={`aps-uv-tab-${index}`} aria-controls={`aps-uv-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => select(index)} onKeyDown={event => navigate(event, index)}><span>{number}</span><strong>{title}</strong><small>{duration}</small><span aria-hidden="true">↗</span></button>)}
        </div>
      </div>
      <div className={styles.programDetail}>
        <Image className={styles.programImage} src="/images/aps/experience/programme.webp" alt="Une formatrice explique les fondamentaux du métier à un groupe de stagiaires APS" width={1536} height={1024} sizes="(max-width: 800px) 90vw, 700px" />
        {units.map(([number, title, duration, delivery, description], index) => <article key={number} id={`aps-uv-panel-${index}`} role="tabpanel" aria-labelledby={`aps-uv-tab-${index}`} hidden={active !== index} tabIndex={0} className={styles.programPanel}>
          <div className={styles.unitHeading}><p className={styles.kicker}>{number} · Ce que vous allez apprendre</p><span>{duration}</span></div>
          <h3>{title}</h3><p>{description}</p><div className={styles.delivery}>{delivery}</div>
          <div className={styles.panelNavigation}><span>{index + 1} / 14</span><button type="button" onClick={() => select((index + 1) % units.length, true)}>{index === units.length - 1 ? 'Revenir à l’UV 1' : 'UV suivante'} <span aria-hidden="true">→</span></button></div>
        </article>)}
      </div>
    </div>
  </div>;
}
