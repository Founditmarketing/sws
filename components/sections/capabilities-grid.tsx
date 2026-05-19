import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { capabilities } from "@/lib/content/capabilities";
import { SectionHeader } from "@/components/brand/section-header";
import { CapabilityIcon } from "./capability-icon";

// Round 5 audit fix #2: 3 most-requested capabilities surfaced in the
// section-head right rail at lg+. Tracked here so the list is auditable
// rather than scattered through markup. Update each quarter alongside the
// "Q2 2026" eyebrow above.
const MOST_REQUESTED = ["mass-excavation", "pad-sites", "land-clearing"] as const;

export function CapabilitiesGrid() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="relative border-b border-bone-100/10 bg-graphite-950 py-14 md:py-32"
    >
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Capabilities"
            title={
              <>
                Self-performing the work that <br className="hidden md:block" />
                moves your schedule.
              </>
            }
            description="One contractor, one crew, one point of accountability - from clearing through finished pad."
          />
          {/* Round 5 audit fix #2: fill the dead right-rail at lg+ with a
              contextual "most requested" mini-list pulled from existing
              capabilities data. Below lg the section head stays full-width
              left-aligned so the existing mobile/tablet layout is unchanged. */}
          <div className="hidden lg:block lg:w-[18rem] lg:flex-none lg:self-start lg:pt-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300">
              Most requested - Q2 2026
            </span>
            <ul className="mt-3 flex flex-col gap-px overflow-hidden border border-bone-100/10 bg-bone-100/10">
              {MOST_REQUESTED.map((slug) => {
                const c = capabilities.find((x) => x.slug === slug);
                if (!c) return null;
                return (
                  <li key={slug} className="bg-graphite-950">
                    <Link
                      href={`/capabilities/${c.slug}`}
                      className="group flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-graphite-900"
                    >
                      <span className="font-display text-sm font-semibold text-bone-100 transition-colors group-hover:text-amber-100">
                        {c.shortTitle ?? c.title}
                      </span>
                      <ArrowRight
                        className="h-3.5 w-3.5 flex-none text-amber-300 transition-transform duration-200 group-hover:translate-x-0.5"
                        strokeWidth={2.4}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/capabilities"
              className="group mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300"
            >
              All capabilities
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <Link
            href="/capabilities"
            className="group inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-[0.2em] text-amber-300 md:self-end lg:hidden"
          >
            All capabilities
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul
          className={
            "mt-10 border border-bone-100/10 bg-bone-100/10 md:mt-16 md:grid md:grid-cols-2 md:gap-px md:overflow-hidden lg:grid-cols-3 xl:grid-cols-4 " +
            "max-md:fleet-scroll max-md:flex max-md:snap-x max-md:snap-mandatory max-md:gap-3 max-md:overflow-y-hidden max-md:border-0 max-md:bg-transparent " +
            "max-md:-mx-5 max-md:px-5 max-md:pb-1"
          }
        >
          {capabilities.map((c) => (
            <li
              key={c.slug}
              className="max-md:snap-start max-md:w-[min(21rem,calc(100vw-2.75rem))] max-md:flex-none max-md:border max-md:border-bone-100/10 max-md:bg-graphite-950 md:min-w-0 md:w-auto md:border-0 md:bg-transparent"
            >
              <Link
                href={`/capabilities/${c.slug}`}
                aria-label={`${c.title} - learn more`}
                className="group relative flex h-full flex-col gap-4 border-b-2 border-transparent bg-graphite-950 p-6 pb-10 transition-[transform,background-color,border-color] duration-200 hover:-translate-y-1 hover:border-b-amber-300 hover:bg-graphite-900 focus-visible:-translate-y-1 focus-visible:border-b-amber-300 focus-visible:bg-graphite-900 focus-visible:outline-none motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center border border-bone-100/15 text-amber-300 transition-colors group-hover:border-amber-300/60">
                    <CapabilityIcon name={c.icon} className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite-300">
                    {c.category}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-bone-100 transition-colors group-hover:text-amber-100">
                  {c.title}
                </h3>
                <p className="text-pretty text-sm leading-relaxed text-graphite-300">
                  {c.outcome}
                </p>
                <span
                  aria-hidden
                  className="absolute bottom-4 right-5 inline-flex h-8 w-8 items-center justify-center text-amber-300 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none"
                >
                  <ArrowRight className="h-5 w-5" strokeWidth={2.4} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
