import { NextResponse } from 'next/server';
import { listSessions } from '@/lib/training-data';
import { isPublicUpcomingSession } from '@/lib/public-sessions';

export const dynamic = 'force-dynamic';

export async function GET() {
  const sessions = (await listSessions())
    .filter(isPublicUpcomingSession)
    .sort((a: any, b: any) => +new Date(a.startDate) - +new Date(b.startDate));

  return NextResponse.json({ sessions: JSON.parse(JSON.stringify(sessions)) });
}
