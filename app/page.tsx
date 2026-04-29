import Image from "next/image";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { SignatureBuildingProcess } from "@/components/SignatureBuildingProcess";
import { HomeScrollJourney } from "@/components/home/HomeScrollJourney";
import { MotionSection } from "@/components/motion/MotionSection";
import { getPublishedBlogs } from "@/lib/blog";
import { locations, projects, services } from "@/lib/content";
import { breadcrumbSchema, resolveMetadata, serviceSchema } from "@/lib/seo";
import { getSeoSchema } from "@/lib/seo-overrides";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return resolveMetadata({
    title: "Home Builders Canberra | Molonglo Construction Group",
    description: "Canberra builder for custom homes, knockdown rebuilds, new homes and residential construction with a refined process and local expertise.",
    path: "/",
    image: "/assets/images/hero.jpg"
  });
}

const differentiators = [
  "Canberra-focused advice grounded in local site conditions and approvals.",
  "Builder-led planning that keeps scope, budget and documentation aligned.",
  "A personalised process with direct communication from consultation to handover.",
  "Quality craftsmanship backed by practical decision-making at every stage."
];

export default async function HomePage() {
  const recentBlogs = (await getPublishedBlogs()).slice(0, 3);
  const featuredLocations = locations.slice(0, 4);
  const schemaOverride = await getSeoSchema("/");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", href: "/" }]),
          serviceSchema({
            name: "Residential construction services in Canberra",
            description: "Custom homes, new homes, knockdown rebuilds and residential construction planning in Canberra and surrounding areas.",
            path: "/"
          })
        ]}
      />
      {schemaOverride ? <JsonLd data={schemaOverride} /> : null}

      <section className="surface-dark relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <Image
            src="/assets/images/hero.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_28%),linear-gradient(180deg,rgba(12,15,14,0.24),rgba(12,15,14,0.9))]" />
        </div>
        <div className="container relative flex min-h-[88svh] flex-col justify-end py-20">
          <div className="max-w-5xl">
            <p className="eyebrow text-white/75">Custom homes, rebuilds and residential construction in Canberra</p>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[0.9] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
              A refined building experience for Canberra homeowners who want clarity from day one.
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
              Molonglo Construction Group delivers custom homes, new homes, knockdown rebuilds and selected residential projects with builder-led planning, direct communication and quality craftsmanship.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact#quote" className="cta">
                Request a Quote
              </Link>
              <Link href="/projects" className="cta-secondary border-white/35 bg-white/10 text-white hover:border-white hover:bg-white hover:text-molonglo-ink">
                View Projects
              </Link>
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {[
              ["Custom Homes", "Tailored planning for premium family homes and one-off builds."],
              ["Local Builder", "Canberra and Molonglo Valley knowledge built into every stage."],
              ["Refined Process", "A practical path from consultation to approvals, construction and handover."]
            ].map(([title, body]) => (
              <div key={title} className="rounded-[1.5rem] border border-white/12 bg-white/8 p-5 backdrop-blur">
                <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-white">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/72">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MotionSection as="section" className="section bg-white" staggerSelector="[data-motion-item]">
        <div className="container grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="max-w-3xl" data-motion-item="">
            <p className="eyebrow">Why Molonglo Construction</p>
            <h2 className="heading-lg mt-4">A Canberra builder focused on process, communication and homes that work beyond handover.</h2>
            <p className="mt-5 text-lg leading-8 text-zinc-700">
              Large builders compete on scale. Molonglo Construction Group competes on local knowledge, direct communication and a more personalised building experience. We help clients make better decisions early so the design, approvals and construction program stay aligned.
            </p>
          </div>
          <div className="grid gap-4">
            {differentiators.map((item) => (
              <div key={item} className="surface-panel flex gap-4 p-6" data-motion-item="">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-molonglo-gold" aria-hidden />
                <p className="text-base leading-7 text-zinc-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      <HomeScrollJourney />

      <MotionSection as="section" className="section bg-[#f6f3ee]" staggerSelector="[data-motion-item]">
        <div className="container">
          <div className="max-w-3xl" data-motion-item="">
            <p className="eyebrow">Services</p>
            <h2 className="heading-lg mt-4">Residential construction services built around real Canberra project needs.</h2>
            <p className="mt-4 text-lg leading-8 text-zinc-700">
              Explore the core services homeowners and landowners ask us about most often, from custom homes to knockdown rebuilds and selected renovation work.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <article key={service.slug} className="surface-panel flex h-full flex-col justify-between p-6" data-motion-item="">
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-molonglo-ink">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-zinc-600">{service.intro}</p>
                </div>
                <Link href={`/${service.slug}`} className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-molonglo-gold">
                  Learn more
                </Link>
              </article>
            ))}
          </div>
        </div>
      </MotionSection>

      <SignatureBuildingProcess />

      <MotionSection as="section" className="section bg-white" staggerSelector="[data-motion-item]">
        <div className="container">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl" data-motion-item="">
              <p className="eyebrow">Selected Projects</p>
              <h2 className="heading-lg mt-4">Recent work across Canberra and the Molonglo Valley corridor.</h2>
            </div>
            <Link href="/projects" className="cta-secondary w-fit" data-motion-item="">
              Explore Projects
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article key={project.title} className="surface-panel overflow-hidden" data-motion-item="">
                <Image src={project.image} alt={`${project.title} in ${project.location}`} width={960} height={720} className="h-64 w-full object-cover" />
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-molonglo-gold">{project.location}</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] text-molonglo-ink">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{project.summary}</p>
                  <p className="mt-3 text-sm font-medium text-zinc-700">{project.specs}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection as="section" className="section bg-[#f6f3ee]" staggerSelector="[data-motion-item]" parallax={18}>
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-motion-item="">
            <p className="eyebrow">Service Areas</p>
            <h2 className="heading-lg mt-4">Building across Canberra, the ACT and nearby NSW service areas.</h2>
            <p className="mt-5 text-lg leading-8 text-zinc-700">
              We work with homeowners in Canberra, Molonglo Valley, Denman Prospect, Wright, Coombs and Queanbeyan. Each suburb has its own planning context, block types and build priorities, so we create location-specific guidance instead of generic doorway pages.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {featuredLocations.map((location) => (
              <Link key={location.slug} href={`/${location.slug}`} className="surface-panel p-6 transition hover:border-molonglo-gold/40" data-motion-item="">
                <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-molonglo-ink">{location.h1}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{location.intro}</p>
              </Link>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection as="section" className="section bg-white" staggerSelector="[data-motion-item]">
        <div className="container">
          <div className="max-w-3xl" data-motion-item="">
            <p className="eyebrow">Building Guides</p>
            <h2 className="heading-lg mt-4">Helpful articles for homeowners planning a build in Canberra.</h2>
          </div>
          {recentBlogs.length ? (
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {recentBlogs.map((post) => (
                <article key={post.slug} className="surface-panel overflow-hidden" data-motion-item="">
                  <Image src={post.featuredImage} alt={post.title} width={900} height={640} className="h-56 w-full object-cover" />
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-molonglo-gold">
                      {post.category}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] text-molonglo-ink">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-600">{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex text-sm font-semibold uppercase tracking-[0.18em] text-molonglo-gold">
                      Read article
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="surface-panel mt-12 p-8" data-motion-item="">
              <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-molonglo-ink">No blog posts published yet</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                The public blog will appear here after the database is migrated and posts are published from the admin area.
              </p>
            </div>
          )}
        </div>
      </MotionSection>

      <CTA />
    </>
  );
}
