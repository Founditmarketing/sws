import {
  PARISH_VIEWBOX,
  parishPaths,
  parishHq,
  highlightedParishes,
} from "@/lib/parish-map-data";

// Inline parish map for the "Why Central Louisiana" editorial page.
// Reuses the d3-geo / us-atlas pipeline from coverage-map but renders at the
// parish level so the eight parishes we self-perform in are individually
// readable. Smaller than the homepage map; styled to match the brand tokens.

export function ParishMap() {
  return (
    <figure className="not-prose mx-auto my-12 flex max-w-3xl flex-col gap-4 md:my-16">
      <div className="relative aspect-[720/480] w-full overflow-hidden border border-bone-100/10 bg-graphite-950">
        <div aria-hidden className="absolute inset-0 grid-noise opacity-[0.04]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(120% 80% at 50% 60%, transparent 50%, rgba(0,0,0,0.5) 100%)",
          }}
        />

        <svg
          viewBox={PARISH_VIEWBOX}
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="Map of Central Louisiana parishes where Sitework Specialist self-performs work: Rapides (HQ), Grant, Avoyelles, Natchitoches, Vernon, La Salle, Catahoula, and Concordia."
        >
          <defs>
            <linearGradient id="parish-highlight" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#FFB238" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#FFB238" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="parish-hq" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#FFB238" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFB238" stopOpacity="0.18" />
            </linearGradient>
          </defs>

          {/* Background: all Louisiana parishes, recessed */}
          <g aria-hidden>
            {parishPaths
              .filter((p) => !p.highlighted)
              .map((p) => (
                <path
                  key={p.fips}
                  d={p.d}
                  fill="#0d0d0f"
                  stroke="#1f242b"
                  strokeWidth="0.5"
                  strokeLinejoin="round"
                />
              ))}
          </g>

          {/* Highlighted parishes */}
          <g>
            {parishPaths
              .filter((p) => p.highlighted)
              .map((p) => (
                <path
                  key={p.fips}
                  d={p.d}
                  fill={p.isHq ? "url(#parish-hq)" : "url(#parish-highlight)"}
                  stroke="#FFB238"
                  strokeOpacity={p.isHq ? 0.9 : 0.55}
                  strokeWidth={p.isHq ? "1" : "0.7"}
                  strokeLinejoin="round"
                />
              ))}
          </g>

          {/* Parish labels — HQ parish gets a "★ RAPIDES" stack so the marker
              dot doesn't have to fight a separate leader callout against
              neighboring parish labels. Non-HQ parishes get the bare name. */}
          <g>
            {parishPaths
              .filter((p) => p.highlighted && p.centroid)
              .map((p) => {
                // Nudge specific parishes whose centroids would otherwise
                // collide with each other or with the HQ dot. d3-geo's
                // path.centroid is the area centroid; we hand-tune a few
                // edge cases instead of writing a generic collision solver.
                let dx = 0;
                let dy = 0;
                if (p.fips === "22079") dy = -16; // Rapides — clear HQ dot
                if (p.fips === "22115") dx = -4; // Vernon
                if (p.fips === "22069") {
                  // Natchitoches — large parish; push label west of centroid
                  dx = -16;
                }
                if (p.fips === "22059") {
                  // La Salle — narrow N-S parish; pull label down
                  dx = 6;
                  dy = 10;
                }
                if (p.fips === "22025") {
                  // Catahoula — shift down + right to avoid La Salle stack
                  dx = 8;
                  dy = -2;
                }
                if (p.fips === "22043") dy = -2; // Grant — small lift
                if (p.fips === "22029") dy = 4; // Concordia — drop slightly
                return (
                  <text
                    key={`label-${p.fips}`}
                    x={p.centroid!.x + dx}
                    y={p.centroid!.y + dy}
                    fontFamily="var(--font-mono)"
                    fontSize="10"
                    letterSpacing="1.4"
                    fontWeight={p.isHq ? 600 : 400}
                    fill={p.isHq ? "#FFB238" : "#d6cdb8"}
                    textAnchor="middle"
                    style={{ textTransform: "uppercase" }}
                  >
                    {p.name}
                  </text>
                );
              })}
          </g>

          {/* HQ marker on Alexandria — dot only; the Rapides label nearby
              already names the location, and a leader callout collided with
              the Avoyelles centroid label. */}
          {parishHq ? (
            <g>
              <circle
                cx={parishHq.x}
                cy={parishHq.y}
                r="6"
                fill="#FFB238"
                fillOpacity="0.18"
              />
              <circle
                cx={parishHq.x}
                cy={parishHq.y}
                r="3.2"
                fill="#FFB238"
                stroke="#0a0a0a"
                strokeWidth="1.2"
              />
            </g>
          ) : null}
        </svg>

        <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-graphite-300">
          <span className="inline-block h-px w-3 bg-amber-300" />
          Self-perform parishes
        </div>
      </div>

      <figcaption className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite-400">
        <span>
          {highlightedParishes.length} parishes &middot; Central Louisiana
        </span>
        <span className="text-graphite-300">Map: us-atlas counties-10m</span>
      </figcaption>
    </figure>
  );
}
