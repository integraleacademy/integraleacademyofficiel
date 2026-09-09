import { NextResponse } from 'next/server';
import { listSessions } from '@/lib/training-data';
import { computedSeats, isPublicUpcomingSession } from '@/lib/public-sessions';
import { resolveSessionSeatCapacity } from '@/lib/session-capacity';

export const dynamic = 'force-dynamic';

export async function GET() {
  const sessions = (await listSessions())
    .filter(isPublicUpcomingSession)
    .sort((a: any, b: any) => +new Date(a.startDate) - +new Date(b.startDate))
    .map(session => ({ ...session, seatsTotal: resolveSessionSeatCapacity(session), seatsLeft: computedSeats(session) }));

  return NextResponse.json({ sessions: JSON.parse(JSON.stringify(sessions)) });
}
