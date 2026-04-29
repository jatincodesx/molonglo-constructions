"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./BuildJourneyScrollStory.module.css";

const steps = [
  {
    title: "Initial Consultation",
    body: "We meet to understand your vision, requirements and budget before shaping the right pathway for your new home."
  },
  {
    title: "Design & Planning",
    body: "Plans, layouts and selections are refined so the home feels considered before construction begins."
  },
  {
    title: "Approvals & Contracts",
    body: "The required documentation, approvals and contracts are organised with clarity before work moves ahead."
  },
  {
    title: "Construction",
    body: "The build comes to life through coordinated trades, quality workmanship and clear communication."
  },
  {
    title: "Final Inspection",
    body: "Every detail is checked carefully so the completed home meets the expected standard before handover."
  },
  {
    title: "Handover",
    body: "You receive your completed home with the documentation and support needed to move forward with confidence."
  }
];

export function BuildJourneyScrollStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const storyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const story = storyRef.current;

    if (!section || !story) {
      return;
    }

    const media = gsap.matchMedia();

    media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      section.classList.add(styles.isEnhanced);

      const context = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-story-panel]");
        const markers = gsap.utils.toArray<HTMLElement>("[data-story-marker]");
        const progressFill = section.querySelector<HTMLElement>("[data-progress-fill]");
        const house = section.querySelector<HTMLElement>("[data-house]");
        const blueprint = section.querySelector<HTMLElement>("[data-blueprint]");
        const contour = section.querySelector<HTMLElement>("[data-contour]");
        const measure = section.querySelector<HTMLElement>("[data-measure]");
        const approval = section.querySelector<HTMLElement>("[data-approval]");
        const frame = section.querySelector<HTMLElement>("[data-frame]");
        const pins = gsap.utils.toArray<HTMLElement>("[data-pin]");
        const keyIcon = section.querySelector<HTMLElement>("[data-key]");
        const glow = section.querySelector<HTMLElement>("[data-glow]");
        const shell = section.querySelector<HTMLElement>("[data-shell]");
        const windows = section.querySelector<HTMLElement>("[data-windows]");
        const cta = section.querySelector<HTMLElement>("[data-cta]");

        gsap.set(panels, { autoAlpha: 0, yPercent: 10 });
        gsap.set(panels[0], { autoAlpha: 1, yPercent: 0 });
        gsap.set(markers, { opacity: 0.38, x: 0 });
        gsap.set(markers[0], { opacity: 1, x: 8 });
        gsap.set(progressFill, { scaleY: 0, transformOrigin: "top center" });
        gsap.set(house, {
          rotateY: -14,
          rotateX: 14,
          scale: 0.92,
          transformPerspective: 1400,
          transformOrigin: "center center"
        });
        gsap.set(blueprint, { autoAlpha: 0.12, scale: 0.98 });
        gsap.set(contour, { autoAlpha: 0.4, yPercent: 0 });
        gsap.set(measure, { autoAlpha: 0, xPercent: 8 });
        gsap.set(approval, { autoAlpha: 0, xPercent: 18, yPercent: -10, rotate: -6 });
        gsap.set(frame, { autoAlpha: 0.15 });
        gsap.set(pins, { autoAlpha: 0, scale: 0.65, transformOrigin: "center center" });
        gsap.set(keyIcon, { autoAlpha: 0, yPercent: 22, scale: 0.82, transformOrigin: "center center" });
        gsap.set(glow, { autoAlpha: 0.28, scale: 0.86, transformOrigin: "center center" });
        gsap.set(shell, { opacity: 0.65 });
        gsap.set(windows, { opacity: 0.42 });
        gsap.set(cta, { autoAlpha: 0.72, y: 0 });

        const scene = (index: number, config: {
          house: gsap.TweenVars;
          blueprint?: gsap.TweenVars;
          contour?: gsap.TweenVars;
          measure?: gsap.TweenVars;
          approval?: gsap.TweenVars;
          frame?: gsap.TweenVars;
          pins?: gsap.TweenVars;
          keyIcon?: gsap.TweenVars;
          glow?: gsap.TweenVars;
          shell?: gsap.TweenVars;
          windows?: gsap.TweenVars;
          cta?: gsap.TweenVars;
        }) => {
          if (index > 0) {
            gsap.set(panels[index], { autoAlpha: 0, yPercent: 10 });
          }

          const timeline = gsap.timeline();

          if (index > 0) {
            timeline
              .to(
                panels[index - 1],
                { autoAlpha: 0, yPercent: -8, duration: 0.32, ease: "power2.out" },
                0
              )
              .fromTo(
                panels[index],
                { autoAlpha: 0, yPercent: 10 },
                { autoAlpha: 1, yPercent: 0, duration: 0.36, ease: "power2.out" },
                0.08
              );
          }

          timeline
            .to(
              markers,
              {
                opacity: (markerIndex) => (markerIndex <= index ? 1 : 0.38),
                x: (markerIndex) => (markerIndex === index ? 8 : 0),
                duration: 0.28,
                stagger: 0.015
              },
              0
            )
            .to(
              progressFill,
              {
                scaleY: steps.length === 1 ? 1 : index / (steps.length - 1),
                duration: 0.35
              },
              0
            )
            .to(house, { duration: 0.55, ...config.house }, 0)
            .to(blueprint, { duration: 0.45, ...config.blueprint }, 0)
            .to(contour, { duration: 0.45, ...config.contour }, 0)
            .to(measure, { duration: 0.4, ...config.measure }, 0)
            .to(approval, { duration: 0.42, ...config.approval }, 0)
            .to(frame, { duration: 0.45, ...config.frame }, 0)
            .to(pins, { duration: 0.4, stagger: 0.05, ...config.pins }, 0)
            .to(keyIcon, { duration: 0.42, ...config.keyIcon }, 0)
            .to(glow, { duration: 0.45, ...config.glow }, 0)
            .to(shell, { duration: 0.4, ...config.shell }, 0)
            .to(windows, { duration: 0.35, ...config.windows }, 0)
            .to(cta, { duration: 0.35, ...config.cta }, 0);

          return timeline;
        };

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: story,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            start: "top top",
            end: "+=4200",
            invalidateOnRefresh: true
          }
        });

        timeline.to({}, { duration: 0.9 });

        timeline.add(
          scene(1, {
            house: { rotateY: 12, rotateX: 12, scale: 0.97 },
            blueprint: { autoAlpha: 0.55, scale: 1.02 },
            contour: { autoAlpha: 0.32, yPercent: -5 },
            measure: { autoAlpha: 0.92, xPercent: 0 },
            approval: { autoAlpha: 0, xPercent: 18, yPercent: -10, rotate: -6 },
            frame: { autoAlpha: 0.2 },
            pins: { autoAlpha: 0, scale: 0.65 },
            keyIcon: { autoAlpha: 0, yPercent: 22, scale: 0.82 },
            glow: { autoAlpha: 0.34, scale: 0.92 },
            shell: { opacity: 0.72 },
            windows: { opacity: 0.48 },
            cta: { autoAlpha: 0.72, y: 0 }
          })
        );
        timeline.to({}, { duration: 0.9 });

        timeline.add(
          scene(2, {
            house: { rotateY: -8, rotateX: 10, scale: 0.99 },
            blueprint: { autoAlpha: 0.46, scale: 1 },
            contour: { autoAlpha: 0.26, yPercent: -8 },
            measure: { autoAlpha: 0.58, xPercent: -3 },
            approval: { autoAlpha: 1, xPercent: 0, yPercent: 0, rotate: -3 },
            frame: { autoAlpha: 0.26 },
            pins: { autoAlpha: 0, scale: 0.65 },
            keyIcon: { autoAlpha: 0, yPercent: 22, scale: 0.82 },
            glow: { autoAlpha: 0.38, scale: 0.96 },
            shell: { opacity: 0.78 },
            windows: { opacity: 0.52 },
            cta: { autoAlpha: 0.72, y: 0 }
          })
        );
        timeline.to({}, { duration: 0.9 });

        timeline.add(
          scene(3, {
            house: { rotateY: -2, rotateX: 8, scale: 1.05 },
            blueprint: { autoAlpha: 0.22, scale: 1.02 },
            contour: { autoAlpha: 0.18, yPercent: -12 },
            measure: { autoAlpha: 0.18, xPercent: -6 },
            approval: { autoAlpha: 0.25, xPercent: -8, yPercent: -4, rotate: -5 },
            frame: { autoAlpha: 0.92 },
            pins: { autoAlpha: 0, scale: 0.65 },
            keyIcon: { autoAlpha: 0, yPercent: 22, scale: 0.82 },
            glow: { autoAlpha: 0.48, scale: 1.01 },
            shell: { opacity: 0.92 },
            windows: { opacity: 0.7 },
            cta: { autoAlpha: 0.72, y: 0 }
          })
        );
        timeline.to({}, { duration: 0.9 });

        timeline.add(
          scene(4, {
            house: { rotateY: 0, rotateX: 6, scale: 1.08 },
            blueprint: { autoAlpha: 0.16, scale: 1.03 },
            contour: { autoAlpha: 0.12, yPercent: -16 },
            measure: { autoAlpha: 0.1, xPercent: -10 },
            approval: { autoAlpha: 0.12, xPercent: -14, yPercent: -6, rotate: -6 },
            frame: { autoAlpha: 1 },
            pins: { autoAlpha: 1, scale: 1 },
            keyIcon: { autoAlpha: 0, yPercent: 22, scale: 0.82 },
            glow: { autoAlpha: 0.62, scale: 1.06 },
            shell: { opacity: 0.98 },
            windows: { opacity: 0.84 },
            cta: { autoAlpha: 0.72, y: 0 }
          })
        );
        timeline.to({}, { duration: 0.9 });

        timeline.add(
          scene(5, {
            house: { rotateY: 4, rotateX: 4, scale: 1.1 },
            blueprint: { autoAlpha: 0.08, scale: 1.05 },
            contour: { autoAlpha: 0.06, yPercent: -18 },
            measure: { autoAlpha: 0, xPercent: -12 },
            approval: { autoAlpha: 0, xPercent: -18, yPercent: -10, rotate: -8 },
            frame: { autoAlpha: 1 },
            pins: { autoAlpha: 0.55, scale: 0.92 },
            keyIcon: { autoAlpha: 1, yPercent: 0, scale: 1 },
            glow: { autoAlpha: 0.8, scale: 1.12 },
            shell: { opacity: 1 },
            windows: { opacity: 1 },
            cta: { autoAlpha: 1, y: -6 }
          })
        );
        timeline.to({}, { duration: 0.7 });
      }, section);

      return () => {
        context.revert();
        section.classList.remove(styles.isEnhanced);
      };
    });

    return () => {
      media.revert();
      section.classList.remove(styles.isEnhanced);
    };
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.section} surface-dark text-white`}>
      <div className="container">
        <div className={styles.intro}>
          <p className="eyebrow text-white/75">The Molonglo Build Journey</p>
          <h2 className={styles.heading}>From first conversation to final handover</h2>
          <p className={styles.description}>
            A refined process that turns your vision into a carefully planned, well-built home.
          </p>
        </div>

        <div ref={storyRef} className={styles.storyShell}>
          <div className={styles.visualColumn}>
            <div className={styles.visualFrame}>
              <div className={styles.world} aria-hidden="true">
                <div className={styles.contourField} data-contour />
                <div className={styles.blueprintGrid} data-blueprint />
                <div className={styles.glow} data-glow />

                <div className={styles.measurements} data-measure>
                  <span className={styles.measureTop}>SITE PLAN</span>
                  <span className={styles.measureSide}>ELEVATION</span>
                  <span className={styles.measureLineHorizontal} />
                  <span className={styles.measureLineVertical} />
                </div>

                <div className={styles.approvalCard} data-approval>
                  <span>Ready</span>
                  <strong>Approved</strong>
                </div>

                <div className={styles.houseWrap} data-house>
                  <div className={styles.houseShadow} />
                  <div className={styles.houseShell} data-shell>
                    <div className={styles.houseRoof} />
                    <div className={styles.houseFacade} />
                    <div className={styles.houseFrame} data-frame />
                    <div className={styles.windowGrid} data-windows>
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className={styles.door} />
                    <div className={styles.blueprintPlate} />
                  </div>
                </div>

                <div className={`${styles.detailPin} ${styles.pinOne}`} data-pin>
                  <span />
                  <em>Material review</em>
                </div>
                <div className={`${styles.detailPin} ${styles.pinTwo}`} data-pin>
                  <span />
                  <em>Quality check</em>
                </div>
                <div className={`${styles.detailPin} ${styles.pinThree}`} data-pin>
                  <span />
                  <em>Joinery detail</em>
                </div>

                <div className={styles.keyIcon} data-key>
                  <span className={styles.keyRing} />
                  <span className={styles.keyStem} />
                  <span className={styles.keyToothOne} />
                  <span className={styles.keyToothTwo} />
                </div>
              </div>

              <div className={styles.progressRail} aria-hidden="true">
                <div className={styles.progressTrack}>
                  <div className={styles.progressFill} data-progress-fill />
                </div>
                <div className={styles.progressMarkers}>
                  {steps.map((step, index) => (
                    <div key={step.title} className={styles.progressMarker} data-story-marker>
                      <span className={styles.progressDot} />
                      <span className={styles.progressLabel}>{`0${index + 1}`}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.contentColumn}>
            <ol className={styles.cardStack}>
              {steps.map((step, index) => (
                <li key={step.title} className={styles.card} data-story-panel>
                  <p className={styles.cardEyebrow}>{`Step 0${index + 1}`}</p>
                  <article>
                    <h3 className={styles.cardTitle}>{step.title}</h3>
                    <p className={styles.cardBody}>{step.body}</p>
                    {index === steps.length - 1 ? (
                      <Link href="/contact" className="cta mt-8 w-fit" data-cta>
                        Start Your Build Journey
                      </Link>
                    ) : null}
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
