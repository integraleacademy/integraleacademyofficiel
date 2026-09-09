import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { listApsPhotos } from '@/lib/aps-gallery-data';
import type { ApsPhoto } from '@/lib/aps-gallery';
import styles from './ApsFacilitiesSections.module.css';

const equipment = [
  ['01', 'Vidéoprotection', 'Observer les images, repérer une situation inhabituelle et transmettre les informations utiles.'],
  ['02', 'Main courante', 'Consigner les événements, rédiger un compte rendu et assurer la traçabilité des interventions.'],
  ['03', 'Communications radio', 'Passer un message clair, recevoir une consigne et coordonner une intervention avec les autres agents.'],
  ['04', 'Rondes et contrôle d’accès', 'Préparer une ronde, contrôler les accès et travailler avec les consignes et les moyens de protection du travailleur isolé (PTI / DATI).'],
] as const;

function PhotoGallery({ photos, label }: { photos: ApsPhoto[]; label: string }) {
  return <div className={styles.gallery} data-count={photos.length} role="group" aria-label={label}>
    {photos.map((photo) => <figure key={photo.id} className={styles.photo}>
      <a href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`Agrandir la photo : ${photo.caption} (nouvel onglet)`}>
        <Image src={photo.src} alt={photo.caption} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 60vw, 40vw" unoptimized={photo.src.startsWith('/api/')} />
        <span className={styles.expand} aria-hidden="true">↗</span>
      </a>
      <figcaption>{photo.caption}</figcaption>
    </figure>)}
  </div>;
}

export async function ApsFacilitiesSections({ pcFallback }: { pcFallback: ReactNode }) {
  const { photos } = await listApsPhotos();
  const pcPhotos = photos.filter((photo) => photo.gallery === 'pc-securite');
  const uploadedSchoolPhotos = photos.filter((photo) => photo.gallery === 'ecole');
  const schoolPhotos: ApsPhoto[] = uploadedSchoolPhotos.length ? uploadedSchoolPhotos : [{
    id: 'accueil-ecole', gallery: 'ecole', slot: 1,
    src: '/images/campus/campus-accueil.jpg', caption: 'L’accueil de notre école à Puget-sur-Argens',
  }];

  return <>
    <section id="pc-securite" aria-labelledby="pc-securite-title" className={`${styles.section} ${styles.security}`}>
      <div className="page-container">
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Le PC sécurité & le matériel</p>
          <h2 id="pc-securite-title">Les outils du métier.<br /><span>Les bons réflexes, en pratique.</span></h2>
          <p>Au poste de sécurité, chaque information compte. Les mises en situation vous entraînent à surveiller, donner l’alerte, communiquer et garder une trace de vos actions, avec les équipements du métier.</p>
        </div>
        <div className={styles.securityLayout}>
          <div>
            {pcPhotos.length ? <PhotoGallery photos={pcPhotos} label="Photos du PC sécurité" /> : <div className={styles.pcIllustration}>
              <div className={styles.pcIllustrationTitle}><span className={styles.dot} />Prendre en main le poste de sécurité</div>
              <div className={styles.motion}>{pcFallback}</div>
              <p>Observer · Alerter · Coordonner · Rendre compte</p>
            </div>}
            <p className={styles.trainingNote}>Des exercices encadrés par le formateur, puis débriefés pour progresser à chaque mise en situation.</p>
          </div>
          <div className={styles.equipment}>
            {equipment.map(([number, title, description]) => <article key={title}>
              <span className={styles.number}>{number}</span><h3>{title}</h3><p>{description}</p>
            </article>)}
          </div>
        </div>
      </div>
    </section>
    <section id="ecole-aps" aria-labelledby="ecole-aps-title" className={`${styles.section} ${styles.school}`}>
      <div className={`page-container ${styles.schoolLayout}`}>
        <div className={styles.schoolCopy}>
          <p className={styles.eyebrow}>Votre école sur la Côte d’Azur</p>
          <h2 id="ecole-aps-title">Bienvenue chez<br /><span>Intégrale Academy.</span></h2>
          <p>Fondée en 2018, notre école vous accueille à Puget-sur-Argens pour préparer les métiers de la sécurité. Salles de cours, espace informatique et espaces de mise en situation : vous alternez les apports théoriques et la pratique dans un même lieu.</p>
          <p>Une équipe accessible vous accompagne dans votre projet, vos démarches et votre parcours de formation.</p>
          <div className={styles.schoolFacts}>
            <div><strong>400 m²</strong><span>dédiés à la formation</span></div>
            <div><strong>4 salles</strong><span>pour apprendre et pratiquer</span></div>
            <div><strong>12 maximum</strong><span>par session APS</span></div>
          </div>
          <Link href="/ecole" className={styles.schoolLink}>Découvrir l’école <span aria-hidden="true">↗</span></Link>
        </div>
        <PhotoGallery photos={schoolPhotos} label="Photos de l’école Intégrale Academy" />
      </div>
    </section>
  </>;
}
