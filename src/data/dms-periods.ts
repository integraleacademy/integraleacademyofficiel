export type DmsPeriod = { start: string; end: string; course?: 'DESP' | 'SSIAP 3'; hours?: number; topic?: string };

export const dmsPeriods: readonly DmsPeriod[] = [
  { start: '2027-09-01', end: '2027-09-03' },
  { start: '2027-09-06', end: '2027-09-17', course: 'DESP', hours: 70, topic: 'Cadre juridique de la sécurité privée.' },
  { start: '2027-09-20', end: '2027-10-01' },
  { start: '2027-10-04', end: '2027-10-15', course: 'SSIAP 3', hours: 56, topic: 'Comportement du feu, construction et lecture de plans.' },
  { start: '2027-10-18', end: '2027-11-12' },
  { start: '2027-11-15', end: '2027-11-26', course: 'DESP', hours: 63, topic: 'Réglementation, création d’agence et budget.' },
  { start: '2027-11-29', end: '2027-12-03' },
  { start: '2027-12-06', end: '2027-12-17', course: 'SSIAP 3', hours: 56, topic: 'Étude des bâtiments et réglementation incendie.' },
  { start: '2027-12-20', end: '2028-01-14' },
  { start: '2028-01-17', end: '2028-01-28', course: 'DESP', hours: 56, topic: 'Prix de vente, marge et appels d’offres.' },
  { start: '2028-01-31', end: '2028-02-25' },
  { start: '2028-02-28', end: '2028-03-10', course: 'SSIAP 3', hours: 56, topic: 'Réglementation incendie et analyse des risques.' },
  { start: '2028-03-13', end: '2028-03-31' },
  { start: '2028-04-03', end: '2028-04-14', course: 'DESP', hours: 56, topic: 'Suivi des contrats et management des équipes.' },
  { start: '2028-04-17', end: '2028-06-09' },
  { start: '2028-06-12', end: '2028-06-23', course: 'SSIAP 3', hours: 48, topic: 'Conseil à l’exploitant, management et budget.' },
  { start: '2028-06-26', end: '2028-08-31' },
];
export const dmsExams = [
  { start: '2028-04-13', end: '2028-04-14', label: 'Examen DESP' },
  { start: '2028-06-22', end: '2028-06-23', label: 'Examen SSIAP 3' },
];
