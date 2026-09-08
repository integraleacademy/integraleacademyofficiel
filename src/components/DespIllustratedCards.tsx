import { TrainingMotionIllustration, type SceneKind } from '@/components/TrainingMotionGallery';
import styles from './DespIllustratedCards.module.css';

export type DespIllustratedCard = {
  title: string;
  description: string;
  scenes: readonly { kind: SceneKind; description: string }[];
};

export function DespIllustratedCards({ items }: { items: readonly DespIllustratedCard[] }) {
  return <div className={styles.cards}>
    {items.map((item, index) => <article key={item.title} className={styles.card}>
      <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className={styles.visuals}>
        {item.scenes.map(scene => <div key={scene.kind} className={styles.visual}>
          <TrainingMotionIllustration kind={scene.kind} theme="orange" description={scene.description} />
        </div>)}
      </div>
    </article>)}
  </div>;
}
