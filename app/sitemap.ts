import type { MetadataRoute } from "next";
import { getAllSuburbPaths } from "@/lib/act-suburbs";
import { getPublishedBlogs } from "@/lib/blog";
import { locations, projects, services } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    "/",
    "/about",
    "/services",
    "/service-areas",
    "/projects",
    "/contact",
    "/blog",
    "/display-home/denman-prospect",
    "/house-and-land-canberra",
    "/house-and-land-packages",
    "/success-stories"
  ];
  const blogs = await getPublishedBlogs();
  const all = [
    ...staticPages,
    ...services.map((page) => `/${page.slug}`),
    ...locations.map((page) => `/${page.slug}`),
    ...getAllSuburbPaths(),
    ...projects.map((project) => `/projects/${project.slug}`),
    ...blogs.map((post) => `/blog/${post.slug}`)
  ];

  const uniquePaths = Array.from(new Set(all));
  return uniquePaths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path.includes("/blog/") ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8
  }));
}
