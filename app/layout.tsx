import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { SiteChrome } from "@/components/site/SiteChrome";
import { localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Molonglo Construction Group | Canberra Builder",
    template: "%s"
  },
  description: "Canberra-focused custom home builder for new homes, knockdown rebuilds, renovations and residential construction planning.",
  icons: {
    icon: site.logo,
    shortcut: site.logo,
    apple: site.logo
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body className="bg-stone-950 font-sans text-zinc-900 antialiased">
        <JsonLd data={[organizationSchema(), websiteSchema(), localBusinessSchema()]} />
        <SiteChrome
          header={<Header />}
          footer={<Footer />}
          floatingCta={
            <div className="fixed bottom-4 left-4 right-4 z-40 hidden justify-center gap-3 xl:left-auto xl:flex">
              <Link href="/contact#quote" className="cta shadow-panel">
                Request a Quote
              </Link>
              <a
                href={site.phoneHref}
                className="cta-secondary border-white/40 bg-white/12 text-white shadow-panel backdrop-blur hover:border-white hover:bg-white hover:text-molonglo-ink"
              >
                Call {site.phone}
              </a>
            </div>
          }
        >
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
