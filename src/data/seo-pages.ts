export type SeoPage = {
  title: string;
  description: string;
  label: string;
  parent?: string;
  type?: 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage';
  noindex?: boolean;
  courseName?: string;
  serviceName?: string;
};

/** Editorial metadata for canonical pages. Historic addresses stay in url-redirects.json. */
export const seoPages: Record<string, SeoPage> = {
  '/': {
    title: 'Formations sécurité, VTC et BTS',
    description: 'Préparez votre métier avec Intégrale Academy : formations sécurité privée, incendie, VTC et BTS en alternance, à Puget-sur-Argens et à distance selon le parcours.',
    label: 'Accueil',
  },
  '/ecole': {
    title: 'École de formation à Puget-sur-Argens',
    description: 'Découvrez Intégrale Academy à Puget-sur-Argens : notre école, l’équipe pédagogique et les espaces consacrés aux formations professionnelles et aux BTS.',
    label: 'Notre école', type: 'AboutPage',
  },
  '/centres': {
    title: 'Nos écoles et lieux de formation',
    description: 'Retrouvez les adresses et accès aux lieux de formation Intégrale Academy à Puget-sur-Argens, Paris et Aurillac. Consultez les parcours et sessions proposés.',
    label: 'Lieux de formation', type: 'CollectionPage',
  },
  '/formations-securite': {
    title: 'Formations sécurité privée et incendie',
    description: 'Découvrez les formations APS, A3P, DESP, SSIAP et SST : programmes, prérequis, dates et financements pour préparer votre métier dans la sécurité.',
    label: 'Formations sécurité', type: 'CollectionPage',
  },
  '/formations-securite/aps': {
    title: 'Formation APS à Puget-sur-Argens (Var)',
    description: 'Préparez le métier d’agent de prévention et de sécurité avec la formation APS à Puget-sur-Argens : programme, distanciel, pratique, examen et financement.',
    label: 'Formation APS', parent: '/formations-securite',
  },
  '/formations-securite/a3p-apr': {
    title: 'Formation A3P – Protection rapprochée',
    description: 'Formez-vous à la protection rapprochée avec le parcours A3P à Puget-sur-Argens : 328 heures hors examen, mises en situation, prérequis et financements.',
    label: 'Formation A3P', parent: '/formations-securite',
  },
  '/formations-securite/cpsp': {
    title: 'Formation CPSP – Chef de poste sécurité privée',
    description: 'Découvrez la formation chef de poste en sécurité privée à Puget-sur-Argens : coordination d’équipe, consignes, suivi des prestations et encadrement de proximité.',
    label: 'Formation CPSP', parent: '/formations-securite',
    courseName: 'Formation CPSP – Chef de poste en sécurité privée',
  },
  '/formations-securite/ssiap': {
    title: 'Formations SSIAP – Sécurité incendie',
    description: 'Choisissez votre parcours SSIAP à Puget-sur-Argens : SSIAP 1, 2 ou 3, recyclage et remise à niveau. Découvrez les métiers, prérequis et modalités.',
    label: 'Formations SSIAP', parent: '/formations-securite', type: 'CollectionPage',
  },
  '/formations-securite/ssiap-1': {
    title: 'Formation SSIAP 1 à Puget-sur-Argens',
    description: 'Préparez le diplôme SSIAP 1 d’agent de sécurité incendie à Puget-sur-Argens. Consultez le programme, les prérequis, l’examen et les prochaines sessions.',
    label: 'Formation SSIAP 1', parent: '/formations-securite/ssiap',
  },
  '/formations-securite/ssiap-2': {
    title: 'Formation SSIAP 2 – Chef d’équipe incendie',
    description: 'Évoluez vers le métier de chef d’équipe de sécurité incendie avec le SSIAP 2 à Puget-sur-Argens : programme, conditions d’accès, examen et inscription.',
    label: 'Formation SSIAP 2', parent: '/formations-securite/ssiap',
  },
  '/formations-securite/ssiap-3': {
    title: 'Formation SSIAP 3 – Chef de service incendie',
    description: 'Découvrez le SSIAP 3 pour préparer les responsabilités de chef de service de sécurité incendie : réglementation, gestion des risques, management et examen.',
    label: 'Formation SSIAP 3', parent: '/formations-securite/ssiap',
  },
  '/formations-securite/recyclage-remise-a-niveau-ssiap': {
    title: 'Recyclage et remise à niveau SSIAP 1, 2 et 3',
    description: 'Actualisez vos compétences en sécurité incendie : recyclage ou remise à niveau SSIAP 1, 2 et 3 à Puget-sur-Argens, selon votre diplôme et votre situation.',
    label: 'Recyclage et remise à niveau SSIAP', parent: '/formations-securite/ssiap',
  },
  '/formations-securite/sst': {
    title: 'Formation SST – Secourisme au travail',
    description: 'Apprenez à prévenir les risques et porter secours au travail : formation SST de 14 heures en présentiel à Puget-sur-Argens, avec exercices et mises en situation.',
    label: 'Formation SST', parent: '/formations-securite',
  },
  '/despvaeouinitial': {
    title: 'DESP : formation initiale ou VAE ?',
    description: 'Vous souhaitez diriger une entreprise de sécurité privée ? Comparez le DESP en formation initiale et la VAE selon votre expérience, votre projet et vos besoins.',
    label: 'Dirigeant de sécurité privée', parent: '/formations-securite', type: 'CollectionPage',
  },
  '/dirigeant': {
    title: 'Formation DESP initial – Dirigeant sécurité privée',
    description: 'Préparez le titre de dirigeant d’entreprise de sécurité privée avec le DESP initial : formation à distance et en présentiel, gestion, réglementation et management.',
    label: 'DESP en formation initiale', parent: '/despvaeouinitial',
    courseName: 'Formation DESP initial – Dirigeant d’entreprise de sécurité privée',
  },
  '/vaedirigeant': {
    title: 'VAE DESP – Dirigeant de sécurité privée',
    description: 'Faites reconnaître votre expérience avec la VAE DESP : étude de recevabilité, dossier de preuves, accompagnement et préparation au jury de certification.',
    label: 'DESP par la VAE', parent: '/despvaeouinitial',
    serviceName: 'Accompagnement à la VAE DESP',
  },
  '/vtc': {
    title: 'Formation chauffeur VTC – Théorie et pratique',
    description: 'Préparez l’examen chauffeur VTC avec Intégrale Academy : théorie en ligne, conduite professionnelle, véhicule double commande et frais d’examen inclus.',
    label: 'Formation chauffeur VTC', courseName: 'Formation chauffeur VTC',
  },
  '/bts': {
    title: 'BTS en alternance dans le Var et à distance',
    description: 'Préparez un BTS en alternance à Puget-sur-Argens ou à distance : MOS, MCO, NDRC, commerce international, immobilier ou comptabilité. Découvrez les parcours.',
    label: 'BTS en alternance', type: 'CollectionPage',
  },
  '/bts/mos': {
    title: 'BTS MOS en alternance – Management de la sécurité',
    description: 'Préparez le BTS Management opérationnel de la sécurité en alternance à Puget-sur-Argens ou à distance : prestations de sécurité, management et relation client.',
    label: 'BTS MOS', parent: '/bts',
  },
  '/bts/mco': {
    title: 'BTS MCO en alternance – Commerce et management',
    description: 'Préparez le BTS Management commercial opérationnel en alternance à Puget-sur-Argens ou à distance : vente, relation client, gestion et management d’équipe.',
    label: 'BTS MCO', parent: '/bts',
  },
  '/bts/ndrc': {
    title: 'BTS NDRC en alternance – Relation client',
    description: 'Préparez le BTS Négociation et digitalisation de la relation client à Puget-sur-Argens ou à distance : prospection, négociation, vente et outils numériques.',
    label: 'BTS NDRC', parent: '/bts',
  },
  '/bts/commerce-international': {
    title: 'BTS Commerce international en alternance',
    description: 'Préparez le BTS Commerce international en alternance, à Puget-sur-Argens ou à distance : langues, import-export et développement commercial international.',
    label: 'BTS Commerce international', parent: '/bts',
  },
  '/bts/professions-immobilieres': {
    title: 'BTS Professions immobilières en alternance',
    description: 'Préparez le BTS Professions immobilières en alternance, à Puget-sur-Argens ou à distance : transaction, gestion locative, copropriété et conseil immobilier.',
    label: 'BTS Professions immobilières', parent: '/bts',
  },
  '/bts/comptabilite-gestion': {
    title: 'BTS Comptabilité et gestion en alternance',
    description: 'Préparez le BTS Comptabilité et gestion en alternance, à Puget-sur-Argens ou à distance : comptabilité, fiscalité, gestion sociale et analyse financière.',
    label: 'BTS Comptabilité et gestion', parent: '/bts',
  },
  '/planning': {
    title: 'Dates des formations sécurité, VTC et BTS',
    description: 'Consultez les prochaines dates de formation Intégrale Academy. Filtrez par parcours et lieu pour préparer votre inscription et anticiper votre financement.',
    label: 'Planning des formations', type: 'CollectionPage',
  },
  '/tarifs': {
    title: 'Tarifs des formations sécurité et VTC',
    description: 'Comparez les tarifs, durées et prestations des formations APS, A3P, DESP, VAE, SSIAP, SST et VTC. Retrouvez les solutions de financement selon votre situation.',
    label: 'Tarifs des formations', type: 'CollectionPage',
  },
  '/financements': {
    title: 'Financer sa formation – CPF, alternance et aides',
    description: 'Étudiez les solutions pour financer votre formation : CPF, France Travail, alternance, employeur ou financement personnel. Intégrale Academy vous accompagne.',
    label: 'Financer sa formation', type: 'CollectionPage',
  },
  '/financements/cpf': {
    title: 'Financer sa formation avec le CPF',
    description: 'Préparez votre financement CPF : vérification de vos droits, choix d’une formation éligible et démarches sur Mon Compte Formation avec Intégrale Academy.',
    label: 'Financement CPF', parent: '/financements',
  },
  '/financements/france-travail': {
    title: 'Financement de formation avec France Travail',
    description: 'Construisez votre projet de formation avec France Travail : choix du parcours, devis, demande de financement et validation de votre dossier avec votre conseiller.',
    label: 'Financement France Travail', parent: '/financements',
  },
  '/financements/alternance': {
    title: 'Financement et inscription en BTS en alternance',
    description: 'Découvrez le fonctionnement de l’alternance chez Intégrale Academy : candidature en BTS, recherche d’entreprise, contrat et prise en charge de la formation.',
    label: 'Financement en alternance', parent: '/financements',
  },
  '/entreprises': {
    title: 'Recrutement et formation en sécurité privée',
    description: 'Recrutez et formez vos équipes avec Intégrale Academy : alternance, BTS MOS et parcours adaptés aux besoins des entreprises de sécurité privée.',
    label: 'Solutions entreprises',
  },
  '/contact': {
    title: 'Contact et admission en formation',
    description: 'Contactez Intégrale Academy pour choisir votre formation, connaître les dates, préparer votre admission ou étudier votre financement avec notre équipe.',
    label: 'Contact et admissions', type: 'ContactPage',
  },
  '/faq': {
    title: 'FAQ BTS – Admission, alternance et financement',
    description: 'Retrouvez les réponses à vos questions sur les BTS Intégrale Academy : candidature, alternance, financement, rythme des cours et accompagnement.',
    label: 'Questions sur les BTS', parent: '/bts',
  },
  '/dossiersfc': {
    title: 'Brochures des formations sécurité et VTC',
    description: 'Consultez les brochures APS, A3P, SSIAP 1, DESP initial, VAE DESP et VTC pour découvrir les programmes, modalités et informations utiles à votre projet.',
    label: 'Brochures des formations', type: 'CollectionPage',
  },
  '/dossiersbts': {
    title: 'Brochures des BTS en alternance',
    description: 'Consultez les dossiers de présentation de nos BTS en alternance : métiers visés, programmes, modalités et accompagnement pour préparer votre candidature.',
    label: 'Brochures des BTS', parent: '/bts', type: 'CollectionPage',
  },
  '/mentions-legales': {
    title: 'Mentions légales',
    description: 'Retrouvez les mentions légales du site Intégrale Academy : identité de l’éditeur, coordonnées, hébergement, publication et propriété intellectuelle.',
    label: 'Mentions légales',
  },
  '/politique-confidentialite': {
    title: 'Politique de confidentialité et données personnelles',
    description: 'Découvrez comment Intégrale Academy traite les données transmises pour vos demandes d’informations et candidatures, ainsi que vos droits et les contacts utiles.',
    label: 'Politique de confidentialité',
  },
  '/gestion': {
    title: 'Tests et ressources de formation',
    description: 'Accès aux tests et ressources utiles aux candidats Intégrale Academy.',
    label: 'Tests et ressources', noindex: true,
  },
  '/rdvvtc': {
    title: 'Demande de rappel VTC confirmée',
    description: 'Confirmation de votre demande de rappel concernant la formation chauffeur VTC Intégrale Academy.',
    label: 'Confirmation de rappel VTC', noindex: true,
  },
  '/rdvconfirmedirigeant': {
    title: 'Demande de rappel dirigeant confirmée',
    description: 'Confirmation de votre demande de rappel concernant le parcours dirigeant de sécurité privée Intégrale Academy.',
    label: 'Confirmation de rappel dirigeant', noindex: true,
  },
};
