import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { PageHero } from "@/components/sections/page-hero";
import { CtaButton } from "@/components/brand/cta-button";
import {
  BID_FEED_LAST_UPDATED,
  bidsByStatus,
  monthYear,
  shortDate,
  type BidRow,
  type BidStatus,
} from "@/lib/content/bidding";

export const metadata: Metadata = buildMetadata({
  title: "Bidding & awards",
  description:
    "Currently bidding, recently awarded, recently completed projects. A live picture of where Sitework Specialist is in motion across Central Louisiana.",
  path: "/bidding",
});

// Every row on this page is editorial placeholder content. All `[CLIENT-FILL]`
// values live in `lib/content/bidding.ts`. Joe replaces them on the first of
// each month; the "Last updated" pill renders from the same source so the page
// can never silently drift out of date.

type Column = {
  status: BidStatus;
  eyebrow: string;
  title: string;
  emptyCopy: string;
};

const COLUMNS: Column[] = [
  {
    status: "bidding",
    eyebrow: "01 — Currently bidding",
    title: "Out for bid.",
    emptyCopy:
      "Nothing on the boards this cycle. Plans show up Monday — check back the first of next month.",
  },
  {
    status: "awarded",
    eyebrow: "02 — Recently awarded",
    title: "Awarded this quarter.",
    emptyCopy: "No awards posted yet this quarter.",
  },
  {
    status: "completed",
    eyebrow: "03 — Recently completed",
    title: "Buttoned up.",
    emptyCopy: "No completions posted yet this quarter.",
  },
];

export default function BiddingPage() {
  return (
    <>
      <PageHero
        eyebrow="Bidding & awards"
        title="What we're working on right now."
        description="Updated monthly. A live picture of where the business is in motion — currently bidding, recently awarded, and recently buttoned up."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Bidding & awards" }]}
      />

      <section
        aria-label="Bid feed"
        className="border-b border-bone-100/10 bg-graphite-950 py-16 md:py-24"
      >
        <div className="container-page">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8">
            {COLUMNS.map((col) => (
              <BidColumn key={col.status} column={col} rows={bidsByStatus(col.status)} />
            ))}
          </div>

          {/* Bid alerts — simple mailto, keeps this push schema-free. */}
          <div className="mt-16 grid grid-cols-1 gap-8 border border-amber-300/30 bg-amber-300/5 p-6 md:grid-cols-[7fr_5fr] md:items-center md:p-10">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300">
                Bid alerts
              </span>
              <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight text-bone-100 md:text-3xl">
                Get the bid feed in your inbox. Monthly. No spam.
              </h2>
              <p className="mt-3 text-sm text-graphite-300">
                One e-mail a month with the new rows on this page and a
                two-line note on where the calendar is sitting. We don&apos;t
                use it for anything else, and we don&apos;t share it.
              </p>
            </div>
            <div className="flex flex-col items-stretch gap-3 md:items-end">
              <CtaButton
                href={`mailto:${siteConfig.inquiryEmail}?subject=Bid%20alerts%20subscription&body=Please%20add%20me%20to%20the%20Sitework%20Specialist%20bid%20alerts%20list.%0A%0AName%3A%20%0ACompany%3A%20%0ARole%3A%20`}
                variant="primary"
                size="md"
              >
                Subscribe
              </CtaButton>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite-300">
                {siteConfig.inquiryEmail}
              </span>
            </div>
          </div>

          {/* Footer freshness note */}
          <p className="mt-10 border-t border-bone-100/10 pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite-400">
            Last updated <span className="text-bone-100">{BID_FEED_LAST_UPDATED}</span>.
            New entries posted on the 1st of each month.
          </p>
        </div>
      </section>

      {/* Closing CTA band — same template as prequal / manifesto */}
      <section
        aria-labelledby="bidding-cta-heading"
        className="relative isolate overflow-hidden border-b border-bone-100/10 bg-graphite-950 py-20 md:py-24"
      >
        <div aria-hidden className="absolute inset-0 -z-10 grid-noise opacity-[0.05]" />
        <div className="container-page">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <span className="heading-eyebrow inline-flex items-center gap-3">
              <span className="inline-block h-px w-6 bg-amber-300" aria-hidden />
              On the bid list
            </span>
            <h2
              id="bidding-cta-heading"
              className="font-display text-balance text-3xl font-extrabold leading-[1.05] tracking-tight text-bone-100 md:text-5xl"
            >
              If your project belongs on this page, send us the plans.
            </h2>
            <p className="text-pretty text-graphite-300 md:text-lg">
              We&apos;ll have a number and a sequencing recommendation on your
              desk inside {siteConfig.responseSlaHours} hours.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              <CtaButton href="/rfq" variant="primary" size="lg">
                Request a quote
              </CtaButton>
              <CtaButton
                href="/prequalification"
                variant="ghost"
                size="lg"
                showArrow={false}
              >
                Prequalification packet
              </CtaButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ----- Column + Row primitives ----------------------------------------------

function BidColumn({ column, rows }: { column: Column; rows: BidRow[] }) {
  return (
    <section
      aria-labelledby={`${column.status}-heading`}
      className="flex flex-col"
    >
      <header className="border-b border-bone-100/10 pb-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300">
          {column.eyebrow}
        </span>
        <h2
          id={`${column.status}-heading`}
          className="mt-3 font-display text-2xl font-extrabold leading-tight text-bone-100"
        >
          {column.title}
        </h2>
      </header>

      {rows.length ? (
        <ol className="mt-px flex flex-col gap-px overflow-hidden bg-bone-100/10">
          {rows.map((r) => (
            <li key={r.slug} className="bg-graphite-950">
              <BidCard row={r} />
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-6 text-sm text-graphite-300">{column.emptyCopy}</p>
      )}
    </section>
  );
}

function BidCard({ row }: { row: BidRow }) {
  return (
    <article className="flex flex-col gap-3 p-5 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite-300">
          {row.location}
        </span>
        <StatusPill status={row.status} date={row.statusDate} />
      </div>

      <h3 className="font-display text-lg font-bold leading-snug text-bone-100 md:text-xl">
        {row.name}
      </h3>

      <p className="text-sm leading-relaxed text-graphite-200">{row.scope}</p>

      <dl className="mt-1 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-bone-100/10 pt-3 text-xs">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite-300">
            Value
          </dt>
          <dd className="mt-1 font-display font-bold tabular-nums text-bone-100">
            {row.valueLabel}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite-300">
            {row.status === "bidding" ? "GC / owner" : row.status === "awarded" ? "GC / owner" : "Delivered to"}
          </dt>
          <dd className="mt-1 font-display font-bold leading-snug text-bone-100">
            {row.owner}
          </dd>
        </div>
      </dl>
    </article>
  );
}

function StatusPill({ status, date }: { status: BidStatus; date: string }) {
  const cfg =
    status === "bidding"
      ? {
          label: `Out for bid until ${shortDate(date)}`,
          className:
            "border-amber-300/50 bg-amber-300/15 text-amber-300",
        }
      : status === "awarded"
      ? {
          label: `Awarded ${monthYear(date)}`,
          className: "border-bone-100/25 bg-bone-100/10 text-bone-100",
        }
      : {
          label: `Completed ${monthYear(date)}`,
          className: "border-bone-100/15 bg-graphite-900/50 text-graphite-300",
        };

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap border px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] ${cfg.className}`}
    >
      {cfg.label}
    </span>
  );
}
