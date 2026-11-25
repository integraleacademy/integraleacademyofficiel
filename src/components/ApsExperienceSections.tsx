import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ApsElearningPreview } from './ApsElearningPreview';
import styles from './ApsExperience.module.css';

type AdmissionPoint = { title: string; content: ReactNode };

export function TrainingAdmission({ course, points, lead, action, actionLabel = 'Faire vérifier mon dossier', afterPoints, note, steps }: {
  course: string; points: AdmissionPoint[]; lead: ReactNode; action: string; actionLabel?: string; afterPoints?: ReactNode; note?: ReactNode; steps?: ReactNode;
}) {
  return <div className={styles.admission}>
    <aside className={styles.admissionLead}>
      <span className={styles.documentIcon} aria-hidden="true"><svg viewBox="0 0 64 64" fill="none"><rect x="14" y="8" width="36" height="48" rx="5" stroke="currentColor" strokeWidth="2"/><path d="M23 21h18M23 29h12M23 40l6 6 13-14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
      <p className={styles.kicker}>Votre entrée en formation</p>
      {lead}
      <Link className={styles.primaryLink} href={action}>{actionLabel} <span aria-hidden="true">↗</span></Link>
      <p className={styles.small}>{note ?? 'L’autorisation préalable est nécessaire avant l’entrée en formation, sauf carte professionnelle valide.'}</p>
    </aside>
    <div className={styles.requirements}>
      <p className={styles.kicker}>Les points à vérifier avec nous</p>
      {points.map(({ title, content }, index) => <details key={title} name={`${course}-admission`} className={styles.requirement}>
        <summary><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><span className={styles.plus} aria-hidden="true">+</span></summary>
        {content}
      </details>)}
      <p className={styles.admissionSteps}>{steps ?? <>Échange conseiller <span>→</span> Vérification du dossier <span>→</span> Demande CNAPS (ministère de l’Intérieur) <span>→</span> Admission confirmée</>}</p>
      {afterPoints}
    </div>
  </div>;
}

export function ApsAdmission({ prerequisites, href }: { prerequisites: string[][]; href: string }) {
  return <TrainingAdmission course="aps" action={href} points={prerequisites.map(([title, text]) => ({ title, content: <p>{text}</p> }))}
    lead={<><h3>Votre projet.<br />Votre dossier.<br /><em>On s’en occupe ensemble</em></h3>
      <p className={styles.admissionSupport}><strong>Notre équipe vous accompagnera pour constituer et déposer votre demande d’autorisation préalable.</strong></p>
      <p>Nous vérifierons votre situation et les pièces de votre dossier CNAPS (ministère de l’Intérieur). Vous saurez quoi préparer et quelles seront les prochaines étapes.</p></>} />;
}

const demoUrl = 'https://gestionstagiaires-test-v2.onrender.com/e-learning/demo/aps/cours';

export function ApsHybridExperience() {
  return <>
    <div className={styles.hybrid}>
      <div className={styles.remoteCopy}><p className={styles.kicker}>Apprendre à distance</p><h3><strong>51 h</strong><br />sur la plateforme de cours</h3><p>Votre espace est accessible 24 h/24. L’équipe pédagogique suit votre progression et répond à vos questions.</p><a className={styles.primaryLink} href={demoUrl} target="_blank" rel="noopener noreferrer">Essayer un cours en ligne <span aria-hidden="true">↗</span></a></div>
      <ApsElearningPreview />
    </div>
    <div className={styles.inPerson}><div><p className={styles.kicker}>À Puget-sur-Argens</p><h3><strong>124 h</strong> à l’école</h3></div><p><strong>63,5 h de pratique</strong><span>Ateliers en groupe.</span></p><p><strong>60,5 h de théorie</strong><span>Travail en salle avec le formateur.</span></p><a href="#pratique">Voir les ateliers <span aria-hidden="true">↑</span></a></div>
    <ol className={styles.hybridSteps}>{[['Accueil au centre','Présentation du parcours'],['Cours en ligne','Depuis votre espace personnel'],['Retour à l’école','Avec votre promotion'],['Examen en présentiel','Évaluation devant jury']].map(([title, text], index) => <li key={title}><span>0{index+1}</span><div><strong>{title}</strong><small>{text}</small></div></li>)}</ol>
  </>;
}

export function TrainingExamExperience({ metric, suffix, label, description, theory, practice, validation, children }: {
  metric: string; suffix?: string; label: string; description: string; theory: ReactNode; practice: ReactNode; validation: ReactNode; children?: ReactNode;
}) {
  return <>
    <div className={styles.examSuccess} aria-label={`${label} : ${metric}${suffix ?? ''}. ${description}`}>
      <strong className={styles.successRate}>{metric}<span>{suffix}</span></strong>
      <div><p>{label}</p><span>{description}</span></div><span className={styles.successSeal}><CertificateSeal /></span>
    </div>
    <div className={styles.exam}>
      <article className={styles.examTheory}>{theory}</article>
      <article className={styles.examPractice}>{practice}</article>
      <div className={styles.examValidation}><span aria-hidden="true">✓</span>{validation}</div>
    </div>
    {children}
  </>;
}

export function ApsExamExperience({ steps }: { steps: string[][] }) {
  return <TrainingExamExperience metric="95" suffix=" %" label="Taux de réussite APS" description="Chez Intégrale Academy"
    theory={<><p className={styles.kicker}>01 · Les connaissances</p><h3>QCU<span>Questionnaires à choix unique</span></h3><p>Comprendre une situation professionnelle et choisir la bonne réponse sur support électronique.</p><ul><li>Cadre juridique et limites d’intervention</li><li>Consignes et prévention des risques</li><li>Réactions adaptées aux situations du métier</li></ul><p className={styles.examNote}>Des entraînements réguliers tout au long du parcours.</p></>}
    practice={<><Image src="/images/aps/experience/examen.webp" alt="Une candidate APS signale une anomalie pendant une ronde, sous l’observation d’une examinatrice" width={1536} height={1024} sizes="(max-width: 800px) 92vw, 740px" /><div><p className={styles.kicker}>02 · La pratique</p><h3>Deux mises en situation.<br />Vos réflexes, en action</h3><div className={styles.examSituations}><p><strong>En ronde</strong><span>Observer, détecter une anomalie et rendre compte.</span></p><p><strong>Au poste de sécurité</strong><span>Traiter une alerte, communiquer et appliquer les consignes.</span></p></div></div></>}
    validation={<><div><p className={styles.kicker}>03 · Un jury professionnel</p><p>Vos connaissances et votre pratique sont évaluées en présentiel.</p></div><strong>TFP APS<small>Titre de niveau 3 · RNCP 36648</small></strong></>}>
    <details className={styles.examMore}><summary>Les modalités de l’examen, le SST et la suite du parcours <span className={styles.plus} aria-hidden="true">+</span></summary><div className={styles.examMoreGrid}>{steps.map(([number, title, text]) => <article key={number}><h4>{title}</h4><p>{text}</p></article>)}<article><h4>Avant l’examen</h4><p>La convocation précise la date, l’horaire, le lieu et les pièces à présenter. QCU, rondes, main courante et mises en situation rythment votre préparation.</p></article><article><h4>Le SST a sa propre évaluation</h4><p>Le certificat Sauveteur Secouriste du Travail est délivré après validation des compétences lors des épreuves certificatives du module SST.</p></article><article><h4>Après les résultats</h4><p>Après la réussite au TFP APS, vous demandez votre carte professionnelle au CNAPS (ministère de l’Intérieur). Si une épreuve reste à valider, l’équipe vous explique les suites adaptées à votre résultat.</p></article></div><a href="https://www.francecompetences.fr/recherche/rncp/36648/" target="_blank" rel="noopener noreferrer">Consulter la fiche officielle du TFP APS ↗</a></details>
  </TrainingExamExperience>;
}

export function ApsFundingLogo({ title }: { title: string }) {
  const logo = title === 'CPF' ? { src: '/images/mon-compte-formation.svg', alt: 'Mon Compte Formation' }
    : title === 'France Travail' ? { src: '/images/financements/france-travail.svg', alt: 'France Travail' }
    : title === 'Employeur ou OPCO' ? { src: '/images/financements/akto.svg', alt: 'AKTO, opérateur de compétences' } : null;
  return <div className={styles.fundingLogo}>{logo ? <Image {...logo} width={150} height={58} /> : <svg viewBox="0 0 48 32" fill="none" aria-hidden="true"><rect x="2" y="2" width="44" height="28" rx="5" stroke="currentColor" strokeWidth="2"/><path d="M2 11h44M9 22h9" stroke="currentColor" strokeWidth="3"/></svg>}</div>;
}

export function ApsWorkplaces({ places }: { places: string[] }) {
  return <article className={styles.workplaces}>
    <div><p className={styles.kicker}>Des environnements variés</p><h3>Où travailler ?</h3><p>Au contact du public ou sur un site à accès contrôlé, trouvez l’environnement qui vous correspond.</p></div>
    <ul>{places.map(place => <li key={place}>{place}</li>)}</ul>
    <p className={styles.workplaceNote}><strong>Un métier, plusieurs rythmes.</strong> Jour ou nuit, temps plein ou partiel, poste fixe ou mobile : les horaires et les conditions varient selon les missions.</p>
  </article>;
}

type OfficialReferencesProps = {
  course: string; number: string; title: ReactNode; intro: string; qualification: string; name: string;
  level?: string; registryCode: string; registryLabel?: string; id?: string; url: string; facts: string[][]; conditions: string[];
  profession: string; professionNote: string; stats?: string[][]; caption?: string; supplement?: ReactNode;
  statsNote?: string; detailsTitle: string; details: ReactNode;
  certificateLabel?: string; sourceLabel?: string; conditionsLabel?: string; statsTitle?: string; alias?: string;
};

function CertificateSeal() {
  return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <circle cx="24" cy="18" r="12"/><path d="m18 29-3 15 9-5 9 5-3-15M18 18l4 4 8-8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}

export function TrainingOfficialReferences(props: OfficialReferencesProps) {
  const headingId = `${props.course}-references-title`;
  return <section id={props.id ?? "reperes-rncp"} aria-labelledby={headingId} className={styles.references}>
    <div className="page-container" id={props.alias}>
      <div className={styles.referencesHeading}><div><p className={styles.kicker}>{props.number} — Repères officiels</p><h2 id={headingId}>{props.title}</h2></div><p>{props.intro}</p></div>
      <div className={styles.referenceOverview}>
        <article className={styles.certificateCard}>
          <div className={styles.certificateHeading}><span className={styles.certificateSeal}><CertificateSeal /></span><div><p className={styles.kicker}>{props.certificateLabel ?? 'Certification professionnelle'}</p><h3>{props.qualification}</h3></div>{props.level && <span className={styles.level}>{props.level}</span>}</div>
          <p className={styles.certificateName}>{props.name}</p><p className={styles.certificateNumber}>{props.registryLabel ?? 'Enregistré au Répertoire national des certifications professionnelles'} <strong>{props.registryCode}</strong></p>
          <dl className={styles.certificationData}>{props.facts.map(([term,value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
          <a className={styles.certificateLink} href={props.url} target="_blank" rel="noopener noreferrer">{props.sourceLabel ?? 'Consulter la fiche France compétences'} <span aria-hidden="true">↗</span></a>
        </article>
        <article className={styles.professionCard}><p className={styles.kicker}>{props.conditionsLabel ?? 'Les conditions d’exercice'}</p><h3>{props.profession}</h3>
          <ul className={styles.conditions}>{props.conditions.map(condition => <li key={condition}>{condition}</li>)}</ul>
          <p className={styles.professionNote}>{props.professionNote}</p></article>
      </div>
      {props.supplement}
      {props.stats && <article className={styles.insertionPanel}>
        <div className={styles.insertionHeading}><div><p className={styles.kicker}>Insertion nationale</p><h3>{props.statsTitle ?? 'Que deviennent les certifiés ?'}</h3></div><p>{props.statsNote}</p></div>
        <div className={styles.statsScroll} tabIndex={0} role="region" aria-label="Tableau des données nationales d’insertion, défilement horizontal sur mobile">
          <table><caption>{props.caption}</caption><thead><tr>{['Année', 'Certifiés', 'Insertion globale à 6 mois', 'Métier visé à 6 mois', 'Métier visé à 2 ans'].map(title => <th key={title} scope="col">{title}</th>)}</tr></thead>
            <tbody>{props.stats.map(([year,...values]) => <tr key={year}><th scope="row">{year}</th>{values.map((value,index) => <td key={index}>{value}</td>)}</tr>)}</tbody></table>
        </div>
      </article>}
      <div className={styles.referenceDetails}><details><summary><span>{props.detailsTitle}</span><span className={styles.plus} aria-hidden="true">+</span></summary><div className={styles.referenceContent}>{props.details}</div></details></div>
    </div>
  </section>;
}

export function ApsOfficialReferences({ conditions, stats }: { conditions: string[]; stats: string[][] }) {
  return <TrainingOfficialReferences course="aps" number="10" title={<>Un titre reconnu.<br /><em>Des repères concrets</em></>}
    intro="La certification que vous préparez, les réalités du métier et les données nationales pour situer votre projet."
    qualification="TFP APS" name="Agent de prévention et de sécurité" level="Niveau 3" registryCode="RNCP 36648"
    url="https://www.francecompetences.fr/recherche/rncp/36648/"
    facts={[['Certificateurs','CPNE / ADEF'],['Échéance RNCP','1er juillet 2027'],['Code ROME','K2503'],['Code NSF','344'],['Formacode','42854'],['Certification précédente','RNCP34054']]}
    conditions={conditions} profession="Le quotidien d’un agent APS" professionNote="Disponibilité, ponctualité, maîtrise de soi et qualité du compte rendu font partie des qualités recherchées par les employeurs."
    stats={stats} caption="Promotions 2019 et 2020 — source : fiche RNCP 36648"
    statsNote="Données historiques de France compétences pour la certification nationale. Elles ne correspondent pas aux résultats propres à Intégrale Academy."
    detailsTitle="Voies d’accès, blocs et correspondances"
    details={<><p><strong>Voies d’accès recensées :</strong> apprentissage, formation continue, contrat de professionnalisation, candidature individuelle et VAE. Leur disponibilité chez Intégrale Academy est à confirmer avec l’équipe admissions.</p><p>Capitalisation des blocs : sans objet. Aucune correspondance déclarée avec une autre certification. Le RNCP 36648 remplace le RNCP 34054.</p></>} />;
}
