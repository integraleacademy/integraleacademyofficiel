import { TrainingMotionIllustration, type SceneKind } from '@/components/TrainingMotionGallery';
import styles from './TrainingIllustratedCards.module.css';
import type { ManualIllustrationMap } from '@/data/manualIllustrations';
import { ManualArtwork } from '@/components/ManualArtwork';

export type TrainingIllustratedCard = {
  number?: string;
  label?: string;
  title: string;
  description: string;
  wide?: boolean;
  scenes: readonly { kind: SceneKind; description: string }[];
};

export function TrainingIllustratedCards({ items, theme, illustrations, singleIllustration = false, threeColumns = false }: {
  items: readonly TrainingIllustratedCard[];
  theme: 'blue' | 'orange' | 'violet' | 'bts';
  illustrations?: ManualIllustrationMap;
  singleIllustration?: boolean;
  threeColumns?: boolean;
}) {
  return <div className={`${styles.cards} ${styles[theme]} ${threeColumns ? styles.threeColumns : ''}`}>
    {items.map((item, index) => <article key={item.title} className={`${styles.card} ${item.wide ? styles.wide : ''}`}>
      <div className={styles.cardHeading}>
        <span className={styles.number}>{item.number ?? String(index + 1).padStart(2, '0')}</span>
        {item.label && <span className={styles.label}>{item.label}</span>}
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className={`${styles.visuals} ${singleIllustration ? styles.singleIllustration : ''}`}>
        {(singleIllustration ? item.scenes.slice(0, 1) : item.scenes).map(scene => {
          const illustration = illustrations?.[scene.kind];
          return <div key={scene.kind} className={`${styles.visual} ${illustration ? styles.naturalVisual : ''}`}>
            {illustration ? <ManualArtwork illustration={illustration} natural
              sizes={threeColumns ? '(max-width: 767px) 92vw, (max-width: 1199px) 46vw, 400px' : '(max-width: 767px) 92vw, 600px'} />
              : <TrainingMotionIllustration kind={scene.kind} theme={theme} description={scene.description} />}
          </div>;
        })}
      </div>
    </article>)}
  </div>;
}
