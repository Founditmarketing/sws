"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { fleet, type FleetCategory } from "@/lib/content/fleet";
import { fleetCategoryHeroSrc } from "@/lib/homepage-images";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { SectionHeader } from "@/components/brand/section-header";

type FleetCategoryGroup = {
  title: FleetCategory["title"];
  image: string;
  imageAlt: string;
  count: number;
  description: string;
};

const categoryImages: Record<FleetCategory["title"], { src: string; alt: string }> = {
  Dozers: {
    src: fleetCategoryHeroSrc.Dozers,
    alt: "Caterpillar D8T dozer pushing material on a graded jobsite",
  },
  Excavators: {
    src: fleetCategoryHeroSrc.Excavators,
    alt: "Large hydraulic excavator working a deep cut",
  },
  Graders: {
    src: fleetCategoryHeroSrc.Graders,
    alt: "Motor grader finishing a long subgrade pass",
  },
  "Articulated Trucks": {
    src: fleetCategoryHeroSrc["Articulated Trucks"],
    alt: "Articulated haul truck offloading material at a stockpile",
  },
  Tractors: {
    src: fleetCategoryHeroSrc.Tractors,
    alt: "Heavy tractor equipped with scrapers and pans",
  },
  Compaction: {
    src: fleetCategoryHeroSrc.Compaction,
    alt: "Smooth-drum and padfoot compactors on a building pad",
  },
  Support: {
    src: fleetCategoryHeroSrc.Support,
    alt: "Skid steer, mini-excavator and water truck staged on site",
  },
};

function buildGroups(): FleetCategoryGroup[] {
  return fleet.map((cat) => {
    const meta = categoryImages[cat.title];
    return {
      title: cat.title,
      image: meta.src,
      imageAlt: meta.alt,
      count: cat.count,
      description: cat.description,
    };
  });
}

export function FleetSnapshot() {
  const groups = buildGroups();
  const scrollRef = useRef<HTMLUListElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function handleScroll() {
      const node = scrollRef.current;
      if (!node) return;
      const max = node.scrollWidth - node.clientWidth;
      const ratio = max > 0 ? node.scrollLeft / max : 0;
      setProgress(Math.min(1, Math.max(0, ratio)));
      if (node.scrollLeft > 8) {
        setHasInteracted(true);
      }
    }

    handleScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      aria-labelledby="fleet-heading"
      className="relative border-b border-bone-100/10 bg-graphite-900 py-24 md:py-32"
    >
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Fleet"
            title="Owned iron, badged operators."
            description="A self-owned spread of dozers, excavators, scrapers, and support iron. We don't sub the production work."
          />
          {/* Round 5 audit fix #2: spec callout at lg+ — display-font numbers
              above mono caps labels. Below lg the section head reverts to its
              prior layout (full-width header + arrow link). */}
          <div className="hidden lg:block lg:w-[20rem] lg:flex-none lg:self-start lg:pt-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300">
              Spec at a glance
            </span>
            <dl className="mt-4 grid grid-cols-3 gap-px overflow-hidden border border-bone-100/10 bg-bone-100/10">
              <div className="flex flex-col gap-1 bg-graphite-900 px-3 py-3">
                <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-graphite-300">
                  Self-owned
                </dt>
                <dd className="font-display text-2xl font-extrabold leading-none tabular-nums text-bone-100">
                  <AnimatedNumber value={67} />
                </dd>
              </div>
              <div className="flex flex-col gap-1 bg-graphite-900 px-3 py-3">
                <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-graphite-300">
                  Yards
                </dt>
                <dd className="font-display text-2xl font-extrabold leading-none tabular-nums text-bone-100">
                  <AnimatedNumber value={4} />M
                </dd>
              </div>
              <div className="flex flex-col gap-1 bg-graphite-900 px-3 py-3">
                <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-graphite-300">
                  GPS-eq.
                </dt>
                <dd className="font-display text-2xl font-extrabold leading-none tabular-nums text-bone-100">
                  <AnimatedNumber value={12} />
                </dd>
              </div>
            </dl>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite-300">
              Featuring heavy tractors with scrapers &amp; pans
            </p>
            <Link
              href="/fleet"
              className="group mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300"
            >
              Full fleet list
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <Link
            href="/fleet"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-amber-300 lg:hidden"
          >
            Full fleet list
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div className="relative mt-14 md:mt-16">
        <ul
          ref={scrollRef}
          className="fleet-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 md:gap-6"
          style={{
            paddingLeft: "max(1.25rem, calc((100vw - 80rem) / 2 + 2rem))",
            paddingRight: "max(1.25rem, calc((100vw - 80rem) / 2 + 2rem))",
          }}
        >
          {groups.map((g, i) => (
            <li
              key={g.title}
              className="fleet-snap relative flex-none"
              style={{
                width: "min(80vw, 360px)",
              }}
            >
              <FleetCard group={g} index={i} />
            </li>
          ))}
        </ul>

        <div className="container-page mt-2 flex items-center justify-between gap-6">
          <div
            className="relative h-px flex-1 overflow-hidden bg-bone-100/10"
            aria-hidden
          >
            <div
              className="absolute left-0 top-0 h-px bg-amber-300 transition-[width] duration-150 ease-out"
              style={{ width: `${Math.max(8, progress * 100)}%` }}
            />
          </div>
          <span
            className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite-300 transition-opacity duration-500 ${
              hasInteracted ? "opacity-0" : "opacity-100"
            }`}
            aria-hidden={hasInteracted}
          >
            Drag
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </section>
  );
}

function FleetCard({ group, index }: { group: FleetCategoryGroup; index: number }) {
  return (
    <article
      className="group relative flex aspect-[4/5] w-full flex-col overflow-hidden border border-bone-100/10 bg-graphite-950 transition-[transform,border-color] duration-500 ease-out md:hover:scale-[1.03] md:hover:border-amber-300/40"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={group.image}
          alt={group.imageAlt}
          fill
          sizes="(min-width: 768px) 32vw, 80vw"
          className={`transition-transform duration-700 ease-out md:group-hover:scale-105 ${
            group.title === "Excavators" ? "object-cover object-left" : "object-cover object-center"
          }`}
          priority={index === 0}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/40 to-graphite-950/10"
        />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between p-5 md:p-6">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 border border-bone-100/20 bg-graphite-950/60 px-2 py-1 backdrop-blur-sm">
            <span className="h-1 w-1 bg-amber-300" aria-hidden />
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-amber-300">
              0{index + 1} / 06
            </span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite-300">
            x{group.count}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-3xl font-extrabold leading-[0.95] tracking-tight text-bone-100 md:text-4xl">
            {group.title}
          </h3>

          <p className="border-t border-bone-100/15 pt-3 font-mono text-[11px] uppercase tracking-[0.16em] leading-relaxed text-graphite-300">
            {group.description}
          </p>
        </div>
      </div>
    </article>
  );
}
