function GoogleIcon(){
  return <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-4Z"/>
    <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.4 4.3-17.7 10.7Z"/>
    <path fill="#4CAF50" d="M24 44c5.1 0 9.8-2 13.3-5.2l-6.1-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.7-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44Z"/>
    <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6l6.1 5.2C40.7 39.1 44 33.7 44 24c0-1.3-.1-2.7-.4-4Z"/>
  </svg>;
}

export function GoogleRatingBadge(){
  return <a
    href="/#avis-google"
    aria-label="Voir les avis Google Intégrale Academy, note 5 sur 5"
    className="group fixed bottom-20 right-3 z-[60] flex items-center gap-3 rounded-[1.25rem] border border-[#E8EAED] bg-white/95 px-3 py-2.5 text-[#202124] shadow-[0_18px_55px_rgba(15,23,42,.18)] ring-1 ring-black/[.04] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#F2BB31]/60 hover:shadow-[0_22px_65px_rgba(15,23,42,.24)] md:bottom-6 md:right-6 md:px-4 md:py-3"
  >
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white shadow-[0_8px_24px_rgba(15,23,42,.10)] ring-1 ring-[#E8EAED]" aria-hidden="true"><GoogleIcon/></span>
    <span className="min-w-0 text-left">
      <span className="block text-[9px] font-black uppercase tracking-[.18em] text-[#5F6368]">Avis Google</span>
      <span className="mt-0.5 flex items-baseline gap-1"><strong className="text-[1.35rem] font-black leading-none tracking-[-.04em]">5,0</strong><span className="text-[10px] font-bold text-[#5F6368]">/ 5</span></span>
      <span className="mt-1 block whitespace-nowrap text-[11px] leading-none tracking-[.08em] text-[#F4B400]" aria-hidden="true">★★★★★</span>
    </span>
    <span className="hidden h-8 w-8 shrink-0 place-items-center rounded-full bg-[#F2BB31]/18 text-sm font-black text-[#8B6205] transition group-hover:translate-x-0.5 group-hover:bg-[#F2BB31] group-hover:text-[#17130A] sm:grid" aria-hidden="true">→</span>
  </a>;
}
