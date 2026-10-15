import Image from 'next/image';
import Link from 'next/link';
import { listApsPhotos } from '@/lib/aps-gallery-data';
import type { ApsPhoto } from '@/lib/aps-gallery';
import styles from './ApsFacilitiesSections.module.css';

const equipment = [
  ['video', 'Vidéoprotection', 'Consulter les images et observer les accès.'],
  ['alarm', 'SSI & alarme intrusion', 'Recevoir une alerte et appliquer la procédure.'],
  ['radio', 'Radios & téléphone', 'Transmettre une consigne claire et coordonner.'],
  ['screen', 'Main courante électronique', 'Tracer les événements et rendre compte.'],
  ['shield', 'PTI / DATI', 'Prendre en main la protection du travailleur isolé.'],
  ['route', 'Parcours de ronde', 'Contrôler les points sensibles et lever le doute.'],
] as const;

function EquipmentIcon({ kind }: { kind: typeof equipment[number][0] }) {
  return <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === 'video' ? <><rect x="5" y="7" width="30" height="23" rx="3"/><path d="M20 7v23M5 18h30M14 35h12M20 30v5"/></>
      : kind === 'alarm' ? <><rect x="8" y="4" width="24" height="32" rx="3"/><path d="M13 10h14v8H13zM14 24h2m8 0h2m-12 5h2m8 0h2"/></>
      : kind === 'radio' ? <><rect x="11" y="14" width="18" height="23" rx="3"/><path d="M14 14V3m10 11V9M16 20h8m-8 5h8m-8 5h4"/><path d="M21 3c5 0 9 4 9 8"/></>
      : kind === 'screen' ? <><rect x="4" y="6" width="32" height="24" rx="3"/><path d="M14 36h12m-6-6v6M10 13h5m5 0h9M10 19h5m5 0h9M10 25h5m5 0h9"/></>
      : kind === 'shield' ? <><path d="m20 3 14 6v10c0 9-14 18-14 18S6 28 6 19V9Z"/><path d="M20 12v9m0 5h.01"/></>
      : <><circle cx="9" cy="9" r="4"/><circle cx="31" cy="31" r="4"/><path d="M13 9h12c12 0 12 13 0 13H15c-12 0-12 9 0 9h12"/></>}
  </svg>;
}

function PhotoGallery({ photos }: { photos: ApsPhoto[] }) {
  return <div className={styles.gallery} data-count={photos.length} role="group" aria-label="Photos de l’école Intégrale Academy">
    {photos.map(photo => <figure key={photo.id} className={styles.photo}>
      <Image src={photo.src} alt={photo.caption} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 60vw, 700px" unoptimized={photo.src.startsWith('/api/')} />
      <figcaption>{photo.caption}</figcaption>
    </figure>)}
  </div>;
}

export async function ApsFacilitiesSections() {
  const { photos } = await listApsPhotos();
  const uploadedSchoolPhotos = photos.filter(photo => photo.gallery === 'ecole');
  const schoolPhotos: ApsPhoto[] = uploadedSchoolPhotos.length ? uploadedSchoolPhotos : [
    { id: 'salle-aps', gallery: 'ecole', slot: 1, src: '/images/campus/salle-formation.webp', caption: 'Des espaces pour apprendre ensemble.' },
    { id: 'accueil-aps', gallery: 'ecole', slot: 2, src: '/images/campus/accueil-centre.webp', caption: 'Un accueil, une équipe.' },
    { id: 'pause-aps', gallery: 'ecole', slot: 3, src: '/images/campus/espace-detente.webp', caption: 'Une pause entre deux ateliers.' },
  ];
  return <>
    <section id="pc-securite" aria-labelledby="pc-securite-title" className={`${styles.section} ${styles.security}`}>
      <div className="page-container">
        <div className={styles.heading}><div><p className={styles.eyebrow}>Au cœur de votre centre de formation</p><h2 id="pc-securite-title">Un PC sécurité équipé.<br /><em>Chez Intégrale Academy.</em></h2></div><p>À Puget-sur-Argens, notre centre dispose de son propre poste central de sécurité et de matériel pédagogique dédié. Vous vous entraînerez à observer, donner l’alerte et coordonner une intervention, avec les outils de vos futures missions.</p></div>
        <div className={styles.pcGallery} role="group" aria-label="Photos du PC sécurité et du matériel Intégrale Academy">
          <figure className={`${styles.pcPhoto} ${styles.pcMainPhoto}`}>
            <Image src="/images/aps/experience/pc-centre.webp" alt="Le véritable poste central de sécurité d’Intégrale Academy : poste informatique, écran de surveillance, SSI, alarme et moyens de communication" fill sizes="(max-width: 700px) 92vw, 65vw" />
            <figcaption><span>Votre PC sécurité, au centre.</span><small>Intégrale Academy · Puget-sur-Argens</small></figcaption>
          </figure>
          <figure className={styles.pcPhoto}>
            <Image src="/images/aps/experience/pc-alarme.webp" alt="Déclencheur manuel d’alarme incendie dans le centre Intégrale Academy" fill sizes="(max-width: 700px) 44vw, 35vw" />
            <figcaption>Des équipements à manipuler.</figcaption>
          </figure>
          <figure className={styles.pcPhoto}>
            <Image src="/images/aps/experience/pc-extincteurs.webp" alt="Extincteurs pédagogiques du centre de formation Intégrale Academy" fill sizes="(max-width: 700px) 44vw, 35vw" />
            <figcaption>Du matériel pour pratiquer.</figcaption>
          </figure>
        </div>
        <div className={styles.equipment}>{equipment.map(([kind, title, description]) => <article key={title}><span className={styles.equipmentIcon}><EquipmentIcon kind={kind} /></span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
        <details className={styles.regulationNote}><summary>Les équipements pédagogiques prévus pour la formation APS <span aria-hidden="true">+</span></summary><p>Le poste central de sécurité et les moyens de surveillance font partie des équipements prévus par l’<a href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000050398597" target="_blank" rel="noopener noreferrer">article 12 de l’arrêté du 23 octobre 2024</a>.</p></details>
      </div>
    </section>
    <section id="ecole-aps" aria-labelledby="ecole-aps-title" className={`${styles.section} ${styles.school}`}>
      <div className="page-container">
        <div className={styles.heading}><div><p className={styles.eyebrow}>Votre école sur la Côte d’Azur</p><h2 id="ecole-aps-title">Bienvenue chez<br /><em>Intégrale Academy.</em></h2></div><div><p>Depuis 2018, notre équipe vous accueille à Puget-sur-Argens. Des salles de cours aux espaces de pratique, vous apprenez dans une école à taille humaine.</p><Link className={styles.schoolLink} href="/ecole">Entrez, on vous fait visiter <span aria-hidden="true">↗</span></Link></div></div>
        <PhotoGallery photos={schoolPhotos} />
        <div className={styles.schoolFooter}><dl><div><dt>Espaces de formation</dt><dd>400 m²</dd></div><div><dt>Pour apprendre & pratiquer</dt><dd>4 salles</dd></div><div><dt>Par session APS</dt><dd>12 maximum</dd></div></dl><Link href="/ecole#equipe">Rencontrer l’équipe <span aria-hidden="true">↗</span></Link></div>
      </div>
    </section>
  </>;
}
