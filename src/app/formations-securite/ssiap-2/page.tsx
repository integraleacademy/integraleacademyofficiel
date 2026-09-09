import { createPageMetadata } from '@/lib/seo';
import { SsiapCoursePage } from '@/components/SsiapCoursePage';
import { isPublicUpcomingSession } from '@/components/PublicTrainingSessions';
import { listSessions } from '@/lib/training-data';
import { ssiap2Config } from '@/data/ssiap-catalogue';

export const dynamic = 'force-dynamic';

export const metadata = createPageMetadata('/formations-securite/ssiap-2');

export default async function Ssiap2Page() {
  const sessions = (await listSessions()).filter((session: any) => isPublicUpcomingSession(session) && session.training?.slug === 'ssiap-2');
  return <SsiapCoursePage config={ssiap2Config} sessions={sessions} />;
}
