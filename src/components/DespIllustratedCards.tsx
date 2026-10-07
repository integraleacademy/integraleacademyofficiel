import { TrainingIllustratedCards, type TrainingIllustratedCard } from '@/components/TrainingIllustratedCards';
import { TrainingMissionCards } from '@/components/TrainingMissionCards';
import type { SceneKind } from '@/components/TrainingMotionGallery';
import { despPracticeArtwork, despArtwork, type ManualIllustration } from '@/data/manualIllustrations';
import { originalArtwork } from '@/data/originalArtwork';

export type DespIllustratedCard = TrainingIllustratedCard;

// Landscape scenes keep the APS card proportions without cropping portrait artwork.
const initialMissionArtwork: Partial<Record<SceneKind, { illustration: ManualIllustration; imagePosition?: string }>> = {
  business: { illustration: originalArtwork['desp-initial-parcours'], imagePosition: 'right center' },
  finance: { illustration: originalArtwork['bts-cg-budget'] },
  compliance: { illustration: despArtwork.conformite },
  team: { illustration: despArtwork.management, imagePosition: 'left center' },
  commercial: { illustration: originalArtwork['bts-ndrc-negociation'] },
  evidence: { illustration: originalArtwork['desp-initial-appel-offres'] },
  'site-check': { illustration: despArtwork.supervision, imagePosition: 'left center' },
  briefing: {
    illustration: { ...originalArtwork['bts-mos-mission'], alt: 'Une responsable de sécurité fait le point sur la qualité d’une prestation avec le client.' },
  },
};

export function DespIllustratedCards({ items, variant = 'initial' }: { items: readonly DespIllustratedCard[]; variant?: 'initial' | 'vae' }) {
  if (variant === 'initial') {
    return <TrainingMissionCards items={items.map((item, index) => {
      const scene = item.scenes[0];
      const visual = scene && initialMissionArtwork[scene.kind];
      return {
        number: item.number,
        title: item.title,
        description: item.description,
        illustration: visual?.illustration ?? despArtwork.direction,
        imagePosition: visual?.imagePosition,
        featured: index === 0,
      };
    })} />;
  }
  const illustrations = variant === 'vae' ? {
    ...despPracticeArtwork,
    'profile-review': originalArtwork['desp-vae-parcours-entretien'],
    approval: despArtwork.conformite,
    evidence: originalArtwork['desp-vae-preuves'],
    jury: originalArtwork['desp-vae-jury'],
  } : despPracticeArtwork;
  return <TrainingIllustratedCards items={items} theme="orange" illustrations={illustrations} threeColumns />;
}
