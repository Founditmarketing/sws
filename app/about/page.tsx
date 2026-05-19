import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { SafetyBand } from "@/components/sections/safety-band";
import { CoverageMap } from "@/components/sections/coverage-map";
import { CtaBand } from "@/components/sections/cta-band";
import { ByTheNumbers } from "@/components/sections/by-the-numbers";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Sitework Specialist LLC - a Central Louisiana commercial site work contractor based in Alexandria, with yards in Pineville, Jonesville, and Natchez. Eight years self-performing earthwork.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Eight years moving earth in Central Louisiana - on schedule."
        description="We started as a dirt-and-dozer outfit and grew into the region's go-to commercial site work contractor. The work didn't change. The scale did."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section className="border-b border-bone-100/10 bg-graphite-950 py-20 md:py-24">
        <div className="container-page grid gap-16 lg:grid-cols-[7fr_5fr]">
          <div className="space-y-6">
            <span className="heading-eyebrow">Our story</span>
            <p className="text-pretty text-lg leading-relaxed text-graphite-200">
              Sitework Specialist LLC was founded to do one thing well: deliver clean, accurate earthwork
              for commercial and industrial owners across Central Louisiana. We grew by saying yes to the
              hard schedules and no to the work we couldn't self-perform.
            </p>
            <p className="text-pretty text-base leading-relaxed text-graphite-300">
              Today we run four yards across Central Louisiana, a self-owned heavy equipment spread,
              and crews that have been together for years. Our clients are owners, EPCs, general
              contractors, parishes, and operators who measure us on three things: did we beat the
              schedule, did we keep the site clean, and did we keep our people safe. We try to make those
              questions boring to answer.
            </p>
            <p className="text-pretty text-base leading-relaxed text-graphite-300">
              We're licensed and insured to the limits major industrial owners require, bonded for
              single-project capacity in the eight-figure range, and OSHA-trained at the foreman and
              superintendent level. The credentials your prequalification team needs are on file and
              current.
            </p>
          </div>

          <div className="border-t border-bone-100/10 pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <span className="heading-eyebrow">Yards</span>
            <ul className="mt-6 flex flex-col gap-5 text-sm">
              {siteConfig.offices.map((o) => (
                <li
                  key={o.cityState}
                  className="border-b border-bone-100/10 pb-5 last:border-b-0 last:pb-0"
                >
                  <span className="block font-display text-lg font-bold text-bone-100">
                    {o.city}
                    {o.label ? (
                      <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">
                        {o.label}
                      </span>
                    ) : null}
                  </span>
                  <span className="block text-graphite-300">{o.address}</span>
                  <span className="block text-graphite-300">{o.cityState}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 border border-amber-300/30 bg-amber-300/5 p-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-300">
                Talk to a person
              </span>
              <p className="mt-2 text-bone-100">
                <a href={siteConfig.phoneHref} className="font-display text-2xl font-bold">
                  {siteConfig.phone}
                </a>
              </p>
              <p className="mt-1">
                <a
                  href={`mailto:${siteConfig.inquiryEmail}`}
                  className="text-amber-300 transition-colors hover:text-amber-200"
                >
                  {siteConfig.inquiryEmail}
                </a>
              </p>
              <p className="mt-3 text-xs text-graphite-300">
                {siteConfig.responseSlaHours}-hour response, business days.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-bone-100/10 bg-graphite-950 py-20 md:py-24">
        <div className="container-page">
          <span className="heading-eyebrow">Credentials</span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-bone-100 md:text-4xl">
            State Licenses
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-xl font-bold text-bone-100">Commercial License</h3>
              <embed
                src="/licenses/newbuildingconstructionlicense.PDF#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                type="application/pdf"
                className="w-full aspect-[1.3] border border-bone-100/10 bg-white"
                title="Building Construction License"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-xl font-bold text-bone-100">Residential License</h3>
              <embed
                src="/licenses/newresidentiallicense.PDF#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                type="application/pdf"
                className="w-full aspect-[1.3] border border-bone-100/10 bg-white"
                title="Residential License"
              />
            </div>
          </div>
        </div>
      </section>

      <ByTheNumbers />
      <SafetyBand />
      <CoverageMap />

      <CtaBand
        eyebrow="Want a sit-down?"
        title="Bring your project. We'll bring our project executive and a real number."
      />
    </>
  );
}
