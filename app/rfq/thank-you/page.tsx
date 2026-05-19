import type { Metadata } from "next";
import { CheckCircle2, Phone, Mail } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { CtaButton } from "@/components/brand/cta-button";

export const metadata: Metadata = buildMetadata({
  title: "Quote Request Received",
  description: "Thanks for reaching out - your project request has landed with our estimating team.",
  path: "/rfq/thank-you",
  noindex: true,
});

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;

  return (
    <section className="relative isolate overflow-hidden bg-graphite-950 pb-24 pt-32 md:pt-40">
      <div aria-hidden className="absolute inset-0 -z-10 grid-noise opacity-[0.06]" />
      <div className="container-page">
        <div className="mx-auto max-w-3xl border border-bone-100/10 bg-graphite-900/40 p-8 md:p-14">
          <span className="inline-flex items-center gap-3 border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-amber-300">
            <CheckCircle2 className="h-4 w-4" /> Quote request received
          </span>
          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-bone-100 md:text-5xl">
            Thanks - we've got it.
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-graphite-200 md:text-lg">
            A project engineer will review your scope and reply inside{" "}
            {siteConfig.responseSlaHours} hours, business days. If anything is urgent, call the
            number below and ask for the estimating desk.
          </p>

          {ref ? (
            <div className="mt-8 border border-bone-100/15 bg-graphite-950 p-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
                Reference number
              </span>
              <p className="mt-2 font-mono text-2xl font-bold tracking-[0.1em] text-amber-300">
                {ref}
              </p>
              <p className="mt-2 text-xs text-graphite-300">
                Save this number for any follow-up.
              </p>
            </div>
          ) : null}

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <a
              href={siteConfig.phoneHref}
              className="group flex items-center gap-4 border border-bone-100/15 bg-graphite-950 p-5 transition-colors hover:border-amber-300/60"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center border border-amber-300/40 text-amber-300">
                <Phone className="h-4 w-4" />
              </span>
              <span>
                <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
                  Call us
                </span>
                <span className="block font-display text-lg font-bold text-bone-100">
                  {siteConfig.phone}
                </span>
              </span>
            </a>
            <a
              href={`mailto:${siteConfig.inquiryEmail}`}
              className="group flex items-center gap-4 border border-bone-100/15 bg-graphite-950 p-5 transition-colors hover:border-amber-300/60"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center border border-amber-300/40 text-amber-300">
                <Mail className="h-4 w-4" />
              </span>
              <span>
                <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
                  Email us
                </span>
                <span className="block font-display text-base font-bold text-bone-100">
                  {siteConfig.inquiryEmail}
                </span>
              </span>
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <CtaButton href="/" variant="ghost" size="md" showArrow={false}>
              Back to home
            </CtaButton>
            <CtaButton href="/projects" variant="outline" size="md">
              See projects
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
