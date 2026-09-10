export type BtsCode = 'MOS' | 'MCO' | 'NDRC' | 'CI' | 'PI' | 'CG';

type BtsRhythm = {
  schoolDays: number;
  companyDays: number;
  description: string;
  shortLabel: string;
  note: string;
};

const weeklyRhythm: BtsRhythm = {
  schoolDays: 2,
  companyDays: 3,
  description: '2 jours à l’école et 3 jours en entreprise chaque semaine.',
  shortLabel: '2 jours école · 3 jours entreprise',
  note: 'Un rythme hebdomadaire qui relie les cours à votre expérience.',
};

// MOS follows a separate schedule: do not apply the other BTS weekly rhythm.
export const btsRhythms: Record<BtsCode, BtsRhythm> = {
  MOS: {
    schoolDays: 15,
    companyDays: 15,
    description: '15 jours à l’école, puis 15 jours en entreprise.',
    shortLabel: '15 jours école · 15 jours entreprise',
    note: '15 jours pour apprendre à l’école, puis 15 jours pour pratiquer en entreprise.',
  },
  MCO: weeklyRhythm,
  NDRC: weeklyRhythm,
  CI: weeklyRhythm,
  PI: weeklyRhythm,
  CG: weeklyRhythm,
};
