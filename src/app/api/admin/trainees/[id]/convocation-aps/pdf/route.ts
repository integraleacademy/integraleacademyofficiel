import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { requireAdmin } from '@/lib/admin/guard';
import { getPrisma } from '@/lib/db';
export const runtime = 'nodejs';
export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin(); if (denied) return denied;
  const prisma = await getPrisma(); if (!prisma) return NextResponse.json({ error: 'Base de données serveur indisponible.' }, { status: 503 });
  const { id } = await params;
  const trainee = await prisma.trainee.findUnique({ where: { id } });
  if (!trainee?.convocationApsPdfPath) return NextResponse.json({ error: 'Convocation introuvable.' }, { status: 404 });
  const allowedRoot = path.join(process.cwd(), 'generated-documents');
  const pdfPath = path.resolve(trainee.convocationApsPdfPath);
  if (!pdfPath.startsWith(allowedRoot)) return NextResponse.json({ error: 'Chemin PDF non autorisé.' }, { status: 403 });
  const pdf = await readFile(pdfPath);
  return new NextResponse(pdf, { headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `inline; filename="${path.basename(pdfPath)}"` } });
}
