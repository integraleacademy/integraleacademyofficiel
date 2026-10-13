'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import FinancingSimulator from '@/components/FinancingSimulator';
import FundingSections from '@/components/FundingSections';
import { financingFormationOptions } from '@/data/financing-options';
import styles from './TariffsPageContent.module.css';

export type PricingOfferCategory = 'security' | 'fire' | 'leadership' | 'mobility';
export type PricingOfferTone = 'blue' | 'green' | 'teal' | 'red' | 'lime' | 'orange' | 'amber' | 'violet';

export type PricingOffer = {
  slug: string;
  shortTitle: string;
  title: string;
  short: string;
  duration: string;
  locations: string;
  financing: string;
  certification: string;
  price?: string;
  priceNote?: string;
  priceDetails?: string[];
  eyebrow: string;
  category: PricingOfferCategory;
  categoryLabel: string;
  tone: PricingOfferTone;
};

type FilterKey = 'all' | PricingOfferCategory;

const filters: Array<{ key: FilterKey; label: string }> = [
  { key: 'all', label: 'Toutes' },
  { key: 'security', label: 'Sécurité privée' },
  { key: 'fire', label: 'Incendie & secours' },
  { key: 'leadership', label: 'Direction & VAE' },
  { key: 'mobility', label: 'VTC' },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="7" />
      <path d="M10 6v4l3 2" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M16 8c0 4-6 9-6 9S4 12 4 8a6 6 0 1 1 12 0Z" />
      <circle cx="10" cy="8" r="2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m5 10 3 3 7-7" />
    </svg>
  );
}

function formatAmount(rawPrice?: string) {
  if (!rawPrice || /devis/i.test(rawPrice)) {
    return { amount: 'Sur devis', note: 'Selon la session et votre dossier' };
  }

  const match = rawPrice.match(/([\d\s]+)\s*€/);
  if (!match) return { amount: rawPrice, note: 'Tarif indicatif' };

  const numericValue = Number(match[1].replace(/\s/g, ''));
  const amount = Number.isFinite(numericValue)
    ? `${new Intl.NumberFormat('fr-FR').format(numericValue)} €`
    : `${match[1].trim()} €`;

  return { amount, note: 'Tarif de la formation' };
}

function PriceCard({ offer, index, onSimulate }: {
  offer: PricingOffer;
  index: number;
  onSimulate: (formation: string) => void;
}) {
  const price = formatAmount(offer.price);
  const simulation = financingFormationOptions.find(({ slug }) => slug === offer.slug);
  const contactFormation = offer.slug === '/dirigeant' ? 'desp-initial'
    : offer.slug === '/vaedirigeant' ? 'desp-vae'
    : offer.slug.split('/').pop() || '';
  const quoteHref = `/contact?formation=${encodeURIComponent(contactFormation)}&objet=devis`;

  return (
    <article className={styles.priceCard} data-tone={offer.tone}>
      <div className={styles.cardTopline} aria-hidden="true" />
      <div className={styles.cardHeader}>
        <div>
          <p className={styles.cardCategory}>{offer.categoryLabel}</p>
          <h3>{offer.shortTitle}</h3>
        </div>
        <span className={styles.cardIndex}>{String(index + 1).padStart(2, '0')}</span>
      </div>

      <p className={styles.cardEyebrow}>{offer.eyebrow}</p>
      <p className={styles.cardFullTitle}>{offer.title}</p>
      <p className={styles.cardDescription}>{offer.short}</p>

      <div className={styles.cardFacts}>
        <div>
          <span className={styles.factIcon}><ClockIcon /></span>
          <p><small>Durée</small>{offer.duration}</p>
        </div>
        <div>
          <span className={styles.factIcon}><LocationIcon /></span>
          <p><small>Modalité & lieu</small>{offer.locations}</p>
        </div>
      </div>

      {offer.priceDetails && <ul className={styles.cardPriceDetails} aria-label="Prestations et options">
        {offer.priceDetails.map((detail) => <li key={detail}><CheckIcon />{detail}</li>)}
      </ul>}
      <a href="#solutions" className={styles.cardFunding}>
        <span><CheckIcon /></span>
        <p><strong>Financements possibles</strong>{offer.financing}</p>
      </a>

      <div className={styles.cardFooter}>
        <div className={styles.priceBlock}>
          <span>{price.amount === 'Sur devis' ? 'Tarif' : 'Tarif indicatif'}</span>
          <strong>{price.amount}</strong>
          <small>{offer.priceNote ?? price.note}</small>
        </div>
        <div className={styles.cardActions}>
          {simulation ? <a href="#simulateur" onClick={() => onSimulate(simulation.label)} className={styles.cardPrimaryAction}>
            Simuler mon financement <ArrowIcon />
          </a> : <Link href={quoteHref} className={styles.cardPrimaryAction}>Demander un devis <ArrowIcon /></Link>}
          {simulation && <Link href={quoteHref} className={styles.cardSecondaryAction}>Demander un devis</Link>}
          <Link href={offer.slug} className={styles.cardDetailsLink}>Voir la formation <ArrowIcon /></Link>
        </div>
      </div>
    </article>
  );
}

export default function TariffsPageContent({ offers }: { offers: PricingOffer[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [selectedFormation, setSelectedFormation] = useState('APS');

  const visibleOffers = useMemo(
    () => activeFilter === 'all' ? offers : offers.filter((offer) => offer.category === activeFilter),
    [activeFilter, offers],
  );

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.container}>
          <nav className={styles.breadcrumb} aria-label="Fil d’Ariane">
            <Link href="/">Accueil</Link>
            <span aria-hidden="true">/</span>
            <span>Tarifs et financements</span>
          </nav>

          <div className={styles.heroLayout}>
            <div className={styles.heroCopy}>
              <span className={styles.heroBadge}><i aria-hidden="true" /> Votre budget formation</span>
              <h1>Tarifs et <em>financements.</em></h1>
              <p>
                Comparez les tarifs de nos formations, découvrez les solutions adaptées à votre situation et estimez votre reste à charge, au même endroit.
              </p>
              <div className={styles.heroActions}>
                <a href="#catalogue" className={styles.primaryButton}>Comparer les tarifs <ArrowIcon /></a>
                <a href="#solutions" className={styles.secondaryButton}>Trouver un financement</a>
              </div>
            </div>

            <aside className={styles.heroPanel} aria-label="Repères tarifaires">
              <div className={styles.panelHeader}>
                <span>Votre projet</span>
                <span className={styles.liveBadge}><i aria-hidden="true" /> Étude personnalisée</span>
              </div>
              <div className={styles.panelMain}>
                <p>Un tarif lisible.<br />Plusieurs solutions possibles.</p>
                <div className={styles.panelProgress} aria-hidden="true">
                  <span /><span /><span />
                </div>
              </div>
              <div className={styles.panelStats}>
                <div><strong>{offers.length}</strong><span>parcours présentés</span></div>
                <div><strong>10×</strong><span>jusqu’à, selon dossier</span></div>
                <div><strong>5</strong><span>pistes de financement</span></div>
              </div>
              <p className={styles.panelNote}><CheckIcon /> Un conseiller confirme toujours le montant final avant votre inscription.</p>
            </aside>
          </div>
        </div>
      </section>

      <div className={styles.trustBar}>
        <div className={styles.container}>
          <span>Tarifs indicatifs</span>
          <span>Devis personnalisé</span>
          <span>Financements étudiés selon éligibilité</span>
          <span>Accompagnement administratif</span>
        </div>
      </div>

      <section id="catalogue" className={styles.catalogue}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionLabel}>01 / Les tarifs · hors BTS</span>
              <h2>Comparez les tarifs de nos formations.</h2>
            </div>
            <p>Filtrez par univers métier, puis comparez les informations essentielles avant d’ouvrir la fiche détaillée.</p>
          </div>

          <div className={styles.filterBar} aria-label="Filtrer les formations">
            <div className={styles.filterScroller}>
              {filters.map((filter) => {
                const count = filter.key === 'all'
                  ? offers.length
                  : offers.filter((offer) => offer.category === filter.key).length;
                return (
                  <button
                    key={filter.key}
                    type="button"
                    className={activeFilter === filter.key ? styles.filterActive : undefined}
                    aria-pressed={activeFilter === filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                  >
                    {filter.label}<span>{count}</span>
                  </button>
                );
              })}
            </div>
            <a href="#simulateur" className={styles.filterCta}>Calculer mon reste à charge <ArrowIcon /></a>
          </div>

          <p className={styles.resultsCount} aria-live="polite">
            {visibleOffers.length} {visibleOffers.length > 1 ? 'formations affichées' : 'formation affichée'}
          </p>

          <div className={styles.cardsGrid}>
            {visibleOffers.map((offer) => (
              <PriceCard key={offer.slug} offer={offer} index={offers.indexOf(offer)} onSimulate={setSelectedFormation} />
            ))}
          </div>
          <p className={styles.btsNote}>Vous recherchez un BTS ? <Link href="/bts">Découvrez nos parcours en alternance</Link> et <a href="#solutions">leurs possibilités de financement</a>.</p>
        </div>
      </section>

      <FundingSections simulator={
        <FinancingSimulator
          variant="editorial"
          selectedFormation={selectedFormation}
          onFormationChange={setSelectedFormation}
        />
      } />

    </div>
  );
}
