import type { Metadata } from 'next';
import Image from 'next/image';
import type { CertificationProject } from '@/data/certification-projects';
import styles from './CertificationProjectPage.module.css';

export function certificationProjectMetadata(project: CertificationProject): Metadata {
  const title = `${project.acronym} — ${project.title}`;
  const pageUrl = new URL(`/certifications/${project.slug}`, 'https://integraleacademyofficiel-1.onrender.com');
  return {
    metadataBase: new URL(pageUrl.origin),
    title,
    description: project.description,
    robots: { index: false, follow: true },
    openGraph: {
      url: pageUrl.href,
      title,
      description: project.description,
      type: 'website',
      images: [{ url: `/images/certifications/${project.slug}.webp`, alt: `Logo du projet ${project.acronym}` }],
    },
    twitter: {
      card: 'summary',
      title,
      description: project.description,
      images: [`/images/certifications/${project.slug}.webp`],
    },
  };
}

const chapters = [
  ['objectif', 'Le métier'],
  ['competences', 'Les compétences'],
  ['acces', 'Les conditions d’accès'],
  ['evaluation', 'L’évaluation'],
  ['parcours', 'Les parcours'],
  ['debouches', 'Les débouchés'],
] as const;

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
}

function SectionHeading({ number, label, title, id }: { number: string; label: string; title: string; id: string }) {
  return <div className={styles.sectionHeading}>
    <p className={styles.eyebrow}>{number} / {label}</p>
    <h2 id={id}>{title}</h2>
  </div>;
}

export function CertificationProjectPage({ project }: { project: CertificationProject }) {
  return <article className={`${styles.page} ${project.slug === 'cpiaa' ? styles.turquoise : styles.violet}`}>
    <header className={styles.hero}>
      <div className={styles.container}>
        <p className={styles.breadcrumb}>Intégrale Academy <span aria-hidden="true">/</span> Projet de certification</p>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{project.acronym} · Intelligence artificielle</p>
            <h1>{project.title}</h1>
            <p className={styles.introduction}>{project.introduction}</p>
            <a className={styles.textLink} href="#competences">Découvrir les compétences visées <Arrow /></a>
          </div>
          <div className={styles.identity}>
            <div className={styles.logoPanel}>
              <Image src={`/images/certifications/${project.slug}.webp`} width={640} height={640} sizes="220px" priority alt={`Logo ${project.acronym} — ${project.title}`} className={styles.logo} />
            </div>
            <p className={styles.identityLabel}>Un projet porté par<br /><strong>Intégrale Academy</strong></p>
          </div>
        </div>
        <div className={styles.status}>
          <span className={styles.statusMark} aria-hidden="true" />
          <div><strong>Demande d’enregistrement au RNCP en préparation</strong><p>Ce projet n’est pas enregistré au RNCP à ce jour. Le niveau 7 est demandé et reste soumis à la décision de France compétences.</p></div>
        </div>
        <dl className={styles.facts}>
          <div><dt>Niveau demandé</dt><dd>7</dd></div>
          <div><dt>Structure du projet</dt><dd>4 blocs <span>capitalisables</span></dd></div>
          <div><dt>Accès au parcours</dt><dd>Sur positionnement</dd></div>
        </dl>
      </div>
    </header>

    <nav className={styles.chapterNav} aria-label={`Rubriques de la présentation ${project.acronym}`}>
      <div className={styles.container}>{chapters.map(([id, label], index) => <a key={id} href={`#${id}`}><span>0{index + 1}</span>{label}</a>)}</div>
    </nav>

    <section id="objectif" className={styles.section} aria-labelledby="objectif-title">
      <div className={`${styles.container} ${styles.editorialGrid}`}>
        <SectionHeading number="01" label="Finalité professionnelle" title="Le métier au cœur du projet." id="objectif-title" />
        <div className={styles.prose}><p className={styles.lead}>{project.objective}</p><p>{project.role}</p></div>
      </div>
    </section>

    <section id="competences" className={`${styles.section} ${styles.tintedSection}`} aria-labelledby="competences-title">
      <div className={styles.container}>
        <div className={styles.headingRow}>
          <SectionHeading number="02" label="Compétences visées" title="Quatre blocs, un parcours cohérent." id="competences-title" />
          <p>Le référentiel du projet organise les activités professionnelles en quatre blocs, chacun avec ses propres compétences et critères d’évaluation.</p>
        </div>
        <div className={styles.blockGrid}>{project.blocks.map((block, index) => <section key={block.code} className={styles.block} aria-labelledby={`${block.code}-title`}>
          <div className={styles.blockTop}><span className={styles.blockNumber}>0{index + 1}</span><span>Bloc de compétences {index + 1}</span></div>
          <h3 id={`${block.code}-title`}>{block.title}</h3>
          <p>{block.summary}</p>
        </section>)}</div>
      </div>
    </section>

    <section id="acces" className={styles.section} aria-labelledby="acces-title">
      <div className={`${styles.container} ${styles.editorialGrid}`}>
        <div>
          <SectionHeading number="03" label="Conditions d’accès prévues" title="Des acquis à vérifier avant de commencer." id="acces-title" />
          <p className={styles.sideNote}>Le positionnement permettra d’adapter la préparation, tout en conservant les mêmes exigences de compétences à la sortie.</p>
        </div>
        <div className={styles.prose}>
          <h3>Prérequis à l’entrée en formation</h3>
          <p>{project.entryRequirement}</p>
          <h3>Compétences vérifiées</h3>
          <ul className={styles.list}>{project.entrySkills.map(skill => <li key={skill}>{skill}</li>)}</ul>
          <h3>Étude du parcours et admission</h3>
          <p>{project.admission}</p>
        </div>
      </div>
    </section>

    <section id="evaluation" className={`${styles.section} ${styles.evaluationSection}`} aria-labelledby="evaluation-title">
      <div className={styles.container}>
        <div className={styles.headingRow}>
          <SectionHeading number="04" label="Dispositif d’évaluation prévu" title="Démontrer sa maîtrise en situation." id="evaluation-title" />
          <p>Quatre épreuves individuelles sont prévues, une par bloc, à partir d’un contexte professionnel réel ou reconstitué.</p>
        </div>
        <div className={styles.evaluationGrid}>
          <div>
            <h3 className={styles.smallHeading}>Les productions attendues</h3>
            <ol className={styles.assessments}>{project.assessments.map((assessment, index) => <li key={assessment}><span>E{index + 1}</span><p>{assessment}</p></li>)}</ol>
            <p className={styles.evaluationNote}>Les productions seront préparées et remises en amont. Le jury vérifiera la contribution personnelle du candidat. Les outils d’IA utilisés devront être déclarés et leurs résultats contrôlés.</p>
          </div>
          <div className={styles.oralPanel}>
            <p className={styles.eyebrow}>Pour chaque bloc</p>
            <p className={styles.oralDuration}>45 <span>minutes d’oral</span></p>
            <ol className={styles.oralSteps}>
              <li><strong>15 min</strong><span>Présentation du travail</span></li>
              <li><strong>15 min</strong><span>Démonstration ou traitement d’un aléa imposé</span></li>
              <li><strong>15 min</strong><span>Questions du jury</span></li>
            </ol>
            <p>Le temps de lecture du dossier par le jury est distinct de ces 45 minutes.</p>
          </div>
        </div>
        <div className={styles.validation}>
          <h3>Validation et capitalisation prévues</h3>
          <div>
            <p>La délivrance du titre reposera sur la validation des quatre blocs. Chaque compétence devra satisfaire tous les critères qui lui sont associés, sans compensation entre compétences ou entre blocs.</p>
            <p>Les blocs acquis donneront lieu à une attestation et seront capitalisables. En cas de validation partielle, seuls les blocs non acquis seront à représenter. Aucune correspondance automatique avec une autre certification n’est prévue.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="parcours" className={styles.section} aria-labelledby="parcours-title">
      <div className={styles.container}>
        <SectionHeading number="05" label="Parcours et accompagnement" title="Tenir compte de l’expérience de chacun." id="parcours-title" />
        <div className={styles.pathways}>
          <div><span className={styles.pathwayLabel}>Formation</span><h3>Un parcours défini après positionnement</h3><p>La préparation sera adaptée aux acquis et aux écarts identifiés. Les séquences, les modalités, le calendrier et la durée seront arrêtés avant contractualisation. Aucun volume horaire global n’est fixé à ce stade.</p></div>
          <div><span className={styles.pathwayLabel}>Validation des acquis de l’expérience</span><h3>Une voie VAE prévue dans le projet</h3><p>Le candidat présentera un dossier d’expériences, des preuves professionnelles et un entretien de 45 minutes par bloc présenté, selon les mêmes compétences et critères. Les prérequis d’entrée en formation ne s’appliquent pas à la VAE ; le lien entre l’expérience et les activités visées sera examiné.</p></div>
        </div>
        <div className={styles.accessibility}>
          <h3>Accessibilité et handicap</h3>
          <p>Les besoins d’aménagement seront étudiés avec le référent handicap afin d’adapter les conditions d’accès et d’évaluation, en préservant les compétences et les critères exigés. Notre équipe peut être contactée pour préparer cet échange.</p>
        </div>
      </div>
    </section>

    <section id="debouches" className={`${styles.section} ${styles.tintedSection}`} aria-labelledby="debouches-title">
      <div className={styles.container}>
        <SectionHeading number="06" label="Environnements professionnels" title="Les secteurs et les emplois visés." id="debouches-title" />
        <div className={styles.careerGrid}>
          <div className={styles.prose}><h3>Secteurs d’activité</h3><p>Le métier s’exerce dans les organisations qui conçoivent, intègrent ou exploitent des produits et services fondés sur l’IA :</p><ul className={styles.list}><li>Éditeurs de logiciels, plateformes et fournisseurs de services numériques.</li><li>Entreprises de services du numérique et cabinets de conseil.</li><li>Entreprises de l’industrie, des services, du commerce, de la finance ou de la santé, selon les exigences propres à chaque secteur.</li><li>Administrations, établissements et autres organisations publiques développant des services numériques.</li></ul></div>
          <div className={styles.prose}><h3>Emplois directement visés</h3><ul className={styles.list}>{project.jobs.map(job => <li key={job}>{job}</li>)}</ul><p className={styles.careerNote}>Les responsabilités confiées dépendent de l’expérience, du contexte d’emploi et de l’organisation.</p>{project.employmentNote && <p className={styles.careerNote}>{project.employmentNote}</p>}</div>
        </div>
      </div>
    </section>

    <section className={styles.contactSection} aria-labelledby="contact-project-title">
      <div className={`${styles.container} ${styles.contactGrid}`}>
        <div><p className={styles.eyebrow}>À propos du projet {project.acronym}</p><h2 id="contact-project-title">Échanger avec<br /><em>Intégrale Academy.</em></h2><p>Notre équipe vous renseigne sur le périmètre du projet, les prérequis et les modalités envisagées.</p></div>
        <div className={styles.contactLinks}><a href={`mailto:ecole@integraleacademy.com?subject=${encodeURIComponent(`Information sur le projet ${project.acronym}`)}`} className={styles.contactButton}>Nous écrire au sujet de {project.acronym} <Arrow /></a><a href="tel:+33422470768" className={styles.phone}>04 22 47 07 68</a><p>Organisme porteur : Intégrale Sécurité Formations<br />Nom commercial : Intégrale Academy</p></div>
      </div>
    </section>
  </article>;
}
