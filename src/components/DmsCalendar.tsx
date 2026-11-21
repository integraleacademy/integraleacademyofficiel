import styles from './AnnouncedCoursePage.module.css';

type Period = readonly [dates: string, course?: 'DESP' | 'SSIAP 3', hours?: number, module?: string];

const periods: readonly Period[] = [
  ['1er au 3 septembre 2027'],
  ['6 au 17 septembre 2027', 'DESP', 70, 'Cadre juridique de la sécurité privée.'],
  ['20 septembre au 1er octobre 2027'],
  ['4 au 15 octobre 2027', 'SSIAP 3', 56, 'Comportement du feu, construction et lecture de plans.'],
  ['18 octobre au 12 novembre 2027'],
  ['15 au 26 novembre 2027', 'DESP', 63, 'Réglementation, création d’agence et budget.'],
  ['29 novembre au 3 décembre 2027'],
  ['6 au 17 décembre 2027', 'SSIAP 3', 56, 'Étude des bâtiments et réglementation incendie.'],
  ['20 décembre 2027 au 14 janvier 2028'],
  ['17 au 28 janvier 2028', 'DESP', 56, 'Prix de vente, marge et appels d’offres.'],
  ['31 janvier au 25 février 2028'],
  ['28 février au 10 mars 2028', 'SSIAP 3', 56, 'Réglementation incendie et analyse des risques.'],
  ['13 au 31 mars 2028'],
  ['3 au 14 avril 2028', 'DESP', 56, 'Suivi des contrats et management des équipes.'],
  ['17 avril au 9 juin 2028'],
  ['12 au 23 juin 2028', 'SSIAP 3', 48, 'Conseil à l’exploitant, management et budget.'],
  ['26 juin au 31 août 2028'],
];

export function DmsCalendar() {
  return <div className={styles.calendar}>
    <p className={styles.kicker}>Promotion 2027–2028 · Puget-sur-Argens</p>
    <h3>Du 1er septembre 2027 au 31 août 2028</h3>
    <p>Les cours se déroulent par périodes de deux semaines. Entre chaque période et pendant l’été, vous rejoignez votre entreprise d’accueil.</p>
    <details><summary>Afficher le calendrier prévisionnel complet <span aria-hidden="true">＋</span></summary>
      <ol>{periods.map(([dates, course, hours, module]) => <li key={dates}>
        <strong>{dates}</strong><span>{course ? `À l’école · ${course} · ${hours} h` : 'En entreprise'}</span>{module && <small>{module}</small>}
      </li>)}</ol>
    </details>
    <p><strong>Examens prévisionnels</strong> · DESP les 13 et 14 avril 2028, SSIAP 3 les 22 et 23 juin 2028. Les dates sont à confirmer avec les jurys.</p>
  </div>;
}
