"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

type PremiumScrollShellProps = {
  children: React.ReactNode;
  className?: string;
  mode?: "cinematic" | "light" | "editorial";
};

export function PremiumScrollShell({ children, className = "", mode = "light" }: PremiumScrollShellProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || mode === "editorial") return;

    let cleanup: (() => void) | undefined;
    let isMounted = true;

    async function setup() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (!isMounted || !rootRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const root = rootRef.current;
        if (!root) return;

        const reveals = gsap.utils.toArray<HTMLElement>("[data-scroll-reveal]");
        reveals.forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 82%",
                once: true
              }
            }
          );
        });

        const chapters = gsap.utils.toArray<HTMLElement>("[data-home-chapter]");
        const object = root.querySelector<HTMLElement>("[data-architectural-object]");

        if (object && mode === "cinematic" && chapters.length > 1) {
          const states = [
            { "--object-rotate-y": "-12deg", "--object-rotate-x": "4deg", "--object-scale": "0.94", "--object-entry": "0", "--object-blueprint": "0", "--object-construction": "0", "--object-finished": "0" },
            { "--object-rotate-y": "-34deg", "--object-rotate-x": "3deg", "--object-scale": "0.98", "--object-entry": "0.18", "--object-blueprint": "0", "--object-construction": "0", "--object-finished": "0" },
            { "--object-rotate-y": "-8deg", "--object-rotate-x": "2deg", "--object-scale": "1.18", "--object-entry": "0.78", "--object-blueprint": "0.1", "--object-construction": "0", "--object-finished": "0" },
            { "--object-rotate-y": "0deg", "--object-rotate-x": "0deg", "--object-scale": "1.02", "--object-entry": "0.35", "--object-blueprint": "0.82", "--object-construction": "0.18", "--object-finished": "0" },
            { "--object-rotate-y": "18deg", "--object-rotate-x": "2deg", "--object-scale": "1.08", "--object-entry": "0.16", "--object-blueprint": "0.56", "--object-construction": "0.8", "--object-finished": "0.06" },
            { "--object-rotate-y": "-4deg", "--object-rotate-x": "1deg", "--object-scale": "1", "--object-entry": "0", "--object-blueprint": "0.18", "--object-construction": "0.3", "--object-finished": "0.92" }
          ];

          gsap.set(object, states[0]);

          chapters.forEach((chapter, index) => {
            const state = states[Math.min(index, states.length - 1)];
            ScrollTrigger.create({
              trigger: chapter,
              start: "top center",
              end: "bottom center",
              onEnter: () => gsap.to(object, { ...state, duration: 0.85, ease: "power2.out" }),
              onEnterBack: () => gsap.to(object, { ...state, duration: 0.85, ease: "power2.out" })
            });
          });
        }
      }, rootRef);

      cleanup = () => ctx.revert();
    }

    setup();

    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, [mode, prefersReducedMotion]);

  return (
    <div
      ref={rootRef}
      className={`premium-scroll-root ${className}`}
      data-scroll-mode={mode}
      data-reduced-motion={prefersReducedMotion ? "true" : "false"}
    >
      {children}
    </div>
  );
}
