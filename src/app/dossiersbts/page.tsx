import { createPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { PresentationDossiersPage } from '@/components/PresentationDossiersPage';
import { btsPresentationDossiers } from '@/data/presentation-dossiers';

export const metadata: Metadata = createPageMetadata('/dossiersbts');

export default function Page() {
  return <PresentationDossiersPage variant="bts" dossiers={btsPresentationDossiers} />;
}
