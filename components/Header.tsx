"use client";

import Image from "next/image";
import Link from "next/link";
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
  const servicesPanelId = useId();

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
    setServicesOpen(false);
    setMenuOpen(false);
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[#fbfaf6]/96 shadow-[0_14px_34px_rgba(23,26,24,0.06)] backdrop-blur-xl">
      <div className="container grid min-h-[76px] grid-cols-[auto_1fr_auto] items-center gap-4 py-2 lg:min-h-[82px]">
        <Link href="/" className="flex shrink-0 items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2" onClick={closeMenus}>
          <Image
            src="/assets/logo/logo_new.jpg"
            alt="Molonglo Construction Group"
            width={188}
            height={94}
            priority
            className="h-[42px] w-auto object-contain sm:h-[48px]"
          />
        </Link>

        <nav aria-label="Primary" className="hidden min-w-0 items-center justify-center gap-5 xl:gap-7 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            onFocus={() => setServicesOpen(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setServicesOpen(false);
              }
            }}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-controls={servicesPanelId}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md px-1 py-3 text-sm font-semibold text-zinc-800 transition hover:text-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2"
              onClick={() => setServicesOpen((open) => !open)}
            >
              Services
              <span aria-hidden="true" className={`mt-[-0.15rem] h-1.5 w-1.5 border-b-2 border-r-2 border-current transition ${servicesOpen ? "-rotate-[135deg]" : "rotate-45"}`} />
            </button>

            {servicesOpen ? (
              <div className="absolute left-1/2 top-full z-[70] w-[min(44rem,calc(100vw-2rem))] -translate-x-1/2 pt-3">
                <div
                  id={servicesPanelId}
                  className="grid gap-3 rounded-lg border border-[var(--color-border)] bg-[#fbfaf6] p-4 shadow-[0_24px_70px_rgba(23,26,24,0.16)] md:grid-cols-[1fr_1fr]"
                >
                  <div className="grid gap-1">
                    {servicesLinks.slice(0, 3).map((item) => (
                      <Link key={item.href} href={item.href} onClick={closeMenus} className="rounded-md p-3 transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold">
                        <span className="block text-sm font-semibold text-molonglo-ink">{item.label}</span>
                        <span className="mt-1 block text-xs leading-5 text-zinc-600">{item.description}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="grid gap-1">
                    {servicesLinks.slice(3).map((item) => (
                      <Link key={item.href} href={item.href} onClick={closeMenus} className="rounded-md p-3 transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold">
                        <span className="block text-sm font-semibold text-molonglo-ink">{item.label}</span>
                        <span className="mt-1 block text-xs leading-5 text-zinc-600">{item.description}</span>
                      </Link>
                    ))}
                    <Link href="/contact#quote" className="mt-2 rounded-md border border-[var(--color-border)] bg-white p-3 text-sm font-semibold text-molonglo-gold transition hover:border-molonglo-gold hover:text-molonglo-ink" onClick={closeMenus}>
                      Start a Build enquiry
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
              className="whitespace-nowrap rounded-md px-1 py-3 text-sm font-semibold text-zinc-800 transition hover:text-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <a href={site.phoneHref} className="hidden whitespace-nowrap text-sm font-semibold text-molonglo-ink transition hover:text-molonglo-gold xl:inline-flex">
            Call Now
          </a>
          <Link href="/contact#quote" className="cta hidden px-4 py-2.5 text-sm sm:inline-flex" onClick={closeMenus}>
            Start a Build
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-molonglo-ink shadow-sm transition hover:border-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold lg:hidden"
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
        <div id="mobile-menu" className="max-h-[calc(100vh-76px)] overflow-y-auto border-t border-[var(--color-border)] bg-[#fbfaf6] lg:hidden">
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
