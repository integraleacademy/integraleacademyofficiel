import 'server-only';

import { getPrisma } from '@/lib/db';

export const seedTrainings = [
  { slug: 'aps', name: 'APS', title: 'Agent de Prévention et de Sécurité', category: 'sécurité', description: '', pageUrl: '/formations-securite/aps' },
  { slug: 'ssiap-1', name: 'SSIAP 1', title: 'Agent de sécurité incendie', category: 'sécurité incendie', description: '', pageUrl: '/formations-securite/ssiap-1' },
  { slug: 'sst', name: 'SST', title: 'Sauveteur Secouriste du Travail', category: 'secourisme', description: '', pageUrl: '/formations-securite/sst' },
  { slug: 'a3p-apr', name: 'A3P / APR', title: 'Agent de Protection Physique des Personnes', category: 'sécurité privée', description: '', pageUrl: '/formations-securite/a3p-apr' },
  { slug: 'cpsp', name: 'CPSP', title: 'Chef de poste en sécurité privée', category: 'sécurité privée', description: '', pageUrl: '/formations-securite/cpsp' },
  { slug: 'desp-dssp', name: 'DESP / DSSP', title: 'Dirigeant d’entreprise de sécurité privée', category: 'direction', description: '', pageUrl: '/formations-securite/desp' },
  { slug: 'desp-initial', name: 'DESP initial', title: 'Formation DESP initial', category: 'direction', description: '', pageUrl: '/formations-securite/desp-initial' },
  { slug: 'desp-vae', name: 'DESP VAE', title: 'Validation des acquis dirigeant sécurité privée', category: 'direction', description: '', pageUrl: '/formations-securite/desp-vae' },
  { slug: 'bts-mos', name: 'BTS MOS', title: 'Management Opérationnel de la Sécurité', category: 'bts', description: '', pageUrl: '/bts/mos' },
  { slug: 'bts-mco', name: 'BTS MCO', title: 'Management Commercial Opérationnel', category: 'bts', description: '', pageUrl: '/bts/mco' },
  { slug: 'bts-ndrc', name: 'BTS NDRC', title: 'Négociation et Digitalisation de la Relation Client', category: 'bts', description: '', pageUrl: '/bts/ndrc' },
  { slug: 'bts-ci', name: 'BTS CI', title: 'Commerce International', category: 'bts', description: '', pageUrl: '/bts/commerce-international' },
  { slug: 'bts-pi', name: 'BTS PI', title: 'Professions Immobilières', category: 'bts', description: '', pageUrl: '/bts/professions-immobilieres' },
  { slug: 'bts-cg', name: 'BTS CG', title: 'Comptabilité et Gestion', category: 'bts', description: '', pageUrl: '/bts/comptabilite-gestion' },
  { slug: 'vtc', name: 'VTC', title: 'Chauffeur VTC', category: 'vtc', description: '', pageUrl: '/vtc' },
]

export const seedApsSessionId = 'seed-aps-septembre-2026';

export async function seedAdminData(prismaClient?: any) {
  console.log('[ADMIN_SEED] seed started');
  const prisma = prismaClient || await getPrisma();
  if (!prisma) throw new Error('Base de données serveur indisponible.');

  for (const training of seedTrainings) {
    await prisma.training.upsert({
      where: { slug: training.slug },
      update: { ...training, isActive: true },
      create: { ...training, isActive: true },
    });
  }
  console.log('[ADMIN_SEED] trainings created / updated');

  const aps = await prisma.training.findUniqueOrThrow({ where: { slug: 'aps' } });
  await prisma.trainingSession.upsert({
    where: { id: seedApsSessionId },
    update: {
      trainingId: aps.id,
      title: 'Session APS septembre 2026',
      startDate: new Date('2026-09-07T00:00:00.000Z'),
      endDate: new Date('2026-10-09T00:00:00.000Z'),
      examDate: new Date('2026-10-12T00:00:00.000Z'),
      priceCents: 165000,
      priceLabel: '1 650 €',
      location: 'Puget-sur-Argens / Côte d’Azur',
      status: 'OPEN',
      seatsLeft: 8,
      registrationUrl: '/formations-securite/aps',
      publicNotes: 'Formation de 5 semaines, soit 175 heures.',
      isHighlighted: true,
    },
    create: {
      id: seedApsSessionId,
      trainingId: aps.id,
      title: 'Session APS septembre 2026',
      startDate: new Date('2026-09-07T00:00:00.000Z'),
      endDate: new Date('2026-10-09T00:00:00.000Z'),
      examDate: new Date('2026-10-12T00:00:00.000Z'),
      priceCents: 165000,
      priceLabel: '1 650 €',
      location: 'Puget-sur-Argens / Côte d’Azur',
      status: 'OPEN',
      seatsLeft: 8,
      registrationUrl: '/formations-securite/aps',
      publicNotes: 'Formation de 5 semaines, soit 175 heures.',
      isHighlighted: true,
    },
  });
  console.log('[ADMIN_SEED] sessions created / updated');

  return { ok: true, trainingsCount: seedTrainings.length, sessionsCount: 1 };
}
