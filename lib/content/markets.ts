export type Market = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  image: string;
  clients?: string[];
};

export const markets: Market[] = [
  {
    slug: "industrial",
    title: "Industrial & Manufacturing",
    tagline: "Heavy industrial pads, expansions, and process facilities.",
    description:
      "Mass excavation, foundation pads, and supporting infrastructure for paper, chemical, food processing, and manufacturing facilities across Central Louisiana. We mobilize a self-performing crew that meets your facility's safety standards from day one.",
    bullets: [
      "Mill and plant expansions",
      "Process equipment foundations",
      "Containment basins",
      "Heavy haul road coordination",
    ],
    image:
      "/newsiteworkpics/siteworkprojectpic18.jpeg",
    clients: ["Roy O. Martin", "Procter & Gamble", "Weyerhaeuser"],
  },
  {
    slug: "energy",
    title: "Energy & Oil & Gas",
    tagline: "Lease pads, gathering, and renewables-ready sites.",
    description:
      "From well pads and lease roads to substation sites and solar lay-down yards. We work to operator standards and have our crews badged for the major Louisiana basins.",
    bullets: [
      "Well pads and lease roads",
      "Substation and switchyard pads",
      "Solar site preparation",
      "Pipeline ROW restoration",
    ],
    image:
      "/newsiteworkpics/siteworkprojectpic1.jpeg",
    clients: ["Cleco Power"],
  },
  {
    slug: "commercial-development",
    title: "Commercial Development",
    tagline: "Big-box, retail, hospitality, and mixed-use sites.",
    description:
      "From the dirt to the ribbon - clearing, mass earthwork, utilities-ready pads, and complete paving and curb packages for commercial developers and their general contractors.",
    bullets: [
      "Big-box anchor pads",
      "Retail and restaurant out-parcels",
      "Hospitality and mixed-use",
      "Site lighting and signage bases",
    ],
    image:
      "/newsiteworkpics/siteworkprojectpic5.jpeg",
  },
  {
    slug: "municipal",
    title: "Municipal & Public Works",
    tagline: "Roads, drainage, parks, and parish infrastructure.",
    description:
      "Public bid work for parish, municipal, and state agencies - from drainage improvements and road widenings to athletic complexes and public facility sites.",
    bullets: [
      "LaDOTD and parish roads",
      "Drainage and detention",
      "Parks and athletic fields",
      "Public facility pads",
    ],
    // Swapped 2026-05-10: prior Unsplash ID (1599619585752-c3edb42a414c)
    // was an aircraft underside the QA team flagged as off-theme. This
    // replacement is a self-hosted, brand-graded scene of a parish road
    // grader passing a freshly poured drainage culvert at golden hour —
    // exactly the work this market card promises.
    image: "/img/markets-municipal.jpg",
    clients: ["Rapides Parish", "LaDOTD"],
  },
  {
    slug: "healthcare",
    title: "Healthcare Campuses",
    tagline: "Hospitals, MOBs, and clinical campus expansion.",
    description:
      "Site work for healthcare construction comes with tighter coordination, cleaner sites, and zero tolerance for schedule slip. We've delivered for active campuses with operating ORs next door.",
    bullets: [
      "Hospital expansions",
      "Medical office buildings",
      "Behavioral health facilities",
      "Active-campus coordination",
    ],
    image:
      "/newsiteworkpics/siteworkprojectpic8.jpeg",
    clients: ["Christus Health"],
  },
  {
    slug: "logistics-distribution",
    title: "Logistics & Distribution",
    tagline: "Distribution centers, transload, and yard work.",
    description:
      "Big footprints, big trucks, big drainage. Distribution and logistics sites need fast, accurate earthwork and heavy-duty paving that holds up to 365-day operations.",
    bullets: [
      "DC pads and yards",
      "Heavy-duty paving",
      "Trailer storage yards",
      "Rail-served sites",
    ],
    image:
      "/newsiteworkpics/siteworkprojectpic10.jpeg",
  },
];

export function getMarket(slug: string) {
  return markets.find((m) => m.slug === slug);
}
