import Link from "next/link";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { SignatureBuildingProcess } from "@/components/SignatureBuildingProcess";
import { getPublishedBlogs } from "@/lib/blog";
import { getLocationBySlug, getServiceBySlug, locations, services } from "@/lib/content";
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

async function findRelatedBlogs(slugs: string[]) {
  const posts = await getPublishedBlogs();
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
              <div className="surface-panel p-6">
                <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-molonglo-ink">Related locations</h2>
                <ul className="mt-4 space-y-2 text-sm font-semibold text-molonglo-gold">
                  {relatedLocations.map((location) => (
                    <li key={location.slug}>
                      <Link href={`/${location.slug}`}>{location.h1}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="surface-panel p-6">
                <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-molonglo-ink">Relevant guides</h2>
                <ul className="mt-4 space-y-2 text-sm font-semibold text-molonglo-gold">
                  {relatedBlogs.map((post) => (
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="surface-panel bg-molonglo-ink p-6 text-white">
                <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-white">Talk about your project</h2>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  Share your block, suburb and project goals and we can discuss the next practical step.
                </p>
                <Link href="/contact#quote" className="cta mt-5 w-full">
                  Request a Quote
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <SignatureBuildingProcess />
        <CTA />
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

            <h2>Frequently asked questions</h2>
            {location.faqs.map((faq) => (
              <section key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </section>
            ))}
          </article>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="surface-panel p-6">
              <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-molonglo-ink">Nearby service areas</h2>
              <ul className="mt-4 space-y-2 text-sm font-semibold text-molonglo-gold">
                {nearbyLocations.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/${item.slug}`}>{item.h1}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-panel p-6">
              <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-molonglo-ink">Helpful articles</h2>
              <ul className="mt-4 space-y-2 text-sm font-semibold text-molonglo-gold">
                {relatedBlogs.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-panel bg-molonglo-ink p-6 text-white">
              <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-white">Start with a local consultation</h2>
              <p className="mt-3 text-sm leading-7 text-white/72">
                We can review the block, suburb context and the most suitable project path for your property.
              </p>
              <Link href="/contact#quote" className="cta mt-5 w-full">
                Request a Quote
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <SignatureBuildingProcess />
      <CTA />
    </>
  );
}
