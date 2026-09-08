import type { Metadata } from 'next';
import { CallbackConfirmation } from '@/components/CallbackConfirmation';

export const metadata: Metadata = {
  title: 'Demande de rappel dirigeant confirmée',
  alternates: { canonical: '/rdvconfirmedirigeant' },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <CallbackConfirmation formation="Dirigeant d’entreprise de sécurité privée" href="/despvaeouinitial" />;
}
