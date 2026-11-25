import Image from 'next/image';
import type { ManualIllustration } from '@/data/manualIllustrations';
import type { ReactNode } from 'react';
import styles from './ApsReferencePage.module.css';

type PracticeCard = { icon: ReactNode; title: string; text: string; afterVisuals?: ReactNode; visuals: { kind: string; illustration: ReactNode }[] };

export function TrainingPracticeArtwork({ illustration, focus = '50% 45%' }: { illustration: ManualIllustration; focus?: string }) {
  return <div className={styles.landscapeArtwork}>
    <Image {...illustration} fill style={{ objectPosition: focus }} sizes="(max-width: 767px) 90vw, 540px" />
  </div>;
}

export function TrainingPracticeCards({ items, columns = 2, iconClassName = 'bg-academy-gold text-academy-gold-text' }: { items: PracticeCard[]; columns?: 2 | 3; iconClassName?: string }) {
  return <div className={`grid gap-5 ${columns === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2'}`}>
    {items.map(({ icon, title, text, visuals, afterVisuals }, index) => (
      <article key={title} className={`${styles.practicalCard} rounded-[1.5rem] border border-white/10 bg-white/7 p-5`}>
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            <span aria-hidden="true" className={`${styles.practicalIcon} grid h-10 w-10 place-items-center rounded-xl font-black ${iconClassName}`}>{icon}</span>
            <span className="text-[.58rem] font-black tracking-[.16em] text-white/30">{String(index + 1).padStart(2, '0')}</span>
          </div>
          <h3 className="mt-4 text-lg font-black">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/60">{text}</p>
          <div className={styles.practicalVisuals} data-visual-count={visuals.length}>
            {visuals.map(({ kind, illustration }) => <div key={kind} className={styles.practicalVisual} data-visual={kind}>{illustration}</div>)}
          </div>
          {afterVisuals}
        </div>
      </article>
    ))}
  </div>;
}
