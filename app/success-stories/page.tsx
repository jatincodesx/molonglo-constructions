import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { PremiumScrollShell } from "@/components/public-ui/PremiumScrollShell";
import { reviews } from "@/lib/reviews";
import { breadcrumbSchema, resolveMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return resolveMetadata({
    title: "Success Stories | Molonglo Construction Group",
    description: "Client confidence for Molonglo Construction Group, with selected project references and practical ways to discuss your Canberra build.",
    path: "/success-stories",
    image: "/assets/images/hero.jpg"
  });
}

export default function SuccessStoriesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Success Stories", href: "/success-stories" }
        ])}
      />
      <PremiumScrollShell mode="light">
        <Hero
          eyebrow="Reviews"
          title="Success stories shaped by clear planning and careful delivery."
          text="Explore how Molonglo Construction Group builds confidence through practical advice, direct communication and completed residential work."
          image="/assets/images/hero.jpg"
          primaryLabel="Contact Molonglo"
          secondaryHref="/projects"
          secondaryLabel="View Projects"
        />

        <section className="section bg-white">
          <div className="container">
            <div className="max-w-3xl">
              <p className="eyebrow">Client Confidence</p>
              <h2 className="heading-lg mt-4">A build experience grounded in clarity.</h2>
              <p className="mt-5 text-lg leading-8 text-zinc-700">
                The strongest client outcomes start with a clear scope, practical site advice and steady communication from the first conversation through to handover.
              </p>
            </div>

            {reviews.length ? (
              <div className="mt-12 grid gap-6 md:grid-cols-2">
                {reviews.map((review) => (
                  <article key={`${review.author}-${review.date || review.review}`} className="surface-panel p-6 sm:p-8">
                    <p className="text-sm font-semibold text-molonglo-gold">{review.source} / {review.rating} stars</p>
                    <blockquote className="mt-4 text-lg leading-8 text-zinc-800">{review.review}</blockquote>
                    <p className="mt-5 text-sm font-semibold text-zinc-700">{review.author}{review.date ? `, ${review.date}` : ""}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-12 rounded-lg border border-[var(--color-border)] bg-[var(--color-stone)] p-8">
                <h2 className="font-display text-2xl font-semibold text-molonglo-ink">Talk with the team about your build goals.</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-700">
                  For a clearer view of the work, browse completed projects or start a conversation about your site, budget and preferred construction pathway.
                </p>
                {site.googleReviewsUrl ? (
                  <Link href={site.googleReviewsUrl} className="cta mt-6" target="_blank" rel="noopener noreferrer">
                    Read our Google Reviews
                  </Link>
                ) : (
                  <Link href="/projects" className="cta-secondary mt-6">
                    View Completed Projects
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>

        <CTA />
      </PremiumScrollShell>
    </>
  );
}
