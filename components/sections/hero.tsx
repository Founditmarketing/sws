"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CtaButton } from "@/components/brand/cta-button";
import { SiteReveal } from "@/components/ui/site-reveal";
import { siteConfig } from "@/lib/site";
import { compactNumber } from "@/lib/utils";

/** Reliable remote backdrop when `/public/hero/*` assets are absent (CDN + next.config remotePatterns). */
const HERO_BACKDROP =
  "/newsiteworkpics/siteworkprojectpic8.jpeg";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Background parallax: moves down slightly slower than the scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  // Content fade and slight upward move
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.7], ["0px", "-50px"]);

  const s = siteConfig.stats;
  const heroStats: { k: string; v: string; caption?: string }[] = [
    { k: "Years self-performing", v: `${s.yearsInBusiness}+` },
    {
      k: "Cubic Yards Moved",
      v: `${compactNumber(s.cubicYardsMoved)}+`,
      caption: "Lifetime - since 2017",
    },
    { k: "Coverage Radius", v: `${s.coverageRadiusMiles} mi` },
    { k: "Safety EMR", v: s.safetyEMR.toFixed(2) },
  ];

  return (
    <section ref={containerRef} className="relative isolate overflow-hidden border-b border-bone-100/10 bg-graphite-950">
      <motion.div aria-hidden className="absolute inset-0 -z-10" style={{ y: backgroundY }}>
        <motion.div 
          className="absolute inset-0 -top-[6%] -bottom-[6%]"
          initial={{ scale: 1 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        >
          <Image
            src={HERO_BACKDROP}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,transparent_0%,rgba(6,7,9,0.45)_55%,rgba(6,7,9,0.85)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-graphite-950/55 via-graphite-950/30 to-graphite-950" />

        {/* Round 2 audit fix #2: white sub-headline still fought bright patches of the
            crew/rebar photo. Heavier left-third scrim, layered ON TOP of the existing
            radial+vertical scrim, so the text column always reads against any photo
            while the right side stays crisp where the iron is the visual payoff. */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.4)_30%,rgba(0,0,0,0.15)_60%,transparent_100%)]" />



        <div className="absolute inset-0 grid-noise opacity-[0.06]" />

        <div className="absolute left-0 top-1/3 h-[40vh] w-px bg-gradient-to-b from-transparent via-amber-300/40 to-transparent" />
      </motion.div>

      <SiteReveal>
        <motion.div 
          className="container-page relative z-10 flex min-h-[88vh] flex-col justify-end pb-6 pt-20 sm:pt-32 md:min-h-screen md:pb-10 md:pt-40"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <Link
            href="#safety"
            className="group mb-4 inline-flex w-fit items-center gap-3 border border-bone-100/15 bg-graphite-900/60 px-3 py-1.5 backdrop-blur-sm transition-colors hover:border-amber-300/60 focus-visible:border-amber-300 focus-visible:outline-none md:mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="motion-reduce:hidden absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-300" />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-bone-100 transition-colors group-hover:text-amber-100 sm:text-[11px] sm:tracking-[0.18em]">
              <span className="sm:hidden">Licensed &amp; Insured</span>
              <span className="hidden sm:inline">Licensed - Insured - Self-Performing</span>
            </span>
            <ArrowRight
              className="h-3 w-3 text-amber-300 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={2.6}
            />
          </Link>

          {/* Round 5 audit fix #1: at lg+ the previous clamp(4.5rem,8vw,8rem) was
              so large the H1 always wrapped to 3 lines and "commercial" orphaned
              on its own line. Tightening to clamp(3.5rem,5.5vw,5.75rem) plus a
              max-w-[18ch] cap forces the intentional 2-line wrap:
                "We move earth at"
                "commercial scale."
              so the amber underline visually anchors the word it underlines. */}
          <h1 className="font-display text-balance text-[clamp(2rem,5.4vw+1.05rem,3rem)] font-extrabold leading-[1.02] tracking-tight text-bone-100 sm:text-5xl sm:leading-[0.98] md:text-7xl md:leading-[0.95] lg:max-w-[18ch] lg:text-[clamp(3.5rem,5.5vw,5.75rem)] lg:leading-[0.95] xl:text-[clamp(4rem,5.2vw,6.25rem)]">
            <span className="block">
              We move earth at{" "}
              <span className="relative inline-block">
                <span className="text-amber-300">commercial</span>
                <span
                  aria-hidden
                  className="absolute -bottom-[0.05em] left-0 right-0 h-[0.09em] rounded-full bg-amber-300"
                />
              </span>{" "}
              scale.
            </span>
          </h1>

          <div>
            <div className="mt-4 max-w-2xl md:mt-6">
              <p className="text-pretty text-sm leading-snug text-bone-200 md:text-lg md:leading-relaxed md:text-graphite-300">
                Sitework Specialist is Central Louisiana&apos;s commercial site work contractor. Mass
                excavation, grading, land clearing, and complete pad sites, delivered on schedule for
                general contractors, owners, and industrial operators.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-1 items-center gap-2 md:mt-10 md:flex md:flex-wrap md:gap-4">
              <CtaButton href="/rfq" size="md" className="md:size-lg hidden w-full justify-center md:flex md:h-14 md:w-auto md:px-8 md:text-sm">
                Request a Quote
              </CtaButton>
              <CtaButton
                href="/projects"
                variant="ghost"
                size="md"
                showArrow={false}
                className="w-full justify-center md:h-14 md:w-auto md:px-8 md:text-sm"
              >
                See Projects
              </CtaButton>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 overflow-hidden sm:grid-cols-2 md:mt-16 md:grid-cols-4">
            {heroStats.map((stat, idx) => (
              <div
                key={stat.k}
                className={`flex min-w-0 flex-col gap-0.5 px-3 py-4 sm:px-5 sm:py-5 md:gap-1 border-bone-100/10 ${
                  idx % 2 !== 0 ? "border-l" : ""
                } ${idx > 1 ? "border-t md:border-t-0" : ""} ${
                  idx > 0 ? "md:border-l" : ""
                }`}
              >
                <span className="font-display text-xl font-extrabold leading-none tabular-nums text-bone-100 sm:text-3xl md:text-4xl">
                  {stat.v}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-graphite-300 sm:text-[10px] sm:tracking-[0.2em]">
                  {stat.k}
                </span>
                {stat.caption ? (
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-graphite-400 sm:text-[10px]">
                    {stat.caption}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </motion.div>

        <Link
          href="#capabilities"
          aria-label="Scroll to capabilities"
          className="absolute bottom-6 right-6 hidden h-12 w-12 items-center justify-center border border-bone-100/15 text-graphite-300 transition-colors hover:border-amber-300 focus-visible:border-amber-300 focus-visible:text-amber-300 focus-visible:outline-none hover:text-amber-300 md:inline-flex"
        >
          <ArrowDown className="h-4 w-4" />
        </Link>
      </SiteReveal>
    </section>
  );
}
