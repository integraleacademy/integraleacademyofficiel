import { CourseBrochureCard } from '@/components/CourseBrochureCard';
import { TrainingCourseSections, TrainingReferencePage, TrainingReferenceHero, TrainingReferenceSection as Section, TrainingReferenceMissions, TrainingReferenceCampus, TrainingReferenceContact, TrainingReferenceMobileBar } from '@/components/TrainingReferenceLayout';
import { TrainingCourseTestimonials } from '@/components/TrainingCourseTestimonials';

import { originalArtwork } from '@/data/originalArtwork';
import { CourseJourney } from '@/components/CourseJourney';
import { serializeCourseJsonLd } from '@/lib/seo';
import Link from 'next/link';
import { TrainingHeroSessionCard } from '@/components/TrainingHero';
import { MissionAnimation } from '@/components/MissionAnimation';
import { FaqDirectoryLink } from '@/components/FaqDirectoryLink';
import { CourseFilm } from '@/components/CourseFilm';
import { TrainingSectionNavigation } from '@/components/TrainingSectionNavigation';
import { TrainingDatesPricingSection } from '@/components/TrainingDatesPricingSection';
import { TrainingMotionIllustration } from '@/components/TrainingMotionGallery';
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


    <CourseFilm film="a3p" title="Se former à la protection rapprochée"
      description="Découvrez la formation A3P d’Intégrale Academy à Puget-sur-Argens, sur la Côte d’Azur." />

    <CourseJourney course="a3p">
      <Section id="metier" label="01 — Le métier" title={<>Protéger, anticiper, <span className="decoration-emerald-500 decoration-[.16em] underline underline-offset-[-.03em]">décider</span></>} intro="L’agent de protection physique des personnes assure la sécurité de dirigeants, personnalités, artistes ou toute personne exposée. Son rôle : préparer la mission, analyser les risques et protéger avec efficacité, proportionnalité et discrétion."
        fullWidthFooter={
          <CourseFilm film="neo" title="C’est quoi, le métier" titleAccent="de garde du corps ?"
            description="Après vingt ans en protection rapprochée, Véronique forme les futurs gardes du corps chez Intégrale Academy. Au micro de Néo, elle raconte son métier." />
        }>
        <TrainingReferenceMissions items={métierCards.map(([, title, description], index) => ({ title, description, illustration: [originalArtwork['a3p-mission-preparation'], originalArtwork['a3p-mission-trajets'], a3pArtwork.discretion][index] }))} />
        <MissionAnimation variant="a3p" className="mt-5" illustration={originalArtwork['a3p-mission-ensemble']} />
        <div className="mt-5 grid items-center gap-6 rounded-[2rem] bg-[#0D1725] p-6 text-white shadow-card lg:grid-cols-[.8fr_1.2fr]">
          <div><Label light>Une mission, cinq temps forts</Label><h3 className="mt-3 text-2xl font-black">De la préparation au débriefing</h3><p className="mt-2 text-sm text-white/60">Une lecture concrète du métier avant le détail du programme.</p></div>
          <div className="flex items-start justify-between gap-2 overflow-x-auto">{['Briefing', 'Reconnaissance', 'Dispositif', 'Déplacement', 'Débriefing'].map((step, index) => <div key={step} className="flex min-w-[5.5rem] flex-1 items-center gap-2"><div className="text-center"><span className="mx-auto grid h-9 w-9 place-items-center rounded-full border border-emerald-300/35 bg-white/[.07] text-xs font-black text-emerald-300">0{index + 1}</span><p className="mt-2 text-[.65rem] font-black">{step}</p></div>{index < 4 && <span className="mb-5 text-emerald-300">→</span>}</div>)}</div>
        </div>
        <article className={styles.audience}>
          <div>
            <Label>À qui s’adresse la formation ?</Label>
            <h2>Un parcours ouvert à plusieurs profils</h2>
          </div>
          <ul>{audiences.map(audience => <li key={audience}>{audience}</li>)}</ul>
        </article>
      </Section>
    </CourseJourney>

    <TrainingCourseSections
      admission={
        <Section id="admission" label="02 — Admission" title={<>Êtes-vous éligible à la formation A3P&nbsp;?</>}
          intro="L’activité est réglementée. L’autorisation ou la carte CNAPS, l’honorabilité, le niveau B1 et, le cas échéant, la situation administrative sont vérifiés avant la rentrée." tone="stone">
          <div className={experience.admission}>
            <aside className={experience.admissionLead}>
              <Label>Candidature personnalisée</Label>
              <h3>Votre profil est étudié individuellement</h3>
              <p>Une expérience militaire ou policière est un atout, mais elle n’est pas obligatoire. Nous vérifions votre projet avant l’inscription.</p>
              <CTA href={a3pContact('etude-profil')}>Faire le point →</CTA>
            </aside>
            <div className={experience.requirements}>
              {a3pPrerequisites.map((item, index) => (
                <details key={item.title} className={experience.requirement}>
                  <summary>
                    <span aria-hidden="true">{index === a3pPrerequisites.length - 1 ? '→' : '✓'}</span>
                    <h3>{item.title}</h3>
                    <span className={experience.plus} aria-hidden="true">+</span>
                  </summary>
                  <div className={styles.requirementCopy}>
                    {item.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                    {item.note && <p><strong>{item.note}</strong></p>}
                  </div>
                </details>
              ))}
              <CTA href={a3pContact('verification-prerequis')} variant="green" className="mt-6">Vérifier mes prérequis →</CTA>
            </div>
          </div>
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
            <div className="mt-7 rounded-[1.7rem] border border-emerald-300/25 bg-emerald-400/10 p-6"><Label light>École de Puget-sur-Argens</Label><h3 className="mt-3 text-xl font-black text-emerald-200">Entraînez-vous dans des configurations variées</h3><p className="mt-2 max-w-4xl text-sm font-medium leading-7 text-white/65">La progression alterne démonstrations, exercices individuels, travail en équipe, scénarios professionnels et débriefings.</p></div>
          </Section>
        </>
      }
      campus={<TrainingReferenceCampus editorialId="ecole-a3p" />}
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
        <Section id="certification" label="06 — Certification" title={<>Un examen qui valide <em>vos décisions</em></>} intro="L’évaluation vérifie les connaissances réglementaires et votre capacité à préparer puis exécuter une mission de protection physique des personnes." tone="dark">
          <div className={experience.exam}>
            {examSteps.map(([title, body], index) => <article key={title} className={styles.examStage}>
              <span>0{index + 1}</span><h3>{title}</h3><p>{body}</p>
            </article>)}
            <div className={experience.examValidation}>
              <p>Les évaluations pratiques utilisent une grille de critères et conduisent à un résultat « apte » ou « inapte ». La certification est constituée d’un bloc unique : toutes les exigences du métier réglementé doivent être validées.</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">{[
            ['Note ≥ 12/20', 'Unité de valeur acquise', 'bg-emerald-50 text-emerald-900 border-emerald-200'],
            ['8/20 ≤ note < 12/20', 'Candidat ajourné, nouvelle session d’examen possible', 'bg-amber-50 text-amber-900 border-amber-200'],
            ['Note < 8/20', 'Module de formation à suivre de nouveau', 'bg-rose-50 text-rose-900 border-rose-200'],
          ].map(([score, result, colors]) => <article key={score} className={`rounded-2xl border p-5 ${colors}`}><p className="text-xl font-black">{score}</p><p className="mt-2 text-xs font-bold leading-6">{result}</p></article>)}</div>
          <div className={styles.afterExam}>
            <Label light>Après réussite</Label>
            <p><strong>TFP A3P → Demande CNAPS → Carte professionnelle → Exercer</strong></p>
            <p>La certification permet de justifier l’aptitude professionnelle nécessaire à la demande de carte. La délivrance de la carte reste une décision du CNAPS.</p>
          </div>
        </Section>
      }
      dates={
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
      }
      enrollment={
        <>
          <section id="inscription" className={editorial.enrollment}>
            <div className={editorial.wrap}>
              <p className={editorial.kicker}>09 — Inscription</p>
              <header className={editorial.intro}><div>
                <h2>Un parcours vérifié avant la rentrée</h2>
                <p>L’admission tient compte des délais de financement et d’instruction CNAPS. Il est recommandé d’engager les démarches dès que votre projet est confirmé.</p>
              </div></header>
              <ol className={editorial.steps}>{a3pEnrollmentSteps.map(([number, title, body]) => (
                <li key={number}><span className={editorial.stepNumber}>{number}</span><div><h3>{title}</h3><p>{body}</p></div></li>
              ))}</ol>
              <div className={editorial.funding}>
                <div><p className={editorial.kicker}>Accessibilité et handicap</p><h3>Anticipez vos besoins d’aménagement</h3></div>
                <div className={editorial.identity}><p>Signalez votre situation avant l’inscription. L’équipe étudie avec vous les adaptations possibles au regard des objectifs, des exercices pratiques et des exigences de certification ; si nécessaire, elle vous oriente vers une solution adaptée.</p></div>
                <div className={editorial.fundingActions}><CTA href={a3pContact('accessibilite-handicap')} variant="outline">Étudier mes besoins →</CTA></div>
              </div>
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
        <Section id="debouches" label="10 — Débouchés" title="Après le TFP A3P" intro="La certification ne garantit pas un emploi. Le recrutement dépend aussi de l’expérience, du réseau, de la mobilité et des compétences complémentaires." tone="paper">
          <div className={styles.outcomes}>
            <ul className={styles.jobList}>{jobs.map(job => <li key={job}>{job}</li>)}</ul>
            <article className={styles.offer}>
              <Label light>Parcours recommandé</Label><h2>Double compétence APS + A3P</h2>
              <p>Élargissez les missions accessibles et renforcez votre polyvalence.</p>
              <strong>{a3pConfig.apsA3pOffer.priceLabel}</strong>
              <p>Tarifs individuels 2027 : {a3pConfig.apsA3pOffer.oldPriceLabel} · {a3pConfig.apsA3pOffer.discountLabel}</p>
              <CTA href={a3pConfig.apsA3pOffer.href} variant="light">Découvrir le parcours →</CTA>
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
          <Section id="references-rncp" label="07 — Repères officiels" title="Certification, conditions d’exercice et données d’insertion" intro={<>Ces informations complètent la présentation commerciale avec les repères figurant dans la fiche RNCP38002 fournie.</>}>
            <div className={experience.referenceOverview}>
              <article className={experience.certificateCard}>
                <div className={experience.certificateHeading}><div><Label>Identification</Label><h3>TFP A3P · niveau 4</h3></div></div>
                <dl className={experience.certificationData}>{[
                  ['Répertoire', a3pConfig.rncp],
                  ['Certificateurs', 'CPNE / ADEF'],
                  ['Code ROME', 'K2503'],
                  ['Code NSF', '344'],
                  ['Formacode', '42812'],
                  ['Échéance RNCP', a3pConfig.rncpExpiry],
                ].map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
                <a href={a3pConfig.rncpUrl} target="_blank" rel="noopener noreferrer" className={experience.certificateLink}>Consulter la fiche France compétences →</a>
              </article>
              <article className={experience.professionCard}>
                <Label>Réalités du métier</Label>
                <h3>Des conditions qui varient selon la mission</h3>
                <ul className={experience.conditions}>{a3pWorkConditions.map(item => <li key={item}>{item}</li>)}</ul>
              </article>
            </div>
            <article className={experience.insertionPanel}>
              <div className={experience.insertionHeading}><div><Label>Insertion nationale</Label><h3 className="mt-3 text-3xl font-black">Données historiques de la certification</h3></div><p className="max-w-xl">Statistiques nationales France compétences figurant dans la fiche de certification. Elles concernent la certification, pas les résultats propres à Intégrale Academy.</p></div>
              <div className={experience.statsScroll} tabIndex={0} role="region" aria-label="Données historiques de la certification">
                <table>
                  <thead><tr>{['Année', 'Certifiés', 'Insertion globale à 6 mois', 'Métier visé à 6 mois', 'Métier visé à 2 ans'].map(label => <th key={label} scope="col">{label}</th>)}</tr></thead>
                  <tbody>{a3pInsertionStats.map(row => <tr key={row.year}><th scope="row">{row.year}</th><td>{row.certified}</td><td>{row.global}</td><td>{row.targetJob}</td><td>{row.targetJobTwoYears}</td></tr>)}</tbody>
                </table>
              </div>
              <div className={experience.referenceDetails}><details>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black"><span>Autres informations de la fiche RNCP</span><span className={experience.plus} aria-hidden="true">+</span></summary>
                <div className="mt-5 grid gap-3 border-t border-academy-line pt-5 md:grid-cols-3">
                  <div className="rounded-2xl bg-academy-bg p-4"><p className="text-xs font-black uppercase tracking-[.12em] text-academy-muted">Voies d’accès recensées</p><p className="mt-2 text-sm font-bold leading-6">Apprentissage, formation continue, contrat de professionnalisation, candidature individuelle et VAE.</p></div>
                  <div className="rounded-2xl bg-academy-bg p-4"><p className="text-xs font-black uppercase tracking-[.12em] text-academy-muted">Blocs et correspondances</p><p className="mt-2 text-sm font-bold leading-6">{a3pConfig.certificationStructure}. Aucune correspondance déclarée avec une autre certification.</p></div>
                  <div className="rounded-2xl bg-academy-bg p-4"><p className="text-xs font-black uppercase tracking-[.12em] text-academy-muted">Historique</p><p className="mt-2 text-sm font-bold leading-6">La certification RNCP38002 remplace la certification antérieure RNCP35098.</p></div>
                </div>
                <p className="mt-4 text-xs font-semibold leading-5 text-academy-muted">Ces voies sont celles de la certification nationale ; leur disponibilité chez Intégrale Academy doit être confirmée avec l’équipe admissions.</p>
              </details></div>
            </article>
          </Section>
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

    <TrainingCourseTestimonials category="A3P" layout="editorial" />

    <div id="faq-a3p"><FaqDirectoryLink embedded theme="green" /></div>

    <TrainingReferenceContact
      schoolStyle
      description="Cassandre, Responsable commerciale, vérifie vos prérequis, vous présente les prochaines dates et étudie les solutions de financement adaptées à votre situation."
      href={a3pContact('rdv-telephonique')}
    />
    <TrainingReferenceMobileBar href={a3pContact('mobile-dossier-a3p')} label="Recevoir le dossier" />
  </TrainingReferencePage>;
}
