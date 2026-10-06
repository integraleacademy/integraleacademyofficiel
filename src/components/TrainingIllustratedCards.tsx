import { TrainingMotionIllustration, type SceneKind } from '@/components/TrainingMotionGallery';
import styles from './TrainingIllustratedCards.module.css';
import type { ManualIllustrationMap } from '@/data/manualIllustrations';

export type TrainingIllustratedCard = {
  number?: string;
  label?: string;
  title: string;
  description: string;
  wide?: boolean;
  scenes: readonly { kind: SceneKind; description: string }[];
};

export function TrainingIllustratedCards({ items, theme, illustrations }: {
  items: readonly TrainingIllustratedCard[];
  theme: 'blue' | 'orange' | 'violet' | 'bts';
  illustrations?: ManualIllustrationMap;
}) {
  return <div className={`${styles.cards} ${styles[theme]}`}>
    {items.map((item, index) => <article key={item.title} className={`${styles.card} ${item.wide ? styles.wide : ''}`}>
      <div className={styles.cardHeading}>
        <span className={styles.number}>{item.number ?? String(index + 1).padStart(2, '0')}</span>
        {item.label && <span className={styles.label}>{item.label}</span>}
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className={styles.visuals}>
        {item.scenes.map(scene => <div key={scene.kind} className={styles.visual}>
          <TrainingMotionIllustration kind={scene.kind} theme={theme} description={scene.description} illustration={illustrations?.[scene.kind]} />
        </div>)}
      </div>
    </article>)}
  </div>;
}
