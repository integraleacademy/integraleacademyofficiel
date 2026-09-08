import { Hero, PremiumFAQSection } from '@/components/ui';
import { btsFormations } from '@/data/bts';

export const metadata = {
  title: 'Questions fréquentes sur les BTS',
  description: 'Alternance, financement et candidature : les réponses aux questions sur les BTS Intégrale Academy.',
  alternates: { canonical: '/faq' },
};

export default function BtsFaqPage() {
  const questions = [...new Map(btsFormations.flatMap((formation) => formation.faq).map((item) => [item.q, item])).values()];
  return <>
    <Hero badge="BTS en alternance" title="Vos questions sur les BTS" subtitle="Retrouvez les réponses utiles pour préparer votre candidature." />
    <PremiumFAQSection theme="blue" badge="Questions fréquentes" title="Alternance, financement et candidature" description="Les réponses communes à nos parcours BTS. Pour une question sur votre situation, notre équipe vous accompagne." items={questions} contactHref="/contact?formation=bts" contactLabel="Échanger avec l’équipe BTS" />
  </>;
}
