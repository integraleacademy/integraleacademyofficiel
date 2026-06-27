import { listSessions } from '@/lib/training-data';
import { isPublicUpcomingSession } from '@/lib/public-sessions';
import { PlanningClient } from './PlanningClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Planning des prochaines formations',
  description: 'Consultez les prochaines sessions APS, A3P, DESP, SSIAP 1, VTC et BTS en alternance chez Intégrale Academy.',
};

export default async function Page() {
  const sessions = (await listSessions())
    .filter(isPublicUpcomingSession)
    .sort((a: any, b: any) => +new Date(a.startDate) - +new Date(b.startDate));

  return <PlanningClient initialSessions={JSON.parse(JSON.stringify(sessions))} />;
}
