import Link from "next/link";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { PremiumScrollShell } from "@/components/public-ui/PremiumScrollShell";
import { SignatureBuildingProcess } from "@/components/SignatureBuildingProcess";
import { actSuburbs, getNearbySuburbs, getSuburbBySlug } from "@/lib/act-suburbs";
import { getPublishedBlogs } from "@/lib/blog";
import { getLocationBySlug, getServiceBySlug, locations, services } from "@/lib/content";
import { projects } from "@/lib/projects";
import { breadcrumbSchema, faqSchema, resolveMetadata, serviceSchema } from "@/lib/seo";
import { getSeoSchema } from "@/lib/seo-overrides";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (service) {
    return resolveMetadata({
      title: service.metaTitle,
      description: service.metaDescription,
      path: `/${service.slug}`,
      image: service.image
    });
  }

  const suburb = getSuburbBySlug(slug);
  if (suburb) {
    return resolveMetadata({
      title: suburb.metaTitle,
      description: suburb.metaDescription,
      path: suburb.pagePath
    });
  }

  const location = getLocationBySlug(slug);
  if (location) {
    return resolveMetadata({
      title: location.metaTitle,
      description: location.metaDescription,
      path: `/${location.slug}`,
      image: location.image
    });
  }

  return {};
}

export function generateStaticParams() {
  const slugs = [
    ...services.map((service) => ({ slug: service.slug })),
    ...locations.map((location) => ({ slug: location.slug })),
    ...actSuburbs.map((suburb) => ({ slug: suburb.pagePath.replace(/^\//, "") }))
  ];

  return Array.from(new Map(slugs.map((item) => [item.slug, item])).values());
}

async function findRelatedBlogs(slugs: string[]) {
  const posts = (await getPublishedBlogs()).filter((post) => post.slug !== "test-blog-1" && post.title !== "Test Blog 1");
  const matched = slugs
    .map((slug) => posts.find((post) => post.slug === slug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));

  return matched.length ? matched : posts.slice(0, 3);
}

function findLocationLinks(slugs: string[]) {
  return slugs
    .map((slug) => getLocationBySlug(slug))
    .filter((location): location is NonNullable<typeof location> => Boolean(location));
}

function findServiceLinks(slugs: string[]) {
  return slugs
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));
}

function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm font-semibold text-zinc-600">
      <ol className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true" className="text-zinc-400">/</span> : null}
            <Link href={item.href} className="transition hover:text-molonglo-gold">
              {item.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (service) {
    const relatedBlogs = await findRelatedBlogs(service.relatedBlogs);
    const relatedLocations = findLocationLinks(service.relatedLocations);
    const schemaOverride = await getSeoSchema(`/${service.slug}`);

    return (
      <>
        <JsonLd
          data={[
            breadcrumbSchema([{ name: "Home", href: "/" }, { name: service.title, href: `/${service.slug}` }]),
            serviceSchema({
              name: service.title,
              description: service.metaDescription,
              path: `/${service.slug}`
            }),
            faqSchema(service.faqs)
          ]}
        />
        {schemaOverride ? <JsonLd data={schemaOverride} /> : null}

        <PremiumScrollShell mode="light">
        <Hero eyebrow="Service" title={service.h1} text={service.intro} image={service.image} />

        <section className="section bg-white">
          <div className="container grid gap-10 lg:grid-cols-[1fr_320px]">
            <article className="prose-seo">
              <h2>Who this service is for</h2>
              <ul>
                {service.audience.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2>Why clients choose this pathway</h2>
              <ul>
                {service.benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              {service.sections.map((section) => (
                <section key={section.title}>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}

              <h2>Frequently asked questions</h2>
              {service.faqs.map((faq) => (
                <section key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </section>
              ))}
            </article>

            <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] p-6">
                <h2 className="font-display text-2xl font-semibold text-molonglo-ink">Related locations</h2>
                <ul className="mt-4 space-y-2 text-sm font-semibold text-molonglo-gold">
                  {relatedLocations.map((location) => (
                    <li key={location.slug}>
                      <Link href={`/${location.slug}`}>{location.h1}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {relatedBlogs.length ? (
                <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] p-6">
                  <h2 className="font-display text-2xl font-semibold text-molonglo-ink">Relevant guides</h2>
                  <ul className="mt-4 space-y-2 text-sm font-semibold text-molonglo-gold">
                    {relatedBlogs.map((post) => (
                      <li key={post.slug}>
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="rounded-lg bg-molonglo-ink p-6 text-white">
                <h2 className="font-display text-2xl font-semibold text-white">Talk about your project</h2>
                <p className="mt-3 text-sm leading-7 text-white/90">
                  Share your block, suburb and project goals and we can discuss the next practical step.
                </p>
                <Link href="/contact#quote" className="cta mt-5 w-full">
                  Start a Conversation
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <SignatureBuildingProcess />
        <CTA />
        </PremiumScrollShell>
      </>
    );
  }

  const suburb = getSuburbBySlug(slug);
  if (suburb) {
    const nearbySuburbs = getNearbySuburbs(suburb);
    const schemaOverride = await getSeoSchema(suburb.pagePath);
    const projectTypes = new Set(suburb.commonProjectTypes);

    return (
      <>
        <JsonLd
          data={[
            breadcrumbSchema([
              { name: "Home", href: "/" },
              { name: "Service Areas", href: "/service-areas" },
              { name: `Builder in ${suburb.name}`, href: suburb.pagePath }
            ]),
            serviceSchema({
              name: `Builder in ${suburb.name}`,
              description: suburb.metaDescription,
              path: suburb.pagePath,
              areaServed: [suburb.name, suburb.region, "Canberra", "ACT"]
            }),
            ...(suburb.faqs.length ? [faqSchema(suburb.faqs)] : [])
          ]}
        />
        {schemaOverride ? <JsonLd data={schemaOverride} /> : null}

        <PremiumScrollShell mode="light">
          <section className="bg-[var(--color-stone)] pt-[calc(var(--header-height)+2.5rem)]">
            <div className="container grid gap-10 pb-14 pt-10 lg:grid-cols-[0.95fr_0.55fr] lg:items-end">
              <div>
                <Breadcrumbs
                  items={[
                    { name: "Home", href: "/" },
                    { name: "Service Areas", href: "/service-areas" },
                    { name: suburb.name, href: suburb.pagePath }
                  ]}
                />
                <p className="eyebrow mt-8">{suburb.heroEyebrow}</p>
                <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.02] text-molonglo-ink sm:text-5xl lg:text-6xl">
                  Builder in {suburb.name}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-700 sm:text-xl">{suburb.introAngle}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/contact#quote" className="cta">
                    Start a Conversation
                  </Link>
                  <Link href="/service-areas" className="cta-secondary">
                    View Service Areas
                  </Link>
                </div>
              </div>
              <aside className="rounded-lg border border-[var(--color-border)] bg-white/70 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a642f]">Location context</p>
                <dl className="mt-5 grid gap-4 text-sm text-zinc-700">
                  <div>
                    <dt className="font-semibold text-molonglo-ink">Region</dt>
                    <dd className="mt-1">{suburb.region}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-molonglo-ink">Suburb type</dt>
                    <dd className="mt-1">{suburb.suburbType}</dd>
                  </div>
                </dl>
              </aside>
            </div>
          </section>

          <section className="section bg-white">
            <div className="container grid gap-10 lg:grid-cols-[1fr_320px]">
              <article className="prose-seo">
                <section>
                  <h2>Building in {suburb.name}</h2>
                  <p>{suburb.buildingContext}</p>
                  {suburb.localTalkingPoints.slice(0, 2).map((point) => (
                    <p key={point}>{point}</p>
                  ))}
                </section>

                <section>
                  <h2>Common project types in {suburb.name}</h2>
                  <ul>
                    {[...projectTypes].map((type) => (
                      <li key={type}>{type}</li>
                    ))}
                  </ul>
                  <p>
                    The right pathway depends on the site, documentation, planning requirements and how the finished home needs to perform.
                  </p>
                </section>

                <section>
                  <h2>Site and planning considerations</h2>
                  <p>{suburb.blockConsiderations}</p>
                  <p>{suburb.planningConsiderations}</p>
                  {suburb.localTalkingPoints.slice(2).map((point) => (
                    <p key={point}>{point}</p>
                  ))}
                </section>

                <section>
                  <h2>Relevant services for {suburb.name}</h2>
                  <ul>
                    {suburb.relevantServices.map((service) => (
                      <li key={`${service.href}-${service.label}`}>
                        <Link href={service.href}>{service.label}</Link>
                      </li>
                    ))}
                  </ul>
                </section>

                {suburb.faqs.length ? (
                  <section>
                    <h2>Frequently asked questions</h2>
                    {suburb.faqs.map((faq) => (
                      <section key={faq.question}>
                        <h3>{faq.question}</h3>
                        <p>{faq.answer}</p>
                      </section>
                    ))}
                  </section>
                ) : null}
              </article>

              <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] p-6">
                  <h2 className="font-display text-2xl font-semibold text-molonglo-ink">Nearby suburbs</h2>
                  <ul className="mt-4 space-y-2 text-sm font-semibold text-molonglo-gold">
                    {nearbySuburbs.map((nearby) => (
                      <li key={nearby.slug}>
                        <Link href={nearby.pagePath}>Builder in {nearby.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] p-6">
                  <h2 className="font-display text-2xl font-semibold text-molonglo-ink">Service links</h2>
                  <ul className="mt-4 space-y-2 text-sm font-semibold text-molonglo-gold">
                    {suburb.relevantServices.map((service) => (
                      <li key={`${service.href}-${service.label}`}>
                        <Link href={service.href}>{service.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg bg-molonglo-ink p-6 text-white">
                  <h2 className="font-display text-2xl font-semibold text-white">{suburb.ctaHeading}</h2>
                  <p className="mt-3 text-sm leading-7 text-white/90">{suburb.ctaText}</p>
                  <Link href="/contact#quote" className="cta mt-5 w-full">
                    Contact Molonglo
                  </Link>
                </div>
              </aside>
            </div>
          </section>

          <CTA />
        </PremiumScrollShell>
      </>
    );
  }

  const location = getLocationBySlug(slug);
  if (!location) {
    notFound();
  }

  const serviceLinks = findServiceLinks(location.serviceLinks);
  const nearbyLocations = findLocationLinks(location.nearbyLocations);
  const relatedBlogs = await findRelatedBlogs(location.relatedBlogs);
  const relevantProjects = projects
    .filter((project) => project.location.toLowerCase().includes(location.suburb.toLowerCase()) || location.suburb === "Canberra")
    .slice(0, 3);
  const projectLinks = relevantProjects.length ? relevantProjects : projects.slice(0, 2);
  const schemaOverride = await getSeoSchema(`/${location.slug}`);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", href: "/" }, { name: location.h1, href: `/${location.slug}` }]),
          serviceSchema({
            name: location.h1,
            description: location.metaDescription,
            path: `/${location.slug}`,
            areaServed: [location.suburb, "Canberra", "ACT"]
          }),
          faqSchema(location.faqs)
        ]}
      />
      {schemaOverride ? <JsonLd data={schemaOverride} /> : null}

      <PremiumScrollShell mode="light">
      <Hero eyebrow="Service Area" title={location.h1} text={location.intro} image={location.image} />

      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[1fr_320px]">
          <article className="prose-seo">
            {location.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}

            <h2>Services relevant to {location.suburb}</h2>
            <ul>
              {serviceLinks.map((serviceItem) => (
                <li key={serviceItem.slug}>
                  <Link href={`/${serviceItem.slug}`}>{serviceItem.title}</Link>
                </li>
              ))}
            </ul>

            <h2>Nearby project references</h2>
            <ul>
              {projectLinks.map((project) => (
                <li key={project.slug}>
                  <Link href={`/projects/${project.slug}`}>{project.title} in {project.location}</Link>
                </li>
              ))}
            </ul>

            <h2>Frequently asked questions</h2>
            {location.faqs.map((faq) => (
              <section key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </section>
            ))}
          </article>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] p-6">
              <h2 className="font-display text-2xl font-semibold text-molonglo-ink">Nearby service areas</h2>
              <ul className="mt-4 space-y-2 text-sm font-semibold text-molonglo-gold">
                {nearbyLocations.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/${item.slug}`}>{item.h1}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {relatedBlogs.length ? (
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] p-6">
                <h2 className="font-display text-2xl font-semibold text-molonglo-ink">Helpful articles</h2>
                <ul className="mt-4 space-y-2 text-sm font-semibold text-molonglo-gold">
                  {relatedBlogs.map((post) => (
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="rounded-lg bg-molonglo-ink p-6 text-white">
              <h2 className="font-display text-2xl font-semibold text-white">Start with a local consultation</h2>
              <p className="mt-3 text-sm leading-7 text-white/90">
                We can review the block, suburb context and the most suitable project path for your property.
              </p>
              <Link href="/contact#quote" className="cta mt-5 w-full">
                Start a Conversation
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <SignatureBuildingProcess />
      <CTA />
      </PremiumScrollShell>
    </>
  );
}
