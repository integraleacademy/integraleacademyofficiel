import type { ComponentProps } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CourseBrochureCard } from './CourseBrochureCard';
import { CourseTeamBanner } from './CourseTeamBanner';
import { IntegraleWelcomePack } from './IntegraleWelcomePack';
import { TrainingOfficialReferences } from './ApsExperienceSections';
import { SsiapManualPreview } from './SsiapDiscovery';
import { TrainingSchoolWelcome } from './TrainingCampusVisit';
import { TrainingCourseSections, TrainingReferenceContact, TrainingReferenceMobileBar } from './TrainingReferenceLayout';
import { TrainingSectionNavigation } from './TrainingSectionNavigation';
import type { SsiapInitialCourse } from '@/lib/ssiap-registration';
import { ssiapOfficialReference } from '@/data/ssiap-catalogue';
import styles from './SsiapReferencePage.module.css';
import experience from './SsiapExperience.module.css';

const navigationItems = [
  { label: 'Métier', href: '#metier' },
  { label: 'Immersion', href: '#pedagogie' },
  { label: 'Programme', href: '#programme' },
  { label: 'Examen', href: '#examen' },
  { label: 'Dates & tarifs', href: '#dates-tarifs' },
  { label: 'Inscriptions', href: '#inscription-financement' },
  { label: 'Débouchés', href: '#debouches' },
  { label: 'FAQ', href: '#faq-ssiap' },
] as const;

export function SsiapInitialNavigation({ label }: { label: string }) {
  return <TrainingSectionNavigation mark="SSIAP" title={label} items={navigationItems} registrationHref="#dates-tarifs" theme="red" />;
}

export function SsiapSkills({ skills }: { skills: readonly (readonly string[])[] }) {
  return <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{skills.map(([title, text], index) => <div key={title} className={`rounded-[1.5rem] border p-5 ${index === 0 ? 'border-red-300 bg-red-50 dark:bg-[#39252b]' : 'border-academy-line bg-[#FFFDF8] dark:bg-[#202c39]'}`}><span className="grid h-9 w-9 place-items-center rounded-full bg-[#0D1725] text-sm font-black text-red-300">{String(index + 1).padStart(2, '0')}</span><h3 className="mt-4 text-xl font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-academy-muted">{text}</p></div>)}</div>;
}

const credentials = {
  'ssiap-1': ['7845', 'Agent de service de sécurité incendie et d’assistance à personnes'],
  'ssiap-2': ['7847', 'Chef d’équipe de service de sécurité incendie et d’assistance à personnes'],
  'ssiap-3': ['7850', 'Chef de service de sécurité incendie et d’assistance à personnes'],
} as const;

type CourseSections = Omit<ComponentProps<typeof TrainingCourseSections>, 'campus' | 'brochure' | 'pack' | 'references'>;

export function SsiapInitialSections({ course, label, capacity, ...sections }: CourseSections & {
  course: SsiapInitialCourse; label: string; capacity: number;
}) {
  const [registry, name] = credentials[course];
  return <TrainingCourseSections {...sections}
    campus={<>
      <CourseTeamBanner />
      <TrainingSchoolWelcome id={`ecole-${course}`} description="Découvrez votre cadre de formation à Puget-sur-Argens." groupLabel={`Par session ${label}`} groupSize={`${capacity} maximum`}
        photos={[
          { id: 'salle-formation', src: '/images/campus/salle-formation.webp', alt: 'La salle de formation du centre Intégrale Academy à Puget-sur-Argens', caption: 'Votre salle de formation · Puget-sur-Argens' },
          { id: 'accueil', src: '/images/campus/accueil-centre.webp', alt: 'L’accueil du centre Intégrale Academy', caption: 'Un accueil, une équipe.' },
          { id: 'detente', src: '/images/campus/espace-detente.webp', alt: 'L’espace détente du centre Intégrale Academy', caption: 'Un espace pour les pauses.' },
        ]}
        extraFooter={<p className={styles.schoolCredit}>Photographies de notre centre de formation <Link href="/ecole#photos">Découvrir les autres espaces ↗</Link></p>} />
    </>}
    brochure={<CourseBrochureCard course={course} />}
    pack={<><p className={`${styles.eyebrow} page-container pt-8`}>Vos supports de formation</p>
      <IntegraleWelcomePack course={course} /><SsiapManualPreview course={course} /></>}
    references={
      <TrainingOfficialReferences id="reperes-officiels" course={course} number="07" title={<>Le diplôme {label} <em>et l’agrément du centre</em></>}
        intro="Retrouvez la fiche du diplôme, les conditions de maintien des acquis et l’agrément d’Intégrale Academy."
        certificateLabel="Diplôme de sécurité incendie" qualification={label} name={name}
        registryLabel="Répertoire spécifique · parcours 2027" registryCode={`RS${registry}`} url={`https://www.francecompetences.fr/recherche/rs/${registry}/`}
        facts={[['Certificateur', 'Ministère de l’Intérieur et des Outre-mer'], ['Début des parcours certifiants', '1er janvier 2027'], ['Échéance de l’enregistrement', '31 décembre 2027'], ['Formacode', '42811']]}
        conditionsLabel="Maintien des acquis" profession="Recyclage tous les 3 ans"
        conditions={['Le secourisme doit rester à jour.', 'Une remise à niveau peut être nécessaire selon la date d’expiration et l’activité exercée.']}
        professionNote="Notre équipe vous accompagne pour choisir la formation adaptée à votre projet."
        supplement={<a className={styles.accreditation} href="https://www.integraleacademy.com/_files/ugd/008e7b_cc8ed006f785482f9eee3f22e08c323c.pdf" target="_blank" rel="noopener noreferrer"><Image src="/images/certifications/ssiap-apercu.webp" alt="Aperçu de l’agrément SSIAP d’Intégrale Academy" width={130} height={180} /><div><p className={styles.eyebrow}>Un cadre vérifiable</p><h3>Consultez notre agrément SSIAP</h3><p>Agrément n°8323 · arrêté préfectoral n°26/099 du 29 mai 2026</p><strong>Télécharger l’agrément (PDF) ↗</strong></div></a>}
        detailsTitle="Le centre agréé et le cadre réglementaire"
        details={<><dl className={experience.credentials}>{[['Centre agréé', 'SSIAP n°8323'], ['Cadre officiel', 'Arrêté n°26/099 du 29 mai 2026'], ['Formation suivie', `${capacity} stagiaires maximum`]].map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl>
          <a href={ssiapOfficialReference} target="_blank" rel="noopener noreferrer">Consulter l’arrêté du 2 mai 2005 modifié sur Légifrance ↗</a></>} />
    } />;
}

export function SsiapInitialContact({ href, mobileLabel = 'Réserver ma place' }: { href: string; mobileLabel?: string }) {
  return <>
    <div id="contact-ssiap"><TrainingReferenceContact schoolStyle
      description="Cassandre MENARD, Responsable commerciale, vous aide à vérifier vos prérequis, choisir votre session et trouver la solution de financement adaptée."
      href={href} /></div>
    <TrainingReferenceMobileBar href="#dates-tarifs" label={mobileLabel} />
  </>;
}
