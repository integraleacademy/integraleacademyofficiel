import { CourseBrochureCard } from '@/components/CourseBrochureCard';
import { TrainingCourseSections, TrainingReferencePage, TrainingReferenceHero, TrainingReferenceSection as Section, TrainingReferenceCampus, TrainingReferenceContact, TrainingReferenceMobileBar } from '@/components/TrainingReferenceLayout';
import { TrainingCourseTestimonials } from '@/components/TrainingCourseTestimonials';

import { originalArtwork } from '@/data/originalArtwork';
import { CourseJourney } from '@/components/CourseJourney';
import { serializeCourseJsonLd } from '@/lib/seo';
import { informationRequestHref } from '@/lib/contact-request';
import Link from 'next/link';
import { TrainingHeroSessionCard } from '@/components/TrainingHero';
import { TrainingMissionCards } from './TrainingMissionCards';
import { TrainingPracticeCards } from './TrainingPracticeCards';
import { TrainingAdmission, TrainingExamExperience, TrainingOfficialReferences } from './ApsExperienceSections';
import { TrainingFundingOptions } from './TrainingFundingOptions';
import reference from './ApsReferencePage.module.css';
import Image from 'next/image';
import { FaqDirectoryLink } from '@/components/FaqDirectoryLink';
import { CourseFilm } from '@/components/CourseFilm';
import { TrainingSectionNavigation } from '@/components/TrainingSectionNavigation';
import { TrainingDatesPricingSection } from '@/components/TrainingDatesPricingSection';
import styles from './A3pReferencePage.module.css';
import experience from './ApsExperience.module.css';
import editorial from './ApsEditorial.module.css';
import { TrainingProgramDownload } from '@/components/TrainingProgramDownload';
import { TrainingProgramExplorer } from '@/components/TrainingProgramExplorer';
import { IntegraleWelcomePack } from '@/components/IntegraleWelcomePack';
import { ManualArtwork } from '@/components/ManualArtwork';
import { a3pArtwork, a3pPracticeArtwork } from '@/data/manualIllustrations';
import { a3pConfig, a3pContact, a3pEmployerSectors, a3pEnrollmentSteps, a3pInsertionStats, a3pPrerequisites, a3pProgram, a3pWorkConditions } from '@/data/a3p';

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
  { title: 'Préparation de mission', text: 'Recueillir les informations, définir les moyens et préparer les itinéraires pour organiser une mission complète.', scene: 'mission-map', icon: '▤', focus: '36%' },
  { title: 'Analyse des risques', text: 'Identifier les menaces et les vulnérabilités, puis adapter le dispositif à la personne protégée et à son environnement.', scene: 'risk-radar', icon: '◎', focus: '50%' },
  { title: 'Reconnaissance de sites', text: 'Étudier les accès, les zones d’arrivée, les cheminements et les solutions de repli avant le déroulement de la mission.', scene: 'site-check', icon: '⌖', focus: '36%' },
  { title: 'Déplacements pédestres', text: 'Travailler les positionnements, les déplacements en équipe et la communication autour de la personne protégée.', scene: 'close-protection', icon: '↗', focus: '34%' },
  { title: 'Dispositifs véhiculés', text: 'Préparer les trajets, les arrivées et les départs, puis coordonner les déplacements avec les autres membres du dispositif.', scene: 'secure-vehicle', icon: '⇄', focus: '39%' },
  { title: 'Scénarios professionnels', text: 'Réagir à une situation imprévue, reconnaître une anomalie et coordonner une réponse adaptée pendant les exercices encadrés.', scene: 'hazard', icon: '◇', focus: '36%' },
  { title: 'Secours aux personnes', text: 'S’entraîner aux gestes de secours, à l’alerte et à la coordination de l’intervention dans le cadre des séquences de secourisme.', scene: 'cpr', icon: '✚', focus: '36%' },
  { title: 'Briefings & débriefings', text: 'Partager les consignes, répartir les rôles, rendre compte de la mission et analyser les décisions avec le formateur.', scene: 'briefing', icon: '☏', focus: '42%' },
] as const;

const examSteps = [
  ['QCU contextualisés', 'Les connaissances de chaque UV sont vérifiées dans des situations proches du métier.'],
  ['Épreuves pratiques', 'Des grilles déclarent le candidat apte ou inapte, avec une épreuve commune aux UV6 et UV7 et une évaluation de l’anglais professionnel.'],
  ['Mission complète', 'Au moins une mission est préparée et exécutée en conditions réelles ; le candidat constitue le dossier présenté au jury.'],
  ['Soutenance devant jury', 'Le candidat expose sa préparation, justifie ses décisions et répond aux questions portant sur la mission et le métier.'],
];

const jobs = ['Agent de protection rapprochée', 'Agent de protection physique des personnes', 'Garde du corps', 'Conducteur de sécurité', 'Agent privé de protection'];
const salaryFactors = ['Niveau de risque', 'Durée', 'Horaires', 'Mobilité', 'Conduite', 'Langues', 'Expérience', 'Réputation'];
const registrationFormUrl = informationRequestHref({ formation: a3pConfig.slug });
const a3pNavigationItems = [
  { label: 'Métier', href: '#metier' },
  { label: 'Admission', href: '#admission' },
  { label: 'Immersion', href: '#pedagogie' },
  { label: 'Programme', href: '#programme' },
  { label: 'Examen', href: '#examen' },
  { label: 'Dates & tarifs', href: '#dates-tarifs' },
  { label: 'Inscriptions', href: '#inscription-financement' },
  { label: 'Débouchés', href: '#debouches' },
  { label: 'FAQ', href: '#faq-a3p' },
] as const;

export function A3pReferencePage({ sessions }: { sessions: any[] }) {
  return <TrainingReferencePage theme="green" className={styles.course}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeCourseJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Course', name: 'Formation A3P : devenez agent de protection rapprochée', description: `Formation officielle TFP A3P à Puget-sur-Argens, ${a3pConfig.durationHours}, RNCP niveau 4.`, provider: { '@type': 'Organization', name: 'Intégrale Academy', telephone: a3pConfig.advisor.phone } },
        { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: '/' }, { '@type': 'ListItem', position: 2, name: 'Formations sécurité', item: '/formations-securite' }, { '@type': 'ListItem', position: 3, name: 'A3P APR', item: a3pConfig.pageUrl }] },
      ],
    }, "/formations-securite/a3p-apr") }} />

    <TrainingReferenceHero
      id="a3p" badge="Formation TFP A3P"
      heading="Devenez agent de" accent="protection rapprochée"
      title="Formation agent de protection rapprochée"
      tagline="Apprenez le métier sur le terrain"
      description={<p>Préparez, organisez et sécurisez les déplacements de personnes exposées. Une formation réglementée, intensive et résolument tournée vers les réalités du terrain.</p>}
      illustration={a3pArtwork.protection} caption="Anticiper, sécuriser et protéger"
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


    <CourseFilm film="a3p" followPageSound title="Se former à la protection rapprochée"
      description="Découvrez la formation A3P d’Intégrale Academy à Puget-sur-Argens, sur la Côte d’Azur." />

    <CourseJourney course="a3p">
      <Section id="metier" label="01 — Le métier" title={<>Protéger, anticiper, <span className="decoration-emerald-500 decoration-[.16em] underline underline-offset-[-.03em]">décider</span></>} intro="L’agent de protection physique des personnes assure la sécurité de dirigeants, personnalités, artistes ou toute personne exposée. Son rôle : préparer la mission, analyser les risques et protéger avec efficacité, proportionnalité et discrétion."
        fullWidthFooter={
          <CourseFilm film="neo" followPageSound title="C’est quoi, le métier" titleAccent="de garde du corps ?"
            description="Après vingt ans en protection rapprochée, Véronique forme les futurs gardes du corps chez Intégrale Academy. Au micro de Néo, elle raconte son métier." />
        }>
        <TrainingMissionCards items={[
          ...métierCards.map(([, title, description], index) => ({
            title, description, illustration: [originalArtwork['a3p-mission-preparation'], originalArtwork['a3p-mission-trajets'], a3pArtwork.discretion][index],
            landscapeFocus: '50% 32%',
          })),
          { title: 'De la préparation au débriefing', description: 'Une lecture concrète du métier avant le détail du programme.',
            illustration: originalArtwork['a3p-mission-ensemble'], body: <>
              <p><strong>Protection en mouvement</strong> · Reconnaître · encadrer · sécuriser</p>
              <p className="mt-2 text-sm">Mission simulée · Dispositif actif</p>
              <p className="mt-4 font-bold">Une mission, cinq temps forts</p>
              <ol className={styles.missionSteps}>{['Briefing', 'Reconnaissance', 'Dispositif', 'Déplacement', 'Débriefing'].map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}</ol>
            </> },
        ]} />
        <article className={`${reference.liftCard} mt-8 grid gap-5 rounded-[2rem] border border-academy-line bg-white p-6 shadow-soft lg:grid-cols-[.7fr_1.3fr] lg:p-8`}>
          <div><Label>À qui s’adresse la formation ?</Label><h3 className="mt-3 text-3xl font-black">Un parcours ouvert à plusieurs profils</h3></div>
          <ul className="grid gap-3 sm:grid-cols-2">{audiences.map(audience => <li key={audience} className="flex items-center gap-3 rounded-2xl bg-academy-bg p-4 font-bold">
            <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-100 text-xs font-black text-emerald-800">✓</span>{audience}
          </li>)}</ul>
        </article>
      </Section>
    </CourseJourney>

    <TrainingCourseSections
      admission={
        <Section id="admission" label="02 — Admission" title={<>Votre dossier est-il prêt pour l’A3P&nbsp;?</>}
          intro="L’activité est réglementée. L’autorisation ou la carte CNAPS, l’honorabilité, le niveau B1 et, le cas échéant, la situation administrative sont vérifiés avant la rentrée." tone="stone">
          <TrainingAdmission course="a3p" action={a3pContact('etude-profil')} actionLabel="Faire le point"
            lead={<><h3>Votre projet.<br />Votre dossier.<br /><em>On s’en occupe ensemble</em></h3>
              <p className={experience.admissionSupport}><strong>Êtes-vous éligible à la formation A3P ?</strong></p>
              <p><strong>Candidature personnalisée · Votre profil est étudié individuellement</strong></p>
              <p>Une expérience militaire ou policière est un atout, mais elle n’est pas obligatoire. Nous vérifions votre projet avant l’inscription.</p></>}
            points={a3pPrerequisites.map(item => ({ title: item.title, content: <div className={styles.requirementCopy}>
              {item.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{item.note && <p><strong>{item.note}</strong></p>}
            </div> }))}
            afterPoints={<CTA href={a3pContact('verification-prerequis')} className="mt-6">Vérifier mes prérequis →</CTA>}
          />
        </Section>
      }
      immersion={
        <>
          <Section id="competences" label="03 — Compétences" title={<>Ce que vous saurez faire <span className="decoration-emerald-500 decoration-[.16em] underline underline-offset-[-.03em]">sur le terrain</span></>} intro="Les compétences du bloc unique sont présentées en cinq piliers métier. Le programme officiel détaillé par unité de valeur figure juste après.">
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
          <Section id="pedagogie" label="05 — Immersion & pédagogie" title={<>Un terrain d’entraînement qui <span className="text-emerald-300">ressemble au vrai</span></>} intro="Zones urbaines, axes routiers et environnements variés permettent de construire des exercices réalistes entre Cannes et Saint-Tropez." tone="dark">
            <TrainingPracticeCards items={practices.map(practice => ({
              title: practice.title, text: practice.text, icon: practice.icon,
              visuals: [{ kind: practice.scene, illustration: <div className={styles.landscapeArt}>
                <Image {...a3pPracticeArtwork[practice.scene]} fill sizes="(max-width: 767px) 90vw, 540px" style={{ objectPosition: `50% ${practice.focus}` }} />
              </div> }],
            }))} />
            <div className="mt-7 grid gap-4 rounded-[1.7rem] border border-emerald-300/25 bg-emerald-400/10 p-6 lg:grid-cols-[auto_1fr] lg:items-center">
              <span aria-hidden="true" className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-300 text-2xl font-black text-emerald-950">✓</span>
              <div><Label light>École de Puget-sur-Argens</Label><h3 className="mt-2 text-xl font-black text-emerald-200">Entraînez-vous dans des configurations variées</h3><p className="mt-2 max-w-4xl leading-7 text-white/70">La progression alterne démonstrations, exercices individuels, travail en équipe, scénarios professionnels et débriefings.</p></div>
            </div>
          </Section>
        </>
      }
      campus={<TrainingReferenceCampus editorialId="ecole-a3p" groupLabel="Par session A3P" />}
      brochure={<CourseBrochureCard course="a3p-apr" />}
      program={
        <Section id="programme" label="04 — Programme" title={<>328 heures pour devenir <em>opérationnel</em></>} intro="Le programme réglementaire comporte neuf unités de valeur : 41 heures de socle de base et 287 heures de spécialité A3P, soit 328 heures hors examen dont 92 heures et 50 minutes de pratique.">
          <TrainingProgramDownload href={a3pConfig.programPdfUrl} course="A3P" theme="green" detailLabel="(PDF) ↗" className="mb-6 w-full sm:w-auto" />
          <TrainingProgramExplorer
            idPrefix="a3p-uv"
            units={a3pProgram.map(item => ({ number: item.code, title: item.title, duration: item.duration, delivery: item.practice, description: item.description, items: item.items }))}
            menuTitle="Voir le détail des 9 unités de valeur réglementaires"
            tabListLabel="Voir le détail des 9 unités de valeur réglementaires"
          >
            <div className={experience.programOverview}>
              <div className={experience.programSummary}>
                <Label>Formation réglementée</Label>
                <div className={experience.programHours}><strong>328 <span>h</span></strong><p>Hors examen<br /><span>100 % en présentiel</span></p></div>
                <ul className={styles.programFacts}>
                  <li>✓ 41 h de socle de base</li><li>✓ 287 h de spécialité A3P</li>
                  <li>✓ 92 h 50 de pratique</li><li>✓ 9 unités de valeur</li><li>✓ Mission complète et jury</li>
                </ul>
              </div>
              <ManualArtwork illustration={{ src: '/images/a3p/manuel/couverture-a3p.webp', alt: 'Couverture du manuel A3P' }} natural sizes="(max-width: 550px) 80vw, 260px" />
            </div>
            <ol className={styles.phases}>
              {programPhases.map(([number, title, body]) => <li key={number}>
                <span>{number}</span><h3>{title}</h3><p>{body}</p>
              </li>)}
            </ol>
          </TrainingProgramExplorer>
        </Section>
      }
      pack={<IntegraleWelcomePack course="a3p" />}
      exam={
        <div id="certification">
          <Section id="examen" label="06 — Examen" title={<>Un examen qui valide <em>vos décisions</em></>} intro="L’évaluation vérifie les connaissances réglementaires et votre capacité à préparer puis exécuter une mission de protection physique des personnes." tone="dark">
            <TrainingExamExperience metric="9" suffix=" UV" label="Unités de valeur" description="À valider pour le TFP A3P"
              theory={<><p className={experience.kicker}>01 · Les connaissances</p><h3>QCU<span>{examSteps[0][0]}</span></h3>
                <p>{examSteps[0][1]}</p><ul>{[
                  ['Note ≥ 12/20', 'Unité de valeur acquise'],
                  ['8/20 ≤ note < 12/20', 'Candidat ajourné, nouvelle session d’examen possible'],
                  ['Note < 8/20', 'Module de formation à suivre de nouveau'],
                ].map(([score, result]) => <li key={score}><span><strong>{score}</strong><br />{result}</span></li>)}</ul></>}
              practice={<><Image src="/images/formation-scenes-manuel/desp-vae-jury.webp" alt="Une candidate présente son dossier devant un jury professionnel." width={1536} height={1024} sizes="(max-width: 800px) 92vw, 740px" />
                <div><p className={experience.kicker}>02 · La pratique</p><h3>{examSteps[1][0]}</h3>
                  <div className={experience.examSituations}><p><strong>{examSteps[2][0]}</strong><span>{examSteps[2][1]}</span></p><p><strong>Évaluation en situation</strong><span>{examSteps[1][1]}</span></p></div>
                </div></>}
              validation={<><div><p className={experience.kicker}>03 · {examSteps[3][0]}</p><p>{examSteps[3][1]}</p></div><strong>TFP A3P<small>{a3pConfig.level} · {a3pConfig.rncp}</small></strong></>}>
              <details className={experience.examMore}><summary>Les modalités de l’examen et la suite du parcours <span className={experience.plus} aria-hidden="true">+</span></summary>
                <div className={experience.examMoreGrid}>
                  <article><h4>Validation des épreuves</h4><p>Les évaluations pratiques utilisent une grille de critères et conduisent à un résultat « apte » ou « inapte ». La certification est constituée d’un bloc unique : toutes les exigences du métier réglementé doivent être validées.</p></article>
                  <article><h4>Après réussite</h4><p><strong>TFP A3P → Demande CNAPS → Carte professionnelle → Exercer</strong></p>
                    <p>La certification permet de justifier l’aptitude professionnelle nécessaire à la demande de carte. La délivrance de la carte reste une décision du CNAPS.</p></article>
                </div><a href={a3pConfig.rncpUrl} target="_blank" rel="noopener noreferrer">Consulter la fiche officielle du TFP A3P ↗</a>
              </details>
            </TrainingExamExperience>
          </Section>
        </div>
      }
      dates={
        <TrainingDatesPricingSection
          compact showDeliveryPeriods deliveryMode="in-person" initialSessionLimit={2}
          showSessionTitle showSessionPrice={false} underlineDisclosure={false}
          inPersonPeriodFallback="328 h à l’école · calendrier détaillé à confirmer"
          priceYear={2027}
          id="dates-tarifs"
          eyebrow="08 — Dates & tarifs"
          sessions={sessions}
          theme="green"
          seatCapacity={12}
          defaultPrice={a3pConfig.priceLabel}
          defaultLocation={a3pConfig.location}
          priceDescription={`Formation complète de ${a3pConfig.durationHours} · examen final`}
          registrationHref={sessionRegistrationHref}
          priceAction={{ href: a3pContact('financement-a3p'), label: 'Étudier mon financement →' }}
          emptyAction={{ href: a3pContact('alerte-session'), label: 'Recevoir les prochaines dates →' }}
        />
      }
      enrollment={
        <>
          <section id="inscription-financement" className={editorial.enrollment}>
            <div id="inscription" className={editorial.wrap}>
              <p className={editorial.kicker}>09 — Inscription &amp; financement</p>
              <header className={editorial.intro}><div>
                <h2><span>Du premier appel à votre entrée en formation.</span><span>Nous vous accompagnons de A à Z</span></h2>
                <p><strong>Un parcours vérifié avant la rentrée</strong><br />L’admission tient compte des délais de financement et d’instruction CNAPS. Il est recommandé d’engager les démarches dès que votre projet est confirmé.</p>
              </div><CTA href={registrationFormUrl}>Commencer mon inscription →</CTA></header>
              <ol className={editorial.steps}>{a3pEnrollmentSteps.map(([number, title, body]) => (
                <li key={number}><span className={editorial.stepNumber}>{number.padStart(2, '0')}</span><div><h3>{title}</h3><p>{body}</p>
                  {number === '1' && <a href={a3pConfig.advisor.phoneHref}>Appeler le {a3pConfig.advisor.phone} →</a>}
                  {number === '3' && <a href={a3pContact('financement-a3p')}>Étudier mon financement →</a>}
                </div></li>
              ))}</ol>
              <article className={editorial.funding}>
                <div className={editorial.fundingTitle}><p className={editorial.kicker}>Votre financement</p><h3>Préparez votre financement</h3><p className="mt-3 text-sm text-white/80">Simulez votre reste à charge. Estimez le montant restant après vos aides et votre CPF.</p></div>
                <div className={editorial.identity}><p>Vous envisagez d’utiliser votre CPF ?</p><p>Pour valider votre inscription sur Mon Compte Formation, préparez votre accès FranceConnect+.</p>
                  <a href="https://www.moncompteformation.gouv.fr/espace-public/france-connect-comment-vous-inscrire-votre-formation" target="_blank" rel="noopener noreferrer">Consulter les démarches sur Mon Compte Formation →</a></div>
                <div className={editorial.fundingActions}><CTA href={a3pContact('financement-a3p')}>Faire étudier mon financement</CTA><CTA href="/financements#simulateur" variant="light">Ouvrir le simulateur →</CTA></div>
              </article>
              <TrainingFundingOptions options={[
                ['CPF', 'Selon éligibilité, mobilisez les droits disponibles sur votre compte.'],
                ['France Travail', 'Votre conseiller étudie votre demande de prise en charge selon votre projet.'],
                ['Employeur ou OPCO', 'Présentez votre projet de formation à votre employeur pour étudier le financement.'],
                ['Financement personnel', 'Paiement échelonné selon votre dossier. L’équipe vous présente les modalités.'],
              ]} />
              <aside className={styles.accessibility}><div><Label>Accessibilité et handicap</Label><h3>Anticipez vos besoins d’aménagement</h3>
                <p>Signalez votre situation avant l’inscription. L’équipe étudie avec vous les adaptations possibles au regard des objectifs, des exercices pratiques et des exigences de certification ; si nécessaire, elle vous oriente vers une solution adaptée.</p>
              </div><CTA href={a3pContact('accessibilite-handicap')} variant="light">Étudier mes besoins →</CTA></aside>
            </div>
          </section>
          <Section id="hebergement" label="Hébergement" title="Restez sur place pendant votre formation" intro="Une solution collective peut être proposée à l’école, sous réserve de disponibilité et de réservation préalable." tone="paper">
            <div className={styles.lodging}>
              <div>
                <strong>{a3pConfig.accommodationPriceLabel}</strong><p>{a3pConfig.accommodationNote}</p>
                <CTA href={a3pContact('hebergement-a3p')}>Vérifier les disponibilités →</CTA>
              </div>
              <ul>{['Dortoir collectif', 'Cuisine équipée', 'Salle de bain & douche', 'Machine à laver', 'Sèche-linge', 'Espaces communs'].map(item => <li key={item}>{item}</li>)}</ul>
            </div>
          </Section>
        </>
      }
      outcomes={
        <Section id="debouches" label="10 — Débouchés & emploi" title="Après le TFP A3P" intro="La certification ne garantit pas un emploi. Le recrutement dépend aussi de l’expérience, du réseau, de la mobilité et des compétences complémentaires." tone="paper">
          <div className="mb-8 grid gap-4 md:grid-cols-3">{[
            ['Les employeurs', 'Travailler en agence', 'Les agences de protection rapprochée et les entreprises de sécurité privée font partie des employeurs du secteur.', 'border-emerald-200 bg-emerald-50'],
            ['Les missions', 'Accompagner différents clients', 'Dirigeants, personnalités et clients privés peuvent solliciter un accompagnement lors de leurs déplacements.', 'border-sky-200 bg-sky-50'],
            ['Votre parcours', 'Élargir vos possibilités', 'La double compétence permet aussi de candidater à des missions de prévention et de surveillance.', 'border-yellow-300 bg-yellow-50'],
          ].map(([label, title, body, color]) => <article key={title} className={`${reference.outcomeCard} rounded-[1.7rem] border p-6 ${color}`}><Label>{label}</Label><h3 className="mt-3 text-2xl font-black">{title}</h3><p className="mt-3 leading-7 text-academy-muted">{body}</p></article>)}</div>
          <ol className="grid gap-4 md:grid-cols-4">{[
            ['Réussir le TFP A3P', 'Valider les épreuves'], ['Recevoir le titre de niveau 4', 'Obtenir la certification'],
            ['Demander la carte CNAPS', 'Constituer le dossier'], ['Commencer à exercer', 'Après délivrance de la carte'],
          ].map(([title, body], index) => <li key={title} className={`${reference.examCard} rounded-[1.7rem] border border-academy-line bg-white p-5 text-center`}>
            <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-academy-gold font-black">0{index + 1}</span><h3 className="mt-6 text-lg font-black">{title}</h3><p className="mt-2 text-sm text-academy-muted">{body}</p>
          </li>)}</ol>
          <div className="mt-5 rounded-[1.4rem] border border-yellow-300 bg-yellow-50 p-4 font-bold text-yellow-900">La délivrance de la carte professionnelle relève du CNAPS.</div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-academy-line bg-white p-6"><Label>Débouchés</Label><h3 className="mt-3 text-3xl font-black">Les métiers accessibles</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">{jobs.map((job, index) => <li key={job} className={reference.jobCard}><span className={reference.jobIcon} aria-hidden="true">{['◎', '◉', '◇', '⇄', '⌖'][index]}</span><span className="text-sm font-black leading-5">{job}</span></li>)}</ul>
            </article>
            <article id="double-competence" className={reference.dualSkill}>
              <Label>Parcours recommandé</Label><h3>Double compétence <span className={styles.dualTitle}>A3P + APS</span></h3>
              <p className={reference.dualIntro}>Élargissez les missions accessibles et renforcez votre polyvalence.</p>
              <div className={reference.dualPanels}>
                <div className={styles.dualProtection}><span className={reference.dualLabel}>TFP A3P</span>
                  <ManualArtwork illustration={{ src: '/images/planning-metiers/a3p.webp', alt: 'Un agent accompagne une cliente lors de son déplacement.' }} className={styles.dualImage} />
                  <h4>Protéger une personne</h4><p>Accompagner un client dans ses déplacements privés ou professionnels.</p></div>
                <span aria-hidden="true" className={reference.dualPlus}>+</span>
                <div className={reference.dualSecurity}><span className={reference.dualLabel}>TFP APS</span>
                  <ManualArtwork illustration={originalArtwork['aps-metier-site']} className={styles.dualImage} />
                  <h4>Prévenir &amp; surveiller</h4><p>Rondes, contrôle d’accès, protection des personnes et des biens.</p>
                  <Link href="/formations-securite/aps" className="mt-2 inline-block text-xs font-bold text-blue-800 underline underline-offset-4">Voir la formation APS ↗</Link></div>
              </div>
              <div className={reference.dualFooter}><div className={styles.offerPrice}><strong>{a3pConfig.apsA3pOffer.priceLabel}</strong> TTC <del>{a3pConfig.apsA3pOffer.oldPriceLabel}</del></div>
                <p>Tarifs individuels 2027 : {a3pConfig.apsA3pOffer.oldPriceLabel} · {a3pConfig.apsA3pOffer.discountLabel}</p>
                <CTA href={a3pConfig.apsA3pOffer.href} className="mt-4 w-full">Découvrir le parcours →</CTA></div>
            </article>
          </div>
          <article className={experience.workplaces}>
            <div><Label>Employeurs et secteurs</Label><h2 className={styles.subheading}>Des contextes d’exercice variés</h2></div>
            <ul>{a3pEmployerSectors.map(sector => <li key={sector}>{sector}</li>)}</ul>
          </article>
          <article className={experience.workplaces}>
            <div><Label>Rémunération</Label><h2 className={styles.subheading}>Un niveau variable selon les missions</h2><p>Le type de mission, la durée, le niveau de risque et l’expérience influencent fortement la rémunération.</p></div>
            <ul>{salaryFactors.map(factor => <li key={factor}>{factor}</li>)}</ul>
          </article>
        </Section>
      }
      references={
        <>
          <TrainingOfficialReferences course="a3p" number="07" alias="references-rncp"
            title={<>Un titre reconnu.<br /><em>Des repères concrets</em></>}
            intro="Certification, conditions d’exercice et données d’insertion"
            certificateLabel="Identification" qualification="TFP A3P" level={a3pConfig.level} name="Agent de protection physique des personnes"
            registryCode={a3pConfig.rncp} url={a3pConfig.rncpUrl}
            facts={[['Répertoire', a3pConfig.rncp], ['Certificateurs', 'CPNE / ADEF'], ['Code ROME', 'K2503'], ['Code NSF', '344'], ['Formacode', '42812'], ['Échéance RNCP', a3pConfig.rncpExpiry]]}
            conditionsLabel="Réalités du métier" profession="Des conditions qui varient selon la mission" conditions={a3pWorkConditions}
            professionNote="Ces informations complètent la présentation commerciale avec les repères figurant dans la fiche RNCP38002 fournie."
            statsTitle="Données historiques de la certification" statsNote="Statistiques nationales France compétences figurant dans la fiche de certification. Elles concernent la certification, pas les résultats propres à Intégrale Academy."
            stats={a3pInsertionStats.map(row => [row.year, row.certified, row.global, row.targetJob, row.targetJobTwoYears])}
            caption="Promotions 2020 à 2022 — source : fiche RNCP38002" detailsTitle="Autres informations de la fiche RNCP"
            details={<><p><strong>Voies d’accès recensées</strong><br />Apprentissage, formation continue, contrat de professionnalisation, candidature individuelle et VAE.</p>
              <p><strong>Blocs et correspondances</strong><br />{a3pConfig.certificationStructure}. Aucune correspondance déclarée avec une autre certification.</p>
              <p><strong>Historique</strong><br />La certification RNCP38002 remplace la certification antérieure RNCP35098.</p>
              <p>Ces voies sont celles de la certification nationale ; leur disponibilité chez Intégrale Academy doit être confirmée avec l’équipe admissions.</p></>}
          />
          <Section label="11 — Intégrale Academy" title="Un cadre sérieux pour un métier exigeant" intro="Des éléments concrets et vérifiables, directement liés au parcours A3P." tone="stone">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[
              ['Agrément', 'Centre agréé ADEF A3P', `N° ${a3pConfig.adefApproval}`],
              ['Intensité', a3pConfig.durationHours, a3pConfig.practiceHours],
              ['Terrain', 'Environnements variés', 'Exercices et scénarios réalistes'],
              ['Accompagnement', 'Dossier CNAPS expliqué', 'Prérequis vérifiés avant inscription'],
              ['École', 'Hébergement possible', 'Solution collective sur réservation'],
              ['Pédagogie', 'Formateurs expérimentés', 'Intervenants liés aux compétences enseignées'],
            ].map(([key, title, body]) => <article key={key} className="rounded-[1.6rem] border border-academy-line bg-[#FFFDF8] p-6 shadow-soft"><Label>{key}</Label><h3 className="mt-6 text-lg font-black tracking-[-.03em]">{title}</h3><p className="mt-2 text-xs font-semibold leading-6 text-academy-muted">{body}</p></article>)}</div>
          </Section>
        </>
      }
    />

    <div id="course-reviews-title"><TrainingCourseTestimonials category="A3P" layout="home" /></div>

    <div id="faq-a3p"><FaqDirectoryLink embedded theme="green" /></div>

    <TrainingReferenceContact
      schoolStyle
      description="Cassandre, Responsable commerciale, vérifie vos prérequis, vous présente les prochaines dates et étudie les solutions de financement adaptées à votre situation."
      href="https://calendly.com/integraleacademy/apr"
      appointmentLabel="Choisir mon rendez-vous téléphonique"
      callBanner={{
        illustration: '/images/team/cassandre-telephone.webp',
        message: 'Vous envisagez la protection rapprochée ? On peut regarder ensemble si la formation correspond à votre projet.',
      }}
    />
    <TrainingReferenceMobileBar href={a3pContact('mobile-dossier-a3p')} label="Recevoir le dossier" />
  </TrainingReferencePage>;
}
