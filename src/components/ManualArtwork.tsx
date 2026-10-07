import Image from 'next/image';
import type { ManualIllustration } from '@/data/manualIllustrations';
import illustrationSizes from '@/data/manual-illustration-sizes.json';
import styles from './ManualArtwork.module.css';

export function ManualArtwork({ illustration, priority = false, natural = false, className = '', sizes = '(max-width: 767px) 92vw, (max-width: 1023px) 70vw, 600px' }: {
  illustration: ManualIllustration;
  priority?: boolean;
  natural?: boolean;
  className?: string;
  sizes?: string;
}) {
  const dimensions = illustrationSizes[illustration.src as keyof typeof illustrationSizes];
  if (natural && dimensions) {
    return <div className={`${styles.artwork} ${styles.natural} ${className}`}>
      <Image src={illustration.src} alt={illustration.alt} width={dimensions[0]} height={dimensions[1]}
        priority={priority} sizes={sizes} />
    </div>;
  }
  return <div className={`${styles.artwork} ${className}`}>
    <Image src={illustration.src} alt={illustration.alt} fill priority={priority}
      sizes={sizes} />
  </div>;
}
