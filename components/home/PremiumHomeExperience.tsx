import Image from "next/image";
import Link from "next/link";
import { PremiumScrollShell } from "@/components/public-ui/PremiumScrollShell";
import type { BlogPost } from "@/lib/blog";
import type { LocationPage, Project, ServicePage } from "@/lib/content";
import { actServiceAreas, site, southCoastServiceAreas } from "@/lib/site";

type PremiumHomeExperienceProps = {
  recentBlogs: BlogPost[];
  locations: LocationPage[];
  projects: Project[];
  services: ServicePage[];
};

const trustItems = ["Canberra / ACT builder", "Custom homes", "Knockdown rebuilds", "Licensed builder", "Local project experience"];

const journey = [
  {
    title: "Vision",
    body: "We start with the block, budget and way you want to live before drawings become fixed."
  },
  {
    title: "Design",
    body: "Builder input helps align documentation, approvals thinking and buildability."
  },
  {
    title: "Construction",
    body: "A managed site sequence keeps trades, decisions and communication moving clearly."
  },
  {
    title: "Handover",
    body: "Final checks, documentation and support complete the project with confidence."
  }
];

const processSteps = [
  ["01", "Initial Consultation", "We discuss your vision, site, requirements and budget so the project starts from a practical foundation."],
  ["02", "Design & Planning", "The brief becomes drawings, selections and buildable documentation shaped around Canberra conditions."],
  ["03", "Approvals & Contracts", "Approvals, scope and contract details are coordinated before construction begins."],
  ["04", "Construction", "Your home is delivered through clear sequencing, trade coordination and regular communication."],
  ["05", "Final Inspection", "The completed work is reviewed carefully so quality and details are resolved before handover."],
  ["06", "Handover", "You receive the keys, documentation and support needed to settle into the finished home."]
];

const featuredServiceSlugs = [
  "custom-home-builders-canberra",
  "knockdown-rebuild-canberra",
  "new-home-builders-canberra",
  "construction-services-canberra"
];

export function PremiumHomeExperience({ recentBlogs, locations, projects, services }: PremiumHomeExperienceProps) {
  const featuredServices = featuredServiceSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is ServicePage => Boolean(service));
  const featuredProjects = projects.slice(0, 3);
  const featuredLocations = locations.filter((location) =>
    ["builder-canberra", "builder-denman-prospect", "builder-wright-act", "builder-coombs-act", "builder-molonglo-valley", "builder-queanbeyan"].includes(location.slug)
  );

  return (
    <PremiumScrollShell mode="light" className="premium-home">
      <section className="home-hero">
        <div className="container grid gap-12 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-24">
          <div className="max-w-4xl" data-scroll-reveal>
            <p className="eyebrow">Custom homes, rebuilds and residential construction in Canberra</p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[0.96] text-[var(--color-charcoal)] sm:text-6xl lg:text-7xl">
              Build a Canberra home with clarity from the first conversation.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700 sm:text-xl">
              Molonglo Construction Group delivers custom homes, new homes and knockdown rebuilds with builder-led planning, direct communication and craftsmanship suited to Canberra conditions.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact#quote" className="cta">
                Start a Conversation
              </Link>
              <Link href="/projects" className="cta-secondary">
                View Projects
              </Link>
            </div>
          </div>

          <div className="home-hero__visual" aria-hidden="true" data-scroll-reveal>
            <Image
              src="/assets/images/hero.jpg"
              alt=""
              width={1200}
              height={900}
              priority
              className="h-full min-h-[28rem] w-full object-cover"
            />
            <div>
              <span>Denman Prospect based</span>
              <strong>Premium residential building across Canberra and the ACT.</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Molonglo Construction Group credentials">
        <div className="container">
          <ul>
            {trustItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="max-w-3xl lg:sticky lg:top-28" data-scroll-reveal>
            <p className="eyebrow">From vision to handover</p>
            <h2 className="heading-lg mt-4">A clearer path from early ideas to a finished home.</h2>
            <p className="mt-5 text-lg leading-8 text-zinc-700">
              The build journey should be easy to understand. We keep the early decisions connected so your site, scope, approvals and budget move in the same direction.
            </p>
          </div>
          <div className="journey-panel" data-scroll-reveal>
            <div className="journey-panel__image">
              <Image src="/assets/images/projects/display-whitlam.jpg" alt="" width={1100} height={820} className="h-full w-full object-cover" />
            </div>
            <ol>
              {journey.map((step, index) => (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section bg-[var(--color-stone)]">
        <div className="container">
          <div className="section-heading" data-scroll-reveal>
            <p className="eyebrow">Services</p>
            <h2 className="heading-lg mt-4">Residential building services with a clear path forward.</h2>
            <p>Choose the building pathway that fits your block, brief and stage of planning.</p>
          </div>
          <div className="service-grid">
            {featuredServices.map((service) => (
              <Link key={service.slug} href={`/${service.slug}`} className="service-card" data-scroll-reveal>
                <h3>{service.title}</h3>
                <p>{service.intro}</p>
                <span>Learn more</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[var(--color-graphite)] text-white">
        <div className="container">
          <div className="section-heading section-heading--dark" data-scroll-reveal>
            <p className="eyebrow text-white">Our Signature Building Process</p>
            <h2 className="heading-lg mt-4 text-white">A calm sequence from first discussion to handover.</h2>
            <p className="text-white">Each stage is designed to keep the project clear, well-managed and aligned with the quality expectations of a premium Canberra home.</p>
          </div>
          <ol className="process-timeline">
            {processSteps.map(([number, title, body]) => (
              <li key={number} data-scroll-reveal>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-[var(--color-clay)]">
        <div className="container">
          <div className="section-heading section-heading--split" data-scroll-reveal>
            <div>
              <p className="eyebrow">Projects / Proof</p>
              <h2 className="heading-lg mt-4">Recent Canberra-region homes and residential projects.</h2>
            </div>
            <Link href="/projects" className="cta-secondary">
              View Projects
            </Link>
          </div>
          <div className="project-grid">
            {featuredProjects.map((project) => (
              <article key={project.title} className="project-card" data-scroll-reveal>
                <Image src={project.coverImage} alt={`${project.title} residential project in ${project.location}`} width={1200} height={900} className="h-full w-full object-cover" />
                <div>
                  <p>{project.location} / {project.category}</p>
                  <h3>{project.title}</h3>
                  <span>{project.description}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="local-band" data-scroll-reveal>
            <div>
              <p className="eyebrow">Local Areas</p>
              <h2>Building across the ACT, Canberra surrounds and selected South Coast areas.</h2>
              <p>Local site knowledge helps with orientation, access, approvals, retaining, estate requirements and the practical decisions that shape a better home.</p>
            </div>
            <div className="local-band__areas">
              <div>
                <h3>ACT and surrounds</h3>
                <p>{actServiceAreas.join(", ")}</p>
              </div>
              <div>
                <h3>South Coast</h3>
                <p>{southCoastServiceAreas.join(", ")}</p>
              </div>
              {featuredLocations.map((location) => (
                <Link key={location.slug} href={`/${location.slug}`}>
                  {location.suburb}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[var(--color-stone)]">
        <div className="container">
          <div className="section-heading section-heading--split" data-scroll-reveal>
            <div>
              <p className="eyebrow">Blog / Guides</p>
              <h2 className="heading-lg mt-4">Useful Canberra building guidance.</h2>
            </div>
            <Link href="/blog" className="cta-secondary">
              Read Guides
            </Link>
          </div>
          {recentBlogs.length ? (
            <div className="editorial-blog-grid">
              {recentBlogs.map((post) => (
                <article key={post.slug} data-scroll-reveal>
                  <Image src={post.featuredImage} alt={post.title} width={900} height={640} className="h-56 w-full object-cover" />
                  <div>
                    <p>{post.category}</p>
                    <h3>
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <span>{post.excerpt}</span>
                    <Link href={`/blog/${post.slug}`}>Read article</Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state" data-scroll-reveal>
              <h3>No building guides are published yet</h3>
              <p>New Canberra building guides will appear here after they are reviewed and published.</p>
            </div>
          )}
        </div>
      </section>

      <section className="final-cta">
        <div className="container">
          <div className="final-cta__inner" data-scroll-reveal>
            <div>
              <p className="eyebrow text-white/68">Start the conversation</p>
              <h2>Ready to discuss your build?</h2>
              <p>Share your suburb, site and project goals. We will help you understand the most practical next step for your custom home, new home or knockdown rebuild.</p>
            </div>
            <div>
              <Link href="/contact#quote" className="cta">
                Contact Molonglo
              </Link>
              <a href={site.phoneHref} className="cta-secondary border-white/35 bg-white/10 text-white hover:border-white hover:bg-white hover:text-molonglo-ink">
                {site.phone}
              </a>
              <a href={site.emailHref}>{site.email}</a>
            </div>
          </div>
        </div>
      </section>
    </PremiumScrollShell>
  );
}
