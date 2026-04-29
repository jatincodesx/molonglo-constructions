import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { MapEmbed } from "@/components/MapEmbed";
import { QuoteForm } from "@/components/QuoteForm";
import { breadcrumbSchema, resolveMetadata } from "@/lib/seo";
import { getSeoSchema } from "@/lib/seo-overrides";
import { serviceAreas, site } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return resolveMetadata({
    title: "Contact Molonglo Construction Group | Canberra",
    description: "Contact Molonglo Construction Group for custom homes, rebuilds, renovations and residential construction enquiries in Canberra.",
    path: "/contact"
  });
}

export default async function ContactPage() {
  const schemaOverride = await getSeoSchema("/contact");
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }])} />
      {schemaOverride ? <JsonLd data={schemaOverride} /> : null}
      <Hero
        eyebrow="Contact"
        title="Talk to a Canberra builder about your project."
        text="Share your suburb, project type and priorities, and we will help you understand the most practical next step."
        image="/assets/images/hero.jpg"
        primaryLabel="Request Consultation"
      />

      <section id="quote" className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">Get In Touch</p>
            <h2 className="heading-lg mt-3">Request a consultation</h2>
            <div className="mt-8 space-y-5 text-zinc-700">
              <p>
                <strong>Office</strong>
                <br />
                {site.address}
              </p>
              <p>
                <strong>Phone</strong>
                <br />
                <a href={site.phoneHref} className="text-molonglo-gold">{site.phone}</a>
              </p>
              <p>
                <strong>Email</strong>
                <br />
                <a href={site.emailHref} className="text-molonglo-gold">{site.email}</a>
              </p>
              <p>
                <strong>Service Areas</strong>
                <br />
                {serviceAreas.join(", ")}
              </p>
              {/* TODO: Add confirmed opening hours if the business wants them displayed publicly. */}
            </div>
          </div>
          <QuoteForm source="/contact" submitLabel="Send Enquiry" />
        </div>
      </section>

      <section className="section bg-[#f6f3ee]">
        <div className="container">
          <p className="eyebrow text-center">Location</p>
          <h2 className="heading-lg mt-3 text-center">Visit Molonglo Construction Group in Denman Prospect</h2>
          <div className="mt-8 overflow-hidden rounded-[1.5rem] shadow-soft">
            <MapEmbed />
          </div>
        </div>
      </section>
    </>
  );
}
