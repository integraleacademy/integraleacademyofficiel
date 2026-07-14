import { VaeEligibilityModal } from '@/components/VaeEligibilityModal';
import { PublicTrainingSessions, isPublicUpcomingSession } from '@/components/PublicTrainingSessions';
import { Button, ConversionStrip, FAQ, FeatureCard, SectionTitle } from '@/components/ui';
import { DespHero } from '@/components/DespHero';
import { listSessions } from '@/lib/training-data';
import { formationFaq } from '@/data/faq';
import { despVaeAdmin, despVaeFaq } from '@/data/despVae';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'DESP VAE - Validation acquis dirigeant sécurité privée',
  description: 'DESP en VAE RNCP 40385 : accompagnement dossier de preuves, dossier de validation et jury pour profils expérimentés en sécurité privée.',
};

const objectives = [
  'Analyser votre expérience et vérifier sa cohérence avec le référentiel DESP.',
  'Constituer un dossier de preuves solide pour la validation des acquis.',
  'Préparer la rédaction du dossier de validation et le passage devant le jury de certification.',
];

const accompaniment = [
  'diagnostic initial', 'aide à l’identification des compétences', 'construction du calendrier', 'aide au dossier de faisabilité', 'aide à la sélection des expériences', 'méthodologie de rédaction', 'relecture et retours pédagogiques', 'organisation des preuves', 'préparation de la présentation orale', 'simulation de jury', 'suivi administratif',
];

const evaluation = [
  'Étude du dossier de validation.',
  'Échange avec le jury de certification selon la convocation du certificateur.',
  'L’offre proposée vise une VAE totale du titre DESP. Les cinq activités du référentiel doivent être validées pour obtenir la certification complète.',
  'En l’absence de validation complète, la décision et les éventuelles préconisations relèvent exclusivement du jury et du certificateur.',
];

const outcomes = [
  'Reconnaissance du titre RNCP40385 de niveau 5 par la VAE.',
  'Demande d’agrément dirigeant auprès du CNAPS après obtention du titre.',
  'Valorisation officielle de l’expérience professionnelle.',
];

const why = [
  'Parcours adapté aux profils déjà expérimentés.',
  'Accompagnement ciblé sur les preuves, le dossier de faisabilité, le dossier de validation et le jury.',
  'Démarche adaptée lorsque l’expérience couvre déjà les compétences du titre.',
];

const profiles = ['dirigeants ou anciens dirigeants d’une entreprise', 'associés d’une entreprise de sécurité privée', 'directeurs d’agence', 'responsables d’exploitation', 'responsables sécurité', 'responsables administratifs, commerciaux ou financiers', 'managers ayant exercé des responsabilités importantes', 'créateurs ou repreneurs disposant déjà d’une expérience concrète', 'professionnels ayant piloté des équipes et des prestations'];
const domains = ['cadrage d’un projet de création ou de reprise', 'conformité réglementaire de la sécurité privée', 'gestion financière, juridique et administrative', 'gestion marketing et commerciale', 'recrutement, management et pilotage des équipes'];
const steps = [
  ['Étape 1 — Diagnostic du parcours', 'Un conseiller analyse les fonctions exercées, les responsabilités, la durée et la nature des expériences ainsi que les preuves disponibles.'],
  ['Étape 2 — Dossier de faisabilité', 'Le candidat décrit son parcours et les activités en lien avec le DESP afin de demander officiellement la recevabilité de sa démarche.'],
  ['Étape 3 — Décision de recevabilité', 'Le certificateur étudie le dossier. Une décision favorable autorise la poursuite du parcours, mais ne garantit pas la délivrance du titre.'],
  ['Étape 4 — Dossier de validation', 'Le candidat décrit précisément des situations professionnelles réelles et démontre les compétences mobilisées dans chacun des cinq domaines du référentiel.'],
  ['Étape 5 — Préparation du jury', 'L’accompagnement permet de structurer la présentation, anticiper les questions et expliquer clairement les choix professionnels réalisés.'],
  ['Étape 6 — Jury de certification', 'Le jury étudie le dossier et interroge le candidat sur ses expériences, ses décisions et sa maîtrise des compétences attendues.'],
];
const proofs = [
  ['Création ou reprise', ['business plan', 'étude de marché', 'statuts', 'prévisionnel', 'plan de financement', 'documents de création ou de reprise']],
  ['Réglementation et CNAPS', ['agréments et autorisations', 'procédures internes', 'contrôles de cartes professionnelles', 'contrats de sous-traitance', 'documents de conformité', 'consignes réglementaires']],
  ['Gestion financière et administrative', ['budgets', 'tableaux de bord', 'factures', 'éléments comptables', 'suivi de trésorerie', 'contrats', 'attestations d’assurance']],
  ['Développement commercial', ['propositions commerciales', 'devis', 'réponses à des appels d’offres', 'plans de prospection', 'supports de communication', 'suivi de clientèle']],
  ['Management', ['organigrammes', 'plannings', 'fiches de poste', 'processus de recrutement', 'entretiens', 'évaluations', 'plans de formation', 'procédures disciplinaires']],
];
const juryTopics = ['son projet d’entreprise', 'la réglementation de la sécurité privée', 'les démarches CNAPS', 'ses choix financiers', 'la gestion administrative', 'les ressources humaines', 'la stratégie commerciale', 'les appels d’offres', 'la gestion des clients', 'les situations difficiles rencontrées'];
const afterValidation = ['Obtention du titre RNCP40385 de niveau 5', 'Demande d’agrément dirigeant auprès du CNAPS', 'Demande d’autorisation d’exercice de l’entreprise', 'Démarrage de l’activité après obtention des autorisations nécessaires'];

async function getSessions(){return (await listSessions()).filter((session:any)=>isPublicUpcomingSession(session)&&['desp-vae','desp-dssp','desp'].includes(session.training?.slug));}

export default async function DespVaePage(){
  const sessions = await getSessions();
  const includedEntries = Object.entries(despVaeAdmin.included).filter(([,value])=>Boolean(value));
  return <>
    <DespHero variant="vae" title="DESP en VAE : valorisez votre expérience de dirigeant sécurité privée" subtitle={<><p>Faites reconnaître officiellement les compétences acquises en management, création, gestion ou direction grâce à un accompagnement VAE centré sur vos preuves et votre dossier.</p><p>La VAE ne remplace pas automatiquement le jury : elle vous aide à démontrer que votre expérience couvre les activités attendues du titre RNCP DESP.</p></>} stats={[["Format","VAE","accompagnement individualisé"],["Durée","Variable","selon dossier et jury"],["Tarif",despVaeAdmin.price,"accompagnement actuel"],["Lieu","Distance","jury selon convocation"],["RNCP",despVaeAdmin.rncp,despVaeAdmin.level],["Objectif","Titre DESP","validation totale visée"]]} sessions={sessions}/>
    <section className="page-container py-10"><div className="grid gap-4 md:grid-cols-3"><FeatureCard title="Durée">{despVaeAdmin.duration}<br/><br/>{despVaeAdmin.durationNote}</FeatureCard><FeatureCard title="Public concerné">Profils expérimentés en sécurité, encadrement, gestion, création ou direction d’entreprise.</FeatureCard><FeatureCard title="Prérequis">Expérience justifiée en management, création, gestion d’entreprise ou responsabilités proches du référentiel DESP.</FeatureCard><FeatureCard title="Lieux">Accompagnement VAE possible en visioconférence ; jury selon convocation. L’accompagnement peut être réalisé à distance selon l’organisation convenue. Le lieu, la date et le format du jury dépendent de la convocation du certificateur.</FeatureCard><FeatureCard title="Financement">CPF, entreprise, OPCO, France Travail ou financement personnel selon dossier.</FeatureCard><FeatureCard title="Certification / examen">Titre RNCP Dirigeant d’entreprise de sécurité privée – niveau 5<br/><br/>La certification permet de justifier de l’aptitude professionnelle nécessaire à la demande d’agrément dirigeant. L’agrément est ensuite délivré séparément par le CNAPS après étude du dossier.<br/><br/>{despVaeAdmin.rncp} · {despVaeAdmin.level} · Certificateur : {despVaeAdmin.certifier} · Échéance actuelle : {despVaeAdmin.deadline}<br/>Tarif actuel de l’accompagnement : {despVaeAdmin.price}</FeatureCard></div></section>
    <section className="page-container py-8"><div className="rounded-[2rem] border border-academy-gold/35 bg-gradient-to-br from-academy-gold-soft via-academy-gold to-academy-gold-soft p-7 text-academy-gold-text shadow-gold"><p className="text-xs font-black uppercase tracking-[.22em] text-academy-muted">Test rapide</p><h2 className="mt-3 text-3xl font-black">Tester mon éligibilité à la VAE</h2><p className="mt-4 leading-7 font-semibold text-academy-gold-text/85">Répondez à quelques questions pour savoir si votre profil semble compatible avec une démarche VAE DESP.</p><div className="mt-7"><VaeEligibilityModal/></div></div></section>
    <TextBlock eyebrow="Comprendre" title="Obtenir le DESP grâce à votre expérience"><p>La Validation des acquis de l’expérience permet de faire reconnaître officiellement les compétences acquises au cours de votre parcours professionnel ou extra-professionnel.</p><p>Elle ne consiste pas à suivre les 245 heures de la formation initiale. Le candidat doit démontrer, à l’aide de situations réelles et de preuves, qu’il maîtrise les compétences attendues d’un dirigeant d’entreprise de sécurité privée.</p><Note>La VAE n’est ni une équivalence automatique, ni un raccourci fondé uniquement sur le nombre d’années d’expérience. La décision appartient au jury de certification.</Note></TextBlock>
    <Info title="À qui s’adresse la VAE DESP ?" items={profiles}/><TextBlock title="Recevabilité"><p>Il n’existe pas de durée minimale générale d’expérience pour engager une VAE. La recevabilité dépend avant tout du lien direct entre les activités réellement exercées et le référentiel du titre.</p></TextBlock>
    <Info title="Les cinq domaines à maîtriser" intro="Le candidat doit pouvoir démontrer une expérience significative dans les domaines suivants :" items={domains}/><TextBlock title="Point de vigilance"><p>Une expérience limitée à l’activité opérationnelle d’agent de sécurité ne suffit généralement pas à démontrer les compétences de direction, de gestion, de commerce et de management attendues.</p></TextBlock>
    <Info title="Le parcours VAE en six étapes" items={steps.map(([title,text])=>`${title} — ${text}`)}/>
    <section className="page-container py-8"><h2 className="text-2xl font-black">Quelles preuves fournir ?</h2><div className="mt-5 grid gap-4 md:grid-cols-2">{proofs.map(([title,items])=><FeatureCard key={title as string} title={title as string}>{(items as string[]).join(' · ')}</FeatureCard>)}</div><Note>Les preuves doivent être authentiques, compréhensibles et directement liées aux activités décrites.</Note><Note>Les données personnelles, informations sensibles, noms de clients, tarifs confidentiels et éléments relevant du secret des affaires doivent être anonymisés lorsque cela est nécessaire.</Note></section>
    <section id="comparatif-initial-vae" className="page-container py-8"><h2 className="text-2xl font-black">Comparer DESP initial et DESP VAE</h2><div className="mt-5 grid gap-4 md:grid-cols-2"><FeatureCard title="DESP initial">destiné aux personnes devant acquérir les compétences · 245 heures de formation · cours, études de cas et évaluations · parcours à distance et en présentiel.</FeatureCard><FeatureCard title="DESP VAE">destiné aux personnes maîtrisant déjà les compétences · pas de formation initiale de 245 heures · dossier fondé sur des expériences réelles · accompagnement à l’analyse et à la rédaction · présentation devant un jury.</FeatureCard></div><Note>Lorsque l’expérience ne couvre pas suffisamment les cinq activités du titre, la formation initiale est généralement plus adaptée.</Note><div className="mt-5"><Button href="/contact">Faire étudier mon parcours</Button></div></section>
    <PublicTrainingSessions sessions={sessions} title="Prochaines dates DESP VAE" intro="Les véritables dates de jury VAE proviennent de l’administration. Dates, lieux, formats, tarifs et places restantes sont affichés lorsqu’ils sont administrés."/>
    <ConversionStrip/>
    <Info title="Objectifs de la formation" items={objectives}/>
    <Info title="Accompagnement VAE" items={accompaniment}/><TextBlock title="Rôle de l’accompagnateur"><p>L’accompagnateur aide le candidat à analyser et présenter son expérience. Il ne rédige pas le dossier à sa place et ne peut pas garantir la décision du jury.</p></TextBlock>
    <section className="page-container py-8"><h2 className="text-2xl font-black">Ce qui est inclus dans les {despVaeAdmin.price}</h2>{includedEntries.length>0 ? <div className="mt-5 grid gap-3">{includedEntries.map(([key,value])=><FeatureCard key={key} title={key}>{String(value)}</FeatureCard>)}</div> : <Note>Un devis détaillé précisant les prestations incluses est remis avant tout engagement.</Note>}</section>
    <TextBlock title="Comment se déroule le jury VAE ?"><p>Le jury étudie le dossier de validation puis échange avec le candidat afin de vérifier que les compétences présentées correspondent à celles du titre DESP.</p><p>Le jury peut notamment interroger le candidat sur : {juryTopics.join(', ')}.</p><p>Le jury est composé de trois professionnels extérieurs au certificateur, indépendants du parcours et du candidat.</p></TextBlock>
    <Info title="Modalités d’évaluation" items={evaluation}/>
    <Info title="Débouchés" items={outcomes}/>
    <Info title="Après la validation du titre" items={afterValidation}/><TextBlock title="Titre, agrément et autorisation"><Note>Le titre DESP, l’agrément personnel du dirigeant et l’autorisation d’exercice de l’entreprise sont trois éléments distincts.</Note><p>La réussite de la VAE ne garantit pas automatiquement l’agrément CNAPS. Le CNAPS vérifie séparément les conditions de nationalité, d’honorabilité, d’aptitude professionnelle et les autres conditions réglementaires.</p></TextBlock>
    <section className="page-container py-8"><h2 className="text-2xl font-black">Financements</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{despVaeAdmin.financing.map(item=><FeatureCard key={item} title={item}>{item}</FeatureCard>)}</div><Note>Le financement porte sur les prestations prévues au devis. Il ne signifie pas que la recevabilité ou la réussite devant le jury est garantie.</Note><div className="mt-5"><Button href="/contact">Recevoir un devis VAE personnalisé</Button></div></section>
    <TextBlock title="Accessibilité"><p>Intégrale Academy étudie les besoins d’adaptation de chaque candidat, notamment pour les rendez-vous, les outils numériques et la préparation du jury.</p><p>Référent handicap : {despVaeAdmin.accessibilityReferent.name} · {despVaeAdmin.accessibilityReferent.email} · {despVaeAdmin.accessibilityReferent.phone}</p></TextBlock>
    <Info title="Pourquoi suivre cette VAE chez Intégrale Academy" items={why}/>
    <section className="page-container py-10"><SectionTitle title="FAQ formation"/><FAQ items={[...formationFaq, ...despVaeFaq]}/></section>
    <section className="page-container py-8"><div className="grid gap-4 rounded-[2rem] bg-academy-surface p-5 shadow-soft ring-1 ring-academy-line md:grid-cols-[1fr_auto]"><div><b className="text-academy-ink">Cassandre vous accompagne dans votre choix</b><p className="mt-1 text-sm text-academy-muted">Cassandre étudie votre expérience, vous aide à choisir entre le DESP initial et la VAE et vous présente les modalités d’accompagnement et de financement.</p></div><div className="flex flex-wrap items-center gap-2"><VaeEligibilityModal label="Tester mon éligibilité"/><Button href="/contact" variant="secondary">Recevoir un devis VAE</Button><Button href="tel:0422470768" variant="ghost">Réserver un rendez-vous téléphonique</Button></div></div></section>
  </>
}

function Info({title,items,intro}:{title:string;items:string[];intro?:string}){return <section className="page-container py-8"><h2 className="text-2xl font-black">{title}</h2>{intro&&<p className="mt-3 text-academy-muted">{intro}</p>}<div className="mt-5 grid gap-3">{items.map(i=><div key={i} className="rounded-2xl bg-academy-surface p-4 ring-1 ring-academy-line"><p className="mt-2 text-academy-muted">{i}</p></div>)}</div></section>}
function TextBlock({eyebrow,title,children}:{eyebrow?:string;title:string;children:React.ReactNode}){return <section className="page-container py-8"><div className="rounded-[2rem] border border-academy-line bg-academy-surface p-6 shadow-card"><>{eyebrow&&<p className="text-xs font-black uppercase tracking-[.22em] text-academy-gold">{eyebrow}</p>}<h2 className="mt-2 text-2xl font-black">{title}</h2><div className="mt-4 space-y-4 text-academy-muted">{children}</div></></div></section>}
function Note({children}:{children:React.ReactNode}){return <p className="mt-5 rounded-2xl bg-academy-bg p-4 font-semibold leading-7 text-academy-muted ring-1 ring-academy-line">{children}</p>}
