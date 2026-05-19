// Round 5 audit fix #4: normalized vocabulary for the /projects filter.
// Each project tags 1+ of these so the index can filter consistently.
export const SCOPE_TAGS = [
  "Mass excavation",
  "Grading",
  "Land clearing",
  "Pad sites",
  "Roads",
  "Drainage",
  "Erosion control",
] as const;
export type ScopeTag = (typeof SCOPE_TAGS)[number];

// Parish list, ordered Rapides-first so the most-served parish leads the chips.
// Add new parishes here as projects are added.
export const PARISHES = [
  "Rapides",
  "Avoyelles",
  "Grant",
  "Catahoula",
  "Concordia",
  "La Salle",
  "Vernon",
  "Natchitoches",
] as const;
export type Parish = (typeof PARISHES)[number];

export type Project = {
  slug: string;
  title: string;
  market: string;
  marketSlug: string;
  client?: string;
  generalContractor?: string;
  location: string;
  /** Derived from `location`. Required for the /projects filter. */
  parish: Parish;
  yearCompleted: number;
  durationDays: number;
  cubicYards?: number;
  acres?: number;
  scope: string[];
  /** Normalized tags from SCOPE_TAGS for the /projects filter. */
  scopeTags: ScopeTag[];
  summary: string;
  body: string[];
  hero: string;
  gallery: string[];
  testimonial?: { quote: string; author: string; title?: string };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "cypress-point",
    title: "Cypress Point Subdivision",
    market: "Commercial Development",
    marketSlug: "commercial-development",
    client: "Confidential Client",
    generalContractor: "Confidential GC",
    location: "Ball, LA",
    parish: "Rapides",
    yearCompleted: 2024,
    durationDays: 90,
    cubicYards: 50_000,
    acres: 12,
    scope: [
      "Mass excavation and grading",
      "Building pad preparation",
      "Site utilities and drainage",
      "Paving subgrade",
    ],
    scopeTags: ["Mass excavation", "Grading", "Pad sites", "Drainage"],
    summary:
      "Comprehensive site preparation for the Cypress Point development, delivering the complete earthwork and drainage package on schedule.",
    body: [
      "Mobilized multiple crews to complete mass excavation and grading ahead of the wet season.",
      "Ensured precise building pad elevations to facilitate immediate vertical construction.",
      "Successfully installed all underground detention and storm drainage systems."
    ],
    hero: "/newsiteworkpics/cypresspoint/cypresspointprojectpic1.JPG",
    gallery: [
      "/newsiteworkpics/cypresspoint/cypresspointprojectpic2.JPG",
      "/newsiteworkpics/cypresspoint/cypresspointprojectpic3.JPG",
      "/newsiteworkpics/cypresspoint/cypresspointprojectpic4.JPG",
      "/newsiteworkpics/cypresspoint/cypresspointprojectpic5.JPG",
      "/newsiteworkpics/cypresspoint/cypresspointprojectpic6.JPG",
    ],
    featured: true,
  },
  {
    slug: "va-hospital",
    title: "VA Hospital Site Upgrades",
    market: "Healthcare Campuses",
    marketSlug: "healthcare",
    client: "Department of Veterans Affairs",
    location: "Rapides Parish, LA",
    parish: "Rapides",
    yearCompleted: 2024,
    durationDays: 60,
    cubicYards: 25_000,
    acres: 5,
    scope: [
      "Selective site demolition",
      "Drainage improvements",
      "Access road expansion",
      "Erosion control"
    ],
    scopeTags: ["Drainage", "Roads", "Erosion control"],
    summary:
      "Critical site and drainage upgrades for the VA Hospital, performed with minimal disruption to ongoing healthcare operations.",
    body: [
      "Coordinated all heavy equipment movement around active hospital traffic and emergency routes.",
      "Upgraded existing storm drainage infrastructure to prevent seasonal flooding issues.",
      "Completed paving subgrade for expanded access routes ahead of the deadline."
    ],
    hero: "/newsiteworkpics/vahospital/vahospitalprojectpic1.jpeg",
    gallery: [
      "/newsiteworkpics/vahospital/vahospitalprojectpic2.jpeg",
      "/newsiteworkpics/vahospital/vahospitalprojectpic3.jpeg",
    ],
    featured: true,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function featuredProjects() {
  return projects.filter((p) => p.featured);
}
