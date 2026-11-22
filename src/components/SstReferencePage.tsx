import { CourseBrochureCard } from '@/components/CourseBrochureCard';
import type { ReactNode } from 'react';
import { TrainingCourseSections, TrainingReferencePage, TrainingReferenceHero, TrainingReferenceSection as Section, TrainingReferenceMissions, TrainingReferenceCampus, TrainingReferenceContact, TrainingReferenceMobileBar } from '@/components/TrainingReferenceLayout';
import { courseReviewCopy, TrainingCourseTestimonials } from '@/components/TrainingCourseTestimonials';
import { TrainingProgramDownload } from '@/components/TrainingProgramDownload';
import { originalArtwork } from '@/data/originalArtwork';
import { sstEditorialArtwork } from '@/data/siteIllustrations';
import { ManualArtwork } from '@/components/ManualArtwork';
import { IntegraleWelcomePack } from '@/components/IntegraleWelcomePack';
import { sstArtwork, sstPracticeArtwork } from '@/data/manualIllustrations';
import { CourseJourney } from '@/components/CourseJourney';
import { serializeCourseJsonLd } from '@/lib/seo';
import Link from 'next/link';
import { TrainingHeroSessionCard } from '@/components/TrainingHero';
import { TrainingSectionNavigation } from '@/components/TrainingSectionNavigation';

import { FaqDirectoryLink } from '@/components/FaqDirectoryLink';
import { TrainingDatesPricingSection, type TrainingDatesPricingSession } from '@/components/TrainingDatesPricingSection';
import { TrainingMotionGallery } from '@/components/TrainingMotionGallery';

import Image from 'next/image';
import { TrainingAdmission, TrainingExamExperience, TrainingOfficialReferences } from './ApsExperienceSections';
import { TrainingEnrollmentSection } from './TrainingEnrollmentSection';
import { TrainingProgramExplorer } from './TrainingProgramExplorer';
import experience from './ApsExperience.module.css';
import layout from './TrainingReferenceLayout.module.css';

const contactHref = (subject = 'inscription') => `/contact?formation=sst&objet=${encodeURIComponent(subject)}`;

const navigationItems = [
  { label: 'Présentation', href: '#role-sst' },
  { label: 'Pratique', href: '#pratique' },
  { label: 'Programme', href: '#programme-sst' },
  { label: 'Évaluation', href: '#evaluation-sst' },
  { label: 'Dates & tarifs', href: '#dates-tarifs' },
  { label: 'Inscription', href: '#inscription-financement' },
  { label: 'Entreprises', href: '#entreprises-sst' },
  { label: 'FAQ', href: '#faq-sst' },
] as const;

const emergencySteps = [
  ['01', 'Protéger', 'Éliminer ou isoler le danger sans s’exposer.'],
  ['02', 'Examiner', 'Observer la victime et rechercher les signes prioritaires.'],
  ['03', 'Alerter', 'Transmettre une alerte claire aux secours adaptés.'],
  ['04', 'Secourir', 'Réaliser les gestes appropriés à l’état de la victime.'],
];

const preventionActions = [
  'Repérer une situation dangereuse',
  'Faire remonter les risques',
  'Participer aux actions de prévention',
];

const sectors = ['Industrie', 'BTP', 'Commerce', 'Bureaux', 'Hôtellerie', 'Logistique', 'Sécurité privée'];

const days = [
  {
    number: '01',
    title: 'Jour 1 · Agir face à l’accident',
    tone: 'green',
    items: [
      'Situer son rôle de SST',
      'Protéger, examiner et alerter',
      'Réagir face à un saignement ou un étouffement',
      'Intervenir face à un malaise',
    ],
  },
  {
    number: '02',
    title: 'Jour 2 · Secourir et prévenir',
    tone: 'coral',
    items: [
      'Brûlures, traumatismes et plaies',
      'Inconscience et position latérale de sécurité',
      'Arrêt cardiaque, massage et défibrillateur',
      'Prévention des risques et évaluation certificative',
    ],
  },
];

const scenarios = [
  ['◒', 'Saignement abondant'],
  ['⌁', 'Étouffement'],
  ['◎', 'Malaise'],
  ['≋', 'Brûlure'],
  ['⌁', 'Traumatisme'],
  ['—', 'Inconscience'],
  ['♡', 'Arrêt cardiaque'],
  ['⚡', 'Défibrillateur'],
];

const trustCards = [
  ['Habilitation INRS', 'H34836/2020/SST-1/O/07'],
  ['Formateur SST certifié', 'dans le dispositif national'],
  ['Petit groupe', '4 à 10 participants'],
  ['Centre de formation', 'Puget-sur-Argens'],
];


function sessionHref(session?: TrainingDatesPricingSession | null) {
  return session?.id ? `/contact?formation=sst&session=${encodeURIComponent(String(session.id))}` : contactHref('prochaines dates');
}

function CTA({ href, children, variant = 'dark', className = '' }: { href: string; children: ReactNode; variant?: 'dark' | 'gold' | 'light' | 'outline' | 'coral'; className?: string }) {
  const styles = {
    dark: 'bg-[#0D1725] text-white hover:bg-black',
    gold: 'bg-academy-gold text-academy-gold-text hover:brightness-105',
    light: 'border border-academy-line bg-white text-academy-ink hover:bg-academy-bg',
    outline: 'border border-white/30 bg-white/5 text-white hover:bg-white/12',
    coral: 'bg-[#F04C3A] text-white hover:bg-[#D93D2D]',
  };
  return <Link href={href} className={`inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-center text-sm font-black transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-academy-gold/25 ${styles[variant]} ${className}`}>{children}</Link>;
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-[.66rem] font-black uppercase tracking-[.24em] ${light ? 'text-emerald-300' : 'text-emerald-800'}`}>{children}</p>;
}

export function SstReferencePage({ sessions }: { sessions: TrainingDatesPricingSession[] }) {
  const next = sessions[0];
  return <TrainingReferencePage theme="green" className={layout.editorialCourse}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeCourseJsonLd({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'Course', name: 'Formation Sauveteur Secouriste du Travail SST', description: 'Formation initiale SST de 14 heures en présentiel à Puget-sur-Argens, prévention des risques et premiers secours en entreprise.', provider: { '@type': 'Organization', name: 'Intégrale Academy', telephone: '04 22 47 07 68' } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: '/' }, { '@type': 'ListItem', position: 2, name: 'Formations sécurité', item: '/formations-securite' }, { '@type': 'ListItem', position: 3, name: 'SST', item: '/formations-securite/sst' }] },
    ] }, "/formations-securite/sst") }} />

    <TrainingReferenceHero
      id="sst" heading="Apprenez les gestes" accent="qui sauvent"
      illustration={sstArtwork.formation} caption="Prévenir, réagir et secourir"
      badge="Formation SST · Habilitation INRS"
      title="Formation sauveteur secouriste du travail"
      tagline="Les bons gestes, au bon moment"
      description={<p>En 2 jours, apprenez à prévenir les risques, réagir face à un accident et porter les premiers secours.</p>}
      primaryAction={{ href: '/documents/programme-sst.pdf', label: 'Consulter le programme ↗', newTab: true }}
    >
      <TrainingHeroSessionCard
        session={next} theme="green" defaultPrice="Sur devis" capacity={10}
        assistantKey="sst" registrationHref={sessionHref(next)}
        approval="Habilitation INRS H34836/2020/SST-1/O/07"
        facts={[
          { label: 'Certification', value: 'Certificat SST', details: ['Sauveteur secouriste du travail', 'Valable pendant 24 mois'] },
          { label: 'Durée et format', value: '14 heures · 2 jours', details: ['100 % présentiel', 'Mises en situation pratiques'] },
          { label: 'Effectif', value: '4 à 10 stagiaires', details: ['Aucun prérequis', 'Accompagnement personnalisé'] },
        ]}
      />
    </TrainingReferenceHero>

    <TrainingSectionNavigation
      mark="SST"
      title="Formation SST"
      items={navigationItems}
      registrationHref={sessionHref(next)}
      registrationLabel="Demander un devis"
      theme="green"
    />


    <CourseJourney course="sst">
      <Section id="role-sst" eyebrow="01 — Le rôle du SST" title={<>Bien plus que des gestes de secours</>} intro={<>Le SST intervient face à un accident et contribue chaque jour à prévenir les risques dans son entreprise.</>}>
        <TrainingReferenceMissions label="Votre rôle" items={[
          { title: 'Face à un accident', description: 'Une méthode claire pour agir sans perdre de temps.', illustration: sstEditorialArtwork.situation, landscapeFocus: '50% 43%',
            body: <div className="grid gap-3 sm:grid-cols-2">{emergencySteps.map(([number, title, text]) => <div key={number} className="rounded-2xl border border-academy-line p-4"><span className="text-xs font-black text-emerald-700">{number}</span><h4 className="mt-2 font-black">{title}</h4><p className="mt-2 text-sm leading-6">{text}</p></div>)}</div> },
          { title: 'Prévenir au quotidien', description: '', illustration: sstEditorialArtwork.prevention, landscapeFocus: '50% 40%',
            body: <div className="space-y-4">{preventionActions.map(item => <p key={item} className="flex gap-3 font-bold"><span className="text-emerald-300">✓</span>{item}</p>)}</div> },
        ]} />
      </Section>
    </CourseJourney>

    <TrainingCourseSections
      admission={
        <Section id="admission" eyebrow="02 — Admission" title="Votre dossier est-il prêt pour le SST ?" tone="stone">
          <TrainingAdmission course="sst" action={contactHref('vérification projet SST')} actionLabel="Vérifier mon projet"
            lead={<><h3>Pour qui ?<br /><em>Salariés, candidats sécurité et entreprises</em></h3><p>Aucun prérequis</p></>}
            note="La formation se déroule en présentiel à Puget-sur-Argens."
            points={[
              { title: 'Public concerné', content: <p>Salariés · Candidats sécurité · Entreprises</p> },
              { title: 'Durée et format', content: <p>14 heures · 2 jours · 100 % présentiel</p> },
              { title: 'Effectif', content: <p>4 à 10 participants · Accompagnement personnalisé</p> },
            ]} steps={<>Échanger avec un conseiller <span>→</span> Demander un devis <span>→</span> Choisir une session</>} />
        </Section>
      }
      immersion={
        <Section id="pratique" eyebrow="03 — Immersion & pédagogie" title="Une pédagogie très concrète" tone="dark"
          intro="Démonstrations, entraînements guidés et scénarios proches de votre environnement de travail.">
          <TrainingMotionGallery variant="sst" illustrations={sstPracticeArtwork} practiceCards={{
            hazard: { icon: '◇', text: emergencySteps[0][2], focus: '50% 37%' },
            examine: { icon: '◎', text: emergencySteps[1][2], focus: '50% 44%' },
            'emergency-call': { icon: '↗', text: emergencySteps[2][2] },
            'first-aid': { icon: '✚', text: emergencySteps[3][2] },
            cpr: { icon: '♡', text: 'S’entraîner sur un mannequin de formation.', focus: '50% 55%' },
            dae: { icon: 'ϟ', text: 'S’exercer à utiliser le défibrillateur avec le formateur.', focus: '50% 55%' },
          }} />
        </Section>
      }
      campus={<TrainingReferenceCampus editorialId="ecole-sst" groupLabel="Par session SST" groupSize="4 à 10" />}
      brochure={<CourseBrochureCard course="sst" />}
      program={
        <Section id="programme-sst" eyebrow="04 — Programme · 2 jours" title={<>14 heures pour savoir quoi faire — vraiment</>}
          intro="Un parcours rythmé par la pratique, les démonstrations et les mises en situation." tone="paper">
          <TrainingProgramExplorer idPrefix="sst-programme" menuTitle="Programme des deux jours" tabListLabel="Jours de formation SST"
            nextLabel="Jour suivant" restartLabel="Revenir au premier jour" hours="14" overview="Deux jours de formation" subtitle="100 % présentiel"
            facts={[['Groupe', '4 à 10'], ['Format', 'Mises en situation'], ['Centre', 'Puget-sur-Argens']]}
            units={days.map(day => ({ number: day.number, title: day.title, items: day.items, delivery: 'Formation en présentiel' }))} />
        </Section>
      }
      format={
        <Section id="format-sst" eyebrow="05 — En présentiel" title="Les situations travaillées" tone="stone">
          <article className="mt-6 grid items-center gap-6 rounded-3xl border border-academy-line bg-white p-5 lg:grid-cols-2 lg:p-8">
            <div className="overflow-hidden rounded-2xl"><ManualArtwork illustration={originalArtwork['sst-pedagogie']} natural /></div><div><h3 className="text-2xl font-black">Entraînement en conditions réelles</h3><div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">{scenarios.map(([icon, title], index) => <div key={title} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center"><span className={`mx-auto grid h-10 w-10 place-items-center text-2xl font-black ${index % 3 === 0 ? 'text-[#bf483b]' : 'text-emerald-700'}`}>{icon}</span><p className="mt-3 text-sm font-black">{title}</p></div>)}</div></div>
          </article>
      <div className="mt-5 grid overflow-hidden rounded-[1.6rem] border border-academy-line bg-white sm:grid-cols-2 lg:grid-cols-4">{[['100 % présentiel', 'Apprenez et pratiquez'], ['Petit groupe · 4 à 10', 'Accompagnement personnalisé'], ['Matériel de simulation', 'Entraînement en conditions réelles']].map(([title, text]) => <div key={title} className="border-b border-academy-line p-5 sm:border-r lg:border-b-0"><p className="font-black">{title}</p><p className="mt-1 text-xs font-semibold text-academy-muted">{text}</p></div>)}<div className="grid place-items-center p-4"><TrainingProgramDownload href="/documents/programme-sst.pdf" course="SST" theme="green" className="w-full" /></div></div>
        </Section>
      }
      pack={<IntegraleWelcomePack course="sst" />}
      exam={
        <Section id="evaluation-sst" eyebrow="06 — Évaluation & certification" title="Des compétences vérifiées, un certificat reconnu" tone="dark"
          intro="L’évaluation se déroule pendant la formation, au plus près des situations rencontrées en entreprise.">
          <div id="examen"><TrainingExamExperience metric="2" label="Épreuves certificatives" description="Comment êtes-vous évalué ?"
            theory={<><p className={experience.kicker}>Questionnement prévention</p><h3>Prévenir<span>Identifier les risques au travail</span></h3><p>Repérer un danger et proposer une action de prévention cohérente.</p></>}
            practice={<><Image {...sstArtwork.evaluation} width={1536} height={1024} sizes="(max-width: 800px) 92vw, 740px" /><div><p className={experience.kicker}>Mise en situation d’accident du travail</p><h3>Agir face à l’accident</h3><p>Analyser, protéger, examiner, alerter et réaliser les gestes adaptés.</p></div></>}
            validation={<><div><p className={experience.kicker}>Validation</p><p>Les deux épreuves certificatives doivent être réussies.</p></div><strong>SST<small>Votre certificat SST · Valable pendant 24 mois</small></strong></>} /></div>
        </Section>
      }
      dates={<TrainingDatesPricingSection compact showCompactBenefits eyebrow="07 — Dates & tarifs" assessmentLabel="Évaluation" sessions={sessions} seatCapacity={10} defaultPrice="Tarif sur devis" defaultLocation="Puget-sur-Argens" priceDescription="Formation initiale SST · 2 jours · 14 heures · Habilitation INRS H34836/2020/SST-1/O/07" registrationHref={sessionHref} benefits={['Employeur / OPCO', 'Financement personnel', 'Parcours sécurité', 'Conseiller dédié']} priceAction={{ href: contactHref('financement SST'), label: 'Étudier mon financement →' }} emptyAction={{ href: contactHref('alerte planning SST'), label: 'Recevoir les prochaines dates →' }} />}
      enrollment={<>
        <TrainingEnrollmentSection number="08" title="Votre inscription au SST" intro="Modalités selon votre projet et les disponibilités."
          steps={['Échange avec un conseiller', 'Étude du besoin et du financement', 'Devis et dates de formation']}
          registration={{ href: sessionHref(next), label: 'Demander un devis' }}
          fundingTitle="Simulez votre reste à charge" fundingNote={<><p>Conseiller dédié</p><p>Si le SST est intégré à un parcours sécurité, l’équipe vérifie avec vous les financements possibles (CPF selon éligibilité, France Travail selon accord). Estimez le montant restant après vos aides et votre CPF.</p></>}
          funding={{ href: contactHref('financement SST'), label: 'Étudier mon financement →' }}
          options={[
            ['Employeur ou OPCO', 'Employeur / OPCO selon dossier.'], ['Financement personnel', 'Paiement personnel · facilités étudiées.'],
            ['Parcours sécurité', 'Les possibilités de prise en charge dépendent du parcours et de son éligibilité.'],
          ]} />
        <Section id="entreprises-sst" eyebrow="Entreprises" title={<>Vous formez une équipe&nbsp;?</>} intro={<>Nous étudions avec vous une session adaptée à vos effectifs et à votre environnement de travail.</>} tone="dark"><div className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]"><article className="rounded-[2rem] border border-white/10 bg-white/7 p-6 lg:p-8"><div className="grid gap-3 sm:grid-cols-3">{[['01', 'Besoin analysé', 'avec votre équipe'], ['02', 'Scénarios contextualisés', 'selon votre environnement'], ['03', 'Organisation simplifiée', 'devis et dates étudiés']].map(([number, title, text]) => <div key={number} className="rounded-2xl border border-white/10 bg-white/6 p-5"><span className="text-xs font-black text-emerald-300">{number}</span><h3 className="mt-3 text-lg font-black">{title}</h3><p className="mt-2 text-sm font-semibold text-white/55">{text}</p></div>)}</div><p className="mt-5 text-sm font-semibold text-white/45">Modalités selon votre projet et les disponibilités.</p></article><article className="rounded-[2rem] bg-[#FFFDF8] p-6 text-academy-ink shadow-card lg:p-8"><Eyebrow>Votre demande</Eyebrow><h3 className="mt-3 text-3xl font-black">Construisons votre session SST</h3><p className="mt-3 font-semibold leading-7 text-academy-muted">Effectif, secteur, contraintes de planning et financement : Cassandre, Responsable commerciale, centralise votre besoin et prépare la suite avec l’équipe pédagogique.</p><CTA href={contactHref('devis entreprise SST')} variant="gold" className="mt-5 w-full">Demander un devis entreprise →</CTA></article></div></Section>
      </>}
      outcomes={
        <Section id="debouches" eyebrow="09 — Débouchés & emploi" title="Le rôle du SST en entreprise" intro="Le SST intervient face à un accident et contribue chaque jour à prévenir les risques dans son entreprise." tone="paper">
        <div className="mt-5 rounded-[1.8rem] bg-[#0D1725] p-5 text-white"><h3 className="text-xl font-black">Une compétence utile dans tous les secteurs</h3><div className="mt-4 flex flex-wrap gap-2">{sectors.map(item => <span key={item} className="rounded-full border border-emerald-400/35 bg-emerald-400/7 px-4 py-2 text-xs font-black text-emerald-200">{item}</span>)}</div></div>
      <article className="mt-5 rounded-[2rem] border border-emerald-200 bg-emerald-50/70 p-6 lg:p-8"><div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr] lg:items-center"><div><Eyebrow>Et après ?</Eyebrow><h3 className="mt-2 text-2xl font-black text-emerald-950">Maintenez vos compétences à jour</h3></div><div className="grid gap-3 sm:grid-cols-4">{[['Tous les 24 mois', 'Échéance'], ['MAC SST', 'Actualisation'], ['1 journée · 7 heures', 'Présentiel'], ['24 mois', 'Nouvelle validité']].map(([value, label], index) => <div key={value} className="relative rounded-2xl bg-white p-4 text-center shadow-soft"><p className="font-black text-emerald-900">{value}</p><p className="mt-1 text-xs font-semibold text-academy-muted">{label}</p>{index < 3 && <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 font-black text-emerald-600 sm:block">→</span>}</div>)}</div></div></article>
          <article className="mt-6 grid items-center gap-5 rounded-3xl bg-[#14212b] p-7 text-white lg:grid-cols-[1fr_auto]">
            <div><h3 className="text-2xl font-black">SSIAP 1 + SST</h3><p className="mt-2 leading-7 text-white/75">Pour un projet en sécurité incendie, une formule réunit la formation SSIAP 1 et le SST.</p></div>
            <CTA href="/formations-securite/ssiap-1#dates-tarifs" variant="light">Découvrir la formule SSIAP 1 + SST →</CTA>
          </article>
        </Section>
      }
      references={
        <TrainingOfficialReferences course="sst" id="reperes-officiels" number="10" title={<>Votre certificat SST<br /><em>Reconnu au niveau national</em></>}
          intro="Un cadre sérieux pour apprendre à agir" qualification="SST" name="Sauveteur secouriste du travail" certificateLabel="Votre certificat SST"
          registryLabel="Habilitation INRS" registryCode="H34836/2020/SST-1/O/07"
          url="https://www.inrs.fr/formation/themes/sauvetage-secourisme/pourquoi-se-former.html" sourceLabel="Consulter le dispositif SST de l’INRS"
          facts={[['Validité', '24 mois'], ['Équivalence', 'PSC1'], ['Cadre', 'Assurance Maladie / INRS']]}
          conditionsLabel="Maintien et actualisation des compétences" profession="Maintenez vos compétences à jour"
          conditions={['Tous les 24 mois', 'MAC SST', '1 journée · 7 heures', 'Nouvelle validité de 24 mois']}
          professionNote="Une formation courte ne doit pas être une formation superficielle : chaque compétence est démontrée, pratiquée et évaluée."
          detailsTitle="Intégrale Academy · Habilitation et encadrement" details={<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{trustCards.map(([title, text], index) => <article key={title} className="rounded-[1.7rem] border border-academy-line bg-[#FFFDF8] p-5 shadow-soft"><span className={`grid h-11 w-11 place-items-center rounded-2xl font-black ${index === 0 ? 'bg-emerald-100 text-emerald-800' : index === 1 ? 'bg-[#FFE7E3] text-[#D73F30]' : 'bg-academy-gold-soft text-yellow-800'}`}>✓</span><h3 className="mt-4 text-lg font-black">{title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-academy-muted">{text}</p></article>)}</div>} />
      }
    />

    <TrainingCourseTestimonials category="SST" layout="home" copy={courseReviewCopy} />

    <div id="faq-sst"><FaqDirectoryLink embedded theme="green" /></div>

    <TrainingReferenceContact schoolStyle
      description="Cassandre, Responsable commerciale, vous aide à choisir la bonne session, étudier l’organisation pour votre entreprise et préparer votre inscription."
      href={contactHref('rendez-vous téléphonique avec Cassandre')}
    />
    <TrainingReferenceMobileBar href={sessionHref(next)} label="Demander un devis" />
  </TrainingReferencePage>;
}
