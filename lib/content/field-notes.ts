// Field Notes — typed content registry.
//
// Every post in the series is registered here. The index page (`/field-notes`)
// renders the list; detail pages render their own copy.
//
// The manifesto's URL is intentionally `/why-central-louisiana` (the original
// route, already linked from the homepage coverage section and the footer).
// New entries live under `/field-notes/[slug]`.

export type FieldNote = {
  slug: string;
  /** Live URL for the post. Manifesto uses its legacy route. */
  href: string;
  title: string;
  /** One-sentence description used on the index and meta. */
  dek: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** Rounded estimate; rendered as `~N min read`. */
  readingMinutes: number;
  /** Eyebrow numbering displayed on the index card (e.g. "01"). */
  number: string;
};

export const fieldNotes: FieldNote[] = [
  {
    slug: "why-central-louisiana",
    href: "/why-central-louisiana",
    title: "Why we only work where we work",
    dek: "Central Louisiana site work, from a contractor who lives in it. Eight parishes, three soil systems, and a calendar that punishes anyone who treats it like Houston with more humidity.",
    date: "2026-05-10",
    readingMinutes: 8,
    number: "01",
  },
  {
    slug: "sequencing-around-hurricane-francine",
    href: "/field-notes/sequencing-around-hurricane-francine",
    title: "How we sequenced mass earthwork around Hurricane Francine",
    dek: "A Category-2 hurricane in the middle of mass excavation. What we shut down, how we secured, when we reopened, and the three lessons we walked out with.",
    date: "2026-05-10",
    readingMinutes: 7,
    number: "02",
  },
];

/** Sort posts newest-first for listing. Stable on date ties via slug. */
export function listFieldNotes(): FieldNote[] {
  return [...fieldNotes].sort((a, b) => {
    if (a.date === b.date) return a.slug.localeCompare(b.slug);
    return a.date < b.date ? 1 : -1;
  });
}

export function getFieldNote(slug: string): FieldNote | undefined {
  return fieldNotes.find((n) => n.slug === slug);
}
