'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const dedicatedSecurityPages = new Set([
  '/formations-securite/aps',
  '/formations-securite/ssiap-1',
  '/formations-securite/sst',
  '/formations-securite/a3p-apr',
]);

export function hasDedicatedMobileCta(pathname: string) {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';

  return normalizedPath === '/planning'
    || /^\/bts\/[^/]+$/.test(normalizedPath)
    || dedicatedSecurityPages.has(normalizedPath);
}

export function GlobalMobileCTA() {
  const pathname = usePathname() || '/';

  if (hasDedicatedMobileCta(pathname)) {
    return null;
  }

  return <>
    <div aria-hidden="true" className="h-[calc(4.75rem+env(safe-area-inset-bottom))] md:hidden" />
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-academy-line bg-academy-surface/95 px-3 pb-[calc(.75rem+env(safe-area-inset-bottom))] pt-3 shadow-soft backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
        <Link href="tel:0422470768" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-4 py-3 text-center text-sm font-bold leading-tight text-academy-ink ring-1 ring-academy-line transition hover:-translate-y-0.5 hover:bg-stone-50">Appeler</Link>
        <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full bg-academy-ink px-4 py-3 text-center text-sm font-bold leading-tight text-white transition hover:-translate-y-0.5 hover:bg-black">Informations</Link>
      </div>
    </div>
  </>;
}
