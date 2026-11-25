import 'server-only';
import { listSessions } from '@/lib/training-data';
import { isPublicUpcomingSession, parisDateKey } from '@/lib/public-sessions';
import { getVtcPlanningSessions, isBtsTraining } from '@/lib/planning-data';
import { toPublicSession } from '@/lib/public-session-data';
import { ADMISSIONS_URL } from '@/data/admissions';
import { intakeMatchesSession, scheduledIntakes } from '@/data/intakes';

export async function loadPlanningSessions({ includeBts = true } = {}) {
  const all = await listSessions();
  const today = parisDateKey();
  const sessions = all.filter(({ training }) =>
    training?.slug !== 'vtc' && (includeBts || !isBtsTraining(training?.slug, training?.category))
  ).filter(isPublicUpcomingSession).map(session => {
    const intake = scheduledIntakes.find(entry => entry.training.slug === session.training?.slug || entry.training.pageUrl === session.training?.pageUrl);
    return intake || isBtsTraining(session.training?.slug, session.training?.category)
      ? { ...session, scheduleKind: intake?.scheduleKind ?? 'admissions', registrationUrl: intake?.registrationUrl ?? ADMISSIONS_URL }
      : session;
  });
  const intakes = scheduledIntakes.filter(intake =>
    (includeBts || intake.training.category !== 'bts') &&
    (intake.datePrecision === 'month' ? intake.startDate.slice(0,7) >= today.slice(0,7) : intake.startDate >= today) &&
    !all.some(session => intakeMatchesSession(intake, session))
  );
  const vtc = getVtcPlanningSessions(new Date(), all.filter((session) => session.training?.slug === 'vtc'));
  return [...sessions, ...intakes, ...vtc].map(toPublicSession);
}
