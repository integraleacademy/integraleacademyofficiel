'use client';

import { TeamPortrait } from '@/components/TeamPortrait';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, type KeyboardEvent } from 'react';
import school from '@/app/ecole/ecole.module.css';
import styles from './ContactExperience.module.css';

export type ContactInterest = 'security' | 'vtc' | 'bts' | 'undecided';

const interests = [
  { id: 'security', label: 'Sécurité', detail: 'Sécurité privée & incendie', icon: 'shield', image: '/images/formation-scenes-manuel/aps-arrivee.webp', imageAlt: 'Illustration d’un échange autour d’une formation en sécurité', message: 'Je souhaite me reconvertir dans la sécurité. Par où commencer ?', response: 'Parlons du métier qui vous attire, des prérequis et des formations possibles.', topics: ['Votre métier', 'Les prérequis', 'Le financement'], next: 'Trouvons la formation qui vous correspond.', description: 'APS, A3P, SSIAP, dirigeant… Cassandre vous aide à préciser votre projet et à préparer les prochaines étapes.' },
  { id: 'vtc', label: 'VTC', detail: 'Votre projet de chauffeur', icon: 'car', image: '/images/formation-scenes-manuel/vtc-parcours.webp', imageAlt: 'Illustration du parcours de formation de chauffeur VTC', message: 'J’aimerais devenir chauffeur VTC. Comment préparer mon projet ?', response: 'Regardons ensemble la formation, la préparation à l’examen et les possibilités de financement.', topics: ['La formation', 'L’examen', 'Le financement'], next: 'Donnons une direction à votre projet VTC.', description: 'Formation, préparation à l’examen, financement : échangez avec Cassandre pour préparer votre parcours de chauffeur VTC.' },
  { id: 'bts', label: 'BTS', detail: 'Études & alternance', icon: 'book', image: '/images/bts/tenues-2026/mco-ventes.webp', imageAlt: 'Illustration d’étudiants en BTS en situation professionnelle', message: 'Je cherche un BTS en alternance. Pouvez-vous m’accompagner ?', response: 'Échangeons sur le BTS qui vous intéresse, votre candidature et votre recherche d’entreprise.', topics: ['Votre BTS', 'La candidature', 'L’alternance'], next: 'Construisons votre projet d’alternance.', description: 'Choix du BTS, candidature et recherche d’entreprise : Aurélie vous accompagne dans votre projet d’alternance.' },
  { id: 'undecided', label: 'Je ne sais pas encore', detail: 'Commençons par en parler', icon: 'compass', image: '/images/formation-scenes-manuel/aps-arrivee.webp', imageAlt: 'Illustration de l’accueil et de l’accompagnement des futurs apprenants', message: 'J’ai envie de changer de métier, mais je ne sais pas par où commencer.', response: 'Vos envies, votre expérience, votre situation : prenons le temps d’en parler pour vous orienter.', topics: ['Vos envies', 'Votre situation', 'Vos possibilités'], next: 'Un premier échange pour y voir plus clair.', description: 'Vous n’avez pas besoin d’avoir toutes les réponses. Cassandre vous aide à explorer les possibilités et à trouver votre direction.' },
] as const;

const steps = [
  { title: 'Vous nous racontez.', description: 'Une idée, une envie de changement ou une simple question. Tout commence par vous.' },
  { title: 'On fait le point.', description: 'Formation, prérequis, financement : nous regardons ensemble ce qui correspond à votre situation.' },
  { title: 'La suite prend forme.', description: 'Vous identifiez les prochaines étapes avec une personne pour vous accompagner.' },
];

function Icon({ name, className }: { name: string; className?: string }) {
  const paths: Record<string, string> = {
    shield: 'M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Z M8 12l3 3 5-6',
    car: 'm5 10 2-5h10l2 5 M4 10h16v8H4z M7 18v2 M17 18v2 M7 14h1 M16 14h1',
    book: 'M12 6C8 3 3 4 3 4v15s5-1 9 2c4-3 9-2 9-2V4s-5-1-9 2v15',
    compass: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z m4-16-3 7-7 3 3-7 7-3Z',
    arrow: 'M4 12h16m-6-6 6 6-6 6',
    diagonal: 'M6 18 18 6M6 6h12v12',
    phone: 'M7 3H4a1 1 0 0 0-1 1c0 9 8 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a13 13 0 0 1-7-7l2-2-2-5Z',
    mail: 'M3 5h18v14H3z M3 6l9 7 9-7',
    check: 'm5 12 4 4L19 6',
    sparkle: 'm12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z',
  };
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.arrow} /></svg>;
}

function Avatar({ bts, large = false }: { bts: boolean; large?: boolean }) {
  return <span className={`${styles.avatar} ${large ? styles.largeAvatar : ''}`} aria-hidden="true"><TeamPortrait person={bts ? 'aurelie' : 'cassandre'} size={large ? 176 : 48} sizes={large ? '176px' : '48px'} /></span>;
}

export function ContactExperience({ initialInterest = 'undecided', requestLinks, hours }: {
  initialInterest?: ContactInterest;
  requestLinks: { general: string; security: string; vtc: string };
  hours: string;
}) {
  const [interest, setInterest] = useState<ContactInterest>(initialInterest);
  const [step, setStep] = useState(0);
  const interestRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = interests.find(item => item.id === interest) ?? interests[3];
  const isBts = interest === 'bts';
  const adviser = isBts ? 'Aurélie' : 'Cassandre';
  const phone = isBts ? '04 87 83 06 15' : '04 22 47 07 68';
  const phoneHref = isBts ? 'tel:+33487830615' : 'tel:+33422470768';
  const mailHref = isBts ? 'mailto:aurelie@integraleacademy.com?subject=Question%20sur%20un%20BTS' : 'mailto:ecole@integraleacademy.com?subject=Mon%20projet%20de%20formation';
  const requestHref = interest === 'vtc' ? requestLinks.vtc : interest === 'security' ? requestLinks.security : requestLinks.general;

  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number, total: number, select: (index: number) => void, refs: (HTMLButtonElement | null)[]) {
    let next: number;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % total;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + total - 1) % total;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = total - 1;
    else return;
    event.preventDefault();
    select(next);
    refs[next]?.focus();
  }

  return <section id="demande" className={`${school.section} ${styles.experience}`} aria-labelledby="contact-experience-title">
    <div className={school.container}>
      <div className={school.sectionHeading} data-contact-reveal>
        <div><p className={school.eyebrow}>02 / Votre premier échange</p><h2 id="contact-experience-title">Une question.<br /><em>Un premier pas.</em></h2></div>
        <p>Vous avez un projet en tête ? Ou simplement envie d’explorer vos possibilités ? Faisons le point ensemble.</p>
      </div>

      <p className={styles.selectorLabel}>Quelle formation vous intéresse ?</p>
      <div className={styles.interests} role="tablist" aria-label="Votre projet de formation">
        {interests.map((item, index) => <button type="button" role="tab" key={item.id} id={`contact-interest-${item.id}`} aria-selected={interest === item.id} aria-controls="contact-interest-panel" tabIndex={interest === item.id ? 0 : -1} ref={element => { interestRefs.current[index] = element; }} onClick={() => setInterest(item.id)} onKeyDown={event => navigateTabs(event, index, interests.length, next => setInterest(interests[next].id), interestRefs.current)}>
          <span className={styles.interestIcon}><Icon name={item.icon} /></span><span><strong>{item.label}</strong><small>{item.detail}</small></span><span className={styles.selectionMark} aria-hidden="true"><Icon name="check" /></span>
        </button>)}
      </div>

      <div id="contact-interest-panel" role="tabpanel" tabIndex={0} aria-labelledby={`contact-interest-${interest}`}>
        <div className={styles.journey} data-contact-reveal>
          <div className={styles.journeyCopy}>
            <p className={styles.chapterLabel}>Un échange, tout simplement.</p>
            <div className={styles.steps} role="tablist" aria-label="Les étapes de votre échange" aria-orientation="vertical">
              {steps.map((item, index) => <button type="button" role="tab" key={item.title} id={`contact-step-${index}`} aria-selected={step === index} aria-controls="contact-phone-panel" tabIndex={step === index ? 0 : -1} ref={element => { stepRefs.current[index] = element; }} onClick={() => setStep(index)} onKeyDown={event => navigateTabs(event, index, steps.length, setStep, stepRefs.current)}>
                <span className={styles.stepNumber}>0{index + 1}<Icon name="arrow" /></span>
                <span className={styles.stepCopy}><strong>{item.title}</strong><span>{item.description}</span></span>
              </button>)}
            </div>
            <a href="#interlocutrice" className={`${school.textLink} ${styles.journeyLink}`}>Parler avec {adviser}<Icon name="diagonal" /></a>
          </div>

          <div id="contact-phone-panel" role="tabpanel" tabIndex={0} aria-labelledby={`contact-step-${step}`} className={styles.scene}>
            <div className={styles.sceneHalo} aria-hidden="true" />
            <div className={styles.floatingAdviser} key={`adviser-${interest}`}><Avatar bts={isBts} /><span><strong>{adviser}</strong><small>À votre écoute</small></span><Icon name="sparkle" /></div>
            <div className={styles.phone}>
              <div className={styles.phoneStatus} aria-hidden="true"><span>9:41</span><i /><span>▰</span></div>
              <div className={styles.phoneHeader}><Image src="/images/academy-a-icon.svg" alt="" width={35} height={35} /><div><strong>Intégrale Academy</strong><span>Votre projet de formation</span></div></div>
              <div className={styles.phoneScreen} key={`${interest}-${step}`}>
                <span className={styles.screenLabel}>{['Faisons connaissance', 'Une équipe pour vous guider', 'Construisons la suite'][step]}</span>
                {step < 2 && <div className={styles.userBubble}>{selected.message}</div>}
                {step === 0 && <>
                  <div className={styles.previewIllustration}><Image src={selected.image} alt={selected.imageAlt} width={1536} height={1024} sizes="260px" /><span>{selected.detail}</span></div>
                  <p className={styles.phoneNote}>Vos envies donnent la direction.</p>
                </>}
                {step === 1 && <>
                  <div className={styles.adviserBubble}><span>{adviser} · Intégrale Academy</span>{selected.response}</div>
                  <div className={styles.phoneTopics}>{selected.topics.map(topic => <span key={topic}><Icon name="check" />{topic}</span>)}</div>
                </>}
                {step === 2 && <>
                  <div className={styles.summaryCard}><span className={styles.summaryIcon}><Icon name={selected.icon} /></span><strong>{selected.next}</strong><p>Votre projet · vos possibilités · les prochaines étapes</p><span className={styles.summaryStatus}><Icon name="sparkle" />À construire ensemble</span></div>
                  <div className={styles.phoneSignoff}><Avatar bts={isBts} /><span>Avec {adviser}<small>Une personne à vos côtés.</small></span></div>
                </>}
              </div>
              <div className={styles.phoneFooter}><span>Écouter</span><i />Orienter<i /><span>Accompagner</span></div>
              <div className={styles.homeIndicator} aria-hidden="true" />
            </div>
            <div className={styles.floatingNote}><Icon name="sparkle" /><span>Le premier échange<strong>Gratuit, sans engagement.</strong></span></div>
            <p className={styles.sceneCaption}>Un exemple d’échange avec notre équipe.</p>
          </div>
        </div>

        <div id="interlocutrice" className={styles.adviserCard} data-contact-reveal>
          <div className={styles.adviserIntro}>
            <p className={school.eyebrow}>Votre interlocutrice</p>
            <h2>Parlons de votre<br /><em>prochain métier.</em></h2>
            <div className={styles.person} key={adviser}>
              <Avatar bts={isBts} large />
              <div><h3>{adviser}</h3><p>{isBts ? 'Relations clients & responsable BTS' : 'Responsable commerciale'}</p><span>Intégrale Academy</span></div>
            </div>
          </div>
          <div className={styles.adviserActions} key={`actions-${interest}`}>
            <span className={styles.projectBadge}><Icon name={selected.icon} />{selected.detail}</span>
            <h3>{selected.next}</h3>
            <p>{selected.description}</p>
            <div className={styles.topicTags}>{selected.topics.map(topic => <span key={topic}><Icon name="check" />{topic}</span>)}</div>
            <a href={isBts ? mailHref : requestHref} className={`${school.button} ${styles.primaryAction}`}>{isBts ? 'Écrire à Aurélie' : 'Parler de mon projet'}<Icon name="arrow" /></a>
            <p className={styles.actionHint}>{isBts ? 'Votre message est adressé directement à Aurélie.' : 'Décrivez votre projet dans notre formulaire. L’équipe vous recontactera pour préparer la suite.'}</p>
            <div className={styles.directContact}><a href={phoneHref}><Icon name="phone" /><span><small>Appeler {adviser}</small>{phone}</span><Icon name="diagonal" /></a>{!isBts && <a href={mailHref} aria-label="Écrire à l’équipe par e-mail" className={styles.mailButton}><Icon name="mail" /></a>}</div>
            <p className={styles.hours}>{hours}</p>
            <p className={styles.reassurance}><Icon name="sparkle" />Premier échange gratuit et sans engagement.</p>
          </div>
        </div>
        {!isBts && <p className={styles.privacy}>Intégrale Academy utilise vos informations pour étudier votre projet et vous recontacter. Le formulaire dédié enregistre les réponses au fil de la saisie, avant validation. Retrouvez les destinataires, les durées de conservation et vos droits dans notre <Link href="/politique-confidentialite">politique de confidentialité</Link>.</p>}
      </div>
    </div>
  </section>;
}
