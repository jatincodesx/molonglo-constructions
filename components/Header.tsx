"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { navLinks, site } from "@/lib/site";

function NavItem({ item, mobile = false }: { item: (typeof navLinks)[number]; mobile?: boolean }) {
  if ("children" in item) {
    return (
      <details className={mobile ? "group border-b border-[var(--color-border)] py-3" : "group relative"}>
        <summary className={mobile ? "flex cursor-pointer list-none items-center justify-between text-base font-semibold text-zinc-900 transition hover:text-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden" : "flex cursor-pointer list-none items-center gap-1.5 text-sm font-semibold text-zinc-800 transition hover:text-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden"}>
          <span>{item.label}</span>
          <span aria-hidden="true" className={mobile ? "text-lg leading-none text-molonglo-gold transition group-open:rotate-45" : "text-xs leading-none text-molonglo-gold"}>+</span>
        </summary>
        <div className={mobile ? "mt-3 grid gap-1 pl-3" : "absolute left-0 top-full z-50 mt-4 grid min-w-72 gap-1 rounded-lg border border-[var(--color-border)] bg-white p-3 shadow-soft"}>
          {item.children.map((child) => (
            <Link key={child.href} href={child.href} className={mobile ? "rounded-md px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-[var(--color-stone)] hover:text-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold" : "rounded-md px-3 py-2 text-sm font-semibold text-zinc-800 transition hover:bg-[var(--color-stone)] hover:text-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold"}>
              {child.label}
            </Link>
          ))}
        </div>
      </details>
    );
  }

  return (
    <Link href={item.href} className={mobile ? "block border-b border-[var(--color-border)] py-3 text-base font-semibold text-zinc-900 transition hover:text-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2" : "text-sm font-semibold text-zinc-800 transition hover:text-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2"}>
      {item.label}
    </Link>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-white/[0.94] backdrop-blur-xl">
      <div className="container flex min-h-[72px] items-center justify-between gap-5 py-2.5">
        <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setMenuOpen(false)}>
          <Image
            src={site.logo}
            alt="Molonglo Constructions"
            width={156}
            height={72}
            priority
            className="h-11 w-auto object-contain sm:h-12"
          />
          <div className="hidden min-w-0 lg:block">
            <p className="truncate text-sm font-semibold leading-tight text-molonglo-ink">{site.name}</p>
          </div>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <NavItem key={"href" in link ? link.href : link.label} item={link} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={site.phoneHref} className="hidden text-sm font-semibold text-molonglo-ink transition hover:text-molonglo-gold md:inline-flex">
            {site.phone}
          </a>
          <Link href="/contact#quote" className="cta hidden px-4 py-2.5 text-sm lg:inline-flex">
            Enquire
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-molonglo-ink shadow-sm transition hover:border-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">Open menu</span>
            <span aria-hidden="true" className="grid gap-1">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div id="mobile-menu" className="border-t border-[var(--color-border)] bg-white lg:hidden">
          <nav aria-label="Mobile" className="container py-3" onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) {
              setMenuOpen(false);
            }
          }}>
            {navLinks.map((link) => (
              <NavItem key={"href" in link ? link.href : link.label} item={link} mobile />
            ))}
            <div className="grid gap-3 py-4">
              <a href={site.phoneHref} className="text-base font-semibold text-molonglo-ink">
                {site.phone}
              </a>
              <Link href="/contact#quote" className="cta w-full px-4 py-3">
                Enquire
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
