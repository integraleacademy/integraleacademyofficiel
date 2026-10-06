import type { SceneKind } from '@/components/TrainingMotionGallery';

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
  'risk-radar': a3pArtwork.briefing,
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
  'fire-round': ssiapArtwork.ronde,
  extinguisher: ssiapArtwork.verification,
  'fire-panel': ssiapArtwork.pc,
  'fire-alert': ssiapArtwork.alerte,
  evacuation: ssiapArtwork.evacuation,
  'rescue-arrival': ssiapArtwork.secours,
};

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
  approval: despArtwork.conformite,
  team: despArtwork.management,
  commercial: despArtwork.client,
  evidence: despArtwork.projet,
  'site-check': despArtwork.supervision,
  briefing: despArtwork.organisation,
  'profile-review': despArtwork.direction,
  feasibility: despArtwork.projet,
  competencies: despArtwork.pilotage,
  jury: despArtwork.direction,
  certificate: despArtwork.client,
};
