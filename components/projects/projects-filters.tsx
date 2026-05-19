"use client";

import { useCallback, useMemo, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpRight, X } from "lucide-react";

import {
  PARISHES,
  SCOPE_TAGS,
  type Parish,
  type Project,
  type ScopeTag,
} from "@/lib/content/projects";
import { cn } from "@/lib/utils";

type MarketOption = { slug: string; label: string };

export function ProjectsFilters({
  projects,
  marketOptions,
}: {
  projects: Project[];
  marketOptions: MarketOption[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const selected = useMemo(() => readSelection(searchParams), [searchParams]);

  const yearOptions = useMemo(() => {
    const set = new Set<number>(projects.map((p) => p.yearCompleted));
    return Array.from(set).sort((a, b) => b - a);
  }, [projects]);

  const filtered = useMemo(
    () => filterProjects(projects, selected),
    [projects, selected],
  );

  const updateParam = useCallback(
    (key: keyof Selection, value: string | null, opts?: { multi?: boolean }) => {
      const next = new URLSearchParams(searchParams.toString());
      const existing = next.getAll(key);

      if (value === null) {
        next.delete(key);
      } else if (opts?.multi) {
        if (existing.includes(value)) {
          next.delete(key);
          existing
            .filter((e) => e !== value)
            .forEach((v) => next.append(key, v));
        } else {
          next.append(key, value);
        }
      } else {
        if (existing[0] === value) {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      }

      const qs = next.toString();
      startTransition(() => {
        router.replace(qs ? `?${qs}` : "?", { scroll: false });
      });
    },
    [router, searchParams, startTransition],
  );

  const resetAll = useCallback(() => {
    startTransition(() => {
      router.replace("?", { scroll: false });
    });
  }, [router, startTransition]);

  const activeCount =
    (selected.market ? 1 : 0) +
    (selected.parish ? 1 : 0) +
    (selected.year ? 1 : 0) +
    selected.scope.length;

  return (
    <div className="flex flex-col gap-8">
      {/* Mobile: collapsible */}
      <details
        className="group border border-bone-100/10 bg-graphite-900/40 md:hidden"
        open={activeCount > 0}
      >
        <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 [&::-webkit-details-marker]:hidden">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300">
            Filters{activeCount ? ` (${activeCount} active)` : ""}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite-300 transition-transform duration-200 group-open:rotate-180">
            +
          </span>
        </summary>
        <div className="border-t border-bone-100/10 px-5 py-5">
          <FiltersBody
            selected={selected}
            yearOptions={yearOptions}
            marketOptions={marketOptions}
            onUpdate={updateParam}
          />
        </div>
      </details>

      {/* Desktop / tablet */}
      <div className="hidden flex-col gap-6 md:flex">
        <FiltersBody
          selected={selected}
          yearOptions={yearOptions}
          marketOptions={marketOptions}
          onUpdate={updateParam}
        />
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-bone-100/10 pt-5">
        <p
          aria-live="polite"
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-graphite-300"
        >
          Showing {filtered.length} of {projects.length}
          {isPending ? " - updating..." : ""}
        </p>
        {activeCount > 0 ? (
          <button
            type="button"
            onClick={resetAll}
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300 transition-colors hover:text-amber-200"
          >
            <X className="h-3 w-3" strokeWidth={2.5} />
            Reset all filters
          </button>
        ) : null}
      </div>

      <ProjectsResults projects={filtered} />
    </div>
  );
}

function FiltersBody({
  selected,
  yearOptions,
  marketOptions,
  onUpdate,
}: {
  selected: Selection;
  yearOptions: number[];
  marketOptions: MarketOption[];
  onUpdate: (
    key: keyof Selection,
    value: string | null,
    opts?: { multi?: boolean },
  ) => void;
}) {
  return (
    <>
      <FilterGroup label="Market">
        {marketOptions.map((m) => (
          <Chip
            key={m.slug}
            active={selected.market === m.slug}
            onClick={() => onUpdate("market", m.slug)}
          >
            {m.label}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup label="Parish">
        {PARISHES.map((p) => (
          <Chip
            key={p}
            active={selected.parish === p}
            onClick={() => onUpdate("parish", p)}
          >
            {p}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup label="Year">
        {yearOptions.map((y) => (
          <Chip
            key={y}
            active={selected.year === String(y)}
            onClick={() => onUpdate("year", String(y))}
          >
            {y}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup label="Scope (multi)">
        {SCOPE_TAGS.map((s) => (
          <Chip
            key={s}
            active={selected.scope.includes(s)}
            onClick={() => onUpdate("scope", s, { multi: true })}
          >
            {s}
          </Chip>
        ))}
      </FilterGroup>
    </>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite-300">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
        active
          ? "border-amber-300 bg-amber-300/10 text-amber-300"
          : "border-bone-100/15 bg-graphite-950 text-graphite-200 hover:border-amber-300/60 hover:text-bone-100",
      )}
    >
      {active ? <X className="h-3 w-3" strokeWidth={2.5} /> : null}
      {children}
    </button>
  );
}

function ProjectsResults({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-start gap-3 border border-dashed border-bone-100/15 bg-graphite-900/30 px-6 py-12 text-graphite-300">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300">
          No matches
        </span>
        <p className="text-sm">
          No projects match the current filters. Reset the filters or contact us
          for similar work.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid gap-8 lg:grid-cols-2">
      {projects.map((p) => (
        <li key={p.slug}>
          <Link
            href={`/projects/${p.slug}`}
            className="group relative flex h-full flex-col overflow-hidden border border-bone-100/10"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${p.hero}')` }}
                aria-hidden
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/40 to-transparent"
              />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 border border-bone-100/30 bg-graphite-950/70 px-2 py-1 backdrop-blur-sm">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-300">
                  {p.market}
                </span>
              </div>
              </div>
            <div className="flex flex-1 flex-col gap-3 bg-graphite-900 p-6">
              <div className="flex items-center justify-between text-xs text-graphite-300">
                <span className="font-mono uppercase tracking-[0.18em]">
                  {p.location}
                </span>
                <span className="font-mono uppercase tracking-[0.18em]">
                  {p.yearCompleted}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-bone-100">
                {p.title}
              </h3>
              <p className="text-sm text-graphite-300">{p.summary}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-amber-300">
                Read case study
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}


type Selection = {
  market: string | null;
  parish: Parish | null;
  year: string | null;
  scope: ScopeTag[];
};

type SearchParamsLike = Pick<URLSearchParams, "get" | "getAll">;

function readSelection(params: SearchParamsLike): Selection {
  const parishParam = params.get("parish");
  const parish =
    parishParam && (PARISHES as readonly string[]).includes(parishParam)
      ? (parishParam as Parish)
      : null;
  const scope = params
    .getAll("scope")
    .filter((s): s is ScopeTag => (SCOPE_TAGS as readonly string[]).includes(s));

  return {
    market: params.get("market"),
    parish,
    year: params.get("year"),
    scope,
  };
}

function filterProjects(projects: Project[], s: Selection) {
  return projects.filter((p) => {
    if (s.market && p.marketSlug !== s.market) return false;
    if (s.parish && p.parish !== s.parish) return false;
    if (s.year && String(p.yearCompleted) !== s.year) return false;
    if (s.scope.length && !s.scope.every((tag) => p.scopeTags.includes(tag)))
      return false;
    return true;
  });
}
