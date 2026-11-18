import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import home from '@/app/HomeHero.module.css';
import styles from './CatalogueHero.module.css';

type Props = {
  id: string;
  title: ReactNode;
  description: string;
  artwork: { src: string; alt: string };
  actions: { label: string; href: string }[];
};

export function CatalogueHero({ id, title, description, artwork, actions }: Props) {
  return (
    <section className={styles.hero} data-page-hero aria-labelledby={id}>
      <div className={home.container}>
        <div className={home.heroComposition}>
          <div className={home.heroCopy}>
            <h1 id={id}>{title}</h1>
            <p>{description}</p>
            <div className={home.heroActions}>
              {actions.map(({ href, label }, index) => (
                <Link key={href} href={href} className={index === 0 ? home.primaryButton : home.secondaryButton}>{label}</Link>
              ))}
            </div>
          </div>
          <div className={styles.artwork}>
            <Image src={artwork.src} alt={artwork.alt} width={1200} height={800} sizes="(max-width: 900px) 95vw, (min-width: 1440px) 650px, 48vw" priority />
          </div>
        </div>
      </div>
    </section>
  );
}
