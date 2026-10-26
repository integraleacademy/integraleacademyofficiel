import type { ManualIllustration } from './manualIllustrations';

// One scene per editorial placement, in the supplied SSIAP illustration style.
function scene(name: string, alt: string): ManualIllustration {
  return { src: `/images/illustrations-2026/${name}.webp`, alt };
}

export const homeEditorialArtwork = {
  security: scene('accueil-securite', 'Une agente de sécurité privée, un agent de sécurité incendie et une responsable coordonnent leurs missions dans un établissement.'),
  practice: scene('parcours-pratique', 'Un formateur accompagne deux apprenants dans l’analyse d’un site à l’aide d’une maquette.'),
  campus: scene('campus-accompagnement', 'Une conseillère accompagne deux apprenants dans la préparation de leur projet de formation.'),
};

export const ssiapEditorialArtwork = {
  fire: scene('ssiap-feu', 'Une formatrice explique le comportement du feu et des fumées à des stagiaires SSIAP.'),
  building: scene('ssiap-batiment', 'Deux professionnels examinent les dispositifs de sécurité incendie d’un bâtiment.'),
  systems: scene('ssiap-installations', 'Une agente de sécurité incendie observe une installation technique avec un technicien de maintenance.'),
  reporting: scene('ssiap-main-courante', 'Deux agents de sécurité incendie transmettent leurs observations et renseignent la main courante.'),
  exercise: scene('ssiap-exercice', 'Une stagiaire utilise un extincteur sur un bac pédagogique sous la supervision de son formateur.'),
  assistance: scene('ssiap-assistance', 'Une agente de sécurité incendie explique le chemin d’évacuation à deux visiteurs.'),
  exam: scene('ssiap-examen', 'Un candidat vérifie une issue de secours sous le regard de l’évaluatrice lors d’une épreuve pratique.'),
};

export const sstEditorialArtwork = {
  situation: scene('sst-situation', 'Des stagiaires SST s’entraînent à observer une situation d’accident et à donner l’alerte.'),
  prevention: scene('sst-prevention', 'Des stagiaires repèrent un câble dans une circulation et sécurisent la zone avec leur encadrant.'),
};

export const destinationArtwork = {
  paris: scene('destination-paris', 'Illustration de Paris, des quais de Seine et de la tour Eiffel.'),
  'cote-azur': scene('destination-cote-azur', 'Illustration du littoral de la Côte d’Azur et des reliefs de l’Estérel.'),
};
