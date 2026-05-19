"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";
import { CtaButton } from "@/components/brand/cta-button";
import { SiteReveal } from "@/components/ui/site-reveal";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background,backdrop-filter,border-color] duration-300",
        scrolled || open
          ? "border-b border-bone-100/10 bg-graphite-950/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <SiteReveal>
        <div className="w-full px-5 md:px-8 flex h-16 items-center justify-between gap-6 md:h-20">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {siteConfig.nav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium tracking-wide transition-colors",
                    active ? "text-bone-100" : "text-graphite-300 hover:text-bone-100",
                  )}
                >
                  {item.label}
                  {active ? (
                    <span
                      aria-hidden
                      className="absolute inset-x-3 -bottom-px h-px bg-amber-300"
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Round 5 audit fix #5: phone is now a real tap target on every
                viewport — 44x44 minimum on mobile (icon-only), full label on
                md+. Amber hover/focus + clear focus ring keep it visibly
                interactive but subordinate to the primary CTA. */}
            <a
              href={siteConfig.phoneHref}
              data-cta="header-phone"
              aria-label={`Call ${siteConfig.phone}`}
              title={`Call ${siteConfig.phone}`}
              className="group inline-flex h-11 min-w-11 items-center justify-center gap-2 px-2 text-sm text-graphite-200 transition-colors hover:text-amber-300 focus-visible:text-amber-300 md:h-10 md:px-3"
            >
              <Phone
                className="h-4 w-4 transition-colors group-hover:text-amber-300"
                strokeWidth={2.5}
              />
              <span className="hidden font-mono tabular-nums md:inline">
                {siteConfig.phone}
              </span>
            </a>
            <CtaButton href="/rfq" size="sm" className="hidden md:inline-flex">
              Request a Quote
            </CtaButton>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center text-bone-100 lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </SiteReveal>

      <div
        className={cn(
          "lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="border-t border-bone-100/10 bg-graphite-950/95 backdrop-blur-md">
          <div className="w-full px-5 md:px-8 flex flex-col py-6">
            {siteConfig.nav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "border-b border-bone-100/5 py-4 font-display text-2xl font-bold tracking-tight",
                    active ? "text-amber-300" : "text-bone-100",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-6 flex flex-col gap-3">
              <CtaButton href="/rfq" size="lg">
                Request a Quote
              </CtaButton>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center justify-center gap-2 py-3 text-graphite-300"
              >
                <Phone className="h-4 w-4" />
                <span className="font-mono tabular-nums">{siteConfig.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
