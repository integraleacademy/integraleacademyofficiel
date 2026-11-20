import Link from 'next/link';
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

export function TrainingSchoolWelcome({ id, description, photos, groupLabel, groupSize, extraFooter }: {
  id: string; description: ReactNode; photos: readonly CampusPhoto[]; groupLabel: string; groupSize: string; extraFooter?: ReactNode;
}) {
  return <TrainingCampusVisit id={id} heading={<>
      <div><p className={styles.eyebrow}>Votre école sur la Côte d’Azur</p><h2 id={`${id}-title`}>Bienvenue chez<br /><em>Intégrale Academy</em></h2></div><div><p>{description}</p><Link className={styles.schoolLink} href="/ecole">Entrez, on vous fait visiter <span aria-hidden="true">↗</span></Link></div>
    </>} photos={photos} footer={<>
      <dl><div><dt>Espaces de formation</dt><dd>400 m²</dd></div><div><dt>Pour apprendre & pratiquer</dt><dd>4 salles</dd></div><div><dt>{groupLabel}</dt><dd>{groupSize}</dd></div></dl><Link href="/ecole#equipe">Rencontrer l’équipe <span aria-hidden="true">↗</span></Link>{extraFooter}
    </>} />;
}
