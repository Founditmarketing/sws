import type { Metadata, Viewport } from "next";
import { Inter, Archivo, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

import { getMetadataBase, siteConfig } from "@/lib/site";
import { localBusinessJsonLd } from "@/lib/seo";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { LoadingScreen } from "@/components/ui/loading-screen";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jet",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: `${siteConfig.name} - Commercial Site Work Contractor in Central Louisiana`,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.shortDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  category: "Construction",
  keywords: [
    "commercial site work contractor",
    "central Louisiana excavation",
    "Alexandria LA grading",
    "land clearing contractor Louisiana",
    "industrial site prep",
    "pad site contractor",
    "mass excavation Louisiana",
    "erosion control contractor",
  ],
  // App Router file-based icon convention picks up app/icon.svg,
  // app/apple-icon.png, and app/favicon.ico automatically — no manual
  // wiring required. Keeping this block out avoids duplicate <link>
  // tags in the document head.
};

export const viewport: Viewport = {
  themeColor: "#060709",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable} ${mono.variable} min-h-full bg-graphite-950 text-bone-100 dark`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col bg-graphite-950 text-bone-100 antialiased">
        {/* Round 5 audit fix #11: organization JSON-LD is now a plain
            <script> tag rendered into the initial HTML on every route, not
            a next/script with afterInteractive (which deferred injection
            until after hydration and meant non-JS-executing crawlers
            sometimes missed it). */}
        <script
          id="ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />

        {plausible ? (
          <Script
            defer
            data-domain={plausible}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
        <LoadingScreen />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-amber-300 focus:px-3 focus:py-2 focus:text-graphite-950"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="relative flex-1 bg-graphite-950">
          {children}
        </main>
        <SiteFooter />
        <MobileCtaBar />
        <Analytics />
      </body>
    </html>
  );
}
