import Image from 'next/image';
import Link from 'next/link';
import { upcomingCourseName, type UpcomingCourse, type UpcomingFamily } from '@/data/upcoming-trainings';
import { announcedCourseContent, type CourseContent } from '@/data/announced-course-content';
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
  { href: '#metier', label: 'Le métier' }, { href: '#admission', label: 'Admission' },
  { href: '#pratique', label: 'Immersion' }, { href: '#programme', label: 'Programme' },
  { href: '#examen', label: 'Examen' }, { href: '#dates-tarifs', label: 'Dates & tarifs' },
  { href: '#inscription-financement', label: 'Inscription' }, { href: '#debouches', label: 'Débouchés' },
  { href: '#reperes-officiels', label: 'Repères officiels' }, { href: '#avis-google', label: 'Avis' },
];
const dmsAdviser = { person: 'aurelie', name: 'Aurélie Bayard-Chaussez', role: 'Chargée des relations clients', phone: '04 87 83 06 15', phoneHref: 'tel:+33487830615' } as const;
const fireRegulation = 'https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000049957989/';
const academicReviews = { headingId: 'avis-ecole-titre', eyebrow: 'Avis Google sur l’école', title: 'Leur expérience chez Intégrale Academy', sourceLabel: 'Consulter les avis de l’école sur Google', empty: 'Découvrez les témoignages des stagiaires sur la fiche Google de l’école.' };

function Campus({ detail }: { detail: CourseContent }) {
  if (detail.venue === 'Paris') return <>
    <CourseTeamBanner />
    <Section id="ecole" eyebrow="Votre école à Paris" title={<>Bienvenue chez <em>Intégrale Academy</em></>} tone="paper">
      <div className={styles.paris}><Image src="/images/illustrations-2026/destination-paris.webp" alt="Illustration de Paris" width={1000} height={660} sizes="(max-width: 700px) 90vw, 48vw" />
        <div><p className={styles.kicker}>Campus de Paris</p><h3>Le centre du 2e arrondissement</h3><p>Le mastère est annoncé à Paris, au 34 rue Poissonnière, 75002 Paris.</p><Link href="/centres#centre-paris">Découvrir le centre de Paris ↗</Link></div>
      </div>
    </Section>
  </>;
  return <TrainingReferenceCampus editorialId="ecole" title={detail.venue ? 'Votre école à Puget-sur-Argens' : 'Découvrez l’école et son équipe'}
    description={detail.venue ? 'Les cours ont lieu au 54 chemin du Carreou, 83480 Puget-sur-Argens, sur la Côte d’Azur.' : 'Ces photos présentent le centre de Puget-sur-Argens. Le lieu de formation du Bachelor EIRC sera précisé à son ouverture.'}
    groupLabel="Votre interlocuteur" groupSize="L’équipe de l’école" />;
}

function JobExamples({ detail }: { detail: CourseContent }) {
  return <TrainingPracticeCards items={detail.practice.map((item, index) => ({
    icon: index === 0 ? '↗' : '✓', title: item.title, text: item.text,
    visuals: [{ kind: 'atelier', illustration: <TrainingPracticeArtwork illustration={detail.workshopArt[index]} /> }],
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
    intro={registry ? 'Retrouvez la certification nationale et les compétences qu’elle couvre.' : 'Retrouvez le statut annoncé par l’école et les objectifs du parcours en préparation.'}
    qualification={dms ? 'Titre DESP et diplôme SSIAP 3' : registry ? 'Titre professionnel' : 'Projet de certification'}
    certificateLabel={registry ? 'Certification professionnelle' : 'Formation en préparation'}
    name={dms ? 'Directeur d’entreprise de sécurité privée' : name} level={detail.level}
    registryLabel={registry ? 'Fiche nationale' : 'Statut au catalogue'} registryCode={registry ? `RNCP${registry}` : 'En préparation'}
    facts={dms ? [['Certificateurs du DESP', 'ADEF et CPNEFP de la Prévention Sécurité'], ['SSIAP 3', 'Arrêté du 2 mai 2005 modifié']] : registry ? [['Certificateur', 'Ministère chargé de l’emploi'], ['Organisation', 'Deux certificats de compétences professionnelles']] : [['Niveau visé', detail.level], ['Ouverture', 'Prochainement']]}
    url={url} sourceLabel={registry ? 'Consulter la fiche France compétences' : detail.project ? 'Consulter le projet détaillé de l’école' : 'Voir l’annonce au catalogue'}
    conditionsLabel={dms ? 'Les deux qualifications' : 'Les compétences visées'} profession={dms ? 'Deux validations distinctes' : 'Ce que vous apprendrez'}
    conditions={course.topics} professionNote={dms ? 'Les qualifications correspondent à deux fonctions distinctes, la direction en sécurité privée et la gestion d’un service de sécurité incendie.' : detail.settings}
    detailsTitle={dms ? 'Les textes et la brochure du Bachelor' : registry ? 'Que précise le référentiel national ?' : 'Où en est la certification ?'}
    details={dms ? <p><a href={fireRegulation} target="_blank" rel="noopener noreferrer">Consulter l’article 6 de l’arrêté du 2 mai 2005 pour le SSIAP 3 ↗</a><br /><a href="/documents/brochure-bachelor-dms-2027.pdf" target="_blank" rel="noopener noreferrer">Consulter la brochure de la promotion 2027–2028 ↗</a></p> :
      registry ? <p>La fiche France compétences décrit les activités, les deux blocs de compétences, les épreuves et les emplois accessibles. Les dates de préparation à Intégrale Academy seront annoncées par l’école.</p> :
        <p>{course.certificationStatus} Le niveau est celui visé par le projet. L’école communiquera les suites de la démarche d’enregistrement. <a href={email}>Interroger l’équipe sur son avancement ↗</a></p>} />;
}

export async function AnnouncedCoursePage({ family, course }: { family: UpcomingFamily; course: UpcomingCourse }) {
  const detail = announcedCourseContent[course.anchorId];
  const dms = course.anchorId === 'bachelor-dms';
  const name = upcomingCourseName(family, course);
  const venue = detail.venue ?? 'Lieu à préciser';
  const project = detail.project;
  const email = dms ? 'mailto:aurelie@integraleacademy.com?subject=Candidature%20Bachelor%20DMS%202027' : `mailto:ecole@integraleacademy.com?subject=${encodeURIComponent(`Informations · ${family.singular} ${name}`)}`;
  const actionLabel = dms ? 'Candidater auprès d’Aurélie' : 'Demander des informations';
  const fundingAction = { href: email, label: dms ? 'Échanger avec Aurélie' : 'Échanger avec l’école' };
  const price = dms ? '0 € en apprentissage' : 'Tarif à venir';
  const jobNames = [...new Set([...(course.jobs ?? []), ...detail.jobs].map(job => job.replace(/\.$/, '')))];
  const art = { src: course.imageSrc, alt: course.imageAlt };
  const dateText = dms ? 'Septembre 2027' : 'Prochainement';
  const reviews = await listPublicGoogleReviews();
  const themes = { blue: 'blue', green: 'green', violet: 'violet', orange: 'orange', turquoise: 'blue' } as const;
  return <TrainingReferencePage theme={detail.theme} className={styles.course}>
    <TrainingReferenceHero id={course.anchorId} badge={`${family.singular} · ${course.status}`}
      heading={family.id === 'bachelors' ? `Bachelor ${course.shortTitle}` : course.shortTitle} accent={course.title}
      title={family.singular} tagline={detail.tagline} description={<p>{course.description}</p>}
      illustration={art} caption={dms ? 'Direction et sécurité incendie' : course.tabLabel === 'Médical' ? 'Secrétariat médical' : name}
      primaryAction={{ href: dms ? '#dates-tarifs' : '#programme', label: dms ? 'Voir le calendrier d’alternance' : 'Découvrir le programme' }}
      secondaryAction={{ href: email, label: actionLabel }}>
      <aside className={styles.summary} aria-label="Informations pratiques">
        <div className={styles.intake}><p className={styles.kicker}>{dms ? 'Prochaine rentrée' : 'Ouverture de la formation'}</p><h2>{dateText}</h2>
          {dms && <p>Promotion 2027–2028</p>}</div>
        <TrainingSessionSummary location={venue} locationNote={detail.venue === 'Paris' ? '34 rue Poissonnière, 75002 Paris' : detail.venue ? 'Côte d’Azur' : undefined}
          facts={[{ label: 'Qualification', value: detail.level, details: [dms ? 'DESP et SSIAP 3' : detail.rncp ? `RNCP${detail.rncp}` : 'Projet de certification'] },
            { label: dms ? 'Durée' : 'Parcours', value: dms ? '461 heures' : family.singular, details: dms ? ['245 h de DESP · 216 h de SSIAP 3'] : [] },
            { label: dms ? 'Rythme' : 'Programme', value: dms ? '1 an en alternance' : `${detail.units.length} ${project || detail.rncp ? 'blocs' : 'axes'}` }]} />
        <div className={styles.summaryAction}><p>{dms ? 'Frais pédagogiques pour l’apprenti' : 'Renseignements'}</p><strong>{dms ? '0 €' : 'Votre projet'}</strong><TrainingReferenceAction href={email}>{actionLabel} →</TrainingReferenceAction></div>
      </aside>
    </TrainingReferenceHero>

    <TrainingSectionNavigation mark={detail.mark} title={family.id === 'bachelors' ? `Bachelor ${detail.mark}` : name}
      items={chapters} theme={detail.theme} registrationHref={email} registrationLabel={dms ? 'Candidater' : 'Contacter l’école'} />
    <Section id="metier" eyebrow="01 — Le métier" title={dms ? 'Diriger une agence, piloter un service incendie' : detail.tagline} intro={course.description}>
      <TrainingMissionCards items={detail.missions.map(([title, description, illustration]) => ({ title, description, illustration, landscapeFocus: '50% 46%' }))} />
    </Section>
    <TrainingCourseSections
      admission={<Section id="admission" eyebrow="02 — Admission" title={<>Votre dossier est-il prêt <em>pour {dms ? 'le Bachelor DMS' : family.id === 'bachelors' ? 'le Bachelor EIRC' : 'cette formation'} ?</em></>} tone="paper">
        <TrainingAdmission course={course.anchorId} action={email} actionLabel={dms ? 'Préparer mon dossier avec Aurélie' : 'Échanger sur mon parcours'}
          lead={<><h3>Votre parcours,<br /><em>votre candidature</em></h3><p>{dms ? 'Deux voies d’accès permettent de candidater. Aurélie peut vérifier votre situation et vous accompagner dans la recherche d’un employeur.' : project ? 'Voici les conditions envisagées dans le projet publié par l’école.' : 'Votre formation et votre expérience sont le point de départ de l’échange avec l’équipe.'}</p></>}
          points={detail.admission.map(([title, content]) => ({ title, content: <p>{content}</p> }))}
          note="Un besoin lié au handicap ? Échangez avec l’équipe sur les aménagements possibles."
          steps={dms ? 'Vérification des prérequis → Recherche d’entreprise → Contrat d’apprentissage' : 'Présentation du projet → Échange avec l’école → Informations sur l’ouverture'} />
      </Section>}
      immersion={<Section id="pratique" eyebrow="03 — Immersion & pédagogie" title={<>Le métier <em>en situation</em></>} intro="Deux exemples de décisions à prendre et de documents à préparer dans la pratique du métier." tone="dark"><JobExamples detail={detail} /></Section>}
      campus={<Campus detail={detail} />}
      brochure={dms ? <CourseBrochureCard course="bachelor-dms" /> : null}
      program={<Section id="programme" eyebrow="04 — Compétences & programme" title={dms ? '461 heures pour préparer deux diplômes' : 'Ce que vous apprendrez'} intro={project?.objective ?? (dms ? 'Les volumes de cours sont indiqués hors examens et déplacements. Votre maître d’apprentissage assure le relais pendant les semaines en entreprise.' : 'Explorez chaque partie du programme et ses applications professionnelles.')} tone="paper">
        <TrainingProgramExplorer idPrefix={course.anchorId} units={detail.units} menuTitle="Explorer le programme" tabListLabel={`Programme · ${detail.mark}`} nextLabel="Partie suivante" restartLabel="Revenir au début"
          hours={dms ? '461' : String(detail.units.length)} unitLabel={dms ? ' h' : ''} overview={dms ? 'heures de cours' : project || detail.rncp ? 'blocs de compétences' : 'axes de formation'} subtitle={dms ? 'En contrat d’apprentissage' : name}
          facts={dms ? [['DESP', '245 heures'], ['SSIAP 3', '216 heures']] : [['Qualification', detail.level], ['Lieu', venue]]} />
      </Section>}
      pack={null}
      exam={<Section id="examen" eyebrow="05 — Examen" title={dms ? 'Deux examens, deux diplômes' : project ? 'Les évaluations prévues' : detail.rncp ? 'Comment se déroule l’examen ?' : 'Les modalités de validation'} tone="stone">
        <TrainingExamExperience metric={detail.exam.metric} label={detail.exam.label} description={dms ? 'Une évaluation pour chaque diplôme.' : detail.rncp ? `Référentiel national RNCP${detail.rncp}` : 'Projet de certification'}
          theory={<><p className={experience.kicker}>{dms ? 'Direction en sécurité privée' : 'Évaluation'}</p><h3 className={styles.examHeading}>{detail.exam.parts[0][0]}</h3><p>{detail.exam.parts[0][1]}</p></>}
          practice={<><Image src={dms ? '/images/formation-scenes-manuel/ssiap-3-evaluation.webp' : '/images/formation-scenes-manuel/desp-vae-jury.webp'} alt={dms ? 'Présentation d’une épreuve de sécurité incendie au jury.' : 'Illustration d’un échange avec un jury professionnel.'} width={700} height={467} sizes="(max-width: 700px) 90vw, 450px" /><div><p className={experience.kicker}>{dms ? 'Sécurité incendie' : 'Validation'}</p><h3>{detail.exam.parts[1][0]}</h3><p>{detail.exam.parts[1][1]}</p></div></>}
          validation={detail.exam.validation} />
      </Section>}
      dates={<TrainingDatesPricingSection compact showFundingSimulator={false} theme={themes[detail.theme]} eyebrow="06 — Dates & tarifs" title={dms ? 'Votre année d’alternance' : 'La prochaine session'} intro={dms ? 'Retrouvez les périodes en entreprise, les semaines de cours et les dates prévisionnelles des examens.' : 'L’ouverture sera annoncée ici avec le calendrier et les modalités pratiques.'}
        sessions={[]} defaultPrice={price} summaryPrice={price} registrationHref={() => email} priceAction={fundingAction}
        priceDescription={dms ? 'Valeur habituelle des deux formations : 8 100 € (4 300 € pour le DESP et 3 800 € pour le SSIAP 3).' : 'Le tarif sera communiqué avant toute inscription.'}
        calendar={dms ? <DmsCalendar /> : undefined} emptyBadgeLabel="Prochainement" emptyTitle="Les dates seront annoncées prochainement" emptyDescription={detail.venue ? `Le parcours est prévu à ${detail.venue}. L’équipe peut déjà répondre à vos questions.` : 'L’équipe précisera le lieu et les dates de la formation lors de son ouverture.'} emptyAction={fundingAction} />}
      enrollment={<TrainingEnrollmentSection number="07" showFundingSimulator={false} title={dms ? 'Du premier contact au contrat d’apprentissage.' : 'Préparer votre entrée en formation.'}
        intro={dms ? 'Indiquez votre parcours à Aurélie. Si vous avez déjà une entreprise d’accueil, transmettez-lui ses coordonnées pour préparer le contrat.' : 'Parlez de votre projet à l’école pour savoir quelles démarches entreprendre à l’ouverture.'}
        steps={dms ? ['Préciser son projet', 'Préparer son CV', 'Contacter les employeurs', 'Préparer l’entretien et le contrat'] : ['Présenter son parcours', 'Échanger avec l’école', 'Recevoir les modalités à l’ouverture']}
        registration={{ href: email, label: actionLabel }} fundingTitle={dms ? '0 € de frais pédagogiques en apprentissage' : 'Étudier le financement de votre parcours'}
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
      href={dms ? email : `mailto:ecole@integraleacademy.com?subject=${encodeURIComponent(`Rendez-vous téléphonique · ${family.singular} ${name}`)}`} appointmentLabel={dms ? 'Écrire à Aurélie pour candidater →' : 'Demander un rendez-vous téléphonique →'}
      description={dms ? <p>Aurélie Bayard-Chaussez vous accompagne pour vérifier vos prérequis, échanger avec un employeur et préparer votre contrat d’apprentissage.</p> : <p>Présentez votre projet à l’équipe et posez vos questions sur le parcours {name}.</p>}
      additionalActions={dms ? <><a href="mailto:aurelie@integraleacademy.com?subject=Rendez-vous%20t%C3%A9l%C3%A9phonique%20Bachelor%20DMS">Demander un rendez-vous téléphonique</a><a href="tel:+33769390457">Portable · 07 69 39 04 57</a><a href={email}>aurelie@integraleacademy.com</a></> : <a href={email}>Écrire au sujet de cette formation</a>} /></div>
    <TrainingReferenceMobileBar href={dms ? '#dates-tarifs' : email} label={dms ? 'Voir le calendrier' : 'Me renseigner'} phoneHref={dms ? dmsAdviser.phoneHref : undefined} />
  </TrainingReferencePage>;
}
