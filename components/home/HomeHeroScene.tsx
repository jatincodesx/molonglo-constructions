import Link from "next/link";
import { ArchitecturalObject } from "@/components/public-ui/ArchitecturalObject";
import { EditorialTextWrap } from "@/components/public-ui/EditorialTextWrap";
import { ScrollScene } from "@/components/public-ui/ScrollScene";

export function HomeHeroScene() {
  return (
    <ScrollScene chapter className="premium-home-hero">
      <div className="container grid min-h-svh items-center gap-10 pt-[var(--header-height)] lg:grid-cols-[1.02fr_0.98fr]">
        <div className="relative z-10 max-w-4xl py-16" data-scroll-reveal>
          <p className="eyebrow">Custom homes, rebuilds and residential construction in Canberra</p>
          <h1 className="mt-6 font-display text-[clamp(3.4rem,9vw,8.8rem)] font-semibold leading-[0.84] text-[var(--color-charcoal)]">
            Build with clarity before the first line is drawn.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-9 text-zinc-700">
            Molonglo Construction Group creates custom homes, new homes and knockdown rebuilds with builder-led planning, calm communication and craftsmanship suited to Canberra conditions.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact#quote" className="cta">
              Request a Quote
            </Link>
            <Link href="/projects" className="cta-secondary">
              View Projects
            </Link>
          </div>
        </div>

        <div className="premium-home-hero__object">
          <ArchitecturalObject />
        </div>
      </div>

      <div className="container pb-20">
        <EditorialTextWrap
          eyebrow="Builder-led from the beginning"
          title="The strongest homes are resolved before site work begins."
          text="We use early construction advice to connect the site, brief, approvals path and budget, so the finished home feels deliberate instead of improvised."
          className="max-w-5xl"
        />
      </div>
    </ScrollScene>
  );
}
