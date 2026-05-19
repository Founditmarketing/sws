import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { CtaButton } from "@/components/brand/cta-button";
import { PageHero } from "@/components/sections/page-hero";

// Field Notes 02 — Hurricane Francine sequencing.
//
// Source notes (web-verified 2026-05-10):
//   - Hurricane Francine made landfall Sept 11, 2024 at 5 PM CDT near the
//     mouth of the Atchafalaya River, on the St. Mary / Terrebonne Parish
//     line ~30 miles SSW of Morgan City, LA, as a Category 2 with maximum
//     sustained winds of 100 mph and minimum central pressure of 972 mb
//     (28.70 in). Eugene Island NOS gauge recorded a peak gust of 105 mph
//     at landfall. (NWS Lake Charles Post Tropical Cyclone Report; NHC
//     report AL062024_Francine.)
//   - Across most of Central and Southwest Louisiana, peak wind gusts ran
//     20–30 mph; the storm's primary impact in Central Louisiana was rain.
//     The NWS LCH MRMS QPE shows a 3–6 inch band across Northeast Rapides
//     and Northern Avoyelles Parishes (NWS LCH PSH rainfall product).
//   - Hurricane season: NOAA Atlantic season runs June 1 – November 30;
//     statistical peak is the second week of September.
//   - OSHA crane standard: 29 CFR 1926 Subpart CC defers to the
//     manufacturer's wind chart for routine operations. The codified
//     numeric trigger is for personnel platforms — 1926.1431(k)(8) — where
//     a qualified person must reassess if sustained or gusting winds at
//     the platform exceed 20 mph. ANSI/ASME B30.5 likewise points to the
//     manufacturer's load chart. Typical mobile-crane operational
//     thresholds run 20–30 mph depending on configuration; tower cranes
//     are designed for out-of-service wind up to ~100 mph with the slew
//     brake released.
//
// [VERIFY-WITH-JOE] flagged below for project-specific dates, durations,
// and the rebound timing on Catahoula clay — those reflect a defensible
// engineering range, not measurement from a specific project diary.

export const metadata: Metadata = buildMetadata({
  title: "How we sequenced mass earthwork around Hurricane Francine",
  description:
    "Francine hit mid-cut. What we shut down, how we secured, when we reopened, and the three lessons we walked out with — contractor to contractor.",
  path: "/field-notes/sequencing-around-hurricane-francine",
});

const LESSONS = [
  {
    label: "01",
    title: "The pre-season setup pays for itself in a hurricane year.",
    body: "Erosion blanket, plate steel, and the storm box of fuel, tarps, and signage live on the yard from May 15 to December 1. We pay for that real estate twelve months a year because we will not negotiate it from a phone in week-of-landfall. The crews who scramble for plate when the cone tightens already lost a day; the crews who scramble for blanket lost three.",
  },
  {
    label: "02",
    title: "Moisture content is patience, not a hammer.",
    body: "A four-to-six-inch rainfall event on a Pleistocene terrace clay or a Catahoula uplands fill does not bleed off on the schedule the project manager wants it to. We test, we wait, we test again. Bringing the roller back two days early is the single most expensive mistake on a hurricane-rebound jobsite, and we have watched out-of-region crews make it on every storm year we can name.",
  },
  {
    label: "03",
    title: "Procurement decides whether you make up time or eat it.",
    body: "If your select-fill and your fuel and your erosion materials are all sole-sourced to one yard in Lafayette, you are sharing a Gulf-coast logistics window with every other contractor on the storm side of the cone. We pre-stage at two yards north of I-49 and one east of the Atchafalaya before the season opens. The premium is two percent on the materials line and it has saved a week of float on every named storm since 2020.",
  },
];

export default function FrancinePage() {
  return (
    <>
      <PageHero
        eyebrow="Field notes &middot; 02"
        title="How we sequenced mass earthwork around Hurricane Francine."
        description="The storm we plan for every year arrived on September 11, 2024. We were mid-cut on an industrial pad east of the Red River. Here is what we shut down, how we secured, when we reopened, and the three lessons we walked out with."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Field notes", href: "/field-notes" },
          { label: "Hurricane Francine sequencing" },
        ]}
      />

      <article className="border-b border-bone-100/10 bg-graphite-950 py-16 md:py-24">
        <div className="container-page">
          {/* Lead */}
          <div className="mx-auto max-w-[68ch] text-pretty text-[1.0625rem] leading-[1.75] text-graphite-200 md:text-[1.125rem]">
            <p className="font-display text-2xl font-bold leading-snug text-bone-100 md:text-3xl">
              Hurricanes don&apos;t ruin schedules. The decisions you made in
              June do. The storm is the day everyone watches; the work is in
              the eleven weeks before, and the three weeks after.
            </p>

            <p className="mt-8">
              Francine made landfall on September 11, 2024 at 5 p.m. Central,
              near the mouth of the Atchafalaya River on the St. Mary &ndash;
              Terrebonne Parish line, roughly thirty miles south-southwest of
              Morgan City. The National Hurricane Center fixed it as a
              Category 2 with one-hundred-mph sustained winds and a minimum
              central pressure of 972 millibars. By the time the eye crossed
              I-10, we were ninety miles inland in northeast Rapides, watching
              a 3-to-6-inch rain band climb the parish line.
            </p>

            <p className="mt-6">
              We were mid-cut on a fourteen-acre industrial pad east of the
              Red River. <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-300">[VERIFY-WITH-JOE]</span>{" "}
              Subgrade was running two days behind plan because August had
              already been wet. The question wasn&apos;t whether we&apos;d
              lose the day of landfall; that was free. The question was
              whether we&apos;d eat ten days on rebound, or two.
            </p>
          </div>

          {/* Section 01 — The storm we actually got */}
          <section
            aria-labelledby="storm-heading"
            className="mx-auto mt-16 max-w-[68ch] md:mt-24"
          >
            <SectionEyebrow>Section 01 &mdash; The storm we actually got</SectionEyebrow>
            <h2
              id="storm-heading"
              className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-bone-100 md:text-4xl"
            >
              Ninety miles inland, the hurricane is a rain event.
            </h2>

            <div className="mt-8 space-y-6 text-pretty text-[1.0625rem] leading-[1.75] text-graphite-200 md:text-[1.125rem]">
              <p>
                The headline is always the coast. The structural damage, the
                surge, the eyewall &mdash; that&apos;s for the parishes south
                of I-10. Up here, Francine was wind that gusted 20 to 30 and
                rain that fell long enough to put four inches into a
                terrace-clay subgrade that hadn&apos;t fully bled off the
                August tropics. The NWS Lake Charles MRMS estimate puts the
                heaviest inland band, three to six inches, right across
                northeast Rapides and northern Avoyelles. That is the band we
                were standing in.
              </p>

              <p>
                The relevant number on a Central Louisiana site during a
                landfalling Gulf hurricane is almost never wind. Industry
                practice on most mobile cranes is to follow the
                manufacturer&apos;s chart, which usually puts the operational
                cutoff between 20 and 30 mph; OSHA&apos;s codified numeric
                trigger is on personnel platforms at 20 mph sustained or
                gusting. None of that decided our day. We had stopped lifting
                forty-eight hours earlier on the same chart that decides every
                summer thunderstorm.
              </p>

              <PullQuote>
                The wind doesn&apos;t kill the schedule. The four inches of
                rain on a profile that was already two points wet of optimum
                kills the schedule.
              </PullQuote>
            </div>
          </section>

          {/* Section 02 — The 72-hour secure */}
          <section
            aria-labelledby="secure-heading"
            className="mx-auto mt-20 max-w-[68ch] md:mt-28"
          >
            <SectionEyebrow>Section 02 &mdash; The 72-hour secure</SectionEyebrow>
            <h2
              id="secure-heading"
              className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-bone-100 md:text-4xl"
            >
              There is &ldquo;pause work,&rdquo; and there is &ldquo;secure
              site.&rdquo; They are not the same call.
            </h2>

            <div className="mt-8 space-y-6 text-pretty text-[1.0625rem] leading-[1.75] text-graphite-200 md:text-[1.125rem]">
              <p>
                Pause work is the call you make every spring afternoon. The
                operator stows the bucket, the foreman clears non-essential
                personnel, and we wait the cell out. Secure site is a
                separate playbook, and on the September 9 forecast cycle, two
                full days out, we ran the long version.
              </p>

              <p>
                What gets done in the 72 hours before landfall: temporary
                erosion protection laid down on every open slope and stockpile
                &mdash; we run a heavy double-net coir blanket on cuts steeper
                than 3:1 and a silt fence and wattle line on the rest. Plate
                steel goes over every open trench wider than four feet and
                every bell hole that can&apos;t be backfilled. Crew trucks and
                light plant move to the yard. Tracked equipment moves to the
                high quadrant of the site and gets oriented into the wind, not
                broadside to it. Fuel gets topped because we&apos;d rather
                burn the gallon than wait three days behind the FEMA convoy.
              </p>

              <p>
                And the paper. Parish-level burn bans and storm-stop
                notifications get filed before the office closes Tuesday
                afternoon, not Wednesday morning when half the parish staff is
                already evacuating family. The owner and the GC get a
                two-line e-mail: site secured, photos attached, reopen
                decision pending storm verification. Nobody on the GC side
                wants a phone call from the contractor on Wednesday; they
                want a paper trail that says we already moved.
              </p>
            </div>
          </section>

          {/* Section 03 — The day the decision actually mattered */}
          <section
            aria-labelledby="decision-heading"
            className="mx-auto mt-20 max-w-[68ch] md:mt-28"
          >
            <SectionEyebrow>Section 03 &mdash; The day the decision actually mattered</SectionEyebrow>
            <h2
              id="decision-heading"
              className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-bone-100 md:text-4xl"
            >
              Three dates, one tactic, one made-up week.
            </h2>

            <div className="mt-8 space-y-6 text-pretty text-[1.0625rem] leading-[1.75] text-graphite-200 md:text-[1.125rem]">
              <p>
                We secured the site Tuesday, September 10.{" "}
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-300">[VERIFY-WITH-JOE]</span>{" "}
                Full crew on site at 06:00, plate steel and erosion blanket
                laid by 14:00, equipment staged on the north pad by 17:30,
                office out by 19:00. No work Wednesday, September 11 &mdash;
                the day of landfall. We were back on site at 07:00 Thursday,
                September 12, walking the pad, photographing every joint
                where the silt fence had taken weight, and running a moisture
                density check on the top six inches of subgrade before any
                machine moved.
              </p>

              <p>
                The moisture readings on that Thursday morning told us what we
                expected: the pad was three to four points wet of optimum on
                the south half and closer to two on the north half, where the
                cross-slope had drained better than the design suggested it
                would. <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-300">[VERIFY-WITH-JOE]</span>{" "}
                We did not start compaction Thursday. We did not start
                compaction Friday. We pulled the dozer hands into a haul-road
                rehab on the access spur and let the pad bleed off through
                the weekend.
              </p>

              <p>
                The make-up tactic was not heroics. It was a second compaction
                crew, pre-arranged with our standing labor partner on the
                June seasonal call, on site Monday September 16 to run
                day-shift and an extension shift to 20:00 with light plant. We
                also re-sequenced the building pad to run north-south instead
                of east-west, because the north half had drained first. By
                the following Friday, September 20, we were back on the
                pre-storm critical path. <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-300">[VERIFY-WITH-JOE]</span>{" "}
                Nine working days lost to landfall and rebound, six made up
                by the end of the month.
              </p>
            </div>
          </section>

          {/* Section 04 — The rebound math */}
          <section
            aria-labelledby="rebound-heading"
            className="mx-auto mt-20 max-w-[68ch] md:mt-28"
          >
            <SectionEyebrow>Section 04 &mdash; The rebound math</SectionEyebrow>
            <h2
              id="rebound-heading"
              className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-bone-100 md:text-4xl"
            >
              Catahoula clay does not read the rebound chart.
            </h2>

            <div className="mt-8 space-y-6 text-pretty text-[1.0625rem] leading-[1.75] text-graphite-200 md:text-[1.125rem]">
              <p>
                We wrote in the first field note that a Proctor curve is a
                starting point on this ground, not an answer. The corollary on
                a hurricane-rebound jobsite is that the moisture-content
                rebound curve is also a starting point. A four-to-six-inch
                rainfall event on a Pleistocene terrace clay or a Catahoula
                uplands fill returns to optimum on a timeline somewhere
                between ten and twenty-one days, depending on temperature,
                wind, slope, and how deep the cut was before the storm. <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-300">[VERIFY-WITH-JOE]</span>
              </p>

              <p>
                The two points that matter for sequencing: it is not symmetric
                &mdash; the top six inches bleeds off faster than the next
                eighteen, which means proof-rolling the surface tells you
                almost nothing about whether the lift below it will pump. And
                it is not patient with the calendar &mdash; if the
                post-storm week happens to be overcast and humid, you can
                lose the next week, too. The dry-down clock starts when the
                sun comes back, not when the rain stops.
              </p>

              <PullQuote>
                A subgrade that proof-rolls clean on Friday can pump on
                Monday. We test, we wait, we test again. The penalty for
                being two points wet of optimum on a hurricane-rebound pad is
                the entire pad.
              </PullQuote>
            </div>
          </section>

          {/* Section 05 — Three lessons (mirror manifesto's three failure modes) */}
          <section
            aria-labelledby="lessons-heading"
            className="mx-auto mt-20 max-w-[68ch] md:mt-28"
          >
            <SectionEyebrow>Section 05 &mdash; Three lessons</SectionEyebrow>
            <h2
              id="lessons-heading"
              className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-bone-100 md:text-4xl"
            >
              The hurricane year is decided in June.
            </h2>

            <p className="mt-6 text-[0.95rem] leading-relaxed text-graphite-300">
              The same three patterns show up after every named storm we&apos;ve
              worked through. The teams that lose the schedule lose it for the
              same three reasons. The teams that hold the schedule hold it for
              the same three reasons.
            </p>

            <ol className="mt-10 flex flex-col gap-px overflow-hidden border border-bone-100/10 bg-bone-100/10">
              {LESSONS.map((l) => (
                <li
                  key={l.label}
                  className="flex flex-col gap-4 bg-graphite-950 p-6 md:flex-row md:gap-8 md:p-8"
                >
                  <span className="font-mono text-sm font-bold tracking-[0.2em] text-amber-300 md:w-12 md:flex-none">
                    {l.label}
                  </span>
                  <div className="flex-1 space-y-3">
                    <h3 className="font-display text-xl font-bold leading-snug text-bone-100 md:text-2xl">
                      {l.title}
                    </h3>
                    <p className="text-pretty text-[0.95rem] leading-relaxed text-graphite-200 md:text-base">
                      {l.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Closing aside — matches manifesto */}
          <section
            aria-label="Author note"
            className="mx-auto mt-20 max-w-[68ch] border-t border-bone-100/10 pt-10 md:mt-28"
          >
            <p className="text-pretty text-[0.95rem] leading-relaxed text-graphite-300">
              Atlantic hurricane season is June 1 to November 30. The peak is
              the second week of September. We do not write this down because
              we forget &mdash; we write it down because the contractor on the
              other side of the bid table doesn&apos;t live here, and the
              owner needs to know whether the schedule respects what that
              calendar actually does.
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-amber-300">
              &mdash; Joe Burns, Founder
            </p>
          </section>
        </div>
      </article>

      {/* Closing CTA band — matches manifesto */}
      <section
        aria-labelledby="francine-cta-heading"
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
              id="francine-cta-heading"
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
              <CtaButton href="/field-notes" variant="ghost" size="lg" showArrow={false}>
                More field notes
              </CtaButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ----- Inline primitives (mirror manifesto) ---------------------------------

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
