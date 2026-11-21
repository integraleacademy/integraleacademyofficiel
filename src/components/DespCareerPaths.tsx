import Link from 'next/link';
import { TrainingReferenceAction, TrainingReferenceSection } from './TrainingReferenceLayout';
import styles from './ApsReferencePage.module.css';

export function DespCareerPaths({ course, outcomes, note }: { course: 'initial' | 'vae'; outcomes: readonly string[]; note?: string }) {
  const initial = course === 'initial';

  return <TrainingReferenceSection id="debouches" eyebrow="09 — Débouchés & emploi" title="Débouchés" tone="paper">
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {outcomes.map(outcome => <li key={outcome} className={styles.jobCard}>
        <span className={styles.jobIcon} aria-hidden="true">↗</span><strong>{outcome}</strong>
      </li>)}
    </ul>
    {note && <p className="my-5 text-sm leading-7 text-academy-muted">{note}</p>}
    <article className="mt-7 grid items-center gap-6 rounded-3xl bg-[#14212b] p-7 text-white lg:grid-cols-[1fr_auto] lg:p-9">
      <div><h3 className="text-2xl font-black">{initial ? 'Vous exercez déjà les responsabilités du dirigeant ?' : 'Vous souhaitez acquérir les compétences du dirigeant ?'}</h3>
        <p className="mt-3 max-w-2xl leading-7 text-white/75">{initial
          ? 'La VAE vous permet de présenter vos expériences et vos preuves au jury du même titre DESP.'
          : 'Le DESP initial prépare au même titre en 245 heures de cours à distance et en présentiel.'}</p>
        <Link href="/despvaeouinitial" className="mt-4 inline-block text-sm font-bold underline underline-offset-4">Comparer les deux parcours</Link>
      </div>
      <TrainingReferenceAction href={initial ? '/vaedirigeant' : '/dirigeant'}>{initial ? 'Découvrir la VAE DESP' : 'Découvrir le DESP initial'} →</TrainingReferenceAction>
    </article>
  </TrainingReferenceSection>;
}
