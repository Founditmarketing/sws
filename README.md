# Sitework Specialist - siteworkspecialistllc.com

Commercial rebrand of Sitework Specialist LLC, Central Louisiana's commercial site work contractor. Built on Next.js 15 (App Router, RSC), TypeScript strict, Tailwind CSS v4, and Motion. Multi-step Request-for-Quote flow with file uploads (UploadThing), transactional email (Resend), and outbound webhook for CRM.

## Hosting / Vercel

**Dashboard:** set **Framework Preset** to Next.js, **Build Command** to `next build` (default), **Output Directory** to default (leave empty / Vercel-managed `.next`), **Install Command** `npm install`. Use **Node.js 20.x or newer** (see `engines` in `package.json`). Set **`NEXT_PUBLIC_SITE_URL`** to your canonical origin (production: `https://siteworkspecialistllc.com`, or the preview URL for previews) so metadata, `absoluteUrl`, and sitemap resolve correctly; malformed values fall back to the production URL in code, but a correct env avoids wrong canonicals.

## Local development on Windows / OneDrive (important)

**Do not develop this project from inside a OneDrive-synced folder.** Next.js writes thousands of files to `.next/` during dev and build; OneDrive's reparse-point sync ("Files On-Demand") races those writes and breaks them. Symptoms:

- `next build` fails with `EINVAL: invalid argument, readlink ...\.next\server\interception-route-rewrite-manifest.js` (or similar `.next/` paths).
- The dev server shows `[TypeError: fetch failed] [cause]: ETIMEDOUT` against perfectly valid URLs while OneDrive saturates the network.
- The browser loads the page but shows a white screen / partial render because client chunks 404 against a corrupt `.next/`.

**Fixes, in order:**

1. **Move the project off OneDrive** (e.g. `C:\dev\sws`). This is the only durable fix.
2. If you must keep it under OneDrive, in OneDrive Settings exclude `.next/`, `node_modules/`, and `.turbo/` from sync, and right-click each of those folders → "Always keep on this device". Then `Remove-Item -Recurse -Force .next` and rebuild.
3. Never run `next build` while `next dev` is running on the same `.next/` directory.

## Stack

- **Framework**: Next.js 15, React 19, TypeScript strict
- **Styling**: Tailwind CSS v4 + brand token layer in `app/globals.css`
- **Motion**: `motion/react` (formerly Framer Motion)
- **Forms**: `react-hook-form` + `zod`
- **Uploads**: UploadThing (`@uploadthing/react` + `uploadthing`)
- **Email**: Resend (`resend`)
- **Analytics**: Vercel Analytics + Plausible (privacy-friendly, no cookie banner)
- **Content**: TypeScript-typed content modules in `lib/content/*` for capabilities, markets, projects, and fleet. The original plan called for MDX; the runtime-typed approach keeps content code-managed and IDE-checked. MDX dependencies (`@next/mdx`, `next-mdx-remote`, `gray-matter`) were removed as dead weight — re-add them if/when content actually needs MDX.
- **SEO**: Next Metadata API, JSON-LD (LocalBusiness/GeneralContractor, Service, FAQPage, BreadcrumbList), `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`
- **Hosting**: Designed for Vercel
- **Testing**: Playwright smoke test for the RFQ funnel

## Quick start

```powershell
npm install
copy .env.example .env.local   # then fill in the secrets
npm run dev
```

Open http://localhost:3000.

### Production build

```powershell
npm run build
npm run start
```

`/sitemap.xml` and `/robots.txt` are served exclusively by the dynamic App Router routes (`app/sitemap.ts`, `app/robots.ts`). The previous `next-sitemap` postbuild was removed because it wrote static files into `public/` that collided with the dynamic routes and produced HTTP 500s.

### Tests

```powershell
npx playwright install --with-deps   # one time
npm run test:e2e
```

## Configuration

All required environment variables are documented in `.env.example`. The site runs without secrets — uploads, email, and webhooks degrade gracefully — but to ship to production, set:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin used by metadata, sitemap, and OG. |
| `RESEND_API_KEY` | Transactional email API key from https://resend.com. |
| `SALES_INBOX_EMAIL` | Where RFQ submissions land. Falls back to `INQUIRY_EMAIL` constant in `lib/site.ts`. |
| `RFQ_FROM_EMAIL` | "From" address for RFQ emails. Must be a verified Resend sender on your domain. |
| `RFQ_WEBHOOK_URL` | Outbound webhook for CRM (HubSpot, Pipedrive, Salesforce). |
| `RFQ_WEBHOOK_SECRET` | If set, the webhook is HMAC-SHA256 signed with header `X-SWS-Signature: sha256=<hex>`. |
| `UPLOADTHING_TOKEN` | Token from https://uploadthing.com. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Domain registered on Plausible; omit to disable Plausible script. |

### Inquiry email

`INQUIRY_EMAIL` (top of `lib/site.ts`) and `SALES_INBOX_EMAIL` are both set to `joeburnssws@gmail.com` — the owner Joe Burns's address, scraped directly from the live siteworkspecialistllc.com `mailto:` links. Once a branded inbox (e.g. `quotes@siteworkspecialistllc.com`) is provisioned, swap **both** the constant and the Vercel env var.

The constant powers the footer mailto, Careers application links, About contact card, and JSON-LD `email` field. The env var routes the actual RFQ transactional emails sent through Resend.

## Project structure

```
app/
  layout.tsx, page.tsx, globals.css, icon.svg, opengraph-image.tsx
  capabilities/page.tsx, capabilities/[slug]/page.tsx
  markets/page.tsx, markets/[slug]/page.tsx
  projects/page.tsx, projects/[slug]/page.tsx
  fleet/page.tsx
  about/page.tsx
  careers/page.tsx
  rfq/page.tsx, rfq/thank-you/page.tsx
  api/rfq/route.ts                  # validates, emails Resend, POSTs webhook
  api/uploadthing/route.ts          # UploadThing handler
  api/uploadthing/core.ts           # UploadThing file router
  sitemap.ts, robots.ts
components/
  brand/                            # Logo, CtaButton, NumberCounter, SectionHeader, StatBlock
  sections/                         # Hero, TrustedBy, CapabilitiesGrid, MarketsGrid, FeaturedProjects, ByTheNumbers, FleetSnapshot, SafetyBand, CoverageMap, CtaBand, PageHero, CapabilityIcon
  rfq/                              # RfqForm + 4 step components + Stepper
  ui/                               # field.tsx (Input/Select/Textarea/Field wrappers)
  site-header.tsx, site-footer.tsx
lib/
  site.ts                           # site config + INQUIRY_EMAIL
  seo.ts                            # buildMetadata + JSON-LD helpers
  utils.ts
  rfq/schema.ts                     # zod schemas per step + combined
  rfq/storage.ts                    # sessionStorage draft persistence
  uploadthing-client.ts
  content/capabilities.ts, markets.ts, projects.ts, fleet.ts
tests/e2e/rfq.spec.ts
```

## Content + imagery plan

This rebrand is photography-driven. The first-pass copy and stock imagery shipped with the site are deliberately conservative; the content/imagery upgrade is planned in two phases.

### Phase 1 (now, shipped)

- **Copy**: Full first-pass copy across hero, capabilities (12), markets (6), projects (3 anchor case studies), fleet, about, RFQ microcopy, careers, thank-you. Voice: cinematic, outcome-led, zero residential-handyman energy.
- **Imagery**: Curated industrial earthworks photography sourced from Unsplash/Adobe Stock placeholders (referenced via `images.unsplash.com` and replaceable in `lib/content/*.ts`). Color-graded look enforced by the Tailwind dark theme tokens.
- **Anchor case studies (3)**: Distribution Center (Logistics), Hospital Expansion (Healthcare), Substation Pad (Energy). Real scopes, real metrics, names noted as confidential where required.
- **Logos / trusted-by**: Ticker uses text wordmarks. Replace with greyscale SVG/PNG logos in `components/sections/trusted-by.tsx` once the client confirms permission and supplies vector files.

### Phase 2 (post-launch shoot)

Recommend a half-day drone + DSLR shoot at 2-3 active sites and the Alexandria yard. Deliverables:

- 6-8 hero/landing images at 16:9 and 4:5 (drone + ground)
- Per-capability "in action" shots (12 capabilities, 1-2 each)
- Per-market beauty shot (6 markets)
- Yard fleet lineup at golden hour (1-2 hero shots, fleet detail crops)
- 3-4 portrait shots of leadership and superintendents for an About refresh

**Photographer brief**: cool desaturated industrial palette, low/golden hour preferred, machinery in motion, no people-only shots without iron in frame.

**Where to swap imagery**: replace the `image` / `hero` URLs in `lib/content/markets.ts`, `lib/content/projects.ts`, and the background image in `components/sections/hero.tsx` and `cta-band.tsx`. Add new domains to `next.config.mjs` `images.remotePatterns` if hosting elsewhere, or move to `/public` for fully self-hosted assets.

## SEO

- Default metadata in `app/layout.tsx`; per-page metadata via `buildMetadata()` from `lib/seo.ts`.
- LocalBusiness/GeneralContractor JSON-LD injected globally in the layout.
- BreadcrumbList JSON-LD on capability, market, and project detail pages.
- Service JSON-LD per capability page.
- FAQPage JSON-LD on capability pages with FAQs.
- Sitemap and robots route handlers in `app/sitemap.ts` and `app/robots.ts` (dynamic, single source of truth — no static fallback in `public/`).
- OG image generated at the edge via `app/opengraph-image.tsx`.

## RFQ + downstream wiring

`POST /api/rfq` does:

1. Validates the payload with `rfqSubmissionSchema` from `lib/rfq/schema.ts`.
2. Generates a `SWS-YYMMDD-XXXXXX` reference number.
3. Sends a transactional email (HTML + plaintext) to `SALES_INBOX_EMAIL` via Resend, with `Reply-To` set to the customer's email. Falls back to `INQUIRY_EMAIL` from `lib/site.ts`.
4. POSTs the full payload to `RFQ_WEBHOOK_URL` (HMAC-signed if `RFQ_WEBHOOK_SECRET` is set), so HubSpot/Pipedrive/Salesforce can be wired without a code change later.
5. Returns `{ ok: true, reference }` to the client, which redirects to `/rfq/thank-you?ref=...`.

Submissions succeed even if Resend or the webhook is down — failures are logged for the operator. The customer never sees a partial-failure error.

## Open items / TODOs to close before launch

1. **Branded inbox** (BLOCKED on Joe): Replace `joeburnssws@gmail.com` with `quotes@siteworkspecialistllc.com` (or similar) in both `INQUIRY_EMAIL` (`lib/site.ts`) and the `SALES_INBOX_EMAIL` Vercel env var once provisioned. The current value is real, scraped from the live site's `mailto:` links — leave it in place until the branded inbox exists so leads still reach Joe.
2. **Trusted-by logos**: Get permission and supply vector logos for at least 6 GC/owner clients.
3. **Photography** (BLOCKED on Joe): Schedule the half-day shoot and swap the placeholder URLs.
   - Fleet category heroes in `lib/homepage-images.ts` (`fleetCategoryHeroSrc`) — replace with real Sitework Specialist iron, decals visible.
   - **Joe Burns headshot** for the founder-quote section (`components/sections/founder-quote.tsx`) — currently a circular `JB` initials avatar in amber on graphite as a placeholder.
4. **Office addresses**: Spot-check the four addresses with Joe (Alexandria, Pineville, Jonesville, Natchez) — currently mirrored from the live site.
5. **Resend domain**: Verify `siteworkspecialistllc.com` (or the chosen sender domain) on Resend before launch and set `RFQ_FROM_EMAIL` to a verified address.
6. **CRM webhook**: Wire `RFQ_WEBHOOK_URL` to the chosen CRM (HubSpot/Pipedrive/Salesforce), or leave unset to keep email-only routing.
7. **Plausible**: Create the site on Plausible and confirm `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
8. **Social links** (LinkedIn page BLOCKED on Joe): Only Facebook is live on the current site (`facebook.com/siteworkspecialistllc`). The LinkedIn URL in `lib/site.ts` (`https://www.linkedin.com/company/siteworkspecialistllc`) is a placeholder — Joe still needs to claim or create the company page so prequalification teams can find it. The footer icon links to the placeholder URL until then. Instagram entry was removed.
9. **Lighthouse**: Run on the deployed preview and tune images/scripts to reach 95+ across the board.

## Stat reconciliation (2026-05-10)

`siteConfig.stats` in `lib/site.ts` is now the **single source of truth** for every number surfaced on the site. The first-pass placeholder values in the hero (18+ years, 4.2M+ CY) contradicted the more conservative numbers shown in the by-the-numbers band (8+ years, 1.8M+ CY) and triggered an animated number-counter that read a moving target between intersections. The reconciled, canonical set is:

| Stat | Value |
| --- | --- |
| Years self-performing | 8+ |
| Cubic yards moved | 1.8M+ |
| Projects delivered | 140+ |
| Heavy equipment | 67 self-owned units |
| Safety EMR | 0.34 |
| Bonding capacity | $25M |
| Coverage radius | 200 mi |

The `<NumberCounter>` component was removed in the same pass — counters feel SaaS-y, and rendering the plain formatted number dodges the per-intersection bug entirely.

## Homepage inline RFQ form

The homepage final CTA band is an inline lead-capture form (`components/sections/quick-rfq-band.tsx`), not a button-to-`/rfq`. It posts to the same `POST /api/rfq` endpoint as the multi-step form via the lighter `quickRfqSchema` in `lib/rfq/schema.ts`:

- Required: `fullName`, `company`, `email`, `market` (from `lib/content/markets`).
- Optional: `needBy` date, `notes`, up to 8 file uploads (UploadThing).
- Discriminator: `source: "quick-cta"`.

The route normalizes the quick payload onto the full `RfqSubmission` shape (multi-step-only fields are back-filled with placeholders like `city: "(to be confirmed)"`, `targetStart: "Budgeting only"`, `consent: true`) so the downstream Resend email and CRM webhook code paths stay identical. The `[rfq.submitted]` log line includes the `source` field so the operator can tell quick-form leads apart from full-form leads. The full `/rfq` page is intact for users who land directly on it.
