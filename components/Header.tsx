"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navLinks, site } from "@/lib/site";

type NavLinkItem = (typeof navLinks)[number];
type DropdownItem = Extract<NavLinkItem, { children: readonly { href: string; label: string }[] }>;

function MobileNavItem({
  item,
  onNavigate
}: {
  item: NavLinkItem;
  onNavigate: () => void;
}) {
  if ("children" in item) {
    return (
      <details className="group border-b border-[var(--color-border)] py-3">
        <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-zinc-900 transition hover:text-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
          <span>{item.label}</span>
          <span aria-hidden="true" className="text-lg leading-none text-molonglo-gold transition group-open:rotate-45">+</span>
        </summary>
        <div className="mt-3 grid gap-1 pl-3">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onNavigate}
              className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-[var(--color-stone)] hover:text-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </details>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="block border-b border-[var(--color-border)] py-3 text-base font-semibold text-zinc-900 transition hover:text-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2"
    >
      {item.label}
    </Link>
  );
}

function DesktopDropdown({
  item,
  isOpen,
  onOpen,
  onClose
}: {
  item: DropdownItem;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocus={onOpen}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          onClose();
        }
      }}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-1 py-2 text-sm font-semibold text-zinc-800 transition hover:text-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2"
        onClick={() => {
          if (isOpen) {
            onClose();
          } else {
            onOpen();
          }
        }}
      >
        <span>{item.label}</span>
        <span aria-hidden="true" className={`text-xs leading-none text-molonglo-gold transition ${isOpen ? "rotate-45" : ""}`}>+</span>
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-3 grid min-w-72 gap-1 rounded-lg border border-[var(--color-border)] bg-white p-3 shadow-soft"
        >
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              role="menuitem"
              onClick={onClose}
              className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-800 transition hover:bg-[var(--color-stone)] hover:text-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold"
            >
              {child.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
        setMenuOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenDropdown(null);
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

  const closeMenus = () => {
    setOpenDropdown(null);
    setMenuOpen(false);
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-white/[0.96] backdrop-blur-xl">
      <div className="container flex min-h-[72px] items-center justify-between gap-5 py-2">
        <Link href="/" className="flex shrink-0 items-center" onClick={closeMenus}>
          <Image
            src={site.logo}
            alt="Molonglo Construction Group"
            width={192}
            height={96}
            priority
            className="h-10 w-auto object-contain sm:h-12 lg:h-14"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-5 xl:gap-6 lg:flex">
          {navLinks.map((link) => {
            if ("children" in link) {
              return (
                <DesktopDropdown
                  key={link.label}
                  item={link}
                  isOpen={openDropdown === link.label}
                  onOpen={() => setOpenDropdown(link.label)}
                  onClose={() => setOpenDropdown((current) => current === link.label ? null : current)}
                />
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpenDropdown(null)}
                className="whitespace-nowrap text-sm font-semibold text-zinc-800 transition hover:text-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a href={site.phoneHref} className="hidden whitespace-nowrap text-sm font-semibold text-molonglo-ink transition hover:text-molonglo-gold md:inline-flex">
            {site.phone}
          </a>
          <Link href="/contact" className="cta hidden px-4 py-2.5 text-sm xl:inline-flex" onClick={() => setOpenDropdown(null)}>
            Enquire
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-molonglo-ink shadow-sm transition hover:border-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold lg:hidden"
            onClick={() => {
              setMenuOpen((open) => !open);
              setOpenDropdown(null);
            }}
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
          <nav aria-label="Mobile" className="container py-3">
            {navLinks.map((link) => (
              <MobileNavItem key={"href" in link ? link.href : link.label} item={link} onNavigate={closeMenus} />
            ))}
            <div className="grid gap-3 py-4">
              <a href={site.phoneHref} className="text-base font-semibold text-molonglo-ink">
                {site.phone}
              </a>
              <Link href="/contact" className="cta w-full px-4 py-3" onClick={closeMenus}>
                Enquire
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
