import Image from 'next/image';
import type { ManualIllustration } from '@/data/manualIllustrations';
import styles from './ApsReferencePage.module.css';

export type TrainingMissionCard = {
  number?: string;
  title: string;
  description: string;
  illustration: ManualIllustration;
  featured?: boolean;
  imagePosition?: string;
};

export function TrainingMissionCards({ items }: { items: readonly TrainingMissionCard[] }) {
  return <div className={styles.missionGrid}>{items.map((item, index) => <article key={item.title} className={`${styles.missionCard} ${item.featured ? styles.missionFeatured : ''}`}>
    <div className={styles.missionArtwork}>
      <Image src={item.illustration.src} alt={item.illustration.alt} fill
        sizes="(max-width: 600px) 92vw, (max-width: 1023px) 45vw, 400px"
        style={{ objectFit: 'contain', objectPosition: item.imagePosition ?? 'center' }} />
    </div>
    <div className={styles.missionCopy}><span className={styles.missionNumber}>MISSION {item.number ?? String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.description}</p></div>
  </article>)}</div>;
}
