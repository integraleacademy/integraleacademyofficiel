import { originalArtwork } from '@/data/originalArtwork';
import { ssiapLeadershipArtwork, type ManualIllustration } from '@/data/manualIllustrations';

export type SsiapLeadershipLevel = 'ssiap-2' | 'ssiap-3';

type Scene = {
  id: string;
  title: string;
  text: string;
  illustration: ManualIllustration;
  actions: readonly string[];
};

function sceneArtwork(level: SsiapLeadershipLevel, name: string, alt: string): ManualIllustration {
  return { src: `/images/${level}/${name}.webp`, alt };
}

const teamArtwork = {
  briefing: ssiapLeadershipArtwork['ssiap-2'],
  pc: sceneArtwork('ssiap-2', 'coordination-pc', 'Un chef d’équipe SSIAP 2 coordonne les agents SSIAP 1 par radio au poste central de sécurité.'),
  formation: sceneArtwork('ssiap-2', 'formation-equipe', 'Un chef d’équipe SSIAP 2 anime une séquence de formation pour trois agents SSIAP 1.'),
  reporting: sceneArtwork('ssiap-2', 'compte-rendu', 'Un chef d’équipe SSIAP 2 présente un compte rendu au chef de service SSIAP 3, accompagné d’une agente.'),
};

const serviceArtwork = {
  management: ssiapLeadershipArtwork['ssiap-3'],
  conseil: sceneArtwork('ssiap-3', 'conseil-etablissement', 'Un chef de service SSIAP 3 conseille le directeur d’un établissement lors d’une visite avec une cheffe d’équipe SSIAP 2.'),
  budget: sceneArtwork('ssiap-3', 'budget-maintenance', 'Un chef de service SSIAP 3 examine le budget et le calendrier de maintenance avec la direction et une technicienne.'),
  plans: sceneArtwork('ssiap-3', 'etude-plans', 'Un formateur accompagne deux stagiaires SSIAP 3 dans l’étude des plans et des documents de sécurité d’un bâtiment.'),
};

type CourseVisuals = {
  missions: readonly ManualIllustration[];
  galleryTitle: string;
  galleryIntro: string;
  scenes: readonly Scene[];
  pedagogy: {
    title: string;
    text: string;
    illustration: ManualIllustration;
    activities: readonly string[];
  };
  assessment: { title: string; text: string; illustration: ManualIllustration };
};

export const ssiapCourseVisuals: Record<SsiapLeadershipLevel, CourseVisuals> = {
  'ssiap-2': {
    missions: [originalArtwork['ssiap-2-mission-planning'], originalArtwork['ssiap-2-mission-ssi'], originalArtwork['ssiap-2-mission-transmission']],
    galleryTitle: 'Le chef d’équipe, en situation.',
    galleryIntro: 'Du briefing au compte rendu, découvrez comment le SSIAP 2 organise et accompagne le travail des agents SSIAP 1.',
    scenes: [
      { id: 'briefing', title: 'Organiser l’équipe', text: 'Le chef d’équipe répartit les missions et transmet les consignes avant la prise de poste.', illustration: originalArtwork['ssiap-2-galerie-briefing'], actions: ['Répartir les missions', 'Transmettre les consignes', 'Vérifier la compréhension'] },
      { id: 'coordination', title: 'Coordonner au PC', text: 'Au poste central de sécurité, il rassemble les informations et coordonne les actions des agents pendant un incident.', illustration: teamArtwork.pc, actions: ['Analyser les informations', 'Orienter les agents', 'Suivre les actions'] },
      { id: 'formation', title: 'Former les agents', text: 'Il explique les procédures, anime des séquences pédagogiques et accompagne les agents dans leur pratique.', illustration: teamArtwork.formation, actions: ['Expliquer la procédure', 'Faire participer', 'Vérifier les acquis'] },
      { id: 'compte-rendu', title: 'Rendre compte', text: 'Il transmet au chef de service les faits, les mesures prises et les points qui nécessitent un suivi.', illustration: teamArtwork.reporting, actions: ['Présenter les faits', 'Tracer les actions', 'Informer la hiérarchie'] },
    ],
    pedagogy: {
      title: 'S’entraîner à décider et à faire agir ensemble.',
      text: 'Les cours sont complétés par des exercices de coordination, des séquences pédagogiques et des mises en situation au poste central de sécurité.',
      illustration: originalArtwork['ssiap-2-pedagogie'],
      activities: ['Briefings d’équipe', 'Transmission des consignes', 'Exploitation du SSI', 'Gestion du PC en situation de crise', 'Animation d’une séquence pédagogique', 'Préparation au QCM et aux épreuves'],
    },
    assessment: {
      title: 'Préparer la posture de chef d’équipe.',
      text: 'Organiser ses idées, expliquer une procédure et coordonner les agents : les entraînements relient les connaissances aux situations professionnelles évaluées.',
      illustration: originalArtwork['ssiap-2-evaluation'],
    },
  },
  'ssiap-3': {
    missions: [originalArtwork['ssiap-3-mission-conseil'], serviceArtwork.conseil, originalArtwork['ssiap-3-mission-risques']],
    galleryTitle: 'Le chef de service, en situation.',
    galleryIntro: 'Bâtiment, équipes, réglementation et moyens : découvrez la vision d’ensemble portée par le chef de service SSIAP 3.',
    scenes: [
      { id: 'conseil', title: 'Conseiller la direction', text: 'Le chef de service apporte son expertise au chef d’établissement et prépare les décisions relatives à la sécurité incendie.', illustration: originalArtwork['ssiap-3-galerie-conseil'], actions: ['Examiner la situation', 'Expliquer les enjeux', 'Proposer des mesures'] },
      { id: 'management', title: 'Piloter le service', text: 'Il organise les moyens du service et supervise les chefs d’équipe SSIAP 2 à l’échelle de l’établissement.', illustration: originalArtwork['ssiap-3-mission-service'], actions: ['Organiser les moyens', 'Encadrer les équipes', 'Suivre le niveau de sécurité'] },
      { id: 'budget', title: 'Suivre les moyens', text: 'Il suit les dépenses, les contrats et la maintenance des installations pour préparer et prioriser les besoins du service.', illustration: serviceArtwork.budget, actions: ['Planifier la maintenance', 'Suivre le budget', 'Prioriser les besoins'] },
      { id: 'plans', title: 'Analyser le bâtiment', text: 'L’étude des plans et des documents permet de relier les caractéristiques du bâtiment aux risques et aux mesures de sécurité.', illustration: serviceArtwork.plans, actions: ['Lire les plans', 'Analyser les risques', 'Argumenter les choix'] },
    ],
    pedagogy: {
      title: 'Relier les plans, les risques et les décisions.',
      text: 'Les études de cas permettent de travailler la lecture de plans, l’analyse des risques et l’argumentation des choix techniques, réglementaires et organisationnels.',
      illustration: originalArtwork['ssiap-3-pedagogie'],
      activities: ['Lecture et étude de plans', 'Analyse des risques', 'Préparation d’une notice technique', 'Préparation des commissions', 'Études de budget et de maintenance', 'Entraînement au QCM et à l’entretien'],
    },
    assessment: {
      title: 'Construire et défendre une analyse de sécurité.',
      text: 'Les entraînements vous aident à structurer une notice technique à partir de plans et à présenter votre raisonnement lors de l’entretien.',
      illustration: originalArtwork['ssiap-3-evaluation'],
    },
  },
};
