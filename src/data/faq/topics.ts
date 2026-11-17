export const faqTopics = [
  { id: 'general', label: 'Questions générales', family: 'Informations pratiques', path: '/' },
  { id: 'financements', label: 'Financements', family: 'Informations pratiques', path: '/financements' },
  { id: 'entreprises', label: 'Entreprises et recrutement', family: 'Informations pratiques', path: '/entreprises' },
  { id: 'aps', label: 'APS · Agent de sécurité privée', family: 'Sécurité', path: '/formations-securite/aps' },
  { id: 'a3p', label: 'A3P · Protection rapprochée', family: 'Sécurité', path: '/formations-securite/a3p-apr' },
  { id: 'cpsp', label: 'CPSP · Chef de poste en sécurité privée', family: 'Sécurité', path: '/formations-securite/cpsp' },
  { id: 'desp', label: 'DESP · Choisir son parcours', family: 'Sécurité', path: '/despvaeouinitial' },
  { id: 'desp-initial', label: 'DESP · Formation initiale', family: 'Sécurité', path: '/dirigeant' },
  { id: 'desp-vae', label: 'DESP · VAE', family: 'Sécurité', path: '/vaedirigeant' },
  { id: 'ssiap', label: 'SSIAP · Choisir son niveau', family: 'Incendie et secourisme', path: '/formations-securite/ssiap' },
  { id: 'ssiap-1', label: 'SSIAP 1 · Agent', family: 'Incendie et secourisme', path: '/formations-securite/ssiap-1' },
  { id: 'ssiap-2', label: 'SSIAP 2 · Chef d’équipe', family: 'Incendie et secourisme', path: '/formations-securite/ssiap-2' },
  { id: 'ssiap-3', label: 'SSIAP 3 · Chef de service', family: 'Incendie et secourisme', path: '/formations-securite/ssiap-3' },
  { id: 'recyclage-remise-a-niveau-ssiap', label: 'SSIAP · Recyclage et remise à niveau', family: 'Incendie et secourisme', path: '/formations-securite/recyclage-remise-a-niveau-ssiap' },
  { id: 'sst', label: 'SST · Sauveteur secouriste du travail', family: 'Incendie et secourisme', path: '/formations-securite/sst' },
  { id: 'vtc', label: 'Chauffeur VTC', family: 'Transport', path: '/vtc' },
  { id: 'bts', label: 'BTS · Questions communes', family: 'BTS en alternance', path: '/bts' },
  { id: 'bts-mos', label: 'BTS MOS · Management opérationnel de la sécurité', family: 'BTS en alternance', path: '/bts/mos' },
  { id: 'bts-mco', label: 'BTS MCO · Management commercial opérationnel', family: 'BTS en alternance', path: '/bts/mco' },
  { id: 'bts-ndrc', label: 'BTS NDRC · Négociation et digitalisation de la relation client', family: 'BTS en alternance', path: '/bts/ndrc' },
  { id: 'bts-ci', label: 'BTS CI · Commerce international', family: 'BTS en alternance', path: '/bts/commerce-international' },
  { id: 'bts-pi', label: 'BTS PI · Professions immobilières', family: 'BTS en alternance', path: '/bts/professions-immobilieres' },
  { id: 'bts-cg', label: 'BTS CG · Comptabilité et gestion', family: 'BTS en alternance', path: '/bts/comptabilite-gestion' },
  { id: 'cpiaa', label: 'CPIAA · Chef de produit IA et automatisation', family: 'Projets de certification', path: '/certifications/cpiaa' },
  { id: 'eiag', label: 'EIAG · Ingénierie de l’IA générative', family: 'Projets de certification', path: '/certifications/eiag' },
] as const;

export type FaqTopic = (typeof faqTopics)[number]['id'];

export function faqHref(topic?: FaqTopic) {
  return topic ? `/faq?formation=${topic}` : '/faq';
}
