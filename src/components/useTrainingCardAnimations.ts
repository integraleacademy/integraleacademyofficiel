"use client";

import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useTrainingCardAnimations(containerRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    gsap.registerPlugin(ScrollTrigger);
    const cleanups: Array<() => void> = [];
    const context = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-training-card]', container) as HTMLElement[];
      const heading = container.closest('section')?.querySelector<HTMLElement>('[data-training-heading]');
      const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reducedMotion) {
        if (heading?.firstElementChild) gsap.from(heading.firstElementChild.children, { opacity: 0, y: 25, duration: 0.8, stagger: 0.14, ease: 'power3.out', scrollTrigger: { trigger: heading, start: 'top 85%', once: true } });
        gsap.from(cards, { opacity: 0, y: 35, scale: 0.985, duration: 0.8, stagger: 0.1, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: container, start: 'top 85%', once: true } });
      }
      if (!reducedMotion && matchMedia('(hover: hover) and (pointer: fine)').matches) cards.forEach((card) => {
        const tilt = card.querySelector<HTMLElement>('[data-training-tilt]');
        if (!tilt) return;
        gsap.set(tilt, { transformPerspective: 1000, transformStyle: 'preserve-3d' });
        const move = (event: PointerEvent) => {
          const bounds = card.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          gsap.to(tilt, { rotateX: -y * 8, rotateY: x * 8, duration: 0.38, ease: 'power2.out', overwrite: 'auto' });
        };
        const leave = () => gsap.to(tilt, { rotateX: 0, rotateY: 0, duration: 0.75, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' });
        card.addEventListener('pointermove', move);
        card.addEventListener('pointerleave', leave);
        cleanups.push(() => { card.removeEventListener('pointermove', move); card.removeEventListener('pointerleave', leave); gsap.killTweensOf(tilt); });
      });
    }, container);
    return () => { cleanups.forEach((cleanup) => cleanup()); context.revert(); };
  }, [containerRef]);
}
