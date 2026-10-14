import { TeamPortrait } from '@/components/TeamPortrait';
import { CourseJourney } from '@/components/CourseJourney';
import { serializeCourseJsonLd } from '@/lib/seo';
import Link from 'next/link';
import { TrainingHeroSessionCard } from '@/components/TrainingHero';
import { TrainingSectionNavigation } from '@/components/TrainingSectionNavigation';
import type { ReactNode } from 'react';
import { MissionAnimation } from '@/components/MissionAnimation';
import { PremiumFAQSection } from '@/components/ui';
import Image from 'next/image';
import { SsiapBooking } from './SsiapBooking';
import { SsiapManualPreview, SsiapPracticeQuestion } from './SsiapDiscovery';
import { SsiapTestimonials } from './SsiapTestimonials';
import { ssiapRegistrationHref } from '@/lib/ssiap-registration';
import { parisDateKey } from '@/lib/public-sessions';
import styles from './SsiapReferencePage.module.css';
import { TrainingMotionGallery } from '@/components/TrainingMotionGallery';
import { IntegraleWelcomePack } from '@/components/IntegraleWelcomePack';
import { ManualArtwork } from '@/components/ManualArtwork';
import { ssiapArtwork, ssiapPracticeArtwork } from '@/data/manualIllustrations';
import { originalArtwork } from '@/data/originalArtwork';

const contactHref = (subject = 'inscription') => `/contact?formation=ssiap-1&objet=${encodeURIComponent(subject)}`;

const navigationItems = [
  { label: 'Métier', href: '#metier' },
  { label: 'Admission', href: '#admission' },
  { label: 'Programme', href: '#programme' },
  { label: 'Examen', href: '#examen' },
  { label: 'Dates & tarifs', href: '#dates-tarifs' },
  { label: 'Débouchés', href: '#debouches' },
  { label: 'FAQ', href: '#faq-ssiap' },
] as const;

const fallbackSessions = [
  { id: 'ssiap-1-octobre-2026', title: 'SSIAP 1 — Octobre 2026', startDate: '2026-10-12T00:00:00.000Z', endDate: '2026-10-27T00:00:00.000Z', examDate: '2026-10-28T00:00:00.000Z', status: 'OPEN', seatsTotal: 12, seatsLeft: 8, location: 'Puget-sur-Argens', priceLabel: '980 €' },
  { id: 'ssiap-1-fevrier-2027', title: 'SSIAP 1 — Février 2027', startDate: '2027-02-15T00:00:00.000Z', endDate: '2027-02-26T00:00:00.000Z', examDate: '2027-03-01T00:00:00.000Z', status: 'OPEN', seatsTotal: 12, seatsLeft: null, location: 'Puget-sur-Argens', priceLabel: '980 €' },
  { id: 'ssiap-1-mai-2027', title: 'SSIAP 1 — Mai 2027', startDate: '2027-05-24T00:00:00.000Z', endDate: '2027-06-04T00:00:00.000Z', examDate: '2027-06-07T00:00:00.000Z', status: 'OPEN', seatsTotal: 12, seatsLeft: null, location: 'Puget-sur-Argens', priceLabel: '980 €' },
  { id: 'ssiap-1-septembre-2027', title: 'SSIAP 1 — Septembre 2027', startDate: '2027-09-13T00:00:00.000Z', endDate: '2027-09-24T00:00:00.000Z', examDate: '2027-09-27T00:00:00.000Z', status: 'OPEN', seatsTotal: 12, seatsLeft: null, location: 'Puget-sur-Argens', priceLabel: '980 €' },
  { id: 'ssiap-1-novembre-2027', title: 'SSIAP 1 — Novembre 2027', startDate: '2027-11-08T00:00:00.000Z', endDate: '2027-11-22T00:00:00.000Z', examDate: '2027-11-23T00:00:00.000Z', status: 'OPEN', seatsTotal: 12, seatsLeft: null, location: 'Puget-sur-Argens', priceLabel: '980 €' },
];

const heroFacts = [
  ['Diplôme', 'SSIAP 1', 'Agent de sécurité incendie'],
  ['Durée', '67 heures', 'Hors examen et déplacements'],
  ['Effectif', '12 maximum', 'Suivi et pratique encadrée'],
  ['École', 'Puget-sur-Argens', 'Formation en présentiel'],
  ['Tarif', 'Dès 980 €', 'Option SSIAP 1 + SST'],
  ['Agrément', 'SSIAP n°8323', 'Arrêté préfectoral n°26/099'],
];

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

const faq = [
  { q: 'Que signifie SSIAP 1 ?', a: 'SSIAP signifie Service de sécurité incendie et d’assistance à personnes. Le niveau 1 correspond à la fonction d’agent.' },
  { q: 'Combien de temps dure la formation ?', a: 'La formation dure 67 heures minimum, hors examen et déplacements, généralement réparties sur environ deux semaines.' },
  { q: 'Le SST est-il obligatoire ?', a: 'Vous devez posséder un PSC ou PSC 1 de moins de deux ans, un SST valide ou un PSE 1 valide. Une formule SSIAP 1 + SST est proposée si nécessaire.' },
  { q: 'Faut-il un certificat médical ?', a: 'Oui. Un certificat médical conforme au modèle réglementaire et datant de moins de trois mois est nécessaire.' },
  { q: 'Comment se déroule l’examen ?', a: 'L’examen comprend un QCM de 30 questions et une ronde pratique avec anomalies, découverte d’un sinistre et renseignement de la main courante.' },
  { q: 'Peut-on suivre le SSIAP 1 sans APS ?', a: 'Oui. L’APS n’est pas un prérequis au SSIAP 1. Ce sont deux qualifications distinctes.' },
  { q: 'Le SSIAP 1 est-il éligible au CPF ?', a: 'Une mobilisation du CPF peut être possible selon l’offre et la certification actives au moment de l’inscription. Notre équipe vérifie votre situation.' },
  { q: 'Combien de temps le diplôme reste-t-il valable ?', a: 'Le titulaire doit effectuer un recyclage tous les trois ans et maintenir sa qualification de secourisme à jour.' },
  { q: 'Peut-on évoluer vers le SSIAP 2 ?', a: 'Oui, après avoir acquis l’expérience professionnelle réglementaire requise pour accéder à la formation de chef d’équipe SSIAP 2.' },
];

function sessionHref(session: any) { return ssiapRegistrationHref(session); }

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

function Section({ id, eyebrow, title, intro, children, tone = 'cream' }: { id?: string; eyebrow: string; title: ReactNode; intro?: ReactNode; children: ReactNode; tone?: 'cream' | 'paper' | 'stone' | 'dark' }) {
  const colors = tone === 'dark' ? 'bg-[#0D1725] text-white' : tone === 'paper' ? 'bg-[#FFFDF8] dark:bg-[#18232f] text-academy-ink' : tone === 'stone' ? 'bg-[#EFE7D9] dark:bg-[#18232f] text-academy-ink' : 'bg-academy-bg text-academy-ink';
  return <section id={id} className={`${styles.section} ${colors} scroll-mt-24 px-4 py-14 sm:py-16 lg:py-20`}>
    <div className="page-container">
      <div className="mb-8 grid gap-5 lg:grid-cols-[.75fr_1.25fr] lg:items-end lg:gap-16">
        <div><Eyebrow light={tone === 'dark'}>{eyebrow}</Eyebrow><h2 className={styles.sectionTitle}>{title}</h2></div>
        {intro && <div className={`max-w-3xl text-base font-medium leading-8 ${tone === 'dark' ? 'text-white/65' : 'text-academy-muted'}`}>{intro}</div>}
      </div>
      {children}
    </div>
  </section>;
}

export function SsiapReferencePage({ sessions }: { sessions: any[] }) {
  const visibleSessions = sessions.length ? sessions : fallbackSessions.filter(session => session.startDate.slice(0, 10) >= parisDateKey()).map(session => ({ ...session, showSeatsLeft: false }));
  const next = visibleSessions[0];
  const faqSchema = faq.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } }));

  return <div className={`${styles.page} relative overflow-x-clip pb-24 lg:pb-0`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeCourseJsonLd({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'Course', name: 'Formation SSIAP 1 – Agent de sécurité incendie', description: 'Formation réglementaire SSIAP 1 de 67 heures à Puget-sur-Argens.', provider: { '@type': 'Organization', name: 'Intégrale Academy', telephone: '04 22 47 07 68' } },
      { '@type': 'FAQPage', mainEntity: faqSchema },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: '/' }, { '@type': 'ListItem', position: 2, name: 'Formations sécurité', item: '/formations-securite' }, { '@type': 'ListItem', position: 3, name: 'SSIAP 1', item: '/formations-securite/ssiap-1' }] },
    ] }, "/formations-securite/ssiap-1") }} />

    <section className={styles.hero} aria-labelledby="ssiap-title">
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.heroBadge}><span aria-hidden="true" /> SSIAP 1 · Formation réglementée</p>
            <h1 id="ssiap-title">Devenez agent de<br /><em>sécurité incendie.</em></h1>
            <p className={styles.heroTagline}>Apprenez le métier sur le terrain.</p>
            <p className={styles.heroDescription}>Préparez le diplôme SSIAP 1 et apprenez à prévenir les risques, surveiller les installations et porter assistance dans les ERP et les IGH.</p>
            <div className={styles.actions}><CTA href="#dates-tarifs">Voir les prochaines dates →</CTA><CTA href="tel:0422470768" variant="outline">Parler à un conseiller</CTA></div>
            <div className={styles.heroHighlights}><span>✓ 67 heures minimum</span><span>✓ 12 stagiaires maximum</span><span>✓ Option SST</span></div>
          </div>
          <figure className={styles.heroArtwork}>
            <ManualArtwork illustration={ssiapArtwork.prevention} priority natural />
            <figcaption><span>FORMATION SSIAP 1</span><strong>Prévenir. Veiller. Intervenir.</strong><span>Formation agent de sécurité incendie</span></figcaption>
          </figure>
        </div>
        <div className={styles.heroBooking}><TrainingHeroSessionCard session={next} theme="red" duration="67 heures" defaultPrice="980 €" priceNote="SSIAP 1 seul · +250 € avec SST" assistantKey="ssiap-1" registrationHref={sessionHref(next)} /></div>
        <div className={styles.facts}>{heroFacts.map(([label, value, detail]) => <div key={label}><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>)}</div>
      </div>
    </section>

    <TrainingSectionNavigation
      mark="SSIAP"
      title="SSIAP 1"
      items={navigationItems}
      registrationHref="#dates-tarifs"
      theme="red"
    />

    <CourseJourney course="ssiap-1" />

    <Section id="metier" eyebrow="Le métier" title={<>Un rôle essentiel dans les ERP et les IGH.</>} intro={<>L’agent SSIAP 1 protège les personnes et les bâtiments. Il prévient les risques, contrôle les installations et intervient au sein d’un service de sécurité incendie.</>}>
      <div className={styles.missions}>{missions.map(([number, title, text], index) => <article key={number} className={styles.mission}>
        <div className={styles.missionImage}><ManualArtwork illustration={[ssiapArtwork.ronde, ssiapArtwork.pc, ssiapArtwork.secours][index]} natural /></div>
        <div className={styles.missionCopy}><span className={styles.missionNumber}>{number}</span><h3>{title}</h3><p>{text}</p><a className={styles.textLink} href="#programme">Découvrir ce que vous apprendrez <span aria-hidden="true">↗</span></a></div>
      </article>)}</div>
      <div className="mt-8 grid gap-5 rounded-[2rem] border border-academy-line bg-white dark:bg-[#202c39] p-6 shadow-soft lg:grid-cols-[.75fr_1.25fr] lg:p-8"><div><Eyebrow>À qui s’adresse la formation ?</Eyebrow><h3 className="mt-3 text-3xl font-black">Un parcours ouvert aux projets sérieux.</h3></div><div className="grid gap-3 sm:grid-cols-2">{audiences.map(item => <div key={item} className="flex items-center gap-3 rounded-2xl bg-academy-bg p-4 font-bold"><span className="grid h-7 w-7 place-items-center rounded-full bg-red-600 text-xs font-black text-white">✓</span>{item}</div>)}</div></div>
      <div className="mt-8 rounded-[2rem] bg-[#EFE7D9] dark:bg-[#18232f] p-6 lg:p-8"><div className="grid gap-7 lg:grid-cols-[.65fr_1.35fr]"><div><Eyebrow>SSIAP 1 ou APS ?</Eyebrow><h3 className="mt-3 text-3xl font-black">Deux qualifications, deux missions.</h3><p className="mt-3 leading-7 text-academy-muted">Le SSIAP 1 concerne la sécurité incendie. L’APS concerne la surveillance humaine et le gardiennage. L’un ne remplace pas l’autre.</p></div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-[1.5rem] bg-white dark:bg-[#202c39] p-5"><p className="text-xs font-black uppercase tracking-[.2em] text-red-700">SSIAP 1</p><p className="mt-3 text-xl font-black">Prévention et intervention incendie</p></div><div className="rounded-[1.5rem] bg-[#0D1725] p-5 text-white"><p className="text-xs font-black uppercase tracking-[.2em] text-blue-300">APS</p><p className="mt-3 text-xl font-black">Surveillance et sécurité privée</p></div></div></div></div>
      <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{skills.map(([title, text], index) => <div key={title} className={`rounded-[1.5rem] border p-5 ${index === 0 ? 'border-red-300 bg-red-50 dark:bg-[#39252b]' : 'border-academy-line bg-[#FFFDF8] dark:bg-[#202c39]'}`}><span className="grid h-9 w-9 place-items-center rounded-full bg-[#0D1725] text-sm font-black text-red-300">{String(index + 1).padStart(2, '0')}</span><h3 className="mt-4 text-xl font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-academy-muted">{text}</p></div>)}</div>
    </Section>

    <Section id="admission" eyebrow="Admission" title={<>Les prérequis, expliqués simplement.</>} intro={<>Notre équipe vérifie chaque pièce avant l’entrée en formation pour sécuriser votre admission et éviter toute mauvaise surprise le jour de l’examen.</>} tone="paper">
      <div className="grid gap-4 md:grid-cols-2">{prerequisites.map(([title, text], index) => <article key={title} className="rounded-[1.7rem] border border-academy-line bg-white dark:bg-[#202c39] p-5 shadow-soft"><div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-red-100 font-black text-red-700">{index + 1}</span><div><h3 className="text-xl font-black">{title}</h3><p className="mt-2 leading-7 text-academy-muted">{text}</p></div></div></article>)}</div>
      <div className={styles.admissionLinks}><a href="/documents/certificat-medical-ssiap.pdf" target="_blank" rel="noopener noreferrer">Télécharger le certificat médical (PDF) ↗</a><a href="#dates-tarifs">Choisir entre SSIAP 1 et SSIAP 1 + SST →</a></div>
      <div className="mt-10"><Eyebrow>Inscription</Eyebrow><h3 className="mt-3 text-3xl font-black">Cinq étapes, un dossier maîtrisé.</h3><div className="mt-6 grid gap-3 md:grid-cols-5">{enrollment.map((item, index) => <div key={item} className="relative rounded-[1.4rem] border border-academy-line bg-white dark:bg-[#202c39] p-4"><span className="text-3xl font-black text-red-500">0{index + 1}</span><p className="mt-6 font-black leading-6">{item}</p></div>)}</div></div>
    </Section>

    <Section id="programme" eyebrow="Programme" title={<>67 heures pour devenir opérationnel.</>} intro={<>Un programme réglementaire complet qui progresse des fondamentaux du feu jusqu’aux rondes et mises en situation professionnelles.</>}>
      <div className="space-y-3">{program.map(([number, title, hours, text], index) => <details key={number} open={index === 0} className="group rounded-[1.6rem] border border-academy-line bg-[#FFFDF8] dark:bg-[#202c39] p-5 shadow-soft"><summary className="flex cursor-pointer list-none items-center gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#0D1725] font-black text-red-300">{number}</span><span className="min-w-0 flex-1"><strong className="block text-lg font-black sm:text-xl">{title}</strong><small className="font-bold text-academy-muted">{hours}</small></span><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-red-600 font-black text-white transition group-open:rotate-45">+</span></summary><p className="ml-0 mt-5 border-t border-academy-line pt-5 leading-7 text-academy-muted sm:ml-16">{text}</p></details>)}</div>
      <div className={styles.admissionLinks}><a href="/documents/programme-ssiap-1.pdf" target="_blank" rel="noopener noreferrer">Télécharger le programme SSIAP 1 (PDF) ↗</a></div>
    </Section>

    <section id="pedagogie" className={styles.terrain} aria-labelledby="terrain-title"><div className={styles.container}>
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>Votre formation, sur le terrain</p><h2 id="terrain-title" className={styles.sectionTitle}>Comprendre en cours.<br /><em>Apprendre en pratiquant.</em></h2></div><p className={styles.intro}>À Puget-sur-Argens, les connaissances prennent forme dans les exercices. Découvrez votre environnement de formation et les gestes que vous travaillerez.</p></div>
      <div className={styles.campusPhotos}>
        <figure><Image src="/images/campus/salle-formation.webp" alt="La salle de formation du centre Intégrale Academy à Puget-sur-Argens" width={1600} height={1066} sizes="(max-width: 700px) 100vw, 60vw" /><figcaption>Votre salle de formation · Puget-sur-Argens</figcaption></figure>
        <div><figure><Image src="/images/campus/accueil-centre.webp" alt="L’accueil du centre Intégrale Academy" width={1600} height={805} sizes="(max-width: 700px) 47vw, 30vw" /><figcaption>Un accueil, une équipe.</figcaption></figure><figure><Image src="/images/campus/espace-detente.webp" alt="L’espace détente du centre Intégrale Academy" width={1600} height={1162} sizes="(max-width: 700px) 47vw, 30vw" /><figcaption>Un espace pour les pauses.</figcaption></figure></div>
      </div>
      <div className={styles.campusFooter}><span>Photographies de notre centre de formation</span><Link href="/ecole#photos">Découvrir les autres espaces ↗</Link></div>
      <div  className="grid gap-6 rounded-[2rem] bg-[#0D1725] p-6 text-white lg:grid-cols-[.8fr_1.2fr] lg:p-9"><div><Eyebrow light>Pédagogie terrain</Eyebrow><h3 className="mt-3 text-3xl font-black">On apprend en faisant.</h3><p className="mt-4 leading-7 text-white/65">Cours réglementaires, démonstrations et entraînements sont complétés par des rondes, des manipulations et des scénarios proches du terrain.</p></div><div className="grid gap-3 sm:grid-cols-2">{['Manipulation des équipements', 'Rondes avec anomalies', 'Visites applicatives', 'Mises en situation', 'Entraînement au QCM', 'Préparation à l’examen'].map((item, index) => <div key={item} className="rounded-2xl border border-white/10 bg-white/7 p-4"><span className="text-xs font-black text-red-300">0{index + 1}</span><p className="mt-3 font-black">{item}</p></div>)}</div></div>
      <MissionAnimation variant="ssiap" className="mt-8" illustration={originalArtwork['ssiap-1-mission-ensemble']} />
      <TrainingMotionGallery variant="ssiap" illustrations={ssiapPracticeArtwork} />
      <SsiapPracticeQuestion />
      <div className={styles.trainer}><div><p className={styles.eyebrow}>La pratique accompagnée</p><h3>Un formateur à vos côtés.</h3><p>Manipulations, rondes, mises en situation : vous vous entraînez avec un formateur et bénéficiez de retours pour progresser. L’effectif est limité à 12 stagiaires pour favoriser la pratique encadrée.</p></div><Link href="/ecole#equipe" className={styles.textLink}>Rencontrer les personnes qui vous accompagnent ↗</Link></div>
    </div></section>

    <IntegraleWelcomePack course="ssiap-1" />
    <SsiapManualPreview />

    <Section id="examen" eyebrow="Certification" title={<>Un examen officiel, préparé sans zone d’ombre.</>} intro={<>Vous connaissez les attendus, vous vous entraînez dans les conditions les plus proches de l’épreuve et vous recevez un retour précis sur votre progression.</>} tone="dark">
      <div className="grid gap-4 lg:grid-cols-3">{examSteps.map(([number, title, text], index) => <article key={number} className={`rounded-[1.8rem] border p-6 ${index === 1 ? 'border-red-300/35 bg-red-400/10' : 'border-white/10 bg-white/6'}`}><span className="text-5xl font-black text-red-300">{number}</span><h3 className="mt-8 text-2xl font-black">{title}</h3><p className="mt-3 leading-7 text-white/65">{text}</p></article>)}</div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-[1.7rem] border border-white/10 bg-white/6 p-5"><div><p className="font-black">Une préparation exigeante, un effectif maîtrisé.</p><p className="mt-1 text-sm text-white/55">12 stagiaires maximum · diplôme SSIAP 1 · RS5641</p></div><CTA href={contactHref('conditions examen')} variant="outline">Poser une question</CTA></div>
    </Section>

    <SsiapBooking sessions={visibleSessions.map(session => ({
      id: session.id, title: session.title, startDate: session.startDate, endDate: session.endDate,
      examDate: session.examDate, status: session.status, location: session.location,
      seatsTotal: session.seatsTotal, seatsLeft: session.seatsLeft, showSeatsLeft: session.showSeatsLeft,
      priceLabel: session.priceLabel, priceCents: session.priceCents,
    }))} />

    <Section id="debouches" eyebrow="Après le SSIAP 1" title={<>Travaillez, évoluez, maintenez vos compétences.</>} intro={<>Le SSIAP 1 ouvre l’accès aux fonctions d’agent de sécurité incendie. L’expérience permet ensuite d’envisager le SSIAP 2 et la responsabilité d’une équipe.</>}>
      <div className="grid gap-5 lg:grid-cols-2"><article className="rounded-[2rem] border border-academy-line bg-[#FFFDF8] dark:bg-[#202c39] p-6"><Eyebrow>Débouchés</Eyebrow><h3 className="mt-3 text-3xl font-black">Les postes accessibles</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{jobs.map(item => <div key={item} className="rounded-2xl bg-academy-bg p-4 font-black">{item}</div>)}</div></article><article className="rounded-[2rem] bg-[#0D1725] p-6 text-white"><Eyebrow light>Évolution</Eyebrow><h3 className="mt-3 text-3xl font-black">Objectif SSIAP 2</h3><p className="mt-4 leading-7 text-white/65">Après l’expérience réglementaire requise, vous pouvez préparer le SSIAP 2 et évoluer vers le métier de chef d’équipe de sécurité incendie.</p><CTA href={contactHref('évolution SSIAP 2')} variant="outline" className="mt-5">Préparer mon évolution</CTA></article></div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_.85fr]"><article className="rounded-[2rem] border border-academy-line bg-white dark:bg-[#202c39] p-6"><Eyebrow>Où exercer ?</Eyebrow><div className="mt-5 flex flex-wrap gap-2">{workplaces.map(item => <span key={item} className="rounded-full border border-academy-line bg-academy-bg px-4 py-2 text-sm font-bold">{item}</span>)}</div></article><article className="rounded-[2rem] border border-red-200 bg-red-50 dark:bg-[#39252b] p-6"><Eyebrow>Maintien des acquis</Eyebrow><h3 className="mt-3 text-2xl font-black">Recyclage tous les 3 ans</h3><p className="mt-3 leading-7 text-academy-muted">Le secourisme doit rester à jour. Une remise à niveau peut être nécessaire selon la date d’expiration et l’activité exercée.</p></article></div>
      <div className="mt-8 grid gap-4 rounded-[2rem] bg-[#EFE7D9] dark:bg-[#18232f] p-6 md:grid-cols-3 lg:p-8">{[['Centre agréé', 'SSIAP n°8323'], ['Cadre officiel', 'Arrêté n°26/099 du 29 mai 2026'], ['Formation suivie', '12 stagiaires maximum']].map(([title, text]) => <div key={title} className="rounded-2xl bg-white dark:bg-[#202c39] p-5 text-center"><p className="text-sm font-black uppercase tracking-[.16em] text-red-700">{title}</p><p className="mt-3 text-xl font-black">{text}</p></div>)}</div>      <a className={styles.accreditation} href="https://www.integraleacademy.com/_files/ugd/008e7b_cc8ed006f785482f9eee3f22e08c323c.pdf" target="_blank" rel="noopener noreferrer"><Image src="/images/certifications/ssiap-apercu.webp" alt="Aperçu de l’agrément SSIAP d’Intégrale Academy" width={130} height={180} /><div><p className={styles.eyebrow}>Un cadre vérifiable</p><h3>Consultez notre agrément SSIAP.</h3><p>Agrément n°8323 · arrêté préfectoral n°26/099 du 29 mai 2026</p><strong>Télécharger l’agrément (PDF) ↗</strong></div></a>

    </Section>

    <SsiapTestimonials />

    <div id="faq-ssiap"><PremiumFAQSection theme="red" badge="FAQ SSIAP 1" title="Vos questions sur la formation SSIAP 1" description="Prérequis, examen, financement, validité et évolution : retrouvez les réponses essentielles avant votre inscription." items={faq} contactHref={contactHref('question SSIAP 1')} /></div>

    <section className={styles.contact} aria-labelledby="ssiap-contact-title"><div className={`${styles.container} ${styles.contactGrid}`}>
      <div><p className={styles.eyebrow}>Une question sur votre projet ?</p><h2 id="ssiap-contact-title" className={styles.sectionTitle}>Faites le premier pas<br /><em>vers votre futur métier.</em></h2><p className={styles.intro}>Cassandre vous aide à vérifier vos prérequis, choisir votre session et trouver la solution de financement adaptée.</p><p className={styles.small}>Notre équipe vous accompagne pour choisir la formation adaptée à votre projet et vous aider à concrétiser votre avenir professionnel.</p><div className={styles.supportPills}><span>Choisir son parcours</span><span>Préparer son dossier</span><span>Étudier son financement</span></div><Link href="/ecole#equipe" className={styles.textLink}>Rencontrer les personnes qui vous accompagnent ↗</Link></div>
      <div className={styles.contactCard}><TeamPortrait person="cassandre" size={240} alt="Memoji de Cassandre, responsable commerciale Intégrale Academy" className={styles.portrait} /><p className={styles.eyebrow}>Votre conseillère · Contactez Cassandre</p><h3>Cassandre</h3><p>Responsable commerciale — Intégrale Academy</p><a className={styles.phone} href="tel:0422470768">04 22 47 07 68</a><CTA href={contactHref('rendez-vous avec Cassandre')}>Réserver un rendez-vous téléphonique →</CTA><a className={styles.textLink} href="tel:0422470768">Appeler Cassandre</a><small>Échange gratuit et sans engagement</small></div>
    </div></section>

    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-academy-line bg-[#FFFDF8]/96 dark:bg-[#18232f]/96 p-3 pb-[calc(.75rem+env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(0,0,0,.12)] backdrop-blur lg:hidden"><div className="mx-auto flex max-w-lg gap-2"><CTA href="tel:0422470768" variant="light" className="min-w-0 flex-1 px-3">Appeler</CTA><CTA href="#dates-tarifs" variant="red" className="min-w-0 flex-[1.4] px-3">Réserver ma place</CTA></div></div>
  </div>;
}
