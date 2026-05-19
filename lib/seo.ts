import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/absolute-url";
import { getMetadataBase, siteConfig } from "@/lib/site";

export function buildMetadata(input: {
  title: string;
  description?: string;
  path: string;
  image?: string;
  noindex?: boolean;
}): Metadata {
  const title = input.title;
  const description = input.description ?? siteConfig.shortDescription;
  const url = absoluteUrl(input.path);
  const image = input.image ?? siteConfig.ogImage;

  return {
    title,
    description,
    metadataBase: getMetadataBase(),
    alternates: { canonical: url },
    robots: input.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

// Round 5 audit fix #11: kept aligned with /prequalification NAICS table so
// the homepage org JSON-LD and the prequal-page org JSON-LD reference the
// same codes. If the prequal table changes, this list must change too.
const NAICS_CODES = ["237310", "237990", "238910", "238990", "561730"];

// Parishes the company actively serves. Sourced from the same vocabulary
// the /projects filter uses (lib/content/projects.ts → PARISHES).
const SERVED_PARISHES = [
  "Rapides",
  "Avoyelles",
  "Grant",
  "Catahoula",
  "Concordia",
  "La Salle",
  "Vernon",
  "Natchitoches",
];

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.ogImage),
    telephone: siteConfig.phone,
    email: siteConfig.inquiryEmail,
    description: siteConfig.description,
    // Aligned with the "LIFETIME · SINCE 2017" caption on the hero / by-the-
    // numbers stat. siteConfig.stats.yearsInBusiness drifts year over year;
    // the founding date is fixed.
    foundingDate: "2017-01-01",
    // Range, not a precise headcount — both are valid per schema.org and the
    // range is honest while Joe's roster fluctuates with project loadout.
    // [VERIFY-WITH-JOE] confirm bracket before touching.
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 25,
      maxValue: 75,
      unitText: "people",
    },
    naics: NAICS_CODES,
    knowsAbout: NAICS_CODES,
    areaServed: [
      { "@type": "State", name: "Louisiana" },
      { "@type": "AdministrativeArea", name: "Central Louisiana" },
      ...SERVED_PARISHES.map((p) => ({
        "@type": "AdministrativeArea",
        name: `${p} Parish, Louisiana`,
      })),
    ],
    address: siteConfig.offices.map((o) => ({
      "@type": "PostalAddress",
      streetAddress: o.address,
      addressLocality: o.city,
      addressRegion: "LA",
      addressCountry: "US",
    })),
    location: siteConfig.offices.map((o) => ({
      "@type": "Place",
      name: `${o.city} Office${o.label ? ` - ${o.label}` : ""}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: o.address,
        addressLocality: o.city,
        addressRegion: "LA",
        addressCountry: "US",
      },
    })),
    sameAs: Object.values(siteConfig.social).filter(
      (url): url is string => typeof url === "string" && url.length > 0,
    ),
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.href),
    })),
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  slug: string;
  area?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: input.name,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: (input.area ?? ["Central Louisiana"]).map((a) => ({
      "@type": "AdministrativeArea",
      name: a,
    })),
    name: input.name,
    description: input.description,
    url: absoluteUrl(`/capabilities/${input.slug}`),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
