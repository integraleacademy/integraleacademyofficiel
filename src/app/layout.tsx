import type { Metadata } from 'next';
import './globals.css';
import { Button, Header, Footer, FullWidthBand, StickyMobileCTA } from '@/components/ui';
import { ProjectTrainingPopup } from '@/components/ProjectTrainingPopup';

export const metadata: Metadata = { title: { default:'Intégrale Academy - Formations sécurité, VTC et BTS', template:'%s | Intégrale Academy' }, description:'Centre de formation professionnelle spécialisé sécurité privée, sécurité incendie, VTC et BTS en alternance.' };

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="fr"><body className="bg-academy-bg text-academy-ink">
    <Header/>
    <main>{children}</main>
    <FullWidthBand eyebrow="Admissions" title="Un conseiller peut vous orienter sur chaque page" tone="dark" actions={<><Button href="/contact" variant="secondary">Demander des informations</Button><Button href="tel:0422470768" variant="ghost">Appeler</Button></>}>Choix de formation, dates, financement ou inscription : gardez toujours un point d’entrée clair pour avancer avec Intégrale Academy.</FullWidthBand>
    <Footer/>
    <StickyMobileCTA/>
    <ProjectTrainingPopup/>
  </body></html>
}
