import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { featuredProjects } from "@/lib/content/projects";
import { SectionHeader } from "@/components/brand/section-header";

export function FeaturedProjects({ excludeSlugs }: { excludeSlugs?: string[] } = {}) {
  const exclude = new Set(excludeSlugs ?? []);
  const list = featuredProjects().filter((p) => !exclude.has(p.slug));
  const gridCols =
    list.length >= 3 ? "lg:grid-cols-3" : list.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-1";

  return (
    <section
      aria-labelledby="projects-heading"
      className="relative border-b border-bone-100/10 bg-graphite-950 py-24 md:py-32"
    >
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Selected projects"
            title="Built for owners and GCs who don't have time for surprises."
            description="A snapshot of recent work across Central Louisiana. Confidential client names available on request."
          />
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-[0.2em] text-amber-300 md:self-end"
          >
            All projects
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className={`mt-16 grid grid-cols-1 gap-6 ${gridCols}`}>
          {list.map((p, i) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className={`group relative isolate flex flex-col overflow-hidden border border-bone-100/10 ${
                list.length >= 3 && i === 0 ? "lg:col-span-2 lg:row-span-1" : ""
              }`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('${p.hero}')` }}
                  aria-hidden
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/30 to-transparent"
                />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 border border-bone-100/30 bg-graphite-950/70 px-2 py-1 backdrop-blur-sm">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-300">
                    {p.market}
                  </span>
                </div>
                </div>
              <div className="flex flex-1 flex-col gap-3 bg-graphite-900 p-6">
                <div className="flex items-center justify-between text-xs text-graphite-300">
                  <span className="font-mono uppercase tracking-[0.18em]">{p.location}</span>
                  <span className="font-mono uppercase tracking-[0.18em]">{p.yearCompleted}</span>
                </div>
                <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-bone-100">
                  {p.title}
                </h3>
                <p className="text-sm text-graphite-300">{p.summary}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-amber-300">
                  Read case study
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

