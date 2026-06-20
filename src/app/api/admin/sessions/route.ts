import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/guard';
import { getPrisma } from '@/lib/db';
import { listSessions } from '@/lib/training-data';

export const runtime = 'nodejs';

const toDate = (value: unknown) => value ? new Date(String(value)) : null;
const nullableNumber = (value: unknown) => value === '' || value === null || value === undefined ? null : Number(value);

function sessionData(data: any) {
  return {
    trainingId: String(data.trainingId || ''),
    title: String(data.title || ''),
    startDate: new Date(String(data.startDate || '')),
    endDate: new Date(String(data.endDate || '')),
    examDate: toDate(data.examDate),
    priceCents: Number(data.priceCents || 0),
    priceLabel: String(data.priceLabel || ''),
    location: String(data.location || ''),
    status: String(data.status || 'OPEN') as any,
    seatsTotal: nullableNumber(data.seatsTotal),
    seatsLeft: nullableNumber(data.seatsLeft),
    showSeatsLeft: data.showSeatsLeft === undefined ? true : !!data.showSeatsLeft,
    durationLabel: String(data.durationLabel || ''),
    registrationUrl: String(data.registrationUrl || ''),
    fundingNotes: String(data.fundingNotes || ''),
    publicNotes: String(data.publicNotes || ''),
    internalNotes: String(data.internalNotes || ''),
    sortOrder: Number(data.sortOrder || 0),
    isHighlighted: !!data.isHighlighted,
  };
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  return NextResponse.json(await listSessions());
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const prisma = await getPrisma();
  if (!prisma) return NextResponse.json({ error: 'Base de données serveur indisponible.' }, { status: 503 });
  console.log('[ADMIN_SESSIONS] create session');
  const data = await request.json();
  const session = await prisma.trainingSession.create({ data: sessionData(data), include: { training: true } });
  return NextResponse.json(session);
}
