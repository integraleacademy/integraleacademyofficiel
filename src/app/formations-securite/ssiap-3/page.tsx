import { createPageMetadata } from '@/lib/seo';
import { SsiapCoursePage } from '@/components/SsiapCoursePage';
import { isPublicUpcomingSession } from '@/components/PublicTrainingSessions';
import { listSessions } from '@/lib/training-data';
import { ssiap3Config } from '@/data/ssiap-catalogue';

export const dynamic = 'force-dynamic';

export const metadata = createPageMetadata('/formations-securite/ssiap-3');

export default async function Ssiap3Page() {
  const sessions = (await listSessions()).filter((session: any) => isPublicUpcomingSession(session) && session.training?.slug === 'ssiap-3');
  return <SsiapCoursePage config={ssiap3Config} sessions={sessions} />;
}
