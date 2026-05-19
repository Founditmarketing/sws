import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "404 - Sitework Specialist",
  description:
    "The page you're looking for doesn't exist. Try the home page, our capabilities, or send us your project.",
  robots: { index: false, follow: false },
};

const suggestions = [
  {
    label: "Back to home",
    href: "/",
    eyebrow: "Start over",
  },
  {
    label: "See our capabilities",
    href: "/capabilities",
    eyebrow: "Twelve scopes",
  },
  {
    label: "Talk to an estimator",
    href: "/rfq",
    eyebrow: "24-hour response",
  },
] as const;

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden border-b border-bone-100/10 bg-graphite-950">
      <div aria-hidden className="absolute inset-0 grid-noise opacity-[0.05]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-12 top-1/3 h-[40vh] w-px bg-gradient-to-b from-transparent via-amber-300/40 to-transparent"
      />

      <div className="container-page relative flex min-h-[70vh] flex-col justify-center py-24 md:py-32">
        <span className="heading-eyebrow inline-flex items-center gap-3">
          <span aria-hidden className="inline-block h-px w-6 bg-amber-300" />
          404 - Page not found
        </span>

        <h1 className="mt-6 max-w-4xl font-display text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-bone-100 md:text-6xl lg:text-7xl">
          Looks like this site hasn&apos;t been graded yet.
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-graphite-200 md:text-lg">
          The page you&apos;re looking for doesn&apos;t exist. Maybe you meant one of these:
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-bone-100/10 bg-bone-100/10 md:grid-cols-3">
          {suggestions.map((s) => (
            <li key={s.href} className="bg-graphite-950">
              <Link
                href={s.href}
                className="group relative flex h-full flex-col justify-between gap-10 px-6 py-8 transition-colors hover:bg-graphite-900/60 md:px-8 md:py-10"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300">
                  {s.eyebrow}
                </span>
                <span className="flex items-end justify-between gap-4">
                  <span className="font-display text-2xl font-bold leading-tight text-bone-100 md:text-3xl">
                    {s.label}
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 flex-none text-graphite-300 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-300"
                    strokeWidth={2}
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-2xl text-sm text-graphite-300">
          Or call a project engineer directly at{" "}
          <a
            href={siteConfig.phoneHref}
            className="font-mono tabular-nums text-amber-300 transition-colors hover:text-amber-200"
          >
            {siteConfig.phone}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
