import Link from 'next/link';
import { contact, legalRefs } from '@/data/site';
import { ThemeToggle } from '@/components/ThemeToggle';
import { MobileHeaderMenu } from '@/components/MobileHeaderMenu';

export const chatGptAgentUrl = 'https://chatgpt.com/g/g-69cb47858f948191b7daabca5892786d-infos-formations-integrale-academy';

const aiChatConversation = {
  intro: 'Bonjour, je peux vous aider à choisir votre formation.',
  user: 'Je veux devenir agent de sécurité.',
  answer: 'Je vous guide sur les prérequis, le CNAPS et les prochaines sessions.',
};

function AIChatPreview(){
  const bubbleBase = 'max-w-[88%] rounded-2xl p-4 text-sm leading-6 shadow-sm sm:text-[0.95rem]';

  return <div className="rounded-[1.25rem] bg-academy-surface p-4 text-academy-gold-text shadow-gold sm:p-5">
    <div className="flex items-center gap-3 border-b border-academy-line pb-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-academy-ink text-xl text-academy-gold" aria-hidden="true">✦</span>
      <div>
        <p className="text-sm font-black">Assistant Intégrale Academy</p>
        <p className="text-xs text-academy-muted">Réponse rapide · orientation formation</p>
      </div>
    </div>
    <div className="ai-chat-preview mt-5 min-h-[19rem] pb-4 sm:min-h-[17rem]" aria-label="Aperçu animé d’une conversation avec l’assistant IA">
      <div className="ai-chat-sequence space-y-3 pb-4">
        <div className={`${bubbleBase} ai-chat-message ai-chat-delay-1 bg-academy-bg text-academy-muted`}>{aiChatConversation.intro}</div>
        <div className={`${bubbleBase} ai-chat-message ai-chat-delay-2 ml-auto bg-academy-ink font-semibold text-white`}>{aiChatConversation.user}</div>
        <div className={`${bubbleBase} ai-chat-message ai-chat-delay-3 bg-academy-gold/25 text-stone-800`}>{aiChatConversation.answer}</div>
      </div>
    </div>
  </div>
}


export function FullWidthBand({eyebrow,title,children,actions,tone='dark'}:{eyebrow?:string;title:React.ReactNode;children:React.ReactNode;actions?:React.ReactNode;tone?:'dark'|'gold'|'light'}){
  const isGold=tone==='gold';
  const isLight=tone==='light';
  const shell=isGold?'bg-gradient-to-r from-academy-gold-soft via-academy-gold to-academy-gold-soft text-academy-gold-text':isLight?'bg-academy-surface text-academy-ink':'bg-academy-elevated text-academy-ink';
  const muted=isGold?'text-academy-gold-text/85':'text-academy-muted';
  const border='border-y border-academy-line';
  return <section className={`relative isolate overflow-hidden px-4 py-12 md:py-16 ${shell} ${border}`}>
    <div className="absolute inset-0 -z-10 opacity-70"><div className="absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-academy-surface/20 blur-3xl"/><div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-academy-gold/30 blur-3xl"/><div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"/></div>
    <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_auto] md:items-center"><div className="max-w-3xl">{eyebrow&&<p className={`text-xs font-black uppercase tracking-[.22em] ${isGold?'text-academy-muted':isLight?'text-academy-gold-strong':'text-academy-gold'}`}>{eyebrow}</p>}<h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">{title}</h2><div className={`mt-4 text-base leading-8 md:text-lg ${muted}`}>{children}</div></div>{actions&&<div className="flex flex-wrap gap-3 md:justify-end">{actions}</div>}</div>
  </section>
}
export function ChatGptAgentBanner(){return <section className="px-4 py-12"><div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-academy-ink p-1 shadow-soft"><div className="relative overflow-hidden rounded-[1.8rem] bg-[radial-gradient(circle_at_top_left,rgba(244,196,90,.38),transparent_34%),linear-gradient(135deg,#151515,#27364e_58%,#111111)] p-6 text-white md:p-10"><div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-academy-gold/25 blur-3xl"/><div className="absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-academy-gold/70 to-transparent"/><div className="relative grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center"><div><div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-academy-surface/10 px-4 py-2 text-xs font-black uppercase tracking-[.18em] text-academy-gold backdrop-blur"><span className="status-dot"/>Agent IA disponible</div><h2 className="mt-6 max-w-3xl text-3xl font-black tracking-tight md:text-5xl">Une question sur une formation, un financement ou une inscription&nbsp;?</h2><p className="mt-5 max-w-2xl text-base leading-8 text-stone-200 md:text-lg">Notre agent ChatGPT Intégrale Academy vous guide instantanément pour identifier le bon parcours, comprendre les prérequis et préparer votre demande.</p><div className="mt-8 flex flex-wrap gap-3"><a href={chatGptAgentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-academy-gold px-6 py-3 text-sm font-black text-academy-gold-text transition hover:-translate-y-0.5 hover:brightness-95">Discuter avec l’agent IA →</a><Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-academy-surface/10 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-academy-surface/15">Être rappelé</Link></div></div><div className="relative"><div className="absolute -inset-4 rounded-[2rem] bg-academy-gold/10 blur-2xl"/><div className="relative rounded-[1.75rem] border border-white/10 bg-academy-surface/10 p-4 backdrop-blur"><AIChatPreview/></div></div></div></div></div></section>}


export function VerifiedBadge(){
  return <span className="inline-flex items-center gap-1 rounded-full bg-blue-500 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[.12em] text-white shadow-[0_8px_22px_rgba(59,130,246,.28)]"><span className="grid h-4 w-4 place-items-center rounded-full bg-white text-[0.65rem] text-blue-600" aria-hidden="true">✓</span>Certifié</span>
}

function SocialIcon({ label }: { label: string }){
  if(label==='Facebook') return <span className="font-black" aria-hidden="true">f</span>;
  if(label==='LinkedIn') return <span className="text-[0.68rem] font-black" aria-hidden="true">in</span>;
  if(label==='Instagram') return <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="16.5" cy="7.5" r="1" fill="currentColor"/></svg>;
  return <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path d="M7 18.4 4.8 19l.6-2.2A7.7 7.7 0 1 1 7 18.4Z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.1 8.4c-.2.3-.6.8-.5 1.6.1 1.5 1.8 3.5 3.7 4.4.9.4 1.5.3 1.9.1l.9-1.1-1.9-.9-.7.8c-1.2-.4-2.2-1.4-2.7-2.6l.8-.8-.9-1.9-.6.4Z" fill="currentColor"/></svg>;
}

export function SocialLinks({ tone = 'dark' }: { tone?: 'dark' | 'light' }){
  const isDark = tone === 'dark';
  const linkClass = isDark ? 'border-white/10 bg-white/5 text-white hover:border-academy-gold/70 hover:bg-academy-gold hover:text-academy-gold-text' : 'border-academy-line bg-white text-academy-ink hover:border-academy-gold hover:bg-academy-gold hover:text-academy-gold-text';
  return <div className="mt-4 flex flex-wrap gap-2" aria-label="Réseaux sociaux officiels">
    {contact.socialLinks.map((social) => <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${social.label} Intégrale Academy - ${social.handle}`} title={`${social.label} · ${social.handle}`} className={`grid h-10 w-10 place-items-center rounded-full border text-sm transition hover:-translate-y-0.5 ${linkClass}`}><SocialIcon label={social.label}/></a>)}
  </div>
}

export function Highlight({children,variant='normal',className=''}:{children:React.ReactNode;variant?:'normal'|'large'|'subtle';className?:string}){
  const variants={
    normal:'from-[#F6C64A]/85 to-[#F6C64A]/85 bg-[length:100%_40%] [text-shadow:0_1px_0_rgba(255,255,255,.18)]',
    large:'from-[#F6C64A]/90 to-[#F6C64A]/90 bg-[length:100%_45%] [text-shadow:0_1px_0_rgba(255,255,255,.2)]',
    subtle:'from-[#F6C64A]/55 to-[#F6C64A]/55 bg-[length:100%_35%]',
  } as const;
  return <span className={`relative z-0 inline bg-gradient-to-r bg-left-bottom bg-no-repeat px-[0.08em] [border-radius:0.18em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone] ${variants[variant]} ${className}`}>{children}</span>
}
export function Badge({children,tone='gold'}:{children:React.ReactNode;tone?:'gold'|'green'|'neutral'}){const c=tone==='green'?'bg-academy-green/10 text-green-700':tone==='gold'?'bg-academy-gold/25 text-stone-900':'bg-white text-stone-700 border border-academy-line';return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${c}`}>{children}</span>}
export function Button({href,children,variant='primary'}:{href:string;children:React.ReactNode;variant?:'primary'|'secondary'|'ghost'}){const c=variant==='primary'?'bg-academy-ink text-white hover:bg-black':variant==='secondary'?'bg-academy-gold text-academy-ink hover:brightness-95':'bg-white text-academy-ink ring-1 ring-academy-line hover:bg-stone-50';return <Link className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5 ${c}`} href={href}>{children}</Link>}
export function SectionTitle({eyebrow,title,children}:{eyebrow?:string;title:React.ReactNode;children?:React.ReactNode}){return <div className="mx-auto mb-10 max-w-3xl text-center reveal">{eyebrow&&<Badge>{eyebrow}</Badge>}<h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">{title}</h2>{children&&<p className="mt-4 text-lg text-stone-600">{children}</p>}</div>}

type ArtDirectionWorld = 'security' | 'aps' | 'bts' | 'vtc' | 'financement' | 'contact';

const artDirectionCopy: Record<ArtDirectionWorld, { label: string; title: string; chips: string[]; stats: [string, string][]; glyphs: string[] }> = {
  security: {
    label: 'Parcours sécurité',
    title: 'Pré-requis · centre · financement · inscription',
    chips: ['APS', 'SSIAP', 'SST', 'CNAPS'],
    stats: [['6', 'formations'], ['2', 'centres'], ['CPF', 'selon éligibilité']],
    glyphs: ['◆', '✓', '⬟'],
  },
  aps: {
    label: 'Formation APS',
    title: 'Carte professionnelle CNAPS · métier · examen',
    chips: ['TFP APS', 'CNAPS', '175h', 'Sécurité'],
    stats: [['5', 'semaines'], ['1 650€', 'tarif'], ['CPF', 'possible']],
    glyphs: ['🛡', '✓', '◆'],
  },
  bts: {
    label: 'Alternance BTS',
    title: 'Diplôme d’État avec accompagnement entreprise',
    chips: ['MOS', 'MCO', 'NDRC', 'CI'],
    stats: [['15j', 'école'], ['15j', 'entreprise'], ['OPCO', 'prise en charge']],
    glyphs: ['◇', '▱', '✦'],
  },
  vtc: {
    label: 'Préparation VTC',
    title: 'Formation, examen et projet chauffeur encadrés',
    chips: ['Examen', 'Carte pro', 'Projet', 'Financement'],
    stats: [['140h', 'parcours'], ['CPF', 'possible'], ['RDV', 'conseil']],
    glyphs: ['⌁', '◉', '→'],
  },
  financement: {
    label: 'Solutions financement',
    title: 'CPF · alternance · entreprise · France Travail',
    chips: ['CPF', 'OPCO', 'Alternance', 'Devis'],
    stats: [['6', 'options'], ['OPCO', 'branche'], ['Conseil', 'dossier']],
    glyphs: ['€', '✓', '↗'],
  },
  contact: {
    label: 'Contact conseiller',
    title: 'Une réponse claire pour lancer votre dossier',
    chips: ['Téléphone', 'Email', 'WhatsApp', 'RDV'],
    stats: [['04', 'appel'], ['24h', 'rappel'], ['3', 'lieux']],
    glyphs: ['✉', '✓', '●'],
  },
};

export function ArtDirectionVisual({ world }: { world: ArtDirectionWorld }) {
  const copy = artDirectionCopy[world];

  return <div className="relative isolate overflow-hidden rounded-[2rem] bg-academy-ink p-5 text-white shadow-soft ring-1 ring-academy-line reveal">
    <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(244,196,90,.35),transparent_34%),linear-gradient(135deg,rgba(17,17,17,.98),rgba(39,54,78,.88)_58%,rgba(17,17,17,.98))]" aria-hidden="true" />
    <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-academy-gold/25 blur-3xl" aria-hidden="true" />
    <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
      <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[.18em] text-academy-gold">{copy.label}</span>
      <span className="status-dot" aria-hidden="true" />
    </div>
    <div className="mt-6 grid gap-5">
      <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
        <div className="flex gap-3" aria-hidden="true">{copy.glyphs.map(glyph => <span key={glyph} className="premium-icon bg-white/10 text-academy-gold"><span>{glyph}</span></span>)}</div>
        <h3 className="mt-5 text-2xl font-black leading-tight md:text-3xl">{copy.title}</h3>
        <div className="mt-5 flex flex-wrap gap-2">{copy.chips.map(chip => <span key={chip} className="rounded-full bg-academy-gold/20 px-3 py-1 text-xs font-black text-academy-gold">{chip}</span>)}</div>
      </div>
      <div className="grid grid-cols-3 gap-3">{copy.stats.map(([value, label]) => <div key={`${value}-${label}`} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur"><b className="block text-xl font-black text-academy-gold">{value}</b><span className="mt-1 block text-[0.7rem] font-bold text-stone-200">{label}</span></div>)}</div>
    </div>
  </div>;
}

export function Hero({badge,title,subtitle,actions,visual}:{badge?:string;title:React.ReactNode;subtitle:string;actions?:React.ReactNode;visual?:React.ReactNode}){return <section className="grid-soft gold-glow overflow-hidden px-4 py-16 md:py-24"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center"><div className="reveal">{badge&&<Badge>{badge}</Badge>}<h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">{title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">{subtitle}</p>{actions&&<div className="mt-8 flex flex-wrap gap-3">{actions}</div>}</div>{visual ?? <div className="relative rounded-[2rem] bg-white/90 p-6 shadow-soft ring-1 ring-academy-line backdrop-blur reveal"><div className="rounded-[1.5rem] bg-academy-bg p-6"><p className="text-sm font-bold text-stone-500">Centres & modalités</p><div className="mt-5 grid gap-3">{contact.locations.map(l=><div key={l.name} className="rounded-2xl bg-white p-4"><b>{l.name}</b><p className="text-sm text-stone-600">{l.address}</p></div>)}</div></div></div>}</div></section>}
const appointmentFormUrl = 'https://assistance-alw9.onrender.com/demande-informations-formations';

function AppointmentButton(){
  return <Link className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-academy-gold via-academy-gold to-academy-gold px-5 py-3 text-sm font-black text-academy-gold-text shadow-gold ring-1 ring-academy-gold/70 transition hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-academy-gold focus:ring-offset-2" href={appointmentFormUrl}><span>Prendre RDV</span><span className="transition group-hover:translate-x-0.5" aria-hidden="true">→</span></Link>
}

export function Header(){
  const nav=[['Accueil','/'],['Formations sécurité','/#formations-securite'],['BTS','/#bts'],['Notre école','/ecole'],['VTC','/vtc'],['Tarifs','/tarifs'],['Financements','/financements'],['Entreprises','/entreprises'],['Planning','/planning'],['Contact','/contact']] as const;
  return <header className="sticky top-0 z-50 border-b border-white/60 bg-academy-surface/80 shadow-[0_18px_50px_rgba(17,17,17,.06)] backdrop-blur-xl"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3"><Link href="/" className="group flex items-center gap-3 rounded-full pr-2 text-lg font-black focus:outline-none focus:ring-2 focus:ring-academy-gold"><span className="grid h-12 w-12 place-items-center rounded-[1.25rem] bg-gradient-to-br from-academy-gold to-academy-gold text-academy-gold-text shadow-gold transition group-hover:rotate-3" aria-hidden="true">IA</span><span className="leading-tight">Intégrale<br className="sm:hidden"/><span className="text-academy-gold-strong"> Academy</span></span></Link><nav className="hidden items-center gap-1 text-sm font-bold lg:flex" aria-label="Navigation principale">{nav.map(([n,h])=><Link key={h} href={h} className="rounded-full px-3 py-2 text-academy-muted transition hover:text-academy-gold-strong focus:text-academy-gold-strong">{n}</Link>)}</nav><div className="hidden items-center gap-2 xl:flex"><ThemeToggle/><Button href="tel:0422470768" variant="ghost">Appeler</Button><AppointmentButton/></div><div className="flex items-center gap-2 lg:hidden"><ThemeToggle/><MobileHeaderMenu nav={nav} appointmentFormUrl={appointmentFormUrl}/></div></div></header>
}
export function Footer(){
  const footerLinks=[
    {title:'Formations',links:[['APS','/formations-securite/aps'],['SSIAP 1','/formations-securite/ssiap-1'],['A3P / APR','/formations-securite/a3p-apr'],['BTS en alternance','/bts'],['Tarifs hors BTS','/tarifs']]},
    {title:'Financements',links:[['CPF','/financements/cpf'],['France Travail','/financements/france-travail'],['Alternance','/financements/alternance'],['Financements','/financements']]},
    {title:'Ressources',links:[['Planning','/planning'],['Centres','/centres'],['Entreprises','/entreprises'],['Contact','/contact']]},
  ];

  return <footer className="relative mt-20 overflow-hidden bg-academy-ink px-4 pb-10 pt-12 text-white">
    <div className="absolute inset-0 opacity-80" aria-hidden="true"><div className="absolute -left-24 top-12 h-80 w-80 rounded-full bg-academy-gold/20 blur-3xl"/><div className="absolute right-0 top-0 h-96 w-96 translate-x-1/3 rounded-full bg-yellow-300/10 blur-3xl"/><div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-academy-gold/70 to-transparent"/></div>
    <div className="relative mx-auto max-w-7xl">
      <div className="grid gap-10 py-12 lg:grid-cols-[1.2fr_2fr_.9fr]">
        <div><Link href="/" className="inline-flex items-center gap-3 text-2xl font-black"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-academy-gold text-academy-gold-text shadow-gold">IA</span><span>Intégrale<br/><span className="text-academy-gold">Academy</span></span></Link><p className="mt-5 max-w-sm text-sm leading-7 text-stone-300">Centre de formation professionnelle spécialisé sécurité privée, sécurité incendie, VTC et BTS en alternance.</p><p className="mt-5 text-sm font-semibold text-stone-300">{contact.hours}</p></div>
        <div className="grid gap-8 sm:grid-cols-3">{footerLinks.map(group=><div key={group.title}><h3 className="text-sm font-black uppercase tracking-[.18em] text-academy-gold">{group.title}</h3><ul className="mt-4 space-y-3 text-sm text-stone-300">{group.links.map(([label,href])=><li key={href}><Link href={href} className="transition hover:text-academy-gold">{label}</Link></li>)}</ul></div>)}</div>
        <div className="rounded-[1.75rem] border border-white/10 bg-academy-surface/5 p-5"><div className="flex flex-wrap items-center gap-2"><h3 className="text-sm font-black uppercase tracking-[.18em] text-academy-gold">Coordonnées</h3><VerifiedBadge/></div><p className="mt-4 text-sm leading-7 text-stone-300"><Link href="tel:0422470768" className="font-black text-white hover:text-academy-gold">{contact.phone}</Link><br/><a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="font-black text-white hover:text-academy-gold">WhatsApp {contact.whatsapp}</a><br/>{contact.locations[0].address}</p><SocialLinks/><div className="mt-5 flex flex-wrap gap-3"><Link href="/contact" className="inline-flex text-sm font-black text-academy-gold hover:text-yellow-200">Nous contacter →</Link><Link href="/admin/ia" className="inline-flex items-center justify-center rounded-full border border-academy-gold/60 px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-academy-gold transition hover:bg-academy-gold hover:text-academy-gold-text">Admin</Link></div></div>
      </div>
      <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-stone-400 md:flex-row md:items-center md:justify-between"><div className="space-y-2"><p>{legalRefs.join(' · ')}</p><p>Le site internet a été créé par SAS Intégrale Group - Clément Vaillant.</p></div><div className="flex flex-wrap gap-4"><Link href="/mentions-legales" className="hover:text-academy-gold">Mentions légales</Link><Link href="/politique-confidentialite" className="hover:text-academy-gold">Confidentialité</Link></div></div>
    </div>
  </footer>
}
export function Card({children}:{children:React.ReactNode}){return <div className="rounded-3xl bg-academy-surface p-6 shadow-card ring-1 ring-academy-line reveal">{children}</div>}
export function FormationCard({title,desc,href,tags=[]}:{title:string;desc:string;href:string;tags?:string[]}){return <Card><div className="flex flex-wrap gap-2">{tags.map(t=><Badge key={t} tone="neutral">{t}</Badge>)}</div><h3 className="mt-5 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-academy-muted">{desc}</p><div className="mt-6 flex flex-wrap gap-2"><Button href={href}>Découvrir</Button><Button href="/contact" variant="ghost">Demander des informations</Button></div></Card>}
export function FeatureCard({title,children}:{title:string;children:React.ReactNode}){return <Card><h3 className="text-lg font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-academy-muted">{children}</p></Card>}
export function StatCard({value,label}:{value:string;label:string}){return <div className="rounded-3xl border border-academy-line bg-academy-surface p-6 text-academy-ink shadow-card dark:border-white/10 dark:bg-academy-ink dark:text-white"><div className="text-3xl font-black text-academy-gold-strong dark:text-academy-gold">{value}</div><p className="mt-2 text-sm font-medium text-academy-muted dark:text-stone-200">{label}</p></div>}
export function FAQ({items}:{items:{q:string;a:string}[]}){return <div className="mx-auto max-w-3xl space-y-4">{items.map(i=><details key={i.q} className="group overflow-hidden rounded-[1.35rem] border border-academy-line bg-academy-surface shadow-soft transition duration-300 open:border-academy-gold/45 open:shadow-card"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-base font-black leading-6 transition hover:bg-academy-bg/60 sm:p-6"><span>{i.q}</span><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-academy-gold text-academy-gold-text transition duration-300 group-open:rotate-45" aria-hidden="true">+</span></summary><div className="px-5 pb-5 sm:px-6 sm:pb-6"><p className="border-t border-academy-line pt-4 text-sm font-medium leading-7 text-academy-muted sm:text-base">{i.a}</p></div></details>)}</div>}
export function LocationCard({name,address,detail}:{name:string;address:string;detail:string}){return <FeatureCard title={name}>{address}<br/>{detail}</FeatureCard>}
export function FinancingCard({title,children,href}:{title:string;children:React.ReactNode;href:string}){return <FeatureCard title={title}>{children}<br/><Link className="mt-4 inline-block font-bold text-academy-gold-strong" href={href}>En savoir plus →</Link></FeatureCard>}
export function ProofBar(){const items=['Qualiopi','CNAPS','ADEF','SSIAP','INRS SST','UAI'];return <section className="border-y border-academy-line bg-academy-surface/70 px-4 py-4"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 text-xs font-black uppercase tracking-[.18em] text-academy-muted">{items.map(item=><span key={item} className="rounded-full bg-academy-bg px-4 py-2">{item}</span>)}</div></section>}
export function ConversionStrip(){return <section className="mx-auto max-w-7xl px-4 py-8"><div className="grid gap-4 rounded-[2rem] bg-academy-surface p-5 shadow-soft ring-1 ring-academy-line md:grid-cols-3"><div><b className="text-academy-ink">Un doute sur la bonne formation ?</b><p className="mt-1 text-sm text-academy-muted">Un conseiller vérifie avec vous les prérequis, lieux, dates et financements.</p></div><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-academy-green/10 font-black text-green-700">✓</span><p className="text-sm font-semibold text-academy-muted">Réponse orientée inscription, sans engagement.</p></div><div className="flex flex-wrap items-center justify-start gap-2 md:justify-end"><Button href="/contact">Demander des informations</Button><Button href="tel:0422470768" variant="secondary">Être rappelé</Button></div></div></section>}

const splitFeatures = [
  {
    eyebrow: 'Planning & missions',
    title: 'Planning Drag & Drop ultra-rapide',
    desc: 'Créez vos sessions, convocations et créneaux de présence en quelques secondes. Le parcours candidat reste lisible, du premier contact à l’entrée en formation.',
    bullets: ['Vue calendrier claire avec temps forts', 'Alertes sur les pièces ou présences manquantes', 'Convocation par SMS/Email en un clic'],
    visual: 'calendar',
  },
  {
    eyebrow: 'Facturation',
    title: 'Financement et suivi automatisés',
    desc: 'Transformez les demandes candidat en étapes concrètes : financement pressenti, devis, dossier administratif et relance conseiller.',
    bullets: ['CPF, alternance, entreprise ou France Travail', 'Résumé du budget et statut du dossier', 'Suivi des règlements et documents intégré'],
    visual: 'billing',
  },
];

const packCards = [
  {
    title: 'Créer mon projet formation',
    subtitle: 'Lancez votre parcours de A à Z',
    theme: 'violet',
    steps: ['Projet', 'Financement', 'Dossier', 'RDV'],
  },
  {
    title: 'Accéder au financement',
    subtitle: 'Financez votre formation via CPF, alternance ou OPCO',
    theme: 'blue',
    steps: ['CPF', 'Programme', 'Devis', 'Validation'],
  },
  {
    title: 'Réussir mon inscription',
    subtitle: 'Suivez les pièces, dates et convocations',
    theme: 'olive',
    steps: ['Pièces', 'Dates', 'Examen', 'Assistance'],
  },
];

function BrowserFrame({children}:{children:React.ReactNode}){
  return <div className="rounded-[1.8rem] border border-slate-200 bg-academy-surface p-6 shadow-[0_28px_70px_rgba(15,23,42,.08)]">
    <div className="mb-7 flex items-center justify-between border-b border-slate-100 pb-5">
      <span className="rounded-lg bg-academy-gold-soft px-3 py-2 text-sm font-black text-orange-600">IA</span>
      <span className="h-2 w-28 rounded-full bg-slate-100"/>
      <span className="h-9 w-9 rounded-full bg-slate-100"/>
    </div>
    {children}
  </div>
}

function CalendarMockup(){
  const active=[2,7,11,14,19];
  return <BrowserFrame>
    <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black text-slate-400">{['L','M','M','J','V','S','D'].map(d=><span key={d}>{d}</span>)}</div>
    <div className="mt-3 grid grid-cols-7 gap-2">{Array.from({length:21}).map((_,i)=><div key={i} className={`grid aspect-square rounded-lg border ${active.includes(i)?'border-blue-200 bg-blue-100 shadow-inner':'border-slate-100 bg-academy-surface'}`}><span className={`m-auto h-2 w-2 rounded-full ${active.includes(i)?'bg-blue-500':'bg-transparent'}`}/></div>)}</div>
    <div className="mt-4 flex items-center gap-3 rounded-xl border border-orange-200 bg-orange-50 p-3 text-xs font-bold text-orange-800"><span className="grid h-8 w-8 place-items-center rounded-lg bg-academy-gold-soft text-orange-500">△</span>Attention : dossier incomplet avant convocation.</div>
  </BrowserFrame>
}

function BillingMockup(){
  return <BrowserFrame>
    <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-100">
      <div className="flex h-36 items-end justify-around gap-4">
        {[44,74,55,96,32].map((height,i)=><span key={height} className={`w-9 rounded-t-md ${i===2?'bg-orange-500':i===3?'bg-orange-400':i===4?'bg-slate-200':'bg-orange-300/70'}`} style={{height:`${height}%`}}/>)}</div>
    </div>
    <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-100 px-5 py-4"><b>Total estimé</b><span className="text-2xl font-black text-orange-600">1 970€</span></div>
  </BrowserFrame>
}

function PhoneAlertMockup(){
  return <BrowserFrame>
    <div className="mx-auto w-44 rounded-[1.45rem] border-[7px] border-slate-900 bg-academy-surface shadow-xl">
      <div className="rounded-t-[1rem] bg-orange-500 px-4 py-3 text-center text-xs font-black text-white">Intégrale Agent</div>
      <div className="space-y-3 p-3">
        <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-xs font-black text-green-800">✓ Dossier OK</div>
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs font-black text-blue-800">▣ Formation en cours</div>
      </div>
    </div>
    <div className="mt-5 flex items-center gap-3 rounded-2xl border-l-4 border-red-500 bg-red-50 p-4"><span className="grid h-9 w-9 place-items-center rounded-full bg-red-500 text-white">!</span><div><b className="text-red-900">ALERTE ROUGE</b><p className="text-xs text-red-600">Relance dossier en cours...</p></div></div>
  </BrowserFrame>
}

function FeatureSplitCard({feature}:{feature:typeof splitFeatures[number]}){
  return <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-academy-surface shadow-[0_30px_90px_rgba(15,23,42,.08)]">
    <div className="grid lg:grid-cols-[1.05fr_.95fr]">
      <div className="p-8 md:p-12">
        <p className="flex items-center gap-3 text-xs font-black uppercase tracking-[.28em] text-orange-700"><span className="h-px w-8 bg-orange-500"/>{feature.eyebrow}</p>
        <h3 className="mt-7 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">{feature.title}</h3>
        <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-600">{feature.desc}</p>
        <ul className="mt-8 space-y-5 text-lg font-medium text-slate-700">{feature.bullets.map(bullet=><li key={bullet} className="flex gap-4"><span className="font-black text-orange-500">✓</span><span>{bullet}</span></li>)}</ul>
        <div className="mt-12 border-t border-slate-100 pt-7 flex items-center justify-between text-sm font-black text-orange-700"><span className="flex gap-2 text-slate-300"><i className="h-2.5 w-2.5 rounded-full bg-slate-200"/><i className="h-2.5 w-2.5 rounded-full bg-slate-200"/><i className="h-2.5 w-11 rounded-full bg-slate-900"/></span><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-orange-500"/>En lecture</span></div>
      </div>
      <div className="grid place-items-center border-t border-slate-100 bg-gradient-to-br from-white to-slate-50 p-8 lg:border-l lg:border-t-0">{feature.visual==='calendar'?<CalendarMockup/>:<BillingMockup/>}</div>
    </div>
  </article>
}

function PackPreview({pack}:{pack:typeof packCards[number]}){
  const color=pack.theme==='violet'?'bg-violet-400 text-white':pack.theme==='blue'?'bg-blue-800 text-white':'bg-yellow-600 text-white';
  return <article className="rounded-[2rem] bg-[#fff5cf] p-8 shadow-[0_24px_70px_rgba(120,90,20,.12)]">
    <div className="mx-auto max-w-[22rem] rounded-3xl bg-academy-surface shadow-[0_18px_35px_rgba(17,17,17,.12)]">
      <div className={`flex items-center justify-between rounded-t-3xl px-5 py-4 ${color}`}><b>{pack.theme==='blue'?'EDOF':pack.theme==='olive'?'Croissance':'Mon OF'}</b><span className="h-3 w-3 rounded-full bg-green-300"/></div>
      <div className="p-4">
        {pack.theme==='blue'?<div className="rounded-xl bg-blue-100 p-4 text-blue-900"><b>CPF</b><p className="mt-2 text-2xl font-black">1970€</p><p className="text-xs font-black text-green-700">✓ Financé</p></div>:pack.theme==='olive'?<div className="rounded-xl bg-academy-gold-soft p-4"><svg viewBox="0 0 220 70" className="h-24 w-full"><path d="M5 52 C45 45 78 38 115 30 S175 18 215 12" fill="none" stroke="#8a7d00" strokeWidth="5"/><circle cx="45" cy="44" r="5" fill="white" stroke="#8a7d00" strokeWidth="4"/><circle cx="115" cy="30" r="5" fill="white" stroke="#8a7d00" strokeWidth="4"/><circle cx="180" cy="18" r="5" fill="white" stroke="#8a7d00" strokeWidth="4"/></svg></div>:<div className="rounded-xl bg-violet-50 p-4 text-center"><div className="mx-auto h-24 max-w-48 rounded-lg bg-violet-100 p-3 text-violet-400">🏛️<div className="mt-2 text-4xl">✓</div></div></div>}
        <div className="mt-4 grid grid-cols-4 gap-2 text-center text-[10px] font-black">{pack.steps.map((step,i)=><span key={step}><i className="mx-auto mb-1 grid h-6 w-6 place-items-center rounded-full bg-academy-gold text-academy-gold-text">{i+1}</i>{step}</span>)}</div>
      </div>
    </div>
    <div className="relative mx-auto -mt-1 max-w-[24rem] rounded-2xl bg-academy-surface px-5 py-4 text-center shadow-[0_14px_30px_rgba(17,17,17,.12)]"><span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-academy-gold-soft px-4 py-1 text-xs font-black uppercase tracking-[.18em] text-academy-gold-strong">Pack</span><h3 className="mt-1 text-xl font-black text-academy-ink">{pack.title}</h3></div>
    <p className="mt-7 text-lg font-medium text-academy-gold-strong"><span className="mr-3">✓</span>{pack.subtitle}</p>
  </article>
}

export function VisualJourneyShowcase(){return <section className="mx-auto max-w-[96rem] space-y-10 px-4 py-14">
  <div className="rounded-[2rem] border border-slate-200 bg-academy-surface p-4 shadow-[0_25px_90px_rgba(15,23,42,.06)] md:p-8">
    <div className="mb-8 flex items-center gap-6"><span className="rounded-full border border-slate-200 bg-academy-surface px-6 py-3 text-sm font-black uppercase tracking-[.08em] text-academy-gold-strong">Packs</span><span className="h-px flex-1 bg-slate-200"/><span className="text-sm text-slate-500">3 parcours</span></div>
    <div className="grid gap-8 lg:grid-cols-3">{packCards.map(pack=><PackPreview key={pack.title} pack={pack}/>)}</div>
  </div>
  {splitFeatures.map(feature=><FeatureSplitCard key={feature.title} feature={feature}/>) }
  <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-academy-surface shadow-[0_30px_90px_rgba(15,23,42,.08)]">
    <div className="grid lg:grid-cols-[1.05fr_.95fr]">
      <div className="p-8 md:p-12"><p className="flex items-center gap-3 text-xs font-black uppercase tracking-[.28em] text-orange-700"><span className="h-px w-8 bg-orange-500"/>App agent</p><h3 className="mt-7 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">Application candidat avec alertes</h3><p className="mt-6 max-w-2xl text-lg leading-9 text-slate-600">Les candidats visualisent leurs étapes depuis leur téléphone : dossier, formation, documents et messages importants.</p><ul className="mt-8 space-y-5 text-lg font-medium text-slate-700"><li className="flex gap-4"><span className="font-black text-orange-500">✓</span>Prise en charge et documents en autonomie</li><li className="flex gap-4"><span className="font-black text-orange-500">✓</span>Relance visible en cas d’élément manquant</li><li className="flex gap-4"><span className="font-black text-orange-500">✓</span>Formation et convocation centralisées</li></ul></div>
      <div className="grid place-items-center border-t border-slate-100 bg-gradient-to-br from-white to-slate-50 p-8 lg:border-l lg:border-t-0"><PhoneAlertMockup/></div>
    </div>
  </article>
</section>}

export function StickyMobileCTA(){return <div className="fixed inset-x-0 bottom-0 z-40 border-t border-academy-line bg-academy-surface/95 p-3 shadow-soft backdrop-blur md:hidden"><div className="mx-auto grid max-w-md grid-cols-2 gap-2"><Button href="tel:0422470768" variant="ghost">Appeler</Button><Button href="/contact">Infos</Button></div></div>}
