// The itemized roster below totals 67 units and is the source of truth for
// the headline count surfaced as `siteConfig.stats.fleetCount`. The fleet
// page subtitle ("`${total}+` self-owned pieces of heavy equipment") sums
// directly from this array, so any changes here will flow to every surface
// without needing to touch `lib/site.ts`.
export type FleetItem = {
  category: "Dozers" | "Excavators" | "Articulated Trucks" | "Graders" | "Compaction" | "Support";
  make: string;
  model: string;
  capacity: string;
  qty: number;
  notes?: string;
};

export const fleet: FleetItem[] = [
  { category: "Dozers", make: "Caterpillar", model: "D9T", capacity: "47 yd blade", qty: 2, notes: "GPS-equipped" },
  { category: "Dozers", make: "Caterpillar", model: "D8T", capacity: "13.5 yd blade", qty: 4, notes: "GPS-equipped" },
  { category: "Dozers", make: "Caterpillar", model: "D6T LGP", capacity: "10 yd blade", qty: 6 },
  { category: "Dozers", make: "John Deere", model: "850K WLT", capacity: "Wide low-track", qty: 2 },

  { category: "Excavators", make: "Caterpillar", model: "390F", capacity: "85 ton", qty: 1 },
  { category: "Excavators", make: "Caterpillar", model: "352F", capacity: "55 ton", qty: 2 },
  { category: "Excavators", make: "Komatsu", model: "PC360", capacity: "40 ton", qty: 4 },
  { category: "Excavators", make: "Caterpillar", model: "330", capacity: "33 ton", qty: 6 },

  { category: "Articulated Trucks", make: "Caterpillar", model: "745", capacity: "45 ton", qty: 8 },
  { category: "Articulated Trucks", make: "Volvo", model: "A40G", capacity: "40 ton", qty: 6 },

  { category: "Graders", make: "Caterpillar", model: "140M3 AWD", capacity: "14' moldboard", qty: 4, notes: "GPS-equipped" },
  { category: "Graders", make: "John Deere", model: "672G", capacity: "14' moldboard", qty: 2 },

  { category: "Compaction", make: "Caterpillar", model: "CS56B", capacity: "Smooth drum", qty: 4 },
  { category: "Compaction", make: "Caterpillar", model: "CP56B", capacity: "Padfoot", qty: 4 },

  { category: "Support", make: "Various", model: "Skid steers, mini-ex, water trucks", capacity: "Site support", qty: 12 },
];

export const fleetCategories = Array.from(new Set(fleet.map((f) => f.category)));
