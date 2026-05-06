import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { PremiumScrollShell } from "@/components/public-ui/PremiumScrollShell";
import { locations, services } from "@/lib/content";
import { breadcrumbSchema, faqSchema, resolveMetadata, serviceSchema } from "@/lib/seo";
import { getSeoSchema } from "@/lib/seo-overrides";

export const dynamic = "force-dynamic";

const coreServiceSlugs = [
  "custom-home-builders-canberra",
  "knockdown-rebuild-canberra",
  "new-home-builders-canberra",
  "construction-services-canberra"
];

const serviceCards = [
  ...coreServiceSlugs.map((slug) => {
    const service = services.find((item) => item.slug === slug);
    return service
      ? {
          title: service.title,
          href: `/${service.slug}`,
          text: service.intro
        }
      : null;
  }),
  {
    title: "House and Land Canberra",
    href: "/house-and-land-canberra",
    text: "Discuss house and land package opportunities across Canberra, ACT surrounds and selected South Coast areas."
  }
].filter((item): item is { title: string; href: string; text: string } => Boolean(item));

const serviceFaqs = [
  {
    question: "What residential building services does Molonglo Construction Group provide?",
    answer: "Molonglo Construction Group focuses on custom homes, new home builds, knockdown rebuilds, residential construction services and house and land package enquiries across Canberra and surrounding regions."
  },
  {
    question: "When should I contact a builder?",
    answer: "Early contact is useful before plans are fixed. We work with your designer, architect, or planning team to align the design, documentation, budget, and buildability."
  },
  {
    question: "Where does Molonglo Construction Group build?",
    answer: "We are based in Denman Prospect and work across Canberra, Molonglo Valley, Queanbeyan, Googong, Jerrabomberra and selected South Coast locations by enquiry."
  }
];

export async function generateMetadata() {
  return resolveMetadata({
    title: "Services | Custom Homes, Rebuilds & Residential Construction Canberra",
    description: "Explore Molonglo Construction Group services for custom homes, knockdown rebuilds, new homes and residential construction in Canberra. Start a practical build conversation.",
    path: "/services",
    image: "/assets/images/FE02BB99-4862-4A69-87E3-2359B9E7FFFD_1_201_a.jpeg"
  });
}

export default async function ServicesPage() {
  const schemaOverride = await getSeoSchema("/services");
  const featuredLocations = locations.filter((location) =>
    ["builder-canberra", "builder-denman-prospect", "builder-molonglo-valley", "builder-googong", "builder-queanbeyan", "builder-jerrabomberra"].includes(location.slug)
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]),
          serviceSchema({
            name: "Services",
            description: "Custom homes, rebuilds, new homes, house and land enquiries and residential construction services in Canberra.",
            path: "/services"
          }),
          faqSchema(serviceFaqs)
        ]}
      />
      {schemaOverride ? <JsonLd data={schemaOverride} /> : null}
      <PremiumScrollShell mode="light">
        <Hero
          eyebrow="Services"
          title="Services"
          text="Residential building services for Canberra homeowners who want clear planning, local site knowledge and a refined construction process."
          image="/assets/images/FE02BB99-4862-4A69-87E3-2359B9E7FFFD_1_201_a.jpeg"
          primaryHref="/contact#quote"
          primaryLabel="Start a Build"
          secondaryHref="/service-areas"
          secondaryLabel="Where We Build"
        />

        <section className="section bg-white">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">What We Build</p>
              <h2 className="heading-lg mt-4">A central pathway for custom homes, new builds and rebuilds.</h2>
              <p>
                Molonglo Construction Group helps clients understand the right construction pathway before drawings, scope and budget drift apart.
              </p>
            </div>
            <div className="service-grid">
              {serviceCards.map((service) => (
                <Link key={service.href} href={service.href} className="service-card">
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <span>View service</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-[var(--color-stone)]">
          <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="eyebrow">Where We Build</p>
              <h2 className="heading-lg mt-4">Canberra, Molonglo Valley, NSW surrounds and selected South Coast areas.</h2>
              <p className="mt-5 text-lg leading-8 text-zinc-700">
                Local context matters for slope, access, orientation, approvals, estate requirements and construction sequencing.
              </p>
              <Link href="/service-areas" className="cta-secondary mt-7">
                View Service Areas
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {featuredLocations.map((location) => (
                <Link key={location.slug} href={`/${location.slug}`} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] p-5 transition hover:border-molonglo-gold hover:bg-white">
                  <h3 className="font-display text-2xl font-semibold text-molonglo-ink">{location.suburb}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{location.intro}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">FAQs</p>
              <h2 className="heading-lg mt-4">Common service questions.</h2>
            </div>
            <div className="prose-seo">
              {serviceFaqs.map((faq) => (
                <section key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </section>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </PremiumScrollShell>
    </>
  );
}
