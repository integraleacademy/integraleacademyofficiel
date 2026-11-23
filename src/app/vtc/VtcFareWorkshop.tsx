'use client';

import { useState } from 'react';
import styles from './vtc.module.css';

const inputs = [
  { name: 'outward', label: 'Trajet avec le client (km)', initial: '28' },
  { name: 'returnTrip', label: 'Retour à vide (km)', initial: '28' },
  { name: 'kmCost', label: 'Coût du véhicule (€/km)', initial: '0.45' },
  { name: 'minutes', label: 'Durée totale, attente et retour compris (min)', initial: '90' },
  { name: 'hourly', label: 'Valeur de votre temps (€/h)', initial: '25' },
  { name: 'extras', label: 'Stationnement et péages (€)', initial: '8' },
] as const;
const currency = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

export function VtcFareWorkshop() {
  const [values, setValues] = useState<Record<string, string>>(() => Object.fromEntries(inputs.map(item => [item.name, item.initial])));
  const valid = inputs.every(({ name }) => values[name] !== '' && Number.isFinite(Number(values[name])) && Number(values[name]) >= 0);
  const vehicle = (Number(values.outward) + Number(values.returnTrip)) * Number(values.kmCost);
  const time = Number(values.minutes) * Number(values.hourly) / 60;
  const extras = Number(values.extras);
  return <section id="premiere-course" className={styles.workshop} aria-labelledby="atelier-titre">
    <div className={styles.wrap}>
      <header className={styles.sectionIntro}><p className={styles.label}>Atelier pratique</p>
        <h2 id="atelier-titre">Votre première course sur la Côte d’Azur</h2>
        <p>Un hôtel de Cannes vous demande un devis pour accueillir un client à l’aéroport de Nice. Votre véhicule doit ensuite rentrer à vide. Quel montant proposeriez-vous&nbsp;?</p>
      </header>
      <div className={styles.workGrid}>
        <fieldset className={styles.workInputs}><legend>Faites varier les hypothèses</legend>
          <p>Les valeurs de départ sont un exemple pédagogique. Remplacez-les par vos propres chiffres.</p>
          <div>{inputs.map(({ name, label }) => <label key={name}>{label}<input type="number" inputMode="decimal" min="0" step="any" value={values[name]} onChange={event => setValues({ ...values, [name]: event.target.value })} /></label>)}</div>
        </fieldset>
        <div className={styles.fareResult}><p>Votre base de devis</p><output aria-live="polite" aria-atomic="true">{valid ? currency.format(vehicle + time + extras) : 'À compléter'}</output>
          {valid && <dl><div><dt>Coût du véhicule aller et retour</dt><dd>{currency.format(vehicle)}</dd></div>
            <div><dt>Valeur du temps mobilisé</dt><dd>{currency.format(time)}</dd></div><div><dt>Stationnement et péages</dt><dd>{currency.format(extras)}</dd></div></dl>}
          <small>Ce calcul pédagogique précède l’ajout éventuel de vos autres charges, de votre marge et des taxes applicables.</small>
        </div>
      </div>
      <div className={styles.downloads}><a href="/atelier-vtc/modele-devis-vtc.docx" download>Modèle de devis <span>Word · modifiable</span></a><a href="/atelier-vtc/fiche-calcul-course.xlsx" download>Fiche de calcul d’une course <span>Excel · avec formules</span></a></div>
    </div>
  </section>;
}
