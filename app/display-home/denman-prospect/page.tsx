import Image from "next/image";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { PremiumScrollShell } from "@/components/public-ui/PremiumScrollShell";
import { projects } from "@/lib/projects";
import { breadcrumbSchema, resolveMetadata, serviceSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";

const displayProject = projects.find((project) => project.slug === "molonglo-1") || projects[0];

export async function generateMetadata() {
  return resolveMetadata({
    title: "Molonglo Display Home in Denman Prospect | Molonglo Construction Group",
    description: "Enquire about visiting the Molonglo display home in Denman Prospect and discuss custom home building with a Canberra builder.",
    path: "/display-home/denman-prospect",
    image: displayProject?.coverImage || "/assets/images/hero.jpg"
  });
}

export default function DenmanProspectDisplayHomePage() {
  const image = displayProject?.coverImage || "/assets/images/hero.jpg";

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Display Home", href: "/display-home/denman-prospect" }
          ]),
          serviceSchema({
            name: "Molonglo Display Home in Denman Prospect",
            description: "Display home visit enquiries for Denman Prospect, Canberra and the ACT.",
            path: "/display-home/denman-prospect"
          })
        ]}
      />
      <PremiumScrollShell mode="light">
        <Hero
          eyebrow="Display Home"
          title="Molonglo Display Home in Denman Prospect"
          text="Arrange a conversation with the Molonglo Construction Group team about the Denman Prospect display home and the next step for your build."
          image={image}
          primaryLabel="Request a Visit"
          secondaryHref="/projects"
          secondaryLabel="View Projects"
        />

        <section className="section bg-white">
          <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="eyebrow">Denman Prospect</p>
              <h2 className="heading-lg mt-4">A local display home enquiry point for Canberra clients.</h2>
              <p className="mt-5 text-lg leading-8 text-zinc-700">
                The Molonglo display home is associated with Denman Prospect. Contact the team to request a visit, confirm current availability and discuss whether a custom home, new home or house and land pathway suits your site.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact#quote" className="cta">
                  Request a Visit
                </Link>
                <Link href="/house-and-land-packages" className="cta-secondary">
                  House & Land Packages
                </Link>
              </div>
            </div>

            <div className="surface-panel overflow-hidden">
              <Image src={image} alt="Molonglo display home enquiry image for Denman Prospect" width={1400} height={980} className="h-[30rem] w-full object-cover" />
              <div className="p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-molonglo-gold">Location</p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-molonglo-ink">Denman Prospect</h2>
                <p className="mt-3 text-sm leading-7 text-zinc-700">
                  Opening hours and a street address are not published here until confirmed. Please enquire before planning a visit.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CTA />
      </PremiumScrollShell>
    </>
  );
}
