export type Capability = {
  slug: string;
  title: string;
  shortTitle?: string;
  outcome: string;
  description: string;
  icon: CapabilityIcon;
  category: "Earthwork" | "Site Prep" | "Structures" | "Infrastructure";
  scope: string[];
  faqs: { question: string; answer: string }[];
  featured?: boolean;
};

export type CapabilityIcon =
  | "excavation"
  | "grading"
  | "clearing"
  | "padsite"
  | "erosion"
  | "retaining"
  | "concrete"
  | "road"
  | "culvert"
  | "ponds"
  | "dozer"
  | "leveling";

export const capabilities: Capability[] = [
  {
    slug: "mass-excavation",
    title: "Mass Excavation",
    outcome: "Cut, fill, and haul at scale - on schedule.",
    description:
      "Bulk earthwork for industrial pads, commercial developments, and infrastructure programs. We mobilize fast with our own iron and operators, then track quantities, daily progress, and weather impact so the schedule doesn't slip.",
    icon: "excavation",
    category: "Earthwork",
    scope: [
      "Cut/fill optimization",
      "Mass haul + onsite stockpiling",
      "Rock and unsuitable removal",
      "GPS machine control",
      "Daily quantity reporting",
    ],
    faqs: [
      {
        question: "What size projects do you self-perform?",
        answer:
          "Our typical commercial mass excavation projects range from 20,000 to 1,000,000+ cubic yards. We've delivered single-phase moves above 500,000 CY without subbing the production work.",
      },
      {
        question: "Do you provide GPS machine control?",
        answer:
          "Yes. Our dozers and motor graders are equipped with Trimble/Topcon machine control. We can build to your engineer's surface or provide a balanced model with our in-house surveyors.",
      },
    ],
    featured: true,
  },
  {
    slug: "grading",
    title: "Site Grading",
    outcome: "Engineered surfaces, ready for vertical.",
    description:
      "Rough and finish grading to design tolerance for pads, parking, roads, and athletic fields. We hit grade the first time so your concrete and steel crews aren't waiting.",
    icon: "grading",
    category: "Earthwork",
    scope: [
      "Rough grading to +/- 0.10'",
      "Finish grading to +/- 0.04'",
      "Subgrade prep and proof-rolling",
      "Lime/cement stabilization coordination",
    ],
    faqs: [
      {
        question: "What grade tolerances can you hold?",
        answer:
          "Plus/minus four hundredths of a foot for finish, plus/minus one tenth for rough. We document with onsite GPS rover shots and provide as-built surfaces on request.",
      },
    ],
    featured: true,
  },
  {
    slug: "land-clearing",
    title: "Land Clearing",
    outcome: "Clear, grub, and burn - environmentally sound.",
    description:
      "From timbered tracts to overgrown industrial sites. We assess soils, drainage, and protected vegetation up front so the clearing plan doesn't blow up the schedule downstream.",
    icon: "clearing",
    category: "Site Prep",
    scope: [
      "Mulching and forestry mowing",
      "Tree removal and grubbing",
      "Burn pit management with permits",
      "Wetland delineation coordination",
      "Erosion control during clearing",
    ],
    faqs: [
      {
        question: "Do you handle burn permits?",
        answer:
          "Yes. We coordinate with Louisiana Department of Agriculture and Forestry and local fire authorities, manage the burn schedule, and keep water/dozers on standby for the duration.",
      },
    ],
    featured: true,
  },
  {
    slug: "pad-sites",
    title: "Pad Sites",
    outcome: "Build-ready pads to engineer specification.",
    description:
      "Complete pad packages: clearing, demolition, earthwork, stabilization, drainage, and aggregate base. Engineered, tested, and certified before your vertical contractor hits the site.",
    icon: "padsite",
    category: "Site Prep",
    scope: [
      "Building pads to engineer surface",
      "Stabilization (lime, cement, geogrid)",
      "Aggregate base and proof-roll",
      "Density testing coordination",
      "As-built deliverables",
    ],
    faqs: [
      {
        question: "Do you handle the geotech testing?",
        answer:
          "We coordinate with your owner's testing lab, provide the equipment and grade for testing windows, and rework areas that don't pass at no additional charge if it's our compaction.",
      },
    ],
    featured: true,
  },
  {
    slug: "erosion-control",
    title: "Erosion Control",
    outcome: "Compliant SWPPP execution, not a liability.",
    description:
      "Permit-driven erosion and sediment control: silt fence, wattles, inlet protection, rock check dams, sediment basins, hydroseeding. We keep your LPDES coverage clean and your inspections boring.",
    icon: "erosion",
    category: "Site Prep",
    scope: [
      "SWPPP execution",
      "Silt fence + wattles",
      "Inlet and outlet protection",
      "Sediment basins",
      "Stabilization (hydroseed, blankets)",
    ],
    faqs: [
      {
        question: "Do you self-perform inspections?",
        answer:
          "We perform contractor walks ahead of every weather event and weekly otherwise. Owner-side inspections are coordinated with your QSP/QSD as the prime requires.",
      },
    ],
  },
  {
    slug: "retaining-structures",
    title: "Retaining Structures",
    outcome: "Walls, sea walls, and revetments - engineered.",
    description:
      "Segmental retaining walls, sheet pile, riprap revetments, and concrete sea walls. We coordinate with your engineer of record and self-perform the install.",
    icon: "retaining",
    category: "Structures",
    scope: [
      "Segmental and modular block walls",
      "Sheet pile and tiebacks",
      "Concrete sea walls",
      "Riprap revetments",
      "Geogrid reinforcement",
    ],
    faqs: [],
  },
  {
    slug: "concrete-flatwork",
    title: "Concrete & Flatwork",
    outcome: "Slabs, drives, and pours that read true.",
    description:
      "Site concrete: slabs on grade, building footings, driveways, parking, sidewalks, curb and gutter. Flat where it should be flat, sloped where it should drain.",
    icon: "concrete",
    category: "Structures",
    scope: [
      "Slabs on grade",
      "Footings and grade beams",
      "Curb, gutter, valley pans",
      "Sidewalks and ADA ramps",
      "Heavy-duty industrial paving",
    ],
    faqs: [],
  },
  {
    slug: "road-development",
    title: "Road Development",
    outcome: "Haul roads, access roads, and parish work.",
    description:
      "From private industrial haul roads to subdivision and parish roads. Subgrade through aggregate base, with options for asphalt or concrete coordination.",
    icon: "road",
    category: "Infrastructure",
    scope: [
      "Subgrade and base",
      "Haul road maintenance",
      "Stabilization options",
      "Drainage coordination",
    ],
    faqs: [],
  },
  {
    slug: "culverts-drainage",
    title: "Culverts & Drainage",
    outcome: "Move water before it moves your project.",
    description:
      "Storm pipe, culverts, headwalls, ditching, and detention. We size, place, and tie back to grade so the next storm doesn't cost you a week.",
    icon: "culvert",
    category: "Infrastructure",
    scope: [
      "RCP, HDPE, and CMP",
      "Headwalls and aprons",
      "Detention and retention",
      "Channel reshaping",
    ],
    faqs: [],
  },
  {
    slug: "ponds-impoundments",
    title: "Ponds & Impoundments",
    outcome: "Hold water on purpose, not by accident.",
    description:
      "Detention, retention, irrigation, and recreation impoundments. Surveyed, designed for storage and discharge, and built with proper liners or compaction.",
    icon: "ponds",
    category: "Infrastructure",
    scope: ["Survey + design coordination", "Excavation and embankment", "Liners and seal", "Spillways"],
    faqs: [],
  },
  {
    slug: "dozer-work",
    title: "Dozer Work",
    outcome: "Heavy iron, fine work.",
    description:
      "From D6 through D9 class dozers - clearing, pushing, finish dozing. Operator-led production, GPS-guided where it makes sense.",
    icon: "dozer",
    category: "Earthwork",
    scope: ["D6/D8/D9 production dozing", "GPS finish dozing", "Reclamation and reshape"],
    faqs: [],
  },
  {
    slug: "leveling",
    title: "Site Leveling",
    outcome: "Flatten what needs to be flat.",
    description:
      "Yards, parking lots, athletic fields, and ag tracts brought to engineered or working grade.",
    icon: "leveling",
    category: "Earthwork",
    scope: ["Engineered grading", "Working surface leveling", "Drainage rework"],
    faqs: [],
  },
];

export function getCapability(slug: string) {
  return capabilities.find((c) => c.slug === slug);
}

export function featuredCapabilities() {
  return capabilities.filter((c) => c.featured);
}
