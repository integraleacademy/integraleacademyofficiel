import type { Metadata } from 'next';
import { SITE_ORIGIN } from '@/lib/site-urls';
import { SITE_NAME, SOCIAL_IMAGE } from '@/lib/seo';
import { seoPages } from '@/data/seo-pages';
import { OrganizationSeo } from '@/components/OrganizationSeo';
import { PageSeo } from '@/components/PageSeo';
import './globals.css';
import './global-contact-cta-continuous.css';
import './home-height-animation.css';
import { Header, Footer } from '@/components/ui';
import { ProjectTrainingPopup } from '@/components/ProjectTrainingPopup';
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
    apple: '/images/favicon.png',
  },
};
const themeInitScript = `
  (function () {
    try {
      var key = 'integrale-academy-theme';
      var saved = window.localStorage.getItem(key);
      var theme = saved === 'light' || saved === 'dark'
        ? saved
        : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch (error) {}
  })();
`;

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:themeInitScript}} /></head><body className="bg-academy-bg text-academy-ink"><OrganizationSeo/><Header/><main>{children}</main><PageSeo/><GlobalContactCTA/><Footer/><GlobalMobileCTA/><ProjectTrainingPopup/><GoogleRatingBadge/></body></html>}
