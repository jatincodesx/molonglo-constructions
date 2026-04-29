"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HouseJourneyObject, type HouseJourneyStage } from "@/components/home/HouseJourneyObject";
import { HomeStaticJourneyFallback } from "@/components/home/HomeStaticJourneyFallback";
import { ScrollChapter } from "@/components/home/ScrollChapter";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import styles from "./HomeScrollJourney.module.css";

const chapters: Array<{
  body: string;
  ctaHref?: string;
  ctaLabel?: string;
  stage: HouseJourneyStage;
  title: string;
}> = [
  {
    title: "A home starts with a clear vision",
    body: "Every successful build begins with understanding the land, lifestyle, budget and outcome you want.",
    stage: "land"
  },
  {
    title: "Your ideas become a buildable plan",
    body: "Design decisions are shaped into practical drawings, selections and a clear direction for the home.",
    stage: "blueprint"
  },
  {
    title: "Approvals are handled before momentum builds",
    body: "Documentation, approvals and contracts are organised so the project can move forward with clarity.",
    stage: "approval"
  },
  {
    title: "The structure starts to rise",
    body: "The frame, form and structure begin to take shape through coordinated trades and careful site work.",
    stage: "frame"
  },
  {
    title: "Craftsmanship turns structure into detail",
    body: "Materials, finishes and construction details come together with attention to quality and consistency.",
    stage: "construction"
  },
  {
    title: "Every detail is checked before handover",
    body: "Final checks help ensure the completed home meets expectations before you receive the keys.",
    stage: "inspection"
  },
  {
    title: "Your home is ready for handover",
    body: "The process ends with a completed home, clear documentation and support as you move into the next stage.",
    stage: "handover",
    ctaLabel: "Start Your Build Journey",
    ctaHref: "/contact"
  }
];

function readHeaderOffset() {
  if (typeof window === "undefined") {
    return 80;
  }

  const value = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--site-header-height"));
  return Number.isFinite(value) && value > 0 ? value : 80;
}

export function HomeScrollJourney() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const activeChapterRef = useRef(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [isEnhancedDesktop, setIsEnhancedDesktop] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) {
      setActiveChapter(0);
      setIsEnhancedDesktop(false);
      setProgress(0);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();

    media.add("(min-width: 1024px)", () => {
      setIsEnhancedDesktop(true);
      const context = gsap.context(() => {
        const query = gsap.utils.selector(section);
        const viewport = query("[data-house-viewport]")[0];
        const blueprintGrid = query("[data-blueprint-grid]")[0];
        const landOutline = query("[data-land-outline]")[0];
        const measurementLines = query("[data-measurement-lines]")[0];
        const approvalCard = query("[data-approval-card]")[0];
        const frameLines = query("[data-frame-lines]")[0];
        const houseShell = query("[data-house-shell]")[0];
        const windows = query("[data-window-group]")[0];
        const pins = query("[data-detail-pin]");
        const glow = query("[data-final-glow]")[0];
        const keySymbol = query("[data-key-symbol]")[0];
        const scene = query("[data-journey-scene]")[0];
        const lenis = window.__molongloLenis;

        if (!viewport || !scene) {
          return;
        }

        lenis?.on("scroll", ScrollTrigger.update);

        gsap.set(viewport, {
          rotateY: -14,
          rotateX: 10,
          scale: 0.92,
          transformPerspective: 1400,
          transformOrigin: "center center"
        });
        gsap.set(blueprintGrid, { autoAlpha: 0.14, scale: 0.96 });
        gsap.set(landOutline, { autoAlpha: 0.94, yPercent: 0 });
        gsap.set(measurementLines, { autoAlpha: 0, xPercent: 8 });
        gsap.set(approvalCard, { autoAlpha: 0, xPercent: 16, yPercent: -8, rotate: -5 });
        gsap.set(frameLines, { autoAlpha: 0.18 });
        gsap.set(houseShell, { autoAlpha: 0.74 });
        gsap.set(windows, { autoAlpha: 0.34 });
        gsap.set(pins, { autoAlpha: 0, scale: 0.78, transformOrigin: "center center" });
        gsap.set(glow, { autoAlpha: 0.2, scale: 0.84, transformOrigin: "center center" });
        gsap.set(keySymbol, { autoAlpha: 0, yPercent: 24, scale: 0.78, transformOrigin: "center center" });

        const states = [
          {
            viewport: { rotateY: -14, rotateX: 10, scale: 0.92 },
            blueprintGrid: { autoAlpha: 0.14, scale: 0.96 },
            landOutline: { autoAlpha: 0.94, yPercent: 0 },
            measurementLines: { autoAlpha: 0, xPercent: 8 },
            approvalCard: { autoAlpha: 0, xPercent: 16, yPercent: -8, rotate: -5 },
            frameLines: { autoAlpha: 0.18 },
            houseShell: { autoAlpha: 0.74 },
            windows: { autoAlpha: 0.34 },
            pins: { autoAlpha: 0, scale: 0.78 },
            glow: { autoAlpha: 0.2, scale: 0.84 },
            keySymbol: { autoAlpha: 0, yPercent: 24, scale: 0.78 }
          },
          {
            viewport: { rotateY: 9, rotateX: 8, scale: 0.97 },
            blueprintGrid: { autoAlpha: 0.74, scale: 1.02 },
            landOutline: { autoAlpha: 0.58, yPercent: -4 },
            measurementLines: { autoAlpha: 0.95, xPercent: 0 },
            approvalCard: { autoAlpha: 0, xPercent: 16, yPercent: -8, rotate: -5 },
            frameLines: { autoAlpha: 0.24 },
            houseShell: { autoAlpha: 0.82 },
            windows: { autoAlpha: 0.42 },
            pins: { autoAlpha: 0, scale: 0.78 },
            glow: { autoAlpha: 0.3, scale: 0.9 },
            keySymbol: { autoAlpha: 0, yPercent: 24, scale: 0.78 }
          },
          {
            viewport: { rotateY: -5, rotateX: 7, scale: 1 },
            blueprintGrid: { autoAlpha: 0.54, scale: 1.01 },
            landOutline: { autoAlpha: 0.42, yPercent: -6 },
            measurementLines: { autoAlpha: 0.56, xPercent: -4 },
            approvalCard: { autoAlpha: 1, xPercent: 0, yPercent: 0, rotate: -3 },
            frameLines: { autoAlpha: 0.3 },
            houseShell: { autoAlpha: 0.86 },
            windows: { autoAlpha: 0.5 },
            pins: { autoAlpha: 0, scale: 0.78 },
            glow: { autoAlpha: 0.38, scale: 0.96 },
            keySymbol: { autoAlpha: 0, yPercent: 24, scale: 0.78 }
          },
          {
            viewport: { rotateY: 0, rotateX: 6, scale: 1.05 },
            blueprintGrid: { autoAlpha: 0.28, scale: 1.03 },
            landOutline: { autoAlpha: 0.22, yPercent: -10 },
            measurementLines: { autoAlpha: 0.22, xPercent: -8 },
            approvalCard: { autoAlpha: 0.3, xPercent: -8, yPercent: -3, rotate: -6 },
            frameLines: { autoAlpha: 1 },
            houseShell: { autoAlpha: 0.9 },
            windows: { autoAlpha: 0.62 },
            pins: { autoAlpha: 0, scale: 0.78 },
            glow: { autoAlpha: 0.48, scale: 1.02 },
            keySymbol: { autoAlpha: 0, yPercent: 24, scale: 0.78 }
          },
          {
            viewport: { rotateY: 3, rotateX: 5, scale: 1.08 },
            blueprintGrid: { autoAlpha: 0.14, scale: 1.04 },
            landOutline: { autoAlpha: 0.14, yPercent: -14 },
            measurementLines: { autoAlpha: 0.08, xPercent: -12 },
            approvalCard: { autoAlpha: 0.12, xPercent: -16, yPercent: -6, rotate: -7 },
            frameLines: { autoAlpha: 1 },
            houseShell: { autoAlpha: 0.96 },
            windows: { autoAlpha: 0.82 },
            pins: { autoAlpha: 0.4, scale: 0.92 },
            glow: { autoAlpha: 0.58, scale: 1.08 },
            keySymbol: { autoAlpha: 0, yPercent: 24, scale: 0.78 }
          },
          {
            viewport: { rotateY: 1, rotateX: 4, scale: 1.1 },
            blueprintGrid: { autoAlpha: 0.08, scale: 1.05 },
            landOutline: { autoAlpha: 0.08, yPercent: -16 },
            measurementLines: { autoAlpha: 0, xPercent: -14 },
            approvalCard: { autoAlpha: 0, xPercent: -20, yPercent: -8, rotate: -8 },
            frameLines: { autoAlpha: 1 },
            houseShell: { autoAlpha: 1 },
            windows: { autoAlpha: 1 },
            pins: { autoAlpha: 1, scale: 1 },
            glow: { autoAlpha: 0.78, scale: 1.14 },
            keySymbol: { autoAlpha: 0.18, yPercent: 10, scale: 0.92 }
          },
          {
            viewport: { rotateY: 0, rotateX: 2, scale: 1.14 },
            blueprintGrid: { autoAlpha: 0.04, scale: 1.06 },
            landOutline: { autoAlpha: 0.02, yPercent: -18 },
            measurementLines: { autoAlpha: 0, xPercent: -16 },
            approvalCard: { autoAlpha: 0, xPercent: -24, yPercent: -10, rotate: -10 },
            frameLines: { autoAlpha: 0.72 },
            houseShell: { autoAlpha: 1 },
            windows: { autoAlpha: 1 },
            pins: { autoAlpha: 1, scale: 1 },
            glow: { autoAlpha: 1, scale: 1.2 },
            keySymbol: { autoAlpha: 1, yPercent: 0, scale: 1 }
          }
        ] as const;

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: scene,
            pin: true,
            pinSpacing: true,
            scrub: 0.9,
            anticipatePin: 1,
            start: () => `top top+=${readHeaderOffset()}`,
            end: () => `+=${Math.round(window.innerHeight * chapters.length * 0.7)}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const nextProgress = self.progress;
              const nextChapter = Math.min(chapters.length - 1, Math.round(nextProgress * (chapters.length - 1)));

              setProgress(nextProgress);

              if (nextChapter !== activeChapterRef.current) {
                activeChapterRef.current = nextChapter;
                setActiveChapter(nextChapter);
              }
            }
          }
        });

        for (let index = 1; index < states.length; index += 1) {
          timeline
            .to(viewport, { ...states[index].viewport, duration: 1 }, ">")
            .to(blueprintGrid, { ...states[index].blueprintGrid, duration: 1 }, "<")
            .to(landOutline, { ...states[index].landOutline, duration: 1 }, "<")
            .to(measurementLines, { ...states[index].measurementLines, duration: 1 }, "<")
            .to(approvalCard, { ...states[index].approvalCard, duration: 1 }, "<")
            .to(frameLines, { ...states[index].frameLines, duration: 1 }, "<")
            .to(houseShell, { ...states[index].houseShell, duration: 1 }, "<")
            .to(windows, { ...states[index].windows, duration: 1 }, "<")
            .to(pins, { ...states[index].pins, duration: 1, stagger: 0.04 }, "<")
            .to(glow, { ...states[index].glow, duration: 1 }, "<")
            .to(keySymbol, { ...states[index].keySymbol, duration: 1 }, "<")
            .to({}, { duration: 0.4 });
        }

        ScrollTrigger.refresh();

        return () => {
          lenis?.off?.("scroll", ScrollTrigger.update);
        };
      }, section);

      return () => {
        setIsEnhancedDesktop(false);
        context.revert();
      };
    });

    return () => {
      setIsEnhancedDesktop(false);
      media.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={styles.journeySection}
      aria-labelledby="home-scroll-journey-title"
      data-enhanced={isEnhancedDesktop ? "true" : "false"}
      data-force-fallback={prefersReducedMotion ? "true" : "false"}
    >
      <div className="container">
        <div className={styles.desktopScene} data-journey-scene="">
          <div className={styles.sceneGrid}>
            <div className={styles.copyColumn}>
              <p className="eyebrow text-white/70">The Molonglo build journey</p>
              <h2 id="home-scroll-journey-title" className={styles.sceneTitle}>
                One construction story, told chapter by chapter as the home takes shape.
              </h2>
              <p className={styles.sceneLead}>
                Scroll moves from site vision to handover. The content stays crawlable, the motion stays purposeful, and the visual language mirrors the real sequence of a premium Canberra build.
              </p>

              <ScrollProgress chapters={chapters} activeIndex={activeChapter} progress={progress} />

              <div className={styles.chapterStack}>
                {chapters.map((chapter, index) => (
                  <ScrollChapter
                    key={chapter.title}
                    body={chapter.body}
                    ctaHref={chapter.ctaHref}
                    ctaLabel={chapter.ctaLabel}
                    index={index}
                    isActive={index === activeChapter}
                    title={chapter.title}
                  />
                ))}
              </div>
            </div>

            <div className={styles.objectColumn}>
              <HouseJourneyObject stage="land" />
            </div>
          </div>
        </div>

        <div className={styles.fallbackWrap}>
          <HomeStaticJourneyFallback chapters={chapters} />
        </div>
      </div>
    </section>
  );
}
