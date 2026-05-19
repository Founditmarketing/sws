// Bidding feed — typed content registry.
//
// Every value below is a credible placeholder; Joe replaces with real data on
// the first of each month. Each `[CLIENT-FILL]` marker corresponds to a row in
// `docs/content-checklists.md` under "Bidding feed".
//
// The page renders three columns: "Currently bidding", "Recently awarded",
// and "Recently completed". Status pills are color-coded — amber for active
// bids, bone for awarded, graphite for completed.

export type BidStatus = "bidding" | "awarded" | "completed";

export type BidRow = {
  /** Stable slug for keying / future detail routes. */
  slug: string;
  /** Marketing-readable project label. [CLIENT-FILL] */
  name: string;
  /** Parish + city or parish only. [CLIENT-FILL] */
  location: string;
  /** One-line scope summary. [CLIENT-FILL] */
  scope: string;
  /** Dollar range or "Public bid documents". [CLIENT-FILL] */
  valueLabel: string;
  /** Public entity, GC, or "Confidential GC". [CLIENT-FILL] */
  owner: string;
  /** Status — drives column placement and pill color. */
  status: BidStatus;
  /**
   * Display date associated with the status:
   *   - bidding: "OUT FOR BID until {date}" — supply ISO date.
   *   - awarded: "AWARDED {month/year}" — supply ISO date (any day, month/year used).
   *   - completed: "COMPLETED {month/year}" — supply ISO date.
   * [CLIENT-FILL]
   */
  statusDate: string;
};

export const bidRows: BidRow[] = [
  // ── Currently bidding ──────────────────────────────────────────────────
  {
    slug: "industrial-pad-vernon",
    name: "Industrial Pad - Vernon Parish",
    location: "Vernon Parish, LA",
    scope: "Mass excavation + access road, 12 acres",
    valueLabel: "$1.8M - $2.4M",
    owner: "Confidential GC",
    status: "bidding",
    statusDate: "2026-06-14",
  },
  {
    slug: "rapides-distribution-expansion",
    name: "Regional Distribution Expansion",
    location: "Rapides Parish, LA",
    scope: "Pad expansion, drainage relocation, 28 acres",
    valueLabel: "$3.0M - $4.0M",
    owner: "Confidential Fortune 500 retailer (via GC)",
    status: "bidding",
    statusDate: "2026-06-21",
  },
  {
    slug: "natchitoches-utility-pad",
    name: "Substation Pad - Natchitoches Parish",
    location: "Natchitoches Parish, LA",
    scope: "Greenfield 230kV substation pad + access spur",
    valueLabel: "Public bid documents",
    owner: "Cleco Power",
    status: "bidding",
    statusDate: "2026-06-28",
  },
  {
    slug: "avoyelles-cold-storage",
    name: "Cold Storage Pad - Avoyelles Parish",
    location: "Avoyelles Parish, LA",
    scope: "Pad to +/- 0.04', heavy-duty paving subgrade, 18 acres",
    valueLabel: "$2.1M - $2.8M",
    owner: "Confidential GC",
    status: "bidding",
    statusDate: "2026-07-05",
  },

  // ── Recently awarded ───────────────────────────────────────────────────
  {
    slug: "grant-paper-mill-expansion",
    name: "Paper Mill Yard Expansion",
    location: "Grant Parish, LA",
    scope: "Mass earthwork, haul roads, detention basin, 22 acres",
    valueLabel: "$2.6M",
    owner: "Confidential industrial owner",
    status: "awarded",
    statusDate: "2026-05-01",
  },
  {
    slug: "alexandria-medical-pad",
    name: "Medical Office Pad - Alexandria",
    location: "Rapides Parish, LA",
    scope: "Selective demo, mass excavation, stabilized pad, 6 acres",
    valueLabel: "$1.1M",
    owner: "Robins & Morton",
    status: "awarded",
    statusDate: "2026-04-01",
  },
  {
    slug: "concordia-river-access",
    name: "River-Access Industrial Road",
    location: "Concordia Parish, LA",
    scope: "Access road + culvert structures, 3.4 mi",
    valueLabel: "$1.9M",
    owner: "Confidential GC",
    status: "awarded",
    statusDate: "2026-03-01",
  },

  // ── Recently completed ─────────────────────────────────────────────────
  {
    slug: "natchez-substation-pad",
    name: "Natchez 230kV Substation Pad",
    location: "Concordia Parish, LA",
    scope: "Greenfield substation pad + riprap revetment, 9 acres",
    valueLabel: "$1.6M",
    owner: "Cleco Power",
    status: "completed",
    statusDate: "2024-11-01",
  },
  {
    slug: "central-la-distribution-center",
    name: "Central Louisiana Distribution Center",
    location: "Rapides Parish, LA",
    scope: "Complete site package, 1.1M sq ft DC, 78 acres",
    valueLabel: "$4.8M",
    owner: "Brasfield & Gorrie",
    status: "completed",
    statusDate: "2025-08-01",
  },
  {
    slug: "alexandria-medical-campus",
    name: "Christus St. Frances Cabrini Campus Expansion",
    location: "Rapides Parish, LA",
    scope: "Sequenced earthwork + drainage relocation, 18 acres",
    valueLabel: "$2.3M",
    owner: "Robins & Morton",
    status: "completed",
    statusDate: "2024-12-01",
  },
];

export function bidsByStatus(status: BidStatus): BidRow[] {
  return bidRows.filter((b) => b.status === status);
}

/** Renders an ISO date as "MMM YYYY" — used for awarded / completed pills. */
export function monthYear(iso: string): string {
  const [y, m] = iso.split("-").map((n) => parseInt(n, 10));
  if (!y || !m) return iso;
  const d = new Date(Date.UTC(y, m - 1, 1));
  return d
    .toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })
    .toUpperCase();
}

/** Renders an ISO date as "MMM DD" — used for "until {date}" pills. */
export function shortDate(iso: string): string {
  const [y, m, d] = iso.split("-").map((n) => parseInt(n, 10));
  if (!y || !m || !d) return iso;
  const date = new Date(Date.UTC(y, m - 1, d));
  return date
    .toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      timeZone: "UTC",
    })
    .toUpperCase();
}

/** "Last updated" quarter label rendered in the footer note. */
export const BID_FEED_LAST_UPDATED = "Q2 2026";
