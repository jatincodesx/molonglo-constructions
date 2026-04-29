import { ArchitecturalObject } from "@/components/public-ui/ArchitecturalObject";

type IntentionalSectionProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  children?: React.ReactNode;
  className?: string;
  tone?: "stone" | "white" | "dark" | "clay";
  accent?: boolean;
};

const tones = {
  stone: "bg-[var(--color-stone)] text-[var(--color-charcoal)]",
  white: "bg-white text-[var(--color-charcoal)]",
  dark: "bg-[var(--color-graphite)] text-white",
  clay: "bg-[var(--color-clay)] text-[var(--color-charcoal)]"
};

export function IntentionalSection({
  eyebrow,
  title,
  text,
  children,
  className = "",
  tone = "stone",
  accent = false
}: IntentionalSectionProps) {
  return (
    <section className={`intentional-section relative isolate overflow-hidden ${tones[tone]} ${className}`}>
      {accent ? (
        <div className="pointer-events-none absolute right-0 top-12 hidden w-[34rem] opacity-35 lg:block">
          <ArchitecturalObject variant="accent" />
        </div>
      ) : null}
      <div className="container relative z-10">
        <div className="max-w-4xl" data-scroll-reveal>
          {eyebrow ? <p className={tone === "dark" ? "eyebrow text-white/64" : "eyebrow"}>{eyebrow}</p> : null}
          <h2 className={tone === "dark" ? "heading-lg mt-4 text-white" : "heading-lg mt-4"}>{title}</h2>
          {text ? <p className={tone === "dark" ? "mt-5 max-w-3xl text-lg leading-8 text-white/72" : "mt-5 max-w-3xl text-lg leading-8 text-zinc-700"}>{text}</p> : null}
        </div>
        {children ? <div className="relative z-10 mt-12">{children}</div> : null}
      </div>
    </section>
  );
}
