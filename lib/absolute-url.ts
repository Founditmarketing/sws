import { getSiteOrigin } from "@/lib/site";

export function absoluteUrl(path: string) {
  const base = getSiteOrigin().replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
