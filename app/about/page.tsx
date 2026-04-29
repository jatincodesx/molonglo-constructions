import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { SignatureBuildingProcess } from "@/components/SignatureBuildingProcess";
import { IntentionalSection } from "@/components/public-ui/IntentionalSection";
import { PremiumScrollShell } from "@/components/public-ui/PremiumScrollShell";
import { breadcrumbSchema, resolveMetadata } from "@/lib/seo";
import { getSeoSchema } from "@/lib/seo-overrides";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return resolveMetadata({
    title: "About Molonglo Construction Group | Canberra Builder",
    description: "Learn about Molonglo Construction Group, a Canberra-focused builder delivering custom homes and residential construction with a refined process.",
    path: "/about",
    image: "/assets/images/about-banner.jpg"
  });
}

export default async function AboutPage() {
  const schemaOverride = await getSeoSchema("/about");
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "About", href: "/about" }])} />
      {schemaOverride ? <JsonLd data={schemaOverride} /> : null}
      <PremiumScrollShell mode="light">
        <Hero
          eyebrow="About Molonglo Construction"
          title="A local builder focused on clear process, direct communication and quality outcomes."
          text="Molonglo Construction Group works with Canberra homeowners who want a more personalised building experience grounded in practical planning and careful delivery."
          image="/assets/images/about-banner.jpg"
        />

        <IntentionalSection
          eyebrow="Local knowledge"
          title="Built around practical planning before the project reaches site."
          text="The about page stays editorial and crawlable, with lighter architectural motion instead of a dense promotional grid."
          tone="white"
          accent
        >
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="prose-seo">
            <h2>Built around local knowledge and practical planning</h2>
            <p>
              Molonglo Construction Group was founded to deliver a more considered residential building experience for Canberra homeowners. Our approach is shaped by the understanding that good construction starts long before work begins on site. The block, the brief, the approvals pathway and the budget all need to make sense together.
            </p>
            <h2>What sets our process apart</h2>
            <p>
              We compete on local expertise, direct communication and the ability to make a project feel manageable from the start. Clients work with a builder who understands Canberra conditions and can help identify the decisions that matter most before they become expensive to change.
            </p>
            <h2>Who we work with</h2>
            <p>
              Our clients include families building a custom home, owners replacing an ageing house with a knockdown rebuild, and homeowners refining a renovation or dual occupancy plan. Across each project type, the goal is the same: a home that is better suited to the site, more functional for daily use and more durable over time.
            </p>
            <h2>How we think about quality</h2>
            <p>
              Quality is more than finishes. It starts with orientation, storage, circulation, structure, weather protection and the way a home performs through Canberra’s seasons. We focus on those fundamentals because they shape the finished result long after the keys are handed over.
            </p>
          </div>

          <aside className="grid gap-4">
            {[
              ["Canberra Focused", "Local project knowledge across Canberra, Molonglo Valley and nearby regions."],
              ["Refined Process", "A clear sequence from consultation to approvals, construction and handover."],
              ["Direct Communication", "A more personalised experience than large-scale volume builder workflows."],
              ["Residential Expertise", "Custom homes, rebuilds, renovations and selected dual occupancy projects."]
            ].map(([title, body]) => (
              <div key={title} className="surface-panel p-6" data-scroll-reveal>
                <h3 className="font-display text-2xl font-semibold text-molonglo-ink">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{body}</p>
              </div>
            ))}
          </aside>
        </div>
        </IntentionalSection>

        <SignatureBuildingProcess />
        <CTA />
      </PremiumScrollShell>
    </>
  );
}
