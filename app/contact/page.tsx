import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { MapEmbed } from "@/components/MapEmbed";
import { QuoteForm } from "@/components/QuoteForm";
import { IntentionalSection } from "@/components/public-ui/IntentionalSection";
import { PremiumScrollShell } from "@/components/public-ui/PremiumScrollShell";
import { breadcrumbSchema, resolveMetadata } from "@/lib/seo";
import { getSeoSchema } from "@/lib/seo-overrides";
import { actServiceAreas, site, southCoastServiceAreas } from "@/lib/site";

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
      <PremiumScrollShell mode="light">
        <Hero
          eyebrow="Contact"
          title="Talk to a Canberra builder about your project."
          text="Share your suburb, project type and priorities, and we will help you understand the most practical next step."
          image="/assets/images/hero.jpg"
          primaryLabel="Start a Conversation"
        />

      <section id="quote" className="section bg-white scroll-mt-[var(--header-height)]">
        <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">Get In Touch</p>
            <h2 className="heading-lg mt-3">Start with a practical conversation.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-700">
              Send the basics and we will respond with a clear next step. A suburb, block details and project type are enough to begin.
            </p>
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
                ACT and surrounds: {actServiceAreas.join(", ")}
                <br />
                South Coast: {southCoastServiceAreas.join(", ")}
              </p>
            </div>
          </div>
          <QuoteForm source="/contact" submitLabel="Send Enquiry" />
        </div>
      </section>

      <IntentionalSection
        eyebrow="Location"
        title="Visit Molonglo Construction Group in Denman Prospect"
        tone="stone"
      >
          <div className="mt-8 overflow-hidden rounded-lg border border-[var(--color-border)]">
            <MapEmbed />
          </div>
      </IntentionalSection>
      </PremiumScrollShell>
    </>
  );
}
