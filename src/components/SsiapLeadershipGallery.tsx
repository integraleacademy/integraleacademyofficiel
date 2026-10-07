'use client';

import { useState } from 'react';
import { ManualArtwork } from '@/components/ManualArtwork';
import { ssiapCourseVisuals, type SsiapLeadershipLevel } from '@/data/ssiapCourseVisuals';
import styles from './SsiapLeadershipGallery.module.css';

export function SsiapLeadershipGallery({ level }: { level: SsiapLeadershipLevel }) {
  const [active, setActive] = useState(0);
  const visuals = ssiapCourseVisuals[level];
  const scene = visuals.scenes[active];
  const panelId = `${level}-scene`;

  return <section className={styles.gallery} aria-labelledby={`${level}-situations-title`}>
    <div className={styles.heading}>
      <p className={styles.eyebrow}>Le métier en images · {level === 'ssiap-2' ? 'SSIAP 2' : 'SSIAP 3'}</p>
      <h3 id={`${level}-situations-title`}>{visuals.galleryTitle}</h3>
      <p>{visuals.galleryIntro}</p>
    </div>
    <div className={styles.choices} role="group" aria-label="Choisir une situation métier">
      {visuals.scenes.map((item, index) => <button
        key={item.id}
        type="button"
        aria-pressed={index === active}
        aria-controls={panelId}
        onClick={() => setActive(index)}
        className={styles.choice}
      ><span aria-hidden="true">0{index + 1}</span><strong>{item.title}</strong></button>)}
    </div>
    <div id={panelId} className={styles.scene}>
      <div key={scene.id} className={styles.sceneImage}><ManualArtwork illustration={scene.illustration} /></div>
      <div className={styles.sceneCopy} aria-live="polite" aria-atomic="true">
        <span className={styles.counter}>Situation 0{active + 1} / 0{visuals.scenes.length}</span>
        <h4>{scene.title}</h4>
        <p>{scene.text}</p>
        <ol>{scene.actions.map((action, index) => <li key={action}><span aria-hidden="true">0{index + 1}</span>{action}</li>)}</ol>
      </div>
    </div>
  </section>;
}
