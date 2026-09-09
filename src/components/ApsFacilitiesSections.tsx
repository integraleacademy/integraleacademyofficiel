import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { listApsPhotos } from '@/lib/aps-gallery-data';
import type { ApsPhoto } from '@/lib/aps-gallery';
import styles from './ApsFacilitiesSections.module.css';

const equipment = [
  ['01', 'Système de sécurité incendie', 'Notre SSI permet de repérer une alarme incendie et de travailler la mise en sécurité.'],
  ['02', 'Alarme intrusion & détecteurs', 'Une centrale reliée à des détecteurs pour apprendre à identifier une alerte et effectuer une levée de doute.'],
  ['03', 'Vidéosurveillance', 'Des caméras et un poste de visionnage pour surveiller les images depuis notre PC sécurité.'],
  ['04', 'Radios & PTI / DATI', 'Des émetteurs-récepteurs et un dispositif de protection du travailleur isolé pour communiquer et donner l’alerte.'],
  ['05', 'Matériel de contrôle d’accès', 'Une armoire à clés, des badges, des registres visiteurs et un détecteur de métaux portatif.'],
  ['06', 'Rondes & main courante', 'Un parcours avec points de contrôle, des consignes et une main courante pour tracer les événements.'],
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
          <h2 id="pc-securite-title">Un PC sécurité équipé.<br /><span>Du matériel à prendre en main.</span></h2>
          <p>Notre centre de formation à Puget-sur-Argens dispose d’un poste central de sécurité dédié à la formation APS. SSI, alarme intrusion, vidéosurveillance, radios : vous utilisez sur place les équipements que vous retrouverez dans vos missions.</p>
        </div>
        <div className={styles.securityLayout}>
          <div>
            {pcPhotos.length ? <PhotoGallery photos={pcPhotos} label="Photos du PC sécurité" /> : <div className={styles.pcIllustration}>
              <div className={styles.pcIllustrationTitle}><span className={styles.dot} />Prendre en main le poste de sécurité</div>
              <div className={styles.motion}>{pcFallback}</div>
              <p>Observer · Alerter · Coordonner · Rendre compte</p>
            </div>}
            <p className={styles.trainingNote}>Dans notre PC sécurité, vous vous entraînez à recevoir une alarme, consulter les images, transmettre une consigne et renseigner la main courante.</p>
          </div>
          <div className={styles.equipment}>
            {equipment.map(([number, title, description]) => <article key={title}>
              <span className={styles.number}>{number}</span><h3>{title}</h3><p>{description}</p>
            </article>)}
          </div>
        </div>
        <p className={styles.regulationNote}>Le PC sécurité et ces moyens de surveillance font partie des équipements pédagogiques prévus par l’<a href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000050398597" target="_blank" rel="noopener noreferrer">article 12 de l’arrêté du 23 octobre 2024 du ministère de l’Intérieur</a>.</p>
      </div>
    </section>
    <section id="ecole-aps" aria-labelledby="ecole-aps-title" className={`${styles.section} ${styles.school}`}>
      <div className={`page-container ${styles.schoolLayout}`}>
        <div className={styles.schoolCopy}>
          <p className={styles.eyebrow}>Votre école sur la Côte d’Azur</p>
          <h2 id="ecole-aps-title">Bienvenue chez<br /><span>Intégrale Academy.</span></h2>
          <p>Fondée en 2018, notre école vous accueille à Puget-sur-Argens (Var, Côte d'Azur), pour vous préparer aux métiers de la sécurité privée. Salles de cours, espace informatique et espaces de mise en situation. Vous alternez les apports théoriques et la pratique. Notre équipe vous accompagne dans votre projet, vos démarches et votre parcours de formation.</p>
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
