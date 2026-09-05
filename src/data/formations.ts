export type FormationCategory = 'security' | 'bts' | 'vtc';
export type Formation = {
  slug: string;
  category: FormationCategory;
  title: string;
  short: string;
  duration: string;
  audience: string;
  prerequisites: string;
  locations: string;
  financing: string;
  certification: string;
  price?: string;
  objectives: string[];
  program: string[];
  evaluation: string[];
  outcomes: string[];
  why: string[];
  seo: { title: string; description: string };
};

export const securityFormations: Formation[] = [
  {
    slug: '/formations-securite/aps',
    category: 'security',
    title: 'Formation Agent de Prévention et de Sécurité APS',
    short: 'Devenez agent de sécurité privée et préparez le TFP APS, titre à finalité professionnelle RNCP n°36648 de niveau 3.',
    duration: '175 heures · 51 heures maximum à distance · 124 heures minimum en présentiel',
    audience: 'Personnes souhaitant demander la carte professionnelle « surveillance humaine ou surveillance par les systèmes électroniques de sécurité ou gardiennage ».',
    prerequisites: 'Autorisation préalable d’entrée en formation délivrée par le CNAPS ou carte professionnelle valide ; maîtrise suffisante du français et connaissance des principes de la République. Pour les ressortissants étrangers, la fiche RNCP fournie mentionne un titre de séjour détenu depuis au moins cinq ans, sous réserve de la situation individuelle.',
    locations: 'Puget-sur-Argens, Côte d’Azur, entre Cannes et Saint-Tropez',
    financing: 'CPF, France Travail, employeur ou OPCO, ou paiement en plusieurs fois selon le dossier.',
    certification: 'TFP Agent de Prévention et de Sécurité · RNCP n°36648 · niveau 3',
    price: '1 650 €',
    objectives: [
      'Assurer la protection des personnes et des biens.',
      'Appliquer les règles juridiques et déontologiques liées à la sécurité privée.',
      'Effectuer des rondes, surveiller un site et contrôler les accès.',
      'Gérer une situation conflictuelle, une alarme ou un incident.',
      'Alerter les secours ou la hiérarchie et porter assistance à une personne.',
      'Effectuer une palpation de sécurité ou une inspection visuelle des bagages dans le respect du cadre légal.',
      'Utiliser les bases de la télésurveillance, de la vidéoprotection et des outils de traçabilité.',
    ],
    program: [
      'UV 1 — SST, 14 h : secours à personne et prévention, dont 7 h de pratique.',
      'UV 2 — Environnement juridique, 22 h : livre VI du CSI, déontologie, responsabilités, article 73, libertés publiques et principes de la République ; jusqu’à 20 h à distance.',
      'UV 3 — Gestion des conflits, 14 h : prévention, posture, communication et mises en situation ; jusqu’à 3 h à distance et 7 h de pratique.',
      'UV 4 — Module stratégique, 7 h : consignes, compte rendu, outils informatiques et main courante électronique ; jusqu’à 4 h à distance.',
      'UV 5 — Prévention des risques d’incendie, 7 h : alarme, évacuation, accueil des secours et moyens de première intervention sur feu réel ; 3 h de pratique.',
      'UV 6 — Appréhension dans le cadre du métier, 7 h : application de l’article 73 du Code de procédure pénale ; jusqu’à 3 h à distance.',
      'UV 7 — Prévention des risques terroristes, 13 h : détection, protection, alerte, forces de l’ordre et secourisme tactique ; jusqu’à 7 h à distance et 3,5 h de pratique.',
      'UV 8 — Module professionnel, 45 h : accueil, poste de sécurité, rondes, contrôle des personnes, véhicules et matériels ; 25 h de pratique.',
      'UV 9 — Palpation et inspection des bagages, 7 h : cadre légal, point d’inspection-filtrage et prise en compte des publics ; 4 h de pratique.',
      'UV 10 — Surveillance électronique, 7 h : télésurveillance, vidéoprotection et chaîne de télésécurité ; 4 h de pratique.',
      'UV 11 — Gestion des risques, 11 h : alarmes, levée de doute, GTC/GTB, PTI/DATI et risque électrique ; jusqu’à 2 h à distance et 5 h de pratique.',
      'UV 12 — Événementiel spécifique, 7 h : rassemblements, filtrage, billetterie, mouvements de foule et urgence ; jusqu’à 7 h à distance.',
      'UV 13 — Situations conflictuelles dégradées, 7 h : stress et réponse nécessaire et proportionnée ; 4 h de pratique.',
      'UV 14 — Risques industriels, 7 h : document unique, ICPE, SEVESO, ORSEC, SGH, CLP et ATEX ; jusqu’à 5 h à distance.',
    ],
    evaluation: [
      'QCU contextualisés organisés électroniquement à partir d’une banque de plus de 1 000 questions régulièrement actualisée.',
      'Deux mises en situation professionnelles individuelles, notamment autour de la ronde et du poste de contrôle.',
      'Évaluation devant un jury comprenant au minimum un représentant salarié et un représentant employeur justifiant chacun d’au moins deux années d’exercice.',
    ],
    outcomes: [
      'Agent de prévention et de sécurité, agent de sécurité privée ou agent de surveillance et de gardiennage.',
      'Agent rondier, agent d’intervention mobile, agent de contrôle d’accès ou agent de sécurité pré-vol.',
      'Agent de sécurité événementielle ou arrière-caisse ; code ROME K2503.',
    ],
    why: [
      'Programme CPNEFP version V3.2 mis à jour le 23 juillet 2026.',
      'Centre situé à Puget-sur-Argens, en Côte d’Azur.',
      'Accompagnement pour la demande d’autorisation préalable CNAPS.',
      'Aide au montage du financement CPF, France Travail, employeur ou OPCO.',
      '63,5 heures de pratique et 60,5 heures de théorie en présentiel.',
      'Examen organisé avec des professionnels du secteur de la sécurité privée.',
      'Possibilité de paiement en plusieurs fois selon le dossier.',
    ],
    seo: {
      title: 'Formation APS – Devenez Agent de Sécurité Privée | Intégrale Sécurité Formations',
      description: 'Suivez la formation APS à Puget-sur-Argens et préparez le TFP APS RNCP 36648 : 175 h, dont 124 h minimum en présentiel et 51 h maximum à distance.',
    },
  },
  { slug:'/formations-securite/ssiap-1', category:'security', title:'SSIAP 1 - Agent de sécurité incendie', short:'Formation agent de sécurité incendie en ERP/IGH pour prévenir les risques, alerter, évacuer et intervenir.', duration:'67 heures minimum hors examen et déplacements', audience:'Candidats visant le diplôme SSIAP 1 en ERP ou IGH.', prerequisites:'Certificat médical de moins de 3 mois, secourisme valide et capacité à renseigner une main courante.', locations:'Puget-sur-Argens / Côte d’Azur', financing:'CPF, France Travail, paiement x3/x4/x10 selon éligibilité.', certification:'SSIAP 1 · RS5641 · SSIAP n°8323 – arrêté préfectoral n°26/099 du 29 mai 2026', price:'980 € · 1230 € avec SST', objectives:['Prévenir le risque incendie en ERP/IGH.','Assurer rondes incendie, contrôles, consignes d’alarme et évacuation.','Intervenir sur un départ de feu ou un incident technique.'], program:['Feu et conséquences.','Sécurité incendie.','Installations techniques.','Rôle et missions du SSIAP 1.','Concrétisation des acquis.'], evaluation:['QCM de 30 questions avec note minimale de 12/20.','Épreuve pratique de ronde avec anomalies et découverte d’un sinistre, résultat apte ou inapte.','Certification si réussite au QCM et décision apte à la pratique.'], outcomes:['Agent SSIAP 1.','Agent de sécurité incendie en ERP ou IGH.'], why:['Agrément SSIAP identifié.','Possibilité pack SSIAP 1 + SST.','Préparation cadrée à l’examen.'], seo:{title:'Formation SSIAP 1 à Puget-sur-Argens | Intégrale Academy',description:'Obtenez votre diplôme SSIAP 1 avec Intégrale Academy à Puget-sur-Argens. Formation réglementaire en sécurité incendie, examen officiel, financement CPF et option SST.'}},
  { slug:'/formations-securite/sst', category:'security', title:'SST - Sauveteur Secouriste du Travail', short:'Formation secourisme au travail rattachée à l’habilitation INRS.', duration:'Formation initiale SST : généralement 14 heures selon référentiel INRS', audience:'Salariés, candidats sécurité et entreprises.', prerequisites:'Aucun prérequis métier spécifique ; formation ouverte aux salariés, entreprises et candidats souhaitant acquérir les gestes de secours au travail.', locations:'Puget-sur-Argens selon sessions', financing:'Entreprise, financement personnel ou intégration dans un parcours sécurité selon dossier.', certification:'INRS SST H34836/2020/SST-1/O/07', objectives:['Protéger, examiner, alerter et secourir.','Contribuer à la prévention en entreprise.'], program:['Situer son rôle de SST dans l’organisation des secours et de la prévention.','Protéger, examiner, faire alerter ou alerter.','Secourir une victime de façon appropriée.','Participer à la prévention des risques professionnels.'], evaluation:['Évaluation certificative conforme au dispositif SST de l’INRS.','Mises en situation d’accident du travail et questionnement prévention.'], outcomes:['Sauveteur secouriste du travail.'], why:['Habilitation INRS indiquée par Intégrale Academy.','Complément utile aux formations sécurité.'], seo:{title:'Formation SST - Sauveteur Secouriste du Travail',description:'Formation SST Intégrale Academy : secourisme au travail, prévention et habilitation INRS.'}},
  { slug:'/formations-securite/a3p-apr', category:'security', title:'A3P / APR - Protection rapprochée', short:'Titre officiel d’agent de protection physique des personnes pour sécuriser les déplacements de personnalités.', duration:'9 semaines · 328 heures hors examen', audience:'Candidats aux métiers de la protection rapprochée.', prerequisites:'Autorisation préalable CNAPS ou carte professionnelle adaptée, conditions d’honorabilité et français de niveau B1 minimum.', locations:'Puget-sur-Argens · hébergement collectif possible sur demande', financing:'CPF, France Travail et facilités de paiement selon dossier.', certification:'TFP A3P · RNCP n°38002 · niveau 4', price:'4 200 €', objectives:['Justifier l’aptitude professionnelle nécessaire à la demande de carte A3P.','Préparer et sécuriser les déplacements privés ou professionnels.','Protéger personnalités politiques, médiatiques, sportives ou dirigeants.'], program:['9 unités de valeur réglementaires.','41 h de socle de base et 287 h de spécialité A3P.','92 h 50 de pratique.','Préparation de mission, protection, déplacements et secourisme tactique.'], evaluation:['QCU contextualisés avec seuils réglementaires.','Évaluations pratiques apte/inapte, mission complète, dossier et soutenance devant jury.'], outcomes:['Agent de protection rapprochée.','Agent de protection physique des personnes.','Conducteur de sécurité.'], why:['Agrément ADEF A3P.','Environnement Côte d’Azur adapté aux mises en situation.','Hébergement collectif possible.'], seo:{title:'Formation A3P / APR - Protection rapprochée',description:'Formation A3P / APR à Puget-sur-Argens : 328 h hors examen, protection physique des personnes, RNCP 38002 niveau 4.'}},
  { slug:'/formations-securite/desp', category:'security', title:'Dirigeant d’entreprise de sécurité privée / DSSP / DESP', short:'Certification RNCP niveau 5 pour créer, reprendre ou diriger une entreprise de sécurité privée.', duration:'Initial : 7 semaines · 245 heures ; VAE : environ 1 mois', audience:'Futurs dirigeants, créateurs, repreneurs ou managers sécurité privée.', prerequisites:'Niveau 4 ou expérience sécurité privée ; 3 ans minimum dans la sécurité privée.', locations:'Distanciel + Paris, Puget-sur-Argens ou Aurillac ; VAE possible en visioconférence', financing:'CPF, France Travail, paiement x3/x4/x10.', certification:'DESP · RNCP n°40385 · agrément dirigeant CNAPS', price:'4300 € initial · 3800 € VAE', objectives:['Obtenir l’agrément dirigeant CNAPS.','Piloter juridiquement, financièrement et commercialement une structure.','Manager les moyens humains et opérationnels.'], program:['Environnement juridique et stratégie.','Équipements et techniques sécurité privée.','Management, RH, droit du travail.','Appels d’offres, stratégie commerciale, création ou reprise.'], evaluation:['QCU 40 questions.','Mises en situation création/reprise, gestion, marketing et management.','Jury professionnel.'], outcomes:['Dirigeant d’entreprise de sécurité privée.','Créateur ou repreneur d’entreprise agréée.'], why:['Modalités hybrides flexibles.','Sites Paris, Côte d’Azur et Aurillac.','Parcours initial ou VAE.'], seo:{title:'Formation DESP - Dirigeant entreprise sécurité privée',description:'Formation DESP / DSSP RNCP 40385 : initial ou VAE, distanciel et présentiel Paris, Puget-sur-Argens ou Aurillac.'}},
  { slug:'/formations-securite/desp-initial', category:'security', title:'Formation DESP initial - Dirigeant d’entreprise de sécurité privée', short:'Parcours DESP initial pour apprendre étape par étape à créer, reprendre ou diriger une entreprise de sécurité privée.', duration:'7 semaines · 245 heures', audience:'Candidats souhaitant acquérir ou consolider les compétences de dirigeant en sécurité privée.', prerequisites:'Niveau 4 ou expérience à valider avec l’équipe admissions ; conditions CNAPS et honorabilité à vérifier.', locations:'Distanciel + présentiel à Paris, Puget-sur-Argens ou Aurillac selon les sessions.', financing:'CPF, France Travail, entreprise ou facilités de paiement selon dossier.', certification:'DESP · RNCP n°40385 · agrément dirigeant CNAPS', price:'4300 €', objectives:['Préparer l’agrément dirigeant CNAPS.','Acquérir les bases juridiques, réglementaires et opérationnelles de la sécurité privée.','Apprendre à piloter la gestion, le management et l’organisation d’une entreprise.'], program:['Cadre juridique de la sécurité privée et obligations du dirigeant.','Management, gestion et organisation d’une entreprise de sécurité privée.','Supports de cours, entraînements, évaluations et préparation au jury.','Création, reprise, pilotage commercial et administratif d’une structure.'], evaluation:['QCU de connaissances selon le référentiel DESP.','Mises en situation professionnelles de création, reprise, gestion, marketing et management.','Passage devant un jury professionnel.'], outcomes:['Dirigeant d’entreprise de sécurité privée.','Créateur ou repreneur d’entreprise agréée.','Responsable ou manager d’activité sécurité privée.'], why:['Parcours structuré pour apprendre le métier étape par étape.','Modalités hybrides avec centres Paris, Côte d’Azur et Aurillac selon planning.','Accompagnement pédagogique et administratif jusqu’à l’examen.'], seo:{title:'Formation DESP initial - Dirigeant sécurité privée',description:'Formation DESP initial RNCP 40385 : 245 h pour préparer l’agrément dirigeant CNAPS et créer, reprendre ou diriger une entreprise de sécurité privée.'}},
  { slug:'/formations-securite/desp-vae', category:'security', title:'DESP en VAE - Validation des acquis dirigeant sécurité privée', short:'Parcours VAE DESP pour faire reconnaître officiellement votre expérience en management, création, gestion ou direction.', duration:'Durée variable selon expérience, disponibilité, avancement du dossier et date du jury', audience:'Profils expérimentés en sécurité, encadrement, gestion, création ou direction d’entreprise.', prerequisites:'Expérience justifiée en management, création, gestion d’entreprise ou responsabilités proches du référentiel DESP.', locations:'Accompagnement VAE possible à distance selon organisation convenue ; jury selon convocation du certificateur.', financing:'CPF, employeur, OPCO, France Travail après accord ou financement personnel selon dossier.', certification:'Titre RNCP Dirigeant d’entreprise de sécurité privée · RNCP n°40385 · niveau 5', price:'3800 €', objectives:['Analyser votre expérience et vérifier sa cohérence avec le référentiel DESP.','Constituer un dossier de preuves solide pour la validation des acquis.','Préparer la rédaction du dossier de validation et le passage devant le jury de certification.'], program:['Diagnostic du parcours, des missions et des responsabilités exercées.','Sélection et organisation des preuves professionnelles.','Accompagnement au dossier de faisabilité.','Accompagnement au dossier de validation.','Préparation orale au jury de certification.'], evaluation:['Étude du dossier de validation.','Entretien ou passage devant le jury selon convocation.','VAE totale visée : les cinq activités du référentiel doivent être validées pour obtenir la certification complète.'], outcomes:['Reconnaissance du titre DESP par la VAE.','Dirigeant d’entreprise de sécurité privée après validation et démarches CNAPS.','Valorisation officielle de l’expérience professionnelle.'], why:['Parcours adapté aux profils déjà expérimentés.','Accompagnement ciblé sur les preuves, le dossier de faisabilité, le dossier de validation et le jury.','Démarche adaptée lorsque l’expérience couvre déjà les compétences du titre.'], seo:{title:'DESP VAE - Validation acquis dirigeant sécurité privée',description:'DESP en VAE RNCP 40385 : accompagnement dossier de preuves, dossier de validation et jury pour profils expérimentés en sécurité privée.'}},
  { slug:'/formations-securite/cpsp', category:'security', title:'CPSP - Chef de poste en sécurité privée', short:'Certificat complémentaire chef de poste en sécurité privée pour coordonner une équipe, transmettre les consignes et superviser l’activité opérationnelle.', duration:'Durée selon session CPSP', audience:'Agents de sécurité souhaitant évoluer vers l’encadrement de proximité et la coordination de poste.', prerequisites:'Carte professionnelle ou prérequis sécurité privée à valider avec l’équipe admissions selon le référentiel CPSP.', locations:'Puget-sur-Argens / Côte d’Azur', financing:'CPF, entreprise, OPCO, France Travail ou financement personnel selon dossier.', certification:'CCC CPSP · agrément ADEF CPSP 8325091511', price:'Tarif communiqué sur devis', objectives:['Assurer la fonction de chef de poste en sécurité privée.','Organiser les consignes, les transmissions et la coordination d’équipe.','Gérer les situations opérationnelles et rendre compte à la hiérarchie ou au client.'], program:['Rôle et responsabilités du chef de poste.','Organisation du poste de sécurité, consignes et main courante.','Coordination des agents et communication opérationnelle.','Gestion d’incidents, alerte, compte rendu et relation client.'], evaluation:['Évaluations théoriques et pratiques selon le référentiel CPSP.','Mises en situation professionnelles d’encadrement et de transmission des consignes.'], outcomes:['Chef de poste sécurité privée.','Chef d’équipe ou coordinateur opérationnel de sécurité.'], why:['Agrément ADEF CPSP mentionné par l’ancien site.','Parcours orienté évolution professionnelle des agents.','Accompagnement admissions et financement.'], seo:{title:'Formation CPSP - Chef de poste sécurité privée',description:'Formation CPSP chef de poste en sécurité privée à Puget-sur-Argens : encadrement de proximité, consignes et coordination.'}},
];


export const apsSessions2026 = [
  { dates: 'Du 8 juillet au 12 août 2026', exam: '13 août 2026' },
  { dates: 'Du 7 septembre au 9 octobre 2026', exam: '12 octobre 2026' },
  { dates: 'Du 3 novembre au 8 décembre 2026', exam: '9 décembre 2026' },
];

export const apsFaq = [
  { q: 'La formation APS est-elle 100 % à distance ?', a: 'Non. Sur les 175 heures, 51 heures au maximum peuvent être réalisées à distance et 124 heures au minimum se déroulent en présentiel à Puget-sur-Argens. L’examen final est organisé en présentiel.' },
  { q: 'Combien d’heures se font à distance ?', a: 'Le programme autorise jusqu’à 51 heures à distance, soit 29 % du parcours au maximum. La répartition exacte dépend du calendrier communiqué pour chaque session.' },
  { q: 'Combien d’heures se font en présentiel ?', a: 'Au moins 124 heures, soit 71 % du parcours, se déroulent au centre Intégrale Academy à Puget-sur-Argens : 63,5 heures de pratique et 60,5 heures de théorie en présentiel.' },
  { q: 'Comment accéder au e-learning ?', a: 'Lorsque la session comprend des séquences à distance, l’équipe pédagogique communique les accès et le calendrier. Elle explique comment se connecter, suivre les modules et valider l’avancement.' },
  { q: 'Que trouve-t-on sur la plateforme e-learning ?', a: 'La plateforme comprend des vidéos, des supports explicatifs, des exercices, des tests et un suivi d’avancement. Elle permet de travailler une partie des contenus théoriques à distance.' },
  { q: 'Le e-learning est-il obligatoire ?', a: 'Oui lorsqu’il est prévu au calendrier de la session. Les séquences programmées à distance font partie du parcours et doivent être suivies et validées ; elles ne peuvent pas dépasser 51 heures.' },
  { q: 'L’examen APS se fait-il à distance ?', a: 'Non. L’examen final APS se déroule en présentiel, selon les modalités prévues par la certification.' },
  { q: 'La formation APS permet-elle d’obtenir la carte professionnelle CNAPS ?', a: 'La formation permet d’obtenir le TFP APS, diplôme nécessaire pour demander ensuite la carte professionnelle CNAPS en surveillance humaine, surveillance électronique ou gardiennage.' },
  { q: 'Combien de temps dure la formation ?', a: 'La formation dure 175 heures au total : jusqu’à 51 heures à distance et au moins 124 heures en présentiel.' },
  { q: 'Où se déroule la formation ?', a: 'La partie présentielle se déroule chez Intégrale Academy, 54 chemin du Carreou, 83480 Puget-sur-Argens.' },
  { q: 'Quel est le prix de la formation APS ?', a: 'Le tarif est de 1 650 €.' },
  { q: 'Peut-on financer la formation avec le CPF ?', a: 'Oui, selon votre éligibilité et l’offre active sur Mon Compte Formation. Un employeur, un OPCO, France Travail ou un financement personnel peuvent aussi être étudiés.' },
  { q: 'France Travail peut-il financer la formation ?', a: 'Oui, une demande de financement peut être faite auprès de France Travail. L’acceptation dépend de votre profil, de votre niveau de qualification, de votre parcours et de votre projet professionnel.' },
  { q: 'Faut-il une autorisation CNAPS avant d’entrer en formation ?', a: 'Oui, sauf si vous possédez déjà une carte professionnelle en cours de validité. Intégrale Sécurité Formations vous accompagne dans cette démarche.' },
  { q: 'Quelles sont les exigences linguistiques ?', a: 'Le candidat doit justifier d’une connaissance suffisante du français et attester de sa connaissance des principes de la République. Ces éléments sont vérifiés avant l’admission définitive.' },
  { q: 'Quelles conditions concernent les ressortissants étrangers ?', a: 'La fiche RNCP fournie mentionne un titre de séjour détenu depuis au moins cinq ans pour demander l’autorisation préalable. Les règles et pièces applicables sont vérifiées selon chaque situation.' },
  { q: 'Comment se déroule l’examen ?', a: 'L’examen en présentiel associe des QCU contextualisés organisés électroniquement à partir d’une banque de plus de 1 000 questions et deux mises en situation professionnelles individuelles.' },
];

export const vtcFormation: Formation = { slug:'/vtc', category:'vtc', title:'Formation Chauffeur VTC', short:'Formation VTC tout inclus avec théorie e-learning, pratique en présentiel et frais d’examen inclus.', duration:'105 heures', audience:'Candidats souhaitant devenir conducteur VTC.', prerequisites:'Permis B valide, aptitude à la conduite professionnelle et dossier conforme aux conditions d’accès à la carte VTC.', locations:'Théorie à distance ; pratique Nice, Cannes, Toulon ou Fréjus', financing:'CPF 100 % financée selon éligibilité ; accompagnement administratif.', certification:'RS n°5637 · agrément préfectoral VTC-26-001', price:'1 500 € tout inclus', objectives:['Obtenir la carte professionnelle Conducteur VTC.','Préparer l’examen VTC.','Maîtriser la conduite professionnelle et la relation client.'], program:['Théorie en e-learning 24/7.','Livre officiel envoyé.','Pratique en véhicule double commande.','Coaching examen.'], evaluation:['Examen VTC avec frais inclus dans l’offre mentionnée.'], outcomes:['Chauffeur VTC indépendant ou salarié.'], why:['Offre tout inclus.','Pratique dans plusieurs villes du Sud.','Accompagnement CPF et administratif.'], seo:{title:'Formation Chauffeur VTC CPF',description:'Formation VTC tout inclus : théorie e-learning, pratique Nice/Cannes/Toulon/Fréjus, frais examen et CPF selon éligibilité.'}};

export const allFormations = [...securityFormations, vtcFormation];
