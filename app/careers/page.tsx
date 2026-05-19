import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { CtaButton } from "@/components/brand/cta-button";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description:
    "Heavy equipment operators, foremen, project managers, and CDL drivers - hiring across Central Louisiana. Strong wages, benefits, year-round work.",
  path: "/careers",
});

const openings = [
  {
    title: "Heavy Equipment Operator - Dozer",
    location: "Alexandria, LA",
    type: "Full-time",
    summary:
      "D6/D8/D9 dozer operator for production earthwork on commercial pads. GPS experience preferred, not required. Year-round work.",
  },
  {
    title: "Heavy Equipment Operator - Excavator",
    location: "Alexandria, LA",
    type: "Full-time",
    summary:
      "30-85 ton excavator operator for mass excavation, drainage, and demo. Three+ years on commercial sites preferred.",
  },
  {
    title: "Site Foreman",
    location: "Central Louisiana - travels",
    type: "Full-time",
    summary:
      "Lead production crews on commercial site work projects. OSHA-30, GPS layout literacy, and proven schedule track record.",
  },
  {
    title: "Project Manager - Commercial Site Work",
    location: "Alexandria, LA",
    type: "Full-time",
    summary:
      "Manage commercial site work projects from preconstruction through closeout. 5+ years estimating + PM. Construction degree preferred.",
  },
  {
    title: "CDL Driver - Off-road Haul",
    location: "Central Louisiana",
    type: "Full-time",
    summary:
      "Articulated truck and tandem haul operators. Class A CDL preferred, off-road haul experience required.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        image="/newsiteworkpics/siteworkprojectpic3.JPEG"
        eyebrow="Careers"
        title="If you can run it, we have a seat for you."
        description="We're always looking for operators, foremen, and field hands who know how to move dirt safely and efficiently."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      >
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <CtaButton href={`mailto:${siteConfig.inquiryEmail}?subject=Careers%20Application`} size="lg">
            Send Us Your Resume
          </CtaButton>
          <a
            href={siteConfig.phoneHref}
            className="font-mono text-xs uppercase tracking-[0.2em] text-graphite-200"
          >
            Or call {siteConfig.phone}
          </a>
        </div>
      </PageHero>

      <section className="border-b border-bone-100/10 bg-graphite-950 py-16 md:py-20">
        <div className="container-page">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-display text-3xl font-bold tracking-tight text-bone-100">
              Open positions
            </h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
              {openings.length} listings
            </span>
          </div>

          <ul className="grid gap-px overflow-hidden border border-bone-100/10 bg-bone-100/10">
            {openings.map((j) => (
              <li
                key={j.title}
                className="group flex flex-col gap-3 bg-graphite-950 p-6 md:flex-row md:items-center md:justify-between md:p-8"
              >
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-bone-100">
                    {j.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm text-graphite-300">{j.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
                    <span>{j.location}</span>
                    <span className="text-amber-300">{j.type}</span>
                  </div>
                </div>
                <a
                  href={`mailto:${siteConfig.inquiryEmail}?subject=Application%20-%20${encodeURIComponent(j.title)}`}
                  className="inline-flex items-center justify-center self-start border border-amber-300/60 px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-amber-300 transition-colors hover:bg-amber-300 hover:text-graphite-950 md:self-center"
                >
                  Apply
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-12 border border-bone-100/10 bg-graphite-900 p-8">
            <span className="heading-eyebrow">Don't see your role?</span>
            <h3 className="mt-2 font-display text-2xl font-bold text-bone-100">
              We're always interested in good people.
            </h3>
            <p className="mt-3 max-w-2xl text-graphite-300">
              Send a resume, a couple lines about what you've run, and where you'd like to be in five
              years. We'll write back.
            </p>
            <CtaButton
              href={`mailto:${siteConfig.inquiryEmail}?subject=Careers%20Inquiry`}
              size="md"
              className="mt-6"
            >
              Email Careers
            </CtaButton>
          </div>
        </div>
      </section>
    </>
  );
}
