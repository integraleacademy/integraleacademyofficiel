import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { OrientationAssistant } from '@/components/OrientationAssistant';
import { PremiumFAQSection } from '@/components/ui';
import { TrainingDatesPricingSection } from '@/components/TrainingDatesPricingSection';

const contactHref = (subject = 'inscription') => `/contact?formation=ssiap-1&objet=${encodeURIComponent(subject)}`;

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
  ['Campus', 'Puget-sur-Argens', 'Formation en présentiel'],
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

function formatDate(value?: string | null) {
  if (!value) return 'À confirmer';
  return new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value));
}

function sessionHref(session: any) {
  return session?.id ? `/contact?formation=ssiap-1&session=${encodeURIComponent(String(session.id))}` : contactHref('prochaine session');
}

function seatsLabel(session: any) {
  if (session?.status === 'FULL' || Number(session?.seatsLeft) === 0) return 'Session complète';
  if (session?.seatsLeft === null || session?.seatsLeft === undefined) return 'Places limitées';
  return Number(session.seatsLeft) === 1 ? '1 place restante' : `${session.seatsLeft} places restantes`;
}

function CTA({ href, children, variant = 'red', className = '' }: { href: string; children: ReactNode; variant?: 'dark' | 'red' | 'light' | 'outline'; className?: string }) {
  const styles = {
    dark: 'bg-academy-ink text-white hover:bg-black',
    red: 'bg-red-600 text-white hover:bg-red-700',
    light: 'border border-academy-line bg-white text-academy-ink hover:bg-academy-bg',
    outline: 'border border-white/30 bg-white/5 text-white hover:bg-white/12',
  };
  return <Link href={href} className={`inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-center text-sm font-black transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-red-300/55 ${styles[variant]} ${className}`}>{children}</Link>;
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-[.66rem] font-black uppercase tracking-[.24em] ${light ? 'text-red-300' : 'text-red-700'}`}>{children}</p>;
}

function Section({ id, eyebrow, title, intro, children, tone = 'cream' }: { id?: string; eyebrow: string; title: ReactNode; intro?: ReactNode; children: ReactNode; tone?: 'cream' | 'paper' | 'stone' | 'dark' }) {
  const colors = tone === 'dark' ? 'bg-[#0D1725] text-white' : tone === 'paper' ? 'bg-[#FFFDF8] text-academy-ink' : tone === 'stone' ? 'bg-[#EFE7D9] text-academy-ink' : 'bg-academy-bg text-academy-ink';
  return <section id={id} className={`${colors} scroll-mt-24 px-4 py-14 sm:py-16 lg:py-20`}>
    <div className="page-container">
      <div className="mb-8 grid gap-5 lg:grid-cols-[.75fr_1.25fr] lg:items-end lg:gap-16">
        <div><Eyebrow light={tone === 'dark'}>{eyebrow}</Eyebrow><h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-.045em] sm:text-4xl lg:text-5xl">{title}</h2></div>
        {intro && <div className={`max-w-3xl text-base font-medium leading-8 ${tone === 'dark' ? 'text-white/65' : 'text-academy-muted'}`}>{intro}</div>}
      </div>
      {children}
    </div>
  </section>;
}

function CompactAssistant() {
  return <details className="group mt-3 overflow-hidden rounded-[1.35rem] border border-academy-line bg-white text-academy-ink shadow-soft">
    <summary className="flex cursor-pointer list-none items-center gap-3 p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red-600 font-black text-white">✦</span>
      <span className="min-w-0 flex-1"><strong className="block text-sm font-black">Une question sur les prérequis&nbsp;?</strong><small className="block text-xs font-semibold text-academy-muted">L’assistant vous aide à vérifier votre projet.</small></span>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-academy-ink font-black text-white transition group-open:rotate-90">→</span>
    </summary>
    <div className="border-t border-academy-line bg-academy-bg p-3 sm:p-4"><OrientationAssistant hideInfoAction /></div>
  </details>;
}

function HeroSession({ session }: { session: any }) {
  const full = session?.status === 'FULL' || Number(session?.seatsLeft) === 0;
  return <aside className="rounded-[2rem] border border-white/65 bg-[#FFFDF8] p-5 text-academy-ink shadow-[0_34px_100px_rgba(0,0,0,.34)] sm:p-6">
    <div className="flex flex-wrap items-center justify-between gap-2"><span className="rounded-full bg-[#0D1725] px-3 py-1.5 text-[.62rem] font-black uppercase tracking-[.16em] text-red-300">Prochaine session</span><span className={`rounded-full border px-3 py-1.5 text-[.68rem] font-black ${full ? 'border-stone-300 bg-stone-100 text-stone-700' : 'border-red-300 bg-red-50 text-red-800'}`}>{seatsLabel(session)}</span></div>
    <h2 className="mt-5 text-3xl font-black tracking-[-.04em] sm:text-4xl">{formatDate(session?.startDate)} <span className="text-red-600">→</span><br />{formatDate(session?.endDate)}</h2>
    <p className="mt-2 text-sm font-extrabold text-academy-muted">Examen le {formatDate(session?.examDate)}</p>
    <div className="mt-5 grid grid-cols-2 gap-2.5">{[['Durée', '67 heures'], ['Tarif', '980 €'], ['Lieu', session?.location || 'Puget-sur-Argens'], ['Effectif', '12 maximum']].map(([key, value]) => <div key={key} className="rounded-2xl border border-[#E8DECE] bg-[#F5EFE4] p-3.5"><p className="text-[.6rem] font-black uppercase tracking-[.16em] text-[#837968]">{key}</p><p className="mt-1 text-sm font-black sm:text-base">{value}</p></div>)}</div>
    <CTA href={sessionHref(session)} variant={full ? 'light' : 'red'} className="mt-5 w-full">{full ? 'Être alerté de la prochaine session' : 'Réserver ma place →'}</CTA>
    <CompactAssistant />
  </aside>;
}

export function SsiapReferencePage({ sessions }: { sessions: any[] }) {
  const visibleSessions = sessions.length ? sessions : fallbackSessions;
  const next = visibleSessions[0];
  const faqSchema = faq.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } }));

  return <main className="relative overflow-hidden pb-24 lg:pb-0">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'Course', name: 'Formation SSIAP 1 – Agent de sécurité incendie', description: 'Formation réglementaire SSIAP 1 de 67 heures à Puget-sur-Argens.', provider: { '@type': 'Organization', name: 'Intégrale Academy', telephone: '04 22 47 07 68' } },
      { '@type': 'FAQPage', mainEntity: faqSchema },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: '/' }, { '@type': 'ListItem', position: 2, name: 'Formations sécurité', item: '/formations-securite' }, { '@type': 'ListItem', position: 3, name: 'SSIAP 1', item: '/formations-securite/ssiap-1' }] },
    ] }) }} />

    <section className="relative isolate overflow-hidden bg-[#0D1725] px-4 pb-8 pt-10 text-white sm:pt-14 lg:pt-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_12%,rgba(248,113,113,.24),transparent_31%),radial-gradient(circle_at_88%_20%,rgba(220,38,38,.22),transparent_29%),linear-gradient(135deg,#080D15_0%,#121B2A_55%,#2A0F12_100%)]" />
      <div className="absolute -left-20 top-16 -z-10 h-72 w-72 rounded-full bg-red-500/20 blur-3xl" />
      <div className="page-container">
        <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-red-300/35 bg-red-400/10 px-4 py-2 text-[.68rem] font-black uppercase tracking-[.2em] text-red-200"><span className="h-2.5 w-2.5 rounded-full bg-red-400 shadow-[0_0_16px_rgba(248,113,113,.9)]" />SSIAP 1 · formation réglementée</span>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-.055em] sm:text-5xl lg:text-6xl xl:text-7xl">Devenez agent de <span className="text-red-300">sécurité incendie.</span></h1>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-white/72 sm:text-xl">Préparez le diplôme SSIAP 1 et apprenez à prévenir les risques, surveiller les installations et porter assistance dans les ERP et les IGH.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row"><CTA href={sessionHref(next)} variant="red">Voir les prochaines dates →</CTA><CTA href="tel:0422470768" variant="outline">Parler à un conseiller</CTA></div>
            <div className="mt-7 flex flex-wrap gap-2 text-xs font-bold text-white/75"><span className="rounded-full border border-white/15 bg-white/8 px-3 py-2">✓ 67 heures minimum</span><span className="rounded-full border border-white/15 bg-white/8 px-3 py-2">✓ 12 stagiaires maximum</span><span className="rounded-full border border-white/15 bg-white/8 px-3 py-2">✓ Option SST</span></div>
          </div>
          <HeroSession session={next} />
        </div>
        <div className="mt-10 grid overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/7 sm:grid-cols-2 lg:grid-cols-6">{heroFacts.map(([key, value, detail]) => <div key={key} className="border-b border-white/10 p-4 last:border-b-0 sm:border-r lg:border-b-0"><p className="text-[.58rem] font-black uppercase tracking-[.18em] text-white/42">{key}</p><p className="mt-1 font-black text-white">{value}</p><p className="mt-1 text-[.68rem] font-semibold leading-4 text-white/48">{detail}</p></div>)}</div>
      </div>
    </section>

    <nav aria-label="Sommaire de la formation" className="sticky top-0 z-30 hidden border-b border-academy-line bg-[#FFFDF8]/95 px-4 py-3 backdrop-blur lg:block"><div className="page-container flex items-center justify-between gap-5"><span className="text-xs font-black">SSIAP 1</span><div className="flex items-center gap-5 text-xs font-extrabold text-academy-muted">{[['Métier', '#metier'], ['Admission', '#admission'], ['Programme', '#programme'], ['Examen', '#examen'], ['Dates & tarifs', '#dates-tarifs'], ['Débouchés', '#debouches'], ['FAQ', '#faq-ssiap']].map(([label, href]) => <Link key={href} href={href} className="transition hover:text-academy-ink">{label}</Link>)}</div><CTA href={sessionHref(next)} variant="red" className="min-h-10 px-4 py-2">Je m’inscris</CTA></div></nav>

    <Section id="metier" eyebrow="Le métier" title={<>Un rôle essentiel dans les ERP et les IGH.</>} intro={<>L’agent SSIAP 1 protège les personnes et les bâtiments. Il prévient les risques, contrôle les installations et intervient au sein d’un service de sécurité incendie.</>}>
      <div className="grid gap-4 lg:grid-cols-3">{missions.map(([number, title, text], index) => <article key={number} className={`rounded-[1.8rem] border p-6 shadow-soft ${index === 1 ? 'border-[#26384F] bg-[#0D1725] text-white' : 'border-academy-line bg-[#FFFDF8]'}`}><span className={`text-5xl font-black ${index === 1 ? 'text-red-300' : 'text-red-600'}`}>{number}</span><h3 className="mt-10 text-2xl font-black">{title}</h3><p className={`mt-3 leading-7 ${index === 1 ? 'text-white/65' : 'text-academy-muted'}`}>{text}</p></article>)}</div>
      <div className="mt-8 grid gap-5 rounded-[2rem] border border-academy-line bg-white p-6 shadow-soft lg:grid-cols-[.75fr_1.25fr] lg:p-8"><div><Eyebrow>À qui s’adresse la formation ?</Eyebrow><h3 className="mt-3 text-3xl font-black">Un parcours ouvert aux projets sérieux.</h3></div><div className="grid gap-3 sm:grid-cols-2">{audiences.map(item => <div key={item} className="flex items-center gap-3 rounded-2xl bg-academy-bg p-4 font-bold"><span className="grid h-7 w-7 place-items-center rounded-full bg-red-600 text-xs font-black text-white">✓</span>{item}</div>)}</div></div>
      <div className="mt-8 rounded-[2rem] bg-[#EFE7D9] p-6 lg:p-8"><div className="grid gap-7 lg:grid-cols-[.65fr_1.35fr]"><div><Eyebrow>SSIAP 1 ou APS ?</Eyebrow><h3 className="mt-3 text-3xl font-black">Deux qualifications, deux missions.</h3><p className="mt-3 leading-7 text-academy-muted">Le SSIAP 1 concerne la sécurité incendie. L’APS concerne la surveillance humaine et le gardiennage. L’un ne remplace pas l’autre.</p></div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-[1.5rem] bg-white p-5"><p className="text-xs font-black uppercase tracking-[.2em] text-red-700">SSIAP 1</p><p className="mt-3 text-xl font-black">Prévention et intervention incendie</p></div><div className="rounded-[1.5rem] bg-[#0D1725] p-5 text-white"><p className="text-xs font-black uppercase tracking-[.2em] text-blue-300">APS</p><p className="mt-3 text-xl font-black">Surveillance et sécurité privée</p></div></div></div></div>
      <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{skills.map(([title, text], index) => <div key={title} className={`rounded-[1.5rem] border p-5 ${index === 0 ? 'border-red-300 bg-red-50' : 'border-academy-line bg-[#FFFDF8]'}`}><span className="grid h-9 w-9 place-items-center rounded-full bg-academy-ink text-sm font-black text-red-300">{String(index + 1).padStart(2, '0')}</span><h3 className="mt-4 text-xl font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-academy-muted">{text}</p></div>)}</div>
    </Section>

    <Section id="admission" eyebrow="Admission" title={<>Les prérequis, expliqués simplement.</>} intro={<>Notre équipe vérifie chaque pièce avant l’entrée en formation pour sécuriser votre admission et éviter toute mauvaise surprise le jour de l’examen.</>} tone="paper">
      <div className="grid gap-4 md:grid-cols-2">{prerequisites.map(([title, text], index) => <article key={title} className="rounded-[1.7rem] border border-academy-line bg-white p-5 shadow-soft"><div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-red-100 font-black text-red-700">{index + 1}</span><div><h3 className="text-xl font-black">{title}</h3><p className="mt-2 leading-7 text-academy-muted">{text}</p></div></div></article>)}</div>
      <div className="mt-8 grid gap-5 lg:grid-cols-2"><article className="rounded-[2rem] border border-academy-line bg-academy-bg p-6 lg:p-8"><p className="text-xs font-black uppercase tracking-[.2em] text-red-700">Formule essentielle</p><h3 className="mt-3 text-3xl font-black">SSIAP 1</h3><p className="mt-3 leading-7 text-academy-muted">Pour les candidats dont la qualification de secourisme est déjà en cours de validité.</p><p className="mt-6 text-4xl font-black">980 €</p></article><article className="rounded-[2rem] bg-[#0D1725] p-6 text-white shadow-card lg:p-8"><p className="text-xs font-black uppercase tracking-[.2em] text-red-300">Formule complète</p><h3 className="mt-3 text-3xl font-black">SSIAP 1 + SST</h3><p className="mt-3 leading-7 text-white/65">Pour obtenir ou renouveler votre qualification de secourisme avant la formation SSIAP.</p><p className="mt-6 text-4xl font-black text-red-300">1 230 €</p></article></div>
      <div className="mt-10"><Eyebrow>Inscription</Eyebrow><h3 className="mt-3 text-3xl font-black">Cinq étapes, un dossier maîtrisé.</h3><div className="mt-6 grid gap-3 md:grid-cols-5">{enrollment.map((item, index) => <div key={item} className="relative rounded-[1.4rem] border border-academy-line bg-white p-4"><span className="text-3xl font-black text-red-500">0{index + 1}</span><p className="mt-6 font-black leading-6">{item}</p></div>)}</div></div>
    </Section>

    <Section id="programme" eyebrow="Programme" title={<>67 heures pour devenir opérationnel.</>} intro={<>Un programme réglementaire complet qui progresse des fondamentaux du feu jusqu’aux rondes et mises en situation professionnelles.</>}>
      <div className="space-y-3">{program.map(([number, title, hours, text], index) => <details key={number} open={index === 0} className="group rounded-[1.6rem] border border-academy-line bg-[#FFFDF8] p-5 shadow-soft"><summary className="flex cursor-pointer list-none items-center gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#0D1725] font-black text-red-300">{number}</span><span className="min-w-0 flex-1"><strong className="block text-lg font-black sm:text-xl">{title}</strong><small className="font-bold text-academy-muted">{hours}</small></span><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-red-600 font-black text-white transition group-open:rotate-45">+</span></summary><p className="ml-0 mt-5 border-t border-academy-line pt-5 leading-7 text-academy-muted sm:ml-16">{text}</p></details>)}</div>
      <div id="pedagogie" className="mt-10 grid gap-6 rounded-[2rem] bg-[#0D1725] p-6 text-white lg:grid-cols-[.8fr_1.2fr] lg:p-9"><div><Eyebrow light>Pédagogie terrain</Eyebrow><h3 className="mt-3 text-3xl font-black">On apprend en faisant.</h3><p className="mt-4 leading-7 text-white/65">Cours réglementaires, démonstrations et entraînements sont complétés par des rondes, des manipulations et des scénarios proches du terrain.</p></div><div className="grid gap-3 sm:grid-cols-2">{['Manipulation des équipements', 'Rondes avec anomalies', 'Visites applicatives', 'Mises en situation', 'Entraînement au QCM', 'Préparation à l’examen'].map((item, index) => <div key={item} className="rounded-2xl border border-white/10 bg-white/7 p-4"><span className="text-xs font-black text-red-300">0{index + 1}</span><p className="mt-3 font-black">{item}</p></div>)}</div></div>
    </Section>

    <Section id="examen" eyebrow="Certification" title={<>Un examen officiel, préparé sans zone d’ombre.</>} intro={<>Vous connaissez les attendus, vous vous entraînez dans les conditions les plus proches de l’épreuve et vous recevez un retour précis sur votre progression.</>} tone="dark">
      <div className="grid gap-4 lg:grid-cols-3">{examSteps.map(([number, title, text], index) => <article key={number} className={`rounded-[1.8rem] border p-6 ${index === 1 ? 'border-red-300/35 bg-red-400/10' : 'border-white/10 bg-white/6'}`}><span className="text-5xl font-black text-red-300">{number}</span><h3 className="mt-8 text-2xl font-black">{title}</h3><p className="mt-3 leading-7 text-white/65">{text}</p></article>)}</div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-[1.7rem] border border-white/10 bg-white/6 p-5"><div><p className="font-black">Une préparation exigeante, un effectif maîtrisé.</p><p className="mt-1 text-sm text-white/55">12 stagiaires maximum · diplôme SSIAP 1 · RS5641</p></div><CTA href={contactHref('conditions examen')} variant="outline">Poser une question</CTA></div>
    </Section>

    <TrainingDatesPricingSection
      id="dates-tarifs"
      eyebrow="Dates & tarifs"
      sessions={visibleSessions}
      theme="red"
      defaultPrice="980 €"
      defaultLocation="Puget-sur-Argens"
      priceDescription="Formation SSIAP 1 · examen final · option SST disponible"
      benefits={['CPF', 'France Travail', 'Option SSIAP 1 + SST', 'Paiement x3 / x4 / x10']}
      registrationHref={sessionHref}
      priceAction={{ href: contactHref('financement SSIAP 1'), label: 'Étudier mon financement →' }}
    />

    <Section id="debouches" eyebrow="Après le SSIAP 1" title={<>Travaillez, évoluez, maintenez vos compétences.</>} intro={<>Le SSIAP 1 ouvre l’accès aux fonctions d’agent de sécurité incendie. L’expérience permet ensuite d’envisager le SSIAP 2 et la responsabilité d’une équipe.</>}>
      <div className="grid gap-5 lg:grid-cols-2"><article className="rounded-[2rem] border border-academy-line bg-[#FFFDF8] p-6"><Eyebrow>Débouchés</Eyebrow><h3 className="mt-3 text-3xl font-black">Les postes accessibles</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{jobs.map(item => <div key={item} className="rounded-2xl bg-academy-bg p-4 font-black">{item}</div>)}</div></article><article className="rounded-[2rem] bg-[#0D1725] p-6 text-white"><Eyebrow light>Évolution</Eyebrow><h3 className="mt-3 text-3xl font-black">Objectif SSIAP 2</h3><p className="mt-4 leading-7 text-white/65">Après l’expérience réglementaire requise, vous pouvez préparer le SSIAP 2 et évoluer vers le métier de chef d’équipe de sécurité incendie.</p><CTA href={contactHref('évolution SSIAP 2')} variant="outline" className="mt-5">Préparer mon évolution</CTA></article></div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_.85fr]"><article className="rounded-[2rem] border border-academy-line bg-white p-6"><Eyebrow>Où exercer ?</Eyebrow><div className="mt-5 flex flex-wrap gap-2">{workplaces.map(item => <span key={item} className="rounded-full border border-academy-line bg-academy-bg px-4 py-2 text-sm font-bold">{item}</span>)}</div></article><article className="rounded-[2rem] border border-red-200 bg-red-50 p-6"><Eyebrow>Maintien des acquis</Eyebrow><h3 className="mt-3 text-2xl font-black">Recyclage tous les 3 ans</h3><p className="mt-3 leading-7 text-academy-muted">Le secourisme doit rester à jour. Une remise à niveau peut être nécessaire selon la date d’expiration et l’activité exercée.</p></article></div>
      <div className="mt-8 grid gap-4 rounded-[2rem] bg-[#EFE7D9] p-6 md:grid-cols-3 lg:p-8">{[['Centre agréé', 'SSIAP n°8323'], ['Cadre officiel', 'Arrêté n°26/099 du 29 mai 2026'], ['Formation suivie', '12 stagiaires maximum']].map(([title, text]) => <div key={title} className="rounded-2xl bg-white p-5 text-center"><p className="text-sm font-black uppercase tracking-[.16em] text-red-700">{title}</p><p className="mt-3 text-xl font-black">{text}</p></div>)}</div>
    </Section>

    <div id="faq-ssiap"><PremiumFAQSection theme="red" badge="FAQ SSIAP 1" title="Vos questions sur la formation SSIAP 1" description="Prérequis, examen, financement, validité et évolution : retrouvez les réponses essentielles avant votre inscription." items={faq} contactHref={contactHref('question SSIAP 1')} /></div>

    <section className="bg-academy-bg px-4 pb-20 pt-8"><div className="page-container overflow-hidden rounded-[2.4rem] border border-red-200 bg-[#FFFDF8] shadow-card"><div className="grid items-center lg:grid-cols-[1.05fr_.95fr]"><div className="p-7 sm:p-9 lg:p-12"><Eyebrow>Une question sur votre projet ?</Eyebrow><h2 className="mt-4 text-4xl font-black tracking-[-.05em] sm:text-5xl">Faites le premier pas vers votre futur métier.</h2><p className="mt-5 max-w-xl text-lg leading-8 text-academy-muted">Cassandre vous aide à vérifier vos prérequis, choisir votre session et trouver la solution de financement adaptée.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><CTA href={contactHref('rendez-vous avec Cassandre')} variant="red">Réserver un rendez-vous →</CTA><CTA href="tel:0422470768" variant="light">Appeler Cassandre</CTA></div></div><div className="relative min-h-[370px] bg-[radial-gradient(circle_at_55%_30%,rgba(248,113,113,.28),transparent_32%),linear-gradient(140deg,#FEE2E2,#FFFDF8)] p-7"><div className="absolute inset-x-7 bottom-7 rounded-[1.8rem] border border-white/75 bg-white/88 p-5 shadow-soft backdrop-blur"><div className="flex items-center gap-4"><Image src="/images/cassandre-memoji.png" width={88} height={88} alt="Cassandre, responsable commerciale Intégrale Academy" className="h-20 w-20 rounded-2xl object-cover" /><div><p className="text-xs font-black uppercase tracking-[.18em] text-red-700">Votre conseillère</p><p className="mt-1 text-2xl font-black">Cassandre</p><p className="text-sm font-semibold text-academy-muted">Responsable commerciale</p></div></div><a href="tel:0422470768" className="mt-4 block rounded-full bg-red-600 px-5 py-3 text-center font-black text-white">04 22 47 07 68</a></div></div></div></div></section>

    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-academy-line bg-[#FFFDF8]/96 p-3 pb-[calc(.75rem+env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(0,0,0,.12)] backdrop-blur lg:hidden"><div className="mx-auto flex max-w-lg gap-2"><CTA href="tel:0422470768" variant="light" className="min-w-0 flex-1 px-3">Appeler</CTA><CTA href={sessionHref(next)} variant="red" className="min-w-0 flex-[1.4] px-3">Réserver ma place</CTA></div></div>
  </main>;
}
