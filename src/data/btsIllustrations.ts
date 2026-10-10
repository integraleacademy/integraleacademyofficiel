import { despArtwork, type ManualIllustration, type ManualIllustrationMap } from './manualIllustrations';
import { originalArtwork } from './originalArtwork';

export type BtsArtworkCode = 'mos' | 'mco' | 'ndrc' | 'ci' | 'pi' | 'cg';

export const btsArtwork: Record<BtsArtworkCode, ManualIllustration> = {
  mos: { src: '/images/bts/manuel/mos.webp', alt: 'Illustration du BTS MOS : une responsable organise la mission de son équipe au poste de sécurité.' },
  mco: { src: '/images/bts/manuel/mco.webp', alt: 'Illustration du BTS MCO : une responsable de magasin accompagne son équipe dans la vente et le conseil client.' },
  ndrc: { src: '/images/bts/manuel/ndrc.webp', alt: 'Illustration du BTS NDRC : une conseillère échange avec un client en visioconférence.' },
  ci: { src: '/images/bts/manuel/ci.webp', alt: 'Illustration du BTS Commerce International : préparation des opérations commerciales et logistiques dans un bureau ouvert sur le port.' },
  pi: { src: '/images/bts/manuel/pi.webp', alt: 'Illustration du BTS Professions Immobilières : une agente immobilière accompagne un couple pendant la visite d’un appartement.' },
  cg: { src: '/images/bts/manuel/cg.webp', alt: 'Illustration du BTS Comptabilité et Gestion : deux professionnels analysent des factures et des données comptables.' },
};

export const btsHeroArtwork: Record<BtsArtworkCode, ManualIllustration> = {
  mos: originalArtwork['bts-mos-accueil'],
  mco: originalArtwork['bts-mco-accueil'],
  ndrc: originalArtwork['bts-ndrc-accueil'],
  ci: originalArtwork['bts-ci-accueil'],
  pi: originalArtwork['bts-pi-accueil'],
  cg: originalArtwork['bts-cg-accueil'],
};

export const btsPracticeArtwork: Record<BtsArtworkCode, ManualIllustrationMap> = {
  mos: { 'mission-map': despArtwork.organisation, compliance: despArtwork.conformite, 'site-check': despArtwork.supervision, 'fire-panel': btsArtwork.mos, team: despArtwork.management, briefing: despArtwork.direction },
  mco: { 'profile-review': despArtwork.client, commercial: originalArtwork['bts-mco-ventes'], business: btsArtwork.mco, evidence: despArtwork.finances, finance: despArtwork.finances, team: despArtwork.direction },
  ndrc: { 'risk-radar': despArtwork.projet, 'emergency-call': btsArtwork.ndrc, commercial: originalArtwork['bts-ndrc-negociation'], briefing: despArtwork.direction, 'profile-review': despArtwork.client, competencies: despArtwork.pilotage },
  ci: { 'mission-map': originalArtwork['bts-ci-prospection'], 'secure-vehicle': originalArtwork['bts-ci-logistique'], compliance: despArtwork.conformite, 'risk-radar': despArtwork.projet, finance: despArtwork.finances, briefing: despArtwork.direction },
  pi: { 'profile-review': originalArtwork['bts-pi-client'], commercial: btsArtwork.pi, evidence: despArtwork.conformite, 'mission-map': despArtwork.projet, team: despArtwork.direction, 'site-check': despArtwork.projet },
  cg: { evidence: despArtwork.projet, feasibility: despArtwork.projet, compliance: despArtwork.conformite, finance: originalArtwork['bts-cg-budget'], 'risk-radar': despArtwork.finances, approval: despArtwork.pilotage },
};

export const btsMissionArtwork: Record<BtsArtworkCode, ManualIllustration> = {
  mos: originalArtwork['bts-mos-mission'],
  mco: despArtwork.pilotage,
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
