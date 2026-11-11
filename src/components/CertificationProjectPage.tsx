import type { Metadata } from 'next';
import Image from 'next/image';
import type { CertificationProject } from '@/data/certification-projects';
import { TrainingReferencePage, TrainingReferenceHero, TrainingReferenceSection as Section, TrainingReferenceMissions, TrainingReferenceCampus, TrainingReferenceContact, TrainingReferenceAction, TrainingReferenceMobileBar } from '@/components/TrainingReferenceLayout';
import { TrainingSectionNavigation, type TrainingSectionNavigationItem } from '@/components/TrainingSectionNavigation';
import { TrainingProgramExplorer } from '@/components/TrainingProgramExplorer';
import { PremiumFAQSection } from '@/components/FAQ';
import experience from './ApsExperience.module.css';
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

const chapters: readonly TrainingSectionNavigationItem[] = [
  { href: '#metier', label: 'Métier' },
  { href: '#acces', label: 'Admission' },
  { href: '#competences', label: 'Compétences' },
  { href: '#evaluation', label: 'Évaluation' },
  { href: '#parcours', label: 'Parcours' },
  { href: '#debouches', label: 'Débouchés' },
  { href: '#faq-projet', label: 'FAQ' },
];

const presentation = {
  cpiaa: {
    heading: 'Chef de produit', accent: 'IA et automatisation.',
    tagline: 'Du besoin utilisateur au produit qui fait la différence.',
    caption: 'Comprendre. Concevoir. Piloter.',
    heroAlt: 'Illustration de professionnels qui construisent la feuille de route d’un produit d’intelligence artificielle',
    missionAlt: 'Illustration d’un atelier de test d’un prototype avec des utilisateurs',
    missionTitle: 'Transformer une idée en produit utile.',
    missionDescription: 'Comprendre les utilisateurs, expérimenter une solution et prendre les bonnes décisions : le chef de produit donne une direction au projet et coordonne les personnes qui le réalisent.',
    missions: [
      ['Comprendre les usages', 'Analyser les besoins et les processus pour choisir les cas d’usage pertinents.'],
      ['Donner une direction', 'Construire la proposition de valeur, le modèle économique et la feuille de route.'],
      ['Mesurer les résultats', 'Suivre l’adoption, la qualité et la valeur du produit pour décider de ses évolutions.'],
    ],
    audiences: ['Professionnels du numérique', 'Chefs de projet', 'Profils marketing et produit', 'Managers en évolution'],
  },
  eiag: {
    heading: 'Expert en ingénierie', accent: 'de l’IA générative.',
    tagline: 'De l’architecture au système fiable en production.',
    caption: 'Concevoir. Développer. Fiabiliser.',
    heroAlt: 'Illustration de deux professionnels qui conçoivent un système d’intelligence artificielle générative',
    missionAlt: 'Illustration d’une experte qui analyse les résultats de tests d’un système d’IA générative',
    missionTitle: 'Faire fonctionner l’IA dans des conditions réelles.',
    missionDescription: 'Choisir une architecture, développer les composants et vérifier leurs limites : l’expert construit des systèmes dont il peut démontrer la fiabilité, la sécurité et la qualité de fonctionnement.',
    missions: [
      ['Concevoir le système', 'Traduire le besoin métier en architecture et préparer les données nécessaires.'],
      ['Développer et tester', 'Intégrer les modèles, les composants et les interfaces, puis produire des essais reproductibles.'],
      ['Maîtriser l’exploitation', 'Surveiller la qualité, résoudre les incidents et organiser les évolutions du système.'],
    ],
    audiences: ['Développeurs', 'Professionnels de la donnée', 'Profils informatique', 'Experts techniques en évolution'],
  },
} as const;

export function CertificationProjectPage({ project }: { project: CertificationProject }) {
  const copy = presentation[project.slug];
  const theme = project.slug === 'cpiaa' ? 'turquoise' : 'violet';
  const illustration = { src: `/images/certifications/${project.slug}-hero.webp`, alt: copy.heroAlt };
  const emailHref = `mailto:ecole@integraleacademy.com?subject=${encodeURIComponent(`Information sur le projet ${project.acronym}`)}`;
  const units = project.blocks.map((block, index) => ({
    number: block.code,
    title: block.title,
    description: block.summary,
    delivery: `Évaluation prévue : ${project.assessments[index]}`,
  }));
  const faq = [
    { q: 'La certification est-elle déjà enregistrée au RNCP ?', a: 'Non. La demande d’enregistrement est en préparation. Le projet n’est pas enregistré au RNCP à ce jour et son niveau reste soumis à la décision de France compétences.' },
    { q: 'Quel est le niveau demandé ?', a: 'Le niveau 7 est demandé dans le projet. Il s’agit du niveau de qualification visé à la sortie, et non du niveau de diplôme exigé pour candidater à la formation.' },
    { q: 'Quels sont les prérequis ?', a: project.entryRequirement },
    { q: 'Combien de temps durera la formation ?', a: 'Aucun volume horaire global n’est fixé à ce stade. La durée, les modalités et le calendrier seront définis après positionnement et communiqués avant toute contractualisation.' },
    { q: 'Les blocs pourront-ils être validés séparément ?', a: 'Le dispositif prévu permet de capitaliser les blocs acquis. La délivrance du titre reposera sur la validation des quatre blocs, sans compensation entre compétences ou entre blocs.' },
    { q: 'Peut-on déjà s’inscrire ou utiliser son CPF ?', a: 'Cette page présente un projet de certification. Aucune session ni aucun tarif n’est annoncé ici, et aucune éligibilité au CPF n’est annoncée à ce stade. Notre équipe peut vous renseigner sur les prérequis et l’avancement du projet.' },
  ];

  return <article className={styles.project} data-certification-project={project.slug}>
    <TrainingReferencePage theme={theme}>
      <TrainingReferenceHero id={project.slug} badge={`Projet de certification · ${project.acronym}`} heading={copy.heading} accent={copy.accent} title={project.title} tagline={copy.tagline} description={project.introduction} illustration={illustration} caption={copy.caption} primaryAction={{ href: '#competences', label: 'Découvrir les compétences' }}>
        <aside className={styles.summary} aria-label={`Le projet ${project.acronym} en bref`}>
          <div className={styles.identity}>
            <Image src={`/images/certifications/${project.slug}.webp`} width={160} height={160} sizes="130px" alt={`Logo ${project.acronym}`} className={styles.logo} />
            <div><p className={styles.kicker}>Intégrale Academy</p><strong>{project.acronym}</strong><p>Projet de titre<br />à finalité professionnelle</p></div>
          </div>
          <dl className={styles.facts}>
            <div><dt>Niveau demandé</dt><dd>Niveau 7</dd></div>
            <div><dt>Compétences</dt><dd>4 blocs</dd></div>
            <div><dt>Accès prévu</dt><dd>Sur positionnement</dd></div>
            <div><dt>Durée</dt><dd>Après positionnement</dd></div>
          </dl>
          <div className={styles.status}><span className={styles.statusLabel}>En préparation</span><h2>Demande d’enregistrement au RNCP</h2><p>Projet non enregistré à ce jour. Le niveau demandé reste soumis à la décision de France compétences.</p></div>
        </aside>
      </TrainingReferenceHero>

      <TrainingSectionNavigation mark={project.acronym} title={project.acronym} eyebrowLabel="Projet de certification" theme={theme} items={chapters} registrationHref="#contact" registrationLabel="Nous contacter" ariaLabel={`Sommaire du projet ${project.acronym}`} />

      <Section id="metier" eyebrow="Le métier, concrètement" title={<>Des idées aux <em>réalisations.</em></>} intro={project.objective}>
        <TrainingReferenceMissions label="Votre métier" items={[{ title: copy.missionTitle, description: copy.missionDescription, illustration: { src: `/images/certifications/${project.slug}-mission.webp`, alt: copy.missionAlt }, body: <p className={styles.role}>{project.role}</p> }]} />
        <div className={styles.missionGrid}>{copy.missions.map(([title, text], index) => <article key={title} className={styles.missionCard}><span className={styles.number}>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        <div className={styles.audience}><strong>À qui s’adresse le projet ?</strong><div>{copy.audiences.map(audience => <span key={audience}>{audience}</span>)}</div><p>Sous réserve de satisfaire les prérequis et le positionnement prévus.</p></div>
      </Section>

      <Section id="acces" eyebrow="Conditions d’accès prévues" title={<>Votre expérience,<br /><em>le point de départ.</em></>} tone="stone" intro="Un dossier, un entretien et une mise en situation pour examiner les acquis et préparer un parcours adapté.">
        <div className={`${experience.admission} ${styles.admission}`}>
          <div className={experience.admissionLead}>
            <p className={experience.kicker}>Préparer son projet</p><h3>Faisons le point<br /><em>sur votre parcours.</em></h3><p>Le positionnement identifiera vos acquis, les compétences à développer et les éventuelles remises à niveau. Les exigences à la sortie resteront les mêmes pour tous les candidats.</p><TrainingReferenceAction href="#contact">Échanger avec notre équipe →</TrainingReferenceAction>
          </div>
          <div className={experience.requirements}>
            {[
              { title: 'Diplôme ou expérience professionnelle', content: <p>{project.entryRequirement}</p> },
              { title: 'Compétences à maîtriser à l’entrée', content: <ul className={styles.requirementList}>{project.entrySkills.map(skill => <li key={skill}>{skill}</li>)}</ul> },
              { title: 'Dossier et modalités d’admission', content: <p>{project.admission}</p> },
            ].map((item, index) => <details className={experience.requirement} key={item.title} open={index === 0}><summary><span>0{index + 1}</span><h3>{item.title}</h3><span className={experience.plus} aria-hidden="true">+</span></summary>{item.content}</details>)}
          </div>
        </div>
      </Section>

      <Section id="competences" eyebrow="Le référentiel du projet" title={<>Quatre blocs pour<br /><em>maîtriser le métier.</em></>} intro="Explorez les compétences et les productions prévues pour chaque bloc. Les intitulés reprennent le référentiel du projet de certification." tone="paper">
        <div className={styles.program}><TrainingProgramExplorer units={units} idPrefix={project.slug} hours="4" unitLabel="blocs" overview="Un parcours de compétences capitalisables" subtitle="Référentiel du projet · demande RNCP en préparation" facts={[["Niveau demandé", "7"], ["Évaluation", "1 épreuve / bloc"], ["Oral", "45 min / bloc"]]} menuTitle="Les blocs de compétences" tabListLabel={`Blocs de compétences ${project.acronym}`} illustration={{ src: `/images/certifications/${project.slug}.webp`, alt: `Logo de la certification en projet ${project.acronym}` }} nextLabel="Bloc suivant" restartLabel="Revenir au premier bloc" /></div>
      </Section>

      <Section id="evaluation" eyebrow="Les évaluations prévues" title={<>Présenter son travail.<br /><em>Démontrer sa maîtrise.</em></>} intro="Quatre épreuves individuelles, une par bloc, à partir d’un contexte professionnel réel ou reconstitué." tone="dark" className={styles.evaluation}>
        <div className={styles.examGrid}>{project.assessments.map((assessment, index) => <article key={assessment} className={styles.examCard}><span>Épreuve 0{index + 1} · {project.blocks[index].code}</span><h3>{assessment.replace(' et soutenance individuelle.', '')}</h3><p>Production préparée et remise en amont, puis soutenance individuelle devant le jury.</p></article>)}</div>
        <div className={styles.oral}>
          <div className={styles.oralHeading}><span>Pour chaque bloc</span><strong>45 <small>minutes d’oral</small></strong></div>
          <ol>{[['15 min', 'Présenter le travail'], ['15 min', 'Démonstration ou aléa imposé'], ['15 min', 'Répondre au jury']].map(([time, label]) => <li key={label}><strong>{time}</strong><span>{label}</span></li>)}</ol>
          <p>Le temps de lecture du dossier par le jury est distinct de ces 45 minutes. La contribution personnelle sera vérifiée ; les outils d’IA utilisés devront être déclarés et leurs résultats contrôlés.</p>
        </div>
        <div className={styles.validation}><div><h3>Valider les quatre blocs</h3><p>Chaque compétence devra satisfaire tous les critères qui lui sont associés. La délivrance du titre reposera sur la validation des quatre blocs, sans compensation entre compétences ou entre blocs.</p></div><div><h3>Conserver les acquis</h3><p>Les blocs acquis donneront lieu à une attestation et seront capitalisables. Seuls les blocs non acquis seront à représenter. Aucune correspondance automatique avec une autre certification n’est prévue.</p></div></div>
      </Section>

      <Section id="parcours" eyebrow="Parcours et accompagnement" title={<>Un projet qui tient compte<br /><em>de votre expérience.</em></>} intro="La formation et la VAE sont deux voies prévues dans le projet. Elles répondent aux mêmes exigences de compétences.">
        <div className={styles.pathways}>
          <article><span className={styles.number}>01</span><p className={styles.kicker}>Par la formation</p><h3>Un parcours après positionnement</h3><p>La préparation sera adaptée aux acquis et aux écarts identifiés. Les séquences, les modalités, le calendrier et la durée seront arrêtés avant contractualisation.</p><div className={styles.note}>Aucun volume horaire global, aucune date de session et aucun tarif ne sont annoncés à ce stade.</div></article>
          <article><span className={styles.number}>02</span><p className={styles.kicker}>Par l’expérience</p><h3>Une voie VAE prévue</h3><p>Le candidat présentera un dossier d’expériences, des preuves professionnelles et un entretien de 45 minutes par bloc présenté, selon les mêmes compétences et critères.</p><div className={styles.note}>Les prérequis d’entrée en formation ne s’appliquent pas à la VAE. Le lien entre l’expérience et les activités visées sera examiné.</div></article>
        </div>
        <div className={styles.accessibility}><span aria-hidden="true">↗</span><div><h3>Accessibilité et handicap</h3><p>Les besoins d’aménagement seront étudiés avec le référent handicap pour adapter les conditions d’accès et d’évaluation, en préservant les compétences et les critères exigés.</p></div><a href={emailHref}>Préparer cet échange →</a></div>
      </Section>

      <TrainingReferenceCampus title="Une école, une équipe, des lieux." description="Découvrez les espaces d’Intégrale Academy à Puget-sur-Argens. L’organisation propre à chaque futur parcours sera précisée avant contractualisation." />

      <Section id="debouches" eyebrow="Les perspectives professionnelles" title={<>Des compétences pour<br /><em>des métiers concrets.</em></>} tone="stone" intro="Les responsabilités confiées dépendent de l’expérience, du contexte d’emploi et de l’organisation.">
        <div className={styles.careers}><div><h3>Les emplois visés</h3><ul className={styles.jobs}>{project.jobs.map(job => <li key={job}><span aria-hidden="true">↗</span>{job}</li>)}</ul>{project.employmentNote && <p className={styles.employmentNote}>{project.employmentNote}</p>}</div><aside className={styles.sectors}><p className={styles.kicker}>Les environnements de travail</p><h3>Où exercer ?</h3><p>Dans les organisations qui conçoivent, intègrent ou exploitent des produits et services fondés sur l’IA.</p><ul><li>Éditeurs de logiciels et plateformes numériques</li><li>ESN et cabinets de conseil</li><li>Industrie, services et commerce</li><li>Finance et santé, selon les exigences du secteur</li><li>Administrations et organisations publiques</li></ul></aside></div>
      </Section>

      <PremiumFAQSection id="faq-projet" badge={`Questions fréquentes · ${project.acronym}`} title={<>Des réponses pour<br /><em>préparer votre projet.</em></>} description="Niveau, admission, durée et statut du projet : les informations à connaître avant d’aller plus loin." items={faq} theme={project.slug === 'cpiaa' ? 'blue' : 'violet'} contactHref={emailHref} contactLabel="Poser ma question" callLabel="Appeler l’équipe" />

      <div id="contact"><TrainingReferenceContact href="/contact#demande" title={`Parlons de votre projet ${project.acronym}.`} description="Notre équipe vous renseigne sur les compétences visées, les prérequis et les modalités envisagées. Cet échange permet aussi de faire le point sur votre parcours." additionalActions={<a href={emailHref} className={styles.emailLink}>Nous écrire au sujet de {project.acronym} →</a>} /></div>
      <div className={styles.legal}><p>Organisme porteur : Intégrale Sécurité Formations · Nom commercial : Intégrale Academy.</p><p>Projet de certification — demande d’enregistrement au RNCP en préparation. Le niveau 7 demandé reste soumis à la décision de France compétences.</p></div>
      <TrainingReferenceMobileBar href="#contact" label="Nous contacter" />
    </TrainingReferencePage>
  </article>;
}
