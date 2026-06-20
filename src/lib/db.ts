import 'server-only';

type AnyPrisma = any;
const g = globalThis as typeof globalThis & { prisma?: AnyPrisma };

export async function getPrisma(): Promise<AnyPrisma | null> {
  if (!process.env.DATABASE_URL) return null;
  if (g.prisma) return g.prisma;
  try {
    const importer = new Function('m', 'return import(m)') as (m: string) => Promise<any>;
    const { PrismaClient } = await importer('@prisma/client');
    g.prisma = new PrismaClient();
    return g.prisma;
  } catch (error) {
    console.warn('[DB] Prisma indisponible. Installez @prisma/client et exécutez prisma generate.', error);
    return null;
  }
}
