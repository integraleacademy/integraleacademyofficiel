import { createPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import Link from 'next/link';
import localFont from 'next/font/local';
import { appointmentFormUrl } from '@/components/ui';
import styles from './entreprises.module.css';

const displayFont = localFont({ src: '../../../public/fonts/entreprises/PassionOne-Bold.woff2', weight: '700', display: 'swap', variable: '--business-display' });

const bodyFont = localFont({
  src: [
    { path: '../../../public/fonts/entreprises/Poppins-Regular.woff2', weight: '400' },
    { path: '../../../public/fonts/entreprises/Poppins-Medium.woff2', weight: '500' },
    { path: '../../../public/fonts/entreprises/Poppins-SemiBold.woff2', weight: '600' },
    { path: '../../../public/fonts/entreprises/Poppins-Bold.woff2', weight: '700' },
  ],
  display: 'swap', variable: '--business-body',
});

export const metadata: Metadata = createPageMetadata('/entreprises');

type IconName = 'arrow' | 'check' | 'people' | 'target' | 'shield' | 'briefcase' | 'school' | 'fire' | 'calendar' | 'document' | 'drone' | 'camera' | 'phone';

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
    id: 'poei', tone: 'Coral', label: 'Dispositif 02', icon: 'briefcase' as const,
    title: 'POEI sécurité privée', value: '100 %', valueLabel: 'Formation pré-embauche financée, sous réserve d’accord',
    points: ['450 h de formation intensive', 'APS + SSIAP 1 et modules métier', 'Présélection des candidats', 'CDD de 6 mois minimum à l’issue'],
    ideal: 'Recrutement rapide, besoins massifs et agents formés avant la prise de poste.', cta: 'Découvrir la POEI',
  },
  {
    id: 'bts-mos', tone: 'Gold', label: 'Dispositif 03', icon: 'school' as const,
    title: 'BTS Management opérationnel de la sécurité', value: '1 564 h', valueLabel: 'Présence réelle en entreprise sur deux ans',
    points: ['15 jours entreprise / 15 jours école', '100 % entreprise pendant les étés', 'Formation financée par OPCO AKTO', 'Futur chef d’équipe ou superviseur'],
    ideal: 'Encadrement, exploitation, évolution interne et préparation de vos futurs managers.', cta: 'Explorer le BTS MOS',
  },
] as const;

const alternanceTimeline = [
  { number: '01', date: 'Jan. – fév.', title: 'Formation APS', detail: '175 h' },
  { number: '02', date: 'Mars – juin', title: 'Entreprise', detail: '588 h d’immersion' },
  { number: '03', date: 'Juin – juil.', title: 'Formation A3P', detail: '328 h' },
  { number: '04', date: 'Juil. – déc.', title: 'Entreprise', detail: '658 h d’immersion' },
  { number: '05', date: 'Décembre', title: 'SSIAP 1', detail: 'Formation et examen' },
];

const poeiProgram = [
  { title: 'Accueil & intégration', hours: '7 h', icon: 'people' as const, text: 'Posture professionnelle, règles métier et découverte du secteur.' },
  { title: 'TFP APS', hours: '175 h', icon: 'shield' as const, text: 'Titre Agent de prévention et de sécurité et préparation à la certification.' },
  { title: 'Examen TFP APS', hours: '7 h', icon: 'document' as const, text: 'Épreuve de certification du titre à finalité professionnelle.' },
  { title: 'SSIAP 1', hours: '70 h', icon: 'fire' as const, text: 'Sécurité incendie en ERP et IGH, évacuation et premiers secours.' },
  { title: 'Examen SSIAP 1', hours: '7 h', icon: 'document' as const, text: 'Épreuve de certification Agent de sécurité incendie.' },
  { title: 'Sécurité événementielle', hours: '42 h', icon: 'people' as const, text: 'Gestion de foule, filtrage, événements sportifs et risques spécifiques.' },
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
  return <div className={`${styles.page} ${displayFont.variable} ${bodyFont.variable}`}>
    <section className={styles.hero} aria-labelledby="entreprises-title">
      <div className={styles.honeycomb} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}><span /> Solutions entreprises · Sécurité privée</span>
            <h1 id="entreprises-title">Recruter, former<br />et faire évoluer<br />vos futurs professionnels<br />de la <em>sécurité privée.</em></h1>
            <p>Des solutions clés en main pour renforcer vos équipes. Nous trouvons les candidats, nous les formons, nous vous accompagnons.</p>
            <div className={styles.heroActions}>
              <Link href="#solutions" className={styles.primaryButton}>Découvrir les 3 solutions <Icon name="arrow" /></Link>
              <a href={appointmentFormUrl} className={styles.secondaryButton}>Parlons de vos besoins <Icon name="arrow" /></a>
            </div>
            <div className={styles.heroTags}><span><Icon name="check" />Sourcing candidats</span><span><Icon name="check" />Gestion administrative</span><span><Icon name="check" />Suivi CNAPS</span></div>
          </div>
          <div className={styles.heroVisual}>
            <span className={styles.visualCircle} aria-hidden="true" />
            <span className={styles.visualLabel}>Votre recrutement,<br /><b>clés en main.</b></span>
            <img className={styles.lockImage} src="/images/entreprises/cle-securite.webp" alt="" width="858" height="957" fetchPriority="high" />
            <div className={styles.visualCard}><span><Icon name="shield" /></span><div><strong>Un seul partenaire.</strong><p>Du premier candidat<br />à la prise de poste.</p></div></div>
            <span className={styles.visualFootnote}>INTÉGRALE ACADEMY · DEPUIS 2020</span>
          </div>
        </div>
        <div className={styles.heroStats}>
          <div><strong>+1 150</strong><span>stagiaires formés en 5 ans</span></div>
          <div><strong>3 dispositifs</strong><span>pour vos besoins de recrutement</span></div>
          <div><strong>12 max.</strong><span>stagiaires par session POEI</span></div>
          <div><strong>Qualiopi</strong><span>organisme certifié</span></div>
        </div>
      </div>
    </section>

    <nav className={styles.sectionNav} aria-label="Les solutions entreprises">
      <div className={styles.container}>
        <Link href="#alternance"><i className={styles.dotCyan} />Alternance sécurité</Link>
        <Link href="#poei"><i className={styles.dotCoral} />POEI</Link>
        <Link href="#bts-mos"><i className={styles.dotGold} />BTS MOS</Link>
        <Link href="#accompagnement">Notre accompagnement</Link>
        <Link href="#diagnostic">Votre projet <Icon name="arrow" /></Link>
      </div>
    </nav>

    <section className={styles.challengesSection} aria-labelledby="challenges-title">
      <div className={styles.container}>
        <div className={styles.sectionHeading}><span className={styles.sectionEyebrow}>Vos enjeux, notre mission</span><h2 id="challenges-title">Des problématiques concrètes.<br /><em>Des solutions immédiates.</em></h2><p>Recrutement difficile, turn-over, manque de profils qualifiés… Construisons ensemble une équipe qui répond aux réalités de votre terrain.</p></div>
        <div className={styles.challengesGrid}>{challenges.map((challenge) => <article key={challenge.title} className={styles.challengeCard}>
          <span className={styles.challengeIcon}><Icon name={challenge.icon} /></span><div><h3>{challenge.title}</h3><p>{challenge.text}</p></div>
        </article>)}</div>
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
          <div className={styles.detailCopy}><h2 id="alternance-title"><em>Parcours sécurité</em><br />en alternance.</h2><p>Un an pour former un agent polyvalent et immédiatement opérationnel, en combinant APS, protection rapprochée et sécurité incendie.</p><div className={styles.pillList}><span>1 an</span><span>3 qualifications</span><span>OPCO AKTO</span></div></div>
          <div className={styles.costPanel}><span>Près de 1 100 h réelles en entreprise</span><strong>≈ 4 €<small>/ heure</small></strong><p>Coût employeur indicatif, charges incluses et après aides.</p><span className={styles.costCaption}>Un chiffrage personnalisé pour votre entreprise.</span></div>
        </div>
        <div className={styles.qualificationGrid}>
          <article><span className={styles.apsIcon}><Icon name="shield" /></span><div><strong>Agent de prévention et de sécurité</strong><small>TFP APS · 175 h</small></div></article>
          <article><span className={styles.a3pIcon}><Icon name="people" /></span><div><strong>Protection physique des personnes</strong><small>TFP A3P · 328 h</small></div></article>
          <article><span className={styles.fireIcon}><Icon name="fire" /></span><div><strong>Agent de sécurité incendie</strong><small>SSIAP 1 · Formation et examen</small></div></article>
        </div>
        <div className={styles.timelineHeading}><span className={styles.ribbon}>Le calendrier</span><h3>La formation. Le terrain. La montée en compétences.</h3><p>Session de janvier à décembre 2027</p></div>
        <ol className={styles.timeline}>{alternanceTimeline.map((step) => <li key={step.number}><span className={styles.timelineDot}>{step.number}</span><div><small>{step.date}</small><strong>{step.title}</strong><p>{step.detail}</p></div></li>)}</ol>
        <div className={styles.alternanceStats}><div><strong>1 246 h</strong><span>d’immersion · session 1</span></div><div><strong>1 106 h</strong><span>réelles travaillées · session 1</span></div><div><strong>2 rentrées</strong><span>annoncées en 2027</span></div></div>
        <div className={styles.sessionNote}><Icon name="calendar" /><p><strong>Deux calendriers pour votre recrutement.</strong> Janvier à décembre 2027 ou juin 2027 à juin 2028. Selon la session : 1 099 à 1 106 heures réellement travaillées.</p><a href={appointmentFormUrl}>Étudier mon recrutement <Icon name="arrow" /></a></div>
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
        <details className={styles.programBlock}>
          <summary><span><Icon name="document" /><span><strong>Le programme complet</strong><small>10 modules · 450 heures de formation</small></span></span><b aria-hidden="true">+</b></summary>
          <div className={styles.programContent}><p>Un socle complet pour des agents directement employables, de la posture professionnelle aux techniques de sécurité.</p><div className={styles.programGrid}>{poeiProgram.map((module) => <article key={module.title}><div><Icon name={module.icon} /><strong>{module.hours}</strong></div><h4>{module.title}</h4><p>{module.text}</p></article>)}</div></div>
        </details>
        <div className={styles.sessionsBar}><span><Icon name="calendar" />Les sessions</span><strong>21 sept. – 22 déc. 2026</strong><strong>11 jan. – 12 avr. 2027</strong><strong>21 sept. – 22 déc. 2027</strong></div>
        <div className={styles.sectionBottom}><p className={styles.disclaimer}>* Financement intégral sous réserve de validation et des règles du financeur. L’employeur s’engage à recruter le candidat pour une durée minimale de 6 mois à l’issue du parcours.</p><a href={appointmentFormUrl} className={styles.deviceButton}>Étudier une POEI <Icon name="arrow" /></a></div>
      </div>
    </section>

    <section id="bts-mos" className={`${styles.deviceSection} ${styles.btsSection}`} aria-labelledby="bts-title">
      <div className={styles.honeycomb} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.deviceHeading}><span>Dispositif 03 / 03</span><span>Accompagner & faire évoluer</span></div>
        <div className={styles.detailHero}>
          <div className={styles.detailCopy}><h2 id="bts-title">Vos futurs chefs d’équipe.<br /><em>Le BTS MOS.</em></h2><p>Deux ans pour former votre prochain encadrant en Management opérationnel de la sécurité, avec une présence longue et structurée dans votre entreprise.</p><div className={styles.pillList}><span>Chef d’équipe</span><span>Superviseur</span><span>Responsable d’exploitation</span></div></div>
          <div className={styles.costPanel}><span>Coût horaire moyen estimé</span><strong className={styles.btsCostFigure}>10,27 à 13,07 €<small>/ heure</small></strong><p>Selon la rémunération du candidat et les aides mobilisées.</p></div>
        </div>
        <div className={styles.btsMetrics}><div><strong>1 564 h</strong><span>en entreprise sur 2 ans</span></div><div><strong>15 j / 15 j</strong><span>entreprise et école</span></div><div><strong>100 %</strong><span>en entreprise pendant les étés</span></div><div><strong>OPCO AKTO</strong><span>financement de la formation</span></div></div>
        <div className={styles.yearsGrid}>
          <article><span>Année 01</span><h3>Apprendre le métier.<br />Prendre sa place.</h3><p>Septembre 2026 à mai 2027 : 15 jours en entreprise et 15 jours à l’école chaque mois.</p><p><b>Juin à août 2027 :</b> 100 % en entreprise.</p><strong>858 h <small>en entreprise</small></strong></article>
          <article><span>Année 02</span><h3>Gagner en autonomie.<br />Préparer l’encadrement.</h3><p>Septembre 2027 à août 2028 : alternance école et entreprise, puis examens en juin.</p><p><b>Juillet et août 2028 :</b> 100 % en entreprise.</p><strong>706 h <small>en entreprise</small></strong></article>
        </div>
        <details className={styles.programBlock}>
          <summary><span><Icon name="briefcase" /><span><strong>Comprendre le budget employeur</strong><small>Hypothèses de rémunération et de financement</small></span></span><b aria-hidden="true">+</b></summary>
          <div className={styles.programContent}><div className={styles.costHypotheses}><div><span>Hypothèse basse</span><strong>783,90 € / mois</strong><p>En première année, puis 929,75 € / mois en deuxième année. Estimation totale après l’aide indiquée : 16 063 €.</p></div><div><span>Hypothèse haute</span><strong>966,21 € / mois</strong><p>En première année, puis 1 112,05 € / mois en deuxième année. Estimation totale après l’aide indiquée : 20 439 €.</p></div></div><p className={styles.disclaimer}>Ces estimations intègrent une hypothèse d’aide de 4 500 € en première année. Elles doivent être confirmées lors de l’étude employeur selon la rémunération, les aides en vigueur et les règles applicables.</p></div>
        </details>
        <div className={styles.sectionBottom}><p className={styles.disclaimer}>Un budget personnalisé est établi avec vous avant la mise en place du contrat.</p><a href={appointmentFormUrl} className={styles.deviceButton}>Recruter un alternant BTS MOS <Icon name="arrow" /></a></div>
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
          <aside className={styles.diagnosticCard}>
            <span className={styles.ribbon}>Parlons de votre projet</span><h3>Vos prochains<br />recrutements<br />commencent ici.</h3><p>Vos missions, vos volumes, votre calendrier : construisons ensemble la solution adaptée à votre entreprise.</p>
            <div className={styles.contactPerson}><img src="/images/cassandre-memoji.png" alt="" width="80" height="80" loading="lazy" /><div><strong>Cassandre</strong><span>Responsable commerciale</span></div></div>
            <a href={appointmentFormUrl} className={styles.primaryButton}>Demander une étude <Icon name="arrow" /></a><a href="tel:0422470768" className={styles.phoneLink}><Icon name="phone" />04 22 47 07 68</a><small>Premier échange gratuit et sans engagement</small>
          </aside>
        </div>
      </div>
    </section>
  </div>;
}
