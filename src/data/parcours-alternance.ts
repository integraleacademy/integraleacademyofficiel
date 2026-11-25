export { ADMISSIONS_URL as applicationUrl } from './admissions';
export const brochureUrl = 'https://www.integraleconnect.com/parcoursalternance/brochure';
export const adviserPhone = 'tel:+33487830615';

export const qualifications = [
  {
    id: "formation-aps",
    code: "APS",
    headline: ["Prévenir.", "Surveiller. Protéger."],
    title: "TFP Agent de prévention et de sécurité",
    duration: "175 h",
    image: "/images/formation-scenes-manuel/aps-atelier-radio.webp",
    alt: "Apprentissage des missions de prévention et de sécurité",
    skills: ["Contrôler les accès et effectuer des rondes.", "Prévenir les incidents.", "Gérer les situations de tension."],
    href: "/formations-securite/aps",
  },
  {
    id: "formation-a3p",
    code: "A3P",
    headline: ["Anticiper.", "Accompagner. Sécuriser."],
    title: "TFP Agent de protection physique des personnes",
    duration: "328 h",
    image: "/images/a3p/manuel/protection.webp",
    alt: "Illustration d’une mission de protection physique des personnes",
    skills: ["Analyser les risques.", "Préparer et sécuriser les déplacements.", "Assurer une protection en équipe."],
    href: "/formations-securite/a3p-apr",
  },
  {
    id: "formation-ssiap",
    code: "SSIAP 1",
    headline: ["Prévenir.", "Alerter. Intervenir."],
    title: "Diplôme d’agent des services de sécurité incendie et d’assistance à personnes",
    duration: "70 h",
    image: "/images/formation-scenes-manuel/ssiap-1-galerie-ssi.webp",
    alt: "Illustration d’une formation à la sécurité incendie",
    skills: ["Prévenir le risque incendie.", "Contrôler les installations.", "Participer à l’évacuation et à l’assistance."],
    href: "/formations-securite/ssiap-1",
  },
] as const;

export const calendar = [
  { period: "8 janvier au 11 février 2027", theme: "aps", title: "Tu prépares l’APS", description: "175 h de formation à la prévention et à la sécurité." },
  { period: "12 février 2027", theme: "aps", title: "Examen APS", description: "Après réussite, tu peux demander ta carte professionnelle." },
  { period: "13 février au 7 juin 2027", theme: "work", title: "Entreprise · période 1", description: "Tu rejoins ton entreprise selon son planning." },
  { period: "8 juin au 4 août 2027", theme: "a3p", title: "Tu prépares l’A3P", description: "328 h de formation à la protection physique des personnes." },
  { period: "5 août au 30 novembre 2027", theme: "work", title: "Entreprise · période 2", description: "Tu développes ton expérience avec ton employeur." },
  { period: "1er au 14 décembre 2027", theme: "ssiap", title: "Tu prépares le SSIAP 1", description: "70 h de formation à la sécurité incendie et à l’assistance aux personnes." },
  { period: "15 décembre 2027", theme: "ssiap", title: "Examen SSIAP 1", description: "Tu passes les épreuves du diplôme SSIAP 1." },
  { period: "16 au 20 décembre 2027", theme: "a3p", title: "Révisions A3P", description: "Les révisions préparent la dernière épreuve de protection rapprochée." },
  { period: "21 décembre 2027", theme: "a3p", title: "Examen A3P", description: "Tu passes ton examen avant le retour en entreprise." },
  { period: "22 décembre 2027 au 8 janvier 2028", theme: "work", title: "Entreprise · période 3", description: "Tu retrouves ton employeur jusqu’à la fin du contrat." },
] as const;

export const workplaces = [
  {
    title: "Sites et entreprises",
    description: "Contrôle des accès, rondes, prévention et transmission des informations.",
  },
  {
    title: "Événements et public",
    description: "Orientation des visiteurs et participation à la sécurité des manifestations.",
  },
  {
    title: "Sécurité incendie",
    description: "Prévention, surveillance des installations et assistance dans les établissements recevant du public.",
  },
  {
    title: "Protection rapprochée",
    description: "Préparation des missions et protection des personnes après la formation A3P.",
  },
] as const;

export const partnerSupport = [
  {
    title: "Prépare une candidature qui te ressemble",
    description: "On fait le point sur ton projet, ton CV, tes disponibilités et ta mobilité pour cibler les entreprises adaptées.",
  },
  {
    title: "Rencontre les entreprises",
    description: "On facilite les mises en relation selon les opportunités. Continue aussi tes démarches personnelles et prépare tes entretiens : un CV clair et une motivation expliquée font la différence.",
  },
  {
    title: "Sois accompagné toute l’année",
    description: "L’équipe pédagogique et ton maître d’apprentissage suivent ta progression et t’aident à relier les cours aux situations du terrain.",
  },
] as const;

export const entryConditions = [
  {
    title: "Moins de 26 ans",
    description: "Au moment de ta candidature à ce parcours.",
  },
  {
    title: "Disponible toute l’année",
    description: "De janvier à décembre 2027, à l’école et en entreprise.",
  },
  {
    title: "Permis B et mobilité",
    description: "Tu peux te déplacer dans le Var et les Alpes-Maritimes, notamment à Cannes.",
  },
  {
    title: "Conditions CNAPS",
    description: "L’accès à la formation et aux métiers est soumis aux autorisations nécessaires et à une enquête administrative.",
  },
] as const;

export const documents = [
  {
    title: "Un dossier compatible avec la sécurité privée",
    description: "Casier judiciaire et antécédents compatibles avec les métiers visés. Le CNAPS réalise une enquête administrative et décide des autorisations.",
  },
  {
    title: "Les autorisations nécessaires",
    description: "Autorisation CNAPS avant la formation, sauf carte valide ou dispense applicable, droit de travailler en France et dossier complet.",
  },
  {
    title: "Une bonne maîtrise du français",
    description: "Lire, écrire, comprendre et t’exprimer. Un justificatif de niveau B1 est demandé aux ressortissants étrangers.",
  },
  {
    title: "Les pièces propres à chaque formation",
    description: "A3P : permis B et aptitude médicale. SSIAP 1 : certificat médical de moins de 3 mois et secourisme valide.",
  },
] as const;

export const commitments = [
  {
    title: "T’engager pour un an",
    description: "Organise ta disponibilité de janvier à décembre 2027 : cours, entreprise et examens.",
  },
  {
    title: "Être présent et ponctuel",
    description: "Respecte les horaires et préviens l’école et ton employeur dès qu’une difficulté se présente.",
  },
  {
    title: "Participer pour progresser",
    description: "Implique-toi dans les exercices, révise régulièrement et prépare chaque évaluation.",
  },
  {
    title: "Adopter les bons réflexes",
    description: "Respecte les consignes, les personnes et la confidentialité. Soigne ta tenue et ton attitude.",
  },
  {
    title: "Préparer tes déplacements",
    description: "Anticipe tes trajets, les lieux de mission et les horaires de l’entreprise.",
  },
  {
    title: "Rester acteur de ton parcours",
    description: "Transmets tes documents, prépare les entretiens et échange avec l’équipe en cas de besoin.",
  },
] as const;

export const applicationSteps = [
  {
    title: "Tu candidates en ligne",
    description: "Une question à la fois. Tes coordonnées, tes disponibilités et ton projet.",
  },
  {
    title: "On échange avec toi",
    description: "Aurélie BAYARD-CHAUSSEZ étudie ta candidature avec l’équipe et te contacte pour vérifier les prérequis, les pièces et ta disponibilité sur un an.",
  },
  {
    title: "Tu rencontres les entreprises",
    description: "Tu prépares tes entretiens avec notre appui et les opportunités de nos partenaires.",
  },
  {
    title: "On confirme ton entrée",
    description: "Prérequis, démarches CNAPS et organisation de l’alternance : tu connais les prochaines étapes.",
  },
] as const;

export const alternanceFaq = [
  {
    q: "La formation est vraiment gratuite pour moi ?",
    a: "Oui. Le tarif habituel du parcours est de 7 000 €. Dans le cadre du contrat d’apprentissage, tu as 0 € de frais pédagogiques à payer. La prise en charge est mise en œuvre par l’OPCO de ton employeur selon les règles applicables. Aurélie BAYARD-CHAUSSEZ te précise aussi l’organisation des déplacements et des repas.",
  },
  {
    q: "Je n’ai pas encore d’entreprise. Je peux candidater ?",
    a: "Oui ! Intégrale Academy dispose déjà d’entreprises partenaires dans la sécurité. Nous préparons ton projet, ton CV et tes entretiens, puis nous pouvons te mettre en relation selon ton profil et leurs besoins. Continue aussi tes recherches personnelles : la mise en relation ne garantit pas une embauche.",
  },
  {
    q: "Quand est-ce que je commence à être payé ?",
    a: "À la date de prise d’effet de ton contrat d’apprentissage, puis chaque mois pendant le contrat, y compris pendant les périodes de formation. Ton salaire dépend de ton âge, de ton parcours et de la convention collective. Les minima applicables en janvier 2027 seront précisés sur ton contrat.",
  },
  {
    q: "Où se déroulent les cours et les missions ?",
    a: "Tu te formes à Puget-sur-Argens, au 54 chemin du Carreou. Les entreprises peuvent être situées dans le Var et les Alpes-Maritimes, notamment à Cannes. Le permis B est requis pour ce parcours : il faut anticiper tes trajets et les horaires de l’entreprise.",
  },
  {
    q: "Faut-il être disponible toute l’année 2027 ?",
    a: "Oui, du 8 janvier 2027 au 8 janvier 2028 inclus. Tu t’engages pour les cours, les examens et les périodes en entreprise, avec présence, ponctualité et participation. Le calendrier détaillé présente les cours, les examens et les périodes en entreprise.",
  },
  {
    q: "La carte professionnelle CNAPS est automatique ?",
    a: "Non. La réussite à la formation ne délivre pas automatiquement la carte professionnelle : tu dois en faire la demande. Le CNAPS vérifie les conditions et décide de sa délivrance. Les missions confiées dépendent des qualifications obtenues et des autorisations dont tu disposes.",
  },
  {
    q: "Pourquoi une enquête du CNAPS ?",
    a: "La sécurité privée est réglementée. Le CNAPS, sous tutelle du ministère de l’Intérieur, réalise une enquête administrative pour vérifier la compatibilité de ta situation avec l’activité. L’autorisation d’entrée en formation est nécessaire, sauf carte valide ou dispense applicable. Ne transmets aucun détail judiciaire dans le formulaire.",
  },
  {
    q: "Quelles pièces faudra-t-il préparer ?",
    a: "Aurélie BAYARD-CHAUSSEZ vérifie avec toi ton droit de travailler en France, les autorisations CNAPS et ta maîtrise du français. Un justificatif de niveau B1 est demandé aux ressortissants étrangers. Pour l’A3P : permis B et aptitude médicale. Pour le SSIAP 1 : certificat médical de moins de 3 mois et secourisme valide. Les pièces sont vérifiées avant chaque formation.",
  },
  {
    q: "Est-ce que ma candidature vaut inscription ?",
    a: "Non. Elle lance l’étude de ton projet. Nous vérifions les prérequis, préparons les entretiens avec les entreprises et t’accompagnons dans les démarches CNAPS. Ton entrée est confirmée après validation du dossier et mise en place du contrat. Les titres et le diplôme sont délivrés sous réserve de réussite aux évaluations.",
  },
  {
    q: "Et si j’ai un besoin lié au handicap ?",
    a: "Parles-en à Aurélie BAYARD-CHAUSSEZ avant l’entrée en formation pour étudier les aménagements possibles et les exigences des métiers. Aucun renseignement médical n’est à transmettre dans le formulaire public. Nous faisons le point avec toi sur les conditions d’accueil adaptées.",
  },
] as const;
