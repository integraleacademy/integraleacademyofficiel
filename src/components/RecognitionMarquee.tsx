const recognitions = [
  'Agrément SSIAP n°8323',
  'Habilitation INRS',
  'Agrément VTC',
  'Qualiopi n°03169',
  'Agréé CNAPS',
  'DREETS',
  'Centre de formation déclaré',
  'Formations sécurité privée',
  'Formations incendie',
  'Accompagnement administratif',
];

function RecognitionList({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden}
      className="recognition-marquee-list flex shrink-0 items-center whitespace-nowrap"
    >
      {recognitions.map((recognition) => (
        <li key={recognition} className="flex items-center gap-10 pl-10 md:gap-14 md:pl-14 lg:gap-20 lg:pl-20">
          <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[rgb(var(--accent))] shadow-[0_0_14px_rgb(var(--accent)/.34)]" />
          <span className="text-[0.82rem] font-semibold tracking-[-0.01em] text-stone-500 md:text-[0.95rem] dark:text-stone-300">
            {recognition}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function RecognitionMarquee() {
  return (
    <section className="recognition-marquee-section w-full border-y border-[rgb(var(--border)/.62)] bg-[#f7f6f2] py-5 shadow-[inset_0_1px_0_rgb(255_255_255/.82)] dark:bg-[rgb(var(--surface)/.96)] md:py-7">
      <div className="mb-5 text-center text-[0.66rem] font-medium uppercase tracking-[0.48em] text-stone-500 dark:text-stone-300 md:mb-6 md:text-[0.72rem]">
        UN ORGANISME RECONNU ET CONTRÔLÉ
      </div>
      <div className="recognition-marquee-mask overflow-hidden">
        <div className="recognition-marquee-track flex w-max items-center will-change-transform hover:[animation-play-state:paused]">
          <RecognitionList />
          <RecognitionList ariaHidden />
        </div>
      </div>
    </section>
  );
}
