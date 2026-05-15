import Image from "next/image";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { PremiumScrollShell } from "@/components/public-ui/PremiumScrollShell";
import { breadcrumbSchema, resolveMetadata, serviceSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

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
          <div className="container pb-14 pt-[calc(var(--header-height)+3rem)] sm:pb-16 lg:pt-[calc(var(--header-height)+5rem)]">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="max-w-4xl">
                <p className="eyebrow">Display Home</p>
                <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.02] text-molonglo-ink sm:text-5xl lg:text-6xl">
                  Molonglo Display Home in Denman Prospect
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-700 sm:text-xl">
                  Visit the Denman Prospect display home during opening hours, or arrange a private appointment with the Molonglo Construction Group team.
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

              <div className="flex flex-wrap gap-3 lg:max-w-sm lg:justify-end">
                <p className="rounded-full border border-[var(--color-border)] bg-white/70 px-4 py-2 text-sm font-semibold text-molonglo-ink shadow-sm">
                  Thu-Mon
                </p>
                <p className="rounded-full border border-[var(--color-border)] bg-white/70 px-4 py-2 text-sm font-semibold text-molonglo-ink shadow-sm">
                  10:00 AM - 4:00 PM
                </p>
                <p className="rounded-full border border-[var(--color-border)] bg-white/70 px-4 py-2 text-sm font-semibold text-molonglo-ink shadow-sm">
                  Walk-ins welcome
                </p>
              </div>
            </div>

            <div className="surface-panel mx-auto mt-10 max-w-3xl overflow-hidden bg-[var(--color-clay)] p-2 sm:mt-12 sm:p-3">
              <Image
                src={displayHomeImage}
                alt="Molonglo Construction Group display home feature image"
                width={1024}
                height={1280}
                priority
                sizes="(min-width: 1024px) 768px, calc(100vw - 2.5rem)"
                className="h-auto w-full rounded-[6px]"
              />
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="eyebrow">Denman Prospect</p>
              <h2 className="heading-lg mt-4">A local display home enquiry point for Canberra clients.</h2>
              <p className="mt-5 text-lg leading-8 text-zinc-700">
                Open Thursday to Monday, 10:00 AM - 4:00 PM. Walk-ins are welcome during opening hours, with private appointments available outside standard hours by arrangement.
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

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="surface-panel p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-molonglo-gold">Opening Hours</p>
                <h3 className="mt-4 font-display text-2xl font-semibold text-molonglo-ink">Thursday to Monday</h3>
                <p className="mt-3 text-base leading-7 text-zinc-700">10:00 AM - 4:00 PM</p>
                <p className="mt-5 text-sm leading-7 text-zinc-700">Walk-ins are welcome during opening hours.</p>
              </article>

              <article className="surface-panel p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-molonglo-gold">Appointments</p>
                <h3 className="mt-4 font-display text-2xl font-semibold text-molonglo-ink">Private visits</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-700">
                  Private appointments are available outside standard hours by arrangement with our team.
                </p>
              </article>

              <article className="surface-panel p-6 sm:col-span-2 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-molonglo-gold">Location</p>
                <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-molonglo-ink">Denman Prospect display home</h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-700">{site.address}</p>
                  </div>
                  <Link href="/contact#quote" className="cta w-full sm:w-fit">
                    Contact the Team
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <CTA />
      </PremiumScrollShell>
    </>
  );
}
