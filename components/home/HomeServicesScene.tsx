import Link from "next/link";
import { ScrollScene } from "@/components/public-ui/ScrollScene";
import type { ServicePage } from "@/lib/content";

type HomeServicesSceneProps = {
  services: ServicePage[];
};

export function HomeServicesScene({ services }: HomeServicesSceneProps) {
  return (
    <ScrollScene chapter tone="white" className="premium-home-services">
      <div className="container grid min-h-svh items-center gap-12 py-[var(--section-padding)] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="max-w-3xl" data-scroll-reveal>
          <p className="eyebrow">Services as spaces</p>
          <h2 className="heading-lg mt-4">Choose the path that fits the block, the brief and the way you want to live.</h2>
          <p className="mt-5 text-lg leading-8 text-zinc-700">
            The service structure remains simple and crawlable, but the homepage now presents each pathway as a distinct room in the same build journey.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {services.slice(0, 6).map((service, index) => (
            <Link
              key={service.slug}
              href={`/${service.slug}`}
              className={`spatial-panel spatial-panel--${(index % 3) + 1}`}
              data-scroll-reveal
            >
              <span>0{index + 1}</span>
              <h3>{service.title}</h3>
              <p>{service.intro}</p>
            </Link>
          ))}
        </div>
      </div>
    </ScrollScene>
  );
}
