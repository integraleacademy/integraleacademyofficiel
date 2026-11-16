import Link from 'next/link';
import type { AnnouncedMenuGroup } from '@/data/upcoming-trainings';
import { TrainingStatusBadge } from './TrainingStatusBadge';

type Props = {
  group: AnnouncedMenuGroup;
  mobile?: boolean;
  onNavigate: () => void;
};

export function AnnouncedTrainingGroup({ group, mobile, onNavigate }: Props) {
  const items = (
    <ul className="divide-y divide-academy-line/60">
      {group.items.map(item => (
        <li key={item.label} className="grid justify-items-start gap-1.5 py-2.5">
          <span className="text-sm font-semibold leading-snug text-academy-ink">{item.label}</span>
          <TrainingStatusBadge status={item.status} />
        </li>
      ))}
    </ul>
  );

  const linkStyle = 'inline-flex items-center gap-2 rounded-sm font-bold text-academy-gold-strong underline-offset-4 hover:underline focus-visible:underline';
  if (mobile) {
    return (
      <details className="group/family rounded-xl border-t border-academy-line/60 px-3">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 py-2 text-sm font-bold text-academy-ink [&::-webkit-details-marker]:hidden">
          {group.label}
          <span aria-hidden="true" className="text-academy-gold-strong transition-transform group-open/family:rotate-180">⌄</span>
        </summary>
        {items}
        {group.href && <Link href={group.href} onClick={onNavigate} className={`${linkStyle} min-h-11 text-sm`}>Voir sur l’accueil <span aria-hidden="true">→</span></Link>}
      </details>
    );
  }

  return (
    <section>
      <h2 className="mb-1 border-b border-academy-line pb-2 text-base font-extrabold text-academy-ink">
        {group.href
          ? <Link href={group.href} onClick={onNavigate} className={linkStyle}>{group.label} <span aria-hidden="true">→</span></Link>
          : group.label}
      </h2>
      {items}
    </section>
  );
}
