import type { TrainingStatus } from '@/data/upcoming-trainings';

export function TrainingStatusBadge({ status }: { status: TrainingStatus }) {
  const tone = status === 'PROCHAINEMENT'
    ? 'border-academy-line bg-academy-surface text-academy-muted'
    : 'border-academy-gold/60 bg-academy-gold-soft text-academy-gold-strong';

  return <span className={`inline-flex w-fit shrink-0 whitespace-nowrap rounded-full border px-2 py-1 text-[.65rem] font-extrabold leading-none tracking-wider ${tone}`}>{status}</span>;
}
