import Image from 'next/image';
import Link from 'next/link';
import styles from './ApsExperience.module.css';

export function ApsAdmission({ prerequisites, href }: { prerequisites: string[][]; href: string }) {
  return <div className={styles.admission}>
    <aside className={styles.admissionLead}>
      <span className={styles.documentIcon} aria-hidden="true"><svg viewBox="0 0 64 64" fill="none"><rect x="14" y="8" width="36" height="48" rx="5" stroke="currentColor" strokeWidth="2"/><path d="M23 21h18M23 29h12M23 40l6 6 13-14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
      <p className={styles.kicker}>Votre entrée en formation</p><h3>Votre projet.<br />Votre dossier.<br /><em>On s’en occupe ensemble.</em></h3>
      <p>Vous réunissez les pièces. Notre équipe vérifie votre situation et vous accompagne dans la demande CNAPS.</p>
      <Link className={styles.primaryLink} href={href}>Faire vérifier mon dossier <span aria-hidden="true">↗</span></Link>
      <p className={styles.small}>L’autorisation préalable est nécessaire avant l’entrée en formation, sauf carte professionnelle valide.</p>
    </aside>
    <div className={styles.requirements}><p className={styles.kicker}>Les points à vérifier avec nous</p>{prerequisites.map(([title, text], index) => <details key={title} name="aps-admission" className={styles.requirement}>
      <summary><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><span className={styles.plus} aria-hidden="true">+</span></summary><p>{text}</p>
    </details>)}<p className={styles.admissionSteps}>Échange conseiller <span>→</span> Vérification du dossier <span>→</span> Demande CNAPS <span>→</span> Admission confirmée</p></div>
  </div>;
}

const demoUrl = 'https://gestionstagiaires-test-v2.onrender.com/e-learning/demo/aps/cours';

export function ApsHybridExperience() {
  return <>
    <div className={styles.hybrid}>
      <div className={styles.remoteCopy}><p className={styles.kicker}>Apprendre à distance</p><h3><strong>51 h</strong><br />Les bases, où que vous soyez.</h3><p>Des cours illustrés, des vidéos et des exercices pour avancer étape par étape. Votre progression est suivie par l’équipe pédagogique.</p><ul><li>Plateforme accessible 24 h/24</li><li>Exercices et tests pour vous entraîner</li><li>Une équipe disponible pour vous accompagner</li></ul><a className={styles.primaryLink} href={demoUrl} target="_blank" rel="noopener noreferrer">Essayer un extrait de cours <span aria-hidden="true">↗</span></a></div>
      <figure className={styles.demoPreview}><div className={styles.browserBar}><span aria-hidden="true">● ● ●</span><span>Votre espace e-learning APS</span><span>APERÇU</span></div><a href={demoUrl} target="_blank" rel="noopener noreferrer" aria-label="Découvrir l’extrait de cours APS dans un nouvel onglet"><Image src="/images/aps/experience/elearning-apercu.webp" alt="Capture réelle de la démonstration APS : un cours illustré sur le cadre de la sécurité privée" width={1280} height={900} sizes="(max-width: 800px) 92vw, 800px" /><span className={styles.previewAction}>Ouvrir la démonstration <span aria-hidden="true">↗</span></span></a><figcaption>Un vrai extrait de notre plateforme. Découvrez le cours et ses exercices.</figcaption></figure>
    </div>
    <div className={styles.inPerson}><div><p className={styles.kicker}>Puis, place au terrain</p><h3><strong>124 h</strong> à l’école</h3></div><p><strong>63,5 h de pratique</strong><span>Rondes, gestes professionnels, mises en situation.</span></p><p><strong>60,5 h de théorie</strong><span>Échanges avec le formateur et préparation à l’examen.</span></p><a href="#pratique">Voir les ateliers <span aria-hidden="true">↑</span></a></div>
    <ol className={styles.hybridSteps}>{[['Accueil au centre','Présentation du parcours'],['51 h à distance','Notions autorisées en distanciel'],['124 h à l’école','Théorie et pratique encadrées'],['Examen en présentiel','Évaluation devant jury']].map(([title, text], index) => <li key={title}><span>0{index+1}</span><div><strong>{title}</strong><small>{text}</small></div></li>)}</ol>
  </>;
}

export function ApsExamExperience({ steps }: { steps: string[][] }) {
  return <>
    <div className={styles.exam}>
      <article className={styles.examTheory}><p className={styles.kicker}>01 · Les connaissances</p><h3>QCU<span>Questionnaires à choix unique</span></h3><p>Comprendre une situation professionnelle et choisir la bonne réponse sur support électronique.</p><ul><li>Cadre juridique et limites d’intervention</li><li>Consignes et prévention des risques</li><li>Réactions adaptées aux situations du métier</li></ul><p className={styles.examNote}>Des entraînements réguliers tout au long du parcours.</p></article>
      <article className={styles.examPractice}><Image src="/images/aps/experience/examen.webp" alt="Une candidate APS signale une anomalie pendant une ronde, sous l’observation d’une examinatrice" width={1536} height={1024} sizes="(max-width: 800px) 92vw, 740px" /><div><p className={styles.kicker}>02 · La pratique</p><h3>Deux mises en situation.<br />Vos réflexes, en action.</h3><div className={styles.examSituations}><p><strong>En ronde</strong><span>Observer, détecter une anomalie et rendre compte.</span></p><p><strong>Au poste de sécurité</strong><span>Traiter une alerte, communiquer et appliquer les consignes.</span></p></div></div></article>
      <div className={styles.examValidation}><span aria-hidden="true">✓</span><div><p className={styles.kicker}>03 · Un jury professionnel</p><p>Vos connaissances et votre pratique sont évaluées en présentiel.</p></div><strong>TFP APS<small>Titre de niveau 3 · RNCP 36648</small></strong></div>
    </div>
    <details className={styles.examMore}><summary>Les modalités de l’examen, le SST et la suite du parcours <span className={styles.plus} aria-hidden="true">+</span></summary><div className={styles.examMoreGrid}>{steps.map(([number, title, text]) => <article key={number}><h4>{title}</h4><p>{text}</p></article>)}<article><h4>Avant l’examen</h4><p>La convocation précise la date, l’horaire, le lieu et les pièces à présenter. QCU, rondes, main courante et mises en situation rythment votre préparation.</p></article><article><h4>Le SST a sa propre évaluation</h4><p>Le certificat Sauveteur Secouriste du Travail est délivré après validation des compétences lors des épreuves certificatives du module SST.</p></article><article><h4>Après les résultats</h4><p>Après la réussite au TFP APS, vous demandez votre carte professionnelle au CNAPS. Si une épreuve reste à valider, l’équipe vous explique les suites adaptées à votre résultat.</p></article></div><a href="https://www.francecompetences.fr/recherche/rncp/36648/" target="_blank" rel="noopener noreferrer">Consulter la fiche officielle du TFP APS ↗</a></details>
  </>;
}

export function ApsFundingLogo({ title }: { title: string }) {
  const logo = title === 'CPF' ? { src: '/images/mon-compte-formation.svg', alt: 'Mon Compte Formation' }
    : title === 'France Travail' ? { src: '/images/financements/france-travail.svg', alt: 'France Travail' }
    : title === 'Employeur ou OPCO' ? { src: '/images/financements/akto.svg', alt: 'AKTO, opérateur de compétences' } : null;
  return <div className={styles.fundingLogo}>{logo ? <Image {...logo} width={150} height={58} /> : <svg viewBox="0 0 48 32" fill="none" aria-hidden="true"><rect x="2" y="2" width="44" height="28" rx="5" stroke="currentColor" strokeWidth="2"/><path d="M2 11h44M9 22h9" stroke="currentColor" strokeWidth="3"/></svg>}</div>;
}
