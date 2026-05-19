import { cn, formatNumber } from "@/lib/utils";

import { AnimatedNumber } from "@/components/ui/animated-number";

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
  return (
    <div
      className={cn(
        "group relative flex flex-col gap-2 border-t border-bone-100/10 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0",
        className,
      )}
    >
      <span className="font-display text-3xl font-extrabold leading-none tracking-tight tabular-nums text-bone-100 sm:text-5xl md:text-6xl">
        {prefix}
        <AnimatedNumber value={value} decimals={decimals} />
        {suffix}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300">
        {label}
      </span>
      {caption ? <span className="text-sm text-graphite-300">{caption}</span> : null}
    </div>
  );
}
