'use client';

import Image from 'next/image';
import { PageSectionNavigation } from '@/components/PageSectionNavigation';
import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { TeamPortrait } from '@/components/TeamPortrait';
import { locations } from '@/data/locations';
import { schoolVisitCampuses, type SchoolVisitCampus } from '@/lib/school-visit';
import school from './ecole.module.css';
import styles from './school-experience.module.css';

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h16m-6-6 6 6-6 6'} /></svg>;
}

const chapters = [
  ['campus', 'Les lieux'], ['equipe', 'L’équipe'], ['pedagogie', 'La pédagogie'],
  ['clement-vaillant', 'Notre histoire'], ['agrements', 'Nos engagements'],
] as const;

export function SchoolNavigation() {
  return <PageSectionNavigation chapters={chapters} label="Faisons connaissance" ariaLabel="Découvrir notre école" />;
}

const approaches = [
  { label: 'Apprendre', title: 'Comprendre avant d’agir.', text: 'Des professionnels du terrain rendent les notions concrètes, avec des exemples reliés au métier que vous préparez.', image: 'aps-pc-pedagogique.webp', alt: 'Illustration d’un apprentissage au poste de sécurité pédagogique', example: 'En sécurité privée', detail: 'Découvrir le rôle du poste de sécurité et apprendre à repérer les informations utiles à une mission.', href: '/formations-securite/aps', link: 'Découvrir le parcours APS' },
  { label: 'Pratiquer', title: 'Essayer. S’entraîner. Progresser.', text: 'Les mises en situation permettent de relier les connaissances aux gestes et aux décisions du métier.', image: 'sst-pedagogie.webp', alt: 'Illustration d’un atelier de premiers secours encadré par des formateurs', example: 'Pendant un atelier de secours', detail: 'Observer un geste, le reproduire, puis recevoir les retours du formateur pour améliorer sa pratique.', href: '/formations-securite/ssiap', link: 'Découvrir la sécurité incendie' },
  { label: 'Être accompagné', title: 'Une équipe à chaque étape.', text: 'Du premier échange au suivi de votre formation, vous savez vers qui vous tourner pour avancer.', image: 'aps-arrivee.webp', alt: 'Illustration de l’accueil et de l’accompagnement d’apprenants à leur arrivée', example: 'Dès votre projet', detail: 'Faire le point sur la formation, les prérequis et les possibilités de financement, puis préparer votre entrée avec l’équipe.', href: '/contact#demande', link: 'Parler de mon projet' },
];

export function SchoolPedagogy() {
  const [selected, setSelected] = useState(0);
  const approach = approaches[selected];
  return <div className={styles.pedagogy}>
    <div className={styles.approachChoices} role="group" aria-label="Découvrir notre manière de former">
      {approaches.map((item, index) => <button type="button" key={item.label} id={`school-approach-${index}`} aria-pressed={selected === index} aria-controls="school-approach-detail" onClick={() => setSelected(index)}>
        <span className={styles.stepNumber}>0{index + 1}</span><span><strong>{item.label}</strong><span>{item.text}</span></span><span className={styles.stepArrow}><Arrow diagonal /></span>
      </button>)}
    </div>
    <div id="school-approach-detail" className={styles.approachDetail} role="region" aria-labelledby={`school-approach-${selected}`}>
      <figure key={approach.image} className={styles.scene}>
        <Image src={`/images/formation-scenes-manuel/${approach.image}`} alt={approach.alt} width={1536} height={1024} sizes="(max-width: 800px) 100vw, 50vw" />
        <figcaption><span className={school.eyebrow}>{approach.example}</span><h3>{approach.title}</h3><p>{approach.detail}</p><Link href={approach.href} className={school.textLink}>{approach.link}<Arrow diagonal /></Link></figcaption>
      </figure>
      <p className={styles.stepStatus} aria-live="polite">0{selected + 1} / 03 · {approach.label}</p>
    </div>
  </div>;
}

export function SchoolCampuses() {
  const [selected, setSelected] = useState<SchoolVisitCampus>('puget');
  useEffect(() => {
    const readHash = () => {
      if (window.location.hash === '#campus-paris') setSelected('paris');
      if (window.location.hash === '#campus-puget') setSelected('puget');
    };
    readHash(); window.addEventListener('hashchange', readHash);
    return () => window.removeEventListener('hashchange', readHash);
  }, []);
  const location = locations.find(item => item.id === selected)!;
  const aurillac = locations.find(item => item.id === 'aurillac')!;
  const isPuget = selected === 'puget';
  return <>
    <div className={`${school.campusLayout} ${styles.campusExplorer}`}>
      <figure className={school.franceMap} aria-labelledby="map-caption">
        <figcaption id="map-caption"><span>INTÉGRALE ACADEMY</span>Choisissez votre point de départ.</figcaption>
        <div className={school.mapArtwork}>
          <Image src="/images/campus/france-implantations.svg" alt="" width={400} height={400} aria-hidden="true" />
          {(['paris', 'puget'] as const).map(id => <button key={id} id={`campus-${id}`} type="button" onClick={() => setSelected(id)} aria-pressed={selected === id} aria-controls="school-campus-detail" aria-label={`Découvrir ${schoolVisitCampuses[id]}`} className={`${school.mapPin} ${id === 'paris' ? school.parisPin : school.pugetPin} ${styles.mapButton}`}>
            <svg viewBox="0 0 28 36" aria-hidden="true"><path d="M14 1C6.8 1 1 6.8 1 14c0 9.1 13 21 13 21s13-11.9 13-21C27 6.8 21.2 1 14 1Z" /><circle cx="14" cy="14" r="4.5" /></svg>
            <span className={school.mapLabel}>{schoolVisitCampuses[id]}<small>{id === 'paris' ? 'Île-de-France' : 'Notre siège · Côte d’Azur'}</small></span>
          </button>)}
        </div>
        <p className={styles.mapHint}>Cliquez sur un repère pour découvrir le lieu.</p>
      </figure>
      <div className={styles.campusSide}>
        <div className={styles.campusChoices} role="group" aria-label="Choisir une implantation">
          {(['puget', 'paris'] as const).map(id => <button key={id} type="button" aria-pressed={selected === id} aria-controls="school-campus-detail" onClick={() => setSelected(id)}>{schoolVisitCampuses[id]}</button>)}
        </div>
        <article id="school-campus-detail" className={`${school.addressPanel} ${styles.campusDetail}`} aria-live="polite" aria-atomic="true">
          <p className={school.eyebrow}>{isPuget ? 'Notre siège · Côte d’Azur' : 'Notre implantation · Île-de-France'}</p>
          <h3>{schoolVisitCampuses[selected]}<span>{isPuget ? 'Var · 83' : 'Paris · 75'}</span></h3>
          <address>{location.address}</address>
          <div className={styles.campusTags}>{location.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          <p className={styles.campusDescription}>{isPuget ? '400 m² pour apprendre, pratiquer et échanger avec l’équipe.' : location.detail}</p>
          <Link href={`/planning?lieu=${isPuget ? 'cote-azur' : 'paris'}#sessions`} className={`${school.button} ${styles.campusDates}`}>Voir les dates dans ce centre <Arrow /></Link>
          <SchoolVisitButton campus={selected} className={school.textLink} label={isPuget ? 'Organiser ma visite' : 'Préparer ma venue'} />
          <div className={school.access}>{(isPuget ? ['À 500 m de l’A8', 'Parking gratuit', 'Bus 4 · Général de Gaulle'] : ['Accueil selon les sessions', 'Venue à convenir avec l’équipe']).map(item => <span key={item}>{item}</span>)}</div>
        </article>
      </div>
    </div>
    <article className={styles.aurillac}>
      <div><p className={school.eyebrow}>Notre troisième implantation · Selon les sessions</p><h3>Aurillac · Centre France</h3><p>{aurillac.address}</p><p>{aurillac.detail}</p></div>
      <Link href="/planning?lieu=auvergne#sessions" className={school.textLink}>Voir les dates à Aurillac <Arrow diagonal /></Link>
    </article>
  </>;
}

export function SchoolVisitButton({ campus = 'puget', className, label = 'Organiser ma visite' }: { campus?: SchoolVisitCampus; className?: string; label?: string }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  function close() { setOpen(false); requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true })); }
  return <><button ref={trigger} type="button" onClick={() => setOpen(true)} className={className}>{label}<Arrow /></button>{open && createPortal(<VisitDialog campus={campus} onClose={close} />, document.body)}</>;
}

function VisitDialog({ campus, onClose }: { campus: SchoolVisitCampus; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const requestId = useRef('');
  const inFlight = useRef(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    requestId.current = crypto.randomUUID();
    const node = dialog.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; node?.showModal();
    return () => { node?.close(); document.body.style.overflow = overflow; };
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true; setSending(true); setError('');
    const values = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch('/api/ecole/visites', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...values, campus, requestId: requestId.current }) });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || 'La demande n’a pas pu être enregistrée.');
      setSuccess(true);
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Connexion interrompue. Réessayez ou appelez-nous.'); }
    finally { inFlight.current = false; setSending(false); }
  }
  return <dialog ref={dialog} onCancel={onClose} className={styles.visitDialog} aria-labelledby="school-visit-title" aria-describedby="school-visit-intro">
    <div className={styles.dialogHeading}><div><p className={school.eyebrow}>Faisons connaissance</p><h2 id="school-visit-title">{success ? 'Votre demande est enregistrée.' : 'Préparons votre visite.'}</h2></div><button type="button" onClick={onClose} aria-label="Fermer la demande de visite">×</button></div>
    <div className={styles.requestSummary}><strong>Motif : visite de l’école</strong><span>Lieu : {schoolVisitCampuses[campus]}</span></div>
    {success ? <div role="status"><p id="school-visit-intro">Notre équipe dispose de votre demande et de vos coordonnées. Nous vous recontacterons pour convenir d’un rendez-vous.</p><p className={styles.formHint}>Votre visite sera confirmée avec l’équipe.</p><button type="button" className={school.button} onClick={onClose}>Revenir à la découverte de l’école</button></div> : <form onSubmit={submit} className={styles.visitForm}>
      <p id="school-visit-intro">Indiquez vos coordonnées et, si vous le souhaitez, vos disponibilités. {campus === 'paris' ? 'L’accueil à Paris s’organise selon les sessions.' : 'Nous préparerons votre venue à Puget-sur-Argens.'}</p>
      <div className={styles.fieldPair}><label>Prénom<input name="firstName" autoComplete="given-name" required maxLength={80} /></label><label>Nom<input name="lastName" autoComplete="family-name" required maxLength={80} /></label></div>
      <div className={styles.fieldPair}><label>Adresse e-mail<input name="email" type="email" autoComplete="email" required maxLength={120} /></label><label>Téléphone<input name="phone" type="tel" autoComplete="tel" required maxLength={40} minLength={8} /></label></div>
      <label>Votre projet ou vos disponibilités <span className={styles.optional}>(facultatif)</span><textarea name="message" rows={3} maxLength={800} placeholder="La formation qui vous intéresse, les jours où vous pouvez venir…" /></label>
      <div className={styles.honeypot} aria-hidden="true"><label>Ne pas renseigner<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className={styles.formHint}>Vos coordonnées sont utilisées pour préparer votre visite. <Link href="/politique-confidentialite">Protection de vos données</Link>.</p>
      {error && <p className={styles.formError} role="alert">{error}</p>}
      <button className={school.button} disabled={sending}>{sending ? 'Envoi en cours…' : 'Envoyer ma demande de visite'}<Arrow /></button>
      <a className={styles.formPhone} href="tel:+33422470768">Ou appelez-nous au 04 22 47 07 68</a>
    </form>}
  </dialog>;
}

export function SchoolVisitAdviser() {
  return <div className={styles.visitAdviser}><TeamPortrait person="cassandre" size={82} /><div><strong>Cassandre MENARD</strong><span>Votre premier contact pour préparer votre venue.</span></div></div>;
}
