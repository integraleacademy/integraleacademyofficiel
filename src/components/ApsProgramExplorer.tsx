import { TrainingProgramExplorer } from './TrainingProgramExplorer';

const unitArt = [
  ["aps/manuel/sst", "Deux stagiaires s’exercent aux gestes de secours."],
  ["formation-scenes-manuel/a3p-competence-cadre", "Une formatrice explique le cadre juridique au tableau."],
  ["aps/experience/atelier-conflit", "Un agent dialogue avec un visiteur."],
  ["formation-scenes-manuel/aps-atelier-radio", "Des stagiaires communiquent par radio."],
  ["aps/experience/atelier-incendie", "Un agent vérifie un dégagement."],
  ["aps/experience/examen", "Un agent échange avec une personne à l’entrée d’un bâtiment."],
  ["aps/experience/atelier-vigilance", "Une agente observe les mouvements dans un hall."],
  ["aps/experience/atelier-acces", "Un agent accueille une visiteuse à un poste de contrôle."],
  ["aps/experience/atelier-bagages", "Contrôle de bagages à l’entrée d’un événement."],
  ["aps/experience/pc-securite", "Un opérateur observe les écrans de vidéoprotection."],
  ["formation-scenes-manuel/aps-pc-pedagogique", "Des agents consultent les équipements du poste de sécurité."],
  ["formation-scenes-manuel/bts-mos-accueil", "Une agente accueille le public à l’entrée d’un événement."],
  ["aps/manuel/equipe", "Deux agents échangent sur le terrain."],
  ["formation-scenes-manuel/aps-mission-prevention", "Un agent signale un danger dans une zone de passage."],
] as const;

export function ApsProgramExplorer({ units }: { units: string[][] }) {
  return <TrainingProgramExplorer
    units={units.map(([number, title, duration, delivery, description], index) => ({ number, title, duration, delivery, description, illustration: { src: `/images/${unitArt[index][0]}.webp`, alt: unitArt[index][1] } }))}
    idPrefix="aps-uv" hours="175" overview="14 unités de valeur" subtitle="Un parcours complet vers le métier"
    facts={[["Socle de base", "41 h"], ["Spécialité APS", "134 h"], ["Pratique au total", "63,5 h"]]}
    menuTitle="Explorez les 14 UV" tabListLabel="Les 14 UV du programme APS"
    illustration={{ src: '/images/aps/experience/programme.webp', alt: 'Une formatrice explique les fondamentaux du métier à un groupe de stagiaires APS' }}
    nextLabel="UV suivante" restartLabel="Revenir à l’UV 1"
  />;
}
