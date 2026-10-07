import type { ReactNode } from 'react';
import styles from './ApsReferencePage.module.css';

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-[.66rem] font-black uppercase tracking-[.24em] ${light ? 'text-blue-300' : 'text-blue-700'}`}>{children}</p>;
}

export function TrainingEditorialSection({ id, eyebrow, title, intro, children, tone = 'cream' }: { id?: string; eyebrow: string; title: ReactNode; intro?: ReactNode; children: ReactNode; tone?: 'cream' | 'paper' | 'stone' | 'dark' }) {
  const colors = tone === 'dark' ? 'bg-[#0D1725] text-white' : tone === 'paper' ? 'bg-[#FFFDF8] text-academy-ink' : tone === 'stone' ? 'bg-[#EFE7D9] text-academy-ink' : 'bg-academy-bg text-academy-ink';
  return <section id={id} className={`${styles.section} ${colors} scroll-mt-24 px-4 py-14 sm:py-16 lg:py-24`}><div className="page-container"><div className="mb-8 grid gap-5 lg:grid-cols-[.75fr_1.25fr] lg:items-end lg:gap-16"><div><Eyebrow light={tone === 'dark'}>{eyebrow}</Eyebrow><h2 className={`${styles.sectionHeading} mt-3 max-w-3xl text-3xl font-black tracking-[-.045em] sm:text-4xl lg:text-5xl`}>{title}</h2></div>{intro && <div className={`${styles.sectionIntro} max-w-3xl text-base font-medium leading-8 ${tone === 'dark' ? 'text-white/65' : 'text-academy-muted'}`}>{intro}</div>}</div>{children}</div></section>;
}
