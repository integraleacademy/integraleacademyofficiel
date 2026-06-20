import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/guard';
import { seedAdminData } from '@/lib/admin/seed';

export const runtime = 'nodejs';

export async function POST() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    return NextResponse.json(await seedAdminData());
  } catch (cause) {
    const error = cause instanceof Error ? cause.message : 'Initialisation impossible.';
    return NextResponse.json({ ok: false, error }, { status: 503 });
  }
}
