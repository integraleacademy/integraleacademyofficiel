import Image from 'next/image';
import Link from 'next/link';
import { ADMISSIONS_URL, SEPTEMBER_INTAKE, septemberId } from '@/data/admissions';
import { SessionCalendarLink } from './SessionCalendarLink';
import { PARIS_ADDRESS, PARIS_LANDMARK } from '@/data/locations';
import { upcomingCourseName, type UpcomingCourse, type UpcomingFamily } from '@/data/upcoming-trainings';
import { announcedCourseContent, type CourseContent } from '@/data/announced-course-content';
import { announcedCourseArt } from '@/data/announced-course-art';
import type { ManualIllustration } from '@/data/manualIllustrations';
import { AnnouncedCourseJourney, type CourseJourneyChapter } from './AnnouncedCourseJourney';
import { listPublicGoogleReviews } from '@/lib/google-reviews-data';
import { TrainingReferencePage, TrainingReferenceHero, TrainingCourseSections, TrainingReferenceAction, TrainingReferenceCampus, TrainingReferenceContact, TrainingReferenceMobileBar } from './TrainingReferenceLayout';
import { TrainingEditorialSection as Section } from './TrainingEditorialSection';
import { TrainingSectionNavigation, type TrainingSectionNavigationItem } from './TrainingSectionNavigation';
import { TrainingMissionCards } from './TrainingMissionCards';
import { TrainingPracticeCards, TrainingPracticeArtwork } from './TrainingPracticeCards';
import { TrainingAdmission, TrainingExamExperience, TrainingOfficialReferences } from './ApsExperienceSections';
import { TrainingProgramExplorer } from './TrainingProgramExplorer';
import { TrainingSessionSummary } from './TrainingSessionSummary';
import { TrainingDatesPricingSection } from './TrainingDatesPricingSection';
import { TrainingEnrollmentSection } from './TrainingEnrollmentSection';
import { CourseBrochureCard } from './CourseBrochureCard';
import { CourseTeamBanner } from './CourseTeamBanner';
import { GoogleReviewsSection } from './GoogleReviewsSection';
import { FaqDirectoryLink } from './FaqDirectoryLink';
import { DmsCalendar } from './DmsCalendar';
import styles from './AnnouncedCoursePage.module.css';
import experience from './ApsExperience.module.css';

const chapters: readonly TrainingSectionNavigationItem[] = [
  { label: 'Métier', href: '#metier' },
  { label: 'Immersion', href: '#pratique' },
  { label: 'Programme', href: '#programme' },
  { label: 'Examen', href: '#examen' },
  { label: 'Dates & tarifs', href: '#dates-tarifs' },
  { label: 'Inscriptions', href: '#inscription-financement' },
  { label: 'Débouchés', href: '#debouches' },
  { label: 'FAQ', href: '#questions-frequentes' },
];
const dmsAdviser = { person: 'aurelie', name: 'Aurélie BAYARD-CHAUSSEZ', role: 'Chargée des relations clients', phone: '04 87 83 06 15', phoneHref: 'tel:+33487830615' } as const;
const fireRegulation = 'https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000049957989/';
const academicReviews = { headingId: 'avis-ecole-titre', eyebrow: 'Avis Google sur l’école', title: 'Leur expérience chez Intégrale Academy', sourceLabel: 'Consulter les avis de l’école sur Google', empty: 'Découvrez les témoignages des stagiaires sur la fiche Google de l’école.' };

function Campus({ detail }: { detail: CourseContent }) {
  if (detail.venue === 'Paris') return <>
    <CourseTeamBanner />
    <Section id="ecole" eyebrow="Votre école à Paris" title={<>Bienvenue chez <em>Intégrale Academy</em></>} tone="paper"
      intro="Les deux mastères en intelligence artificielle sont proposés au 34 rue Poissonnière, dans le 2e arrondissement, à 50 mètres du Grand Rex.">
      <div className={styles.paris}>
        <address><span className={styles.kicker}>Centre de formation</span><strong>34 rue Poissonnière</strong>75002 Paris<br />{PARIS_LANDMARK}</address>
        <div><h3>Préparer votre venue</h3><p>Retrouvez les informations pratiques pour rejoindre l’école ou contactez l’équipe avant votre déplacement.</p>
          <Link href="/centres#centre-paris">Découvrir le centre de Paris ↗</Link></div>
      </div>
    </Section>
  </>;
  return <TrainingReferenceCampus editorialId="ecole" title={detail.venue ? 'Votre école à Puget-sur-Argens' : 'Découvrez l’école et son équipe'}
    description={detail.venue ? 'Les cours ont lieu au 54 chemin du Carreou, 83480 Puget-sur-Argens, sur la Côte d’Azur.' : 'Ces photos présentent le centre de Puget-sur-Argens. Le lieu de formation du Bachelor EIRC sera précisé à son ouverture.'}
    groupLabel={detail.venue ? 'Campus' : 'Notre école'} groupSize="Puget-sur-Argens" />;
}

function JobExamples({ detail, illustrations }: { detail: CourseContent; illustrations: readonly ManualIllustration[] }) {
  return <TrainingPracticeCards items={detail.practice.map((item, index) => ({
    icon: index === 0 ? '↗' : '✓', title: item.title, text: item.text,
    visuals: [{ kind: 'atelier', illustration: <TrainingPracticeArtwork illustration={illustrations[index]} /> }],
    afterVisuals: <details className={styles.caseSheet}>
      <summary className={styles.sheetHead}>{item.document}<span aria-hidden="true">＋</span></summary>
      <dl>{item.rows.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
    </details>,
  }))} />;
}

function References({ family, course, detail, email }: { family: UpcomingFamily; course: UpcomingCourse; detail: CourseContent; email: string }) {
  const dms = course.anchorId === 'bachelor-dms';
  const name = upcomingCourseName(family, course);
  const registry = detail.rncp;
  const url = registry ? `https://www.francecompetences.fr/recherche/rncp/${registry}/` : detail.project ? `/certifications/${detail.project.slug}` : '/#bachelor-eirc';
  return <TrainingOfficialReferences id="reperes-officiels" course={course.anchorId} number="09" title={<>Les repères <em>du parcours</em></>}
    intro={registry ? 'Retrouvez la certification nationale et les compétences qu’elle couvre.' : course.certificationStatus || 'Le niveau visé et les compétences du parcours.'}
    qualification={dms ? 'Titre DESP et diplôme SSIAP 3' : registry ? 'Titre professionnel' : 'Projet de certification'}
    certificateLabel={registry ? 'Certification professionnelle' : 'Formation en préparation'}
    name={dms ? 'Directeur d’entreprise de sécurité privée' : name} level={detail.level}
    registryLabel={registry ? 'Fiche nationale' : 'Demande d’enregistrement au RNCP'} registryCode={registry ? `RNCP${registry}` : 'En cours d’instruction par France compétences'}
    facts={dms ? [['Certificateurs du DESP', 'ADEF et CPNEFP de la Prévention Sécurité'], ['SSIAP 3', 'Arrêté du 2 mai 2005 modifié']] : registry ? [['Certificateur', 'Ministère chargé de l’emploi'], ['Organisation', 'Deux certificats de compétences professionnelles']] : [['Niveau visé', detail.level], ['Rentrée', SEPTEMBER_INTAKE]]}
    url={url} sourceLabel={registry ? 'Consulter la fiche France compétences' : detail.project ? 'Consulter le projet détaillé de l’école' : 'Voir l’annonce au catalogue'}
    conditionsLabel={dms ? 'Les deux qualifications' : 'Les compétences visées'} profession={dms ? 'Deux validations distinctes' : 'Ce que vous apprendrez'}
    conditions={course.topics} professionNote={dms ? 'Les qualifications correspondent à deux fonctions distinctes, la direction en sécurité privée et la gestion d’un service de sécurité incendie.' : detail.settings}
    detailsTitle={dms ? 'Les textes et la brochure du Bachelor' : registry ? 'Que précise le référentiel national ?' : 'Où en est la certification ?'}
    details={dms ? <p><a href={fireRegulation} target="_blank" rel="noopener noreferrer">Consulter l’article 6 de l’arrêté du 2 mai 2005 pour le SSIAP 3 ↗</a><br /><a href="/documents/brochure-bachelor-dms-2027.pdf" target="_blank" rel="noopener noreferrer">Consulter la brochure de la promotion 2027–2028 ↗</a></p> :
      registry ? <p>La fiche France compétences décrit les activités, les deux blocs de compétences, les épreuves et les emplois accessibles. La préparation à Intégrale Academy débute à partir de septembre 2027.</p> :
        <p>{course.certificationStatus} Le niveau est celui visé par le projet. L’école communiquera les suites de la démarche d’enregistrement. <a href={email}>Interroger l’équipe sur son avancement ↗</a></p>} />;
}

export async function AnnouncedCoursePage({ family, course }: { family: UpcomingFamily; course: UpcomingCourse }) {
  const detail = announcedCourseContent[course.anchorId];
  const dms = course.anchorId === 'bachelor-dms';
  const name = upcomingCourseName(family, course);
  const venue = detail.venue ?? 'Lieu à préciser';
  const project = detail.project;
  const email = dms ? 'mailto:aurelie@integraleacademy.com?subject=Candidature%20Bachelor%20DMS%202027' : `mailto:ecole@integraleacademy.com?subject=${encodeURIComponent(`Informations · ${family.singular} ${name}`)}`;
  const fundingAction = { href: email, label: dms ? 'Échanger avec Aurélie BAYARD-CHAUSSEZ' : 'Échanger avec l’école' };
  const price = dms ? '0 € en apprentissage' : 'Tarif à venir';
  const jobNames = [...new Set([...(course.jobs ?? []), ...detail.jobs].map(job => job.replace(/\.$/, '')))];
  const tp = family.id === 'titres-professionnels';
  const registrationHref = ADMISSIONS_URL;
  const registrationLabel = 'Déposer ma candidature';
  const images = announcedCourseArt[course.anchorId];
  const dateText = SEPTEMBER_INTAKE;
  const reviews = await listPublicGoogleReviews();
  const themes = { blue: 'blue', green: 'green', violet: 'violet', orange: 'orange', turquoise: 'blue' } as const;
  const shortName = family.id === 'bachelors' ? `Bachelor ${course.shortTitle}`
    : family.id === 'masteres' ? `Mastère ${course.tabLabel}`
    : ({ PAIE: 'Gestionnaire de paie', RH: 'Assistant RH', SAMA: 'Secrétariat médical', CAGA: 'Accueil administratif', OVT: 'Vidéoprotection' } as Record<string, string>)[detail.mark] || name;
  const journey: CourseJourneyChapter[] = [
    { label: 'Le métier', title: 'Prendre ses repères en poste', description: detail.missions[0][1], cardTitle: 'Les responsabilités du métier', items: detail.missions.map(([title]) => title), href: '#metier', link: 'Découvrir le métier' },
    { label: 'La formation', title: dms ? 'Alterner entre l’école et l’entreprise' : 'Construire ses compétences', description: dms ? 'Les cours de DESP et de SSIAP 3 alternent avec les périodes chez l’employeur.' : 'Explorez les activités qui composent ce parcours.', cardTitle: dms ? 'Les deux diplômes préparés' : 'Les axes du programme', items: detail.units.map(unit => unit.title), href: '#programme', link: 'Explorer le programme' },
    { label: 'La pratique', title: 'Prendre une décision professionnelle', description: detail.practice[0].text, cardTitle: detail.practice[0].document, items: detail.practice[0].rows.map(([label, value]) => `${label} · ${value}`), href: '#pratique', link: 'Voir les mises en situation' },
    { label: 'Les débouchés', title: 'Choisir un métier', description: detail.settings, cardTitle: 'Exemples de postes', items: jobNames.slice(0, 3), href: '#debouches', link: 'Voir tous les débouchés' },
  ];
  return <TrainingReferencePage theme={detail.theme} className={styles.course}>
    <TrainingReferenceHero id={course.anchorId} badge={`${family.singular} · ${detail.level}`} extendedCopy={name.length > 44}
      heading={family.id === 'bachelors' ? `Bachelor ${course.shortTitle}` : course.shortTitle} accent={course.title}
      title={family.singular} tagline={detail.tagline} description={<><p>{course.description}</p>
        {course.certificationStatus && <p className={styles.instruction}>{course.certificationStatus}</p>}</>}
      illustration={images.hero} caption={detail.missions[0][0]}
      primaryAction={{ href: registrationHref, label: registrationLabel }}
      secondaryAction={{ href: dms ? '#dates-tarifs' : '#programme', label: dms ? 'Voir le calendrier d’alternance' : 'Découvrir le programme' }}>
      <aside className={styles.summary} aria-label="Informations pratiques">
        <div className={styles.intake}><p className={styles.kicker}>Prochaine rentrée</p><h2>{dateText}</h2>
          {dms && <p>Promotion 2027–2028</p>}</div>
        <TrainingSessionSummary location={venue} locationNote={detail.venue === 'Paris' ? `${PARIS_ADDRESS} · ${PARIS_LANDMARK}` : detail.venue ? 'Côte d’Azur' : undefined}
          facts={[{ label: 'Qualification', value: detail.level, details: dms ? ['DESP et SSIAP 3'] : detail.rncp ? [`RNCP${detail.rncp}`] : [] },
            { label: dms ? 'Durée' : 'Parcours', value: dms ? '461 heures' : tp ? 'En alternance' : family.singular, details: dms ? ['245 h de DESP · 216 h de SSIAP 3'] : [] },
            { label: dms ? 'Rythme' : 'Programme', value: dms ? '1 an en alternance' : `${detail.units.length} ${project || detail.rncp ? 'blocs' : 'axes'}` }]} />
        <div className={styles.summaryAction}><p>{dms ? 'Frais pédagogiques pour l’apprenti' : 'Candidature en ligne'}</p>
          {dms && <strong>0 €</strong>}<TrainingReferenceAction href={registrationHref}>{registrationLabel} →</TrainingReferenceAction></div>
      </aside>
    </TrainingReferenceHero>

    <TrainingSectionNavigation mark={detail.mark} title={shortName}
      items={chapters} theme={detail.theme} registrationHref={registrationHref} registrationLabel="Candidater" />
    <AnnouncedCourseJourney course={name} theme={themes[detail.theme]} chapters={journey}>
      <Section id="metier" eyebrow="01 — Le métier" title={dms ? 'Diriger une agence, piloter un service incendie' : 'Les missions au quotidien'}>
        <TrainingMissionCards items={detail.missions.map(([title, description], index) => ({ title, description, illustration: images.missions[index] }))} />
      </Section>
    </AnnouncedCourseJourney>
    <TrainingCourseSections
      admission={<Section id="admission" eyebrow="02 — Admission" title={<>Votre dossier est-il prêt <em>pour {dms ? 'le Bachelor DMS' : family.id === 'bachelors' ? 'le Bachelor EIRC' : 'cette formation'} ?</em></>} tone="stone">
        <TrainingAdmission course={course.anchorId} action={registrationHref} actionLabel={registrationLabel}
          lead={<><h3>Votre parcours,<br /><em>votre candidature</em></h3><p>{dms ? 'Deux voies d’accès permettent de candidater. Aurélie BAYARD-CHAUSSEZ peut vérifier votre situation et vous accompagner dans la recherche d’un employeur.' : tp ? 'Retrouvez ce titre professionnel sur le portail des admissions d’Intégrale Academy pour préparer votre candidature en alternance.' : project ? 'Voici les conditions envisagées dans le projet publié par l’école.' : 'Votre formation et votre expérience sont le point de départ de l’échange avec l’équipe.'}</p></>}
          points={detail.admission.map(([title, content]) => ({ title, content: <p>{content}</p> }))}
          note="Un besoin lié au handicap ? Échangez avec l’équipe sur les aménagements possibles."
          steps={dms ? 'Vérification des prérequis → Recherche d’entreprise → Contrat d’apprentissage' : tp ? 'Choix du titre → Dossier sur le portail des admissions → Suivi de la candidature' : 'Choisir la formation → Déposer son dossier en ligne → Échanger avec l’école'} />
      </Section>}
      immersion={<Section id="pratique" eyebrow="03 — Immersion & pédagogie" title={<>Le métier <em>en situation</em></>} intro="Deux exemples de décisions à prendre et de documents à préparer dans la pratique du métier." tone="dark"><JobExamples detail={detail} illustrations={images.practice} /></Section>}
      campus={<Campus detail={detail} />}
      brochure={dms ? <CourseBrochureCard course="bachelor-dms" /> : null}
      program={<Section id="programme" eyebrow="04 — Compétences & programme" title={dms ? '461 heures pour préparer deux diplômes' : 'Ce que vous apprendrez'} intro={project?.objective ?? (dms ? 'Les volumes de cours sont indiqués hors examens et déplacements. Votre maître d’apprentissage assure le relais pendant les semaines en entreprise.' : 'Explorez chaque partie du programme et ses applications professionnelles.')} tone="paper">
        <TrainingProgramExplorer idPrefix={course.anchorId} units={detail.units} menuTitle="Explorer le programme" tabListLabel={`Programme · ${detail.mark}`} nextLabel="Partie suivante" restartLabel="Revenir au début"
          hours={dms ? '461' : String(detail.units.length)} unitLabel={dms ? ' h' : ''} overview={dms ? 'heures de cours' : project || detail.rncp ? 'blocs de compétences' : 'axes de formation'} subtitle={dms ? 'En contrat d’apprentissage' : name}
          facts={dms ? [['DESP', '245 heures'], ['SSIAP 3', '216 heures']] : [['Qualification', detail.level], ['Lieu', venue]]} />
      </Section>}
      pack={null}
      exam={<Section id="examen" eyebrow="05 — Examen" title={dms ? 'Deux examens, deux diplômes' : project ? 'Les évaluations prévues' : detail.rncp ? 'Comment se déroule l’examen ?' : 'Les modalités de validation'} tone="dark">
        <TrainingExamExperience metric={detail.exam.metric} label={detail.exam.label} description={dms ? 'Une évaluation pour chaque diplôme.' : detail.rncp ? `Référentiel national RNCP${detail.rncp}` : 'Projet de certification'}
          theory={<><p className={experience.kicker}>{dms ? 'Direction en sécurité privée' : 'Évaluation'}</p>
            <h3 className={styles.examHeading}>{detail.exam.parts[0][0]}</h3>
            {project ? <ul>{project.assessments.slice(0, 2).map(item => <li key={item}>{item}</li>)}</ul> : <p>{detail.exam.parts[0][1]}</p>}
            {(tp || dms) && <div className={styles.examSkills}><p>Compétences mobilisées</p><ul>
              {(dms ? detail.units[0].items || [] : detail.units.map(unit => unit.title)).map(item => <li key={item}>{item}</li>)}
            </ul></div>}
          </>}
          practice={<><Image {...images.exam} width={700} height={467} sizes="(max-width: 700px) 90vw, 450px" />
            <div><p className={experience.kicker}>{dms ? 'Sécurité incendie' : 'Validation'}</p>
              <h3>{detail.exam.parts[1][0]}</h3>
              {project ? <ul className={styles.examItems}>{project.assessments.slice(2).map(item => <li key={item}>{item}</li>)}</ul> : <p className={styles.examText}>{detail.exam.parts[1][1]}</p>}
            </div></>}
          validation={<div><p>{detail.exam.validation}</p></div>} />
      </Section>}
      dates={<TrainingDatesPricingSection compact showFundingSimulator={false} theme={themes[detail.theme]} eyebrow="06 — Dates & tarifs" title={dms ? 'Votre année d’alternance' : 'La prochaine session'} intro={dms ? 'Retrouvez les périodes en entreprise, les semaines de cours et les dates prévisionnelles des examens.' : tp ? 'Ces titres professionnels sont proposés en alternance, en présentiel à Puget-sur-Argens.' : 'La rentrée est prévue en septembre 2027.'}
        sessions={[]} defaultPrice={price} summaryPrice={price} registrationHref={() => registrationHref} priceAction={fundingAction}
        priceDescription={dms ? 'Valeur habituelle des deux formations : 8 100 € (4 300 € pour le DESP et 3 800 € pour le SSIAP 3).' : 'Le tarif sera communiqué avant toute inscription.'}
        calendar={<div>{dms ? <DmsCalendar /> : <div className={styles.calendar}><p className={styles.kicker}>Prochaine rentrée</p><h3>{SEPTEMBER_INTAKE}</h3><p>Le jour de rentrée, le détail des cours et les dates d’examen seront précisés par l’école.</p></div>}<SessionCalendarLink id={septemberId(course.anchorId)} /></div>} />}
      enrollment={<TrainingEnrollmentSection number="07" showFundingSimulator={false} textOnlyOptions title={dms ? 'Du premier contact au contrat d’apprentissage.' : 'Préparer votre entrée en formation.'}
        intro={dms ? 'Indiquez votre parcours à Aurélie BAYARD-CHAUSSEZ. Si vous avez déjà une entreprise d’accueil, transmettez-lui ses coordonnées pour préparer le contrat.' : tp ? 'Sur le portail des admissions, sélectionnez votre titre professionnel pour préparer votre candidature à la rentrée de septembre 2027.' : 'Choisissez votre formation sur le portail des admissions et déposez votre dossier pour la rentrée de septembre 2027.'}
        steps={dms ? ['Préciser son projet', 'Préparer son CV', 'Contacter les employeurs', 'Préparer l’entretien et le contrat'] : tp ? ['Choisir le titre professionnel', 'Préparer sa candidature', 'Suivre son dossier avec l’école'] : ['Choisir sa formation', 'Déposer sa candidature en ligne', 'Suivre son dossier avec l’école']}
        registration={{ href: registrationHref, label: registrationLabel }} fundingTitle={dms ? '0 € de frais pédagogiques en apprentissage' : 'Étudier le financement de votre parcours'}
        fundingNote={dms ? 'L’apprenti est salarié de l’entreprise. Les heures de cours et le temps en entreprise sont rémunérés dans le cadre du contrat.' : 'Les possibilités de prise en charge seront précisées avec le calendrier et le tarif.'}
        funding={fundingAction} optionsHeading={dms ? 'Ce qui entre dans le calcul de votre rémunération' : 'Les points à examiner avec l’école'}
        options={dms ? [['Votre âge', 'La rémunération minimale varie selon la tranche d’âge.'], ['Votre parcours', 'Un précédent contrat d’apprentissage peut entrer dans le calcul.'], ['Votre contrat', 'La convention collective peut prévoir un montant plus élevé.']] : [['Votre situation', 'Salarié, demandeur d’emploi ou en poursuite d’études.'], ['Votre dossier', 'Identifier les justificatifs et les délais utiles.']]} />}
      outcomes={<Section id="debouches" eyebrow="08 — Débouchés & emploi" title="Quels métiers après la formation ?" tone="paper">
        <div className={styles.outcomes}><article><h3>Exemples de métiers visés</h3><ul>{jobNames.map(job => <li key={job}>{job}</li>)}</ul></article><article><h3>Les environnements de travail</h3><p>{detail.settings}</p>
          {dms && <p>En apprentissage, vous pouvez suivre les écarts entre les heures prévues et réalisées, participer à un point d’exploitation ou au suivi des opérations de maintenance incendie.</p>}
          {project && <Link href={`/certifications/${project.slug}`}>Explorer le projet de certification {project.acronym} ↗</Link>}
        </article></div>
      </Section>}
      references={<References family={family} course={course} detail={detail} email={email} />} />
    <GoogleReviewsSection reviews={reviews} copy={academicReviews} />
    <FaqDirectoryLink embedded id="questions-frequentes" theme={detail.theme === 'violet' ? 'violet' : 'blue'} />
    <div id="contact-formation"><TrainingReferenceContact schoolStyle adviser={dms ? dmsAdviser : undefined}
      href={dms ? registrationHref : `mailto:ecole@integraleacademy.com?subject=${encodeURIComponent(`Rendez-vous téléphonique · ${family.singular} ${name}`)}`} appointmentLabel={dms ? 'Déposer ma candidature →' : 'Demander un rendez-vous téléphonique →'}
      description={dms ? <p>Aurélie BAYARD-CHAUSSEZ vous accompagne pour vérifier vos prérequis, échanger avec un employeur et préparer votre contrat d’apprentissage.</p> : <p>Présentez votre projet à l’équipe et posez vos questions sur le parcours {name}.</p>}
      additionalActions={dms ? <><a href="mailto:aurelie@integraleacademy.com?subject=Rendez-vous%20t%C3%A9l%C3%A9phonique%20Bachelor%20DMS">Demander un rendez-vous téléphonique</a><a href="tel:+33769390457">Portable · 07 69 39 04 57</a><a href={email}>aurelie@integraleacademy.com</a></> : <a href={email}>Écrire au sujet de cette formation</a>} /></div>
    <TrainingReferenceMobileBar href={registrationHref} label="Candidater" phoneHref={dms ? dmsAdviser.phoneHref : undefined} />
  </TrainingReferencePage>;
}
