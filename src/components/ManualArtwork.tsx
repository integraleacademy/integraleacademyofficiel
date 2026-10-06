import Image from 'next/image';
import type { ManualIllustration } from '@/data/manualIllustrations';
import styles from './ManualArtwork.module.css';

export function ManualArtwork({ illustration, priority = false, className = '' }: {
  illustration: ManualIllustration;
  priority?: boolean;
  className?: string;
}) {
  return <div className={`${styles.artwork} ${className}`}>
    <Image src={illustration.src} alt={illustration.alt} fill priority={priority}
      sizes="(max-width: 767px) 92vw, (max-width: 1023px) 70vw, 600px" />
  </div>;
}
