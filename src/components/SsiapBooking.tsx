'use client';

import { useState } from 'react';
import { TrainingDatesPricingSection, type TrainingDatesPricingSession } from './TrainingDatesPricingSection';
import { ssiapRegistrationHref, type SsiapFormula } from '@/lib/ssiap-registration';
import styles from './SsiapReferencePage.module.css';

export function SsiapBooking({ sessions }: { sessions: TrainingDatesPricingSession[] }) {
  const [formula, setFormula] = useState<SsiapFormula>('ssiap-1');
  return <div id="dates-tarifs" className={styles.booking}>
    <div className={styles.container}>
      <p className={styles.eyebrow}>Votre inscription · 01 / La formule</p>
      <h2 className={styles.sectionTitle}>Le bon parcours.<br /><em>Le tarif expliqué.</em></h2>
      <p className={styles.intro}>Choisissez votre formule, puis la session qui vous convient. Notre équipe vérifie votre dossier et confirme les dates avant votre inscription.</p>
      <fieldset className={styles.formulas}>
        <legend className="sr-only">Choisissez votre formule SSIAP 1</legend>
        <label className={styles.formula} data-selected={formula === 'ssiap-1'}>
          <input type="radio" name="ssiap-formule" value="ssiap-1" checked={formula === 'ssiap-1'} onChange={() => setFormula('ssiap-1')} />
          <span className={styles.eyebrow}>Formule essentielle</span><strong>SSIAP 1</strong>
          <span>Pour les candidats dont la qualification de secourisme est déjà en cours de validité.</span>
          <b>980 €</b><small>Formation SSIAP 1 · examen final</small>
        </label>
        <label className={styles.formula} data-selected={formula === 'ssiap-1-sst'}>
          <input type="radio" name="ssiap-formule" value="ssiap-1-sst" checked={formula === 'ssiap-1-sst'} onChange={() => setFormula('ssiap-1-sst')} />
          <span className={styles.eyebrow}>Formule complète</span><strong>SSIAP 1 + SST</strong>
          <span>Pour obtenir ou renouveler votre qualification de secourisme avant la formation SSIAP.</span>
          <b>1 230 €</b><small>SSIAP 1 : 980 € + option SST : 250 €</small>
        </label>
      </fieldset>
      <p className={styles.selection} aria-live="polite"><span aria-hidden="true">✓</span> Votre choix : <strong>{formula === 'ssiap-1' ? 'SSIAP 1 · 980 €' : 'SSIAP 1 + SST · 1 230 €'}</strong></p>
      <p className={styles.small}>Les sessions intitulées « avec SST » incluent une période de secourisme dans leur calendrier. Si vous choisissez le SSIAP 1 seul, votre conseiller vous précise les dates de présence correspondant à votre parcours.</p>
    </div>
    <TrainingDatesPricingSection
      id="sessions-ssiap" eyebrow="02 / Les dates" sessions={sessions}
      theme="red" seatCapacity={12} defaultPrice="980 €" summaryPrice={formula === 'ssiap-1' ? '980 €' : '1 230 €'} defaultLocation="Puget-sur-Argens"
      showSessionPrice={false}
      intro="Retrouvez les dates de formation, l’examen et les disponibilités. Votre choix de formule accompagne la session sélectionnée sur la page de contact."
      priceDescription="Formation SSIAP 1 · examen final · option SST disponible (+250 €, soit 1 230 € avec SST)"
      benefits={['CPF', 'France Travail', 'Option SSIAP 1 + SST', 'Paiement x3 / x4 / x10']}
      registrationHref={session => ssiapRegistrationHref(session, formula)}
      priceAction={{ href: '/contact?formation=ssiap-1&objet=financement%20SSIAP%201', label: 'Étudier mon financement →' }}
    />
  </div>;
}
