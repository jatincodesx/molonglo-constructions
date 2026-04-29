import Image from "next/image";
import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { PremiumScrollShell } from "@/components/public-ui/PremiumScrollShell";
import { projects } from "@/lib/content";
import { breadcrumbSchema, resolveMetadata } from "@/lib/seo";
import { getSeoSchema } from "@/lib/seo-overrides";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return resolveMetadata({
    title: "Projects | Molonglo Construction Group",
    description: "Explore recent Molonglo Construction Group residential projects across Canberra and the Molonglo Valley corridor.",
    path: "/projects",
    image: "/assets/images/projects/display-whitlam.jpg"
  });
}

export default async function ProjectsPage() {
  const schemaOverride = await getSeoSchema("/projects");
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Projects", href: "/projects" }])} />
      {schemaOverride ? <JsonLd data={schemaOverride} /> : null}
      <PremiumScrollShell mode="light">
        <Hero
          eyebrow="Projects"
          title="Residential projects shaped by thoughtful planning and quality craftsmanship."
          text="A selection of homes and residential outcomes across Canberra and the Molonglo Valley corridor."
          image="/assets/images/projects/display-whitlam.jpg"
          primaryLabel="Talk About Your Project"
        />

      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl">
            <p className="eyebrow">Selected Work</p>
            <h2 className="heading-lg mt-4">Recent homes that reflect the way we balance liveability, buildability and finish quality.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article key={project.title} className="surface-panel overflow-hidden">
                <Image src={project.image} alt={`${project.title} project in ${project.location}`} width={1200} height={900} className="h-72 w-full object-cover" />
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-molonglo-gold">{project.location}</p>
                  <h2 className="mt-3 font-display text-2xl font-semibold text-molonglo-ink">{project.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{project.summary}</p>
                  <p className="mt-3 text-sm font-medium text-zinc-700">{project.specs}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      </PremiumScrollShell>
    </>
  );
}
