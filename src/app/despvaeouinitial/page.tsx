import { DespChoiceReferencePage } from '@/components/DespChoiceReferencePage';
import { isPublicUpcomingSession } from '@/lib/public-sessions';
import { listSessions } from '@/lib/training-data';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Formation DESP - Dirigeant entreprise sécurité privée',
  description: 'Formation DESP / DSSP RNCP 40385 : initial ou VAE, distanciel et présentiel Paris, Puget-sur-Argens ou Aurillac.',
  alternates: { canonical: '/despvaeouinitial' },
};

export default async function DespPage() {
  const sessions = (await listSessions()).filter((session: any) =>
    isPublicUpcomingSession(session)
    && ['desp', 'desp-dssp', 'desp-initial', 'desp-vae'].includes(session.training?.slug),
  );
  return <DespChoiceReferencePage sessions={sessions} />;
}
