import { createPageMetadata } from '@/lib/seo';
import { DespChoiceReferencePage } from '@/components/DespChoiceReferencePage';
import { isPublicUpcomingSession } from '@/lib/public-sessions';
import { listSessions } from '@/lib/training-data';

export const dynamic = 'force-dynamic';

export const metadata = createPageMetadata('/despvaeouinitial');

export default async function DespPage() {
  const sessions = (await listSessions()).filter((session: any) =>
    isPublicUpcomingSession(session)
    && ['desp', 'desp-dssp', 'desp-initial', 'desp-vae'].includes(session.training?.slug),
  );
  return <DespChoiceReferencePage sessions={sessions} />;
}
