'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ApsExperience.module.css';

const slides = [
  { src: '/images/aps/experience/elearning-cours.webp', label: 'Le cours', title: 'Comprendre avec des cours illustrés', description: 'Des situations concrètes pour découvrir les notions et les gestes du métier.', alt: 'Extrait réel du cours APS : comprendre sa mission, avec une illustration et les limites d’intervention' },
  { src: '/images/aps/experience/elearning-exercice.webp', label: 'Les exercices', title: 'Tester vos réflexes, puis comprendre', description: 'Vous choisissez une réponse et retrouvez le corrigé expliqué pour progresser.', alt: 'Exercice de la plateforme APS : choisir la bonne réaction face à une demande qui dépasse la mission' },
  { src: '/images/aps/experience/elearning-parcours.webp', label: 'Votre progression', title: 'Retrouver chaque étape du parcours', description: 'Les modules et leur avancement restent visibles dans votre espace de formation.', alt: 'Aperçu réel des modules e-learning APS avec leurs titres et leurs indicateurs de progression' },
];

export function ApsElearningPreview() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  const go = (offset: number) => setActive(index => (index + offset + slides.length) % slides.length);

  return <div className={styles.demoPreview} role="region" aria-roledescription="carrousel" aria-label="Découvrez notre plateforme e-learning">
    <div className={styles.browserBar}><span aria-hidden="true">● ● ●</span><span>Votre espace e-learning APS</span><span>APERÇU RÉEL</span></div>
    <div className={styles.slideChoices} role="group" aria-label="Choisir un aperçu">{slides.map((item,index) => <button key={item.label} type="button" aria-pressed={active === index} aria-controls="aps-elearning-slide" onClick={() => setActive(index)}>{item.label}</button>)}</div>
    <div id="aps-elearning-slide" className={styles.elearningSlide} role="group" aria-roledescription="diapositive" aria-label={`${active + 1} sur ${slides.length}`}>
      <div className={styles.slideScreen}><Image src={slide.src} alt={slide.alt} width={1120} height={750} sizes="(max-width: 800px) 92vw, 800px" /></div>
      <div className={styles.slideCaption} aria-live="polite" aria-atomic="true"><h4>{slide.title}</h4><p>{slide.description}</p></div>
    </div>
    <div className={styles.slideControls}><span>Captures de notre espace de démonstration</span><div><button type="button" onClick={() => go(-1)} aria-label="Aperçu précédent">←</button><span aria-hidden="true">0{active + 1} / 03</span><button type="button" onClick={() => go(1)} aria-label="Aperçu suivant">→</button></div></div>
  </div>;
}
