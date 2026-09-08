import type { MetadataRoute } from 'next';
import { allFormations } from '@/data/formations';
import { btsFormations } from '@/data/bts';
import { SITE_ORIGIN } from '@/lib/site-urls';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set([
    '/', '/ecole', '/centres', '/formations-securite', '/bts', '/planning',
    '/tarifs', '/contact', '/entreprises', '/financements', '/faq',
    '/financements/alternance', '/financements/cpf', '/financements/france-travail',
    '/dossiersfc', '/dossiersbts', '/mentions-legales', '/politique-confidentialite',
    '/formations-securite/ssiap', '/formations-securite/ssiap-2',
    '/formations-securite/ssiap-3', '/formations-securite/recyclage-remise-a-niveau-ssiap',
    ...allFormations.map((formation) => formation.slug),
    ...btsFormations.map((formation) => formation.slug),
  ]);
  return [...paths].map((path) => ({ url: new URL(path, SITE_ORIGIN).href }));
}
