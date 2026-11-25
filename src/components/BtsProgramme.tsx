import { btsProgrammeIllustrations } from '@/data/programme-illustrations';
import { TrainingProgramExplorer } from './TrainingProgramExplorer';

export function BtsProgramme({ course, subjects }: {
  course: keyof typeof btsProgrammeIllustrations;
  subjects: readonly (readonly string[])[];
}) {
  const images = btsProgrammeIllustrations[course];
  return <TrainingProgramExplorer idPrefix={`bts-${course}-programme`}
    hours={String(subjects.length)} unitLabel="" overview="enseignements au programme" subtitle={`BTS ${course.toUpperCase()}`}
    facts={[[ 'Diplôme', 'Bac +2' ], [ 'Durée', '2 ans' ], [ 'Parcours', 'Alternance' ]]}
    menuTitle="Explorer les enseignements" tabListLabel={`Les enseignements du BTS ${course.toUpperCase()}`}
    nextLabel="Enseignement suivant" restartLabel="Revenir au premier enseignement"
    units={subjects.map(([number, title, description], index) => ({
      number, title, description, delivery: `BTS ${course.toUpperCase()}`, illustration: images[index],
    }))} />;
}
