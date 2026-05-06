import type { Metadata } from "next";
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
        <SiteChrome
          header={<Header />}
          footer={<Footer />}
          publicJsonLd={<JsonLd data={[organizationSchema(), websiteSchema(), localBusinessSchema()]} />}
        >
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
