import { Shield, Award, FileCheck, HardHat } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { SectionHeader } from "@/components/brand/section-header";
import { formatNumber } from "@/lib/utils";

export function SafetyBand() {
  const items = [
    {
      icon: Shield,
      label: "Safety EMR",
      value: siteConfig.stats.safetyEMR.toFixed(2),
      caption: "Below 1.0 - well under the industry average.",
    },
    {
      icon: Award,
      label: "Bonding Capacity",
      value: `$${formatNumber(siteConfig.stats.bondingCapacityUsd / 1_000_000)}M`,
      caption: "Single-project capacity available on request.",
    },
    {
      icon: FileCheck,
      label: "Insurance",
      value: "$10M GL",
      caption: "Excess umbrella, professional, environmental.",
    },
    {
      icon: HardHat,
      label: "OSHA",
      value: "30-hr",
      caption: "All foremen and superintendents OSHA-30 trained.",
    },
  ];

  return (
    <section
      id="safety"
      aria-labelledby="safety-heading"
      className="relative scroll-mt-24 border-b border-bone-100/10 bg-graphite-950 py-24 md:py-32"
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="Safety - Bonding - Insurance"
          title="Pre-qualified for the work that demands it."
          description="The credentials your prequalification team needs - on file and current."
        />

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden border border-bone-100/10 bg-bone-100/10 lg:grid-cols-4">
          {items.map(({ icon: Icon, label, value, caption }) => (
            <div
              key={label}
              className="flex flex-col gap-3 bg-graphite-950 p-6 md:p-8"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center border border-bone-100/15 text-amber-300">
                <Icon className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
                {label}
              </span>
              <span className="font-display text-3xl font-extrabold tracking-tight text-bone-100">
                {value}
              </span>
              <span className="text-sm text-graphite-300">{caption}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
