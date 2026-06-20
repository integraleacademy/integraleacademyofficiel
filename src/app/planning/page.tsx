import { listSessions } from '@/lib/training-data';
import { PlanningClient } from './PlanningClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Planning des prochaines formations',
  description: 'Consultez les prochaines sessions APS, A3P, DESP, SSIAP 1, VTC et BTS en alternance chez Intégrale Academy.',
};

function parisDateKey(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}

function isPublicUpcomingSession(session: any) {
  if (!session?.training?.isActive || session.status === 'HIDDEN') return false;
  return parisDateKey(new Date(session.startDate)) >= parisDateKey();
}

export default async function Page() {
  const sessions = (await listSessions())
    .filter(isPublicUpcomingSession)
    .sort((a: any, b: any) => +new Date(a.startDate) - +new Date(b.startDate));

  return <PlanningClient initialSessions={JSON.parse(JSON.stringify(sessions))} />;
}
