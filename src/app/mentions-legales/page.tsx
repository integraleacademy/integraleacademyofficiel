import Link from 'next/link';
import type { ReactNode } from 'react';
import { contact, legalRefs } from '@/data/site';

export const metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales d’Intégrale Academy : éditeur, identification de la société, publication, hébergement, propriété intellectuelle et données personnelles.',
};

const email = 'ecole@integraleacademy.com';
const companyRegisterUrl = 'https://annuaire-entreprises.data.gouv.fr/entreprise/840899884';
const renderTermsUrl = 'https://render.com/terms';
const cnilComplaintUrl = 'https://www.cnil.fr/fr/adresser-une-plainte';

type IconName = 'arrow' | 'building' | 'check' | 'database' | 'document' | 'external' | 'globe' | 'mail' | 'phone' | 'scale' | 'shield' | 'user';

const summaryLinks: Array<{ number: string; label: string; href: string }> = [
  { number: '01', label: 'Éditeur du site', href: '#editeur' },
  { number: '02', label: 'Publication', href: '#publication' },
  { number: '03', label: 'Hébergement', href: '#hebergement' },
  { number: '04', label: 'Organisme de formation', href: '#organisme' },
  { number: '05', label: 'Propriété intellectuelle', href: '#propriete' },
  { number: '06', label: 'Responsabilité & liens', href: '#responsabilite' },
  { number: '07', label: 'Données personnelles', href: '#donnees' },
  { number: '08', label: 'Droit applicable & contact', href: '#droit' },
];

const companyDetails = [
  ['Dénomination', 'INTEGRALE SECURITE FORMATIONS'],
  ['Enseigne', 'INTEGRALE ACADEMY'],
  ['Forme juridique', 'SAS — Société par actions simplifiée'],
  ['Capital social', '4 500 €'],
  ['SIREN', '840 899 884'],
  ['SIRET du siège', '840 899 884 00026'],
  ['Code APE', '85.59A — Formation continue d’adultes'],
  ['Immatriculation', 'Registre national des entreprises depuis le 05/07/2018'],
];

function Icon({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) {
  const common = {
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.8,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
  };

  if (name === 'arrow') return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
  if (name === 'building') return <svg {...common}><path d="M4 21V5l8-3 8 3v16M8 8h1M8 12h1M8 16h1M15 8h1M15 12h1M15 16h1M10 21v-3h4v3" /></svg>;
  if (name === 'check') return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>;
  if (name === 'database') return <svg {...common}><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></svg>;
  if (name === 'document') return <svg {...common}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></svg>;
  if (name === 'external') return <svg {...common}><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>;
  if (name === 'globe') return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
  if (name === 'mail') return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
  if (name === 'phone') return <svg {...common}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" /></svg>;
  if (name === 'scale') return <svg {...common}><path d="M12 3v18M5 6h14M5 6 2 13h6L5 6ZM19 6l-3 7h6l-3-7ZM7 21h10" /><path d="M2 13c0 2 6 2 6 0M16 13c0 2 6 2 6 0" /></svg>;
  if (name === 'shield') return <svg {...common}><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-5" /></svg>;
  return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>;
}

function LegalSection({ id, number, icon, eyebrow, title, children }: { id: string; number: string; icon: IconName; eyebrow: string; title: ReactNode; children: ReactNode }) {
  return (
    <article id={id} className="scroll-mt-28 rounded-[1.8rem] border border-academy-line/70 bg-academy-surface p-5 shadow-[0_18px_58px_rgba(54,40,20,.07)] sm:p-7 lg:p-8">
      <div className="flex items-start gap-4 border-b border-academy-line/65 pb-5">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#101a29] text-academy-gold"><Icon name={icon} className="h-5 w-5" /></span>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[.17em] text-academy-gold-strong">{number} · {eyebrow}</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-.025em] text-academy-ink dark:text-white sm:text-3xl">{title}</h2>
        </div>
      </div>
      <div className="mt-6 text-sm font-semibold leading-7 text-academy-muted sm:text-base sm:leading-8">{children}</div>
    </article>
  );
}

function ExternalLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={`group inline-flex items-center gap-2 font-black transition ${light ? 'text-white hover:text-academy-gold' : 'text-academy-ink hover:text-academy-gold-strong dark:text-white'}`}>{children}<Icon name="external" className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>;
}

export default function Page() {
  return (
    <div className="overflow-hidden">
      <section className="relative isolate overflow-hidden bg-[#101a29] px-4 py-14 text-white sm:py-20 lg:py-24">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_8%_12%,rgba(234,183,53,.20),transparent_30%),radial-gradient(circle_at_92%_84%,rgba(234,183,53,.10),transparent_28%),linear-gradient(135deg,#101a29_0%,#111d30_58%,#162339_100%)]" />
        <div className="absolute -left-40 top-0 -z-10 h-[30rem] w-[30rem] rounded-full border border-academy-gold/15 bg-academy-gold/[.035]" />
        <div className="absolute -right-48 -top-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-academy-gold/[.065]" />

        <div className="page-container grid gap-10 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-academy-gold/35 bg-academy-gold/10 px-4 py-2 text-[10px] font-black uppercase tracking-[.2em] text-academy-gold">
              <Icon name="scale" className="h-4 w-4" />
              Cadre légal · mise à jour 13 août 2026
            </span>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-[-.045em] sm:text-5xl lg:text-[4.3rem] lg:leading-[1.02]">
              Mentions légales, <span className="text-academy-gold">en toute transparence.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/68 sm:text-lg">
              Identité de l’éditeur, publication, hébergement et règles d’utilisation : les informations essentielles du site Intégrale Academy sont réunies ici, dans un format clair et vérifiable.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#editeur" className="inline-flex items-center justify-center gap-2 rounded-full bg-academy-gold px-6 py-4 text-sm font-black text-academy-gold-text transition hover:-translate-y-0.5">
                Consulter les informations
                <Icon name="arrow" className="h-4 w-4" />
              </a>
              <Link href="/politique-confidentialite" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10">
                <Icon name="shield" className="h-4 w-4 text-academy-gold" />
                Confidentialité
              </Link>
            </div>
          </div>

          <div className="reveal relative rounded-[2.1rem] border border-white/14 bg-white/[.06] p-5 shadow-[0_35px_110px_rgba(0,0,0,.30)] backdrop-blur-xl sm:p-7">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.18em] text-academy-gold">Éditeur du site</p>
                <h2 className="mt-3 text-2xl font-black tracking-tight">INTEGRALE SECURITE FORMATIONS</h2>
                <p className="mt-2 text-xs font-bold text-white/45">Enseigne · Intégrale Academy</p>
              </div>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-academy-gold text-academy-gold-text"><Icon name="building" className="h-6 w-6" /></span>
            </div>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ['Forme', 'SAS'],
                ['Capital', '4 500 €'],
                ['SIREN', '840 899 884'],
                ['SIRET siège', '840 899 884 00026'],
              ].map(([term, value]) => (
                <div key={term} className="rounded-[1.2rem] border border-white/10 bg-white/[.055] p-4">
                  <dt className="text-[9px] font-black uppercase tracking-[.15em] text-academy-gold">{term}</dt>
                  <dd className="mt-2 text-sm font-black text-white">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex items-start gap-3 border-t border-white/10 pt-5">
              <Icon name="building" className="mt-0.5 h-4 w-4 shrink-0 text-academy-gold" />
              <p className="text-xs font-semibold leading-6 text-white/52">54 chemin du Carreou, 83480 Puget-sur-Argens · France</p>
            </div>
            <div className="mt-5"><ExternalLink href={companyRegisterUrl} light>Vérifier sur l’Annuaire des Entreprises</ExternalLink></div>
          </div>
        </div>

        <div className="page-container mt-12 grid grid-cols-2 gap-5 border-t border-white/10 pt-7 lg:grid-cols-4">
          {[
            ['29 juin 2018', 'date de création de la société'],
            ['85.59A', 'formation continue d’adultes'],
            ['Clément VAILLANT', 'directeur de la publication'],
            ['France', 'droit applicable au site'],
          ].map(([value, label]) => (
            <div key={value}>
              <p className="text-base font-black text-white sm:text-lg">{value}</p>
              <p className="mt-2 max-w-[15rem] text-[10px] font-bold leading-5 text-white/44">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-container py-14 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[.32fr_.68fr] lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <nav aria-label="Sommaire des mentions légales" className="rounded-[1.7rem] border border-academy-line/70 bg-academy-surface p-4 shadow-[0_18px_55px_rgba(54,40,20,.07)] sm:p-5">
              <p className="px-2 text-[10px] font-black uppercase tracking-[.18em] text-academy-gold-strong">Sommaire</p>
              <div className="mt-4 grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
                {summaryLinks.map((item) => (
                  <a key={item.href} href={item.href} className="group flex min-h-11 items-center gap-3 rounded-xl px-2 py-2 text-xs font-black text-academy-muted transition hover:bg-academy-bg hover:text-academy-ink dark:hover:text-white">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-academy-bg text-[9px] text-academy-gold-strong transition group-hover:bg-academy-gold group-hover:text-academy-gold-text">{item.number}</span>
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>

            <div className="mt-4 rounded-[1.7rem] bg-[#101a29] p-5 text-white shadow-[0_20px_60px_rgba(16,26,41,.16)]">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-academy-gold text-academy-gold-text"><Icon name="mail" className="h-5 w-5" /></span>
              <p className="mt-5 text-[10px] font-black uppercase tracking-[.15em] text-academy-gold">Une question juridique ?</p>
              <a href={`mailto:${email}`} className="mt-2 block break-all text-sm font-black hover:text-academy-gold">{email}</a>
              <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-xs font-black text-white">Nous contacter <Icon name="arrow" className="h-4 w-4 text-academy-gold" /></Link>
            </div>
          </aside>

          <div className="space-y-5">
            <div className="flex items-start gap-4 rounded-[1.5rem] border border-academy-gold/30 bg-academy-gold-soft/35 p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-academy-gold text-academy-gold-text"><Icon name="check" className="h-5 w-5" /></span>
              <div>
                <p className="text-sm font-black text-academy-ink dark:text-white">Une lecture structurée, des informations vérifiables.</p>
                <p className="mt-1 text-xs font-semibold leading-6 text-academy-muted">Les éléments d’identification sont présentés séparément afin d’éviter toute confusion entre SIREN, SIRET, activité, publication et hébergement.</p>
              </div>
            </div>

            <LegalSection id="editeur" number="01" icon="building" eyebrow="Éditeur" title="Identification de la société">
              <p>Le présent site est édité par <strong className="text-academy-ink dark:text-white">INTEGRALE SECURITE FORMATIONS</strong>, exerçant sous l’enseigne <strong className="text-academy-ink dark:text-white">INTEGRALE ACADEMY</strong>.</p>
              <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {companyDetails.map(([term, value]) => (
                  <div key={term} className="border-b border-academy-line/60 pb-4">
                    <dt className="text-[10px] font-black uppercase tracking-[.14em] text-academy-gold-strong">{term}</dt>
                    <dd className="mt-2 font-bold text-academy-ink dark:text-white">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 rounded-[1.25rem] bg-academy-bg/75 p-4">
                <p><strong className="text-academy-ink dark:text-white">Siège social :</strong> 54 chemin du Carreou, 83480 Puget-sur-Argens, France.</p>
                <p className="mt-2"><strong className="text-academy-ink dark:text-white">Téléphone :</strong> <a href="tel:0422470768" className="font-black text-academy-gold-strong hover:underline">{contact.phone}</a></p>
                <p className="mt-2"><strong className="text-academy-ink dark:text-white">E-mail :</strong> <a href={`mailto:${email}`} className="font-black text-academy-gold-strong hover:underline">{email}</a></p>
              </div>
              <div className="mt-6"><ExternalLink href={companyRegisterUrl}>Consulter la fiche officielle de l’entreprise</ExternalLink></div>
            </LegalSection>

            <LegalSection id="publication" number="02" icon="user" eyebrow="Publication" title="Direction et conception du site">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.25rem] bg-academy-bg/75 p-5">
                  <p className="text-[10px] font-black uppercase tracking-[.14em] text-academy-gold-strong">Directeur de la publication</p>
                  <p className="mt-3 text-lg font-black text-academy-ink dark:text-white">Clément VAILLANT</p>
                </div>
                <div className="rounded-[1.25rem] bg-academy-bg/75 p-5">
                  <p className="text-[10px] font-black uppercase tracking-[.14em] text-academy-gold-strong">Conception du site</p>
                  <p className="mt-3 text-lg font-black text-academy-ink dark:text-white">SAS Intégrale Group</p>
                  <p className="mt-1 text-xs font-semibold text-academy-muted">Direction du projet · Clément Vaillant</p>
                </div>
              </div>
              <p className="mt-5">Le directeur de la publication est responsable du contenu éditorial mis à disposition sur le site.</p>
            </LegalSection>

            <LegalSection id="hebergement" number="03" icon="globe" eyebrow="Hébergement" title="Prestataire technique actuel">
              <p>L’application web accessible sur le domaine <strong className="text-academy-ink dark:text-white">integraleacademyofficiel-1.onrender.com</strong> est hébergée par :</p>
              <div className="mt-5 rounded-[1.35rem] bg-[#101a29] p-5 text-white sm:p-6">
                <p className="text-[10px] font-black uppercase tracking-[.15em] text-academy-gold">Render Services, Inc.</p>
                <p className="mt-3 text-lg font-black">525 Brannan Street, Suite 300<br />San Francisco, CA 94107 · États-Unis</p>
                <p className="mt-3 text-sm font-semibold text-white/55">Téléphone : +1 415 319 8186</p>
                <div className="mt-5"><ExternalLink href={renderTermsUrl} light>Consulter les informations légales de Render</ExternalLink></div>
              </div>
              <p className="mt-5 text-xs leading-6">Les références à d’anciens prestataires techniques ne décrivent pas l’hébergement de la version actuellement publiée sur Render.</p>
            </LegalSection>

            <LegalSection id="organisme" number="04" icon="document" eyebrow="Activité réglementée" title="Organisme de formation et références">
              <p>Intégrale Academy exerce une activité de formation professionnelle. Les principales références administratives et professionnelles publiées par l’organisme sont les suivantes :</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {legalRefs.map((reference) => (
                  <div key={reference} className="flex items-start gap-3 rounded-[1.15rem] border border-academy-line/60 bg-academy-bg/60 p-4">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-academy-gold text-academy-gold-text"><Icon name="check" className="h-3.5 w-3.5" /></span>
                    <p className="text-xs font-black leading-5 text-academy-ink dark:text-white">{reference}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 rounded-[1.25rem] border border-academy-gold/25 bg-academy-gold-soft/35 p-4 text-xs font-bold leading-6 text-academy-ink dark:text-white"><strong>Déclaration d’activité :</strong> cet enregistrement ne vaut pas agrément de l’État.</p>
              <div className="mt-6"><Link href="/ecole#agrements" className="group inline-flex items-center gap-2 font-black text-academy-ink hover:text-academy-gold-strong dark:text-white">Découvrir l’école et ses références <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></Link></div>
            </LegalSection>

            <LegalSection id="propriete" number="05" icon="document" eyebrow="Contenus" title="Propriété intellectuelle">
              <p>L’ensemble du site — notamment sa structure, ses textes, éléments graphiques, logos, marques, visuels, vidéos, documents téléchargeables et bases de données — est protégé par les dispositions françaises et internationales relatives à la propriété intellectuelle.</p>
              <p className="mt-4">Sauf autorisation écrite préalable d’Intégrale Academy ou exception prévue par la loi, toute reproduction, représentation, adaptation, extraction ou exploitation, totale ou partielle, est interdite.</p>
              <p className="mt-4">Les marques, noms commerciaux et logos de tiers éventuellement cités demeurent la propriété de leurs titulaires respectifs.</p>
            </LegalSection>

            <LegalSection id="responsabilite" number="06" icon="shield" eyebrow="Utilisation" title="Responsabilité et liens hypertextes">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.25rem] bg-academy-bg/70 p-5">
                  <h3 className="font-black text-academy-ink dark:text-white">Informations publiées</h3>
                  <p className="mt-3 text-sm leading-7">Intégrale Academy s’efforce de proposer des informations exactes et actualisées. Les programmes, tarifs, dates, modalités, financements et références peuvent toutefois évoluer. Les informations contractuelles communiquées lors de l’inscription prévalent.</p>
                </div>
                <div className="rounded-[1.25rem] bg-academy-bg/70 p-5">
                  <h3 className="font-black text-academy-ink dark:text-white">Sites externes</h3>
                  <p className="mt-3 text-sm leading-7">Les liens vers des sites tiers sont proposés à titre informatif. Intégrale Academy n’exerce pas de contrôle sur leur contenu, leur disponibilité ni leurs pratiques et ne peut en assumer la responsabilité.</p>
                </div>
              </div>
              <p className="mt-5">L’utilisateur reste responsable de son équipement, de sa connexion et de l’usage qu’il fait des informations accessibles sur le site.</p>
            </LegalSection>

            <LegalSection id="donnees" number="07" icon="database" eyebrow="Vie privée" title="Données personnelles">
              <p>Le responsable des traitements réalisés au moyen du site est <strong className="text-academy-ink dark:text-white">INTEGRALE SECURITE FORMATIONS</strong>. Les données transmises via les formulaires sont utilisées pour répondre aux demandes, accompagner les projets de formation et assurer le suivi administratif nécessaire.</p>
              <p className="mt-4">Conformément à la réglementation applicable, vous pouvez demander l’accès, la rectification, l’effacement, la limitation ou, lorsque les conditions sont réunies, la portabilité de vos données et vous opposer à certains traitements.</p>
              <div className="mt-5 flex flex-col gap-3 rounded-[1.25rem] bg-academy-bg/70 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[.14em] text-academy-gold-strong">Exercer vos droits</p>
                  <a href={`mailto:${email}`} className="mt-2 block font-black text-academy-ink hover:text-academy-gold-strong dark:text-white">{email}</a>
                </div>
                <Link href="/politique-confidentialite" className="inline-flex items-center gap-2 font-black text-academy-ink hover:text-academy-gold-strong dark:text-white">Politique de confidentialité <Icon name="arrow" className="h-4 w-4" /></Link>
              </div>
              <p className="mt-5">Vous disposez également du droit d’adresser une réclamation à la Commission nationale de l’informatique et des libertés.</p>
              <div className="mt-4"><ExternalLink href={cnilComplaintUrl}>Saisir la CNIL</ExternalLink></div>
            </LegalSection>

            <LegalSection id="droit" number="08" icon="scale" eyebrow="Cadre juridique" title="Droit applicable et contact">
              <p>Le présent site et ses mentions légales sont soumis au droit français. En cas de différend, les parties sont invitées à rechercher en priorité une solution amiable avant de saisir les juridictions compétentes selon les règles applicables.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <a href="tel:0422470768" className="group rounded-[1.15rem] border border-academy-line/60 bg-academy-bg/60 p-4 transition hover:border-academy-gold">
                  <Icon name="phone" className="h-5 w-5 text-academy-gold-strong" />
                  <span className="mt-3 block text-[9px] font-black uppercase tracking-[.14em] text-academy-muted">Téléphone</span>
                  <span className="mt-1 block text-xs font-black text-academy-ink dark:text-white">{contact.phone}</span>
                </a>
                <a href={`mailto:${email}`} className="group rounded-[1.15rem] border border-academy-line/60 bg-academy-bg/60 p-4 transition hover:border-academy-gold">
                  <Icon name="mail" className="h-5 w-5 text-academy-gold-strong" />
                  <span className="mt-3 block text-[9px] font-black uppercase tracking-[.14em] text-academy-muted">E-mail</span>
                  <span className="mt-1 block break-all text-xs font-black text-academy-ink dark:text-white">{email}</span>
                </a>
                <Link href="/contact" className="group rounded-[1.15rem] border border-academy-line/60 bg-academy-bg/60 p-4 transition hover:border-academy-gold">
                  <Icon name="arrow" className="h-5 w-5 text-academy-gold-strong" />
                  <span className="mt-3 block text-[9px] font-black uppercase tracking-[.14em] text-academy-muted">Formulaire</span>
                  <span className="mt-1 block text-xs font-black text-academy-ink dark:text-white">Nous contacter</span>
                </Link>
              </div>
            </LegalSection>

            <div className="rounded-[1.6rem] bg-[#101a29] p-5 text-white sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-academy-gold text-academy-gold-text"><Icon name="document" className="h-5 w-5" /></span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[.15em] text-academy-gold">Version publiée</p>
                  <p className="mt-1 text-sm font-black">Dernière mise à jour : 13 août 2026</p>
                </div>
              </div>
              <a href="#" className="mt-5 inline-flex items-center gap-2 text-xs font-black text-white sm:mt-0">Retour en haut <Icon name="arrow" className="h-4 w-4 -rotate-90 text-academy-gold" /></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
