import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { CtaButton } from "@/components/brand/cta-button";
import { PageHero } from "@/components/sections/page-hero";
import { ParishMap } from "@/components/sections/parish-map";

// "Field notes" — a long-form, defensible POV in Joe Burns's voice.
//
// Source notes (web-verified 2026-05-10) — all figures kept as-published:
//   - Catahoula Formation: late Oligocene–early Miocene, gray-to-white sandstones,
//     loose quartz sand, tuffaceous sandstone, volcanic ash, brown sandy clays.
//     Surface coverage is patchy: ~5% of Grant Parish, ~0.1% of Rapides Parish,
//     named for Catahoula Parish itself (USGS / Louisiana Geological Survey).
//   - Rapides Parish surface geology (USGS sgmc): 28% Holocene alluvium,
//     26% Pleistocene High Terraces, 15% Natural Levees, 11% Prairie Terraces,
//     9% Intermediate Terraces. The dominant story across our self-perform
//     footprint is Pleistocene clays / terrace gravels with Red River alluvium
//     in the bottoms — Catahoula is one named outcrop, not the whole picture.
//   - NOAA monthly precipitation normals (1991–2020) for Alexandria, LA:
//     Jan 6.13, Feb 5.13, Mar 5.18, Apr 5.44, May 4.58, Jun 5.29, Jul 4.55,
//     Aug 4.30, Sep 3.98, Oct 4.89, Nov 5.45, Dec 5.98 in. Annual ~60.9".
//   - Atlantic hurricane season: June 1 – November 30 (NOAA). Peak Aug–Oct,
//     mid-September the statistical peak.
//   - CPKC: Canadian Pacific + Kansas City Southern merger completed
//     April 14, 2023. KCS Alexandria Subdivision now operates under CPKC.
//   - Union Pacific operates the Alexandria (UP) Subdivision (75.7 mi
//     single-track) and a yard in Alexandria.
//   - Red River Waterway (J. Bennett Johnston): commercially navigable
//     236 miles from the Mississippi to Shreveport, 9' min depth, 200' min
//     width. Central Louisiana Regional Port at mile 90, ~4 mi NW of
//     downtown Alexandria, with rail-served terminals.
//   - Burn permitting: Louisiana Dept. of Agriculture & Forestry (LDAF),
//     non-certified prescribed burn requires 24–72 hour advance notification
//     to Office of Forestry. State Fire Marshal can issue burn bans;
//     parishes can layer their own.
//
// [VERIFY-WITH-JOE] flagged below for figures that were inferred from public
// data rather than measured by us.

export const metadata: Metadata = buildMetadata({
  title: "Why we work where we work — Central Louisiana site work",
  description:
    "Central Louisiana site work, from a contractor who lives here. The ground, the calendar, the logistics, and the failure modes that out-of-state crews learn the hard way.",
  path: "/why-central-louisiana",
});

// Verified NOAA 1991–2020 monthly precipitation normals (Alexandria, LA).
// "Likely lost workdays" is a contractor-side rule of thumb: days with
// >0.25" rain plus 1–2 follow-up dry-out days, expressed as a range.
// [VERIFY-WITH-JOE] The lost-day ranges are inferred from the rainfall
// climatology, not from our project diaries; Joe should overlay our actual
// production logs before this is treated as authoritative.
const RAINFALL_TABLE: Array<{
  month: string;
  inches: number;
  lostDays: string;
  note?: string;
}> = [
  { month: "Jan", inches: 6.13, lostDays: "7–9", note: "Wettest month on record" },
  { month: "Feb", inches: 5.13, lostDays: "6–8" },
  { month: "Mar", inches: 5.18, lostDays: "6–8" },
  { month: "Apr", inches: 5.44, lostDays: "6–8", note: "Profile still saturated" },
  { month: "May", inches: 4.58, lostDays: "5–7" },
  { month: "Jun", inches: 5.29, lostDays: "5–7", note: "Hurricane season opens 6/1" },
  { month: "Jul", inches: 4.55, lostDays: "4–6" },
  { month: "Aug", inches: 4.30, lostDays: "4–6", note: "Tropics ramp" },
  { month: "Sep", inches: 3.98, lostDays: "3–5", note: "Peak storm risk" },
  { month: "Oct", inches: 4.89, lostDays: "4–6" },
  { month: "Nov", inches: 5.45, lostDays: "6–8", note: "Season closes 11/30" },
  { month: "Dec", inches: 5.98, lostDays: "6–8" },
];

const ANNUAL_INCHES = RAINFALL_TABLE.reduce((s, m) => s + m.inches, 0);

const FAILURE_MODES = [
  {
    label: "01",
    title: "Compacting Catahoula clay above optimum moisture.",
    body: "The standard Proctor curve says one thing; the Catahoula and the Pleistocene Prairie clays it shares the uplands with say another. Bring a roller in two points wet of optimum and you don't get density — you get a pumping subgrade and a fine pattern of laminated cracks the day the sun comes out. We stop, we let it bleed off, we re-test. Crews running a Houston schedule on a Louisiana profile will take the failed proof roll personally; we take it for granted.",
  },
  {
    label: "02",
    title: "Mass earthwork in April and May.",
    body: "On paper, May looks like a relief month — 4.6 inches versus 6+ in winter. On the ground, the soil profile is still draining out four months of accumulated rain, and a single 2-inch event lays everything down. We sequence mass earthwork into the late-summer window, even when the bid schedule wants it earlier; the cost of one rebuild beats any savings from starting a month sooner.",
  },
  {
    label: "03",
    title: "Underestimating the burn-permit clock.",
    body: "Land clearing on a tight schedule has a quiet failure mode: the LDAF burn-notification window, the parish-level burn ban that goes up after a dry stretch, and the Office of State Fire Marshal order that supersedes both. We file early, we keep a non-burn clearing plan in the back pocket, and we don't promise an owner a date that depends on a permit no one has issued yet.",
  },
];

export default function WhyCentralLouisianaPage() {
  return (
    <>
      <PageHero
        eyebrow="Field notes"
        title="Why we only work where we work."
        description="Central Louisiana site work, from a contractor who lives in it. Eight parishes, one set of soils, one calendar, and a list of mistakes we've watched out-of-state crews make."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Why Central Louisiana" },
        ]}
      />

      <article className="border-b border-bone-100/10 bg-graphite-950 py-16 md:py-24">
        <div className="container-page">
          {/* Lead — wider line length than the standard sections, set on the
              prose container. We don't import a typography plugin; we lean on
              brand tokens and explicit class composition for tight control. */}
          <div className="mx-auto max-w-[68ch] text-pretty text-[1.0625rem] leading-[1.75] text-graphite-200 md:text-[1.125rem]">
            <p className="font-display text-2xl font-bold leading-snug text-bone-100 md:text-3xl">
              The shortest argument for hiring local: Central Louisiana isn't
              one job site. It's eight parishes, three soil systems, and a
              calendar that punishes anyone who treats it like Houston with
              more humidity.
            </p>

            <p className="mt-8">
              We've watched out-of-state crews mobilize into Alexandria,
              Pineville, Natchitoches, and the parishes east of the Red River
              for fifteen years. The ones who do well slow down and learn
              what the dirt is doing. The ones who slip schedule do the
              opposite — they bring a curve from another climate, run it on
              our profile, and pay the difference in re-work. This page is
              what we wish we could hand them on day one.
            </p>

            <p className="mt-6">
              We work in Rapides, Grant, Avoyelles, Natchitoches, Vernon,
              La Salle, Catahoula, and Concordia parishes. Eight names, one
              region, and a set of conditions that are specific enough to
              matter.
            </p>
          </div>

          <ParishMap />

          {/* Section: The ground here */}
          <section
            aria-labelledby="ground-heading"
            className="mx-auto mt-16 max-w-[68ch] md:mt-24"
          >
            <SectionEyebrow>Section 01 &mdash; The ground here</SectionEyebrow>
            <h2
              id="ground-heading"
              className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-bone-100 md:text-4xl"
            >
              The dirt isn't one thing. It's a stack.
            </h2>

            <div className="mt-8 space-y-6 text-pretty text-[1.0625rem] leading-[1.75] text-graphite-200 md:text-[1.125rem]">
              <p>
                The geology textbook for our footprint is short. Along the
                Red River bottoms, we sit on Holocene alluvium &mdash; reddish
                silty clay and silt, soft when it's wet, stiff when it isn't,
                and saturated for most of the year. Step up onto the
                terraces and the section turns Pleistocene: tan and orange
                Prairie and High Terrace clays with basal gravels, the kind
                of stiff red clay that fooled half of north Louisiana into
                thinking subgrades take care of themselves. They don't. The
                reds shrink and swell with moisture, and basal gravel lenses
                show up where you didn't draw them on the cross-section.
              </p>

              <p>
                Climb a little farther and you hit the Tertiary uplands. The
                Catahoula Formation &mdash; the late Oligocene unit named for
                Catahoula Parish itself &mdash; is the one out-of-state crews
                hear about and get nervous about. It's the gray-to-white
                sandstone, loose quartz sand, tuffaceous sandstone with
                volcanic ash, and brown sandy clay you'll cut into in
                northern Rapides and Grant. It's joined in the section by
                the Fleming members &mdash; Carnahan Bayou, Williamson Creek,
                Dough Hills &mdash; clay-and-siltstone units that share its
                bad habits when it rains.
              </p>

              <PullQuote>
                A Proctor curve is a starting point on this ground, not an
                answer. We don't compact a Catahoula clay the way you'd
                compact a manufactured fill out of east Texas. We test, we
                bleed it, we test again.
              </PullQuote>

              <p>
                What does that translate to on a job? Optimum moisture is a
                narrow window here, and the penalty for being two points wet
                is not a soft spot &mdash; it's a pumping subgrade that you
                can't proof-roll out of. We run a moisture-density check on
                every lift on production work, not just the ones the spec
                says to. We over-excavate where the section flips from
                terrace clay to alluvial silt, because the boundary doesn't
                respect the boring log. And we keep a stockpile of select
                material on every job that's bigger than the one the
                estimator drew, because we've never regretted having it and
                we have regretted not having it.
              </p>
            </div>
          </section>

          {/* Section: The calendar here */}
          <section
            aria-labelledby="calendar-heading"
            className="mx-auto mt-20 max-w-[68ch] md:mt-28"
          >
            <SectionEyebrow>Section 02 &mdash; The calendar here</SectionEyebrow>
            <h2
              id="calendar-heading"
              className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-bone-100 md:text-4xl"
            >
              Sixty-one inches a year. We schedule against it.
            </h2>

            <div className="mt-8 space-y-6 text-pretty text-[1.0625rem] leading-[1.75] text-graphite-200 md:text-[1.125rem]">
              <p>
                Alexandria averages just under sixty-one inches of rain a
                year. That's spread across all twelve months, which is the
                first thing visitors miss &mdash; we don't have a dry season,
                we have a less-wet season. Hurricane season opens June 1 and
                runs through November 30; the statistical peak is the
                second week of September. Our July and August are drier
                than our December and January. That fact owns more
                schedules than anything else on this page.
              </p>
            </div>

            <RainfallTable />

            <div className="mt-8 space-y-6 text-pretty text-[1.0625rem] leading-[1.75] text-graphite-200 md:text-[1.125rem]">
              <p>
                The way we read this table: mass earthwork sequences into
                the back half of summer. Concrete and structural work
                straddles the shoulder months. Land clearing slots into the
                fall when the burn windows are most reliable and the
                Catahoula uplands are at their friendliest moisture. Winter
                is for haul roads, drainage, and the work that doesn't
                care whether the subgrade is six points wet of optimum.
              </p>

              <p>
                If a schedule was built three states away and asks us to
                turn dirt in February or run mass excavation in April, we
                say so at the bid table. We'd rather lose a week up front
                than lose two weeks on a re-pull.
              </p>
            </div>
          </section>

          {/* Section: The logistics here */}
          <section
            aria-labelledby="logistics-heading"
            className="mx-auto mt-20 max-w-[68ch] md:mt-28"
          >
            <SectionEyebrow>Section 03 &mdash; The logistics here</SectionEyebrow>
            <h2
              id="logistics-heading"
              className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-bone-100 md:text-4xl"
            >
              Two Class-1 railroads and a navigable river.
            </h2>

            <div className="mt-8 space-y-6 text-pretty text-[1.0625rem] leading-[1.75] text-graphite-200 md:text-[1.125rem]">
              <p>
                Alexandria sits on the Union Pacific Alexandria Subdivision
                and on the former Kansas City Southern line that became
                CPKC after the Canadian Pacific&ndash;KCS merger closed on
                April 14, 2023. UP runs a yard in town and serves the
                Central Louisiana Regional Port. CPKC runs north-south
                through Rapides toward Shreveport and the Gulf. Two Class-1
                connections is not the standard hand for a market this
                size, and on the right job it's the difference between a
                staging plan that works and one that lives on trucks.
              </p>

              <p>
                Then the river. The J. Bennett Johnston Waterway &mdash; the
                Red River Waterway, in the way it actually gets called &mdash;
                is a commercially navigable channel from the Mississippi to
                Shreveport, 9 feet of depth and 200 feet of width minimum,
                with five Corps locks. The Central Louisiana Regional Port
                at mile 90, four miles northwest of downtown Alexandria,
                runs barge, dock, rail, and warehousing on roughly 200
                acres. For an industrial pad of any meaningful size,
                staging select material by barge into the port and railing
                or hauling to the work is a sequencing option a Houston
                outfit doesn't typically have on the table.
              </p>

              <PullQuote>
                Knowing what arrives by barge versus what arrives by truck
                changes the bid &mdash; not by a percent, by a meaningful
                fraction of a percent on a job big enough to matter.
              </PullQuote>
            </div>
          </section>

          {/* Section: The crews here */}
          <section
            aria-labelledby="crews-heading"
            className="mx-auto mt-20 max-w-[68ch] md:mt-28"
          >
            <SectionEyebrow>Section 04 &mdash; The crews here</SectionEyebrow>
            <h2
              id="crews-heading"
              className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-bone-100 md:text-4xl"
            >
              Operators who can read a profile transition by feel.
            </h2>

            <div className="mt-8 space-y-6 text-pretty text-[1.0625rem] leading-[1.75] text-graphite-200 md:text-[1.125rem]">
              <p>
                The labor pool here is small and old. Most of our senior
                operators have fifteen to twenty-five years on this dirt,
                and a handful have spent every single one of those years
                inside our service radius. That isn't an HR talking point;
                it's the reason a foreman can call out a clay-to-sand
                transition through the cab glass before the survey rod
                catches up. It's why a dozer hand can tell you a section
                is going to pump before the moisture reading does.
              </p>

              <p>
                Out-of-state crews ship in with that knowledge at zero, and
                they buy it back the hard way over the first month on the
                ground. Our crews bring it on day one. We pay for that;
                you do too. It is the single best line on the schedule.
              </p>
            </div>
          </section>

          {/* Section: What the visitors get wrong */}
          <section
            aria-labelledby="failure-heading"
            className="mx-auto mt-20 max-w-[68ch] md:mt-28"
          >
            <SectionEyebrow>Section 05 &mdash; What the visitors get wrong</SectionEyebrow>
            <h2
              id="failure-heading"
              className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-bone-100 md:text-4xl"
            >
              Three failure modes we see on repeat.
            </h2>

            <p className="mt-6 text-[0.95rem] leading-relaxed text-graphite-300">
              We don't name names. We don't have to. Every Central
              Louisiana superintendent who's worked alongside an out-of-region
              site contractor has watched at least one of these three play out.
            </p>

            <ol className="mt-10 flex flex-col gap-px overflow-hidden border border-bone-100/10 bg-bone-100/10">
              {FAILURE_MODES.map((f) => (
                <li
                  key={f.label}
                  className="flex flex-col gap-4 bg-graphite-950 p-6 md:flex-row md:gap-8 md:p-8"
                >
                  <span className="font-mono text-sm font-bold tracking-[0.2em] text-amber-300 md:w-12 md:flex-none">
                    {f.label}
                  </span>
                  <div className="flex-1 space-y-3">
                    <h3 className="font-display text-xl font-bold leading-snug text-bone-100 md:text-2xl">
                      {f.title}
                    </h3>
                    <p className="text-pretty text-[0.95rem] leading-relaxed text-graphite-200 md:text-base">
                      {f.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Closing aside */}
          <section
            aria-label="Author note"
            className="mx-auto mt-20 max-w-[68ch] border-t border-bone-100/10 pt-10 md:mt-28"
          >
            <p className="text-pretty text-[0.95rem] leading-relaxed text-graphite-300">
              We don't write a manifesto for the page-view count. We write
              one because the bid list is shorter than it should be in this
              region, and the cost of an out-of-region pick is paid in the
              schedule and the quality of the pad. If you've got a project
              between Natchitoches and the Mississippi, we should be on the
              list.
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-amber-300">
              &mdash; Joe Burns, Founder
            </p>
          </section>
        </div>
      </article>

      {/* Closing CTA band */}
      <section
        aria-labelledby="cta-heading"
        className="relative isolate overflow-hidden border-b border-bone-100/10 bg-graphite-950 py-20 md:py-28"
      >
        <div aria-hidden className="absolute inset-0 -z-10 grid-noise opacity-[0.05]" />
        <div className="container-page">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <span className="heading-eyebrow inline-flex items-center gap-3">
              <span className="inline-block h-px w-6 bg-amber-300" aria-hidden />
              On the bid list
            </span>
            <h2
              id="cta-heading"
              className="font-display text-balance text-3xl font-extrabold leading-[1.05] tracking-tight text-bone-100 md:text-5xl"
            >
              If your project is in Central Louisiana, we should be on the
              bid list.
            </h2>
            <p className="text-pretty text-graphite-300 md:text-lg">
              Send us the plans. We&apos;ll have a number and a sequencing
              recommendation on your desk inside {siteConfig.responseSlaHours}{" "}
              hours.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              <CtaButton href="/rfq" variant="primary" size="lg">
                Request a quote
              </CtaButton>
              <CtaButton
                href="/projects"
                variant="ghost"
                size="lg"
                showArrow={false}
              >
                See projects
              </CtaButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ----- Inline primitives -----------------------------------------------------

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300">
      <span className="inline-block h-px w-6 bg-amber-300" aria-hidden />
      {children}
    </span>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 border-l-2 border-amber-300 pl-6 font-display text-xl font-semibold leading-snug text-bone-100 md:text-2xl md:leading-snug">
      <span aria-hidden className="mr-1 text-amber-300">&ldquo;</span>
      {children}
      <span aria-hidden className="ml-1 text-amber-300">&rdquo;</span>
    </blockquote>
  );
}

function RainfallTable() {
  return (
    <figure className="mt-10">
      <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-bone-100/10 pb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300">
          Average lost-to-weather working days by month &mdash; Alexandria area
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite-400 tabular-nums">
          NOAA 1991&ndash;2020 normals &middot; {ANNUAL_INCHES.toFixed(1)}&Prime; / yr
        </span>
      </figcaption>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-bone-100/15 font-mono text-[10px] uppercase tracking-[0.18em] text-graphite-300">
              <th scope="col" className="py-3 pr-4 font-medium">
                Month
              </th>
              <th
                scope="col"
                className="py-3 pr-4 text-right font-medium tabular-nums"
              >
                Rainfall (in)
              </th>
              <th
                scope="col"
                className="py-3 pr-4 text-right font-medium tabular-nums"
              >
                Likely lost days
              </th>
              <th scope="col" className="py-3 font-medium">
                Note
              </th>
            </tr>
          </thead>
          <tbody>
            {RAINFALL_TABLE.map((row) => {
              // Visual heat: percentage of the wettest month (~6.13 in).
              const intensity = Math.round((row.inches / 6.13) * 100);
              return (
                <tr
                  key={row.month}
                  className="border-b border-bone-100/5 last:border-b-0"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap py-3 pr-4 font-mono text-xs uppercase tracking-[0.18em] text-bone-100"
                  >
                    {row.month}
                  </th>
                  <td className="py-3 pr-4">
                    <div className="flex items-center justify-end gap-3">
                      <span className="tabular-nums text-bone-100">
                        {row.inches.toFixed(2)}
                      </span>
                      <span
                        aria-hidden
                        className="block h-1.5 w-16 bg-bone-100/10 sm:w-24"
                      >
                        <span
                          className="block h-full bg-amber-300"
                          style={{ width: `${intensity}%` }}
                        />
                      </span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-right font-mono text-xs tabular-nums text-graphite-200">
                    {row.lostDays}
                  </td>
                  <td className="py-3 text-xs text-graphite-300">
                    {row.note ?? <span aria-hidden>&mdash;</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-graphite-400">
        Rainfall: NOAA 1991&ndash;2020 monthly normals (Alexandria, LA).
        Lost-day ranges inferred from the precipitation record &mdash; we
        overlay them with our own production logs at preconstruction.
      </p>
    </figure>
  );
}
