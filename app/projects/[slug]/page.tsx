import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, ArrowUpRight, Quote } from "lucide-react";

import { projects, getProject } from "@/lib/content/projects";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { compactNumber, formatNumber } from "@/lib/utils";
import { CtaBand } from "@/components/sections/cta-band";
import { LightboxGallery } from "@/components/ui/lightbox-gallery";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return buildMetadata({ title: "Project", path: `/projects/${slug}` });
  return buildMetadata({
    title: p.title,
    description: p.summary,
    path: `/projects/${p.slug}`,
    image: p.hero,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const stats = [
    p.cubicYards
      ? { label: "Cubic Yards Moved", value: `${compactNumber(p.cubicYards)}` }
      : null,
    p.acres ? { label: "Acres", value: `${p.acres}` } : null,
    { label: "Days On Schedule", value: `${p.durationDays}` },
    { label: "Year Completed", value: `${p.yearCompleted}` },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      <Script
        id={`ld-bc-${p.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Projects", href: "/projects" },
              { name: p.title, href: `/projects/${p.slug}` },
            ]),
          ),
        }}
      />

      <section className="relative isolate overflow-hidden border-b border-bone-100/10">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(6,7,9,0.5) 0%, rgba(6,7,9,0.85) 60%, rgba(6,7,9,1) 100%), url('${p.hero}')`,
          }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 grid-noise opacity-[0.05]" />

        <div className="container-page relative flex min-h-[80vh] flex-col justify-end pb-16 pt-32 md:pb-20 md:pt-40">
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-amber-300"
          >
            <ArrowLeft className="h-3 w-3" /> All projects
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Link
              href={`/markets/${p.marketSlug}`}
              className="inline-flex items-center gap-2 border border-amber-300/40 bg-amber-300/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300 transition-colors hover:bg-amber-300/15"
            >
              {p.market}
            </Link>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
              {p.location}
            </span>
          </div>

          <h1 className="max-w-5xl font-display text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-bone-100 md:text-6xl lg:text-7xl">
            {p.title}
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-base leading-relaxed text-graphite-200 md:text-lg">
            {p.summary}
          </p>

          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden border-y border-bone-100/15 bg-bone-100/15 md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-1 bg-graphite-950 px-5 py-5"
              >
                <span className="font-display text-3xl font-extrabold leading-none text-bone-100 md:text-4xl">
                  {s.value}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite-300">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-bone-100/10 bg-graphite-950 py-20 md:py-24">
        <div className="container-page grid gap-16 lg:grid-cols-[7fr_5fr]">
          <div className="space-y-6 prose-invert">
            <span className="heading-eyebrow">Project narrative</span>
            {p.body.map((para, i) => (
              <p
                key={i}
                className="text-pretty text-base leading-relaxed text-graphite-200 md:text-lg"
              >
                {para}
              </p>
            ))}
          </div>
          <div className="border-t border-bone-100/10 pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <span className="heading-eyebrow">Scope</span>
            <ul className="mt-6 flex flex-col gap-3">
              {p.scope.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-3 border-b border-bone-100/10 pb-3 text-graphite-200"
                >
                  <span className="mt-2 h-1.5 w-1.5 flex-none bg-amber-300" aria-hidden />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-10 grid grid-cols-2 gap-y-6">
              {p.client ? (
                <Detail label="Client" value={p.client} />
              ) : null}
              {p.generalContractor ? (
                <Detail label="GC" value={p.generalContractor} />
              ) : null}
              <Detail label="Location" value={p.location} />
              <Detail label="Year" value={`${p.yearCompleted}`} />
              {p.cubicYards ? (
                <Detail label="Earthwork" value={`${formatNumber(p.cubicYards)} CY`} />
              ) : null}
              {p.acres ? (
                <Detail label="Site Area" value={`${p.acres} acres`} />
              ) : null}
            </dl>
          </div>
        </div>
      </section>

      {p.testimonial ? (
        <section className="border-b border-bone-100/10 bg-graphite-900 py-20 md:py-24">
          <div className="container-page max-w-4xl">
            <Quote className="h-10 w-10 text-amber-300" strokeWidth={1.5} />
            <blockquote className="mt-6 font-display text-balance text-2xl font-semibold leading-snug text-bone-100 md:text-3xl">
              &ldquo;{p.testimonial.quote}&rdquo;
            </blockquote>
            <footer className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
              {p.testimonial.author}
              {p.testimonial.title ? ` - ${p.testimonial.title}` : ""}
            </footer>
          </div>
        </section>
      ) : null}

      {p.gallery.length ? (
        <section className="border-b border-bone-100/10 bg-graphite-950 py-20 md:py-24">
          <div className="container-page">
            <span className="heading-eyebrow">Site photography</span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-bone-100 md:text-4xl">
              From the field
            </h2>
            <LightboxGallery
              images={p.gallery}
              altPrefix={`${p.title} - photo`}
            />
          </div>
        </section>
      ) : null}

      <section className="border-b border-bone-100/10 bg-graphite-900 py-16">
        <div className="container-page flex flex-wrap items-center justify-between gap-6">
          <div>
            <span className="heading-eyebrow">Up next</span>
            <p className="mt-2 font-display text-xl font-bold text-bone-100">
              See more projects in this market
            </p>
          </div>
          <Link
            href={`/markets/${p.marketSlug}`}
            className="group inline-flex items-center gap-2 border border-amber-300/60 px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-amber-300 transition-colors hover:bg-amber-300 hover:text-graphite-950"
          >
            {p.market} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <CtaBand
        eyebrow="Got something similar?"
        title="Send your scope. We'll respond inside 24 hours."
      />
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite-300">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-bone-100">{value}</dd>
    </div>
  );
}
