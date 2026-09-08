import { TrainingIllustratedCards, type TrainingIllustratedCard } from '@/components/TrainingIllustratedCards';

export type DespIllustratedCard = TrainingIllustratedCard;

export function DespIllustratedCards({ items }: { items: readonly DespIllustratedCard[] }) {
  return <TrainingIllustratedCards items={items} theme="orange" />;
}
