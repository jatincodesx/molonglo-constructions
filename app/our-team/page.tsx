import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PremiumScrollShell } from "@/components/public-ui/PremiumScrollShell";
import { breadcrumbSchema, resolveMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return resolveMetadata({
    title: "Our Team | Molonglo Construction Group",
    description: "Meet the hands-on Molonglo Construction Group team focused on clear communication, practical planning and quality residential construction.",
    path: "/our-team"
  });
}

export default function OurTeamPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Our Team", href: "/our-team" }])} />
      <PremiumScrollShell mode="light">
        <section className="section bg-[var(--color-stone)]">
          <div className="container max-w-4xl">
            <p className="eyebrow">Company</p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.02] text-molonglo-ink sm:text-5xl lg:text-6xl">
              Our Team
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-700 sm:text-xl">
              Molonglo Construction Group is led by a hands-on team focused on clear communication, practical planning and quality residential construction.
            </p>
            <div className="mt-8">
              <Link href="/contact" className="cta">
                Contact the Team
              </Link>
            </div>
          </div>
        </section>
      </PremiumScrollShell>
    </>
  );
}
