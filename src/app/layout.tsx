import type { Metadata } from 'next';
import { SITE_ORIGIN } from '@/lib/site-urls';
import { SITE_NAME, SOCIAL_IMAGE } from '@/lib/seo';
import { seoPages } from '@/data/seo-pages';
import { OrganizationSeo } from '@/components/OrganizationSeo';
import { PageSeo } from '@/components/PageSeo';
import './globals.css';
import './global-contact-cta-continuous.css';
import { Header, Footer } from '@/components/ui';
import { GoogleRatingBadge } from '@/components/GoogleRatingBadge';
import { GlobalContactCTA } from '@/components/GlobalContactCTA';
import { GlobalMobileCTA } from '@/components/GlobalMobileCTA';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  applicationName: SITE_NAME,
  title: { default: `${seoPages['/'].title} | ${SITE_NAME}`, template: `%s | ${SITE_NAME}` },
  description: seoPages['/'].description,
  openGraph: { type: 'website', locale: 'fr_FR', siteName: SITE_NAME, images: [SOCIAL_IMAGE] },
  twitter: { card: 'summary_large_image', images: [{ url: SOCIAL_IMAGE.url, alt: SOCIAL_IMAGE.alt }] },
  icons: {
    icon: [{ url: '/images/favicon.png', type: 'image/png' }],
    shortcut: '/images/favicon.png',
    apple: [{ url: '/images/favicon.png', type: 'image/png' }],
  },
};

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr" style={{ colorScheme: 'light' }}><body className="bg-academy-bg text-academy-ink"><OrganizationSeo/><Header/><main>{children}</main><PageSeo/><GlobalContactCTA/><GoogleRatingBadge/><Footer/><GlobalMobileCTA/></body></html>}
