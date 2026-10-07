import type { SceneKind } from '@/components/TrainingMotionGallery';
import { originalArtwork } from './originalArtwork';

export type ManualIllustration = { src: string; alt: string };
export type ManualIllustrationMap = Partial<Record<SceneKind, ManualIllustration>>;

function artwork(course: string, name: string, alt: string): ManualIllustration {
  return { src: `/images/${course}/manuel/${name}.webp`, alt };
}

export const a3pArtwork = {
  protection: artwork('a3p', 'protection', 'Illustration du manuel A3P : une équipe accompagne une personne protégée à la sortie d’un hôtel.'),
  briefing: artwork('a3p', 'briefing', 'Illustration du manuel A3P : préparation d’une mission en équipe autour des plans.'),
  discretion: artwork('a3p', 'discretion', 'Illustration du manuel A3P : un agent échange avec la personne protégée.'),
  preparation: artwork('a3p', 'preparation', 'Illustration du manuel A3P : étude des informations et préparation du dispositif.'),
  deplacement: artwork('a3p', 'deplacement', 'Illustration du manuel A3P : une équipe de protection accompagne un déplacement pédestre.'),
  vehicule: artwork('a3p', 'vehicule', 'Illustration du manuel A3P : arrivée de la personne protégée auprès du véhicule.'),
  techniques: artwork('a3p', 'techniques', 'Illustration du manuel A3P : entraînement encadré aux techniques professionnelles.'),
  reconnaissance: artwork('a3p', 'reconnaissance', 'Illustration du manuel A3P : reconnaissance d’un site et vérification des itinéraires.'),
  secours: artwork('a3p', 'secours', 'Illustration du manuel A3P : préparation et coordination d’une intervention de secours.'),
};

export const a3pPracticeArtwork: ManualIllustrationMap = {
  'mission-map': a3pArtwork.preparation,
  'risk-radar': originalArtwork['a3p-galerie-risques'],
  'site-check': a3pArtwork.reconnaissance,
  'close-protection': a3pArtwork.deplacement,
  'secure-vehicle': a3pArtwork.vehicule,
  hazard: a3pArtwork.techniques,
  cpr: a3pArtwork.secours,
  briefing: a3pArtwork.briefing,
};

export const ssiapArtwork = {
  prevention: artwork('ssiap-1', 'prevention', 'Illustration du manuel SSIAP 1 : un agent explique le plan de sécurité incendie.'),
  ronde: artwork('ssiap-1', 'ronde', 'Illustration du manuel SSIAP 1 : vérification d’un dégagement lors d’une ronde.'),
  pc: artwork('ssiap-1', 'pc-securite', 'Illustration du manuel SSIAP 1 : exploitation du système de sécurité incendie au poste de sécurité.'),
  secours: artwork('ssiap-1', 'secours', 'Illustration du manuel SSIAP 1 : un agent accueille les sapeurs-pompiers.'),
  assistance: artwork('ssiap-1', 'assistance', 'Illustration du manuel SSIAP 1 : un agent porte assistance à une personne en fauteuil roulant.'),
  verification: artwork('ssiap-1', 'verification', 'Illustration du manuel SSIAP 1 : contrôle du matériel et des équipements de sécurité.'),
  alerte: artwork('ssiap-1', 'levee-doute', 'Illustration du manuel SSIAP 1 : contrôle des accès lors d’une levée de doute.'),
  evacuation: artwork('ssiap-1', 'evacuation', 'Illustration du manuel SSIAP 1 : un agent guide les occupants vers une sortie de secours.'),
};

export const ssiapPracticeArtwork: ManualIllustrationMap = {
  'fire-round': originalArtwork['ssiap-1-galerie-ronde'],
  extinguisher: ssiapArtwork.verification,
  'fire-panel': originalArtwork['ssiap-1-galerie-ssi'],
  'fire-alert': ssiapArtwork.alerte,
  evacuation: ssiapArtwork.evacuation,
  'rescue-arrival': originalArtwork['ssiap-1-galerie-secours'],
};

export const ssiapLeadershipArtwork = {
  'ssiap-2': {
    src: '/images/ssiap-2/chef-equipe.webp',
    alt: 'Illustration SSIAP 2 : un chef d’équipe de sécurité incendie transmet les consignes à trois agents SSIAP 1 au poste de sécurité.',
  },
  'ssiap-3': {
    src: '/images/ssiap-3/chef-service.webp',
    alt: 'Illustration SSIAP 3 : un chef de service pilote la sécurité incendie de l’ensemble du bâtiment avec les chefs d’équipe SSIAP 2 et la direction de l’établissement.',
  },
} satisfies Record<'ssiap-2' | 'ssiap-3', ManualIllustration>;

export const despArtwork = {
  direction: artwork('desp', 'direction', 'Illustration du manuel du dirigeant : travail en équipe sur les dossiers de l’entreprise.'),
  projet: artwork('desp', 'projet', 'Illustration du manuel du dirigeant : étude d’un projet d’entreprise et de ses documents.'),
  conformite: artwork('desp', 'conformite', 'Illustration du manuel du dirigeant : vérification des documents et des obligations de sécurité privée.'),
  finances: artwork('desp', 'finances', 'Illustration du manuel du dirigeant : analyse des budgets et des prévisions financières.'),
  pilotage: artwork('desp', 'pilotage', 'Illustration du manuel du dirigeant : présentation des indicateurs et du calendrier de l’entreprise.'),
  client: artwork('desp', 'client', 'Illustration du manuel du dirigeant : échange professionnel sur les besoins du client.'),
  management: artwork('desp', 'management', 'Illustration du manuel du dirigeant : coordination d’une équipe de sécurité sur un site.'),
  organisation: artwork('desp', 'organisation', 'Illustration du manuel du dirigeant : briefing d’équipe et organisation des missions sur plan.'),
  supervision: artwork('desp', 'supervision', 'Illustration du manuel du dirigeant : contrôle des consignes et de la prestation sur un site client.'),
};

export const despPracticeArtwork: ManualIllustrationMap = {
  business: despArtwork.projet,
  finance: despArtwork.finances,
  compliance: despArtwork.conformite,
  approval: originalArtwork['desp-initial-agrement'],
  team: despArtwork.management,
  commercial: despArtwork.client,
  evidence: originalArtwork['desp-initial-appel-offres'],
  'site-check': despArtwork.supervision,
  briefing: despArtwork.organisation,
  'profile-review': despArtwork.direction,
  feasibility: despArtwork.projet,
  competencies: despArtwork.pilotage,
  jury: despArtwork.direction,
  certificate: despArtwork.client,
};

export const vtcArtwork = {
  accueil: artwork('vtc', 'accueil', 'Illustration du manuel VTC : préparation de l’itinéraire auprès du véhicule.'),
  reglementation: artwork('vtc', 'reglementation', 'Illustration du manuel VTC : un chauffeur vérifie ses documents professionnels.'),
  gestion: artwork('vtc', 'gestion', 'Illustration du manuel VTC : suivi des comptes et des indicateurs de l’activité.'),
  conduite: artwork('vtc', 'conduite', 'Illustration du manuel VTC : une chauffeuse attentive au volant de son véhicule.'),
  communication: artwork('vtc', 'communication', 'Illustration du manuel VTC : un chauffeur échange avec la réception d’un hôtel.'),
  commercial: artwork('vtc', 'commercial', 'Illustration du manuel VTC : échange sur une proposition commerciale.'),
  profession: artwork('vtc', 'profession', 'Illustration du manuel VTC : contrôle des documents avant une prise en charge.'),
  pratique: artwork('vtc', 'pratique', 'Illustration du manuel VTC : accueil d’une famille et de ses bagages.'),
  apprentissage: artwork('vtc', 'apprentissage', 'Illustration du manuel VTC : travail sur ordinateur et supports de formation.'),
};

export const vtcPracticeArtwork: ManualIllustrationMap = {
  compliance: vtcArtwork.reglementation,
  finance: vtcArtwork.gestion,
  'secure-vehicle': vtcArtwork.conduite,
  'profile-review': vtcArtwork.communication,
  commercial: vtcArtwork.commercial,
  approval: vtcArtwork.profession,
  'emergency-call': vtcArtwork.pratique,
  'mission-map': vtcArtwork.accueil,
};

export const sstArtwork = {
  formation: artwork('sst', 'formation', 'Illustration du manuel SST : présentation du défibrillateur et du mannequin de formation.'),
  prevention: artwork('sst', 'prevention', 'Illustration du manuel SST : repérage des équipements de secours dans l’entreprise.'),
  examen: artwork('sst', 'examen', 'Illustration du manuel SST : une secouriste prend en charge un salarié assis au sol.'),
  alerte: artwork('sst', 'alerte', 'Illustration du manuel SST : un salarié donne l’alerte pendant la prise en charge d’une brûlure.'),
  secours: artwork('sst', 'secours', 'Illustration du manuel SST : préparation de la trousse et du matériel de premiers secours.'),
  reanimation: artwork('sst', 'reanimation', 'Illustration du manuel SST : entraînement aux compressions thoraciques sur un mannequin.'),
  defibrillateur: artwork('sst', 'defibrillateur', 'Illustration du manuel SST : exercice de réanimation et de défibrillation encadré par le formateur.'),
  evaluation: artwork('sst', 'evaluation', 'Illustration du manuel SST : travail sur un support pédagogique avec le formateur.'),
};

export const sstPracticeArtwork: ManualIllustrationMap = {
  hazard: sstArtwork.prevention,
  examine: sstArtwork.examen,
  'emergency-call': sstArtwork.alerte,
  'first-aid': sstArtwork.secours,
  cpr: sstArtwork.reanimation,
  dae: sstArtwork.defibrillateur,
};
