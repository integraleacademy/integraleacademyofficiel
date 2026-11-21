import { certificationProjects, type CertificationProject } from './certification-projects';
import type { TrainingProgramUnit } from '@/components/TrainingProgramExplorer';

type Entry = readonly [string, string];
type CaseStudy = { title: string; text: string; document: string; rows: readonly Entry[] };
export type CourseContent = {
  theme: 'blue' | 'violet' | 'orange' | 'green' | 'turquoise';
  mark: string;
  tagline: string;
  level: string;
  venue?: 'Paris' | 'Puget-sur-Argens';
  missions: readonly Entry[];
  practice: readonly CaseStudy[];

  units: readonly TrainingProgramUnit[];
  admission: readonly Entry[];
  exam: { metric: string; label: string; parts: readonly [Entry, Entry]; validation: string };
  jobs: readonly string[];
  settings: string;
  rncp?: string;
  project?: CertificationProject;
};

function example(title: string, text: string, document: string, ...rows: Entry[]): CaseStudy {
  return { title, text, document, rows };
}
function unit(number: string, title: string, description: string, items: string[], delivery: string, duration?: string): TrainingProgramUnit {
  return { number, title, description, items, delivery, duration };
}

const eirc: CourseContent = {
  theme: 'blue', mark: 'EIRC', level: 'Niveau 6 visé', tagline: 'De l’indice numérique à la décision de sécurité',
  missions: [
    ['Vérifier un signalement', 'L’analyste distingue les faits observés, la qualité de leurs sources et les points qui demandent encore une vérification.'],
    ['Éclairer l’équipe de défense', 'Il remet les événements dans l’ordre et explique leur portée aux personnes chargées de protéger l’organisation.'],
  ],
  practice: [
    example('Recouper deux sources', 'Deux signalements décrivent le même événement. Quelles informations permettent de les rapprocher ?', 'Fiche de veille', ['Source A', 'Alerte horodatée'], ['Source B', 'Compte rendu interne'], ['Conclusion', 'Faits corroborés']),
    example('Préparer une relève', 'Une autre équipe reprend le dossier. Composez une synthèse qui lui permette de distinguer les faits des hypothèses.', 'Note de situation', ['Chronologie', 'Événements confirmés'], ['Incertitudes', 'Questions en suspens'], ['Destinataire', 'Équipe de défense']),
  ],
  units: [
    unit('01', 'Qualifier les sources', 'Apprécier la fiabilité d’une information avant de l’utiliser.', ['Identifier son origine et sa date.', 'Comparer avec une source indépendante.'], 'Livrable illustratif · fiche de veille'),
    unit('02', 'Reconstituer un incident', 'Organiser les observations disponibles dans une chronologie défendable.', ['Distinguer observation et interprétation.', 'Signaler les écarts entre les traces.'], 'Livrable illustratif · chronologie commentée'),
    unit('03', 'Transmettre le renseignement', 'Adapter une conclusion au destinataire chargé de prendre une décision.', ['Hiérarchiser les éléments significatifs.', 'Expliquer les incertitudes restantes.'], 'Livrable illustratif · note de situation'),
  ],
  admission: [['Votre parcours', 'Présentez vos études et vos expériences en informatique, en veille ou en analyse. L’école précisera les prérequis à l’ouverture.'], ['Votre projet', 'Indiquez le type de poste ou d’équipe cyber que vous souhaitez rejoindre.']],
  exam: { metric: '6', label: 'Niveau visé', parts: [['Les travaux du métier', 'Une chronologie argumentée et une synthèse de renseignement illustrent les productions travaillées.'], ['Les modalités de validation', 'L’école communiquera les épreuves, leurs durées et les critères d’évaluation à l’ouverture du parcours.']], validation: 'Le niveau 6 est visé, sous réserve de la décision de France compétences.' },
  jobs: [], settings: 'Cellules de veille, équipes de réponse aux incidents et services chargés de la sécurité des systèmes d’information.',
};

const dms: CourseContent = {
  theme: 'orange', mark: 'DMS', level: 'Niveau 6 · DESP', venue: 'Puget-sur-Argens', rncp: '40552',
  tagline: 'Deux diplômes à préparer en un an d’alternance',
  missions: [
    ['Diriger une prestation de sécurité privée', 'Dimensionner l’équipe, calculer le coût des heures et du matériel, puis défendre une offre compatible avec le budget du client.'],
    ['Conseiller l’exploitant en sécurité incendie', 'Lire un plan, étudier les risques et organiser le travail du service de sécurité dans un ERP ou un IGH.'],
  ],
  practice: [
    example('Chiffrer une ronde de nuit', 'Le client ajoute une ronde au contrat. Comment calculer les heures supplémentaires et protéger la marge de la prestation ?', 'Révision du devis', ['Demande', 'Une ronde de nuit'], ['Calcul', 'Heures et coût de revient'], ['Livrable', 'Devis ajusté']),
    example('Étudier le cloisonnement d’une salle', 'L’exploitant souhaite modifier un local. À partir du plan, examinez les sorties, la circulation et l’accès aux équipements.', 'Avis du service incendie', ['Projet', 'Nouvelle cloison'], ['Contrôles', 'Dégagements et équipements'], ['Livrable', 'Avis à l’exploitant']),
  ],
  units: [
    unit('DESP', 'Directeur d’entreprise de sécurité privée', 'Piloter une entreprise de sécurité, du devis au suivi du contrat.', ['Cadre juridique, création d’agence et responsabilités.', 'Budget, prix de vente, marges et appels d’offres.', 'Suivi des contrats, planification et management.'], 'Titre à finalité professionnelle de niveau 6 · RNCP40552', '245 h'),
    unit('SSIAP 3', 'Chef de service de sécurité incendie', 'Prévenir les risques incendie et conseiller l’exploitant d’un établissement.', ['Comportement du feu, construction et lecture de plans.', 'Réglementation incendie et analyse des risques.', 'Conseil, management du service et budget.'], 'Diplôme de chef de service de sécurité incendie et d’assistance à personnes', '216 h'),
  ],
  admission: [
    ['Voie niveau 4 · bac ou équivalent', 'Justifier de trois ans d’expérience professionnelle en sécurité privée, en équivalent temps plein.'],
    ['Voie niveau 5 · bac +2', 'Un BTS MOS ou un autre diplôme ou titre de niveau 5 permet de candidater directement.'],
    ['Accès au DESP', 'Présenter une autorisation préalable ou provisoire du CNAPS, ou une carte professionnelle en cours de validité.'],
    ['Secourisme pour le SSIAP 3', 'Présenter un AFPS ou un PSC de moins de deux ans, ou un SST ou un PSE 1 en cours de validité.'],
  ],
  exam: { metric: '2', label: 'Examens distincts', parts: [['DESP · 13 et 14 avril 2028', 'Un QCM de réglementation, une étude de cas écrite et un entretien oral devant le jury.'], ['SSIAP 3 · 22 et 23 juin 2028', 'Un QCM de 40 questions en 40 minutes, la rédaction d’une notice technique en 2 h 30 et un oral de 15 minutes.']], validation: 'Dates prévisionnelles à confirmer avec les jurys. Chaque diplôme est délivré séparément, après réussite à ses épreuves.' },
  jobs: ['Assistant d’exploitation', 'Adjoint au responsable de site', 'Chef de service de sécurité incendie', 'Responsable d’agence', 'Directeur d’entreprise de sécurité privée'],
  settings: 'Agences de sécurité privée, services internes, établissements recevant du public (ERP) et immeubles de grande hauteur (IGH). Diriger une entreprise de sécurité privée demande également un agrément dirigeant du CNAPS.',
};

function master(project: CertificationProject): CourseContent {
  const product = project.slug === 'cpiaa';
  return {
    theme: product ? 'turquoise' : 'violet', mark: project.acronym, level: 'Niveau 7 visé', venue: 'Paris', project,
    tagline: product ? 'Du besoin utilisateur à la feuille de route produit' : 'Du premier essai au suivi d’une application en production',
    missions: product ? [
      ['Comprendre les usages', 'Observer le travail des utilisateurs et déterminer où l’automatisation peut réellement leur faire gagner du temps.'],
      ['Piloter les choix produit', 'Arbitrer entre valeur, faisabilité, risques et effort de réalisation avec les équipes métier et techniques.'],
    ] : [
      ['Concevoir une application générative', 'Traduire les besoins du métier en architecture, choisir les composants et documenter les données nécessaires.'],
      ['Tester la fiabilité des réponses', 'Comparer les résultats à une référence, étudier les erreurs puis suivre la qualité après la mise en service.'],
    ],
    practice: product ? [
      example('Tester un prototype avec un utilisateur', 'Un service client veut trier ses demandes. Qu’observer pendant le test pour savoir si le prototype l’aide vraiment ?', 'Protocole de test', ['Tâche', 'Classer une demande'], ['Observation', 'Temps et erreurs'], ['Décision', 'Adapter le prototype']),
      example('Arbitrer une priorité', 'Deux fonctionnalités sont demandées. Comparez leur utilité, leur coût et le risque avant de proposer la prochaine livraison.', 'Feuille de route', ['Bénéfice', 'Besoin utilisateur'], ['Effort', 'Données et équipe'], ['Décision', 'Priorité motivée']),
    ] : [
      example('Évaluer un assistant documentaire', 'Comparez les réponses d’un assistant aux documents sources et repérez les affirmations insuffisamment étayées.', 'Grille d’évaluation', ['Question', 'Demande métier'], ['Référence', 'Document validé'], ['Analyse', 'Écart constaté']),
      example('Suivre une nouvelle version', 'Un changement de modèle améliore certains résultats. Définissez les contrôles qui éclaireront la mise en service.', 'Fiche de version', ['Avant', 'Jeu de référence'], ['Après', 'Qualité et délai'], ['Suivi', 'Seuil de réexamen']),
    ],
    units: project.blocks.map((block, index) => ({ number: block.code, title: block.title, description: block.summary, delivery: project.assessments[index] })),
    admission: [['Prérequis envisagés', project.entryRequirement], ['Positionnement', project.admission], ['Compétences d’entrée', project.entrySkills.join(' ')]],
    exam: { metric: '4', label: 'Blocs prévus', parts: [['Travaux attendus', project.assessments.slice(0, 2).join(' · ')], ['Évaluations de fin de parcours', project.assessments.slice(2).join(' · ')]], validation: 'Le projet prévoit la validation des quatre blocs. Les modalités définitives seront précisées avant l’ouverture.' },
    jobs: project.jobs, settings: project.employmentNote || 'Éditeurs de logiciels, services numériques, cabinets de conseil et directions produit ou transformation.',
  };
}

type TitleContent = Omit<CourseContent, 'venue' | 'admission' | 'theme'> & { entry: string; theme: CourseContent['theme'] };
function professionalTitle({ entry, ...detail }: TitleContent): CourseContent {
  return { ...detail, venue: 'Puget-sur-Argens', admission: [['Votre projet professionnel', entry], ['Votre entrée en formation', 'Déposez votre candidature sur le portail admissions d’Intégrale Academy. Sélectionnez votre titre professionnel pour préparer votre rentrée en alternance à partir de septembre 2027.']] };
}
function titleExam(time: string, written: Entry, oral: Entry): CourseContent['exam'] {
  return { metric: time, label: 'Durée de l’épreuve du titre complet', parts: [written, oral], validation: 'Le jury évalue les compétences selon le référentiel national du titre professionnel.' };
}

const payroll = professionalTitle({
  theme: 'green', mark: 'PAIE', level: 'Niveau 5', rncp: '37948', tagline: 'Des heures travaillées au bulletin de salaire',
  missions: [['Collecter les variables du mois', 'Réunir les relevés d’heures, les absences et les primes avant la clôture.'], ['Contrôler la paie', 'Rapprocher les pièces, expliquer les écarts et vérifier les montants à transmettre.']],
  practice: [
    example('Intégrer une absence', 'Un relevé d’heures et une absence arrivent avant la clôture. Identifiez le justificatif et la période concernés.', 'Variables du mois', ['Pièce', 'Relevé de présence'], ['Événement', 'Absence à justifier'], ['Contrôle', 'Période de paie']),
    example('Expliquer un écart de net', 'Un salarié constate un écart entre deux bulletins. Repérez la ligne et le justificatif qui l’expliquent.', 'Contrôle du bulletin', ['Comparer', 'Deux périodes'], ['Identifier', 'Rubrique modifiée'], ['Répondre', 'Explication au salarié']),
  ],
  units: [unit('CCP 1', 'Établir les bulletins', 'Passer des données contractuelles au bulletin contrôlé.', ['Recueillir les variables.', 'Calculer le brut, les cotisations et le net.'], 'Gestion administrative et juridique de la paie'), unit('CCP 2', 'Traiter les événements de la vie professionnelle', 'Mesurer l’effet d’un changement de situation sur la paie.', ['Traiter les absences et les départs.', 'Contrôler les données de synthèse.'], 'Paie et événements du contrat')],
  entry: 'Présentez votre expérience des chiffres, des tableurs ou du suivi administratif et le type de service paie qui vous intéresse.',
  exam: titleExam('5 h 05', ['Étude de cas', 'Traiter un dossier de paie en quatre heures après quinze minutes de prise en main du poste.'], ['Échanges avec le jury', 'Un entretien technique de trente minutes puis un entretien final de vingt minutes.']),
  jobs: ['Gestionnaire de paie', 'Collaborateur paie', 'Gestionnaire paie et administration du personnel'], settings: 'Services paie d’entreprises, cabinets d’expertise comptable et prestataires spécialisés.',
});

const hr = professionalTitle({
  theme: 'violet', mark: 'RH', level: 'Niveau 5', rncp: '41366', tagline: 'Accompagner les salariés tout au long de leur parcours',
  missions: [['Suivre les dossiers du personnel', 'Fiabiliser les informations, les échéances et les éléments transmis au service paie.'], ['Accompagner les équipes', 'Préparer l’accueil, suivre les formations et contribuer au recrutement.']],
  practice: [
    example('Préparer une arrivée', 'Une salariée rejoint le service lundi. Coordonnez les pièces, les interlocuteurs et le premier rendez-vous.', 'Parcours d’intégration', ['Avant', 'Vérifier les pièces'], ['Jour J', 'Accueil de l’équipe'], ['Suivi', 'Entretien de prise de poste']),
    example('Suivre un besoin de formation', 'Une équipe demande une formation. Organisez le suivi de la demande jusqu’au retour du salarié.', 'Suivi des compétences', ['Demande', 'Besoin du service'], ['Action', 'Inscription et dates'], ['Bilan', 'Retour du salarié']),
  ],
  units: [unit('CCP 1', 'Gérer le quotidien RH', 'Sécuriser le suivi administratif des salariés.', ['Tenir les dossiers à jour.', 'Préparer les variables de paie et les indicateurs RH.'], 'Administration du personnel'), unit('CCP 2', 'Contribuer au développement RH', 'Participer au recrutement, à l’intégration et à la formation.', ['Suivre les candidatures.', 'Organiser les actions de développement des compétences.'], 'Développement des ressources humaines')],
  entry: 'Précisez votre intérêt pour l’administration du personnel, la relation avec les salariés ou l’organisation des recrutements.',
  exam: titleExam('4 h 20', ['Étude de cas', 'Traiter en 3 h 30 plusieurs demandes dans le contexte d’un service RH.'], ['Échanges avec le jury', 'Expliquer les choix effectués en entretien technique, puis présenter son parcours lors de l’entretien final.']),
  jobs: ['Assistant ressources humaines', 'Assistant formation', 'Assistant recrutement'], settings: 'Services RH d’entreprises ou d’associations, cabinets de recrutement et agences d’emploi.',
});

const medical = professionalTitle({
  theme: 'turquoise', mark: 'SAMA', level: 'Niveau 4', rncp: '40800', tagline: 'Accueillir le patient et coordonner son parcours administratif',
  missions: [['Accueillir et orienter', 'Écouter la demande du patient, vérifier son rendez-vous et l’adresser au professionnel concerné.'], ['Coordonner les dossiers et les agendas', 'Organiser les rendez-vous, les documents et les transmissions en respectant le secret professionnel.']],
  practice: [
    example('Réorganiser un rendez-vous', 'Une consultation est déplacée. Retrouvez le créneau disponible et transmettez les informations pratiques au patient.', 'Agenda de consultation', ['Demande', 'Déplacement de rendez-vous'], ['Vérification', 'Disponibilité du service'], ['Suivi', 'Confirmation au patient']),
    example('Préparer un dossier patient', 'Le praticien attend un document avant la consultation. Vérifiez son rattachement et le destinataire de la transmission.', 'Suivi du dossier', ['Identité', 'Vérification'], ['Pièce', 'Document attendu'], ['Transmission', 'Canal autorisé']),
  ],
  units: [unit('CCP 1', 'Accueillir le patient', 'Assurer le premier contact et le secrétariat courant de la structure.', ['Planifier les rendez-vous.', 'Assurer la prise en charge administrative et financière.'], 'Accueil en structure médicale'), unit('CCP 2', 'Assurer le suivi du parcours', 'Assister les professionnels de santé dans la gestion des dossiers.', ['Tenir les documents médicaux à jour.', 'Transmettre les informations aux destinataires autorisés.'], 'Coordination médico-administrative')],
  entry: 'Expliquez votre intérêt pour l’accueil des patients, l’organisation des consultations et le suivi confidentiel des dossiers.',
  exam: titleExam('4 h 20', ['Mise en situation écrite et orale', 'Une étude de cas place le candidat au secrétariat d’une structure médicale fictive pendant 3 h 45.'], ['Échanges avec le jury', 'Un entretien technique et un entretien final complètent les productions et les mises en situation.']),
  jobs: ['Secrétaire médical', 'Secrétaire médico-administratif', 'Assistant médico-administratif'], settings: 'Cabinets médicaux, centres de santé et services administratifs d’établissements de soins.',
});

const reception = professionalTitle({
  theme: 'orange', mark: 'CAGA', level: 'Niveau 4', rncp: '41239', tagline: 'Le premier contact des visiteurs, le relais de l’équipe',
  missions: [['Orienter une demande', 'Identifier le besoin en face à face ou au téléphone et trouver le bon interlocuteur.'], ['Assurer le suivi administratif', 'Tracer les demandes et préparer les documents utiles à leur traitement.']],
  practice: [
    example('Accueillir deux demandes', 'Un visiteur se présente pendant un appel. Comment traiter chaque demande et préserver la confidentialité ?', 'Registre d’accueil', ['Visiteur', 'Rendez-vous à vérifier'], ['Appel', 'Demande à noter'], ['Relais', 'Service compétent']),
    example('Suivre un courrier', 'Un document doit être transmis et traité avant une échéance. Organisez son parcours jusqu’à la réponse.', 'Suivi du courrier', ['Réception', 'Date de remise'], ['Attribution', 'Destinataire'], ['Clôture', 'Réponse consignée']),
  ],
  units: [unit('CCP 1', 'Assurer l’accueil', 'Prendre en charge les visiteurs et les demandes à distance.', ['Qualifier et orienter une demande.', 'Adapter la communication à la situation.'], 'Accueil multicanal'), unit('CCP 2', 'Gérer les activités administratives', 'Traiter les documents et l’information courante de la structure.', ['Mettre en forme des documents.', 'Classer les dossiers et suivre les demandes.'], 'Gestion administrative')],
  entry: 'Présentez les situations d’accueil, de relation client ou de gestion documentaire que vous souhaitez apprendre à traiter.',
  exam: titleExam('3 h', ['Mise en situation', 'Traiter des dossiers écrits et des situations d’accueil oral dans une même structure fictive.'], ['Échanges avec le jury', 'Un entretien technique, des questions sur les productions du candidat et un entretien final complètent l’épreuve.']),
  jobs: ['Chargé d’accueil', 'Agent administratif', 'Employé d’accueil et de gestion administrative'], settings: 'Entreprises, associations, administrations et établissements qui accueillent du public.',
});

const monitoring = professionalTitle({
  theme: 'blue', mark: 'OVT', level: 'Niveau 4', rncp: '37879', tagline: 'Observer, vérifier et transmettre depuis le poste de surveillance',
  missions: [['Observer les images', 'Qualifier une situation visible à l’écran et consigner les faits utiles.'], ['Coordonner la réponse à une alerte', 'Appliquer les consignes, informer l’interlocuteur habilité et assurer une traçabilité précise.']],
  practice: [
    example('Rédiger une main courante', 'Une situation inhabituelle apparaît à l’écran. Décrivez ce qui est observé et horodatez la transmission.', 'Main courante', ['Heure', 'Observation datée'], ['Faits', 'Description objective'], ['Transmission', 'Interlocuteur informé']),
    example('Passer une consigne', 'Une alerte est toujours en cours à la relève. Préparez les informations indispensables à la continuité du suivi.', 'Fiche de relève', ['État', 'Alerte en cours'], ['Action', 'Vérification consignée'], ['Relève', 'Suivi à poursuivre']),
  ],
  units: [unit('CCP 1', 'Assurer la vidéoprotection', 'Utiliser les images dans le respect des consignes et du cadre applicable.', ['Identifier les faits utiles.', 'Tracer les événements et les transmissions.'], 'Poste de vidéoprotection'), unit('CCP 2', 'Assurer la télésurveillance', 'Qualifier une alerte et organiser le suivi avec les intervenants habilités.', ['Traiter les signaux d’alarme.', 'Coordonner et consigner le suivi des interventions.'], 'Station de télésurveillance')],
  entry: 'Exposez votre projet en vidéoprotection ou en télésurveillance. L’équipe vous orientera sur les démarches liées à l’activité envisagée.',
  exam: titleExam('2 h 40', ['Mises en situation', 'Tenir le poste dans deux scénarios couvrant la vidéoprotection et la télésurveillance.'], ['Questionnaire et entretiens', 'Un questionnaire professionnel, un entretien technique et un entretien final complètent les situations de travail.']),
  jobs: ['Opérateur en vidéoprotection', 'Opérateur en télésurveillance', 'Opérateur de station centrale de télésurveillance'], settings: 'Postes de sécurité, centres de supervision et stations de télésurveillance. Les conditions d’exercice dépendent du poste et de son cadre réglementaire.',
});

export const announcedCourseContent: Record<string, CourseContent> = {
  'bachelor-eirc': eirc, 'bachelor-dms': dms,
  'mastere-chef-de-produit-ia': master(certificationProjects.cpiaa),
  'mastere-ingenierie-ia-generative': master(certificationProjects.eiag),
  'tp-gestionnaire-de-paie': payroll, 'tp-assistant-ressources-humaines': hr,
  'tp-secretaire-assistant-medico-administratif': medical,
  'tp-charge-accueil-gestion-administrative': reception,
  'tp-operateur-videoprotection-telesurveillance': monitoring,
};
