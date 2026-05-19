import Link from "next/link";
import { ChevronDown, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { Logo } from "@/components/brand/logo";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-bone-100/10 bg-graphite-950 text-graphite-300">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-noise opacity-[0.04]"
      />
      <div className="container-page relative">
        <div className="grid gap-12 py-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm text-pretty text-sm leading-relaxed text-graphite-300">
              {siteConfig.shortDescription}
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-3 text-bone-100 transition-colors hover:text-amber-300"
              >
                <Phone className="h-4 w-4" strokeWidth={2.5} />
                <span className="font-mono tabular-nums">{siteConfig.phone}</span>
              </a>
              <a
                href={`mailto:${siteConfig.inquiryEmail}`}
                className="inline-flex items-center gap-3 transition-colors hover:text-amber-300"
              >
                <Mail className="h-4 w-4" strokeWidth={2.5} />
                {siteConfig.inquiryEmail}
              </a>
            </div>
            <div className="mt-6 flex items-center gap-3">
              {siteConfig.social.linkedin ? (
                <a
                  href={siteConfig.social.linkedin}
                  aria-label="LinkedIn"
                  className="inline-flex h-9 w-9 items-center justify-center border border-bone-100/15 transition-colors hover:border-amber-300 hover:text-amber-300"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              ) : null}
              {siteConfig.social.facebook ? (
                <a
                  href={siteConfig.social.facebook}
                  aria-label="Facebook"
                  className="inline-flex h-9 w-9 items-center justify-center border border-bone-100/15 transition-colors hover:border-amber-300 hover:text-amber-300"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              ) : null}
              {siteConfig.social.instagram ? (
                <a
                  href={siteConfig.social.instagram}
                  aria-label="Instagram"
                  className="inline-flex h-9 w-9 items-center justify-center border border-bone-100/15 transition-colors hover:border-amber-300 hover:text-amber-300"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="heading-eyebrow mb-4">Capabilities</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {[
                ["Mass Excavation", "/capabilities/mass-excavation"],
                ["Grading", "/capabilities/grading"],
                ["Land Clearing", "/capabilities/land-clearing"],
                ["Pad Sites", "/capabilities/pad-sites"],
                ["Erosion Control", "/capabilities/erosion-control"],
                ["Retaining Structures", "/capabilities/retaining-structures"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-bone-100">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="heading-eyebrow mb-4">Company</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {[
                ["Markets", "/markets"],
                ["Projects", "/projects"],
                ["Fleet", "/fleet"],
                ["About", "/about"],
                ["Careers", "/careers"],
                ["Field notes", "/field-notes"],
                ["Request a Quote", "/rfq"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-bone-100">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="heading-eyebrow mb-4 mt-8">For procurement</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link
                  href="/prequalification"
                  className="transition-colors hover:text-bone-100"
                >
                  Prequalification
                </Link>
              </li>
              <li>
                <Link
                  href="/bidding"
                  className="transition-colors hover:text-bone-100"
                >
                  Bidding &amp; awards
                </Link>
              </li>
              <li>
                <a
                  href="/downloads/sitework-specialist-w9.pdf"
                  className="transition-colors hover:text-bone-100"
                >
                  W-9 (PDF)
                </a>
              </li>
              <li>
                <a
                  href="/downloads/sitework-specialist-capabilities.pdf"
                  className="transition-colors hover:text-bone-100"
                >
                  Capabilities (PDF)
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            {/* Desktop: always-expanded list */}
            <div className="hidden md:block">
              <h3 className="heading-eyebrow mb-4">Offices</h3>
              <OfficeList />
            </div>
            {/* Mobile: collapsible accordion */}
            <details className="group border-t border-bone-100/10 pt-4 md:hidden">
              <summary className="heading-eyebrow flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                <span>Offices ({siteConfig.offices.length})</span>
                <ChevronDown
                  className="h-4 w-4 text-amber-300 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                  strokeWidth={2.5}
                />
              </summary>
              <div className="mt-5">
                <OfficeList />
              </div>
            </details>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-start justify-between gap-4 border-t border-bone-100/10 py-6 text-xs text-graphite-300 md:mt-0 md:flex-row md:items-center">
          <p>
            &copy; {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-[0.2em]">
            Licensed &amp; Insured - Louisiana
          </p>
        </div>
      </div>
    </footer>
  );
}

function OfficeList() {
  return (
    <ul className="flex flex-col gap-4 text-sm">
      {siteConfig.offices.map((o) => (
        <li key={o.cityState} className="flex gap-3">
          <MapPin className="mt-0.5 h-4 w-4 flex-none text-amber-300" strokeWidth={2.5} />
          <span className="min-w-0">
            <span className="block font-medium text-bone-100">
              {o.city}
              {o.label ? (
                <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite-300">
                  {o.label}
                </span>
              ) : null}
            </span>
            <span className="text-graphite-300">{o.address}</span>
            <span className="block text-graphite-300">{o.cityState}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
