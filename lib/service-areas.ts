export type ServiceAreaSuburb = {
  name: string;
  href?: string;
};

export type ServiceAreaGroup = {
  region: string;
  summary: string;
  suburbs: ServiceAreaSuburb[];
};

export const serviceAreaGroups: ServiceAreaGroup[] = [
  {
    region: "Inner Canberra",
    summary: "Central and established Canberra suburbs where rebuilds, renovations and custom homes often need careful planning around access, trees and existing streetscapes.",
    suburbs: [
      { name: "Canberra", href: "/builder-canberra" },
      { name: "Ainslie" },
      { name: "Braddon" },
      { name: "Campbell" },
      { name: "Deakin" },
      { name: "Griffith" },
      { name: "Kingston" },
      { name: "Narrabundah" },
      { name: "O'Connor" },
      { name: "Red Hill" },
      { name: "Turner" },
      { name: "Yarralumla" }
    ]
  },
  {
    region: "Molonglo Valley and Weston Creek",
    summary: "Nearby growth and established suburbs where slope, outlook, retaining and solar orientation can strongly influence the build strategy.",
    suburbs: [
      { name: "Molonglo Valley", href: "/builder-molonglo-valley" },
      { name: "Denman Prospect", href: "/builder-denman-prospect" },
      { name: "Wright", href: "/builder-wright-act" },
      { name: "Coombs", href: "/builder-coombs" },
      { name: "Whitlam" },
      { name: "Holder" },
      { name: "Rivett" },
      { name: "Stirling" },
      { name: "Waramanga" },
      { name: "Weston" }
    ]
  },
  {
    region: "Belconnen and Gungahlin",
    summary: "Northern Canberra suburbs suited to new homes, custom builds and rebuild conversations where the site and project scope are a good fit.",
    suburbs: [
      { name: "Aranda" },
      { name: "Belconnen" },
      { name: "Bruce" },
      { name: "Cook" },
      { name: "Florey" },
      { name: "Hawker" },
      { name: "Kaleen" },
      { name: "Macquarie" },
      { name: "Gungahlin" },
      { name: "Crace" },
      { name: "Franklin" },
      { name: "Harrison" },
      { name: "Nicholls" },
      { name: "Taylor" },
      { name: "Throsby" }
    ]
  },
  {
    region: "Woden Valley and Tuggeranong",
    summary: "Established southern suburbs where knockdown rebuilds, extensions and custom residential work need early feasibility and budget alignment.",
    suburbs: [
      { name: "Curtin" },
      { name: "Farrer" },
      { name: "Garran" },
      { name: "Hughes" },
      { name: "Isaacs" },
      { name: "Mawson" },
      { name: "O'Malley" },
      { name: "Pearce" },
      { name: "Torrens" },
      { name: "Wanniassa" },
      { name: "Kambah" },
      { name: "Greenway" },
      { name: "Calwell" },
      { name: "Gordon" }
    ]
  },
  {
    region: "NSW surrounds and selected South Coast",
    summary: "Nearby NSW and South Coast enquiries are reviewed by project scope, location, access and program fit.",
    suburbs: [
      { name: "Queanbeyan", href: "/builder-queanbeyan" },
      { name: "Googong", href: "/builder-googong" },
      { name: "Jerrabomberra", href: "/builder-jerrabomberra" },
      { name: "Bungendore" },
      { name: "Murrumbateman" },
      { name: "Batemans Bay" },
      { name: "Narooma" },
      { name: "Bega" },
      { name: "Pambula" },
      { name: "Merimbula" }
    ]
  }
];
