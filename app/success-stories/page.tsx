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
    description: "Verified Google reviews and client feedback for Molonglo Construction Group will be published here once confirmed.",
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
          title="Success stories and Google feedback"
          text="Verified reviews and client feedback for Molonglo Construction Group will be shown here once confirmed."
          image="/assets/images/hero.jpg"
          primaryLabel="Contact Molonglo"
          secondaryHref="/projects"
          secondaryLabel="View Projects"
        />

        <section className="section bg-white">
          <div className="container">
            <div className="max-w-3xl">
              <p className="eyebrow">Google Reviews</p>
              <h2 className="heading-lg mt-4">Verified feedback will be published carefully.</h2>
              <p className="mt-5 text-lg leading-8 text-zinc-700">
                This page is prepared for Google reviews and testimonials. Only verified review content should be added to the manual reviews data file or a future Google Reviews integration.
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
                <h2 className="font-display text-2xl font-semibold text-molonglo-ink">Google reviews will be added here once verified.</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-700">
                  The reviews data file is ready for confirmed Google review content. No placeholder testimonials are published.
                </p>
                {site.googleReviewsUrl ? (
                  <Link href={site.googleReviewsUrl} className="cta mt-6" target="_blank" rel="noopener noreferrer">
                    Read our Google Reviews
                  </Link>
                ) : (
                  <p className="mt-6 text-sm font-semibold text-zinc-600">
                    Google review link will be added once verified.
                  </p>
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
