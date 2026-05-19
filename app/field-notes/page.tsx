import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { listFieldNotes } from "@/lib/content/field-notes";
import { PageHero } from "@/components/sections/page-hero";
import { CtaButton } from "@/components/brand/cta-button";

export const metadata: Metadata = buildMetadata({
  title: "Field notes",
  description:
    "Long-form notes from the field. Central Louisiana site work, written by the people doing it. Soil, schedule, weather, and the failure modes that out-of-state crews learn the hard way.",
  path: "/field-notes",
});

// Format an ISO date as "MON DD, YYYY" in en-US, locale-free (UTC) to avoid
// the off-by-one date drift that hits us when the build runs in CDT.
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map((n) => parseInt(n, 10));
  if (!y || !m || !d) return iso;
  const date = new Date(Date.UTC(y, m - 1, d));
  return date
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      timeZone: "UTC",
    })
    .toUpperCase();
}

export default function FieldNotesIndexPage() {
  const notes = listFieldNotes();

  return (
    <>
      <PageHero
        eyebrow="Field notes"
        title="From the field, for the field."
        description="Long-form notes on Central Louisiana site work — written by the people doing it. The ground, the calendar, the sequencing, and what we've learned the hard way."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Field notes" }]}
      />

      <section
        aria-label="Field notes listing"
        className="border-b border-bone-100/10 bg-graphite-950 py-16 md:py-24"
      >
        <div className="container-page">
          <ol className="mx-auto flex max-w-4xl flex-col gap-px overflow-hidden border border-bone-100/10 bg-bone-100/10">
            {notes.map((n) => (
              <li key={n.slug} className="bg-graphite-950">
                <Link
                  href={n.href}
                  className="group flex flex-col gap-5 p-6 transition-colors hover:bg-graphite-900/40 md:flex-row md:items-start md:gap-8 md:p-8"
                >
                  <div className="flex flex-row items-center gap-4 md:w-32 md:flex-none md:flex-col md:items-start md:gap-3">
                    <span className="font-mono text-sm font-bold tracking-[0.22em] text-amber-300">
                      {n.number}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite-300 tabular-nums">
                      {formatDate(n.date)}
                    </span>
                  </div>

                  <div className="flex-1 space-y-3">
                    <h2 className="font-display text-2xl font-bold leading-snug text-bone-100 transition-colors group-hover:text-amber-300 md:text-3xl">
                      {n.title}
                    </h2>
                    <p className="text-pretty text-[0.95rem] leading-relaxed text-graphite-300 md:text-base">
                      {n.dek}
                    </p>
                    <div className="flex items-center gap-3 pt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite-400">
                      <span className="tabular-nums">~{n.readingMinutes} min read</span>
                      <span aria-hidden className="h-px w-4 bg-bone-100/20" />
                      <span className="inline-flex items-center gap-1.5 text-amber-300 transition-transform duration-200 group-hover:translate-x-0.5">
                        Read note
                        <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>

          <p className="mx-auto mt-10 max-w-4xl font-mono text-[10px] uppercase tracking-[0.22em] text-graphite-400">
            More notes posted as the season produces them. No newsletter, no
            schedule — just the work, written down.
          </p>
        </div>
      </section>

      {/* Closing CTA band — same template as the manifesto, kept tight so the
          index page never visually competes with the post itself. */}
      <section
        aria-labelledby="field-notes-cta-heading"
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
              id="field-notes-cta-heading"
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
              <CtaButton href="/projects" variant="ghost" size="lg" showArrow={false}>
                See projects
              </CtaButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
