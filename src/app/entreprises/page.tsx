import type { Metadata } from 'next';
import Link from 'next/link';
import { appointmentFormUrl } from '@/components/ui';
import styles from './entreprises.module.css';

export const metadata: Metadata = {
  title: 'Solutions entreprises en sécurité privée',
  description: 'Alternance sécurité, POEI et BTS MOS : Intégrale Academy accompagne les entreprises dans le recrutement, la formation et l’intégration de leurs futurs professionnels de la sécurité privée.',
};

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
    id: 'alternance', tone: 'Gold', label: 'Dispositif 1', icon: 'shield' as const,
    title: 'Parcours sécurité en alternance', value: '≈ 4 €/h', valueLabel: 'Coût employeur indicatif, charges et aides incluses',
    points: ['Parcours d’un an', 'APS + A3P + SSIAP 1', 'Environ 1 100 h réelles travaillées', 'OPCO AKTO et aides mobilisables'],
    ideal: 'Agent polyvalent, événementiel, sites sensibles et protection rapprochée.', cta: 'Voir le parcours alternance',
  },
  {
    id: 'poei', tone: 'Green', label: 'Dispositif 2', icon: 'briefcase' as const,
    title: 'POEI sécurité privée', value: '100 %', valueLabel: 'Formation pré-embauche financée, sous réserve d’accord',
    points: ['450 h de formation intensive', 'APS + SSIAP 1 et modules métier', 'Présélection des candidats', 'CDD de 6 mois minimum à l’issue'],
    ideal: 'Recrutement rapide, besoins massifs et agents formés avant la prise de poste.', cta: 'Découvrir la POEI',
  },
  {
    id: 'bts-mos', tone: 'Sand', label: 'Dispositif 3', icon: 'school' as const,
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
  { question: 'Les coûts annoncés sont-ils garantis ?', answer: 'Non. Ils constituent des estimations établies à partir des hypothèses du support entreprise. Le coût final dépend notamment de la rémunération, des aides en vigueur, de l’âge du candidat et des règles de prise en charge applicables au moment du contrat.' },
  { question: 'Pouvez-vous recruter plusieurs candidats ?', answer: 'Oui. Nous pouvons organiser un sourcing individuel ou collectif, présélectionner les candidats et mettre en place des réunions d’information selon vos volumes et vos contraintes opérationnelles.' },
  { question: 'Qui gère les contrats et les financeurs ?', answer: 'Intégrale Academy vous accompagne pour le montage administratif, les relations avec l’OPCO ou France Travail, les contrats et le suivi des autorisations CNAPS. Chaque prise en charge reste soumise à la décision du financeur concerné.' },
  { question: 'Intervenez-vous hors de la Côte d’Azur ?', answer: 'Nous étudions chaque projet selon le lieu, le nombre de recrutements et les modalités pédagogiques possibles. Un premier échange permet de confirmer rapidement la faisabilité et l’organisation à prévoir.' },
];

export default function EntreprisesPage() {
  return <>
    <section className={styles.hero} aria-labelledby="entreprises-title">
      <div className={styles.heroGrid} aria-hidden="true" />
      <span className={styles.heroOrb} aria-hidden="true" />
      <div className={`page-container ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Espace entreprises</span>
          <h1 id="entreprises-title">Recrutez, formez et <span>fidélisez</span> vos futurs professionnels de la sécurité.</h1>
          <p>Alternance sécurité, POEI ou BTS MOS&nbsp;: trois solutions clés en main pour renforcer vos équipes tout en maîtrisant vos coûts.</p>
          <div className={styles.heroActions}>
            <Link href="#diagnostic" className={styles.primaryButton}>Étudier mon besoin <Icon name="arrow" /></Link>
            <Link href="#solutions" className={styles.secondaryButton}>Voir les 3 solutions <Icon name="arrow" /></Link>
          </div>
          <div className={styles.heroTags} aria-label="Services inclus"><span>Sourcing candidats</span><span>Gestion OPCO</span><span>Suivi CNAPS</span></div>
        </div>

        <aside className={styles.partnerCard} aria-label="Pourquoi choisir Intégrale Academy">
          <span className={styles.partnerBadge}>Partenaire RH</span>
          <h2>Pourquoi choisir Intégrale Academy&nbsp;?</h2>
          <ul>{heroBenefits.map((benefit) => <li key={benefit}><span><Icon name="check" /></span>{benefit}</li>)}</ul>
        </aside>
      </div>

      <div className={`page-container ${styles.heroStats}`}>
        <div><strong>+1 150</strong><span>stagiaires formés en 5 ans</span></div>
        <div><strong>3</strong><span>dispositifs employeurs</span></div>
        <div><strong>12 max.</strong><span>stagiaires par session POEI</span></div>
        <div><strong>Qualiopi</strong><span>et autorisation CNAPS</span></div>
      </div>
    </section>

    <section className={styles.challengesSection} aria-labelledby="challenges-title">
      <div className="page-container">
        <div className={styles.sectionHeading}><span className={styles.sectionEyebrow}>Vos enjeux RH</span><h2 id="challenges-title">Des difficultés concrètes. <span>Trois réponses immédiates.</span></h2></div>
        <div className={styles.challengesGrid}>
          {challenges.map((challenge) => <article key={challenge.title} className={styles.challengeCard}>
            <span className={styles.cardNumber}>{challenge.number}</span><span className={styles.challengeIcon}><Icon name={challenge.icon} /></span><h3>{challenge.title}</h3><p>{challenge.text}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section id="solutions" className={styles.solutionsSection} aria-labelledby="solutions-title">
      <span className={styles.solutionsGlow} aria-hidden="true" />
      <div className="page-container">
        <div className={styles.darkHeading}><span className={styles.darkEyebrow}>Les solutions</span><h2 id="solutions-title">Trois dispositifs. Un même objectif&nbsp;: <span>des équipes opérationnelles.</span></h2><p>Choisissez la réponse adaptée à votre urgence, à votre volume de recrutement et au niveau de qualification recherché.</p></div>
        <div className={styles.solutionsGrid}>
          {solutions.map((solution) => <article key={solution.id} className={`${styles.solutionCard} ${styles[`solution${solution.tone}`]}`}>
            <div className={styles.solutionTop}><span className={styles.solutionIcon}><Icon name={solution.icon} /></span><span className={styles.solutionLabel}>{solution.label}</span></div>
            <h3>{solution.title}</h3><strong className={styles.solutionValue}>{solution.value}</strong><p className={styles.solutionValueLabel}>{solution.valueLabel}</p>
            <ul>{solution.points.map((point) => <li key={point}><Icon name="check" />{point}</li>)}</ul>
            <div className={styles.idealBox}><span>Idéal pour</span><p>{solution.ideal}</p></div>
            <Link href={`#${solution.id}`}>{solution.cta}<Icon name="arrow" /></Link>
          </article>)}
        </div>
        <p className={styles.darkDisclaimer}>Les coûts et prises en charge sont indicatifs et restent à confirmer selon la situation du candidat, les aides en vigueur et la décision du financeur.</p>
      </div>
    </section>

    <section id="alternance" className={styles.alternanceSection} aria-labelledby="alternance-title">
      <div className="page-container">
        <div className={styles.detailHero}>
          <div className={styles.detailCopy}><span className={styles.sectionEyebrow}>Dispositif 1 · Alternance</span><h2 id="alternance-title">Un agent multi-qualifié, <span>près de 1 100 h réelles</span> au cœur de votre entreprise.</h2><p>Un parcours d’un an pour former un professionnel polyvalent, obtenir trois qualifications clés et renforcer durablement vos équipes.</p></div>
          <div className={styles.costPanel}><span>Coût employeur indicatif</span><strong>≈ 4 € / heure</strong><p>Charges incluses, après aides, selon les hypothèses du support entreprise.</p></div>
        </div>

        <div className={styles.qualificationGrid}>
          <article><span><Icon name="shield" /></span><div><strong>TFP APS</strong><small>175 h · carte professionnelle</small></div></article>
          <article><span><Icon name="people" /></span><div><strong>TFP A3P</strong><small>328 h · protection rapprochée</small></div></article>
          <article><span><Icon name="fire" /></span><div><strong>SSIAP 1</strong><small>Sécurité incendie et examen</small></div></article>
          <article><span><Icon name="briefcase" /></span><div><strong>≈ 1 100 h réelles</strong><small>Heures effectivement travaillées</small></div></article>
        </div>

        <div className={styles.timelineHeading}><span>Un calendrier progressif</span><h3>La qualification avance au rythme de l’intégration en entreprise.</h3></div>
        <ol className={styles.timeline}>{alternanceTimeline.map((step) => <li key={step.number}><span className={styles.timelineDot}>{step.number}</span><div><small>{step.date}</small><strong>{step.title}</strong><p>{step.detail}</p></div></li>)}</ol>
        <div className={styles.alternanceStats}><div><strong>1 246 h</strong><span>d’immersion · session 1</span></div><div><strong>1 106 h</strong><span>réelles travaillées · session 1</span></div><div><strong>3</strong><span>qualifications clés</span></div><div><strong>2</strong><span>rentrées annoncées en 2027</span></div></div>
        <div className={styles.sessionNote}><Icon name="calendar" /><p><strong>Deux calendriers annoncés&nbsp;:</strong> janvier à décembre 2027 et juin 2027 à juin 2028. Selon la session, le volume est de 1 099 à 1 106 heures réellement travaillées.</p></div>
      </div>
    </section>

    <section id="poei" className={styles.poeiSection} aria-labelledby="poei-title">
      <span className={styles.poeiOrb} aria-hidden="true" />
      <div className="page-container">
        <div className={styles.poeiHero}>
          <div><span className={styles.greenEyebrow}>Dispositif 2 · POEI</span><h2 id="poei-title">Recrutez d’abord. <span>Formez avant la prise de poste.</span></h2><p>La Préparation Opérationnelle à l’Emploi Individuelle forme des demandeurs d’emploi selon vos besoins, avant une embauche de 6 mois minimum.</p></div>
          <aside className={styles.employerJourney}><span>Votre parcours employeur</span><ul><li><Icon name="check" />Besoin et profils définis</li><li><Icon name="check" />Candidats présélectionnés</li><li><Icon name="check" />Formation avant embauche</li><li><Icon name="check" />Intégration accompagnée</li></ul></aside>
        </div>
        <div className={styles.poeiMetrics}><div><strong>100 %</strong><span>formation financée*</span></div><div><strong>450 h</strong><span>parcours intensif</span></div><div><strong>6 mois</strong><span>engagement d’embauche</span></div><div><strong>12</strong><span>places maximum</span></div></div>

        <div className={styles.programBlock}>
          <div className={styles.programHeading}><span>Programme POEI · 450 heures</span><h3>Un socle complet pour des agents directement employables.</h3><p>Les dix séquences ci-dessous représentent exactement les 450 heures annoncées dans le support entreprise.</p></div>
          <div className={styles.programGrid}>{poeiProgram.map((module) => <article key={module.title}><div><span><Icon name={module.icon} /></span><strong>{module.hours}</strong></div><h4>{module.title}</h4><p>{module.text}</p></article>)}</div>
          <div className={styles.sessionsBar}><span>Sessions annoncées</span><strong>21 sept. – 22 déc. 2026</strong><strong>11 jan. – 12 avr. 2027</strong><strong>21 sept. – 21 déc. 2027</strong><Link href="#diagnostic">Étudier une POEI <Icon name="arrow" /></Link></div>
          <p className={styles.poeiDisclaimer}>* Financement intégral sous réserve de validation et des règles du financeur. L’employeur s’engage à recruter le candidat pour une durée minimale de 6 mois à l’issue du parcours.</p>
        </div>
      </div>
    </section>

    <section id="bts-mos" className={styles.btsSection} aria-labelledby="bts-title">
      <div className="page-container">
        <div className={styles.btsHero}>
          <div><span className={styles.darkEyebrow}>Dispositif 3 · BTS MOS</span><h2 id="bts-title">Préparez votre prochain <span>chef d’équipe.</span></h2><p>Deux ans pour former un futur encadrant, avec une présence longue et structurée en entreprise.</p></div>
          <div className={styles.btsCost}><span>Coût horaire moyen estimé</span><strong>10,27 à 13,07 € / h</strong><p>Selon les deux hypothèses de rémunération présentées dans le support.</p></div>
        </div>
        <div className={styles.btsMetrics}><div><strong>1 564 h</strong><span>présence en entreprise sur 2 ans</span></div><div><strong>15 j/mois</strong><span>rythme entreprise / école</span></div><div><strong>100 %</strong><span>entreprise pendant les étés</span></div><div><strong>0 €</strong><span>reste à charge scolarité indiqué</span></div></div>

        <div className={styles.yearsBlock}>
          <div className={styles.yearsHeading}><span>Un rythme lisible sur deux ans</span><h3>Une présence régulière, renforcée pendant les périodes estivales.</h3></div>
          <div className={styles.yearsGrid}>
            <article><span>Année 1</span><strong>Sept. 2026 – mai 2027</strong><p>15 jours en entreprise et 15 jours à l’école chaque mois.</p><p>Juin à août 2027&nbsp;: 100 % en entreprise.</p><b>858 h en entreprise</b></article>
            <article><span>Année 2</span><strong>Sept. 2027 – août 2028</strong><p>15 jours en entreprise et 15 jours à l’école chaque mois.</p><p>Juillet et août 2028&nbsp;: 100 % en entreprise, après les examens de juin.</p><b>706 h en entreprise</b></article>
          </div>
        </div>

        <div className={styles.btsBottomGrid}>
          <article className={styles.futureProfiles}><span>Ce que vous préparez</span><h3>Votre futur encadrement sécurité</h3><ul><li><Icon name="check" />Futur chef d’équipe</li><li><Icon name="check" />Futur superviseur</li><li><Icon name="check" />Futur responsable d’exploitation</li><li><Icon name="check" />Carte professionnelle CNAPS obtenue</li><li><Icon name="check" />Formation BTS financée par OPCO AKTO</li></ul></article>
          <article className={styles.comparisonCard}>
            <div className={styles.comparisonHead}><strong>Alternant BTS MOS</strong><strong>Salarié classique</strong></div>
            <div><span><Icon name="check" />10 à 13 €/h</span><span>15 à 20 €/h ou plus</span></div>
            <div><span><Icon name="check" />4 500 € d’aide indiquée en année 1</span><span>Pas d’aide équivalente</span></div>
            <div><span><Icon name="check" />Formation et carte CNAPS incluses</span><span>Formation à financer séparément</span></div>
            <div><span><Icon name="check" />Évolution vers l’encadrement</span><span>Évolution non intégrée au recrutement</span></div>
          </article>
        </div>
        <div className={styles.costHypotheses}><div><span>Hypothèse basse</span><strong>783,90 €/mois en 1re année</strong><p>929,75 €/mois en 2e année · 16 063 € au total après l’aide indiquée.</p></div><div><span>Hypothèse haute</span><strong>966,21 €/mois en 1re année</strong><p>1 112,05 €/mois en 2e année · 20 439 € au total après l’aide indiquée.</p></div><p>Estimations du support transmis, à confirmer lors de l’étude employeur selon la rémunération, les aides et les règles applicables.</p></div>
      </div>
    </section>

    <section className={styles.supportSection} aria-labelledby="support-title">
      <div className="page-container">
        <div className={styles.sectionHeading}><span className={styles.sectionEyebrow}>Notre accompagnement</span><h2 id="support-title">Un seul interlocuteur, <span>de votre besoin à l’intégration.</span></h2><p>Nous simplifions le recrutement, la formation et l’administratif pour que vos équipes restent concentrées sur l’opérationnel.</p></div>
        <div className={styles.supportGrid}>{supportSteps.map((step) => <article key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div>
        <div className={styles.catalogHeading}><span>Catalogue sécurité entreprises</span><h3>Des formations pour recruter, maintenir et développer les compétences.</h3></div>
        <div className={styles.catalogGrid}>{catalog.map((item) => <article key={item.title}><span><Icon name={item.icon} /></span><h4>{item.title}</h4><p>{item.text}</p></article>)}</div>
        <div className={styles.proofBar}><span>Qualiopi</span><span>Autorisation CNAPS</span><span>France Travail</span><span>OPCO AKTO</span><span>3 implantations</span></div>
      </div>
    </section>

    <section id="diagnostic" className={styles.faqSection} aria-labelledby="faq-title">
      <div className="page-container">
        <div className={styles.faqLayout}>
          <div>
            <div className={styles.sectionHeading}><span className={styles.sectionEyebrow}>Questions fréquentes</span><h2 id="faq-title">Tout ce qu’il faut savoir <span>avant de recruter.</span></h2><p>Les règles varient selon le dispositif et la situation du candidat. Voici les réponses essentielles avant d’avancer.</p></div>
            <div className={styles.faqList}>{faqItems.map((item, index) => <details key={item.question}><summary><span><i>{String(index + 1).padStart(2, '0')}</i>{item.question}</span><b aria-hidden="true">+</b></summary><div><p>{item.answer}</p></div></details>)}</div>
          </div>
          <aside className={styles.diagnosticCard}>
            <span className={styles.diagnosticEyebrow}>Votre prochaine étape</span><h3>Un diagnostic employeur en 30 minutes.</h3><p>Expliquez-nous vos volumes, vos missions et votre calendrier. Nous vous orientons vers le dispositif le plus pertinent.</p>
            <div className={styles.diagnosticActions}><a href={appointmentFormUrl}>Planifier un échange <Icon name="arrow" /></a><Link href="tel:0422470768"><Icon name="phone" />04 22 47 07 68</Link></div>
            <div className={styles.afterRequest}><span>Après votre demande</span><ol><li><b>01</b><strong>Diagnostic</strong><small>Besoin, volumes et calendrier.</small></li><li><b>02</b><strong>Proposition</strong><small>Dispositif, chiffrage et planning.</small></li><li><b>03</b><strong>Candidats</strong><small>Sourcing et premières rencontres.</small></li></ol></div>
          </aside>
        </div>

        <div className={styles.contactBand}>
          <div><span>Besoin ponctuel ou massif</span><h3>Parlons de vos prochains <b>recrutements.</b></h3><p>Cassandre et notre équipe construisent avec vous la solution la plus simple à déployer.</p></div>
          <div className={styles.contactPerson}><span>CM</span><div><small>Cassandre</small><strong>Responsable commerciale</strong><p>Premier échange gratuit et sans engagement</p></div></div>
          <a href={appointmentFormUrl}>Demander une étude <Icon name="arrow" /></a>
        </div>
      </div>
    </section>
  </>;
}
