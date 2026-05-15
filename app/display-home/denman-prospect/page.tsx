import Image from "next/image";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { PremiumScrollShell } from "@/components/public-ui/PremiumScrollShell";
import { projects } from "@/lib/projects";
import { breadcrumbSchema, resolveMetadata, serviceSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";

const displayProject = projects.find((project) => project.slug === "molonglo-1") || projects[0];
const displayHomeImage = "/assets/images/display-home/finalist.jpeg";

export async function generateMetadata() {
  return resolveMetadata({
    title: "Molonglo Display Home in Denman Prospect | Molonglo Construction Group",
    description: "Enquire about visiting the Molonglo display home in Denman Prospect and discuss custom home building with a Canberra builder.",
    path: "/display-home/denman-prospect",
    image: displayHomeImage
  });
}

export default function DenmanProspectDisplayHomePage() {
  const projectImage = displayProject?.coverImage || "/assets/images/hero.jpg";

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
        <section className="bg-[var(--color-stone)]">
          <div className="container grid gap-10 pb-14 pt-[calc(var(--header-height)+3rem)] sm:pb-16 lg:grid-cols-[0.84fr_1.16fr] lg:items-end lg:pt-[calc(var(--header-height)+5rem)]">
            <div className="max-w-3xl">
              <p className="eyebrow">Display Home</p>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.02] text-molonglo-ink sm:text-5xl lg:text-6xl">
                Molonglo Display Home in Denman Prospect
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700 sm:text-xl">
                Arrange a conversation with the Molonglo Construction Group team about the Denman Prospect display home and the next step for your build.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact#quote" className="cta">
                  Request a Visit
                </Link>
                <Link href="/projects" className="cta-secondary">
                  View Projects
                </Link>
              </div>
            </div>
            <div className="surface-panel overflow-hidden bg-[var(--color-clay)]">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={displayHomeImage}
                  alt="Molonglo Construction Group display home feature image"
                  fill
                  priority
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="eyebrow">Denman Prospect</p>
              <h2 className="heading-lg mt-4">A local display home enquiry point for Canberra clients.</h2>
              <p className="mt-5 text-lg leading-8 text-zinc-700">
                Visit our Denman Prospect display home during opening hours to explore the build quality, finishes and layout in person.<br /><br />
                Open Thursday to Monday, 10:00 AM - 4:00 PM. Outside these hours, our team can arrange a private appointment at a suitable time.
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
              <Image src={projectImage} alt="Molonglo display home enquiry image for Denman Prospect" width={1400} height={980} className="h-[30rem] w-full object-cover" />
              <div className="p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-molonglo-gold">Location</p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-molonglo-ink">Denman Prospect</h2>
                <p className="mt-3 text-sm leading-7 text-zinc-700">
                  Visit our Denman Prospect display home from Thursday to Monday, 10:00 AM to 4:00 PM. Walk-ins are welcome during opening hours.<br />
                  If you&apos;d like to visit outside these times, please contact our team and we&apos;ll arrange a time that suits you.
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
