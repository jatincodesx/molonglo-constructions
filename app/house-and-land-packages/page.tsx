import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { PremiumScrollShell } from "@/components/public-ui/PremiumScrollShell";
import { breadcrumbSchema, resolveMetadata, serviceSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return resolveMetadata({
    title: "House and Land Packages Canberra | Molonglo Construction Group",
    description: "House and land package enquiries for Canberra, ACT surrounds and selected South Coast locations with Molonglo Construction Group.",
    path: "/house-and-land-packages",
    image: "/assets/images/hero.jpg"
  });
}

export default function HouseAndLandPackagesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "House and Land Packages", href: "/house-and-land-packages" }
          ]),
          serviceSchema({
            name: "House and Land Packages Canberra",
            description: "House and land package enquiries for Canberra, ACT surrounds and selected South Coast locations.",
            path: "/house-and-land-packages",
            areaServed: ["ACT", "Canberra", "Queanbeyan", "Googong", "South Coast"]
          })
        ]}
      />
      <PremiumScrollShell mode="light">
        <Hero
          eyebrow="House & Land"
          title="House and Land Packages Canberra"
          text="Speak with Molonglo Construction Group about upcoming house and land opportunities across Canberra, ACT surrounds and selected South Coast areas."
          image="/assets/images/hero.jpg"
          primaryLabel="Enquire About Packages"
          secondaryHref="/display-home/denman-prospect"
          secondaryLabel="Display Home"
        />

        <section className="section bg-white">
          <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow">Enquiries</p>
              <h2 className="heading-lg mt-4">A practical way to discuss land, design and build options together.</h2>
            </div>
            <div className="space-y-6 text-lg leading-8 text-zinc-700">
              <p>
                House and land package enquiries are handled directly by the Molonglo Construction Group team. We can discuss your preferred location, timing, budget range and the type of home you want to build before matching the next suitable opportunity.
              </p>
              <p>
                The team works across the ACT, Canberra surrounds and selected South Coast locations where the site, approvals pathway and project brief are a good fit.
              </p>
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-stone)] p-6">
                <h2 className="font-display text-2xl font-semibold text-molonglo-ink">Current availability</h2>
                <p className="mt-3 text-base leading-7 text-zinc-700">
                  Current packages are available by enquiry. Contact the team to discuss upcoming opportunities.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact#quote" className="cta">
                  Contact the Team
                </Link>
                <Link href="/custom-home-builders-canberra" className="cta-secondary">
                  Custom Homes
                </Link>
              </div>
            </div>
          </div>
        </section>

        <CTA />
      </PremiumScrollShell>
    </>
  );
}
