import type { Metadata } from 'next';
import { PresentationDossiersPage } from '@/components/PresentationDossiersPage';
import { professionalPresentationDossiers } from '@/data/presentation-dossiers';

export const metadata: Metadata = {
  title: 'Dossiers de présentation des formations professionnelles',
  description: 'Consultez les dossiers de présentation des formations APS, A3P / APR, SSIAP 1, DESP initial, DESP VAE et Chauffeur VTC proposées par Intégrale Academy.',
  alternates: { canonical: 'https://integraleacademyofficiel-1.onrender.com/dossiersfc' },
};

export default function Page() {
  return <PresentationDossiersPage variant="professional" dossiers={professionalPresentationDossiers} />;
}
