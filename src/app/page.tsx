import { createPageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { OrientationAssistant } from '@/components/OrientationAssistant';
import { ContactFilm } from '@/components/ContactFilm';
import { AcademyJourney, AcademyLearningStudio } from '@/components/AcademyExperience';
import { BtsTrainingGrid, type BtsTrainingHighlight } from '@/components/BtsTrainingGrid';
import { BtsTrainingComparisonModal } from '@/components/BtsTrainingComparisonModal';
import { CampusSection } from '@/components/CampusSection';
import { GoogleReviewsSection } from '@/components/GoogleReviewsSection';
import { listPublicGoogleReviews } from '@/lib/google-reviews-data';
import { HomePageAnimations } from '@/components/HomePageAnimations';
import { SecurityTrainingComparisonModal } from '@/components/SecurityTrainingComparisonModal';
import { SecurityTrainingGrid } from '@/components/SecurityTrainingGrid';
import { VtcTrainingCard } from '@/components/VtcTrainingCard';
import { PremiumFAQSection } from '@/components/ui';
import { globalFaq } from '@/data/faq';
import { createHomeSecurityHighlights } from '@/lib/home-security-trainings';
import { listPublicSessions as listSessions } from '@/lib/training-data';
import { vtcFormation } from '@/data/site';
import styles from './home.module.css';
import heroStyles from './HomeHero.module.css';
import carouselStyles from '@/components/TrainingCarousel.module.css';

export const dynamic = 'force-dynamic';

export const metadata = createPageMetadata('/');

const btsCommon = {
  certification: 'Diplôme d’État',
  level: 'Bac +2',
  duration: '2 ans',
  rhythm: 'Alternance',
  onsiteLocation: 'Puget-sur-Argens',
  distanceMode: 'En visioconférence',
} as const;

const btsHighlights: BtsTrainingHighlight[] = [
  {
    ...btsCommon,
    slug: '/bts/mos',
    shortTitle: 'BTS MOS',
    title: 'Management Opérationnel de la Sécurité',
    category: 'Management & sécurité',
    description: 'Pilotez des prestations de sécurité, coordonnez les équipes et développez la relation client.',
    visual: 'mos',
    featured: true,
  },
  {
    ...btsCommon,
    slug: '/bts/mco',
    shortTitle: 'BTS MCO',
    title: 'Management Commercial Opérationnel',
    category: 'Commerce',
    description: 'Développez la vente, la relation client et le management pour piloter efficacement une unité commerciale.',
    visual: 'mco',
  },
  {
    ...btsCommon,
    slug: '/bts/ndrc',
    shortTitle: 'BTS NDRC',
    title: 'Négociation et Digitalisation de la Relation Client',
    category: 'Relation client',
    description: 'Maîtrisez la prospection, la négociation et la fidélisation, en face à face comme sur les canaux digitaux.',
    visual: 'ndrc',
  },
  {
    ...btsCommon,
    slug: '/bts/commerce-international',
    shortTitle: 'BTS CI',
    title: 'Commerce International',
    category: 'International',
    description: 'Préparez-vous à développer des marchés, gérer l’import-export et coordonner des opérations à l’international.',
    visual: 'ci',
  },
  {
    ...btsCommon,
    slug: '/bts/professions-immobilieres',
    shortTitle: 'BTS PI',
    title: 'Professions Immobilières',
    category: 'Immobilier',
    description: 'Formez-vous à la transaction, à la gestion locative, à la copropriété et au conseil immobilier.',
    visual: 'pi',
  },
  {
    ...btsCommon,
    slug: '/bts/comptabilite-gestion',
    shortTitle: 'BTS CG',
    title: 'Comptabilité et Gestion',
    category: 'Comptabilité',
    description: 'Maîtrisez la comptabilité, la gestion et le pilotage financier.',
    visual: 'cg',
  },
];

const proofItems = [
  ['Depuis 2018', 'Expérience terrain'],
  ['400 m²', 'École principale'],
  ['Qualiopi', 'Certification qualité'],
  ['CNAPS · ADEF', 'Agréments métiers'],
  ['3 centres', 'Selon les sessions'],
] as const;

export default async function Home() {
  const [sessions, googleReviews] = await Promise.all([listSessions(), listPublicGoogleReviews()]);
  const securityHighlights = createHomeSecurityHighlights(sessions);

  return (
    <div className={styles.home} data-home-page>
      <HomePageAnimations />
      <section className={heroStyles.hero}>
        <span className={heroStyles.heroGlow} data-home-ambient aria-hidden="true" />
        <div className={heroStyles.container}>
          <div className={heroStyles.heroComposition}>
            <div className={heroStyles.heroCopy}>
              <span className={heroStyles.heroBadge} data-home-hero-item><i aria-hidden="true" /> Intégrale Academy · fondée en 2018</span>
              <h1 data-home-hero-item>Votre futur métier mérite une formation <em>à la hauteur.</em></h1>
              <p data-home-hero-item>Des parcours concrets, des formateurs issus du terrain et une équipe qui vous accompagne réellement — du choix de la formation jusqu’à votre projet professionnel.</p>
              <div className={heroStyles.heroActions} data-home-hero-item>
                <Link href="#formations-securite" className={heroStyles.primaryButton}>Trouver ma formation <span aria-hidden="true">→</span></Link>
                <Link href="/planning" className={heroStyles.goldButton}>Voir le planning</Link>
              </div>
              <div className={heroStyles.heroProofs} data-home-hero-item aria-label="Points forts d’Intégrale Academy">
                <span>Formations réglementées</span>
                <span>Financements possibles</span>
                <span>Côte d’Azur · Paris · Centre France</span>
              </div>
            </div>
          </div>

          <div id="assistant-orientation" data-home-assistant className={`${heroStyles.assistantDock} scroll-mt-28`}>
            <OrientationAssistant variant="homeDock" />
          </div>
        </div>
      </section>

      <ContactFilm />

      <section id="formations-securite" aria-labelledby="security-heading" className={`scroll-mt-28 ${carouselStyles.section}`}>
        <div className="page-container">
          <div className={carouselStyles.heading}>
            <h2 id="security-heading">Les métiers de la sécurité</h2>
            <p>5 parcours pour se former et évoluer</p>
          </div>
          <SecurityTrainingGrid items={securityHighlights} />
          <div className={carouselStyles.footer}>
            <p className={carouselStyles.formats}>Un projet à préciser ? <Link href="#assistant-orientation">Être orienté <span aria-hidden="true">→</span></Link></p>
            <div className={carouselStyles.actions}>
              <SecurityTrainingComparisonModal items={securityHighlights} className={carouselStyles.secondary} />
              <Link href="/planning" className={carouselStyles.secondary}>Voir le planning <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section id="formation-vtc" aria-labelledby="formation-vtc-title" className={`scroll-mt-28 ${carouselStyles.section} ${carouselStyles.sectionAlternate}`}>
        <div className="page-container">
          <div className={carouselStyles.heading}>
            <h2 id="formation-vtc-title">{vtcFormation.title}</h2>
            <p>Théorie, pratique et examen · Une formule tout inclus</p>
          </div>
          <VtcTrainingCard
            description="Apprenez la théorie à votre rythme, entraînez-vous au volant et préparez l’examen avec une formule tout inclus."
            duration={vtcFormation.duration}
            price={vtcFormation.price ?? '1 500 € tout inclus'}
            href={vtcFormation.slug}
          />
        </div>
      </section>

      <section id="bts" aria-labelledby="bts-heading" className={`scroll-mt-28 ${carouselStyles.section}`}>
        <div className="page-container">
          <div className={carouselStyles.heading}>
            <h2 id="bts-heading">BTS en alternance</h2>
            <p>6 diplômes d’État · Bac +2 · 2 ans</p>
          </div>
          <BtsTrainingGrid items={btsHighlights} />
          <div className={carouselStyles.footer}>
            <p className={carouselStyles.formats}>Sur notre campus à <strong>{btsCommon.onsiteLocation}</strong> ou <strong>en visioconférence</strong>.</p>
            <div className={carouselStyles.actions}>
              <BtsTrainingComparisonModal items={btsHighlights} className={carouselStyles.secondary} />
              <Link href="/planning" className={carouselStyles.secondary}>Voir les rentrées <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <AcademyJourney />
      <AcademyLearningStudio />

      <section className={styles.proofBar} data-home-proof aria-label="Chiffres et reconnaissances">
        <div className={styles.container}><div className={styles.proofGrid}>{proofItems.map(([value, label]) => <div key={value} data-home-proof-item><strong>{value}</strong><span>{label}</span></div>)}</div></div>
      </section>

      <CampusSection />
      <GoogleReviewsSection reviews={googleReviews} />
      <PremiumFAQSection theme="gold" badge="FAQ" title="Questions fréquentes" description="Retrouvez les réponses aux questions les plus courantes sur nos formations, les financements, les inscriptions et l’accompagnement Intégrale Academy." items={globalFaq} contactHref="/contact" />
    </div>
  );
}
