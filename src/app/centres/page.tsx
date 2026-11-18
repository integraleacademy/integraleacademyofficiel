import { CampusSection } from '@/components/CampusSection';
import { CatalogueHero } from '@/components/CatalogueHero';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata('/centres');

export default function CentresPage() {
  return <>
    <CatalogueHero
      id="centres-title"
      title={<>Nos centres sur la Côte d’Azur <em>et à Paris</em></>}
      description="Retrouvez les formations, les dates et les informations d’accès de chaque centre. Notre école principale se situe à Puget-sur-Argens. À Paris, nous vous accueillons pour le DESP en formation initiale ou par la VAE."
      artwork={{ src: '/images/campus/accueil-centre.webp', alt: 'L’accueil du centre Intégrale Academy à Puget-sur-Argens.' }}
      actions={[{ label: 'Centre Côte d’Azur', href: '#centre-cote-azur' }, { label: 'Centre de Paris', href: '#centre-paris' }]}
    />
    <CampusSection showDirections />
  </>;
}
