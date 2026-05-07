export type PageSection = {
  title: string;
  paragraphs: string[];
};

export { projects } from "@/lib/projects";
export type { Project } from "@/lib/projects";

export type FaqItem = {
  question: string;
  answer: string;
};

export type ServicePage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  image: string;
  audience: string[];
  benefits: string[];
  sections: PageSection[];
  faqs: FaqItem[];
  relatedLocations: string[];
  relatedBlogs: string[];
};

export type LocationPage = {
  slug: string;
  suburb: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  image: string;
  sections: PageSection[];
  faqs: FaqItem[];
  serviceLinks: string[];
  nearbyLocations: string[];
  relatedBlogs: string[];
};

export const services: ServicePage[] = [
  {
    slug: "custom-home-builders-canberra",
    title: "Custom Home Builders Canberra",
    metaTitle: "Custom Home Builders Canberra | Molonglo Construction Group",
    metaDescription: "Custom home builders in Canberra delivering tailored homes, builder-led planning and a clear process from concept through handover.",
    h1: "Custom Home Builders Canberra",
    intro: "Build a home that responds to your block, the way your family lives, and the practical realities of building in Canberra.",
    image: "/assets/images/projects/display-whitlam.jpg",
    audience: [
      "Families planning a long-term custom residence in Canberra or the ACT.",
      "Homeowners with a sloping, view-focused or constrained block that needs a tailored design response.",
      "Clients who want direct communication and builder input early in the planning process."
    ],
    benefits: [
      "Builder-led planning before documentation drifts away from the budget.",
      "Layouts shaped around orientation, storage, privacy and everyday use.",
      "A refined process that keeps approvals, selections and construction aligned."
    ],
    sections: [
      {
        title: "A practical custom build process from the beginning",
        paragraphs: [
          "A custom home works best when the design ambition is matched by realistic construction planning. Molonglo Construction Group starts with the block, the brief and the budget so the project can be shaped around real site conditions instead of assumptions.",
          "Canberra sites often involve slope, solar access, street presentation, retaining, estate requirements and neighbouring interfaces. Addressing those conditions early gives homeowners a clearer basis for design decisions, approvals and finance."
        ]
      },
      {
        title: "Who custom home building suits",
        paragraphs: [
          "Custom home building is ideal for owners who want a home designed around the way they live rather than adapted from a standard template. That may mean better natural light, a more considered kitchen and living layout, improved winter comfort, or a stronger connection to outdoor areas.",
          "It also suits clients who have a site with specific constraints or opportunities. A corner block, sloping block or premium outlook often needs tailored planning to make the most of the land without creating unnecessary cost."
        ]
      },
      {
        title: "Canberra design and construction considerations",
        paragraphs: [
          "In Canberra, energy performance, orientation and thermal comfort should be resolved alongside structure, storage and circulation. A home that captures winter sun, provides sensible shading and allows for practical day-to-day use will usually outperform a design that only focuses on visual impact.",
          "Our role is to coordinate the construction logic behind the design so that important decisions happen in the right order and the build remains clear for everyone involved."
        ]
      }
    ],
    faqs: [
      {
        question: "When should I speak to a custom home builder in Canberra?",
        answer: "As early as possible. Early builder input helps test the block, the budget, the likely buildability and the approvals pathway before drawings are locked in."
      },
      {
        question: "Can you work with our architect or designer?",
        answer: "Yes. Molonglo Construction Group can work alongside your chosen design team and provide practical construction input during planning and documentation."
      },
      {
        question: "Do custom homes always cost more than standard homes?",
        answer: "Not necessarily. Cost depends on the site, the level of complexity, the inclusions and how well the design is resolved before construction begins."
      }
    ],
    relatedLocations: ["builder-canberra", "builder-denman-prospect", "builder-molonglo-valley"],
    relatedBlogs: ["cost-to-build-a-house-in-canberra-2026", "questions-to-ask-before-choosing-a-builder-in-canberra", "canberra-home-construction-timeline-explained"]
  },
  {
    slug: "knockdown-rebuild-canberra",
    title: "Knockdown Rebuild Canberra",
    metaTitle: "Knockdown Rebuild Canberra | Licensed ACT Builder",
    metaDescription: "Knockdown rebuild builder in Canberra for demolition planning, approvals coordination and new homes on established blocks. Start with a licensed ACT and NSW builder.",
    h1: "Knockdown Rebuild Canberra",
    intro: "Stay in the suburb you know while replacing an ageing home with a better-planned, more efficient new build.",
    image: "/assets/images/projects/wright-1.jpg",
    audience: [
      "Homeowners who want to keep their location but outgrow the existing house.",
      "Families comparing a major renovation against a full rebuild.",
      "Owners of older Canberra homes with poor orientation, outdated services or compromised layouts."
    ],
    benefits: [
      "A single pathway covering demolition planning, approvals coordination and new home construction.",
      "The chance to improve orientation, layout, storage and energy performance on the same land.",
      "Clear sequencing to reduce delays between demolition and the new build."
    ],
    sections: [
      {
        title: "Why knockdown rebuild projects make sense in Canberra",
        paragraphs: [
          "Many established Canberra suburbs offer strong locations but older homes that no longer suit modern family life. A knockdown rebuild allows owners to keep the address, school catchment or neighbourhood they value while creating a better-performing home for the next stage of life.",
          "It can also be the cleaner path when the existing dwelling needs structural work, layout correction, services upgrades and energy upgrades all at once."
        ]
      },
      {
        title: "The rebuild sequence matters",
        paragraphs: [
          "A knockdown rebuild is more than a demolition followed by a new slab. It involves service disconnections, permit coordination, neighbour considerations, site preparation, design resolution and construction timing. If those pieces are not coordinated early, delay and cost risk increase quickly.",
          "Molonglo Construction Group works through the order of decisions so that the rebuild moves from feasibility to approvals and then into construction with fewer avoidable surprises."
        ]
      },
      {
        title: "Design priorities for established blocks",
        paragraphs: [
          "Established blocks often offer mature streets, larger lots and proven amenity, but they can also come with access, privacy and tree constraints. The design should respond to those realities while improving natural light, circulation, storage and thermal comfort.",
          "A knockdown rebuild is a chance to correct old compromises and create a home that feels more tailored to the block and the people living there."
        ]
      }
    ],
    faqs: [
      {
        question: "Is a knockdown rebuild better than renovating?",
        answer: "It depends on the existing structure and the extent of change required. Rebuild often becomes more attractive when a renovation would still leave major layout, energy or structural compromises."
      },
      {
        question: "Can you help with demolition planning?",
        answer: "Yes. We can guide the demolition-to-new-build sequence so the approvals and site preparation support the overall program."
      },
      {
        question: "Do you rebuild in established Canberra suburbs?",
        answer: "Yes. We work across the ACT and nearby NSW surrounds, including Canberra, Queanbeyan, Jerrabomberra, Googong, Molonglo Valley, Denman Prospect, Wright and Coombs, plus selected South Coast areas by enquiry."
      }
    ],
    relatedLocations: ["builder-canberra", "builder-queanbeyan", "builder-wright-act"],
    relatedBlogs: ["knockdown-rebuild-guide-act", "knockdown-rebuild-canberra-complete-guide", "new-home-construction-process-in-act"]
  },
  {
    slug: "new-home-builders-canberra",
    title: "New Home Builders Canberra",
    metaTitle: "New Home Builders Canberra | Molonglo Construction Group",
    metaDescription: "New home builders in Canberra delivering custom-focused residential construction with clear planning, communication and craftsmanship.",
    h1: "New Home Builders Canberra",
    intro: "A builder-led pathway for new homes in Canberra, whether you are starting with a vacant block or moving from concept into construction.",
    image: "/assets/images/projects/denman-1.jpg",
    audience: [
      "Buyers with land in a new Canberra estate.",
      "Families comparing builder options for a premium new home.",
      "Clients who want clearer guidance on timelines, costs and approvals."
    ],
    benefits: [
      "Direct communication from planning through site delivery.",
      "A practical approach to budgeting and documentation before construction starts.",
      "Homes designed for Canberra conditions, comfort and long-term value."
    ],
    sections: [
      {
        title: "New home building with local Canberra knowledge",
        paragraphs: [
          "A new home build in Canberra should begin with a clear understanding of the site, estate requirements, service connections and the way your household wants to use the home. Those details influence everything from the floorplan to the build cost.",
          "Molonglo Construction Group helps clients move from a broad idea to a realistic construction strategy that protects quality and avoids unnecessary redesign."
        ]
      },
      {
        title: "What to expect during the planning stage",
        paragraphs: [
          "The planning stage is where the major decisions should be made. This includes confirming the brief, reviewing the block, shaping the design response, understanding likely approvals and deciding where the budget needs to work hardest.",
          "Early clarity improves the build experience later. It gives clients better visibility over likely cost drivers, lead times and the documents required for pricing and approvals."
        ]
      },
      {
        title: "A better fit for owners who want more than a standard process",
        paragraphs: [
          "Some clients want a straightforward new home on a new block. Others want a more individual result with stronger street presence, better liveability or premium detailing. Our process accommodates both by grounding every project in practical construction advice first.",
          "That approach is especially valuable in Canberra suburbs where orientation, slope and streetscape can vary sharply from one block to the next."
        ]
      }
    ],
    faqs: [
      {
        question: "How long does it take to build a new home in Canberra?",
        answer: "The timeframe depends on the site, approvals, documentation completeness and construction complexity. Early planning and timely selections help keep the program moving."
      },
      {
        question: "Do you only build custom homes?",
        answer: "Our focus is on residential construction that responds properly to the client and the site, including new homes, custom homes, knockdown rebuilds and selected dual occupancy projects."
      },
      {
        question: "Can you help before drawings are finalised?",
        answer: "Yes. Early builder input often makes pricing, scope alignment and program planning much clearer."
      }
    ],
    relatedLocations: ["builder-canberra", "builder-coombs", "builder-denman-prospect"],
    relatedBlogs: ["how-long-does-it-take-to-build-a-home-in-canberra", "cost-to-build-a-house-in-canberra-2026", "custom-home-builder-canberra-what-to-look-for"]
  },
  {
    slug: "construction-services-canberra",
    title: "Construction Services Canberra",
    metaTitle: "Construction Services Canberra | Molonglo Construction Group",
    metaDescription: "Construction services in Canberra for custom homes, knockdown rebuilds, renovations and dual occupancy projects.",
    h1: "Construction Services Canberra",
    intro: "Residential construction services for Canberra homeowners who need practical advice, clear process management and quality site delivery.",
    image: "/assets/images/projects/churcher-whitlam.jpg",
    audience: [
      "Homeowners comparing pathways such as custom homes, rebuilds and renovations.",
      "Landowners reviewing whether a site suits a single home or dual occupancy outcome.",
      "Clients who want one builder to coordinate planning, approvals and construction."
    ],
    benefits: [
      "A complete residential construction perspective rather than isolated advice.",
      "Stronger alignment between scope, approvals, budget and site delivery.",
      "Local knowledge across Canberra, Molonglo Valley and nearby service areas."
    ],
    sections: [
      {
        title: "Residential construction backed by planning discipline",
        paragraphs: [
          "Construction services in Canberra need to go beyond labour on site. The strongest outcomes come from understanding the block, the goals of the project and the practical sequence required to move from idea to handover.",
          "Molonglo Construction Group supports custom homes, new homes, knockdown rebuilds, renovations and dual occupancy projects with a process that keeps the important decisions in the right order."
        ]
      },
      {
        title: "Choosing the right construction pathway",
        paragraphs: [
          "The right pathway depends on what you want the property to achieve. A family building a forever home needs a different strategy from an owner staying in an established suburb or a landowner reviewing a two-dwelling opportunity.",
          "We help clients compare these options against site conditions, compliance requirements, likely cost drivers and the level of documentation needed before pricing becomes meaningful."
        ]
      },
      {
        title: "Why local context matters",
        paragraphs: [
          "Canberra blocks can involve estate controls, slope, retaining, solar access, drainage and neighbour relationships that materially affect construction. Local experience helps bring those issues into the conversation before they become expensive problems on site.",
          "That local knowledge also supports more practical decisions around material durability, energy performance and the liveability expectations buyers and families have in the ACT."
        ]
      }
    ],
    faqs: [
      {
        question: "What types of construction services do you provide?",
        answer: "We focus on residential construction including custom homes, new homes, knockdown rebuilds, selected renovations and dual occupancy projects."
      },
      {
        question: "Can you help us decide which project type suits our block?",
        answer: "Yes. We can discuss the block, the project goals and the likely construction pathway during an early consultation."
      },
      {
        question: "Do you service Queanbeyan as well as Canberra?",
        answer: "Yes. Our service area includes the ACT and nearby NSW surrounds, including Canberra, Queanbeyan, Jerrabomberra, Googong, Molonglo Valley, Denman Prospect, Wright and Coombs, plus selected South Coast areas including Batemans Bay, Narooma, Bega, Pambula and Merimbula by enquiry."
      }
    ],
    relatedLocations: ["builder-canberra", "builder-queanbeyan", "builder-molonglo-valley"],
    relatedBlogs: ["builder-vs-project-home-company-which-is-better", "questions-to-ask-before-choosing-a-builder-in-canberra", "cost-to-build-a-house-in-canberra-2026"]
  },
  {
    slug: "home-renovations-canberra",
    title: "Home Renovations Canberra",
    metaTitle: "Home Renovations Canberra | Molonglo Construction Group",
    metaDescription: "Home renovations in Canberra for homeowners who need thoughtful upgrades, better functionality and practical construction advice.",
    h1: "Home Renovations Canberra",
    intro: "Improve the way your home works with renovations that are planned around structure, services, budget and how you live every day.",
    image: "/assets/images/projects/giordano-1.jpg",
    audience: [
      "Homeowners who want to upgrade kitchens, living zones or overall functionality.",
      "Families comparing renovation with extension or rebuild options.",
      "Owners who want construction advice before investing heavily in design work."
    ],
    benefits: [
      "A realistic review of what the existing house can support.",
      "Clear advice on when renovation is sensible and when rebuild may offer better value.",
      "Planning that considers existing structure, services and staging."
    ],
    sections: [
      {
        title: "Renovations need the same planning discipline as new builds",
        paragraphs: [
          "A successful renovation starts with understanding the existing home. Structure, drainage, services, ceiling heights, thermal performance and the relationship between old and new areas all affect the scope and cost.",
          "Molonglo Construction Group approaches renovations with the same practical discipline used on new homes, because unresolved details are just as costly in an existing house."
        ]
      },
      {
        title: "When renovation is the right path",
        paragraphs: [
          "Renovation can be a strong option when the home has a solid foundation and the desired changes can improve daily use without forcing a complete redesign. This might include opening living spaces, improving kitchen layout, adding storage or updating finishes and services in key zones.",
          "For more extensive changes, we help homeowners compare renovation against knockdown rebuild so the decision is based on long-term value rather than guesswork."
        ]
      },
      {
        title: "Canberra-specific renovation considerations",
        paragraphs: [
          "Older Canberra homes can require attention to insulation, glazing, waterproofing and aging service infrastructure. Renovation scope should account for those issues early so the upgraded home performs better in winter and summer, not just visually.",
          "A clear scope also helps control disruption and makes it easier to plan staging if the household needs to remain in the area during the works."
        ]
      }
    ],
    faqs: [
      {
        question: "How do I know if I should renovate or rebuild?",
        answer: "The answer depends on the condition of the existing home, the scale of change required and the likely cost of structural, services and energy upgrades. We can help review the options."
      },
      {
        question: "Do you handle renovation planning as well as construction?",
        answer: "We can help shape the construction pathway early so the design and scope decisions are grounded in practical buildability."
      },
      {
        question: "Are renovations common in Canberra's established suburbs?",
        answer: "Yes. Many homeowners renovate to improve functionality, thermal comfort and storage while staying in the suburb they already know."
      }
    ],
    relatedLocations: ["builder-canberra", "builder-queanbeyan", "builder-wright-act"],
    relatedBlogs: ["builder-vs-project-home-company-which-is-better", "questions-to-ask-before-choosing-a-builder-in-canberra", "new-home-construction-process-in-act"]
  },
  {
    slug: "dual-occupancy-builders-act",
    title: "Dual Occupancy Builders ACT",
    metaTitle: "Dual Occupancy Builders ACT | Molonglo Construction Group",
    metaDescription: "Dual occupancy builders in the ACT for two-dwelling projects, development feasibility and carefully planned residential construction.",
    h1: "Dual Occupancy Builders ACT",
    intro: "Make better use of your land with dual occupancy planning and construction that balances compliance, liveability and long-term value.",
    image: "/assets/images/projects/giordano-2.jpg",
    audience: [
      "Landowners reviewing whether their ACT block can support two dwellings.",
      "Families planning multi-generational living on one site.",
      "Investors seeking a practical dual occupancy build partner."
    ],
    benefits: [
      "Builder input on feasibility before you commit to the wrong design response.",
      "A focus on privacy, circulation, storage and build efficiency across both dwellings.",
      "Local insight into ACT planning and construction expectations."
    ],
    sections: [
      {
        title: "Dual occupancy requires both residential and development thinking",
        paragraphs: [
          "A dual occupancy project is not simply two smaller homes placed on one block. Parking, setbacks, open space, privacy, service coordination and build sequencing all need careful planning.",
          "Molonglo Construction Group helps landowners review feasibility before committing to a concept that may be difficult to approve or expensive to build."
        ]
      },
      {
        title: "Balancing compliance with liveability",
        paragraphs: [
          "The best dual occupancy projects work well for real occupants. Each dwelling should feel private, functional and comfortable, with clear entries, usable outdoor space and durable construction details that hold up over time.",
          "That is especially important in ACT suburbs where buyers and tenants expect quality layouts, storage, natural light and efficient heating and cooling."
        ]
      },
      {
        title: "A clearer process for ACT landowners",
        paragraphs: [
          "We guide clients through the order of decisions so the site, the project goals and the approvals pathway are understood before construction pricing begins. That helps reduce redesign and gives owners better visibility over scope and risk.",
          "If a block is better suited to one premium residence or a broader multi-unit outcome, we can discuss that early rather than forcing a dual occupancy approach."
        ]
      }
    ],
    faqs: [
      {
        question: "Can every ACT block support dual occupancy?",
        answer: "No. Feasibility depends on block size, frontage, slope, access, planning controls and the private open space and parking requirements for the site."
      },
      {
        question: "Is dual occupancy only for investors?",
        answer: "No. It can also suit multi-generational living, downsizing plans or households wanting flexibility for family accommodation."
      },
      {
        question: "Do you build dual occupancies in Molonglo Valley?",
        answer: "Yes. We service Molonglo Valley and surrounding ACT locations where the site and approvals pathway support the project."
      }
    ],
    relatedLocations: ["builder-molonglo-valley", "builder-denman-prospect", "builder-coombs"],
    relatedBlogs: ["builder-vs-project-home-company-which-is-better", "building-in-denman-prospect-what-homeowners-should-know", "building-in-wright-act-custom-home-guide"]
  },
  {
    slug: "multi-unit-developments-canberra",
    title: "Multi Unit Developments Canberra",
    metaTitle: "Multi Unit Developments Canberra | Molonglo Construction Group",
    metaDescription: "Multi-unit developments in Canberra for townhouses, terraces and carefully planned residential projects.",
    h1: "Multi Unit Developments Canberra",
    intro: "A residential builder for Canberra townhouse, terrace and compact multi-unit projects where planning discipline and construction quality both matter.",
    image: "/assets/images/projects/denman-3.jpg",
    audience: [
      "Developers or landowners exploring small-scale residential projects in Canberra.",
      "Clients comparing dual occupancy with a broader multi-unit outcome.",
      "Owners who need a builder that understands repeated details and quality control."
    ],
    benefits: [
      "Early constructability input for repeatable residential projects.",
      "Better coordination of staging, services and documentation.",
      "A focus on dwellings that still feel liveable and market-ready."
    ],
    sections: [
      {
        title: "Small-scale development still needs residential quality",
        paragraphs: [
          "Multi-unit work depends on consistent decisions. Small changes repeat across the project, so buildability, documentation quality and procurement planning are critical from the outset.",
          "Molonglo Construction Group brings residential building knowledge to projects where quality, timing and cost control all need to work together."
        ]
      },
      {
        title: "Feasibility before construction",
        paragraphs: [
          "A sound feasibility review looks beyond yield. It considers access, parking, services, retaining, acoustic separation, landscaping and the way buyers or tenants will actually use the finished homes.",
          "That broader view helps reduce redesign later and gives owners a more realistic picture of what the site can support."
        ]
      },
      {
        title: "Canberra market expectations",
        paragraphs: [
          "Canberra buyers expect more than a compliant floorplan. Natural light, storage, private outdoor space, durable finishes and strong street presentation all influence long-term value.",
          "We help clients build those expectations into the project early, before site delivery starts."
        ]
      }
    ],
    faqs: [
      {
        question: "What type of multi-unit projects do you support?",
        answer: "We support selected townhouses, terraces and compact multi-unit residential developments where the project scope suits our residential construction focus."
      },
      {
        question: "When should a builder join the development process?",
        answer: "Ideally during feasibility or early design so construction logic, staging and cost drivers can be reviewed before documentation is final."
      },
      {
        question: "Is multi-unit always a better option than dual occupancy?",
        answer: "Not necessarily. The right path depends on the block, planning controls, target market and the level of complexity you want to manage."
      }
    ],
    relatedLocations: ["builder-canberra", "builder-molonglo-valley", "builder-queanbeyan"],
    relatedBlogs: ["builder-vs-project-home-company-which-is-better", "cost-to-build-a-house-in-canberra-2026", "questions-to-ask-before-choosing-a-builder-in-canberra"]
  }
];

export const locations: LocationPage[] = [
  {
    slug: "builder-canberra",
    suburb: "Canberra",
    metaTitle: "Builder Canberra | Molonglo Construction Group",
    metaDescription: "Local Canberra builder for custom homes, knockdown rebuilds and residential construction. Talk to a licensed ACT and NSW builder about your project.",
    h1: "Builder Canberra",
    intro: "A Canberra-focused residential builder offering practical planning, direct communication and quality construction across custom homes, rebuilds and selected development projects.",
    image: "/assets/images/hero.jpg",
    sections: [
      {
        title: "Why local Canberra building knowledge matters",
        paragraphs: [
          "Building in Canberra is shaped by more than the floorplan. Orientation, slope, thermal performance, estate requirements, established-street constraints and planning approvals all affect the project before construction even begins.",
          "Molonglo Construction Group works with Canberra homeowners who want a builder that understands those local realities and can guide the process from early consultation through handover."
        ]
      },
      {
        title: "Projects we support across Canberra",
        paragraphs: [
          "Our work includes custom homes, new homes, knockdown rebuilds, selected renovations and dual occupancy projects. Each pathway suits a different type of block and client goal, so the first step is understanding the property and the outcome you want.",
          "That helps us recommend a process that fits the site rather than forcing the project into a generic template."
        ]
      },
      {
        title: "Building for comfort, function and long-term value",
        paragraphs: [
          "Canberra homes should be comfortable in winter, resilient in summer and practical to live in every day. That means resolving orientation, storage, circulation, materials and outdoor connections early, not leaving them until late-stage selections.",
          "Our process keeps those decisions grounded in buildability and budget so the finished home performs well beyond handover."
        ]
      }
    ],
    faqs: [
      {
        question: "Do you build across Canberra or only in Molonglo Valley?",
        answer: "We are based in Denman Prospect and work across the ACT and nearby NSW surrounds, including Canberra, Molonglo Valley, Queanbeyan, Jerrabomberra, Googong, Wright and Coombs."
      },
      {
        question: "Can you help before plans are complete?",
        answer: "Yes. Early consultation is one of the best ways to test feasibility, cost drivers and the right project pathway."
      }
    ],
    serviceLinks: ["custom-home-builders-canberra", "knockdown-rebuild-canberra", "construction-services-canberra", "home-renovations-canberra"],
    nearbyLocations: ["builder-molonglo-valley", "builder-denman-prospect", "builder-queanbeyan"],
    relatedBlogs: ["cost-to-build-a-house-in-canberra-2026", "questions-to-ask-before-choosing-a-builder-in-canberra", "custom-home-builder-canberra-what-to-look-for"]
  },
  {
    slug: "builder-denman-prospect",
    suburb: "Denman Prospect",
    metaTitle: "Builder Denman Prospect | Molonglo Construction Group",
    metaDescription: "Denman Prospect builder for custom homes, new homes and residential projects across the Molonglo Valley corridor.",
    h1: "Builder Denman Prospect",
    intro: "A local Denman Prospect builder with direct knowledge of the suburb, the surrounding Molonglo Valley estates and the expectations of homeowners building in the area.",
    image: "/assets/images/projects/denman-1.jpg",
    sections: [
      {
        title: "A builder based in Denman Prospect",
        paragraphs: [
          "Molonglo Construction Group is based at 13 Romano Street in Denman Prospect, which makes this suburb a natural focus for our residential work. That local base supports more informed conversations about slope, views, estate requirements and the practical details that shape new homes in the area.",
          "It also means site meetings and early planning discussions can happen with a stronger understanding of the suburb context."
        ]
      },
      {
        title: "Building considerations in Denman Prospect",
        paragraphs: [
          "Denman Prospect blocks often involve modern streetscape expectations, varying levels and opportunities for outlook. Those conditions can influence garage access, retaining, orientation and the way living spaces relate to the site.",
          "A custom or new home in Denman Prospect should balance presence, comfort and long-term function rather than relying on superficial upgrades."
        ]
      },
      {
        title: "Services suited to Denman Prospect homeowners",
        paragraphs: [
          "Many Denman Prospect clients are looking for custom homes or new homes shaped around the specific block. Others may be comparing a dual occupancy opportunity or a carefully planned renovation. We help clarify which path suits the property and the budget before construction decisions are locked in."
        ]
      }
    ],
    faqs: [
      {
        question: "Is Molonglo Construction based in Denman Prospect?",
        answer: "Yes. Our listed address is 13 Romano Street, Denman Prospect ACT 2611."
      },
      {
        question: "Do you provide consultations for Denman Prospect projects?",
        answer: "Yes. We can review the block, the project goals and the likely construction pathway during an initial consultation."
      }
    ],
    serviceLinks: ["custom-home-builders-canberra", "new-home-builders-canberra", "dual-occupancy-builders-act"],
    nearbyLocations: ["builder-wright-act", "builder-coombs", "builder-molonglo-valley"],
    relatedBlogs: ["building-in-denman-prospect-what-homeowners-should-know", "cost-to-build-a-house-in-canberra-2026", "canberra-home-construction-timeline-explained"]
  },
  {
    slug: "builder-wright-act",
    suburb: "Wright",
    metaTitle: "Builder Wright ACT | Molonglo Construction Group",
    metaDescription: "Wright ACT builder for custom homes, knockdown rebuilds and residential projects across the Molonglo Valley corridor.",
    h1: "Builder Wright ACT",
    intro: "Residential building advice for Wright homeowners looking for a local builder with experience across custom homes, rebuilds and selected dual occupancy work.",
    image: "/assets/images/projects/wright-2.jpg",
    sections: [
      {
        title: "Building in Wright",
        paragraphs: [
          "Wright is one of the key Molonglo Valley suburbs where modern design expectations and site realities need to be considered together. Orientation, slope, privacy, retaining and outdoor living areas all influence what a successful home looks like on the block.",
          "A local builder can bring those considerations into the conversation early, before the design becomes expensive to adjust."
        ]
      },
      {
        title: "What Wright homeowners often need",
        paragraphs: [
          "Wright projects often focus on efficient family layouts, natural light, comfortable year-round living and strong street presentation. Some owners want a new custom home on a modern block, while others may be reviewing whether a larger site supports a more development-driven outcome.",
          "Our process keeps the discussion practical by testing the project goals against the site and the likely construction pathway."
        ]
      },
      {
        title: "Why nearby knowledge helps",
        paragraphs: [
          "With our base in Denman Prospect, Wright is part of our core service area. That proximity helps with site reviews, consultation and the kind of local perspective that improves planning decisions at the start of the project."
        ]
      }
    ],
    faqs: [
      {
        question: "Do you build in Wright ACT?",
        answer: "Yes. Wright is one of our core Molonglo Valley service areas."
      },
      {
        question: "Can you help with custom homes in Wright?",
        answer: "Yes. We support Wright homeowners with custom homes, new homes and other residential pathways suited to the site."
      }
    ],
    serviceLinks: ["custom-home-builders-canberra", "knockdown-rebuild-canberra", "dual-occupancy-builders-act"],
    nearbyLocations: ["builder-denman-prospect", "builder-coombs", "builder-molonglo-valley"],
    relatedBlogs: ["building-in-wright-act-custom-home-guide", "questions-to-ask-before-choosing-a-builder-in-canberra", "how-long-does-it-take-to-build-a-home-in-canberra"]
  },
  {
    slug: "builder-coombs",
    suburb: "Coombs",
    metaTitle: "Builder Coombs | Molonglo Construction Group",
    metaDescription: "Coombs ACT builder for new homes, custom homes and carefully planned residential construction.",
    h1: "Builder Coombs",
    intro: "A Coombs builder for homeowners who want thoughtful planning, clear communication and a home that suits both the block and the way they live.",
    image: "/assets/images/projects/giordano-2.jpg",
    sections: [
      {
        title: "Building in Coombs with local context",
        paragraphs: [
          "Coombs combines modern estate conditions with site-specific challenges such as slope, privacy and orientation. Those details affect the build cost and the way the home should sit on the block, so they are worth resolving before design decisions become fixed.",
          "A strong Coombs project should feel practical and comfortable, not just visually polished."
        ]
      },
      {
        title: "What to consider before construction starts",
        paragraphs: [
          "For Coombs homeowners, the early questions are usually about the best use of the block, how to manage solar access and privacy, and where the budget should be directed for long-term value. That may mean prioritising layout, storage, thermal comfort and durable materials over cosmetic extras.",
          "We can help work through those priorities during the planning stage."
        ]
      },
      {
        title: "Service options for Coombs clients",
        paragraphs: [
          "Many Coombs projects suit a custom or new home pathway. Some larger or differently configured blocks may also invite dual occupancy discussion. Our role is to explain the practical implications of each option before you commit too far down one direction."
        ]
      }
    ],
    faqs: [
      {
        question: "Do you build custom homes in Coombs?",
        answer: "Yes. Coombs is part of our ACT service area for custom homes and other selected residential construction projects."
      },
      {
        question: "Can you assess whether my Coombs block suits dual occupancy?",
        answer: "Yes. We can review the site and discuss the likely feasibility factors before design progresses."
      }
    ],
    serviceLinks: ["new-home-builders-canberra", "custom-home-builders-canberra", "dual-occupancy-builders-act"],
    nearbyLocations: ["builder-wright-act", "builder-denman-prospect", "builder-molonglo-valley"],
    relatedBlogs: ["building-in-denman-prospect-what-homeowners-should-know", "cost-to-build-a-house-in-canberra-2026", "new-home-construction-process-in-act"]
  },
  {
    slug: "builder-molonglo-valley",
    suburb: "Molonglo Valley",
    metaTitle: "Builder Molonglo Valley | Molonglo Construction Group",
    metaDescription: "Molonglo Valley builder for Denman Prospect, Wright, Coombs and surrounding Canberra residential projects.",
    h1: "Builder Molonglo Valley",
    intro: "A local builder for the Molonglo Valley growth corridor, covering Denman Prospect, Wright, Coombs and surrounding suburbs with custom, new and rebuild-focused construction services.",
    image: "/assets/images/projects/churcher-whitlam.jpg",
    sections: [
      {
        title: "Why Molonglo Valley projects need local understanding",
        paragraphs: [
          "Molonglo Valley remains one of Canberra’s most active residential growth areas, but the sites are not all the same. Some blocks prioritise outlook, some need retaining and access solutions, and many require careful orientation to achieve the comfort homeowners expect in Canberra.",
          "Those conditions make early construction advice especially valuable."
        ]
      },
      {
        title: "A service area built around nearby suburbs",
        paragraphs: [
          "From our Denman Prospect base, we support projects across Wright, Coombs and the broader Molonglo Valley corridor. That gives us a close view of the planning patterns, design expectations and practical construction issues common to the area.",
          "It also means homeowners can access a builder who already understands the local context instead of starting from first principles."
        ]
      },
      {
        title: "Project pathways across the corridor",
        paragraphs: [
          "Molonglo Valley clients commonly explore custom homes, new homes and selected dual occupancy opportunities. Each project benefits from a process that clarifies the brief, the site constraints, the likely cost drivers and the approvals pathway before the build starts."
        ]
      }
    ],
    faqs: [
      {
        question: "Which Molonglo Valley suburbs do you service?",
        answer: "We service Denman Prospect, Wright, Coombs and surrounding Canberra locations within the Molonglo Valley corridor."
      },
      {
        question: "Can you assess a block before we commit to design?",
        answer: "Yes. We can review the site and discuss the most suitable project pathway at the start of the process."
      }
    ],
    serviceLinks: ["custom-home-builders-canberra", "new-home-builders-canberra", "dual-occupancy-builders-act", "construction-services-canberra"],
    nearbyLocations: ["builder-denman-prospect", "builder-wright-act", "builder-coombs"],
    relatedBlogs: ["building-in-denman-prospect-what-homeowners-should-know", "building-in-wright-act-custom-home-guide", "new-home-construction-process-in-act"]
  },
  {
    slug: "builder-queanbeyan",
    suburb: "Queanbeyan",
    metaTitle: "Builder Queanbeyan | Molonglo Construction Group",
    metaDescription: "Queanbeyan builder for custom homes, renovations, knockdown rebuilds and surrounding regional residential projects.",
    h1: "Builder Queanbeyan",
    intro: "Residential building support for Queanbeyan homeowners looking for a builder with Canberra-region experience and a practical, hands-on process.",
    image: "/assets/images/projects/wright-1.jpg",
    sections: [
      {
        title: "Residential building in Queanbeyan",
        paragraphs: [
          "Queanbeyan projects can differ from central Canberra blocks in access, neighbourhood character and the mix of existing and newer housing. Those differences affect whether a custom build, renovation or rebuild is the right path.",
          "Molonglo Construction Group works with clients who want practical regional advice backed by experience across the broader Canberra market."
        ]
      },
      {
        title: "How we help Queanbeyan clients",
        paragraphs: [
          "We begin by understanding what the property needs to achieve, then review the site and likely construction sequence. That helps owners compare renovation, custom build and knockdown rebuild options with more confidence.",
          "It also creates a clearer basis for design work and budgeting before construction begins."
        ]
      },
      {
        title: "Connecting Queanbeyan with Canberra-region expertise",
        paragraphs: [
          "Because our work spans Canberra, Molonglo Valley and nearby NSW service areas, we can bring a broader residential perspective to Queanbeyan projects while still keeping the process personalised and direct."
        ]
      }
    ],
    faqs: [
      {
        question: "Do you take on projects in Queanbeyan?",
        answer: "Yes. Queanbeyan, Jerrabomberra and Googong are within our broader service area for the right residential projects."
      },
      {
        question: "Can you help compare renovation and rebuild options?",
        answer: "Yes. We can discuss the condition of the existing home, the desired scope and the likely construction pathway."
      }
    ],
    serviceLinks: ["construction-services-canberra", "home-renovations-canberra", "knockdown-rebuild-canberra"],
    nearbyLocations: ["builder-googong", "builder-jerrabomberra", "builder-canberra"],
    relatedBlogs: ["builder-vs-project-home-company-which-is-better", "cost-to-build-a-house-in-canberra-2026", "new-home-construction-process-in-act"]
  },
  {
    slug: "builder-googong",
    suburb: "Googong",
    metaTitle: "Builder Googong | Molonglo Construction Group",
    metaDescription: "Googong builder for custom homes, new home builds and residential construction near Canberra and Queanbeyan.",
    h1: "Builder Googong",
    intro: "Residential building support for Googong homeowners planning a custom home, new build or tailored construction project close to Canberra.",
    image: "/assets/images/projects/denman-3.jpg",
    sections: [
      {
        title: "Building in Googong",
        paragraphs: [
          "Googong combines newer estate conditions with the practical realities of building near the ACT and NSW border. Site levels, garage access, orientation, drainage and estate controls can all influence the right construction pathway.",
          "Molonglo Construction Group helps clients review those conditions early so the design, documentation and budget stay connected before construction begins."
        ]
      },
      {
        title: "Block and site considerations",
        paragraphs: [
          "A strong Googong home should respond to slope, street presentation, privacy and natural light rather than relying on a generic layout. These decisions affect excavation, retaining, materials and how comfortable the home feels through Canberra-region seasons.",
          "We work with your designer, architect, or planning team to align the design, documentation, budget, and buildability."
        ]
      },
      {
        title: "Relevant services for Googong homeowners",
        paragraphs: [
          "Googong enquiries commonly suit new home builds, custom homes and broader residential construction advice. If you are still comparing land or have concept plans, an early builder conversation can clarify the likely next step."
        ]
      }
    ],
    faqs: [
      {
        question: "Do you build in Googong?",
        answer: "Yes. Googong is within our broader Canberra-region service area for suitable residential projects."
      },
      {
        question: "Can you help before I buy land in Googong?",
        answer: "Yes. We can discuss likely site considerations, budget pressure points and the type of documentation needed before pricing is meaningful."
      }
    ],
    serviceLinks: ["custom-home-builders-canberra", "new-home-builders-canberra", "construction-services-canberra"],
    nearbyLocations: ["builder-queanbeyan", "builder-jerrabomberra", "builder-canberra"],
    relatedBlogs: ["cost-to-build-a-house-in-canberra-2026", "new-home-construction-process-in-act", "questions-to-ask-before-choosing-a-builder-in-canberra"]
  },
  {
    slug: "builder-jerrabomberra",
    suburb: "Jerrabomberra",
    metaTitle: "Builder Jerrabomberra | Molonglo Construction Group",
    metaDescription: "Jerrabomberra builder for custom homes, knockdown rebuilds and residential construction near Canberra and Queanbeyan.",
    h1: "Builder Jerrabomberra",
    intro: "A Canberra-region residential builder for Jerrabomberra homeowners comparing custom builds, rebuilds and practical construction pathways.",
    image: "/assets/images/projects/churcher-whitlam.jpg",
    sections: [
      {
        title: "Residential building in Jerrabomberra",
        paragraphs: [
          "Jerrabomberra projects can involve established homes, newer pockets and blocks where access, slope, privacy and orientation need to be assessed together. Those details influence whether a custom home, renovation or knockdown rebuild pathway makes sense.",
          "Molonglo Construction Group brings Canberra-region building experience to early feasibility conversations so the project starts from real site conditions."
        ]
      },
      {
        title: "Block and rebuild considerations",
        paragraphs: [
          "If an existing house no longer suits the household, the decision between renovation and rebuild should consider structure, services, layout compromises, energy performance and long-term value.",
          "For vacant or newer blocks, the early focus is usually on orientation, drainage, access, storage, outdoor living and where the budget should work hardest."
        ]
      },
      {
        title: "Relevant services for Jerrabomberra homeowners",
        paragraphs: [
          "Jerrabomberra clients may need custom home planning, knockdown rebuild advice or residential construction services. The right next step depends on the existing home, land status and level of documentation already prepared."
        ]
      }
    ],
    faqs: [
      {
        question: "Do you take on Jerrabomberra projects?",
        answer: "Yes. Jerrabomberra is within our broader service area for suitable residential projects."
      },
      {
        question: "Can you help compare renovation and knockdown rebuild options?",
        answer: "Yes. We can discuss the current home, the desired outcome and the likely construction pathway before you commit heavily to design work."
      }
    ],
    serviceLinks: ["custom-home-builders-canberra", "knockdown-rebuild-canberra", "construction-services-canberra"],
    nearbyLocations: ["builder-queanbeyan", "builder-googong", "builder-canberra"],
    relatedBlogs: ["knockdown-rebuild-guide-act", "cost-to-build-a-house-in-canberra-2026", "questions-to-ask-before-choosing-a-builder-in-canberra"]
  }
];

export const blogCategories = [
  "Building Costs",
  "Custom Homes",
  "Knockdown Rebuilds",
  "Canberra Building Guides",
  "Design & Planning",
  "Approvals & Process"
];

export const blogSeedIdeas = [
  { title: "Cost to Build a House in Canberra", category: "Building Costs" },
  { title: "Custom Home Builder Canberra: What to Look For", category: "Custom Homes" },
  { title: "Knockdown Rebuild Canberra: Complete Guide", category: "Knockdown Rebuilds" },
  { title: "How Long Does It Take to Build a Home in Canberra?", category: "Canberra Building Guides" },
  { title: "Building in Denman Prospect: What Homeowners Should Know", category: "Canberra Building Guides" },
  { title: "Building in Wright ACT: Custom Home Guide", category: "Canberra Building Guides" },
  { title: "Builder vs Project Home Company: Which Is Better?", category: "Design & Planning" },
  { title: "Canberra Home Construction Timeline Explained", category: "Approvals & Process" },
  { title: "Questions to Ask Before Choosing a Builder in Canberra", category: "Design & Planning" },
  { title: "New Home Construction Process in ACT", category: "Approvals & Process" }
] as const;

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getLocationBySlug(slug: string) {
  return locations.find((location) => location.slug === slug);
}
