import Image from "next/image";
import Link from "next/link";
import { actServiceAreas, footerGroups, site, southCoastServiceAreas } from "@/lib/site";

export function Footer() {
  return (
    <footer className="surface-dark text-white">
      <div className="container grid gap-10 py-16 md:grid-cols-2 xl:grid-cols-[1.2fr_0.9fr_0.8fr_1.1fr]">
        <div>
          <Image src={site.logo} alt="Molonglo Construction Group" width={160} height={90} className="h-16 w-auto object-contain" />
          <h2 className="mt-5 font-display text-2xl font-semibold text-white">{site.name}</h2>
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
          <h3 className="text-sm font-semibold text-[#f5ead2]">Contact</h3>
          <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-300">
            <p>{site.address}</p>
            <p><a href={site.phoneHref} className="hover:text-white">{site.phone}</a></p>
            <p><a href={site.emailHref} className="hover:text-white">{site.email}</a></p>
            <p>Service areas: {actServiceAreas.join(", ")}</p>
            <p>South Coast enquiries: {southCoastServiceAreas.join(", ")}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#f5ead2]">Explore</h3>
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
          <h3 className="text-sm font-semibold text-[#f5ead2]">Services & Areas</h3>
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
          <p>ACT, Canberra surrounds and South Coast residential building enquiries.</p>
        </div>
      </div>
    </footer>
  );
}
