import { SsiapInitialNavigation, SsiapInitialSections, SsiapInitialContact, SsiapSkills } from './SsiapInitialSections';
import { CourseJourney } from '@/components/CourseJourney';
import { SsiapExamExperience } from './SsiapExperienceSections';
import { SsiapProgramExplorer } from './SsiapExperienceInteractions';
import { TrainingProgramDownload } from '@/components/TrainingProgramDownload';
import experience from './SsiapExperience.module.css';
import { serializeCourseJsonLd } from '@/lib/seo';
import Link from 'next/link';
import { TrainingHeroSessionCard } from '@/components/TrainingHero';
import { TrainingReferencePage, TrainingReferenceHero, TrainingReferenceSection as Section } from './TrainingReferenceLayout';
import { TrainingMissionCards } from './TrainingMissionCards';
import { TrainingAdmission } from './ApsExperienceSections';
import { TrainingFundingOptions } from './TrainingFundingOptions';
import reference from './ApsReferencePage.module.css';
import editorial from './ApsEditorial.module.css';
import shared from './ApsExperience.module.css';
import type { ReactNode } from 'react';
import { MissionAnimation } from '@/components/MissionAnimation';
import { FaqDirectoryLink } from '@/components/FaqDirectoryLink';
import { SsiapBooking } from './SsiapBooking';
import { SsiapPracticeQuestion } from './SsiapDiscovery';
import { SsiapTestimonials } from './SsiapTestimonials';
import { ssiapRegistrationHref, ssiapSessionFormula } from '@/lib/ssiap-registration';
import styles from './SsiapReferencePage.module.css';
import { TrainingMotionGallery } from '@/components/TrainingMotionGallery';
import { ManualArtwork } from '@/components/ManualArtwork';
import { ssiapArtwork, ssiapPracticeArtwork } from '@/data/manualIllustrations';
import { originalArtwork } from '@/data/originalArtwork';
import { ssiapEditorialArtwork } from '@/data/siteIllustrations';

const contactHref = (subject = 'inscription') => `/contact?formation=ssiap-1&objet=${encodeURIComponent(subject)}`;

const missions = [
  ['01', 'Prévenir les risques', 'Repérer les situations dangereuses et veiller au respect des règles de sécurité incendie.'],
  ['02', 'Surveiller les installations', 'Contrôler les équipements, réaliser les rondes et exploiter le poste de sécurité.'],
  ['03', 'Intervenir et assister', 'Traiter une alarme, intervenir sur un départ de feu et accueillir les secours.'],
];

const audiences = ['Personnes en reconversion', 'Agents de sécurité', 'Demandeurs d’emploi', 'Salariés d’ERP ou d’IGH', 'Candidats à un service incendie', 'Professionnels souhaitant se spécialiser'];

const skills = [
  ['Prévention', 'Comprendre le feu, sa propagation et les principes de sécurité des ERP et IGH.'],
  ['Rondes', 'Identifier les anomalies, effectuer une levée de doute et renseigner la main courante.'],
  ['Poste de sécurité', 'Exploiter les tableaux de signalisation et le système de sécurité incendie.'],
  ['Intervention', 'Utiliser les moyens d’extinction, alerter et accueillir les secours.'],
  ['Assistance', 'Participer à l’évacuation et porter assistance aux personnes.'],
  ['Communication', 'Transmettre des consignes claires et sensibiliser les occupants.'],
];

const prerequisites = [
  ['Secourisme à jour', 'PSC ou PSC 1 de moins de 2 ans, ou SST / PSE 1 en cours de validité.'],
  ['Aptitude médicale', 'Certificat médical réglementaire datant de moins de 3 mois à l’entrée en formation.'],
  ['Expression écrite', 'Capacité à retranscrire des anomalies sur une main courante.'],
  ['Français professionnel', 'Compréhension suffisante pour suivre la formation et passer les épreuves.'],
];

const enrollment = ['Échange avec un conseiller', 'Vérification du secourisme', 'Test de rédaction', 'Dossier médical et financement', 'Confirmation de l’inscription'];

const program = [
  ['01', 'Le feu et ses conséquences', '6 h', 'Triangle et classes de feu, fumées, propagation, réaction et résistance au feu, moyens d’extinction.'],
  ['02', 'Sécurité incendie', '17 h', 'Classement des ERP et IGH, évacuation, dégagements, cloisonnement, désenfumage et moyens de secours.'],
  ['03', 'Installations techniques', '9 h', 'Installations électriques, ascenseurs, extinction automatique, colonnes et système de sécurité incendie.'],
  ['04', 'Rôle et missions du SSIAP 1', '18 h', 'Organisation du service, poste de sécurité, rondes, levée de doute, main courante et accueil des secours.'],
  ['05', 'Concrétisation des acquis', '17 h', 'Visites applicatives, lecture de plans, rondes avec anomalies, sinistre, évacuation et intervention.'],
];

const examSteps = [
  ['01', 'Épreuve théorique', 'QCM de 30 questions en 30 minutes. La note minimale attendue est de 12/20.'],
  ['02', 'Épreuve pratique', 'Ronde avec anomalies, découverte d’un sinistre et renseignement de la main courante.'],
  ['03', 'Validation', 'La réussite exige la moyenne au QCM et la mention « apte » à l’épreuve pratique.'],
];

const jobs = ['Agent SSIAP 1', 'Agent de sécurité incendie', 'Équipier de sécurité incendie', 'Opérateur de poste de sécurité incendie'];
const workplaces = ['Centres commerciaux', 'Hôpitaux', 'Hôtels', 'Immeubles de grande hauteur', 'Musées et cinémas', 'Gares et sites administratifs'];



function CTA({ href, children, variant = 'red', className = '' }: { href: string; children: ReactNode; variant?: 'dark' | 'red' | 'light' | 'outline'; className?: string }) {
  const styles = {
    dark: 'bg-academy-ink text-white hover:bg-black',
    red: 'bg-red-600 text-white hover:bg-red-700',
    light: 'border border-academy-line bg-white dark:bg-[#202c39] text-academy-ink hover:bg-academy-bg',
    outline: 'border border-white/30 bg-white/5 text-white hover:bg-white/12',
  };
  return <Link href={href} className={`inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-center text-sm font-black transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-red-300/55 ${styles[variant]} ${className}`}>{children}</Link>;
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-[.66rem] font-black uppercase tracking-[.24em] ${light ? 'text-red-300' : 'text-red-700 dark:text-red-300'}`}>{children}</p>;
}

export function SsiapReferencePage({ sessions }: { sessions: any[] }) {
  const next = sessions[0];
  const includesSst = ssiapSessionFormula(next?.title) === 'ssiap-1-sst';

  return <TrainingReferencePage theme="red" className={styles.ssiapCourse}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeCourseJsonLd({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'Course', name: 'Formation SSIAP 1 – Agent de sécurité incendie', description: 'Formation réglementaire SSIAP 1 de 67 heures à Puget-sur-Argens.', provider: { '@type': 'Organization', name: 'Intégrale Academy', telephone: '04 22 47 07 68' } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: '/' }, { '@type': 'ListItem', position: 2, name: 'Formations sécurité', item: '/formations-securite' }, { '@type': 'ListItem', position: 3, name: 'SSIAP 1', item: '/formations-securite/ssiap-1' }] },
    ] }, "/formations-securite/ssiap-1") }} />

    <TrainingReferenceHero
      id="ssiap" badge="SSIAP 1 · Formation réglementée"
      heading="Devenez agent de" accent="sécurité incendie"
      title="Formation agent de sécurité incendie"
      tagline="Apprenez le métier sur le terrain"
      description={<p>Préparez le diplôme SSIAP 1 et apprenez à prévenir les risques, surveiller les installations et porter assistance dans les ERP et les IGH.</p>}
      illustration={ssiapArtwork.prevention} caption="Prévenir, veiller et intervenir"
      primaryAction={{ href: '#dates-tarifs', label: 'Voir les prochaines dates →' }}
    >
      <TrainingHeroSessionCard
        session={next} theme="red" defaultPrice={includesSst ? '1 230 € TTC' : '980 € TTC'}
        priceNote={includesSst ? 'SSIAP 1 + SST · secourisme inclus' : 'SSIAP 1 seul · formule avec SST à 1 230 € TTC'}
        assistantKey="ssiap-1" registrationHref={ssiapRegistrationHref(next)}
        approval="Agrément SSIAP n°8323"
        facts={[
          { label: 'Certification', value: 'Diplôme SSIAP 1', details: ['Agent de sécurité incendie'] },
          { label: 'Durée et format', value: includesSst ? '67 h de SSIAP 1 + SST' : '67 heures', details: ['Hors examen et déplacements', '100 % présentiel'] },
          { label: 'Effectif', value: '12 stagiaires maximum', details: ['Apprentissage sur le terrain'] },
        ]}
      />
    </TrainingReferenceHero>

    <SsiapInitialNavigation label="SSIAP 1" />

    <CourseJourney course="ssiap-1">
      <Section id="metier" label="01 — Le métier" title={<>Un rôle essentiel dans les <em>ERP et les IGH</em></>}
        intro="L’agent SSIAP 1 protège les personnes et les bâtiments. Il prévient les risques, contrôle les installations et intervient au sein d’un service de sécurité incendie.">
        <TrainingMissionCards items={missions.map(([number, title, description], index) => ({
          title, description, illustration: [ssiapArtwork.ronde, ssiapArtwork.pc, ssiapArtwork.secours][index],
          landscapeFocus: ['50% 38%', '50% 42%', '50% 38%'][index],
          body: <><p className="mt-1 text-xs">{number} / Sur le terrain</p><p><strong>{['Observer, anticiper et prévenir', 'Vérifier, surveiller et transmettre', 'Alerter, intervenir et assister'][index]}</strong></p>
            <a className="mt-3 inline-block text-sm font-bold underline underline-offset-4" href="#programme">Découvrir ce que vous apprendrez ↗</a></>,
        }))} />
        <article className={`${reference.liftCard} mt-8 grid gap-5 rounded-[2rem] border border-academy-line bg-white p-6 lg:grid-cols-[.7fr_1.3fr] lg:p-8`}>
          <div><Eyebrow>À qui s’adresse la formation ?</Eyebrow><h3 className="mt-3 text-3xl font-black">Un parcours ouvert aux projets sérieux</h3></div>
          <ul className="grid gap-3 sm:grid-cols-2">{audiences.map(item => <li key={item} className="flex items-center gap-3 rounded-2xl bg-academy-bg p-4 font-bold">
            <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-red-100 text-xs text-red-800">✓</span>{item}</li>)}</ul>
        </article>
        <div className="mt-8 rounded-[2rem] bg-[#EFE7D9] dark:bg-[#18232f] p-6 lg:p-8"><div className="grid gap-7 lg:grid-cols-[.65fr_1.35fr]"><div><Eyebrow>SSIAP 1 ou APS ?</Eyebrow><h3 className="mt-3 text-3xl font-black">Deux qualifications, deux missions</h3><p className="mt-3 leading-7 text-academy-muted">Le SSIAP 1 concerne la sécurité incendie. L’APS concerne la surveillance humaine et le gardiennage. L’un ne remplace pas l’autre.</p></div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-[1.5rem] bg-white dark:bg-[#202c39] p-5"><p className="text-xs font-black uppercase tracking-[.2em] text-red-700">SSIAP 1</p><p className="mt-3 text-xl font-black">Prévention et intervention incendie</p></div><div className="rounded-[1.5rem] bg-[#0D1725] p-5 text-white"><p className="text-xs font-black uppercase tracking-[.2em] text-blue-300">APS</p><p className="mt-3 text-xl font-black">Surveillance et sécurité privée</p></div></div></div></div>
      </Section>
    </CourseJourney>

    <SsiapInitialSections course="ssiap-1" label="SSIAP 1" capacity={12} admission={
      <Section id="admission" label="02 — Admission" title="Votre dossier est-il prêt pour le SSIAP 1 ?" tone="stone"
        intro="Notre équipe vérifie chaque pièce avant l’entrée en formation pour sécuriser votre admission et éviter toute mauvaise surprise le jour de l’examen.">
        <TrainingAdmission course="ssiap-1" action={contactHref('vérification du dossier')}
          points={prerequisites.map(([title, text]) => ({ title, content: <p>{text}</p> }))}
          lead={<><h3>Les prérequis,<br /><em>expliqués simplement</em></h3>
            <p className={shared.admissionSupport}><strong>Secourisme, aptitude médicale et expression écrite</strong></p></>}
          note="Préparez votre justificatif de secourisme et votre certificat médical."
          steps={<>{enrollment[0]} <span>→</span> {enrollment[1]} <span>→</span> {enrollment[2]} <span>→</span> {enrollment[4]}</>}
          afterPoints={<div className={styles.admissionLinks}>
            <a href="/documents/certificat-medical-ssiap.pdf" target="_blank" rel="noopener noreferrer">Télécharger le certificat médical (PDF) ↗</a>
            <a href="#dates-tarifs">Choisir entre SSIAP 1 et SSIAP 1 + SST →</a>
          </div>} />
      </Section>
    } immersion={<>
      <Section id="competences" label="03 — Compétences" title="Ce que vous saurez faire sur le terrain">
        <SsiapSkills skills={skills} />
      </Section>
      <Section id="pedagogie" label="05 — Immersion & pédagogie" title={<span id="terrain-title">Comprendre en cours.<br /><em>Apprendre en pratiquant</em></span>} tone="dark"
        intro="À Puget-sur-Argens, les connaissances prennent forme dans les exercices. Découvrez votre environnement de formation et les gestes que vous travaillerez.">
        <TrainingMotionGallery variant="ssiap" illustrations={ssiapPracticeArtwork} practiceCards={{
          'fire-round': { icon: '◎', text: 'Repérer les anomalies et vérifier les dégagements pendant la ronde.', focus: '50% 38%' },
          extinguisher: { icon: '✓', text: 'Contrôler le matériel et les moyens de secours.', focus: '50% 48%' },
          'fire-panel': { icon: '▤', text: 'Lire une information sur le système de sécurité incendie et identifier la zone concernée.' },
          'fire-alert': { icon: '⌖', text: 'Vérifier l’origine du signal et transmettre les informations utiles.' },
          evacuation: { icon: '→', text: 'Guider les occupants vers une sortie de secours.', focus: '50% 40%' },
          'rescue-arrival': { icon: '⇄', text: 'Orienter les secours et leur transmettre les éléments recueillis sur place.' },
        }} />
        <div className={styles.fieldLesson}><div><Eyebrow light>Pédagogie terrain</Eyebrow><h3>On apprend en faisant</h3>
          <p>Cours réglementaires, démonstrations et entraînements sont complétés par des rondes, des manipulations et des scénarios proches du terrain.</p>
          <ul>{['Manipulation des équipements', 'Rondes avec anomalies', 'Visites applicatives', 'Mises en situation', 'Entraînement au QCM', 'Préparation à l’examen'].map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ul></div>
          <MissionAnimation variant="ssiap" illustration={originalArtwork['ssiap-1-mission-ensemble']} />
        </div>
        <div id="mise-en-situation" className={styles.practicePanel}><SsiapPracticeQuestion />
      <div className={styles.trainer}><div><p className={styles.eyebrow}>La pratique accompagnée</p><h3>Un formateur à vos côtés</h3><p>Manipulations, rondes, mises en situation : vous vous entraînez avec un formateur et bénéficiez de retours pour progresser. L’effectif est limité à 12 stagiaires pour favoriser la pratique encadrée.</p></div><Link href="/ecole#equipe" className={styles.textLink}>Rencontrer les personnes qui vous accompagnent ↗</Link></div>
        </div>
      </Section>
    </>}
    program={
      <Section id="programme" label="04 — Programme" title={<>67 heures pour devenir <em>opérationnel</em></>}
        intro="Un programme réglementaire complet qui progresse des fondamentaux du feu jusqu’aux rondes et mises en situation professionnelles.">
        <TrainingProgramDownload href="/documents/programme-ssiap-1.pdf" course="SSIAP 1" theme="red" className="mb-6 w-full sm:w-auto" />
        <SsiapProgramExplorer parts={program} />
      </Section>
    }
    exam={
      <Section id="examen" label="06 — Examen" title={<>Un examen officiel, <em>préparé sans zone d’ombre</em></>} tone="dark"
        intro="Vous connaissez les attendus, vous vous entraînez dans les conditions les plus proches de l’épreuve et vous recevez un retour précis sur votre progression.">
        <SsiapExamExperience steps={examSteps} />
      <div className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-[1.7rem] border border-white/10 bg-white/6 p-5"><div><p className="font-black">Une préparation exigeante, un effectif maîtrisé</p><p className="mt-1 text-sm text-white/55">12 stagiaires maximum · diplôme SSIAP 1 · <a href="https://www.francecompetences.fr/recherche/rs/7845/" target="_blank" rel="noopener noreferrer">RS7845 pour les parcours 2027</a></p></div><CTA href={contactHref('conditions examen')} variant="outline">Poser une question</CTA></div>
      </Section>
    }
    dates={<SsiapBooking sessions={sessions.map(session => ({
      id: session.id, training: session.training, title: session.title, startDate: session.startDate, endDate: session.endDate,
      inPersonStartDate: session.inPersonStartDate ?? session.startDate, inPersonEndDate: session.inPersonEndDate ?? session.endDate,
      inPersonFirstEndDate: session.inPersonFirstEndDate, inPersonResumeDate: session.inPersonResumeDate,
      examDate: session.examDate, status: session.status, location: session.location,
      seatsTotal: session.seatsTotal, seatsLeft: session.seatsLeft, showSeatsLeft: session.showSeatsLeft,
      priceLabel: session.priceLabel, priceCents: session.priceCents,
    }))} />}
    enrollment={
      <section id="inscription-financement" className={editorial.enrollment}><div id="inscription" className={editorial.wrap}>
        <p className={editorial.kicker}>09 — Inscription &amp; financement</p>
        <header className={editorial.intro}><div><h2><span>Du premier appel à votre entrée en formation.</span><span>Nous vous accompagnons de A à Z</span></h2>
          <p><strong>Cinq étapes, un dossier maîtrisé</strong></p></div><CTA href="#dates-tarifs">Commencer mon inscription →</CTA></header>
        <ol className={editorial.steps}>{enrollment.map((item, index) => <li key={item}><span className={editorial.stepNumber}>{String(index + 1).padStart(2, '0')}</span><div><h3>{item}</h3>
          {index === 0 && <a href="tel:0422470768">Appeler le 04 22 47 07 68 →</a>}
          {index === 1 && <a href="#admission">Consulter les prérequis →</a>}
          {index === 3 && <a href="/documents/certificat-medical-ssiap.pdf" target="_blank" rel="noopener noreferrer">Télécharger le certificat médical (PDF) ↗</a>}
        </div></li>)}</ol>
        <article className={editorial.funding}>
          <div><p className={editorial.kicker}>Votre financement</p><h3>Simulez votre reste à charge</h3><p className="mt-3 text-sm">Estimez le montant restant après vos aides et votre CPF.</p></div>
          <div className={editorial.identity}><p>Vous envisagez d’utiliser votre CPF ?</p><p>Pour valider votre inscription sur Mon Compte Formation, préparez votre accès FranceConnect+.</p>
            <a href="https://www.moncompteformation.gouv.fr/espace-public/france-connect-comment-vous-inscrire-votre-formation" target="_blank" rel="noopener noreferrer">Consulter les démarches sur Mon Compte Formation →</a></div>
          <div className={editorial.fundingActions}><CTA href={contactHref('financement SSIAP 1')}>Étudier mon financement →</CTA><CTA variant="outline" href="/financements#simulateur">Ouvrir le simulateur →</CTA></div>
        </article>
        <TrainingFundingOptions options={[
          ['CPF', 'Selon éligibilité, mobilisez les droits disponibles sur votre compte.'],
          ['France Travail', 'Votre conseiller étudie la demande de prise en charge selon votre projet.'],
          ['Employeur ou OPCO', 'Votre employeur peut étudier votre demande de financement.'],
          ['Financement personnel', 'Paiement personnel. Facilités étudiées selon votre dossier (paiement x3 / x4 / x10).'],
        ]} />
      </div></section>
    }
    outcomes={
      <Section id="debouches" label="10 — Débouchés & emploi" tone="paper" title={<>Travaillez, évoluez, <em>maintenez vos compétences</em></>}
        intro="Le SSIAP 1 ouvre l’accès aux fonctions d’agent de sécurité incendie. L’expérience permet ensuite d’envisager le SSIAP 2 et la responsabilité d’une équipe.">
        <div className="grid items-start gap-5 lg:grid-cols-2">
          <div className="grid gap-5"><article className="rounded-[2rem] border border-academy-line bg-white p-6"><Eyebrow>Après le SSIAP 1</Eyebrow><h3 className="mt-3 text-3xl font-black">Les postes accessibles</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">{jobs.map((item, index) => <li key={item} className={reference.jobCard}><span className={reference.jobIcon} aria-hidden="true">{['◎','◇','⇄','▤'][index]}</span><strong className="text-sm">{item}</strong></li>)}</ul>
          </article>
          <article className={experience.career}><Eyebrow light>Évolution</Eyebrow><h3 className="mt-3 text-3xl font-black">Objectif SSIAP 2</h3>
            <div className={experience.careerLadder} aria-hidden="true"><strong><small>Agent</small>SSIAP 1</strong><span>→</span><strong><small>Chef d’équipe</small>SSIAP 2</strong></div>
            <p>Après l’expérience réglementaire requise, vous pouvez préparer le SSIAP 2 et évoluer vers le métier de chef d’équipe de sécurité incendie.</p>
            <CTA href={contactHref('évolution SSIAP 2')} variant="outline" className="mt-5">Préparer mon évolution</CTA></article></div>
          <article id="double-competence" className={reference.dualSkill} aria-labelledby="ssiap-dual-title">
            <p className={reference.dualEyebrow}>Parcours recommandé</p><h3 id="ssiap-dual-title">Double compétence <span>SSIAP 1 + APS</span></h3>
            <p className={reference.dualIntro}><strong>Deux expertises. Plus de possibilités</strong><br />Associez le SSIAP 1 et le TFP APS pour élargir vos missions dans la sécurité incendie et la surveillance humaine.</p>
            <div className={reference.dualPanels}>
              <div className={reference.dualSecurity}><span className={reference.dualLabel}>TFP APS</span>
                <ManualArtwork illustration={originalArtwork['aps-metier-site']} className={styles.dualArtwork} /><h4>Prévenir &amp; surveiller</h4><p>Rondes, contrôle d’accès, protection des personnes et des biens.</p></div>
              <span className={reference.dualPlus} aria-hidden="true">+</span>
              <div className={reference.dualFire}><span className={reference.dualLabel}>SSIAP 1</span>
                <ManualArtwork illustration={ssiapEditorialArtwork.assistance} className={styles.dualArtwork} /><h4>Alerter &amp; protéger</h4><p>Prévention incendie, évacuation et assistance aux personnes.</p></div>
            </div>
            <div className={reference.dualFooter}><span>Surveillance humaine <b>+</b> Sécurité incendie</span><CTA href="/formations-securite/aps" variant="dark" className="w-full">Découvrir le TFP APS →</CTA>
              <p>Deux qualifications complémentaires, chacune avec ses prérequis et son examen.</p></div>
          </article>
        </div>
        <article className={shared.workplaces}><div><Eyebrow>Où exercer ?</Eyebrow><h3>Les établissements qui recrutent</h3></div><ul>{workplaces.map(item => <li key={item}>{item}</li>)}</ul></article>
      </Section>
    }
    />
    <SsiapTestimonials />
    <div id="faq-ssiap"><FaqDirectoryLink embedded theme="red" /></div>
    <SsiapInitialContact href={contactHref('rendez-vous téléphonique avec Cassandre MENARD')} />
  </TrainingReferencePage>;
}
