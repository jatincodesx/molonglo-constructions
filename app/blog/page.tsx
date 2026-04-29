import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { PremiumScrollShell } from "@/components/public-ui/PremiumScrollShell";
import { getPublishedBlogs } from "@/lib/blog";
import { breadcrumbSchema, resolveMetadata } from "@/lib/seo";
import { getSeoSchema } from "@/lib/seo-overrides";

export async function generateMetadata() {
  return resolveMetadata({
    title: "Canberra Building Blog | Molonglo Construction Group",
    description: "Helpful Canberra building articles on costs, custom homes, knockdown rebuilds, design planning and choosing the right builder.",
    path: "/blog",
    image: "/assets/images/blog/sustainable-building.jpg"
  });
}

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPublishedBlogs();
  const schemaOverride = await getSeoSchema("/blog");

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }])} />
      {schemaOverride ? <JsonLd data={schemaOverride} /> : null}
      <PremiumScrollShell mode="editorial">
        <Hero
          eyebrow="Blog"
          title="Canberra building guides for homeowners planning their next move."
          text="Explore practical articles covering costs, timelines, custom homes, rebuilds and project planning in Canberra and the ACT."
          image="/assets/images/blog/sustainable-building.jpg"
          primaryLabel="Talk About Your Project"
        />

      <section className="section bg-white">
        <div className="container">
          {posts.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <article key={post.slug} className="surface-panel overflow-hidden">
                  <Image src={post.featuredImage} alt={post.title} width={900} height={640} className="h-56 w-full object-cover" />
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-molonglo-gold">
                      {post.category} · {post.publishedAt}
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-semibold text-molonglo-ink">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-zinc-600">{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex text-sm font-semibold uppercase tracking-[0.18em] text-molonglo-gold">
                      Read article
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="surface-panel p-8">
              <h2 className="font-display text-2xl font-semibold text-molonglo-ink">No blog posts published yet</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Blog drafts can be created and reviewed in the admin dashboard before they are published to the public site.
              </p>
            </div>
          )}
        </div>
      </section>
      </PremiumScrollShell>
    </>
  );
}
