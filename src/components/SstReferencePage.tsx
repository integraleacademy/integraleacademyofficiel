import type { ReactNode } from 'react';
import { TrainingReferencePage, TrainingReferenceHero, TrainingReferenceSection as Section, TrainingReferenceMissions, TrainingReferenceCampus, TrainingReferenceContact, TrainingReferenceMobileBar } from '@/components/TrainingReferenceLayout';
import { TrainingCourseTestimonials } from '@/components/TrainingCourseTestimonials';
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

import { PremiumFAQSection } from '@/components/ui';
import { TrainingDatesPricingSection, type TrainingDatesPricingSession } from '@/components/TrainingDatesPricingSection';
import { TrainingMotionGallery } from '@/components/TrainingMotionGallery';

const contactHref = (subject = 'inscription') => `/contact?formation=sst&objet=${encodeURIComponent(subject)}`;

const navigationItems = [
  { label: 'Présentation', href: '#role-sst' },
  { label: 'Programme', href: '#programme-sst' },
  { label: 'Évaluation', href: '#evaluation-sst' },
  { label: 'Dates & tarifs', href: '#dates-tarifs' },
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

const faq = [
  { q: 'À qui s’adresse la formation SST ?', a: 'Aux salariés, candidats sécurité et entreprises souhaitant acquérir les gestes de secours au travail et contribuer à la prévention des risques professionnels.' },
  { q: 'Y a-t-il des prérequis ?', a: 'Non. Aucun prérequis n’est exigé pour suivre la formation initiale SST.' },
  { q: 'Combien de temps dure la formation ?', a: 'La formation initiale dure au minimum 14 heures, généralement réparties sur deux journées en présentiel.' },
  { q: 'Combien de temps le certificat est-il valable ?', a: 'Le certificat SST est valable 24 mois. Il est reconnu au niveau national dans le cadre du dispositif Assurance Maladie – Risques professionnels / INRS.' },
  { q: 'Quand faut-il suivre le MAC SST ?', a: 'Le maintien et l’actualisation des compétences doit être réalisé tous les 24 mois. Le MAC SST dure au minimum 7 heures en présentiel.' },
  { q: 'Comment se déroule l’évaluation ?', a: 'Les compétences sont évaluées pendant la formation au moyen d’une mise en situation d’accident du travail et d’un questionnement portant sur la prévention.' },
  { q: 'Le certificat SST donne-t-il une équivalence PSC1 ?', a: 'Oui. Le certificat SST en cours de validité donne l’équivalence à l’unité d’enseignement PSC1.' },
  { q: 'Comment financer la formation ?', a: 'Un financement par l’employeur ou son OPCO, un financement personnel ou une intégration dans un parcours sécurité peuvent être étudiés selon le dossier.' },
  { q: 'Peut-on organiser une formation pour une équipe ?', a: 'Oui, notre équipe étudie votre effectif, votre environnement de travail, les dates souhaitées et les modalités d’organisation avant de vous transmettre un devis.' },
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
  return <TrainingReferencePage theme="green">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeCourseJsonLd({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'Course', name: 'Formation Sauveteur Secouriste du Travail SST', description: 'Formation initiale SST de 14 heures en présentiel à Puget-sur-Argens, prévention des risques et premiers secours en entreprise.', provider: { '@type': 'Organization', name: 'Intégrale Academy', telephone: '04 22 47 07 68' } },
      { '@type': 'FAQPage', mainEntity: faq.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: '/' }, { '@type': 'ListItem', position: 2, name: 'Formations sécurité', item: '/formations-securite' }, { '@type': 'ListItem', position: 3, name: 'SST', item: '/formations-securite/sst' }] },
    ] }, "/formations-securite/sst") }} />

    <TrainingReferenceHero
      id="sst" heading="Apprenez les gestes" accent="qui sauvent."
      illustration={sstArtwork.formation} caption="Prévenir. Réagir. Secourir."
      badge="Formation SST · Habilitation INRS"
      title="Formation sauveteur secouriste du travail"
      tagline="Les bons gestes, au bon moment."
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

    <CourseJourney course="sst" />

    <Section id="role-sst" eyebrow="01 — Le rôle du SST" title={<>Bien plus que des gestes de secours.</>} intro={<>Le SST intervient face à un accident et contribue chaque jour à prévenir les risques dans son entreprise.</>}>
      <TrainingReferenceMissions label="Votre rôle" items={[
        { title: 'Face à un accident', description: 'Une méthode claire pour agir sans perdre de temps.', illustration: sstEditorialArtwork.situation,
          body: <div className="grid gap-3 sm:grid-cols-2">{emergencySteps.map(([number, title, text]) => <div key={number} className="rounded-2xl border border-academy-line p-4"><span className="text-xs font-black text-emerald-700">{number}</span><h4 className="mt-2 font-black">{title}</h4><p className="mt-2 text-sm leading-6">{text}</p></div>)}</div> },
        { title: 'Prévenir au quotidien', description: '', illustration: sstEditorialArtwork.prevention,
          body: <div className="space-y-4">{preventionActions.map(item => <p key={item} className="flex gap-3 font-bold"><span className="text-emerald-300">✓</span>{item}</p>)}</div> },
      ]} />
      <article className="mt-6 rounded-[2rem] border border-academy-line bg-[#FFFDF8] p-6"><h3 className="text-2xl font-black">Pour qui ?</h3><div className="mt-4 flex flex-wrap gap-2">{['Salariés', 'Candidats sécurité', 'Entreprises'].map(item => <span key={item} className="rounded-full border border-academy-line bg-white px-3 py-2 text-xs font-black">{item}</span>)}</div><span className="mt-4 inline-flex rounded-full bg-[#F04C3A] px-4 py-2 text-xs font-black text-white">✓ Aucun prérequis</span></article>
      <TrainingMotionGallery variant="sst" illustrations={sstPracticeArtwork} />
      <div className="mt-5 rounded-[1.8rem] bg-[#0D1725] p-5 text-white"><h3 className="text-xl font-black">Une compétence utile dans tous les secteurs</h3><div className="mt-4 flex flex-wrap gap-2">{sectors.map(item => <span key={item} className="rounded-full border border-emerald-400/35 bg-emerald-400/7 px-4 py-2 text-xs font-black text-emerald-200">{item}</span>)}</div></div>
    </Section>

    <Section id="programme-sst" eyebrow="02 — Programme · 2 jours" title={<>14 heures pour savoir quoi faire — vraiment.</>} intro={<>Un parcours rythmé par la pratique, les démonstrations et les mises en situation.</>} tone="paper">
      <div className="grid gap-5 lg:grid-cols-[.92fr_1.08fr]"><div className="grid gap-4">{days.map(day => <article key={day.number} className={`rounded-[1.8rem] border bg-white p-5 shadow-soft ${day.tone === 'green' ? 'border-emerald-300' : 'border-[#FF9A8F]'}`}><div className="flex items-center gap-4"><span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-black text-white ${day.tone === 'green' ? 'bg-emerald-600' : 'bg-[#F04C3A]'}`}>{day.number}</span><h3 className="text-xl font-black uppercase tracking-[-.02em]">{day.title}</h3></div><ul className="mt-5 space-y-3">{day.items.map(item => <li key={item} className="flex gap-3 border-t border-academy-line/60 pt-3 font-semibold text-academy-muted first:border-0 first:pt-0"><span className={day.tone === 'green' ? 'text-emerald-600' : 'text-[#F04C3A]'}>✓</span>{item}</li>)}</ul></article>)}</div><article className="rounded-[2rem] bg-[#0D1725] p-6 text-white shadow-card lg:p-8"><div className="mb-6 overflow-hidden rounded-2xl"><ManualArtwork illustration={originalArtwork['sst-pedagogie']} natural /></div><h3 className="text-3xl font-black">Les situations travaillées</h3><div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">{scenarios.map(([icon, title], index) => <div key={title} className="rounded-2xl border border-white/20 bg-white/5 p-4 text-center"><span className={`mx-auto grid h-10 w-10 place-items-center text-2xl font-black ${index % 3 === 0 ? 'text-[#FF6958]' : 'text-emerald-400'}`}>{icon}</span><p className="mt-3 text-sm font-black">{title}</p></div>)}</div><div className="mt-5 rounded-2xl bg-emerald-50 p-5 text-emerald-950"><h4 className="text-xl font-black">Une pédagogie très concrète</h4><p className="mt-2 font-semibold leading-7 text-emerald-900/70">Démonstrations, entraînements guidés et scénarios proches de votre environnement de travail.</p></div></article></div>
      <div className="mt-5 grid overflow-hidden rounded-[1.6rem] border border-academy-line bg-white sm:grid-cols-2 lg:grid-cols-4">{[['100 % présentiel', 'Apprenez et pratiquez'], ['Petit groupe · 4 à 10', 'Accompagnement personnalisé'], ['Matériel de simulation', 'Entraînement en conditions réelles']].map(([title, text]) => <div key={title} className="border-b border-academy-line p-5 sm:border-r lg:border-b-0"><p className="font-black">{title}</p><p className="mt-1 text-xs font-semibold text-academy-muted">{text}</p></div>)}<div className="grid place-items-center p-4"><TrainingProgramDownload href="/documents/programme-sst.pdf" course="SST" theme="green" className="w-full" /></div></div>
    </Section>

    <TrainingReferenceCampus />
    <IntegraleWelcomePack course="sst" />

    <Section id="evaluation-sst" eyebrow="03 — Évaluation & certification" title={<>Des compétences vérifiées, un certificat reconnu.</>} intro={<>L’évaluation se déroule pendant la formation, au plus près des situations rencontrées en entreprise.</>}>
      <div className="grid gap-5 lg:grid-cols-2"><article className="rounded-[2rem] border border-emerald-200 bg-[#FFFDF8] p-6 shadow-soft lg:p-8"><div className="mb-6 overflow-hidden rounded-2xl"><ManualArtwork illustration={sstArtwork.evaluation} natural /></div><h3 className="text-3xl font-black">Comment êtes-vous évalué ?</h3><div className="mt-7 space-y-4">{[['01', 'Mise en situation d’accident du travail', 'Analyser, protéger, examiner, alerter et réaliser les gestes adaptés.'], ['02', 'Questionnement prévention', 'Repérer un danger et proposer une action de prévention cohérente.']].map(([number, title, text], index) => <div key={number} className="grid gap-4 rounded-2xl border border-academy-line bg-white p-5 sm:grid-cols-[auto_1fr]"><span className={`grid h-11 w-11 place-items-center rounded-full font-black text-white ${index === 0 ? 'bg-emerald-600' : 'bg-[#F04C3A]'}`}>{number}</span><div><h4 className="text-lg font-black">{title}</h4><p className="mt-2 font-semibold leading-6 text-academy-muted">{text}</p></div></div>)}</div><div className="mt-4 rounded-2xl bg-emerald-50 p-5"><p className="font-black text-emerald-900">✓ Validation</p><p className="mt-1 text-sm font-semibold text-emerald-900/70">Les deux épreuves certificatives doivent être réussies.</p></div></article><article className="rounded-[2rem] bg-[#0D1725] p-6 text-white shadow-card lg:p-8"><div className="flex flex-col gap-6 sm:flex-row sm:items-center"><span className="grid h-28 w-28 shrink-0 place-items-center rounded-full border-[8px] border-[#F5C34E] bg-emerald-800 text-3xl font-black shadow-gold">SST</span><div><Eyebrow light>Votre certificat SST</Eyebrow><h3 className="mt-2 text-3xl font-black">Reconnu au niveau national</h3></div></div><div className="mt-7 grid gap-3 sm:grid-cols-2">{[['Validité', '24 mois'], ['Équivalence', 'PSC1'], ['Cadre', 'Assurance Maladie / INRS'], ['Habilitation', 'H34836/2020/SST-1/O/07']].map(([key, value]) => <div key={key} className="rounded-2xl border border-white/10 bg-white/7 p-4"><p className="text-[.62rem] font-black uppercase tracking-[.16em] text-emerald-300">{key}</p><p className="mt-2 font-black">{value}</p></div>)}</div><CTA href={contactHref('vérification projet SST')} variant="light" className="mt-5 w-full">Vérifier mon projet →</CTA></article></div>
      <article className="mt-5 rounded-[2rem] border border-emerald-200 bg-emerald-50/70 p-6 lg:p-8"><div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr] lg:items-center"><div><Eyebrow>Et après ?</Eyebrow><h3 className="mt-2 text-2xl font-black text-emerald-950">Maintenez vos compétences à jour.</h3></div><div className="grid gap-3 sm:grid-cols-4">{[['Tous les 24 mois', 'Échéance'], ['MAC SST', 'Actualisation'], ['1 journée · 7 heures', 'Présentiel'], ['24 mois', 'Nouvelle validité']].map(([value, label], index) => <div key={value} className="relative rounded-2xl bg-white p-4 text-center shadow-soft"><p className="font-black text-emerald-900">{value}</p><p className="mt-1 text-xs font-semibold text-academy-muted">{label}</p>{index < 3 && <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 font-black text-emerald-600 sm:block">→</span>}</div>)}</div></div></article>
    </Section>

    <TrainingDatesPricingSection sessions={sessions} seatCapacity={10} defaultPrice="Tarif sur devis" defaultLocation="Puget-sur-Argens" priceDescription="Formation initiale SST · 2 jours · 14 heures · Habilitation INRS H34836/2020/SST-1/O/07" registrationHref={sessionHref} benefits={['Employeur / OPCO', 'Financement personnel', 'Parcours sécurité', 'Conseiller dédié']} priceAction={{ href: contactHref('financement SST'), label: 'Étudier mon financement →' }} emptyAction={{ href: contactHref('alerte planning SST'), label: 'Recevoir les prochaines dates →' }} />

    <Section id="entreprises-sst" eyebrow="04 — Entreprises" title={<>Vous formez une équipe&nbsp;?</>} intro={<>Nous étudions avec vous une session adaptée à vos effectifs et à votre environnement de travail.</>} tone="dark"><div className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]"><article className="rounded-[2rem] border border-white/10 bg-white/7 p-6 lg:p-8"><div className="grid gap-3 sm:grid-cols-3">{[['01', 'Besoin analysé', 'avec votre équipe'], ['02', 'Scénarios contextualisés', 'selon votre environnement'], ['03', 'Organisation simplifiée', 'devis et dates étudiés']].map(([number, title, text]) => <div key={number} className="rounded-2xl border border-white/10 bg-white/6 p-5"><span className="text-xs font-black text-emerald-300">{number}</span><h3 className="mt-3 text-lg font-black">{title}</h3><p className="mt-2 text-sm font-semibold text-white/55">{text}</p></div>)}</div><p className="mt-5 text-sm font-semibold text-white/45">Modalités selon votre projet et les disponibilités.</p></article><article className="rounded-[2rem] bg-[#FFFDF8] p-6 text-academy-ink shadow-card lg:p-8"><Eyebrow>Votre demande</Eyebrow><h3 className="mt-3 text-3xl font-black">Construisons votre session SST.</h3><p className="mt-3 font-semibold leading-7 text-academy-muted">Effectif, secteur, contraintes de planning et financement : Cassandre centralise votre besoin et prépare la suite avec l’équipe pédagogique.</p><CTA href={contactHref('devis entreprise SST')} variant="gold" className="mt-5 w-full">Demander un devis entreprise →</CTA></article></div></Section>

    <Section eyebrow="05 — Intégrale Academy" title={<>Un cadre sérieux pour apprendre à agir.</>} intro={<>Une formation courte ne doit pas être une formation superficielle : chaque compétence est démontrée, pratiquée et évaluée.</>}><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{trustCards.map(([title, text], index) => <article key={title} className="rounded-[1.7rem] border border-academy-line bg-[#FFFDF8] p-5 shadow-soft"><span className={`grid h-11 w-11 place-items-center rounded-2xl font-black ${index === 0 ? 'bg-emerald-100 text-emerald-800' : index === 1 ? 'bg-[#FFE7E3] text-[#D73F30]' : 'bg-academy-gold-soft text-yellow-800'}`}>✓</span><h3 className="mt-4 text-lg font-black">{title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-academy-muted">{text}</p></article>)}</div></Section>

    <TrainingCourseTestimonials category="SST" />

    <div id="faq-sst"><PremiumFAQSection theme="green" badge="FAQ SST" title="Vos questions sur la formation SST" description="Public, durée, certificat, maintien des compétences, financement et organisation en entreprise : retrouvez les réponses essentielles." items={faq} contactHref={contactHref('question SST')} /></div>

    <TrainingReferenceContact
      description="Cassandre vous aide à choisir la bonne session, étudier l’organisation pour votre entreprise et préparer votre inscription."
      href={contactHref('rendez-vous avec Cassandre')}
    />
    <TrainingReferenceMobileBar href={sessionHref(next)} label="Demander un devis" />
  </TrainingReferencePage>;
}
