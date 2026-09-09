import { createPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { CallbackConfirmation } from '@/components/CallbackConfirmation';

export const metadata: Metadata = createPageMetadata('/rdvconfirmedirigeant');

export default function Page() {
  return <CallbackConfirmation formation="Dirigeant d’entreprise de sécurité privée" href="/despvaeouinitial" />;
}
