import Image from 'next/image';
import Link from 'next/link';
import { CourseJourney } from './CourseJourney';
import { FaqDirectoryLink } from './FaqDirectoryLink';
import { ManualArtwork } from './ManualArtwork';
import { TrainingAdmission, TrainingExamExperience } from './ApsExperienceSections';
import { SsiapPracticeQuestion } from './SsiapDiscovery';
import { SsiapProgramExplorer } from './SsiapExperienceInteractions';
import { SsiapInitialContact, SsiapInitialNavigation, SsiapInitialSections, SsiapSkills } from './SsiapInitialSections';
import { SsiapLeadershipGallery } from './SsiapLeadershipGallery';
import { SsiapTestimonials } from './SsiapTestimonials';
import { TrainingDatesPricingSection, type TrainingDatesPricingSession } from './TrainingDatesPricingSection';
import { TrainingEnrollmentSection } from './TrainingEnrollmentSection';
import { TrainingHeroSessionCard } from './TrainingHero';
import { TrainingMissionCards } from './TrainingMissionCards';
import { TrainingProgramDownload } from './TrainingProgramDownload';
import { TrainingReferenceAction, TrainingReferenceHero, TrainingReferencePage, TrainingReferenceSection as Section } from './TrainingReferenceLayout';
import { ssiapLeadershipArtwork } from '@/data/manualIllustrations';
import { ssiapCourseVisuals, type SsiapLeadershipLevel } from '@/data/ssiapCourseVisuals';
import { ssiapOfficialReference, type SsiapCourseConfig } from '@/data/ssiap-catalogue';
import { serializeCourseJsonLd } from '@/lib/seo';
import { ssiapRegistrationHref } from '@/lib/ssiap-registration';
import shared from './ApsExperience.module.css';
import reference from './ApsReferencePage.module.css';
import experience from './SsiapExperience.module.css';
import styles from './SsiapReferencePage.module.css';

const skills = {
  'ssiap-2': [
    ['Briefing', 'Répartir les postes et vérifier que chacun a compris sa mission.'],
    ['Management', 'Accompagner les agents et intervenir en cas de désaccord dans l’équipe.'],
    ['Pédagogie', 'Préparer une séquence de formation et vérifier les acquis des agents.'],
    ['Poste de sécurité', 'Interpréter les informations du système de sécurité incendie.'],
    ['Coordination', 'Organiser l’intervention des agents et accueillir les services de secours.'],
    ['Compte rendu', 'Consigner les faits et transmettre à la hiérarchie les actions réalisées.'],
  ],
  'ssiap-3': [
    ['Lecture de plans', 'Repérer les accès, les dégagements et les équipements sur un plan.'],
    ['Analyse des risques', 'Identifier les risques d’un projet et argumenter les mesures proposées.'],
    ['Conseil', 'Présenter au chef d’établissement les choix techniques et réglementaires.'],
    ['Commissions', 'Préparer les documents de sécurité et suivre les observations de la commission.'],
    ['Management', 'Organiser le service et coordonner le travail des chefs d’équipe.'],
    ['Budget', 'Chiffrer les besoins et programmer les dépenses de maintenance.'],
  ],
};

type Props = {
  level: SsiapLeadershipLevel;
  config: SsiapCourseConfig;
  sessions: TrainingDatesPricingSession[];
  relatedCourses: { label: string; role: string; href: string }[];
};

export function SsiapLeadershipPage({ level, config, sessions, relatedCourses }: Props) {
  const team = level === 'ssiap-2';
  const { label, role, duration, durationDetail, capacity, certification, prerequisites, program, assessment } = config;
  const visuals = ssiapCourseVisuals[level];
  const seats = team ? 12 : 10;
  const price = config.priceLabel ?? 'Sur devis';
  const next = sessions[0];
  const path = `/formations-securite/${level}`;
  const contact = (subject: string) => `/contact?formation=${level}&objet=${encodeURIComponent(subject)}#choix-ssiap`;
  const registration = (session?: TrainingDatesPricingSession) => session ? ssiapRegistrationHref(session, undefined, level) : contact('prochaines dates');
  const programArt = team
    ? [visuals.missions[0], visuals.missions[1], visuals.pedagogy.illustration, visuals.scenes[1].illustration]
    : [visuals.scenes[3].illustration, visuals.pedagogy.illustration, visuals.missions[1], visuals.missions[2], visuals.scenes[0].illustration, visuals.assessment.illustration, visuals.scenes[1].illustration, visuals.scenes[2].illustration];
  const admissionSteps = [
    { title: 'Échange avec un conseiller', description: <a href="tel:0422470768">Appeler le 04 22 47 07 68 →</a> },
    { title: team ? 'Justificatifs SSIAP 1 et expérience' : 'Vérification de la voie d’accès', description: <a href="#admission">Consulter les prérequis →</a> },
    { title: 'Vérification du secourisme', description: 'Préparez votre attestation en cours de validité.' },
    { title: 'Dossier et financement', description: 'Demandez un devis pour votre dossier.' },
    { title: 'Confirmation de l’inscription', description: 'L’équipe vous confirme votre entrée en formation.' },
  ];

  return <TrainingReferencePage theme="red" className={styles.ssiapCourse}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeCourseJsonLd({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'Course', name: `Formation ${label} – ${role}`, description: config.seo.description, provider: { '@type': 'Organization', name: 'Intégrale Academy', telephone: '04 22 47 07 68' } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: '/' }, { '@type': 'ListItem', position: 2, name: 'Formations sécurité', item: '/formations-securite' }, { '@type': 'ListItem', position: 3, name: label, item: path }] },
    ] }, path) }} />
    <TrainingReferenceHero id={level} badge={`${label} · Formation réglementée`} heading={team ? 'Devenez chef d’équipe' : 'Pilotez un service'} accent="de sécurité incendie"
      title={`Formation ${role.toLocaleLowerCase('fr-FR')}`} tagline={team ? 'Encadrez votre équipe sur le terrain' : 'Pilotez la sécurité de votre établissement'}
      description={<p>{config.intro}</p>} illustration={ssiapLeadershipArtwork[level]} caption={team ? 'Encadrer, coordonner et transmettre' : 'Analyser, conseiller et diriger'}
      primaryAction={{ href: '#dates-tarifs', label: next ? 'Voir les prochaines dates →' : 'Recevoir les prochaines dates →' }}>
      <TrainingHeroSessionCard session={next} theme="red" capacity={seats} defaultPrice={price} assistantKey={level} registrationHref={registration(next)} approval="Agrément SSIAP n°8323"
        facts={[{ label: 'Certification', value: certification, details: [role] }, { label: 'Durée et format', value: duration, details: [durationDetail, '100 % présentiel'] }, { label: 'Effectif', value: capacity, details: ['Apprentissage sur le terrain'] }]} />
    </TrainingReferenceHero>
    <SsiapInitialNavigation label={label} />
    <CourseJourney course={level}>
      <Section id="metier" label="01 — Le métier" title={<span id="missions">{team ? <>Encadrer les agents, <em>coordonner l’équipe</em></> : <>Diriger le service, <em>conseiller l’établissement</em></>}</span>} intro={config.intro}>
        <TrainingMissionCards items={config.missions.map((mission, i) => ({ title: mission.title, description: mission.text, illustration: visuals.missions[i], landscapeFocus: '50% 42%', body: <a className="mt-3 inline-block text-sm font-bold underline underline-offset-4" href="#programme">Découvrir ce que vous apprendrez ↗</a> }))} />
        <article className={`${reference.liftCard} mt-8 grid gap-5 rounded-[2rem] border border-academy-line bg-white p-6 lg:grid-cols-[.7fr_1.3fr] lg:p-8`}>
          <div><p className={styles.eyebrow}>À qui s’adresse la formation ?</p><h3 className="mt-3 text-3xl font-black">{team ? 'De l’agent au chef d’équipe' : 'Prendre la direction d’un service'}</h3></div>
          <div><p className="leading-7">{config.audience}</p><a className={styles.textLink} href="#admission">Vérifier mes conditions d’accès ↗</a></div>
        </article>
      </Section>
    </CourseJourney>
    <SsiapInitialSections course={level} label={label} capacity={seats}
      admission={<Section id="admission" label="02 — Admission" title={`Votre dossier est-il prêt pour le ${label} ?`} tone="stone" intro="Chaque justificatif est contrôlé pour vous orienter vers le bon parcours et sécuriser votre entrée en formation.">
        <TrainingAdmission course={level} action={contact('verification des prérequis')} actionLabel="Vérifier mes prérequis"
          points={prerequisites.map(item => ({ title: item.title, content: <p>{item.text}</p> }))}
          lead={<><h3>Les prérequis,<br /><em>expliqués simplement</em></h3><p className={shared.admissionSupport}><strong>{team ? 'Qualification, expérience, secourisme et aptitude médicale' : 'Deux voies d’accès et un secourisme à jour'}</strong></p></>}
          note="Vous ne savez pas si vos justificatifs sont suffisants ? L’équipe vérifie votre situation avant tout engagement."
          steps={<>Échange avec un conseiller <span>→</span> Vérification du dossier <span>→</span> Confirmation de l’inscription</>}
          afterPoints={<div className={styles.admissionLinks}>{team && <a href="/documents/certificat-medical-ssiap.pdf" target="_blank" rel="noopener noreferrer">Télécharger le certificat médical (PDF) ↗</a>}<a href="#dates-tarifs">Consulter les dates et le tarif →</a></div>} />
      </Section>}
      immersion={<>
        <Section id="competences" label="03 — Compétences" title="Ce que vous saurez faire sur le terrain"><SsiapSkills skills={skills[level]} /></Section>
        <Section id="pedagogie" label="05 — Immersion & pédagogie" title={<>Comprendre en cours.<br /><em>Apprendre en pratiquant</em></>} tone="dark" intro={visuals.galleryIntro}>
          <SsiapLeadershipGallery level={level} />
          <div className={styles.fieldLesson}><div><p className="text-xs font-bold uppercase tracking-widest text-red-300">Pédagogie terrain</p><h3>{visuals.pedagogy.title}</h3><p>{visuals.pedagogy.text}</p>
            <ul>{visuals.pedagogy.activities.map((item, i) => <li key={item}><span>{String(i + 1).padStart(2, '0')}</span>{item}</li>)}</ul></div>
            <figure><ManualArtwork illustration={visuals.pedagogy.illustration} /><figcaption className="mt-3 text-sm text-white/75">{team ? 'Transmettre les consignes, expliquer et accompagner les agents.' : 'Étudier un bâtiment pour préparer les décisions de sécurité.'}</figcaption></figure>
          </div>
          <div id="mise-en-situation" className={styles.practicePanel}><SsiapPracticeQuestion course={level} />
            <div className={styles.trainer}><div><p className={styles.eyebrow}>La pratique accompagnée</p><h3>Un formateur à vos côtés</h3><p>{capacity} pour travailler sur vos mises en situation et recevoir un retour du formateur.</p></div><Link href="/ecole#equipe" className={styles.textLink}>Rencontrer les personnes qui vous accompagnent ↗</Link></div>
          </div>
        </Section>
      </>}
      program={<Section id="programme" label="04 — Programme" title={<>{duration} pour maîtriser <em>votre fonction</em></>} intro={durationDetail}>
        <TrainingProgramDownload href={`/documents/programme-${level}.pdf`} course={label} theme="red" className="mb-6 w-full sm:w-auto" />
        <SsiapProgramExplorer course={level} label={label} hours={duration.split(' ')[0]} menuTitle={team ? 'Les quatre parties' : 'Les huit parties'}
          progression={team ? 'De l’encadrement à la coordination en situation de crise.' : 'De l’analyse des bâtiments à la direction du service.'} scenes={programArt}
          parts={program.map((item, i) => [String(i + 1).padStart(2, '0'), item.title, item.duration, item.text])} />
        <a className={`${styles.textLink} mt-5`} href={ssiapOfficialReference} target="_blank" rel="noopener noreferrer">Consulter le texte sur Légifrance ↗</a>
      </Section>}
      exam={<Section id="examen" label="06 — Examen" title={<span id="validation">Un examen officiel, <em>préparé sans zone d’ombre</em></span>} tone="dark" intro="La formation alterne apports réglementaires, exercices, cas concrets et préparation aux modalités de validation.">
        <TrainingExamExperience metric={String(assessment.length)} label="Épreuves à valider" description={team ? 'Un écrit, un oral et une épreuve pratique en présentiel' : 'Deux écrits et un entretien devant jury'}
          theory={<><p className={shared.kicker}>01 · {assessment[0].title}</p><h3>QCM <span>40 questions</span></h3><p>{assessment[0].text}</p>
            <p className={shared.examNote}><strong>02 · {assessment[1].title}</strong><br />{assessment[1].text}</p></>}
          practice={<><Image {...visuals.assessment.illustration} width={1536} height={1024} sizes="(max-width: 800px) 92vw, 740px" /><div><p className={shared.kicker}>03 · {assessment[2].title}</p><h3>{visuals.assessment.title}</h3><p>{assessment[2].text}</p></div></>}
          validation={<><div><p className={shared.kicker}>Votre préparation</p><p>{visuals.assessment.text}</p></div><strong>{label}<small>{certification}</small></strong></>} />
      </Section>}
      dates={<TrainingDatesPricingSection compact eyebrow="08 — Dates & tarifs" theme="red" sessions={sessions} defaultPrice={price} seatCapacity={seats}
        showDeliveryPeriods deliveryMode="in-person" inPersonPeriodFallback={`${duration} en présentiel, hors examen et déplacements`}
        priceDescription={`${label} · ${duration} · formation en présentiel`} defaultLocation="Puget-sur-Argens"
        intro={next ? 'Consultez les dates de formation et d’examen, puis choisissez votre session. Notre équipe vérifie votre dossier avant de confirmer l’inscription.' : 'Demandez le prochain calendrier et votre devis à notre équipe.'}
        registrationHref={registration} priceAction={{ href: contact('devis'), label: 'Demander un devis →' }} emptyAction={{ href: registration(), label: 'Recevoir les prochaines dates →' }} />}
      enrollment={<TrainingEnrollmentSection number="09" title="Du premier appel à votre entrée en formation." intro={<strong>Cinq étapes, un dossier maîtrisé</strong>}
        steps={admissionSteps}
        registration={{ href: '#dates-tarifs', label: 'Commencer mon inscription →' }} fundingTitle="Simulez votre reste à charge" fundingNote="Votre conseiller étudie avec vous les aides possibles au regard de votre situation et de la session choisie."
        funding={{ href: contact(`financement ${label}`), label: 'Étudier mon financement →' }} options={[
          ['CPF', 'Selon éligibilité, vérifiez l’offre disponible avec notre équipe.'], ['France Travail', 'Votre conseiller étudie votre demande de prise en charge.'], ['Employeur ou OPCO', 'Un devis permet à votre employeur d’étudier votre projet.'], ['Financement personnel', 'L’équipe vous précise les modalités de règlement.'],
        ]} />}
      outcomes={<Section id="debouches" label="10 — Débouchés & emploi" tone="paper" title={<>Travaillez, évoluez, <em>maintenez vos compétences</em></>} intro="Votre parcours vous prépare aux responsabilités correspondant à votre niveau SSIAP.">
        <div className="grid items-start gap-5 lg:grid-cols-2"><article className="rounded-[2rem] border border-academy-line bg-white p-6"><p className={styles.eyebrow}>Après le {label}</p><h3 className="mt-3 text-3xl font-black">Les postes accessibles</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">{config.outcomes.map((item, i) => <li key={item} className={reference.jobCard}><span className={reference.jobIcon} aria-hidden="true">{['◎', '◇', '⇄', '▤'][i]}</span><strong className="text-sm">{item}</strong></li>)}</ul></article>
          <article className={experience.career}><p className="text-xs font-bold uppercase tracking-widest text-red-300">Évolution</p><h3 className="mt-3 text-3xl font-black">{config.nextStep.title}</h3><p>{config.nextStep.text}</p><TrainingReferenceAction href={config.nextStep.href} outline>{config.nextStep.label} →</TrainingReferenceAction></article></div>
        <article className={shared.workplaces}><div><p className={styles.eyebrow}>Tout l’univers SSIAP</p><h3>Les autres parcours</h3></div><ul>{relatedCourses.map(item => <li key={item.href}><Link href={item.href}>{item.label} · {item.role} ↗</Link></li>)}</ul></article>
      </Section>} />
    <SsiapTestimonials category={label} />
    <div id="faq-ssiap"><FaqDirectoryLink embedded theme="red" /></div>
    <SsiapInitialContact href={contact('rendez-vous téléphonique avec Cassandre')} mobileLabel={next ? 'Réserver ma place' : 'Recevoir les dates'} />
  </TrainingReferencePage>;
}
