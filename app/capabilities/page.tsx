import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { capabilities } from "@/lib/content/capabilities";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { CapabilityIcon } from "@/components/sections/capability-icon";

export const metadata: Metadata = buildMetadata({
  title: "Capabilities",
  description:
    "Self-performing site work capabilities: mass excavation, grading, land clearing, pad sites, erosion control, retaining structures, road and drainage work across Central Louisiana.",
  path: "/capabilities",
});

export default function CapabilitiesIndexPage() {
  const grouped = capabilities.reduce<Record<string, typeof capabilities>>((acc, c) => {
    (acc[c.category] ??= []).push(c);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        image="/newsiteworkpics/siteworkprojectpic13.jpeg"
        eyebrow="Capabilities"
        title="One contractor. The whole site package, self-performed."
        description="From timbered tracts to engineered, build-ready pads. We own the iron, train the operators, and answer for the schedule."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Capabilities" },
        ]}
      />

      {Object.entries(grouped).map(([category, items]) => (
        <section
          key={category}
          aria-labelledby={`group-${category}`}
          className="border-b border-bone-100/10 bg-graphite-950 py-16 md:py-20"
        >
          <div className="container-page">
            <div className="mb-10 flex items-end justify-between gap-6">
              <h2
                id={`group-${category}`}
                className="font-display text-2xl font-bold tracking-tight text-bone-100 md:text-3xl"
              >
                {category}
              </h2>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
                {items.length} capabilities
              </span>
            </div>
            <ul className="grid grid-cols-1 gap-px overflow-hidden border border-bone-100/10 bg-bone-100/10 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/capabilities/${c.slug}`}
                    className="group relative flex h-full flex-col gap-4 bg-graphite-950 p-6 transition-colors hover:bg-graphite-900"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-12 w-12 items-center justify-center border border-bone-100/15 text-amber-300">
                        <CapabilityIcon name={c.icon} className="h-6 w-6" />
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-graphite-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-300" />
                    </div>
                    <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-bone-100">
                      {c.title}
                    </h3>
                    <p className="text-pretty text-sm leading-relaxed text-graphite-300">
                      {c.outcome}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <CtaBand
        eyebrow="Need a number?"
        title="Send us your scope. We'll quote it like our reputation depends on it."
      />
    </>
  );
}
