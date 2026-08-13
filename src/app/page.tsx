import Link from 'next/link';
import { OrientationAssistant } from '@/components/OrientationAssistant';
import { BtsTrainingGrid, type BtsTrainingHighlight } from '@/components/BtsTrainingGrid';
import { CampusSection } from '@/components/CampusSection';
import { GoogleReviewsSection } from '@/components/GoogleReviewsSection';
import { SecurityTrainingGrid, type SecurityTrainingHighlight } from '@/components/SecurityTrainingGrid';
import { VtcTrainingCard } from '@/components/VtcTrainingCard';
import { Highlight, PremiumFAQSection, SectionTitle } from '@/components/ui';
import { VisualSection } from '@/components/visuals';
import { globalFaq } from '@/data/faq';
import { vtcFormation } from '@/data/site';
import styles from './home.module.css';

export const metadata = {
  title: 'Accueil',
  description: 'Intégrale Academy forme aux métiers de la sécurité privée, de la sécurité incendie, du VTC et aux BTS en alternance à Puget-sur-Argens, Paris et Aurillac.',
};

const journeyCards = [
  { number: '01', icon: '◆', title: 'Découvrir les formations', description: 'Sécurité, incendie, direction, VTC et BTS.', href: '#formations-securite', tone: 'dark' },
  { number: '02', icon: '€', title: 'Trouver un financement', description: 'CPF, France Travail, alternance, OPCO ou personnel.', href: '/financements', tone: 'light' },
  { number: '03', icon: '↗', title: 'Recruter ou former', description: 'Une entrée dédiée aux besoins des entreprises.', href: '/entreprises', tone: 'blue' },
  { number: '04', icon: 'CM', title: 'Parler à Cassandre', description: 'Un échange humain, gratuit et sans engagement.', href: '/contact', tone: 'light' },
] as const;

const securityHighlights: SecurityTrainingHighlight[] = [
  {
    slug: '/formations-securite/aps',
    shortTitle: 'APS',
    title: 'Agent de prévention et de sécurité',
    description: 'Prévenir les risques, surveiller les sites et protéger les personnes.',
    duration: '175 h',
    modality: 'Hybride',
    location: 'Puget-sur-Argens',
    financing: 'CPF · France Travail',
    nextSession: '7 septembre 2026',
    visual: 'aps',
    featured: true,
  },
  {
    slug: '/formations-securite/ssiap-1',
    shortTitle: 'SSIAP 1',
    title: 'Agent de sécurité incendie',
    description: 'Prévenir les risques d’incendie et intervenir dans les ERP et les IGH.',
    duration: '70 h',
    modality: 'Présentiel',
    location: 'Puget-sur-Argens',
    financing: 'CPF · France Travail',
    nextSession: '12 octobre 2026',
    visual: 'ssiap',
  },
  {
    slug: '/formations-securite/sst',
    shortTitle: 'SST',
    title: 'Sauveteur secouriste du travail',
    description: 'Maîtriser les gestes de premiers secours et la prévention en entreprise.',
    duration: '14 h',
    modality: 'Présentiel',
    location: 'Puget-sur-Argens',
    financing: 'Entreprise · Personnel',
    nextSession: 'Dates sur demande',
    visual: 'sst',
  },
  {
    slug: '/formations-securite/a3p-apr',
    shortTitle: 'A3P',
    title: 'Agent de protection physique des personnes',
    description: 'Préparer et sécuriser les déplacements de personnes exposées.',
    duration: '327 h',
    modality: 'Présentiel',
    location: 'Puget-sur-Argens',
    financing: 'CPF · France Travail',
    nextSession: '1er septembre 2026',
    visual: 'a3p',
  },
  {
    slug: '/formations-securite/desp',
    shortTitle: 'DESP',
    title: 'Dirigeant d’entreprise de sécurité privée',
    description: 'Créer, reprendre ou piloter une entreprise de sécurité privée.',
    duration: '245 h',
    modality: 'Hybride · VAE',
    location: '3 campus + distanciel',
    financing: 'CPF · France Travail',
    nextSession: 'Selon le parcours',
    visual: 'desp',
  },
];

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
  ['400 m²', 'Campus principal'],
  ['Qualiopi', 'Certification qualité'],
  ['CNAPS · ADEF', 'Agréments métiers'],
  ['3 centres', 'Selon les sessions'],
] as const;

export default function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <span className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.heroCopy}>
            <span className={styles.heroBadge}><i aria-hidden="true" /> Intégrale Academy · fondée en 2018</span>
            <h1>Votre futur métier mérite une formation <em>à la hauteur.</em></h1>
            <p>Des parcours concrets, des formateurs issus du terrain et une équipe qui vous accompagne réellement — du choix de la formation jusqu’à votre projet professionnel.</p>
            <div className={styles.heroActions}>
              <Link href="#formations-securite" className={styles.primaryButton}>Trouver ma formation <span aria-hidden="true">→</span></Link>
              <Link href="/planning" className={styles.goldButton}>Voir le planning</Link>
            </div>
            <div className={styles.heroProofs} aria-label="Points forts d’Intégrale Academy">
              <span>Formations réglementées</span>
              <span>Financements possibles</span>
              <span>Côte d’Azur · Paris · Centre France</span>
            </div>
          </div>

          <div id="assistant-orientation" className={`${styles.assistantDock} scroll-mt-28`}>
            <OrientationAssistant variant="homeDock" />
          </div>
        </div>
      </section>

      <section className={styles.journey}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span>Préparez votre inscription</span>
              <h2>Quatre étapes. Une équipe à chaque étape.</h2>
            </div>
            <p>La page vous guide sans vous demander de comprendre seul les financements, les prérequis ou les démarches administratives.</p>
          </div>

          <div className={styles.journeyGrid}>
            <article className={styles.journeyLead}>
              <span className={styles.cardEyebrow}>Votre parcours Intégrale Academy</span>
              <h3>Vous avancez avec un plan clair.</h3>
              <p>Commencez par choisir un métier. Nous vous aidons ensuite à vérifier les conditions, trouver une solution de financement et préparer votre inscription.</p>
              <div className={styles.journeySteps}>
                <span>01 · Choisir</span><span>02 · Financer</span><span>03 · S’inscrire</span><span>04 · Se former</span>
              </div>
            </article>

            <div className={styles.journeyCards}>
              {journeyCards.map((card) => (
                <Link key={card.number} href={card.href} className={`${styles.journeyCard} ${styles[card.tone]}`}>
                  <span className={styles.journeyIcon}>{card.icon}</span>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <span className={styles.cardArrow} aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <VisualSection tone="security">
        <section id="formations-securite" className="scroll-mt-28 page-container py-14 md:py-16">
          <div data-security-training-heading data-training-heading className={styles.securityTrainingHeading}>
            <div>
              <span className={styles.securityTrainingEyebrow}>Formations en sécurité privée</span>
              <h2>Trouvez la formation adaptée à votre projet.</h2>
              <p>Comparez les durées, les modalités, les lieux et les prochaines sessions en un seul regard.</p>
            </div>
            <div className={styles.securityTrainingActions}>
              <Link href="/formations-securite" className={styles.securityTrainingSecondary}>Comparer les formations</Link>
              <Link href="/planning" className={styles.securityTrainingPrimary}>Voir le planning <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <SecurityTrainingGrid items={securityHighlights} />
        </section>
      </VisualSection>

      <VisualSection tone="vtc">
        <section className="page-container py-14 md:py-16">
          <div data-training-heading>
            <SectionTitle eyebrow="2. Chauffeur VTC" title={<>Devenez chauffeur VTC avec une <Highlight>formation complète</Highlight></>}>
              Préparez l’examen et votre future activité grâce à un parcours tout inclus qui associe théorie en e-learning et pratique en présentiel.
            </SectionTitle>
          </div>
          <VtcTrainingCard title={vtcFormation.title} description="Maîtrisez la réglementation, la conduite professionnelle et la relation client avec un accompagnement conçu pour réussir l’examen VTC." duration={vtcFormation.duration} href={vtcFormation.slug} />
        </section>
      </VisualSection>

      <VisualSection tone="bts">
        <section id="bts" className="scroll-mt-28 page-container py-14 md:py-16">
          <div data-training-heading className={styles.securityTrainingHeading}>
            <div>
              <span className={styles.securityTrainingEyebrow}>BTS en alternance</span>
              <h2>Trouvez le BTS adapté à votre projet.</h2>
              <p>Six diplômes d’État pour construire un projet solide, en présentiel à Puget-sur-Argens ou 100 % à distance en visioconférence.</p>
            </div>
            <div className={styles.securityTrainingActions}>
              <Link href="/bts" className={styles.securityTrainingSecondary}>Comparer les BTS</Link>
              <Link href="/planning" className={styles.securityTrainingPrimary}>Voir les rentrées <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <BtsTrainingGrid items={btsHighlights} />
        </section>
      </VisualSection>

      <section className={styles.proofBar} aria-label="Chiffres et reconnaissances">
        <div className={styles.container}><div className={styles.proofGrid}>{proofItems.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}</div></div>
      </section>

      <CampusSection />
      <GoogleReviewsSection />
      <PremiumFAQSection badge="FAQ" title="Questions fréquentes" description="Retrouvez les réponses aux questions les plus courantes sur nos formations, les financements, les inscriptions et l’accompagnement Intégrale Academy." items={globalFaq} contactHref="/contact" />
    </div>
  );
}
