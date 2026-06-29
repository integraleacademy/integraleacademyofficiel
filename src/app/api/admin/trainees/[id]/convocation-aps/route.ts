import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/guard';
import { getPrisma } from '@/lib/db';
import { generateAndSendApsConvocation } from '@/lib/admin/aps-convocation';
export const runtime = 'nodejs';
export async function POST(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin(); if (denied) return denied;
  const { id } = await params;
  const prisma = await getPrisma();
  try { return NextResponse.json(await generateAndSendApsConvocation(id)); }
  catch (error: any) { if (prisma) await prisma.trainee.update({ where: { id }, data: { convocationApsLastError: error.message } }).catch(() => null); return NextResponse.json({ error: error.message || 'Envoi impossible.' }, { status: 400 }); }
}
