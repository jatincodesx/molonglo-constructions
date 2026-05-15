import Image from "next/image";
import Link from "next/link";
import { actServiceAreas, footerGroups, site, southCoastServiceAreas } from "@/lib/site";

const footerLinkClass = "footer-link";

export function Footer() {
  return (
    <footer className="surface-dark text-white">
      <div className="container grid gap-10 py-16 md:grid-cols-2 xl:grid-cols-[1.2fr_0.8fr_0.9fr_0.9fr_0.8fr]">
        <div>
          <div className="footer-logo-tile">
            <Image src="/assets/logo/logo_new-footer.png" alt="Molonglo Construction Group logo" width={380} height={112} className="footer-logo-tile__image" />
          </div>
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
            <p><a href={site.phoneHref} className={footerLinkClass}>{site.phone}</a></p>
            <p><a href={site.emailHref} className={footerLinkClass}>{site.email}</a></p>
            <p>Service areas: {actServiceAreas.join(", ")}</p>
            <p>South Coast enquiries: {southCoastServiceAreas.join(", ")}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#f5ead2]">Services</h3>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            {footerGroups.services.slice(0, 6).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={footerLinkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#f5ead2]">Service Areas</h3>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            {footerGroups.areas.slice(0, 10).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={footerLinkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#f5ead2]">Company</h3>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            {footerGroups.core.filter((link) => ["/about", "/our-team", "/projects", "/display-home/denman-prospect", "/success-stories", "/blog", "/contact"].includes(link.href)).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={footerLinkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/admin" className={footerLinkClass}>
                Admin
              </Link>
            </li>
            {site.googleReviewsUrl ? (
              <li>
                <Link href={site.googleReviewsUrl} className={footerLinkClass} target="_blank" rel="noopener noreferrer">
                  Google Reviews
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container flex flex-col gap-2 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Molonglo Construction Group Pty Ltd. Powered by Lumox Technologies</p>
          <p>ACT, Canberra surrounds and South Coast residential building enquiries.</p>
        </div>
      </div>
    </footer>
  );
}
