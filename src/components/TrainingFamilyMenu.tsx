'use client';

import Link from 'next/link';
import { useId, useLayoutEffect, useRef, useState } from 'react';
import { trainingNavigation, type TrainingMenuFamily } from '@/data/navigation';
import { TrainingStatusBadge } from './TrainingStatusBadge';
import styles from './TrainingFamilyMenu.module.css';

const pictograms: Record<TrainingMenuFamily['icon'], string> = {
  security: 'M12 3 4.5 6v5.6c0 4.7 4.1 7.7 7.5 9.4 3.4-1.7 7.5-4.7 7.5-9.4V6L12 3Z M8.8 11.9l2.2 2.2 4.4-4.6',
  vtc: 'M4.5 10 6.6 5.7h10.8l2.1 4.3 M3.5 11.5c0-.8.6-1.5 1.5-1.5h14c.9 0 1.5.7 1.5 1.5v5.2h-17z M5.5 17v2.2 M18.5 17v2.2 M6.5 13.5h2 M15.5 13.5h2',
  bts: 'm2 8 10-4.5L22 8l-10 4.5L2 8Z M6 10v5.3c3.7 2.6 8.3 2.6 12 0V10 M21.5 8.4v6',
  bachelors: 'M4 4h13a2 2 0 0 1 2 2v7 M4 4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h7 M6 8h9 M6 11h5 M15 17l-.8 4.1 2.8-1.5 2.8 1.5L19 17 M20.3 14.5a3.3 3.3 0 1 1-6.6 0 3.3 3.3 0 0 1 6.6 0Z',
  masteres: 'M8 6h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z M9 3v3m6-3v3m-6 12v3m6-3v3M3 9h3m-3 6h3m12-6h3m-3 6h3 M9 13l2-3 2 4 2-3',
  'titres-professionnels': 'M8.5 7V5.5c0-.9.6-1.5 1.5-1.5h4c.9 0 1.5.6 1.5 1.5V7 M4.5 7h15A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-9A1.5 1.5 0 0 1 4.5 7Z M3 11c5 3 13 3 18 0 M10 12.8v2.7h4v-2.7',
};

function Arrow({ back = false }: { back?: boolean }) {
  return <svg className={styles.arrow} aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d={back ? 'M16 10H4m5-5-5 5 5 5' : 'M4 10h12m-5-5 5 5-5 5'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Pictogram({ family }: { family: TrainingMenuFamily }) {
  return <span className={styles.icon} data-family={family.icon} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinejoin="round" strokeLinecap="round"><path d={pictograms[family.icon]} /></svg></span>;
}

function FamilyCard({ family }: { family: TrainingMenuFamily }) {
  return <><Pictogram family={family} /><span className={styles.cardCopy}><strong>{family.label}</strong><small>{family.description}</small></span><Arrow /></>;
}

function CourseList({ family, onNavigate }: { family: TrainingMenuFamily; onNavigate: () => void }) {
  return <>
    <ul className={styles.courses}>
      {family.courses.map(course => {
        const content = <><span>{course.label}</span>{course.status && <TrainingStatusBadge status={course.status} />}<Arrow /></>;
        return <li key={course.href}>
          {course.href.startsWith('/#')
            ? <a href={course.href} onClick={onNavigate} className={styles.course}>{content}</a>
            : <Link href={course.href} onClick={onNavigate} className={styles.course}>{content}</Link>}
        </li>;
      })}
    </ul>
    <a href={family.href} onClick={onNavigate} className={styles.seeFamily}>Voir la rubrique sur l’accueil <Arrow /></a>
  </>;
}

export function TrainingFamilyMenu({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate: () => void }) {
  const id = useId();
  const [selected, setSelected] = useState<number | null>(null);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const back = useRef<HTMLButtonElement>(null);
  const lastCard = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (selected !== null) {
      lastCard.current = selected;
      back.current?.focus();
    } else if (lastCard.current !== null) {
      cards.current[lastCard.current]?.focus();
    }
  }, [selected]);

  if (mobile) return <div className={styles.mobileFamilies}>
    {trainingNavigation.map(family => <details key={family.href} name={id}>
      <summary className={styles.family}><FamilyCard family={family} /></summary>
      <div className={styles.mobileList}><CourseList family={family} onNavigate={onNavigate} /></div>
    </details>)}
  </div>;

  return <>
    <div role="group" aria-label="Familles de formations" className={styles.families} hidden={selected !== null}>
      {trainingNavigation.map((family, index) => <button type="button" key={family.href} className={styles.family}
        ref={element => { cards.current[index] = element; }} aria-expanded={selected === index} aria-controls={`${id}-list-${index}`}
        onClick={() => setSelected(index)}><FamilyCard family={family} /></button>)}
    </div>
    {trainingNavigation.map((family, index) => <section key={family.href} id={`${id}-list-${index}`} aria-labelledby={`${id}-label-${index}`} hidden={selected !== index} className={styles.panel}>
      <button type="button" ref={selected === index ? back : undefined} className={styles.back} onClick={() => setSelected(null)}><Arrow back /> Toutes les formations</button>
      <h2 id={`${id}-label-${index}`}><Pictogram family={family} />{family.label}</h2>
      <CourseList family={family} onNavigate={onNavigate} />
    </section>)}
  </>;
}
