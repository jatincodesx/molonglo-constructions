import Image from "next/image";
import Link from "next/link";
import { HomeFinalCtaScene } from "@/components/home/HomeFinalCtaScene";
import { HomeHeroScene } from "@/components/home/HomeHeroScene";
import { HomeProcessScene } from "@/components/home/HomeProcessScene";
import { HomeProofScene } from "@/components/home/HomeProofScene";
import { HomeServicesScene } from "@/components/home/HomeServicesScene";
import { PremiumScrollShell } from "@/components/public-ui/PremiumScrollShell";
import { IntentionalSection } from "@/components/public-ui/IntentionalSection";
import type { BlogPost } from "@/lib/blog";
import type { LocationPage, Project, ServicePage } from "@/lib/content";

type PremiumHomeExperienceProps = {
  recentBlogs: BlogPost[];
  locations: LocationPage[];
  projects: Project[];
  services: ServicePage[];
};

const differentiators = [
  "Canberra-focused advice grounded in local site conditions and approvals.",
  "Builder-led planning that keeps scope, budget and documentation aligned.",
  "A personalised process with direct communication from consultation to handover.",
  "Quality craftsmanship backed by practical decision-making at every stage."
];

export function PremiumHomeExperience({ recentBlogs, locations, projects, services }: PremiumHomeExperienceProps) {
  return (
    <PremiumScrollShell mode="cinematic" className="premium-home">
      <HomeHeroScene />

      <IntentionalSection
        eyebrow="Rotate around the home"
        title="Local knowledge shapes the angles that matter before construction starts."
        text="Large builders compete on scale. Molonglo Construction Group competes on local knowledge, direct communication and a more personalised building experience."
        tone="white"
        accent
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {differentiators.map((item) => (
            <div key={item} className="quiet-proof" data-scroll-reveal>
              <span aria-hidden="true" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </IntentionalSection>

      <IntentionalSection
        eyebrow="Move toward entry"
        title="Design decisions become buildable when the builder is involved early."
        text="We help clients make better decisions before drawings and selections drift away from the realities of budget, approvals and site delivery."
        tone="stone"
      />

      <HomeServicesScene services={services} />
      <HomeProcessScene />
      <HomeProofScene projects={projects} />

      <IntentionalSection
        eyebrow="Building Guides"
        title="Helpful articles for homeowners planning a build in Canberra."
        text="The blog stays readable and crawlable, with practical guidance on costs, timelines, custom homes, rebuilds and choosing the right builder."
        tone="white"
      >
        {recentBlogs.length ? (
          <div className="editorial-blog-grid">
            {recentBlogs.map((post) => (
              <article key={post.slug} data-scroll-reveal>
                <Image src={post.featuredImage} alt={post.title} width={900} height={640} className="h-56 w-full object-cover" />
                <div>
                  <p>{post.category}</p>
                  <h3>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <span>{post.excerpt}</span>
                  <Link href={`/blog/${post.slug}`}>Read article</Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="surface-panel p-8" data-scroll-reveal>
            <h3 className="font-display text-2xl font-semibold text-molonglo-ink">No blog posts published yet</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              The public blog will appear here after posts are published from the admin area.
            </p>
          </div>
        )}
      </IntentionalSection>

      <HomeFinalCtaScene locations={locations} />
    </PremiumScrollShell>
  );
}
