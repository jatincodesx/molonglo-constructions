import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PremiumScrollShell } from "@/components/public-ui/PremiumScrollShell";
import { breadcrumbSchema, resolveMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

const teamMembers = [
  {
    name: "Suhaan",
    role: "Manager",
    image: "/assets/team/suhaan.jpeg",
    description: "Suhaan helps coordinate client communication, project planning and day-to-day delivery across residential builds.",
    imagePosition: "center 32%"
  },
  {
    name: "Claudio",
    role: "Sales Consultant",
    image: "/assets/team/claudio-updated.jpeg",
    description: "Claudio supports clients through the enquiry and sales process, helping them understand build options and next steps.",
    imagePosition: "center 30%"
  },
  {
    name: "Aleesha",
    role: "Sales Consultant",
    image: "/assets/team/aleesha.jpeg",
    description: "Aleesha supports clients with early project enquiries, service information and the pathway toward starting a build.",
    imagePosition: "center 24%"
  }
];

export async function generateMetadata() {
  return resolveMetadata({
    title: "Our Team | Molonglo Construction Group",
    description: "Meet the hands-on Molonglo Construction Group team focused on clear communication, practical planning and quality residential construction.",
    path: "/our-team"
  });
}

export default function OurTeamPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Our Team", href: "/our-team" }])} />
      <PremiumScrollShell mode="light">
        <section className="relative overflow-hidden bg-[var(--color-stone)]">
          <div className="container grid gap-10 pb-16 pt-[calc(var(--header-height)+3rem)] sm:pb-20 lg:grid-cols-[0.88fr_1.12fr] lg:items-end lg:pt-[calc(var(--header-height)+5rem)]">
            <div className="max-w-3xl">
              <p className="eyebrow">Our Team</p>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.02] text-molonglo-ink sm:text-5xl lg:text-6xl">
                Meet the people behind your build conversation.
              </h1>
            </div>
            <div className="surface-panel p-6 sm:p-8">
              <p className="text-lg leading-8 text-zinc-700 sm:text-xl">
                Molonglo Construction Group is supported by a hands-on team focused on clear communication, practical planning and quality residential construction.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/contact" className="cta">
                  Contact the Team
                </Link>
                <Link href="/projects" className="cta-secondary">
                  View Projects
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container">
            <div className="section-heading section-heading--split">
              <div>
                <p className="eyebrow">People</p>
                <h2 className="heading-lg mt-4">A small team keeping the process clear.</h2>
              </div>
              <p>
                From early enquiries through planning and delivery, the team keeps communication practical and easy to follow.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {teamMembers.map((member) => (
                <article key={member.name} className="surface-panel team-card overflow-hidden">
                  <div className="relative aspect-[4/5] bg-[var(--color-clay)]">
                    <Image
                      src={member.image}
                      alt={`${member.name}, ${member.role} at Molonglo Construction Group`}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: member.imagePosition }}
                    />
                  </div>
                  <div className="p-6 sm:p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-molonglo-gold">{member.role}</p>
                    <h3 className="mt-3 font-display text-2xl font-semibold text-molonglo-ink">{member.name}</h3>
                    <p className="mt-4 text-sm leading-7 text-zinc-700">{member.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-[var(--color-stone)]">
          <div className="container">
            <div className="surface-panel grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="eyebrow">Start a Build</p>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-molonglo-ink sm:text-4xl">
                  Talk with our team about your site, timing and next step.
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-700">
                  Share a few details about your project and the team will respond with a practical path forward.
                </p>
              </div>
              <Link href="/contact" className="cta">
                Contact Molonglo
              </Link>
            </div>
          </div>
        </section>
      </PremiumScrollShell>
    </>
  );
}
