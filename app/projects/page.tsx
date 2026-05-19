import type { Metadata } from "next";
import { Suspense } from "react";

import { projects } from "@/lib/content/projects";
import { markets } from "@/lib/content/markets";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { ProjectsFilters } from "@/components/projects/projects-filters";
import { LightboxGallery } from "@/components/ui/lightbox-gallery";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Selected commercial site work projects across Central Louisiana - distribution centers, healthcare campuses, energy substations, and industrial pads. Confidential client names available on request.",
  path: "/projects",
});

export default function ProjectsIndexPage() {
  // Round 5 audit fix #4: filter chip data sourced once on the server. The
  // marketOptions list mirrors the markets that actually appear in the
  // current project set so the chips never offer dead filters.
  const usedMarketSlugs = new Set(projects.map((p) => p.marketSlug));
  const marketOptions = markets
    .filter((m) => usedMarketSlugs.has(m.slug))
    .map((m) => ({ slug: m.slug, label: m.title }));

  return (
    <>
      <PageHero
        image="/newsiteworkpics/siteworkprojectpic1.jpeg"
        eyebrow="Selected projects"
        title="Real sites. Real numbers. Real schedules."
        description="A snapshot of recent work across Central Louisiana. We can share full scope, references, and confidential project details on request."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      />

      <section className="border-b border-bone-100/10 bg-graphite-950 py-16 md:py-20">
        <div className="container-page">
          <Suspense fallback={null}>
            <ProjectsFilters
              projects={projects}
              marketOptions={marketOptions}
            />
          </Suspense>
        </div>
      </section>

      <section className="border-b border-bone-100/10 bg-graphite-950 py-20 md:py-24">
        <div className="container-page">
          <span className="heading-eyebrow">General Gallery</span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-bone-100 md:text-4xl">
            More from the field
          </h2>
          <LightboxGallery
            altPrefix="General project photo"
            images={[
              "/newsiteworkpics/siteworkprojectvideo1.mp4",
              "/newsiteworkpics/siteworkprojectpic1.jpeg",
              "/newsiteworkpics/siteworkprojectpic2.JPEG",
              "/newsiteworkpics/siteworkprojectvideo2.mp4",
              "/newsiteworkpics/siteworkprojectpic3.JPEG",
              "/newsiteworkpics/siteworkprojectpic4.JPEG",
              "/newsiteworkpics/siteworkprojectvideo3.mp4",
              "/newsiteworkpics/siteworkprojectpic5.jpeg",
              "/newsiteworkpics/siteworkprojectpic6.jpeg",
              "/newsiteworkpics/siteworkprojectpic7.jpeg",
              "/newsiteworkpics/siteworkprojectvideo4.mp4",
              "/newsiteworkpics/siteworkprojectpic8.jpeg",
              "/newsiteworkpics/siteworkprojectpic9.JPG",
              "/newsiteworkpics/siteworkprojectpic10.jpeg",
              "/newsiteworkpics/siteworkprojectpic11.jpeg",
              "/newsiteworkpics/siteworkprojectpic12.jpeg",
              "/newsiteworkpics/siteworkprojectpic13.jpeg",
              "/newsiteworkpics/siteworkprojectpic14.JPG",
              "/newsiteworkpics/siteworkprojectpic15.jpeg",
              "/newsiteworkpics/siteworkprojectpic16.jpeg",
              "/newsiteworkpics/siteworkprojectpic17.jpeg",
              "/newsiteworkpics/siteworkprojectpic18.jpeg",
            ]}
          />
        </div>
      </section>

      <CtaBand
        eyebrow="See yourself in this list"
        title="Send us your project. We'll respond inside 24 hours."
      />
    </>
  );
}
