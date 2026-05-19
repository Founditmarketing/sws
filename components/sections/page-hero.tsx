import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SiteReveal } from "@/components/ui/site-reveal";

export function PageHero({
  title,
  description,
  breadcrumbs,
  image,
  align = "left",
  children,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  image?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden border-b border-bone-100/10 bg-graphite-950 pb-16 pt-32 md:pb-20 md:pt-40",
        className,
      )}
    >
      {image ? (
        <>
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-cover bg-center"
            style={{ backgroundImage: `url('${image}')` }}
          />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_55%,transparent_0%,rgba(6,7,9,0.45)_55%,rgba(6,7,9,0.85)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-graphite-950/65 via-graphite-950/40 to-graphite-950" />
        </>
      ) : null}
      <div aria-hidden className="absolute inset-0 -z-10 grid-noise opacity-[0.05]" />

      <SiteReveal>
        <div className="container-page relative">
          {breadcrumbs?.length ? (
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-graphite-300"
            >
              {breadcrumbs.map((b, i) => (
                <span key={`${b.label}-${i}`} className="inline-flex items-center gap-2">
                  {b.href ? (
                    <Link href={b.href} className="transition-colors hover:text-amber-300">
                      {b.label}
                    </Link>
                  ) : (
                    <span className="text-amber-300">{b.label}</span>
                  )}
                  {i < breadcrumbs.length - 1 ? (
                    <ChevronRight className="h-3 w-3 text-graphite-300/60" />
                  ) : null}
                </span>
              ))}
            </nav>
          ) : null}

          <div
            className={cn(
              "flex flex-col gap-6",
              align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-4xl",
            )}
          >

            <h1 className="font-display text-balance text-5xl font-extrabold leading-[1.02] tracking-tight text-bone-100 md:text-6xl lg:text-7xl">
              {title}
            </h1>
            {description ? (
              <p className="text-pretty text-base leading-relaxed text-graphite-300 md:text-lg">
                {description}
              </p>
            ) : null}
            {children}
          </div>
        </div>
      </SiteReveal>
    </section>
  );
}
