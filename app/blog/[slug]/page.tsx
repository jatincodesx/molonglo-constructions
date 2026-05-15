import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { PremiumScrollShell } from "@/components/public-ui/PremiumScrollShell";
import { QuoteForm } from "@/components/QuoteForm";
import { getBlogBySlug, getPublishedBlogs, markdownToHtml } from "@/lib/blog";
import { autoInjectInternalLinks } from "@/lib/internal-links";
import { articleSchema, breadcrumbSchema, resolveMetadata } from "@/lib/seo";
import { getSeoSchema } from "@/lib/seo-overrides";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) {
    return {};
  }

  return resolveMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    image: post.featuredImage,
    type: "article"
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = (await getPublishedBlogs()).filter((item) => item.slug !== post.slug).slice(0, 3);
  const schemaOverride = await getSeoSchema(`/blog/${post.slug}`);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: post.title, href: `/blog/${post.slug}` }
          ]),
          articleSchema({
            title: post.title,
            description: post.metaDescription,
            path: `/blog/${post.slug}`,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
            image: post.featuredImage,
            author: post.author
          })
        ]}
      />
      {schemaOverride ? <JsonLd data={schemaOverride} /> : null}

      <PremiumScrollShell mode="editorial">
      <article className="bg-white">
        <header className="container py-16">
          <p className="eyebrow">{post.category}</p>
          <h1 className="heading-xl mt-4 max-w-5xl">{post.title}</h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-zinc-700">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-600">
            <span>Published: {post.publishedAt}</span>
            <span>Updated: {post.updatedAt.slice(0, 10)}</span>
            <span>Author: {post.author}</span>
          </div>
        </header>

        <Image src={post.featuredImage} alt={post.title} width={1600} height={900} priority className="h-[420px] w-full object-cover" />

        <div className="container grid gap-10 py-16 lg:grid-cols-[1fr_320px]">
          <div>
            <div
              className="prose-seo"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(autoInjectInternalLinks(post.content, { serviceCount: 2, locationCount: 1 })) }}
            />

            <section className="mt-12 rounded-[1.5rem] bg-[#f6f3ee] p-8">
              <h2 className="font-display text-3xl font-semibold text-molonglo-ink">Planning a similar project?</h2>
              <p className="mt-4 text-base leading-7 text-zinc-700">
                Talk with Molonglo Construction Group about your block, suburb and goals if you want project-specific advice rather than generic online information.
              </p>
              <Link href="/contact#quote" className="cta mt-6">
                Request a Quote
              </Link>
            </section>
          </div>

          <aside className="space-y-5">
            <div className="surface-panel p-6">
              <h2 className="font-display text-2xl font-semibold text-molonglo-ink">Relevant services</h2>
              <ul className="mt-4 space-y-2 text-sm font-semibold text-molonglo-gold">
                <li><Link href="/custom-home-builders-canberra">Custom Home Builders Canberra</Link></li>
                <li><Link href="/knockdown-rebuild-canberra">Knockdown rebuilds in Canberra</Link></li>
                <li><Link href="/builder-canberra">Builder Canberra</Link></li>
                <li><Link href="/contact#quote">Request a Quote</Link></li>
              </ul>
            </div>

            <div className="surface-panel p-6">
              <h2 className="font-display text-2xl font-semibold text-molonglo-ink">Related articles</h2>
              <ul className="mt-4 space-y-2 text-sm font-semibold text-molonglo-gold">
                {relatedPosts.map((relatedPost) => (
                  <li key={relatedPost.slug}>
                    <Link href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-panel p-6">
              <h2 className="font-display text-2xl font-semibold text-molonglo-ink">Send an enquiry</h2>
              <QuoteForm source={`/blog/${post.slug}`} submitLabel="Send Enquiry" />
            </div>
          </aside>
        </div>
      </article>

      <CTA />
      </PremiumScrollShell>
    </>
  );
}
