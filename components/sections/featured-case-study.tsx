import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { getProject } from "@/lib/content/projects";
import { featuredCaseStudyHero } from "@/lib/homepage-images";

export function FeaturedCaseStudy() {
  const project = getProject("natchez-substation-pad");
  if (!project) return null;

  return (
    <section
      aria-labelledby="featured-case-study-heading"
      className="relative isolate w-full overflow-hidden border-b border-bone-100/10 bg-graphite-950"
    >
      <div aria-hidden className="absolute inset-0 grid-noise opacity-[0.04]" />

      <div className="relative grid min-h-[640px] grid-cols-1 lg:grid-cols-[60fr_40fr]">
        <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
          <Image
            src={featuredCaseStudyHero}
            alt={`${project.title} - aerial view of completed substation pad`}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
            priority={false}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-tr from-graphite-950/70 via-graphite-950/20 to-transparent"
          />
          <div className="absolute left-6 top-6 inline-flex items-center gap-2 border border-bone-100/30 bg-graphite-950/70 px-3 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 bg-amber-300" aria-hidden />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300">
              {project.market}
            </span>
          </div>
          <div className="absolute bottom-6 left-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite-200">
            <span>{project.location}</span>
            <span aria-hidden className="text-graphite-500">/</span>
            <span>{project.yearCompleted}</span>
            {project.client ? (
              <>
                <span aria-hidden className="text-graphite-500">/</span>
                <span>{project.client}</span>
              </>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col justify-center bg-graphite-900 px-6 py-14 md:px-12 md:py-16 lg:px-14 lg:py-20">
          <span className="heading-eyebrow flex items-center gap-3">
            <span aria-hidden className="inline-block h-px w-6 bg-amber-300" />
            Featured case study
          </span>

          <h2
            id="featured-case-study-heading"
            className="mt-5 font-display text-balance text-3xl font-extrabold leading-[1.05] tracking-tight text-bone-100 md:text-4xl lg:text-5xl"
          >
            {project.title}
          </h2>

          <p className="mt-5 text-pretty text-base text-graphite-200 md:text-lg">
            {project.summary}
          </p>



          <Link
            href={`/projects/${project.slug}`}
            className="group mt-10 inline-flex items-center gap-2 self-start border border-bone-100/20 bg-graphite-950/40 px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] text-bone-100 transition-colors hover:border-amber-300/60 hover:text-amber-300"
          >
            Read full case study
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
