import { btsFormations } from './bts';
import { financements } from './financements';
import { contactInfo, locations } from './locations';
import { planning, vtcExamDates } from './planning';
import { securityFormations, vtcFormation } from './formations';

export const academyFallbackResponse =
  'Je préfère vous orienter vers notre équipe pour une réponse précise. Vous pouvez nous contacter au 04 22 47 07 68.';

export const academyKnowledge = {
  identity: {
    name: 'Intégrale Academy',
    positioning:
      'Centre de formation professionnelle spécialisé en sécurité privée, sécurité incendie, VTC et BTS en alternance.',
    tone:
      'Conseiller professionnel, clair, rassurant, orienté inscription ou prise de contact lorsque cela est pertinent.',
  },
  formations: {
    aps: securityFormations.find((formation) => formation.slug.includes('aps')),
    ssiap: securityFormations.filter((formation) => formation.title.toLowerCase().includes('ssiap')),
    bts: btsFormations,
    vtc: vtcFormation,
    despDssp: securityFormations.find((formation) => formation.slug.includes('desp')),
    security: securityFormations,
  },
  financements: {
    cpf: financements.find((item) => item.title === 'CPF'),
    franceTravail: financements.find((item) => item.title === 'France Travail'),
    alternance: financements.find((item) => item.title === 'Alternance'),
    all: financements,
  },
  cnaps: {
    summary:
      'Pour les formations de sécurité privée, une autorisation préalable CNAPS ou une carte professionnelle valide peut être nécessaire selon le parcours.',
    references: [
      'CNAPS FOR-083-2027-02-08-20200755135',
      'TFP APS : RNCP n°36648',
      'TFP A3P : RNCP n°38002',
      'DESP : RNCP n°40385',
    ],
  },
  documents: [
    'Pièce d’identité en cours de validité.',
    'Justificatifs liés au projet et au financement demandé.',
    'Autorisation préalable CNAPS ou carte professionnelle lorsque le référentiel sécurité l’exige.',
    'Pour SSIAP : aptitude médicale de moins de 3 mois et secourisme valide.',
    'Pour VTC : permis B valide et dossier conforme aux conditions d’accès à la carte VTC.',
    'Pour BTS : niveau bac ou titre équivalent selon la formation, CV et éléments liés à l’alternance.',
  ],
  contact: {
    phone: contactInfo.phone,
    email: contactInfo.email,
    hours: contactInfo.hours,
    locations,
  },
  usefulLinks: [
    { label: 'Formations sécurité', href: '/formations-securite' },
    { label: 'BTS', href: '/bts' },
    { label: 'VTC', href: '/vtc' },
    { label: 'Financements', href: '/financements' },
    { label: 'Planning', href: '/planning' },
    { label: 'Contact', href: '/contact' },
  ],
  dates: {
    planning,
    vtcExamDates,
    note: 'Ne pas inventer de dates. Si une session n’est pas listée, inviter à contacter l’équipe.',
  },
  lead: {
    prompt: 'Souhaitez-vous laisser vos coordonnées pour être rappelé ?',
    futureFields: ['Nom', 'Prénom', 'Téléphone', 'Email', 'Formation souhaitée', 'Message'],
  },
} as const;

export type AcademyKnowledge = typeof academyKnowledge;
