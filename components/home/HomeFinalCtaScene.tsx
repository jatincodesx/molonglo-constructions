import Link from "next/link";
import { ArchitecturalObject } from "@/components/public-ui/ArchitecturalObject";
import { ScrollScene } from "@/components/public-ui/ScrollScene";
import type { LocationPage } from "@/lib/content";

type HomeFinalCtaSceneProps = {
  locations: LocationPage[];
};

export function HomeFinalCtaScene({ locations }: HomeFinalCtaSceneProps) {
  return (
    <ScrollScene chapter tone="stone" className="premium-home-final">
      <div className="container grid min-h-svh items-center gap-12 py-[var(--section-padding)] lg:grid-cols-[1.05fr_0.95fr]">
        <div data-scroll-reveal>
          <p className="eyebrow">Handover</p>
          <h2 className="heading-lg mt-4">Start with a clear conversation about the home you want to finish in.</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-700">
            Tell us about your suburb, site and priorities. We will help you understand the most practical next step for a custom home, new home, knockdown rebuild or residential construction project.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact#quote" className="cta">
              Request Consultation
            </Link>
            <Link href="/contact" className="cta-secondary">
              Contact Details
            </Link>
          </div>
        </div>

        <div className="premium-home-final__object" data-scroll-reveal>
          <ArchitecturalObject variant="accent" />
        </div>
      </div>

      <div className="container pb-[var(--section-padding)]">
        <div className="seo-link-band" data-scroll-reveal>
          <div>
            <p className="eyebrow">Service Areas</p>
            <h3>Canberra, the ACT and nearby NSW areas</h3>
          </div>
          <div>
            {locations.slice(0, 8).map((location) => (
              <Link key={location.slug} href={`/${location.slug}`}>
                {location.h1}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ScrollScene>
  );
}
