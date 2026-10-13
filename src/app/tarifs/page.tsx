import { createPageMetadata } from '@/lib/seo';
import TariffsPageContent, {
  type PricingOffer,
  type PricingOfferCategory,
  type PricingOfferTone,
} from '@/components/TariffsPageContent';
import { allFormations } from '@/data/formations';

export const metadata = createPageMetadata('/tarifs');

type OfferPresentation = {
  shortTitle: string;
  category: PricingOfferCategory;
  categoryLabel: string;
  tone: PricingOfferTone;
  priceNote?: string;
  priceDetails?: string[];
  eyebrow: string;
};

const offerPresentation: Record<string, OfferPresentation> = {
  '/formations-securite/aps': {
    shortTitle: 'APS',
    priceNote: 'Tarif 2027 TTC',
    category: 'security',
    categoryLabel: 'Sécurité privée',
    tone: 'blue',
    eyebrow: 'Titre professionnel · Niveau 3',
  },
  '/formations-securite/a3p-apr': {
    shortTitle: 'A3P',
    priceDetails: ['Hébergement collectif en option : 350 € TTC pour la formation, sur réservation.'],
    priceNote: 'Tarif 2027 TTC',
    category: 'security',
    categoryLabel: 'Protection rapprochée',
    tone: 'green',
    eyebrow: 'Titre professionnel · Niveau 4',
  },
  '/formations-securite/cpsp': {
    shortTitle: 'CPSP',
    category: 'security',
    categoryLabel: 'Sécurité privée',
    tone: 'teal',
    eyebrow: 'Évolution professionnelle',
  },
  '/formations-securite/ssiap-1': {
    shortTitle: 'SSIAP 1',
    category: 'fire',
    categoryLabel: 'Sécurité incendie',
    tone: 'red',
    priceNote: 'SSIAP 1 seul',
    priceDetails: ['Formule SSIAP 1 + SST : 1 230 €.'],
    eyebrow: 'Diplôme réglementaire',
  },
  '/formations-securite/sst': {
    shortTitle: 'SST',
    category: 'fire',
    categoryLabel: 'Secourisme',
    tone: 'lime',
    eyebrow: 'Certification INRS',
  },
  '/dirigeant': {
    shortTitle: 'DESP initial',
    priceNote: 'Tarif 2027 TTC',
    category: 'leadership',
    categoryLabel: 'Direction',
    tone: 'orange',
    eyebrow: 'Titre professionnel · Niveau 5',
  },
  '/vaedirigeant': {
    shortTitle: 'DESP en VAE',
    priceNote: 'Tarif 2027 TTC',
    category: 'leadership',
    categoryLabel: 'Validation des acquis',
    tone: 'amber',
    eyebrow: 'Titre professionnel · Niveau 5',
  },
  '/vtc': {
    shortTitle: 'Chauffeur VTC',
    category: 'mobility',
    categoryLabel: 'Transport',
    tone: 'violet',
    priceNote: 'Formule tout inclus',
    priceDetails: ['Théorie en e-learning et pratique en présentiel.', 'Livre, coaching et frais d’examen inclus.'],
    eyebrow: 'Préparation à l’examen VTC',
  },
};

const offers: PricingOffer[] = allFormations
  .filter((formation) => offerPresentation[formation.slug])
  .map((formation) => ({
    slug: formation.slug,
    title: formation.title,
    short: formation.short,
    duration: formation.duration,
    locations: formation.locations,
    financing: formation.financing,
    certification: formation.certification,
    price: formation.price,
    ...offerPresentation[formation.slug],
  }));

export default function Page() {
  return <TariffsPageContent offers={offers} />;
}
