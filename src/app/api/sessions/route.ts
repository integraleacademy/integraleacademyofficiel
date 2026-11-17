import { NextResponse } from 'next/server';
import { loadPlanningSessions } from '@/lib/planning-sessions';
import { listSessions } from '@/lib/training-data';
import { computedSeats, isPublicUpcomingSession } from '@/lib/public-sessions';
import { resolveSessionSeatCapacity } from '@/lib/session-capacity';
import { toPublicSession } from '@/lib/public-session-data';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  if (new URL(request.url).searchParams.get('vue') === 'orientation') {
    return NextResponse.json({ sessions: await loadPlanningSessions({ includeBts: true }) });
  }

  const sessions = (await listSessions())
    .filter(isPublicUpcomingSession)
    .sort((a: any, b: any) => +new Date(a.startDate) - +new Date(b.startDate))
    .map(session => ({ ...toPublicSession(session), seatsTotal: resolveSessionSeatCapacity(session), seatsLeft: computedSeats(session) }));

  return NextResponse.json({ sessions: JSON.parse(JSON.stringify(sessions)) });
}

