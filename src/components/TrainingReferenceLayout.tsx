import type { ReactNode } from 'react';
import type { ManualIllustration } from '@/data/manualIllustrations';
import Image from 'next/image';
import Link from 'next/link';

import { ManualArtwork } from '@/components/ManualArtwork';
import { TeamPortrait } from '@/components/TeamPortrait';

import reference from './SsiapReferencePage.module.css';
import styles from './TrainingReferenceLayout.module.css';

type CourseTheme = 'red' | 'blue' | 'green' | 'orange';
type Action = { href: string; label: string; download?: string };

/** The SSIAP 1 visual language, with each course's own content and accent. */
export function TrainingReferencePage({ children, theme, enabled = true }: { children: ReactNode; theme: CourseTheme; enabled?: boolean }) {
  if (!enabled) return <div className="relative overflow-hidden pb-24 lg:pb-0">{children}</div>;
  return <div className={`${reference.page} ${styles.page}`} data-course-design="ssiap-reference" data-course-theme={theme}>{children}</div>;
}

export function TrainingReferenceAction({ href, children, outline = false, download }: { href: string; children: ReactNode; outline?: boolean; download?: string }) {
  const className = `${styles.action} ${outline ? styles.outline : styles.primary}`;
  if (download) return <a href={href} download={download} className={className}>{children}</a>;
  return <Link href={href} className={className}>{children}</Link>;
}

export function TrainingReferenceHero({ id, badge, heading, accent, title, tagline, description, illustration, caption, primaryAction, additionalAction, highlights = [], facts = [], children, extendedCopy = false }: {
  id: string; badge: string; heading: string; accent: string; title: string;
  tagline: string; description: ReactNode; illustration: ManualIllustration; caption: string;
  primaryAction: Action; additionalAction?: ReactNode; highlights?: readonly string[];
  facts?: ReadonlyArray<ReadonlyArray<string | undefined>>; children: ReactNode; extendedCopy?: boolean;
}) {
  return <section className={`${reference.hero} ${styles.hero}`} aria-labelledby={`${id}-title`} data-extended-copy={extendedCopy || undefined}>
    <div className={reference.container}>
      <div className={reference.heroGrid}>
        <div className={reference.heroCopy}>
          <p className={reference.heroBadge}><span aria-hidden="true" />{badge}</p>
          <h1 id={`${id}-title`}>{heading}<br /><em>{accent}</em></h1>
          <p className={reference.heroTagline}>{tagline}</p>
          <div className={`${reference.heroDescription} ${styles.description}`}>{description}</div>
          <div className={reference.actions}><TrainingReferenceAction href={primaryAction.href} download={primaryAction.download}>{primaryAction.label}</TrainingReferenceAction><TrainingReferenceAction href="tel:0422470768" outline>Parler à un conseiller</TrainingReferenceAction>{additionalAction}</div>
          {highlights.length > 0 && <div className={reference.heroHighlights}>{highlights.map(item => <span key={item}>✓ {item}</span>)}</div>}
        </div>
        <figure className={reference.heroArtwork}>
          <ManualArtwork illustration={illustration} priority natural sizes="(max-width: 700px) 94vw, (max-width: 1600px) 46vw, 760px" />
          <figcaption><span>INTÉGRALE ACADEMY</span><strong>{caption}</strong><span>{title}</span></figcaption>
        </figure>
      </div>
      <div className={`${reference.heroBooking} ${styles.booking}`}>{children}</div>
      {facts.length > 0 && <div className={reference.facts}>{facts.map(([label, value, detail]) => <div key={label}><span>{label}</span><strong>{value}</strong>{detail && <small>{detail}</small>}</div>)}</div>}
    </div>
  </section>;
}

export function TrainingReferenceSection({ id, eyebrow, label, title, intro, tone = 'cream', children, className = '' }: {
  id?: string; eyebrow?: string; label?: string; title: ReactNode; intro?: ReactNode;
  tone?: 'cream' | 'paper' | 'stone' | 'dark'; children?: ReactNode; className?: string;
}) {
  return <section id={id} className={`${styles.section} ${styles[tone]} ${className}`}>
    <div className={reference.container}>
      <div className={reference.sectionHead}><div>{(eyebrow || label) && <p className={styles.eyebrow}>{eyebrow || label}</p>}<h2 className={reference.sectionTitle}>{title}</h2></div>{intro && <div className={styles.intro}>{intro}</div>}</div>
      {children}
    </div>
  </section>;
}

export function TrainingReferenceMissions({ items, label = 'Mission' }: { items: ReadonlyArray<{ title: string; description: string; illustration?: ManualIllustration; visual?: ReactNode; body?: ReactNode }>; label?: string }) {
  return <div className={reference.missions}>{items.map((item, index) => <article key={item.title} className={`${reference.mission} ${styles.mission}`}>
    <div className={`${reference.missionImage} ${styles.missionImage}`}>{item.visual || (item.illustration && <ManualArtwork illustration={item.illustration} natural sizes="(max-width: 700px) 92vw, 590px" />)}</div>
    <div className={reference.missionCopy}><span className={reference.missionNumber}>{label} {String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3>{item.description && <p>{item.description}</p>}{item.body && <div className={styles.missionDetails}>{item.body}</div>}</div>
  </article>)}</div>;
}

export function TrainingReferenceCampus({ title = 'Découvrez votre cadre de formation.', description = 'Les espaces de l’école à Puget-sur-Argens accompagnent les cours, les échanges et la vie de votre groupe.' }: { title?: string; description?: string }) {
  return <section className={reference.terrain} aria-label="L’école de Puget-sur-Argens"><div className={reference.container}>
    <div className={reference.sectionHead}><div><p className={reference.eyebrow}>Votre école, en images</p><h2 className={reference.sectionTitle}>{title}</h2></div><p className={reference.intro}>{description}</p></div>
    <div className={reference.campusPhotos}>
      <figure><Image src="/images/campus/salle-formation.webp" alt="Salle de formation du centre Intégrale Academy à Puget-sur-Argens" width={1000} height={700} sizes="(max-width: 700px) 92vw, 720px" /><figcaption>La salle de formation</figcaption></figure>
      <div><figure><Image src="/images/campus/accueil-centre.webp" alt="Accueil du centre de formation" width={700} height={500} sizes="(max-width: 700px) 44vw, 450px" /><figcaption>L’accueil du centre</figcaption></figure><figure><Image src="/images/campus/espace-detente.webp" alt="Espace de détente à Puget-sur-Argens" width={700} height={500} sizes="(max-width: 700px) 44vw, 450px" /><figcaption>Les espaces de pause</figcaption></figure></div>
    </div>
    <div className={reference.campusFooter}><span>Photos du centre Intégrale Academy · Puget-sur-Argens</span><Link href="/ecole#photos">Découvrir tous les espaces ↗</Link></div>
    <div className={reference.trainer}><div><p className={reference.eyebrow}>Une équipe à vos côtés</p><h3>Des personnes pour vous accompagner.</h3><p>Découvrez l’équipe et les interlocuteurs qui vous accompagnent dans votre parcours.</p></div><Link href="/ecole#equipe" className={reference.textLink}>Rencontrer l’équipe ↗</Link></div>
  </div></section>;
}

export function TrainingReferenceContact({ description, title, href, additionalActions, assurances = [], portraitMedallion = false }: { description: ReactNode; title?: string; href: string; additionalActions?: ReactNode; assurances?: readonly string[]; portraitMedallion?: boolean }) {
  return <section className={`${reference.contact} ${styles.contact}`} aria-labelledby="course-contact-title"><div className={`${reference.container} ${reference.contactGrid}`}>
    <div><p className={reference.eyebrow}>Une question sur votre projet ?</p><h2 id="course-contact-title" className={reference.sectionTitle}>Faites le premier pas<br /><em>vers votre futur métier.</em></h2><div className={reference.intro}>{title && <p className="mb-3 font-bold">{title}</p>}{description}</div><p className={reference.small}>Notre équipe vous accompagne pour choisir la formation adaptée à votre projet et vous aider à concrétiser votre avenir professionnel.</p><div className={reference.supportPills}>{['Choisir son parcours', 'Préparer son dossier', 'Étudier son financement', ...assurances].map(item => <span key={item}>{item}</span>)}</div><Link href="/ecole#equipe" className={reference.textLink}>Rencontrer les personnes qui vous accompagnent ↗</Link></div>
    <div className={reference.contactCard}><TeamPortrait person="cassandre" size={240} alt="Memoji de Cassandre, responsable commerciale Intégrale Academy" className={`${reference.portrait} ${portraitMedallion ? styles.portraitMedallion : ''}`} /><p className={reference.eyebrow}>Votre conseillère · Contactez Cassandre</p><h3>Cassandre</h3><p>Responsable commerciale — Intégrale Academy</p><a className={reference.phone} href="tel:0422470768">04 22 47 07 68</a><TrainingReferenceAction href={href}>Réserver un rendez-vous téléphonique →</TrainingReferenceAction>{additionalActions}<a className={reference.textLink} href="tel:0422470768">Appeler Cassandre</a><small>Échange gratuit et sans engagement</small></div>
  </div></section>;
}

export function TrainingReferenceMobileBar({ href = '#dates-tarifs', label = 'Voir les dates & tarifs' }: { href?: string; label?: string }) {
  return <div className={styles.mobileBar}><a href="tel:0422470768" className={styles.action}>Appeler</a><TrainingReferenceAction href={href}>{label}</TrainingReferenceAction></div>;
}
