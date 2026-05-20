import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { SectionHeader } from "@/components/brand/section-header";
import {
  VIEWBOX,
  louisianaPath,
  neighborPaths,
  radiusPath,
  mapPoints,
  type MapPoint,
} from "@/lib/coverage-map-data";

const HQ_DOT_R = 6;
const YARD_DOT_R = 3.2;
const MARKET_DOT_R = 2.6;

// Round 5 audit fix #2: "Recently mobilized" rail content. Placeholder
// values pending Joe's confirmation — every entry is marked
// [VERIFY-WITH-JOE] in the section comment. Update at the end of each
// month so the `when` labels stay honest.
const RECENTLY_MOBILIZED: { label: string; when: string }[] = [
  { label: "Avoyelles Parish", when: "2 weeks ago" },
  { label: "Concordia Parish", when: "This month" },
  { label: "La Salle Parish", when: "April" },
];

export function CoverageMap() {
  const hq = mapPoints.find((p) => p.kind === "hq");
  const yards = mapPoints.filter((p) => p.kind === "yard");
  const markets = mapPoints.filter((p) => p.kind === "market");

  if (!hq) {
    return (
      <section
        aria-labelledby="coverage-heading"
        className="relative border-b border-bone-100/10 bg-graphite-900 py-24 md:py-32"
      >
        <div className="container-page">
          <p id="coverage-heading" className="text-sm text-graphite-300">
            Coverage map is unavailable.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="coverage-heading"
      className="relative border-b border-bone-100/10 bg-graphite-900 py-24 md:py-32"
    >
      <div className="container-page">
        <div className="grid items-start gap-12 lg:grid-cols-[5fr_7fr] lg:items-center">
          <div className="max-w-md">
            <SectionHeader
              eyebrow="Coverage"
              title="Central Louisiana, with reach."
              description={`Headquartered in Alexandria with yards in Pineville, Jonesville, and Natchez. We work within a ${siteConfig.stats.coverageRadiusMiles}-mile radius of Central Louisiana - and farther for the right project.`}
              className="max-w-md"
            />

            {/* Round 5 audit fix #2: "Recently mobilized" mini-list.
                Mobilization entries below are placeholder values pending
                Joe's confirmation: [VERIFY-WITH-JOE]. */}
            <div className="mt-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300">
                Recently mobilized
              </span>
              <ul className="mt-3 flex flex-col gap-px overflow-hidden border border-bone-100/10 bg-bone-100/10">
                {RECENTLY_MOBILIZED.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-baseline justify-between gap-3 bg-graphite-950 px-3 py-2.5"
                  >
                    <span className="font-display text-sm font-semibold text-bone-100">
                      {item.label}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite-300">
                      {item.when}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[800/720] w-full overflow-hidden border border-bone-100/10 bg-graphite-950">
              <div aria-hidden className="absolute inset-0 grid-noise opacity-[0.05]" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(120% 80% at 50% 60%, transparent 50%, rgba(0,0,0,0.55) 100%)",
                }}
              />

              <svg
                viewBox={VIEWBOX}
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label={`Louisiana coverage map showing Sitework Specialist headquarters in Alexandria with a ${siteConfig.stats.coverageRadiusMiles}-mile service radius and three additional yards in Pineville, Jonesville, and Natchez.`}
              >
                <defs>
                  <radialGradient id="radius-fill" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFB238" stopOpacity="0.18" />
                    <stop offset="60%" stopColor="#FFB238" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#FFB238" stopOpacity="0.02" />
                  </radialGradient>
                  <linearGradient id="la-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#1a1a1a" />
                    <stop offset="100%" stopColor="#141414" />
                  </linearGradient>
                  <filter
                    id="hq-glow"
                    x="-200%"
                    y="-200%"
                    width="500%"
                    height="500%"
                  >
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Neighboring states - darker, recessed */}
                <g aria-hidden>
                  {neighborPaths.map((n) => (
                    <path
                      key={n.id}
                      d={n.d}
                      fill="#0d0d0f"
                      stroke="#1f242b"
                      strokeWidth="0.75"
                      strokeLinejoin="round"
                    />
                  ))}
                </g>

                {/* Louisiana */}
                <path
                  d={louisianaPath}
                  fill="url(#la-fill)"
                  stroke="#3a3a3a"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />

                {/* 200-mile geodesic radius */}
                <path
                  d={radiusPath}
                  fill="url(#radius-fill)"
                  stroke="#FFB238"
                  strokeOpacity="0.55"
                  strokeWidth="1"
                />

                {/* Subtle inner stroke on Louisiana for depth */}
                <path
                  d={louisianaPath}
                  fill="none"
                  stroke="#FFB238"
                  strokeOpacity="0.15"
                  strokeWidth="0.5"
                />

                {/* Regional market dots */}
                <g>
                  {markets.map((m) => (
                    <MarketPoint key={m.key} point={m} />
                  ))}
                </g>

                {/* Yard dots */}
                <g>
                  {yards.map((y) => (
                    <YardPoint key={y.key} point={y} />
                  ))}
                </g>

                {/* HQ - pulsing */}
                <g>
                  <circle
                    cx={hq.x}
                    cy={hq.y}
                    fill="none"
                    stroke="#FFB238"
                    strokeWidth="1.2"
                    className="coverage-pulse"
                  />
                  <circle
                    cx={hq.x}
                    cy={hq.y}
                    r={HQ_DOT_R + 4}
                    fill="#FFB238"
                    fillOpacity="0.18"
                    filter="url(#hq-glow)"
                  />
                  <circle
                    cx={hq.x}
                    cy={hq.y}
                    r={HQ_DOT_R}
                    fill="#FFB238"
                    stroke="#0a0a0a"
                    strokeWidth="1.5"
                  />
                  {/* Leader line + label placed below the dot. The pulsing ring
                      expands to r=22 so the previous right-side label was being
                      clipped by the animation. */}
                  <line
                    x1={hq.x}
                    y1={hq.y + HQ_DOT_R + 2}
                    x2={hq.x}
                    y2={hq.y + HQ_DOT_R + 14}
                    stroke="#FFB238"
                    strokeOpacity="0.7"
                    strokeWidth="1"
                  />
                  <text
                    x={hq.x}
                    y={hq.y + HQ_DOT_R + 28}
                    fontFamily="var(--font-mono)"
                    fontSize="11"
                    letterSpacing="2"
                    fill="#FFB238"
                    textAnchor="middle"
                    style={{ textTransform: "uppercase" }}
                  >
                    ALEXANDRIA HQ
                  </text>
                </g>

                {/* Compass / scale - bottom-right */}
                <g transform="translate(680 660)" aria-hidden>
                  <line
                    x1="0"
                    y1="0"
                    x2="80"
                    y2="0"
                    stroke="#3a3a3a"
                    strokeWidth="1"
                  />
                  <line x1="0" y1="-4" x2="0" y2="4" stroke="#3a3a3a" strokeWidth="1" />
                  <line x1="80" y1="-4" x2="80" y2="4" stroke="#3a3a3a" strokeWidth="1" />
                  <text
                    x="40"
                    y="-8"
                    fontFamily="var(--font-mono)"
                    fontSize="9"
                    letterSpacing="2"
                    fill="#6a6a6a"
                    textAnchor="middle"
                  >
                    100 MI
                  </text>
                </g>
              </svg>

              {/* Corner overlays - eyebrows */}
              <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite-300">
                <span className="inline-block h-px w-4 bg-amber-300" />
                Service area
              </div>
              <div className="pointer-events-none absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite-300">
                {siteConfig.stats.coverageRadiusMiles} mi radius
              </div>
            </div>


            <Link
              href="/why-central-louisiana"
              className="group mt-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300 transition-colors hover:text-amber-200"
            >
              Why we work where we work
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}

function YardPoint({ point }: { point: MapPoint }) {
  return (
    <g className="coverage-point group">
      <circle
        cx={point.x}
        cy={point.y}
        r={YARD_DOT_R + 6}
        fill="transparent"
      />
      <circle
        cx={point.x}
        cy={point.y}
        r={YARD_DOT_R}
        fill="#FFB238"
        stroke="#0a0a0a"
        strokeWidth="1.2"
      />
      <text
        x={point.x + 8}
        y={point.y + 1}
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="1.6"
        fill="#d6cdb8"
        style={{ textTransform: "uppercase" }}
      >
        {point.name}
      </text>
    </g>
  );
}

function MarketPoint({ point }: { point: MapPoint }) {
  return (
    <g>
      <circle
        cx={point.x}
        cy={point.y}
        r={MARKET_DOT_R}
        fill="#4a4a4a"
      />
      <text
        x={point.x + 7}
        y={point.y + 1}
        fontFamily="var(--font-mono)"
        fontSize="8.5"
        letterSpacing="1.6"
        fill="#6a6a6a"
        style={{ textTransform: "uppercase" }}
      >
        {point.name}
      </text>
    </g>
  );
}
