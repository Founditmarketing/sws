import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { ArrowUpRight, Check } from "lucide-react";

import { capabilities, getCapability } from "@/lib/content/capabilities";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { CapabilityIcon } from "@/components/sections/capability-icon";
import { CtaButton } from "@/components/brand/cta-button";

type Params = { slug: string };

export function generateStaticParams() {
  return capabilities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cap = getCapability(slug);
  if (!cap) return buildMetadata({ title: "Capability", path: `/capabilities/${slug}` });
  return buildMetadata({
    title: cap.title,
    description: `${cap.outcome} ${cap.description}`.slice(0, 180),
    path: `/capabilities/${cap.slug}`,
  });
}

export default async function CapabilityDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const cap = getCapability(slug);
  if (!cap) notFound();

  const related = capabilities.filter((c) => c.category === cap.category && c.slug !== cap.slug).slice(0, 3);

  return (
    <>
      <Script
        id={`ld-bc-${cap.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Capabilities", href: "/capabilities" },
              { name: cap.title, href: `/capabilities/${cap.slug}` },
            ]),
          ),
        }}
      />
      <Script
        id={`ld-svc-${cap.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: cap.title,
              description: cap.description,
              slug: cap.slug,
            }),
          ),
        }}
      />
      {cap.faqs.length ? (
        <Script
          id={`ld-faq-${cap.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd(cap.faqs)),
          }}
        />
      ) : null}

      <PageHero
        image={cap.image}
        eyebrow={cap.category}
        title={cap.title}
        description={cap.outcome}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Capabilities", href: "/capabilities" },
          { label: cap.title },
        ]}
      >
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <CtaButton href="/rfq" size="lg">
            Request a Quote
          </CtaButton>
          <CtaButton href="/projects" variant="ghost" size="lg" showArrow={false}>
            See related projects
          </CtaButton>
        </div>
      </PageHero>

      <section className="border-b border-bone-100/10 bg-graphite-950 py-20 md:py-24">
        <div className="container-page grid gap-16 lg:grid-cols-[7fr_5fr]">
          <div className="space-y-6">
            <span className="heading-eyebrow">Overview</span>
            <p className="text-pretty text-base leading-relaxed text-graphite-200 md:text-lg">
              {cap.description}
            </p>
            <div className="flex h-12 w-12 items-center justify-center border border-bone-100/15 text-amber-300">
              <CapabilityIcon name={cap.icon} className="h-7 w-7" />
            </div>
          </div>
          <div className="border-t border-bone-100/10 pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <span className="heading-eyebrow">Scope of work</span>
            <ul className="mt-6 flex flex-col gap-3">
              {cap.scope.map((s) => (
                <li key={s} className="flex items-start gap-3 text-graphite-200">
                  <Check className="mt-1 h-4 w-4 flex-none text-amber-300" strokeWidth={2.5} />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {cap.faqs.length ? (
        <section className="border-b border-bone-100/10 bg-graphite-900 py-20 md:py-24">
          <div className="container-page">
            <span className="heading-eyebrow">FAQ</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-bone-100 md:text-4xl">
              Common questions
            </h2>
            <ul className="mt-12 grid gap-px overflow-hidden border border-bone-100/10 bg-bone-100/10">
              {cap.faqs.map((f) => (
                <li key={f.question} className="bg-graphite-950 p-8">
                  <h3 className="font-display text-lg font-bold text-bone-100">
                    {f.question}
                  </h3>
                  <p className="mt-3 text-graphite-300">{f.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="border-b border-bone-100/10 bg-graphite-950 py-20 md:py-24">
          <div className="container-page">
            <span className="heading-eyebrow">Related capabilities</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-bone-100 md:text-4xl">
              Often delivered together
            </h2>
            <ul className="mt-10 grid gap-px overflow-hidden border border-bone-100/10 bg-bone-100/10 sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/capabilities/${r.slug}`}
                    className="group flex h-full flex-col gap-3 bg-graphite-950 p-6 transition-colors hover:bg-graphite-900"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-10 w-10 items-center justify-center border border-bone-100/15 text-amber-300">
                        <CapabilityIcon name={r.icon} className="h-5 w-5" />
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-graphite-300 group-hover:text-amber-300" />
                    </div>
                    <h3 className="font-display text-lg font-bold tracking-tight text-bone-100">
                      {r.title}
                    </h3>
                    <p className="text-sm text-graphite-300">{r.outcome}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand
        eyebrow="Real numbers, not guesses"
        title={`Need a price on ${cap.title.toLowerCase()}? Send us the plans.`}
      />
    </>
  );
}
