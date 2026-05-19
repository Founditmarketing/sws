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
    "/newsiteworkpics/siteworkprojectpic6.jpeg",
  Excavators:
    "/newsiteworkpics/siteworkprojectpic7.jpeg",
  Graders:
    "/newsiteworkpics/siteworkprojectpic4.JPEG",
  "Articulated Trucks":
    "/newsiteworkpics/siteworkprojectpic14.JPG",
  Compaction:
    "/newsiteworkpics/siteworkprojectpic9.JPG",
  Support:
    "/newsiteworkpics/siteworkprojectpic15.jpeg",
};
