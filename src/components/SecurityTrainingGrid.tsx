"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Formation } from "@/data/formations";

const cardDetails = [
  { number: "01", category: "Surveillance", icon: "♢", accent: "#38bdf8" },
  { number: "02", category: "Sécurité incendie", icon: "♨", accent: "#fb7185" },
  { number: "03", category: "Secourisme", icon: "✚", accent: "#34d399" },
  { number: "04", category: "Protection rapprochée", icon: "♙", accent: "#84cc16" },
  { number: "05", category: "Direction", icon: "▣", accent: "#f97316" },
] as const;

export function SecurityTrainingGrid({ formations }: { formations: Formation[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const grid = gridRef.current;
    if (!grid) return;

    const section = grid.closest<HTMLElement>("[data-security-training-section]");
    const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-security-training-card]"));
    const tilts = Array.from(grid.querySelectorAll<HTMLElement>("[data-security-training-tilt]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const precisePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const cleanups: Array<() => void> = [];

    const context = gsap.context(() => {
      if (reducedMotion.matches) {
        gsap.set(cards, { clearProps: "all" });
        return;
      }

      const headingParts = section
        ? Array.from(section.querySelectorAll<HTMLElement>("[data-security-training-heading] > div > *"))
        : [];
      if (headingParts.length) {
        gsap.from(headingParts, {
          autoAlpha: 0,
          y: 24,
          duration: 0.8,
          stagger: 0.13,
          ease: "power3.out",
          scrollTrigger: { trigger: headingParts[0].parentElement, start: "top 85%", once: true },
        });
      }

      gsap.from(cards, {
        autoAlpha: 0,
        y: 35,
        scale: 0.985,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility",
        scrollTrigger: { trigger: grid, start: "top 85%", once: true },
      });

      if (!precisePointer.matches) return;
      tilts.forEach((tilt) => {
        const move = (event: PointerEvent) => {
          const bounds = tilt.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          gsap.to(tilt, { rotateX: y * -8, rotateY: x * 8, duration: 0.38, ease: "power2.out", overwrite: "auto" });
        };
        const leave = () => gsap.to(tilt, { rotateX: 0, rotateY: 0, duration: 0.75, ease: "elastic.out(1, 0.5)", overwrite: "auto" });
        tilt.addEventListener("pointermove", move);
        tilt.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          tilt.removeEventListener("pointermove", move);
          tilt.removeEventListener("pointerleave", leave);
          gsap.killTweensOf(tilt);
        });
      });
    }, section ?? grid);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, []);

  return (
    <div ref={gridRef} data-security-training-grid className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
      {formations.map((item, index) => {
        const detail = cardDetails[index];
        return (
          <div
            key={item.slug}
            data-security-training-card
            className={`group transition-transform duration-500 ease-out hover:-translate-y-2 motion-reduce:transform-none ${index < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
          >
            <Link
              href={item.slug}
              aria-label={`Découvrir ${item.title}`}
              data-security-training-tilt
              className="relative flex h-full min-h-[17rem] cursor-pointer flex-col overflow-hidden rounded-3xl border border-academy-line bg-academy-surface p-6 text-academy-ink shadow-card outline-none transition-[border-color,box-shadow] duration-500 [perspective:1000px] [transform-style:preserve-3d] hover:border-[color:var(--card-accent)] hover:shadow-[0_30px_75px_rgba(54,40,20,.22)] focus-visible:ring-2 focus-visible:ring-academy-gold focus-visible:ring-offset-4 focus-visible:ring-offset-academy-bg motion-reduce:transition-none"
              style={{ "--card-accent": detail.accent } as React.CSSProperties}
            >
              <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[color:var(--card-accent)] opacity-[.07] blur-2xl transition duration-500 group-hover:scale-125 group-hover:opacity-[.13]" aria-hidden="true" />
              <span className="relative flex items-start justify-between gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[color:var(--card-accent)] bg-academy-bg text-xl text-[color:var(--card-accent)] transition-transform duration-500 group-hover:-rotate-[5deg] group-hover:scale-[1.08]" aria-hidden="true">{detail.icon}</span>
                <span className="rounded-full border border-academy-line bg-academy-elevated px-3 py-1 text-xs font-black">{item.duration}</span>
              </span>
              <span className="relative mt-5 flex items-center gap-3 text-[0.68rem] font-black uppercase tracking-[.2em] text-academy-muted">
                <span>{detail.number}</span><span className="h-px w-6 bg-academy-line" aria-hidden="true" /><span>{detail.category}</span>
              </span>
              <span className="relative mt-4 text-xl font-black leading-tight">{item.title}</span>
              <span className="relative mt-3 text-sm leading-6 text-academy-muted">{item.short}</span>
              <span className="relative mt-auto flex items-center gap-2 pt-6 text-sm font-black">
                <span>Découvrir</span><span className="grid h-8 w-8 place-items-center rounded-full bg-academy-ink text-white transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
