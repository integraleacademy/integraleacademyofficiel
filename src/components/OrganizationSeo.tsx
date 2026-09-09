import { locations, socialLinks } from '@/data/locations';
import { SITE_ORIGIN } from '@/lib/site-urls';
import { ORGANIZATION_ID, WEBSITE_ID, SITE_NAME, serializeJsonLd } from '@/lib/seo';
import { seoPages } from '@/data/seo-pages';

export function OrganizationSeo() {
  const data = { '@context': 'https://schema.org', '@graph': [
    {
      '@type': 'EducationalOrganization', '@id': ORGANIZATION_ID, name: SITE_NAME, url: SITE_ORIGIN,
      description: seoPages['/'].description, logo: `${SITE_ORIGIN}/images/logo.png`,
      telephone: '+33422470768', email: 'ecole@integraleacademy.com',
      address: { '@type': 'PostalAddress', streetAddress: '54 chemin du Carreou - ZI du Carreou', postalCode: '83480', addressLocality: 'Puget-sur-Argens', addressCountry: 'FR' },
      location: locations.map((location) => ({ '@type': 'Place', name: location.name, address: location.address })),
      sameAs: socialLinks.filter((link) => link.label === 'Facebook' || link.label === 'Instagram').map((link) => link.href),
      contactPoint: { '@type': 'ContactPoint', telephone: '+33422470768', contactType: 'Admissions et informations', availableLanguage: ['French'] },
    },
    { '@type': 'WebSite', '@id': WEBSITE_ID, name: SITE_NAME, url: SITE_ORIGIN, inLanguage: 'fr-FR', publisher: { '@id': ORGANIZATION_ID } },
  ] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
