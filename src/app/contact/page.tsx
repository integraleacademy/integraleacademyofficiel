import Image from 'next/image';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { informationRequestHref } from '@/lib/contact-request';
import { contact } from '@/data/site';
import school from '../ecole/ecole.module.css';
import styles from './contact.module.css';

export const metadata = createPageMetadata('/contact');

const email = 'ecole@integraleacademy.com';
const phoneHref = 'tel:+33422470768';
const emailHref = `mailto:${email}?subject=Contact%20site%20internet`;

const projectLinks = [
  { title: 'Les formations', text: 'Sécurité, incendie, VTC et BTS.', href: '/ecole#pedagogie' },
  { title: 'Les prochaines dates', text: 'Sessions, lieux et disponibilités.', href: '/planning' },
  { title: 'Les financements', text: 'Les solutions selon votre situation.', href: '/financements' },
  { title: 'Les entreprises', text: 'Recrutement, alternance et formation.', href: '/entreprises' },
];

const steps = [
  { title: 'Votre projet', text: 'Le métier visé, la formation qui vous intéresse et votre situation actuelle.' },
  { title: 'Vos possibilités', text: 'Les prérequis, les prochaines sessions et les solutions de financement.' },
  { title: 'La prochaine étape', text: 'Un interlocuteur pour vous guider et vous aider à préparer votre dossier.' },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h16m-6-6 6 6-6 6'} /></svg>;
}

function ContactIcon({ name }: { name: 'phone' | 'mail' | 'chat' }) {
  const paths = {
    phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z',
    mail: 'M3 5h18v14H3z M3 6l9 7 9-7',
    chat: 'M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z M8 10h8 M8 14h5',
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const requestHref = informationRequestHref(await searchParams);
  const mainLocation = contact.locations.find(location => location.id === 'puget');
  const otherLocations = contact.locations.filter(location => location.id !== 'puget');

  return (
    <div className={`${school.page} ${styles.page}`}>
      <section className={`${school.hero} ${styles.hero}`} aria-labelledby="contact-title">
        <div className={`${school.container} ${school.heroGrid} ${styles.heroGrid}`}>
          <div className={school.heroCopy}>
            <p className={school.eyebrow}><span className={school.smallLine} /> Contact & admissions</p>
            <h1 id="contact-title">Une question ?<br /><em>Parlons de<br />votre projet.</em></h1>
            <p className={school.intro}>Choisir une formation, préparer votre financement ou venir découvrir l’école : notre équipe vous accompagne dès le premier échange.</p>
            <div className={school.heroActions}>
              <a href="#demande" className={school.button}>Parler de mon projet <Arrow /></a>
              <a href={phoneHref} className={school.textLink}>{contact.phone} <Arrow diagonal /></a>
            </div>
            <p className={school.heroTrust}><span aria-hidden="true">✦</span> Un premier échange gratuit et sans engagement.</p>
          </div>
          <figure className={`${school.heroPhoto} ${styles.heroPhoto}`}>
            <Image src="/images/campus/campus-accueil.jpg" alt="L’accueil d’Intégrale Academy à Puget-sur-Argens, avec ses fauteuils jaunes et l’entrée des salles de formation" fill priority sizes="(max-width: 800px) 100vw, 50vw" />
            <span className={school.photoLabel}>Et si l’on en parlait ?</span>
            <figcaption><span>INTÉGRALE ACADEMY</span><span>Une équipe à votre écoute. <Arrow diagonal /></span></figcaption>
          </figure>
        </div>
        <nav className={`${school.container} ${school.chapterNav}`} aria-label="Les rubriques de la page Contact">
          <span>FAISONS LE PREMIER PAS</span>
          <a href="#coordonnees"><span>01</span> Nous joindre</a>
          <a href="#demande"><span>02</span> Votre demande</a>
          <a href="#venir"><span>03</span> Venir à l’école</a>
          <a href="#reperes"><span>04</span> Liens utiles</a>
        </nav>
      </section>

      <section id="coordonnees" className={styles.channels} aria-label="Nos coordonnées">
        <div className={`${school.container} ${styles.channelGrid}`}>
          <a href={phoneHref} className={styles.channel}>
            <span className={styles.channelIcon}><ContactIcon name="phone" /></span>
            <span className={styles.channelCopy}><span className={styles.channelLabel}>Appelez-nous</span><strong>{contact.phone}</strong><span>{contact.hours}</span></span>
            <Arrow diagonal />
          </a>
          <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className={styles.channel}>
            <span className={styles.channelIcon}><ContactIcon name="chat" /></span>
            <span className={styles.channelCopy}><span className={styles.channelLabel}>Sur WhatsApp</span><strong>{contact.whatsapp}</strong><span>Échangez avec notre équipe.</span></span>
            <Arrow diagonal />
          </a>
          <a href={emailHref} className={styles.channel}>
            <span className={styles.channelIcon}><ContactIcon name="mail" /></span>
            <span className={styles.channelCopy}><span className={styles.channelLabel}>Par e-mail</span><strong className={styles.email}>{email}</strong><span>Une question ou un document à transmettre.</span></span>
            <Arrow diagonal />
          </a>
        </div>
      </section>

      <section id="demande" className={school.section} aria-labelledby="request-title">
        <div className={school.container}>
          <div className={school.sectionHeading}>
            <div><p className={school.eyebrow}>02 / Votre projet commence ici</p><h2 id="request-title">Faisons connaissance.<br /><em>Préparons la suite.</em></h2></div>
            <p>Vous n’avez pas besoin d’avoir déjà toutes les réponses. Dites-nous où vous en êtes : nous vous aidons à préciser votre parcours.</p>
          </div>
          <div className={styles.requestGrid}>
            <div className={styles.requestContext}>
              <figure className={school.teamIllustration}>
                <Image src="/images/formation-scenes-manuel/aps-arrivee.webp" alt="Illustration de l’accueil d’apprenants et de leur échange avec l’équipe de formation" width={1536} height={1024} sizes="(max-width: 800px) 100vw, 40vw" />
                <figcaption>Des personnes pour vous guider, dès le départ.</figcaption>
              </figure>
              <ol className={styles.steps}>
                {steps.map((step, index) => <li key={step.title}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}
              </ol>
            </div>
            <div className={styles.requestPanel}>
              <p className={school.eyebrow}>Formation professionnelle</p>
              <h3>Décrivez-nous<br />votre projet.</h3>
              <p>Une formation en sécurité privée, SSIAP 1 ou VTC ? Indiquez vos coordonnées, la formation souhaitée et votre situation dans notre formulaire dédié.</p>
              <div className={styles.adviser}><span aria-hidden="true">CM</span><div><strong>Cassandre & l’équipe admissions</strong><p>Orientation · admission · financement</p></div></div>
              <a href={requestHref} className={`${school.button} ${styles.requestButton}`}>Compléter ma demande d’informations <Arrow /></a>
              <p className={styles.privacy}>Intégrale Academy utilise vos informations pour étudier votre projet et vous recontacter. Le formulaire dédié enregistre les réponses au fil de la saisie, avant validation. Retrouvez les destinataires, les durées de conservation et vos droits dans notre <Link href="/politique-confidentialite">politique de confidentialité</Link>.</p>
              <div className={styles.btsContact}>
                <p className={school.eyebrow}>BTS & alternance</p>
                <h3>Un projet de BTS ?</h3>
                <p>Aurélie vous accompagne pour votre candidature et votre recherche d’alternance.</p>
                <a href="mailto:aurelie@integraleacademy.com?subject=Question%20sur%20un%20BTS" className={school.textLink}>Écrire à Aurélie <Arrow diagonal /></a>
              </div>
              <p className={styles.otherRequest}>Une autre formation ou une question particulière ? <a href={emailHref}>Écrivez à notre équipe.</a></p>
            </div>
          </div>
        </div>
      </section>

      <section id="venir" className={`${school.section} ${school.campusSection}`} aria-labelledby="visit-title">
        <div className={school.container}>
          <div className={school.sectionHeading}>
            <div><p className={school.eyebrow}>03 / Rencontrons-nous</p><h2 id="visit-title">Poussez la porte.<br /><em>Vous êtes au bon endroit.</em></h2></div>
            <p>Notre école principale vous accueille à Puget-sur-Argens. Contactez-nous pour préparer votre visite et échanger avec l’équipe.</p>
          </div>
          <div className={school.campusLayout}>
            {mainLocation && <article className={school.addressPanel}>
              <p className={school.eyebrow}>L’école principale · Côte d’Azur</p>
              <h3>Puget-sur-Argens<span>Var · 83</span></h3>
              <address>{mainLocation.address}</address>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mainLocation.address)}`} target="_blank" rel="noopener noreferrer" className={school.textLink}>Ouvrir l’itinéraire <Arrow diagonal /></a>
              <div className={school.access}><span>À 500 m de l’A8</span><span>Parking gratuit</span><span>Bus 4 · Général de Gaulle</span></div>
            </article>}
            <div className={styles.visitInfo}>
              <div><p className={school.eyebrow}>Préparer votre venue</p><h3>Un appel, et l’on s’organise.</h3><p>Vous souhaitez visiter les locaux ou faire le point sur votre projet ? Appelez-nous ou faites une demande pour préparer votre échange.</p></div>
              <div className={styles.visitHours}><span>Pour nous joindre par téléphone</span><strong>{contact.phone}</strong><p>{contact.hours}</p></div>
              <div className={styles.visitActions}><a href={requestHref} className={school.button}>Préparer mon rendez-vous <Arrow /></a><Link href="/ecole" className={school.textLink}>Découvrir notre école <Arrow diagonal /></Link></div>
            </div>
          </div>
          <div className={styles.otherLocations}>
            <p>Et aussi, selon votre formation et les sessions programmées.</p>
            <div className={school.locationGrid}>
              {otherLocations.map(location => <article key={location.id}>
                <p className={styles.locationLabel}>Selon les sessions</p><h3>{location.name}</h3><address>{location.address}</address><p>{location.detail}</p>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`} target="_blank" rel="noopener noreferrer" className={school.textLink}>Voir sur la carte <Arrow diagonal /></a>
              </article>)}
            </div>
          </div>
        </div>
      </section>

      <section id="reperes" className={school.section} aria-labelledby="links-title">
        <div className={school.container}>
          <div className={school.sectionHeading}>
            <div><p className={school.eyebrow}>04 / Quelques repères utiles</p><h2 id="links-title">Votre prochaine étape,<br /><em>à portée de clic.</em></h2></div>
            <p>Parcourez les formations, consultez les dates ou découvrez les solutions pour financer votre projet.</p>
          </div>
          <div className={styles.quickLinks}>
            {projectLinks.map((item, index) => <Link href={item.href} className={styles.quickLink} key={item.href}><span className={styles.linkNumber}>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p><span className={styles.linkAction}>Découvrir <Arrow diagonal /></span></Link>)}
          </div>
        </div>
      </section>
    </div>
  );
}
