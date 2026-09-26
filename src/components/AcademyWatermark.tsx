import { AcademyMonogram } from './AcademyMonogram';
import styles from './AcademyWatermark.module.css';

type MonogramTone = 'gold' | 'blue' | 'green' | 'orange' | 'red' | 'violet' | 'bts';

/** Place inside a positioned, isolated hero so the motif stays behind its content. */
export function AcademyWatermark({
  tone = 'gold',
  surface = 'auto',
  placement = 'left',
}: {
  tone?: MonogramTone;
  surface?: 'auto' | 'dark';
  placement?: 'left' | 'right';
}) {
  return (
    <div
      className={styles.watermark}
      data-academy-watermark=""
      data-tone={tone}
      data-surface={surface}
      data-placement={placement}
      aria-hidden="true"
    >
      <AcademyMonogram className={styles.symbol} />
    </div>
  );
}
