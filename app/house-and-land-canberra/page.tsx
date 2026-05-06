import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { PremiumScrollShell } from "@/components/public-ui/PremiumScrollShell";
import { breadcrumbSchema, faqSchema, resolveMetadata, serviceSchema } from "@/lib/seo";
import { getSeoSchema } from "@/lib/seo-overrides";

export const dynamic = "force-dynamic";

const faqs = [
  {
    question: "Does Molonglo Construction Group offer house and land packages in Canberra?",
    answer: "House and land package enquiries are handled directly by the team. Availability depends on location, land status, timing and the type of home you want to build."
  },
  {
    question: "Can I enquire if I am still looking for land?",
    answer: "Yes. Share the areas you are considering, your budget range and timing, and we can discuss the next practical step."
  },
  {
    question: "Where are house and land enquiries considered?",
    answer: "Enquiries are considered across Canberra, ACT surrounds, nearby NSW locations such as Googong and Queanbeyan, and selected South Coast areas by project fit."
  }
];

export async function generateMetadata() {
  return resolveMetadata({
    title: "House and Land Canberra | Molonglo Construction Group",
    description: "Discuss house and land package opportunities in Canberra, ACT surrounds and selected South Coast areas with a licensed ACT and NSW builder.",
    path: "/house-and-land-canberra",
    image: "/assets/images/FE02BB99-4862-4A69-87E3-2359B9E7FFFD_1_201_a.jpeg"
  });
}

export default async function HouseAndLandCanberraPage() {
  const schemaOverride = await getSeoSchema("/house-and-land-canberra");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
            { name: "House and Land Canberra", href: "/house-and-land-canberra" }
          ]),
          serviceSchema({
            name: "House and Land Canberra",
            description: "House and land package enquiries for Canberra, ACT surrounds and selected South Coast areas.",
            path: "/house-and-land-canberra",
            areaServed: ["Canberra", "ACT", "Queanbeyan", "Googong", "Jerrabomberra", "South Coast"]
          }),
          faqSchema(faqs)
        ]}
      />
      {schemaOverride ? <JsonLd data={schemaOverride} /> : null}
      <PremiumScrollShell mode="light">
        <Hero
          eyebrow="House & Land"
          title="House and Land Canberra"
          text="Talk with Molonglo Construction Group about land, timing, budget range and the home you want to build before choosing the next opportunity."
          image="/assets/images/FE02BB99-4862-4A69-87E3-2359B9E7FFFD_1_201_a.jpeg"
          primaryHref="/contact#quote"
          primaryLabel="Enquire About Packages"
          secondaryHref="/services"
          secondaryLabel="Services"
        />

        <section className="section bg-white">
          <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow">House and Land</p>
              <h2 className="heading-lg mt-4">A cleaner way to discuss land, design and build options together.</h2>
            </div>
            <div className="space-y-6 text-lg leading-8 text-zinc-700">
              <p>
                A house and land enquiry should start with the location, the block status, timing and the type of home you want to create. That gives the team enough context to discuss whether an upcoming opportunity or a custom pathway is the better fit.
              </p>
              <p>
                Molonglo Construction Group is based in Denman Prospect and reviews suitable enquiries across Canberra, the ACT, nearby NSW communities and selected South Coast locations.
              </p>
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-stone)] p-6">
                <h2 className="font-display text-2xl font-semibold text-molonglo-ink">Current availability</h2>
                <p className="mt-3 text-base leading-7 text-zinc-700">
                  Current house and land opportunities are available by enquiry. Share your preferred area, land status and timing so the team can respond with a practical next step.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact#quote" className="cta">
                  Contact the Team
                </Link>
                <Link href="/house-and-land-packages" className="cta-secondary">
                  Existing Packages Page
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-[var(--color-stone)]">
          <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">FAQs</p>
              <h2 className="heading-lg mt-4">House and land questions.</h2>
            </div>
            <div className="prose-seo">
              {faqs.map((faq) => (
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
