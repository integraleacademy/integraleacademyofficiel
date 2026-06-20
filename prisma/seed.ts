const trainings = [
  ['aps','APS','Agent de Prévention et de Sécurité','sécurité','/formations-securite/aps'],
  ['ssiap-1','SSIAP 1','Service de Sécurité Incendie et d’Assistance à Personnes','sécurité','/formations-securite/ssiap-1'],
  ['bts-mos','BTS MOS','Management Opérationnel de la Sécurité','bts','/bts/mos'],
  ['bts-mco','BTS MCO','Management Commercial Opérationnel','bts','/bts/mco'],
  ['vtc','VTC','Chauffeur VTC','vtc','/formations-vtc'],
  ['desp-dssp','DESP / DSSP','Dirigeant d’entreprise de sécurité privée','direction','/formations-securite/desp'],
];
async function main(){
  const importer = new Function('m', 'return import(m)') as (m: string) => Promise<any>;
  const { PrismaClient } = await importer('@prisma/client');
  const prisma = new PrismaClient();
  for (const [slug,name,title,category,pageUrl] of trainings) await prisma.training.upsert({where:{slug},update:{name,title,category,pageUrl,isActive:true},create:{slug,name,title,category,pageUrl}});
  const aps = await prisma.training.findUniqueOrThrow({where:{slug:'aps'}});
  await prisma.trainingSession.upsert({where:{id:'seed-aps-septembre-2026'},update:{},create:{id:'seed-aps-septembre-2026',trainingId:aps.id,title:'Session APS septembre 2026',startDate:new Date('2026-09-07'),endDate:new Date('2026-10-09'),examDate:new Date('2026-10-12'),priceCents:165000,priceLabel:'1 650 €',location:'Puget-sur-Argens / Côte d’Azur',status:'OPEN',seatsLeft:8,registrationUrl:'/formations-securite/aps',publicNotes:'Formation de 5 semaines, soit 175 heures.',isHighlighted:true}});
  await prisma.$disconnect();
}
main().catch(e=>{console.error(e);process.exit(1)});
