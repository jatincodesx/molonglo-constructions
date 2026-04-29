"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import { HouseWalkthroughFallback, type HouseWalkthroughStep } from "./HouseWalkthroughFallback";
import { HouseWalkthroughObject } from "./HouseWalkthroughObject";
import styles from "./HouseWalkthroughScene.module.css";

const walkthroughSteps: HouseWalkthroughStep[] = [
  {
    title: "Your new home starts before construction begins.",
    body: "We begin by understanding your vision, block, budget and the way you want to live."
  },
  {
    title: "Every angle is considered.",
    body: "Design choices are shaped around the site, lifestyle and long-term value of the home."
  },
  {
    title: "Step into the plan.",
    body: "The concept moves from conversation into drawings, selections and buildable detail."
  },
  {
    title: "Inside, the design becomes practical.",
    body: "Layouts, finishes and details are refined so the home works before construction starts."
  },
  {
    title: "The structure starts to rise.",
    body: "Coordinated trades and careful site management bring the build together."
  },
  {
    title: "Details are checked, refined and finished.",
    body: "Quality control continues through the build so the final result feels complete."
  },
  {
    title: "Ready for handover.",
    body: "Your completed home is handed over with documentation, support and confidence.",
    cta: {
      href: "/contact",
      label: "Start Your Build Journey"
    }
  }
];

export function HouseWalkthroughScene() {
  const rootRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isEnhanced, setIsEnhanced] = useState(false);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let isMounted = true;

    async function setupWalkthrough() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      if (!isMounted || !rootRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      let matchMedia: ReturnType<typeof gsap.matchMedia> | undefined;

      const ctx = gsap.context(() => {
        const root = rootRef.current;
        if (!root) return;

        const stage = root.querySelector<HTMLElement>("[data-walkthrough-stage]");
        if (!stage) return;

        const camera = stage.querySelector<HTMLElement>("[data-house-camera]");
        const house = stage.querySelector<HTMLElement>("[data-house-object]");
        const land = stage.querySelector<HTMLElement>("[data-house-land]");
        const exterior = stage.querySelector<HTMLElement>("[data-house-exterior]");
        const front = stage.querySelector<HTMLElement>("[data-house-front]");
        const side = stage.querySelector<HTMLElement>("[data-house-side]");
        const roof = stage.querySelector<HTMLElement>("[data-house-roof]");
        const door = stage.querySelector<HTMLElement>("[data-house-door]");
        const doorGlow = stage.querySelector<HTMLElement>("[data-house-door-glow]");
        const interior = stage.querySelector<HTMLElement>("[data-house-interior]");
        const blueprintGrid = stage.querySelector<HTMLElement>("[data-blueprint-grid]");
        const finalGlow = stage.querySelector<HTMLElement>("[data-final-glow]");
        const handoverKey = stage.querySelector<HTMLElement>("[data-handover-key]");
        const progressFill = stage.querySelector<HTMLElement>("[data-progress-fill]");
        const frameLines = Array.from(stage.querySelectorAll<HTMLElement>("[data-frame-line]"));
        const detailMarkers = Array.from(stage.querySelectorAll<HTMLElement>("[data-detail-marker]"));
        const panels = Array.from(stage.querySelectorAll<HTMLElement>("[data-chapter-panel]"));
        const dots = Array.from(stage.querySelectorAll<HTMLElement>("[data-progress-dot]"));

        if (
          !camera ||
          !house ||
          !land ||
          !exterior ||
          !front ||
          !side ||
          !roof ||
          !door ||
          !doorGlow ||
          !interior ||
          !blueprintGrid ||
          !finalGlow ||
          !handoverKey ||
          !progressFill ||
          panels.length === 0
        ) {
          return;
        }

        matchMedia = gsap.matchMedia();

        matchMedia.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
          root.setAttribute("data-enhanced", "true");
          if (isMounted) setIsEnhanced(true);
          stage.getBoundingClientRect();

          gsap.set(camera, { xPercent: 0, y: 0, scale: 0.92, transformOrigin: "50% 58%" });
          gsap.set(house, { rotateX: 4, rotateY: -8, rotateZ: 0, xPercent: 0, y: 0, transformOrigin: "50% 70%" });
          gsap.set(land, { x: 0, y: 0, rotateZ: 0 });
          gsap.set(exterior, { autoAlpha: 1, filter: "blur(0px)" });
          gsap.set([front, side, roof, door], { autoAlpha: 1, filter: "blur(0px)", x: 0, y: 0, rotateY: 0 });
          gsap.set(doorGlow, { autoAlpha: 0.25, scale: 0.85 });
          gsap.set(interior, { autoAlpha: 0, scale: 0.96 });
          gsap.set(blueprintGrid, { autoAlpha: 0 });
          gsap.set(frameLines, { scaleX: 0, transformOrigin: "left center" });
          gsap.set(detailMarkers, { autoAlpha: 0, scale: 0.74, y: 12 });
          gsap.set(handoverKey, { autoAlpha: 0, scale: 0.7, y: 26 });
          gsap.set(finalGlow, { autoAlpha: 0, scale: 0.85 });
          gsap.set(progressFill, { scaleX: 0, transformOrigin: "left center" });
          gsap.set(panels, { autoAlpha: 0, y: 26 });
          gsap.set(panels[0], { autoAlpha: 1, y: 0 });
          gsap.set(dots, { autoAlpha: 0.45, scale: 0.78 });
          if (dots[0]) gsap.set(dots[0], { autoAlpha: 1, scale: 1 });

          const timeline = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: "+=5000",
              scrub: 0.8,
              pin: true,
              anticipatePin: 1,
              pinSpacing: true,
              invalidateOnRefresh: true,
              markers: false
            }
          });

          timeline.to(progressFill, { scaleX: 1, duration: 6, ease: "none" }, 0);

          for (let index = 1; index < panels.length; index += 1) {
            timeline.to(panels[index - 1], { autoAlpha: 0, y: -22, duration: 0.26, ease: "power1.out" }, index - 0.15);
            timeline.to(panels[index], { autoAlpha: 1, y: 0, duration: 0.36, ease: "power2.out" }, index - 0.02);

            if (dots[index - 1]) {
              timeline.to(dots[index - 1], { autoAlpha: 0.45, scale: 0.78, duration: 0.2 }, index - 0.08);
            }

            if (dots[index]) {
              timeline.to(dots[index], { autoAlpha: 1, scale: 1, duration: 0.2 }, index - 0.04);
            }
          }

          timeline
            .to(house, { rotateY: -34, rotateX: 3, xPercent: 5, y: -8, duration: 0.9 }, 0.82)
            .to(land, { x: -42, y: 10, rotateZ: -2, duration: 0.9 }, 0.82)
            .to(side, { filter: "brightness(1.08)", duration: 0.55 }, 0.98)
            .to(camera, { scale: 1.42, xPercent: -5, y: 34, duration: 1 }, 1.76)
            .to(house, { rotateY: -10, rotateX: 2, xPercent: 0, duration: 1 }, 1.76)
            .to(doorGlow, { autoAlpha: 0.9, scale: 1.36, duration: 0.75 }, 1.92)
            .to(door, { scaleY: 1.08, transformOrigin: "center bottom", duration: 0.7 }, 2)
            .to(front, { x: -86, rotateY: 10, autoAlpha: 0.18, filter: "blur(2px)", duration: 0.9 }, 2.78)
            .to(side, { x: 90, rotateY: -18, autoAlpha: 0.14, filter: "blur(2px)", duration: 0.9 }, 2.78)
            .to(roof, { y: -74, autoAlpha: 0.08, filter: "blur(2px)", duration: 0.9 }, 2.78)
            .to(camera, { scale: 1.12, xPercent: 0, y: 0, duration: 1 }, 2.78)
            .to(interior, { autoAlpha: 1, scale: 1, duration: 0.85 }, 2.92)
            .to(blueprintGrid, { autoAlpha: 0.58, duration: 0.85 }, 3.02)
            .to(exterior, { autoAlpha: 0, duration: 0.62 }, 3.64)
            .to(frameLines, { scaleX: 1, stagger: 0.09, duration: 0.75, ease: "power2.out" }, 3.8)
            .to(camera, { scale: 1.22, xPercent: -3, y: -10, duration: 0.9 }, 4.82)
            .to(detailMarkers, { autoAlpha: 1, scale: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)" }, 4.88)
            .to(blueprintGrid, { autoAlpha: 0.28, duration: 0.7 }, 5.25)
            .to(camera, { scale: 1, xPercent: 0, y: 0, duration: 0.9 }, 5.74)
            .to(finalGlow, { autoAlpha: 1, scale: 1.14, duration: 0.85 }, 5.78)
            .to(handoverKey, { autoAlpha: 1, scale: 1, y: 0, duration: 0.65, ease: "back.out(1.55)" }, 5.92);

          return () => {
            root.setAttribute("data-enhanced", "false");
            if (isMounted) setIsEnhanced(false);
          };
        });

      }, rootRef);

      cleanup = () => {
        matchMedia?.revert();
        ctx.revert();
      };
    }

    setupWalkthrough();

    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className={styles.section}
      data-enhanced={isEnhanced ? "true" : "false"}
      data-reduced-motion={prefersReducedMotion ? "true" : "false"}
      aria-labelledby="house-walkthrough-heading"
    >
      <div className={styles.intro}>
        <p className={styles.eyebrow}>From vision to handover</p>
        <h2 id="house-walkthrough-heading">A cinematic look at the way your home comes together.</h2>
        <p>
          Scroll through the journey from first brief to final handover, with the build process shown as a walkthrough rather than a list of disconnected milestones.
        </p>
      </div>

      <div className={styles.desktopStage} data-walkthrough-stage>
        <div className={styles.pinInner}>
          <div className={styles.visualPane}>
            <HouseWalkthroughObject />
          </div>

          <div className={styles.copyPane}>
            <div className={styles.progressHeader} aria-hidden="true">
              <span>01</span>
              <span className={styles.progressTrack}>
                <span data-progress-fill className={styles.progressFill} />
              </span>
              <span>07</span>
            </div>

            <ol className={styles.chapterStack}>
              {walkthroughSteps.map((step, index) => (
                <li key={step.title} className={styles.chapterPanel} data-chapter-panel>
                  <article>
                    <p className={styles.stepKicker}>Step {index + 1} / 7</p>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                    {step.cta ? (
                      <Link href={step.cta.href} className={styles.sceneCta}>
                        {step.cta.label}
                      </Link>
                    ) : null}
                  </article>
                </li>
              ))}
            </ol>

            <div className={styles.progressDots} aria-hidden="true">
              {walkthroughSteps.map((step, index) => (
                <span key={step.title} data-progress-dot>
                  {index + 1}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <HouseWalkthroughFallback steps={walkthroughSteps} />
    </section>
  );
}
