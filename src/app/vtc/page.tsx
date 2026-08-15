import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PremiumFAQSection } from '@/components/ui';
import styles from './vtc.module.css';

export const metadata: Metadata = {
  title: 'Formation Chauffeur VTC tout inclus',
  description: 'Préparez l’examen VTC avec une formule tout inclus à 1 500 € : théorie en ligne, pratique, véhicule double commande et frais d’examen.',
};

const contactHref = (subject: string) => `/contact?formation=vtc&objet=${encodeURIComponent(subject)}`;

const icons = {
  arrow: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  check: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>,
  car: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 11 1.8-4.2A3 3 0 0 1 9.6 5h4.8a3 3 0 0 1 2.8 1.8L19 11M4 11h16v7H4v-7Zm3 7v2m10-2v2M7 14h.01M17 14h.01"/></svg>,
};

function Icon({name}:{name:keyof typeof icons}) { return <span className={styles.icon}>{icons[name]}</span>; }

function CTA({href, children, light = false}:{href:string; children:React.ReactNode; light?:boolean}) {
  return <Link href={href} className={light ? styles.ctaLight : styles.cta}>{children}<Icon name="arrow"/></Link>;
}

const included = [
  ['01', 'Théorie en ligne', 'Cours accessibles 24h/24 et 7j/7 pour avancer à votre rythme.'],
  ['02', 'Préparation intensive', 'QCM, entraînements et révisions sur les 7 matières de l’examen.'],
  ['03', 'Conduite professionnelle', 'Mises en situation réelles avec un formateur spécialisé VTC.'],
  ['04', 'Véhicule double commande', 'Le véhicule réglementaire est mis à disposition pour l’épreuve pratique.'],
  ['05', 'Frais d’examen inclus', 'Votre budget est lisible dès le départ, sans mauvaise surprise.'],
  ['06', 'Accompagnement humain', 'Notre équipe vous guide dans le dossier, le financement et les démarches.'],
];

const program = [
  ['A', 'Réglementation T3P', 'Comprendre le cadre du transport public particulier de personnes.'],
  ['B', 'Gestion', 'Calculer ses coûts, sa marge et organiser une activité rentable.'],
  ['C', 'Sécurité routière', 'Adopter une conduite sûre, souple et professionnelle.'],
  ['D', 'Français & anglais', 'Accueillir, comprendre et accompagner tous les passagers.'],
  ['E', 'Développement commercial', 'Trouver des clients, valoriser son service et les fidéliser.'],
  ['F', 'Réglementation VTC', 'Maîtriser les obligations propres au métier et au véhicule.'],
  ['G', 'Épreuve pratique', 'Préparer une course, conduire, accueillir, facturer et encaisser.'],
];

const faq = [
  {q:'La formation coûte-t-elle vraiment 1 500 € tout inclus ?', a:'Oui. La formule présentée comprend la préparation théorique, la pratique, le livre officiel, les frais d’examen et la mise à disposition du véhicule à doubles commandes selon les modalités précisées dans votre convention.'},
  {q:'Puis-je financer la formation avec mon CPF ?', a:'La formation peut être financée avec le CPF selon votre éligibilité et les règles applicables à votre dossier. Notre équipe vérifie avec vous les possibilités avant toute inscription.'},
  {q:'Où se déroule la formation ?', a:'La théorie se suit en e-learning. Les temps pratiques sont organisés en présentiel dans les secteurs de Nice, Cannes, Toulon ou Fréjus selon la session.'},
  {q:'Combien de temps dure la préparation ?', a:'Le parcours représente 105 heures estimées. L’organisation combine une partie théorique flexible à distance et des temps pratiques en présentiel.'},
  {q:'Comment se déroule l’examen VTC ?', a:'L’examen comprend d’abord sept épreuves théoriques d’admissibilité, puis une mise en situation pratique de réalisation d’une course VTC.'},
  {q:'Quel permis faut-il avoir ?', a:'Vous devez être titulaire du permis B et avoir dépassé la période probatoire. Votre aptitude et la conformité de votre dossier sont vérifiées avant l’inscription.'},
  {q:'Est-ce adapté si je travaille déjà ?', a:'Oui. La théorie disponible en ligne 24h/24 permet d’avancer plus facilement autour de vos contraintes. Les séances pratiques sont ensuite planifiées avec vous.'},
  {q:'Suis-je accompagné après la réussite ?', a:'Nous vous expliquons les étapes qui suivent l’examen : demande de carte professionnelle, choix du statut et préparation du lancement de votre activité.'},
];

export default function VtcPage() {
  return <main className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.heroGlow}/><div className={styles.heroGrid}/>
      <div className={styles.container}>
        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <span className={styles.pill}><span/> Formation VTC · Côte d’Azur</span>
            <h1>Prenez le volant.<br/><em>Créez votre avenir.</em></h1>
            <p>Une préparation complète pour réussir l’examen VTC et démarrer votre activité avec les bons réflexes — pas seulement une plateforme de cours.</p>
            <div className={styles.heroActions}>
              <CTA href={contactHref('Je souhaite m’inscrire à la formation VTC')}>Je démarre mon projet</CTA>
              <CTA href="tel:0422470768" light>Parler à un conseiller</CTA>
            </div>
            <div className={styles.heroProofs}>
              <span><Icon name="check"/> Centre agréé</span>
              <span><Icon name="check"/> Qualiopi</span>
              <span><Icon name="check"/> CPF selon éligibilité</span>
            </div>
          </div>

          <div className={styles.cockpit}>
            <div className={styles.cockpitTop}><span>Votre itinéraire vers le métier</span><span className={styles.live}>● PRÊT À DÉMARRER</span></div>
            <div className={styles.routeMap}>
              <svg viewBox="0 0 580 310" preserveAspectRatio="none" aria-hidden="true">
                <path className={styles.roadBack} d="M-20 270 C80 250 72 150 170 160 S270 270 348 186 S415 72 605 48"/>
                <path className={styles.road} d="M-20 270 C80 250 72 150 170 160 S270 270 348 186 S415 72 605 48"/>
              </svg>
              <span className={`${styles.pin} ${styles.pinOne}`}>1</span><span className={`${styles.pin} ${styles.pinTwo}`}>2</span><span className={`${styles.pin} ${styles.pinThree}`}>3</span>
              <div className={styles.destination}><span>ARRIVÉE</span><strong>Votre carte VTC</strong></div>
            </div>
            <div className={styles.cockpitStats}>
              <div><span>Durée</span><strong>105 h</strong><small>Parcours complet</small></div>
              <div className={styles.price}><span>Tout inclus</span><strong>1 500 €</strong><small>Financement possible</small></div>
              <div><span>Format</span><strong>Hybride</strong><small>En ligne + pratique</small></div>
            </div>
          </div>
        </div>
        <div className={styles.heroBottom}>
          <span>THÉORIE EN LIGNE 24/7</span><i/><span>PRATIQUE EN PRÉSENTIEL</span><i/><span>VÉHICULE FOURNI À L’EXAMEN</span>
        </div>
      </div>
    </section>

    <section className={styles.promise}>
      <div className={styles.container}>
        <div className={styles.sectionHead}><div><span>01 — Une formule vraiment complète</span><h2>Tout ce qu’il vous faut.<br/><em>Rien à ajouter.</em></h2></div><p>Chaque élément du parcours est pensé pour vous rapprocher concrètement de la réussite, de votre première connexion à votre passage devant le jury.</p></div>
        <div className={styles.includedGrid}>{included.map(([n,title,text])=><article key={n}><span className={styles.number}>{n}</span><div className={styles.miniIcon}><Icon name={n==='03'||n==='04'?'car':'check'}/></div><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div>
    </section>

    <section className={styles.journey}>
      <div className={styles.container}>
        <div className={styles.journeyLayout}>
          <div className={styles.journeyIntro}><span>02 — Votre parcours</span><h2>De votre projet<br/>à vos <em>premières courses.</em></h2><p>Vous savez toujours où vous en êtes et quelle est la prochaine étape.</p><CTA href={contactHref('Recevoir le détail du parcours VTC')}>Recevoir le programme</CTA></div>
          <div className={styles.timeline}>
            {[
              ['01','On valide votre projet','Prérequis, financement, disponibilité et objectif professionnel.'],
              ['02','Vous maîtrisez la théorie','Cours en ligne, quiz, annales et examens blancs.'],
              ['03','Vous passez l’admissibilité','Préparation aux sept matières de l’examen théorique.'],
              ['04','Vous vous entraînez au métier','Conduite, accueil client, itinéraire, devis et facturation.'],
              ['05','Vous passez la pratique','Mise en situation complète avec le véhicule réglementaire.'],
            ].map(([n,title,text])=><article key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
          </div>
        </div>
      </div>
    </section>

    <section className={styles.program}>
      <div className={styles.container}>
        <div className={styles.sectionHead}><div><span>03 — Les compétences</span><h2>Bien plus que conduire.<br/><em>Devenez professionnel.</em></h2></div><p>Le programme suit les compétences évaluées à l’examen et celles qui feront la différence face à vos futurs clients.</p></div>
        <div className={styles.programGrid}>{program.map(([letter,title,text],index)=><article key={letter} className={index===6?styles.programFeatured:''}><span>{letter}</span><div><h3>{title}</h3><p>{text}</p></div><Icon name="arrow"/></article>)}</div>
      </div>
    </section>

    <section className={styles.offer}>
      <div className={styles.container}>
        <div className={styles.offerCard}>
          <div className={styles.offerCopy}><span>04 — L’offre Intégrale</span><h2>Votre projet VTC,<br/><em>clé en main.</em></h2><p>Une seule formule lisible, sans découvrir au dernier moment qu’il faut encore payer la pratique, le véhicule ou l’examen.</p><ul><li><Icon name="check"/> 105 heures de préparation</li><li><Icon name="check"/> E-learning accessible 24h/24</li><li><Icon name="check"/> Formation pratique encadrée</li><li><Icon name="check"/> Livre officiel inclus</li><li><Icon name="check"/> Frais d’examen inclus</li><li><Icon name="check"/> Véhicule double commande inclus</li></ul></div>
          <div className={styles.checkout}>
            <span className={styles.checkoutPill}>FORMATION COMPLÈTE</span><p>Prix tout inclus</p><strong>1 500 €</strong><small>Finançable par le CPF selon éligibilité</small><CTA href={contactHref('Étude de financement formation VTC')}>Étudier mon financement</CTA><Link href="tel:0422470768" className={styles.phone}>Ou appeler le 04 22 47 07 68</Link><div className={styles.reassurance}>✓ Étude gratuite et sans engagement</div>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.local}>
      <div className={styles.container}>
        <div className={styles.localCard}>
          <div className={styles.localVisual}><div className={styles.coast}><span>Nice</span><span>Cannes</span><span>Fréjus</span><span>Toulon</span></div><div className={styles.carBadge}><Icon name="car"/></div></div>
          <div className={styles.localCopy}><span>05 — La Côte d’Azur comme terrain de jeu</span><h2>Apprenez là où<br/>vous allez <em>conduire.</em></h2><p>Les gares, les hôtels, les aéroports, les événements et les exigences d’une clientèle internationale font de notre territoire un cadre idéal pour apprendre le métier.</p><div className={styles.locationChips}><span>Nice</span><span>Cannes</span><span>Fréjus</span><span>Toulon</span></div></div>
        </div>
      </div>
    </section>

    <section className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.contactCard}>
          <div><span>UNE QUESTION SUR VOTRE PROJET ?</span><h2>Faites le premier pas<br/>vers votre <em>future activité.</em></h2><p>Cassandre vérifie votre éligibilité, vous explique le calendrier et vous aide à choisir le financement adapté.</p></div>
          <aside><Image src="/images/cassandre-memoji.png" width={96} height={96} alt="Cassandre, responsable commerciale Intégrale Academy"/><div><span>VOTRE CONSEILLÈRE</span><h3>Cassandre</h3><p>Responsable commerciale</p></div><a href="tel:0422470768">04 22 47 07 68</a><CTA href={contactHref('Être rappelé au sujet de la formation VTC')}>Réserver un échange</CTA></aside>
        </div>
      </div>
    </section>

    <PremiumFAQSection badge="06 — FAQ VTC" title="Vos questions avant de prendre le volant" description="Tarif, financement, prérequis, examen et organisation : toutes les réponses utiles avant de démarrer." items={faq} contactHref={contactHref('Question sur la formation VTC')} contactLabel="Poser ma question" />
  </main>;
}
