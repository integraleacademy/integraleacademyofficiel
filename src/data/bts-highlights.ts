import type { BtsTrainingHighlight } from '@/components/BtsTrainingGrid';

export const btsCommon = {
  certification: 'Diplôme d’État',
  level: 'Bac +2',
  duration: '2 ans',
  rhythm: 'Alternance',
  onsiteLocation: 'Puget-sur-Argens',
  distanceMode: 'En visioconférence',
} as const;

export const btsHighlights: BtsTrainingHighlight[] = [
  {
    ...btsCommon,
    slug: '/bts/mos',
    shortTitle: 'BTS MOS',
    title: 'Management Opérationnel de la Sécurité',
    category: 'Management & sécurité',
    description: 'Pilotez des prestations de sécurité, coordonnez les équipes et développez la relation client.',
    visual: 'mos',
    featured: true,
  },
  {
    ...btsCommon,
    slug: '/bts/mco',
    shortTitle: 'BTS MCO',
    title: 'Management Commercial Opérationnel',
    category: 'Commerce',
    description: 'Développez la vente, la relation client et le management pour piloter efficacement une unité commerciale.',
    visual: 'mco',
  },
  {
    ...btsCommon,
    slug: '/bts/ndrc',
    shortTitle: 'BTS NDRC',
    title: 'Négociation et Digitalisation de la Relation Client',
    category: 'Relation client',
    description: 'Maîtrisez la prospection, la négociation et la fidélisation, en face à face comme sur les canaux digitaux.',
    visual: 'ndrc',
  },
  {
    ...btsCommon,
    slug: '/bts/commerce-international',
    shortTitle: 'BTS CI',
    title: 'Commerce International',
    category: 'International',
    description: 'Préparez-vous à développer des marchés, gérer l’import-export et coordonner des opérations à l’international.',
    visual: 'ci',
  },
  {
    ...btsCommon,
    slug: '/bts/professions-immobilieres',
    shortTitle: 'BTS PI',
    title: 'Professions Immobilières',
    category: 'Immobilier',
    description: 'Formez-vous à la transaction, à la gestion locative, à la copropriété et au conseil immobilier.',
    visual: 'pi',
  },
  {
    ...btsCommon,
    slug: '/bts/comptabilite-gestion',
    shortTitle: 'BTS CG',
    title: 'Comptabilité et Gestion',
    category: 'Comptabilité',
    description: 'Maîtrisez la comptabilité, la gestion et le pilotage financier.',
    visual: 'cg',
  },
];
