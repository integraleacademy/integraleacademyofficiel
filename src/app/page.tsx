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
    title: 'Formation Agent de Prévention et de Sécurité (APS)',
    description: 'Apprenez à prévenir les risques, surveiller les sites et protéger les personnes afin d’exercer comme agent de sécurité privée.',
    duration: '5 semaines - 175 heures',
    visual: 'aps',
  },
  {
    slug: '/formations-securite/ssiap-1',
    title: 'Formation SSIAP 1 - Agent de sécurité incendie',
    description: 'Prévenez les risques d’incendie, surveillez les installations et intervenez dans les ERP et les IGH.',
    duration: '2 semaines - 70 heures',
    visual: 'ssiap',
  },
  {
    slug: '/formations-securite/sst',
    title: 'Formation Sauveteur Secouriste du Travail (SST)',
    description: 'Acquérez les gestes de premiers secours et contribuez à la prévention des risques professionnels en entreprise.',
    duration: '2 jours - 14 heures',
    visual: 'sst',
  },
  {
    slug: '/formations-securite/a3p-apr',
    title: 'Formation Agent de Protection Physique des Personnes (A3P)',
    description: 'Préparez et sécurisez les déplacements de personnes exposées grâce à des techniques professionnelles de protection rapprochée.',
    duration: '9 semaines - 327 heures',
    visual: 'a3p',
  },
  {
    slug: '/formations-securite/desp',
    title: "Formation Dirigeant d'une entreprise de sécurité privée (DESP)",
    description: 'Acquérez les compétences juridiques, commerciales et managériales pour créer ou diriger une entreprise de sécurité privée, en parcours initial ou par la VAE.',
    duration: 'Initial : 7 semaines - 245 heures',
    secondaryDuration: 'VAE : environ 1 mois',
    visual: 'desp',
  },
];

const btsHighlights: BtsTrainingHighlight[] = [
  {
    slug: '/bts/mos',
    title: 'BTS Management Opérationnel de la Sécurité (MOS)',
    description: 'Apprenez à organiser des prestations de sécurité, coordonner les équipes et suivre la relation client sur le terrain.',
    modality: 'En présentiel OU à distance',
    tags: ['Sécurité', 'Alternance'],
    visual: 'mos',
  },
  {
    slug: '/bts/mco',
    title: 'BTS Management Commercial Opérationnel (MCO)',
    description: 'Développez la vente, la relation client et le management pour piloter efficacement une unité commerciale.',
    modality: 'En présentiel OU à distance',
    tags: ['Commerce', 'Alternance', 'Relation client'],
    visual: 'mco',
  },
  {
    slug: '/bts/ndrc',
    title: 'BTS Négociation et Digitalisation de la Relation Client (NDRC)',
    description: 'Maîtrisez la prospection, la négociation et la fidélisation, en face à face comme sur les canaux digitaux.',
    modality: 'En présentiel OU à distance',
    tags: ['Vente', 'Digital', 'Alternance'],
    visual: 'ndrc',
  },
  {
    slug: '/bts/commerce-international',
    title: 'BTS Commerce International (CI)',
    description: 'Préparez-vous à développer des marchés, gérer l’import-export et coordonner des opérations à l’international.',
    modality: 'En présentiel OU à distance',
    tags: ['International', 'Import-export', 'Alternance'],
    visual: 'ci',
  },
  {
    slug: '/bts/professions-immobilieres',
    title: 'BTS Professions Immobilières (PI)',
    description: 'Formez-vous à la transaction, à la gestion locative, à la copropriété et au conseil immobilier.',
    modality: 'En présentiel OU à distance',
    tags: ['Immobilier', 'Gestion', 'Alternance'],
    visual: 'pi',
  },
  {
    slug: '/bts/comptabilite-gestion',
    title: 'BTS Comptabilité et Gestion (CG)',
    description: 'Un futur parcours 100 % à distance pour maîtriser la comptabilité, la gestion et le pilotage financier.',
    modality: '100 % à distance uniquement',
    tags: ['Comptabilité', 'Prochainement'],
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

          <div className={styles.assistantDock}>
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
          <div data-security-training-heading data-training-heading>
            <SectionTitle eyebrow="1. Sécurité privée" title={<>Formations professionnelles <span className="block"><Highlight>Métiers de la sécurité privée</Highlight></span></>}>
              Des parcours concrets et encadrés pour exercer dans la surveillance, la sécurité incendie, le secourisme, la protection rapprochée ou la direction d’entreprise.
            </SectionTitle>
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
          <div data-training-heading>
            <SectionTitle eyebrow="3. BTS en alternance" title={<>Préparez votre avenir avec un <Highlight>BTS en alternance</Highlight></>}>
              Explorez six diplômes d’État orientés vers l’emploi, avec une expérience concrète en entreprise ou un parcours à distance selon la formation.
            </SectionTitle>
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
