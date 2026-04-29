import { PremiumHomeExperience } from "@/components/home/PremiumHomeExperience";
import { JsonLd } from "@/components/JsonLd";
import { getPublishedBlogs } from "@/lib/blog";
import { locations, projects, services } from "@/lib/content";
import { breadcrumbSchema, resolveMetadata, serviceSchema } from "@/lib/seo";
import { getSeoSchema } from "@/lib/seo-overrides";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return resolveMetadata({
    title: "Home Builders Canberra | Molonglo Construction Group",
    description: "Canberra builder for custom homes, knockdown rebuilds, new homes and residential construction with a refined process and local expertise.",
    path: "/",
    image: "/assets/images/hero.jpg"
  });
}

export default async function HomePage() {
  const recentBlogs = (await getPublishedBlogs()).slice(0, 3);
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
          })
        ]}
      />
      {schemaOverride ? <JsonLd data={schemaOverride} /> : null}
      <PremiumHomeExperience recentBlogs={recentBlogs} locations={locations} projects={projects} services={services} />
    </>
  );
}
