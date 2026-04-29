"use client";

import type Lenis from "lenis";
import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

declare global {
  interface Window {
    __molongloLenis?: Lenis;
  }
}

function getHeaderOffset() {
  if (typeof window === "undefined") {
    return 80;
  }

  const value = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--site-header-height"));
  return Number.isFinite(value) && value > 0 ? value : 80;
}

function findHashTarget(hash: string) {
  if (!hash || hash === "#") {
    return null;
  }

  const decodedHash = decodeURIComponent(hash);
  const id = decodedHash.slice(1);

  return document.getElementById(id) ?? document.querySelector<HTMLElement>(decodedHash);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const root = document.documentElement;
    const updateHeaderHeight = () => {
      const header = document.querySelector<HTMLElement>("[data-site-header]");
      const nextHeight = Math.round(header?.getBoundingClientRect().height ?? 80);
      root.style.setProperty("--site-header-height", `${nextHeight}px`);
    };

    updateHeaderHeight();

    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const observer = header ? new ResizeObserver(updateHeaderHeight) : null;
    if (header && observer) {
      observer.observe(header);
    }
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion) {
      return;
    }

    let isDisposed = false;
    let lenis: Lenis | null = null;
    let rafId = 0;
    let removeAnchorHandler = () => {};

    const setupLenis = async () => {
      const { default: Lenis } = await import("lenis");
      if (isDisposed) {
        return;
      }

      lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1
      });

      window.__molongloLenis = lenis;

      const frame = (time: number) => {
        lenis?.raf(time);
        rafId = window.requestAnimationFrame(frame);
      };

      rafId = window.requestAnimationFrame(frame);

      const forwardScrollEvent = () => {
        window.dispatchEvent(new Event("scroll"));
      };

      lenis.on("scroll", forwardScrollEvent);

      const onAnchorClick = (event: MouseEvent) => {
        const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
        if (!target) {
          return;
        }

        const href = target.getAttribute("href");
        if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) {
          return;
        }

        const url = new URL(href, window.location.href);
        const isSamePage = url.origin === window.location.origin && url.pathname === window.location.pathname;
        if (!isSamePage || !url.hash) {
          return;
        }

        const anchorTarget = findHashTarget(url.hash);
        if (!anchorTarget) {
          return;
        }

        event.preventDefault();
        window.history.pushState(null, "", url.hash);
        lenis?.scrollTo(anchorTarget, { offset: -getHeaderOffset() - 16 });
      };

      document.addEventListener("click", onAnchorClick);
      removeAnchorHandler = () => {
        document.removeEventListener("click", onAnchorClick);
      };

      if (window.location.hash) {
        window.requestAnimationFrame(() => {
          const anchorTarget = findHashTarget(window.location.hash);
          if (anchorTarget) {
            lenis?.scrollTo(anchorTarget, { immediate: true, offset: -getHeaderOffset() - 16 });
          }
        });
      }
    };

    setupLenis();

    return () => {
      isDisposed = true;
      removeAnchorHandler();
      window.cancelAnimationFrame(rafId);
      lenis?.destroy();
      delete window.__molongloLenis;
    };
  }, [prefersReducedMotion]);

  return children;
}
