import { CourseJourney } from '@/components/CourseJourney';
import { createPageMetadata } from '@/lib/seo';
import { bts } from "@/data/site";
import { VisualSection, VisualTimeline } from "@/components/visuals";
import {
  Button,
  ChatGptAgentBanner,
  FeatureCard,
  FormationCard,
  Hero,
  SectionTitle,
  ArtDirectionVisual,
  Highlight,
} from "@/components/ui";
export const metadata = createPageMetadata('/bts');
export default function Page() {
  return (
    <>
      <Hero
        badge="Alternance"
        title={
          <>
            BTS en <Highlight>alternance</Highlight>, en présentiel ou à
            distance
          </>
        }
        subtitle="BTS MOS, MCO, NDRC, Commerce International, Professions Immobilières et Comptabilité et Gestion."
        actions={
          <>
            <Button href="https://inscriptionsbts.onrender.com/">
              Candidature / pré-inscription
            </Button>
            <Button href="/financements/alternance" variant="secondary">
              Comprendre l’alternance
            </Button>
          </>
        }
        visual={<ArtDirectionVisual world="bts" />}
      />
      <CourseJourney course="bts-overview" />
      <ChatGptAgentBanner />
      <VisualSection tone="bts">
        <section id="alternance-bts" className="page-container scroll-mt-36 py-12">
          <div className="grid gap-5 md:grid-cols-3">
            <FeatureCard title="Rythme">
              2 jours de cours et 3 jours en entreprise chaque semaine.
              Les cours sont proposés en présentiel ou en visioconférence,
              selon les modalités du parcours.
            </FeatureCard>
            <FeatureCard title="Accompagnement admissions">
              Candidature et pré-inscription sur la plateforme BTS dédiée, étude
              du dossier, puis accompagnement vers l’entreprise et le contrat
              d’apprentissage.
            </FeatureCard>
            <FeatureCard title="Processus 2026">
              Dossier de pré-inscription, étude de candidature, dossier
              d’inscription, confirmation officielle puis signature du contrat
              d’apprentissage.
            </FeatureCard>
          </div>
          <VisualTimeline tone="bts" />
        </section>
      </VisualSection>
      <VisualSection tone="bts">
        <section id="formations-bts" className="page-container scroll-mt-36 py-12">
          <SectionTitle
            title={
              <>
                Tous les BTS : diplôme et{" "}
                <Highlight variant="subtle">prise en charge</Highlight>
              </>
            }
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {bts.map((x) => (
              <FormationCard
                key={x.slug}
                title={x.title}
                desc={x.desc}
                href={x.slug}
                tags={x.tags}
              />
            ))}
          </div>
        </section>
      </VisualSection>
    </>
  );
}
