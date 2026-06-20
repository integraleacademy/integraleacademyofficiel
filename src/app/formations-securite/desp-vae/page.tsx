import { VaeEligibilityModal } from '@/components/VaeEligibilityModal';
import { PublicTrainingSessions, isPublicUpcomingSession } from '@/components/PublicTrainingSessions';
import { Button, ConversionStrip, FAQ, FeatureCard, Hero, SectionTitle } from '@/components/ui';
import { listSessions } from '@/lib/training-data';
import { formationFaq } from '@/data/faq';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'DESP VAE - Validation acquis dirigeant sécurité privée',
  description: 'DESP en VAE RNCP 40385 : accompagnement dossier de preuves, livret VAE et jury pour profils expérimentés en sécurité privée.',
};

const objectives = [
  'Analyser votre expérience et vérifier sa cohérence avec le référentiel DESP.',
  'Constituer un dossier de preuves solide pour la validation des acquis.',
  'Préparer la rédaction du livret VAE et le passage devant le jury.',
];

const program = [
  'Diagnostic du parcours, des missions et des responsabilités exercées.',
  'Sélection et organisation des preuves professionnelles.',
  'Accompagnement à la rédaction du livret VAE.',
  'Préparation orale au jury de certification.',
];

const evaluation = [
  'Étude du dossier de preuves et du livret VAE.',
  'Entretien ou passage devant le jury selon convocation.',
  'Validation totale ou partielle selon les compétences démontrées.',
];

const outcomes = [
  'Reconnaissance du titre DESP par la VAE.',
  'Dirigeant d’entreprise de sécurité privée après validation et démarches CNAPS.',
  'Valorisation officielle de l’expérience professionnelle.',
];

const why = [
  'Parcours adapté aux profils déjà expérimentés.',
  'Accompagnement ciblé sur les preuves, le livret et le jury.',
  'Démarche plus courte qu’une formation initiale lorsque l’expérience est suffisante.',
];

async function getSessions(){return (await listSessions()).filter((session:any)=>isPublicUpcomingSession(session)&&['desp-vae','desp-dssp','desp'].includes(session.training?.slug));}

export default async function DespVaePage(){
  const sessions = await getSessions();
  return <>
    <Hero badge="DESP · VAE · RNCP n°40385" title="DESP en VAE" subtitle="Le parcours VAE pour faire reconnaître officiellement votre expérience en management, création, gestion ou direction." actions={<><Button href="/contact">Inscription / devis</Button><Button href="/formations-securite/desp" variant="secondary">Comparer initial et VAE</Button></>}/>
    <section className="mx-auto max-w-7xl px-4 py-10"><div className="grid gap-4 md:grid-cols-3"><FeatureCard title="Durée">Environ 1 mois</FeatureCard><FeatureCard title="Public concerné">Profils expérimentés en sécurité, encadrement, gestion, création ou direction d’entreprise.</FeatureCard><FeatureCard title="Prérequis">Expérience justifiée en management, création, gestion d’entreprise ou responsabilités proches du référentiel DESP.</FeatureCard><FeatureCard title="Lieux">Accompagnement VAE possible en visioconférence ; jury selon convocation.</FeatureCard><FeatureCard title="Financement">CPF, entreprise, France Travail ou financement personnel selon dossier.</FeatureCard><FeatureCard title="Certification / examen">DESP · RNCP n°40385 · agrément dirigeant CNAPS<br/>Tarif : 3800 €</FeatureCard></div></section>
    <section className="mx-auto max-w-5xl px-4 py-8"><div className="rounded-[2rem] border border-academy-gold/35 bg-gradient-to-br from-academy-gold-soft via-academy-gold to-academy-gold-soft p-7 text-academy-gold-text shadow-gold"><p className="text-xs font-black uppercase tracking-[.22em] text-academy-muted">Test rapide</p><h2 className="mt-3 text-3xl font-black">Tester mon éligibilité à la VAE</h2><p className="mt-4 leading-7 font-semibold text-academy-gold-text/85">Répondez à quelques questions pour savoir si votre profil semble compatible avec une démarche VAE DESP.</p><div className="mt-7"><VaeEligibilityModal/></div></div></section>
    <PublicTrainingSessions sessions={sessions} title="Prochaines dates DESP VAE" intro="Dates, lieux, tarifs et places restantes proviennent directement de l’administration."/>
    <ConversionStrip/>
    <Info title="Objectifs de la formation" items={objectives}/>
    <Info title="Accompagnement VAE" items={program}/>
    <Info title="Modalités d’évaluation" items={evaluation}/>
    <Info title="Débouchés" items={outcomes}/>
    <Info title="Pourquoi suivre cette VAE chez Intégrale Academy" items={why}/>
    <section className="px-4 py-10"><SectionTitle title="FAQ formation"/><FAQ items={formationFaq}/></section>
  </>
}

function Info({title,items}:{title:string;items:string[]}){return <section className="mx-auto max-w-5xl px-4 py-8"><h2 className="text-2xl font-black">{title}</h2><div className="mt-5 grid gap-3">{items.map(i=><div key={i} className="rounded-2xl bg-academy-surface p-4 ring-1 ring-academy-line"><p className="mt-2 text-academy-muted">{i}</p></div>)}</div></section>}
