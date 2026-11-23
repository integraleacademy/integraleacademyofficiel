import { ssiapCourseVisuals, type SsiapLeadershipLevel } from '@/data/ssiapCourseVisuals';
import { TrainingPracticeArtwork, TrainingPracticeCards } from './TrainingPracticeCards';

export function SsiapLeadershipGallery({ level }: { level: SsiapLeadershipLevel }) {
  const { galleryTitle, galleryIntro, scenes } = ssiapCourseVisuals[level];
  return <div id={`${level}-scene`}>
    <header className="mb-6"><h3 className="text-2xl font-bold">{galleryTitle}</h3><p className="mt-2 text-white/75">{galleryIntro}</p></header>
    <TrainingPracticeCards items={scenes.map((scene, i) => ({
      title: scene.title, text: scene.text, icon: ['◎', '⇄', '✓', '▤'][i],
      visuals: [{ kind: scene.id, illustration: <TrainingPracticeArtwork illustration={scene.illustration} /> }],
      afterVisuals: <details className="mt-4 border-t border-white/15 pt-3 text-sm text-white/80">
        <summary className="cursor-pointer font-bold">Les gestes du métier</summary>
        <ul className="mt-2 list-disc space-y-1 pl-5">{scene.actions.map(action => <li key={action}>{action}</li>)}</ul>
      </details>,
    }))} />
  </div>;
}
