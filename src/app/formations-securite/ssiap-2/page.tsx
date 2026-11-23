import { createPageMetadata } from '@/lib/seo';
import { SsiapCoursePage } from '@/components/SsiapCoursePage';
import { isPublicUpcomingSession } from '@/lib/public-sessions';
import { planningSsiapCourse } from '@/lib/planning-ssiap';
import { listPublicSessions as listSessions } from '@/lib/training-data';
import { ssiap2Config } from '@/data/ssiap-catalogue';

export const dynamic = 'force-dynamic';

export const metadata = createPageMetadata('/formations-securite/ssiap-2');

export default async function Ssiap2Page() {
  const sessions = (await listSessions())
    .filter(session => isPublicUpcomingSession(session) && planningSsiapCourse(session) === 'ssiap-2')
    .sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate));
  return <SsiapCoursePage config={ssiap2Config} sessions={sessions} />;
}
