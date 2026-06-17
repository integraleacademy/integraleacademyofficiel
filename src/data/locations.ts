export type Location = { id: string; name: string; address: string; detail: string; tags: string[] };

export const locations: Location[] = [
  { id: 'puget', name: 'Puget-sur-Argens / Côte d’Azur', address: '54 chemin du Carreou - ZI du Carreou, 83480 Puget-sur-Argens', detail: 'Campus principal, 400 m² dédiés aux enseignements pratiques et théoriques. À 500 m de l’A8, stationnement gratuit, bus ligne 4 arrêt Général de Gaulle.', tags: ['Sécurité', 'BTS', 'VTC pratique'] },
  { id: 'paris', name: 'Paris', address: '142 rue de Rivoli, 75001 Paris', detail: 'Centre mobilisé notamment pour les sessions dirigeant DESP selon le planning.', tags: ['DESP', 'Présentiel'] },
  { id: 'aurillac', name: 'Aurillac / Centre France', address: 'Village d’entreprises - 14 avenue du Garric, 15000 Aurillac', detail: 'Centre France / Terres d’Auvergne, mobilisé selon les sessions DESP.', tags: ['DESP', 'Centre France'] },
];

export const contactInfo = {
  phone: '04 22 47 07 68',
  email: 'Contact par formulaire',
  whatsapp: 'Demande de rappel via le formulaire',
  hours: 'Lundi-vendredi 08h00-19h00 ; samedi 08h00-12h00',
};
