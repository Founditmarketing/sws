import { siteConfig } from "@/lib/site";
import { SectionHeader } from "@/components/brand/section-header";
import { StatBlock } from "@/components/brand/stat-block";

export function ByTheNumbers() {
  const s = siteConfig.stats;
  return (
    <section
      aria-labelledby="numbers-heading"
      className="relative overflow-hidden border-b border-bone-100/10 bg-graphite-950 py-24 md:py-32"
    >
      <div aria-hidden className="absolute inset-0 grid-noise opacity-[0.05]" />
      <div className="container-page relative">
        <SectionHeader
          eyebrow="By the numbers"
          title="The kind of metrics that win commercial work."
          description="Eight years self-performing earthwork in Central Louisiana - measured, audited, and on the record."
        />
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-16 md:grid-cols-3 lg:grid-cols-5">
          <StatBlock 
            className="border-t-0 pt-0 md:border-l-0 md:pl-0"
            label="Years self-performing" 
            value={s.yearsInBusiness} 
            suffix="+" 
          />
          <StatBlock
            className="border-t-0 pt-0 md:border-t-0 md:pt-0"
            label="Cubic yards moved"
            value={s.cubicYardsMoved / 1_000_000}
            suffix="M+"
            decimals={1}
            caption="Lifetime - since 2017"
          />
          <StatBlock label="Projects delivered" value={s.projectsDelivered} suffix="+" />
          <StatBlock label="Heavy equipment" value={s.fleetCount} caption="self-owned units" />
          <StatBlock
            label="Safety EMR"
            value={s.safetyEMR}
            decimals={2}
            caption="industry average is 1.0"
          />
        </div>
      </div>
    </section>
  );
}
