import type { ManualIllustration } from './manualIllustrations';

function scene(file: string, alt: string): ManualIllustration {
  return { src: `/images/${file}.webp`, alt };
}

export const additionalMissionIllustrations = {
  'bachelor-eirc': [
    scene('programmes-metiers/eirc/mission-3', 'Une analyste organise son tableau de veille à partir des demandes de ses collègues.'),
    scene('programmes-metiers/eirc/mission-4', 'Un analyste présente une note de situation à la responsable du site.'),
  ],
  'bachelor-dms': [
    scene('programmes-metiers/dms/mission-3', 'Un responsable d’exploitation répartit les horaires de son équipe devant le planning.'),
    scene('programmes-metiers/dms/mission-4', 'Une directrice et le responsable du site font le bilan d’une prestation de sécurité en parcourant le site.'),
  ],
  'mastere-chef-de-produit-ia': [
    scene('programmes-metiers/cpiaa/mission-3', 'Une cheffe de produit observe une utilisatrice essayant un prototype sur borne.'),
    scene('programmes-metiers/cpiaa/mission-4', 'Un chef de produit analyse les retours d’usage sur un tableau de suivi avec le service support.'),
  ],
  'mastere-ingenierie-ia-generative': [
    scene('programmes-metiers/eiag/mission-3', 'Une ingénieure prépare un corpus de documents avec leur responsable métier.'),
    scene('programmes-metiers/eiag/mission-4', 'Un ingénieur suit les performances d’un assistant documentaire depuis un poste de supervision.'),
  ],
  'tp-gestionnaire-de-paie': [
    scene('programmes-metiers/paie/mission-3', 'Une gestionnaire prépare la déclaration des éléments de paie à partir des pièces du mois.'),
    scene('programmes-metiers/paie/mission-4', 'Un gestionnaire explique à une salariée les rubriques de son bulletin de salaire.'),
  ],
  'tp-assistant-ressources-humaines': [
    scene('programmes-metiers/rh/mission-3', 'Une assistante RH organise les créneaux d’entretien avec un responsable du recrutement.'),
    scene('programmes-metiers/rh/mission-4', 'Un assistant RH vérifie le suivi des formations et des présences avec une formatrice.'),
  ],
  'tp-secretaire-assistant-medico-administratif': [
    scene('programmes-metiers/sama/mission-3', 'Une secrétaire médicale met en forme un compte rendu dicté devant son poste de travail.'),
    scene('programmes-metiers/sama/mission-4', 'Un secrétaire transmet un dossier fermé à une soignante dans le bureau réservé au personnel.'),
  ],
  'tp-charge-accueil-gestion-administrative': [
    scene('programmes-metiers/accueil/mission-3', 'Un agent d’accueil coordonne des rendez-vous dans un agenda avec une collègue.'),
    scene('programmes-metiers/accueil/mission-4', 'Une agente administrative répartit le courrier entrant dans les casiers des services.'),
  ],
  'tp-operateur-videoprotection-telesurveillance': [
    scene('programmes-metiers/ovt/mission-3', 'Une opératrice de vidéoprotection remet une main courante au collègue qui prend la relève.'),
    scene('programmes-metiers/ovt/mission-4', 'Un opérateur signale un dysfonctionnement d’écran à une technicienne du centre.'),
  ],
} as const;

export const programmeIllustrations = {
  'bachelor-eirc': [
    scene('programmes-metiers/eirc/unite-1', 'Deux analystes comparent l’origine de documents dans une salle de veille.'),
    scene('programmes-metiers/eirc/unite-2', 'Une professionnelle ordonne les observations sur une frise chronologique au mur.'),
    scene('programmes-metiers/eirc/unite-3', 'Un apprenti explique les conclusions d’une enquête défensive à une équipe de direction.'),
  ],
  'bachelor-dms': [
    scene('programmes-metiers/dms/unite-1', 'Une dirigeante d’agence examine avec un client le devis d’un site d’exposition.'),
    scene('programmes-metiers/dms/unite-2', 'Un chef de service incendie présente un plan d’évacuation à l’exploitante.'),
  ],
  'mastere-chef-de-produit-ia': [
    scene('programmes-metiers/cpiaa/unite-1', 'Une équipe produit compare deux opportunités d’automatisation sur un tableau de décision.'),
    scene('programmes-metiers/cpiaa/unite-2', 'Une utilisatrice teste une maquette et explique son besoin à la cheffe de produit.'),
    scene('programmes-metiers/cpiaa/unite-3', 'Le responsable de livraison accompagne une équipe lors du lancement d’un produit numérique en agence.'),
    scene('programmes-metiers/cpiaa/unite-4', 'Deux spécialistes étudient les indicateurs d’adoption d’un service sur grand écran.'),
  ],
  'mastere-ingenierie-ia-generative': [
    scene('programmes-metiers/eiag/unite-1', 'Une architecte logicielle relie les sources documentaires aux composants d’une application sur un tableau.'),
    scene('programmes-metiers/eiag/unite-2', 'Deux développeurs travaillent sur un composant d’assistant documentaire dans un atelier informatique.'),
    scene('programmes-metiers/eiag/unite-3', 'Une ingénieure compare les résultats d’essais avec une grille de fiabilité.'),
    scene('programmes-metiers/eiag/unite-4', 'Une équipe supervise une nouvelle version d’une application depuis un écran de suivi.'),
  ],
  'tp-gestionnaire-de-paie': [
    scene('programmes-metiers/paie/unite-1', 'Une gestionnaire établit le bulletin de paie à partir d’un relevé de temps.'),
    scene('programmes-metiers/paie/unite-2', 'Un gestionnaire de paie étudie une modification de temps de travail avec une collaboratrice RH.'),
  ],
  'tp-assistant-ressources-humaines': [
    scene('programmes-metiers/rh/unite-1', 'Une assistante renseigne un dossier salarié et met à jour le calendrier du personnel.'),
    scene('programmes-metiers/rh/unite-2', 'Un assistant et une responsable préparent un plan de développement des compétences.'),
  ],
  'tp-secretaire-assistant-medico-administratif': [
    scene('programmes-metiers/sama/unite-1', 'Une secrétaire médicale accueille un patient à l’entrée d’un cabinet lumineux.'),
    scene('programmes-metiers/sama/unite-2', 'Deux professionnelles organisent les rendez-vous successifs d’une consultation.'),
  ],
  'tp-charge-accueil-gestion-administrative': [
    scene('programmes-metiers/accueil/unite-1', 'Une chargée d’accueil oriente un visiteur vers le service compétent dans un hall professionnel.'),
    scene('programmes-metiers/accueil/unite-2', 'Un agent enregistre un document et le classe dans le dossier d’un service.'),
  ],
  'tp-operateur-videoprotection-telesurveillance': [
    scene('programmes-metiers/ovt/unite-1', 'Une agente observe les vues d’une place publique depuis le poste de vidéoprotection.'),
    scene('programmes-metiers/ovt/unite-2', 'Un opérateur de télésurveillance prend en compte une notification au poste de réception.'),
  ],
  'a3p': [
    scene('programmes-metiers/a3p/unite-1', 'Deux stagiaires et une formatrice de secourisme s’exercent autour d’un mannequin pédagogique et d’une trousse de secours.'),
    scene('programmes-metiers/a3p/unite-2', 'Une formatrice en droit explique les limites du métier à des stagiaires réunis devant un tableau.'),
    scene('programmes-metiers/a3p/unite-3', 'Une agente écoute deux personnes en désaccord et les aide à reprendre le dialogue à l’accueil d’un établissement.'),
    scene('programmes-metiers/a3p/unite-4', 'Des membres d’une équipe mettent en commun le programme de la journée et leurs documents de travail.'),
    scene('programmes-metiers/a3p/unite-5', 'Une agente accueille le public à l’entrée d’un équipement culturel, près d’un panneau de vigilance.'),
    scene('programmes-metiers/a3p/unite-6', 'La responsable d’une prestation de protection recueille les besoins de sa cliente dans le hall d’un centre de congrès.'),
    scene('programmes-metiers/a3p/unite-7', 'Deux professionnels accompagnent calmement une cliente à pied vers l’accueil d’une entreprise.'),
    scene('programmes-metiers/a3p/unite-8', 'Une équipe échange avec l’organisatrice d’un salon sur l’accessibilité des lieux et l’accueil des visiteurs.'),
    scene('programmes-metiers/a3p/unite-9', 'Un groupe de stagiaires prépare les fournitures d’un atelier de secours d’urgence avec sa formatrice.'),
  ],
  'desp-initial': [
    scene('desp/manuel/projet', 'Une dirigeante prépare son projet de création d’entreprise.'),
    scene('desp/manuel/conformite', 'Un responsable contrôle les pièces réglementaires de son activité.'),
    scene('desp/manuel/finances', 'Une équipe étudie les comptes et le budget prévisionnel.'),
    scene('desp/manuel/client', 'Une responsable d’agence rencontre son client.'),
    scene('desp/manuel/management', 'Un dirigeant organise le travail de l’équipe.'),
  ],
  'desp-vae': [
    scene('desp/manuel/direction', 'Une candidate présente les pièces de création de son entreprise.'),
    scene('formation-scenes-manuel/desp-initial-agrement', 'Une responsable réunit les justificatifs réglementaires de l’entreprise.'),
    scene('desp/manuel/pilotage', 'Une candidate sélectionne les documents de gestion financière.'),
    scene('desp/manuel/client', 'Deux professionnels reviennent sur un contrat client.'),
    scene('desp/manuel/organisation', 'Un responsable prépare les documents d’organisation de son équipe.'),
  ],
  'sst': [
    scene('sst/manuel/prevention', 'Un formateur explique la prévention des risques sur le lieu de travail.'),
    scene('sst/manuel/defibrillateur', 'Les stagiaires s’exercent avec du matériel de secours pédagogique.'),
  ],
  'ssiap-maintien': [
    scene('ssiap-1/manuel/prevention', 'Un agent SSIAP présente le plan de sécurité incendie.'),
    scene('ssiap-1/manuel/ronde', 'Une agente vérifie un dégagement pendant sa ronde.'),
    scene('ssiap-2/coordination-pc', 'Un chef d’équipe coordonne l’activité du poste de sécurité.'),
    scene('ssiap-2/formation-equipe', 'Un chef d’équipe anime une séquence de formation des agents.'),
    scene('ssiap-3/etude-plans', 'Une cheffe de service étudie un plan de bâtiment.'),
    scene('ssiap-3/budget-maintenance', 'Le service de sécurité prépare un dossier de maintenance.'),
  ],
  'cpsp': [
    scene('bts/mos-unifie-2026/manager', 'Un chef de poste et les agents de son équipe se réunissent sur le site.'),
    scene('formation-scenes-manuel/aps-pc-pedagogique', 'Des agents étudient l’organisation du poste de sécurité.'),
    scene('a3p/manuel/briefing', 'Une équipe fait le point lors d’un briefing de service.'),
    scene('ssiap-2/compte-rendu', 'Un responsable transmet à sa hiérarchie un compte rendu de service.'),
  ],
} as const;

const common = {
  expression: scene('programmes-metiers/commun/expression', 'Deux étudiants comparent des documents et présentent une synthèse orale à la classe.'),
  langues: scene('programmes-metiers/commun/langues', 'Une étudiante échange en langue étrangère avec un interlocuteur en visioconférence.'),
  economie: scene('programmes-metiers/commun/economie', 'Des étudiants étudient un contrat et les décisions d’une entreprise avec un enseignant.'),
};

export const btsProgrammeIllustrations = {
  mco: [
    common.expression,
    common.langues,
    common.economie,
    scene('programmes-metiers/mco/unite-4', 'Une vendeuse-conseil écoute une cliente et compare deux produits dans un commerce.'),
    scene('programmes-metiers/mco/unite-5', 'Un responsable prépare un nouvel agencement de rayon avec sa collaboratrice.'),
    scene('programmes-metiers/mco/unite-6', 'Une responsable de magasin rapproche les stocks et les prévisions de commandes.'),
    scene('programmes-metiers/mco/unite-7', 'Un manager répartit les tâches de l’équipe avant l’ouverture du magasin.'),
  ],
  ndrc: [
    common.expression,
    common.langues,
    common.economie,
    scene('programmes-metiers/ndrc/unite-4', 'Une commerciale présente une proposition au responsable d’une entreprise cliente.'),
    scene('programmes-metiers/ndrc/unite-5', 'Une conseillère traite les demandes clients par téléphone et messagerie à son poste.'),
    scene('programmes-metiers/ndrc/unite-6', 'Une chargée de réseau échange avec des distributeurs sur leurs points de vente.'),
    scene('programmes-metiers/ndrc/unite-7', 'Un étudiant prépare son dossier professionnel avec une tutrice commerciale.'),
  ],
  ci: [
    common.expression,
    common.langues,
    common.economie,
    scene('programmes-metiers/ci/unite-4', 'Deux professionnels de pays différents examinent une commande lors d’une réunion commerciale.'),
    scene('programmes-metiers/ci/unite-5', 'Une coordinatrice import-export suit des marchandises et les documents de transport dans un entrepôt.'),
    scene('programmes-metiers/ci/unite-6', 'Un chargé de développement et sa collègue repèrent de nouveaux marchés sur une carte.'),
  ],
  pi: [
    common.expression,
    common.langues,
    scene('programmes-metiers/pi/unite-3', 'Une professionnelle de l’immobilier explique les pièces d’un bail à ses clients.'),
    scene('programmes-metiers/pi/unite-4', 'Une agente immobilière accompagne un couple à l’entrée d’un appartement en visite.'),
    scene('programmes-metiers/pi/unite-5', 'Une gestionnaire de copropriété rencontre des résidents dans le hall d’un immeuble.'),
    scene('programmes-metiers/pi/unite-6', 'Deux professionnels de l’immobilier étudient l’état du bâtiment sur place avec un plan.'),
  ],
  cg: [
    common.expression,
    common.langues,
    scene('programmes-metiers/cg/unite-3', 'Une étudiante calcule un pourcentage et compare des séries de valeurs sur un tableau.'),
    common.economie,
    scene('programmes-metiers/cg/unite-5', 'Un apprenti comptable rapproche des documents fiscaux et des écritures sur son écran.'),
    scene('programmes-metiers/cg/unite-6', 'Une collaboratrice enregistre les opérations d’un dossier et contrôle les pièces justificatives.'),
    scene('programmes-metiers/cg/unite-7', 'Une contrôleuse présente un budget prévisionnel et les écarts observés à une direction.'),
    scene('programmes-metiers/cg/unite-8', 'Un comptable et une collègue vérifient la circulation des factures dans un logiciel de gestion.'),
  ],
  mos: [
    scene('bts/mos-unifie-2026/reperer', 'Une professionnelle de sécurité examine les lieux de la prestation.'),
    scene('bts/mos-unifie-2026/organiser', 'Un responsable répartit les missions de son équipe.'),
    scene('programmes-metiers/mos/unite-3', 'Une professionnelle de la sécurité fait le point sur la prestation avec son client dans le hall d’un centre d’affaires.'),
    scene('programmes-metiers/mos/unite-4', 'Un responsable de sécurité reçoit une délégation internationale à l’entrée d’un salon.'),
    common.expression,
    common.langues,
    common.economie,
  ],
} as const;

export const programmeOverviews = {
  a3p: scene('programmes-metiers/a3p/apercu', 'Une formatrice et quatre stagiaires en protection des personnes préparent un exercice dans une salle claire ouverte sur le campus.'),
  sst: scene('programmes-metiers/sst/apercu', 'Une formatrice accueille des salariés devant les mannequins et le matériel pédagogique de la formation SST.'),
  cpsp: scene('programmes-metiers/cpsp/apercu', 'Une cheffe de poste rejoint une équipe en tenue professionnelle à l’entrée d’un poste de sécurité lumineux.'),
};
