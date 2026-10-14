import type { ManualIllustration } from '@/data/manualIllustrations';

import { TrainingReferenceMissions } from '@/components/TrainingReferenceLayout';

export type TrainingMissionCard = {
  number?: string;
  title: string;
  description: string;
  illustration: ManualIllustration;
  featured?: boolean;
  imagePosition?: string;
};

export function TrainingMissionCards({ items }: { items: readonly TrainingMissionCard[] }) {
  return <TrainingReferenceMissions items={items} />;
}
