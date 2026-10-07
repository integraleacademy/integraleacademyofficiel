import { createPageMetadata } from '@/lib/seo';
import FinancingSimulator from '@/components/FinancingSimulator';
import type { Metadata } from 'next';
import Link from 'next/link';
import { appointmentFormUrl } from '@/components/ui';
import FundingProfileChooser from './FundingProfileChooser';
import styles from './financements.module.css';

export const metadata: Metadata = createPageMetadata('/financements');

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

const fundingOptions: { icon: IconName; audience: string; title: string; description: string; href: string; cta: string; logo?: { src: string; alt: string } }[] = [
  { icon: 'cpf', logo: { src: '/images/mon-compte-formation.svg', alt: 'Mon Compte Formation (CPF)' }, audience: 'Vos droits à la formation', title: 'Le CPF', description: 'Utilisez vos droits disponibles pour une formation éligible. Nous vous aidons à vérifier les possibilités et le reste à charge.', href: '/financements/cpf', cta: 'Comprendre le CPF' },
  { icon: 'briefcase', logo: { src: '/images/financements/france-travail.svg', alt: 'France Travail' }, audience: 'Demandeurs d’emploi', title: 'France Travail', description: 'Présentez votre projet à votre conseiller. Le programme et le devis permettent d’étudier une éventuelle prise en charge.', href: '/financements/france-travail', cta: 'Préparer ma demande' },
  { icon: 'school', audience: 'Un BTS, une expérience en entreprise', title: 'L’alternance', description: 'Associez formation et emploi, avec une prise en charge liée à votre contrat et une rémunération selon les règles applicables.', href: '/financements/alternance', cta: 'Découvrir l’alternance' },
  { icon: 'building', logo: { src: '/images/financements/akto.svg', alt: 'AKTO, opérateur de compétences' }, audience: 'Salariés & employeurs', title: 'Entreprise & OPCO', description: 'Construisez votre projet avec votre employeur. AKTO ou votre OPCO peut étudier une prise en charge selon votre branche et les critères applicables.', href: '/entreprises', cta: 'Étudier cette solution' },
];

const faqItems = [
  { question: 'Ma formation peut-elle être financée à 100 % ?', answer: 'C’est possible dans certaines situations, mais jamais automatique. Le montant dépend de la formation, de vos droits, de votre statut et de la décision du financeur. Notre équipe vérifie avec vous le reste à charge éventuel avant l’inscription.' },
  { question: 'Puis-je utiliser mon CPF pour toutes les formations ?', answer: 'Non. La formation et la certification préparée doivent être éligibles au CPF, et vos droits disponibles doivent être suffisants ou complétés par un autre financement. Nous vous aidons à vérifier la situation du parcours qui vous intéresse.' },
  { question: 'Comment demander une aide à France Travail ?', answer: 'La première étape consiste à présenter un projet professionnel cohérent à votre conseiller. Intégrale Academy peut vous transmettre le programme et le devis nécessaires à l’étude de votre demande. France Travail reste seul décisionnaire.' },
  { question: 'La formation en alternance est-elle payante pour l’étudiant ?', answer: 'Dans le cadre d’un contrat d’apprentissage ou de professionnalisation, les frais de formation sont généralement pris en charge selon les règles applicables au contrat. Les modalités sont confirmées avec l’entreprise et son OPCO.' },
  { question: 'Quels documents faut-il préparer ?', answer: 'Ils varient selon le dispositif : pièce d’identité, CV, justificatifs de situation, programme, devis ou éléments liés au contrat. Votre conseiller vous indiquera la liste utile pour éviter les démarches inutiles.' },
  { question: 'Que se passe-t-il si mon financement est refusé ?', answer: 'Un refus ne signifie pas forcément l’abandon du projet. Nous pouvons étudier avec vous une autre voie de financement, une prochaine session ou un paiement personnel échelonné, sous réserve des conditions applicables.' },
];

export default function FinancementsPage() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="financements-title">
      <div className={styles.container}>
        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}><span aria-hidden="true" /> Votre projet commence ici</span>
            <h1 id="financements-title">Trouvez comment <span><em>financer</em> votre formation.</span></h1>
            <p>À chaque parcours, ses possibilités. Identifiez les vôtres et avancez avec un conseiller à vos côtés.</p>
            <div className={styles.heroActions}>
              <Link href="#simulateur" className={styles.primaryButton}>Estimer mon reste à charge <Icon name="arrow" /></Link>
              <Link href="#solutions" className={styles.textLink}>Voir les financements <span aria-hidden="true">↓</span></Link>
            </div>
            <p className={styles.heroNote}><Icon name="check" /> Premier échange gratuit et sans engagement</p>
          </div>
          <FundingProfileChooser />
        </div>
        <div className={styles.proofBar}>
          <a href="/#avis-google" className={styles.rating}><span className={styles.stars} aria-hidden="true">★★★★★</span><strong>4,8/5</strong><span>Avis Google</span><Icon name="arrow" /></a>
          <span><Icon name="follow" /> Un interlocuteur dédié</span>
          <span><Icon name="document" /> Des démarches expliquées</span>
        </div>
      </div>
    </section>

    <section id="solutions" className={styles.solutionsSection} aria-labelledby="solutions-title">
      <div className={styles.container}>
        <div className={styles.sectionIntro}>
          <div><span className={styles.eyebrow}>01 / Les possibilités</span><h2 id="solutions-title">Plusieurs chemins.<br /><em>Un même projet.</em></h2></div>
          <p>Découvrez les principaux dispositifs. Nous vérifions ensuite avec vous ceux qui correspondent à votre situation.</p>
        </div>
        <div className={styles.fundingGrid}>
          {fundingOptions.map((option) => <article className={styles.fundingCard} key={option.title}>
            <div className={styles.fundingHeading}>
              {option.logo ? <div className={styles.fundingBrand}><img src={option.logo.src} alt={option.logo.alt} width="180" height="66" loading="lazy" /></div> : <div className={styles.fundingBrandIcon}><Icon name={option.icon} /></div>}
              <span>{option.audience}</span>
            </div>
            <h3>{option.title}</h3><p>{option.description}</p>
            <Link href={option.href}>{option.cta}<Icon name="arrow" /></Link>
          </article>)}
        </div>
        <div className={styles.personalRow}>
          <Icon name="wallet" />
          <div><h3>Vous financez vous-même votre formation ?</h3><p>Des facilités de règlement peuvent être étudiées selon la formation et les conditions applicables.</p></div>
          <Link href="#simulateur">Estimer mon budget <Icon name="arrow" /></Link>
        </div>
        <p className={styles.finePrint}>Toute prise en charge reste soumise aux critères et à la décision de l’organisme financeur.</p>
        <aside className={styles.identityCard} aria-labelledby="identity-title">
          <div className={styles.identityLogo}><img src="/images/financements/identite-numerique-la-poste.svg" alt="L’Identité Numérique La Poste" width="240" height="67" loading="lazy" /></div>
          <div>
            <span className={styles.eyebrow}>Pour vos démarches CPF</span>
            <h3 id="identity-title">Préparez votre connexion sécurisée.</h3>
            <p>L’Identité Numérique La Poste vous permet de vous identifier avec FranceConnect+. France Identité est également proposée. Vérifiez les conditions et les étapes sur les services officiels.</p>
            <div className={styles.identityLinks}>
              <a href="https://lidentitenumerique.laposte.fr/" target="_blank" rel="noopener noreferrer">Découvrir l’Identité Numérique <span aria-hidden="true">↗</span><span className="sr-only"> (nouvel onglet)</span></a>
              <a href="https://www.moncompteformation.gouv.fr/espace-public/qui-peut-utiliser-franceconnect" target="_blank" rel="noopener noreferrer">Comprendre FranceConnect+ <span aria-hidden="true">↗</span><span className="sr-only"> (nouvel onglet)</span></a>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <FinancingSimulator variant="editorial" />

    <section id="accompagnement" className={styles.supportSection} aria-labelledby="support-title">
      <div className={styles.container}>
        <div className={styles.sectionIntro}>
          <div><span className={styles.eyebrow}>03 / À vos côtés</span><h2 id="support-title">Un projet à vous.<br />Des démarches <em>ensemble.</em></h2></div>
          <p>Pas besoin de maîtriser tous les dispositifs. Notre équipe vous aide à y voir clair, du premier échange à votre demande.</p>
        </div>
        <ol className={styles.steps}>
          <li><span>01</span><h3>On fait le point.</h3><p>Votre situation, la formation souhaitée et votre calendrier : nous partons de votre projet.</p></li>
          <li><span>02</span><h3>On explore les solutions.</h3><p>Nous identifions les dispositifs envisageables et le reste à charge potentiel.</p></li>
          <li><span>03</span><h3>On prépare votre dossier.</h3><p>Devis, programme, justificatifs : vous savez quoi transmettre et à quel interlocuteur.</p></li>
        </ol>
      </div>
    </section>

    <section className={styles.faqSection} aria-labelledby="faq-title">
      <div className={`${styles.container} ${styles.faqLayout}`}>
        <div className={styles.faqIntro}><span className={styles.eyebrow}>Les réponses utiles</span><h2 id="faq-title">Encore une <br />question ?</h2><p>Quelques repères avant de vous lancer.</p><Link href="#contact-financement" className={styles.textLink}>Parlons-en ensemble <Icon name="arrow" /></Link></div>
        <div className={styles.faqList}>
          {faqItems.map((item) => <details key={item.question}>
            <summary>{item.question}<span aria-hidden="true">+</span></summary>
            <p>{item.answer}</p>
          </details>)}
        </div>
      </div>
    </section>

    <section id="contact-financement" className={styles.contactSection} aria-labelledby="contact-title">
      <div className={styles.container}>
        <div className={styles.contactPanel}>
          <div><span className={styles.eyebrow}>Le prochain pas, ensemble</span><h2 id="contact-title">Votre projet mérite<br /><em>une conversation.</em></h2><p>Expliquez-nous votre situation. Cassandre vous accompagne pour faire le point sur les possibilités de financement.</p></div>
          <div className={styles.contactDetails}>
            <div className={styles.contactPerson}><span className={styles.contactInitial} aria-hidden="true">C.</span><div><strong>Cassandre</strong><span>Votre interlocutrice chez Intégrale Academy</span></div></div>
            <Link href={appointmentFormUrl} className={styles.primaryButton}>Parler de mon financement <Icon name="arrow" /></Link>
            <a href="tel:+33422470768" className={styles.phone}>04 22 47 07 68</a>
            <p>Échange gratuit et sans engagement</p>
          </div>
        </div>
        <div className={styles.moreLinks}><span>Votre projet se précise ?</span><Link href="/#formations-securite">Voir les formations <Icon name="arrow" /></Link><Link href="/planning">Consulter les dates <Icon name="arrow" /></Link></div>
      </div>
    </section>
  </div>;
}
