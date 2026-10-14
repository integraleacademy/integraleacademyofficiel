'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import school from './ecole.module.css';
import styles from './school-gallery.module.css';

// Photographies du centre de Puget-sur-Argens, issues de integraleacademy.com/ecole.
const photos = [
  { src: 'salle-formation', width: 1600, height: 1066, title: 'Les salles de formation', alt: 'Salle de cours du centre de Puget-sur-Argens avec des tables, des chaises et un vidéoprojecteur', source: '008e7b_08681131e7ca4b03a191d9a6ccd69d2a~mv2.jpg' },
  { src: 'salle-reunion', width: 1600, height: 1131, title: 'Se réunir & échanger', alt: 'Salle de réunion Intégrale Academy avec une grande table et un écran mural', source: '008e7b_1ba5048f9beb48cda478fc253e4e5ed0~mv2.jpg' },
  { src: 'espace-detente', width: 1600, height: 1162, title: 'L’espace détente', alt: 'Espace détente du centre avec un distributeur de boissons et de snacks et des équipements de cuisine', source: '008e7b_aa4690b73d4a42c491451240a1eaadf8~mv2.jpg' },
  { src: 'accueil-centre', width: 1600, height: 805, title: 'Bienvenue au centre', alt: 'Comptoir d’accueil et tableaux colorés dans le centre de formation de Puget-sur-Argens', source: '008e7b_29e7fe776cd548b7b02c4745e6ffae01~mv2.jpg' },
  { src: 'espaces-communs', width: 1600, height: 1180, title: 'Les espaces communs', alt: 'Espaces de circulation et table commune à l’intérieur du centre Intégrale Academy', source: '008e7b_b851a1102333428f80ab89648cea5fd0~mv2.jpg' },
  { src: 'salle-lumineuse', width: 1600, height: 1091, title: 'Un cadre pour apprendre', alt: 'Salle de formation lumineuse équipée de tables, d’un tableau et de la climatisation', source: '008e7b_bb2fbe808bfe4e4fb11893485034228f~mv2.jpg' },
];

function GalleryIcon({ kind }: { kind: 'expand' | 'next' | 'previous' | 'close' }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={kind === 'expand' ? 'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5' : kind === 'next' ? 'm9 5 7 7-7 7' : kind === 'previous' ? 'm15 5-7 7 7 7' : 'm6 6 12 12M6 18 18 6'} /></svg>;
}

export function SchoolGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  function open(index: number, button: HTMLButtonElement) { opener.current = button; setSelected(index); }
  function close() { setSelected(null); requestAnimationFrame(() => opener.current?.focus({ preventScroll: true })); }

  return <section id="photos" className={`${school.section} ${styles.gallery}`} aria-labelledby="gallery-title">
    <div className={school.container}>
      <div className={school.sectionHeading}>
        <div><p className={school.eyebrow}>À l’intérieur du centre · Puget-sur-Argens</p><h2 id="gallery-title">Votre quotidien,<br /><em>à l’école.</em></h2></div>
        <p>Des salles pour apprendre, des espaces pour échanger et un coin pour souffler. Découvrez les lieux qui vous accueillent pendant votre formation.</p>
      </div>
      <div className={styles.mosaic}>
        {photos.slice(0, 5).map((photo, index) => <button key={photo.src} type="button" className={styles.photo} onClick={event => open(index, event.currentTarget)} aria-label={`Agrandir : ${photo.title}`}>
          <Image src={`/images/campus/${photo.src}.webp`} alt={photo.alt} width={photo.width} height={photo.height} sizes={index === 0 ? '(max-width: 800px) 100vw, 50vw' : '(max-width: 800px) 50vw, 25vw'} />
          <span className={styles.photoCaption}>{photo.title}<GalleryIcon kind="expand" /></span>
        </button>)}
      </div>
      <div className={styles.galleryFooter}><p>Notre centre de formation · Côte d’Azur</p><button type="button" onClick={event => open(0, event.currentTarget)}>Voir les {photos.length} photos <GalleryIcon kind="expand" /></button></div>
    </div>
    {selected !== null && createPortal(<PhotoDialog selected={selected} onSelect={setSelected} onClose={close} />, document.body)}
  </section>;
}

function PhotoDialog({ selected, onSelect, onClose }: { selected: number; onSelect: (index: number) => void; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const photo = photos[selected];
  const previous = () => onSelect((selected - 1 + photos.length) % photos.length);
  const next = () => onSelect((selected + 1) % photos.length);
  useEffect(() => {
    const node = dialog.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    node?.showModal();
    return () => { node?.close(); document.body.style.overflow = overflow; };
  }, []);
  return <dialog ref={dialog} className={styles.dialog} aria-labelledby="school-gallery-title" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }} onKeyDown={event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); next(); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); previous(); }
  }}>
    <div className={styles.dialogHeader}><div><p>Intégrale Academy · Puget-sur-Argens</p><h2 id="school-gallery-title">Le centre en images</h2></div><button type="button" onClick={onClose} aria-label="Fermer les photos" autoFocus><GalleryIcon kind="close" /></button></div>
    <figure>
      <div className={styles.fullPhoto}><Image key={photo.src} src={`/images/campus/${photo.src}.webp`} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 1120px) 95vw, 1080px" /></div>
      <figcaption className={styles.dialogFooter}>
        <div aria-live="polite" aria-atomic="true"><strong>{photo.title}</strong><span>Photo {selected + 1} sur {photos.length}</span></div>
        <div className={styles.photoNavigation}><button type="button" onClick={previous} aria-label="Photo précédente"><GalleryIcon kind="previous" /></button><button type="button" onClick={next} aria-label="Photo suivante"><GalleryIcon kind="next" /></button></div>
      </figcaption>
    </figure>
  </dialog>;
}
