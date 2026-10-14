import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { BtsStudentBenefits } from '@/components/BtsExpandedContent';
import { BtsMosMission, BtsMosCalendar } from '@/components/BtsMosExperience';
import { TeamPortrait } from '@/components/TeamPortrait';
import { TrainingSectionNavigation } from '@/components/TrainingSectionNavigation';
import { TrainingWelcomePack } from '@/components/TrainingWelcomePack';
import { btsHeroArtwork } from '@/data/btsIllustrations';
import { btsExpandedCourses } from '@/data/btsExpanded';
import { serializeCourseJsonLd } from '@/lib/seo';
import identity from './BtsIdentity.module.css';
import styles from './BtsMosExperience.module.css';

const applicationUrl = 'https://inscriptionsbts.onrender.com/';
const phone = 'tel:+33487830615';
const email = 'mailto:aurelie@integraleacademy.com?subject=Mon%20projet%20BTS%20MOS';
const course = btsExpandedCourses.mos;
const navigation = [
  { label: 'Le métier', href: '#metier' },
  { label: 'Alternance', href: '#alternance' },
  { label: 'Formats', href: '#formats' },
  { label: 'Programme', href: '#programme' },
  { label: 'À l’école', href: '#experience' },
  { label: 'Admissions', href: '#admission' },
  { label: 'FAQ', href: '#faq-mos' },
] as const;
const generalSubjects = [
  { title: 'Culture générale et expression', items: ['Comprendre, argumenter, synthétiser et communiquer avec précision.'] },
  { title: 'Langue vivante étrangère', items: ['Communiquer dans un contexte professionnel et mobiliser le vocabulaire des situations de travail.'] },
  { title: 'Culture économique, juridique et managériale', items: ['Comprendre l’environnement économique, le droit et les décisions de management d’une organisation.'] },
];
const admissionSteps = [
  ['Je candidate', 'Je complète mon dossier de pré-inscription en ligne.'],
  ['Mon dossier est étudié', 'L’équipe vérifie mon projet, mon niveau et mes prérequis.'],
  ['Je suis admis', 'Je reçois les informations pour finaliser mon inscription.'],
  ['Je cherche mon entreprise', 'Je prépare ma recherche et mon contrat d’apprentissage.'],
  ['Je fais ma rentrée', 'Je rejoins ma promotion à l’école ou en visioconférence.'],
];
const faq = [
  { q: 'Combien coûte le BTS en alternance ?', a: 'La formation est sans frais de scolarité pour l’apprenti lorsque le contrat d’alternance et sa prise en charge sont validés. Le financement s’organise avec l’entreprise et son OPCO.' },
  { q: 'En visioconférence, les cours sont-ils en direct ?', a: 'Oui. Vous retrouvez les formateurs et votre promotion en classe virtuelle, avec des échanges et un suivi régulier. Les modalités sont validées avec l’équipe admissions. Les épreuves finales nécessitant une convocation se déroulent en présentiel selon les indications de l’académie.' },
  { q: 'Le diplôme est-il le même dans les deux formats ?', a: 'Oui. En présentiel comme en classe virtuelle, vous préparez le BTS Management Opérationnel de la Sécurité, diplôme national de niveau 5 enregistré au RNCP sous le numéro 41000.' },
  { q: 'Quand l’iPad est-il remis et le voyage organisé ?', a: 'L’iPad est offert dès la signature de votre contrat d’apprentissage. Le voyage à Londres a lieu en deuxième année et est intégralement pris en charge par Intégrale Academy pour les étudiants de la promotion.' },
  { q: 'Comment suivre ma candidature ?', a: 'Après votre dossier de pré-inscription en ligne, l’équipe admissions vérifie votre projet et vous communique les informations utiles pour la suite. Aurélie répond à vos questions au 04 87 83 06 15 ou à aurelie@integraleacademy.com.' },
];

function Arrow() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function Apply({ children = 'Je candidate', className = '' }: { children?: ReactNode; className?: string }) {
  return <a href={applicationUrl} target="_blank" rel="noopener noreferrer" className={`${styles.button} ${className}`}>{children}<Arrow /></a>;
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
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeCourseJsonLd({
      '@context': 'https://schema.org', '@graph': [
        { '@type': 'Course', name: course.fullName, description: course.summary, educationalCredentialAwarded: 'BTS - diplôme national de niveau 5', provider: { '@type': 'EducationalOrganization', name: 'Intégrale Academy', telephone: '04 87 83 06 15', email: 'aurelie@integraleacademy.com' } },
        { '@type': 'FAQPage', mainEntity: faq.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
      ],
    }, '/bts/mos') }} />

    <section className={styles.hero} aria-labelledby="mos-title">
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Diplôme d’État · Bac+2 · RNCP {course.rncp}</p>
            <h1 id="mos-title"><span>BTS MOS</span>Management opérationnel<br className={styles.desktopBreak} /> de la sécurité.</h1>
            <p className={styles.heroPromise}>Apprenez à <strong>prendre les commandes.</strong></p>
            <p className={styles.intro}>Organiser les missions, encadrer une équipe, accompagner un client. Construisez votre avenir dans la sécurité avec l’expérience de l’alternance.</p>
            <ul className={styles.heroFacts} aria-label="L’essentiel du BTS MOS"><li><strong>2 ans</strong>de formation</li><li><strong>Alternance</strong>école + entreprise</li><li><strong>Présentiel ou visio</strong>cours en direct</li></ul>
            <div className={styles.actions}><Apply>Je candidate pour 2026</Apply><a href="#contact-mos" className={styles.textLink}>Parler à Aurélie <Arrow /></a></div>
            <p className={styles.heroNote}>Sans frais de scolarité pour l’apprenti, sous réserve de la conclusion et de la prise en charge du contrat.</p>
          </div>
          <figure className={styles.heroVisual}>
            <div className={styles.heroImage}><Image src={btsHeroArtwork.mos.src} alt={btsHeroArtwork.mos.alt} width={1536} height={1024} priority sizes="(max-width: 850px) 94vw, 48vw" /></div>
            <figcaption><span className={styles.visualNumber}>01</span><div><strong>Du terrain au management.</strong><span>Votre prochain chapitre commence ici.</span></div><span className={styles.visualArrow} aria-hidden="true">↗</span></figcaption>
          </figure>
        </div>
        <div className={styles.heroBottom}><span>Après le bac</span><span>1 350 heures de formation</span><span>Puget-sur-Argens ou à distance</span><a href="#metier">Découvrir le BTS <span aria-hidden="true">↓</span></a></div>
      </div>
    </section>

    <div className={styles.navigation}><TrainingSectionNavigation mark="MOS" title="BTS MOS" items={navigation} registrationHref={applicationUrl} registrationLabel="Je candidate" theme="bts" externalRegistration ariaLabel="Sommaire du BTS MOS" /></div>

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
        <div className={styles.practicalGrid}>
          <div><p className={styles.eyebrow}>Votre recherche d’entreprise</p><h3>Vous avancez avec l’équipe.</h3><p>Préparer votre candidature, comprendre le contrat et les étapes jusqu’à sa signature : l’équipe admissions vous guide dans vos démarches.</p><a className={styles.textLink} href="#admission">Voir les étapes d’admission <Arrow /></a></div>
          <div>
            <Disclosure title="Puis-je candidater sans avoir d’entreprise ?"><p>Oui, commencez par votre candidature. L’équipe vérifie votre situation et vous accompagne dans la préparation de votre recherche. Pour la rentrée 2026, vous pouvez commencer les cours et finaliser ensuite votre contrat selon les modalités validées avec l’école ; la date limite annoncée est le 15 décembre 2026.</p></Disclosure>
            <Disclosure title="Je n’ai pas encore ma carte professionnelle CNAPS"><p>{course.specificPanel?.body}</p><List items={course.specificPanel?.items ?? []} /><Link className={styles.textLink} href="/formations-securite/aps">Découvrir la formation APS <Arrow /></Link></Disclosure>
            <Disclosure title="Quelles missions et quelles entreprises d’accueil ?"><p>Les missions sont adaptées à l’activité de l’entreprise et à votre progression.</p><h4>Les missions possibles</h4><List items={course.missions} /><h4>Les structures d’accueil</h4><List items={course.employers} /></Disclosure>
          </div>
        </div>
      </div>
    </section>

    <section id="formats" className={styles.section}>
      <div className={styles.container}>
        <Heading label="03 / Votre façon d’étudier" title={<>Une promotion.<br /><span>Deux façons de la rejoindre.</span></>} text="Le même diplôme, le même programme et une équipe à vos côtés. Choisissez votre organisation avec l’équipe admissions." />
        <div className={styles.formats}>
          <article className={styles.campusFormat}><div className={styles.formatPhoto}><Image src="/images/campus/campus-accueil.jpg" alt="L’accueil d’Intégrale Academy à Puget-sur-Argens" width={1600} height={1200} sizes="(max-width: 700px) 94vw, 45vw" /></div><div className={styles.formatCopy}><p className={styles.eyebrow}>En présentiel</p><h3>Rendez-vous à Puget-sur-Argens.</h3><p>Retrouvez votre promotion, échangez avec les formateurs et profitez des équipements de l’école.</p><span>Cours en groupe · Équipe sur place · Vie de promotion</span><Link href="/ecole#campus" className={styles.textLink}>Découvrir l’école <Arrow /></Link></div></article>
          <article className={styles.remoteFormat}><div className={styles.liveVisual} aria-hidden="true"><span className={styles.liveBadge}>Cours en direct</span><div className={styles.liveWindow}><div className={styles.liveTop}><i /><i /><i /><span>Votre classe virtuelle</span></div><div className={styles.liveLesson}><span>Management des équipes</span><strong>Une question ?<br />Échangez avec votre formateur.</strong><div><span>Vous</span><span>Votre promotion</span><span>Votre formateur</span></div></div></div></div><div className={styles.formatCopy}><p className={styles.eyebrow}>En visioconférence</p><h3>La classe vient à vous.</h3><p>Suivez de vrais cours en direct, posez vos questions et travaillez avec votre promotion, depuis chez vous.</p><span>Cours interactifs · Suivi régulier · Partout en France</span><p className={styles.small}>Les épreuves finales nécessitant une convocation se déroulent en présentiel, selon les indications de l’académie.</p></div></article>
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
        <Disclosure title="Les objectifs de la formation"><List items={course.objective} /></Disclosure>
        <Disclosure id="examens" title="Les épreuves, les coefficients et la validation du diplôme"><p>{course.examLocation}</p><div className={styles.examTable}><table><caption>Épreuves du BTS Management Opérationnel de la Sécurité</caption><thead><tr><th scope="col">Épreuve</th><th scope="col">Coefficient</th><th scope="col">Format principal</th></tr></thead><tbody>{course.examUnits.map(unit => <tr key={unit.title}><th scope="row">{unit.title}</th><td>{unit.coefficient}</td><td>{unit.format}</td></tr>)}</tbody></table></div><p>La forme exacte, contrôle en cours de formation ou épreuve ponctuelle, dépend du statut du candidat et de l’habilitation du CFA. L’équipe pédagogique confirme les modalités applicables à votre promotion.</p></Disclosure>
      </div>
    </section>

    <section id="experience" className={`${styles.section} ${styles.experience}`}>
      <div className={styles.container}>
        <Heading label="05 / Votre vie à l’école" title={<>Les bons outils.<br /><span>Des expériences à partager.</span></>} text="Le projet de formation prend aussi vie dans les échanges, les ateliers et les moments passés avec votre promotion." />
        <div className={styles.benefitPreview}><span>iPad offert dès la signature</span><span>Londres en 2ᵉ année · 100 % pris en charge</span></div>
      </div>
      <BtsStudentBenefits courseName="BTS MOS" />
      <div className={styles.container}>
        <div className={styles.schoolResources}><div><p className={styles.eyebrow}>Apprendre par la pratique</p><h3>Des situations de métier.<br />Des équipements pour s’entraîner.</h3><p>{course.campusEquipment?.intro}</p><Disclosure title="Découvrir les équipements pédagogiques"><List items={course.campusEquipment?.items ?? []} /></Disclosure></div><figure><Image src="/images/bts/manuel/mos.webp" alt="Illustration pédagogique : une responsable prépare les missions avec son équipe au poste de sécurité" width={1536} height={1024} sizes="(max-width: 800px) 94vw, 45vw" /><figcaption>Illustration pédagogique · Préparer une mission en équipe.</figcaption></figure></div>
        <details className={styles.welcomePack}><summary><span><small>Dès votre premier jour</small><strong>Votre Pack Intégrale vous attend.</strong><span>Supports de cours BTS MOS, carnet, stylo et Ecocup.</span></span><span className={styles.packToggle}>Découvrir le pack <span aria-hidden="true">+</span></span></summary><TrainingWelcomePack course="bts-mos" /></details>
      </div>
    </section>

    <section id="admission" className={`${styles.section} ${styles.admission}`}>
      <div className={styles.container}>
        <Heading label="06 / Admissions 2026" title={<>Votre prochain chapitre.<br /><span>On le prépare ensemble.</span></>} text="Commencez par votre candidature. L’équipe étudie votre projet et vous guide vers les prochaines étapes." />
        <ol className={styles.admissionSteps}>{admissionSteps.map(([title, text], i) => <li key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
        <Disclosure title="Les conditions d’admission et d’alternance"><p>Le BTS est accessible après un baccalauréat ou un titre équivalent, sous réserve de l’étude de votre dossier.</p><List items={course.admission} /></Disclosure>
        <div id="contact-mos" className={styles.adviser}>
          <div className={styles.adviserCopy}><p className={styles.eyebrow}>Un interlocuteur pour vous et votre famille</p><h2>Vos questions ont<br /><span>un visage.</span></h2><p>Votre projet, le choix du format, la candidature ou le contrat : Aurélie vous aide à comprendre la suite, avant toute décision définitive.</p><div className={styles.parentTrust}><span>Diplôme d’État</span><span>Suivi pédagogique</span><span>Équipe identifiée</span></div><Apply>Déposer ma candidature</Apply></div>
          <div className={styles.adviserCard}>
            <div className={styles.adviserIdentity}><TeamPortrait person="aurelie" size={180} alt="Memoji d’Aurélie Chaussez, responsable des BTS" className={styles.portrait} sizes="(max-width: 600px) 120px, 160px" /><div><p className={styles.eyebrow}>Votre contact BTS</p><h3>Aurélie Chaussez</h3><p>Chargée des relations clients<br />Responsable des BTS</p></div></div>
            <div className={styles.contactLinks}><a href={phone}>04 87 83 06 15 <span>Ligne directe <Arrow /></span></a><a href="tel:+33769390457">07 69 39 04 57 <span>Portable <Arrow /></span></a><a href={email}>aurelie@integraleacademy.com <Arrow /></a></div>
            <a href={email} className={`${styles.button} ${styles.secondaryButton}`}>Écrire à Aurélie <Arrow /></a><p className={styles.small}>Un premier échange gratuit et sans engagement.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="faq-mos" className={`${styles.section} ${styles.faq}`}><div className={styles.container}><Heading label="07 / Les réponses utiles" title={<>Avant de vous lancer.</>} text="Les derniers repères pour préparer votre candidature sereinement." /><div className={styles.faqList}>{faq.map(item => <Disclosure key={item.q} title={item.q}><p>{item.a}</p></Disclosure>)}</div></div></section>
    <div className={styles.mobileActions}><a href={phone}>Appeler Aurélie</a><Apply>Je candidate</Apply></div>
  </main>;
}
