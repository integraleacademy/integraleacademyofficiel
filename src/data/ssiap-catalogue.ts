export type SsiapCourseConfig = {
  slug: string;
  label: string;
  role: string;
  title: string;
  intro: string;
  duration: string;
  durationDetail: string;
  capacity: string;
  certification: string;
  audience: string;
  missions: { title: string; text: string }[];
  prerequisites: { title: string; text: string }[];
  program: { title: string; duration: string; text: string }[];
  assessment: { title: string; text: string }[];
  outcomes: string[];
  nextStep: { title: string; text: string; href: string; label: string };
  faq: { q: string; a: string }[];
  seo: { title: string; description: string };
};

export const ssiapOfficialReference =
  'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000448223';

export const ssiap2Config: SsiapCourseConfig = {
  slug: 'ssiap-2',
  label: 'SSIAP 2',
  role: 'Chef d’équipe de sécurité incendie',
  title: 'Devenez chef d’équipe de sécurité incendie.',
  intro:
    'Apprenez à encadrer les agents SSIAP 1, organiser le service et diriger le poste central de sécurité en situation de crise.',
  duration: '70 heures',
  durationDetail: 'Hors examen et temps de déplacement',
  capacity: '12 stagiaires maximum',
  certification: 'Diplôme SSIAP 2',
  audience:
    'Agents SSIAP 1 expérimentés souhaitant évoluer vers l’encadrement opérationnel d’une équipe de sécurité incendie en ERP ou en IGH.',
  missions: [
    {
      title: 'Manager une équipe',
      text: 'Planifier l’activité, transmettre les consignes, accompagner les agents et gérer les situations conflictuelles.',
    },
    {
      title: 'Piloter le poste de sécurité',
      text: 'Exploiter le SSI, gérer les alarmes et coordonner les actions du service pendant un incident.',
    },
    {
      title: 'Former et rendre compte',
      text: 'Animer des séquences pédagogiques, informer la hiérarchie et suivre les obligations de sécurité.',
    },
  ],
  prerequisites: [
    {
      title: 'Qualification SSIAP 1',
      text: 'Être titulaire du SSIAP 1 ou d’une qualification admise en équivalence par la réglementation.',
    },
    {
      title: 'Expérience professionnelle',
      text: 'Justifier de 1 607 heures comme agent de sécurité incendie durant les 24 derniers mois, attestées par l’employeur ou le contrat de travail.',
    },
    {
      title: 'Secourisme valide',
      text: 'Détenir un PSC de moins de deux ans, ou un SST / PSE 1 en cours de validité.',
    },
    {
      title: 'Aptitude médicale',
      text: 'Présenter un certificat médical réglementaire datant de moins de trois mois.',
    },
  ],
  program: [
    {
      title: 'Rôles et missions du chef d’équipe',
      duration: '38 h',
      text: 'Gestion et management de l’équipe, organisation d’une séance de formation, gestion des conflits, consignes, incidents techniques et permis de feu.',
    },
    {
      title: 'Systèmes de sécurité incendie',
      duration: '10 h',
      text: 'Système de détection incendie, système de mise en sécurité et installations fixes d’extinction automatique.',
    },
    {
      title: 'Hygiène et sécurité',
      duration: '6 h',
      text: 'Réglementation du Code du travail, commissions de sécurité et accessibilité.',
    },
    {
      title: 'Chef du poste central en situation de crise',
      duration: '16 h',
      text: 'Gestion du PC sécurité, prise de décision et conseil technique aux services de secours.',
    },
  ],
  assessment: [
    { title: 'Épreuve écrite', text: 'QCM de 40 questions en 40 minutes.' },
    {
      title: 'Épreuve orale',
      text: 'Animation d’une séquence pédagogique, après un temps de préparation.',
    },
    {
      title: 'Épreuve pratique',
      text: 'Exercice de gestion du poste central de sécurité en situation de crise.',
    },
  ],
  outcomes: [
    'Chef d’équipe de sécurité incendie',
    'Responsable d’un poste central de sécurité',
    'Encadrant d’agents SSIAP 1',
    'Coordinateur sécurité incendie en ERP ou IGH',
  ],
  nextStep: {
    title: 'Poursuivre vers le SSIAP 3',
    text: 'Après l’expérience réglementaire requise, le SSIAP 3 permet d’évoluer vers la fonction de chef de service.',
    href: '/formations-securite/ssiap-3',
    label: 'Découvrir le SSIAP 3',
  },
  faq: [
    {
      q: 'Combien de temps dure la formation SSIAP 2 ?',
      a: 'La durée réglementaire est de 70 heures minimum, hors examen et temps de déplacement.',
    },
    {
      q: 'Quelle expérience faut-il pour entrer en SSIAP 2 ?',
      a: 'Il faut justifier de 1 607 heures d’activité comme agent de sécurité incendie pendant les 24 derniers mois.',
    },
    {
      q: 'Le SSIAP 1 est-il obligatoire ?',
      a: 'Le candidat doit être titulaire du SSIAP 1 ou d’une qualification admise en équivalence par l’arrêté du 2 mai 2005 modifié.',
    },
    {
      q: 'Comment se déroule l’examen SSIAP 2 ?',
      a: 'L’examen comprend un QCM, une animation de séquence pédagogique et un exercice pratique de gestion du PC en situation de crise.',
    },
    {
      q: 'Le secourisme doit-il être à jour ?',
      a: 'Oui. Un PSC de moins de deux ans, ou un SST / PSE 1 en cours de validité, est nécessaire.',
    },
    {
      q: 'Peut-on ensuite préparer le SSIAP 3 ?',
      a: 'Oui, sous réserve de remplir les conditions réglementaires d’accès au SSIAP 3.',
    },
  ],
  seo: {
    title: 'Formation SSIAP 2 à Puget-sur-Argens | Intégrale Academy',
    description:
      'Préparez le diplôme SSIAP 2 de chef d’équipe de sécurité incendie : 70 heures, management, SSI, gestion du PC et examen officiel.',
  },
};

export const ssiap3Config: SsiapCourseConfig = {
  slug: 'ssiap-3',
  label: 'SSIAP 3',
  role: 'Chef de service de sécurité incendie',
  title: 'Pilotez un service de sécurité incendie.',
  intro:
    'Maîtrisez la réglementation, l’analyse des risques, le management et le budget nécessaires pour conseiller un chef d’établissement et diriger un service.',
  duration: '216 heures',
  durationDetail: 'Hors examen et temps de déplacement',
  capacity: '10 stagiaires maximum',
  certification: 'Diplôme SSIAP 3',
  audience:
    'Professionnels souhaitant prendre la responsabilité complète d’un service de sécurité incendie en ERP ou en IGH.',
  missions: [
    {
      title: 'Conseiller l’établissement',
      text: 'Apporter une expertise réglementaire et technique au chef d’établissement et préparer les commissions de sécurité.',
    },
    {
      title: 'Manager le service',
      text: 'Organiser les équipes, définir les moyens, encadrer l’activité et garantir le maintien du niveau de sécurité.',
    },
    {
      title: 'Gérer risques et budget',
      text: 'Analyser les projets et les risques, suivre la maintenance, les travaux, les contrats et le budget du service.',
    },
  ],
  prerequisites: [
    {
      title: 'Voie diplôme',
      text: 'Disposer au minimum d’un diplôme de niveau 4, éventuellement obtenu par la validation des acquis de l’expérience.',
    },
    {
      title: 'Voie expérience',
      text: 'Ou détenir le SSIAP 2, ERP 2 ou IGH 2 délivré avant le 31 décembre 2005 et justifier de trois ans d’expérience dans la fonction.',
    },
    {
      title: 'Secourisme valide',
      text: 'Détenir un PSC de moins de deux ans, ou un SST / PSE 1 en cours de validité.',
    },
    {
      title: 'Dossier vérifié',
      text: 'Les diplômes, équivalences et justificatifs d’expérience sont contrôlés avant confirmation de l’inscription.',
    },
  ],
  program: [
    { title: 'Le feu et ses conséquences', duration: '12 h', text: 'Feu, comportement au feu et mise en œuvre des moyens d’extinction.' },
    { title: 'Sécurité incendie et bâtiments', duration: '65 h', text: 'Matériaux de construction, lecture et étude de plans, outils d’analyse.' },
    { title: 'Réglementation incendie', duration: '70 h', text: 'Classement, dispositions constructives et techniques, moyens de secours, visites et accessibilité.' },
    { title: 'Gestion des risques', duration: '23 h', text: 'Analyse des risques, travaux de sécurité et documents administratifs.' },
    { title: 'Conseil au chef d’établissement', duration: '6 h', text: 'Information de la hiérarchie et veille réglementaire.' },
    { title: 'Commissions de sécurité', duration: '6 h', text: 'Rôle, préparation et suivi des commissions de sécurité.' },
    { title: 'Management de l’équipe', duration: '26 h', text: 'Organisation du service, encadrement, droit du travail, droit civil et pénal.' },
    { title: 'Budget du service', duration: '8 h', text: 'Suivi budgétaire, achats et maintenance des installations de sécurité.' },
  ],
  assessment: [
    { title: 'Épreuve écrite 1', text: 'QCM de 40 questions portant sur l’ensemble du programme.' },
    { title: 'Épreuve écrite 2', text: 'Rédaction d’une notice technique de sécurité à partir de plans, en 2 h 30.' },
    { title: 'Épreuve orale', text: 'Entretien de 15 minutes devant un jury, après préparation.' },
  ],
  outcomes: [
    'Chef de service de sécurité incendie',
    'Responsable sécurité incendie en ERP ou IGH',
    'Conseiller technique du chef d’établissement',
    'Manager d’un service de sécurité incendie',
  ],
  nextStep: {
    title: 'Maintenir votre qualification',
    text: 'Le diplôme SSIAP doit être maintenu par un recyclage triennal ou, selon la situation, une remise à niveau.',
    href: '/formations-securite/recyclage-remise-a-niveau-ssiap',
    label: 'Voir les recyclages et remises à niveau',
  },
  faq: [
    {
      q: 'Combien de temps dure la formation SSIAP 3 ?',
      a: 'La formation SSIAP 3 représente 216 heures minimum, hors examen et temps de déplacement.',
    },
    {
      q: 'Faut-il obligatoirement être SSIAP 2 ?',
      a: 'Non. L’accès est aussi possible avec un diplôme de niveau 4 minimum. La voie SSIAP 2 exige trois ans d’expérience dans la fonction.',
    },
    {
      q: 'Quel secourisme faut-il détenir ?',
      a: 'Un PSC de moins de deux ans, ou un SST / PSE 1 en cours de validité.',
    },
    {
      q: 'Comment se déroule l’examen SSIAP 3 ?',
      a: 'Il comprend un QCM, la rédaction d’une notice technique de sécurité à partir de plans et une épreuve orale devant un jury.',
    },
    {
      q: 'Quel est le rôle d’un chef de service SSIAP 3 ?',
      a: 'Il manage le service, conseille le chef d’établissement, analyse les risques et suit les moyens techniques, administratifs et budgétaires.',
    },
    {
      q: 'Le diplôme doit-il être recyclé ?',
      a: 'Oui. Le maintien des connaissances SSIAP est triennal et le secourisme doit également rester à jour.',
    },
  ],
  seo: {
    title: 'Formation SSIAP 3 à Puget-sur-Argens | Intégrale Academy',
    description:
      'Préparez le diplôme SSIAP 3 de chef de service de sécurité incendie : 216 heures, réglementation, risques, management, budget et examen officiel.',
  },
};

export const ssiapMaintenanceConfig: SsiapCourseConfig = {
  slug: 'recyclage-remise-a-niveau-ssiap',
  label: 'Recyclage & remise à niveau SSIAP',
  role: 'Maintien des connaissances SSIAP 1, 2 et 3',
  title: 'Maintenez votre qualification SSIAP à jour.',
  intro:
    'Choisissez le parcours adapté à votre niveau, à la date de votre dernier diplôme et à votre activité récente dans un service de sécurité incendie.',
  duration: '14 à 35 heures',
  durationDetail: 'Selon le niveau et le parcours requis',
  capacity: '15 stagiaires maximum',
  certification: 'Attestation réglementaire',
  audience:
    'Titulaires d’un diplôme SSIAP 1, SSIAP 2 ou SSIAP 3, d’une équivalence ou d’un ancien diplôme ERP / IGH souhaitant maintenir ou réactiver leur qualification.',
  missions: [
    {
      title: 'Actualiser les connaissances',
      text: 'Revoir les évolutions réglementaires, les moyens de secours et les pratiques correspondant à votre niveau.',
    },
    {
      title: 'Retrouver les réflexes',
      text: 'Travailler sur des exercices, des mises en situation ou des études de cas adaptées à la fonction exercée.',
    },
    {
      title: 'Sécuriser votre dossier',
      text: 'Identifier clairement si votre situation relève d’un recyclage ou d’une remise à niveau avant l’inscription.',
    },
  ],
  prerequisites: [
    {
      title: 'Diplôme ou équivalence',
      text: 'Être titulaire du SSIAP correspondant, d’une équivalence, d’un ancien diplôme ERP / IGH ou d’une reconnaissance admise.',
    },
    {
      title: 'Secourisme valide',
      text: 'Présenter une qualification de secourisme en cours de validité.',
    },
    {
      title: 'Choix du bon parcours',
      text: 'Le recyclage concerne les personnels à jour remplissant les conditions d’activité. À défaut de 1 607 heures d’activité sur les 36 derniers mois, une remise à niveau est requise pour reprendre l’emploi.',
    },
    {
      title: 'Certificat médical selon la situation',
      text: 'Pour la remise à niveau SSIAP 1 ou SSIAP 2, un certificat médical de moins de trois mois est demandé au personnel n’exerçant pas dans un service de sécurité incendie.',
    },
  ],
  program: [
    { title: 'Recyclage SSIAP 1', duration: '14 h', text: 'Prévention, moyens de secours et mises en situation d’intervention.' },
    { title: 'Remise à niveau SSIAP 1', duration: '21 h', text: 'Fondamentaux, prévention, moyens de secours, intervention, PC sécurité et rondes.' },
    { title: 'Recyclage SSIAP 2', duration: '14 h', text: 'Prévention, moyens de secours, gestion du PC, formation et management de l’équipe.' },
    { title: 'Remise à niveau SSIAP 2', duration: '21 h', text: 'Fondamentaux, intervention, prévention, PC sécurité, pédagogie et organisation de l’équipe.' },
    { title: 'Recyclage SSIAP 3', duration: '21 h', text: 'Réglementation, droit, maintenance, étude de cas, accessibilité, risques et moyens de secours.' },
    { title: 'Remise à niveau SSIAP 3', duration: '35 h', text: 'Documents, commissions, réglementation, droit, maintenance, étude de cas, risques et organisation du service.' },
  ],
  assessment: [
    {
      title: 'Présence obligatoire',
      text: 'La validation du recyclage exige la présence à l’ensemble des séquences programmées.',
    },
    {
      title: 'Mises en pratique',
      text: 'Les actions du stagiaire sont appréciées pendant les séquences pratiques ou les études de cas.',
    },
    {
      title: 'Attestation',
      text: 'Une attestation réglementaire est délivrée à l’issue du parcours validé.',
    },
  ],
  outcomes: [
    'Maintien de la qualification SSIAP 1',
    'Maintien de la qualification SSIAP 2',
    'Maintien de la qualification SSIAP 3',
    'Réactivation des connaissances selon le parcours requis',
  ],
  nextStep: {
    title: 'Vous hésitez entre recyclage et remise à niveau ?',
    text: 'Envoyez-nous votre diplôme, la date de votre dernier recyclage et vos justificatifs d’activité. L’équipe vous indiquera le parcours réglementaire adapté.',
    href: '/contact?formation=ssiap-maintien&objet=verification-du-parcours',
    label: 'Faire vérifier ma situation',
  },
  faq: [
    {
      q: 'À quelle fréquence faut-il recycler le SSIAP ?',
      a: 'Le recyclage SSIAP est triennal et doit intervenir au plus tard à la date anniversaire de délivrance du diplôme ou de la précédente attestation.',
    },
    {
      q: 'Quelle différence entre recyclage et remise à niveau ?',
      a: 'Le recyclage maintient une qualification à jour. La remise à niveau est notamment requise lorsqu’une personne ne peut pas justifier de 1 607 heures d’activité réglementée sur les 36 derniers mois.',
    },
    {
      q: 'Combien de temps dure un recyclage SSIAP ?',
      a: 'Le recyclage dure 14 heures pour les niveaux 1 et 2, et 21 heures pour le niveau 3.',
    },
    {
      q: 'Combien de temps dure une remise à niveau SSIAP ?',
      a: 'La remise à niveau dure 21 heures pour les niveaux 1 et 2, et 35 heures pour le niveau 3.',
    },
    {
      q: 'Le secourisme doit-il être valide ?',
      a: 'Oui. Une qualification de secourisme en cours de validité est un prérequis au recyclage comme à la remise à niveau.',
    },
    {
      q: 'Comment savoir quel parcours choisir ?',
      a: 'L’équipe vérifie votre diplôme, vos dernières attestations et vos justificatifs d’activité avant de confirmer le parcours adapté.',
    },
  ],
  seo: {
    title: 'Recyclage et remise à niveau SSIAP 1, 2 et 3 | Intégrale Academy',
    description:
      'Recyclage et remise à niveau SSIAP 1, SSIAP 2 et SSIAP 3 : durées réglementaires, prérequis et accompagnement à Puget-sur-Argens.',
  },
};
