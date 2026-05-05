"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/lib/site";

type NavItem = {
  href: string;
  label: string;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

const homesGroups: NavGroup[] = [
  {
    label: "Build new",
    items: [
      { href: "/custom-home-builders-canberra", label: "Custom Homes" },
      { href: "/new-home-builders-canberra", label: "New Home Builds" },
      { href: "/house-and-land-packages", label: "House & Land Packages" }
    ]
  },
  {
    label: "Rebuild & develop",
    items: [
      { href: "/knockdown-rebuild-canberra", label: "Knockdown Rebuilds" },
      { href: "/construction-services-canberra", label: "Construction Services" },
      { href: "/dual-occupancy-builders-act", label: "Dual Occupancy" }
    ]
  },
  {
    label: "Where we build",
    items: [
      { href: "/builder-canberra", label: "Canberra & ACT" },
      { href: "/contact", label: "Queanbeyan" },
      { href: "/contact", label: "Googong" },
      { href: "/contact", label: "Jerrabomberra" },
      { href: "/contact", label: "South Coast" }
    ]
  }
];

const desktopLinks: NavItem[] = [
  { href: "/projects", label: "Projects" },
  { href: "/display-home/denman-prospect", label: "Visit Display Home" },
  { href: "/success-stories", label: "Success Stories" }
];

const mobileGroups: NavGroup[] = [
  {
    label: "Homes",
    items: [
      { href: "/custom-home-builders-canberra", label: "Custom Homes" },
      { href: "/new-home-builders-canberra", label: "New Home Builds" },
      { href: "/house-and-land-packages", label: "House & Land Packages" },
      { href: "/knockdown-rebuild-canberra", label: "Knockdown Rebuilds" },
      { href: "/construction-services-canberra", label: "Construction Services" },
      { href: "/dual-occupancy-builders-act", label: "Dual Occupancy" }
    ]
  },
  {
    label: "Main",
    items: [
      { href: "/projects", label: "Projects" },
      { href: "/display-home/denman-prospect", label: "Visit Display Home" },
      { href: "/success-stories", label: "Success Stories" },
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" }
    ]
  },
  {
    label: "Where We Build",
    items: [
      { href: "/builder-canberra", label: "Canberra & ACT" },
      { href: "/contact", label: "Queanbeyan" },
      { href: "/contact", label: "Googong" },
      { href: "/contact", label: "Jerrabomberra" },
      { href: "/contact", label: "South Coast" }
    ]
  }
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [homesOpen, setHomesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const homesPanelId = useId();

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setHomesOpen(false);
        setMenuOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setHomesOpen(false);
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

  const closeMenus = () => {
    setHomesOpen(false);
    setMenuOpen(false);
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[#fbfaf6]/95 shadow-[0_16px_40px_rgba(23,26,24,0.06)] backdrop-blur-xl">
      <div className="container flex min-h-[80px] items-center justify-between gap-4 py-2 lg:min-h-[84px]">
        <Link href="/" className="flex shrink-0 items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2" onClick={closeMenus}>
          <Image
            src="/assets/logo/logo_new.jpg"
            alt="Molonglo Construction Group"
            width={188}
            height={94}
            priority
            className="h-[42px] w-auto object-contain sm:h-[48px] lg:h-[52px]"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setHomesOpen(true)}
            onMouseLeave={() => setHomesOpen(false)}
            onFocus={() => setHomesOpen(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setHomesOpen(false);
              }
            }}
          >
            <button
              type="button"
              aria-expanded={homesOpen}
              aria-controls={homesPanelId}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md px-1 py-3 text-sm font-semibold text-zinc-800 transition hover:text-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2"
              onClick={() => setHomesOpen((open) => !open)}
            >
              Homes
              <span aria-hidden="true" className={`mt-[-0.15rem] h-1.5 w-1.5 border-b-2 border-r-2 border-current transition ${homesOpen ? "-rotate-[135deg]" : "rotate-45"}`} />
            </button>

            {homesOpen ? (
              <div className="absolute left-1/2 top-full z-50 w-[min(58rem,calc(100vw-3rem))] -translate-x-1/2 pt-3">
                <div
                  id={homesPanelId}
                  className="grid gap-6 rounded-lg border border-[var(--color-border)] bg-[#fbfaf6] p-6 shadow-[0_28px_80px_rgba(23,26,24,0.16)] lg:grid-cols-[1fr_1fr_1fr_0.95fr]"
                >
                  {homesGroups.map((group) => (
                    <div key={group.label}>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-molonglo-gold">{group.label}</p>
                      <div className="mt-4 grid gap-1">
                        {group.items.map((item) => (
                          <Link
                            key={`${group.label}-${item.label}`}
                            href={item.href}
                            onClick={closeMenus}
                            className="rounded-md px-3 py-2.5 text-sm font-semibold text-zinc-800 transition hover:bg-white hover:text-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="rounded-lg border border-[var(--color-border)] bg-white p-5">
                    <p className="text-sm font-semibold leading-6 text-molonglo-ink">
                      Planning a build in Canberra or the South Coast?
                    </p>
                    <Link href="/contact" className="cta mt-5 w-full px-4 py-3 text-sm" onClick={closeMenus}>
                      Start a Build
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {desktopLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setHomesOpen(false)}
              className="whitespace-nowrap rounded-md px-1 py-3 text-sm font-semibold text-zinc-800 transition hover:text-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/contact" className="cta hidden px-4 py-2.5 text-sm sm:inline-flex" onClick={closeMenus}>
            Start a Build
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-molonglo-ink shadow-sm transition hover:border-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold lg:hidden"
            onClick={() => {
              setMenuOpen((open) => !open);
              setHomesOpen(false);
            }}
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="grid gap-1">
              <span className={`block h-0.5 w-5 bg-current transition ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div id="mobile-menu" className="max-h-[calc(100vh-80px)] overflow-y-auto border-t border-[var(--color-border)] bg-[#fbfaf6] lg:hidden">
          <nav aria-label="Mobile" className="container grid gap-6 py-6">
            {mobileGroups.map((group) => (
              <div key={group.label}>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-molonglo-gold">{group.label}</p>
                <div className="mt-3 grid gap-1">
                  {group.items.map((item) => (
                    <Link
                      key={`${group.label}-${item.label}`}
                      href={item.href}
                      onClick={closeMenus}
                      className="rounded-md px-3 py-3 text-base font-semibold text-zinc-800 transition hover:bg-white hover:text-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-molonglo-gold">Actions</p>
              <div className="mt-3 grid gap-3">
                <Link href="/contact" className="cta w-full px-4 py-3" onClick={closeMenus}>
                  Start a Build
                </Link>
                <a href={site.phoneHref} className="rounded-md border border-[var(--color-border)] bg-white px-4 py-3 text-center text-base font-semibold text-molonglo-ink" onClick={closeMenus}>
                  Call {site.phone}
                </a>
              </div>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
