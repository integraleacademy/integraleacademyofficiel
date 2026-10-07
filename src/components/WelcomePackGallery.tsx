'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import styles from './ApsWelcomePack.module.css';

const views = [
  { image: 'carnet-ferme-ouvert', label: 'Fermé & ouvert', caption: 'Le carnet, sous toutes ses coutures.', alt: 'Carnet Intégrale Academy noir et doré, fermé et ouvert sur le mot de bienvenue et une page de notes', width: 1536, height: 1024 },
  { image: 'carnet-couverture', label: 'La couverture', caption: 'Faites le premier pas vers votre futur métier.', alt: 'Couverture originale du carnet : logo Intégrale Academy, grand A doré et texte « Faites le premier pas vers votre futur métier. »', width: 1092, height: 1531 },
  { image: 'carnet-bienvenue', label: 'Le mot d’accueil', caption: 'Un mot de bienvenue pour commencer.', alt: 'Page originale de bienvenue du carnet, avec le message de Clément Vaillant, directeur Intégrale Academy', width: 1092, height: 1531 },
  { image: 'carnet-notes', label: 'Les pages de notes', caption: 'De la place pour vos idées et les points à retenir.', alt: 'Page originale Mes notes : date, thème ou séquence, lignes pour écrire et encadré À retenir', width: 1092, height: 1531 },
] as const;

export function WelcomePackGallery() {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const view = views[selected];
  const src = `/images/welcome-pack/${view.image}.webp`;

  useEffect(() => {
    if (!expanded) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [expanded]);

  const changeView = (step: number) => setSelected(index => (index + step + views.length) % views.length);

  return <div className={styles.gallery}>
    <button className={styles.mainView} data-page={selected !== 0} onClick={() => setExpanded(true)} type="button" aria-label={`Agrandir : ${view.label}`}>
      <Image src={src} alt={view.alt} width={view.width} height={view.height} sizes="(max-width: 900px) 95vw, 800px" quality={90} className={styles.mainImage} />
      <span className={styles.zoomLabel}><span aria-hidden="true">⤢</span> Agrandir</span>
    </button>
    <div className={styles.galleryFooter}>
      <p className={styles.viewCaption} aria-live="polite">{view.caption}</p>
      <div className={styles.thumbnails} role="group" aria-label="Choisir une vue du carnet">
        {views.map((item, index) => <button type="button" key={item.image} aria-pressed={selected === index} onClick={() => setSelected(index)} className={styles.thumbnail}>
          <span className={styles.thumbnailImage}><Image src={`/images/welcome-pack/${item.image}.webp`} alt="" width={item.width} height={item.height} sizes="72px" /></span>
          <span>{item.label}</span>
        </button>)}
      </div>
    </div>
    <dialog ref={dialog} className={styles.dialog} aria-labelledby={titleId} onClose={() => setExpanded(false)} onClick={event => { if (event.target === event.currentTarget) setExpanded(false); }} onKeyDown={event => {
      if (event.key === 'ArrowRight') { event.preventDefault(); changeView(1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); changeView(-1); }
    }}>
      {expanded && <div className={styles.dialogContent}>
        <div className={styles.dialogHeader}>
          <div><span className={styles.detailLabel}>Le carnet Intégrale Academy</span><h3 id={titleId}>{view.label}</h3></div>
          <button type="button" onClick={() => setExpanded(false)} className={styles.closeButton} aria-label="Fermer l’aperçu">Fermer <span aria-hidden="true">×</span></button>
        </div>
        <div className={styles.dialogImage}><Image src={src} alt={view.alt} width={view.width} height={view.height} sizes="(max-width: 900px) 95vw, 1200px" quality={95} /></div>
        <div className={styles.dialogNavigation}>
          <button type="button" onClick={() => changeView(-1)} aria-label="Vue précédente"><span aria-hidden="true">←</span> Précédent</button>
          <span aria-live="polite">{selected + 1} / {views.length}</span>
          <button type="button" onClick={() => changeView(1)} aria-label="Vue suivante">Suivant <span aria-hidden="true">→</span></button>
        </div>
      </div>}
    </dialog>
  </div>;
}
