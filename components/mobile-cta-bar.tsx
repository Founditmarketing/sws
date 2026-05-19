"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { CtaButton } from "@/components/brand/cta-button";

/** Fixed thumb-friendly actions on narrow viewports only; hidden from sm breakpoint up. */
export function MobileCtaBar() {
  const pathname = usePathname();
  const [hideForCtaBand, setHideForCtaBand] = useState(false);

  // Suppress the bar on conversion pages where it would overlap the primary
  // submit affordance (the /rfq form's "Continue to scope" button) or where
  // it adds zero incremental value (already on the conversion page).
  const suppressOnPath =
    pathname?.startsWith("/rfq") ?? false;

  useEffect(() => {
    if (suppressOnPath) return;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-cta-band]"),
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((entry) => entry.isIntersecting);
        setHideForCtaBand(anyVisible);
      },
      { rootMargin: "-15% 0px -25% 0px", threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [suppressOnPath]);

  if (suppressOnPath) return null;

  return (
    <nav
      aria-label="Quick contact"
      aria-hidden={hideForCtaBand || undefined}
      className={[
        "fixed inset-x-0 bottom-0 z-40 border-t border-bone-100/10 bg-graphite-950/95 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md sm:hidden",
        "transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
        hideForCtaBand
          ? "pointer-events-none translate-y-full opacity-0"
          : "translate-y-0 opacity-100",
      ].join(" ")}
    >
      <div className="container-page flex gap-2">
        <a
          href={siteConfig.phoneHref}
          className="flex min-h-11 flex-1 items-center justify-center gap-2 border border-bone-100/15 bg-graphite-900/80 font-mono text-xs uppercase tracking-[0.18em] text-bone-100 transition-colors hover:border-amber-300/40 hover:text-amber-300"
        >
          <Phone className="h-4 w-4 text-amber-300" strokeWidth={2.5} />
          Call
        </a>
        <CtaButton href="/rfq" size="sm" className="min-h-11 flex-1 justify-center">
          Request Quote
        </CtaButton>
      </div>
    </nav>
  );
}
