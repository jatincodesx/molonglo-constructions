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
  logo: "/assets/logo/logo_new-removebg-preview.png",
  icon: "/assets/logo/favicon.jpg",
  heroImage: "/assets/images/FE02BB99-4862-4A69-87E3-2359B9E7FFFD_1_201_a.jpeg",
  facebook: "https://www.facebook.com/p/Molonglo-Constructions-100063601235529/",
  instagram: "https://www.instagram.com/molonglocg/",
  linkedin: "https://au.linkedin.com/in/molonglo-cg-825638337",
  googleReviewsUrl: ""
} as const;

export const servicesNavLinks = [
  { href: "/services", label: "Services" },
  { href: "/custom-home-builders-canberra", label: "Custom Homes" },
  { href: "/knockdown-rebuild-canberra", label: "Knockdown Rebuilds" },
  { href: "/new-home-builders-canberra", label: "New Home Builds" },
  { href: "/construction-services-canberra", label: "Construction Services" },
  { href: "/house-and-land-canberra", label: "House & Land Packages" }
] as const;

export const displayHomeNavLinks = [
  { href: "/display-home/denman-prospect", label: "Denman Prospect Display Home" }
] as const;

export const moreNavLinks = [
  { href: "/house-and-land-packages", label: "House & Land Packages" },
  { href: "/success-stories", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" }
] as const;

export const navLinks = [
  { label: "Services", children: servicesNavLinks },
  { href: "/projects", label: "Projects" },
  { href: "/display-home/denman-prospect", label: "Visit Display Home" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/contact", label: "Start a Build" }
] as const;

export const footerGroups = {
  core: [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/display-home/denman-prospect", label: "Display Home" },
    { href: "/house-and-land-packages", label: "House & Land" },
    { href: "/success-stories", label: "Success Stories" },
    { href: "/service-areas", label: "Service Areas" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" }
  ],
  services: [
    { href: "/services", label: "Services" },
    { href: "/custom-home-builders-canberra", label: "Custom Home Builders Canberra" },
    { href: "/knockdown-rebuild-canberra", label: "Knockdown Rebuild Canberra" },
    { href: "/new-home-builders-canberra", label: "New Home Builders Canberra" },
    { href: "/construction-services-canberra", label: "Construction Services Canberra" },
    { href: "/house-and-land-canberra", label: "House and Land Canberra" },
    { href: "/home-renovations-canberra", label: "Home Renovations Canberra" }
  ],
  areas: [
    { href: "/service-areas", label: "Where We Build" },
    { href: "/builder-canberra", label: "Builder Canberra" },
    { href: "/builder-molonglo-valley", label: "Builder Molonglo Valley" },
    { href: "/builder-denman-prospect", label: "Builder Denman Prospect" },
    { href: "/builder-wright-act", label: "Builder Wright ACT" },
    { href: "/builder-coombs", label: "Builder Coombs" },
    { href: "/builder-googong", label: "Builder Googong" },
    { href: "/builder-queanbeyan", label: "Builder Queanbeyan" },
    { href: "/builder-jerrabomberra", label: "Builder Jerrabomberra" }
  ]
} as const;

export const actServiceAreas = [
  "the ACT and nearby NSW surrounds",
  "Canberra",
  "Queanbeyan",
  "Jerrabomberra",
  "Googong",
  "Molonglo Valley",
  "Denman Prospect",
  "Wright",
  "Coombs"
] as const;

export const southCoastServiceAreas = [
  "South Coast",
  "Batemans Bay",
  "Narooma",
  "Bega",
  "Pambula",
  "Merimbula"
] as const;

export const serviceAreas = [
  "ACT",
  "Canberra",
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
] as const;
