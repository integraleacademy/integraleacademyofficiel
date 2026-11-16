'use client';

import { useId } from 'react';
import Image from 'next/image';
import { originalArtwork } from '@/data/originalArtwork';
import { planningSsiapCourse, ssiapPlanningCourses, ssiapPlanningGroups, type SsiapPlanningCourse, type SsiapPlanningSession } from '@/lib/planning-ssiap';
import styles from './planning.module.css';

const levels = [
  { level: 1, caption: 'Prévenir & intervenir', artwork: originalArtwork['ssiap-1-galerie-ssi'] },
  { level: 2, caption: 'Encadrer une équipe', artwork: originalArtwork['ssiap-2-galerie-briefing'] },
  { level: 3, caption: 'Piloter un service', artwork: originalArtwork['ssiap-3-mission-conseil'] },
] as const;

export function SsiapCourseChoices({ sessions, onChoose, selected, compact = false }: {
  sessions: SsiapPlanningSession[];
  onChoose: (course: SsiapPlanningCourse) => void;
  selected?: SsiapPlanningCourse | null;
  compact?: boolean;
}) {
  const id = useId();
  const initialLevel = ssiapPlanningCourses.find(course => course.key === selected)?.level || 1;
  return <div className={`${styles.ssiapChoices} ${compact ? styles.ssiapChoicesCompact : ''}`} role="group" aria-label="Choisir un parcours SSIAP">
    {levels.map(({ level, caption, artwork }) => {
      const initial = ssiapPlanningCourses.find(course => course.level === level && course.group === 'initial')!;
      const titleId = `${id}-level-${level}`;
      const courses = <div className={styles.ssiapCourseList}>
        {ssiapPlanningCourses.filter(course => course.level === level).map(course => {
          const count = sessions.filter(session => planningSsiapCourse(session) === course.key).length;
          const label = ssiapPlanningGroups.find(group => group.key === course.group)!.label;
          return <button key={course.key} type={compact ? 'submit' : 'button'} name="parcours" value={course.key} className={styles.ssiapCourse} aria-label={`Choisir ${course.label}`} aria-pressed={selected === course.key} onClick={event => { event.preventDefault(); onChoose(course.key); }}>
            <span><strong>{label}</strong><small data-available={count > 0}>{count ? `${count} ${count > 1 ? 'sessions' : 'session'}` : 'Aucune date publiée'}</small></span>
            <span className={styles.ssiapCourseArrow} aria-hidden="true">→</span>
          </button>;
        })}
      </div>;
      if (compact) return <details key={level} name={id} open={initialLevel === level} className={styles.ssiapLevel}>
        <summary className={styles.ssiapCompactHeading}>
          <Image src={artwork.src} alt="" width={72} height={72} sizes="60px" />
          <span><strong>{initial.label}</strong><small>{initial.detail}</small></span>
          <span className={styles.ssiapToggle} aria-hidden="true" />
        </summary>
        {courses}
      </details>;
      return <article key={level} className={styles.ssiapLevel} aria-labelledby={titleId}>
        <div className={styles.ssiapLevelArtwork}>
          <Image src={artwork.src} alt={artwork.alt} width={1536} height={1024} sizes="(max-width: 760px) 92vw, (max-width: 1280px) 30vw, 400px" />
          <span>{caption}</span>
        </div>
        <div className={styles.ssiapLevelHeading}><h3 id={titleId}>{initial.label}</h3><p>{initial.detail}</p></div>
        {courses}
      </article>;
    })}
  </div>;
}
