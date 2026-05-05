export type Project = {
  title: string;
  slug: string;
  location: string;
  category: string;
  coverImage: string;
  galleryImages: string[];
  description: string;
  status?: string;
};

const projectImageBase = "/assets/images/projects/our-projects";

export const projects: Project[] = [
  {
    title: "Molonglo 1",
    slug: "molonglo-1",
    location: "Molonglo Valley",
    category: "Custom home",
    coverImage: `${projectImageBase}/molonglo-1/cover.jpg`,
    galleryImages: [
      `${projectImageBase}/molonglo-1/cover.jpg`,
      `${projectImageBase}/molonglo-1/kitchen.jpg`,
      `${projectImageBase}/molonglo-1/living.jpg`,
      `${projectImageBase}/molonglo-1/exterior.jpg`
    ],
    description: "A completed Molonglo-region residential project drawn from the Molonglo 1 project photo set."
  },
  {
    title: "78 Churcher",
    slug: "78-churcher",
    location: "Canberra region",
    category: "Residential build",
    coverImage: `${projectImageBase}/78-churcher/cover.jpg`,
    galleryImages: [
      `${projectImageBase}/78-churcher/cover.jpg`,
      `${projectImageBase}/78-churcher/living.jpg`,
      `${projectImageBase}/78-churcher/kitchen.jpg`,
      `${projectImageBase}/78-churcher/detail.jpg`
    ],
    description: "A residential project using verified imagery from the 78 Churcher project folder."
  },
  {
    title: "5 Towong Street",
    slug: "5-towong-street",
    location: "Googong",
    category: "Residential build",
    coverImage: `${projectImageBase}/5-towong-street/cover.jpg`,
    galleryImages: [
      `${projectImageBase}/5-towong-street/cover.jpg`,
      `${projectImageBase}/5-towong-street/living.jpg`,
      `${projectImageBase}/5-towong-street/kitchen.jpg`,
      `${projectImageBase}/5-towong-street/detail.jpg`
    ],
    description: "A Googong residential project inferred from the 5 Towong Street project folder."
  },
  {
    title: "Sibsado Street",
    slug: "sibsado-street",
    location: "Canberra region",
    category: "Residential build",
    coverImage: `${projectImageBase}/sibsado-street/cover.jpg`,
    galleryImages: [
      `${projectImageBase}/sibsado-street/cover.jpg`,
      `${projectImageBase}/sibsado-street/living.jpg`,
      `${projectImageBase}/sibsado-street/kitchen.jpg`,
      `${projectImageBase}/sibsado-street/detail.jpg`
    ],
    description: "A residential project using verified imagery from the Sibsado Street project folder."
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
