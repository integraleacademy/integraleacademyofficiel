import { TrainingReferencePage, TrainingReferenceHero, TrainingReferenceSection as Section, TrainingReferenceMissions, TrainingReferenceCampus, TrainingReferenceContact, TrainingReferenceMobileBar } from '@/components/TrainingReferenceLayout';
import { TrainingCourseTestimonials } from '@/components/TrainingCourseTestimonials';

import { originalArtwork } from '@/data/originalArtwork';
import { CourseJourney } from '@/components/CourseJourney';
import { serializeCourseJsonLd } from '@/lib/seo';
import Link from 'next/link';
import { TrainingHeroSessionCard } from '@/components/TrainingHero';
import { MissionAnimation } from '@/components/MissionAnimation';
import { PremiumFAQSection } from '@/components/ui';
import { TrainingSectionNavigation } from '@/components/TrainingSectionNavigation';
import { TrainingDatesPricingSection } from '@/components/TrainingDatesPricingSection';
import { TrainingMotionIllustration } from '@/components/TrainingMotionGallery';
import styles from './A3pReferencePage.module.css';
import { IntegraleWelcomePack } from '@/components/IntegraleWelcomePack';
import { ManualArtwork } from '@/components/ManualArtwork';
import { a3pArtwork, a3pPracticeArtwork } from '@/data/manualIllustrations';
import {
  a3pConfig,
  a3pContact,
  a3pEmployerSectors,
  a3pEnrollmentSteps,
  a3pFaq,
  a3pInsertionStats,
  a3pPrerequisites,
  a3pProgram,
  a3pWorkConditions,
} from '@/data/a3p';

type CTAStyle = 'dark' | 'green' | 'light' | 'outline';

function CTA({ href, children, variant = 'green', className = '' }: { href: string; children: React.ReactNode; variant?: CTAStyle; className?: string }) {
  const styles: Record<CTAStyle, string> = {
    dark: 'bg-[#11100D] text-white shadow-soft hover:bg-black',
    green: 'bg-emerald-600 text-white shadow-[0_16px_34px_rgba(5,150,105,.22)] hover:bg-emerald-700',
    light: 'border border-academy-line bg-white text-academy-ink hover:border-emerald-400',
    outline: 'border border-white/25 bg-white/[.06] text-white hover:bg-white/12',
  };

  return <Link href={href} className={`inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-center text-sm font-black transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-emerald-300/55 ${styles[variant]} ${className}`}>{children}</Link>;
}

function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`text-[.66rem] font-black uppercase tracking-[.24em] ${light ? 'text-emerald-300' : 'text-emerald-700'}`}>{children}</p>;
}

function sessionRegistrationHref(session: any) {
  if (!session?.id) return a3pContact('prochaine-session');
  return `/contact?formation=a3p-apr&session=${encodeURIComponent(String(session.id))}`;
}

const métierCards = [
  ['01', 'Anticiper les risques', 'Identifier les menaces, étudier les vulnérabilités et construire un dispositif adapté au contexte.'],
  ['02', 'Sécuriser les déplacements', 'Préparer les itinéraires, les arrivées, les départs et les déplacements pédestres ou véhiculés.'],
  ['03', 'Protéger avec discrétion', 'Préserver l’intégrité et la vie privée de la personne protégée sans perturber ses activités.'],
];

const audiences = [
  'Reconversion professionnelle',
  'Agents de sécurité',
  'Anciens militaires',
  'Policiers ou gendarmes',
  'Chauffeurs de sécurité',
  'Candidats à la protection rapprochée',
];

const skillPillars = [
  { icon: '◎', title: 'Préparer une mission complète', text: 'Recueillir les informations, analyser les risques, définir les moyens, organiser le dispositif et préserver la confidentialité.', featured: true },
  { icon: '⌖', title: 'Reconnaître les lieux', text: 'Étudier les accès, itinéraires, zones d’arrivée et solutions de repli.' },
  { icon: '↗', title: 'Protéger en déplacement', text: 'Adopter les positionnements adaptés à pied ou en véhicule.', dark: true },
  { icon: '✚', title: 'Réagir à l’urgence', text: 'Gérer le conflit, porter secours et coordonner les intervenants.', dark: true },
  { icon: '§', title: 'Agir dans le cadre légal', text: 'Communiquer, rendre compte et respecter les limites d’intervention.' },
];

const programPhases = [
  ['01', 'Socle de base — 41 h', 'SST, environnement juridique, gestion des conflits et transmission des consignes communes aux métiers de la sécurité privée.'],
  ['02', 'Spécialité A3P — 287 h', 'Risques terroristes, préparation de mission, protection, déplacements, techniques professionnelles, gestion des risques et secourisme tactique.'],
  ['03', 'Pratique — 92 h 50', 'Exercices techniques, déplacements, scénarios, secours, missions complètes, briefings et débriefings.'],
  ['04', 'Certification hors durée', 'QCU contextualisés, évaluations pratiques, dossier de mission complète et soutenance devant le jury.'],
];

const practices = [
  { title: 'Préparation de mission', text: 'Recueillir les informations, définir les moyens et préparer les itinéraires pour organiser une mission complète.', scene: 'mission-map', visualDescription: 'Animation d’un itinéraire préparé avant une mission de protection rapprochée' },
  { title: 'Analyse des risques', text: 'Identifier les menaces et les vulnérabilités, puis adapter le dispositif à la personne protégée et à son environnement.', scene: 'risk-radar', visualDescription: 'Animation d’un radar identifiant les risques autour de la personne protégée' },
  { title: 'Reconnaissance de sites', text: 'Étudier les accès, les zones d’arrivée, les cheminements et les solutions de repli avant le déroulement de la mission.', scene: 'site-check', visualDescription: 'Animation d’un site dont les accès et les zones de repli sont vérifiés' },
  { title: 'Déplacements pédestres', text: 'Travailler les positionnements, les déplacements en équipe et la communication autour de la personne protégée.', scene: 'close-protection', visualDescription: 'Animation d’un dispositif rapproché autour d’une personne protégée' },
  { title: 'Dispositifs véhiculés', text: 'Préparer les trajets, les arrivées et les départs, puis coordonner les déplacements avec les autres membres du dispositif.', scene: 'secure-vehicle', visualDescription: 'Animation d’un véhicule suivant un itinéraire sécurisé' },
  { title: 'Scénarios professionnels', text: 'Réagir à une situation imprévue, reconnaître une anomalie et coordonner une réponse adaptée pendant les exercices encadrés.', scene: 'hazard', visualDescription: 'Animation d’une zone présentant un danger à identifier et à sécuriser pendant un scénario professionnel' },
  { title: 'Secours aux personnes', text: 'S’entraîner aux gestes de secours, à l’alerte et à la coordination de l’intervention dans le cadre des séquences de secourisme.', scene: 'cpr', visualDescription: 'Animation de compressions thoraciques sur une personne allongée pendant un exercice de secours' },
  { title: 'Briefings & débriefings', text: 'Partager les consignes, répartir les rôles, rendre compte de la mission et analyser les décisions avec le formateur.', scene: 'briefing', visualDescription: 'Animation d’un briefing d’équipe suivi d’un compte rendu de mission' },
] as const;

const examSteps = [
  ['QCU contextualisés', 'Les connaissances de chaque UV sont vérifiées dans des situations proches du métier.'],
  ['Épreuves pratiques', 'Des grilles déclarent le candidat apte ou inapte, avec une épreuve commune aux UV6 et UV7 et une évaluation de l’anglais professionnel.'],
  ['Mission complète', 'Au moins une mission est préparée et exécutée en conditions réelles ; le candidat constitue le dossier présenté au jury.'],
  ['Soutenance devant jury', 'Le candidat expose sa préparation, justifie ses décisions et répond aux questions portant sur la mission et le métier.'],
];

const jobs = ['Agent de protection rapprochée', 'Agent de protection physique des personnes', 'Garde du corps', 'Conducteur de sécurité', 'Agent privé de protection'];
const salaryFactors = ['Niveau de risque', 'Durée', 'Horaires', 'Mobilité', 'Conduite', 'Langues', 'Expérience', 'Réputation'];
const registrationFormUrl = 'https://assistance-alw9.onrender.com/demande-informations-formations';
const a3pNavigationItems = [
  { label: 'Métier', href: '#metier' },
  { label: 'Immersion', href: '#pedagogie' },
  { label: 'Programme', href: '#programme' },
  { label: 'Examen', href: '#certification' },
  { label: 'Dates & tarifs', href: '#dates-tarifs' },
  { label: 'Inscriptions', href: '#inscription' },
  { label: 'Débouchés', href: '#debouches' },
  { label: 'FAQ', href: '#faq-a3p' },
] as const;

export function A3pReferencePage({ sessions }: { sessions: any[] }) {
  return <TrainingReferencePage theme="green">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeCourseJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Course', name: 'Formation A3P : devenez agent de protection rapprochée', description: `Formation officielle TFP A3P à Puget-sur-Argens, ${a3pConfig.durationHours}, RNCP niveau 4.`, provider: { '@type': 'Organization', name: 'Intégrale Academy', telephone: a3pConfig.advisor.phone } },
        { '@type': 'FAQPage', mainEntity: a3pFaq.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
        { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: '/' }, { '@type': 'ListItem', position: 2, name: 'Formations sécurité', item: '/formations-securite' }, { '@type': 'ListItem', position: 3, name: 'A3P APR', item: a3pConfig.pageUrl }] },
      ],
    }, "/formations-securite/a3p-apr") }} />

    <TrainingReferenceHero
      id="a3p" badge="Formation TFP A3P"
      heading="Devenez agent de" accent="protection rapprochée."
      title="Formation agent de protection rapprochée"
      tagline="Apprenez le métier sur le terrain."
      description={<p>Préparez, organisez et sécurisez les déplacements de personnes exposées. Une formation réglementée, intensive et résolument tournée vers les réalités du terrain.</p>}
      illustration={a3pArtwork.protection} caption="Anticiper. Sécuriser. Protéger."
      primaryAction={{ href: a3pContact('dossier-a3p'), label: 'Recevoir le dossier A3P →' }}
    >
      <TrainingHeroSessionCard
        session={sessions[0]} theme="green" defaultPrice={a3pConfig.priceLabel}
        defaultLocation={a3pConfig.location} assistantKey="a3p"
        registrationHref={registrationFormUrl} examLabel="Examen final le"
        approval={`Agrément ADEF n° ${a3pConfig.adefApproval}`}
        facts={[
          { label: 'Certification', value: 'TFP A3P', details: ['Titre à finalité professionnelle', `${a3pConfig.level} · ${a3pConfig.rncp}`] },
          { label: 'Durée et format', value: a3pConfig.durationHours, details: [a3pConfig.modality, a3pConfig.practiceHours] },
          { label: 'Hébergement', value: a3pConfig.accommodationLabel, details: ['Sur réservation'] },
        ]}
      />
    </TrainingReferenceHero>

    <TrainingSectionNavigation
      mark="A3P"
      title="TFP A3P"
      items={a3pNavigationItems}
      registrationHref="#dates-tarifs"
      theme="green"
    />

    <CourseJourney course="a3p" />

    <Section id="metier" label="01 — Le métier" title={<>Protéger, anticiper, <span className="decoration-emerald-500 decoration-[.16em] underline underline-offset-[-.03em]">décider.</span></>} intro="L’agent de protection physique des personnes assure la sécurité de dirigeants, personnalités, artistes ou toute personne exposée. Son rôle : préparer la mission, analyser les risques et protéger avec efficacité, proportionnalité et discrétion.">
      <TrainingReferenceMissions items={métierCards.map(([, title, description], index) => ({ title, description, illustration: [originalArtwork['a3p-mission-preparation'], originalArtwork['a3p-mission-trajets'], a3pArtwork.discretion][index] }))} />
      <MissionAnimation variant="a3p" className="mt-5" illustration={originalArtwork['a3p-mission-ensemble']} />
      <div className="mt-5 grid items-center gap-6 rounded-[2rem] bg-[#0D1725] p-6 text-white shadow-card lg:grid-cols-[.8fr_1.2fr]">
        <div><Label light>Une mission, cinq temps forts</Label><h3 className="mt-3 text-2xl font-black">De la préparation au débriefing.</h3><p className="mt-2 text-sm text-white/60">Une lecture concrète du métier avant le détail du programme.</p></div>
        <div className="flex items-start justify-between gap-2 overflow-x-auto">{['Briefing', 'Reconnaissance', 'Dispositif', 'Déplacement', 'Débriefing'].map((step, index) => <div key={step} className="flex min-w-[5.5rem] flex-1 items-center gap-2"><div className="text-center"><span className="mx-auto grid h-9 w-9 place-items-center rounded-full border border-emerald-300/35 bg-white/[.07] text-xs font-black text-emerald-300">0{index + 1}</span><p className="mt-2 text-[.65rem] font-black">{step}</p></div>{index < 4 && <span className="mb-5 text-emerald-300">→</span>}</div>)}</div>
      </div>
    </Section>

    <section className="bg-academy-bg px-4 pb-16"><div className="page-container grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
      <div className="rounded-[2rem] border border-academy-line bg-[#FFFDF8] p-6 shadow-soft sm:p-8"><Label>À qui s’adresse la formation ?</Label><h2 className="mt-3 text-2xl font-black tracking-[-.04em] sm:text-3xl">Un parcours ouvert à plusieurs profils.</h2><div className="mt-6 flex flex-wrap gap-2.5">{audiences.map((item) => <span key={item} className="rounded-full border border-[#E4DAC9] bg-[#F3EEE5] px-4 py-2.5 text-xs font-black before:mr-2 before:text-emerald-600 before:content-['✓']">{item}</span>)}</div></div>
      <div className="relative overflow-hidden rounded-[2rem] border border-emerald-200 bg-[linear-gradient(135deg,#ECFDF5,#D1FAE5)] p-7 shadow-soft"><div className="absolute -right-16 -top-20 h-48 w-48 rounded-full border border-emerald-300/50 shadow-[0_0_0_35px_rgba(255,255,255,.2)]" /><Label>Candidature personnalisée</Label><h2 className="relative mt-3 text-2xl font-black tracking-[-.04em] sm:text-3xl">Votre profil est étudié individuellement.</h2><p className="relative mt-4 text-sm font-semibold leading-7 text-emerald-950/80">Une expérience militaire ou policière est un atout, mais elle n’est pas obligatoire. Nous vérifions votre projet avant l’inscription.</p><CTA href={a3pContact('etude-profil')} className="relative mt-5">Faire le point →</CTA></div>
    </div></section>

    <section id="admission" className="bg-[#FFFDF8] px-4 py-14 sm:py-18 lg:py-20"><div className="page-container overflow-hidden rounded-[2.25rem] bg-[#0D1725] p-6 text-white shadow-card sm:p-8 lg:p-10"><div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr]">
      <div><Label light>02 — Admission</Label><h2 className="mt-3 text-3xl font-black tracking-[-.045em] sm:text-4xl">Êtes-vous éligible à la formation A3P&nbsp;?</h2><p className="mt-5 text-sm font-medium leading-7 text-white/62">L’activité est réglementée. L’autorisation ou la carte CNAPS, l’honorabilité, le niveau B1 et, le cas échéant, la situation administrative sont vérifiés avant la rentrée.</p><CTA href={a3pContact('verification-prerequis')} variant="green" className="mt-6">Vérifier mes prérequis →</CTA></div>
      <div className="grid gap-3 sm:grid-cols-2">{a3pPrerequisites.map((item, index) => <details key={item.title} className="group rounded-2xl border border-white/10 bg-[#182537] p-4"><summary className="flex cursor-pointer list-none gap-3"><span className="font-black text-emerald-300">{index === a3pPrerequisites.length - 1 ? '→' : '✓'}</span><span className="flex-1 text-sm font-black">{item.title}</span><span className="text-white/45 transition group-open:rotate-45">+</span></summary><div className="mt-3 border-t border-white/10 pt-3 text-xs font-medium leading-6 text-white/60">{item.body?.map((paragraph) => <p key={paragraph} className="mb-2 last:mb-0">{paragraph}</p>)}{item.note && <p className="mt-3 font-black text-amber-200">{item.note}</p>}</div></details>)}</div>
    </div></div></section>

    <Section id="competences" label="03 — Compétences" title={<>Ce que vous saurez faire <span className="decoration-emerald-500 decoration-[.16em] underline underline-offset-[-.03em]">sur le terrain.</span></>} intro="Les compétences du bloc unique sont présentées en cinq piliers métier. Le programme officiel détaillé par unité de valeur figure juste après.">
      <div className={styles.skillsGrid}>
        {skillPillars.map((skill, index) => (
          <article key={skill.title} className={`${styles.skillCard} ${skill.featured ? styles.featuredSkill : skill.dark ? styles.darkSkill : ''}`}>
            <div className={styles.skillArtwork}>
              <ManualArtwork illustration={[originalArtwork['a3p-mission-relation'], originalArtwork['a3p-competence-preparer'], originalArtwork['a3p-competence-proteger'], originalArtwork['a3p-competence-secours'], originalArtwork['a3p-competence-cadre']][index]} natural sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 360px" />
            </div>
            <div className={styles.skillCopy}>
              <h3>{skill.title}</h3>
              <p>{skill.text}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>

    <Section id="programme" label="04 — Programme" title={<>328 heures pour devenir <span className="decoration-emerald-500 decoration-[.16em] underline underline-offset-[-.03em]">opérationnel.</span></>} intro="Le programme réglementaire comporte neuf unités de valeur : 41 heures de socle de base et 287 heures de spécialité A3P, soit 328 heures hors examen dont 92 heures et 50 minutes de pratique." tone="stone">
      <div className="grid items-start gap-5 lg:grid-cols-[.62fr_1.38fr]">
        <aside className="rounded-[2rem] bg-emerald-600 p-7 text-white shadow-[0_24px_65px_rgba(5,150,105,.22)] lg:sticky lg:top-5"><span className="rounded-full bg-white px-3 py-1.5 text-[.62rem] font-black uppercase tracking-[.14em] text-emerald-800">Formation réglementée</span><p className="mt-8 text-6xl font-black tracking-[-.06em]">328 h</p><p className="mt-3 font-black text-white/85">Hors examen<br />100 % en présentiel</p><ul className="mt-8 space-y-2 text-sm font-bold text-white/85"><li>✓ 41 h de socle de base</li><li>✓ 287 h de spécialité A3P</li><li>✓ 92 h 50 de pratique</li><li>✓ 9 unités de valeur</li><li>✓ Mission complète et jury</li></ul><a href={a3pConfig.programPdfUrl} download className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#11100D] px-5 py-3 text-center text-sm font-black text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-black focus:outline-none focus:ring-4 focus:ring-white/30">Télécharger le programme PDF ↓</a></aside>
        <div className="space-y-3">{programPhases.map(([number, title, body]) => <article key={title} className="rounded-[1.65rem] border border-academy-line bg-[#FFFDF8] p-5 shadow-soft sm:p-6"><div className="flex gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-academy-line bg-academy-bg text-xs font-black">{number}</span><div><h3 className="text-xl font-black tracking-[-.03em]">{title}</h3><p className="mt-2 text-sm font-semibold leading-7 text-academy-muted">{body}</p></div></div></article>)}
          <details className="group overflow-hidden rounded-[1.65rem] border border-academy-line bg-[#FFFDF8] shadow-soft"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-black sm:p-6"><span>Voir le détail des 9 unités de valeur réglementaires</span><span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-600 text-white transition group-open:rotate-45">+</span></summary><div className="space-y-3 border-t border-academy-line bg-academy-bg p-4 sm:p-5">{a3pProgram.map((item) => <details key={item.code} className="group/module rounded-2xl border border-academy-line bg-white p-4"><summary className="flex cursor-pointer list-none justify-between gap-3 text-sm font-black"><span>{item.code} — {item.title}</span><span className="text-emerald-700 transition group-open/module:rotate-45">+</span></summary><div className="mt-3 text-xs font-semibold leading-6 text-academy-muted"><div className="mb-3 flex flex-wrap gap-2"><span className="rounded-full bg-emerald-700 px-3 py-1 font-black text-white">{item.duration}</span><span className="rounded-full bg-emerald-50 px-3 py-1 font-black text-emerald-800">{item.practice}</span></div><p>{item.description}</p><ul className="mt-3 grid gap-2 sm:grid-cols-2">{item.items.map((point) => <li key={point} className="rounded-xl bg-academy-bg px-3 py-2">✓ {point}</li>)}</ul></div></details>)}</div></details>
        </div>
      </div>
    </Section>

    <Section id="pedagogie" label="05 — Immersion & pédagogie" title={<>Un terrain d’entraînement qui <span className="text-emerald-300">ressemble au vrai.</span></>} intro="Zones urbaines, axes routiers et environnements variés permettent de construire des exercices réalistes entre Cannes et Saint-Tropez." tone="dark">
      <div className="grid gap-5 md:grid-cols-2">
        {practices.map((practice, index) => <article key={practice.title} className={styles.practiceCard}>
          <span className={styles.practiceNumber}>0{index + 1}</span>
          <h3>{practice.title}</h3>
          <p>{practice.text}</p>
          <div className={`${styles.practiceVisual} ${a3pPracticeArtwork[practice.scene] ? styles.naturalVisual : ''}`}>
            <TrainingMotionIllustration kind={practice.scene} theme="green" description={practice.visualDescription} illustration={a3pPracticeArtwork[practice.scene]} natural />
          </div>
        </article>)}
      </div>
      <div className="mt-7 rounded-[1.7rem] border border-emerald-300/25 bg-emerald-400/10 p-6"><Label light>École de Puget-sur-Argens</Label><h3 className="mt-3 text-xl font-black text-emerald-200">Entraînez-vous dans des configurations variées.</h3><p className="mt-2 max-w-4xl text-sm font-medium leading-7 text-white/65">La progression alterne démonstrations, exercices individuels, travail en équipe, scénarios professionnels et débriefings.</p></div>
    </Section>

    <TrainingReferenceCampus />
    <IntegraleWelcomePack course="a3p" />

    <Section id="certification" label="06 — Certification" title={<>Un examen qui valide <span className="decoration-emerald-500 decoration-[.16em] underline underline-offset-[-.03em]">vos décisions.</span></>} intro="L’évaluation vérifie les connaissances réglementaires et votre capacité à préparer puis exécuter une mission de protection physique des personnes." tone="paper">
      <div className="relative grid gap-5 md:grid-cols-4 before:absolute before:left-[8%] before:right-[8%] before:top-6 before:hidden before:h-px before:bg-emerald-200 md:before:block">{examSteps.map(([title, body], index) => <article key={title} className="relative"><span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-[6px] border-[#FFFDF8] bg-emerald-600 text-xs font-black text-white shadow-[0_0_0_1px_#A7F3D0]">0{index + 1}</span><h3 className="mt-6 text-lg font-black tracking-[-.03em]">{title}</h3><p className="mt-3 text-xs font-semibold leading-6 text-academy-muted">{body}</p></article>)}</div>
      <div className="mt-8 grid gap-3 md:grid-cols-3">{[
        ['Note ≥ 12/20', 'Unité de valeur acquise', 'bg-emerald-50 text-emerald-900 border-emerald-200'],
        ['8/20 ≤ note < 12/20', 'Candidat ajourné, nouvelle session d’examen possible', 'bg-amber-50 text-amber-900 border-amber-200'],
        ['Note < 8/20', 'Module de formation à suivre de nouveau', 'bg-rose-50 text-rose-900 border-rose-200'],
      ].map(([score, result, colors]) => <article key={score} className={`rounded-2xl border p-5 ${colors}`}><p className="text-xl font-black">{score}</p><p className="mt-2 text-xs font-bold leading-6">{result}</p></article>)}</div>
      <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm font-bold leading-7 text-emerald-950">Les évaluations pratiques utilisent une grille de critères et conduisent à un résultat « apte » ou « inapte ». La certification est constituée d’un bloc unique : toutes les exigences du métier réglementé doivent être validées.</p>
      <div className="mt-8 rounded-[1.5rem] border border-emerald-200 bg-emerald-50/60 p-5"><Label>Après réussite</Label><p className="mt-2 text-base font-black">TFP A3P <span className="text-emerald-700">→</span> Demande CNAPS <span className="text-emerald-700">→</span> Carte professionnelle <span className="text-emerald-700">→</span> Exercer</p><p className="mt-2 text-xs font-semibold text-academy-muted">La certification permet de justifier l’aptitude professionnelle nécessaire à la demande de carte. La délivrance de la carte reste une décision du CNAPS.</p></div>
    </Section>

    <Section id="references-rncp" label="07 — Repères officiels" title="Certification, conditions d’exercice et données d’insertion." intro={<>Ces informations complètent la présentation commerciale avec les repères figurant dans la fiche RNCP38002 fournie.</>}>
      <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <article className="rounded-[2rem] border border-academy-line bg-white p-6 shadow-soft lg:p-8">
          <Label>Réalités du métier</Label>
          <h3 className="mt-3 text-3xl font-black">Des conditions qui varient selon la mission.</h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">{a3pWorkConditions.map((item) => <div key={item} className="flex gap-3 rounded-2xl bg-academy-bg p-4 text-sm font-bold leading-6 text-academy-muted"><span className="mt-0.5 text-emerald-700">✓</span><span>{item}</span></div>)}</div>
        </article>
        <article className="rounded-[2rem] bg-[#0D1725] p-6 text-white shadow-card lg:p-8">
          <Label light>Identification</Label>
          <h3 className="mt-3 text-3xl font-black">TFP A3P · niveau 4</h3>
          <dl className="mt-6 grid gap-3">{[
            ['Répertoire', a3pConfig.rncp],
            ['Certificateurs', 'CPNE / ADEF'],
            ['Code ROME', 'K2503'],
            ['Code NSF', '344'],
            ['Formacode', '42812'],
            ['Échéance RNCP', a3pConfig.rncpExpiry],
          ].map(([term, value]) => <div key={term} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/7 px-4 py-3"><dt className="text-sm font-semibold text-white/55">{term}</dt><dd className="text-right font-black text-white">{value}</dd></div>)}</dl>
          <a href={a3pConfig.rncpUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex font-black text-emerald-300 transition hover:text-white">Consulter la fiche France compétences →</a>
        </article>
      </div>
      <article className="mt-5 overflow-hidden rounded-[2rem] border border-academy-line bg-[#FFFDF8] p-6 shadow-soft lg:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><Label>Insertion nationale</Label><h3 className="mt-3 text-3xl font-black">Données historiques de la certification.</h3></div><p className="max-w-xl text-sm font-semibold leading-6 text-academy-muted">Statistiques nationales France compétences figurant dans la fiche RNCP fournie. Elles concernent la certification, pas les résultats propres à Intégrale Academy.</p></div>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-[720px] w-full border-separate border-spacing-y-2 text-left text-sm">
            <thead><tr className="text-xs uppercase tracking-[.12em] text-academy-muted"><th className="px-4 py-2">Année</th><th className="px-4 py-2">Certifiés</th><th className="px-4 py-2">Insertion globale à 6 mois</th><th className="px-4 py-2">Métier visé à 6 mois</th><th className="px-4 py-2">Métier visé à 2 ans</th></tr></thead>
            <tbody>{a3pInsertionStats.map((row) => <tr key={row.year} className="bg-white font-bold"><td className="rounded-l-2xl px-4 py-4 font-black">{row.year}</td><td className="px-4 py-4">{row.certified}</td><td className="px-4 py-4">{row.global}</td><td className="px-4 py-4">{row.targetJob}</td><td className="rounded-r-2xl px-4 py-4">{row.targetJobTwoYears}</td></tr>)}</tbody>
          </table>
        </div>
        <details className="group mt-6 rounded-[1.4rem] border border-academy-line bg-white p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black"><span>Autres informations de la fiche RNCP</span><span className="grid h-8 w-8 place-items-center rounded-full bg-academy-bg transition group-open:rotate-45">+</span></summary>
          <div className="mt-5 grid gap-3 border-t border-academy-line pt-5 md:grid-cols-3">
            <div className="rounded-2xl bg-academy-bg p-4"><p className="text-xs font-black uppercase tracking-[.12em] text-academy-muted">Voies d’accès recensées</p><p className="mt-2 text-sm font-bold leading-6">Apprentissage, formation continue, contrat de professionnalisation, candidature individuelle et VAE.</p></div>
            <div className="rounded-2xl bg-academy-bg p-4"><p className="text-xs font-black uppercase tracking-[.12em] text-academy-muted">Blocs et correspondances</p><p className="mt-2 text-sm font-bold leading-6">{a3pConfig.certificationStructure}. Aucune correspondance déclarée avec une autre certification.</p></div>
            <div className="rounded-2xl bg-academy-bg p-4"><p className="text-xs font-black uppercase tracking-[.12em] text-academy-muted">Historique</p><p className="mt-2 text-sm font-bold leading-6">La certification RNCP38002 remplace la certification antérieure RNCP35098.</p></div>
          </div>
          <p className="mt-4 text-xs font-semibold leading-5 text-academy-muted">Ces voies sont celles de la certification nationale ; leur disponibilité chez Intégrale Academy doit être confirmée avec l’équipe admissions.</p>
        </details>
      </article>
    </Section>

    <TrainingDatesPricingSection
      priceYear={2027}
      id="dates-tarifs"
      eyebrow="08 — Dates & tarifs"
      sessions={sessions}
      theme="green"
      seatCapacity={12}
      defaultPrice={a3pConfig.priceLabel}
      defaultLocation={a3pConfig.location}
      priceDescription={`Formation complète de ${a3pConfig.durationHours} · examen final`}
      benefits={['CPF', 'France Travail', 'Paiement échelonné', 'Hébergement possible']}
      registrationHref={sessionRegistrationHref}
      priceAction={{ href: a3pContact('financement-a3p'), label: 'Étudier mon financement →' }}
      emptyAction={{ href: a3pContact('alerte-session'), label: 'Recevoir les prochaines dates →' }}
    />

    <Section id="inscription" label="09 — Inscription" title="Un parcours vérifié avant la rentrée." intro="L’admission tient compte des délais de financement et d’instruction CNAPS. Il est recommandé d’engager les démarches dès que votre projet est confirmé." tone="paper">
      <div className="grid gap-3 md:grid-cols-5">{a3pEnrollmentSteps.map(([number, title, body]) => <article key={number} className="rounded-[1.5rem] border border-academy-line bg-academy-bg p-5"><span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-600 text-xs font-black text-white">{number}</span><h3 className="mt-5 text-base font-black">{title}</h3><p className="mt-2 text-xs font-semibold leading-6 text-academy-muted">{body}</p></article>)}</div>
      <div className="mt-5 grid gap-5 rounded-[1.75rem] border border-emerald-200 bg-emerald-50 p-6 lg:grid-cols-[1fr_auto] lg:items-center"><div><Label>Accessibilité et handicap</Label><h3 className="mt-2 text-2xl font-black text-emerald-950">Anticipez vos besoins d’aménagement.</h3><p className="mt-3 max-w-4xl text-sm font-semibold leading-7 text-emerald-900/75">Signalez votre situation avant l’inscription. L’équipe étudie avec vous les adaptations possibles au regard des objectifs, des exercices pratiques et des exigences de certification ; si nécessaire, elle vous oriente vers une solution adaptée.</p></div><CTA href={a3pContact('accessibilite-handicap')} className="shrink-0">Étudier mes besoins →</CTA></div>
    </Section>

    <section id="debouches" className="bg-[#FFFDF8] px-4 py-14 sm:py-18 lg:py-20"><div className="page-container">
      <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]"><div className="rounded-[2rem] border border-emerald-200 bg-[linear-gradient(145deg,#D1FAE5,#F0FDF4)] p-7 shadow-soft"><Label>Hébergement</Label><h2 className="mt-3 text-3xl font-black tracking-[-.045em]">Restez sur place pendant votre formation.</h2><p className="mt-4 text-sm font-semibold leading-7 text-academy-muted">Une solution collective peut être proposée à l’école, sous réserve de disponibilité et de réservation préalable.</p><p className="mt-6 text-5xl font-black tracking-[-.05em] text-emerald-800">{a3pConfig.accommodationPriceLabel}</p><p className="mt-2 text-xs font-semibold leading-6 text-academy-muted">{a3pConfig.accommodationNote}</p><CTA href={a3pContact('hebergement-a3p')} className="mt-6">Vérifier les disponibilités →</CTA></div><div className="grid grid-cols-2 gap-3 rounded-[2rem] border border-emerald-100 bg-emerald-50/60 p-5 sm:p-6">{['Dortoir collectif', 'Cuisine équipée', 'Salle de bain & douche', 'Machine à laver', 'Sèche-linge', 'Espaces communs'].map((item) => <span key={item} className="rounded-2xl border border-emerald-100 bg-white p-4 text-xs font-black before:mr-2 before:text-emerald-600 before:content-['✓']">{item}</span>)}</div></div>

      <div className="mt-14 grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] bg-[#0D1725] p-7 text-white shadow-card"><Label light>10 — Débouchés</Label><h2 className="mt-3 text-3xl font-black tracking-[-.045em] sm:text-4xl">Après le TFP A3P.</h2><div className="mt-6 flex flex-wrap gap-2">{jobs.map((job) => <span key={job} className="rounded-full border border-white/12 bg-[#182537] px-4 py-2 text-[.68rem] font-black">{job}</span>)}</div><p className="mt-6 text-xs font-medium leading-6 text-white/55">La certification ne garantit pas un emploi. Le recrutement dépend aussi de l’expérience, du réseau, de la mobilité et des compétences complémentaires.</p></div>
        <div className="rounded-[2rem] border border-academy-line bg-white p-7 shadow-soft"><Label>Employeurs et secteurs</Label><h2 className="mt-3 text-2xl font-black tracking-[-.04em]">Des contextes d’exercice variés.</h2><div className="mt-5 grid gap-2 sm:grid-cols-2">{a3pEmployerSectors.map((sector) => <span key={sector} className="rounded-xl bg-[#F3EEE5] px-3 py-2 text-[.65rem] font-black before:mr-2 before:text-emerald-600 before:content-['✓']">{sector}</span>)}</div></div>
      </div>

      <div className="mt-5 rounded-[2rem] border border-academy-line bg-white p-7 shadow-soft"><Label>Rémunération</Label><h2 className="mt-3 text-2xl font-black tracking-[-.04em]">Un niveau variable selon les missions.</h2><p className="mt-4 max-w-4xl text-sm font-semibold leading-7 text-academy-muted">Le type de mission, la durée, le niveau de risque et l’expérience influencent fortement la rémunération.</p><div className="mt-5 flex flex-wrap gap-2">{salaryFactors.map((factor) => <span key={factor} className="rounded-full bg-[#F3EEE5] px-3 py-2 text-[.65rem] font-black">{factor}</span>)}</div></div>

      <div className="mt-5 grid items-center gap-6 rounded-[2rem] bg-emerald-600 p-6 text-white shadow-[0_24px_65px_rgba(5,150,105,.22)] lg:grid-cols-[1.2fr_.55fr_auto]"><div><Label light>Parcours recommandé</Label><h2 className="mt-2 text-2xl font-black tracking-[-.035em]">Double compétence APS + A3P</h2><p className="mt-2 text-xs font-semibold text-white/80">Élargissez les missions accessibles et renforcez votre polyvalence.</p></div><div><p className="text-3xl font-black">{a3pConfig.apsA3pOffer.priceLabel}</p><p className="text-xs font-bold text-white/75">Tarifs individuels 2027 : {a3pConfig.apsA3pOffer.oldPriceLabel} · {a3pConfig.apsA3pOffer.discountLabel}</p></div><CTA href={a3pConfig.apsA3pOffer.href} variant="dark">Découvrir le parcours →</CTA></div>
    </div></section>

    <Section label="11 — Intégrale Academy" title="Un cadre sérieux pour un métier exigeant." intro="Des éléments concrets et vérifiables, directement liés au parcours A3P." tone="stone">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[
        ['Agrément', 'Centre agréé ADEF A3P', `N° ${a3pConfig.adefApproval}`],
        ['Intensité', a3pConfig.durationHours, a3pConfig.practiceHours],
        ['Terrain', 'Environnements variés', 'Exercices et scénarios réalistes'],
        ['Accompagnement', 'Dossier CNAPS expliqué', 'Prérequis vérifiés avant inscription'],
        ['École', 'Hébergement possible', 'Solution collective sur réservation'],
        ['Pédagogie', 'Formateurs expérimentés', 'Intervenants liés aux compétences enseignées'],
      ].map(([key, title, body]) => <article key={key} className="rounded-[1.6rem] border border-academy-line bg-[#FFFDF8] p-6 shadow-soft"><Label>{key}</Label><h3 className="mt-6 text-lg font-black tracking-[-.03em]">{title}</h3><p className="mt-2 text-xs font-semibold leading-6 text-academy-muted">{body}</p></article>)}</div>
    </Section>

    <TrainingCourseTestimonials category="A3P" />

    <div id="faq-a3p"><PremiumFAQSection theme="green" badge="12 — FAQ A3P" title="Tout savoir avant de vous inscrire" description="Retrouvez les réponses aux questions les plus fréquentes sur la formation A3P, les prérequis CNAPS, le financement, l’hébergement et l’examen." items={a3pFaq} contactHref={a3pContact('question-faq-a3p')} /></div>

    <TrainingReferenceContact
      description="Cassandre vérifie vos prérequis, vous présente les prochaines dates et étudie les solutions de financement adaptées à votre situation."
      href={a3pContact('rdv-telephonique')}
    />
    <TrainingReferenceMobileBar href={a3pContact('mobile-dossier-a3p')} label="Recevoir le dossier" />
  </TrainingReferencePage>;
}
