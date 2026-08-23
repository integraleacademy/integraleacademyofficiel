import type { Metadata } from 'next';
import './globals.css';
import './global-contact-cta-continuous.css';
import './home-height-animation.css';
import { Button, Header, Footer, FullWidthBand, StickyMobileCTA } from '@/components/ui';
import { ProjectTrainingPopup } from '@/components/ProjectTrainingPopup';
import { GoogleRatingBadge } from '@/components/GoogleRatingBadge';
import { GlobalContactCTA } from '@/components/GlobalContactCTA';

export const metadata: Metadata = {
  title: { default:'Intégrale Academy - Formations sécurité, VTC et BTS', template:'%s | Intégrale Academy' },
  description:'Centre de formation professionnelle spécialisé sécurité privée, sécurité incendie, VTC et BTS en alternance.',
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

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:themeInitScript}} /></head><body className="bg-academy-bg text-academy-ink"><Header/><main>{children}</main><GlobalContactCTA/><Footer/><StickyMobileCTA/><ProjectTrainingPopup/><GoogleRatingBadge/></body></html>}
