import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { BtsStudentBenefits } from '@/components/BtsExpandedContent';
import { BtsMosMission, BtsMosCalendar } from '@/components/BtsMosExperience';
import { CourseJourney } from '@/components/CourseJourney';
import { TeamPortrait } from '@/components/TeamPortrait';
import { TrainingSectionNavigation } from '@/components/TrainingSectionNavigation';
import { PremiumFAQSection } from '@/components/ui';
import { btsHeroArtwork } from '@/data/btsIllustrations';
import { btsExpandedCourses } from '@/data/btsExpanded';
import { serializeCourseJsonLd } from '@/lib/seo';
import identity from './BtsIdentity.module.css';
import styles from './BtsMosExperience.module.css';

const applicationUrl = 'https://inscriptionsbts.onrender.com/';
const parcoursup = {
  campus: 'https://dossier.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=34004',
  remote: 'https://dossier.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=46600&typeBac=0',
};
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
  { label: 'Candidater', href: '#admission' },
  { label: 'FAQ', href: '#faq-mos' },
] as const;
const generalSubjects = [
  { title: 'Culture générale et expression', items: ['Comprendre, argumenter, synthétiser et communiquer avec précision.'] },
  { title: 'Langue vivante étrangère', items: ['Communiquer dans un contexte professionnel et mobiliser le vocabulaire des situations de travail.'] },
  { title: 'Culture économique, juridique et managériale', items: ['Comprendre l’environnement économique, le droit et les décisions de management d’une organisation.'] },
];
const admissionSteps = [
  ['Je choisis comment candidater', 'Je remplis le dossier de pré-inscription en ligne ou je formule mon vœu sur Parcoursup.'],
  ['L’école étudie ma candidature', 'L’équipe examine mon dossier et mon projet. Pour Parcoursup, l’étude intervient dans les 10 jours suivant la réception du vœu.'],
  ['Je complète mon inscription', 'Si je suis admis, je reçois le dossier d’inscription par e-mail. Je le complète et le retourne à l’école par courrier.'],
  ['Mon inscription est confirmée', 'Une fois le dossier complet, l’école confirme mon inscription et m’envoie par courrier ma carte étudiante et mon certificat de scolarité.'],
  ['Je prépare mon alternance', 'Je recherche une entreprise avec l’accompagnement de l’équipe et je signe mon contrat d’apprentissage. Pour la rentrée 2026, la date limite annoncée est le 15 décembre 2026.'],
  ['Je rejoins ma promotion', 'Je suis les cours à Puget-sur-Argens ou en live sur ZOOM. Je peux commencer les cours avant la signature du contrat, selon les modalités validées avec l’école.'],
];
const faq = [
  { q: 'Puis-je candidater juste après le bac ?', a: 'Oui. Le BTS MOS est accessible après un baccalauréat ou un titre équivalent, sous réserve de l’étude de votre dossier. Aurélie vous accompagne pour vérifier les prérequis et préparer votre inscription.' },
  { q: 'Puis-je m’inscrire sans avoir trouvé d’entreprise ?', a: 'Oui, vous pouvez commencer par votre candidature. L’équipe vous accompagne dans la préparation de votre recherche d’entreprise et vous explique les étapes du contrat d’apprentissage.' },
  { q: 'Comment candidater au BTS MOS ?', a: 'Vous avez deux possibilités : remplir notre dossier de pré-inscription en ligne ou candidater directement sur Parcoursup en choisissant la fiche présentiel ou 100 % à distance. Les candidatures sur Parcoursup suivent le calendrier de la plateforme. Pour une candidature en cours d’année, utilisez le dossier en ligne et échangez avec Aurélie.' },
  { q: 'Combien coûte le BTS en alternance ?', a: 'La formation est sans frais de scolarité pour l’apprenti lorsque le contrat d’alternance et sa prise en charge sont validés. Le financement s’organise avec l’entreprise et son OPCO.' },
  { q: 'Comment se déroulent les cours à distance ?', a: 'Ce sont des cours en live, 100 % à distance en visioconférence ZOOM. Vous vous connectez aux horaires prévus à l’emploi du temps et suivez les cours en direct avec vos formateurs et votre promotion. Vous pouvez poser vos questions et participer aux échanges. Les épreuves finales se déroulent en présentiel selon votre convocation.' },
  { q: 'Le diplôme est-il le même dans les deux formats ?', a: 'Oui. En présentiel comme en live à distance sur ZOOM, vous préparez le BTS Management Opérationnel de la Sécurité, diplôme national de niveau 5 enregistré au RNCP sous le numéro 41000.' },
  { q: 'Quand l’iPad est-il remis et le voyage organisé ?', a: 'L’iPad est offert dès la signature de votre contrat d’apprentissage. Le voyage à Londres a lieu en deuxième année et est intégralement pris en charge par Intégrale Academy pour les étudiants de la promotion.' },
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
            <p className={styles.applicationPrompt}>Deux façons de candidater au BTS MOS</p>
            <div className={styles.actions}><Apply href={applicationUrl}>Candidater en ligne</Apply><a href="#candidature-parcoursup" className={styles.parcoursupButton}><span>Candidater sur</span><ParcoursupLogo /><Arrow /></a></div>
            <div className={styles.heroFunding}><strong>0 €<sup>*</sup></strong><span>de frais de scolarité<br />pour l’apprenti</span></div>
            <ul className={styles.heroFacts} aria-label="L’essentiel du BTS MOS"><li><strong>2 ans</strong>de formation</li><li><strong>Alternance</strong>école + entreprise</li><li><strong>Présentiel ou ZOOM</strong>cours en live</li></ul>
            <p className={styles.heroNote}>* Sous réserve de la conclusion et de la prise en charge du contrat d’apprentissage.</p>
            <a href="#contact-mos" className={styles.textLink}>Une question ? Parler à Aurélie <Arrow /></a>
          </div>
          <figure className={styles.heroVisual}>
            <div className={styles.heroImage}><Image src={btsHeroArtwork.mos.src} alt={btsHeroArtwork.mos.alt} width={1536} height={1024} priority sizes="(max-width: 850px) 94vw, 48vw" /></div>
            <figcaption><span className={styles.visualNumber}>01</span><div><strong>Du terrain au management.</strong><span>Votre prochain chapitre commence ici.</span></div><span className={styles.visualArrow} aria-hidden="true">↗</span></figcaption>
          </figure>
        </div>
        <div className={styles.heroBottom}><span>Après le bac</span><span>1 350 heures de formation</span><span>Puget-sur-Argens ou à distance</span><a href="#metier">Découvrir le BTS <span aria-hidden="true">↓</span></a></div>
      </div>
    </section>

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
          <div className={styles.fundingCard}><p className={styles.eyebrow}>Côté budget</p><p className={styles.fundingAmount}>0 €<sup>*</sup></p><h3>de frais de scolarité pour l’apprenti.</h3><p>La formation BTS est prise en charge dans le cadre du contrat d’apprentissage et de l’accord de l’entreprise avec son OPCO.</p><a href="#contact-mos" className={styles.textLink}>Poser ma question à Aurélie <Arrow /></a><p className={styles.small}>* Sous réserve de la conclusion et de la prise en charge du contrat. La formation APS préalable, si nécessaire, est distincte du BTS : ses modalités sont à vérifier avec l’équipe.</p></div>
        </div>
        <div className={styles.practicalGrid}>
          <div><p className={styles.eyebrow}>Votre recherche d’entreprise</p><h3>Vous avancez avec l’équipe.</h3><p>Préparer votre candidature, comprendre le contrat et les étapes jusqu’à sa signature : l’équipe admissions vous guide dans vos démarches.</p><a className={styles.textLink} href="#admission">Voir les étapes d’admission <Arrow /></a></div>
          <div>
            <Disclosure title="Puis-je candidater sans avoir d’entreprise ?"><p>Oui, commencez par votre candidature. L’équipe vérifie votre situation et vous accompagne dans la préparation de votre recherche. Pour la rentrée 2026, vous pouvez commencer les cours et finaliser ensuite votre contrat selon les modalités validées avec l’école ; la date limite annoncée est le 15 décembre 2026.</p></Disclosure>
            <Disclosure title="Je n’ai pas encore ma carte professionnelle CNAPS"><p>{course.specificPanel?.body}</p><List items={course.specificPanel?.items ?? []} /><Link className={styles.textLink} href="/formations-securite/aps">Découvrir la formation APS <Arrow /></Link></Disclosure>
            <Disclosure title="Quelles missions et quelles entreprises d’accueil ?"><p>Les missions sont adaptées à l’activité de l’entreprise et à votre progression.</p><h4>Les missions possibles</h4><List items={course.missions} /><h4>Les structures d’accueil</h4><List items={course.employers} /></Disclosure>
          </div>
        </div>
        <div className={styles.applicationBanner}><div><p className={styles.eyebrow}>Votre candidature</p><h3>Votre projet se précise ?</h3><p>Dossier en ligne ou Parcoursup : choisissez votre façon de candidater.</p></div><Apply>Je m’inscris en BTS MOS</Apply></div>
      </div>
    </section>

    <section id="formats" className={styles.section}>
      <div className={styles.container}>
        <Heading label="03 / Votre façon d’étudier" title={<>À l’école ou sur ZOOM.<br /><span>Toujours avec votre promotion.</span></>} text="Le même BTS, deux façons de suivre les cours. Choisissez le format qui correspond à votre quotidien avec l’équipe admissions." />
        <div className={styles.formats}>
          <article className={styles.formatCard}>
            <div className={styles.formatPhoto}><Image src="/images/campus/salle-formation.webp" alt="Une salle de cours d’Intégrale Academy à Puget-sur-Argens" width={1600} height={1066} sizes="(max-width: 700px) 94vw, 46vw" /><span className={styles.formatBadge}>À l’école</span></div>
            <div className={styles.formatCopy}>
              <p className={styles.eyebrow}>Campus de Puget-sur-Argens</p><h3>Votre promotion.<br />Votre école, au quotidien.</h3>
              <p>Retrouvez vos formateurs et les autres étudiants sur place, dans les salles et les espaces de l’école.</p>
              <List items={['Des cours et des échanges en face à face.', 'Des équipements pour les mises en situation.', 'La vie de promotion et une équipe sur place.']} />
              <div className={styles.formatActions}><Apply>Choisir le présentiel</Apply><Link href="/ecole#campus" className={styles.textLink}>Voir le campus <Arrow /></Link></div>
            </div>
          </article>
          <article className={`${styles.formatCard} ${styles.remoteFormat}`}>
            <div className={styles.formatPhoto}><Image src="/images/bts/experience/cours-zoom.webp" alt="Illustration : une étudiante participe depuis chez elle à un cours en visioconférence avec son formateur et sa promotion" width={1200} height={800} sizes="(max-width: 700px) 94vw, 46vw" /><span className={`${styles.formatBadge} ${styles.zoomBadge}`}><i aria-hidden="true" />En live sur ZOOM</span></div>
            <div className={styles.formatCopy}>
              <p className={styles.eyebrow}>Intégrale Academy Paris · Online</p><h3>Vos cours en live.<br />100 % à distance.</h3>
              <p>Connectez-vous en visioconférence ZOOM : votre formateur anime le cours en direct, avec toute votre promotion.</p>
              <List items={['Les mêmes cours, aux horaires de l’emploi du temps.', 'Vos questions et vos échanges en temps réel.', 'Vos devoirs déposés en ligne, corrigés par les enseignants.']} />
              <div className={styles.formatActions}><Apply>Choisir les cours sur ZOOM</Apply></div>
            </div>
          </article>
        </div>
        <div className={styles.formatCommon}>
          <div><span>Le diplôme</span><strong>Le même BTS MOS.</strong><p>Un diplôme d’État Bac+2, préparé en deux ans.</p></div>
          <div><span>Le rythme</span><strong>15 jours / 15 jours.</strong><p>15 jours de cours, sur place ou sur ZOOM, puis 15 jours en entreprise.</p></div>
          <div><span>Les examens</span><strong>En présentiel.</strong><p>Les épreuves finales ont lieu en fin de deuxième année, dans le centre indiqué sur votre convocation.</p></div>
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

    <section id="experience" className={styles.section}>
      <div className={styles.container}>
        <Heading label="05 / Votre vie à l’école" title={<>Votre BTS MOS,<br /><span>avec l’iPad et Londres.</span></>} text="iPad offert dès la signature du contrat d’apprentissage. Londres en 2ᵉ année · 100 % pris en charge. Deux avantages inclus pour votre promotion." />
      </div>
      <BtsStudentBenefits courseName="BTS MOS" variant="illustrated" />
      <div className={styles.container}>
        <div className={styles.schoolResources}><div><p className={styles.eyebrow}>Apprendre par la pratique</p><h3>Des situations de métier.<br />Des équipements pour s’entraîner.</h3><p>{course.campusEquipment?.intro}</p><Disclosure title="Découvrir les équipements pédagogiques"><List items={course.campusEquipment?.items ?? []} /></Disclosure></div><figure><Image src="/images/bts/manuel/mos.webp" alt="Illustration pédagogique : une responsable prépare les missions avec son équipe au poste de sécurité" width={1536} height={1024} sizes="(max-width: 800px) 94vw, 45vw" /><figcaption>Illustration pédagogique · Préparer une mission en équipe.</figcaption></figure></div>
      </div>
    </section>

    <section id="admission" className={`${styles.section} ${styles.admission}`}>
      <div className={styles.container}>
        <Heading label="06 / Candidature et admission" title={<>Candidatez au BTS MOS.<br /><span>Deux possibilités.</span></>} text="Remplissez votre dossier de pré-inscription en ligne ou candidatez directement sur Parcoursup. L’équipe vous accompagne ensuite jusqu’à l’inscription et au contrat d’apprentissage." />
        <div className={styles.applicationChoices}>
          <article className={styles.applicationCard}><p className={styles.eyebrow}>Option 01 · Auprès de l’école</p><h3>Votre dossier<br />de pré-inscription en ligne.</h3><p>Présentez votre parcours et votre projet directement à Intégrale Academy. Vous pouvez candidater avant d’avoir trouvé votre entreprise.</p><Apply href={applicationUrl}>Candidater en ligne</Apply><p className={styles.small}>L’équipe admissions vous accompagne pour la suite.</p></article>
          <article id="candidature-parcoursup" className={`${styles.applicationCard} ${styles.parcoursupCard}`}><p className={styles.eyebrow}>Option 02 · Sur Parcoursup</p><ParcoursupLogo /><h3>Choisissez votre format<br />et formulez votre vœu.</h3><div className={styles.parcoursupLinks}><a href={parcoursup.campus} target="_blank" rel="noopener noreferrer"><span><strong>BTS MOS en présentiel</strong><small>Intégrale Academy · Puget-sur-Argens</small></span><Arrow /></a><a href={parcoursup.remote} target="_blank" rel="noopener noreferrer"><span><strong>BTS MOS 100 % à distance</strong><small>Intégrale Academy Paris · Cours en live sur ZOOM</small></span><Arrow /></a></div><p className={styles.small}>Selon le calendrier Parcoursup. Pour une candidature en cours d’année, utilisez le dossier en ligne ou contactez Aurélie.</p></article>
        </div>
        <div className={styles.admissionIntro}><p className={styles.eyebrow}>Et ensuite ?</p><h3>De votre candidature à votre rentrée.</h3></div>
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

    <div id="faq-mos" className={styles.faq}>
      <PremiumFAQSection theme="bts" badge="FAQ BTS MOS" title="Tout comprendre avant de vous lancer" description="Admission, alternance, entreprise, visioconférence, coût ou diplôme : Aurélie répond à vos questions et à celles de votre famille." items={faq} contactHref={email} contactLabel="Écrire à Aurélie" callHref={phone} callLabel="Appeler Aurélie" />
    </div>
    <div className={styles.mobileActions}><a href={phone}>Appeler Aurélie</a><Apply>Je m’inscris</Apply></div>
  </main>;
}
