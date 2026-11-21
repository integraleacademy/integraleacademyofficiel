'use client';

import { useState } from 'react';
import { TrainingDatesPricingSection, type TrainingDatesPricingSession } from './TrainingDatesPricingSection';
import { ssiapRegistrationHref, ssiapSessionFormula, type SsiapFormula } from '@/lib/ssiap-registration';
import styles from './SsiapReferencePage.module.css';

export function SsiapBooking({ sessions }: { sessions: TrainingDatesPricingSession[] }) {
  const [formula, setFormula] = useState<SsiapFormula>('ssiap-1');
  const matchingSessions = sessions.filter(session => {
    const scheduled = ssiapSessionFormula(session.title);
    return !scheduled || scheduled === formula;
  });
  const price = formula === 'ssiap-1' ? '980 €' : '1 230 €';
  return <TrainingDatesPricingSection
    id="dates-tarifs" eyebrow="08 — Dates & tarifs" compact
    sessions={matchingSessions} defaultPrice={price} summaryPrice={price} theme="red" seatCapacity={12}
    showSessionPrice={false} showDeliveryPeriods deliveryMode="in-person" defaultLocation="Puget-sur-Argens"
    inPersonPeriodFallback="67 heures de SSIAP 1 en présentiel, hors examen et déplacements"
    intro="Choisissez votre formule, puis la session qui vous convient. Notre équipe vérifie votre dossier et confirme les dates avant votre inscription."
    priceDescription="Formation SSIAP 1 · examen final · option SST disponible (+250 €, soit 1 230 € avec SST)"
    registrationHref={session => ssiapRegistrationHref(session, formula)}
    priceAction={{ href: '/contact?formation=ssiap-1&objet=financement%20SSIAP%201', label: 'Étudier mon financement →' }}
    emptyAction={{ href: ssiapRegistrationHref(null, formula), label: 'Recevoir les prochaines dates →' }}
    sessionControls={<>
      <p className={styles.eyebrow}>Votre inscription · 01 / La formule</p>
      <h3 className="mt-2 text-2xl font-bold">Le bon parcours. <em>Le tarif expliqué</em></h3>
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
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2"><p className={styles.selection} aria-live="polite"><span aria-hidden="true">✓</span> Votre choix : <strong>{formula === 'ssiap-1' ? 'SSIAP 1' : 'SSIAP 1 + SST'} · {price}</strong></p><a className={styles.textLink} href="#sessions-ssiap">Choisir ma session ↓</a></div>
      <p className={styles.small}>Les dates ci-dessous correspondent à votre formule. Avec le SST, la formation commence plus tôt pour inclure les journées de secourisme.</p>
      <div id="sessions-ssiap" className="mb-5 mt-8 scroll-mt-36">
        <p className={styles.eyebrow}>02 / Les dates</p>
        <p className="mt-2 text-sm text-academy-muted">Retrouvez les dates de formation, l’examen et les disponibilités. Votre choix de formule accompagne la session sélectionnée sur la page de contact.</p>
      </div>
    </>}
  />;
}
