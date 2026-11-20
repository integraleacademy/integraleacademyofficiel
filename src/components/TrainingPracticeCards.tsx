import type { ReactNode } from 'react';
import styles from './ApsReferencePage.module.css';

type PracticeCard = { icon: ReactNode; title: string; text: string; visuals: { kind: string; illustration: ReactNode }[] };

export function TrainingPracticeCards({ items }: { items: PracticeCard[] }) {
  return <div className="grid gap-5 md:grid-cols-2">
    {items.map(({ icon, title, text, visuals }, index) => (
      <article key={title} className={`${styles.practicalCard} rounded-[1.5rem] border border-white/10 bg-white/7 p-5`}>
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            <span aria-hidden="true" className={`${styles.practicalIcon} grid h-10 w-10 place-items-center rounded-xl bg-academy-gold font-black text-academy-gold-text`}>{icon}</span>
            <span className="text-[.58rem] font-black tracking-[.16em] text-white/30">{String(index + 1).padStart(2, '0')}</span>
          </div>
          <h3 className="mt-4 text-lg font-black">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/60">{text}</p>
          <div className={styles.practicalVisuals} data-visual-count={visuals.length}>
            {visuals.map(({ kind, illustration }) => <div key={kind} className={styles.practicalVisual} data-visual={kind}>{illustration}</div>)}
          </div>
        </div>
      </article>
    ))}
  </div>;
}
