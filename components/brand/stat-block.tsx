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
        "group relative flex items-center gap-4 border-t border-bone-100/10 py-3 md:flex-col md:items-start md:gap-2 md:border-l md:border-t-0 md:py-0 md:pl-8",
        className,
      )}
    >
      <span className="font-display text-2xl font-extrabold leading-none tracking-tight tabular-nums text-bone-100 sm:text-4xl md:text-6xl flex-none min-w-[3.5rem]">
        {prefix}
        <AnimatedNumber value={value} decimals={decimals} />
        {suffix}
      </span>
      <div className="flex flex-col gap-0.5 md:gap-2">
        <span className="font-mono text-[11px] uppercase leading-tight tracking-[0.2em] text-graphite-300">
          {label}
        </span>
        {caption ? <span className="text-xs leading-none text-graphite-400 md:text-sm md:leading-normal md:text-graphite-300">{caption}</span> : null}
      </div>
    </div>
  );
}
