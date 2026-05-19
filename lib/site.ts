// Sourced directly from siteworkspecialistllc.com (mailto + tel links on the
// homepage, about-us, services, and pineville pages). `joeburnssws@gmail.com`
// is the owner Joe Burns's address; once a branded inbox exists, swap both
// this constant AND the SALES_INBOX_EMAIL environment variable.
export const INQUIRY_EMAIL = "joeburnssws@gmail.com";

export type Office = {
  city: string;
  address: string;
  cityState: string;
  label?: string;
};

export type NavItem = { label: string; href: string };

export const siteConfig: {
  name: string;
  legalName: string;
  shortDescription: string;
  description: string;
  url: string;
  ogImage: string;
  phone: string;
  phoneHref: string;
  inquiryEmail: string;
  emailSales: string;
  emailCareers: string;
  responseSlaHours: number;
  offices: Office[];
  social: { facebook?: string; linkedin?: string; instagram?: string };
  nav: NavItem[];
  stats: {
    yearsInBusiness: number;
    cubicYardsMoved: number;
    projectsDelivered: number;
    fleetCount: number;
    safetyEMR: number;
    bondingCapacityUsd: number;
    coverageRadiusMiles: number;
  };
  trustedBy: string[];
} = {
  name: "Sitework Specialist",
  legalName: "Sitework Specialist LLC",
  shortDescription:
    "Central Louisiana's commercial site work contractor. Mass excavation, grading, land clearing, and pad sites at scale.",
  description:
    "Sitework Specialist is a commercial site work contractor based in Central Louisiana, delivering mass excavation, grading, land clearing, erosion control, retaining structures, and complete pad sites for industrial, energy, healthcare, municipal, and commercial development clients.",
  url: "https://siteworkspecialistllc.com",
  ogImage: "/newsiteworkpics/siteworkprojectpic4.JPEG",
  phone: "(318) 484-8931",
  phoneHref: "tel:+13184848931",
  inquiryEmail: INQUIRY_EMAIL,
  emailSales: INQUIRY_EMAIL,
  emailCareers: INQUIRY_EMAIL,
  responseSlaHours: 24,

  offices: [
    {
      city: "Alexandria",
      address: "423 Vicky Ln.",
      cityState: "Alexandria, LA 71303",
      label: "Headquarters",
    },
    {
      city: "Pineville",
      address: "325 Pinehill Rd, Bridge Road",
      cityState: "Pineville, LA 71360",
    },
    {
      city: "Jonesville",
      address: "1800 Larto Bridge Road",
      cityState: "Jonesville, LA 71343",
    },
    {
      city: "Natchez",
      address: "4905 LA-494",
      cityState: "Natchez, LA 71456",
    },
  ],

  social: {
    facebook: "https://www.facebook.com/siteworkspecialistllc",
    // Placeholder URL: Joe still needs to provision/claim the LinkedIn company page.
    // See README "Open items" #8.
    linkedin: "https://www.linkedin.com/company/siteworkspecialistllc",
    // Round 5 audit fix #9: Instagram added on the bet that sitework reels
    // perform on IG. Placeholder URL — needs Joe's confirmation that the
    // handle is provisioned (or removal if he doesn't want one).
    // [VERIFY-WITH-JOE]
    instagram: "https://www.instagram.com/siteworkspecialistllc",
  },

  nav: [
    { label: "Capabilities", href: "/capabilities" },
    { label: "Markets", href: "/markets" },
    { label: "Projects", href: "/projects" },
    { label: "Fleet", href: "/fleet" },
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
  ],

  // Single source of truth for every stat surfaced anywhere on the site (hero,
  // by-the-numbers, footer JSON-LD, etc). Numbers were reconciled 2026-05-10
  // against the original "By the numbers" set; the company is younger than the
  // first-pass copy implied (footer copyright is 2026 -> 8+ years, not 18+).
  // fleetCount aligns with the itemized roster in `lib/content/fleet.ts`
  // (14 dozers + 13 excavators + 14 articulated trucks + 6 graders + 8
  // compaction + 12 support = 67 self-owned units).
  stats: {
    yearsInBusiness: 8,
    cubicYardsMoved: 1_800_000,
    projectsDelivered: 140,
    fleetCount: 67,
    safetyEMR: 0.34,
    bondingCapacityUsd: 25_000_000,
    coverageRadiusMiles: 200,
  },

  trustedBy: [
    "Cleco Power",
    "CenturyLink",
    "Procter & Gamble",
    "Roy O. Martin",
    "Christus Health",
    "Rapides Parish",
    "LaDOTD",
    "Weyerhaeuser",
  ],
};

export type SiteConfig = typeof siteConfig;

const SITE_ORIGIN_FALLBACK = "https://siteworkspecialistllc.com";

function parseHttpOrigin(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    const href = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;
    const u = new URL(href);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u.origin;
  } catch {
    return null;
  }
}

/** Canonical origin for metadata, absolute URLs, sitemap, and robots. Never throws. */
export function getSiteOrigin(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env) {
    const fromEnv = parseHttpOrigin(env);
    if (fromEnv) return fromEnv;
  }
  
  const vercelEnv = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
  if (vercelEnv) {
    return `https://${vercelEnv}`;
  }

  try {
    return new URL(siteConfig.url).origin;
  } catch {
    return SITE_ORIGIN_FALLBACK;
  }
}

export function getMetadataBase(): URL {
  try {
    return new URL(getSiteOrigin());
  } catch {
    return new URL(SITE_ORIGIN_FALLBACK);
  }
}
