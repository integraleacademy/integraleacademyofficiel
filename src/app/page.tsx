import Image from 'next/image';
import Link from 'next/link';
import { OrientationAssistant } from '@/components/OrientationAssistant';
import { appointmentFormUrl } from '@/components/ui';
import styles from './home.module.css';

export const metadata = {
  title: 'Accueil',
  description: 'Intégrale Academy forme aux métiers de la sécurité privée, de la sécurité incendie, du VTC et aux BTS en alternance à Puget-sur-Argens, Paris et Aurillac.',
};

const journeyCards = [
  { number: '01', icon: '◆', title: 'Découvrir les formations', description: 'Sécurité, incendie, direction, VTC et BTS.', href: '#formations-securite', tone: 'dark' },
  { number: '02', icon: '€', title: 'Trouver un financement', description: 'CPF, France Travail, alternance, OPCO ou personnel.', href: '/financements', tone: 'light' },
  { number: '03', icon: '↗', title: 'Recruter ou former', description: 'Une entrée dédiée aux besoins des entreprises.', href: '/entreprises', tone: 'blue' },
  { number: '04', icon: 'CM', title: 'Parler à Cassandre', description: 'Un échange humain, gratuit et sans engagement.', href: '/contact', tone: 'light' },
] as const;

const featuredCourses = [
  { eyebrow: 'Surveillance · 175 h', title: 'Agent de sécurité privée · APS', description: 'Prévenir les risques, surveiller les sites et protéger les personnes.', href: '/formations-securite/aps', tags: ['Puget-sur-Argens', 'Finançable'], featured: true, anchor: undefined },
  { eyebrow: 'Protection rapprochée · 327 h', title: 'Agent de protection · A3P', description: 'Préparer et sécuriser les déplacements de personnes exposées.', href: '/formations-securite/a3p-apr', tags: ['A3P · APR', 'Agrément A3P'], featured: false, anchor: undefined },
  { eyebrow: 'Direction · initial ou VAE', title: 'Dirigeant d’une société de sécurité', description: 'Créer, reprendre ou piloter une activité de sécurité privée.', href: '/formations-securite/desp', tags: ['Présentiel + distanciel', 'VAE'], featured: false, anchor: undefined },
  { eyebrow: 'Incendie · 70 h', title: 'Agent SSIAP 1', description: 'Prévenir et intervenir dans les ERP et les IGH.', href: '/formations-securite/ssiap-1', tags: ['Examen inclus'], featured: false, anchor: undefined },
  { eyebrow: 'Transport de personnes', title: 'Chauffeur VTC', description: 'Théorie, pratique, réglementation et préparation à l’examen.', href: '/vtc', tags: ['105 h', 'Tout inclus'], featured: false, anchor: undefined },
  { eyebrow: 'Diplômes d’État', title: 'BTS en alternance', description: 'Six parcours orientés emploi, en présentiel ou à distance.', href: '/bts', tags: ['Alternance', 'Bac +2'], featured: false, anchor: 'bts' },
] as const;

const proofItems = [
  ['Depuis 2018', 'Expérience terrain'],
  ['400 m²', 'Campus principal'],
  ['Qualiopi', 'Certification qualité'],
  ['CNAPS · ADEF', 'Agréments métiers'],
  ['3 centres', 'Selon les sessions'],
] as const;

const reviews = [
  { name: 'Mee-Kyung K.', course: 'Formation A3P', text: 'Une formation A3P exigeante, réaliste et ultra-professionnalisante. Elle prépare vraiment au terrain.' },
  { name: 'Mathys C.', course: 'Formation Agent de sécurité', text: 'Les locaux sont propres, bien équipés et agréables. La formation est complète et très bien organisée.' },
] as const;

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <span className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.heroCopy}>
            <span className={styles.heroBadge}><i aria-hidden="true" /> Intégrale Academy · fondée en 2018</span>
            <h1>Votre futur métier mérite une formation <em>à la hauteur.</em></h1>
            <p>Des parcours concrets, des formateurs issus du terrain et une équipe qui vous accompagne réellement — du choix de la formation jusqu’à votre projet professionnel.</p>
            <div className={styles.heroActions}>
              <Link href="#formations-securite" className={styles.primaryButton}>Trouver ma formation <span aria-hidden="true">→</span></Link>
              <Link href="/planning" className={styles.goldButton}>Voir le planning</Link>
            </div>
            <div className={styles.heroProofs} aria-label="Points forts d’Intégrale Academy">
              <span>Formations réglementées</span>
              <span>Financements possibles</span>
              <span>Côte d’Azur · Paris · Centre France</span>
            </div>
          </div>

          <div className={styles.assistantDock}>
            <OrientationAssistant variant="homeDock" />
          </div>
        </div>
      </section>

      <section className={styles.journey}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span>Préparez votre inscription</span>
              <h2>Quatre étapes. Une équipe à chaque étape.</h2>
            </div>
            <p>La page vous guide sans vous demander de comprendre seul les financements, les prérequis ou les démarches administratives.</p>
          </div>

          <div className={styles.journeyGrid}>
            <article className={styles.journeyLead}>
              <span className={styles.cardEyebrow}>Votre parcours Intégrale Academy</span>
              <h3>Vous avancez avec un plan clair.</h3>
              <p>Commencez par choisir un métier. Nous vous aidons ensuite à vérifier les conditions, trouver une solution de financement et préparer votre inscription.</p>
              <div className={styles.journeySteps}>
                <span>01 · Choisir</span><span>02 · Financer</span><span>03 · S’inscrire</span><span>04 · Se former</span>
              </div>
            </article>

            <div className={styles.journeyCards}>
              {journeyCards.map((card) => (
                <Link key={card.number} href={card.href} className={`${styles.journeyCard} ${styles[card.tone]}`}>
                  <span className={styles.journeyIcon}>{card.icon}</span>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <span className={styles.cardArrow} aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="formations-securite" className={styles.courses}>
        <div className={styles.container}>
          <div className={`${styles.sectionHeading} ${styles.sectionHeadingDark}`}>
            <div><span>Nos parcours phares</span><h2>Des métiers concrets. Des formations lisibles.</h2></div>
            <p>Retrouvez immédiatement nos formations les plus recherchées. Chaque carte mène vers une page complète avec programme, dates, tarif et financement.</p>
          </div>

          <div className={styles.courseGrid}>
            {featuredCourses.map((course) => (
              <Link id={course.anchor} key={course.href} href={course.href} className={`${styles.courseCard} ${course.featured ? styles.courseFeatured : ''}`}>
                <span className={styles.courseEyebrow}>{course.eyebrow}</span>
                <div>
                  <h3>{course.title}</h3><p>{course.description}</p>
                  <div className={styles.courseTags}>{course.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
                <span className={styles.courseArrow} aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.proofBar} aria-label="Chiffres et reconnaissances">
        <div className={styles.container}><div className={styles.proofGrid}>{proofItems.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}</div></div>
      </section>

      <section className={styles.reviews}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div><span>Avis stagiaires</span><h2>Ils parlent mieux de nous que nous-mêmes.</h2></div>
            <p>Des retours issus de formations APS, A3P, protection rapprochée et VTC.</p>
          </div>

          <div className={styles.reviewGrid}>
            <article className={styles.ratingCard}>
              <span>Note Google sélectionnée</span><strong>5,0</strong><div aria-label="5 étoiles sur 5">★★★★★</div><p>15 avis mis en avant · APS · A3P · VTC</p>
            </article>
            {reviews.map((review) => (
              <article key={review.name} className={styles.reviewCard}>
                <div aria-label="5 étoiles sur 5">★★★★★</div><blockquote>« {review.text} »</blockquote>
                <footer><strong>{review.name}</strong><span>{review.course}</span></footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactBox}>
            <span className={styles.contactHalo} aria-hidden="true" />
            <div className={styles.contactCopy}>
              <span>Faites le premier pas</span><h2>Votre projet mérite un échange simple.</h2>
              <p>Expliquez votre objectif à Cassandre. Elle vous aide à identifier la formation, vérifier les prérequis et comprendre les solutions de financement.</p>
              <div className={styles.contactActions}>
                <Link href={appointmentFormUrl} className={styles.goldButton}>Réserver un rendez-vous <span aria-hidden="true">→</span></Link>
                <a href="tel:0422470768" className={styles.contactSecondary}>Appeler</a>
              </div>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.cassandreVisual}><Image src="/images/cassandre-memoji.png" alt="Cassandre, responsable commerciale d’Intégrale Academy" width={190} height={190} /></div>
              <div><strong>Cassandre</strong><span>Responsable commerciale</span><a href="tel:0422470768">04 22 47 07 68</a></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
