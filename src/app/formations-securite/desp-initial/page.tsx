import { Button, ConversionStrip, FAQ, FeatureCard, Hero, SectionTitle } from '@/components/ui';
import { formationFaq } from '@/data/faq';

export const metadata = {
  title: 'Formation DESP initial - Dirigeant sécurité privée',
  description: 'Formation DESP initial RNCP 40385 : 245 h pour préparer l’agrément dirigeant CNAPS et créer, reprendre ou diriger une entreprise de sécurité privée.',
};

const objectives = [
  'Préparer l’agrément dirigeant CNAPS.',
  'Acquérir les bases juridiques, réglementaires et opérationnelles de la sécurité privée.',
  'Apprendre à piloter la gestion, le management et l’organisation d’une entreprise.',
];

const program = [
  'Cadre juridique de la sécurité privée et obligations du dirigeant.',
  'Management, gestion et organisation d’une entreprise de sécurité privée.',
  'Supports de cours, entraînements, évaluations et préparation au jury.',
  'Création, reprise, pilotage commercial et administratif d’une structure.',
];

const evaluation = [
  'QCU de connaissances selon le référentiel DESP.',
  'Mises en situation professionnelles de création, reprise, gestion, marketing et management.',
  'Passage devant un jury professionnel.',
];

const outcomes = [
  'Dirigeant d’entreprise de sécurité privée.',
  'Créateur ou repreneur d’entreprise agréée.',
  'Responsable ou manager d’activité sécurité privée.',
];

const why = [
  'Parcours structuré pour apprendre le métier étape par étape.',
  'Modalités hybrides avec centres Paris, Côte d’Azur et Aurillac selon planning.',
  'Accompagnement pédagogique et administratif jusqu’à l’examen.',
];

export default function DespInitialPage(){
  return <>
    <Hero badge="DESP · RNCP n°40385" title="Formation DESP initial" subtitle="Le parcours initial pour apprendre étape par étape à créer, reprendre ou diriger une entreprise de sécurité privée." actions={<><Button href="/contact">Inscription / devis</Button><Button href="/formations-securite/desp" variant="secondary">Comparer initial et VAE</Button></>}/>
    <section className="mx-auto max-w-7xl px-4 py-10"><div className="grid gap-4 md:grid-cols-3"><FeatureCard title="Durée">7 semaines · 245 heures</FeatureCard><FeatureCard title="Public concerné">Candidats souhaitant acquérir ou consolider les compétences de dirigeant en sécurité privée.</FeatureCard><FeatureCard title="Prérequis">Niveau 4 ou expérience à valider avec l’équipe admissions ; conditions CNAPS et honorabilité à vérifier.</FeatureCard><FeatureCard title="Lieux">Distanciel + présentiel à Paris, Puget-sur-Argens ou Aurillac selon les sessions.</FeatureCard><FeatureCard title="Financement">CPF, France Travail, entreprise ou facilités de paiement selon dossier.</FeatureCard><FeatureCard title="Certification / examen">DESP · RNCP n°40385 · agrément dirigeant CNAPS<br/>Tarif : 4300 €</FeatureCard></div></section>
    <ConversionStrip/>
    <Info title="Objectifs de la formation" items={objectives}/>
    <Info title="Programme détaillé" items={program}/>
    <Info title="Modalités d’évaluation" items={evaluation}/>
    <Info title="Débouchés" items={outcomes}/>
    <Info title="Pourquoi suivre cette formation chez Intégrale Academy" items={why}/>
    <section className="px-4 py-10"><SectionTitle title="FAQ formation"/><FAQ items={formationFaq}/></section>
  </>
}

function Info({title,items}:{title:string;items:string[]}){return <section className="mx-auto max-w-5xl px-4 py-8"><h2 className="text-2xl font-black">{title}</h2><div className="mt-5 grid gap-3">{items.map(i=><div key={i} className="rounded-2xl bg-academy-surface p-4 ring-1 ring-academy-line"><p className="mt-2 text-academy-muted">{i}</p></div>)}</div></section>}
