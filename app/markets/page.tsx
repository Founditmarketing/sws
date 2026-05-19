import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { markets } from "@/lib/content/markets";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = buildMetadata({
  title: "Markets",
  description:
    "Markets we serve: industrial, energy, commercial development, municipal, healthcare, and logistics. Self-performing site work for owners and general contractors across Central Louisiana.",
  path: "/markets",
});

export default function MarketsIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Markets we serve"
        title="Six industries. One bar for delivery."
        description="Each market we serve has its own definition of clean, safe, and on time. We adapt to yours - and we don't sub the production work."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Markets" }]}
      />

      <section className="border-b border-bone-100/10 bg-graphite-950 py-16 md:py-20">
        <div className="container-page">
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {markets.map((m, i) => (
              <li key={m.slug}>
                <Link
                  href={`/markets/${m.slug}`}
                  className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden border border-bone-100/10 bg-graphite-800 p-6 md:aspect-[3/4]"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url('${m.image}')` }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-graphite-950 via-graphite-950/70 to-graphite-950/15 transition-opacity duration-300 group-hover:from-graphite-950 group-hover:via-graphite-950/85"
                  />
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">
                      {`0${i + 1}`}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-bone-100 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <h3 className="mt-12 font-display text-3xl font-extrabold leading-tight tracking-tight text-bone-100">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm text-graphite-300">{m.tagline}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        eyebrow="Different market, same standard"
        title="Whatever your industry calls it, we deliver build-ready sites."
      />
    </>
  );
}
