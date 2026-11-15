type BrochureCardContent = { title: string; category: string; cover: string };

const cover = (index: number) => '/images/dossiers/cover-' + String(index).padStart(2, '0') + '.png';

export const courseBrochures: Record<string, BrochureCardContent | undefined> = {
  'aps': { title: 'Agent de prévention et de sécurité', category: 'TFP APS', cover: cover(3) },
  'a3p-apr': { title: 'Agent de protection physique des personnes', category: 'A3P', cover: cover(1) },
  'cpsp': { title: 'Chef de poste en sécurité privée', category: 'CPSP', cover: '/images/aps/experience/atelier-pc-securite.webp' },
  'sst': { title: 'Sauveteur secouriste du travail', category: 'SST', cover: '/images/sst/manuel/couverture-sst.webp' },
  'ssiap': { title: 'Les formations en sécurité incendie', category: 'Filière SSIAP', cover: '/images/ssiap-2/coordination-pc.webp' },
  'ssiap-1': { title: 'Agent de sécurité incendie', category: 'SSIAP 1', cover: cover(2) },
  'ssiap-2': { title: 'Chef d’équipe de sécurité incendie', category: 'SSIAP 2', cover: '/images/ssiap-2/chef-equipe.webp' },
  'ssiap-3': { title: 'Chef de service de sécurité incendie', category: 'SSIAP 3', cover: '/images/ssiap-3/chef-service.webp' },
  'recyclage-remise-a-niveau-ssiap': { title: 'Recyclage et remise à niveau', category: 'SSIAP 1, 2 et 3', cover: '/images/ssiap-2/formation-equipe.webp' },
  'despvaeouinitial': { title: 'Dirigeant d’entreprise de sécurité privée', category: 'DESP · Initial ou VAE', cover: cover(4) },
  'dirigeant': { title: 'Dirigeant d’entreprise de sécurité privée', category: 'DESP · Formation initiale', cover: cover(4) },
  'vaedirigeant': { title: 'Dirigeant d’entreprise de sécurité privée', category: 'DESP · VAE', cover: cover(6) },
  'vtc': { title: 'Chauffeur VTC', category: 'Formation VTC', cover: cover(5) },
  'mos': { title: 'Management opérationnel de la sécurité', category: 'BTS en alternance', cover: cover(7) },
  'mco': { title: 'Management commercial opérationnel', category: 'BTS en alternance', cover: cover(9) },
  'ndrc': { title: 'Négociation et digitalisation de la relation client', category: 'BTS en alternance', cover: cover(10) },
  'commerce-international': { title: 'Commerce international', category: 'BTS en alternance', cover: cover(11) },
  'professions-immobilieres': { title: 'Professions immobilières', category: 'BTS en alternance', cover: cover(8) },
  'comptabilite-gestion': { title: 'Comptabilité et gestion', category: 'BTS en alternance', cover: '/images/bts/tenues-2026/cg-carte.webp' },
};
