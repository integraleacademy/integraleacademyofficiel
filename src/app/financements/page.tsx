import type { Metadata } from 'next';
import Link from 'next/link';
import { appointmentFormUrl } from '@/components/ui';
import styles from './financements.module.css';

export const metadata: Metadata = {
  title: 'Financer sa formation',
  description: 'CPF, France Travail, alternance, entreprise, OPCO ou financement personnel : découvrez les solutions envisageables et faites-vous accompagner par Intégrale Academy.',
};

type IconName = 'compass' | 'document' | 'follow' | 'cpf' | 'briefcase' | 'school' | 'building' | 'wallet' | 'arrow' | 'check';

function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  const common = { className, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true } as const;

  if (name === 'compass') return <svg {...common}><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8"/><path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1 5.1-2.1Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8"/></svg>;
  if (name === 'document') return <svg {...common}><path d="M7 3.5h7l3 3V20H7V3.5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8"/><path d="M14 3.5V7h3M9.5 11h5M9.5 14.5h5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8"/></svg>;
  if (name === 'follow') return <svg {...common}><path d="M5 17.5V14a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8"/><circle cx="12" cy="7" r="3" stroke="currentColor" strokeWidth="1.8"/><path d="m8.5 17 2.1 2 4.9-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"/></svg>;
  if (name === 'cpf') return <svg {...common}><path d="M4 8.5h16v10H4v-10Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8"/><path d="M7.5 8.5V6.8A2.8 2.8 0 0 1 10.3 4h3.4a2.8 2.8 0 0 1 2.8 2.8v1.7M8 13.5h8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8"/></svg>;
  if (name === 'briefcase') return <svg {...common}><rect x="3.5" y="7" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M9 7V5h6v2M3.5 11.5c4.6 2.2 12.4 2.2 17 0M10 13.5h4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8"/></svg>;
  if (name === 'school') return <svg {...common}><path d="m3 9 9-5 9 5-9 5-9-5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8"/><path d="M7 11.3V16c2.8 2.1 7.2 2.1 10 0v-4.7M20.5 10v5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8"/></svg>;
  if (name === 'building') return <svg {...common}><path d="M5 20V5h10v15M15 10h4v10M3 20h18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"/><path d="M8 8h1M11.5 8h1M8 11.5h1M11.5 11.5h1M8 15h1M11.5 15h1" stroke="currentColor" strokeLinecap="round" strokeWidth="2"/></svg>;
  if (name === 'wallet') return <svg {...common}><path d="M4 7.5h14.5A1.5 1.5 0 0 1 20 9v9H4V6a2 2 0 0 1 2-2h10v3.5" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8"/><path d="M15.5 11.5H20v3h-4.5a1.5 1.5 0 0 1 0-3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8"/></svg>;
  if (name === 'check') return <svg {...common}><path d="m5 12.5 4.2 4L19 6.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2"/></svg>;
  return <svg {...common}><path d="M5 12h13M13 7l5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9"/></svg>;
}

const supportCards: { index: string; icon: IconName; title: string; text: string }[] = [
  { index: '01', icon: 'compass', title: 'Un diagnostic personnalisé', text: 'Votre statut, votre projet et la formation visée nous permettent d’identifier les pistes de financement réellement adaptées.' },
  { index: '02', icon: 'document', title: 'Un dossier bien préparé', text: 'Nous vous aidons à réunir les informations utiles, à demander un devis et à comprendre les étapes de votre démarche.' },
  { index: '03', icon: 'follow', title: 'Un suivi humain', text: 'Vous gardez un interlocuteur pour avancer sereinement, suivre votre demande et envisager une autre solution si nécessaire.' },
];

const fundingOptions: { icon: IconName; eyebrow: string; title: string; description: string; points: string[]; href: string; cta: string; featured?: boolean }[] = [
  {
    icon: 'cpf',
    eyebrow: 'Actifs & demandeurs d’emploi',
    title: 'Compte Personnel de Formation',
    description: 'Mobilisez les droits disponibles sur votre compte lorsque la certification choisie est éligible.',
    points: ['Vérification de la formation visée', 'Lecture du reste à charge éventuel', 'Aide pour préparer votre inscription'],
    href: '/financements/cpf',
    cta: 'Découvrir le financement CPF',
    featured: true,
  },
  {
    icon: 'briefcase',
    eyebrow: 'Demandeurs d’emploi',
    title: 'France Travail',
    description: 'Votre projet peut faire l’objet d’une demande de prise en charge, selon votre situation et la validation de votre conseiller.',
    points: ['Projet professionnel argumenté', 'Devis et programme de formation', 'Décision étudiée au cas par cas'],
    href: '/financements/france-travail',
    cta: 'Préparer mon dossier France Travail',
  },
  {
    icon: 'school',
    eyebrow: 'Étudiants & reconversions',
    title: 'Alternance',
    description: 'Préparez un BTS tout en acquérant une expérience professionnelle dans le cadre d’un contrat en entreprise.',
    points: ['Formation prise en charge selon le contrat', 'Rémunération selon les règles applicables', 'Accompagnement candidat et entreprise'],
    href: '/financements/alternance',
    cta: 'Explorer l’alternance',
  },
  {
    icon: 'building',
    eyebrow: 'Salariés & employeurs',
    title: 'Entreprise & OPCO',
    description: 'Une entreprise peut financer le développement des compétences d’un salarié ou mobiliser son opérateur de compétences.',
    points: ['Besoin de formation clarifié', 'Programme et devis à transmettre', 'Prise en charge selon branche et budget'],
    href: '/entreprises',
    cta: 'Étudier un financement entreprise',
  },
];

const faqItems = [
  { question: 'Ma formation peut-elle être financée à 100 % ?', answer: 'C’est possible dans certaines situations, mais jamais automatique. Le montant dépend de la formation, de vos droits, de votre statut et de la décision du financeur. Notre équipe vérifie avec vous le reste à charge éventuel avant l’inscription.' },
  { question: 'Puis-je utiliser mon CPF pour toutes les formations ?', answer: 'Non. La formation et la certification préparée doivent être éligibles au CPF, et vos droits disponibles doivent être suffisants ou complétés par un autre financement. Nous vous aidons à vérifier la situation du parcours qui vous intéresse.' },
  { question: 'Comment demander une aide à France Travail ?', answer: 'La première étape consiste à présenter un projet professionnel cohérent à votre conseiller. Intégrale Academy peut vous transmettre le programme et le devis nécessaires à l’étude de votre demande. France Travail reste seul décisionnaire.' },
  { question: 'La formation en alternance est-elle payante pour l’étudiant ?', answer: 'Dans le cadre d’un contrat d’apprentissage ou de professionnalisation, les frais de formation sont généralement pris en charge selon les règles applicables au contrat. Les modalités sont confirmées avec l’entreprise et son OPCO.' },
  { question: 'Quels documents faut-il préparer ?', answer: 'Ils varient selon le dispositif : pièce d’identité, CV, justificatifs de situation, programme, devis ou éléments liés au contrat. Votre conseiller vous indiquera la liste utile pour éviter les démarches inutiles.' },
  { question: 'Que se passe-t-il si mon financement est refusé ?', answer: 'Un refus ne signifie pas forcément l’abandon du projet. Nous pouvons étudier avec vous une autre voie de financement, une prochaine session ou un paiement personnel échelonné, sous réserve des conditions applicables.' },
];

const nextSteps = [
  { number: '01', title: 'Choisir ma formation', text: 'Comparez les parcours et trouvez celui qui correspond à votre objectif professionnel.', href: '/#formations-securite', cta: 'Voir les formations' },
  { number: '02', title: 'Consulter les prochaines dates', text: 'Repérez une session compatible avec votre calendrier et le délai de votre financement.', href: '/planning', cta: 'Voir le planning' },
  { number: '03', title: 'Parler à un conseiller', text: 'Faites le point sur votre situation avant d’engager la moindre démarche.', href: appointmentFormUrl, cta: 'Réserver un échange' },
];

export default function FinancementsPage() {
  return <>
    <section className={styles.hero} aria-labelledby="financements-title">
      <div className={styles.heroGrid} aria-hidden="true" />
      <div className={`page-container ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Financer sa formation</span>
          <h1 id="financements-title">Votre projet mérite une <span>solution adaptée.</span></h1>
          <p>CPF, France Travail, alternance, entreprise ou financement personnel&nbsp;: nous vous aidons à comprendre vos options et à préparer la bonne démarche.</p>
          <div className={styles.heroActions}>
            <Link href="#solutions" className={styles.primaryButton}>Trouver mon financement <Icon name="arrow" /></Link>
            <Link href="#accompagnement" className={styles.secondaryButton}>Découvrir notre accompagnement</Link>
          </div>
          <div className={styles.heroNote}><span><Icon name="check" /></span>Premier échange gratuit et sans engagement</div>
        </div>

        <div className={styles.heroVisual} aria-label="Les trois étapes de votre parcours de financement">
          <span className={styles.orbOne} aria-hidden="true" />
          <span className={styles.orbTwo} aria-hidden="true" />
          <div className={styles.journeyCard}>
            <div className={styles.journeyHeader}>
              <div><span>Votre parcours</span><strong>Un financement plus lisible</strong></div>
              <span className={styles.status}><i />Accompagné</span>
            </div>
            <div className={styles.journeySteps}>
              <div className={styles.journeyStep}><span className={styles.journeyNumber}>1</span><div><strong>Votre projet</strong><small>Formation, situation, objectif</small></div><span className={styles.done}><Icon name="check" /></span></div>
              <div className={styles.journeyStep}><span className={styles.journeyNumber}>2</span><div><strong>La bonne piste</strong><small>Dispositif et reste à charge</small></div><span className={styles.activeDot} /></div>
              <div className={styles.journeyStep}><span className={styles.journeyNumber}>3</span><div><strong>Votre dossier</strong><small>Pièces, devis et prochaines étapes</small></div><span className={styles.pending}>À venir</span></div>
            </div>
            <div className={styles.journeyFooter}>
              <div className={styles.avatarStack}><span>IA</span><span>✓</span></div>
              <p><strong>Un conseiller à vos côtés</strong><small>pour ne pas avancer seul dans vos démarches</small></p>
            </div>
          </div>
        </div>
      </div>

      <div className={`page-container ${styles.heroProof}`}>
        <span><Icon name="check" />Solutions selon votre statut</span>
        <span><Icon name="check" />Démarches expliquées simplement</span>
        <span><Icon name="check" />Décision finale du financeur</span>
      </div>
    </section>

    <section id="accompagnement" className={styles.supportSection} aria-labelledby="support-title">
      <div className="page-container">
        <div className={styles.sectionIntro}>
          <div><span className={styles.sectionEyebrow}>Notre accompagnement</span><h2 id="support-title">Vous n’avez pas à devenir expert du financement.</h2></div>
          <p>Notre rôle est de rendre chaque étape plus claire, de vous orienter vers les bons interlocuteurs et de vous aider à présenter un projet solide.</p>
        </div>
        <div className={styles.supportGrid}>
          {supportCards.map((card) => <article className={styles.supportCard} key={card.title}>
            <div className={styles.cardTop}><span className={styles.iconBox}><Icon name={card.icon} /></span><span className={styles.cardIndex}>{card.index}</span></div>
            <h3>{card.title}</h3><p>{card.text}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section id="solutions" className={styles.solutionsSection} aria-labelledby="solutions-title">
      <span className={styles.solutionsGlow} aria-hidden="true" />
      <div className="page-container">
        <div className={styles.solutionsIntro}>
          <div><span className={styles.darkEyebrow}>Les dispositifs</span><h2 id="solutions-title">Une solution pour chaque situation.</h2></div>
          <p>Comparez les principales possibilités, puis laissez-nous vérifier avec vous celle qui correspond à votre parcours.</p>
        </div>

        <div className={styles.fundingGrid}>
          {fundingOptions.map((option) => <article className={`${styles.fundingCard} ${option.featured ? styles.featuredCard : ''}`} key={option.title}>
            {option.featured && <span className={styles.popularBadge}>Le plus demandé</span>}
            <div className={styles.fundingHeading}><span className={styles.fundingIcon}><Icon name={option.icon} /></span><span>{option.eyebrow}</span></div>
            <h3>{option.title}</h3><p>{option.description}</p>
            <ul>{option.points.map((point) => <li key={point}><Icon name="check" />{point}</li>)}</ul>
            <Link href={option.href}>{option.cta}<Icon name="arrow" /></Link>
          </article>)}
        </div>

        <article className={styles.personalCard}>
          <div className={styles.personalIcon}><Icon name="wallet" /></div>
          <div><span>Une alternative souple</span><h3>Financement personnel</h3><p>Si aucun dispositif ne couvre votre projet, un paiement personnel peut être envisagé. Des facilités de règlement peuvent être proposées selon la formation et les conditions applicables.</p></div>
          <Link href="/contact">Étudier cette possibilité <Icon name="arrow" /></Link>
        </article>
        <p className={styles.disclaimer}>Les prises en charge et montants indiqués sont soumis aux règles, critères et décisions propres à chaque organisme financeur.</p>
      </div>
    </section>

    <section className={styles.stepsSection} aria-labelledby="steps-title">
      <div className="page-container">
        <div className={styles.centeredIntro}><span className={styles.sectionEyebrow}>Comment ça marche ?</span><h2 id="steps-title">De votre idée à votre dossier, en 3 étapes.</h2><p>Un parcours simple pour savoir où vous allez et ce qu’il reste à faire.</p></div>
        <div className={styles.stepsGrid}>
          <article><span>01</span><div className={styles.stepIcon}><Icon name="compass" /></div><h3>Parlez-nous de votre projet</h3><p>Formation souhaitée, situation actuelle, objectifs et calendrier&nbsp;: nous commençons par l’essentiel.</p></article>
          <article><span>02</span><div className={styles.stepIcon}><Icon name="cpf" /></div><h3>Identifions les bonnes pistes</h3><p>Nous comparons avec vous les dispositifs envisageables et le reste à charge potentiel.</p></article>
          <article><span>03</span><div className={styles.stepIcon}><Icon name="document" /></div><h3>Préparez la demande</h3><p>Programme, devis et justificatifs&nbsp;: vous savez quoi transmettre et à quel interlocuteur.</p></article>
        </div>
        <div className={styles.stepsCta}>
          <div><span>Prêt à faire le point ?</span><strong>Expliquez-nous votre projet en quelques minutes.</strong></div>
          <Link href={appointmentFormUrl}>Réserver un rendez-vous <Icon name="arrow" /></Link>
        </div>
      </div>
    </section>

    <section className={styles.faqSection} aria-labelledby="faq-title">
      <div className="page-container">
        <div className={styles.faqLayout}>
          <div className={styles.faqIntro}><span className={styles.sectionEyebrow}>Questions fréquentes</span><h2 id="faq-title">Vos questions, nos réponses.</h2><p>Les règles varient selon votre situation. Voici les réponses aux questions que nos conseillers reçoivent le plus souvent.</p><Link href="/contact">Poser une autre question <Icon name="arrow" /></Link></div>
          <div className={styles.faqList}>
            {faqItems.map((item, index) => <details key={item.question}>
              <summary><span><i>{String(index + 1).padStart(2, '0')}</i>{item.question}</span><b aria-hidden="true">+</b></summary>
              <div><p>{item.answer}</p></div>
            </details>)}
          </div>
        </div>
      </div>
    </section>

    <section className={styles.nextSection} aria-labelledby="next-title">
      <div className="page-container">
        <div className={styles.centeredIntro}><span className={styles.sectionEyebrow}>Et maintenant ?</span><h2 id="next-title">Faites avancer votre projet.</h2></div>
        <div className={styles.nextGrid}>
          {nextSteps.map((step) => <Link href={step.href} className={styles.nextCard} key={step.title}>
            <span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p><strong>{step.cta}<Icon name="arrow" /></strong>
          </Link>)}
        </div>
      </div>
    </section>
  </>;
}
