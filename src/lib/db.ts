import 'server-only';

export async function getPrisma() {
  if (!process.env.DATABASE_URL) return null;
  const { prisma } = await import('./prisma');
  return prisma;
}
