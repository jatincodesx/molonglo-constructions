"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/lib/site";

type NavItem = {
  href: string;
  label: string;
  description?: string;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

const serviceGroups: NavGroup[] = [
  {
    label: "Build new",
    items: [
      { href: "/custom-home-builders-canberra", label: "Custom Homes" },
      { href: "/new-home-builders-canberra", label: "New Home Builds" },
      { href: "/house-and-land-canberra", label: "House & Land Packages" }
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
      { href: "/builder-queanbeyan", label: "Queanbeyan" },
      { href: "/builder-googong", label: "Googong" },
      { href: "/builder-jerrabomberra", label: "Jerrabomberra" },
      { href: "/service-areas", label: "South Coast" }
    ]
  }
];

const primaryLinks: NavItem[] = [
  { href: "/projects", label: "Projects" },
  { href: "/display-home/denman-prospect", label: "Display Home" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/blog", label: "Blog" }
];

const mobileGroups = [
  {
    label: "Primary",
    items: [
      { href: "/services", label: "Services" },
      ...primaryLinks,
      { href: "/contact", label: "Contact" }
    ]
  },
  ...serviceGroups
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const servicesPanelId = useId();
  const pathname = usePathname();
  const servicesLinks = serviceGroups.flatMap((group) => group.items);
  const servicesActive = servicesLinks.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`)) || pathname === "/services";
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const openServices = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setServicesOpen(true);
  };

  const queueServicesClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => setServicesOpen(false), 160);
  };

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
        setMenuOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
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
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setServicesOpen(false);
    setMenuOpen(false);
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-[#ded4c6] bg-[#fffdf8]/95 shadow-[0_14px_34px_rgba(23,26,24,0.065)] backdrop-blur-xl">
      <div className="container grid min-h-[74px] grid-cols-[auto_1fr_auto] items-center gap-3 py-2 lg:min-h-[78px] xl:gap-5">
        <Link href="/" className="flex shrink-0 items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffdf8]" onClick={closeMenus}>
          <Image
            src="/assets/logo/logo_new-removebg-preview.png"
            alt="Molonglo Construction Group"
            width={500}
            height={500}
            priority
            className="h-[52px] w-[160px] object-cover object-center sm:h-[60px] sm:w-[184px] lg:h-[62px] lg:w-[190px]"
          />
        </Link>

        <nav aria-label="Primary" className="hidden min-w-0 items-center justify-center gap-1 lg:flex xl:gap-2">
          <div
            className="relative"
            onMouseEnter={openServices}
            onMouseLeave={queueServicesClose}
            onFocus={openServices}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                queueServicesClose();
              }
            }}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-controls={servicesPanelId}
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-[#24241f] transition hover:bg-[#f4eee4] hover:text-[#73512b] focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffdf8] xl:px-3.5 ${servicesActive || servicesOpen ? "bg-[#f4eee4] text-[#5f401f] shadow-[inset_0_0_0_1px_rgba(154,116,70,0.18)]" : ""}`}
              onClick={() => setServicesOpen((open) => !open)}
            >
              Services
              <span aria-hidden="true" className={`mt-[-0.15rem] h-1.5 w-1.5 border-b-2 border-r-2 border-current transition ${servicesOpen ? "-rotate-[135deg]" : "rotate-45"}`} />
            </button>

            {servicesOpen ? (
              <div className="fixed left-0 top-[78px] z-[70] hidden w-full px-4 pb-4 pt-3 lg:block">
                <div
                  id={servicesPanelId}
                  className="mx-auto grid w-[min(58rem,calc(100vw-3rem))] gap-6 rounded-lg border border-[#d8cec0] bg-[#fbfaf6] p-6 shadow-[0_28px_80px_rgba(23,26,24,0.16)] lg:grid-cols-[1fr_1fr_1fr_0.95fr]"
                >
                  {serviceGroups.map((group) => (
                    <div key={group.label}>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#8a642f]">{group.label}</p>
                      <div className="mt-4 grid gap-1">
                        {group.items.map((item) => (
                          <Link
                            key={`${group.label}-${item.label}`}
                            href={item.href}
                            onClick={closeMenus}
                            className={`rounded-md px-3 py-2.5 text-sm font-semibold text-zinc-800 transition hover:bg-white hover:text-[#73512b] focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold ${isActive(item.href) ? "bg-white text-[#5f401f] shadow-[inset_0_0_0_1px_rgba(154,116,70,0.16)]" : ""}`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="rounded-lg border border-[#d8cec0] bg-white p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                    <p className="text-sm font-semibold leading-6 text-molonglo-ink">
                      Planning a build in Canberra or the South Coast?
                    </p>
                    <Link href="/contact#quote" className="cta mt-5 w-full px-4 py-3 text-sm" onClick={closeMenus}>
                      Start a Build
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setServicesOpen(false)}
              onFocus={() => setServicesOpen(false)}
              className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-[#24241f] transition hover:bg-[#f4eee4] hover:text-[#73512b] focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffdf8] xl:px-3.5 ${isActive(link.href) ? "bg-[#f4eee4] text-[#5f401f] shadow-[inset_0_0_0_1px_rgba(154,116,70,0.18)]" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <a href={site.phoneHref} className="hidden whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-molonglo-ink transition hover:bg-[#f4eee4] hover:text-[#73512b] focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffdf8] lg:inline-flex" onFocus={() => setServicesOpen(false)}>
            Call Now
          </a>
          <Link href="/contact#quote" className="cta hidden px-4 py-2.5 text-sm shadow-[0_12px_26px_rgba(118,83,49,0.18)] sm:inline-flex" onClick={closeMenus}>
            Start a Build
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d8cec0] bg-white text-molonglo-ink shadow-sm transition hover:border-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold lg:hidden"
            onClick={() => {
              setMenuOpen((open) => !open);
              setServicesOpen(false);
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
        <div id="mobile-menu" className="max-h-[calc(100vh-74px)] overflow-y-auto border-t border-[#ded4c6] bg-[#fffdf8] lg:hidden">
          <nav aria-label="Mobile" className="container grid gap-6 py-6">
            {mobileGroups.map((group) => (
              <div key={group.label}>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#8a642f]">{group.label}</p>
                <div className="mt-3 grid gap-1">
                  {group.items.map((item) => (
                    <Link
                      key={`${group.label}-${item.href}`}
                      href={item.href}
                      onClick={closeMenus}
                      className={`rounded-md px-3 py-3 text-base font-semibold text-zinc-800 transition hover:bg-[#f4eee4] hover:text-[#73512b] focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold ${isActive(item.href) ? "bg-[#f4eee4] text-[#5f401f]" : ""}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#8a642f]">Actions</p>
              <div className="mt-3 grid gap-3">
                <Link href="/contact#quote" className="cta w-full px-4 py-3" onClick={closeMenus}>
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
