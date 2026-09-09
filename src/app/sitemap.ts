import type { MetadataRoute } from 'next';
import { seoPages } from '@/data/seo-pages';
import { SITE_ORIGIN } from '@/lib/site-urls';

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(seoPages)
    .filter(([, page]) => !page.noindex)
    .map(([path]) => ({ url: new URL(path, SITE_ORIGIN).href }));
}
