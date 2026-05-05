import Link from "next/link";
import { site } from "@/lib/site";

export function CTA() {
  return (
    <section className="surface-dark py-20 text-white">
      <div className="container">
      <div className="rounded-lg border border-white/10 bg-white/[0.045] px-6 py-10 sm:px-8 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:px-12">
        <div className="max-w-3xl">
          <p className="eyebrow text-white">Plan Your Build</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] text-white sm:text-5xl">
            Ready to discuss your build?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/90 sm:text-lg">
            Share your suburb, site and goals. We can help you understand the most practical next step for a custom home, knockdown rebuild or residential construction project.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 lg:mt-0">
          <Link href="/contact#quote" className="cta">
            Start a Conversation
          </Link>
          <a href={site.phoneHref} className="cta-secondary border-white/35 bg-white/10 text-white hover:border-white hover:bg-white hover:text-molonglo-ink">
            {site.phone}
          </a>
        </div>
      </div>
      </div>
    </section>
  );
}
