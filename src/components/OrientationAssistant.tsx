'use client';

import Link from 'next/link';
import { getSessionSeatAvailability } from '@/lib/session-seat-availability';
import FinancingSimulator from './FinancingSimulator';
import { VaeEligibilityModal } from './VaeEligibilityModal';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { formatSessionDate } from '@/lib/public-sessions';
import { securityFormations } from '@/data/formations';
import { ssiap2Config, ssiap3Config } from '@/data/ssiap-catalogue';
import { despVaeAdmin } from '@/data/despVae';
import { createPortal } from 'react-dom';
import styles from './OrientationAssistant.module.css';

export type FormationKey = 'aps' | 'a3p' | 'desp' | 'desp-vae' | 'sst' | 'ssiap-1' | 'ssiap-2' | 'ssiap-3' | 'vtc' | 'bts';
type Step = 'formations' | 'loading' | 'formation-result' | 2 | 3 | 4;
type AssistantSession = { id: string; startDate: string; endDate: string; examDate?: string | null; seatsLeft?: number | null; seatsTotal?: number | null; status?: string | null; showSeatsLeft?: boolean | null; training?: { slug?: string; name?: string } | null; };

type AssistantFormation = {
  key: FormationKey;
  label: string;
  icon: string;
  infoUrl: string;
  rdvUrl: string;
  homeTitle: string;
  homeSubtitle: string;
};

const calendlyDirigeantUrl = 'https://calendly.com/integraleacademy/dirigeant';
const quoteRequestUrl = 'https://assistance-alw9.onrender.com/demande-informations-formations';
const apsFormation = securityFormations.find(formation => formation.slug === '/formations-securite/aps');
const informationLoadingDelayMs = 900;

const formations: AssistantFormation[] = [
  { key: 'aps', label: 'Agent de sécurité privée (APS)', icon: '👮', infoUrl: '/formations-securite/aps', rdvUrl: 'https://assistance-alw9.onrender.com/demande-informations-formations', homeTitle: 'Agent de sécurité', homeSubtitle: 'APS · surveillance' },
  { key: 'a3p', label: 'Agent de protection physique des personnes (A3P)', icon: '◆', infoUrl: '/formations-securite/a3p-apr', rdvUrl: '/contact?formation=a3p&type=rdv', homeTitle: 'Agent de protection', homeSubtitle: 'A3P · APR' },
  { key: 'desp', label: 'Dirigeant d’entreprise de sécurité (DESP)', icon: '▣', infoUrl: '/despvaeouinitial', rdvUrl: '/contact?formation=desp&type=rdv', homeTitle: 'Dirigeant sécurité', homeSubtitle: 'Initial · VAE' },
  { key: 'vtc', label: 'Chauffeur VTC', icon: '🚗', infoUrl: '/vtc', rdvUrl: '/contact?formation=vtc&type=rdv', homeTitle: 'Chauffeur VTC', homeSubtitle: 'Théorie · pratique' },
  { key: 'bts', label: 'Un BTS en alternance', icon: '◇', infoUrl: '/bts', rdvUrl: '/contact?formation=bts&type=rdv', homeTitle: 'Étudiant en BTS', homeSubtitle: 'Alternance · diplôme' },
];

// Contextual choices for the course heroes; the home assistant keeps its existing menu.
const contextualFormations: AssistantFormation[] = [
  { key: 'desp-vae', label: 'Dirigeant d’entreprise de sécurité privée par la VAE', icon: '▣', infoUrl: '/vaedirigeant', rdvUrl: '/contact?formation=desp-vae&type=rdv', homeTitle: 'DESP par la VAE', homeSubtitle: 'Expérience · accompagnement' },
  { key: 'sst', label: 'Sauveteur secouriste du travail (SST)', icon: '+', infoUrl: '/formations-securite/sst', rdvUrl: '/contact?formation=sst&type=rdv', homeTitle: 'Secourisme au travail', homeSubtitle: 'SST' },
  { key: 'ssiap-1', label: 'Agent de sécurité incendie (SSIAP 1)', icon: '◎', infoUrl: '/formations-securite/ssiap-1', rdvUrl: '/contact?formation=ssiap-1&type=rdv', homeTitle: 'SSIAP 1', homeSubtitle: 'Agent' },
  { key: 'ssiap-2', label: 'Chef d’équipe de sécurité incendie (SSIAP 2)', icon: '◎', infoUrl: '/formations-securite/ssiap-2', rdvUrl: '/contact?formation=ssiap-2&type=rdv', homeTitle: 'SSIAP 2', homeSubtitle: 'Chef d’équipe' },
  { key: 'ssiap-3', label: 'Chef de service de sécurité incendie (SSIAP 3)', icon: '◎', infoUrl: '/formations-securite/ssiap-3', rdvUrl: '/contact?formation=ssiap-3&type=rdv', homeTitle: 'SSIAP 3', homeSubtitle: 'Chef de service' },
];
const allFormations = [...formations, ...contextualFormations];

function AssistantIcon({name}:{name:'assistant' | 'book' | 'calendar' | 'arrow' | 'close' | 'check'}) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'assistant' && <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/><path d="M8 10h8M8 14h5"/></>}
    {name === 'book' && <><path d="M12 5v15M12 5C8 3 5 3 2 4v15c3-1 6-1 10 1 4-2 7-2 10-1V4c-3-1-6-1-10 1Z"/></>}
    {name === 'calendar' && <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18m-13 5 3 3 5-5"/></>}
    {name === 'arrow' && <path d="M5 12h14m-6-6 6 6-6 6"/>}
    {name === 'close' && <path d="m6 6 12 12M6 18 18 6"/>}
    {name === 'check' && <><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></>}
  </svg>;
}

type AssistantFormationDetails = { title: string; shortLabel: string; sessionSlugs: string[]; price: string; keyPoints: string[]; capacity?: number };

const formationDetails: Record<FormationKey, AssistantFormationDetails> = {
  'desp-vae': { title: 'DESP par la validation des acquis de l’expérience', shortLabel: 'DESP VAE', sessionSlugs: ['desp-vae'], price: despVaeAdmin.price, keyPoints: ['Accompagnement individualisé centré sur votre expérience et vos preuves', 'Durée et calendrier définis selon votre dossier et le jury', 'Accompagnement à distance ; jury selon la convocation du certificateur', `Certification : ${despVaeAdmin.rncp} · ${despVaeAdmin.level}`, 'Diagnostic, dossier de faisabilité, dossier de validation et préparation du jury', 'CPF, employeur / OPCO, France Travail ou financement personnel selon dossier'] },
  sst: { title: 'Formation Sauveteur secouriste du travail (SST)', shortLabel: 'SST', sessionSlugs: ['sst'], price: 'Sur devis', capacity: 10, keyPoints: ['Durée : 2 jours · 14 heures en présentiel', 'Lieu : Puget-sur-Argens · Var · Côte d’Azur', 'Aucun prérequis · groupes de 4 à 10 participants', 'Prévention des risques et gestes de premiers secours au travail', 'Certificat SST valable 24 mois', 'Financement employeur / OPCO ou personnel selon dossier'] },
  'ssiap-1': { title: 'Formation Agent de sécurité incendie (SSIAP 1)', shortLabel: 'SSIAP 1', sessionSlugs: ['ssiap-1'], price: '980 €', keyPoints: ['Durée : 67 heures hors examen et déplacements', 'Formation en présentiel à Puget-sur-Argens', 'Effectif : 12 stagiaires maximum', 'Prévention, surveillance des installations et assistance aux personnes', 'Diplôme SSIAP 1 · évaluations théorique et pratique', 'Prérequis et financement vérifiés avec notre équipe'] },
  'ssiap-2': { title: ssiap2Config.title, shortLabel: ssiap2Config.label, sessionSlugs: ['ssiap-2'], price: 'Sur devis', keyPoints: [`Durée : ${ssiap2Config.duration} · ${ssiap2Config.durationDetail}`, 'Formation en présentiel à Puget-sur-Argens', ssiap2Config.capacity, ssiap2Config.intro, ssiap2Config.certification, 'Dossier, prérequis et financement vérifiés avant inscription'] },
  'ssiap-3': { title: ssiap3Config.title, shortLabel: ssiap3Config.label, sessionSlugs: ['ssiap-3'], price: 'Sur devis', capacity: 10, keyPoints: [`Durée : ${ssiap3Config.duration} · ${ssiap3Config.durationDetail}`, 'Formation en présentiel à Puget-sur-Argens', ssiap3Config.capacity, ssiap3Config.intro, ssiap3Config.certification, 'Dossier, prérequis et financement vérifiés avant inscription'] },
  aps: { title: 'Formation Agent de sécurité privée (APS)', shortLabel: 'APS', sessionSlugs: ['aps'], price: apsFormation?.price || 'Tarif sur demande', keyPoints: ['Format : Hydrique (Distanciel + Présentiel) · 51 h à distance + 124 h en présentiel', `Durée : ${apsFormation?.duration || '175 heures au total'}`, `Lieu : ${apsFormation?.locations || 'Puget-sur-Argens, Côte d’Azur'}`, `Certification : ${apsFormation?.certification || 'TFP APS · RNCP n°36648 · niveau 3'}`, 'Examen final en présentiel : QCU contextualisés + deux mises en situation individuelles', `Financements : ${apsFormation?.financing || 'CPF, France Travail ou paiement en plusieurs fois'}`] },
  a3p: { title: 'Formation Agent de protection physique des personnes (A3P)', shortLabel: 'A3P', sessionSlugs: ['a3p-apr'], price: '4 250 € TTC', keyPoints: ['Formation en présentiel orientée protection rapprochée', 'Durée : 9 semaines · 328 heures hors examen, dont 92 h 50 de pratique', 'Lieu : Puget-sur-Argens · hébergement collectif possible sur demande', 'Certification : TFP A3P · RNCP n°38002 · CNAPS', 'Évaluations théoriques et mises en situation professionnelles', 'Financements : CPF, France Travail et facilités de paiement selon dossier'] },
  desp: { title: 'Formation Dirigeant d’entreprise de sécurité privée (DESP)', shortLabel: 'DESP', sessionSlugs: ['desp-dssp', 'desp-initial'], price: '4 350 € TTC initial · 3 850 € TTC VAE', keyPoints: ['Deux parcours : formation initiale ou validation des acquis de l’expérience (VAE)', 'Durée : initial 7 semaines · 245 heures ; VAE environ 1 mois', 'Lieux : distanciel + Paris, Puget-sur-Argens ou Aurillac selon les sessions', 'Certification : DESP · RNCP n°40385 · agrément dirigeant CNAPS', 'Évaluation : QCU, mises en situation et jury professionnel', 'Financements : CPF, France Travail et facilités de paiement selon dossier'] },
  vtc: { title: 'Formation Chauffeur VTC', shortLabel: 'VTC', sessionSlugs: ['vtc'], price: '1 500 € tout inclus', keyPoints: ['Formation mixte : théorie en e-learning et pratique en présentiel', 'Durée : 105 heures', 'Pratique : Nice, Cannes, Toulon ou Fréjus', 'Certification : RS n°5637 · agrément préfectoral VTC-26-001', 'Le tarif inclut le livre, la pratique, le véhicule et les frais d’examen', 'Financement CPF selon éligibilité avec accompagnement administratif'] },
  bts: { title: 'BTS en alternance', shortLabel: 'BTS', sessionSlugs: ['bts-mos', 'bts-mco'], price: 'Sans frais pour l’apprenti', keyPoints: ['Parcours : MOS, MCO, NDRC, Commerce international, Professions immobilières et Comptabilité-Gestion', 'Durée habituelle : 2 ans en alternance', 'Modalités : présentiel ou distanciel selon le BTS et le dossier', 'Certification : diplôme national de niveau 5 délivré par le Ministère de l’Éducation nationale', 'Admission : niveau bac ou titre équivalent et projet d’alternance', 'Financement : prise en charge par l’entreprise et son OPCO selon le contrat'] },
};

type OrientationAssistantProps = {
  initialFormationKey?: FormationKey;
  initialStep?: Step;
  hideInfoAction?: boolean;
  variant?: 'default' | 'homeDock' | 'modalTrigger';
  triggerLabel?: string;
  triggerDescription?: string;
  triggerAppearance?: 'card' | 'button';
  triggerClassName?: string;
};

export function OrientationAssistant({initialFormationKey, initialStep, hideInfoAction = false, variant = 'default', triggerLabel = 'Notre assistant va vous aider', triggerDescription: customTriggerDescription, triggerAppearance = 'card', triggerClassName}: OrientationAssistantProps = {}){
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inlinePanelRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogId = useId();
  const [isOpen, setIsOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isModalVariant = variant === 'modalTrigger' || variant === 'homeDock';
  const sessionsActive = !isModalVariant || isExpanded;
  const [step, setStep] = useState<Step>(initialStep ?? (initialFormationKey ? 2 : 'formations'));
  const [sessions, setSessions] = useState<AssistantSession[]>([]);
  const [selectedKey, setSelectedKey] = useState<FormationKey | null>(initialFormationKey ?? null);
  const [despExperience, setDespExperience] = useState<boolean | null>(null);
  const loadingTimeoutRef = useRef<number | null>(null);
  const selectedFormation = useMemo(() => allFormations.find((formation) => formation.key === selectedKey) ?? null, [selectedKey]);
  const normalizedPathname = pathname?.replace(/\/$/, '') || '/';
  const isAlreadyOnSelectedFormation = Boolean(selectedFormation && normalizedPathname === selectedFormation.infoUrl);
  const shouldHideInfoAction = hideInfoAction || isAlreadyOnSelectedFormation;
  const resetAssistantState = () => {
    if (loadingTimeoutRef.current) {
      window.clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
    setIsExpanded(false);
    setStep(initialStep ?? (initialFormationKey ? 2 : 'formations'));
    setSelectedKey(initialFormationKey ?? null);
    setDespExperience(null);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!sessionsActive) return;
    fetch('/api/sessions')
      .then(response => response.ok ? response.json() : Promise.reject())
      .then(data => setSessions(Array.isArray(data.sessions) ? data.sessions : []))
      .catch(() => setSessions([]));
  }, [sessionsActive]);

  useEffect(() => () => {
    if (loadingTimeoutRef.current) window.clearTimeout(loadingTimeoutRef.current);
  }, []);

  useEffect(() => {
    if (!isExpanded || !isMounted) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      const focusTarget = triggerRef.current?.isConnected ? triggerRef.current : inlinePanelRef.current?.querySelector<HTMLButtonElement>('button:not([aria-label])');
      focusTarget?.focus();
    };
  }, [isExpanded, isMounted]);

  function chooseFormation(key: FormationKey){
    if (loadingTimeoutRef.current) window.clearTimeout(loadingTimeoutRef.current);
    setSelectedKey(key);
    setDespExperience(null);
    setIsExpanded(true);
    startFormationInformation(key);
  }

  function startFormationInformation(key = selectedKey){
    if (!key) return;
    if (loadingTimeoutRef.current) window.clearTimeout(loadingTimeoutRef.current);
    setSelectedKey(key);
    setIsExpanded(true);
    setStep('loading');
    loadingTimeoutRef.current = window.setTimeout(() => {
      setStep('formation-result');
      loadingTimeoutRef.current = null;
    }, informationLoadingDelayMs);
  }

  function goBack(){
    if (loadingTimeoutRef.current) {
      window.clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
    if(step === 4){
      setStep(2);
      setDespExperience(null);
      return;
    }
    setSelectedKey(initialFormationKey ?? null);
    setStep(initialFormationKey ? 2 : 'formations');
  }

  function minimizeAssistant(){
    if (isExpanded) {
      resetAssistantState();
      return;
    }
    resetAssistantState();
    setIsOpen(false);
  }

  const minimizedButton = <button type="button" onClick={() => { resetAssistantState(); setIsOpen(true); }} className="group fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] right-4 z-[55] inline-flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full border border-academy-gold/60 bg-white/95 px-4 py-3 text-left text-sm font-black text-academy-ink shadow-[0_18px_45px_rgba(17,17,17,.14)] backdrop-blur transition hover:-translate-y-0.5 hover:border-academy-gold lg:bottom-24 lg:right-6">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-academy-ink text-academy-gold transition group-hover:rotate-6" aria-hidden="true">?</span>
      <span>Être conseillé</span>
    </button>;

  if(!isOpen){
    return isMounted && typeof document !== 'undefined' ? createPortal(minimizedButton, document.body) : minimizedButton;
  }

  const homeDockPanel = <aside className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#081626] p-5 text-white shadow-[0_32px_90px_rgba(8,22,38,.22)] sm:p-6 lg:p-7" aria-label="Assistant d’orientation formation">
    <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-academy-gold/15 shadow-[0_0_0_52px_rgba(242,187,49,.025),0_0_0_104px_rgba(242,187,49,.018)]" aria-hidden="true" />
    <div className="relative grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start" data-home-dock-layout>
      <div data-home-dock-intro>
        <p className="text-[10px] font-black uppercase tracking-[.2em] text-academy-gold">Assistant d’orientation</p>
        <h2 className="mt-3 text-3xl font-black leading-[.95] tracking-[-.045em] sm:text-4xl">Quelle formation vous intéresse&nbsp;?</h2>
        <p className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-white/60" data-home-dock-status><span className="status-dot" aria-hidden="true" /> Disponible maintenant</p>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-5" data-home-formation-options>
          {formations.map((formation,index) => <button key={formation.key} type="button" aria-haspopup="dialog" aria-expanded={isExpanded && selectedKey === formation.key} aria-controls={dialogId} onClick={(event) => { triggerRef.current = event.currentTarget; chooseFormation(formation.key); }} className="group flex min-h-24 flex-col rounded-[1.25rem] border border-white/10 bg-white/[.055] p-3 text-left transition last:col-span-2 hover:-translate-y-1 hover:border-academy-gold/50 hover:bg-white/[.09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academy-gold sm:min-h-28 sm:p-4 xl:last:col-span-1">
            <span className="text-[10px] font-black text-academy-gold">{String(index + 1).padStart(2,'0')}</span>
            <span className="mt-auto text-sm font-black leading-5 text-white">{formation.homeTitle}</span>
            <span className="mt-1 flex w-full items-center justify-between gap-2 text-[10px] font-bold text-white/55"><span>{formation.homeSubtitle}</span><span className="text-academy-gold transition group-hover:translate-x-1" aria-hidden="true">→</span></span>
          </button>)}
        </div>
        <div className="mt-4 flex flex-col gap-3 text-[10px] font-semibold text-white/50 sm:flex-row sm:items-center sm:justify-between" data-home-dock-footer>
          <span>L’assistant conserve votre parcours : formation, situation, financement, dates et prise de rendez-vous.</span>
          <button type="button" aria-haspopup="dialog" aria-expanded={isExpanded && selectedKey === null} aria-controls={dialogId} onClick={(event) => { triggerRef.current = event.currentTarget; setSelectedKey(null); setStep('formations'); setIsExpanded(true); }} className="shrink-0 font-black text-white underline decoration-academy-gold/50 underline-offset-4 transition hover:text-academy-gold">Je ne sais pas encore →</button>
        </div>
      </div>
    </div>
  </aside>;

  const assistantTitle = step === 'formations' ? 'Quelle formation vous intéresse ?'
    : step === 2 ? 'Comment pouvons-nous vous aider ?'
    : step === 3 ? 'Préparons votre inscription'
    : step === 4 ? 'Trouvons le bon parcours'
    : step === 'loading' ? 'Votre projet de formation' : 'Les informations essentielles';

  const assistantPanel = <aside ref={isExpanded ? undefined : inlinePanelRef} className={`orientation-assistant ${styles.panel} ${isExpanded ? styles.expanded : styles.embedded}`} aria-label="Assistant d’orientation formation" data-assistant-design="compact">
      <div className={styles.topline}>
        <div className={styles.identity}>
          <span className={styles.assistantIcon}><AssistantIcon name="assistant" /></span>
          <div><p className={styles.brand}>Intégrale Academy</p><p className={styles.assistantName}>Votre assistant formation</p></div>
        </div>
        <button type="button" onClick={minimizeAssistant} className={styles.close} aria-label={isExpanded || isModalVariant ? 'Fermer l’assistant' : 'Réduire l’assistant'}><AssistantIcon name="close" /></button>
      </div>

      <div className={styles.content}>
        <div className={styles.heading}>
          {selectedFormation && <p className={styles.course}><span aria-hidden="true" />{selectedFormation.label}</p>}
          <h2 id={`${dialogId}-title`}>{assistantTitle}</h2>
          {(step === 'formations' || step === 2) && <p className={styles.intro}>Les bonnes informations pour avancer dans votre projet.</p>}
        </div>

        {step === 'formations' && <div className={styles.formationList}>
          {formations.map((formation) => <button key={formation.key} type="button" onClick={() => chooseFormation(formation.key)} className={styles.formationOption}>
            <span className={styles.optionIcon}><AssistantIcon name="book" /></span>
            <span>{formation.label}</span>
            <AssistantIcon name="arrow" />
          </button>)}
        </div>}


        {step === 'loading' && selectedFormation && <FormationAssistantLoading formation={selectedFormation} />}

        {step === 'formation-result' && selectedFormation && <FormationAssistantResult formation={selectedFormation} sessions={sessions} hideInfoAction={shouldHideInfoAction} isExpanded={isExpanded} />}

        {step === 2 && selectedFormation && <div className={styles.choices}>
          <button type="button" onClick={() => startFormationInformation()} className={styles.choice}>
            <span className={styles.optionIcon}><AssistantIcon name="book" /></span>
            <span className={styles.choiceTitle}>Me renseigner</span>
            <span className={styles.choiceDescription}>Tarifs, prochaines dates,<br />durée et financements.</span>
            <span className={styles.choiceAction}>Voir les informations <AssistantIcon name="arrow" /></span>
          </button>
          <button type="button" onClick={() => { setIsExpanded(true); setStep(3); }} className={`${styles.choice} ${styles.enroll}`}>
            <span className={styles.optionIcon}><AssistantIcon name="calendar" /></span>
            <span className={styles.choiceTitle}>Préparer mon inscription</span>
            <span className={styles.choiceDescription}>Être accompagné pour<br />rejoindre la formation.</span>
            <span className={styles.choiceAction}>Préparer mon rendez-vous <AssistantIcon name="arrow" /></span>
          </button>
        </div>}


        {step === 4 && selectedFormation?.key === 'desp' && <div className="space-y-5 rounded-[1.35rem] bg-academy-bg p-5">
          <div>
            <h3 className="text-xl font-black">Avez-vous déjà une expérience en management, gestion, création d’entreprise&nbsp;?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">Votre réponse nous permet de vous orienter entre le parcours VAE DESP et la formation initiale DESP.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => setDespExperience(true)} className={`rounded-2xl px-5 py-4 text-left font-black transition ${despExperience === true ? 'bg-academy-ink text-white shadow-soft' : 'bg-white text-academy-ink ring-1 ring-academy-line hover:ring-academy-gold'}`}>Oui</button>
            <button type="button" onClick={() => setDespExperience(false)} className={`rounded-2xl px-5 py-4 text-left font-black transition ${despExperience === false ? 'bg-academy-ink text-white shadow-soft' : 'bg-white text-academy-ink ring-1 ring-academy-line hover:ring-academy-gold'}`}>Non</button>
          </div>
          {despExperience === true && <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-none border-0 bg-transparent px-1 py-2 text-sm font-black leading-6 text-academy-ink" role="status"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-academy-gold text-xs text-yellow-700" aria-hidden="true">✓</span><span><span className="block text-base">Vous êtes peut-être éligible à la VAE DESP</span><span className="block text-sm font-extrabold text-stone-600">Validation des Acquis de l’expérience</span></span></div>
            <DespActionGrid vae />
          </div>}
          {despExperience === false && <DespActionGrid />}
        </div>}

        {step === 3 && selectedFormation && <div className={styles.nextStep}>
          <span className={styles.optionIcon}><AssistantIcon name="calendar" /></span>
          <h3>Faisons le point ensemble</h3>
          <p>Notre équipe vous accompagne pour vérifier votre projet, vos financements possibles et les prochaines dates disponibles.</p>
          <div className={styles.actions}><Link href={selectedFormation.rdvUrl} className={styles.primaryAction}>Réserver un rendez-vous téléphonique <AssistantIcon name="arrow" /></Link>{!shouldHideInfoAction && <Link href={selectedFormation.infoUrl} className={styles.secondaryAction}>Voir d’abord les informations</Link>}</div>
        </div>}

        {step !== 'formations' && step !== 2 && <button type="button" onClick={goBack} className={styles.back}><span aria-hidden="true">←</span> {initialFormationKey ? 'Retour aux choix' : 'Retour aux formations'}</button>}
        <p className={styles.footer}><AssistantIcon name="check" /><span>Un accompagnement à chaque étape de votre projet.</span></p>
      </div>
  </aside>;

  const assistantDialog = isExpanded && isMounted ? createPortal(
    <dialog ref={dialogRef} id={dialogId} aria-labelledby={`${dialogId}-title`} data-wide={step === 'formation-result'} onCancel={() => resetAssistantState()} onClick={(event) => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) resetAssistantState();
    }} className={styles.dialog}>
      {assistantPanel}
    </dialog>, document.body
  ) : null;

  if (isModalVariant) {
    const triggerTheme = !initialFormationKey ? 'gold' : initialFormationKey === 'a3p' || initialFormationKey === 'sst' ? 'green' : initialFormationKey?.startsWith('desp') ? 'orange' : initialFormationKey?.startsWith('ssiap') ? 'red' : 'blue';
    const triggerStyles = {
      blue: { border: 'hover:border-blue-300 focus-visible:outline-blue-600', icon: 'bg-blue-50 text-blue-700', arrow: 'text-blue-700' },
      green: { border: 'hover:border-emerald-300 focus-visible:outline-emerald-600', icon: 'bg-emerald-50 text-emerald-700', arrow: 'text-emerald-700' },
      orange: { border: 'hover:border-orange-300 focus-visible:outline-orange-600', icon: 'bg-orange-50 text-orange-700', arrow: 'text-orange-700' },
      red: { border: 'hover:border-red-300 focus-visible:outline-red-600', icon: 'bg-red-50 text-red-700', arrow: 'text-red-700' },
      gold: { border: 'hover:border-academy-gold focus-visible:outline-academy-gold', icon: 'bg-academy-gold/15 text-yellow-700', arrow: 'text-yellow-700' },
    }[triggerTheme];
    const triggerDescription = customTriggerDescription ?? (!initialFormationKey ? 'Formation, financement et inscription : trouvons votre parcours.' : initialFormationKey === 'aps' ? 'Les réponses à vos questions sur l’APS.' : initialFormationKey === 'a3p' ? 'Les réponses à vos questions sur l’A3P.' : `Les réponses à vos questions sur le ${formationDetails[initialFormationKey].shortLabel}.`);
    return <>
      {variant === 'homeDock' ? homeDockPanel : <button ref={triggerRef} type="button" aria-haspopup="dialog" aria-expanded={isExpanded} aria-controls={dialogId} onClick={() => setIsExpanded(true)} className={triggerClassName ?? `flex w-full items-center gap-3 rounded-[1.35rem] border border-academy-line bg-white p-4 text-left text-academy-ink shadow-soft transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${triggerStyles.border}`}>
        {triggerAppearance === 'button' ? <>{triggerLabel}<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></> : <>
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-xl font-black ${triggerStyles.icon}`} aria-hidden="true">✦</span>
        <span className="min-w-0 flex-1"><strong className="block text-sm font-black">{triggerLabel}</strong><small className="mt-1 block text-xs font-semibold text-academy-muted">{triggerDescription}</small></span>
        <svg className={`h-5 w-5 shrink-0 ${triggerStyles.arrow}`} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </>}
      </button>}
      {assistantDialog}
    </>;
  }

  if (isExpanded) {
    return assistantDialog;
  }

  return assistantPanel;
}


function FormationAssistantLoading({formation}:{formation:AssistantFormation}){
  return <div className={styles.loading} role="status" aria-live="polite">
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-academy-gold/15 text-xl" aria-hidden="true">{formation.icon}</span>
      <div><h3 className="text-lg font-black">Je recherche les informations sur la formation {formationDetails[formation.key].shortLabel}</h3><div className="mt-2 flex gap-1" aria-hidden="true">{[0,1,2].map(index => <span key={index} className="h-2 w-2 rounded-full bg-academy-gold motion-safe:animate-pulse" style={{ animationDelay: `${index * 160}ms` }} />)}</div></div>
    </div>
    <div className="mt-5 space-y-2" aria-hidden="true"><div className="h-3 w-11/12 rounded-full bg-academy-gold/10"/><div className="h-3 w-8/12 rounded-full bg-academy-gold/10"/><div className="h-3 w-10/12 rounded-full bg-academy-gold/10"/></div>
  </div>;
}

function FormationAssistantResult({formation,sessions,hideInfoAction=false,isExpanded=false}:{formation:AssistantFormation;sessions:AssistantSession[];hideInfoAction?:boolean;isExpanded?:boolean}){
  const details = formationDetails[formation.key];
  const upcomingSessions = sessions.filter(session => Boolean(session.training?.slug && details.sessionSlugs.includes(session.training.slug))).sort((a,b) => +new Date(a.startDate) - +new Date(b.startDate)).slice(0, 1);
  return <div className={styles.result}>
    <div className={styles.resultIntro}><h3>{details.title}</h3><p>Voici les informations clés concernant cette formation chez Intégrale Academy.</p></div>
    <div className={styles.resultGrid} data-expanded={isExpanded}>
      <div className={styles.keyPoints}><h4>Informations clés</h4><ul>{details.keyPoints.map(point => <li key={point}><span aria-hidden="true">✓</span><span>{point}</span></li>)}</ul></div>
      <div className={styles.price}><span>{['aps', 'a3p', 'desp', 'desp-initial', 'desp-vae'].includes(formation.key) ? 'Tarif 2027' : 'Tarif'}</span><strong>{details.price}</strong></div>
    </div>
    <div><p className="font-black">Prochaine formation</p>{upcomingSessions.length ? <div className="mt-3 grid gap-3">{upcomingSessions.map(session => { const seatAvailability = getSessionSeatAvailability(session, details.capacity ?? 12); return <div key={session.id} className="rounded-2xl border border-academy-line bg-white p-3 shadow-sm"><div className="grid gap-3 sm:grid-cols-3"><p><span className="block text-[10px] font-black uppercase tracking-[.15em] text-academy-muted/70">Début</span><span className="font-black">{formatSessionDate(session.startDate)}</span></p><p><span className="block text-[10px] font-black uppercase tracking-[.15em] text-academy-muted/70">Fin</span><span className="font-black">{formatSessionDate(session.endDate)}</span></p><p><span className="block text-[10px] font-black uppercase tracking-[.15em] text-academy-muted/70">Examen</span><span className="font-black">{session.examDate ? formatSessionDate(session.examDate) : 'À confirmer'}</span></p></div><p className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-black ${seatAvailability.badgeClassName}`}>{seatAvailability.label}</p></div>; })}</div> : <p className="mt-3 rounded-2xl border border-dashed border-academy-line bg-white/70 p-4 text-sm font-bold text-academy-muted">La prochaine date est à confirmer avec notre équipe.</p>}
      <p className="mt-2 text-xs font-bold leading-5 text-stone-600">Consultez toutes les dates en <Link href={`/planning?formation=${formation.key}`} className="font-black text-yellow-700 underline decoration-academy-gold/50 underline-offset-4 hover:text-academy-ink">cliquant ici</Link>.</p>
    </div>
    <div className={styles.actions}><Link href={`/contact?formation=${formation.key}&type=inscription`} className={styles.primaryAction}>Préparer mon inscription <AssistantIcon name="arrow" /></Link>{!hideInfoAction && <Link href={formation.infoUrl} className={styles.secondaryAction}>Découvrir la formation</Link>}</div>
  </div>;
}


function IframeModalButton({label,url,title,featured=false}:{label:string;url:string;title:string;featured?:boolean}){
  const [open,setOpen]=useState(false);
  const [iframeLoaded,setIframeLoaded]=useState(false);
  const openModal=()=>{setIframeLoaded(false);setOpen(true);};
  return <>
    <button type="button" onClick={openModal} className={featured ? 'relative inline-flex min-h-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-academy-gold via-yellow-300 to-academy-gold px-4 py-3 text-center text-sm font-black text-academy-gold-text shadow-gold ring-2 ring-academy-gold/45 transition hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(180,124,31,.38)] focus:outline-none focus:ring-4 focus:ring-academy-gold/35 motion-safe:animate-[rdvButtonPulse_2.4s_ease-in-out_infinite]' : 'inline-flex min-h-14 items-center justify-center rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-academy-ink ring-1 ring-academy-line transition hover:-translate-y-0.5 hover:ring-academy-gold'}><span className={featured ? 'relative z-10' : undefined}>{label}</span>{featured && <span className="absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-18deg] bg-white/35 motion-safe:animate-[rdvButtonShine_2.4s_ease-in-out_infinite]" aria-hidden="true" />}</button>
    {open && typeof document !== 'undefined' && createPortal(<div className="fixed inset-0 z-[9999] grid place-items-center bg-black/75 p-3 backdrop-blur-md sm:p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_35px_110px_rgba(0,0,0,.45)] ring-1 ring-white/30">
        <div className="relative overflow-hidden border-b border-academy-gold/20 bg-gradient-to-br from-[#0B1220] via-[#101B2D] to-[#D8A640] p-5 text-white sm:p-6">
          <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-academy-gold/30 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
          <div className="relative flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[.24em] text-academy-gold">Intégrale Academy</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-4xl">{title}</h2>
              <p className="mt-2 text-sm font-semibold text-white/75 sm:text-base">Choisissez le créneau qui vous convient, notre équipe vous rappelle.</p>
            </div>
            <button type="button" onClick={()=>setOpen(false)} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/12 text-2xl font-black text-white ring-1 ring-white/20 transition hover:bg-academy-gold hover:text-academy-ink focus:outline-none focus:ring-4 focus:ring-academy-gold/35" aria-label="Fermer la modale">×</button>
          </div>
        </div>
        <div className="relative min-h-0 flex-1 bg-[#F7F3EA]">
          {!iframeLoaded && <div className="absolute inset-0 z-10 grid place-items-center bg-[radial-gradient(circle_at_top,#fff7df,transparent_42%),linear-gradient(135deg,#F7F3EA,#ffffff)] p-8 text-center">
            <div className="max-w-sm rounded-[2rem] border border-academy-gold/25 bg-white/85 p-8 shadow-soft backdrop-blur">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-academy-gold/15 ring-8 ring-academy-gold/10"><span className="h-9 w-9 animate-spin rounded-full border-4 border-academy-gold/25 border-t-academy-gold" aria-hidden="true" /></div>
              <p className="mt-6 text-lg font-black text-academy-ink">Chargement en cours…</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-academy-muted">Nous préparons l’agenda sécurisé pour votre rendez-vous téléphonique.</p>
            </div>
          </div>}
          <iframe src={url} title={title} onLoad={()=>setIframeLoaded(true)} className="h-full w-full border-0 bg-white" />
        </div>
      </div>
    </div>, document.body)}
  </>;
}

function FinancingModalButton(){
  const [open,setOpen]=useState(false);
  return <>
    <button type="button" onClick={()=>setOpen(true)} className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-academy-ink ring-1 ring-academy-line transition hover:-translate-y-0.5 hover:ring-academy-gold">Simuler mon financement</button>
    {open && typeof document !== 'undefined' && createPortal(<div className="fixed inset-0 z-[9999] grid place-items-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Simulateur de financement">
      <div className="flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] bg-[#080f1f] shadow-[0_30px_90px_rgba(0,0,0,.35)] ring-1 ring-white/20">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 p-4 sm:p-5"><h2 className="text-lg font-black text-white sm:text-2xl">Simuler mon financement</h2><button type="button" onClick={()=>setOpen(false)} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-xl font-black text-white transition hover:bg-academy-gold hover:text-academy-ink" aria-label="Fermer la modale">×</button></div>
        <div className="min-h-0 flex-1 overflow-y-auto"><FinancingSimulator /></div>
      </div>
    </div>, document.body)}
  </>;
}

function DespActionGrid({vae=false}:{vae?:boolean}){
  return <div className="grid gap-3 sm:grid-cols-2">
    {vae ? <VaeEligibilityModal className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-academy-ink ring-1 ring-academy-line transition hover:-translate-y-0.5 hover:ring-academy-gold" /> : <Link href="/dirigeant" className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-academy-ink ring-1 ring-academy-line transition hover:-translate-y-0.5 hover:ring-academy-gold">En savoir plus sur la formation initiale DESP</Link>}
    {vae && <Link href="/vaedirigeant" className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-academy-ink ring-1 ring-academy-line transition hover:-translate-y-0.5 hover:ring-academy-gold">En savoir plus sur la VAE Dirigeant</Link>}
    <IframeModalButton label="Réserver un RDV téléphonique" url={calendlyDirigeantUrl} title="Réserver un RDV téléphonique" featured />
    <IframeModalButton label="Demander un devis personnalisé" url={quoteRequestUrl} title="Demander un devis personnalisé" />
    <FinancingModalButton />
  </div>;
}
