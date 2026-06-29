import { notFound } from 'next/navigation';
import { getPrisma } from '@/lib/db';
import { isAps } from '@/lib/admin/aps-convocation';
import { ApsDocumentsCard } from './ApsDocumentsCard';
export const runtime = 'nodejs';
export default async function TraineePage({ params }: { params: Promise<{ id: string }> }) {
  const prisma = await getPrisma(); if (!prisma) return <p>Base de données serveur indisponible.</p>;
  const { id } = await params;
  const trainee = await prisma.trainee.findUnique({ where: { id }, include: { training: true, session: { include: { training: true } } } });
  if (!trainee) notFound();
  const training = trainee.session?.training || trainee.training;
  return <><h1 className="text-3xl font-bold">Fiche stagiaire</h1><div className="mt-5 rounded-2xl bg-white p-5 shadow"><p className="text-xl font-black">{trainee.firstName} {trainee.lastName}</p><p className="mt-1 text-stone-600">{trainee.email}</p><p className="mt-3 text-sm font-semibold text-stone-500">Formation : {training?.name || 'Non renseignée'} · Session : {trainee.session?.title || 'Non renseignée'}</p></div>{isAps(training) ? <ApsDocumentsCard trainee={JSON.parse(JSON.stringify(trainee))}/> : null}</>;
}
