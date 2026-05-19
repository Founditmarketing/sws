import type { Metadata } from "next";

import { fleet, fleetCategories } from "@/lib/content/fleet";
import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = buildMetadata({
  title: "Fleet",
  description:
    "Self-owned heavy equipment fleet: dozers, excavators, articulated trucks, motor graders, and compaction. GPS-equipped, well-maintained, and operator-ready.",
  path: "/fleet",
});

export default function FleetPage() {
  const grouped = fleet.reduce<Record<string, typeof fleet>>((acc, f) => {
    (acc[f.category] ??= []).push(f);
    return acc;
  }, {});

  const total = fleet.reduce((sum, f) => sum + f.qty, 0);

  return (
    <>
      <PageHero
        eyebrow="Fleet"
        title="Owned iron. Trained operators. Production rates that hold."
        description={`${total}+ self-owned pieces of heavy equipment, plus support fleet. We don't sub the production work - the iron and the operators are ours.`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Fleet" }]}
      />

      <section className="border-b border-bone-100/10 bg-graphite-950 py-16 md:py-20">
        <div className="container-page space-y-16">
          {fleetCategories.map((cat) => (
            <div key={cat}>
              <div className="mb-6 flex items-end justify-between">
                <h2 className="font-display text-2xl font-bold tracking-tight text-bone-100 md:text-3xl">
                  {cat}
                </h2>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
                  {grouped[cat].reduce((s, f) => s + f.qty, 0)} units
                </span>
              </div>

              <div className="overflow-hidden border border-bone-100/10">
                <table className="w-full text-sm">
                  <thead className="bg-graphite-900 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite-300">
                    <tr>
                      <th className="px-4 py-3 text-left">Make</th>
                      <th className="px-4 py-3 text-left">Model</th>
                      <th className="px-4 py-3 text-left">Capacity</th>
                      <th className="px-4 py-3 text-right">Qty</th>
                      <th className="px-4 py-3 text-right">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grouped[cat].map((f, i) => (
                      <tr
                        key={`${f.make}-${f.model}-${i}`}
                        className="border-t border-bone-100/5"
                      >
                        <td className="px-4 py-4 text-bone-100">{f.make}</td>
                        <td className="px-4 py-4 font-display font-bold text-bone-100">
                          {f.model}
                        </td>
                        <td className="px-4 py-4 text-graphite-300">{f.capacity}</td>
                        <td className="px-4 py-4 text-right font-mono tabular-nums text-bone-100">
                          {f.qty}
                        </td>
                        <td className="px-4 py-4 text-right text-amber-300">
                          {f.notes ?? ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

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
