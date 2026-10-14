'use client';

import { useId, useState } from 'react';
import { planningSsiapCourse, ssiapPlanningCourses, ssiapPlanningGroups, type SsiapPlanningCourse, type SsiapPlanningSession } from '@/lib/planning-ssiap';
import styles from './planning.module.css';

export function SsiapCourseChoices({ sessions, onChoose, selected, compact = false }: {
  sessions: SsiapPlanningSession[];
  onChoose: (course: SsiapPlanningCourse) => void;
  selected?: SsiapPlanningCourse | null;
  compact?: boolean;
}) {
  const id = useId();
  const [expandedGroup, setExpandedGroup] = useState<string>(ssiapPlanningCourses.find(course => course.key === selected)?.group || 'initial');
  return <div className={`${styles.ssiapChoices} ${compact ? styles.ssiapChoicesCompact : ''}`}>
    {ssiapPlanningGroups.map(group => {
      const expanded = !compact || expandedGroup === group.key;
      return <div key={group.key} className={styles.ssiapGroup}>
        {compact ? <button type="button" className={styles.ssiapGroupHeading} aria-expanded={expanded} aria-controls={`${id}-${group.key}`} onClick={() => setExpandedGroup(group.key)}>{group.label}<span aria-hidden="true">{expanded ? '−' : '+'}</span></button> : <h3 className={styles.ssiapGroupHeading}>{group.label}</h3>}
        <div id={`${id}-${group.key}`} hidden={!expanded} className={styles.ssiapCourseGrid}>
          {ssiapPlanningCourses.filter(course => course.group === group.key).map(course => {
            const count = sessions.filter(session => planningSsiapCourse(session) === course.key).length;
            return <button key={course.key} type="button" className={styles.ssiapCourse} aria-label={`Choisir ${course.label}`} aria-pressed={selected === course.key} onClick={() => onChoose(course.key)}>
              <strong>{course.label}</strong><span>{course.detail}</span><small>{count ? `${count} ${count > 1 ? 'sessions' : 'session'}` : 'Dates à venir'} <span aria-hidden="true">→</span></small>
            </button>;
          })}
        </div>
      </div>;
    })}
  </div>;
}
