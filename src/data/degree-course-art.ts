import type { AnnouncedCourseArt } from './announced-course-art';

function scene(slug: string, role: string, alt: string) {
  return { src: `/images/fiches-diplomes/${slug}/${role}.webp`, alt };
}

export const degreeCourseArt = {
  'bachelor-eirc': {
    hero: scene('eirc', 'hero', 'Une analyste en renseignement examine les informations réunies dans une salle de veille cyber.'),
    missions: [
      scene('eirc', 'mission-1', 'Un analyste compare un signalement à un relevé pour en vérifier la source.'),
      scene('eirc', 'mission-2', 'Une analyste présente la chronologie d’un incident à l’équipe de défense.'),
    ],
    practice: [
      scene('eirc', 'pratique-1', 'Des documents et une tablette sont rapprochés pour recouper deux observations.'),
      scene('eirc', 'pratique-2', 'Deux collègues se transmettent une synthèse au moment de la relève.'),
    ],
    exam: scene('eirc', 'examen', 'Un candidat présente son dossier d’analyse et sa chronologie à deux interlocuteurs.'),
  },
  'bachelor-dms': {
    hero: scene('dms', 'hero', 'Une responsable de sécurité et un gestionnaire examinent l’organisation d’un hall d’exposition.'),
    missions: [
      { src: '/images/formations-annoncees/dms-prestation.webp', alt: 'Le responsable d’une agence examine le planning d’une prestation avec une agente et un client.' },
      { src: '/images/formations-annoncees/dms-prevention.webp', alt: 'Un responsable présente le système de sécurité incendie à son équipe, plan du site en main.' },
    ],
    practice: [
      scene('dms', 'pratique-1', 'Un apprenti vérifie le coût d’une ronde supplémentaire avec son responsable.'),
      scene('dms', 'pratique-2', 'Une professionnelle étudie un projet de cloisonnement et les dégagements du bâtiment.'),
    ],
    exam: scene('dms', 'examen', 'Présentation d’une notice et d’un plan de sécurité incendie devant le jury.'),
  },
  'mastere-chef-de-produit-ia': {
    hero: scene('cpiaa', 'hero', 'Une cheffe de produit présente des maquettes d’interface à son équipe.'),
    missions: [
      scene('cpiaa', 'mission-1', 'Une professionnelle écoute les besoins d’un utilisateur à son poste de travail.'),
      scene('cpiaa', 'mission-2', 'L’équipe produit organise les priorités de développement autour d’une table de travail.'),
    ],
    practice: [
      scene('cpiaa', 'pratique-1', 'Un utilisateur teste un prototype sur tablette pendant que la professionnelle observe ses gestes.'),
      scene('cpiaa', 'pratique-2', 'Des cartes sont disposées sur une grille pour comparer les priorités du produit.'),
    ],
    exam: scene('cpiaa', 'examen', 'Une candidate présente les résultats de son projet produit à deux évaluateurs.'),
  },
  'mastere-ingenierie-ia-generative': {
    hero: scene('eiag', 'hero', 'Deux spécialistes étudient le fonctionnement d’un assistant documentaire dans un laboratoire d’IA.'),
    missions: [
      scene('eiag', 'mission-1', 'Un ingénieur représente les composants d’une application sur un tableau transparent.'),
      scene('eiag', 'mission-2', 'Une professionnelle vérifie la réponse d’un modèle en la rapprochant d’un document de référence.'),
    ],
    practice: [
      scene('eiag', 'pratique-1', 'Deux apprenants vérifient une réponse de l’assistant à partir d’un document annoté.'),
      scene('eiag', 'pratique-2', 'Un ingénieur compare les indicateurs de deux versions d’un modèle.'),
    ],
    exam: scene('eiag', 'examen', 'Une candidate montre le fonctionnement de son application aux évaluateurs.'),
  },
} satisfies Readonly<Record<string, AnnouncedCourseArt>>;
