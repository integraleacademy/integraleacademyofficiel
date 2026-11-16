'use client';

import Link from 'next/link';
import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { trainingNavigation, type TrainingMenuFamily } from '@/data/navigation';
import { TrainingStatusBadge } from './TrainingStatusBadge';
import styles from './TrainingFamilyMenu.module.css';

function Chevron() {
  return <svg aria-hidden="true" viewBox="0 0 16 16" fill="none"><path d="m6 3.5 4.5 4.5L6 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function CourseList({ family, onNavigate }: { family: TrainingMenuFamily; onNavigate: () => void }) {
  return <>
    <ul className={styles.courses}>
      {family.courses.map(course => {
        const content = <>
          <span>{course.label}</span>
          {course.status && <TrainingStatusBadge status={course.status} />}
          <Chevron />
        </>;
        return <li key={course.href}>
          {course.href.startsWith('/#')
            ? <a href={course.href} onClick={onNavigate} className={styles.course}>{content}</a>
            : <Link href={course.href} onClick={onNavigate} className={styles.course}>{content}</Link>}
        </li>;
      })}
    </ul>
    <a href={family.href} onClick={onNavigate} className={styles.seeFamily}>Voir la rubrique sur l’accueil <span aria-hidden="true">→</span></a>
  </>;
}

export function TrainingFamilyMenu({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate: () => void }) {
  const id = useId();
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function navigateKeys(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const count = trainingNavigation.length;
    let next: number;
    switch (event.key) {
      case 'ArrowDown': next = (index + 1) % count; break;
      case 'ArrowUp': next = (index - 1 + count) % count; break;
      case 'Home': next = 0; break;
      case 'End': next = count - 1; break;
      default: return;
    }
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  if (mobile) {
    return <div className={styles.mobileFamilies}>
      {trainingNavigation.map(family => (
        <details key={family.href} name={id}>
          <summary className={styles.family}>{family.label}<Chevron /></summary>
          <div className={styles.mobileList}><CourseList family={family} onNavigate={onNavigate} /></div>
        </details>
      ))}
    </div>;
  }

  return <div className={styles.catalogue}>
    <div role="tablist" aria-label="Familles de formations" aria-orientation="vertical" className={styles.families}>
      {trainingNavigation.map((family, index) => (
        <button type="button" role="tab" id={`${id}-family-${index}`} key={family.href}
          ref={el => { tabs.current[index] = el; }}
          aria-controls={`${id}-list-${index}`} aria-selected={selected === index} tabIndex={selected === index ? 0 : -1}
          onClick={() => setSelected(index)} onKeyDown={event => navigateKeys(event, index)} className={styles.family}>
          {family.label}<Chevron />
        </button>
      ))}
    </div>
    {trainingNavigation.map((family, index) => (
      <section key={family.href} role="tabpanel" id={`${id}-list-${index}`}
        aria-labelledby={`${id}-family-${index}`} hidden={selected !== index} className={styles.panel}>
        <h2>{family.label}</h2>
        <CourseList family={family} onNavigate={onNavigate} />
      </section>
    ))}
  </div>;
}
