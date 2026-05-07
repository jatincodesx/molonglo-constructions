"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export type HeroImageItem = {
  src: string;
  label: string;
};

type RotatingHeroImageProps = {
  images: HeroImageItem[];
};

export function RotatingHeroImage({ images }: RotatingHeroImageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const uniqueImages = useMemo(
    () => images.filter((image, index, list) => list.findIndex((item) => item.src === image.src) === index),
    [images]
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion || uniqueImages.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % uniqueImages.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [reducedMotion, uniqueImages.length]);

  const activeImage = uniqueImages[activeIndex] || uniqueImages[0];

  return (
    <>
      <div className="home-hero__image-stack" aria-hidden="true">
        {uniqueImages.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt=""
            width={1200}
            height={900}
            priority={index === 0}
            sizes="(min-width: 1024px) 48vw, 100vw"
            className={`home-hero__image ${index === activeIndex ? "home-hero__image--active" : ""}`}
          />
        ))}
      </div>
      <div className="home-hero__caption">
        <span>Canberra & ACT residential builder</span>
        <strong>Custom homes, rebuilds and premium residential projects.</strong>
        {activeImage ? <small>{activeImage.label}</small> : null}
      </div>
    </>
  );
}
