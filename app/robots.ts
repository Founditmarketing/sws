import type { MetadataRoute } from "next";

import { getSiteOrigin } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteOrigin().replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/rfq/thank-you"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
