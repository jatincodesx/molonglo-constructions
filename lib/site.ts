export const site = {
  name: "Molonglo Construction Group",
  shortName: "Molonglo Construction",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://molongloconstructions.com.au",
  phone: "+61 452 110 005",
  phoneHref: "tel:+61452110005",
  email: "info@molongloconstruction.com.au",
  emailHref: "mailto:info@molongloconstruction.com.au",
  address: "13 Romano Street, Denman Prospect ACT 2611",
  locality: "Denman Prospect",
  region: "ACT",
  postcode: "2611",
  country: "Australia",
  countryCode: "AU",
  abn: "45 634 243 306",
  actLicense: "2019760",
  nswLicense: "340764C",
  foundedYear: "2019",
  logo: "/assets/logo/logo_new.jpg",
  heroImage: "/assets/images/hero.jpg",
  facebook: "https://www.facebook.com/p/Molonglo-Constructions-100063601235529/",
  instagram: "https://www.instagram.com/molonglocg/",
  linkedin: "https://au.linkedin.com/in/molonglo-cg-825638337"
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" }
] as const;

export const footerGroups = {
  core: navLinks,
  services: [
    { href: "/custom-home-builders-canberra", label: "Custom Home Builders Canberra" },
    { href: "/knockdown-rebuild-canberra", label: "Knockdown Rebuild Canberra" },
    { href: "/new-home-builders-canberra", label: "New Home Builders Canberra" },
    { href: "/construction-services-canberra", label: "Construction Services Canberra" },
    { href: "/home-renovations-canberra", label: "Home Renovations Canberra" },
    { href: "/dual-occupancy-builders-act", label: "Dual Occupancy Builders ACT" }
  ],
  areas: [
    { href: "/builder-canberra", label: "Builder Canberra" },
    { href: "/builder-molonglo-valley", label: "Builder Molonglo Valley" },
    { href: "/builder-denman-prospect", label: "Builder Denman Prospect" },
    { href: "/builder-wright-act", label: "Builder Wright ACT" },
    { href: "/builder-coombs-act", label: "Builder Coombs ACT" },
    { href: "/builder-queanbeyan", label: "Builder Queanbeyan" }
  ]
} as const;

export const serviceAreas = [
  "Canberra",
  "ACT",
  "Molonglo Valley",
  "Denman Prospect",
  "Wright",
  "Coombs",
  "Queanbeyan"
] as const;
