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
  faq: { q: string; a: string; links?: { href: string; label: string }[] }[];
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
      a: 'Le SSIAP 2 comporte au moins 70 heures de cours en présentiel, auxquelles s’ajoutent l’examen et les temps de déplacement. À Puget-sur-Argens, la formation réunit des agents de sécurité incendie expérimentés qui préparent leur premier poste d’encadrement.\n\n' +
        'Sur ces 70 heures, 38 sont consacrées aux missions et au management du chef d’équipe, 10 aux systèmes de sécurité incendie, 6 à l’hygiène et à la sécurité et 16 au rôle du chef du poste central. Prévoyez aussi d’être disponible pour les trois épreuves indiquées au planning.',
    },
    {
      q: 'Quelle expérience faut-il pour entrer en SSIAP 2 ?',
      a: 'Il faut pouvoir justifier d’au moins 1 607 heures exercées comme agent de sécurité incendie au cours des 24 derniers mois. Ce sont les heures dans cette fonction qui comptent. Si votre poste combine sécurité incendie et surveillance, demandez un décompte qui distingue vos missions.\n\n' +
        'La preuve peut être apportée par l’employeur ou par le contrat de travail. Si vous avez eu plusieurs employeurs, réunissez les justificatifs couvrant les différentes périodes, avec la fonction exercée et le volume horaire. Cela permet à l’équipe de vérifier votre admissibilité avant le début de la session.',
      links: [
        { href: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000448223', label: 'Lire l’arrêté relatif au SSIAP' },
      ],
    },
    {
      q: 'Le SSIAP 1 est-il obligatoire ?',
      a: 'Le SSIAP 1 est la voie d’accès habituelle. Vous pouvez aussi présenter une qualification admise par l’article 4 de l’arrêté du 2 mai 2005. Si votre parcours comprend un diplôme de prévention et de sécurité ou une qualification de sapeur-pompier, transmettez son intitulé exact et les éventuels modules complémentaires suivis.\n\n' +
        'La qualification et l’expérience se vérifient séparément. Pour entrer en SSIAP 2, vous devez également justifier les 1 607 heures requises comme agent de sécurité incendie sur 24 mois et présenter les justificatifs de secourisme et d’aptitude médicale.',
    },
    {
      q: 'Comment se déroule l’examen SSIAP 2 ?',
      a: 'L’examen SSIAP 2 comprend trois épreuves. Vous commencez par un QCM de 40 questions sur le programme, avec 40 minutes pour répondre. L’oral consiste à animer une courte séquence pédagogique, comme si vous deviez former des agents de votre équipe.\n\n' +
        'L’épreuve pratique se déroule autour d’un exercice de gestion du poste central de sécurité en situation de crise. Elle dure environ 20 minutes. Pour obtenir le diplôme, il faut au moins 12 sur 20 à l’écrit et être déclaré apte aux épreuves orale et pratique.',
    },
    {
      q: 'Le secourisme doit-il être à jour ?',
      a: 'Oui. Pour l’entrée en SSIAP 2, vous pouvez fournir un certificat de premiers secours citoyen (PSC) de moins de deux ans, un certificat SST valide ou un PSE 1 à jour. Si vous avez actualisé votre SST, préparez également le justificatif du dernier maintien et actualisation des compétences (MAC).\n\n' +
        'Vérifiez l’échéance du secourisme indépendamment de la date de votre SSIAP 1. Si votre justificatif arrive à expiration juste avant les cours, indiquez les deux dates à l’école pour pouvoir planifier l’actualisation en amont.',
    },
    {
      q: 'Peut-on ensuite préparer le SSIAP 3 ?',
      a: 'Oui. Avec le SSIAP 2, vous pouvez demander l’accès au SSIAP 3 après trois années d’expérience dans la fonction de chef d’équipe. Un diplôme d’au moins niveau 4, comme le baccalauréat, constitue une autre voie d’entrée. Un secourisme valide reste demandé dans les deux cas.\n\n' +
        'Si vous présentez la voie de l’expérience, réunissez une attestation de votre employeur ou un contrat permettant de vérifier les périodes d’encadrement. Le SSIAP 3 vous prépare ensuite à conseiller une direction, à suivre un budget et à piloter le service dans son ensemble.',
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
      a: 'La formation SSIAP 3 représente au minimum 216 heures de cours en présentiel, hors examen et temps de déplacement. C’est le parcours qui prépare à la fonction de chef de service de sécurité incendie. Consultez les périodes de cours et la date du jury avant d’organiser vos absences professionnelles.\n\n' +
        'Une part importante du programme porte sur les bâtiments et la réglementation applicable. Vous travaillez aussi la lecture de plans, l’analyse de projets, la préparation des commissions de sécurité, l’encadrement du personnel et la gestion budgétaire. Les études de cas préparent à la notice technique demandée à l’examen.',
    },
    {
      q: 'Faut-il obligatoirement être SSIAP 2 ?',
      a: 'Vous pouvez candidater avec un diplôme de niveau 4 au minimum, par exemple un baccalauréat. L’autre voie d’accès repose sur le SSIAP 2 et trois années d’exercice comme chef d’équipe. Certains anciens diplômes ERP 2 ou IGH 2 peuvent également être pris en compte avec l’expérience requise.\n\n' +
        'Pour la première voie, préparez une copie du diplôme, y compris s’il a été obtenu par validation des acquis de l’expérience. Pour la seconde, ajoutez une attestation d’employeur ou un contrat faisant apparaître vos fonctions et vos périodes d’activité. Prévoyez aussi votre justificatif de secourisme.',
      links: [
        { href: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000448223', label: 'Lire l’arrêté relatif au SSIAP' },
      ],
    },
    {
      q: 'Quel secourisme faut-il détenir ?',
      a: 'Pour entrer en SSIAP 3, les justificatifs admis comprennent le certificat de premiers secours citoyen (PSC) datant de moins de deux ans, le SST en cours de validité ou le PSE 1 à jour. Cette condition s’applique aussi bien aux candidats qui entrent avec un diplôme de niveau 4 qu’aux chefs d’équipe expérimentés.\n\n' +
        'Si votre certificat mentionne une formation initiale ancienne, fournissez aussi l’attestation d’actualisation correspondant à votre qualification. L’école pourra vérifier les dates avant votre entrée en cours, en même temps que les justificatifs de votre voie d’admission.',
    },
    {
      q: 'Comment se déroule l’examen SSIAP 3 ?',
      a: 'Le SSIAP 3 comporte deux épreuves écrites et un oral. Le premier écrit est un QCM de 40 questions en 40 minutes. Pour le second, vous disposez de 2 h 30 pour rédiger une notice technique de sécurité à partir de plans et des éléments d’un projet.\n\n' +
        'À l’oral, le jury vous interroge pendant environ 15 minutes après un temps de préparation. Les trois épreuves s’appuient sur des compétences différentes. Exercez-vous à retrouver une règle applicable, à expliquer les conséquences d’un projet sur un bâtiment et à présenter un avis compréhensible pour un chef d’établissement.',
    },
    {
      q: 'Quel est le rôle d’un chef de service SSIAP 3 ?',
      a: 'Le chef de service SSIAP 3 organise les équipes incendie et conseille le chef d’établissement. Il suit les moyens disponibles, les contrôles, les contrats de maintenance et le budget. Il veille aussi à ce que les documents de sécurité restent à jour.\n\n' +
        'Par exemple, lorsqu’un établissement prévoit des travaux, il examine les plans et les effets du projet sur la sécurité, puis présente son avis à la direction. Lors d’une visite de commission de sécurité, il prépare les pièces demandées et suit ensuite les prescriptions qui concernent l’établissement.',
    },
    {
      q: 'Le diplôme doit-il être recyclé ?',
      a: 'Oui. Pour exercer comme chef de service, le SSIAP 3 se recycle tous les trois ans. Le stage de recyclage de ce niveau dure 21 heures. Il revient sur la réglementation, les responsabilités et des études de cas de chef de service. Le secourisme se renouvelle séparément.\n\n' +
        'Si la date limite a été dépassée ou que vous ne justifiez pas des 1 607 heures d’activité SSIAP requises sur les 36 derniers mois, le parcours prévu pour reprendre l’emploi est une remise à niveau de 35 heures. Indiquez à l’école votre fonction actuelle et celle que vous souhaitez reprendre si vous détenez plusieurs diplômes.',
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
  title: 'Maintenez votre qualification SSIAP à jour',
  intro:
    'Choisissez le parcours adapté à votre niveau, à la date de votre dernier diplôme et à votre activité récente dans un service de sécurité incendie.',
  duration: '14 à 35 heures',
  durationDetail: 'Selon le niveau et le parcours requis',
  capacity: '12 stagiaires maximum',
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
      a: 'Le recyclage incendie est triennal pour les agents, chefs d’équipe et chefs de service SSIAP. Notez l’échéance à partir de votre diplôme ou de votre dernière attestation et choisissez une session qui se termine au plus tard à la date anniversaire. Le secourisme des personnels SSIAP se renouvelle tous les deux ans.\n\n' +
        'Si vous possédez plusieurs niveaux, indiquez le poste que vous occupez ou souhaitez occuper. Le stage à prévoir dépend de cette fonction. Avant de réserver, vérifiez aussi que vous pouvez justifier vos heures d’activité sur les trois dernières années.',
    },
    {
      q: 'Quelle différence entre recyclage et remise à niveau ?',
      a: 'Le recyclage actualise vos connaissances lorsque vous êtes encore dans le délai triennal et que vous pouvez justifier au moins 1 607 heures d’activité SSIAP sur les 36 derniers mois. La remise à niveau prépare à reprendre l’emploi si l’une de ces conditions manque.\n\n' +
        'Ainsi, une personne qui a travaillé régulièrement mais a laissé passer sa date de recyclage relève de la remise à niveau. Il en va de même si son diplôme est encore dans les délais mais qu’elle a effectué trop peu d’heures. Le centre examine les dates et les justificatifs avant de proposer le stage correspondant.',
      links: [
        { href: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000448223', label: 'Lire l’arrêté relatif au SSIAP' },
      ],
    },
    {
      q: 'Combien de temps dure un recyclage SSIAP ?',
      a: 'Le recyclage dure 14 heures pour le SSIAP 1 et le SSIAP 2, soit généralement deux jours. Pour le SSIAP 3, il représente 21 heures, soit environ trois jours. La présence à toutes les séquences de la session est nécessaire à la validation.\n\n' +
        'Le contenu suit la fonction. Un agent revoit la prévention et les moyens de secours, un chef d’équipe travaille aussi sur l’encadrement et le poste de sécurité, tandis qu’un chef de service étudie des situations de réglementation et de gestion. À l’issue du stage validé, conservez l’attestation avec votre diplôme.',
    },
    {
      q: 'Combien de temps dure une remise à niveau SSIAP ?',
      a: 'La remise à niveau dure 21 heures pour le SSIAP 1 comme pour le SSIAP 2, généralement réparties sur trois jours. Pour le SSIAP 3, prévoyez 35 heures, soit environ cinq jours. Choisissez la session correspondant à la fonction que vous reprenez.\n\n' +
        'Le parcours reprend les fondamentaux du poste et remet le candidat en situation. Au niveau 1, il inclut notamment les rondes et le poste de sécurité. Au niveau 2, il comprend l’organisation de l’équipe et la pédagogie. Au niveau 3, le travail porte aussi sur les dossiers, les commissions et la gestion du service.',
    },
    {
      q: 'Le secourisme doit-il être valide ?',
      a: 'Oui. Un justificatif de secourisme valide est demandé pour un recyclage comme pour une remise à niveau SSIAP. Présentez votre certificat et la dernière attestation d’actualisation si vous en avez une. La date du stage incendie et celle du renouvellement du secourisme se vérifient séparément.\n\n' +
        'Par exemple, si votre SST arrive à échéance avant le début du stage incendie, prévoyez d’abord son maintien et son actualisation des compétences (MAC SST). Faites parvenir les deux dates à l’école si elles sont rapprochées, afin de choisir des sessions dans le bon ordre.',
    },
    {
      q: 'Comment savoir quel parcours choisir ?',
      a: 'Préparez le diplôme SSIAP correspondant à l’emploi visé, la dernière attestation de recyclage ou de remise à niveau, le justificatif de secourisme et les attestations d’employeur précisant les fonctions et les heures exercées sur les 36 derniers mois. Une interruption de carrière peut modifier le parcours à suivre.\n\n' +
        'Indiquez à l’école le poste que vous souhaitez reprendre et la date envisagée. Ces éléments permettent de vérifier le délai de trois ans, le seuil de 1 607 heures et le niveau du stage. Pour une remise à niveau SSIAP 1 ou 2, l’équipe vous précisera aussi le justificatif d’aptitude médicale à joindre.',
    },
  ],
  seo: {
    title: 'Recyclage et remise à niveau SSIAP 1, 2 et 3 | Intégrale Academy',
    description:
      'Recyclage et remise à niveau SSIAP 1, SSIAP 2 et SSIAP 3 : durées réglementaires, prérequis et accompagnement à Puget-sur-Argens.',
  },
};
