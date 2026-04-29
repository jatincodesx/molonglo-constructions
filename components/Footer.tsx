import Link from "next/link";
import { footerGroups, serviceAreas, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="surface-dark text-white">
      <div className="container grid gap-10 py-16 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white">{site.name}</h2>
          <p className="mt-4 text-sm leading-7 text-zinc-300">
            Local Canberra-focused builder delivering custom homes, knockdown rebuilds and tailored residential construction with a refined process.
          </p>
          <div className="mt-6 space-y-1 text-sm text-zinc-300">
            <p>ABN: {site.abn}</p>
            <p>ACT Licence: {site.actLicense}</p>
            <p>NSW Licence: {site.nswLicense}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-molonglo-gold">Contact</h3>
          <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-300">
            <p>{site.address}</p>
            <p><a href={site.phoneHref} className="hover:text-white">{site.phone}</a></p>
            <p><a href={site.emailHref} className="hover:text-white">{site.email}</a></p>
            <p>Service areas: {serviceAreas.join(", ")}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-molonglo-gold">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            {footerGroups.core.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/admin" className="hover:text-white">
                Admin
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-molonglo-gold">Services & Areas</h3>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            {footerGroups.services.slice(0, 4).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            {footerGroups.areas.slice(0, 3).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container flex flex-col gap-2 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Molonglo Construction Group Pty Ltd. All rights reserved.</p>
          <p>Canberra, ACT, Molonglo Valley, Denman Prospect, Wright, Coombs and Queanbeyan.</p>
        </div>
      </div>
    </footer>
  );
}
