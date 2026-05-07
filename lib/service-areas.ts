import { actSuburbRegions } from "@/lib/act-suburbs";

export type ServiceAreaSuburb = {
  name: string;
  href: string;
  region: string;
  suburbType: string;
  summary: string;
};

export type ServiceAreaGroup = {
  region: string;
  summary: string;
  suburbs: ServiceAreaSuburb[];
};

const regionSummaries: Record<string, string> = {
  "Inner North": "Established inner-north suburbs where rebuilds, custom homes and residential upgrades often need careful planning around trees, access and streetscape.",
  "Inner South": "Premium and established inner-south locations where site planning, neighbouring homes, mature landscaping and documentation quality matter early.",
  "Molonglo Valley": "Newer Molonglo Valley estates where slope, outlook, orientation, access and estate requirements can strongly influence the build strategy.",
  Gungahlin: "Northern growth-area suburbs suited to new homes and family-focused custom builds where block orientation and estate controls should be reviewed early.",
  Belconnen: "Established Belconnen suburbs with varied block sizes, rebuild potential, slope, orientation and access considerations.",
  "Woden Valley": "Established Woden Valley locations where mature trees, access, rebuild planning and practical family design need early coordination.",
  "Weston Creek": "Weston Creek suburbs with established residential blocks, mature services and practical rebuild or custom home opportunities.",
  Tuggeranong: "Southern Canberra suburbs where larger family blocks, established services, driveway access and practical layouts can shape the brief.",
  "NSW Surrounds": "Nearby NSW service areas where ACT and NSW project planning, established blocks and new-estate requirements need to be considered by site.",
  "South Coast": "Selected South Coast locations where coastal conditions, distance planning, site access and early feasibility should be reviewed before documentation is fixed."
};

function fallbackSummary(region: string) {
  return `Residential building enquiries in ${region} are assessed around the site, access, planning pathway, project scope and buildability.`;
}

export const serviceAreaGroups: ServiceAreaGroup[] = actSuburbRegions.map((group) => ({
  region: group.region,
  summary: regionSummaries[group.region] || fallbackSummary(group.region),
  suburbs: group.suburbs.map((suburb) => ({
    name: suburb.name,
    href: suburb.pagePath,
    region: suburb.region,
    suburbType: suburb.suburbType,
    summary: suburb.introAngle
  }))
}));

export const serviceAreaSuburbs = serviceAreaGroups.flatMap((group) => group.suburbs);
