import type { MetadataRoute } from "next";
import { getPublishedBlogs } from "@/lib/blog";
import { locations, services } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ["/", "/about", "/projects", "/contact", "/blog"];
  const blogs = await getPublishedBlogs();
  const all = [
    ...staticPages,
    ...services.map((page) => `/${page.slug}`),
    ...locations.map((page) => `/${page.slug}`),
    ...blogs.map((post) => `/blog/${post.slug}`)
  ];
  return all.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path.includes("/blog/") ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8
  }));
}
