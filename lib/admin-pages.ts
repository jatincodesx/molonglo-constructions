import { getAllBlogs } from "@/lib/blog";
import { locations, services } from "@/lib/content";

export type PageRecord = {
  path: string;
  title: string;
  description: string;
  h1: string;
  image?: string;
  status: "Published" | "Draft" | "Static";
  lastUpdated: string;
  editable: boolean;
  warnings: string[];
};

const corePages = [
  {
    path: "/",
    title: "Canberra Home Builder | Custom Homes & Rebuilds",
    description: "Licensed ACT and NSW builder for Canberra custom homes, knockdown rebuilds and residential construction. Start a practical build conversation.",
    h1: "Build a Canberra home with clarity from the first conversation.",
    image: "/assets/images/FE02BB99-4862-4A69-87E3-2359B9E7FFFD_1_201_a.jpeg"
  },
  {
    path: "/services",
    title: "Services | Custom Homes, Rebuilds & Residential Construction Canberra",
    description: "Explore Molonglo Construction Group services for custom homes, knockdown rebuilds, new homes and residential construction in Canberra.",
    h1: "Services",
    image: "/assets/images/FE02BB99-4862-4A69-87E3-2359B9E7FFFD_1_201_a.jpeg"
  },
  {
    path: "/service-areas",
    title: "Service Areas | Canberra, ACT & NSW Surrounds Builder",
    description: "See where Molonglo Construction Group builds, including Canberra, Molonglo Valley, Queanbeyan, Googong and Jerrabomberra.",
    h1: "Service Areas",
    image: "/assets/images/projects/display-whitlam.jpg"
  },
  {
    path: "/house-and-land-canberra",
    title: "House and Land Canberra | Molonglo Construction Group",
    description: "Discuss house and land package opportunities in Canberra, ACT surrounds and selected South Coast areas with a licensed ACT and NSW builder.",
    h1: "House and Land Canberra",
    image: "/assets/images/FE02BB99-4862-4A69-87E3-2359B9E7FFFD_1_201_a.jpeg"
  },
  {
    path: "/about",
    title: "About Molonglo Construction Group | Canberra Builder",
    description: "Learn about Molonglo Construction Group, a Canberra-focused builder delivering custom homes and residential construction with a refined process.",
    h1: "A local builder focused on clear process, direct communication and quality outcomes.",
    image: "/assets/images/about-banner.jpg"
  },
  {
    path: "/projects",
    title: "Projects | Molonglo Construction Group",
    description: "Explore recent Molonglo Construction Group residential projects across Canberra and the Molonglo Valley corridor.",
    h1: "Residential projects shaped by thoughtful planning and quality craftsmanship.",
    image: "/assets/images/projects/display-whitlam.jpg"
  },
  {
    path: "/blog",
    title: "Canberra Building Blog | Molonglo Construction Group",
    description: "Helpful Canberra building articles on costs, custom homes, knockdown rebuilds, design planning and choosing the right builder.",
    h1: "Canberra building guides for homeowners planning their next move.",
    image: "/assets/images/blog/sustainable-building.jpg"
  },
  {
    path: "/contact",
    title: "Contact Molonglo Construction Group | Canberra",
    description: "Contact Molonglo Construction Group for custom homes, rebuilds, renovations and residential construction enquiries in Canberra.",
    h1: "Talk to a Canberra builder about your project.",
    image: "/assets/images/hero.jpg"
  }
] as const;

function buildWarnings(record: Pick<PageRecord, "title" | "description" | "h1" | "path" | "image">) {
  const warnings: string[] = [];
  if (!record.title) warnings.push("Missing title");
  if (record.title.length > 60) warnings.push("Title too long");
  if (!record.description) warnings.push("Missing meta description");
  if (record.description.length > 160) warnings.push("Meta description too long");
  if (!record.path.startsWith("/")) warnings.push("Missing canonical");
  if (!record.h1) warnings.push("Missing H1");
  if (!record.image) warnings.push("Missing image alt audit target");
  return warnings;
}

export async function getIndexablePages() {
  const blogs = await getAllBlogs();

  const staticPages: PageRecord[] = [
    ...corePages.map((page) => ({
      ...page,
      status: "Static" as const,
      lastUpdated: "Code managed",
      editable: true,
      warnings: buildWarnings(page)
    })),
    ...services.map((service) => ({
      path: `/${service.slug}`,
      title: service.metaTitle,
      description: service.metaDescription,
      h1: service.h1,
      image: service.image,
      status: "Static" as const,
      lastUpdated: "Code managed",
      editable: true,
      warnings: buildWarnings({
        path: `/${service.slug}`,
        title: service.metaTitle,
        description: service.metaDescription,
        h1: service.h1,
        image: service.image
      })
    })),
    ...locations.map((location) => ({
      path: `/${location.slug}`,
      title: location.metaTitle,
      description: location.metaDescription,
      h1: location.h1,
      image: location.image,
      status: "Static" as const,
      lastUpdated: "Code managed",
      editable: true,
      warnings: buildWarnings({
        path: `/${location.slug}`,
        title: location.metaTitle,
        description: location.metaDescription,
        h1: location.h1,
        image: location.image
      })
    }))
  ];

  const blogPages: PageRecord[] = blogs.map((blog) => ({
    path: `/blog/${blog.slug}`,
    title: blog.metaTitle,
    description: blog.metaDescription,
    h1: blog.title,
    image: blog.featuredImage,
    status: blog.published ? "Published" : "Draft",
    lastUpdated: blog.updatedAt,
    editable: true,
    warnings: buildWarnings({
      path: `/blog/${blog.slug}`,
      title: blog.metaTitle,
      description: blog.metaDescription,
      h1: blog.title,
      image: blog.featuredImage
    })
  }));

  return [...staticPages, ...blogPages];
}
