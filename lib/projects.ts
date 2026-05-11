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

const projectImageBase = "/assets/projects";

function projectImage(slug: string, filename: string) {
  return `${projectImageBase}/${slug}/${filename}`;
}

function projectGallery(slug: string, coverFilename: string, filenames: string[]) {
  const orderedFilenames = [
    coverFilename,
    ...filenames.filter((filename) => filename !== coverFilename)
  ];

  return orderedFilenames.map((filename) => projectImage(slug, filename));
}

const molonglo1Cover = "1729482345-molonglo1_webres-6810_watermarked.jpg";
const churcher78Cover = "35f18253e4c53a302a96b82cf25c5dfa_pl-2_watermarked.jpg";
const towong5Cover = "FA0B52A3-C7F2-444C-B826-A9D537B5A411_1_201_a_watermarked.jpg";
const sibsadoCover = "755BEBE0-726D-4697-8E80-C976313ACC78_1_201_a_watermarked.jpg";

const molonglo1Images = [
  molonglo1Cover,
  "1729482398-molonglo1_webres_watermarked.jpg",
  "1729482474-molonglo1_webres-6831_watermarked.jpg",
  "1729482500-molonglo1_webres-6848_watermarked.jpg",
  "1729482584-molonglo1_webres-6859_watermarked.jpg",
  "1729482608-molonglo1_webres-6879_watermarked.jpg",
  "1729482659-molonglo1_webres-6896_watermarked.jpg",
  "1729482693-molonglo1_webres-6901_watermarked.jpg",
  "1729482788-molonglo1_webres-6917_watermarked.jpg",
  "1729482804-molonglo1_webres-6923_watermarked.jpg",
  "1729482859-molonglo1_webres-6933_watermarked.jpg",
  "1729482902-molonglo1_webres-6948_watermarked.jpg",
  "1729482975-molonglo1_webres-6983_watermarked.jpg",
  "1729487923-molonglo1_webres-7004_watermarked.jpg",
  "1729487998-molonglo1_webres-7037_watermarked.jpg",
  "1729488045-molonglo1_webres-7064_watermarked.jpg",
  "1729488093-molonglo1_webres-7093_watermarked.jpg",
  "1729488149-molonglo1_webres-7319_watermarked.jpg"
];

const churcher78Images = [
  churcher78Cover,
  "09ca3db7a00c3cbf76ca6982b2e16fae_pl_watermarked.jpg",
  "0bd8f745e0467667071c9d41bcd5f8f3_pl_watermarked.jpg",
  "18db63134c64d5371f1e7b37f02dd60e_pl_watermarked.jpg",
  "2a79fa27216f6b3100ffa424643bed04_pl_watermarked.jpg",
  "2d78cce582f8683380d7f865507f57c5_pl_watermarked.jpg",
  "2ee0cf4a362f9189fa1b638fb9cf145f_pl_watermarked.jpg",
  "4a8a60de040e1d9d20151dfc755f2133_pl_watermarked.jpg",
  "4c1cb7ab9fc35a7d55ea2a498d668388_pl_watermarked.jpg",
  "4d4e511a4239bcda54aa02b526fae7bc_pl_watermarked.jpg",
  "50f7fc3c1933c646a603bf714107a8ff_pl_watermarked.jpg",
  "54382eab551c5b81093d0361d027abaa_pl_watermarked.jpg",
  "578a7f24f3674ecc119a64ae87dffe2f_pl_watermarked.jpg",
  "5b825f16fde72ba3387b2acb57f26c94_pl_watermarked.jpg",
  "6bed8c62fa848e31c2c79effef9d6248_pl_watermarked.jpg",
  "6c42e9bce9df163491784cb5144b8923_pl_watermarked.jpg",
  "89ebb6dce623af16f56a93411916d982_pl_watermarked.jpg",
  "903a804b920e1650b9ec453af6400332_pl_watermarked.jpg",
  "903dedd852f413eb358fa41a914c42ce_pl_watermarked.jpg",
  "BBD32FEA-AEF2-456B-A967-BC682BB3ECD3_1_201_a_watermarked.jpg",
  "aa1d91712b75d3703a09de0d7ef3dbaa_pl_watermarked.jpg",
  "b072b865c3f6a10568c709ee58d0a22b_pl_watermarked.jpg",
  "d227c17119427da74acff7f638d8b01b_pl_watermarked.jpg",
  "d6bbea0c6f9048ee1e8ec88163a51e07_pl_watermarked.jpg",
  "e3f98e2f15f7f48d3d0d2d840de1311c_pl_watermarked.jpg",
  "f000a8ab3eeff47ca3781e5b137f2aba_pl_watermarked.jpg",
  "f9d71395123443fcb2a316fee4fe4b89_pl_watermarked.jpg",
  "fc82cf14dc347356f7ac95b051f5ace0_pl_watermarked.jpg"
];

const towong5Images = [
  towong5Cover,
  "011D2E69-B7B6-4201-B47D-9EAF2DF5D6F1_1_201_a_watermarked.jpg",
  "08D8C0E5-2C52-4660-AA30-B16798E179A3_1_201_a_watermarked.jpg",
  "2011FD13-95CD-4290-976B-053449069316_1_201_a_watermarked.jpg",
  "241B0F59-FF0F-430D-8B7C-F5E49A4D756F_4_5005_c_watermarked.jpg",
  "2CACC440-9382-4A34-8037-E4F21AA962DE_4_5005_c_watermarked.jpg",
  "34A21610-B693-4B6D-8B5F-047EBF2D6861_1_201_a_watermarked.jpg",
  "39BE1D48-E5AB-4923-88A5-E349AC641FE9_1_201_a_watermarked.jpg",
  "5295C93B-FD43-48E4-8F48-7FA7571E5E9B_4_5005_c_watermarked.jpg",
  "56CFAE33-D1B4-4291-8812-C3E7B2CA0592_1_201_a_watermarked.jpg",
  "6072709B-403C-456C-903E-252F405498E8_1_201_a_watermarked.jpg",
  "6A2A4812-BC34-47F1-ABCC-D97928611F24_4_5005_c_watermarked.jpg",
  "72337438-74B9-4730-882C-C20663B84A6B_4_5005_c_watermarked.jpg",
  "7A2C0B7C-636B-48F7-A8D2-0070ACDB8B22_4_5005_c_watermarked.jpg",
  "7A31552D-E6E2-48F4-8DBA-04484CBF737F_1_201_a_watermarked.jpg",
  "7F88E6A1-AD29-4132-8646-10DBF8C7310D_4_5005_c_watermarked.jpg",
  "80816F0E-A586-4E91-9F8B-22B96DC0E2B0_1_201_a_watermarked.jpg",
  "8119777E-300F-4C2A-9102-9E43A38E6419_1_201_a_watermarked.jpg",
  "92138E0C-D746-4571-99D9-F7B1E9EC80A7_4_5005_c_watermarked.jpg",
  "99A9BA3E-48EC-4DF8-9EF7-19792BCE4C13_1_201_a_watermarked.jpg",
  "9CFC2107-E67C-4ADA-A011-E29255504606_4_5005_c_watermarked.jpg",
  "A7A2CA8E-C04E-43F9-8B7D-4043BBB08EA2_1_201_a_watermarked.jpg",
  "ADF260FF-8EAD-44EF-A356-AA751CFC10C4_1_201_a_watermarked.jpg",
  "AEF9CE04-8BBE-464B-80AB-03B53E8E05A6_1_201_a_watermarked.jpg",
  "B5D39AA5-8B4C-4C08-B6CF-117FB190C9AB_1_201_a_watermarked.jpg",
  "BB3F9AD3-62E0-461D-B9A7-A9D0895F40D9_1_201_a_watermarked.jpg",
  "BB473EA4-C679-4953-AC03-99DE5B715FCA_1_201_a_watermarked.jpg",
  "C3D92CC1-9233-46A2-BCCA-24C763A15229_1_201_a_watermarked.jpg",
  "C8563E65-BCF6-4CC1-9AE8-AD74A698C352_1_201_a_watermarked.jpg",
  "D37E1360-8E63-4B02-AC1C-B2D89E702497_1_201_a_watermarked.jpg",
  "D3EB36D3-38DE-4155-9FD2-5BD30E6BBCA9_4_5005_c_watermarked.jpg",
  "D6F0E1CE-5F0D-43DD-8F02-819BCA4B1922_4_5005_c_watermarked.jpg",
  "F46A8748-8A65-4CE8-8D31-7253A5104F3F_4_5005_c_watermarked.jpg"
];

const sibsadoImages = [
  sibsadoCover,
  "0C166181-B201-483A-9BA1-74E0CA1ECD1B_1_201_a_watermarked.jpg",
  "0DF45B30-7B4F-46FA-BEEA-523474D249ED_4_5005_c_watermarked.jpg",
  "2C060862-5DCE-4362-904F-2ED9A8450170_4_5005_c_watermarked.jpg",
  "31A6223F-EB44-4CB5-B31B-530E7445BB84_4_5005_c_watermarked.jpg",
  "36DB4AAA-81AF-4815-ABB8-A2B3482B2180_1_201_a_watermarked.jpg",
  "4B4AB7C3-BB38-46C7-888C-7267B38DA7A4_4_5005_c_watermarked.jpg",
  "54FB63AB-1988-4366-8F0F-214EC2A46C34_4_5005_c_watermarked.jpg",
  "7064E749-7224-4B87-B9CB-C9E569F86EF1_4_5005_c_watermarked.jpg",
  "7374D181-B04E-4F36-BE69-AED086C23F67_4_5005_c_watermarked.jpg",
  "7B9E46FF-4FA8-4C00-B498-921BCA3FFCC4_4_5005_c_watermarked.jpg",
  "A1EFD64F-1910-4279-A0A3-E5C95E67A6E4_1_201_a_watermarked.jpg",
  "AD53AFC4-7DE5-4195-9662-CBD548766FD4_4_5005_c_watermarked.jpg",
  "C73DADBE-B456-4D67-B836-D6E9E3D00093_4_5005_c_watermarked.jpg",
  "C795F91A-65DD-4E6B-BED2-35825A35D11C_1_201_a_watermarked.jpg",
  "CD75B14C-36CB-45C2-BCA5-5F018910E40F_4_5005_c_watermarked.jpg",
  "D4E41785-164E-4D9B-9B3B-981303F1CC97_1_201_a_watermarked.jpg",
  "DA1895E4-1281-46DE-9E00-4F948160A68C_4_5005_c_watermarked.jpg",
  "DB58CE5C-C7D8-4506-85E7-4FC54D30E0D9_4_5005_c_watermarked.jpg",
  "F4928859-B803-45FE-B820-0435D69860F1_4_5005_c_watermarked.jpg",
  "FC7EAF84-7DDB-447D-A87B-D5852C12DF12_4_5005_c_watermarked.jpg"
];

export const projects: Project[] = [
  {
    title: "Molonglo 1",
    slug: "molonglo-1",
    location: "Molonglo Valley",
    category: "Custom home",
    coverImage: projectImage("molonglo-1", molonglo1Cover),
    galleryImages: projectGallery("molonglo-1", molonglo1Cover, molonglo1Images),
    description: "A completed Molonglo Valley home with refined interior detailing, practical living spaces and a calm contemporary finish."
  },
  {
    title: "Molonglo Vista",
    slug: "78-churcher",
    location: "Canberra region",
    category: "Residential build",
    coverImage: projectImage("78-churcher", churcher78Cover),
    galleryImages: projectGallery("78-churcher", churcher78Cover, churcher78Images),
    description: "A Canberra-region residential build with considered proportions, durable finishes and a polished family-home feel."
  },
  {
    title: "Molonglo Fresco",
    slug: "5-towong-street",
    location: "Googong",
    category: "Residential build",
    coverImage: projectImage("5-towong-street", towong5Cover),
    galleryImages: projectGallery("5-towong-street", towong5Cover, towong5Images),
    description: "A Googong residential project with a strong street presence, generous living spaces and carefully resolved finishes."
  },
  {
    title: "Molonglo Summit",
    slug: "sibsado-street",
    location: "Canberra region",
    category: "Residential build",
    coverImage: projectImage("sibsado-street", sibsadoCover),
    galleryImages: projectGallery("sibsado-street", sibsadoCover, sibsadoImages),
    description: "A Canberra-region home showcasing clean detailing, balanced material selections and a practical residential layout."
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
