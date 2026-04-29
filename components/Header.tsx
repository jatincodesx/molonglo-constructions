import Image from "next/image";
import Link from "next/link";
import { navLinks, site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-white/90 backdrop-blur-xl">
      <div className="container flex min-h-20 flex-wrap items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={site.logo}
            alt="Molonglo Construction Group logo"
            width={96}
            height={72}
            priority
            className="h-12 w-auto rounded-full object-contain"
          />
          <div className="hidden sm:block">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-molonglo-gold">Canberra Builder</p>
            <p className="font-display text-lg font-semibold text-molonglo-ink">{site.name}</p>
          </div>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-700 transition hover:text-molonglo-gold">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={site.phoneHref} className="hidden text-sm font-semibold text-molonglo-ink transition hover:text-molonglo-gold sm:inline-flex">
            {site.phone}
          </a>
          <Link href="/contact#quote" className="cta">
            Request a Quote
          </Link>
        </div>
      </div>

      <nav aria-label="Mobile" className="container flex gap-4 overflow-x-auto pb-3 text-sm font-semibold uppercase tracking-[0.12em] lg:hidden">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="whitespace-nowrap text-zinc-700 transition hover:text-molonglo-gold">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
