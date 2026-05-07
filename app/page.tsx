import { PremiumHomeExperience } from "@/components/home/PremiumHomeExperience";
import { JsonLd } from "@/components/JsonLd";
import { getPublishedBlogs } from "@/lib/blog";
import { locations, projects, services } from "@/lib/content";
import { homeFaqs } from "@/lib/home-faqs";
import { breadcrumbSchema, faqSchema, resolveMetadata, serviceSchema } from "@/lib/seo";
import { getSeoSchema } from "@/lib/seo-overrides";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return resolveMetadata({
    title: "Canberra Home Builder | Custom Homes & Rebuilds",
    description: "Licensed ACT and NSW builder for Canberra custom homes, knockdown rebuilds and residential construction. Start a practical build conversation.",
    path: "/",
    image: "/assets/images/FE02BB99-4862-4A69-87E3-2359B9E7FFFD_1_201_a.jpeg"
  });
}

export default async function HomePage() {
  const recentBlogs = (await getPublishedBlogs()).filter((post) => post.slug !== "test-blog-1" && post.title !== "Test Blog 1").slice(0, 3);
  const schemaOverride = await getSeoSchema("/");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", href: "/" }]),
          serviceSchema({
            name: "Residential construction services in Canberra",
            description: "Custom homes, new homes, knockdown rebuilds and residential construction planning in Canberra and surrounding areas.",
            path: "/"
          }),
          faqSchema(homeFaqs)
        ]}
      />
      {schemaOverride ? <JsonLd data={schemaOverride} /> : null}
      <PremiumHomeExperience recentBlogs={recentBlogs} locations={locations} projects={projects} services={services} />
    </>
  );
}
