import { Button, ChatGptAgentBanner, ConversionStrip, FeatureCard, FinancingCard, FormationCard, FullWidthBand, Hero, Highlight, LocationCard, PremiumFAQSection, ProofBar, SectionTitle, StatCard } from '@/components/ui';
import { OrientationAssistant } from '@/components/OrientationAssistant';
import { RecognitionMarquee } from '@/components/RecognitionMarquee';
import { CampusSection } from '@/components/CampusSection';
import { GoogleReviewsSection } from '@/components/GoogleReviewsSection';
import { AnimatedTrainingCTA } from '@/components/AnimatedTrainingCTA';
import { SecurityTrainingGrid, type SecurityTrainingHighlight } from '@/components/SecurityTrainingGrid';
import { BtsTrainingGrid, type BtsTrainingHighlight } from '@/components/BtsTrainingGrid';
import { VtcTrainingCard } from '@/components/VtcTrainingCard';
import { FloatingBadge, VisualSection, VisualTimeline } from '@/components/visuals';
import { globalFaq } from '@/data/faq';
import { contact, vtcFormation } from '@/data/site';

export const metadata={title:'Accueil',description:'Intégrale Academy forme aux métiers de la sécurité privée, sécurité incendie, VTC et BTS en alternance à Puget-sur-Argens, Paris et Aurillac.'};

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

export default function Home(){
  return <>
    <Hero badge="Centre de formation agréé" title={<>Formez-vous aux métiers qui <Highlight>recrutent</Highlight> vraiment.</>} subtitle="Centre de formation professionnelle spécialisé dans la sécurité privée, la sécurité incendie, le VTC et les BTS en alternance." actions={<><Button href="/formations-securite">Voir les formations</Button><Button href="/contact" variant="secondary">Être rappelé</Button><Button href="/contact" variant="ghost">Demander des informations</Button></>} visual={<OrientationAssistant/>}/>
    <AnimatedTrainingCTA/>
    <div className="relative"><FloatingBadge tone="academy" className="right-[8%] top-8"/><ProofBar/></div>
    <RecognitionMarquee/>
    <ConversionStrip/>
    <ChatGptAgentBanner/>
    <FullWidthBand eyebrow="Parcours lisible" title={<>Trois familles de <Highlight>formations certifiantes</Highlight></>} actions={<><Button href="/planning" variant="secondary">Voir le planning</Button><Button href="/tarifs" variant="ghost">Consulter les tarifs</Button></>}>Les formations professionnelles sécurité privée, la formation chauffeur VTC et les BTS en alternance répondent à des objectifs différents. La page d’accueil les présente donc séparément pour vous orienter plus vite.</FullWidthBand>
    <VisualSection tone="academy" className="py-1"><section className="page-container py-12">
      <SectionTitle eyebrow="3 parcours distincts" title="Choisissez d’abord votre famille de formation">Chaque bloc correspond à une demande différente : métier de la sécurité privée, chauffeur VTC ou diplôme BTS en alternance.</SectionTitle>
      <div className="grid gap-5 lg:grid-cols-3">
        <FormationCard title="1. Formations professionnelles métiers de la sécurité privée" desc="APS, SSIAP, A3P/APR, DESP ou CPSP : des parcours certifiants pour exercer, évoluer ou encadrer dans la sécurité privée et la sécurité incendie." href="/formations-securite" tags={['Sécurité privée','Certifications métier']}/>
        <FormationCard title="2. Formation Chauffeur VTC" desc={vtcFormation.short} href={vtcFormation.slug} tags={['VTC','Transport de personnes']}/>
        <FormationCard title="3. BTS en alternance" desc="Des diplômes d’État en alternance, séparés des formations professionnelles courtes : MOS, MCO, NDRC, Commerce International, Immobilier et Comptabilité-Gestion." href="/bts" tags={['Alternance','Diplômes d’État']}/>
      </div><VisualTimeline tone="academy"/>
    </section></VisualSection>
    <VisualSection tone="security"><section id="formations-securite" className="scroll-mt-28 page-container py-14 md:py-16"><div data-security-training-heading><SectionTitle eyebrow="1. Sécurité privée" title={<>Formations professionnelles <span className="block"><Highlight>Métiers de la sécurité privée</Highlight></span></>}>Des parcours concrets et encadrés pour exercer dans la surveillance, la sécurité incendie, le secourisme, la protection rapprochée ou la direction d’entreprise.</SectionTitle></div><SecurityTrainingGrid items={securityHighlights}/></section></VisualSection>
    <VisualSection tone="vtc"><section className="page-container py-14 md:py-16"><SectionTitle eyebrow="2. Chauffeur VTC" title={<>Devenez chauffeur VTC avec une <Highlight>formation complète</Highlight></>}>Préparez l’examen et votre future activité grâce à un parcours tout inclus qui associe théorie en e-learning et pratique en présentiel.</SectionTitle><VtcTrainingCard title={vtcFormation.title} description="Maîtrisez la réglementation, la conduite professionnelle et la relation client avec un accompagnement conçu pour réussir l’examen VTC." duration={vtcFormation.duration} href={vtcFormation.slug}/></section></VisualSection>
    <VisualSection tone="bts"><section id="bts" className="scroll-mt-28 page-container py-14 md:py-16"><SectionTitle eyebrow="3. BTS en alternance" title={<>Préparez votre avenir avec un <Highlight>BTS en alternance</Highlight></>}>Explorez six diplômes d’État orientés vers l’emploi, avec une expérience concrète en entreprise ou un parcours à distance selon la formation.</SectionTitle><BtsTrainingGrid items={btsHighlights}/></section></VisualSection>
    <section className="page-container py-12"><SectionTitle eyebrow="Pourquoi nous choisir" title="Un organisme rassurant pour candidats, financeurs et entreprises"/><div className="grid gap-5 md:grid-cols-3"><FeatureCard title="Agréments et certifications">Qualiopi, CNAPS, ADEF, SSIAP, INRS SST, UAI et références réglementaires affichées pour faciliter les démarches.</FeatureCard><FeatureCard title="Accompagnement candidat">Aide au choix de formation, financement, devis, rappel et préparation à l’inscription.</FeatureCard><FeatureCard title="Approche professionnelle">Pages longues restructurées, informations utiles visibles, CTA clairs et parcours sans friction.</FeatureCard></div></section>
    <FullWidthBand eyebrow="Accompagnement" title={<>Des conseillers vous aident à valider un parcours <Highlight variant="large">finançable à 100%</Highlight></>} tone="gold" actions={<><Button href="/financements" variant="ghost">Explorer les financements</Button><Button href="/contact">Être accompagné</Button></>}>CPF, France Travail, alternance ou OPCO : nous vous orientons selon votre situation avant l’inscription, le devis ou la constitution du dossier.</FullWidthBand>
    <section className="page-container py-12"><SectionTitle eyebrow="Nos centres" title="Paris, Côte d’Azur et Centre France"/><div className="grid gap-5 md:grid-cols-3">{contact.locations.map(l=><LocationCard key={l.name} {...l}/>)}</div></section>
    <CampusSection/>
    <section className="page-container py-12"><SectionTitle eyebrow="Financements" title={<>Des solutions de <Highlight>financement</Highlight> selon votre situation</>}/><div className="grid gap-5 md:grid-cols-4"><FinancingCard title="CPF" href="/financements/cpf">Mobilisable selon éligibilité de la formation.</FinancingCard><FinancingCard title="France Travail" href="/financements/france-travail">Accompagnement possible selon dossier.</FinancingCard><FinancingCard title="Alternance" href="/financements/alternance">BTS gratuits pour apprentis selon prise en charge.</FinancingCard><FinancingCard title="Entreprise / OPCO" href="/entreprises">Former salariés ou recruter un alternant.</FinancingCard></div></section>
    <section className="page-container py-12"><div className="grid gap-4 md:grid-cols-4"><StatCard value="400 m²" label="Dédiés aux enseignements pratiques et théoriques"/><StatCard value="3" label="Implantations disponibles"/><StatCard value="10" label="Parcours formation et BTS présentés"/><StatCard value="08h-19h" label="Standard du lundi au vendredi"/></div></section>
    <GoogleReviewsSection/>
    <FullWidthBand eyebrow="Inscription" title="Une prochaine session peut correspondre à votre projet" tone="light" actions={<><Button href="/contact">Demander des informations</Button><Button href="tel:0422470768" variant="secondary">Appeler</Button></>}>Indiquez votre formation cible, votre ville et votre mode de financement : l’équipe revient vers vous avec les informations utiles.</FullWidthBand>
    <PremiumFAQSection badge="FAQ" title="Questions fréquentes" description="Retrouvez les réponses aux questions les plus courantes sur nos formations, les financements, les inscriptions et l’accompagnement Intégrale Academy." items={globalFaq} contactHref="/contact"/>
  </>
}
