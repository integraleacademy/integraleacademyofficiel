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

const examDates = [
  ['11 septembre 2026', '29 septembre 2026', '26 octobre 2026'],
  ['20 novembre 2026', '8 décembre 2026', '4 janvier 2027'],
];

const prerequisites = [
  'Être titulaire du permis B et avoir dépassé la période probatoire.',
  'Être reconnu médicalement apte à la conduite professionnelle.',
  'Ne pas avoir subi de retrait définitif d’une carte professionnelle T3P durant les dix dernières années.',
  'Ne pas avoir été exclu pour fraude d’un examen T3P durant les cinq dernières années.',
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

    <section className={styles.accreditations}>
      <div className={styles.container}>
        <div className={styles.accreditationGrid}>
          <div><span>Certification</span><strong>RS 5637</strong><small>Enregistrée jusqu’au 31/12/2026</small></div>
          <div><span>Agrément préfectoral</span><strong>VTC-26-001</strong><small>Délivré le 02/12/2025</small></div>
          <div><span>Qualité</span><strong>Qualiopi n°03169</strong><small>Processus de formation certifié</small></div>
          <div><span>Déclaration d’activité</span><strong>NDA 93830600283</strong><small>Intégrale Sécurité Formations</small></div>
        </div>
      </div>
    </section>

    <section className={styles.promise}>
      <div className={styles.container}>
        <div className={styles.sectionHead}><div><span>01 — Une formule vraiment complète</span><h2>Tout ce qu’il vous faut.<br/><em>Rien à ajouter.</em></h2></div><p>Chaque élément du parcours est pensé pour vous rapprocher concrètement de la réussite, de votre première connexion à votre passage devant le jury.</p></div>
        <div className={styles.includedGrid}>{included.map(([n,title,text])=><article key={n}><span className={styles.number}>{n}</span><div className={styles.miniIcon}><Icon name={n==='03'||n==='04'?'car':'check'}/></div><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div>
    </section>

    <section className={styles.elearning}>
      <div className={styles.container}>
        <div className={styles.elearningLayout}>
          <div className={styles.platformMockup}>
            <div className={styles.platformTop}><span>ESPACE DE FORMATION</span><span>Progression en temps réel</span></div>
            <div className={styles.platformBody}>
              <div className={styles.progressRing}><strong>13</strong><span>séquences</span></div>
              <div className={styles.lessonList}>
                {['Réglementation T3P','Gestion & rentabilité','Sécurité routière','Développement commercial'].map((lesson,index)=><div key={lesson}><span>{String(index+1).padStart(2,'0')}</span><p>{lesson}</p><b>{index<2?'✓':'→'}</b></div>)}
              </div>
            </div>
          </div>
          <div className={styles.elearningCopy}><span>03 — Votre formation théorique</span><h2>Apprenez à votre rythme.<br/><em>Mesurez vos progrès.</em></h2><p>Dès que votre inscription est finalisée, vous accédez à votre espace de formation personnel, disponible 24h/24 et 7j/7.</p><ul><li><Icon name="check"/> 13 séquences correspondant aux matières de l’examen</li><li><Icon name="check"/> Quiz composés de questions issues des annales</li><li><Icon name="check"/> Score et correction affichés instantanément</li><li><Icon name="check"/> Quiz recommençables autant de fois que nécessaire</li><li><Icon name="check"/> Livre officiel envoyé par courrier</li></ul><a href="https://www.canva.com/design/DAFhLhaNPtg/JTpC91OFj5kP1K96Zq7LGQ/view?utm_campaign=designshare&utm_content=DAFhLhaNPtg&utm_medium=link&utm_source=editor" target="_blank" rel="noopener noreferrer" className={styles.programLink}>Consulter le programme détaillé <Icon name="arrow"/></a></div>
        </div>
      </div>
    </section>

    <section className={styles.dates}>
      <div className={styles.container}>
        <div className={styles.datesHeading}><div><span>04 — Prochaines échéances</span><h2>Votre calendrier<br/><em>jusqu’à l’examen.</em></h2></div><p>La théorie démarre dès la finalisation de votre inscription. Ces échéances vous permettent ensuite d’organiser votre passage aux épreuves.</p></div>
        <div className={styles.dateTable}>
          <div className={styles.dateHeader}><span>Date limite d’inscription</span><span>Examen théorique</span><span>Examen pratique</span></div>
          {examDates.map(([limit,theory,practice],index)=><div className={styles.dateRow} key={limit}><span><small>Session {index+1}</small><strong>{limit}</strong></span><span><small>Admissibilité</small><strong>{theory}</strong></span><span><small>Admission</small><strong>{practice}</strong></span></div>)}
        </div>
        <p className={styles.dateNote}>Dates communiquées à titre indicatif et susceptibles d’être ajustées par l’organisateur de l’examen.</p>
      </div>
    </section>

    <section className={styles.journey}>
      <div className={styles.container}>
        <div className={styles.journeyLayout}>
          <div className={styles.journeyIntro}><span>05 — Votre parcours</span><h2>De votre projet<br/>à vos <em>premières courses.</em></h2><p>Vous savez toujours où vous en êtes et quelle est la prochaine étape.</p><CTA href={contactHref('Recevoir le détail du parcours VTC')}>Recevoir le programme</CTA></div>
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
        <div className={styles.sectionHead}><div><span>06 — Les compétences</span><h2>Bien plus que conduire.<br/><em>Devenez professionnel.</em></h2></div><p>Le programme suit les compétences évaluées à l’examen et celles qui feront la différence face à vos futurs clients.</p></div>
        <div className={styles.programGrid}>{program.map(([letter,title,text],index)=><article key={letter} className={index===6?styles.programFeatured:''}><span>{letter}</span><div><h3>{title}</h3><p>{text}</p></div><Icon name="arrow"/></article>)}</div>
      </div>
    </section>

    <section className={styles.exam}>
      <div className={styles.container}>
        <div className={styles.examHeading}><span>07 — L’examen VTC expliqué simplement</span><h2>Deux épreuves.<br/><em>Une préparation complète.</em></h2><p>L’examen est organisé par la Chambre de métiers et de l’artisanat. Nous vous préparons aux connaissances attendues comme aux conditions réelles de l’épreuve pratique.</p></div>
        <div className={styles.examGrid}>
          <article><div className={styles.examNumber}>01</div><span>ADMISSIBILITÉ</span><h3>L’examen théorique</h3><strong>7 épreuves · environ 3 h 50</strong><ul><li>5 matières communes Taxi/VTC</li><li>2 matières spécifiques au VTC</li><li>Questions sous forme de QCM et de QRC</li><li>Moyenne pondérée minimale : 10/20</li><li>Certaines notes sont éliminatoires</li></ul></article>
          <article className={styles.examFeatured}><div className={styles.examNumber}>02</div><span>ADMISSION</span><h3>La mise en situation pratique</h3><strong>Conduite en circulation · 20 min minimum</strong><ul><li>Sécurité et souplesse de conduite</li><li>Accueil et relation client</li><li>Construction et adaptation du parcours</li><li>Devis, facturation et encaissement</li><li>Note minimale pour réussir : 12/20</li></ul></article>
        </div>
        <div className={styles.examInfo}><div><strong>3 tentatives pratiques</strong><span>possibles dans l’année suivant l’admissibilité</span></div><div><strong>Véhicule fourni</strong><span>double commande réglementaire inclus dans l’offre</span></div><div><strong>Frais inclus</strong><span>aucun supplément d’examen dans la formule présentée</span></div></div>
      </div>
    </section>

    <section className={styles.prerequisites}>
      <div className={styles.container}>
        <div className={styles.prereqLayout}><div><span>08 — Avant de vous inscrire</span><h2>Les prérequis<br/><em>à vérifier.</em></h2><p>Notre équipe contrôle votre situation avec vous avant la constitution définitive du dossier.</p></div><div className={styles.prereqList}>{prerequisites.map((item,index)=><div key={item}><span>{String(index+1).padStart(2,'0')}</span><p>{item}</p></div>)}</div></div>
      </div>
    </section>

    <section className={styles.offer}>
      <div className={styles.container}>
        <div className={styles.offerCard}>
          <div className={styles.offerCopy}><span>09 — L’offre Intégrale</span><h2>Votre projet VTC,<br/><em>clé en main.</em></h2><p>Une seule formule lisible, sans découvrir au dernier moment qu’il faut encore payer la pratique, le véhicule ou l’examen.</p><ul><li><Icon name="check"/> 105 heures de préparation</li><li><Icon name="check"/> E-learning accessible 24h/24</li><li><Icon name="check"/> Formation pratique encadrée</li><li><Icon name="check"/> Livre officiel inclus</li><li><Icon name="check"/> Frais d’examen inclus</li><li><Icon name="check"/> Véhicule double commande inclus</li></ul></div>
          <div className={styles.checkout}>
            <span className={styles.checkoutPill}>FORMATION COMPLÈTE</span><p>Prix tout inclus</p><strong>1 500 €</strong><small>Finançable par le CPF selon éligibilité</small><CTA href={contactHref('Étude de financement formation VTC')}>Étudier mon financement</CTA><Link href="tel:0422470768" className={styles.phone}>Ou appeler le 04 22 47 07 68</Link><div className={styles.reassurance}>✓ Étude gratuite et sans engagement</div>
          </div>
        </div>
        <div className={styles.fundingGrid}>
          <article><span>CPF</span><h3>Mobilisez vos droits</h3><p>Financement possible selon votre éligibilité et les règles applicables à votre dossier.</p></article>
          <article><span>FRANCE TRAVAIL</span><h3>Présentez votre projet</h3><p>Nous préparons avec vous les éléments utiles à transmettre à votre conseiller.</p></article>
          <article><span>PAIEMENT PERSONNEL</span><h3>Échelonnez votre règlement</h3><p>Des solutions en 3, 4 ou 10 fois peuvent être étudiées selon votre situation.</p></article>
          <article className={styles.identityCard}><span>À PRÉPARER</span><h3>Identité Numérique La Poste</h3><p>Elle peut être nécessaire pour valider certaines démarches de financement en ligne.</p><Link href="/financements">Comprendre les financements <Icon name="arrow"/></Link></article>
        </div>
      </div>
    </section>

    <section className={styles.local}>
      <div className={styles.container}>
        <div className={styles.localCard}>
          <div className={styles.localVisual}><div className={styles.coast}><span>Nice</span><span>Cannes</span><span>Fréjus</span><span>Toulon</span></div><div className={styles.carBadge}><Icon name="car"/></div></div>
          <div className={styles.localCopy}><span>10 — La Côte d’Azur comme terrain de jeu</span><h2>Apprenez là où<br/>vous allez <em>conduire.</em></h2><p>Les gares, les hôtels, les aéroports, les événements et les exigences d’une clientèle internationale font de notre territoire un cadre idéal pour apprendre le métier.</p><div className={styles.locationChips}><span>Nice</span><span>Cannes</span><span>Fréjus</span><span>Toulon</span></div></div>
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

    <PremiumFAQSection badge="11 — FAQ VTC" title="Vos questions avant de prendre le volant" description="Tarif, financement, prérequis, examen et organisation : toutes les réponses utiles avant de démarrer." items={faq} contactHref={contactHref('Question sur la formation VTC')} contactLabel="Poser ma question" />
  </main>;
}
