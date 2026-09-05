import type { Metadata } from 'next';
import { PresentationDossiersPage } from '@/components/PresentationDossiersPage';
import { btsPresentationDossiers } from '@/data/presentation-dossiers';

export const metadata: Metadata = {
  title: 'Dossiers de présentation des BTS',
  description: 'Consultez les dossiers de présentation des BTS MOS, PI, MCO, NDRC et Commerce international proposés en alternance par Intégrale Academy.',
  alternates: { canonical: 'https://integraleacademyofficiel-1.onrender.com/dossiersbts' },
};

export default function Page() {
  return <PresentationDossiersPage variant="bts" dossiers={btsPresentationDossiers} />;
}
