import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { TrainingAdmission, TrainingExamExperience, TrainingOfficialReferences } from '@/components/ApsExperienceSections';
import experience from '@/components/ApsExperience.module.css';
import { CourseBrochureCard } from '@/components/CourseBrochureCard';
import { CourseJourney } from '@/components/CourseJourney';
import { FaqDirectoryLink } from '@/components/FaqDirectoryLink';
import { ManualArtwork } from '@/components/ManualArtwork';
import { TrainingCourseTestimonials } from '@/components/TrainingCourseTestimonials';
import { TrainingDatesPricingSection } from '@/components/TrainingDatesPricingSection';
import { TrainingEnrollmentSection } from '@/components/TrainingEnrollmentSection';
import { TrainingHeroSessionCard, trainingRegistrationUrl } from '@/components/TrainingHero';
import { TrainingPracticeArtwork, TrainingPracticeCards } from '@/components/TrainingPracticeCards';
import { TrainingProgramExplorer, type TrainingProgramUnit } from '@/components/TrainingProgramExplorer';
import {
  TrainingCourseSections, TrainingReferenceAction, TrainingReferenceCampus, TrainingReferenceContact,
  TrainingReferenceHero, TrainingReferenceMissions, TrainingReferenceMobileBar, TrainingReferencePage,
  TrainingReferenceSection as Section,
} from '@/components/TrainingReferenceLayout';
import { TrainingSectionNavigation } from '@/components/TrainingSectionNavigation';
import { VtcAutonomousEnrollmentBanner } from '@/components/VtcAutonomousEnrollmentBanner';
import { AcademyNotification } from '@/components/AcademyNotification';
import { courseJourneys } from '@/data/courseJourneys';
import { vtcArtwork } from '@/data/manualIllustrations';
import { formatVtcDeadline, formatVtcExamDate, vtcCourse, vtcFormation } from '@/data/vtc';
import { loadPlanningSessions } from '@/lib/planning-sessions';
import { createPageMetadata } from '@/lib/seo';
import { VtcExamCalendar } from './VtcExamCalendar';
import styles from './vtc.module.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = createPageMetadata('/vtc');

const contactHref = (subject: string) => `/contact?formation=vtc&objet=${encodeURIComponent(subject)}`;
const projectHref = contactHref('Je souhaite m’inscrire à la formation VTC');
const fundingHref = contactHref('Étude de financement formation VTC');
const practiceBooking = 'https://admissions.integraleconnect.com/vtc';
const detailedProgram = 'https://www.canva.com/design/DAFhLhaNPtg/JTpC91OFj5kP1K96Zq7LGQ/view?utm_campaign=designshare&utm_content=DAFhLhaNPtg&utm_medium=link&utm_source=editor';
const cmaCalendar = 'https://www.cmar-paca.fr/galerie/1/0a500ccd55a994cd8ef5b03c77af67b9.pdf';

const navigationItems = [
  { label: 'Métier', href: '#metier' },
  { label: 'Immersion', href: '#pratique' },
  { label: 'Programme', href: '#programme' },
  { label: 'Examen', href: '#examen' },
  { label: 'Dates & tarifs', href: '#dates-tarifs' },
  { label: 'Inscriptions', href: '#inscription-financement' },
  { label: 'Débouchés', href: '#debouches' },
  { label: 'FAQ', href: '#faq-vtc' },
] as const;

const included = [
  ['Théorie en ligne', 'Cours accessibles 24h/24 et 7j/7 pour avancer à votre rythme.'],
  ['Préparation intensive', 'QCM, entraînements et révisions sur les 7 matières de l’examen.'],
  ['Conduite professionnelle', 'Mises en situation réelles avec un formateur spécialisé VTC.'],
  ['Véhicule double commande', 'Le véhicule réglementaire est mis à disposition pour l’épreuve pratique.'],
  ['Frais d’examen inclus', 'Votre budget est lisible dès le départ, sans mauvaise surprise.'],
  ['Accompagnement humain', 'Notre équipe vous guide dans le dossier, le financement et les démarches.'],
] as const;

const units = [
  ['A', 'Réglementation T3P', 'Comprendre le cadre du transport public particulier de personnes.'],
  ['B', 'Gestion', 'Calculer ses coûts, sa marge et organiser une activité rentable.'],
  ['C', 'Sécurité routière', 'Adopter une conduite sûre, souple et professionnelle.'],
  ['D', 'Français & anglais', 'Accueillir, comprendre et accompagner tous les passagers.'],
  ['E', 'Développement commercial', 'Trouver des clients, valoriser son service et les fidéliser.'],
  ['F', 'Réglementation VTC', 'Maîtriser les obligations propres au métier et au véhicule.'],
  ['G', 'Épreuve pratique', 'Préparer une course, conduire, accueillir, facturer et encaisser.'],
].map(([number, title, description]): TrainingProgramUnit => ({
  number, title, description, delivery: number === 'G' ? 'Pratique en présentiel' : 'Théorie en ligne 24/7',
}));

const prerequisites = [
  ['Permis B', 'Être titulaire du permis B et avoir dépassé la période probatoire.'],
  ['Aptitude médicale', 'Être reconnu médicalement apte à la conduite professionnelle.'],
  ['Carte professionnelle T3P', 'Ne pas avoir subi de retrait définitif d’une carte professionnelle T3P durant les dix dernières années.'],
  ['Accès à l’examen', 'Ne pas avoir été exclu pour fraude d’un examen T3P durant les cinq dernières années.'],
] as const;

const practice = [
  ['✓', 'Vérifier le véhicule', 'Préparer le véhicule et vérifier les documents professionnels avant la prise en charge.', vtcArtwork.profession],
  ['↗', 'Accueillir le passager', 'Accueillir, comprendre et accompagner tous les passagers.', vtcArtwork.pratique],
  ['◎', 'Conduire en sécurité', 'Adopter une conduite sûre, souple et professionnelle.', vtcArtwork.conduite],
  ['€', 'Calculer et facturer', 'Calculer ses coûts, sa marge et organiser une activité rentable.', vtcArtwork.gestion],
] as const;

const journey = [
  ['On valide votre projet', 'Prérequis, financement, disponibilité et objectif professionnel.'],
  ['Vous maîtrisez la théorie', 'Cours en ligne, quiz, annales et examens blancs.'],
  ['Vous passez l’admissibilité', 'Préparation aux sept matières de l’examen théorique.'],
  ['Vous vous entraînez au métier', 'Conduite, accueil client, itinéraire, devis et facturation.'],
  ['Vous passez la pratique', 'Mise en situation complète avec le véhicule réglementaire.'],
] as const;

const lessons = ['Réglementation T3P', 'Gestion & rentabilité', 'Sécurité routière', 'Développement commercial'];
const onlineFeatures = [
  '13 séquences correspondant aux matières de l’examen', 'Quiz composés de questions issues des annales',
  'Score et correction affichés instantanément', 'Quiz recommençables autant de fois que nécessaire', 'Livre officiel envoyé par courrier',
];
const offerBenefits = [
  '105 heures de préparation', 'E-learning accessible 24h/24', 'Formation pratique encadrée',
  'Livre officiel inclus', 'Frais d’examen inclus', 'Véhicule double commande inclus',
];

function PracticeBooking() {
  return <article className={styles.practiceBooking}>
    <div><p className={styles.label}>Pratique seule</p><h3>Vous avez déjà la théorie ?</h3></div>
    <TrainingReferenceAction href={practiceBooking}>Réserver le véhicule pour l’examen (150 €) ou la préparation pratique avec véhicule (600 €).</TrainingReferenceAction>
  </article>;
}

export default async function VtcPage() {
  const sessions = (await loadPlanningSessions())
    .filter(session => session.scheduleKind === 'vtc-exam' && session.vtcDates)
    .sort((a, b) => +new Date(a.vtcDates!.deadline) - +new Date(b.vtcDates!.deadline));
  const dates = sessions.map(session => session.vtcDates!);
  const next = dates[0];
  const missionArtwork = [vtcArtwork.reglementation, vtcArtwork.communication, vtcArtwork.commercial];

  return <TrainingReferencePage theme="violet" className={styles.page}>
    <TrainingReferenceHero id="chauffeur-vtc" badge="Formation VTC · Côte d’Azur"
      heading="Formation chauffeur VTC" accent="Prenez le volant" title="PRÊT À DÉMARRER" caption="Votre itinéraire vers le métier"
      tagline="Théorie en ligne 24/7 · Pratique en présentiel" illustration={vtcArtwork.accueil}
      description={<p>Une préparation complète pour réussir l’examen VTC et démarrer votre activité avec les bons réflexes — pas seulement une plateforme de cours.</p>}
      primaryAction={{ href: projectHref, label: 'Je démarre mon projet' }} highlights={['Centre agréé', 'Qualiopi', 'CPF selon éligibilité']}>
      <TrainingHeroSessionCard theme="violet" assistantKey="vtc" label="Prochain examen théorique" session={sessions[0]}
        defaultPrice={vtcCourse.priceLabel} defaultLocation={vtcCourse.location} registrationHref={projectHref}
        emptyTitle="Prochaines semaines d’examen" emptyDescription="Contactez l’équipe pour connaître les prochaines semaines d’examen."
        timing={next && { badge: 'Inscription en formation', title: formatVtcExamDate(next.theory),
          description: <>Inscrivez-vous en formation au plus tard le {formatVtcDeadline(next.deadline)}.<br />Examen pratique · {formatVtcExamDate(next.practical)}</> }}
        priceNote="Financement possible" locationNote="Nice, Cannes, Toulon ou Fréjus"
        facts={[
          { label: 'Durée', value: `${vtcCourse.durationHours} h`, details: ['Parcours complet'] },
          { label: 'Format', value: 'Hybride', details: ['En ligne + pratique'] },
          { label: 'Tout inclus', value: 'Frais d’examen inclus', details: ['Véhicule fourni à l’examen'] },
        ]} />
    </TrainingReferenceHero>
    <TrainingSectionNavigation mark="VTC" title="Chauffeur VTC" items={navigationItems} registrationHref={trainingRegistrationUrl} theme="violet" />

    <CourseJourney course="vtc">
      <Section id="metier" eyebrow="01 — Le métier" title="Au volant, chaque détail compte"
        intro="Apprenez à offrir une expérience de transport sûre, fluide et professionnelle.">
        <TrainingReferenceMissions items={courseJourneys.vtc.practice.rows.map((row, index) => ({
          title: row.title, description: row.text, illustration: missionArtwork[index],
        }))} />
      </Section>
    </CourseJourney>

    <TrainingCourseSections
      admission={<Section id="admission" eyebrow="02 — Admission" title="Votre dossier est-il prêt pour la formation VTC ?" tone="stone">
        <TrainingAdmission course="vtc" action={projectHref} actionLabel="Vérifier mon dossier"
          lead={<><h3>Les prérequis<br /><em>à vérifier</em></h3><p>Notre équipe contrôle votre situation avec vous avant la constitution définitive du dossier.</p></>}
          note="Avant de vous inscrire, notre équipe vérifie avec vous les pièces de votre dossier."
          steps={<>Échange avec un conseiller <span>→</span> Vérification des prérequis <span>→</span> Inscription</>}
          points={prerequisites.map(([title, text]) => ({ title, content: <p>{text}</p> }))} />
      </Section>}

      immersion={<Section id="pratique" eyebrow="03 — Immersion & pédagogie" title="Préparez une course de bout en bout"
        intro="Mises en situation réelles avec un formateur spécialisé VTC." tone="dark">
        <TrainingPracticeCards items={practice.map(([icon, title, text, illustration]) => ({
          icon, title, text, visuals: [{ kind: title, illustration: <TrainingPracticeArtwork illustration={illustration} /> }],
        }))} />
      </Section>}

      campus={<TrainingReferenceCampus editorialId="ecole-vtc" title="Apprenez là où vous allez conduire"
        description="Les gares, les hôtels, les aéroports, les événements et les exigences d’une clientèle internationale font de notre territoire un cadre idéal pour apprendre le métier."
        groupLabel="Pratique sur la Côte d’Azur" groupSize="Nice · Cannes · Fréjus · Toulon" />}
      brochure={<CourseBrochureCard course="vtc" />}

      program={<Section id="programme" eyebrow="04 — Programme" title="Bien plus que conduire. Devenez professionnel"
        intro="Le programme suit les compétences évaluées à l’examen et celles qui feront la différence face à vos futurs clients.">
        <TrainingProgramExplorer idPrefix="vtc-programme" menuTitle="Les compétences" tabListLabel="Programme chauffeur VTC" units={units}
          hours={String(vtcCourse.durationHours)} overview="Parcours complet" subtitle="En ligne + pratique"
          facts={[[ 'Séquences en ligne', '13' ], [ 'Accès aux cours', '24h/24 et 7j/7' ], [ 'Formation pratique', 'En présentiel' ]]}
          nextLabel="Rubrique suivante" restartLabel="Revenir au début du programme" />
      </Section>}

      format={<Section id="formation" eyebrow="05 — Votre formation théorique" title="Apprenez à votre rythme. Mesurez vos progrès"
        intro="Dès que votre inscription est finalisée, vous accédez à votre espace de formation personnel, disponible 24h/24 et 7j/7." tone="paper">
        <div className={experience.hybrid}>
          <div className={experience.remoteCopy}><p className={experience.kicker}>Progression en temps réel</p><h3>13 <strong>séquences</strong></h3>
            <ul className={styles.checklist}>{onlineFeatures.map(item => <li key={item}>{item}</li>)}</ul>
            <TrainingReferenceAction outline newTab href={detailedProgram}>Consulter le programme détaillé ↗</TrainingReferenceAction>
          </div>
          <figure className={styles.onlinePreview}><ManualArtwork illustration={vtcArtwork.apprentissage} natural />
            <figcaption><strong>Espace de formation</strong><ol>{lessons.map(lesson => <li key={lesson}>{lesson}</li>)}</ol></figcaption>
          </figure>
        </div>
      </Section>}

      pack={<Section id="formule" eyebrow="Une formule vraiment complète" title="Tout ce qu’il vous faut. Rien à ajouter"
        intro="Chaque élément du parcours est pensé pour vous rapprocher concrètement de la réussite, de votre première connexion à votre passage devant le jury." tone="stone">
        <div id="pack-integrale" className={styles.materials}>
          <figure><Image src="/images/vtc/manuel/couverture-vtc.webp" alt="Couverture du manuel de formation chauffeur VTC" width={650} height={920} sizes="(max-width: 700px) 135px, 190px" />
            <figcaption>Livre officiel envoyé par courrier</figcaption></figure>
          <dl>{included.map(([name, text]) => <div key={name}><dt>{name}</dt><dd>{text}</dd></div>)}</dl>
        </div>
      </Section>}

      exam={<Section id="examen" eyebrow="06 — Examen" title="Deux épreuves. Une préparation complète"
        intro="L’examen est organisé par la Chambre de métiers et de l’artisanat. Nous vous préparons aux connaissances attendues comme aux conditions réelles de l’épreuve pratique." tone="dark">
        <TrainingExamExperience metric="2" label="L’examen VTC expliqué simplement" description="Admissibilité puis admission"
          theory={<><p className={experience.kicker}>Admissibilité · L’examen théorique</p><h3>7 épreuves<span>Environ 3 h 50</span></h3>
            <ul><li>5 matières communes Taxi/VTC</li><li>2 matières spécifiques au VTC</li><li>Questions sous forme de QCM et de QRC</li><li>Moyenne pondérée minimale : 10/20</li><li>Certaines notes sont éliminatoires</li></ul></>}
          practice={<><Image src="/images/planning-metiers/vtc.webp" alt="Un chauffeur accueille une passagère à son véhicule" width={960} height={640} sizes="(max-width: 800px) 92vw, 740px" />
            <div><p className={experience.kicker}>Admission</p><h3>La mise en situation pratique</h3><p>Conduite en circulation · 20 min minimum</p>
              <ul className={styles.examSkills}><li>Sécurité et souplesse de conduite</li><li>Accueil et relation client</li><li>Construction et adaptation du parcours</li><li>Devis, facturation et encaissement</li><li>Note minimale pour réussir : 12/20</li></ul></div></>}
          validation={<><div><p className={experience.kicker}>3 tentatives pratiques</p><p>possibles dans l’année suivant l’admissibilité</p></div><strong>12/20<small>Note minimale en pratique</small></strong></>}>
          <div className={styles.examExtras}><p><strong>Véhicule fourni</strong>double commande réglementaire inclus dans l’offre</p><p><strong>Frais inclus</strong>aucun supplément d’examen dans la formule présentée</p></div>
        </TrainingExamExperience>
      </Section>}

      dates={<TrainingDatesPricingSection id="dates-tarifs" eyebrow="07 — Dates & tarifs" title="Votre calendrier jusqu’à l’examen"
        intro="Choisissez la semaine de votre examen théorique. Pour y participer, inscrivez-vous en formation avant la date et l’heure indiquées sur la même ligne. Vous pouvez commencer les cours en ligne dès votre inscription."
        compact theme="violet" sessions={sessions} registrationHref={() => projectHref} defaultPrice={vtcCourse.priceLabel}
        priceDescription="Prix tout inclus · Finançable par le CPF selon éligibilité" priceAction={{ href: fundingHref, label: 'Étudier mon financement' }}
        calendar={<VtcExamCalendar dates={dates} />}>
        <AcademyNotification id="notification-vtc" person="cassandre">
          Bonne nouvelle, on vous prête la voiture pour l’épreuve pratique. <strong>Les frais d’examen sont aussi inclus.</strong>
        </AcademyNotification>
        <p className={styles.calendarNote}>{vtcCourse.examNotice} <a href={cmaCalendar}>Calendrier officiel CMA PACA 2027 (PDF)</a></p>
        <PracticeBooking />
      </TrainingDatesPricingSection>}

      enrollment={<>
        <TrainingEnrollmentSection number="08" title="Votre projet VTC, clé en main" registrationAnchor={null}
          intro="Une seule formule lisible, sans découvrir au dernier moment qu’il faut encore payer la pratique, le véhicule ou l’examen."
          steps={['Vérifier les prérequis', 'Choisir son financement', 'Préparer son inscription']}
          registration={{ href: '#inscription', label: 'Commencer mon inscription' }} fundingTitle="Étudier mon financement"
          fundingNote={<><p>Finançable par le CPF selon éligibilité</p><p>✓ Étude gratuite et sans engagement</p>
            <p>À préparer<br /><strong>Identité Numérique La Poste</strong><br />Elle peut être nécessaire pour valider certaines démarches de financement en ligne.</p>
            <Link href="/financements">Comprendre les financements →</Link></>}
          funding={{ href: fundingHref, label: 'Étudier mon financement' }}
          options={[
            ['CPF', 'Mobilisez vos droits. Financement possible selon votre éligibilité et les règles applicables à votre dossier.'],
            ['France Travail', 'Présentez votre projet. Nous préparons avec vous les éléments utiles à transmettre à votre conseiller.'],
            ['Paiement personnel', 'Échelonnez votre règlement. Des solutions en 3, 4 ou 10 fois peuvent être étudiées selon votre situation.'],
          ]}>
          <div className={styles.offerSummary}><div><p className={styles.label}>L’offre Intégrale · Formation complète</p><h3>Prix tout inclus</h3><strong>{vtcCourse.priceLabel}</strong>
            <p><a className={styles.textLink} href="tel:0422470768">Ou appeler le 04 22 47 07 68</a></p>
            <a className={styles.textLink} href={practiceBooking}>Réserver la pratique seule →</a></div>
            <ul className={styles.checklist}>{offerBenefits.map(item => <li key={item}>{item}</li>)}</ul></div>
        </TrainingEnrollmentSection>
        <VtcAutonomousEnrollmentBanner />
      </>}

      outcomes={<Section id="debouches" eyebrow="09 — Débouchés & emploi" title="De votre projet à vos premières courses"
        intro="Vous savez toujours où vous en êtes et quelle est la prochaine étape." tone="paper">
        <div id="parcours" className={styles.outcome}>
          <div><p className={styles.label}>Votre parcours</p><h3>{vtcFormation.outcomes[0]}</h3><p>{courseJourneys.vtc.outcome.note}</p>
            <TrainingReferenceAction href={contactHref('Recevoir le détail du parcours VTC')}>Recevoir le programme</TrainingReferenceAction></div>
          <ol>{journey.map(([title, text]) => <li key={title}><h4>{title}</h4><p>{text}</p></li>)}</ol>
        </div>
      </Section>}

      references={<TrainingOfficialReferences id="reperes-officiels" course="vtc" number="10" title="Les repères officiels de votre formation VTC"
        intro="Agrément préfectoral, certification et qualité de la formation." certificateLabel="Certification" qualification="Chauffeur VTC"
        name="Examen d’accès à la profession de conducteur de voiture de transport avec chauffeur (VTC)"
        registryLabel="Répertoire spécifique" registryCode="RS 5637" url="https://www.francecompetences.fr/recherche/rs/5637/"
        facts={[[ 'Certification', 'Enregistrée jusqu’au 31/12/2026' ], [ 'Agrément préfectoral', 'VTC-26-001' ], [ 'Délivrance', 'Délivré le 02/12/2025' ]]}
        conditionsLabel="Accès au métier" profession="Les prérequis à vérifier" conditions={prerequisites.map(([, text]) => text)}
        professionNote={courseJourneys.vtc.outcome.note} detailsTitle="Intégrale Sécurité Formations · Qualité et déclaration d’activité"
        details={<dl className={styles.accreditations}><div><dt>Qualité</dt><dd><strong>Qualiopi n°03169</strong><br />Processus de formation certifié</dd></div>
          <div><dt>Déclaration d’activité</dt><dd><strong>NDA 93830600283</strong><br />Intégrale Sécurité Formations</dd></div></dl>} />}
    />

    <TrainingCourseTestimonials category="VTC" layout="home" />
    <div id="faq-vtc"><FaqDirectoryLink embedded theme="violet" /></div>
    <TrainingReferenceContact schoolStyle headingEnd="vers votre future activité" appointmentLabel="Réserver un échange"
      title="Rendez-vous téléphonique avec votre conseillère"
      description="Cassandre, Responsable commerciale, vérifie votre éligibilité, vous explique le calendrier et vous aide à choisir le financement adapté."
      href={contactHref('Être rappelé au sujet de la formation VTC')} />
    <TrainingReferenceMobileBar href="#dates-tarifs" label="Voir les dates & tarifs" />
  </TrainingReferencePage>;
}
