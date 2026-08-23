"use client";

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function HomePageAnimations() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-home-page]');
    if (!root) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const heroItems = Array.from(root.querySelectorAll<HTMLElement>('[data-home-hero-item]'));
      if (heroItems.length > 0) {
        gsap.from(heroItems, {
          opacity: 0,
          y: 24,
          duration: 0.75,
          stagger: 0.09,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        });
      }

      const assistant = root.querySelector<HTMLElement>('[data-home-assistant]');
      if (assistant) {
        gsap.from(assistant, {
          opacity: 0,
          y: 32,
          scale: 0.985,
          duration: 0.9,
          delay: 0.28,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        });
      }

      const ambient = root.querySelector<HTMLElement>('[data-home-ambient]');
      if (ambient) {
        gsap.to(ambient, {
          x: 18,
          y: -12,
          scale: 1.04,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      const journeyHeading = root.querySelector<HTMLElement>('[data-home-journey-heading]');
      if (journeyHeading) {
        gsap.from(Array.from(journeyHeading.children), {
          opacity: 0,
          y: 28,
          duration: 0.78,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: journeyHeading,
            start: 'top 82%',
            once: true,
          },
        });
      }

      const journeyGrid = root.querySelector<HTMLElement>('[data-home-journey-grid]');
      const journeyCards = Array.from(root.querySelectorAll<HTMLElement>('[data-home-journey-card]'));
      if (journeyGrid && journeyCards.length > 0) {
        gsap.from(journeyCards, {
          opacity: 0,
          y: 36,
          scale: 0.985,
          duration: 0.82,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: journeyGrid,
            start: 'top 84%',
            once: true,
          },
        });
      }

      const proof = root.querySelector<HTMLElement>('[data-home-proof]');
      const proofItems = Array.from(root.querySelectorAll<HTMLElement>('[data-home-proof-item]'));
      if (proof && proofItems.length > 0) {
        gsap.from(proofItems, {
          opacity: 0,
          y: 18,
          duration: 0.62,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: proof,
            start: 'top 90%',
            once: true,
          },
        });
      }
    }, root);

    return () => context.revert();
  }, []);

  return null;
}
