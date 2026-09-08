import redirects from '@/data/url-redirects.json';

export const SITE_ORIGIN = 'https://www.integraleacademy.com';

const ownedHosts = new Set([
  'www.integraleacademy.com',
  'integraleacademy.com',
  'integraleacademyofficiel-1.onrender.com',
]);
const destinations = new Map(redirects.map(({ source, destination }) => [source, destination]));

/** Resolve stored website links without changing training identifiers or external services. */
export function canonicalSiteHref(href: string): string {
  if (!href || href.startsWith('#')) return href;
  try {
    const source = new URL(href, SITE_ORIGIN);
    if (!ownedHosts.has(source.hostname)) return href;
    const pathname = source.pathname.replace(/\/+$/, '') || '/';
    const destination = destinations.get(pathname) || destinations.get(decodeURIComponent(pathname));
    const target = new URL(destination || pathname, SITE_ORIGIN);
    for (const [key, value] of source.searchParams) target.searchParams.append(key, value);
    if (source.hash) target.hash = source.hash;
    if (!ownedHosts.has(target.hostname)) return target.href;
    return `${target.pathname}${target.search}${target.hash}`;
  } catch {
    return href;
  }
}
