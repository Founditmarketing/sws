import type { FleetItem } from "@/lib/content/fleet";

/**
 * Homepage section art uses remote Unsplash sources so `next/image` can optimize
 * delivery (WebP/AVIF) without checking large binaries into `public/`.
 */
export const founderQuoteBackground =
  "/newsiteworkpics/siteworkprojectpic11.jpeg";

// Self-hosted substation/switchyard hero (steel lattice, transformer pad,
// gravel, twilight) — replaces the prior Unsplash ID 1497435334941, which
// the QA team identified as a solar farm and therefore wrong for the
// Natchez 230kV substation case study.
export const featuredCaseStudyHero = "/img/case-study-substation.jpg";

// TODO(client-photoshoot): Replace with real Sitework Specialist iron with the
// company decals visible. The current Unsplash sources are stronger than
// generic stock and shippable for now, but they should be swapped during the
// half-day shoot. See README "Open items" #3.
export const fleetCategoryHeroSrc: Record<FleetItem["category"], string> = {
  Dozers:
    "/img/fleet-dozers.webp",
  Excavators:
    "/img/fleet-excavators.jpg",
  Graders:
    "/img/fleet-graders.webp",
  "Articulated Trucks":
    "/img/fleet-trucks.webp",
  Compaction:
    "/img/fleet-compaction.webp",
  Support:
    "/img/fleet-support.webp",
};
