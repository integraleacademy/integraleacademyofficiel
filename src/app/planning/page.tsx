import { createPageMetadata } from '@/lib/seo';
import { loadPlanningSessions } from '@/lib/planning-sessions';
import { parseSessionLocationFilter } from '@/lib/session-location-filter';
import { PlanningClient } from './PlanningClient';

export const dynamic = 'force-dynamic';
export const metadata = createPageMetadata('/planning');

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const initialLocation = parseSessionLocationFilter(params.lieu);
  const formation = typeof params.formation === 'string' ? params.formation : undefined;
  const parcours = typeof params.parcours === 'string' ? params.parcours : undefined;
  const allDates = params.dates === 'toutes';
  const publicSessions = await loadPlanningSessions();
  return <PlanningClient key={[initialLocation, formation, parcours, allDates].join('/')}
    initialLocation={initialLocation} requestedFormation={formation} requestedCourse={parcours} allDates={allDates}
    initialSessions={JSON.parse(JSON.stringify(publicSessions))} />;
}

