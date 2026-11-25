import { TrainingSectionNavigation, type TrainingSectionNavigationItem } from './TrainingSectionNavigation';

export type PageChapter = readonly [id: string, label: string];

export function PageSectionNavigation({ chapters, label, ariaLabel, actionId, actionLabel }: {
  chapters: readonly PageChapter[];
  label: string;
  ariaLabel: string;
  actionId: string;
  actionLabel: string;
}) {
  const items: TrainingSectionNavigationItem[] = chapters.map(([id, title]) => ({ href: `#${id}`, label: title }));
  return <TrainingSectionNavigation mark="IA" title={label} eyebrowLabel="Intégrale Academy"
    items={items} registrationHref={`#${actionId}`} registrationLabel={actionLabel} ariaLabel={ariaLabel} />;
}
