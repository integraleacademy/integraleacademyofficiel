'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** Progressive enhancement: content remains visible with no JavaScript or reduced motion. */
export function ContactMotion({ children, className }: { children: ReactNode; className: string }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute('data-contact-revealed', 'true');
        observer.unobserve(entry.target);
      });
    }, { threshold: .1 });
    root.current.querySelectorAll('[data-contact-reveal]').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <div ref={root} className={className}>{children}</div>;
}
