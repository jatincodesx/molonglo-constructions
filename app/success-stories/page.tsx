import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { PremiumScrollShell } from "@/components/public-ui/PremiumScrollShell";
import { googleReviewSummary, reviews } from "@/lib/reviews";
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
          title="Success Stories"
          text="What clients say about working with Molonglo Construction Group."
          image="/assets/images/hero.jpg"
          primaryLabel="Start your build"
          secondaryHref="/projects"
          secondaryLabel="View projects"
        />

        <section className="section bg-white">
          <div className="container">
            <div className="review-page-intro">
              <div>
                <p className="eyebrow">Client Confidence</p>
                <h2 className="heading-lg mt-4">A build experience grounded in clarity.</h2>
                <p>
                  The strongest client outcomes start with a clear scope, practical site advice and steady communication from the first conversation through to handover.
                </p>
              </div>
              <aside aria-label="Google rating summary">
                <span>Google rating summary</span>
                <strong>{googleReviewSummary.ratingValue.toFixed(1)}</strong>
                <p>{googleReviewSummary.reviewCount} Google reviews supplied for {googleReviewSummary.businessName}.</p>
              </aside>
            </div>

            <div className="review-grid">
              {reviews.map((review) => (
                <article key={`${review.authorName}-${review.dateLabel || review.reviewText}`} className="review-card">
                  <div className="review-card__topline">
                    <span className="review-stars" aria-label={`${review.rating} out of 5 stars`}>
                      {"★".repeat(review.rating)}
                    </span>
                    <span>{review.source} review</span>
                  </div>
                  <blockquote>{review.reviewText}</blockquote>
                  <div className="review-card__meta">
                    <strong>{review.authorName}</strong>
                    <span>{review.dateLabel || "Google review"}</span>
                  </div>
                  {review.isExcerpt ? <p className="review-card__note">Visible review excerpt</p> : null}
                </article>
              ))}
            </div>

            <div className="review-cta-band">
              <div>
                <p className="eyebrow">Next Step</p>
                <h2>Discuss your own build with Molonglo.</h2>
              </div>
              <div>
                {site.googleReviewsUrl ? (
                  <Link href={site.googleReviewsUrl} className="cta-secondary" target="_blank" rel="noopener noreferrer">
                    Read more Google reviews
                  </Link>
                ) : null}
                <Link href="/contact" className="cta">
                  Start your build
                </Link>
              </div>
            </div>
          </div>
        </section>

        <CTA />
      </PremiumScrollShell>
    </>
  );
}
