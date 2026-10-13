import Link from 'next/link';
import styles from './planning-help.module.css';

type HelpIcon = 'book' | 'wallet' | 'company' | 'message' | 'arrow' | 'phone';

function Icon({ name }: { name: HelpIcon }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {name === 'book' && <><path d="M12 5.5C9 3.5 5.5 3.5 2.5 4.5v15c3-1 6.5-1 9.5 1 3-2 6.5-2 9.5-1v-15c-3-1-6.5-1-9.5 1Z" /><path d="M12 5.5v15" /></>}
      {name === 'wallet' && <><path d="M20 8V5a2 2 0 0 0-2-2L5 5a2.5 2.5 0 0 0 0 5h15v10H5a2 2 0 0 1-2-2V7.5" /><path d="M20 12h-5v5h5M16.5 14.5h.1" /></>}
      {name === 'company' && <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V3h8v4M3 12a23 23 0 0 0 18 0M10 12v3h4v-3" /></>}
      {name === 'message' && <><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-2 2V11.5A8.5 8.5 0 0 1 10.5 3h2a8.5 8.5 0 0 1 8.5 8.5Z" /><path d="M7 9h9M7 13h6" /></>}
      {name === 'arrow' && <path d="M5 12h14m-6-6 6 6-6 6" />}
      {name === 'phone' && <path d="m7 3 3 5-2.5 2.5a14 14 0 0 0 6 6L16 14l5 3-1 3c-.3.8-1.1 1.2-2 1C10 20 4 14 3 6c-.2-.9.2-1.7 1-2l3-1Z" />}
    </svg>
  );
}

const resources: { icon: HelpIcon; label: string; description: string; href: string }[] = [
  { icon: 'book', label: 'Découvrir les formations', description: 'Comparer APS, A3P, SSIAP 1, VTC et BTS.', href: '/formations-securite' },
  { icon: 'wallet', label: 'Trouver un financement', description: 'CPF, France Travail, employeur et autres solutions.', href: '/tarifs#solutions' },
  { icon: 'company', label: 'Recruter ou former', description: 'Alternance, POEI et montée en compétences.', href: '/entreprises' },
  { icon: 'message', label: 'Parler à Cassandre', description: 'Valider mon projet et mes prochaines étapes.', href: '/contact?motif=rdv' },
];

const questions = [
  ['Comment savoir s’il reste des places ?', 'Le nombre affiché sur chaque session est synchronisé avec les informations publiées par l’équipe.'],
  ['Puis-je demander un financement avant de m’inscrire ?', 'Oui. Nous pouvons étudier votre situation avant la validation définitive de votre inscription.'],
  ['Que faire si aucune date ne me convient ?', 'Créez une alerte planning : l’équipe vous préviendra dès qu’une nouvelle session sera ouverte.'],
];

export function PlanningHelp() {
  return (
    <section id="preparer-inscription" className={`page-container ${styles.section}`} aria-labelledby="planning-help-title">
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Préparez votre inscription</p>
          <h2 id="planning-help-title">Toutes les réponses avant de choisir <em>votre session.</em></h2>
        </div>
        <p className={styles.intro}>Découvrez les formations, vérifiez votre financement et échangez avec l’équipe avant de réserver votre place.</p>
      </div>

      <nav className={styles.resources} aria-label="Les ressources pour votre inscription">
        {resources.map(({ icon, label, description, href }) => (
          <Link key={href} href={href} className={styles.resource}>
            <span className={styles.resourceIcon}><Icon name={icon} /></span>
            <span className={styles.resourceCopy}>
              <span className={styles.resourceTitle}>{label}</span>
              <span className={styles.resourceDescription}>{description}</span>
            </span>
            <span className={styles.resourceArrow}><Icon name="arrow" /></span>
          </Link>
        ))}
      </nav>

      <div className={styles.helpGrid}>
        <div className={styles.faq}>
          <p className={styles.eyebrow}>Questions fréquentes</p>
          <h3>Avant de réserver une place</h3>
          <div className={styles.questions}>
            {questions.map(([question, answer]) => (
              <details key={question} className={styles.question}>
                <summary>
                  <span>{question.replace(/ \?$/, '\u00a0?')}</span>
                  <span className={styles.toggle} aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>

        <aside className={styles.advice} aria-labelledby="planning-advice-title">
          <div className={styles.adviser}>
            <span className={styles.avatar} aria-hidden="true">CM</span>
            <div>
              <span className={styles.adviserName}>Cassandre</span>
              <span className={styles.adviserRole}>Responsable commerciale</span>
            </div>
            <span className={styles.adviserIcon}><Icon name="message" /></span>
          </div>
          <h3 id="planning-advice-title">Parlons de votre <em>prochaine rentrée.</em></h3>
          <p>Cassandre vous aide à choisir la formation, la session et le financement adaptés à votre projet.</p>
          <Link href="/contact?motif=rdv" className={styles.appointment}>
            Réserver un échange <Icon name="arrow" />
          </Link>
          <a href="tel:0422470768" className={styles.phone}><Icon name="phone" /> 04 22 47 07 68</a>
        </aside>
      </div>
    </section>
  );
}
