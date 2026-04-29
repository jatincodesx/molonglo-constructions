import Link from "next/link";
import { site } from "@/lib/site";

export function CTA() {
  return (
    <section className="surface-dark py-20 text-white">
      <div className="container surface-panel border-white/10 bg-white/6 px-6 py-10 sm:px-8 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:px-12">
        <div className="max-w-3xl">
          <p className="eyebrow text-white/75">Plan Your Build</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] text-white sm:text-5xl">
            Speak with a Canberra builder about your next residential project.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
            Whether you are planning a custom home, a knockdown rebuild or a more complex residential project, we can help you start with a clearer process.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 lg:mt-0">
          <Link href="/contact#quote" className="cta">
            Request a Quote
          </Link>
          <a href={site.phoneHref} className="cta-secondary border-white/35 bg-white/10 text-white hover:border-white hover:bg-white hover:text-molonglo-ink">
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
