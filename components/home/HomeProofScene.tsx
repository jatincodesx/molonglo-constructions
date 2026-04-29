import Image from "next/image";
import Link from "next/link";
import { ScrollScene } from "@/components/public-ui/ScrollScene";
import type { Project } from "@/lib/content";

type HomeProofSceneProps = {
  projects: Project[];
};

export function HomeProofScene({ projects }: HomeProofSceneProps) {
  const featured = projects.slice(0, 3);

  return (
    <ScrollScene chapter tone="clay" className="premium-home-proof">
      <div className="container py-[var(--section-padding)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between" data-scroll-reveal>
          <div className="max-w-4xl">
            <p className="eyebrow">Projects / Proof</p>
            <h2 className="heading-lg mt-4">Fewer cards, larger evidence, calmer decisions.</h2>
          </div>
          <Link href="/projects" className="cta-secondary w-fit">
            Explore Projects
          </Link>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {featured.map((project) => (
            <article key={project.title} className="project-proof-card" data-scroll-reveal>
              <Image src={project.image} alt={`${project.title} in ${project.location}`} width={1100} height={820} className="h-full min-h-[24rem] w-full object-cover" />
              <div>
                <p>{project.location}</p>
                <h3>{project.title}</h3>
                <span>{project.specs}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </ScrollScene>
  );
}
