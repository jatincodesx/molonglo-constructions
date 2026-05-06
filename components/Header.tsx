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

const servicesLinks: NavItem[] = [
  { href: "/custom-home-builders-canberra", label: "Custom Homes", description: "Tailored homes shaped around your block and brief." },
  { href: "/new-home-builders-canberra", label: "New Home Builds", description: "A clear path from vacant land to handover." },
  { href: "/knockdown-rebuild-canberra", label: "Knockdown Rebuilds", description: "Stay in the suburb you know with a better home." },
  { href: "/construction-services-canberra", label: "Construction Services", description: "Residential building support and site delivery." },
  { href: "/house-and-land-canberra", label: "House & Land Packages", description: "Discuss land, timing and build opportunities." },
  { href: "/service-areas", label: "Where We Build", description: "Canberra, ACT surrounds and selected South Coast areas." }
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
      { href: "/service-areas", label: "Service Areas" },
      { href: "/contact", label: "Contact" }
    ]
  },
  {
    label: "Services",
    items: servicesLinks
  }
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const servicesPanelId = useId();
  const pathname = usePathname();
  const servicesActive = servicesLinks.some((item) => pathname === item.href) || pathname === "/services";
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
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-[#ded4c6] bg-[#fffdf8]/96 shadow-[0_12px_30px_rgba(23,26,24,0.07)] backdrop-blur-xl">
      <div className="container grid min-h-[70px] grid-cols-[auto_1fr_auto] items-center gap-4 py-2 lg:min-h-[74px]">
        <Link href="/" className="flex shrink-0 items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffdf8]" onClick={closeMenus}>
          <Image
            src="/assets/logo/logo_new-removebg-preview.png"
            alt="Molonglo Construction Group"
            width={220}
            height={72}
            priority
            className="h-[46px] w-auto object-contain sm:h-[50px]"
          />
        </Link>

        <nav aria-label="Primary" className="hidden min-w-0 items-center justify-end gap-1 xl:gap-2 lg:flex">
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
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-[#24241f] transition hover:bg-[#f3eee4] hover:text-[#6f4b25] focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffdf8] ${servicesActive || servicesOpen ? "bg-[#f3eee4] text-[#5f401f] shadow-[inset_0_0_0_1px_rgba(154,116,70,0.2)]" : ""}`}
              onClick={() => setServicesOpen((open) => !open)}
            >
              Services
              <span aria-hidden="true" className={`mt-[-0.15rem] h-1.5 w-1.5 border-b-2 border-r-2 border-current transition ${servicesOpen ? "-rotate-[135deg]" : "rotate-45"}`} />
            </button>

            {servicesOpen ? (
              <div className="absolute left-1/2 top-full z-[70] w-[min(40rem,calc(100vw-2rem))] -translate-x-1/2 pt-3">
                <div
                  id={servicesPanelId}
                  className="grid gap-2 rounded-lg border border-[#d8cec0] bg-[#fffdf8] p-3 shadow-[0_24px_70px_rgba(23,26,24,0.16)] md:grid-cols-[1fr_1fr]"
                >
                  <div className="grid gap-1">
                    {servicesLinks.slice(0, 3).map((item) => (
                      <Link key={item.href} href={item.href} onClick={closeMenus} className="rounded-md p-3 transition hover:bg-[#f6f0e6] focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold">
                        <span className="block text-sm font-semibold text-molonglo-ink">{item.label}</span>
                        <span className="mt-1 block text-xs leading-5 text-zinc-600">{item.description}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="grid gap-1">
                    {servicesLinks.slice(3).map((item) => (
                      <Link key={item.href} href={item.href} onClick={closeMenus} className="rounded-md p-3 transition hover:bg-[#f6f0e6] focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold">
                        <span className="block text-sm font-semibold text-molonglo-ink">{item.label}</span>
                        <span className="mt-1 block text-xs leading-5 text-zinc-600">{item.description}</span>
                      </Link>
                    ))}
                    <Link href="/contact#quote" className="mt-2 rounded-md border border-[#d0c2af] bg-white p-3 text-sm font-semibold text-[#6f4b25] transition hover:border-[#9a7446] hover:bg-[#f6f0e6] hover:text-molonglo-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold" onClick={closeMenus}>
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
              className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-[#24241f] transition hover:bg-[#f3eee4] hover:text-[#6f4b25] focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffdf8] ${isActive(link.href) ? "bg-[#f3eee4] text-[#5f401f] shadow-[inset_0_0_0_1px_rgba(154,116,70,0.2)]" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <a href={site.phoneHref} className="hidden whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-molonglo-ink transition hover:bg-[#f3eee4] hover:text-[#6f4b25] focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffdf8] lg:inline-flex">
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
        <div id="mobile-menu" className="max-h-[calc(100vh-70px)] overflow-y-auto border-t border-[#ded4c6] bg-[#fffdf8] lg:hidden">
          <nav aria-label="Mobile" className="container grid gap-6 py-6">
            {mobileGroups.map((group) => (
              <div key={group.label}>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-molonglo-gold">{group.label}</p>
                <div className="mt-3 grid gap-1">
                  {group.items.map((item) => (
                    <Link
                      key={`${group.label}-${item.href}`}
                      href={item.href}
                      onClick={closeMenus}
                      className={`rounded-md px-3 py-3 text-base font-semibold text-zinc-800 transition hover:bg-[#f3eee4] hover:text-[#6f4b25] focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold ${isActive(item.href) ? "bg-[#f3eee4] text-[#5f401f]" : ""}`}
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
