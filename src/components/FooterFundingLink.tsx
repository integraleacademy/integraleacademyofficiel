'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { vtcFundingHref } from '@/data/vtc';

export function FooterFundingLink({ href, children }: { href: string; children: string }) {
  const path = usePathname()?.replace(/\/$/, '');
  const target = path === '/vtc' ? (href.includes('#simulateur') ? vtcFundingHref : '/financements?formation=vtc') : href;
  return <Link href={target}>{children}</Link>;
}
