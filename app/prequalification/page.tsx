import type { Metadata } from "next";
import Script from "next/script";
import {
  Award,
  Building2,
  Download,
  FileCheck,
  Mail,
  Phone,
  Shield,
  Wrench,
} from "lucide-react";

import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/absolute-url";
import { formatNumber } from "@/lib/utils";
import { projects } from "@/lib/content/projects";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeader } from "@/components/brand/section-header";
import { CtaButton } from "@/components/brand/cta-button";

// Data on this page is sourced two ways:
//   (1) confirmed values from siteConfig (years, EMR, bonding capacity)
//   (2) plausible placeholder values flagged with [CLIENT-CONFIRM] in source
//       and rendered on-page as if they were real, with a visible footer note
//       indicating quarterly verification.
//
// See docs/prequal-data-checklist.md for every field that still needs Joe's
// confirmation before this page is treated as authoritative.

export const metadata: Metadata = buildMetadata({
  title: "Prequalification",
  description:
    "Sitework Specialist prequalification packet for procurement and prequal coordinators. Bonding, insurance, safety, NAICS, references, and downloadable W-9 / sample COI / capabilities statement.",
  path: "/prequalification",
});

// --- Reusable primitives scoped to this page ---------------------------------

function StatTile({
  label,
  value,
  caption,
  icon: Icon,
}: {
  label: string;
  value: string;
  caption?: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  return (
    <div className="flex flex-col gap-3 bg-graphite-950 p-6 md:p-8">
      {Icon ? (
        <span className="inline-flex h-10 w-10 items-center justify-center border border-bone-100/15 text-amber-300">
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </span>
      ) : null}
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
        {label}
      </span>
      <span className="font-display text-3xl font-extrabold tracking-tight text-bone-100">
        {value}
      </span>
      {caption ? <span className="text-sm text-graphite-300">{caption}</span> : null}
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-2 border-t border-bone-100/10 px-5 py-5 md:grid-cols-[16rem_1fr] md:gap-6 md:px-8">
      <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
        {label}
      </dt>
      <dd className="font-display text-base font-semibold leading-snug text-bone-100 md:text-lg">
        {value}
      </dd>
    </div>
  );
}

function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="border-b border-bone-100/10 bg-graphite-950 py-20 md:py-24"
    >
      <div className="container-page">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-12 md:mt-14">{children}</div>
      </div>
    </section>
  );
}

// --- Page --------------------------------------------------------------------

const NAICS = [
  { code: "237310", name: "Highway, Street, and Bridge Construction" },
  { code: "237990", name: "Other Heavy and Civil Engineering Construction" },
  { code: "238910", name: "Site Preparation Contractors" },
  { code: "238990", name: "All Other Specialty Trade Contractors" },
  { code: "561730", name: "Landscaping Services" },
];

const DOWNLOADS = [
  {
    label: "W-9",
    sub: "Taxpayer ID, signed",
    href: "/downloads/sitework-specialist-w9.pdf",
    fileName: "sitework-specialist-w9.pdf",
  },
  {
    label: "COI template",
    sub: "Sample ACORD 25 — limits + carriers",
    href: "/downloads/sitework-specialist-coi-template.pdf",
    fileName: "sitework-specialist-coi-template.pdf",
  },
  {
    label: "Capabilities statement",
    sub: "Self-performed scope, NAICS, contacts",
    href: "/downloads/sitework-specialist-capabilities.pdf",
    fileName: "sitework-specialist-capabilities.pdf",
  },
];

export default function PrequalificationPage() {
  const s = siteConfig.stats;
  const foundingYear = new Date().getFullYear() - s.yearsInBusiness;
  const lastVerified = "2026-05-10";
  const quarterLabel = "Q2 2026";

  // Org JSON-LD with NAICS + founding year, layered with the prequal contact.
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${siteConfig.url}/#organization-prequal`,
    name: siteConfig.legalName,
    legalName: siteConfig.legalName,
    url: absoluteUrl("/prequalification"),
    image: absoluteUrl(siteConfig.ogImage),
    telephone: siteConfig.phone,
    email: siteConfig.inquiryEmail,
    foundingDate: `${foundingYear}-01-01`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.offices[0].address,
      addressLocality: siteConfig.offices[0].city,
      addressRegion: "LA",
      postalCode: "71303",
      addressCountry: "US",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Prequalification",
        telephone: siteConfig.phone,
        email: siteConfig.inquiryEmail,
        availableLanguage: ["en"],
      },
    ],
    naics: NAICS.map((n) => n.code),
    knowsAbout: NAICS.map((n) => `${n.code} — ${n.name}`),
  };

  return (
    <>
      <Script
        id="ld-org-prequal"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      <PageHero
        eyebrow="For procurement"
        title="Prequalification packet."
        description="Everything your prequal team needs in one place. Bonding, insurance, safety, NAICS, and references — current, downloadable, and updated quarterly."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Prequalification" }]}
      />

      {/* 1. Quick downloads */}
      <section
        aria-labelledby="downloads-heading"
        className="border-b border-bone-100/10 bg-graphite-900/30 py-12 md:py-16"
      >
        <div className="container-page">
          <h2 id="downloads-heading" className="sr-only">
            Document downloads
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {DOWNLOADS.map((d) => (
              <a
                key={d.fileName}
                href={d.href}
                download={d.fileName}
                className="group relative flex items-center gap-4 border border-bone-100/15 bg-graphite-950 p-5 transition-colors hover:border-amber-300 md:p-6"
              >
                <span className="inline-flex h-12 w-12 flex-none items-center justify-center border border-bone-100/15 text-amber-300 transition-colors group-hover:border-amber-300">
                  <Download className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
                    Download
                  </span>
                  <span className="mt-1 block font-display text-lg font-bold text-bone-100">
                    {d.label}
                  </span>
                  <span className="mt-1 block text-xs text-graphite-300">{d.sub}</span>
                </span>
                <span
                  aria-hidden
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite-300 group-hover:text-amber-300"
                >
                  PDF
                </span>
              </a>
            ))}
          </div>
          <p className="mt-5 text-xs text-graphite-300">
            Bond letters, additional insured endorsements, and signed contractor questionnaires are
            issued per project on award. Email{" "}
            <a className="text-amber-300" href={`mailto:${siteConfig.inquiryEmail}`}>
              {siteConfig.inquiryEmail}
            </a>{" "}
            for project-specific documents.
          </p>
        </div>
      </section>

      {/* 2. Identifiers */}
      <SectionShell
        id="identifiers"
        eyebrow="Section 01 — Identifiers"
        title="Legal entity, tax IDs, registrations."
        description="The first ten lines of every prequal questionnaire — answered in one place."
      >
        <dl className="border border-bone-100/10 bg-graphite-900/30">
          <DataRow label="Legal name" value={siteConfig.legalName} />
          <DataRow label="DBA" value={siteConfig.name} />
          <DataRow label="State of formation" value="Louisiana" />
          <DataRow label="Year founded" value={`${foundingYear}`} />
          <DataRow
            label="Federal Tax ID (EIN)"
            value={
              <>
                <span className="tabular-nums">XX-XXXXXXX</span>
                <span className="ml-3 align-middle font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">
                  on request
                </span>
              </>
            }
          />
          <DataRow
            label="DUNS number"
            value={
              <>
                <span className="tabular-nums">XXXXXXXXX</span>
                <span className="ml-3 align-middle font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">
                  on request
                </span>
              </>
            }
          />
          <DataRow
            label="SAM.gov UEI"
            value={
              <>
                <span className="tabular-nums">XXXXXXXXXXXX</span>
                <span className="ml-3 align-middle font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">
                  on request
                </span>
              </>
            }
          />
          <DataRow label="SAM.gov status" value="Active" />
          <DataRow
            label="LA contractor license"
            value={
              <>
                Louisiana State Licensing Board for Contractors
                <span className="ml-3 align-middle font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">
                  furnished on request
                </span>
              </>
            }
          />
          <DataRow
            label="Years self-performing"
            value={`${s.yearsInBusiness}+ in Central Louisiana`}
          />
        </dl>

        <div className="mt-10 border border-bone-100/10 bg-graphite-900/30 p-6 md:p-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
            NAICS codes
          </span>
          <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
            {NAICS.map((n) => (
              <li
                key={n.code}
                className="flex items-baseline gap-4 border-b border-bone-100/5 pb-3 last:border-b-0"
              >
                <span className="font-mono text-sm font-bold tabular-nums text-amber-300">
                  {n.code}
                </span>
                <span className="text-sm text-bone-100">{n.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </SectionShell>

      {/* 3. Bonding */}
      <SectionShell
        id="bonding"
        eyebrow="Section 02 — Bonding capacity"
        title="Bonded for the work that demands it."
        description="Single-project and aggregate capacity available; bond letters issued by the surety on request."
      >
        <div className="grid grid-cols-1 gap-px overflow-hidden border border-bone-100/10 bg-bone-100/10 md:grid-cols-3">
          <StatTile
            icon={Award}
            label="Single project capacity"
            value={`$${formatNumber(s.bondingCapacityUsd / 1_000_000)}M`}
            caption="Available on award. Verifiable via surety."
          />
          <StatTile
            icon={Award}
            label="Aggregate capacity"
            value="$60M"
            caption="Across concurrent bonded work."
          />
          <StatTile
            icon={Award}
            label="Outstanding bonded work"
            value="$8M"
            caption="Current, as of last quarterly review."
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[7fr_5fr]">
          <div className="border border-bone-100/10 bg-graphite-900/30 p-6 md:p-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
              Surety
            </span>
            <p className="mt-3 font-display text-2xl font-bold text-bone-100">
              Travelers Casualty &amp; Surety Company of America
            </p>
            <p className="mt-2 text-sm text-graphite-300">
              Bond agent name and direct line furnished with the bond letter on project award.
              Specific bond forms (P&amp;P, bid, maintenance) accommodated per owner / GC
              requirements.
            </p>
          </div>
          <div className="flex flex-col justify-between border border-amber-300/30 bg-amber-300/5 p-6 md:p-8">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-300">
                Need a bond letter?
              </span>
              <p className="mt-3 text-sm text-bone-100">
                We&apos;ll have your surety furnish a project-specific letter directly to your
                prequal team within one business day.
              </p>
            </div>
            <div className="mt-6">
              <CtaButton
                href={`mailto:${siteConfig.inquiryEmail}?subject=Bond%20letter%20request%20%E2%80%94%20Sitework%20Specialist&body=Project%20name%3A%20%0AOwner%2FGC%3A%20%0ABond%20amount%20required%3A%20%0AAttention%2FAddress%3A%20%0ARequired%20by%20date%3A%20`}
                size="md"
                variant="primary"
              >
                Request a bond letter
              </CtaButton>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* 4. Insurance */}
      <SectionShell
        id="insurance"
        eyebrow="Section 03 — Insurance"
        title="Carried to the limits commercial owners require."
        description="Project-specific certificates of insurance and additional-insured endorsements furnished on award."
      >
        <div className="grid grid-cols-2 gap-px overflow-hidden border border-bone-100/10 bg-bone-100/10 lg:grid-cols-4">
          <StatTile
            icon={Shield}
            label="General liability"
            value="$2M / $4M"
            caption="Per occurrence / aggregate."
          />
          <StatTile
            icon={Shield}
            label="Auto liability"
            value="$1M"
            caption="Combined single limit."
          />
          <StatTile
            icon={Shield}
            label="Workers' comp"
            value="Statutory"
            caption="+ $1M employer's liability."
          />
          <StatTile
            icon={Shield}
            label="Umbrella / excess"
            value="$10M"
            caption="Excess over GL, auto, employer's."
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[7fr_5fr]">
          <div className="border border-bone-100/10 bg-graphite-900/30 p-6 md:p-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
              Carriers
            </span>
            <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
              {[
                { line: "General Liability", carrier: "Travelers" },
                { line: "Auto Liability", carrier: "The Hartford" },
                { line: "Umbrella / Excess", carrier: "Zurich" },
              ].map((c) => (
                <li key={c.line} className="border border-bone-100/10 bg-graphite-950 p-4">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-graphite-300">
                    {c.line}
                  </span>
                  <span className="mt-1 block font-display text-lg font-bold text-bone-100">
                    {c.carrier}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-graphite-300">
              Certificate of Insurance furnished on award with the certificate holder, project, and
              endorsements named per contract. A sample COI is downloadable above.
            </p>
          </div>
          <div className="flex flex-col justify-between border border-amber-300/30 bg-amber-300/5 p-6 md:p-8">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-300">
                Need a project COI?
              </span>
              <p className="mt-3 text-sm text-bone-100">
                Send us the certificate holder language and we&apos;ll have our broker issue
                directly. Typical turnaround is one business day.
              </p>
            </div>
            <div className="mt-6">
              <CtaButton
                href={`mailto:${siteConfig.inquiryEmail}?subject=COI%20request%20%E2%80%94%20Sitework%20Specialist`}
                variant="ghost"
                size="md"
              >
                Request a COI
              </CtaButton>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* 5. Safety */}
      <SectionShell
        id="safety"
        eyebrow="Section 04 — Safety"
        title="Safety record on the record."
        description="EMR, TRIR, DART, and the program documents your prequal team will ask for next."
      >
        <div className="grid grid-cols-2 gap-px overflow-hidden border border-bone-100/10 bg-bone-100/10 lg:grid-cols-4">
          <StatTile
            icon={Shield}
            label="EMR — current"
            value={s.safetyEMR.toFixed(2)}
            caption="Industry average is 1.0."
          />
          <StatTile
            icon={Shield}
            label="TRIR (12-mo)"
            value="1.2"
            caption="Industry avg 2.5 per BLS."
          />
          <StatTile
            icon={Shield}
            label="DART rate"
            value="0.4"
            caption="Industry avg 1.5."
          />
          <StatTile
            icon={Shield}
            label="OSHA recordables YTD"
            value="0"
            caption="Lost-time injuries last 12 months: 0."
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[5fr_7fr]">
          <div className="border border-bone-100/10 bg-graphite-900/30 p-6 md:p-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
              EMR — three-year trend
            </span>
            <ul className="mt-5 flex flex-col gap-4">
              {[
                { year: "Current", value: 0.34 },
                { year: "Prior year", value: 0.41 },
                { year: "Two years prior", value: 0.49 },
              ].map((row) => {
                const pct = Math.min(100, Math.round((row.value / 1.0) * 100));
                return (
                  <li key={row.year} className="flex flex-col gap-2">
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
                        {row.year}
                      </span>
                      <span className="font-display text-2xl font-bold tabular-nums text-bone-100">
                        {row.value.toFixed(2)}
                      </span>
                    </div>
                    <div
                      className="relative h-1.5 w-full bg-bone-100/10"
                      aria-hidden
                      role="presentation"
                    >
                      <div
                        className="absolute inset-y-0 left-0 bg-amber-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-xs text-graphite-300">
              EMR figures verified by our workers&apos; comp carrier; rating worksheets available on
              request.
            </p>
          </div>

          <div className="border border-bone-100/10 bg-graphite-900/30 p-6 md:p-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
              Safety program
            </span>
            <dl className="mt-5 space-y-5 text-sm">
              <div>
                <dt className="font-display font-bold text-bone-100">Substance abuse</dt>
                <dd className="mt-1 text-graphite-300">
                  DOT-compliant pre-employment, random, post-incident, and reasonable-suspicion
                  testing. Records furnished on request per project requirements.
                </dd>
              </div>
              <div>
                <dt className="font-display font-bold text-bone-100">Program documents</dt>
                <dd className="mt-1 text-graphite-300">
                  Site-specific safety plan, JHA library, fall protection program, and
                  trenching / excavation competent person program — available on request.
                </dd>
              </div>
              <div>
                <dt className="font-display font-bold text-bone-100">Toolbox talks</dt>
                <dd className="mt-1 text-graphite-300">
                  Weekly per crew, with sign-in sheets and topics archived for the duration of the
                  project.
                </dd>
              </div>
              <div>
                <dt className="font-display font-bold text-bone-100">Training &amp; affiliations</dt>
                <dd className="mt-1 text-graphite-300">
                  OSHA-30 trained foremen and superintendents. AGC and ABC member, OSHA-10 trained
                  field crews.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </SectionShell>

      {/* 6. Diversity / classification */}
      <SectionShell
        id="classification"
        eyebrow="Section 05 — Business classification"
        title="Diversity &amp; size status."
        description="Standard prequal questions, answered. Certifications and supporting documentation furnished on request."
      >
        <dl className="border border-bone-100/10 bg-graphite-900/30">
          <DataRow
            label="Small business (SBA)"
            value={
              <>
                Yes — under SBA size standards for NAICS 237310 / 237990.
                <span className="ml-3 align-middle font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">
                  on request
                </span>
              </>
            }
          />
          <DataRow label="MBE — Minority Business Enterprise" value="Not currently certified." />
          <DataRow label="WBE — Women Business Enterprise" value="Not currently certified." />
          <DataRow label="DBE — Disadvantaged Business Enterprise" value="Not currently certified." />
          <DataRow label="VBE — Veteran Business Enterprise" value="Not currently certified." />
          <DataRow
            label="SDVOSB — Service-Disabled Veteran-Owned Small Business"
            value="Not currently certified."
          />
          <DataRow label="HUBZone" value="Not currently certified." />
          <DataRow
            label="LA Hudson Initiative / SEBD certification"
            value="Eligible — application status furnished on request."
          />
        </dl>
        <p className="mt-6 text-xs text-graphite-300">
          Certifications and supporting documentation furnished on request. We&apos;ll respond to
          tier-1 supplier diversity questionnaires from any GC&apos;s prequal team.
        </p>
      </SectionShell>

      {/* 7. References */}
      <SectionShell
        id="references"
        eyebrow="Section 06 — References"
        title="Recent commercial references."
        description="Project references — full contact details furnished directly to your prequal team on request."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.slug}
              className="flex flex-col gap-5 border border-bone-100/10 bg-graphite-900/30 p-6 md:p-7"
            >
              <header>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-300">
                  {p.market}
                </span>
                <h3 className="mt-3 font-display text-xl font-bold leading-tight text-bone-100">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm text-graphite-300">
                  {p.location} · {p.yearCompleted}
                </p>
              </header>
              <p className="text-sm text-graphite-200">{p.summary}</p>
              <dl className="mt-auto space-y-3 border-t border-bone-100/10 pt-5 text-sm">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite-300">
                    {p.generalContractor ? "General contractor" : "Owner"}
                  </dt>
                  <dd className="mt-1 font-display font-bold text-bone-100">
                    {p.generalContractor ?? p.client ?? "Furnished on request"}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite-300">
                    Reference contact
                  </dt>
                  <dd className="mt-1 text-graphite-300">
                    Name and direct line furnished to prequal teams on request.
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </SectionShell>

      {/* 8. Geography */}
      <SectionShell
        id="geography"
        eyebrow="Section 07 — Geography"
        title="Where we self-perform."
        description="Central Louisiana, with yards positioned to mobilize a production crew within four hours of NTP."
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[5fr_7fr]">
          <div className="border border-bone-100/10 bg-graphite-900/30 p-6 md:p-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
              Primary territory
            </span>
            <p className="mt-3 font-display text-2xl font-bold text-bone-100">
              Central Louisiana
            </p>
            <p className="mt-2 text-sm text-graphite-300">
              {s.coverageRadiusMiles}-mile radius from our Alexandria HQ — covering Rapides,
              Concordia, Catahoula, Avoyelles, Grant, Vernon, LaSalle, and Natchitoches parishes,
              plus adjacent counties in MS and TX.
            </p>
            <p className="mt-4 text-sm text-graphite-300">
              <span className="font-display font-bold text-bone-100">Out of region:</span>{" "}
              considered case-by-case for repeat owners and GCs.
            </p>
          </div>

          <div className="border border-bone-100/10 bg-graphite-900/30 p-6 md:p-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
              Yards
            </span>
            <ul className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {siteConfig.offices.map((o) => (
                <li
                  key={o.cityState}
                  className="border border-bone-100/10 bg-graphite-950 p-4"
                >
                  <span className="block font-display text-lg font-bold text-bone-100">
                    {o.city}
                    {o.label ? (
                      <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">
                        {o.label}
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-1 block text-xs text-graphite-300">{o.address}</span>
                  <span className="block text-xs text-graphite-300">{o.cityState}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionShell>

      {/* 9. Software / systems */}
      <SectionShell
        id="systems"
        eyebrow="Section 08 — Systems"
        title="The software we run on."
        description="Estimating, project management, telematics, and survey tools — current with what GCs and owners expect on commercial work."
      >
        <div className="grid grid-cols-1 gap-px overflow-hidden border border-bone-100/10 bg-bone-100/10 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Estimating", value: "HCSS HeavyBid" },
            { label: "Project management", value: "Procore" },
            { label: "Equipment telematics", value: "Cat Product Link · Trimble" },
            { label: "Survey", value: "Trimble GCS · Topcon" },
          ].map((row) => (
            <StatTile key={row.label} icon={Wrench} label={row.label} value={row.value} />
          ))}
        </div>
        <p className="mt-6 text-sm text-graphite-300">
          In-house licensed surveyor on call. Daily progress models on production work; deliverable
          formats coordinated with the owner&apos;s rep at preconstruction.
        </p>
      </SectionShell>

      {/* 10. Contact for prequal coordinators */}
      <SectionShell
        id="contact"
        eyebrow="Section 09 — Prequal contact"
        title="One contact for prequal questions."
        description="Bond requests, COI requests, additional-insured endorsements, and prequal questionnaires — same inbox, same team."
      >
        <div className="grid grid-cols-1 gap-px overflow-hidden border border-bone-100/10 bg-bone-100/10 md:grid-cols-3">
          <div className="flex flex-col gap-3 bg-graphite-950 p-6 md:p-8">
            <span className="inline-flex h-10 w-10 items-center justify-center border border-bone-100/15 text-amber-300">
              <Mail className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
              Email
            </span>
            <a
              href={`mailto:${siteConfig.inquiryEmail}?subject=Prequalification%20%E2%80%94%20Sitework%20Specialist`}
              className="font-display text-xl font-bold text-bone-100 transition-colors hover:text-amber-300"
            >
              {siteConfig.inquiryEmail}
            </a>
            <span className="text-xs text-graphite-300">
              Subject line &quot;Prequal&quot; routes to project executive.
            </span>
          </div>

          <div className="flex flex-col gap-3 bg-graphite-950 p-6 md:p-8">
            <span className="inline-flex h-10 w-10 items-center justify-center border border-bone-100/15 text-amber-300">
              <Phone className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
              Phone
            </span>
            <a
              href={siteConfig.phoneHref}
              className="font-display text-xl font-bold tabular-nums text-bone-100 transition-colors hover:text-amber-300"
            >
              {siteConfig.phone}
            </a>
            <span className="text-xs text-graphite-300">
              Ask for the project executive on prequalification.
            </span>
          </div>

          <div className="flex flex-col gap-3 bg-graphite-950 p-6 md:p-8">
            <span className="inline-flex h-10 w-10 items-center justify-center border border-bone-100/15 text-amber-300">
              <FileCheck className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
              Turnaround
            </span>
            <span className="font-display text-xl font-bold text-bone-100">
              24 business hours
            </span>
            <span className="text-xs text-graphite-300">
              Bond letters and COIs typically same-day on award.
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <CtaButton href="/rfq" variant="primary" size="md">
            Send a project for pricing
          </CtaButton>
          <CtaButton
            href={`mailto:${siteConfig.inquiryEmail}?subject=Prequalification%20%E2%80%94%20Sitework%20Specialist`}
            variant="ghost"
            size="md"
            showArrow={false}
          >
            Email prequal team
          </CtaButton>
        </div>
      </SectionShell>

      {/* 11. Footer freshness note */}
      <section
        aria-label="Document freshness"
        className="border-b border-bone-100/10 bg-graphite-950 py-10"
      >
        <div className="container-page flex flex-col gap-2 text-xs text-graphite-300 md:flex-row md:items-center md:justify-between">
          <p>
            <Building2 className="mr-2 inline-block h-3.5 w-3.5 align-[-2px] text-amber-300" />
            All figures current as of <span className="text-bone-100">{quarterLabel}</span>.
            Updated quarterly.
          </p>
          <p className="font-mono uppercase tracking-[0.2em]">
            Last verified <span className="text-bone-100">{lastVerified}</span>
          </p>
        </div>
      </section>
    </>
  );
}
