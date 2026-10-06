import { AcademyWatermark } from '@/components/AcademyWatermark';
import { createPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './entreprises.module.css';

export const metadata: Metadata = createPageMetadata('/entreprises');

const brochureUrl = '/documents/brochure-entreprises-integrale-academy-2026-10.pdf';
const btsHours = 856 + 706;
const btsAidAssumption = 4500;
const euro = (value: number, digits = 2) => value.toLocaleString('fr-FR', { minimumFractionDigits: digits, maximumFractionDigits: digits });
const btsBudgets = [
  { name: 'Hypothèse basse', yearOne: 783.90, yearTwo: 929.75 },
  { name: 'Hypothèse haute', yearOne: 966.21, yearTwo: 1112.05 },
].map((budget) => {
  const total = (budget.yearOne + budget.yearTwo) * 12 - btsAidAssumption;
  return { ...budget, total, hourly: total / btsHours };
});

type IconName = 'arrow' | 'check' | 'people' | 'target' | 'shield' | 'briefcase' | 'school' | 'fire' | 'calendar' | 'document' | 'drone' | 'camera' | 'phone' | 'email';

function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  const common = { className, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true } as const;

  if (name === 'check') return <svg {...common}><path d="m5 12.5 4.2 4L19 6.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2"/></svg>;
  if (name === 'people') return <svg {...common}><circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8"/><path d="M3.5 19v-2.2A4.8 4.8 0 0 1 8.3 12h1.4a4.8 4.8 0 0 1 4.8 4.8V19" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8"/><circle cx="17" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.7"/><path d="M15.3 14.2h1.9a3.3 3.3 0 0 1 3.3 3.3V19" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7"/></svg>;
  if (name === 'target') return <svg {...common}><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>;
  if (name === 'shield') return <svg {...common}><path d="M12 3.3 19 6v5.2c0 4.3-2.7 7.6-7 9.5-4.3-1.9-7-5.2-7-9.5V6l7-2.7Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8"/><path d="m8.7 12.1 2.1 2 4.5-4.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"/></svg>;
  if (name === 'briefcase') return <svg {...common}><rect x="3.5" y="7" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M9 7V5h6v2M3.5 11.5c4.6 2.2 12.4 2.2 17 0M10 13.5h4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8"/></svg>;
  if (name === 'school') return <svg {...common}><path d="m3 9 9-5 9 5-9 5-9-5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8"/><path d="M7 11.3V16c2.8 2.1 7.2 2.1 10 0v-4.7M20.5 10v5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8"/></svg>;
  if (name === 'fire') return <svg {...common}><path d="M13.2 3.5c.8 3-1.8 4.3-.5 6.5.6 1 1.7 1.4 2.3 2.5.7 1.2.4 3.1-.6 4.1.1-2-1.1-3.4-2.2-4.4.1 2.2-2.2 2.7-2.2 5 0 1.2.5 2.4 1.4 3.1-3.5-.3-6.1-2.7-6.1-6.1 0-4.7 4.7-6.4 7.9-10.7Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8"/></svg>;
  if (name === 'calendar') return <svg {...common}><rect x="4" y="5.5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 3.5v4M16 3.5v4M4 9.5h16M8 13h2M14 13h2M8 16h2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8"/></svg>;
  if (name === 'document') return <svg {...common}><path d="M7 3.5h7l3 3V20H7V3.5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8"/><path d="M14 3.5V7h3M9.5 11h5M9.5 14.5h5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8"/></svg>;
  if (name === 'drone') return <svg {...common}><path d="M8 12h8M12 9v6M8 12l-3-3M16 12l3-3M8 12l-3 3M16 12l3 3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8"/><circle cx="4.5" cy="8.5" r="2.2" stroke="currentColor" strokeWidth="1.5"/><circle cx="19.5" cy="8.5" r="2.2" stroke="currentColor" strokeWidth="1.5"/><circle cx="4.5" cy="15.5" r="2.2" stroke="currentColor" strokeWidth="1.5"/><circle cx="19.5" cy="15.5" r="2.2" stroke="currentColor" strokeWidth="1.5"/></svg>;
  if (name === 'camera') return <svg {...common}><path d="M4 7.5h3l1.4-2h7.2l1.4 2h3v11H4v-11Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8"/><circle cx="12" cy="13" r="3.4" stroke="currentColor" strokeWidth="1.8"/></svg>;
  if (name === 'phone') return <svg {...common}><path d="M7.2 4.5 10 8.2 8.4 10c1.2 2.6 3 4.4 5.6 5.6l1.8-1.6 3.7 2.8-1.1 3c-.3.7-1 1.1-1.7 1-7-.8-12.7-6.5-13.5-13.5-.1-.7.3-1.4 1-1.7l3-1.1Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7"/></svg>;
  if (name === 'email') return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="m4 7 8 6 8-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"/></svg>;
  return <svg {...common}><path d="M5 12h13M13 7l5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9"/></svg>;
}

const heroBenefits = [
  'Candidats sourcés et présélectionnés selon vos besoins',
  'Parcours construits autour des réalités du terrain',
  'Contrats, OPCO et démarches administratives gérés',
  'Suivi formation, entreprise et autorisations CNAPS',
  'Solutions adaptées au recrutement ponctuel ou massif',
];

const challenges = [
  { number: '01', icon: 'people' as const, title: 'Recruter plus vite', text: 'Nous sourçons et préparons des candidats déjà engagés dans un parcours métier.' },
  { number: '02', icon: 'target' as const, title: 'Maîtriser vos coûts', text: 'Aides, OPCO et dispositifs publics réduisent le coût d’intégration et de formation.' },
  { number: '03', icon: 'shield' as const, title: 'Faire évoluer vos équipes', text: 'De l’agent polyvalent au futur chef d’équipe, chaque parcours vise l’opérationnel.' },
];

const solutions = [
  {
    id: 'alternance', tone: 'Cyan', label: 'Dispositif 01', icon: 'shield' as const,
    title: 'Parcours sécurité en alternance', value: '≈ 4 €/h', valueLabel: 'Coût employeur indicatif, charges et aides incluses',
    points: ['Parcours d’un an', 'APS + A3P + SSIAP 1', 'Environ 1 100 h réelles travaillées', 'OPCO AKTO et aides mobilisables'],
    ideal: 'Agent polyvalent, événementiel, sites sensibles et protection rapprochée.', cta: 'Voir le parcours alternance',
  },
  {
    id: 'poei', tone: 'Green', label: 'Dispositif 02', icon: 'briefcase' as const,
    title: 'POEI sécurité privée', value: '100 %', valueLabel: 'Formation pré-embauche financée, sous réserve d’accord',
    points: ['450 h de formation intensive', 'APS + SSIAP 1 et modules métier', 'Présélection des candidats', 'CDI ou CDD de 6 mois minimum à l’issue'],
    ideal: 'Recrutement rapide, besoins massifs et agents formés avant la prise de poste.', cta: 'Découvrir la POEI',
  },
  {
    id: 'bts-mos', tone: 'Mauve', label: 'Dispositif 03', icon: 'school' as const,
    title: 'BTS Management opérationnel de la sécurité', value: `${euro(btsHours, 0)} h`, valueLabel: 'Présence réelle en entreprise sur deux ans',
    points: ['15 jours entreprise / 15 jours école', 'Été en entreprise, hors examens', 'Formation financée par OPCO AKTO', 'Futur chef d’équipe ou superviseur'],
    ideal: 'Encadrement, exploitation, évolution interne et préparation de vos futurs managers.', cta: 'Explorer le BTS MOS',
  },
] as const;

const alternanceSessions = [
  {
    name: 'Session 1', period: 'Janvier → décembre 2027', immersion: 1246, worked: 1106,
    steps: [
      { date: 'Janvier à février 2027', title: 'Formation APS', detail: '175 h · préparation à la carte professionnelle CNAPS' },
      { date: 'Mars à juin 2027', title: 'Immersion en entreprise', detail: '588 h de terrain' },
      { date: 'Juin à juillet 2027', title: 'Formation A3P', detail: '328 h · protection rapprochée' },
      { date: 'Juillet à décembre 2027', title: 'Immersion en entreprise', detail: '658 h de terrain' },
      { date: 'Décembre 2027', title: 'SSIAP 1', detail: 'Formation et examens finaux' },
    ],
  },
  {
    name: 'Session 2', period: 'Juin 2027 → juin 2028', immersion: 1239, worked: 1099,
    steps: [
      { date: 'Juin à juillet 2027', title: 'Formation APS', detail: '175 h · préparation à la carte professionnelle CNAPS' },
      { date: 'Juillet à octobre 2027', title: 'Immersion en entreprise', detail: '413 h de terrain' },
      { date: 'Octobre à novembre 2027', title: 'Formation A3P', detail: '328 h · protection rapprochée' },
      { date: 'Novembre 2027 à mai 2028', title: 'Immersion en entreprise', detail: '826 h de terrain' },
      { date: 'Mai à juin 2028', title: 'SSIAP 1', detail: 'Formation et examens finaux' },
    ],
  },
];

const expertise = [
  { count: '360', label: 'agents APS formés' },
  { count: '300', label: 'agents A3P formés' },
  { count: '250', label: 'agents SSIAP formés' },
  { count: '60', label: 'dirigeants DESP depuis 2025' },
  { count: '250', label: 'chauffeurs VTC formés' },
];

const siteSkills = [
  { title: 'Entreprises & bureaux', text: 'Accueillir et orienter les visiteurs, contrôler les accès, effectuer des rondes et signaler les anomalies.', image: '/images/aps/manuel/acces.webp', alt: 'Un agent de sécurité accueille un visiteur et contrôle son accès.' },
  { title: 'Industrie & logistique', text: 'Contrôler les entrées et les sorties, surveiller les zones sensibles et appliquer les procédures propres au site.', image: '/images/aps/manuel/ronde.webp', alt: 'Un agent effectue une ronde de surveillance sur un site.' },
  { title: 'Commerces & centres commerciaux', text: 'Assurer une présence préventive, repérer les comportements à risque et gérer les tensions avec discernement.', image: '/images/aps/manuel/conflit.webp', alt: 'Un agent de sécurité gère calmement une situation de tension.' },
  { title: 'Événements & accueil du public', text: 'Participer au contrôle des accès, orienter les participants et faciliter la circulation du public.', image: '/images/aps/manuel/bagages.webp', alt: 'Un agent procède au contrôle des bagages à l’entrée d’un événement.' },
];

const contacts = [
  { initials: 'CM', firstName: 'Cassandre', name: 'Cassandre MENARD', role: 'Responsable commerciale', email: 'cassandre@integraleacademy.com', phone: '04 87 83 06 16', phoneHref: '+33487830616', mobile: '07 43 58 22 64', mobileHref: '+33743582264' },
  { initials: 'AC', firstName: 'Aurélie', name: 'Aurélie CHAUSSEZ', role: 'Chargée des relations clients', email: 'aurelie@integraleacademy.com', phone: '04 87 83 06 15', phoneHref: '+33487830615', mobile: '07 69 39 04 57', mobileHref: '+33769390457' },
  { initials: 'CV', firstName: 'Clément', name: 'Clément VAILLANT', role: 'Directeur général', email: 'clement@integraleacademy.com', phone: '04 87 83 06 14', phoneHref: '+33487830614', mobile: '06 65 24 52 71', mobileHref: '+33665245271' },
];

const poeiProgram = [
  { title: 'Accueil & intégration', hours: '7 h', icon: 'people' as const, text: 'Posture professionnelle, règles métier et découverte du secteur.' },
  { title: 'TFP APS', hours: '175 h', icon: 'shield' as const, text: 'Titre Agent de prévention et de sécurité et préparation à la certification.' },
  { title: 'Examen TFP APS', hours: '7 h', icon: 'document' as const, text: 'Épreuve de certification du titre à finalité professionnelle.' },
  { title: 'SSIAP 1', hours: '70 h', icon: 'fire' as const, text: 'Sécurité incendie en ERP et IGH, évacuation et premiers secours.' },
  { title: 'Examen SSIAP 1', hours: '7 h', icon: 'document' as const, text: 'Épreuve de certification Agent de sécurité incendie.' },
  { title: 'Sécurité événementielle', hours: '42 h', icon: 'people' as const, text: 'Gestion de foule, filtrage, manifestations sportives et prévention du risque terroriste.' },
  { title: 'Surveillance par drone', hours: '21 h', icon: 'drone' as const, text: 'Cadre légal, surveillance périmétrique et levée de doute à distance.' },
  { title: 'Techniques professionnelles', hours: '56 h', icon: 'camera' as const, text: 'Vidéoprotection, télésurveillance, radio et gestion de crise.' },
  { title: 'Préparation à l’emploi', hours: '58 h', icon: 'briefcase' as const, text: 'Coaching, simulations, ateliers métier et rencontres employeurs.' },
  { title: 'Bilan de fin de formation', hours: '7 h', icon: 'target' as const, text: 'Évaluation globale, synthèse des acquis et préparation à l’insertion.' },
];

const supportSteps = [
  { number: '01', title: 'Analyse de vos besoins', text: 'Profils, volumes, missions, calendrier et contraintes terrain.' },
  { number: '02', title: 'Sourcing et sélection', text: 'Recherche, présélection et évaluation des candidats selon vos critères.' },
  { number: '03', title: 'Réunions d’information', text: 'Présentation du dispositif et engagement des candidats retenus.' },
  { number: '04', title: 'Gestion administrative', text: 'Contrats, financeurs, OPCO, France Travail et suivi CNAPS.' },
  { number: '05', title: 'Formation et suivi', text: 'Coordination pédagogique et relation régulière avec votre entreprise.' },
  { number: '06', title: 'Intégration en entreprise', text: 'Accompagnement de la prise de poste et suivi de l’opérationnalité.' },
];

const catalog = [
  { icon: 'shield' as const, title: 'Sûreté et sécurité privée', text: 'TFP APS, TFP A3P, DESP, VAE DESP, MAC APS, MAC A3P et SST.' },
  { icon: 'fire' as const, title: 'Sécurité incendie', text: 'SSIAP 1, remises à niveau et recyclages selon les besoins de vos sites.' },
  { icon: 'camera' as const, title: 'Modules complémentaires', text: 'Événementiel, foule, vidéoprotection, drone, radio et gestion de crise.' },
  { icon: 'briefcase' as const, title: 'Solutions employeurs', text: 'POEI, alternance sécurité, BTS MOS, sourcing et financement OPCO AKTO.' },
];

const faqItems = [
  { question: 'Quel dispositif correspond à mon besoin ?', answer: 'L’alternance sécurité répond à un besoin d’agent polyvalent formé sur un an. La POEI est adaptée à une embauche rapide après 450 heures de formation. Le BTS MOS prépare plutôt un futur chef d’équipe, superviseur ou responsable d’exploitation.' },
  { question: 'Les coûts annoncés sont-ils garantis ?', answer: 'Non. Ils constituent des estimations établies à partir des hypothèses de rémunération et d’aides. Le coût final dépend notamment de la rémunération, des aides en vigueur, de l’âge du candidat et des règles de prise en charge applicables au moment du contrat.' },
  { question: 'Pouvez-vous recruter plusieurs candidats ?', answer: 'Oui. Nous pouvons organiser un sourcing individuel ou collectif, présélectionner les candidats et mettre en place des réunions d’information selon vos volumes et vos contraintes opérationnelles.' },
  { question: 'Qui gère les contrats et les financeurs ?', answer: 'Intégrale Academy vous accompagne pour le montage administratif, les relations avec l’OPCO ou France Travail, les contrats et le suivi des autorisations CNAPS. Chaque prise en charge reste soumise à la décision du financeur concerné.' },
  { question: 'Intervenez-vous hors de la Côte d’Azur ?', answer: 'Nous étudions chaque projet selon le lieu, le nombre de recrutements et les modalités pédagogiques possibles. Un premier échange permet de confirmer rapidement la faisabilité et l’organisation à prévoir.' },
];

export default function EntreprisesPage() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="entreprises-title">
        <AcademyWatermark placement="right" />
      <div className={styles.honeycomb} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}><span /> Solutions entreprises · Sécurité privée</span>
            <h1 id="entreprises-title">Recruter, former et faire évoluer vos futurs professionnels de la <em>sécurité privée.</em></h1>
            <p>Des solutions clés en main pour renforcer vos équipes. Nous trouvons les candidats, nous les formons, nous vous accompagnons.</p>
            <div className={styles.heroActions}>
              <Link href="#solutions" className={styles.primaryButton}>Découvrir les 3 solutions <Icon name="arrow" /></Link>
              <a href="#contact-entreprises" className={styles.secondaryButton}>Parlons de vos besoins <Icon name="arrow" /></a>
            </div>
            <a className={styles.brochureLink} href={brochureUrl} target="_blank" rel="noopener noreferrer"><Icon name="document" /> Consulter la brochure entreprises · PDF, 20 pages</a>
            <div className={styles.heroTags}><span><Icon name="check" />Sourcing candidats</span><span><Icon name="check" />Gestion administrative</span><span><Icon name="check" />Suivi CNAPS</span></div>
          </div>
          <figure className={styles.heroArtwork}>
            <img src="/images/aps/manuel/equipe.webp" alt="Deux agents de sécurité coordonnent leurs missions sur un site logistique." width="1536" height="1024" fetchPriority="high" />
            <figcaption><strong>Vos équipes de demain.</strong><span>Un seul partenaire, du recrutement à la montée en compétences.</span><div className={styles.artworkTags}><span>Alternance</span><span>POEI</span><span>BTS MOS</span></div></figcaption>
          </figure>
        </div>
        <div className={styles.heroStats}>
          <div><strong>+1 200</strong><span>stagiaires formés en 5 ans</span></div>
          <div><strong>3 dispositifs</strong><span>pour vos besoins de recrutement</span></div>
          <div><strong>12 max.</strong><span>stagiaires maximum par session</span></div>
          <div><strong>Qualiopi</strong><span>organisme certifié</span></div>
        </div>
      </div>
    </section>

    <nav className={styles.sectionNav} aria-label="Les solutions entreprises">
      <div className={styles.container}>
        <Link href="#alternance"><i className={styles.dotCyan} />Alternance sécurité</Link>
        <Link href="#poei"><i className={styles.dotGreen} />POEI</Link>
        <Link href="#bts-mos"><i className={styles.dotMauve} />BTS MOS</Link>
        <Link href="#accompagnement">Notre accompagnement</Link>
        <Link href="#brochure-entreprises">La brochure</Link>
        <Link href="#contact-entreprises">Votre projet <Icon name="arrow" /></Link>
      </div>
    </nav>

    <section className={styles.challengesSection} aria-labelledby="challenges-title">
      <div className={styles.container}>
        <div className={styles.sectionHeading}><span className={styles.sectionEyebrow}>Vos enjeux, notre mission</span><h2 id="challenges-title">Des problématiques concrètes.<br /><em>Des solutions immédiates.</em></h2><p>Recrutement difficile, turn-over, manque de profils qualifiés… Construisons ensemble une équipe qui répond aux réalités de votre terrain.</p></div>
        <div className={styles.challengesGrid}>{challenges.map((challenge) => <article key={challenge.title} className={styles.challengeCard}>
          <span className={styles.challengeIcon}><Icon name={challenge.icon} /></span><div><h3>{challenge.title}</h3><p>{challenge.text}</p></div>
        </article>)}</div>
        <div className={styles.expertiseStrip} aria-label="Nos professionnels formés">{expertise.map((item) => <div key={item.label}><strong>{item.count}</strong><span>{item.label}</span></div>)}</div>
        <p className={styles.schoolLocation}>Notre siège : <strong>54, chemin du Carreou, 83480 Puget-sur-Argens</strong>. Entre Cannes et Saint-Tropez, avec un accès direct par l’autoroute A8.</p>
      </div>
    </section>

    <section id="solutions" className={styles.solutionsSection} aria-labelledby="solutions-title">
      <div className={styles.container}>
        <div className={styles.sectionHeading}><span className={styles.sectionEyebrow}>À chaque besoin, sa solution</span><h2 id="solutions-title">Trois façons de faire<br /><em>grandir vos équipes.</em></h2><p>Un agent polyvalent, un recrutement avant embauche ou un futur chef d’équipe : choisissez le dispositif adapté à votre projet.</p></div>
        <div className={styles.solutionsGrid}>{solutions.map((solution) => <article key={solution.id} className={`${styles.solutionCard} ${styles[`solution${solution.tone}`]}`}>
          <div className={styles.solutionTop}><span className={styles.solutionLabel}>{solution.label}</span><Icon name={solution.icon} /></div>
          <h3>{solution.title}</h3>
          <div className={styles.solutionFigure}><strong>{solution.value}</strong><p>{solution.valueLabel}</p></div>
          <ul>{solution.points.map((point) => <li key={point}><Icon name="check" />{point}</li>)}</ul>
          <div className={styles.idealBox}><span>Idéal pour</span><p>{solution.ideal}</p></div>
          <Link href={`#${solution.id}`}>{solution.cta}<Icon name="arrow" /></Link>
        </article>)}</div>
        <p className={styles.disclaimer}>Coûts et prises en charge indicatifs, à confirmer selon la situation du candidat, les aides en vigueur et l’accord du financeur.</p>
      </div>
    </section>

    <section id="alternance" className={`${styles.deviceSection} ${styles.alternanceSection}`} aria-labelledby="alternance-title">
      <div className={styles.honeycomb} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.deviceHeading}><span>Dispositif 01 / 03</span><span>Former & fidéliser</span></div>
        <div className={styles.detailHero}>
          <div className={styles.detailCopy}><h2 id="alternance-title"><em>Parcours sécurité</em><br />en alternance.</h2><p>Un an pour former un agent polyvalent et immédiatement opérationnel, en combinant APS, protection rapprochée et sécurité incendie.</p><div className={styles.pillList}><span>Contrat d’apprentissage · 1 an</span><span>3 qualifications</span><span>OPCO AKTO</span></div></div>
          <div className={styles.costPanel}><span>Près de 1 100 h réelles en entreprise</span><strong>≈ 4 €<small>/ heure</small></strong><p><b>4 499 € pour une année complète</b>, charges incluses et après aides, selon les hypothèses de la simulation.</p><span className={styles.costCaption}>Selon le profil, la taille de l’entreprise et les aides en vigueur. Estimation personnalisée avant engagement.</span></div>
        </div>
        <div className={styles.qualificationGrid}>
          <article><span className={styles.apsIcon}><Icon name="shield" /></span><div><strong>Agent de prévention et de sécurité</strong><small>TFP APS · 175 h</small></div></article>
          <article><span className={styles.a3pIcon}><Icon name="people" /></span><div><strong>Protection physique des personnes</strong><small>TFP A3P · 328 h</small></div></article>
          <article><span className={styles.fireIcon}><Icon name="fire" /></span><div><strong>Agent de sécurité incendie</strong><small>SSIAP 1 · Formation et examen</small></div></article>
        </div>
        <div className={styles.timelineHeading}><span className={styles.ribbon}>Deux rentrées pour recruter en 2027</span><h3>La formation. Le terrain.<br />La montée en compétences.</h3><p>Une même architecture pédagogique, avec deux calendriers pour organiser vos recrutements.</p></div>
        <div className={styles.sessionGrid}>{alternanceSessions.map((session) => <article key={session.name} className={styles.sessionCard}>
          <header><span>{session.name}</span><h4>{session.period}</h4></header>
          <ol className={styles.sessionTimeline}>{session.steps.map((step, index) => <li key={step.date}><span className={styles.timelineDot}>{String(index + 1).padStart(2, '0')}</span><div><small>{step.date}</small><strong>{step.title}</strong><p>{step.detail}</p></div></li>)}</ol>
          <div className={styles.sessionFigures}><div><strong>{euro(session.immersion, 0)} h</strong><span>d’immersion professionnelle</span></div><div><strong>{euro(session.worked, 0)} h</strong><span>réellement travaillées</span></div><div><strong>4 499 €</strong><span>coût annuel employeur estimé</span></div><div><strong>{euro(4499 / session.worked)} €/h</strong><span>coût horaire estimé</span></div></div>
        </article>)}</div>
        <div className={styles.sessionNote}><Icon name="shield" /><p><strong>Un parcours adapté à vos missions.</strong> Événementiel, hôtels de luxe, sites sensibles, surveillance humaine, événements sportifs, festivals et protection rapprochée. Les missions sont confiées selon les qualifications obtenues et les autorisations CNAPS délivrées.</p><a href="#contact-entreprises">Étudier mon recrutement <Icon name="arrow" /></a></div>
      </div>
    </section>

    <section id="poei" className={`${styles.deviceSection} ${styles.poeiSection}`} aria-labelledby="poei-title">
      <div className={styles.container}>
        <div className={styles.deviceHeading}><span>Dispositif 02 / 03</span><span>Préparer & recruter</span></div>
        <div className={styles.detailHero}>
          <div className={styles.detailCopy}><h2 id="poei-title"><em>POEI</em><br />Sécurité privée.</h2><p>Formez vos futurs collaborateurs avant leur prise de poste. La Préparation Opérationnelle à l’Emploi Individuelle prépare des demandeurs d’emploi aux besoins de votre entreprise.</p></div>
          <aside className={styles.employerJourney}><span className={styles.ribbon}>Votre recrutement, accompagné</span><ul><li><Icon name="check" />Besoin et profils définis ensemble</li><li><Icon name="check" />Candidats sourcés et présélectionnés</li><li><Icon name="check" />Formation adaptée à vos missions</li><li><Icon name="check" />Intégration en entreprise accompagnée</li></ul></aside>
        </div>
        <div className={styles.poeiMetrics}><div><strong>450 h</strong><span>de formation intensive</span></div><div><strong>100 %</strong><span>formation financée*</span></div><div><strong>6 mois</strong><span>d’engagement d’embauche</span></div><div><strong>12 places</strong><span>maximum par session</span></div></div>
        <details className={styles.programBlock} open>
          <summary><span><Icon name="document" /><span><strong>Le programme complet</strong><small>10 modules · 450 heures de formation</small></span></span><b aria-hidden="true">+</b></summary>
          <div className={styles.programContent}><p>Un socle complet pour des agents directement employables, de la posture professionnelle aux techniques de sécurité.</p><div className={styles.programGrid}>{poeiProgram.map((module) => <article key={module.title}><div><Icon name={module.icon} /><strong>{module.hours}</strong></div><h4>{module.title}</h4><p>{module.text}</p></article>)}</div></div>
        </details>
        <div className={styles.sessionsBar}><span><Icon name="calendar" />Les sessions</span><strong>11 janvier → 12 avril 2027</strong><strong>21 septembre → 22 décembre 2027</strong></div>
        <div className={styles.siteSkillsHeading}><span className={styles.ribbon}>Des compétences pour vos sites</span><h3>Des agents préparés<br />à vos réalités de terrain.</h3><p>Chaque environnement a ses contraintes, ses publics et ses priorités. Nous préparons les candidats à appliquer les consignes et à adopter la bonne posture professionnelle.</p></div>
        <div className={styles.siteSkillsGrid}>{siteSkills.map((site) => <article key={site.title}><img src={site.image} alt={site.alt} width="1122" height="1402" loading="lazy" /><div><h4>{site.title}</h4><p>{site.text}</p></div></article>)}</div>
        <aside className={styles.fireComplement}><img src="/images/ssiap-1/manuel/prevention.webp" alt="Un agent explique les consignes et le plan de sécurité incendie." width="1200" height="800" loading="lazy" /><div><span>Une compétence complémentaire</span><h4>La sécurité incendie.</h4><p>Le SSIAP 1 prépare à la prévention incendie, à la surveillance des installations de sécurité et à l’assistance aux personnes en ERP et IGH. Les missions confiées respectent les qualifications et les autorisations de chaque agent.</p></div></aside>
        <div className={styles.sectionBottom}><p className={styles.disclaimer}>* Financement à 100 % sous réserve de validation du dossier et du devis par France Travail. Pour ce parcours, l’entreprise s’engage sur un CDI ou un CDD de 6 mois minimum à l’issue de la formation.</p><a href="#contact-entreprises" className={styles.deviceButton}>Étudier une POEI <Icon name="arrow" /></a></div>
      </div>
    </section>

    <section id="bts-mos" className={`${styles.deviceSection} ${styles.btsSection}`} aria-labelledby="bts-title">
      <div className={styles.honeycomb} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.deviceHeading}><span>Dispositif 03 / 03</span><span>Accompagner & faire évoluer</span></div>
        <div className={styles.detailHero}>
          <div className={styles.detailCopy}><h2 id="bts-title">Vos futurs chefs d’équipe.<br /><em>Le BTS MOS.</em></h2><p>Deux ans pour former votre prochain encadrant en Management opérationnel de la sécurité, avec une présence longue et structurée dans votre entreprise.</p><div className={styles.pillList}><span>Chef d’équipe</span><span>Superviseur</span><span>Responsable d’exploitation</span></div></div>
          <div className={styles.costPanel}><span>Coût horaire moyen estimé</span><strong className={styles.btsCostFigure}>{euro(btsBudgets[0].hourly)} à {euro(btsBudgets[1].hourly)} €<small>/ heure</small></strong><p>Selon la rémunération du candidat et les aides mobilisées.</p></div>
        </div>
        <div className={styles.btsMetrics}><div><strong>{euro(btsHours, 0)} h</strong><span>en entreprise sur 2 ans</span></div><div><strong>15 j / 15 j</strong><span>entreprise et école</span></div><div><strong>100 %</strong><span>en entreprise l’été, hors examens</span></div><div><strong>0 €*</strong><span>de frais de scolarité, sous réserve d’accord OPCO</span></div></div>
        <div className={styles.yearsGrid}>
          <article><span>Année 01</span><h3>Apprendre le métier.<br />Prendre sa place.</h3><p>Septembre 2026 à mai 2027 : 15 jours en entreprise et 15 jours à l’école chaque mois.</p><p><b>Juin à août 2027 :</b> 100 % en entreprise.</p><strong>856 h <small>en entreprise</small></strong></article>
          <article><span>Année 02</span><h3>Gagner en autonomie.<br />Préparer l’encadrement.</h3><p>Septembre 2027 à mai 2028 : 15 jours en entreprise et 15 jours à l’école chaque mois. Juin 2028 : examens du BTS.</p><p><b>Juillet et août 2028 :</b> 100 % en entreprise.</p><strong>706 h <small>en entreprise</small></strong></article>
        </div>
        <details className={styles.programBlock}>
          <summary><span><Icon name="briefcase" /><span><strong>Comprendre le budget employeur</strong><small>Hypothèses de rémunération et de financement</small></span></span><b aria-hidden="true">+</b></summary>
          <div className={styles.programContent}>
            <div className={styles.costHypotheses}>{btsBudgets.map((budget) => <div key={budget.name}><span>{budget.name}</span><strong>{euro(budget.yearOne)} € / mois</strong><p>En première année, puis <b>{euro(budget.yearTwo)} € / mois</b> en deuxième année.</p><p>Coût total estimé sur 2 ans, après aide : <b>{euro(budget.total)} €</b>.</p><strong>{euro(budget.hourly)} €/h</strong></div>)}</div>
            <p className={styles.disclaimer}>Simulation sur 24 mois et {euro(btsHours, 0)} h en entreprise (856 h + 706 h), avec une hypothèse d’aide de 4 500 € en première année. Les montants dépendent du profil de l’apprenti, de la rémunération et des aides applicables à la date du contrat. * Prise en charge des frais de scolarité sous réserve de l’accord de l’OPCO.</p>
          </div>
        </details>
        <div className={styles.btsAdvantages}><div><Icon name="people" /><h3>Préparer vos futurs encadrants</h3><p>Encadrement des agents, transmission des consignes, plannings, qualité des prestations et relation client : votre alternant progresse au rythme de votre entreprise.</p></div><div><Icon name="shield" /><h3>Accompagner les démarches CNAPS</h3><p>Nous suivons les démarches nécessaires à l’obtention de la carte professionnelle. Les missions de sécurité sont confiées après délivrance des autorisations requises.</p></div><div><Icon name="document" /><h3>Simplifier le recrutement</h3><p>Contrat d’apprentissage, dossier OPCO et suivi de l’alternant : notre équipe coordonne les étapes avec vous.</p></div></div>
        <div className={styles.comparisonTable} tabIndex={0} role="region" aria-label="Comparaison BTS MOS et recrutement classique">
          <table><caption>Recruter aujourd’hui. Préparer votre encadrement de demain.</caption><thead><tr><th scope="col">Votre besoin</th><th scope="col">Alternant BTS MOS</th><th scope="col">Salarié classique</th></tr></thead><tbody><tr><th scope="row">Budget horaire</th><td>Environ 10 à 13 €/h selon simulation</td><td>15 à 20 €/h ou plus, repère indicatif de la brochure</td></tr><tr><th scope="row">Formation</th><td>BTS sur 2 ans, financement OPCO sous réserve d’accord</td><td>Formation et financements à étudier séparément</td></tr><tr><th scope="row">Évolution</th><td>Parcours vers les fonctions de chef d’équipe, superviseur et exploitation</td><td>Selon l’expérience, les compétences et le parcours du salarié</td></tr><tr><th scope="row">Accompagnement</th><td>Sourcing, démarches et suivi avec Intégrale Academy</td><td>Organisation du recrutement par l’employeur</td></tr></tbody></table>
        </div>
        <div className={styles.sectionBottom}><p className={styles.disclaimer}>Un budget personnalisé est établi avec vous avant la mise en place du contrat.</p><a href="#contact-entreprises" className={styles.deviceButton}>Recruter un alternant BTS MOS <Icon name="arrow" /></a></div>
      </div>
    </section>

    <section id="accompagnement" className={styles.supportSection} aria-labelledby="support-title">
      <div className={styles.container}>
        <div className={styles.sectionHeading}><span className={styles.sectionEyebrow}>Un accompagnement de A à Z</span><h2 id="support-title">Vous vous concentrez sur le terrain.<br /><em>Nous simplifions le reste.</em></h2><p>Depuis 2020, Intégrale Academy accompagne les entreprises de sécurité privée dans le recrutement, la formation et la montée en compétences de leurs équipes.</p></div>
        <div className={styles.supportGrid}>{supportSteps.map((step) => <article key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div>
        <div className={styles.partnerCard}><div><span className={styles.ribbon}>Notre engagement</span><h3>Un partenaire.<br />Toute la filière sécurité.</h3></div><ul>{heroBenefits.map((benefit) => <li key={benefit}><Icon name="check" />{benefit}</li>)}</ul></div>
        <div className={styles.catalogHeading}><span className={styles.sectionEyebrow}>Au-delà du recrutement</span><h3>Maintenir et développer les compétences.</h3></div>
        <div className={styles.catalogGrid}>{catalog.map((item) => <article key={item.title}><Icon name={item.icon} /><h4>{item.title}</h4><p>{item.text}</p></article>)}</div>
        <div className={styles.proofBar}><span><Icon name="check" />Qualiopi</span><span><Icon name="shield" />Autorisation CNAPS</span><span>France Travail</span><span>OPCO AKTO</span><span>Côte d’Azur · Paris · Auvergne</span></div>
      </div>
    </section>

    <section id="diagnostic" className={styles.faqSection} aria-labelledby="faq-title">
      <div className={styles.container}>
        <div className={styles.faqLayout}>
          <div><div className={styles.sectionHeading}><span className={styles.sectionEyebrow}>Les réponses à vos questions</span><h2 id="faq-title">Avant de<br /><em>se lancer.</em></h2></div><div className={styles.faqList}>{faqItems.map((item) => <details key={item.question}><summary><span>{item.question}</span><b aria-hidden="true">+</b></summary><div><p>{item.answer}</p></div></details>)}</div></div>
          <aside id="brochure-entreprises" className={`${styles.diagnosticCard} ${styles.brochureCard}`} aria-labelledby="brochure-title">
            <span className={styles.ribbon}>Le dossier entreprises</span><h3 id="brochure-title">Toutes nos solutions,<br />à portée de main.</h3>
            <a href={brochureUrl} target="_blank" rel="noopener noreferrer" className={styles.brochureCover}><img src="/images/entreprises/brochure-entreprises-2026-10.webp" alt="Couverture de la brochure entreprises Intégrale Academy : recruter, former et faire évoluer vos futurs professionnels de la sécurité privée." width="1050" height="799" loading="lazy" /></a>
            <p>Les trois dispositifs, les programmes, les calendriers et les simulations pour préparer votre prochain recrutement.</p>
            <a href={brochureUrl} download="Brochure-Entreprises-Integrale-Academy.pdf" className={styles.primaryButton}>Télécharger la brochure <Icon name="document" /></a><small>PDF · 20 pages · dernière version</small>
          </aside>
        </div>
      </div>
    </section>

    <section id="contact-entreprises" className={styles.contactsSection} aria-labelledby="contacts-title">
      <div className={styles.container}>
        <div className={styles.sectionHeading}><span className={styles.sectionEyebrow}>Parlons de votre projet</span><h2 id="contacts-title">Vos prochains recrutements<br /><em>commencent ici.</em></h2><p>Besoins ponctuels ou massifs, événementiel, sites sensibles, sécurité incendie ou protection rapprochée : construisons ensemble la solution adaptée à votre entreprise.</p></div>
        <div className={styles.contactsGrid}>{contacts.map((contact) => <article key={contact.email} className={styles.contactCard}>
          <div className={styles.contactPerson}><div className={styles.contactAvatar} aria-hidden="true">{contact.initials}</div><div><h3>{contact.name}</h3><span>{contact.role}</span></div></div>
          <address className={styles.contactDetails}>
            <a href={`tel:${contact.phoneHref}`}><Icon name="phone" /><span><small>Ligne directe</small><strong>{contact.phone}</strong></span></a>
            <a href={`tel:${contact.mobileHref}`}><Icon name="phone" /><span><small>Portable</small><strong>{contact.mobile}</strong></span></a>
            <a href={`mailto:${contact.email}`}><Icon name="email" /><span><small>E-mail</small><strong>{contact.email}</strong></span></a>
          </address>
          <a href={`mailto:${contact.email}?subject=Projet%20de%20recrutement%20en%20entreprise`} className={styles.primaryButton}>Écrire à {contact.firstName} <Icon name="arrow" /></a>
        </article>)}</div>
        <div className={styles.contactFooter}><span>Premier échange gratuit et sans engagement</span><a href="tel:+33422470768">Accueil : 04 22 47 07 68</a><a href="mailto:ecole@integraleacademy.com">ecole@integraleacademy.com</a></div>
      </div>
    </section>
  </div>;
}
