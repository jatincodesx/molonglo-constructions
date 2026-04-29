"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

type MotionSectionProps = {
  as?: "article" | "aside" | "div" | "header" | "section";
  children: ReactNode;
  className?: string;
  once?: boolean;
  parallax?: number;
  staggerSelector?: string;
  threshold?: number;
};

export function MotionSection({
  as = "div",
  children,
  className,
  once = true,
  parallax,
  staggerSelector = "[data-motion-item]",
  threshold = 0.18
}: MotionSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(prefersReducedMotion);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsMounted(true);
      setIsVisible(true);
      return;
    }

    const element = sectionRef.current;
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    const initiallyVisible = rect.top <= viewportHeight * (1 - threshold);

    setIsVisible(initiallyVisible);
    setIsMounted(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold
      }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [once, prefersReducedMotion, threshold]);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) {
      return;
    }

    const motionItems = Array.from(element.querySelectorAll<HTMLElement>(staggerSelector));
    motionItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 90}ms`;
    });

    if (!parallax || prefersReducedMotion) {
      element.style.removeProperty("--motion-parallax-y");
      return;
    }

    const updateParallax = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const translateY = Math.max(-parallax, Math.min(parallax, (progress - 0.5) * parallax * 0.9));
      element.style.setProperty("--motion-parallax-y", `${translateY.toFixed(2)}px`);
    };

    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax);

    return () => {
      window.removeEventListener("scroll", updateParallax);
      window.removeEventListener("resize", updateParallax);
    };
  }, [parallax, prefersReducedMotion, staggerSelector]);

  const Component = as;
  const style = (parallax
    ? ({
        "--motion-parallax-max": `${parallax}px`
      } as CSSProperties)
    : undefined);

  return (
    <Component
      ref={sectionRef as never}
      data-motion-section=""
      data-mounted={isMounted ? "true" : "false"}
      data-visible={isVisible ? "true" : "false"}
      data-parallax={parallax ? "true" : "false"}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}
