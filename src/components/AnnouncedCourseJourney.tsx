'use client';

import type { ReactNode } from 'react';
import { TrainingJourney, type TrainingJourneyTheme } from './TrainingJourney';
import styles from './AnnouncedCoursePage.module.css';

export type CourseJourneyChapter = {
  label: string;
  title: string;
  description: string;
  link: string;
  href: string;
  cardTitle: string;
  items: string[];
};

export function AnnouncedCourseJourney({ course, theme, chapters, children }: {
  course: string; theme: TrainingJourneyTheme; chapters: CourseJourneyChapter[]; children: ReactNode;
}) {
  return <TrainingJourney id="parcours" name={course} theme={theme} eyebrow="Votre parcours" continuationHref="#metier"
    title={<>De votre projet<br /><span>au métier</span></>}
    steps={chapters.map(chapter => ({
      ...chapter,
      visual: () => <article className={styles.journeyCard}>
        <h4>{chapter.cardTitle}</h4>
        <ul>{chapter.items.map(item => <li key={item}>{item}</li>)}</ul>
        <a href={chapter.href}>{chapter.link} <span aria-hidden="true">↗</span></a>
      </article>,
    }))}>{children}</TrainingJourney>;
}
