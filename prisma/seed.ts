const seedTrainings = [
  { slug: 'aps', name: 'APS', title: 'Agent de Prévention et de Sécurité', category: 'sécurité', description: '', pageUrl: '/formations-securite/aps' },
  { slug: 'ssiap-1', name: 'SSIAP 1', title: 'Service de Sécurité Incendie et d’Assistance à Personnes', category: 'sécurité', description: '', pageUrl: '/formations-securite/ssiap-1' },
  { slug: 'bts-mos', name: 'BTS MOS', title: 'Management Opérationnel de la Sécurité', category: 'bts', description: '', pageUrl: '/bts/mos' },
  { slug: 'bts-mco', name: 'BTS MCO', title: 'Management Commercial Opérationnel', category: 'bts', description: '', pageUrl: '/bts/mco' },
  { slug: 'vtc', name: 'VTC', title: 'Chauffeur VTC', category: 'vtc', description: '', pageUrl: '/formations-vtc' },
  { slug: 'desp-dssp', name: 'DESP / DSSP', title: 'Dirigeant d’entreprise de sécurité privée', category: 'direction', description: '', pageUrl: '/formations-securite/desp' },
];

async function main() {
  const importer = new Function('m', 'return import(m)') as (m: string) => Promise<any>;
  const { PrismaClient } = await importer('@prisma/client');
  const prisma = new PrismaClient();
  try {
    console.log('[ADMIN_SEED] seed started');
    for (const training of seedTrainings) {
      await prisma.training.upsert({ where: { slug: training.slug }, update: { ...training, isActive: true }, create: { ...training, isActive: true } });
    }
    console.log('[ADMIN_SEED] trainings created / updated');
    const aps = await prisma.training.findUniqueOrThrow({ where: { slug: 'aps' } });
    await prisma.trainingSession.upsert({
      where: { id: 'seed-aps-septembre-2026' },
      update: { trainingId: aps.id, title: 'Session APS septembre 2026', startDate: new Date('2026-09-07T00:00:00.000Z'), endDate: new Date('2026-10-09T00:00:00.000Z'), examDate: new Date('2026-10-12T00:00:00.000Z'), priceCents: 165000, priceLabel: '1 650 €', location: 'Puget-sur-Argens / Côte d’Azur', status: 'OPEN', seatsLeft: 8, registrationUrl: '/formations-securite/aps', publicNotes: 'Formation de 5 semaines, soit 175 heures.', isHighlighted: true },
      create: { id: 'seed-aps-septembre-2026', trainingId: aps.id, title: 'Session APS septembre 2026', startDate: new Date('2026-09-07T00:00:00.000Z'), endDate: new Date('2026-10-09T00:00:00.000Z'), examDate: new Date('2026-10-12T00:00:00.000Z'), priceCents: 165000, priceLabel: '1 650 €', location: 'Puget-sur-Argens / Côte d’Azur', status: 'OPEN', seatsLeft: 8, registrationUrl: '/formations-securite/aps', publicNotes: 'Formation de 5 semaines, soit 175 heures.', isHighlighted: true },
    });
    console.log('[ADMIN_SEED] sessions created / updated');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => { console.error(error); process.exit(1); });
