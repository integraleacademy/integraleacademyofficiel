export const PARIS_ADDRESS = '34 rue Poissonnière, 75002 Paris';
export const PARIS_SESSION_LOCATION = `Paris · ${PARIS_ADDRESS}`;

export type Location = { id: 'puget' | 'paris'; name: string; address: string; detail: string; tags: string[] };

export const locations: Location[] = [
  { id: 'puget', name: 'Puget-sur-Argens / Côte d’Azur', address: '54 chemin du Carreou - ZI du Carreou, 83480 Puget-sur-Argens', detail: 'École principale, 400 m² dédiés aux enseignements pratiques et théoriques. À 500 m de l’A8, stationnement gratuit, bus ligne 4 arrêt Général de Gaulle.', tags: ['Sécurité', 'BTS', 'VTC pratique'] },
  { id: 'paris', name: 'Paris', address: PARIS_ADDRESS, detail: 'Centre de formation parisien pour les sessions DESP en présentiel.', tags: ['DESP', 'Présentiel'] },
];

export const contactInfo = {
  phone: '04 22 47 07 68',
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
