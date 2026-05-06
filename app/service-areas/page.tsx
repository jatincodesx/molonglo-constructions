import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { PremiumScrollShell } from "@/components/public-ui/PremiumScrollShell";
import { locations } from "@/lib/content";
import { breadcrumbSchema, faqSchema, resolveMetadata, serviceSchema } from "@/lib/seo";
import { getSeoSchema } from "@/lib/seo-overrides";

export const dynamic = "force-dynamic";

const areaGroups = [
  {
    title: "Canberra & ACT",
    text: "Custom homes, rebuilds and residential construction across Canberra and established ACT suburbs.",
    links: ["builder-canberra", "builder-wright-act", "builder-coombs"]
  },
  {
    title: "Molonglo Valley",
    text: "Denman Prospect, Wright, Coombs and nearby Molonglo Valley blocks with slope, outlook and estate considerations.",
    links: ["builder-molonglo-valley", "builder-denman-prospect", "builder-wright-act", "builder-coombs"]
  },
  {
    title: "Queanbeyan region",
    text: "Residential building support for Queanbeyan and nearby NSW service areas where the site and project are a good fit.",
    links: ["builder-queanbeyan", "builder-jerrabomberra", "builder-googong"]
  },
  {
    title: "Googong / Jerrabomberra",
    text: "New homes, custom homes and residential projects around fast-growing NSW communities close to Canberra.",
    links: ["builder-googong", "builder-jerrabomberra"]
  },
  {
    title: "South Coast",
    text: "Selected South Coast enquiries, including Batemans Bay, Narooma, Bega, Pambula and Merimbula, are reviewed by project fit.",
    links: []
  }
];

const areaFaqs = [
  {
    question: "Does Molonglo Construction Group build outside Canberra?",
    answer: "Yes. In addition to Canberra and ACT surrounds, suitable enquiries in Queanbeyan, Googong, Jerrabomberra and selected South Coast locations can be discussed."
  },
  {
    question: "Why are service areas grouped instead of listing every suburb?",
    answer: "Grouping areas keeps the site useful and avoids thin suburb pages. The focus is on local context, site considerations and practical next steps."
  },
  {
    question: "Can you review a block before plans are complete?",
    answer: "Yes. Early builder input can help identify slope, access, orientation, retaining, approvals and budget considerations before documentation is fixed."
  }
];

function findLocations(slugs: string[]) {
  return slugs
    .map((slug) => locations.find((location) => location.slug === slug))
    .filter((location): location is NonNullable<typeof location> => Boolean(location));
}

export async function generateMetadata() {
  return resolveMetadata({
    title: "Service Areas | Canberra, ACT & NSW Surrounds Builder",
    description: "See where Molonglo Construction Group builds, including Canberra, Molonglo Valley, Queanbeyan, Googong, Jerrabomberra and selected South Coast areas.",
    path: "/service-areas",
    image: "/assets/images/projects/display-whitlam.jpg"
  });
}

export default async function ServiceAreasPage() {
  const schemaOverride = await getSeoSchema("/service-areas");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Service Areas", href: "/service-areas" }]),
          serviceSchema({
            name: "Service Areas",
            description: "Residential building service areas across Canberra, ACT surrounds, nearby NSW regions and selected South Coast locations.",
            path: "/service-areas",
            areaServed: ["Canberra", "ACT", "Molonglo Valley", "Queanbeyan", "Googong", "Jerrabomberra", "South Coast"]
          }),
          faqSchema(areaFaqs)
        ]}
      />
      {schemaOverride ? <JsonLd data={schemaOverride} /> : null}
      <PremiumScrollShell mode="light">
        <Hero
          eyebrow="Where We Build"
          title="Service Areas"
          text="Molonglo Construction Group is based in Denman Prospect and works across Canberra, ACT surrounds, nearby NSW communities and selected South Coast locations."
          image="/assets/images/projects/display-whitlam.jpg"
          primaryHref="/contact#quote"
          primaryLabel="Ask About Your Area"
          secondaryHref="/services"
          secondaryLabel="Services"
        />

        <section className="section bg-white">
          <div className="container grid gap-8">
            {areaGroups.map((group) => {
              const groupLocations = findLocations(group.links);

              return (
                <section key={group.title} className="grid gap-6 border-t border-[var(--color-border)] pt-8 lg:grid-cols-[0.75fr_1.25fr]">
                  <div>
                    <h2 className="font-display text-3xl font-semibold text-molonglo-ink">{group.title}</h2>
                    <p className="mt-3 text-base leading-7 text-zinc-700">{group.text}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {groupLocations.length ? (
                      groupLocations.map((location) => (
                        <Link key={location.slug} href={`/${location.slug}`} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] p-5 transition hover:border-molonglo-gold hover:bg-white">
                          <h3 className="font-display text-2xl font-semibold text-molonglo-ink">{location.suburb}</h3>
                          <p className="mt-2 text-sm leading-6 text-zinc-600">{location.intro}</p>
                        </Link>
                      ))
                    ) : (
                      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] p-5 sm:col-span-2 xl:col-span-3">
                        <p className="text-base leading-7 text-zinc-700">
                          South Coast enquiries are assessed individually. Contact the team for Batemans Bay, Narooma, Bega, Pambula or Merimbula projects.
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <section className="section bg-[var(--color-stone)]">
          <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">FAQs</p>
              <h2 className="heading-lg mt-4">Service area questions.</h2>
            </div>
            <div className="prose-seo">
              {areaFaqs.map((faq) => (
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
