import Image from 'next/image';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { informationRequestHref } from '@/lib/contact-request';
import { contact } from '@/data/site';
import { ContactExperience, type ContactInterest } from '@/components/ContactExperience';
import { ContactMotion } from '@/components/ContactMotion';
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
  const params = await searchParams;
  const requestHref = informationRequestHref(params);
  const formation = (Array.isArray(params.formation) ? params.formation[0] : params.formation)?.toLowerCase();
  const generalHref = informationRequestHref({ ...params, formation: undefined });
  const hasSecurityFormation = new URL(requestHref).searchParams.has('formation') && formation !== 'vtc';
  const initialInterest: ContactInterest = formation === 'vtc' ? 'vtc' : formation?.startsWith('bts') ? 'bts' : hasSecurityFormation ? 'security' : 'undecided';
  const mainLocation = contact.locations.find(location => location.id === 'puget');
  const otherLocations = contact.locations.filter(location => location.id !== 'puget');

  return (
    <ContactMotion className={`${school.page} ${styles.page}`}>
      <section className={`${school.hero} ${styles.hero}`} aria-labelledby="contact-title">
        <div className={`${school.container} ${school.heroGrid} ${styles.heroGrid}`}>
          <div className={school.heroCopy} data-contact-reveal>
            <p className={school.eyebrow}><span className={school.smallLine} /> Contact & admissions</p>
            <h1 id="contact-title">Une question ?<br /><em>Parlons de<br />votre avenir.</em></h1>
            <p className={school.intro}>Choisir une formation, préparer votre financement ou venir découvrir l’école : notre équipe vous accompagne dès le premier échange.</p>
            <div className={school.heroActions}>
              <a href="#demande" className={school.button}>Parler de mon projet <Arrow /></a>
              <a href={phoneHref} className={school.textLink}>{contact.phone} <Arrow diagonal /></a>
            </div>
            <p className={school.heroTrust}><span aria-hidden="true">✦</span> Un premier échange gratuit et sans engagement.</p>
          </div>
          <figure className={`${school.heroPhoto} ${styles.heroPhoto}`} data-contact-reveal>
            <Image src="/images/campus/campus-accueil.jpg" alt="L’accueil d’Intégrale Academy à Puget-sur-Argens, avec ses fauteuils jaunes et l’entrée des salles de formation" fill priority sizes="(max-width: 800px) 100vw, 50vw" />
            <span className={school.photoLabel}>Votre projet commence ici.</span>
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

      <ContactExperience initialInterest={initialInterest} requestLinks={{ general: generalHref, security: hasSecurityFormation ? requestHref : generalHref, vtc: informationRequestHref({ ...params, formation: 'vtc' }) }} hours={contact.hours} />

      <section id="venir" className={`${school.section} ${school.campusSection}`} aria-labelledby="visit-title">
        <div className={school.container}>
          <div className={school.sectionHeading} data-contact-reveal>
            <div><p className={school.eyebrow}>03 / Rencontrons-nous</p><h2 id="visit-title">Et si l’on se<br /><em>rencontrait ?</em></h2></div>
            <p>Notre école principale vous accueille à Puget-sur-Argens. Contactez-nous pour préparer votre visite et échanger avec l’équipe.</p>
          </div>
          <div className={styles.visitShowcase}>
            {mainLocation && <article className={styles.campusCard} data-contact-reveal>
              <div className={styles.campusImage}><Image src="/images/campus/campus-accueil.jpg" alt="Le véritable accueil d’Intégrale Academy à Puget-sur-Argens" width={1600} height={1200} sizes="(max-width: 800px) 100vw, 60vw" /><span className={styles.campusPill}><span aria-hidden="true">✦</span> Bienvenue chez vous.</span></div>
              <div className={styles.addressFloating}>
                <div><p>L’école principale · Côte d’Azur</p><h3>Puget-sur-Argens</h3><address>{mainLocation.address}</address></div>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mainLocation.address)}`} target="_blank" rel="noopener noreferrer" aria-label="Ouvrir l’itinéraire vers Intégrale Academy à Puget-sur-Argens"><Arrow diagonal /></a>
              </div>
              <div className={styles.campusAccess}><span>À 500 m de l’A8</span><span>Parking gratuit</span><span>Bus 4 · Général de Gaulle</span></div>
            </article>}
            <div className={styles.visitInfo} data-contact-reveal>
              <div><p className={school.eyebrow}>Les portes sont ouvertes au dialogue.</p><h3>Un lieu à découvrir.<br />Une équipe à rencontrer.</h3><p>Venez mettre des visages sur votre projet et découvrir votre futur environnement de formation. Contactez-nous pour organiser votre visite.</p></div>
              <div className={styles.visitHours}><span>Pour nous joindre par téléphone</span><strong>{contact.phone}</strong><p>{contact.hours}</p></div>
              <div className={styles.visitActions}><a href={phoneHref} className={school.button}>Organiser ma visite <Arrow /></a><Link href="/ecole" className={school.textLink}>Découvrir notre école <Arrow diagonal /></Link></div>
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
          <div className={school.sectionHeading} data-contact-reveal>
            <div><p className={school.eyebrow}>04 / Quelques repères utiles</p><h2 id="links-title">Votre prochaine étape,<br /><em>à portée de clic.</em></h2></div>
            <p>Parcourez les formations, consultez les dates ou découvrez les solutions pour financer votre projet.</p>
          </div>
          <div className={styles.quickLinks} data-contact-reveal>
            {projectLinks.map((item, index) => <Link href={item.href} className={styles.quickLink} key={item.href}><span className={styles.linkNumber}>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p><span className={styles.linkAction}>Découvrir <Arrow diagonal /></span></Link>)}
          </div>
        </div>
      </section>
    </ContactMotion>
  );
}
