import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { markets } from "@/lib/content/markets";
import { SectionHeader } from "@/components/brand/section-header";

export function MarketsGrid() {
  return (
    <section
      aria-labelledby="markets-heading"
      className="relative border-b border-bone-100/10 bg-graphite-900 py-24 md:py-32"
    >
      <div className="container-page">
        {/* Round 5 audit fix #2: dead right-rail at lg+ filled with a single
            display-font pull-quote. Below lg the section head stays as before. */}
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end lg:gap-16">
          <SectionHeader
            eyebrow="Markets we serve"
            title="Built for the work that doesn't forgive a missed schedule."
            description="Every market we serve has its own definition of clean, safe, and on-time. We adapt to yours."
          />
          <figure className="hidden lg:block lg:w-[22rem] lg:flex-none lg:self-start lg:pt-8">
            <span
              aria-hidden
              className="block h-px w-10 bg-amber-300"
            />
            <blockquote className="mt-5 font-display text-2xl font-extrabold leading-[1.1] tracking-tight text-bone-100">
              <span className="text-amber-300">&ldquo;</span>
              We pick markets the way we pick crews: by what they have to deliver.
              <span className="text-amber-300">&rdquo;</span>
            </blockquote>
          </figure>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {markets.map((m) => (
            <li key={m.slug}>
              <Link
                href={`/markets/${m.slug}`}
                className="group relative isolate flex aspect-square flex-col justify-end overflow-hidden border border-bone-100/10 bg-graphite-800 p-6 md:aspect-[3/4]"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('${m.image}')` }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-graphite-950 via-graphite-950/70 to-graphite-950/20 transition-opacity duration-300 group-hover:from-graphite-950 group-hover:via-graphite-950/85"
                />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">
                    {`0${markets.indexOf(m) + 1}`}
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
  );
}
