import { CtaButton } from "@/components/brand/cta-button";

export function CtaBand({
  eyebrow = "Ready to break ground?",
  title = "Send us your plans. We'll have a number on your desk in 48 hours.",
  description = "Project-ready sales engineers. Real numbers, real schedule, no fluff.",
  primaryHref = "/rfq",
  primaryLabel = "Request a Quote",
  secondaryHref = "/projects",
  secondaryLabel = "See projects",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section
      aria-labelledby="cta-heading"
      data-cta-band
      className="relative isolate overflow-hidden bg-graphite-950 py-20 md:py-32"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(6,7,9,0.7) 0%, rgba(6,7,9,0.95) 100%), url('/newsiteworkpics/siteworkprojectpic9.JPG')",
        }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 grid-noise opacity-[0.06]" />
      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="heading-eyebrow inline-flex items-center gap-3">
            <span className="inline-block h-px w-6 bg-amber-300" aria-hidden />
            {eyebrow}
          </span>
          <h2
            id="cta-heading"
            className="mt-6 font-display text-balance text-[clamp(1.75rem,5.5vw+0.4rem,2.25rem)] font-extrabold leading-[1.1] tracking-tight text-bone-100 md:text-5xl md:leading-[1.05] lg:text-6xl"
          >
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-graphite-300 md:mt-6 md:text-lg">
            {description}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <CtaButton href={primaryHref} size="lg">
              {primaryLabel}
            </CtaButton>
            <CtaButton href={secondaryHref} variant="ghost" size="lg" showArrow={false}>
              {secondaryLabel}
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
