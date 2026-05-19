import type { Metadata } from "next";

import { Hero } from "@/components/sections/hero";
import { TrustedBy } from "@/components/sections/trusted-by";
import { CapabilitiesGrid } from "@/components/sections/capabilities-grid";
import { FounderQuote } from "@/components/sections/founder-quote";
import { MarketsGrid } from "@/components/sections/markets-grid";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { FeaturedCaseStudy } from "@/components/sections/featured-case-study";
import { ByTheNumbers } from "@/components/sections/by-the-numbers";
import { FleetSnapshot } from "@/components/sections/fleet-snapshot";
import { CoverageMap } from "@/components/sections/coverage-map";
import { QuickRfqBand } from "@/components/sections/quick-rfq-band";

import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sitework Specialist - Central Louisiana commercial site work contractor",
  description:
    "We move earth at commercial scale. Mass excavation, grading, land clearing, and pad sites for industrial, energy, healthcare, and commercial clients across Central Louisiana.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      {/* Round 5 audit fix #3: Safety / bonding promoted directly under the
          TrustedBy marquee so it sits as the second proof block under the hero
          (one click from the eyebrow pill which now anchors to #safety). */}
      <CapabilitiesGrid />
      <FounderQuote />
      <MarketsGrid />
      <FeaturedProjects excludeSlugs={["natchez-substation-pad"]} />
      <FeaturedCaseStudy />
      <ByTheNumbers />
      <FleetSnapshot />
      <CoverageMap />
      <QuickRfqBand />
    </>
  );
}
