import type { Metadata } from "next";

import { fleet } from "@/lib/content/fleet";
import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import Image from "next/image";
import { fleetCategoryHeroSrc } from "@/lib/homepage-images";

export const metadata: Metadata = buildMetadata({
  title: "Fleet",
  description:
    "Self-owned heavy equipment fleet: dozers, excavators, articulated trucks, motor graders, and compaction. GPS-equipped, well-maintained, and operator-ready.",
  path: "/fleet",
});

export default function FleetPage() {
  return (
    <>
      <PageHero
        image="/newsiteworkpics/siteworkprojectpic15.jpeg"
        eyebrow="The Fleet"
        title="We don't rent our capability."
        description="Heavy earthwork demands iron on demand. We own, maintain, and mobilize a self-sufficient fleet so your critical path isn't waiting on a rental house."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Fleet" }]}
      />

      <section className="border-b border-bone-100/10 bg-graphite-950 py-16 md:py-20">
        <div className="container-page space-y-16">
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {fleet.map((cat) => (
              <article key={cat.title} className="flex flex-col gap-4">
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-bone-100/10">
                  <Image
                    src={fleetCategoryHeroSrc[cat.title]}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <h2 className="font-display text-2xl font-bold tracking-tight text-bone-100">
                      {cat.title}
                    </h2>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">
                      {cat.count} units
                    </span>
                  </div>
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] leading-relaxed text-graphite-300">
                  {cat.description}
                </p>
              </article>
            ))}
          </div>

          <p className="text-sm text-graphite-300">
            All equipment is self-owned, regularly maintained at our Alexandria yard, and supported by a
            full-time mechanic team. Critical haul fleet equipped with telematics for production tracking.
            Need a specific spread for your project? Talk to a project engineer or call{" "}
            <a className="text-amber-300" href={siteConfig.phoneHref}>
              {siteConfig.phone}
            </a>
            .
          </p>
        </div>
      </section>

      <CtaBand
        eyebrow="The right iron for the job"
        title="Tell us your scope. We'll bring the right spread."
      />
    </>
  );
}
