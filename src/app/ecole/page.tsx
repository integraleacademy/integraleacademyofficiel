import { TeamPortrait } from '@/components/TeamPortrait';
import Image from 'next/image';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { contact } from '@/data/site';
import styles from './ecole.module.css';
import navigation from '@/components/PageSectionNavigation.module.css';
import experience from './school-experience.module.css';
import { SchoolNavigation, SchoolCampuses, SchoolPedagogy, SchoolVisitButton, SchoolVisitAdviser } from './SchoolExperience';
import { SchoolCommitments } from './SchoolCommitments';
import { SchoolGallery } from './SchoolGallery';

export const metadata = createPageMetadata('/ecole');

const team = [
  { portrait: 'cassandre' as const, name: 'Cassandre MENARD', role: 'Responsable commerciale', mission: 'Votre interlocutrice pour choisir votre formation, préparer votre admission et trouver le financement adapté.', specialty: 'Pour choisir votre formation' },
  { portrait: 'aurelie' as const, name: 'Aurélie BAYARD-CHAUSSEZ', role: 'Relations clients · Responsable BTS', mission: 'Le lien entre les apprenants, les entreprises et l’école, pour un parcours bien accompagné.', specialty: 'Pour votre BTS et votre alternance' },
  { portrait: 'elsa' as const, name: 'Elsa DUQUESNE', role: 'Assistante de direction', mission: 'Un suivi administratif attentif et une organisation quotidienne au service de votre formation.', specialty: 'Pour préparer et suivre votre dossier' },
  { portrait: 'yannice' as const, name: 'Yannice LIBAULT', role: 'Coordinateur pédagogique · Azzera Academy', mission: 'La coordination des programmes et des intervenants, avec une attention portée au suivi pédagogique.', specialty: 'Pour votre suivi pédagogique' },
];
function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h16m-6-6 6 6-6 6'} /></svg>;
}

export default function Page() {
  return <div className={`${styles.page} ${experience.guidedPage} ${navigation.scope}`}>
    <section className={`${styles.hero} ${experience.guidedHero}`} aria-labelledby="school-title">
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.smallLine} /> Notre école · Depuis 2018</p>
          <h1 id="school-title">Un lieu pour<br /> apprendre.<br /><em>Une équipe<br /> pour avancer.</em></h1>
          <p className={styles.intro}>Des métiers concrets. Des personnes engagées. À Puget-sur-Argens, Intégrale Academy vous accompagne dans la suite de votre parcours professionnel.</p>
          <div className={styles.heroActions}>
            <a href="#campus" className={styles.button}>Explorer l’école <Arrow /></a>
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
    </section>

    <SchoolNavigation />

    <section className={styles.stats} aria-label="L’école en quelques repères">
      <div className={`${styles.container} ${styles.statsGrid}`}>
        <div><strong>2018</strong><span>Le début de l’aventure</span></div><div><strong>400 <small>m²</small></strong><span>Pour apprendre à Puget-sur-Argens</span></div><div><strong>4 <small>salles</small></strong><span>Théorie & mise en pratique</span></div><div><strong>3 <small>implantations</small></strong><span>Puget, Paris · Aurillac selon les sessions</span></div>
      </div>
    </section>

    <section id="campus" className={`${styles.section} ${styles.campusSection}`} aria-labelledby="campus-title">
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>01 / Les lieux pour apprendre</p><h2 id="campus-title">De la Côte d’Azur<br /><em>à Paris.</em></h2></div>
          <p>Notre siège à Puget-sur-Argens et notre implantation à Paris vous accueillent selon les formations et les sessions. Aurillac complète ces implantations pour certaines sessions DESP.</p>
        </div>
        <SchoolCampuses />
        <div className={styles.campusFacilities}>
          <p className={styles.eyebrow}>À Puget-sur-Argens · 400 m² pour apprendre et pratiquer</p>
          <div className={`${styles.facilities} ${styles.facilitiesRow}`}>
            <div><span>01</span><div><h3>Apprendre & pratiquer</h3><p>Quatre salles de cours et des espaces de mise en situation pour relier la théorie aux réalités du métier.</p></div></div>
            <div><span>02</span><div><h3>Travailler & progresser</h3><p>Une salle informatique équipée Mac / PC pour les enseignements et les travaux numériques.</p></div></div>
            <div><span>03</span><div><h3>Se retrouver & échanger</h3><p>Un espace détente pour partager une pause et créer des liens tout au long de la formation.</p></div></div>
          </div>
        </div>
      </div>
    </section>

    <SchoolGallery />

    <section id="equipe" className={styles.section} aria-labelledby="team-title">
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>02 / Les personnes derrière l’école</p><h2 id="team-title">On avance mieux<br /><em>bien entouré.</em></h2></div>
          <p>Avant, pendant et après la formation, des interlocuteurs identifiés vous accompagnent. Voici les personnes à qui vous pouvez vous adresser.</p>
        </div>
        <div className={styles.teamLayout}>
          <div className={experience.teamLead}>
            <article className={experience.directorCard}>
              <p className={experience.directorLabel}>La direction de l’école</p>
              <div className={experience.directorIdentity}>
                <div aria-hidden="true"><TeamPortrait person="clement" size={92} /></div>
                <div><h3>Clément VAILLANT</h3><p>Fondateur & directeur général</p></div>
              </div>
              <p className={experience.directorMission}>Il pilote le développement de l’école avec l’équipe, en portant une même exigence : la qualité des parcours et la proximité avec chaque apprenant.</p>
              <a href="#clement-vaillant" className={styles.textLink}>Découvrir son parcours <Arrow diagonal /></a>
            </article>
            <figure className={styles.teamIllustration}>
              <Image src="/images/formation-scenes-manuel/aps-arrivee.webp" alt="Illustration de l’accueil et de l’accompagnement d’apprenants à leur arrivée en formation APS" width={1536} height={1024} sizes="(max-width: 800px) 100vw, 42vw" />
              <figcaption>Un accompagnement dès votre arrivée.</figcaption>
            </figure>
          </div>
          <div className={`${styles.teamGrid} ${experience.teamCards}`}>
            {team.map(person => <article className={`${styles.person} ${experience.teamCard}`} key={person.name}>
              <div className={styles.personAvatar} aria-hidden="true"><TeamPortrait person={person.portrait} size={92} /></div>
              <p className={experience.helpLabel}>{person.specialty}</p><h3>{person.name}</h3><p className={styles.role}>{person.role}</p><p className={styles.mission}>{person.mission}</p>
            </article>)}
          </div>
        </div>
        <div className={styles.teamBottom}><p>À leurs côtés, des formateurs, évaluateurs et professionnels du terrain interviennent selon les parcours.</p><Link href="/contact#demande" className={styles.textLink}>Échanger avec l’équipe <Arrow diagonal /></Link></div>
      </div>
    </section>

    <section id="pedagogie" className={styles.section} aria-labelledby="approach-title">
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>03 / Notre manière de former</p><h2 id="approach-title">Du concret. De l’exigence.<br /><em>Et de l’attention.</em></h2></div>
          <p>Choisissez une étape pour découvrir comment nous vous accompagnons, du premier échange à la mise en pratique.</p>
        </div>
        <SchoolPedagogy />
      </div>
      <div className={`${styles.container} ${styles.domains}`}>
        <p className={styles.eyebrow}>Plusieurs voies. La même exigence.</p>
        <div className={styles.domainGrid}>
          {[
            ['Sécurité privée', '/formations-securite', 'aps-atelier-radio.webp', 'Illustration d’un atelier de communication radio en formation à la sécurité privée'],
            ['Sécurité incendie', '/formations-securite/ssiap', 'ssiap-1-galerie-ssi.webp', 'Illustration d’un exercice sur un système de sécurité incendie en formation SSIAP'],
            ['Chauffeur VTC', '/vtc', 'vtc-parcours.webp', 'Illustration du parcours de formation au métier de chauffeur VTC'],
            ['BTS en alternance', '/bts', 'bts-campus-mixte.webp', 'Une étudiante et un étudiant en BTS travaillent ensemble sur leur projet'],
          ].map(([label, href, image, alt]) => <Link key={label} href={href} className={styles.domainCard}>
            <Image src={`/images/formation-scenes-manuel/${image}`} alt={alt} width={1536} height={1024} sizes="(max-width: 480px) 100vw, (max-width: 800px) 50vw, 25vw" />
            <span className={styles.domainCardBody}><span>{label}</span><Arrow diagonal /></span>
          </Link>)}
        </div>
      </div>
    </section>

    <section id="clement-vaillant" className={`${styles.section} ${styles.founderSection}`} aria-labelledby="founder-title">
      <div className={`${styles.container} ${styles.founderGrid} ${experience.founderWelcome}`}>
        <div className={styles.founderCopy}>
          <p className={styles.eyebrow}>04 / Notre histoire · Depuis 2018</p>
          <h2 id="founder-title">Le terrain comme point de départ.<br /><em>L’humain comme fil conducteur.</em></h2>
          <blockquote className={experience.welcomeQuote}>« Osez poser vos questions, essayer et progresser. Toute l’équipe est à vos côtés pour vous accompagner. »</blockquote>
          <div className={experience.founderSignature}><TeamPortrait person="clement" size={72} /><div><p>Clément VAILLANT</p><span>Fondateur & directeur général</span></div></div>
          <details className={experience.biography}><summary>Découvrir le parcours du fondateur <span className={styles.plus} aria-hidden="true">+</span></summary>
          <p>Entrepreneur engagé dans la formation professionnelle, Clément VAILLANT a construit son parcours au croisement de la sécurité privée, de la gestion d’équipes, de la communication et de la formation. Son expérience, acquise dans des environnements exigeants et réglementés, l’a conduit des fonctions opérationnelles à la coordination puis à la direction de projets et d’équipes.</p>
          <p>Titulaire d’un Master 2 en communication et stratégies d’image, il associe culture du terrain, pilotage d’entreprise et amélioration continue des parcours proposés par Intégrale Academy. Sa conviction : faire grandir l’école en conservant l’exigence, la proximité et un cadre clair pour chaque apprenant.</p>
            <a href="https://fr.linkedin.com/in/vaillantclement" target="_blank" rel="noopener noreferrer" className={styles.textLink}>Découvrir son parcours sur LinkedIn <Arrow diagonal /></a>
          </details>
        </div>
        <figure className={styles.packPhoto}>
          <Image src="/images/welcome-pack/carnet-bienvenue.webp" alt="La page de bienvenue du carnet Intégrale Academy, signée Clément VAILLANT" width={1092} height={1531} sizes="(max-width: 340px) calc(100vw - 64px), 280px" />
          <figcaption>Le mot de bienvenue de Clément VAILLANT · Carnet Intégrale Academy</figcaption>
        </figure>
      </div>
      <div id="histoire" className={`${styles.container} ${experience.history}`}>
        <p className={styles.eyebrow}>Une école qui grandit. Une conviction qui reste.</p>
        <ol className={styles.timeline}>
          <li><span>2018</span><h3>Le début de l’aventure</h3><p>La création d’une école de formation professionnelle issue du terrain.</p></li><li><span>Au fil des années</span><h3>De nouvelles perspectives</h3><p>Sécurité, incendie, VTC et alternance enrichissent les parcours proposés.</p></li><li><span>Aujourd’hui</span><h3>La même proximité</h3><p>Puget-sur-Argens, Paris et Aurillac, selon les formations et les sessions.</p></li>
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

    <SchoolCommitments />

    <section id="visite" className={styles.visit} aria-labelledby="visit-title">
      <div className={`${styles.container} ${styles.visitGrid}`}>
        <div><p className={styles.eyebrow}>La prochaine étape se fait ensemble</p><h2 id="visit-title">Poussez la porte.<br /><em>Parlons de la suite.</em></h2><p>Découvrez les lieux, rencontrez l’équipe et échangez sur votre projet. Nous vous aidons à préparer votre venue.</p></div>
        <div className={styles.visitActions}><SchoolVisitAdviser /><SchoolVisitButton className={styles.button} /><a href="tel:+33422470768" className={styles.visitPhone}>{contact.phone}</a><p>Un premier échange gratuit et sans engagement.</p><Link href="/planning" className={styles.textLink}>Voir les prochaines sessions <Arrow diagonal /></Link></div>
      </div>
    </section>
  </div>;
}
