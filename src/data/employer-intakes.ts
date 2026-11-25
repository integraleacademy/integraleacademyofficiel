import { calendar } from './parcours-alternance';

export const alternanceSessions = [
  {
    id: 'parcours-securite-janvier-2027', name: 'Session 1', period: '8 janvier 2027 au 8 janvier 2028', immersion: null, worked: 1106,
    steps: calendar.map(({ period, title, description }) => ({ date: period, title, detail: description })),
  },
  {
    id: 'parcours-securite-juin-2027',
    name: 'Session 2', period: 'Juin 2027 → juin 2028', immersion: 1239, worked: 1099,
    steps: [
      { date: 'Juin à juillet 2027', title: 'Formation APS', detail: '175 h · préparation à la carte professionnelle CNAPS' },
      { date: 'Juillet à octobre 2027', title: 'Immersion en entreprise', detail: '413 h de terrain' },
      { date: 'Octobre à novembre 2027', title: 'Formation A3P', detail: '328 h · protection rapprochée' },
      { date: 'Novembre 2027 à mai 2028', title: 'Immersion en entreprise', detail: '826 h de terrain' },
      { date: 'Mai à juin 2028', title: 'SSIAP 1', detail: 'Formation et examens finaux' },
    ],
  },
];


export const poeiSessions = [
  { id: 'poei-janvier-2027', startDate: '2027-01-11', endDate: '2027-04-12', label: '11 janvier au 12 avril 2027' },
  { id: 'poei-septembre-2027', startDate: '2027-09-21', endDate: '2027-12-22', label: '21 septembre au 22 décembre 2027' },
];
