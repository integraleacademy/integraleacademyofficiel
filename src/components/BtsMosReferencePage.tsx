import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { BtsStudentBenefits } from '@/components/BtsExpandedContent';
import { BtsMosMission, BtsMosCalendar } from '@/components/BtsMosExperience';
import { CourseJourney } from '@/components/CourseJourney';
import { TeamPortrait } from '@/components/TeamPortrait';
import { TrainingSectionNavigation } from '@/components/TrainingSectionNavigation';
import { TrainingReferencePage, TrainingReferenceHero } from '@/components/TrainingReferenceLayout';
import { PremiumFAQSection } from '@/components/ui';
import { btsHeroArtwork } from '@/data/btsIllustrations';
import { btsMosArtwork } from '@/data/btsMosArtwork';
import { btsExpandedCourses } from '@/data/btsExpanded';
import { serializeCourseJsonLd } from '@/lib/seo';
import identity from './BtsIdentity.module.css';
import styles from './BtsMosExperience.module.css';

const applicationUrl = 'https://inscriptionsbts.onrender.com/';
const parcoursup = {
  campus: 'https://dossier.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=34004',
  remote: 'https://dossier.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=46600&typeBac=0',
};
const brochureUrl = 'https://57256b2f.sibforms.com/serve/MUIFAFEpeLidk8sqo9gYowYZHk-4EKC2_tLhM60baTLIu9CRfzbdr8iFEvM_A-bGvLzdCrcPvhCOkaRJ-KsO8DPTS4BwR_duqew_4BvUdjTKZNXP4-m-Hhxmr8LDnm5vKNULRUiOm4Fis816EzjRST6Utd8yRdDG-7oNjZAyVxtauUlT1bcOTVk05EmsisMk0A-yN_DR41V2tysE';
const phone = 'tel:+33487830615';
const email = 'mailto:aurelie@integraleacademy.com?subject=Mon%20projet%20BTS%20MOS';
const course = btsExpandedCourses.mos;
const navigation = [
  { label: 'Votre projet', href: '#parcours-bts-mos' },
  { label: 'Le métier', href: '#metier' },
  { label: 'Alternance', href: '#alternance' },
  { label: 'Formats', href: '#formats' },
  { label: 'Programme', href: '#programme' },
  { label: 'À l’école', href: '#experience' },
  { label: 'S’inscrire', href: '#admission' },
  { label: 'FAQ', href: '#faq-mos' },
] as const;
const generalSubjects = [
  { title: 'Culture générale et expression', items: ['Comprendre, argumenter, synthétiser et communiquer avec précision.'] },
  { title: 'Langue vivante étrangère : anglais', items: ['Communiquer dans un contexte professionnel et mobiliser le vocabulaire des situations de travail.'] },
  { title: 'Culture économique, juridique et managériale', items: ['Comprendre l’environnement économique, le droit et les décisions de management d’une organisation.'] },
];
const admissionSteps = [
  ['Je choisis comment m’inscrire', 'Je remplis le dossier de pré-inscription en ligne ou je formule mon vœu sur Parcoursup.'],
  ['L’école étudie ma candidature', 'L’équipe examine mon dossier et mon projet. Pour Parcoursup, l’étude intervient dans les 10 jours suivant la réception du vœu.'],
  ['Je complète mon inscription', 'Si je suis admis, je reçois le dossier d’inscription par e-mail. Je le complète et le retourne à l’école par courrier.'],
  ['Mon inscription est confirmée', 'Une fois le dossier complet, l’école confirme mon inscription et m’envoie par courrier ma carte étudiante et mon certificat de scolarité.'],
  ['Je prépare mon alternance', 'Je recherche une entreprise avec l’accompagnement de l’équipe et je signe mon contrat d’apprentissage. Pour la rentrée 2026, la date limite annoncée est le 15 décembre 2026.'],
  ['Je rejoins ma promotion', 'Je suis les cours à Puget-sur-Argens ou en live sur ZOOM. Je peux commencer les cours avant la signature du contrat, selon les modalités validées avec l’école.'],
];
const faq = [
  { q: 'Puis-je m’inscrire juste après le bac ?', a: 'Oui. Le BTS MOS est accessible après un baccalauréat ou un titre équivalent, sous réserve de l’étude de votre dossier. Aurélie vous accompagne pour vérifier les prérequis et préparer votre inscription.' },
  { q: 'Puis-je m’inscrire sans avoir trouvé d’entreprise ?', a: 'Oui, vous pouvez commencer par votre candidature. L’équipe vous accompagne dans la préparation de votre recherche d’entreprise et vous explique les étapes du contrat d’apprentissage.' },
  { q: 'Comment m’inscrire en BTS MOS ?', a: 'Vous avez deux possibilités : remplir notre dossier de pré-inscription en ligne ou candidater directement sur Parcoursup en choisissant la fiche présentiel ou 100 % à distance. Les candidatures sur Parcoursup suivent le calendrier de la plateforme. Pour une candidature en cours d’année, utilisez le dossier en ligne et échangez avec Aurélie.' },
  { q: 'Faut-il une carte professionnelle CNAPS pour intégrer le BTS MOS ?', a: 'Pour intégrer notre parcours BTS MOS en alternance dans la sécurité privée, vous devrez être titulaire de la carte professionnelle CNAPS correspondant aux missions de surveillance humaine et de gardiennage avant votre entrée en formation. Si vous possédez déjà cette carte en cours de validité, vous êtes dispensé de la formation APS préalable. Si vous avez obtenu le bac pro « Métiers de la sécurité », vous pouvez demander cette carte au CNAPS sans suivre de formation APS supplémentaire. Notre équipe vous accompagne pour préparer votre demande, dont la validation reste soumise au CNAPS. Si vous ne disposez ni de la carte ni d’un diplôme reconnu pour la demander, notre équipe vérifie votre situation et vous oriente vers une session APS. Lorsqu’elle est nécessaire, cette formation APS est proposée au tarif spécial futurs étudiants BTS MOS de 950 €, à la charge de l’apprenti et distinct du financement du BTS. Vous pouvez commencer votre dossier de pré-inscription pour préparer ces étapes avec nous.' },
  { q: 'Combien coûte le BTS en alternance ?', a: 'La formation est sans frais de scolarité pour l’apprenti lorsque le contrat d’alternance et sa prise en charge sont validés. Le financement s’organise avec l’entreprise et son OPCO.' },
  { q: 'Comment se déroulent les cours à distance ?', a: 'Ce sont des cours en live, 100 % à distance en visioconférence ZOOM. Vous vous connectez aux horaires prévus à l’emploi du temps et suivez les cours en direct avec vos formateurs et votre promotion. Vous pouvez poser vos questions et participer aux échanges. Les épreuves finales sont organisées en présentiel par l’Académie de Nice, dans le centre indiqué sur votre convocation.' },
  { q: 'Le diplôme est-il le même dans les deux formats ?', a: 'Oui. En présentiel comme en live à distance sur ZOOM, vous préparez le BTS Management Opérationnel de la Sécurité, diplôme national de niveau 5 enregistré au RNCP sous le numéro 41000.' },
  { q: 'Quand l’iPad est-il remis et le voyage organisé ?', a: 'L’iPad est offert dès la signature de votre contrat d’apprentissage. Le voyage à Londres a lieu en deuxième année et est intégralement pris en charge par Intégrale Academy. L’iPad et le voyage sont tous deux proposés sous réserve de signature d’un contrat d’apprentissage.' },
  { q: 'Que se passe-t-il après ma candidature ?', a: 'L’équipe étudie votre dossier ; les vœux Parcoursup sont étudiés dans les 10 jours suivant leur réception. Si vous êtes admis, vous recevez par e-mail le dossier d’inscription à compléter et à retourner par courrier. Une fois le dossier complet, votre inscription est confirmée et l’école vous envoie votre carte étudiante et votre certificat de scolarité.' },
];

function Arrow() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function Apply({ children = 'Je m’inscris', className = '', href = '#admission' }: { children?: ReactNode; className?: string; href?: string }) {
  const external = href.startsWith('https://');
  return <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className={`${styles.button} ${className}`}>{children}<Arrow /></a>;
}
function ParcoursupLogo() {
  // Official asset from the Parcoursup logo kit (parcoursup.gouv.fr).
  return <Image src="/images/parcoursup-logo.png" alt="Parcoursup" width={1000} height={150} className={styles.parcoursupLogo} />;
}
function List({ items }: { items: string[] }) {
  return <ul className={styles.list}>{items.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>;
}
function Disclosure({ title, children, id }: { title: string; children: ReactNode; id?: string }) {
  return <details id={id} className={styles.disclosure}><summary>{title}<span aria-hidden="true">+</span></summary><div className={styles.disclosureBody}>{children}</div></details>;
}
function Heading({ label, title, text }: { label: string; title: ReactNode; text?: string }) {
  return <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{label}</p><h2>{title}</h2></div>{text && <p>{text}</p>}</div>;
}

export function BtsMosReferencePage() {
  return <main data-bts="mos" className={`${identity.page} ${styles.page}`}>
    <TrainingReferencePage theme="blue">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeCourseJsonLd({
      '@context': 'https://schema.org', '@graph': [
        { '@type': 'Course', name: course.fullName, description: course.summary, educationalCredentialAwarded: 'BTS - diplôme national de niveau 5', provider: { '@type': 'EducationalOrganization', name: 'Intégrale Academy', telephone: '04 87 83 06 15', email: 'aurelie@integraleacademy.com' } },
        { '@type': 'FAQPage', mainEntity: faq.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
      ],
    }, '/bts/mos') }} />

    <TrainingReferenceHero
      id="mos" badge={`Diplôme d’État · Bac+2 · RNCP ${course.rncp}`}
      heading="BTS MOS." accent="Management opérationnel de la sécurité."
      title="Votre prochain chapitre commence ici."
      tagline="Apprenez à prendre les commandes."
      description={<><p>Organiser les missions, encadrer une équipe, accompagner un client. Construisez votre avenir dans la sécurité avec l’expérience de l’alternance.</p><p>Deux façons de s’inscrire en BTS MOS : en ligne ou sur Parcoursup.</p></>}
      illustration={btsHeroArtwork.mos} caption="Du terrain au management."
      primaryAction={{ href: applicationUrl, label: 'S’inscrire en ligne', newTab: true }}
      secondaryAction={{ href: '#contact-mos', label: 'Une question ? Parler à Aurélie' }}
      additionalAction={<a href="#candidature-parcoursup" className={styles.parcoursupButton}><span>S’inscrire sur</span><ParcoursupLogo /><Arrow /></a>}
      highlights={['Après le bac', '1 350 heures de formation', 'Puget-sur-Argens ou à distance']}
    >
      <aside className={styles.studySummary} aria-label="L’essentiel du BTS MOS">
        <div className={styles.summaryFunding}><strong>0 €<sup>*</sup></strong><span>de frais de scolarité<br />pour l’apprenti</span></div>
        <div className={styles.summaryFact}><span>La durée</span><strong>2 ans</strong><small>de formation</small></div>
        <div className={styles.summaryFact}><span>Le rythme</span><strong>Alternance</strong><small>école + entreprise</small></div>
        <div className={styles.summaryFact}><span>Votre format</span><strong>Présentiel ou 100 % en ligne</strong><small>à distance, en visioconférence</small></div>
        <div className={styles.summaryFooter}><p>* Sous réserve de la conclusion et de la prise en charge du contrat d’apprentissage.</p><a className={styles.summaryReview} href="/#avis-google">Avis Google · 4,8 / 5 <span aria-hidden="true">↗</span></a><a href="#metier">Découvrir le BTS <span aria-hidden="true">↓</span></a></div>
      </aside>
    </TrainingReferenceHero>

    <div className={styles.navigation}><TrainingSectionNavigation mark="MOS" title="BTS MOS" items={navigation} registrationHref="#admission" registrationLabel="Je m’inscris" theme="bts" ariaLabel="Sommaire du BTS MOS" /></div>

    <CourseJourney course="bts-mos" />

    <section id="metier" className={styles.section} aria-labelledby="mos-mission-title">
      <div className={styles.container}>
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>01 / Votre futur métier</p><h2 id="mos-mission-title">Un site à sécuriser.<br /><span>Une équipe à guider.</span></h2></div><p>Découvrez une mise en situation : quatre décisions qui relient le terrain, l’organisation et la relation client. À vous de faire avancer la mission.</p></div>
        <BtsMosMission />
        <div id="pour-qui" className={styles.profile}>
          <div><p className={styles.eyebrow}>Ce BTS est-il fait pour vous ?</p><h3>Le sens du terrain.<br />L’envie de manager.</h3></div>
          <div><p>Vous aimez le travail en équipe, vous êtes rigoureux et vous voulez prendre des responsabilités ? Le BTS MOS vous apprend à organiser une prestation et à faire progresser un collectif.</p><Disclosure title="Voir le profil et les qualités attendues"><List items={course.profile} /></Disclosure></div>
        </div>
        <div className={styles.careers}><p className={styles.eyebrow}>Après le diplôme</p><h3>Des responsabilités qui se construisent.</h3><p>Chef de poste, chef d’équipe, assistant d’exploitation ou coordinateur : votre évolution dépend aussi de vos missions et de votre expérience.</p><div className={styles.twoColumns}><Disclosure title="Les métiers et les perspectives d’évolution"><List items={course.jobs} /></Disclosure><Disclosure title="Poursuivre ses études après le BTS"><List items={course.furtherStudies} /></Disclosure></div></div>
      </div>
    </section>

    <section id="alternance" className={`${styles.section} ${styles.tinted}`}>
      <div className={styles.container}>
        <Heading label="02 / Votre rythme" title={<>À l’école, vous apprenez.<br /><span>En entreprise, vous pratiquez.</span></>} text="Deux années pour préparer votre diplôme et développer votre expérience professionnelle. Un rythme qui vous laisse le temps de vous investir dans chaque environnement." />
        <BtsMosCalendar />
        <div className={styles.fundingGrid}>
          <div className={styles.alternanceBenefits}><p className={styles.eyebrow}>Un diplôme, une expérience, un salaire</p><h3>Vous apprenez un métier.<br />Vous prenez votre place.</h3><List items={['Un BTS reconnu par l’État, de niveau Bac+2.', 'Une expérience professionnelle construite pendant deux ans.', 'Une rémunération dans le cadre de votre contrat d’apprentissage.']} /><p>Vous alternez les cours avec des missions concrètes au sein de votre entreprise d’accueil.</p></div>
          <div className={styles.fundingCard}><p className={styles.eyebrow}>Côté budget</p><p className={styles.fundingAmount}>0 €<sup>*</sup></p><h3>de frais de scolarité pour l’apprenti.</h3><p>La formation BTS est prise en charge dans le cadre du contrat d’apprentissage et de l’accord de l’entreprise avec son OPCO.</p><a href="#contact-mos" className={styles.textLink}>Poser ma question à Aurélie <Arrow /></a><p className={styles.small}>* Sous réserve de la conclusion et de la prise en charge du contrat. La formation APS préalable, si nécessaire, est distincte du BTS : tarif spécial futurs étudiants BTS MOS de 950 €, à la charge de l’apprenti.</p></div>
        </div>
        <div className={styles.practicalGrid}>
          <div><p className={styles.eyebrow}>Votre recherche d’entreprise</p><h3>Vous avancez avec notre équipe.</h3><p>Préparer votre candidature, comprendre le contrat et les étapes jusqu’à sa signature : l’équipe admissions vous guide dans vos démarches.</p><a className={styles.textLink} href="#admission">Voir les étapes d’admission <Arrow /></a></div>
          <div>
            <Disclosure title="Puis-je candidater sans avoir d’entreprise ?"><p>Oui, commencez par votre candidature. L’équipe vérifie votre situation et vous accompagne dans la préparation de votre recherche. Pour la rentrée 2026, vous pouvez commencer les cours et finaliser ensuite votre contrat selon les modalités validées avec l’école ; la date limite annoncée est le 15 décembre 2026.</p></Disclosure>
            <Disclosure title="Quelles missions et quelles entreprises d’accueil ?"><p>Les missions sont adaptées à l’activité de l’entreprise et à votre progression.</p><h4>Les missions possibles</h4><List items={course.missions} /><h4>Les structures d’accueil</h4><List items={course.employers} /></Disclosure>
          </div>
        </div>
        <div className={styles.applicationBanner}><div><p className={styles.eyebrow}>Votre candidature</p><h3>Votre projet se précise ?</h3><p>Dossier en ligne ou Parcoursup : choisissez votre façon de vous inscrire.</p></div><Apply>Je m’inscris en BTS MOS</Apply></div>
      </div>
    </section>

    <section id="formats" className={styles.section}>
      <div className={styles.container}>
        <Heading label="03 / Votre façon d’étudier" title={<>En présentiel ou 100 % en ligne.<br /><span>Toujours avec votre promotion.</span></>} text="Deux parcours distincts : vous choisissez soit les cours à l’école, soit les cours 100 % en ligne, à distance en visioconférence. Notre équipe vous aide à choisir celui qui correspond à votre quotidien." />
        <div className={styles.formats}>
          <article className={styles.formatCard}>
            <div className={styles.formatPhoto}><Image src="/images/campus/salle-formation.webp" alt="Une salle de cours d’Intégrale Academy à Puget-sur-Argens" width={1600} height={1066} sizes="(max-width: 850px) 94vw, 43vw" /><span className={styles.formatBadge}>À l’école</span></div>
            <div className={styles.formatCopy}>
              <p className={styles.eyebrow}>Campus de Puget-sur-Argens</p><h3>Votre promotion.<br />Votre école, au quotidien.</h3>
              <p>Retrouvez vos formateurs et les autres étudiants sur place, dans les salles et les espaces de l’école.</p>
              <List items={['Des cours et des échanges en face à face.', 'Des équipements pour les mises en situation.', 'La vie de promotion et une équipe sur place.']} />
              <div className={styles.formatActions}><Apply>Choisir le présentiel</Apply><Link href="/ecole#campus" className={styles.textLink}>Voir le campus <Arrow /></Link></div>
            </div>
          </article>
          <div className={styles.formatOr} aria-label="ou : choisissez l’un des deux parcours"><span>OU</span></div>
          <article className={`${styles.formatCard} ${styles.remoteFormat}`}>
            <div className={styles.formatPhoto}><Image src={btsMosArtwork.remote.src} alt={btsMosArtwork.remote.alt} width={1536} height={1024} sizes="(max-width: 850px) 94vw, 43vw" /><span className={`${styles.formatBadge} ${styles.zoomBadge}`}><i aria-hidden="true" />En ligne, à distance</span></div>
            <div className={styles.formatCopy}>
              <p className={styles.eyebrow}>Intégrale Academy Paris · Online</p><h3>Vos cours en live.<br />100 % à distance.</h3>
              <p>Connectez-vous en visioconférence ZOOM : votre formateur anime le cours en direct, avec toute votre promotion.</p>
              <List items={['Les mêmes cours, aux horaires de l’emploi du temps.', 'Vos questions et vos échanges en temps réel.', 'Vos devoirs déposés en ligne, corrigés par les enseignants.']} />
              <div className={styles.formatActions}><Apply>Choisir le parcours à distance</Apply></div>
            </div>
          </article>
        </div>
        <div className={styles.formatCommon}>
          <div><span>Le diplôme</span><strong>Le même BTS MOS.</strong><p>Un diplôme d’État Bac+2, préparé en deux ans.</p></div>
          <div><span>Le rythme</span><strong>15 jours / 15 jours.</strong><p>15 jours de cours, sur place ou sur ZOOM, puis 15 jours en entreprise.</p></div>
          <div><span>Les examens</span><strong>En présentiel.</strong><p>Les épreuves finales ont lieu en fin de deuxième année, dans le centre indiqué sur votre convocation de l’Académie de Nice.</p></div>
        </div>
      </div>
    </section>

    <section id="programme" className={`${styles.section} ${styles.program}`}>
      <div id="guide-complet" className={styles.container}>
        <Heading label="04 / Le programme complet" title={<>Comprendre. Organiser.<br /><span>Manager.</span></>} text="1 350 heures sur deux ans. Quatre blocs professionnels, des enseignements généraux et des situations issues de votre alternance." />
        <div className={styles.programGrid}>
          <div><p className={styles.programLabel}>Les 4 blocs professionnels</p><div className={styles.programRows}>{course.competencyBlocks.map((block, index) => <details key={block.title} className={styles.programRow} open={index === 0}><summary><span className={styles.blockNumber}>0{index + 1}</span><strong>{block.title}</strong><span className={styles.plus} aria-hidden="true">+</span></summary><div className={styles.programBody}><List items={block.items} /></div></details>)}</div></div>
          <aside className={styles.generalSubjects}><p className={styles.programLabel}>Les enseignements généraux</p>{generalSubjects.map(subject => <Disclosure key={subject.title} title={subject.title}><List items={subject.items} /></Disclosure>)}<a href={course.rncpUrl} target="_blank" rel="noopener noreferrer" className={styles.textLink}>Fiche officielle RNCP {course.rncp} <Arrow /></a></aside>
        </div>
        <a className={styles.textLink} href={brochureUrl} target="_blank" rel="noopener noreferrer">Recevoir le dossier de présentation du BTS MOS <Arrow /></a>
        <Disclosure title="Les objectifs de la formation"><List items={course.objective} /></Disclosure>
        <Disclosure id="examens" title="Les épreuves, les coefficients et la validation du diplôme"><p>{course.examLocation} Les épreuves se tiennent en fin de deuxième année, généralement entre avril et juin. Vous devrez vous rendre dans le centre indiqué sur la convocation de l’Éducation nationale, y compris si vous suivez les cours à distance.</p><div className={styles.examTable}><table><caption>Épreuves du BTS Management Opérationnel de la Sécurité</caption><thead><tr><th scope="col">Épreuve</th><th scope="col">Coefficient</th><th scope="col">Épreuve ponctuelle · format et durée</th></tr></thead><tbody>{course.examUnits.map(unit => <tr key={unit.title}><th scope="row">{unit.title}</th><td>{unit.coefficient}</td><td>{unit.format}</td></tr>)}</tbody></table></div><p>La forme exacte, contrôle en cours de formation ou épreuve ponctuelle, dépend du statut du candidat et de l’habilitation du CFA. L’équipe pédagogique confirme les modalités applicables à votre promotion.</p></Disclosure>
      </div>
    </section>

    <section id="experience" className={styles.section}>
      <div className={styles.container}>
        <Heading label="05 / Votre vie à l’école" title={<>Votre BTS MOS,<br /><span>avec l’iPad et Londres.</span></>} text="iPad offert dès la signature du contrat d’apprentissage. Londres en 2ᵉ année · 100 % pris en charge. Ces deux avantages sont proposés sous réserve de signature d’un contrat d’apprentissage." />
      </div>
      <BtsStudentBenefits courseName="BTS MOS" variant="illustrated" artwork={{ ipad: btsMosArtwork.ipad, london: btsMosArtwork.london }} />
      <div className={styles.container}>
        <div className={styles.schoolResources}><div><p className={styles.eyebrow}>Apprendre par la pratique</p><h3>Des situations de métier.<br />Des équipements pour s’entraîner.</h3><p>{course.campusEquipment?.intro}</p><Disclosure title="Découvrir les équipements pédagogiques"><List items={course.campusEquipment?.items ?? []} /></Disclosure></div><figure><Image src={btsMosArtwork.equipment.src} alt={btsMosArtwork.equipment.alt} width={1536} height={1024} sizes="(max-width: 800px) 94vw, 45vw" /><figcaption>Préparer une mission en équipe.</figcaption></figure></div>
      </div>
    </section>

    <section id="admission" className={`${styles.section} ${styles.admission}`}>
      <div className={styles.container}>
        <Heading label="06 / Candidature et admission" title={<>Votre inscription en BTS MOS.<br /><span>Deux possibilités.</span></>} text="Remplissez votre dossier de pré-inscription en ligne ou candidatez directement sur Parcoursup. L’équipe vous accompagne ensuite jusqu’à l’inscription et au contrat d’apprentissage." />
        <div className={styles.enrollmentSupport}><div><p className={styles.eyebrow}>Inscription & financement</p><h3>Nous vous accompagnons de A à Z.</h3><p>Du choix de votre parcours à votre rentrée, Aurélie vous guide dans vos démarches.</p></div><a href="#contact-mos" className={styles.button}>Préparer mon projet avec Aurélie <Arrow /></a></div>
        <div className={styles.applicationChoices}>
          <article className={styles.applicationCard}><p className={styles.eyebrow}>Option 01 · Auprès de l’école</p><h3>Votre dossier<br />de pré-inscription en ligne.</h3><p>Présentez votre parcours et votre projet directement à Intégrale Academy. Vous pouvez candidater avant d’avoir trouvé votre entreprise.</p><Apply href={applicationUrl}>S’inscrire en ligne</Apply><p className={styles.small}>L’équipe admissions vous accompagne pour la suite.</p></article>
          <article id="candidature-parcoursup" className={`${styles.applicationCard} ${styles.parcoursupCard}`}><p className={styles.eyebrow}>Option 02 · Sur Parcoursup</p><ParcoursupLogo /><h3>Choisissez votre format<br />et formulez votre vœu.</h3><div className={styles.parcoursupLinks}><a href={parcoursup.campus} target="_blank" rel="noopener noreferrer"><span><strong>BTS MOS en présentiel</strong><small>Intégrale Academy · Puget-sur-Argens</small></span><Arrow /></a><a href={parcoursup.remote} target="_blank" rel="noopener noreferrer"><span><strong>BTS MOS 100 % à distance</strong><small>Intégrale Academy Paris · Cours en live sur ZOOM</small></span><Arrow /></a></div><p className={styles.small}>Selon le calendrier Parcoursup. Pour une candidature en cours d’année, utilisez le dossier en ligne ou contactez Aurélie.</p></article>
        </div>
        <div className={styles.admissionIntro}><p className={styles.eyebrow}>Et ensuite ?</p><h3>De votre candidature à votre rentrée.</h3></div>
        <ol className={styles.admissionSteps}>{admissionSteps.map(([title, text], i) => <li key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
        <Disclosure title="Les conditions d’admission et d’alternance"><p>Le BTS est accessible après un baccalauréat ou un titre équivalent, sous réserve de l’étude de votre dossier.</p><List items={course.admission} /><a className={styles.textLink} href="#carte-professionnelle">Comprendre les démarches de carte professionnelle <Arrow /></a></Disclosure>
        <section id="carte-professionnelle" className={styles.cnapsPanel} aria-labelledby="cnaps-title">
          <div className={styles.cnapsHeading}>
            <div>
              <p className={styles.eyebrow}>À préparer avec votre inscription</p>
              <h3 id="cnaps-title">La carte professionnelle.<br /><span>Une étape à préparer ensemble.</span></h3>
              <p className={styles.cnapsIntro}>{course.specificPanel?.body}</p>
            </div>
            <div className={styles.cnapsVisual} aria-hidden="true">
              <div className={styles.cnapsCardArt}>
                <div className={styles.cnapsCardTop}><span>Sécurité privée</span><svg width="42" height="46" viewBox="0 0 42 46" fill="none"><path d="M21 3 37 9v12c0 10-7 17-16 22C12 38 5 31 5 21V9L21 3Z" stroke="currentColor" strokeWidth="1.8" /><path d="m13 22 5 5 11-12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                <strong>Carte<br />professionnelle</strong>
                <div className={styles.cnapsCardBottom}><span>Surveillance humaine<br />&amp; gardiennage</span><span>CNAPS</span></div>
              </div>
              <span className={styles.cnapsVisualCaption}>Votre accès aux missions de sécurité privée</span>
            </div>
          </div>
          <div className={styles.cnapsContent}>
            <div className={styles.cnapsCases}>
              <article className={styles.cnapsDiploma}>
                <div>
                  <div className={styles.cnapsCaseLabel}><span className={styles.cnapsCaseIcon} aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="m2 8 10-5 10 5-10 5L2 8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M6 10v6c3 3 9 3 12 0v-6M22 8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span><p className={styles.eyebrow}>Bac pro « Métiers de la sécurité »</p></div>
                  <h4>Votre bac pro ouvre l’accès<br />à la carte professionnelle.</h4>
                </div>
                <p>Une fois votre bac pro « Métiers de la sécurité » obtenu, vous pourrez demander la carte professionnelle « surveillance humaine et gardiennage » au CNAPS, <strong>sans suivre de formation APS supplémentaire.</strong> Notre équipe vous accompagne pour déposer votre demande. La carte vous sera délivrée après validation de votre dossier par le CNAPS.</p>
              </article>
              <article className={styles.cnapsReady}>
                <div className={styles.cnapsCaseLabel}><span className={styles.cnapsCaseIcon} aria-hidden="true">✓</span><p className={styles.eyebrow}>Vous avez déjà votre carte</p></div>
                <h4>Vous êtes dispensé<br />de la formation APS.</h4>
                <p>Vous êtes dispensé de la formation APS si votre carte professionnelle « surveillance humaine et gardiennage » est en cours de validité. Notre équipe vérifiera avec vous les activités autorisées et sa date d’expiration.</p>
              </article>
              <article className={styles.cnapsPrepare}>
                <div className={styles.cnapsCaseLabel}><span className={styles.cnapsCaseIcon}><Arrow /></span><p className={styles.eyebrow}>Vous avez besoin de la formation APS</p></div>
                <h4>Nous préparons<br />votre parcours APS.</h4>
                <p>Si vous n’avez ni carte valide ni diplôme reconnu pour la demander, notre équipe vérifie votre situation et vous oriente vers la formation Agent de prévention et de sécurité (TFP APS). Contactez-nous dès votre pré-inscription pour préparer les démarches et choisir une session.</p>
              </article>
            </div>
            <div className={styles.cnapsJourney}>
              <div className={styles.cnapsJourneyHeading}><p className={styles.eyebrow}>Si une formation APS est nécessaire</p><h4>Trois étapes, avec notre équipe.</h4></div>
              <ol className={styles.cnapsSteps}>{course.specificPanel?.items.map((item, index) => {
                const separator = item.indexOf(' : ');
                const description = item.slice(separator + 3);
                return <li key={item}><span className={styles.cnapsStepNumber} aria-hidden="true">0{index + 1}</span><div><h5>{item.slice(0, separator)}</h5><p>{description.charAt(0).toUpperCase() + description.slice(1)}</p></div></li>;
              })}</ol>
            </div>
            <div className={styles.cnapsFooter}>
              <div><p className={styles.eyebrow}>Tarif spécial futurs étudiants BTS MOS</p><p className={styles.cnapsPrice}>950 € <span>pour la formation APS</span></p><p>Ce tarif concerne uniquement les étudiants ayant besoin de la formation APS. Elle est à la charge de l’apprenti, en complément du BTS en alternance. Notre équipe vous communiquera les prochaines sessions disponibles.</p></div>
              <div className={styles.cnapsActions}><Link className={styles.button} href="/formations-securite/aps">Découvrir la formation APS <Arrow /></Link><a className={styles.textLink} href="#contact-mos">Préparer mes démarches avec Aurélie <Arrow /></a></div>
            </div>
            <p className={styles.cnapsNote}>L’autorisation préalable permet d’entrer en formation APS ; elle ne permet pas d’exercer une activité de sécurité privée en entreprise. La délivrance de la carte professionnelle reste soumise à l’examen de votre dossier par le CNAPS. <a href="https://www.cnaps.interieur.gouv.fr/Demarches-en-ligne/Vous-etes-un-particulier/Se-former-aux-metiers-de-la-securite-privee/Se-former-aux-metiers-de-la-securite-privee" target="_blank" rel="noopener noreferrer">Consulter les démarches officielles.</a></p>
          </div>
        </section>
        <div id="contact-mos" className={styles.adviser}>
          <div className={styles.adviserCopy}><p className={styles.eyebrow}>Un interlocuteur pour vous et votre famille</p><h2>Vos questions ont<br /><span>un visage.</span></h2><p>Votre projet, le choix du format, la candidature ou le contrat : Aurélie vous aide à comprendre la suite, avant toute décision définitive.</p><div className={styles.parentTrust}><span>Diplôme d’État</span><span>Suivi pédagogique</span><span>Équipe identifiée</span></div><Apply>Déposer ma candidature</Apply></div>
          <div className={styles.adviserCard}>
            <div className={styles.adviserIdentity}><TeamPortrait person="aurelie" size={180} alt="Memoji d’Aurélie BAYARD-CHAUSSEZ, responsable des BTS" className={styles.portrait} sizes="(max-width: 600px) 120px, 160px" /><div><p className={styles.eyebrow}>Votre contact BTS</p><h3>Aurélie <span>BAYARD-CHAUSSEZ</span></h3><p>Chargée des relations clients<br />Responsable des BTS</p></div></div>
            <div className={styles.contactLinks}><a href={phone}>04 87 83 06 15 <span>Ligne directe <Arrow /></span></a><a href="tel:+33769390457">07 69 39 04 57 <span>Portable <Arrow /></span></a><a href={email}>aurelie@integraleacademy.com <Arrow /></a><a href="https://wa.me/33744304527" target="_blank" rel="noopener noreferrer">Échanger sur WhatsApp <Arrow /></a></div>
            <a href={email} className={`${styles.button} ${styles.secondaryButton}`}>Écrire à Aurélie <Arrow /></a><p className={styles.small}>Un premier échange gratuit et sans engagement.</p>
          </div>
        </div>
      </div>
    </section>

    <div id="faq-mos" className={styles.faq}>
      <PremiumFAQSection theme="bts" badge="FAQ BTS MOS" title="Tout comprendre avant de vous lancer" description="Admission, alternance, entreprise, visioconférence, coût ou diplôme : Aurélie répond à vos questions et à celles de votre famille." items={faq} contactHref={email} contactLabel="Écrire à Aurélie" callHref={phone} callLabel="Appeler Aurélie" />
    </div>
    <div className={styles.mobileActions}><a href={phone}>Appeler Aurélie</a><Apply>Je m’inscris</Apply></div>
    </TrainingReferencePage>
  </main>;
}
