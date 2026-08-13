import Link from 'next/link';
import type { ReactNode } from 'react';
import { ContactForm } from '@/components/ContactForm';
import { contact } from '@/data/site';

export const metadata = {
  title: 'Contact & admissions',
  description: 'Échangez avec l’équipe Intégrale Academy pour choisir une formation, trouver une session, étudier votre financement ou construire une solution entreprise.',
};

const appointmentFormUrl = 'https://assistance-alw9.onrender.com/demande-informations-formations';
const email = 'ecole@integraleacademy.com';
const whatsappHref = 'https://wa.me/33744304527';
const whatsapp = '07 44 30 45 27';

type IconName = 'arrow' | 'building' | 'calendar' | 'chat' | 'check' | 'clock' | 'file' | 'location' | 'mail' | 'people' | 'phone' | 'shield' | 'sparkles' | 'target';

const projectLinks: Array<{ eyebrow: string; title: string; text: string; href: string; icon: IconName }> = [
  { eyebrow: 'Je cherche', title: 'Une formation', text: 'APS, A3P / APR, SSIAP, direction, VTC ou BTS.', href: '/formations-securite', icon: 'target' },
  { eyebrow: 'Je vérifie', title: 'Les prochaines dates', text: 'Trouvez rapidement la session et le lieu adaptés.', href: '/planning', icon: 'calendar' },
  { eyebrow: 'Je prépare', title: 'Mon financement', text: 'CPF, France Travail, entreprise ou financement personnel.', href: '/financements', icon: 'file' },
  { eyebrow: 'Je représente', title: 'Une entreprise', text: 'Recrutement, alternance, montée en compétences et conseil.', href: '/entreprises', icon: 'building' },
];

const process = [
  { number: '01', title: 'Nous écoutons votre projet', text: 'Votre objectif, votre expérience, vos contraintes et le métier visé.' },
  { number: '02', title: 'Nous clarifions les options', text: 'Formation, prérequis, calendrier, lieu et solution de financement.' },
  { number: '03', title: 'Vous repartez avec une suite claire', text: 'Les prochaines étapes et les pièces utiles pour faire avancer le dossier.' },
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
  if (name === 'calendar') return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></svg>;
  if (name === 'chat') return <svg {...common}><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" /><path d="M8 10h8M8 14h5" /></svg>;
  if (name === 'check') return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>;
  if (name === 'clock') return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
  if (name === 'file') return <svg {...common}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></svg>;
  if (name === 'location') return <svg {...common}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
  if (name === 'mail') return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
  if (name === 'people') return <svg {...common}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
  if (name === 'phone') return <svg {...common}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" /></svg>;
  if (name === 'shield') return <svg {...common}><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-5" /></svg>;
  if (name === 'target') return <svg {...common}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>;
  return <svg {...common}><path d="m12 3 1.4 4.1L18 8.5l-4.6 1.4L12 14l-1.4-4.1L6 8.5l4.6-1.4L12 3ZM5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15Z" /></svg>;
}

function SectionHeading({ eyebrow, title, children, light = false }: { eyebrow: string; title: ReactNode; children?: ReactNode; light?: boolean }) {
  return (
    <div className="max-w-4xl">
      <p className={`text-[10px] font-black uppercase tracking-[.22em] ${light ? 'text-academy-gold' : 'text-academy-gold-strong'}`}>{eyebrow}</p>
      <h2 className={`mt-4 text-3xl font-black tracking-[-.035em] sm:text-4xl lg:text-5xl ${light ? 'text-white' : 'text-academy-ink dark:text-white'}`}>{title}</h2>
      {children ? <div className={`mt-5 max-w-3xl text-base font-semibold leading-8 ${light ? 'text-white/62' : 'text-academy-muted'}`}>{children}</div> : null}
    </div>
  );
}

function ArrowLink({ href, children, light = false, external = false }: { href: string; children: ReactNode; light?: boolean; external?: boolean }) {
  const classes = `group inline-flex items-center gap-2 text-sm font-black transition ${light ? 'text-white' : 'text-academy-ink dark:text-white'}`;
  const content = <>{children}<span className="grid h-8 w-8 place-items-center rounded-full bg-academy-gold text-academy-gold-text transition group-hover:translate-x-1"><Icon name="arrow" className="h-4 w-4" /></span></>;
  return external ? <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>{content}</a> : <Link href={href} className={classes}>{content}</Link>;
}

export default function Page() {
  return (
    <div className="overflow-hidden">
      <section className="relative isolate overflow-hidden bg-[#101a29] px-4 py-14 text-white sm:py-20 lg:py-24">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_8%_10%,rgba(234,183,53,.20),transparent_30%),radial-gradient(circle_at_92%_82%,rgba(234,183,53,.11),transparent_28%),linear-gradient(135deg,#101a29_0%,#111d30_58%,#162339_100%)]" />
        <div className="absolute -left-44 top-0 -z-10 h-[32rem] w-[32rem] rounded-full border border-academy-gold/15 bg-academy-gold/[.035]" />
        <div className="absolute -right-52 -top-44 -z-10 h-[38rem] w-[38rem] rounded-full bg-academy-gold/[.065]" />

        <div className="page-container grid gap-10 lg:grid-cols-[1.06fr_.94fr] lg:items-center">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-academy-gold/35 bg-academy-gold/10 px-4 py-2 text-[10px] font-black uppercase tracking-[.2em] text-academy-gold">
              <Icon name="chat" className="h-4 w-4" />
              Contact & admissions
            </span>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-[-.045em] sm:text-5xl lg:text-[4.35rem] lg:leading-[1.02]">
              Votre projet mérite <span className="text-academy-gold">une réponse claire.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/68 sm:text-lg">
              Formation, calendrier, financement ou besoin en recrutement : expliquez-nous où vous en êtes. Notre équipe vous aide à identifier la bonne prochaine étape.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#demande" className="inline-flex items-center justify-center gap-2 rounded-full bg-academy-gold px-6 py-4 text-sm font-black text-academy-gold-text transition hover:-translate-y-0.5">
                Décrire mon projet
                <Icon name="arrow" className="h-4 w-4" />
              </a>
              <a href="tel:0422470768" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10">
                <Icon name="phone" className="h-4 w-4 text-academy-gold" />
                {contact.phone}
              </a>
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs font-bold text-white/50">
              <Icon name="clock" className="h-4 w-4 text-academy-gold" />
              Lun–ven 08h00–19h00 · Sam 08h00–12h00
            </p>
          </div>

          <div className="reveal relative rounded-[2.1rem] border border-white/14 bg-white/[.06] p-5 shadow-[0_35px_110px_rgba(0,0,0,.30)] backdrop-blur-xl sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.18em] text-academy-gold">Votre premier échange</p>
                <p className="mt-2 text-lg font-black">Utile dès le premier contact.</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-[10px] font-black text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,.8)]" />
                Équipe disponible
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {[
                ['01', 'La bonne formation', 'Métier visé, niveau, prérequis et modalités.'],
                ['02', 'Le bon calendrier', 'Session, implantation et rythme adaptés.'],
                ['03', 'Le bon financement', 'Solutions possibles selon votre situation.'],
              ].map(([number, title, text]) => (
                <div key={number} className="grid grid-cols-[2.6rem_1fr] gap-3 rounded-[1.25rem] border border-white/10 bg-white/[.055] p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-academy-gold text-xs font-black text-academy-gold-text">{number}</span>
                  <div>
                    <p className="text-sm font-black">{title}</p>
                    <p className="mt-1 text-xs font-semibold leading-5 text-white/45">{text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-academy-gold text-xs font-black text-academy-gold-text">CM</span>
                <div>
                  <p className="text-sm font-black">Cassandre & l’équipe admissions</p>
                  <p className="mt-1 text-[10px] font-bold text-white/45">Orientation · admission · financement</p>
                </div>
              </div>
              <div className="flex gap-2">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Écrire sur WhatsApp" className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[.055] text-white transition hover:border-academy-gold hover:text-academy-gold"><Icon name="chat" className="h-4 w-4" /></a>
                <a href={`mailto:${email}?subject=Contact%20site%20internet`} aria-label="Écrire par e-mail" className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[.055] text-white transition hover:border-academy-gold hover:text-academy-gold"><Icon name="mail" className="h-4 w-4" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="page-container mt-12 grid grid-cols-2 gap-5 border-t border-white/10 pt-7 lg:grid-cols-4">
          {[
            ['Depuis 2018', 'une expérience construite dans la durée'],
            ['3 implantations', 'Côte d’Azur, Paris et Centre France'],
            ['Équipe dédiée', 'un interlocuteur identifié pour votre projet'],
            ['Qualiopi', 'une organisation certifiée et encadrée'],
          ].map(([value, label]) => (
            <div key={value}>
              <p className="text-lg font-black text-white sm:text-xl">{value}</p>
              <p className="mt-2 max-w-[15rem] text-[10px] font-bold leading-5 text-white/44">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-container py-14 sm:py-16">
        <SectionHeading eyebrow="Accès rapide" title={<>Trouvez votre réponse <span className="text-academy-gold-strong">sans perdre de temps.</span></>}>
          Vous savez déjà ce que vous cherchez ? Accédez directement à la page qui peut faire avancer votre projet.
        </SectionHeading>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projectLinks.map((item, index) => (
            <Link key={item.title} href={item.href} className="group flex min-h-[18rem] flex-col rounded-[1.7rem] border border-academy-line/70 bg-academy-surface p-5 shadow-[0_16px_50px_rgba(54,40,20,.07)] transition hover:-translate-y-1 hover:border-academy-gold sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#101a29] text-academy-gold"><Icon name={item.icon} className="h-5 w-5" /></span>
                <span className="text-[10px] font-black text-academy-muted/45">0{index + 1}</span>
              </div>
              <p className="mt-7 text-[10px] font-black uppercase tracking-[.16em] text-academy-gold-strong">{item.eyebrow}</p>
              <h3 className="mt-2 text-xl font-black tracking-tight text-academy-ink dark:text-white">{item.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-academy-muted">{item.text}</p>
              <span className="mt-auto flex items-center gap-2 pt-6 text-xs font-black text-academy-ink dark:text-white">Accéder <span className="grid h-7 w-7 place-items-center rounded-full bg-academy-gold text-academy-gold-text transition group-hover:translate-x-1"><Icon name="arrow" className="h-3.5 w-3.5" /></span></span>
            </Link>
          ))}
        </div>
      </section>

      <section id="demande" className="bg-academy-surface px-4 py-16 sm:py-20">
        <div className="page-container grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-8">
            <SectionHeading eyebrow="Demande d’informations" title={<>Une demande. <span className="text-academy-gold-strong">Un interlocuteur.</span></>}>
              Pas de réponse générique : votre situation est relue pour vous orienter vers une formation, une session et une solution cohérentes.
            </SectionHeading>

            <div className="mt-8 space-y-3">
              {process.map((step) => (
                <div key={step.number} className="grid grid-cols-[2.6rem_1fr] gap-4 rounded-[1.35rem] border border-academy-line/60 bg-academy-bg/70 p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#101a29] text-[10px] font-black text-academy-gold">{step.number}</span>
                  <div>
                    <h3 className="text-sm font-black text-academy-ink dark:text-white">{step.title}</h3>
                    <p className="mt-1 text-xs font-semibold leading-5 text-academy-muted">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-[1.6rem] bg-[#101a29] p-5 text-white shadow-[0_20px_60px_rgba(16,26,41,.16)]">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-academy-gold text-academy-gold-text"><Icon name="phone" className="h-5 w-5" /></span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[.15em] text-academy-gold">Vous préférez parler ?</p>
                  <a href="tel:0422470768" className="mt-1 block text-lg font-black hover:text-academy-gold">{contact.phone}</a>
                </div>
              </div>
              <p className="mt-4 border-t border-white/10 pt-4 text-xs font-semibold leading-5 text-white/50">Du lundi au vendredi de 08h00 à 19h00 et le samedi de 08h00 à 12h00.</p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="page-container py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[.74fr_1.26fr] lg:items-end">
          <SectionHeading eyebrow="Tous les canaux" title={<>À vous de choisir <span className="text-academy-gold-strong">comment échanger.</span></>}>
            Une question rapide, un rendez-vous à préparer ou des documents à transmettre : utilisez le canal le plus simple pour vous.
          </SectionHeading>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: 'Téléphone', value: contact.phone, href: 'tel:0422470768', icon: 'phone' as IconName, external: false },
              { label: 'WhatsApp', value: whatsapp, href: whatsappHref, icon: 'chat' as IconName, external: true },
              { label: 'E-mail', value: email, href: `mailto:${email}?subject=Contact%20site%20internet`, icon: 'mail' as IconName, external: false },
              { label: 'Rendez-vous', value: 'Préparer mon échange', href: appointmentFormUrl, icon: 'calendar' as IconName, external: true },
            ].map((channel) => (
              <a key={channel.label} href={channel.href} target={channel.external ? '_blank' : undefined} rel={channel.external ? 'noopener noreferrer' : undefined} className="group flex items-center gap-4 rounded-[1.35rem] border border-academy-line/70 bg-academy-surface p-4 transition hover:-translate-y-0.5 hover:border-academy-gold hover:shadow-soft">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#101a29] text-academy-gold"><Icon name={channel.icon} className="h-5 w-5" /></span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-black uppercase tracking-[.13em] text-academy-gold-strong">{channel.label}</span>
                  <span className="mt-1 block truncate text-sm font-black text-academy-ink dark:text-white">{channel.value}</span>
                </span>
                <span className="ml-auto text-academy-muted transition group-hover:translate-x-1 group-hover:text-academy-gold-strong"><Icon name="arrow" className="h-4 w-4" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#101a29] px-4 py-16 text-white sm:py-20">
        <div className="page-container">
          <SectionHeading eyebrow="Venir nous rencontrer" title={<>Trois implantations. <span className="text-academy-gold">Une même exigence.</span></>} light>
            Notre campus principal se situe à Puget-sur-Argens. Paris et Aurillac sont mobilisés selon les parcours et les sessions programmées.
          </SectionHeading>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.12fr_.88fr]">
            <article className="relative min-h-[31rem] overflow-hidden rounded-[2rem] border border-academy-gold/20 bg-[radial-gradient(circle_at_90%_10%,rgba(234,183,53,.22),transparent_28%),linear-gradient(145deg,#1a2739,#0b1421)] p-6 shadow-[0_30px_90px_rgba(0,0,0,.24)] sm:p-8">
              <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full border border-academy-gold/15 bg-academy-gold/[.055]" />
              <div className="relative flex h-full flex-col">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-academy-gold text-academy-gold-text"><Icon name="location" className="h-6 w-6" /></span>
                <p className="mt-8 text-[10px] font-black uppercase tracking-[.18em] text-academy-gold">Campus principal · Côte d’Azur</p>
                <h3 className="mt-3 max-w-xl text-3xl font-black tracking-tight sm:text-4xl">Puget-sur-Argens</h3>
                <p className="mt-4 max-w-xl text-sm font-semibold leading-7 text-white/62">{contact.locations[0].address}</p>
                <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-white/48">{contact.locations[0].detail}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-8">
                  {['400 m² dédiés', 'À 500 m de l’A8', 'Parking gratuit', 'Bus ligne 4'].map((tag) => <span key={tag} className="rounded-full border border-white/12 bg-white/[.055] px-3 py-2 text-[10px] font-black text-white/65">{tag}</span>)}
                </div>
                <div className="mt-7"><ArrowLink href="https://www.google.com/maps/search/?api=1&query=54%20chemin%20du%20Carreou%2083480%20Puget-sur-Argens" light external>Ouvrir l’itinéraire</ArrowLink></div>
              </div>
            </article>

            <div className="grid gap-5">
              {contact.locations.slice(1).map((location, index) => {
                const query = index === 0 ? '142%20rue%20de%20Rivoli%2075001%20Paris' : '14%20avenue%20du%20Garric%2015000%20Aurillac';
                return (
                  <article key={location.name} className="flex flex-col rounded-[2rem] border border-white/10 bg-white/[.055] p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl border border-academy-gold/20 bg-academy-gold/10 text-academy-gold"><Icon name="building" className="h-5 w-5" /></span>
                      <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-[9px] font-black uppercase tracking-[.12em] text-white/45">Selon sessions</span>
                    </div>
                    <h3 className="mt-6 text-2xl font-black tracking-tight">{location.name}</h3>
                    <p className="mt-3 text-sm font-semibold leading-6 text-white/62">{location.address}</p>
                    <p className="mt-3 text-xs font-semibold leading-6 text-white/42">{location.detail}</p>
                    <div className="mt-6"><ArrowLink href={`https://www.google.com/maps/search/?api=1&query=${query}`} light external>Voir sur la carte</ArrowLink></div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="page-container py-14 sm:py-16">
        <div className="grid gap-6 rounded-[2rem] border border-academy-line/70 bg-academy-surface p-6 shadow-[0_22px_70px_rgba(54,40,20,.08)] sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-academy-gold text-academy-gold-text"><Icon name="shield" className="h-6 w-6" /></span>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.16em] text-academy-gold-strong">Un échange sans engagement</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-academy-ink dark:text-white">Vous n’avez pas besoin d’avoir déjà toutes les réponses.</h2>
              <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-academy-muted">Notre rôle est justement de clarifier le parcours avec vous, sans vous pousser vers une solution qui ne correspond pas à votre situation.</p>
            </div>
          </div>
          <a href="#demande" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#101a29] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:shadow-soft">Parler de mon projet <Icon name="arrow" className="h-4 w-4 text-academy-gold" /></a>
        </div>
      </section>
    </div>
  );
}
