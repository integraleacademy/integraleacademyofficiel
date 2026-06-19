import type { Metadata } from 'next';
import './globals.css';
import { Button, Header, Footer, FullWidthBand, StickyMobileCTA } from '@/components/ui';
import { ProjectTrainingPopup } from '@/components/ProjectTrainingPopup';
import { AIChatWidget } from '@/components/AIChatWidget';

export const metadata: Metadata = { title: { default:'Intégrale Academy - Formations sécurité, VTC et BTS', template:'%s | Intégrale Academy' }, description:'Centre de formation professionnelle spécialisé sécurité privée, sécurité incendie, VTC et BTS en alternance.' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr" suppressHydrationWarning><body className="bg-academy-bg text-academy-ink dark:text-stone-100"><Header/><main>{children}</main><Footer/><StickyMobileCTA/><ProjectTrainingPopup/><AIChatWidget/></body></html>}
