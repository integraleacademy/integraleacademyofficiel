import { createPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { PresentationDossiersPage } from '@/components/PresentationDossiersPage';
import { professionalPresentationDossiers } from '@/data/presentation-dossiers';

export const metadata: Metadata = createPageMetadata('/dossiersfc');

export default function Page() {
  return <PresentationDossiersPage variant="professional" dossiers={professionalPresentationDossiers} />;
}
