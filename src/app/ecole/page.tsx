import Image from 'next/image';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { contact } from '@/data/site';
import styles from './ecole.module.css';

export const metadata = createPageMetadata('/ecole');
const appointmentFormUrl = 'https://assistance-alw9.onrender.com/demande-informations-formations';

const team = [
  { name: 'Cassandre Menard', role: 'Responsable commerciale', mission: 'Votre interlocutrice pour choisir votre formation, préparer votre admission et trouver le financement adapté.', specialty: 'Orientation & admissions' },
  { name: 'Aurélie Chaussez', role: 'Chargée des relations clients', mission: 'Le lien entre les apprenants, les entreprises et l’école, pour un parcours bien accompagné.', specialty: 'Relation apprenants & entreprises' },
  { name: 'Elsa Duquesne', role: 'Assistante de direction', mission: 'Un suivi administratif attentif et une organisation quotidienne au service de votre formation.', specialty: 'Organisation & suivi' },
  { name: 'Yannice Libault', role: 'Coordinateur pédagogique · Azzera Academy', mission: 'La coordination des programmes et des intervenants, avec une attention portée au suivi pédagogique.', specialty: 'Pédagogie & coordination' },
];
const certifications = [
  ['Qualiopi', 'Certification qualité n°03169 du 21/10/2024.'],
  ['NDA DREETS', 'Déclaration d’activité n°93830600283.'],
  ['CFA · UAI', 'Côte d’Azur 0831774C · Paris 0756548K.'],
  ['CNAPS', 'Autorisation FOR-083-2027-02-08-20200755135.'],
  ['ADEF', 'Agréments APS 8320032701 · A3P 8320111201 · CPSP 8325091511.'],
  ['SSIAP', 'Référence sécurité incendie n°8323.'],
  ['INRS · SST', 'Habilitation H34836/2020/SST-1/O/07.'],
  ['VTC', 'Agrément préfectoral VTC-26-001.'],
];
function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h16m-6-6 6 6-6 6'} /></svg>;
}

export default function Page() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="school-title">
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.smallLine} /> Notre école · Depuis 2018</p>
          <h1 id="school-title">Un lieu pour<br /> apprendre.<br /><em>Une équipe<br /> pour avancer.</em></h1>
          <p className={styles.intro}>Des métiers concrets. Des personnes engagées. À Puget-sur-Argens, Intégrale Academy vous accompagne dans la suite de votre parcours professionnel.</p>
          <div className={styles.heroActions}>
            <a href="#visite" className={styles.button}>Venez découvrir l’école <Arrow /></a>
            <a href="#equipe" className={styles.textLink}>Rencontrer l’équipe <Arrow diagonal /></a>
          </div>
          <p className={styles.heroTrust}><span aria-hidden="true">✦</span> Formation professionnelle & alternance</p>
        </div>
        <figure className={styles.heroPhoto}>
          <Image src="/images/campus/campus-accueil.jpg" alt="L’accueil d’Intégrale Academy à Puget-sur-Argens, ses sièges jaunes et l’entrée des salles de formation" fill priority sizes="(max-width: 800px) 100vw, 52vw" />
          <span className={styles.photoLabel}>Bienvenue chez vous.</span>
          <figcaption><span>INTÉGRALE ACADEMY</span><span>Puget-sur-Argens · Côte d’Azur <Arrow diagonal /></span></figcaption>
        </figure>
      </div>
      <nav className={`${styles.container} ${styles.chapterNav}`} aria-label="Découvrir notre école">
        <span>FAISONS CONNAISSANCE</span>
        <a href="#equipe"><span>01</span> L’équipe</a><a href="#campus"><span>02</span> Le lieu</a><a href="#pedagogie"><span>03</span> La pédagogie</a><a href="#agrements"><span>04</span> Nos engagements</a>
      </nav>
    </section>

    <section className={styles.stats} aria-label="L’école en quelques repères">
      <div className={`${styles.container} ${styles.statsGrid}`}>
        <div><strong>2018</strong><span>Le début de l’aventure</span></div><div><strong>400 <small>m²</small></strong><span>Pour apprendre à Puget-sur-Argens</span></div><div><strong>4 <small>salles</small></strong><span>Théorie & mise en pratique</span></div><div><strong>3 <small>implantations</small></strong><span>Côte d’Azur, Paris & Centre France</span></div>
      </div>
    </section>

    <section id="equipe" className={styles.section} aria-labelledby="team-title">
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>01 / Les personnes derrière l’école</p><h2 id="team-title">On avance mieux<br /><em>bien entouré.</em></h2></div>
          <p>Avant, pendant et après la formation, des interlocuteurs identifiés vous accompagnent. Voici les personnes à qui vous pouvez vous adresser.</p>
        </div>
        <div className={styles.teamGrid}>
          {team.map((person, index) => <article className={styles.person} key={person.name}>
            <p className={styles.personTop}><span>0{index + 1}</span>{person.specialty}</p><h3>{person.name}</h3><p className={styles.role}>{person.role}</p><p className={styles.mission}>{person.mission}</p>
          </article>)}
        </div>
        <div className={styles.teamBottom}><p>À leurs côtés, des formateurs, évaluateurs et professionnels du terrain interviennent selon les parcours.</p><a href={appointmentFormUrl} className={styles.textLink}>Échanger avec l’équipe <Arrow diagonal /></a></div>
        <article className={styles.founder}>
          <div><p className={styles.eyebrow}>Une école, une conviction</p><h3>Le terrain comme point de départ.<br /><em>L’humain comme fil conducteur.</em></h3></div>
          <div><p>Fondateur et directeur général, <strong>Clément Vaillant</strong> réunit une expérience en sécurité privée, management, communication et formation. Sa conviction : un cadre exigeant et un accompagnement de proximité vont de pair.</p><a href="https://fr.linkedin.com/in/vaillantclement" target="_blank" rel="noopener noreferrer" className={styles.textLink}>Découvrir son parcours <Arrow diagonal /></a></div>
        </article>
      </div>
    </section>

    <section id="campus" className={`${styles.section} ${styles.campusSection}`} aria-labelledby="campus-title">
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>02 / Un lieu pour votre prochain chapitre</p><h2 id="campus-title">Ancrés sur<br /><em>la Côte d’Azur.</em></h2></div>
          <p>Notre école principale, à Puget-sur-Argens, réunit les espaces pour apprendre, s’entraîner et échanger. Un cadre accessible, pensé pour le quotidien des apprenants.</p>
        </div>
        <div className={styles.campusLayout}>
          <div className={styles.addressPanel}>
            <p className={styles.eyebrow}>L’école principale</p><h3>Puget-sur-Argens<span>Var · 83</span></h3>
            <address>54 chemin du Carreou<br />83480 Puget-sur-Argens</address><a href="#visite" className={styles.textLink}>Organiser une visite <Arrow diagonal /></a>
            <div className={styles.access}><span>À 500 m de l’A8</span><span>Parking gratuit</span><span>Bus 4 · Général de Gaulle</span></div>
          </div>
          <div className={styles.facilities}>
            <div><span>01</span><div><h3>Apprendre & pratiquer</h3><p>Quatre salles de cours et des espaces de mise en situation pour relier la théorie aux réalités du métier.</p></div></div>
            <div><span>02</span><div><h3>Travailler & progresser</h3><p>Une salle informatique équipée Mac / PC pour les enseignements et les travaux numériques.</p></div></div>
            <div><span>03</span><div><h3>Se retrouver & échanger</h3><p>Un espace détente pour partager une pause et créer des liens tout au long de la formation.</p></div></div>
          </div>
        </div>
        <details className={styles.locations}>
          <summary><span>Et aussi, selon les sessions : <strong>Paris & Aurillac</strong></span><span className={styles.plus} aria-hidden="true">+</span></summary>
          <div className={styles.locationGrid}>{contact.locations.filter(location => location.id !== 'puget').map(location => <article key={location.id}><h3>{location.name}</h3><p>{location.address}</p><p>{location.detail}</p></article>)}</div>
        </details>
      </div>
    </section>

    <section id="pedagogie" className={styles.section} aria-labelledby="approach-title">
      <div className={`${styles.container} ${styles.approachGrid}`}>
        <figure className={styles.packPhoto}>
          <Image src="/images/welcome-pack/carnet-bienvenue.webp" alt="La page de bienvenue du carnet Intégrale Academy, signée Clément Vaillant" width={1092} height={1531} sizes="(max-width: 480px) calc(100vw - 40px), 440px" />
          <figcaption>Le carnet de bienvenue · Pack Intégrale APS</figcaption>
        </figure>
        <div className={styles.approachCopy}>
          <p className={styles.eyebrow}>03 / Notre manière de former</p><h2 id="approach-title">Du concret.<br />De l’exigence.<br /><em>Et de l’attention.</em></h2>
          <div className={styles.approachPoints}>
            <div><span>01</span><div><h3>Apprendre auprès de professionnels</h3><p>Des intervenants issus du terrain et des situations reliées aux métiers que vous préparez.</p></div></div>
            <div><span>02</span><div><h3>Pratiquer dans un cadre structuré</h3><p>Des programmes, des mises en situation et des évaluations adaptés aux exigences de chaque formation.</p></div></div>
            <div><span>03</span><div><h3>Être accompagné à chaque étape</h3><p>Projet, financement, suivi et préparation à l’emploi : une équipe accessible pour avancer avec vous.</p></div></div>
          </div>
          <Link href="/formations-securite/aps" className={styles.textLink}>Découvrir la formation APS <Arrow diagonal /></Link>
        </div>
      </div>
      <div className={`${styles.container} ${styles.domains}`}><p className={styles.eyebrow}>Plusieurs voies. La même exigence.</p><div>{[['Sécurité privée', '/formations-securite'], ['Sécurité incendie', '/formations-securite/ssiap'], ['Chauffeur VTC', '/vtc'], ['BTS en alternance', '/bts']].map(([label, href]) => <Link key={label} href={href}>{label}<Arrow diagonal /></Link>)}</div></div>
    </section>

    <section id="histoire" className={`${styles.section} ${styles.storySection}`} aria-labelledby="story-title">
      <div className={styles.container}>
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Notre histoire</p><h2 id="story-title">Une école qui grandit.<br /><em>Une conviction qui reste.</em></h2></div><p>Depuis sa création, Intégrale Academy se développe au contact des métiers, des candidats et des entreprises.</p></div>
        <ol className={styles.timeline}>
          <li><span>2018</span><h3>Le début de l’aventure</h3><p>La création d’une école de formation professionnelle issue du terrain.</p></li><li><span>Au fil des années</span><h3>De nouvelles perspectives</h3><p>Sécurité, incendie, VTC et alternance enrichissent les parcours proposés.</p></li><li><span>Aujourd’hui</span><h3>La même proximité</h3><p>Une équipe structurée et trois implantations, mobilisées selon les formations.</p></li>
        </ol>
      </div>
    </section>

    <section className={`${styles.section} ${styles.reviewsSection}`} aria-labelledby="reviews-title">
      <div className={styles.container}>
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Leur expérience de l’école</p><h2 id="reviews-title">Ils en parlent<br /><em>avec leurs mots.</em></h2></div><Link href="/#avis-google" className={styles.textLink}>Retrouver les avis des apprenants <Arrow diagonal /></Link></div>
        <div className={styles.reviewsGrid}>
          <figure><span className={styles.quoteMark} aria-hidden="true">“</span><blockquote>Les locaux sont propres, bien équipés et agréables. L’ambiance est sérieuse mais conviviale. La formation est complète, bien organisée, avec un bon équilibre entre théorie et pratique.</blockquote><figcaption><strong>Mathys C.</strong><span>Agent de sécurité</span></figcaption></figure>
          <figure><span className={styles.quoteMark} aria-hidden="true">“</span><blockquote>L’équipe est professionnelle, à l’écoute et très investie dans la réussite des stagiaires. Les formations sont claires, dynamiques et parfaitement adaptées aux exigences du terrain.</blockquote><figcaption><strong>Nelson D.</strong><span>Sécurité privée</span></figcaption></figure>
        </div>
        <p className={styles.reviewSource}>Témoignages issus de la sélection d’avis publiée sur notre site.</p>
      </div>
    </section>

    <section id="agrements" className={styles.certifications} aria-labelledby="certifications-title">
      <div className={styles.container}>
        <div className={styles.certificationIntro}><p className={styles.eyebrow}>04 / Nos engagements</p><h2 id="certifications-title">Un cadre sérieux. Des références accessibles.</h2></div>
        <div className={styles.certificationStrip}><span>Qualiopi<small>Certification qualité</small></span><span>CNAPS<small>Autorisation de formation</small></span><span>CFA · UAI<small>Formation en alternance</small></span></div>
        <details id="references" className={styles.references}><summary>Consulter les certifications et références administratives<span className={styles.plus} aria-hidden="true">+</span></summary><dl>{certifications.map(([title, detail]) => <div key={title}><dt>{title}</dt><dd>{detail}</dd></div>)}</dl></details>
      </div>
    </section>

    <section id="visite" className={styles.visit} aria-labelledby="visit-title">
      <div className={`${styles.container} ${styles.visitGrid}`}>
        <div><p className={styles.eyebrow}>La prochaine étape se fait ensemble</p><h2 id="visit-title">Poussez la porte.<br /><em>Parlons de la suite.</em></h2><p>Découvrez les lieux, rencontrez l’équipe et échangez sur votre projet. Nous vous aidons à préparer votre venue.</p></div>
        <div className={styles.visitActions}><a href={appointmentFormUrl} className={styles.button}>Organiser une visite <Arrow /></a><a href="tel:+33422470768" className={styles.visitPhone}>{contact.phone}</a><p>Un premier échange gratuit et sans engagement.</p><Link href="/planning" className={styles.textLink}>Voir les prochaines sessions <Arrow diagonal /></Link></div>
      </div>
    </section>
  </div>;
}
