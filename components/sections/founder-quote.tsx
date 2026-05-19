import Image from "next/image";

import { founderQuoteBackground } from "@/lib/homepage-images";

export function FounderQuote() {
  return (
    <section
      aria-labelledby="founder-quote-heading"
      className="relative isolate w-full overflow-hidden border-b border-bone-100/10 bg-graphite-950"
    >
      <div className="relative h-[50vh] min-h-[360px] w-full overflow-hidden md:h-[70vh] md:min-h-[480px]">
        <div className="absolute inset-0 animate-ken-burns">
          <Image
            src={founderQuoteBackground}
            alt=""
            fill
            priority={false}
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-graphite-950/85 via-graphite-950/60 to-graphite-950/90"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,transparent_30%,rgba(0,0,0,0.55)_100%)]"
        />

        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <figure className="mx-auto flex max-w-[720px] flex-col items-center gap-6 text-center md:gap-8">
            <span
              aria-hidden
              className="inline-block h-px w-12 bg-amber-300"
            />
            <blockquote
              id="founder-quote-heading"
              className="font-display text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-bone-100 md:text-5xl lg:text-6xl"
            >
              <span aria-hidden className="text-amber-300">&ldquo;</span>
              On schedule is the only schedule that matters.
              <span aria-hidden className="text-amber-300">&rdquo;</span>
            </blockquote>
            <figcaption className="flex flex-col items-center gap-3">
              {/* TODO(client-photoshoot): Replace with a real Joe Burns
                  headshot once the half-day shoot lands. See README open
                  items #3. The initials fallback ships a recognizable token
                  in the meantime instead of an empty hole. */}
              <span
                aria-hidden
                className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-amber-300/50 bg-graphite-900 font-display text-base font-extrabold tracking-wider text-amber-300 shadow-[0_0_0_4px_rgba(6,7,9,0.85)]"
              >
                JB
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-amber-300">
                Joe Burns
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite-300">
                Founder &middot; Sitework Specialist
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
