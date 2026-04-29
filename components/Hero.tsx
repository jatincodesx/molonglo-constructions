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
  primaryLabel = "Request a Quote",
  secondaryHref = "/projects",
  secondaryLabel = "View Projects"
}: HeroProps) {
  return (
    <section className="surface-dark relative overflow-hidden text-white">
      <div className="absolute inset-0">
        <Image src={image} alt="" fill priority={imagePriority} className="object-cover opacity-30" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,15,14,0.22),rgba(12,15,14,0.88))]" />
      </div>
      <div className="container relative flex min-h-[68svh] items-end py-20 sm:py-24 lg:min-h-[74svh]">
        <div className="max-w-4xl">
          {eyebrow ? <p className="eyebrow text-white/75">{eyebrow}</p> : null}
          <h1 className="heading-xl mt-5 text-white">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-100/82 sm:text-xl">{text}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={primaryHref} className="cta">
              {primaryLabel}
            </Link>
            <Link href={secondaryHref} className="cta-secondary border-white/35 bg-white/10 text-white hover:border-white hover:bg-white hover:text-molonglo-ink">
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
