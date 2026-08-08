import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/guard';
import { getPrisma } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const hasDatabaseUrl = !!process.env.DATABASE_URL;
  console.log('[DB_HEALTH] hasDatabaseUrl:', hasDatabaseUrl);

  let canConnectToDatabase = false;
  let trainingsCount = 0;
  let sessionsCount = 0;
  let error: string | undefined;

  if (hasDatabaseUrl) {
    try {
      const prisma = await getPrisma();
      if (!prisma) throw new Error('Prisma client unavailable');
      await prisma.$connect();
      const [trainingCount, sessionCount] = await Promise.all([
        prisma.training.count(),
        prisma.trainingSession.count(),
      ]);
      trainingsCount = trainingCount;
      sessionsCount = sessionCount;
      canConnectToDatabase = true;
    } catch (cause) {
      error = cause instanceof Error ? cause.message : 'Connexion base de données impossible.';
    }
  } else {
    error = 'DATABASE_URL est absente côté serveur.';
  }

  console.log('[DB_HEALTH] canConnectToDatabase:', canConnectToDatabase);

  return NextResponse.json({
    ok: hasDatabaseUrl && canConnectToDatabase,
    hasDatabaseUrl,
    canConnectToDatabase,
    trainingsCount,
    sessionsCount,
    ...(error ? { error } : {}),
  });
}
