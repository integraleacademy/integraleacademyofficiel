'use client';

import Link from 'next/link';
import { useEffect, useId, useMemo, useState } from 'react';
import styles from './FinancingSimulator.module.css';

const paymentOptions = [
  { label: 'Paiement comptant', installments: 1 },
  { label: '2 fois', installments: 2 },
  { label: '3 fois', installments: 3 },
  { label: '4 fois', installments: 4 },
  { label: '6 fois', installments: 6 },
  { label: '10 fois', installments: 10 },
];
const formationOptions = [
  { label: 'APS', amount: 1700 },
  { label: 'SSIAP 1', amount: 980 },
  { label: 'A3P', amount: 4250 },
  { label: 'DESP initial', amount: 4350 },
  { label: 'DESP en VAE', amount: 3850 },
  { label: 'Chauffeur VTC', amount: 1500 },
];

function clampAmount(value: number, max: number) {
  if (Number.isNaN(value)) return 0;
  return Math.min(Math.max(Math.round(value), 0), max);
}

function euros(value: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
}

function AmountControl({
  id,
  label,
  value,
  max,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  max: number;
  onChange: (value: number) => void;
}) {
  const safeMax = Math.max(max, 0);

  return <div className="rounded-3xl border border-white/10 bg-white/[.06] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
    <div className="flex items-center justify-between gap-4">
      <label htmlFor={id} className="text-sm font-black text-white">{label}</label>
      <div className="flex w-32 items-center rounded-2xl border border-academy-gold/25 bg-black/25 px-3 py-2 focus-within:ring-2 focus-within:ring-academy-gold/70">
        <input
          id={id}
          type="number"
          min={0}
          max={safeMax}
          value={value}
          onChange={(event) => onChange(clampAmount(Number(event.target.value), safeMax))}
          className="w-full bg-transparent text-right text-sm font-black text-academy-gold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <span className="ml-1 text-xs font-bold text-stone-300">€</span>
      </div>
    </div>
    <input
      type="range"
      min={0}
      max={safeMax}
      value={value}
      onChange={(event) => onChange(clampAmount(Number(event.target.value), safeMax))}
      className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-academy-gold [background:linear-gradient(90deg,#f4c45a_var(--range-progress),rgba(255,255,255,.12)_var(--range-progress))] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-academy-gold [&::-webkit-slider-thumb]:shadow-[0_0_0_6px_rgba(244,196,90,.18)]"
      style={{ '--range-progress': `${safeMax > 0 ? (value / safeMax) * 100 : 0}%` } as React.CSSProperties}
      aria-label={`${label} en euros`}
    />
    <div className="mt-2 flex justify-between text-[11px] font-bold uppercase tracking-[.12em] text-stone-500">
      <span>0 €</span>
      <span>{euros(safeMax)}</span>
    </div>
  </div>;
}

function SummaryRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return <div className={`flex items-center justify-between gap-4 rounded-2xl border p-4 ${highlight ? 'border-academy-gold/50 bg-academy-gold/15' : 'border-white/10 bg-white/[.06]'}`}>
    <span className="text-sm font-bold text-stone-300">{label}</span>
    <span className={`text-right text-lg font-black ${highlight ? 'text-academy-gold' : 'text-white'}`}>{value}</span>
  </div>;
}

function EditorialSimulator({
  formation,
  formationAmount,
  cpfAmount,
  installments,
  remaining,
  monthlyAmount,
  onFormationChange,
  onCpfChange,
  onInstallmentsChange,
}: {
  formation: string;
  formationAmount: number;
  cpfAmount: number;
  installments: number;
  remaining: number;
  monthlyAmount: number;
  onFormationChange: (formation: string) => void;
  onCpfChange: (amount: number) => void;
  onInstallmentsChange: (installments: number) => void;
}) {
  const id = useId();

  return <section id="simulateur" className={styles.simulator} aria-labelledby={`${id}-title`}>
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>02 / Votre estimation</p>
          <h2 id={`${id}-title`}>Estimez votre <em>reste à charge.</em></h2>
        </div>
        <p className={styles.introduction}>Votre formation, votre solde CPF. <br />Quelques chiffres pour y voir plus clair.</p>
      </header>

      <div className={styles.layout}>
        <div className={styles.form}>
          <div className={styles.field}>
            <label htmlFor={`${id}-formation`}>Votre formation</label>
            <select id={`${id}-formation`} value={formation} onChange={(event) => onFormationChange(event.target.value)} aria-describedby={`${id}-prices`}>
              {formationOptions.map((option) => <option key={option.label}>{option.label}</option>)}
            </select>
          </div>

          <div className={styles.cpfField}>
            <div className={styles.amountHeading}>
              <label htmlFor={`${id}-cpf`}>Montant CPF à mobiliser</label>
              <div className={styles.amountInput}>
                <input
                  id={`${id}-cpf`}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={formationAmount}
                  value={cpfAmount}
                  onChange={(event) => onCpfChange(clampAmount(Number(event.target.value), formationAmount))}
                  aria-describedby={`${id}-cpf-help`}
                />
                <span aria-hidden="true">€</span>
              </div>
            </div>
            <input
              className={styles.range}
              type="range"
              min={0}
              max={formationAmount}
              value={cpfAmount}
              onChange={(event) => onCpfChange(clampAmount(Number(event.target.value), formationAmount))}
              aria-label="Ajuster le montant CPF en euros"
              aria-valuetext={euros(cpfAmount)}
            />
            <div className={styles.rangeLimits} aria-hidden="true"><span>0 €</span><span>{euros(formationAmount)}</span></div>
            <p id={`${id}-cpf-help`} className={styles.helper}>Indiquez le montant que vous souhaitez mobiliser, dans la limite du coût de la formation.</p>
          </div>

          <p id={`${id}-prices`} className={styles.priceNote}>Montants TTC. Tarifs 2027 pour les formations APS, A3P et DESP.</p>
          <div className={styles.actions}>
            <Link href="/contact" className={styles.primaryAction}>Étudier mon financement <span aria-hidden="true">↗</span></Link>
            <Link href="tel:0422470768" className={styles.phoneAction}>Appeler un conseiller <span aria-hidden="true">↗</span></Link>
          </div>
        </div>

        <div className={styles.result}>
          <p className={styles.resultLabel} id={`${id}-result-label`}>Reste à charge estimé</p>
          <output className={styles.remaining} aria-labelledby={`${id}-result-label`} aria-live="polite" aria-atomic="true">{euros(remaining)}</output>
          <p className={styles.resultCaption}>Après déduction du montant CPF renseigné</p>

          <dl className={styles.breakdown}>
            <div><dt>Formation {formation}</dt><dd>{euros(formationAmount)}</dd></div>
            <div><dt>Montant CPF mobilisé</dt><dd>− {euros(cpfAmount)}</dd></div>
          </dl>

          <fieldset className={styles.payment}>
            <legend>Envisager un paiement en plusieurs fois</legend>
            <div className={styles.paymentOptions}>
              {paymentOptions.map((option) => <button
                key={option.installments}
                type="button"
                onClick={() => onInstallmentsChange(option.installments)}
                aria-label={option.label}
                aria-pressed={installments === option.installments}
              >{option.installments === 1 ? 'Comptant' : `${option.installments}×`}</button>)}
            </div>
          </fieldset>
          <p className={styles.paymentSummary} aria-live="polite" aria-atomic="true">
            {remaining === 0
              ? 'Solde théorique nul, sous réserve de validation du dossier.'
              : installments > 1
                ? <>Environ <strong>{euros(monthlyAmount)} / mois</strong> sur {installments} mensualités.</>
                : 'Un paiement unique, sans échelonnement.'}
          </p>
        </div>
      </div>

      <p className={styles.disclaimer}>Simulation indicative et simplifiée, sous réserve d’éligibilité, de validation des financeurs et du dossier administratif. Participation réglementaire éventuelle et autres aides non incluses. Échelonnement à confirmer avec un conseiller.</p>
    </div>
  </section>;
}

export default function FinancingSimulator({ variant = 'default' }: { variant?: 'default' | 'editorial' }) {
  const [formation, setFormation] = useState('APS');
  const [cpfAmount, setCpfAmount] = useState(0);
  const [installments, setInstallments] = useState(1);

  const selectedFormation = formationOptions.find((option) => option.label === formation) ?? formationOptions[0];
  const formationAmount = selectedFormation.amount;

  const cappedCpf = Math.min(cpfAmount, formationAmount);

  const remaining = useMemo(() => Math.max(formationAmount - cappedCpf, 0), [formationAmount, cappedCpf]);
  const monthlyAmount = installments > 1 ? Math.ceil(remaining / installments) : remaining;

  useEffect(() => {
    setCpfAmount((current) => clampAmount(current, formationAmount));
  }, [formationAmount]);

  if (variant === 'editorial') {
    return <EditorialSimulator
      formation={formation}
      formationAmount={formationAmount}
      cpfAmount={cappedCpf}
      installments={installments}
      remaining={remaining}
      monthlyAmount={monthlyAmount}
      onFormationChange={setFormation}
      onCpfChange={setCpfAmount}
      onInstallmentsChange={setInstallments}
    />;
  }

  return <section id="simulateur" className="scroll-mt-24 bg-[#08111f] px-4 py-14 text-white md:py-24">
    <div className="page-container overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_8%_10%,rgba(244,196,90,.17),transparent_28%),linear-gradient(135deg,#101b2e,#070d18_58%,#111b2c)] p-5 shadow-[0_34px_120px_rgba(0,0,0,.38)] md:p-9">
      <div className="mb-9 grid gap-5 lg:grid-cols-[1fr_.48fr] lg:items-end">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[.28em] text-academy-gold">Simulateur de financement</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">Calculez une première estimation de votre reste à charge.</h2>
        </div>
        <p className="text-sm leading-7 text-stone-300 md:text-base">Choisissez votre formation, indiquez le montant disponible sur votre CPF, puis testez un échéancier.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[.07] p-5 backdrop-blur md:p-6">
          <h3 className="text-2xl font-black">Votre simulation</h3>
          <div className="mt-6 grid gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/[.06] p-4">
              <label htmlFor="formation-choice" className="text-sm font-black text-white">Formation choisie</label>
              <select id="formation-choice" value={formation} onChange={(event) => setFormation(event.target.value)} className="mt-3 w-full rounded-2xl border border-academy-gold/25 bg-[#091123] px-4 py-3 text-sm font-bold text-white outline-none focus:ring-2 focus:ring-academy-gold/70">
                {formationOptions.map((option) => <option key={option.label}>{option.label}</option>)}
              </select>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[.06] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
              <p className="text-sm font-black text-white">Montant total de la formation</p>
              <div className="mt-3 rounded-2xl border border-academy-gold/25 bg-black/25 px-4 py-3">
                <p className="text-right text-2xl font-black text-academy-gold">{euros(formationAmount)} TTC</p>
              </div>
              <p className="mt-2 text-xs font-semibold leading-5 text-stone-400">Tarifs 2027 pour les formations APS, A3P et DESP. Montants exprimés TTC, automatiquement réglés selon la formation choisie.</p>
            </div>
            <AmountControl id="cpf-amount" label="Montant disponible sur votre CPF" value={cappedCpf} max={formationAmount} onChange={setCpfAmount} />
          </div>
        </div>

        <aside className="rounded-[2rem] border border-academy-gold/25 bg-black/25 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur md:p-6">
          <p className="text-sm font-black uppercase tracking-[.2em] text-academy-gold">Votre reste à charge</p>
          <div className="mt-5 rounded-[1.75rem] bg-white p-6 text-academy-gold-text shadow-gold">
            <p className="text-sm font-black uppercase tracking-[.16em] text-stone-500">{formation}</p>
            <div className="mt-3 text-5xl font-black tracking-tight md:text-6xl">{euros(remaining)}</div>
            <p className="mt-3 text-sm font-bold text-stone-600">Reste à charge estimé</p>
          </div>
          <div className="mt-5 grid gap-3">
            <SummaryRow label="Coût total de la formation" value={euros(formationAmount)} />
            <SummaryRow label="Financement CPF" value={`- ${euros(cappedCpf)}`} />
            <SummaryRow label="Reste à charge estimé" value={euros(remaining)} highlight />
          </div>
          <div className="mt-5 rounded-3xl border border-white/10 bg-white/[.07] p-5">
            {remaining === 0 ? <p className="font-bold text-green-200">Votre formation peut être intégralement couverte selon les montants renseignés.</p> : <p className="font-bold text-white">Reste à financer : <span className="text-academy-gold">{euros(remaining)}</span></p>}
            {remaining > 0 && installments > 1 && <p className="mt-2 text-sm font-semibold text-stone-300">Soit environ {euros(monthlyAmount)} / mois sur {installments} mensualités</p>}
          </div>
          <div className="mt-3 rounded-3xl border border-white/10 bg-white/[.07] p-5">
            <p className="text-sm font-black text-white">Paiement en plusieurs fois</p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {paymentOptions.map((option) => <button key={option.installments} type="button" onClick={() => setInstallments(option.installments)} className={`rounded-2xl px-3 py-3 text-sm font-black transition ${installments === option.installments ? 'bg-academy-gold text-academy-gold-text shadow-gold' : 'bg-black/25 text-stone-200 ring-1 ring-white/10 hover:bg-white/10'}`}>{option.label}</button>)}
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-academy-gold px-5 py-3 text-sm font-black text-academy-gold-text transition hover:-translate-y-0.5 hover:brightness-105">Demander une étude de financement</Link>
            <Link href="tel:0422470768" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15">Appeler un conseiller</Link>
          </div>
        </aside>
      </div>
      <p className="mt-6 text-xs leading-6 text-stone-400">Simulation indicative, sous réserve d’éligibilité, de validation des financeurs et du dossier administratif.</p>
    </div>
  </section>;
}
