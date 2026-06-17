import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer, StickyMobileCTA } from '@/components/ui';
export const metadata: Metadata = { title: { default:'Intégrale Academy - Formations sécurité, VTC et BTS', template:'%s | Intégrale Academy' }, description:'Centre de formation professionnelle spécialisé sécurité privée, sécurité incendie, VTC et BTS en alternance.' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body className="bg-academy-bg text-academy-ink"><Header/><main>{children}</main><Footer/><StickyMobileCTA/></body></html>}
