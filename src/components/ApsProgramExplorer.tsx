import { TrainingProgramExplorer } from './TrainingProgramExplorer';

const unitArt = [
  ['manuel/sst', 'Exercice de secourisme en formation APS'],
  ['experience/elearning-cours', 'Support de cours utilisé pour étudier le cadre juridique'],
  ['experience/atelier-conflit', 'Mise en situation sur la gestion des conflits'],
  ['experience/atelier-pc-securite', 'Outils de communication du poste de sécurité'],
  ['experience/atelier-incendie', 'Atelier de prévention des risques d’incendie'],
  ['experience/programme', 'Échanges encadrés en salle de formation'],
  ['experience/atelier-vigilance', 'Atelier de vigilance'],
  ['experience/atelier-acces', 'Atelier de contrôle des accès'],
  ['experience/atelier-bagages', 'Atelier d’inspection des bagages'],
  ['experience/pc-centre', 'Vue du poste de contrôle'],
  ['experience/pc-alarme', 'Équipements du poste de sécurité'],
  ['experience/atelier-vigilance', 'Exercice de vigilance en formation'],
  ['experience/atelier-conflit', 'Échange avec un formateur lors d’une mise en situation'],
  ['experience/elearning-exercice', 'Exercice sur un support pédagogique APS'],
] as const;

export function ApsProgramExplorer({ units }: { units: string[][] }) {
  return <TrainingProgramExplorer
    units={units.map(([number, title, duration, delivery, description], index) => ({ number, title, duration, delivery, description, illustration: { src: `/images/aps/${unitArt[index][0]}.webp`, alt: unitArt[index][1] } }))}
    idPrefix="aps-uv" hours="175" overview="14 unités de valeur" subtitle="Un parcours complet vers le métier"
    facts={[["Socle de base", "41 h"], ["Spécialité APS", "134 h"], ["Pratique au total", "63,5 h"]]}
    menuTitle="Explorez les 14 UV" tabListLabel="Les 14 UV du programme APS"
    illustration={{ src: '/images/aps/experience/programme.webp', alt: 'Une formatrice explique les fondamentaux du métier à un groupe de stagiaires APS' }}
    nextLabel="UV suivante" restartLabel="Revenir à l’UV 1"
  />;
}
