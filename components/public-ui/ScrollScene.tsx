type ScrollSceneProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "stone" | "white" | "dark" | "clay";
  chapter?: boolean;
};

const tones = {
  stone: "bg-[var(--color-stone)] text-[var(--color-charcoal)]",
  white: "bg-white text-[var(--color-charcoal)]",
  dark: "bg-[var(--color-graphite)] text-white",
  clay: "bg-[var(--color-clay)] text-[var(--color-charcoal)]"
};

export function ScrollScene({ children, className = "", tone = "stone", chapter = false }: ScrollSceneProps) {
  return (
    <section
      className={`scroll-scene relative isolate overflow-hidden ${tones[tone]} ${className}`}
      data-home-chapter={chapter ? "" : undefined}
    >
      {children}
    </section>
  );
}
