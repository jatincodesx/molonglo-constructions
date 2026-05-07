import type { Metadata } from "next";
import { getSeoOverride } from "@/lib/seo-overrides";
import { site } from "@/lib/site";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
};

export function absoluteUrl(path = "") {
  if (path.startsWith("http")) return path;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image = site.logo,
  type = "website"
}: SeoInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type,
      locale: "en_AU",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    }
  };
}

export const metadata = buildMetadata;

export async function resolveMetadata(input: SeoInput) {
  const override = await getSeoOverride(input.path || "/");

  return buildMetadata({
    ...input,
    title: override?.title || input.title,
    description: override?.description || input.description
  });
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: absoluteUrl(site.logo),
    image: absoluteUrl(site.logo),
    telephone: site.phone,
    email: site.email,
    sameAs: [site.facebook, site.instagram, site.linkedin]
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: "en-AU"
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    name: site.name,
    url: site.url,
    image: absoluteUrl(site.logo),
    logo: absoluteUrl(site.logo),
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "13 Romano Street",
      addressLocality: site.locality,
      addressRegion: site.region,
      postalCode: site.postcode,
      addressCountry: site.countryCode
    },
    areaServed: [
      "the ACT and nearby NSW surrounds",
      "Canberra",
      "ACT",
      "Queanbeyan",
      "Jerrabomberra",
      "Googong",
      "Molonglo Valley",
      "Denman Prospect",
      "Wright",
      "Coombs",
      "South Coast",
      "Batemans Bay",
      "Narooma",
      "Bega",
      "Pambula",
      "Merimbula"
    ],
    foundingDate: site.foundedYear,
    identifier: [
      { "@type": "PropertyValue", name: "ABN", value: site.abn },
      { "@type": "PropertyValue", name: "ACT Licence", value: site.actLicense },
      { "@type": "PropertyValue", name: "NSW Licence", value: site.nswLicense }
    ],
    sameAs: [site.facebook, site.instagram, site.linkedin]
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href)
    }))
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: site.name,
      url: site.url
    },
    areaServed: input.areaServed || ["Canberra", "ACT", "Molonglo Valley", "Queanbeyan", "Googong"],
    serviceType: input.name,
    url: absoluteUrl(input.path)
  };
}

export function imageObjectSchema(input: {
  url: string;
  name: string;
  caption?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: absoluteUrl(input.url),
    url: absoluteUrl(input.url),
    name: input.name,
    caption: input.caption || input.name,
    creator: {
      "@type": "Organization",
      name: site.name,
      url: site.url
    }
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.publishedAt,
    dateModified: input.updatedAt || input.publishedAt,
    image: [absoluteUrl(input.image || site.logo)],
    author: {
      "@type": "Organization",
      name: input.author || site.name
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(site.logo)
      }
    },
    mainEntityOfPage: absoluteUrl(input.path)
  };
}
