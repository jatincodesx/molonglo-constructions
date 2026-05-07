import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { PremiumScrollShell } from "@/components/public-ui/PremiumScrollShell";
import { ServiceAreaSuburbSearch } from "@/components/service-areas/ServiceAreaSuburbSearch";
import { breadcrumbSchema, faqSchema, resolveMetadata, serviceSchema } from "@/lib/seo";
import { getSeoSchema } from "@/lib/seo-overrides";
import { serviceAreaGroups, serviceAreaSuburbs } from "@/lib/service-areas";

export const dynamic = "force-dynamic";

const areaFaqs = [
  {
    question: "Does Molonglo Construction Group build outside Canberra?",
    answer: "Yes. In addition to Canberra and ACT surrounds, suitable enquiries in Queanbeyan, Googong, Jerrabomberra and selected South Coast locations can be discussed."
  },
  {
    question: "Can I search for my suburb before contacting you?",
    answer: "Yes. Use the suburb search on this page to find an indexable local page with relevant service links, nearby suburbs and practical building considerations."
  },
  {
    question: "Can you review a block before plans are complete?",
    answer: "Yes. Early builder input can help identify slope, access, orientation, retaining, approvals and budget considerations before documentation is fixed."
  }
];

export async function generateMetadata() {
  return resolveMetadata({
    title: "Canberra & ACT Building Service Areas | Molonglo Construction Group",
    description: "Search Canberra, ACT, nearby NSW and selected South Coast building service areas for Molonglo Construction Group. Find suburb pages and contact us about your site.",
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
            areaServed: serviceAreaSuburbs.map((suburb) => suburb.name)
          }),
          faqSchema(areaFaqs)
        ]}
      />
      {schemaOverride ? <JsonLd data={schemaOverride} /> : null}
      <PremiumScrollShell mode="light">
        <Hero
          eyebrow="Where We Build"
          title="Canberra & ACT Building Service Areas"
          text="Molonglo Construction Group works across Canberra, the ACT, surrounding regions and selected South Coast areas, with each enquiry reviewed around the site, scope and practical buildability."
          image="/assets/images/projects/display-whitlam.jpg"
          primaryHref="/contact#quote"
          primaryLabel="Ask About Your Area"
          secondaryHref="/services"
          secondaryLabel="Services"
        />

        <ServiceAreaSuburbSearch groups={serviceAreaGroups} />

        <section className="section bg-white">
          <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Regional Coverage</p>
              <h2 className="heading-lg mt-4">ACT, nearby NSW and selected South Coast locations.</h2>
            </div>
            <div className="prose-seo">
              <p>
                Canberra and ACT projects can involve established blocks, newer estates, slope, access, mature trees, orientation, estate controls and planning coordination. The service area pages are designed to keep that local context visible rather than reducing every suburb to the same generic builder copy.
              </p>
              <p>
                Queanbeyan, Googong and Jerrabomberra enquiries are reviewed with the NSW and ACT border context in mind. Selected South Coast locations including Batemans Bay, Narooma, Bega, Pambula and Merimbula are assessed by project scope, distance, site access and early feasibility.
              </p>
              <Link href="/contact#quote" className="cta mt-6">
                Confirm Your Location
              </Link>
            </div>
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
