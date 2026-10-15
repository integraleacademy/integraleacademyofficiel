import { despArtwork, type ManualIllustration, type ManualIllustrationMap } from './manualIllustrations';
import { originalArtwork } from './originalArtwork';

export type BtsArtworkCode = 'mos' | 'mco' | 'ndrc' | 'ci' | 'pi' | 'cg';

export const btsArtwork: Record<BtsArtworkCode, ManualIllustration> = {
  mos: { src: '/images/bts/tenues-2026/mos-carte.webp', alt: 'Illustration du BTS MOS : une étudiante prépare un briefing avec une équipe au poste de sécurité.' },
  mco: { src: '/images/bts/tenues-2026/mco-carte.webp', alt: 'Illustration du BTS MCO : une alternante participe à la vie du magasin et au conseil client.' },
  ndrc: { src: '/images/bts/tenues-2026/ndrc-carte.webp', alt: 'Illustration du BTS NDRC : une alternante échange avec un client en visioconférence.' },
  ci: { src: '/images/bts/tenues-2026/ci-carte.webp', alt: 'Illustration du BTS Commerce International : deux étudiants préparent des opérations commerciales et logistiques.' },
  pi: { src: '/images/bts/tenues-2026/pi-carte.webp', alt: 'Illustration du BTS Professions Immobilières : une alternante accompagne un couple pendant la visite d’un appartement.' },
  cg: { src: '/images/bts/tenues-2026/cg-carte.webp', alt: 'Illustration du BTS Comptabilité et Gestion : un étudiant analyse des factures avec sa tutrice.' },
};

export const btsHeroArtwork: Record<BtsArtworkCode, ManualIllustration> = {
  mos: originalArtwork['bts-mos-accueil'],
  mco: originalArtwork['bts-mco-accueil'],
  ndrc: originalArtwork['bts-ndrc-accueil'],
  ci: originalArtwork['bts-ci-accueil'],
  pi: originalArtwork['bts-pi-accueil'],
  cg: originalArtwork['bts-cg-accueil'],
};

// BTS-specific variants keep the original DESP illustrations unchanged.
export const btsLearningArtwork = {
  client: { src: '/images/bts/tenues-2026/atelier-client.webp', alt: 'Un apprenti en BTS analyse un plan avec sa tutrice.' },
  conformite: { src: '/images/bts/tenues-2026/atelier-conformite.webp', alt: 'Une apprentie en BTS vérifie un dossier avec sa tutrice.' },
  direction: { src: '/images/bts/tenues-2026/atelier-equipe.webp', alt: 'Un étudiant en BTS prépare un dossier avec les professionnels qui l’accompagnent.' },
  finances: { src: '/images/bts/tenues-2026/atelier-finances.webp', alt: 'Une étudiante en BTS analyse des données financières avec son formateur.' },
  pilotage: { src: '/images/bts/tenues-2026/atelier-pilotage.webp', alt: 'Un étudiant en BTS prépare les prochaines échéances avec sa tutrice.' },
  projet: { src: '/images/bts/tenues-2026/atelier-projet.webp', alt: 'Un apprenti en BTS étudie un projet avec son équipe.' },
  supervision: { src: '/images/bts/tenues-2026/atelier-supervision.webp', alt: 'Une apprentie en BTS MOS repère les risques d’un site avec un professionnel de sécurité.' },
  management: { src: '/images/bts/tenues-2026/atelier-management.webp', alt: 'Un apprenti en BTS MOS participe à un briefing avec son équipe.' },
} satisfies Record<string, ManualIllustration>;

export const btsPracticeArtwork: Record<BtsArtworkCode, ManualIllustrationMap> = {
  mos: { 'mission-map': despArtwork.organisation, compliance: btsLearningArtwork.conformite, 'site-check': btsLearningArtwork.supervision, 'fire-panel': btsArtwork.mos, team: btsLearningArtwork.management, briefing: btsLearningArtwork.direction },
  mco: { 'profile-review': btsLearningArtwork.client, commercial: originalArtwork['bts-mco-ventes'], business: btsArtwork.mco, evidence: btsLearningArtwork.finances, finance: btsLearningArtwork.finances, team: btsLearningArtwork.direction },
  ndrc: { 'risk-radar': btsLearningArtwork.projet, 'emergency-call': btsArtwork.ndrc, commercial: originalArtwork['bts-ndrc-negociation'], briefing: btsLearningArtwork.direction, 'profile-review': btsLearningArtwork.client, competencies: btsLearningArtwork.pilotage },
  ci: { 'mission-map': originalArtwork['bts-ci-prospection'], 'secure-vehicle': originalArtwork['bts-ci-logistique'], compliance: btsLearningArtwork.conformite, 'risk-radar': btsLearningArtwork.projet, finance: btsLearningArtwork.finances, briefing: btsLearningArtwork.direction },
  pi: { 'profile-review': originalArtwork['bts-pi-client'], commercial: btsArtwork.pi, evidence: btsLearningArtwork.conformite, 'mission-map': btsLearningArtwork.projet, team: btsLearningArtwork.direction, 'site-check': btsLearningArtwork.projet },
  cg: { evidence: btsLearningArtwork.projet, feasibility: btsLearningArtwork.projet, compliance: btsLearningArtwork.conformite, finance: originalArtwork['bts-cg-budget'], 'risk-radar': btsLearningArtwork.finances, approval: btsLearningArtwork.pilotage },
};

export const btsMissionArtwork: Record<BtsArtworkCode, ManualIllustration> = {
  mos: originalArtwork['bts-mos-mission'],
  mco: btsLearningArtwork.pilotage,
  ndrc: originalArtwork['bts-ndrc-mission'],
  ci: originalArtwork['bts-ci-mission'],
  pi: btsArtwork.pi,
  cg: btsArtwork.cg,
};

export function btsArtworkForPath(path: string): ManualIllustration | undefined {
  const code = path.split('/').pop();
  const aliases: Record<string, BtsArtworkCode> = { 'commerce-international': 'ci', 'professions-immobilieres': 'pi', 'comptabilite-gestion': 'cg' };
  return code ? btsArtwork[(aliases[code] ?? code) as BtsArtworkCode] : undefined;
}
