import TariffsPageContent, {
  type PricingOffer,
  type PricingOfferCategory,
  type PricingOfferTone,
} from '@/components/TariffsPageContent';
import { allFormations } from '@/data/formations';

export const metadata = {
  title: 'Tarifs des formations professionnelles',
  description:
    'Comparez les tarifs, durées et financements des formations Intégrale Academy : APS, SSIAP 1, SST, A3P, DESP, VAE et VTC.',
};

type OfferPresentation = {
  shortTitle: string;
  category: PricingOfferCategory;
  categoryLabel: string;
  tone: PricingOfferTone;
  priceNote?: string;
  eyebrow: string;
};

const offerPresentation: Record<string, OfferPresentation> = {
  '/formations-securite/aps': {
    shortTitle: 'APS',
    category: 'security',
    categoryLabel: 'Sécurité privée',
    tone: 'blue',
    eyebrow: 'Titre professionnel · Niveau 3',
  },
  '/formations-securite/a3p-apr': {
    shortTitle: 'A3P / APR',
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
    priceNote: '1 230 € avec SST',
    eyebrow: 'Diplôme réglementaire',
  },
  '/formations-securite/sst': {
    shortTitle: 'SST',
    category: 'fire',
    categoryLabel: 'Secourisme',
    tone: 'lime',
    eyebrow: 'Certification INRS',
  },
  '/formations-securite/desp-initial': {
    shortTitle: 'DESP initial',
    category: 'leadership',
    categoryLabel: 'Direction',
    tone: 'orange',
    eyebrow: 'Titre professionnel · Niveau 5',
  },
  '/formations-securite/desp-vae': {
    shortTitle: 'DESP en VAE',
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
