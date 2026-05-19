import { cn, formatNumber } from "@/lib/utils";

export function StatBlock({
  label,
  value,
  prefix,
  suffix,
  decimals,
  caption,
  className,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  caption?: string;
  className?: string;
}) {
  // Audit fix #9: counters feel SaaS-y on a contractor site, and intersection-
  // based animation was reading a moving target between mounts (visible bug).
  // Render the plain formatted number — restraint is on-brand.
  const formatted = formatNumber(value, {
    minimumFractionDigits: decimals ?? 0,
    maximumFractionDigits: decimals ?? 0,
  });

  return (
    <div
      className={cn(
        "group relative flex flex-col gap-2 border-t border-bone-100/10 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0",
        className,
      )}
    >
      <span className="font-display text-3xl font-extrabold leading-none tracking-tight tabular-nums text-bone-100 sm:text-5xl md:text-6xl">
        {prefix}
        {formatted}
        {suffix}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
        {label}
      </span>
      {caption ? <span className="text-sm text-graphite-300">{caption}</span> : null}
    </div>
  );
}
