import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { ArrowUpRight, Check } from "lucide-react";

import { markets, getMarket } from "@/lib/content/markets";
import { projects } from "@/lib/content/projects";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { CtaButton } from "@/components/brand/cta-button";

type Params = { slug: string };

export function generateStaticParams() {
  return markets.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = getMarket(slug);
  if (!m) return buildMetadata({ title: "Market", path: `/markets/${slug}` });
  return buildMetadata({
    title: m.title,
    description: m.description.slice(0, 180),
    path: `/markets/${m.slug}`,
    image: m.image,
  });
}

export default async function MarketDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const m = getMarket(slug);
  if (!m) notFound();

  const related = projects.filter((p) => p.marketSlug === m.slug);

  return (
    <>
      <Script
        id={`ld-bc-${m.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Markets", href: "/markets" },
              { name: m.title, href: `/markets/${m.slug}` },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Market"
        title={m.title}
        description={m.tagline}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Markets", href: "/markets" },
          { label: m.title },
        ]}
        image={m.image}
      >
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <CtaButton href="/rfq" size="lg">
            Talk to a project engineer
          </CtaButton>
          {related.length ? (
            <CtaButton
              href={`/projects/${related[0].slug}`}
              variant="ghost"
              size="lg"
              showArrow={false}
            >
              See a recent {m.title.toLowerCase()} case study
            </CtaButton>
          ) : null}
        </div>
      </PageHero>

      <section className="border-b border-bone-100/10 bg-graphite-950 py-20 md:py-24">
        <div className="container-page grid gap-16 lg:grid-cols-[7fr_5fr]">
          <div>
            <span className="heading-eyebrow">Where we fit</span>
            <p className="mt-4 text-pretty text-base leading-relaxed text-graphite-200 md:text-lg">
              {m.description}
            </p>
          </div>
          <div className="border-t border-bone-100/10 pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <span className="heading-eyebrow">Typical scopes</span>
            <ul className="mt-6 flex flex-col gap-3">
              {m.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-graphite-200">
                  <Check className="mt-1 h-4 w-4 flex-none text-amber-300" strokeWidth={2.5} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {m.clients?.length ? (
              <div className="mt-10">
                <span className="heading-eyebrow">Selected clients</span>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {m.clients.map((c) => (
                    <li
                      key={c}
                      className="inline-flex items-center border border-bone-100/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-graphite-200"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="border-b border-bone-100/10 bg-graphite-900 py-20 md:py-24">
          <div className="container-page">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="heading-eyebrow">Case studies</span>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-bone-100 md:text-4xl">
                  Recent work in this market
                </h2>
              </div>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-amber-300"
              >
                All projects
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden border border-bone-100/10"
                  >
                    <div
                      className="aspect-[16/10] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${p.hero}')` }}
                    />
                    <div className="flex flex-1 flex-col gap-2 bg-graphite-950 p-6">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-graphite-300">
                        {p.location} - {p.yearCompleted}
                      </span>
                      <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-bone-100">
                        {p.title}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand
        eyebrow={m.title}
        title="Ready to talk pre-construction? We'll bring a real number."
      />
    </>
  );
}
