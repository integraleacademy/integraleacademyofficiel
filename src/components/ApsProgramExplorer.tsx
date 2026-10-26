import { TrainingProgramExplorer } from './TrainingProgramExplorer';

export function ApsProgramExplorer({ units }: { units: string[][] }) {
  return <TrainingProgramExplorer
    units={units.map(([number, title, duration, delivery, description]) => ({ number, title, duration, delivery, description }))}
    idPrefix="aps-uv" hours="175" overview="14 unités de valeur" subtitle="Un parcours complet vers le métier"
    facts={[["Socle de base", "41 h"], ["Spécialité APS", "134 h"], ["Pratique au total", "63,5 h"]]}
    menuTitle="Explorez les 14 UV" tabListLabel="Les 14 UV du programme APS"
    illustration={{ src: '/images/aps/experience/programme.webp', alt: 'Une formatrice explique les fondamentaux du métier à un groupe de stagiaires APS' }}
    nextLabel="UV suivante" restartLabel="Revenir à l’UV 1"
  />;
}
