"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ProjectGalleryProps = {
  images: string[];
  projectTitle: string;
  location: string;
};

export function ProjectGallery({ images, projectTitle, location }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((index) => index === null ? index : (index + 1) % images.length);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((index) => index === null ? index : (index - 1 + images.length) % images.length);
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, images.length]);

  return (
    <>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={index === 0 ? "group overflow-hidden rounded-lg border border-[var(--color-border)] bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold sm:col-span-2 lg:col-span-2" : "group overflow-hidden rounded-lg border border-[var(--color-border)] bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold"}
            aria-label={`Open ${projectTitle} gallery image ${index + 1}`}
          >
            <Image
              src={image}
              alt={`${projectTitle} gallery image ${index + 1} in ${location}`}
              width={1200}
              height={850}
              sizes={index === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
              className={index === 0 ? "h-[22rem] w-full object-cover transition duration-500 group-hover:scale-[1.03]" : "h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03]"}
            />
          </button>
        ))}
      </div>

      {activeImage ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${projectTitle} image preview`}
          className="fixed inset-0 z-[80] grid place-items-center bg-black/82 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setActiveIndex(null);
            }
          }}
        >
          <div className="relative w-full max-w-6xl">
            <div className="relative overflow-hidden rounded-lg bg-black shadow-panel">
              <Image
                src={activeImage}
                alt={`${projectTitle} enlarged gallery image ${(activeIndex ?? 0) + 1} in ${location}`}
                width={1800}
                height={1200}
                sizes="95vw"
                className="max-h-[82svh] w-full object-contain"
                priority
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-white">
              <p className="text-sm font-semibold">
                {projectTitle} / Image {(activeIndex ?? 0) + 1} of {images.length}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-full border border-white/35 bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  onClick={() => setActiveIndex((index) => index === null ? index : (index - 1 + images.length) % images.length)}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="rounded-full border border-white/35 bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  onClick={() => setActiveIndex((index) => index === null ? index : (index + 1) % images.length)}
                >
                  Next
                </button>
                <button
                  type="button"
                  className="rounded-full border border-white/35 bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  onClick={() => setActiveIndex(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
