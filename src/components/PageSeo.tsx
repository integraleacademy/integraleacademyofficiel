'use client';

import { usePathname } from 'next/navigation';
import { pageStructuredData, serializeJsonLd } from '@/lib/seo';

export function PageSeo() {
  const pathname = usePathname();
  if (!pathname) return null;
  const data = pageStructuredData(pathname);
  if (!data) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
