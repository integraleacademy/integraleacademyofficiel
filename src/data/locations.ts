export const PUGET_ADDRESS = '54 chemin du Carreou, 83480 Puget-sur-Argens';
export const PARIS_LANDMARK = 'À 50 mètres du Grand Rex';
export const PARIS_ADDRESS = '34 rue Poissonnière, 75002 Paris';
export const PARIS_TRAINING_SUMMARY = `${PARIS_LANDMARK}, notre centre du 2e arrondissement accueille le DESP et proposera deux mastères en intelligence artificielle dès septembre 2027.`;
export const PARIS_SESSION_LOCATION = `Paris · ${PARIS_ADDRESS}`;

export type Location = { id: 'puget' | 'paris'; shortName: string; planningKey: 'cote-azur' | 'paris'; name: string; address: string; detail: string; tags: string[] };

export const locations: Location[] = [
  { id: 'puget', shortName: 'Côte d’Azur', planningKey: 'cote-azur', name: 'Puget-sur-Argens / Côte d’Azur', address: '54 chemin du Carreou - ZI du Carreou, 83480 Puget-sur-Argens', detail: 'École principale, 400 m² dédiés aux enseignements pratiques et théoriques. À 500 m de l’A8, stationnement gratuit, bus ligne 4 arrêt Général de Gaulle.', tags: ['APS', 'A3P', 'DESP', 'CPSP', 'SSIAP 1 à 3', 'SST', 'VTC pratique', 'BTS en alternance', 'Bachelor DMS', 'Titres professionnels', 'Parcours sécurité en alternance'] },
  {
    id: 'paris', shortName: 'Paris', planningKey: 'paris', name: 'Paris', address: PARIS_ADDRESS,
    detail: PARIS_TRAINING_SUMMARY,
    tags: ['DESP', 'Mastère Chef de produit IA et automatisation · septembre 2027', 'Mastère Ingénierie de l’IA générative · septembre 2027'],
  },
];

export const contactInfo = {
  phone: '04 22 47 07 68',
  phoneHref: 'tel:+33422470768',
  email: 'Contact par formulaire',
  whatsapp: '07 44 30 45 27',
  whatsappHref: 'https://wa.me/33744304527',
  hours: 'Du lundi au vendredi de 9 h à 17 h',
};

export const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/integraleacademy', handle: '@integraleacademy' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vaillantclement/', handle: 'Clément VAILLANT' },
  { label: 'Instagram', href: 'https://www.instagram.com/integraleacademy/', handle: '@integraleacademy' },
  { label: 'WhatsApp', href: contactInfo.whatsappHref, handle: contactInfo.whatsapp },
] as const;
