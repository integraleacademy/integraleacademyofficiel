import Image from 'next/image';
import type { ReactNode } from 'react';
import styles from './ApsFacilitiesSections.module.css';

type CampusPhoto = { id: string; src: string; caption: string; alt?: string };

function PhotoGallery({ photos }: { photos: readonly CampusPhoto[] }) {
  return <div className={styles.gallery} data-count={photos.length} role="group" aria-label="Photos de l’école Intégrale Academy">
    {photos.map(photo => <figure key={photo.id} className={styles.photo}>
      <Image src={photo.src} alt={photo.alt ?? photo.caption} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 60vw, 700px" unoptimized={photo.src.startsWith('/api/')} />
      <figcaption>{photo.caption}</figcaption>
    </figure>)}
  </div>;
}

export function TrainingCampusVisit({ id, heading, photos, footer }: {
  id: string;
  heading: ReactNode;
  photos: readonly CampusPhoto[];
  footer: ReactNode;
}) {
  return <section id={id} aria-labelledby={`${id}-title`} className={`${styles.section} ${styles.school}`}>
    <div className="page-container">
      <div className={styles.heading}>{heading}</div>
      <PhotoGallery photos={photos} />
      <div className={styles.schoolFooter}>{footer}</div>
    </div>
  </section>;
}
