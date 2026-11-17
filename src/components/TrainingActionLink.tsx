import Link from 'next/link';
import React, { type ComponentProps } from 'react';
import { INFORMATION_REQUEST_URL } from '@/lib/contact-request';
import { canonicalSiteHref } from '@/lib/site-urls';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href?: string };

/** Keep the academy page open when an action hands the visitor over to the CRM. */
export function TrainingActionLink({ href = INFORMATION_REQUEST_URL, ...props }: Props) {
  const destination = canonicalSiteHref(href);
  const path = destination.split(/[?#]/, 1)[0].replace(/\/+$/, '');
  if (path === INFORMATION_REQUEST_URL) {
    return <Link {...props} href={destination} target="_blank" rel="noopener noreferrer" aria-description="Ouvre un nouvel onglet" />;
  }
  return <Link {...props} href={href} />;
}
