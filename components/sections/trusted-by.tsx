import { siteConfig } from "@/lib/site";

export function TrustedBy() {
  // Double the list to pair with the -50% translate keyframe so the marquee
  // loops seamlessly without a visible jump.
  const logos = [...siteConfig.trustedBy, ...siteConfig.trustedBy];

  return (
    <section
      aria-labelledby="trusted-heading"
      className="border-b border-bone-100/10 bg-graphite-950 py-3 md:py-4"
    >
      <h2 id="trusted-heading" className="sr-only">
        Selected by general contractors, owners &amp; industrial operators across Louisiana
      </h2>
      <div className="container-page">
        <div className="flex items-center gap-5 md:gap-6">
          <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.24em] text-graphite-400 md:inline">
            Selected by
          </span>
          <span className="hidden h-px w-8 shrink-0 bg-bone-100/15 md:inline-block" aria-hidden />
          <div className="relative min-w-0 flex-1 overflow-hidden mask-fade-x">
            <ul
              className="flex w-max animate-ticker gap-8 whitespace-nowrap text-graphite-300/80 motion-reduce:animate-none md:gap-10"
              aria-hidden
            >
              {logos.map((name, i) => (
                <li
                  key={`${name}-${i}`}
                  className="flex shrink-0 items-center gap-8 font-display text-sm font-bold uppercase tracking-[0.06em] text-graphite-300/80 sm:text-base md:gap-10 md:text-lg"
                >
                  <span>{name}</span>
                  <span className="text-graphite-300/30" aria-hidden>
                    /
                  </span>
                </li>
              ))}
            </ul>
            <ul className="sr-only">
              {siteConfig.trustedBy.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
