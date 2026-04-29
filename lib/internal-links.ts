import { locations, services } from "@/lib/content";

export type InternalLink = {
  label: string;
  href: string;
};

export function getServiceInternalLinks() {
  return services.map((service) => ({ label: service.title, href: `/${service.slug}` }));
}

export function getLocationInternalLinks() {
  return locations.map((location) => ({ label: location.h1, href: `/${location.slug}` }));
}

export function autoInjectInternalLinks(markdown: string, options: { serviceCount?: number; locationCount?: number } = {}) {
  const serviceLinks = getServiceInternalLinks().slice(0, options.serviceCount ?? 2);
  const locationLinks = getLocationInternalLinks().slice(0, options.locationCount ?? 1);
  const links = [...serviceLinks, ...locationLinks];

  const missingLinks = links.filter((link) => !markdown.includes(`](${link.href})`));
  if (!missingLinks.length) return markdown;

  return `${markdown.trim()}\n\n## Related Canberra building resources\n\n${missingLinks.map((link) => `- [${link.label}](${link.href})`).join("\n")}\n`;
}
