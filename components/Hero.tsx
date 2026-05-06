import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  eyebrow?: string;
  imagePriority?: boolean;
  title: string;
  text: string;
  image?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function Hero({
  eyebrow,
  title,
  text,
  image = "/assets/images/hero.jpg",
  imagePriority = true,
  primaryHref = "/contact#quote",
  primaryLabel = "Start a Conversation",
  secondaryHref = "/projects",
  secondaryLabel = "View Projects"
}: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-stone)] text-[var(--color-charcoal)]">
      <div className="absolute inset-0">
        <Image src={image} alt="" fill priority={imagePriority} className="object-cover opacity-25" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,239,230,0.98),rgba(244,239,230,0.76))]" />
      </div>
      <div className="container relative flex min-h-[52svh] items-end pb-14 pt-[calc(var(--header-height)+2.5rem)] sm:pb-16 lg:min-h-[60svh]">
        <div className="max-w-4xl">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.02] text-molonglo-ink sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-700 sm:text-xl">{text}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={primaryHref} className="cta">
              {primaryLabel}
            </Link>
            <Link href={secondaryHref} className="cta-secondary">
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
