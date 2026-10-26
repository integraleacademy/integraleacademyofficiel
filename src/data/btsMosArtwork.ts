import type { ManualIllustration } from './manualIllustrations';

// Dedicated scenes, each used once on the MOS page. All eight were generated
// from the same supplied access-control illustration as the style reference.
export const btsMosArtwork = {
  reperer: { src: '/images/bts/mos-unifie-2026/reperer.webp', alt: 'Une responsable et un agent de sécurité repèrent un accès encombré sur un site.' },
  organiser: { src: '/images/bts/mos-unifie-2026/organiser.webp', alt: 'Une responsable et deux apprentis préparent les missions et le planning autour d’un plan du site.' },
  manager: { src: '/images/bts/mos-unifie-2026/manager.webp', alt: 'Une responsable transmet les consignes à trois agents lors d’un briefing sur site.' },
  bilan: { src: '/images/bts/mos-unifie-2026/bilan-client.webp', alt: 'Une responsable présente au client le bilan de sa prestation de sécurité sur une tablette.' },
  remote: { src: '/images/bts/mos-unifie-2026/cours-distance.webp', alt: 'Un étudiant participe de chez lui à un cours en direct avec sa formatrice et sa promotion.' },
  equipment: { src: '/images/bts/mos-unifie-2026/atelier-pedagogique.webp', alt: 'Une formatrice accompagne deux étudiants dans un exercice avec une centrale pédagogique et des radios.' },
  ipad: { src: '/images/bts/mos-unifie-2026/ipad.webp', alt: 'Une étudiante travaille ses cours sur une tablette avec un stylet.' },
  london: { src: '/images/bts/mos-unifie-2026/londres.webp', alt: 'Quatre étudiants découvrent Londres ensemble au bord de la Tamise, face à Big Ben.' },
} satisfies Record<string, ManualIllustration>;
