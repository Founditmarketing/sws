import type { MetadataRoute } from "next";

import { getSiteOrigin } from "@/lib/site";
import { capabilities } from "@/lib/content/capabilities";
import { markets } from "@/lib/content/markets";
import { projects } from "@/lib/content/projects";
import { fieldNotes } from "@/lib/content/field-notes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteOrigin().replace(/\/$/, "");
  const now = new Date();

  const staticPages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "daily" }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/capabilities", priority: 0.9, changeFrequency: "weekly" },
    { path: "/markets", priority: 0.9, changeFrequency: "weekly" },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly" },
    { path: "/fleet", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/careers", priority: 0.7, changeFrequency: "weekly" },
    { path: "/rfq", priority: 0.95, changeFrequency: "monthly" },
    { path: "/prequalification", priority: 0.85, changeFrequency: "monthly" },
    { path: "/bidding", priority: 0.85, changeFrequency: "monthly" },
    { path: "/why-central-louisiana", priority: 0.85, changeFrequency: "monthly" },
    { path: "/field-notes", priority: 0.85, changeFrequency: "monthly" },
  ];

  return [
    ...staticPages.map((p) => ({
      url: `${base}${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...capabilities.map((c) => ({
      url: `${base}/capabilities/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...markets.map((m) => ({
      url: `${base}/markets/${m.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // Field-notes posts that live under /field-notes/[slug]. The manifesto
    // intentionally lives at /why-central-louisiana and is emitted in
    // `staticPages` above.
    ...fieldNotes
      .filter((n) => n.href.startsWith("/field-notes/"))
      .map((n) => ({
        url: `${base}${n.href}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}
