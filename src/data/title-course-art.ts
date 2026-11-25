import { additionalMissionIllustrations } from './programme-illustrations';
import type { AnnouncedCourseArt } from './announced-course-art';

type SceneDescriptions = readonly [string, string, string, string, string, string];

function titleIllustrations(slug: string, extra: AnnouncedCourseArt['practice'], [hero, firstMission, secondMission, firstWorkshop, secondWorkshop, exam]: SceneDescriptions): AnnouncedCourseArt {
  const scene = (file: string, alt: string) => ({ src: `/images/fiches-tp/${slug}/${file}.webp`, alt });
  return {
    hero: scene('hero', hero),
    missions: [scene('mission-1', firstMission), scene('mission-2', secondMission), ...extra],
    practice: [scene('pratique-1', firstWorkshop), scene('pratique-2', secondWorkshop)],
    exam: scene('examen', exam),
  };
}

export const titleCourseArt = {
  'tp-gestionnaire-de-paie': titleIllustrations('gestionnaire-de-paie', additionalMissionIllustrations['tp-gestionnaire-de-paie'], [
    'Une gestionnaire de paie compare deux bulletins affichés sur ses écrans.',
    'Un responsable de chantier transmet un relevé d’heures au gestionnaire de paie.',
    'Une gestionnaire rapproche les pièces de paie et contrôle les montants à la calculatrice.',
    'Un stagiaire reporte une absence sur un relevé de présence à l’aide du calendrier du mois.',
    'Une gestionnaire explique à un salarié un écart entre deux bulletins.',
    'Un candidat présente son dossier de paie et ses calculs à deux membres du jury.',
  ]),
  'tp-assistant-ressources-humaines': titleIllustrations('assistant-ressources-humaines', additionalMissionIllustrations['tp-assistant-ressources-humaines'], [
    'Une assistante RH accueille un nouveau salarié dans les bureaux de l’entreprise.',
    'Un assistant RH vérifie les pièces du dossier individuel d’un salarié à son poste de travail.',
    'Une assistante RH et un manager discutent du plan de formation de leur équipe.',
    'Un assistant RH présente les locaux et l’équipe à de nouveaux collaborateurs.',
    'Deux collègues planifient les dates d’une action de formation sur un tableau mural.',
    'Un candidat explique son dossier de gestion du personnel devant deux évaluateurs.',
  ]),
  'tp-secretaire-assistant-medico-administratif': titleIllustrations('secretaire-assistant-medico-administratif', additionalMissionIllustrations['tp-secretaire-assistant-medico-administratif'], [
    'À l’accueil d’un centre médical, une secrétaire oriente une famille vers les consultations.',
    'Un secrétaire médical utilise des pictogrammes pour renseigner une patiente.',
    'Une secrétaire médicale prend un appel et consulte le planning des rendez-vous.',
    'La secrétaire montre à un patient le déplacement de son rendez-vous dans le calendrier.',
    'Au poste administratif, une secrétaire vérifie les pièces du dossier avant de le transmettre à une soignante.',
    'Un candidat traite un dossier médical fictif sur ordinateur devant deux membres du jury.',
  ]),
  'tp-charge-accueil-gestion-administrative': titleIllustrations('charge-accueil-gestion-administrative', additionalMissionIllustrations['tp-charge-accueil-gestion-administrative'], [
    'Une chargée d’accueil reçoit deux visiteurs au comptoir d’un établissement.',
    'Un chargé d’accueil au casque vérifie une information dans son annuaire pendant un appel.',
    'Une agente administrative enregistre un courrier près du scanner et des bacs de classement.',
    'Au comptoir, un réceptionniste en ligne salue une visiteuse qui vient d’arriver.',
    'Un agent consigne un courrier dans un registre et classe l’enveloppe dans un bac.',
    'Un candidat renseigne une visiteuse au comptoir sous le regard de deux évaluateurs.',
  ]),
  'tp-operateur-videoprotection-telesurveillance': titleIllustrations('operateur-videoprotection-telesurveillance', additionalMissionIllustrations['tp-operateur-videoprotection-telesurveillance'], [
    'Une opératrice au casque surveille plusieurs vues depuis un poste de vidéoprotection.',
    'Un opérateur observe le hall d’un bâtiment sur son écran de contrôle.',
    'Une opératrice consulte sa fiche de suivi pendant une transmission téléphonique.',
    'Un stagiaire consigne dans la main courante une observation faite sur les images d’une place.',
    'Deux opérateurs examinent le dossier de consignes lors de la relève.',
    'Une candidate présente son compte rendu à un membre du jury.',
  ]),
} satisfies Record<string, AnnouncedCourseArt>;
