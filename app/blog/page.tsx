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
  const posts = (await getPublishedBlogs()).filter((post) => post.slug !== "test-blog-1" && post.title !== "Test Blog 1");
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
          primaryLabel="Start a Conversation"
        />

      <section className="section bg-white">
        <div className="container">
          {posts.length ? (
            <div className="editorial-blog-grid">
              {posts.map((post) => (
                <article key={post.slug}>
                  <Image src={post.featuredImage} alt={post.title} width={900} height={640} className="h-56 w-full object-cover" />
                  <div>
                    <p>
                      {post.category} · {post.publishedAt}
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-semibold text-molonglo-ink">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <span>{post.excerpt}</span>
                    <Link href={`/blog/${post.slug}`}>
                      Read article
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2 className="font-display text-2xl font-semibold text-molonglo-ink">No blog posts published yet</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Canberra building guides will appear here after they are reviewed and published.
              </p>
            </div>
          )}
        </div>
      </section>
      </PremiumScrollShell>
    </>
  );
}
