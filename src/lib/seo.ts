import type { Metadata } from 'next';
import { seoPages } from '@/data/seo-pages';
import { canonicalSiteHref, SITE_ORIGIN } from '@/lib/site-urls';

export const SITE_NAME = 'Intégrale Academy';
export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
export const SOCIAL_IMAGE = {
  url: `${SITE_ORIGIN}/opengraph-image`, width: 1200, height: 630,
  alt: 'Intégrale Academy : formations sécurité, BTS en alternance et VTC',
};

export function seoPath(path: string): string {
  return new URL(canonicalSiteHref(path), SITE_ORIGIN).pathname.replace(/\/+$/, '') || '/';
}

export function createPageMetadata(path: string): Metadata {
  const canonicalPath = seoPath(path);
  const page = seoPages[canonicalPath];
  if (!page) throw new Error(`Métadonnées manquantes : ${canonicalPath}`);
  const url = new URL(canonicalPath, SITE_ORIGIN).href;
  const title = `${page.title} | ${SITE_NAME}`;
  return {
    title: { absolute: title }, description: page.description,
    alternates: { canonical: url },
    openGraph: { type: 'website', locale: 'fr_FR', siteName: SITE_NAME, title, description: page.description, url, images: [SOCIAL_IMAGE] },
    twitter: { card: 'summary_large_image', title, description: page.description, images: [{ url: SOCIAL_IMAGE.url, alt: SOCIAL_IMAGE.alt }] },
    robots: page.noindex ? { index: false, follow: canonicalPath !== '/gestion' } : {
      index: true, follow: true, googleBot: { 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
    },
  };
}

export function pageBreadcrumbs(path: string): Array<{ name: string; path: string }> {
  const result: Array<{ name: string; path: string }> = [];
  const visited = new Set<string>();
  let current = seoPath(path);
  while (seoPages[current] && !visited.has(current)) {
    visited.add(current);
    result.unshift({ name: seoPages[current].label, path: current });
    if (current === '/') break;
    current = seoPages[current].parent || '/';
  }
  return result;
}

export function pageStructuredData(path: string) {
  const canonicalPath = seoPath(path);
  const page = seoPages[canonicalPath];
  if (!page || page.noindex) return null;
  const url = new URL(canonicalPath, SITE_ORIGIN).href;
  const breadcrumbs = pageBreadcrumbs(canonicalPath);
  const graph: Array<Record<string, unknown>> = [{
    '@type': page.type || 'WebPage', '@id': `${url}#webpage`, url,
    name: page.title, description: page.description, inLanguage: 'fr-FR',
    isPartOf: { '@id': WEBSITE_ID }, about: { '@id': ORGANIZATION_ID },
    ...(canonicalPath !== '/' ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
  }];
  if (canonicalPath !== '/') graph.push({
    '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
    itemListElement: breadcrumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: new URL(item.path, SITE_ORIGIN).href })),
  });
  if (page.courseName || page.serviceName) graph.push({
    '@type': page.courseName ? 'Course' : 'Service', '@id': `${url}#${page.courseName ? 'course' : 'service'}`,
    name: page.courseName || page.serviceName, description: page.description, url,
    ...(page.courseName ? { inLanguage: 'fr-FR' } : { serviceType: 'Accompagnement à la validation des acquis de l’expérience' }),
    provider: { '@type': 'EducationalOrganization', '@id': ORGANIZATION_ID, name: SITE_NAME, url: SITE_ORIGIN },
  });
  return { '@context': 'https://schema.org', '@graph': graph };
}

/** Use absolute public URLs and escape inline-script delimiters, including content from FAQs. */
export function serializeJsonLd(value: unknown): string {
  function normalize(data: unknown, key = ''): unknown {
    if (typeof data === 'string' && ['url', 'item', '@id', 'logo', 'image'].includes(key) && data.startsWith('/')) {
      return new URL(canonicalSiteHref(data), SITE_ORIGIN).href;
    }
    if (Array.isArray(data)) return data.map((item) => normalize(item, key));
    if (data && typeof data === 'object') return Object.fromEntries(Object.entries(data).map(([name, item]) => [name, normalize(item, name)]));
    return data;
  }
  return JSON.stringify(normalize(value)).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}

/** Existing course/FAQ content stays with its page; the common navigation supplies breadcrumbs. */
export function serializeCourseJsonLd(value: Record<string, unknown>, path: string): string {
  const url = new URL(seoPath(path), SITE_ORIGIN).href;
  const source = Array.isArray(value['@graph']) ? value['@graph'] : [value];
  const graph = source.filter((item) => item['@type'] !== 'BreadcrumbList').map((item) => item['@type'] === 'Course' ? {
    ...item, '@id': `${url}#course`, url, inLanguage: 'fr-FR',
    provider: { ...item.provider, '@type': 'EducationalOrganization', '@id': ORGANIZATION_ID, name: SITE_NAME, url: SITE_ORIGIN },
  } : item);
  return serializeJsonLd({ '@context': 'https://schema.org', '@graph': graph });
}
