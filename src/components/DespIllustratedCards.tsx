import type { SceneKind } from '@/components/TrainingMotionGallery';
import { type TrainingIllustratedCard } from '@/components/TrainingIllustratedCards';
import { TrainingPracticeArtwork, TrainingPracticeCards } from './TrainingPracticeCards';
import { TrainingMotionIllustration } from '@/components/TrainingMotionGallery';
import { TrainingMissionCards } from '@/components/TrainingMissionCards';

import { despPracticeArtwork, despArtwork, type ManualIllustration, type ManualIllustrationMap } from '@/data/manualIllustrations';
import { originalArtwork } from '@/data/originalArtwork';

export type DespIllustratedCard = TrainingIllustratedCard;

// Keep the people and their working documents in view in the landscape frame.
const initialMissionArtwork: Partial<Record<SceneKind, { illustration: ManualIllustration; focus?: string }>> = {
  business: { illustration: despArtwork.projet },
  finance: { illustration: originalArtwork['bts-cg-budget'] },
  compliance: { illustration: despArtwork.conformite },
  team: { illustration: despArtwork.management, focus: '30% 42%' },
  commercial: { illustration: originalArtwork['bts-ndrc-negociation'] },
  evidence: { illustration: originalArtwork['desp-initial-appel-offres'] },
  'site-check': { illustration: despArtwork.supervision, focus: '30% 42%' },
  briefing: {
    illustration: { ...originalArtwork['bts-mos-mission'], alt: 'Une responsable de sécurité fait le point sur la qualité d’une prestation avec le client.' },
  },
};

const vaeArtwork: ManualIllustrationMap = {
  ...despPracticeArtwork,
  'profile-review': originalArtwork['desp-vae-parcours-entretien'],
  approval: despArtwork.conformite,
  evidence: originalArtwork['desp-vae-preuves'],
  jury: despArtwork.organisation,
};

export function DespIllustratedCards({ items, variant = 'initial' }: { items: readonly DespIllustratedCard[]; variant?: 'initial' | 'vae' }) {
  if (variant === 'initial') {
    return <TrainingMissionCards items={items.map(item => {
      const visual = initialMissionArtwork[item.scenes[0]?.kind];
      return {
        title: item.title, description: item.description,
        illustration: visual?.illustration ?? despArtwork.direction,
        landscapeFocus: visual?.focus ?? '50% 42%',
      };
    })} />;
  }
  return <TrainingPracticeCards items={items.map((item, index) => ({
    title: item.title, text: item.description, icon: ['◎', '✎', '✓', '▤', '⇄', '◇'][index],
    visuals: item.scenes.map(scene => {
      const artwork = vaeArtwork[scene.kind];
      return { kind: scene.kind, illustration: artwork
        ? <TrainingPracticeArtwork illustration={artwork} />
        : <TrainingMotionIllustration kind={scene.kind} theme="orange" description={scene.description} /> };
    }),
  }))} />;
}
