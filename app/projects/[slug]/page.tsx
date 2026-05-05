import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { PremiumScrollShell } from "@/components/public-ui/PremiumScrollShell";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { getProjectBySlug, projects } from "@/lib/projects";
import { absoluteUrl, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return buildMetadata({
      title: "Project Not Found | Molonglo Construction Group",
      description: "The requested Molonglo Construction Group project could not be found.",
      path: "/projects"
    });
  }

  return buildMetadata({
    title: `${project.title} | ${project.location} Project | Molonglo Construction Group`,
    description: `${project.title} is a ${project.category.toLowerCase()} project by Molonglo Construction Group in ${project.location}.`,
    path: `/projects/${project.slug}`,
    image: project.coverImage
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Projects", href: "/projects" },
            { name: project.title, href: `/projects/${project.slug}` }
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.description,
            image: project.galleryImages.map((image) => absoluteUrl(image)),
            locationCreated: project.location,
            creator: {
              "@type": "Organization",
              name: site.name,
              url: site.url
            },
            url: absoluteUrl(`/projects/${project.slug}`)
          }
        ]}
      />
      <PremiumScrollShell mode="light">
        <section className="bg-[var(--color-stone)] py-12 sm:py-16 lg:py-20">
          <div className="container">
            <Link href="/projects" className="text-sm font-semibold text-molonglo-gold transition hover:text-molonglo-ink">
              Back to projects
            </Link>
            <div className="mt-8 grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="eyebrow">{project.location} / {project.category}</p>
                <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.02] text-molonglo-ink sm:text-5xl lg:text-6xl">
                  {project.title}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700">{project.description}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/contact" className="cta">
                    Discuss a Similar Project
                  </Link>
                  <Link href="/projects" className="cta-secondary">
                    All Projects
                  </Link>
                </div>
              </div>
              <div className="surface-panel overflow-hidden">
                <Image
                  src={project.coverImage}
                  alt={`${project.title} residential project in ${project.location}`}
                  width={1500}
                  height={1000}
                  priority
                  className="h-[24rem] w-full object-cover sm:h-[32rem]"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container">
            <div className="section-heading section-heading--split">
              <div>
                <p className="eyebrow">Project Gallery</p>
                <h2 className="heading-lg mt-4">Selected imagery from {project.title}.</h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-zinc-700">
                Images open individually for a closer look. Project details are limited to verified folder and location information.
              </p>
            </div>

            <ProjectGallery
              images={project.galleryImages}
              projectTitle={project.title}
              location={project.location}
            />
          </div>
        </section>

        <CTA />
      </PremiumScrollShell>
    </>
  );
}
