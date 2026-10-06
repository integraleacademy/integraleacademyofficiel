import { TrainingIllustratedCards, type TrainingIllustratedCard } from '@/components/TrainingIllustratedCards';
import { despPracticeArtwork } from '@/data/manualIllustrations';

export type DespIllustratedCard = TrainingIllustratedCard;

export function DespIllustratedCards({ items }: { items: readonly DespIllustratedCard[] }) {
  return <TrainingIllustratedCards items={items} theme="orange" illustrations={despPracticeArtwork} />;
}
