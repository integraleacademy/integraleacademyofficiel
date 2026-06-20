import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/guard';
import { getPrisma } from '@/lib/db';

export const runtime = 'nodejs';

const toDate = (value: unknown) => value ? new Date(String(value)) : null;
const nullableNumber = (value: unknown) => value === '' || value === null || value === undefined ? null : Number(value);

function sessionUpdateData(data: any) {
  const update: any = { ...data };
  if ('startDate' in data) update.startDate = new Date(String(data.startDate || ''));
  if ('endDate' in data) update.endDate = new Date(String(data.endDate || ''));
  if ('examDate' in data) update.examDate = toDate(data.examDate);
  if ('priceCents' in data) update.priceCents = Number(data.priceCents || 0);
  if ('seatsTotal' in data) update.seatsTotal = nullableNumber(data.seatsTotal);
  if ('seatsLeft' in data) update.seatsLeft = nullableNumber(data.seatsLeft);
  if ('sortOrder' in data) update.sortOrder = Number(data.sortOrder || 0);
  if ('isHighlighted' in data) update.isHighlighted = !!data.isHighlighted;
  return update;
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const prisma = await getPrisma();
  if (!prisma) return NextResponse.json({ error: 'Base de données serveur indisponible.' }, { status: 503 });
  const { id } = await params;
  console.log('[ADMIN_SESSIONS] update session:', id);
  const data = await request.json();
  const session = await prisma.trainingSession.update({ where: { id }, data: sessionUpdateData(data), include: { training: true } });
  return NextResponse.json(session);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const prisma = await getPrisma();
  if (!prisma) return NextResponse.json({ error: 'Base de données serveur indisponible.' }, { status: 503 });
  const { id } = await params;
  console.log('[ADMIN_SESSIONS] update session:', id);
  return NextResponse.json(await prisma.trainingSession.delete({ where: { id } }));
}
