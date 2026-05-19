// The itemized roster below totals 67 units and is the source of truth for
// the headline count surfaced as `siteConfig.stats.fleetCount`. The fleet
// page subtitle ("`${total}+` self-owned pieces of heavy equipment") sums
// directly from this array, so any changes here will flow to every surface
// without needing to touch `lib/site.ts`.
export type FleetCategory = {
  title: "Dozers" | "Excavators" | "Articulated Trucks" | "Graders" | "Tractors" | "Compaction" | "Support";
  description: string;
  count: number;
};

export const fleet: FleetCategory[] = [
  { title: "Dozers", description: "Heavy production dozers for mass excavation", count: 14 },
  { title: "Excavators", description: "Large excavators for deep trenching", count: 13 },
  { title: "Articulated Trucks", description: "Off-road articulated haulers for mass transport", count: 14 },
  { title: "Tractors", description: "Pull-type tractors equipped with scrapers and pans", count: 4 },
  { title: "Graders", description: "Motor graders equipped with GPS for subgrade", count: 6 },
  { title: "Compaction", description: "Vibratory compactors for structural and cohesive fill", count: 8 },
  { title: "Support", description: "Skid steers, mini-excavators, and site water trucks", count: 12 },
];
