import 'server-only';
import { listSessions } from '@/lib/training-data';
import { isPublicUpcomingSession } from '@/lib/public-sessions';
import { getVtcPlanningSessions, isBtsTraining } from '@/lib/planning-data';
import { toPublicSession } from '@/lib/public-session-data';

export async function loadPlanningSessions() {
  const all = await listSessions();
  const sessions = all.filter(({ training }) =>
    training?.slug !== 'vtc' && !isBtsTraining(training?.slug, training?.category)
  ).filter(isPublicUpcomingSession);
  const vtc = getVtcPlanningSessions(new Date(), all.filter((session) => session.training?.slug === 'vtc'));
  return [...sessions, ...vtc].map(toPublicSession);
}
