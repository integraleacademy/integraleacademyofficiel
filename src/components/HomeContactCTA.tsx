import Link from 'next/link';
import { TeamPortrait } from '@/components/TeamPortrait';
import { appointmentFormUrl } from '@/components/ui';
import styles from './HomeContactCTA.module.css';

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function PhoneIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m7.2 4.6 1.8-.5c.8-.2 1.6.2 1.9.9l.9 2.1c.3.7.1 1.5-.5 2l-.9.7a10.8 10.8 0 0 0 3.8 3.8l.7-.9c.5-.6 1.3-.8 2-.5l2.1.9c.7.3 1.1 1.1.9 1.9l-.5 1.8c-.2.8-.9 1.3-1.7 1.3A13.7 13.7 0 0 1 5.9 6.3c0-.8.5-1.5 1.3-1.7Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

const talkingPoints = [
  { title: 'Votre projet', text: 'Vos envies et vos objectifs.' },
  { title: 'Votre formation', text: 'Le parcours qui vous correspond.' },
  { title: 'Votre financement', text: 'Les possibilités à étudier ensemble.' },
];

export function HomeContactCTA() {
  return (
    <section id="parlons-de-votre-projet" className={styles.section} aria-labelledby="home-contact-title">
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}><span aria-hidden="true" /> Votre prochaine étape</p>
            <h2 id="home-contact-title" className={styles.title}>La suite commence<br /><em>par une conversation.</em></h2>
            <p className={styles.intro}>Une envie, une question, un projet encore à préciser ? Prenons le temps d’en parler et de trouver la formation qui vous correspond.</p>

            <ol className={styles.talkingPoints} aria-label="Les sujets de notre échange">
              {talkingPoints.map((point, index) => (
                <li key={point.title}>
                  <span className={styles.stepNumber} aria-hidden="true">0{index + 1}</span>
                  <strong>{point.title}</strong>
                  <p>{point.text}</p>
                </li>
              ))}
            </ol>

            <Link href="/ecole#equipe" className={styles.teamLink}>Une équipe à vos côtés <ArrowIcon /></Link>
          </div>

          <div className={styles.contactCard}>
            <p className={styles.cardEyebrow}>Un contact, un vrai accompagnement</p>
            <div className={styles.person}>
              <div className={styles.portraitFrame}>
                <TeamPortrait person="cassandre" size={120} sizes="(max-width: 600px) 88px, 112px" alt="Cassandre, votre interlocutrice chez Intégrale Academy" className={styles.portrait} />
              </div>
              <div>
                <h3>Cassandre</h3>
                <p>Responsable commerciale</p>
                <span>Intégrale Academy</span>
              </div>
            </div>

            <div className={styles.appointment}>
              <p>Un premier échange pour y voir clair.</p>
              <span>Choisissez votre créneau, nous prenons le temps de vous conseiller.</span>
              <a href={appointmentFormUrl} className={styles.primaryButton}>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 3v4m8-4v4M4 10h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="m9 15 2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span>Prendre un rendez-vous</span>
                <ArrowIcon />
              </a>
              <p className={styles.reassurance}><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m4.5 10.4 3.2 3.1 7.8-8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg> Gratuit <span aria-hidden="true">·</span> Sans engagement</p>
            </div>

            <a href="tel:+33422470768" className={styles.phoneLink} aria-label="Appeler Cassandre au 04 22 47 07 68">
              <span className={styles.phoneIcon}><PhoneIcon /></span>
              <span><small>Vous préférez appeler ?</small><strong>04 22 47 07 68</strong></span>
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
