# Content checklists

Two live placeholder surfaces — the `/bidding` feed and the second Field Notes
post — ship with credible stand-in content that reads as real but is flagged in
source for Joe to confirm before it&apos;s treated as authoritative. This file
is the single &ldquo;what still needs your eyes&rdquo; document; tick a box,
paste the real value, ping Found It Marketing, we&apos;ll do the swap.

Existing prequalification placeholders live in
[`prequal-data-checklist.md`](./prequal-data-checklist.md) and are unchanged
by this push.

---

## Bidding feed (`/bidding`)

The page renders three columns &mdash; **currently bidding**, **recently
awarded**, **recently completed** &mdash; sourced from
`lib/content/bidding.ts`. Each row has six fields; every value below is a
placeholder until Joe confirms. The page&apos;s &ldquo;Last updated&rdquo;
pill renders from `BID_FEED_LAST_UPDATED` in the same file.

### Currently bidding

- [ ] **Industrial Pad &mdash; Vernon Parish** — confirm exact project name,
      GC, value range ($1.8M&ndash;$2.4M placeholder), and bid-close date
      (`2026-06-14` placeholder).
- [ ] **Regional Distribution Expansion &mdash; Rapides Parish** — confirm
      GC, end client, value range ($3.0M&ndash;$4.0M placeholder), and bid
      date (`2026-06-21` placeholder).
- [ ] **Substation Pad &mdash; Natchitoches Parish** — confirm whether this
      is a real opportunity, owner (Cleco Power placeholder), and bid date
      (`2026-06-28` placeholder). If public bid, replace `valueLabel` with
      RFP / project number once it&apos;s live.
- [ ] **Cold Storage Pad &mdash; Avoyelles Parish** — confirm GC, value
      range ($2.1M&ndash;$2.8M placeholder), and bid date (`2026-07-05`
      placeholder).

### Recently awarded

- [ ] **Paper Mill Yard Expansion &mdash; Grant Parish** — confirm scope,
      owner (currently `Confidential industrial owner`), value ($2.6M
      placeholder), and award month (`2026-05-01` placeholder).
- [ ] **Medical Office Pad &mdash; Alexandria** — confirm GC (Robins &amp;
      Morton placeholder), value ($1.1M placeholder), award month
      (`2026-04-01` placeholder).
- [ ] **River-Access Industrial Road &mdash; Concordia Parish** — confirm GC,
      mileage, value ($1.9M placeholder), award month (`2026-03-01`
      placeholder).

### Recently completed

- [ ] **Natchez 230kV Substation Pad** — already shipped under `/projects`;
      confirm bid feed value ($1.6M placeholder) and completion month
      (`2024-11-01` placeholder) match Cleco closeout records.
- [ ] **Central Louisiana Distribution Center** — confirm bid feed value
      ($4.8M placeholder) and completion month (`2025-08-01` placeholder)
      match Brasfield &amp; Gorrie closeout.
- [ ] **Christus St. Frances Cabrini Campus Expansion** — confirm value
      ($2.3M placeholder) and completion month (`2024-12-01` placeholder)
      match Robins &amp; Morton closeout.

### Cadence

- [ ] Confirm monthly cadence is right (the footer note says &ldquo;New
      entries posted on the 1st of each month.&rdquo;). If quarterly is more
      realistic, change `BID_FEED_LAST_UPDATED` and the footer copy in
      `app/bidding/page.tsx`.
- [ ] Confirm subscribe destination &mdash; today it&apos;s a `mailto:`
      link to `siteConfig.inquiryEmail`. If a list-server endpoint exists
      (Mailchimp, Beehiiv, etc.), swap the `Subscribe` CtaButton for a
      proper form posting to `/api/rfq` with `source: "bid-alerts"`.

---

## Field Notes &mdash; Hurricane Francine sequencing

Live at `/field-notes/sequencing-around-hurricane-francine`. Word count is in
the ~1,000 range; every storm-level fact (landfall date and time, max winds,
pressure, location, rainfall band, OSHA wind thresholds, hurricane-season
dates) is web-verified against NOAA / NHC / NWS Lake Charles / OSHA primary
sources and cited in source comments at the top of the page file. Project
specifics and engineering ranges still need Joe&apos;s eyes &mdash; flagged
`[VERIFY-WITH-JOE]` in source and inline on the page.

### Storm-level facts (already verified, no action)

- Landfall: Sept 11, 2024, 5 PM CDT, ~30 mi SSW of Morgan City, near the
  St. Mary&ndash;Terrebonne Parish line. (NWS LCH PSH; NHC AL062024.)
- Category 2 at landfall, 100 mph max sustained, 972 mb central pressure.
- Rainfall in Central LA: NWS LCH MRMS shows a 3&ndash;6 inch band across
  northeast Rapides and northern Avoyelles parishes.
- OSHA personnel-platform wind trigger: 20 mph (29 CFR 1926.1431(k)(8)).
- Atlantic hurricane season: June 1 &ndash; November 30 (NOAA).

### Project specifics (need Joe&apos;s confirmation)

- [ ] Was Francine experienced mid-cut on a real project? The post is
      written around a 14-acre industrial pad east of the Red River. If the
      real-life equivalent was a different acreage, location, or scope,
      adjust Section 03 accordingly.
- [ ] The pre-storm secure dates (Tuesday Sept 10), no-work day
      (Wednesday Sept 11), and walk-back date (Thursday Sept 12) are
      defensible from the storm timeline but not from a project diary.
      Confirm or replace with actual dates.
- [ ] The post-rebound make-up tactic in Section 03 reads as: hold the pad
      Thursday/Friday, pull dozer hands to haul-road rehab, second compaction
      crew Monday Sept 16, re-sequence pad north&ndash;south because the
      north half drained first, back on critical path by Friday Sept 20
      (&ldquo;nine working days lost, six made up&rdquo;). Confirm or
      replace.

### Engineering ranges (need Joe&apos;s confirmation)

- [ ] Catahoula / Pleistocene clay rebound to optimum moisture after a
      4&ndash;6 in rainfall event: post says 10&ndash;21 days. The range is
      defensible, but Joe&apos;s production logs are the only authoritative
      source.
- [ ] Section 04 claim: &ldquo;top six inches bleeds off faster than the
      next eighteen, which means proof-rolling the surface tells you almost
      nothing about whether the lift below it will pump.&rdquo; Confirm this
      matches our own QA practice.

### Lessons (no factual claims, but voice check)

The three lessons in Section 05 mirror the manifesto&apos;s three
&ldquo;failure modes&rdquo; pattern: pre-season setup, moisture-content
patience, procurement. Each cites a specific piece of operational practice
(yard real estate for the storm box, two yards north of I-49 and one east of
the Atchafalaya for materials pre-staging). Confirm those are accurate
descriptions of our actual practice.

- [ ] Does the &ldquo;storm box on the yard, May 15 &ndash; December 1&rdquo;
      framing match how we actually run the yard?
- [ ] Confirm the &ldquo;two yards north of I-49 and one east of the
      Atchafalaya&rdquo; pre-staging description.

---

## Suggested first ask of Joe

The single highest-leverage answer is whether the **Francine project
walkthrough in Section 03** is accurate. If a real project drives the post,
the dates and tactic should be specific to it. If there is no single project
that fits, we either re-frame Section 03 as a composite (&ldquo;a typical
14-acre pad&rdquo;) or pick one of the real 2024 jobs and re-write the
section around it. After that: the four currently-bidding rows in the bid
feed, because they are the only rows that update by next month.
