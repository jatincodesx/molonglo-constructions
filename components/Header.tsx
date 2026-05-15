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
    label: "BUILD NEW",
    items: [
      { href: "/custom-home-builders-canberra", label: "Custom Homes" },
      { href: "/new-home-builders-canberra", label: "New Home Builds" },
      { href: "/house-and-land-canberra", label: "House & Land Packages" }
    ]
  },
  {
    label: "REBUILD & DEVELOP",
    items: [
      { href: "/knockdown-rebuild-canberra", label: "Knockdown Rebuilds" },
      { href: "/construction-services-canberra", label: "Construction Services" },
      { href: "/dual-occupancy-builders-act", label: "Dual Occupancy" }
    ]
  },
  {
    label: "WHERE WE BUILD",
    items: [
      { href: "/service-areas", label: "Canberra & ACT" },
      { href: "/builder-queanbeyan", label: "Queanbeyan" },
      { href: "/builder-googong", label: "Googong" },
      { href: "/builder-jerrabomberra", label: "Jerrabomberra" },
      { href: "/service-areas", label: "South Coast" }
    ]
  }
];

const primaryLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/display-home/denman-prospect", label: "Display Home" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/blog", label: "Blog" }
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const servicesPanelId = useId();
  const mobileServicesPanelId = useId();
  const pathname = usePathname();
  const servicesLinks = serviceGroups.flatMap((group) => group.items);
  const servicesActive = servicesLinks.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`)) || pathname === "/services";
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const navLinkClass = (active = false) =>
    `relative inline-flex h-10 items-center whitespace-nowrap rounded-md px-2 text-sm font-semibold transition-[background-color,color,box-shadow] duration-200 after:absolute after:inset-x-2 after:bottom-1 after:h-[2px] after:origin-left after:rounded-full after:bg-[#9a7446] after:transition-transform after:duration-200 hover:bg-[#f4eee4]/80 hover:text-[#765331] focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffdf8] xl:px-2.5 ${active ? "bg-[#f4eee4]/70 text-[#6f4c25] after:scale-x-100" : "text-[#232520] after:scale-x-0 hover:after:scale-x-100"}`;
  const mobileItemClass = (active = false) =>
    `flex min-h-12 items-center rounded-md px-3 text-base font-semibold transition-[background-color,color,box-shadow] duration-200 hover:bg-[#f4eee4] hover:text-[#73512b] focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold ${active ? "bg-[#f4eee4] text-[#5f401f] shadow-[inset_3px_0_0_rgba(154,116,70,0.72)]" : "text-[#232520]"}`;

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
        setMobileServicesOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMenuOpen(false);
        setMobileServicesOpen(false);
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
    setMobileServicesOpen(false);
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-[#ded4c6] bg-[#fffdf8]/95 shadow-[0_14px_34px_rgba(23,26,24,0.065)] backdrop-blur-xl">
      <div className="container flex min-h-[72px] items-center gap-3 py-2 lg:min-h-[78px]">
        <div className="flex min-w-0 items-center gap-3 lg:gap-4 xl:gap-5">
          <Link href="/" className="flex shrink-0 items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffdf8]" onClick={closeMenus}>
            <Image
              src={site.logo}
              alt="Molonglo Construction Group"
              width={500}
              height={500}
              priority
              className="h-[54px] w-[168px] object-cover object-center sm:h-[60px] sm:w-[190px] lg:h-[64px] lg:w-[208px] xl:h-[68px] xl:w-[224px]"
            />
          </Link>

          <nav aria-label="Primary" className="hidden min-w-0 items-center gap-1 lg:flex xl:gap-1.5">
            <Link
              href="/"
              onClick={() => setServicesOpen(false)}
              onFocus={() => setServicesOpen(false)}
              className={navLinkClass(pathname === "/")}
            >
              Home
            </Link>

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
                aria-haspopup="true"
                className={`${navLinkClass(servicesActive || servicesOpen)} gap-2`}
                onClick={() => setServicesOpen((open) => !open)}
              >
                Services
                <span aria-hidden="true" className={`mt-[-0.15rem] h-1.5 w-1.5 border-b-2 border-r-2 border-current transition ${servicesOpen ? "-rotate-[135deg]" : "rotate-45"}`} />
              </button>

              {servicesOpen ? (
                <div className="fixed left-0 top-[72px] z-[70] hidden w-full px-4 pb-5 pt-3 lg:top-[78px] lg:block">
                  <div
                    id={servicesPanelId}
                    className="mx-auto grid w-[min(62rem,calc(100vw-3rem))] gap-5 rounded-lg border border-[#d8cec0] bg-[#fbfaf6] p-6 shadow-[0_28px_80px_rgba(23,26,24,0.15)] lg:grid-cols-[1fr_1fr_1fr_0.92fr]"
                  >
                    {serviceGroups.map((group) => (
                      <div key={group.label}>
                        <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#8a642f]">{group.label}</p>
                        <div className="mt-4 grid gap-1">
                          {group.items.map((item) => (
                            <Link
                              key={`${group.label}-${item.label}`}
                              href={item.href}
                              onClick={closeMenus}
                              className={`block rounded-md px-3 py-2.5 text-sm font-semibold text-[#272923] transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-[#73512b] hover:shadow-[0_10px_22px_rgba(23,26,24,0.08),inset_0_0_0_1px_rgba(154,116,70,0.14)] focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold ${isActive(item.href) ? "bg-white text-[#5f401f] shadow-[inset_0_0_0_1px_rgba(154,116,70,0.16)]" : ""}`}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="flex flex-col justify-between rounded-lg border border-[#d8cec0] bg-white p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
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

            {primaryLinks.filter((link) => link.href !== "/").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setServicesOpen(false)}
                onFocus={() => setServicesOpen(false)}
                className={navLinkClass(isActive(link.href))}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="ml-auto flex items-center justify-end gap-2 sm:gap-3">
          <a href={site.phoneHref} className="hidden whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-molonglo-ink transition duration-200 hover:bg-[#f4eee4]/80 hover:text-[#73512b] hover:shadow-[inset_0_0_0_1px_rgba(154,116,70,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffdf8] lg:inline-flex" onFocus={() => setServicesOpen(false)}>
            Call Now
          </a>
          <Link href="/contact" className="cta hidden px-4 py-2.5 text-sm shadow-[0_12px_26px_rgba(118,83,49,0.18)] sm:inline-flex" onClick={closeMenus}>
            Start a Build
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d8cec0] bg-white text-molonglo-ink shadow-sm transition duration-200 hover:border-molonglo-gold hover:bg-[#f8f2e8] hover:shadow-[0_10px_22px_rgba(23,26,24,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold lg:hidden"
            onClick={() => {
              setMenuOpen((open) => !open);
              setServicesOpen(false);
              setMobileServicesOpen(false);
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
          <nav aria-label="Mobile" className="container grid gap-5 py-5">
            <div className="grid gap-1">
              <Link
                href="/"
                onClick={closeMenus}
                className={mobileItemClass(pathname === "/")}
              >
                Home
              </Link>
              <button
                type="button"
                aria-expanded={mobileServicesOpen}
                aria-controls={mobileServicesPanelId}
                className={`${mobileItemClass(servicesActive)} justify-between`}
                onClick={() => setMobileServicesOpen((open) => !open)}
              >
                Services
                <span aria-hidden="true" className={`h-2 w-2 border-b-2 border-r-2 border-current transition ${mobileServicesOpen ? "-rotate-[135deg]" : "rotate-45"}`} />
              </button>

              {mobileServicesOpen ? (
                <div id={mobileServicesPanelId} className="mt-2 grid gap-5 rounded-lg border border-[#d8cec0] bg-[#fbfaf6] p-4">
                  {serviceGroups.map((group) => (
                    <div key={group.label}>
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#8a642f]">{group.label}</p>
                      <div className="mt-3 grid gap-1">
                        {group.items.map((item) => (
                          <Link
                            key={`${group.label}-${item.href}`}
                            href={item.href}
                            onClick={closeMenus}
                            className={mobileItemClass(isActive(item.href))}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {primaryLinks.filter((item) => item.href !== "/").map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenus}
                  className={mobileItemClass(isActive(item.href))}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#8a642f]">Actions</p>
              <div className="mt-3 grid gap-3">
                <a href={site.phoneHref} className="rounded-md border border-[var(--color-border)] bg-white px-4 py-3 text-center text-base font-semibold text-molonglo-ink transition duration-200 hover:border-molonglo-gold hover:bg-[#f8f2e8] hover:text-[#73512b] focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold" onClick={closeMenus}>
                  Call Now
                </a>
                <Link href="/contact" className="cta w-full px-4 py-3" onClick={closeMenus}>
                  Start a Build
                </Link>
              </div>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
