import type { Metadata } from 'next';
import { CallbackConfirmation } from '@/components/CallbackConfirmation';

export const metadata: Metadata = {
  title: 'Demande de rappel VTC confirmée',
  alternates: { canonical: '/rdvvtc' },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <CallbackConfirmation formation="Formation chauffeur VTC" href="/vtc" />;
}
