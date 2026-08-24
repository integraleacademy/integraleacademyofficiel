import { VisualSection } from '@/components/visuals';
import {
  ArtDirectionVisual,
  ChatGptAgentBanner,
  FormationCard,
  Hero,
  Highlight,
  SectionTitle,
} from '@/components/ui';
import { formations } from '@/data/site';

export const metadata = {
  title: 'Formations sécurité',
  description:
    'Formations sécurité privée Intégrale Academy : APS, tous les parcours SSIAP, SST, A3P / APR et DESP avec lieux, financements et inscriptions.',
};

export default function Page() {
  const items = formations
    .filter((formation) => formation.category === 'security' && formation.slug !== '/formations-securite/desp-initial')
    .map((formation) =>
      formation.slug === '/formations-securite/ssiap-1'
        ? {
            ...formation,
            slug: '/formations-securite/ssiap',
            title: 'SSIAP – Sécurité incendie',
            short: 'SSIAP 1, SSIAP 2, SSIAP 3, recyclages et remise à niveau : accédez au parcours adapté à votre fonction.',
            duration: 'De 14 à 216 heures selon le parcours',
          }
        : formation,
    );

  return (
    <>
      <Hero
        badge="Sécurité privée"
        title={<>Formations sécurité : <Highlight>formation certifiante</Highlight> et métier reconnu</>}
        subtitle="APS, SSIAP 1, SSIAP 2, SSIAP 3, maintien des acquis, SST, A3P / APR et DESP : des parcours clairs, réglementaires et orientés inscription."
        visual={<ArtDirectionVisual world="security" />}
      />
      <ChatGptAgentBanner />
      <VisualSection tone="security">
        <section className="page-container py-12">
          <SectionTitle title={<>Choisissez votre parcours sécurité et votre <Highlight variant="subtle">inscription</Highlight></>} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((formation) => (
              <FormationCard
                key={formation.slug}
                title={formation.title}
                desc={formation.short}
                href={formation.slug}
                tags={[formation.duration, formation.locations]}
              />
            ))}
          </div>
        </section>
      </VisualSection>
    </>
  );
}