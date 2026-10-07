'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './financements.module.css';

const profiles = [
  { id: 'employee', label: 'Je suis salarié', hint: 'Évolution ou reconversion', description: 'Votre CPF et un financement par votre employeur sont deux pistes à explorer, selon la formation et votre projet.', links: [{ label: 'Découvrir le CPF', href: '/financements/cpf' }, { label: 'Entreprise & OPCO', href: '/entreprises' }] },
  { id: 'jobseeker', label: 'Je recherche un emploi', hint: 'Un nouveau départ professionnel', description: 'Échangez avec votre conseiller France Travail sur votre projet. Vos droits CPF peuvent aussi être étudiés pour une formation éligible.', links: [{ label: 'France Travail', href: '/financements/france-travail' }, { label: 'Découvrir le CPF', href: '/financements/cpf' }] },
  { id: 'student', label: 'Je souhaite étudier en alternance', hint: 'Un BTS et une expérience en entreprise', description: 'Explorez nos BTS en alternance. Le financement et la rémunération dépendent du contrat et des règles applicables.', links: [{ label: 'Découvrir l’alternance', href: '/financements/alternance' }, { label: 'Voir les BTS', href: '/bts' }] },
  { id: 'other', label: 'J’ai une autre situation', hint: 'Indépendant, financement personnel…', description: 'Chaque parcours est différent. Faisons le point sur votre statut et les possibilités, y compris un règlement personnel selon les conditions de la formation.', links: [{ label: 'Parler à un conseiller', href: '#contact-financement' }, { label: 'Estimer mon budget', href: '#simulateur' }] },
];

export default function FundingProfileChooser() {
  const [selected, setSelected] = useState<string | null>(null);
  const profile = profiles.find(({ id }) => id === selected);

  return <div className={styles.profilePanel}>
    <div className={styles.profileHeader}><span className={styles.eyebrow}>Votre point de départ</span><span aria-hidden="true">↗</span></div>
    <h2 id="profile-title">Quelle est votre situation ?</h2>
    <p className={styles.profileHint}>Sélectionnez votre profil pour découvrir vos pistes.</p>
    <div className={styles.profileChoices} role="group" aria-labelledby="profile-title">
      {profiles.map((item) => <button type="button" key={item.id} aria-pressed={selected === item.id} aria-controls="profile-result" onClick={() => setSelected(item.id)}>
        <span className={styles.choiceMarker} aria-hidden="true">{selected === item.id ? '✓' : ''}</span>
        <span><strong>{item.label}</strong><small>{item.hint}</small></span>
        <span className={styles.choiceArrow} aria-hidden="true">↗</span>
      </button>)}
    </div>
    <div id="profile-result" aria-live="polite" aria-atomic="true">
      {profile ? <div className={styles.profileResult}>
        <strong>Vos premières pistes</strong>
        <p>{profile.description}</p>
        <div>{profile.links.map((link) => <Link key={link.href} href={link.href}>{link.label} <span aria-hidden="true">→</span></Link>)}</div>
        <small>À confirmer avec un conseiller, sous réserve d’éligibilité.</small>
      </div> : <p className={styles.profilePrivacy}>Une première orientation, sans formulaire à remplir.</p>}
    </div>
  </div>;
}
