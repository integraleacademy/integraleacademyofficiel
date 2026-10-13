import styles from './TrainingIllustration.module.css';

const pictures: Record<string, string> = {
  aps: 'formation-scenes-manuel/aps-mission-acces.webp',
  ssiap: 'formation-scenes-manuel/ssiap-1-galerie-ssi.webp',
  sst: 'sst/manuel/formation.webp',
  a3p: 'a3p/manuel/protection.webp',
  desp: 'desp/manuel/direction.webp',
  vtc: 'vtc/manuel/accueil.webp',
  mos: 'bts/manuel/mos.webp',
  mco: 'bts/manuel/mco.webp',
  ndrc: 'bts/manuel/ndrc.webp',
  ci: 'bts/manuel/ci.webp',
  pi: 'bts/manuel/pi.webp',
  cg: 'bts/manuel/cg.webp',
};

export function TrainingIllustration({ type, featured = false, wide = false }: { type: string; featured?: boolean; wide?: boolean }) {
  if (!pictures[type]) return null;
  return <div className={`${styles.visual} ${featured ? styles.featured : ''} ${wide ? styles.wide : ''}`} aria-hidden="true"><img src={`/images/${pictures[type]}`} alt="" width="720" height="480" loading="lazy" decoding="async" /><span>Le métier en images <i>↗</i></span></div>;
}
