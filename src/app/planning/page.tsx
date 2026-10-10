import { createPageMetadata } from '@/lib/seo';
import { loadPlanningSessions } from '@/lib/planning-sessions';
import { nextBtsIntakeYear } from '@/lib/planning-filters';
import { PlanningClient } from './PlanningClient';

export const dynamic = 'force-dynamic';
export const metadata = createPageMetadata('/planning');

export default async function Page() {
  const publicSessions = await loadPlanningSessions();
  return <PlanningClient initialSessions={JSON.parse(JSON.stringify(publicSessions))} btsIntakeYear={nextBtsIntakeYear()} />;
}

