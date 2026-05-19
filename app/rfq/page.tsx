import type { Metadata } from "next";
import { Clock, ShieldCheck, Mail } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { RfqForm } from "@/components/rfq/rfq-form";

export const metadata: Metadata = buildMetadata({
  title: "Request a Quote",
  description:
    "Send us your project. Mass excavation, grading, land clearing, pad sites - quoted by a real estimator inside 24 hours.",
  path: "/rfq",
});

export default function RfqPage() {
  return (
    <>
      <PageHero
        image="/newsiteworkpics/siteworkprojectpic10.jpeg"
        eyebrow="Request a Quote"
        title="Send us your project. We'll respond inside 24 hours."
        description="Four short steps. Your data is encrypted in transit and only goes to our project engineers."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Request a Quote" }]}
      />

      <section className="border-b border-bone-100/10 bg-graphite-950 py-16 md:py-20">
        <div className="container-page grid items-start gap-12 lg:grid-cols-[7fr_4fr]">
          <RfqForm />

          <aside className="flex flex-col gap-6 border border-bone-100/10 bg-graphite-900/40 p-6 md:p-8">
            <div>
              <span className="heading-eyebrow">What happens next</span>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-bone-100">
                Real human, real number, real fast.
              </h2>
            </div>
            <ul className="flex flex-col gap-5 text-sm">
              <li className="flex items-start gap-3 text-graphite-200">
                <span className="mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center border border-amber-300/40 text-amber-300">
                  <Clock className="h-4 w-4" />
                </span>
                <span>
                  <span className="block font-display text-base font-bold text-bone-100">
                    Within 24 hours
                  </span>
                  <span className="text-graphite-300">
                    A project engineer reviews and confirms scope.
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3 text-graphite-200">
                <span className="mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center border border-amber-300/40 text-amber-300">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <span>
                  <span className="block font-display text-base font-bold text-bone-100">
                    NDA on request
                  </span>
                  <span className="text-graphite-300">
                    We'll execute your prequal and NDA paperwork as part of intake.
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3 text-graphite-200">
                <span className="mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center border border-amber-300/40 text-amber-300">
                  <Mail className="h-4 w-4" />
                </span>
                <span>
                  <span className="block font-display text-base font-bold text-bone-100">
                    Numbered, dated proposal
                  </span>
                  <span className="text-graphite-300">
                    Standard turnaround of 3-7 business days for the full quote.
                  </span>
                </span>
              </li>
            </ul>

            <div className="border-t border-bone-100/10 pt-6 text-sm text-graphite-300">
              <p>
                Prefer email or phone?
                <br />
                <a
                  href={`mailto:${siteConfig.inquiryEmail}`}
                  className="text-amber-300 transition-colors hover:text-amber-200"
                >
                  {siteConfig.inquiryEmail}
                </a>
                <br />
                <a
                  href={siteConfig.phoneHref}
                  className="font-mono tabular-nums text-bone-100 transition-colors hover:text-amber-300"
                >
                  {siteConfig.phone}
                </a>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
