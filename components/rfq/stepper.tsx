import { Check } from "lucide-react";
import { STEPS } from "@/lib/rfq/schema";
import { cn } from "@/lib/utils";

export function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex flex-col gap-px overflow-hidden border border-bone-100/10 bg-bone-100/10 md:grid md:grid-cols-4">
      {STEPS.map((s) => {
        const done = s.id < current;
        const active = s.id === current;
        return (
          <li
            key={s.key}
            className={cn(
              "flex items-start gap-4 bg-graphite-950 p-5",
              active && "bg-graphite-900",
            )}
          >
            <span
              className={cn(
                "flex h-8 w-8 flex-none items-center justify-center border font-mono text-xs",
                done && "border-amber-300 bg-amber-300 text-graphite-950",
                active && !done && "border-amber-300 text-amber-300",
                !done && !active && "border-bone-100/20 text-graphite-300",
              )}
              aria-hidden
            >
              {done ? <Check className="h-4 w-4" strokeWidth={3} /> : `0${s.id}`}
            </span>
            <span className="flex flex-col">
              <span
                className={cn(
                  "font-display text-sm font-bold tracking-tight",
                  active || done ? "text-bone-100" : "text-graphite-300",
                )}
              >
                {s.title}
              </span>
              <span className="text-xs text-graphite-300">{s.description}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
