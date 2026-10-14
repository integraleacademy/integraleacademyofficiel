import { createPageMetadata } from '@/lib/seo';
import { loadPlanningSessions } from '@/lib/planning-sessions';
import { nextBtsIntakeYear } from '@/lib/planning-filters';
import { parseSessionLocationFilter } from '@/lib/session-location-filter';
import { PlanningClient } from './PlanningClient';

export const dynamic = 'force-dynamic';
export const metadata = createPageMetadata('/planning');

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const initialLocation = parseSessionLocationFilter(params.lieu);
  const publicSessions = await loadPlanningSessions();
  return <PlanningClient key={initialLocation} initialLocation={initialLocation} initialSessions={JSON.parse(JSON.stringify(publicSessions))} btsIntakeYear={nextBtsIntakeYear()} />;
}

