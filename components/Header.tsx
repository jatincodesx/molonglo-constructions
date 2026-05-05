import Image from "next/image";
import Link from "next/link";
import { navLinks, site } from "@/lib/site";

function NavItem({ item, mobile = false }: { item: (typeof navLinks)[number]; mobile?: boolean }) {
  if ("children" in item) {
    return (
      <details className={mobile ? "group shrink-0" : "group relative"}>
        <summary className={mobile ? "cursor-pointer list-none whitespace-nowrap text-zinc-800 transition hover:text-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2" : "cursor-pointer list-none text-sm font-semibold text-zinc-800 transition hover:text-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2"}>
          {item.label}
        </summary>
        <div className={mobile ? "mt-2 grid min-w-64 gap-2 rounded-lg border border-[var(--color-border)] bg-white p-3 shadow-soft" : "absolute left-0 top-full z-50 mt-3 grid min-w-72 gap-2 rounded-lg border border-[var(--color-border)] bg-white p-3 shadow-soft"}>
          {item.children.map((child) => (
            <Link key={child.href} href={child.href} className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-800 transition hover:bg-[var(--color-stone)] hover:text-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold">
              {child.label}
            </Link>
          ))}
        </div>
      </details>
    );
  }

  return (
    <Link href={item.href} className={mobile ? "shrink-0 whitespace-nowrap text-zinc-800 transition hover:text-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2" : "text-sm font-semibold text-zinc-800 transition hover:text-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold focus-visible:ring-offset-2"}>
      {item.label}
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-white/90 backdrop-blur-xl">
      <div className="container flex min-h-20 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={site.logo}
            alt="Molonglo Constructions"
            width={132}
            height={72}
            priority
            className="h-12 w-auto object-contain"
          />
          <div className="hidden sm:block">
            <p className="text-xs font-semibold tracking-[0.16em] text-molonglo-gold">Canberra Builder</p>
            <p className="font-display text-lg font-semibold leading-tight text-molonglo-ink">{site.name}</p>
          </div>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-4 xl:flex">
          {navLinks.map((link) => (
            <NavItem key={"href" in link ? link.href : link.label} item={link} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={site.phoneHref} className="hidden text-sm font-semibold text-molonglo-ink transition hover:text-molonglo-gold sm:inline-flex">
            {site.phone}
          </a>
          <Link href="/contact#quote" className="cta px-4 py-3 text-xs md:px-5 md:text-sm">
            Contact
          </Link>
        </div>
      </div>

      <nav aria-label="Mobile" className="container flex gap-4 overflow-x-auto pb-3 text-sm font-semibold xl:hidden">
        {navLinks.map((link) => (
          <NavItem key={"href" in link ? link.href : link.label} item={link} mobile />
        ))}
      </nav>
    </header>
  );
}
