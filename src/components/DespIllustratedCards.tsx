import { TrainingIllustratedCards, type TrainingIllustratedCard } from '@/components/TrainingIllustratedCards';
import { despPracticeArtwork, despArtwork } from '@/data/manualIllustrations';
import { originalArtwork } from '@/data/originalArtwork';

export type DespIllustratedCard = TrainingIllustratedCard;

export function DespIllustratedCards({ items, variant = 'initial' }: { items: readonly DespIllustratedCard[]; variant?: 'initial' | 'vae' }) {
  const illustrations = variant === 'vae' ? {
    ...despPracticeArtwork,
    'profile-review': originalArtwork['desp-vae-parcours-entretien'],
    approval: despArtwork.conformite,
    evidence: originalArtwork['desp-vae-preuves'],
    jury: originalArtwork['desp-vae-jury'],
  } : despPracticeArtwork;
  return <TrainingIllustratedCards items={items} theme="orange" illustrations={illustrations} threeColumns />;
}
