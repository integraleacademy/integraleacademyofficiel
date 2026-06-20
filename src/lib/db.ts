import 'server-only';

import { prisma } from './prisma';

export async function getPrisma() {
  if (!process.env.DATABASE_URL) return null;

  return prisma;
}
