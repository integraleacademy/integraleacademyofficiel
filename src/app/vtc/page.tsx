import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { TrainingAdmission, TrainingExamExperience, TrainingOfficialReferences } from '@/components/ApsExperienceSections';
import experience from '@/components/ApsExperience.module.css';
import { CourseBrochureCard } from '@/components/CourseBrochureCard';
import { CourseJourney } from '@/components/CourseJourney';
import { FaqDirectoryLink } from '@/components/FaqDirectoryLink';
import { IntegraleWelcomePack } from '@/components/IntegraleWelcomePack';
import { TrainingCourseTestimonials } from '@/components/TrainingCourseTestimonials';
import { TrainingDatesPricingSection } from '@/components/TrainingDatesPricingSection';
import { TrainingEnrollmentSection } from '@/components/TrainingEnrollmentSection';
import { TrainingHeroSessionCard, trainingRegistrationUrl } from '@/components/TrainingHero';
import { TrainingPracticeArtwork, TrainingPracticeCards } from '@/components/TrainingPracticeCards';
import { TrainingProgramExplorer } from '@/components/TrainingProgramExplorer';
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
import { vtcCourse, vtcFormation } from '@/data/vtc';
import { loadPlanningSessions } from '@/lib/planning-sessions';
import { formatSessionNumericDate } from '@/lib/public-sessions';
import { createPageMetadata } from '@/lib/seo';
import { VtcExamCalendar } from './VtcExamCalendar';
import { VtcElearningPreview } from './VtcElearningPreview';
import { vtcProgram } from './programme';
import styles from './vtc.module.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = createPageMetadata('/vtc');

const contactHref = (subject: string) => `/contact?formation=vtc&objet=${encodeURIComponent(subject)}`;
const projectHref = contactHref('Je souhaite m’inscrire à la formation VTC');
const fundingHref = contactHref('Étude de financement formation VTC');
const practiceBooking = 'https://admissions.integraleconnect.com/vtc';
const detailedProgram = 'https://www.canva.com/design/DAFhLhaNPtg/JTpC91OFj5kP1K96Zq7LGQ/view?utm_campaign=designshare&utm_content=DAFhLhaNPtg&utm_medium=link&utm_source=editor';
const cmaCalendar = 'https://www.cmar-paca.fr/galerie/1/0a500ccd55a994cd8ef5b03c77af67b9.pdf';
const identityUrl = 'https://lidentitenumerique.laposte.fr/';

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

const missions = [
  { title: 'Organiser la réservation', description: 'Confirmer le lieu, l’horaire, le nombre de passagers et les bagages pour proposer une prestation adaptée.', illustration: vtcArtwork.communication },
  { title: 'Préparer la course', description: 'Étudier l’itinéraire, prévoir un trajet de remplacement et anticiper la prise en charge.', illustration: vtcArtwork.accueil },
  { title: 'Accueillir le passager', description: 'Se présenter au point de rendez-vous, prendre en charge les bagages et installer le client confortablement.', illustration: vtcArtwork.pratique },
  { title: 'Conduire en sécurité', description: 'Adapter sa conduite à la circulation, préserver le confort du passager et le tenir informé de l’heure d’arrivée.', illustration: vtcArtwork.conduite },
  { title: 'Finaliser la prestation', description: 'Vérifier le prix convenu, remettre la facture et encaisser le règlement.', illustration: vtcArtwork.gestion },
  { title: 'Fidéliser sa clientèle', description: 'Recueillir les préférences des clients réguliers et développer les réservations auprès des hôtels et des entreprises.', illustration: vtcArtwork.commercial },
];

const prerequisites = [
  ['Permis B', 'Être titulaire du permis B et avoir dépassé la période probatoire.'],
  ['Aptitude médicale', 'Être reconnu médicalement apte à la conduite professionnelle.'],
  ['Carte professionnelle T3P', 'Ne pas avoir subi de retrait définitif d’une carte professionnelle T3P durant les dix dernières années.'],
  ['Accès à l’examen', 'Ne pas avoir été exclu pour fraude d’un examen T3P durant les cinq dernières années.'],
] as const;

const practice = [
  ['M9 5H6v16h12V5h-3 M9 3h6v4H9z M8.5 13l2.5 2.5 4.5-5', 'Vérifier le véhicule', 'Préparer le véhicule et vérifier les documents professionnels avant la prise en charge.', vtcArtwork.profession],
  ['M16 20v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M14 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M17 5a3 3 0 0 1 0 6 M18 14a4 4 0 0 1 3 4v2', 'Accueillir le passager', 'Accueillir le client, confirmer la destination et l’aider à s’installer avec ses bagages.', vtcArtwork.pratique],
  ['M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M4 10l6 2m10-2-6 2m-2 2v6 M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0', 'Conduire en sécurité', 'Adapter sa vitesse et ses distances pour assurer un trajet souple et confortable.', vtcArtwork.conduite],
  ['M5 3l2 1 2-1 3 1 3-1 2 1 2-1v18l-2-1-2 1-3-1-3 1-2-1-2 1z M8 8h8m-8 4h8m-5 4h5', 'Calculer et facturer', 'Présenter un devis, expliquer le prix au client et établir la facture en fin de course.', vtcArtwork.gestion],
] as const;

const journey = [
  ['On valide votre projet', 'Prérequis, financement, disponibilité et objectif professionnel.'],
  ['Vous maîtrisez la théorie', 'Cours en ligne, quiz, annales et examens blancs.'],
  ['Vous passez l’admissibilité', 'Préparation aux sept matières de l’examen théorique.'],
  ['Vous vous entraînez au métier', 'Conduite, accueil client, itinéraire, devis et facturation.'],
  ['Vous passez la pratique', 'Mise en situation complète avec le véhicule réglementaire.'],
] as const;

const onlineFeatures = [
  '13 séquences correspondant aux matières de l’examen', 'Quiz composés de questions issues des annales',
  'Score et correction affichés instantanément', 'Quiz recommençables autant de fois que nécessaire', 'Livre officiel envoyé par courrier',
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
    .sort((a, b) => {
      const first = a.vtcDates?.theory;
      const second = b.vtcDates?.theory;
      if (!first || !second) return Number(Boolean(second)) - Number(Boolean(first));
      return +new Date(first) - +new Date(second);
    });
  const dates = sessions.map(session => session.vtcDates!);
  const next = dates[0];
  const theoryDate = formatSessionNumericDate(next?.theory);
  const deadline = formatSessionNumericDate(next?.deadline);

  return <TrainingReferencePage theme="violet" className={styles.page}>
    <TrainingReferenceHero id="chauffeur-vtc" badge="Formation VTC · Côte d’Azur"
      heading="Formation chauffeur VTC" accent="Prenez le volant" title="PRÊT À DÉMARRER" caption="Votre itinéraire vers le métier"
      tagline="Théorie en ligne 24/7 · Pratique en présentiel" illustration={vtcArtwork.accueil}
      description={<p>Une préparation complète pour réussir l’examen VTC et démarrer votre activité avec les bons réflexes — pas seulement une plateforme de cours.</p>}
      primaryAction={{ href: projectHref, label: 'Je démarre mon projet' }} highlights={['Centre agréé', 'Qualiopi', 'CPF selon éligibilité']}>
      <TrainingHeroSessionCard theme="violet" assistantKey="vtc" label="Calendrier VTC" session={sessions[0]}
        defaultPrice={vtcCourse.priceLabel} defaultLocation={vtcCourse.location} registrationHref={projectHref}
        emptyTitle="Prochain examen théorique à confirmer" emptyDescription="Contactez l’équipe pour connaître la prochaine date d’examen et la limite d’inscription."
        timing={next && { title: theoryDate ? `Prochain examen théorique le ${theoryDate}` : 'Prochain examen théorique à confirmer',
          description: deadline ? <>Inscription avant le <strong>{deadline} à 12 h</strong>.</> : 'Date limite d’inscription à confirmer.' }}
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
        <TrainingReferenceMissions items={missions} />
        <aside className={styles.audience}>
          <h3>À qui s’adresse la formation&nbsp;?</h3>
          <div><p>Vous envisagez une reconversion, souhaitez rejoindre une entreprise de transport ou lancer votre propre activité de chauffeur VTC&nbsp;? Le parcours vous prépare aux épreuves théorique et pratique.</p>
            <a className={styles.textLink} href="#admission">Vérifier mes prérequis →</a></div>
        </aside>
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
        <TrainingPracticeCards iconClassName={styles.immersionIcon} items={practice.map(([path, title, text, illustration]) => ({
          icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={path} /></svg>,
          title, text, visuals: [{ kind: title, illustration: <TrainingPracticeArtwork illustration={illustration} /> }],
        }))} />
      </Section>}

      campus={<TrainingReferenceCampus editorialId="ecole-vtc" title="Apprenez là où vous allez conduire"
        description="Les gares, les hôtels, les aéroports, les événements et les exigences d’une clientèle internationale font de notre territoire un cadre idéal pour apprendre le métier."
        groupLabel="Pratique sur la Côte d’Azur" groupSize="Nice · Cannes · Fréjus · Toulon" />}
      brochure={<CourseBrochureCard course="vtc" />}

      program={<Section id="programme" eyebrow="04 — Programme" title="Les 7 matières de l’examen et la conduite en pratique"
        intro="Découvrez ce que vous étudierez dans chaque matière, puis les gestes que vous travaillerez avec votre formateur au volant.">
        <div className={styles.programLink}><TrainingReferenceAction newTab href={detailedProgram}>Consulter le programme détaillé ↗</TrainingReferenceAction></div>
        <TrainingProgramExplorer idPrefix="vtc-programme" menuTitle="Les unités du programme" tabListLabel="Programme chauffeur VTC" units={vtcProgram}
          hours={String(vtcCourse.durationHours)} overview="Parcours complet" subtitle="Théorie et pratique" illustration={vtcArtwork.apprentissage}
          facts={[[ 'Théorie en e-learning', '100 h' ], [ 'Séquences en ligne', '13' ], [ 'Pratique sur véhicule', '5 h' ]]}
          nextLabel="Rubrique suivante" restartLabel="Revenir au début du programme" />
      </Section>}

      format={<Section id="formation" eyebrow="05 — Votre formation théorique" title="100 h de théorie en e-learning, à votre rythme"
        intro="Dès que votre inscription est finalisée, vous recevez vos identifiants par e-mail. Votre espace de formation personnel est accessible 24 h/24 et 7 j/7." tone="paper">
        <div className={experience.hybrid}>
          <div className={experience.remoteCopy}><p className={experience.kicker}>Votre parcours en ligne</p><h3><strong>13 séquences</strong> pour préparer la théorie</h3>
            <ul className={styles.checklist}>{onlineFeatures.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
          <VtcElearningPreview />
        </div>
        <div className={`${experience.inPerson} ${styles.driving}`}>
          <div><p className={experience.kicker}>Avec votre formateur</p><h3><strong>5 h</strong> de pratique</h3></div>
          <p><strong>Sur véhicule à double commande</strong><span>Travaillez le trajet, l’accueil du passager et la facturation dans les conditions de l’épreuve.</span></p>
          <p><strong>Sur la Côte d’Azur</strong><span>À Nice, Cannes, Toulon ou Fréjus. Le lieu et le créneau sont confirmés avec l’équipe.</span></p>
          <a href="#pratique">Voir les mises en situation →</a>
        </div>
      </Section>}

      pack={<div id="formule"><IntegraleWelcomePack course="vtc" title="Pack Intégrale Academy" /></div>}

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
        intro="Choisissez votre date d’examen théorique et repérez la limite d’inscription correspondante. Vous pouvez commencer les cours en ligne dès que votre inscription est finalisée."
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
        <TrainingEnrollmentSection number="08" title="Du premier appel à votre entrée en formation." registrationAnchor={null}
          intro="Un rendez-vous téléphonique avec notre équipe vous permet de choisir une date d’examen, de vérifier vos prérequis et de préparer le financement de votre formation VTC."
          steps={[
            { title: 'Planifiez votre rendez-vous téléphonique', description: <>Choisissez un créneau pour parler de votre projet de chauffeur VTC.<br /><a href="tel:0422470768">Appeler le 04 22 47 07 68 →</a></> },
            { title: 'Préparez votre projet', description: 'Avec votre conseillère, vérifiez votre permis, les pièces du dossier et la date limite d’inscription à l’examen.' },
            { title: 'Choisissez votre financement', description: <>Étudiez vos droits CPF, une demande auprès de France Travail ou un règlement personnel.<br /><a href={identityUrl} target="_blank" rel="noopener noreferrer">Préparer mon Identité Numérique →</a></> },
            { title: 'Finalisez votre inscription', description: 'Lors du second échange, validez votre dossier et les modalités de règlement avec votre conseillère.' },
            { title: 'Commencez la théorie', description: 'Recevez vos identifiants par e-mail, ouvrez votre première séquence et organisez votre préparation pratique avec l’équipe.' },
          ]}
          registration={{ href: projectHref, label: 'Commencer mon inscription →' }} fundingTitle="Préparez votre financement"
          fundingNote={<><p>Vous souhaitez utiliser votre CPF ?</p><p>Vérifiez vos droits disponibles et préparez votre connexion FranceConnect+ pour valider le dossier.</p>
            <a href="#inscription">Accéder à l’inscription CPF en autonomie →</a><br /><Link href="/financements">Comprendre les financements →</Link></>}
          funding={{ href: fundingHref, label: 'Étudier mon financement' }}
          options={[
            ['CPF', 'Mobilisez vos droits. Financement possible selon votre éligibilité et les règles applicables à votre dossier.'],
            ['France Travail', 'Présentez votre projet. Nous préparons avec vous les éléments utiles à transmettre à votre conseiller.'],
            ['Paiement personnel', 'Échelonnez votre règlement. Des solutions en 3, 4 ou 10 fois peuvent être étudiées selon votre situation.'],
          ]}>
          <div className={styles.offerSummary}><div><p className={styles.label}>L’offre Intégrale · Formation complète</p><h3>Prix tout inclus</h3><strong>{vtcCourse.priceLabel}</strong>
            <p><a className={styles.textLink} href="tel:0422470768">Ou appeler le 04 22 47 07 68</a></p>
            <a className={styles.textLink} href={practiceBooking}>Réserver la pratique seule →</a></div>
            <dl className={styles.included}>{included.map(([name, text]) => <div key={name}><dt>{name}</dt><dd>{text}</dd></div>)}</dl></div>
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
    <TrainingReferenceContact schoolStyle
      title="Rendez-vous téléphonique avec votre conseillère"
      description="Cassandre, Responsable commerciale, vérifie votre éligibilité, vous explique le calendrier et vous aide à choisir le financement adapté."
      href={contactHref('Être rappelé au sujet de la formation VTC')} />
    <TrainingReferenceMobileBar href="#dates-tarifs" label="Voir les dates & tarifs" />
  </TrainingReferencePage>;
}
