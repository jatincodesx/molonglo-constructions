import Image from "next/image";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { PremiumScrollShell } from "@/components/public-ui/PremiumScrollShell";
import { projects } from "@/lib/projects";
import { breadcrumbSchema, resolveMetadata } from "@/lib/seo";
import { getSeoSchema } from "@/lib/seo-overrides";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return resolveMetadata({
    title: "Projects | Molonglo Construction Group",
    description: "Explore Molonglo Construction Group residential project photos across Canberra, Googong and the Molonglo Valley corridor.",
    path: "/projects",
    image: projects[0]?.coverImage || "/assets/images/hero.jpg"
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
          text="A selection of real project imagery from Molonglo Construction Group homes and residential outcomes across the Canberra region."
          image={projects[0]?.coverImage || "/assets/images/hero.jpg"}
          primaryHref="/contact"
          primaryLabel="Talk About Your Project"
        />

      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl">
            <p className="eyebrow">Selected Work</p>
            <h2 className="heading-lg mt-4">Recent homes that reflect the way we balance liveability, buildability and finish quality.</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                aria-label={`View ${project.title} project gallery`}
                className="surface-panel group block overflow-hidden transition duration-200 hover:-translate-y-1 hover:border-molonglo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold"
              >
                <article>
                  <div className="block overflow-hidden">
                  <Image src={project.coverImage} alt={`${project.title} residential project in ${project.location}`} width={1400} height={980} className="h-80 w-full object-cover transition duration-500 hover:scale-[1.03]" />
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-molonglo-gold">{project.location} / {project.category}</p>
                    <h2 className="mt-3 font-display text-2xl font-semibold text-molonglo-ink transition group-hover:text-molonglo-gold">
                      {project.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-zinc-700">{project.description}</p>
                    <div className="mt-6 grid grid-cols-3 gap-2">
                      {project.galleryImages.slice(1, 4).map((image, index) => (
                        <Image
                          key={image}
                          src={image}
                          alt={`${project.title} residential project detail in ${project.location} by Molonglo Construction Group`}
                          width={420}
                          height={320}
                          className="h-28 w-full rounded-md object-cover transition group-hover:opacity-85"
                        />
                      ))}
                    </div>
                    <span className="mt-6 inline-flex text-sm font-semibold text-molonglo-gold transition group-hover:text-molonglo-ink">
                      View gallery
                    </span>
                    {project.status ? <p className="mt-4 text-sm font-semibold text-zinc-800">{project.status}</p> : null}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      </PremiumScrollShell>
    </>
  );
}
