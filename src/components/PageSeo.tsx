'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { pageBreadcrumbs, pageStructuredData, serializeJsonLd } from '@/lib/seo';

export function PageSeo() {
  const pathname = usePathname();
  if (!pathname) return null;
  const data = pageStructuredData(pathname);
  if (!data) return null;
  const breadcrumbs = pageBreadcrumbs(pathname);
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
    {breadcrumbs.length > 1 && <nav aria-label="Fil d’Ariane du site" className="page-container py-5 text-xs font-semibold text-academy-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
        {breadcrumbs.map((item, index) => <li key={item.path} className="flex items-center gap-2">
          {index > 0 && <span aria-hidden="true">›</span>}
          {index === breadcrumbs.length - 1 ? <span aria-current="page">{item.name}</span> : <Link href={item.path} className="underline-offset-4 hover:underline">{item.name}</Link>}
        </li>)}
      </ol>
    </nav>}
  </>;
}
