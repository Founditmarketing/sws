import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "/",
  showWordmark = true,
}: {
  className?: string;
  href?: string | null;
  showWordmark?: boolean;
}) {
  const inner = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span aria-hidden className="relative inline-flex h-14 w-14 items-center justify-center">
        <img 
          src="/logo/swsgoldlogo.png" 
          alt="Sitework Specialist Logo" 
          className="h-14 w-14 object-contain" 
        />
      </span>
      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-extrabold uppercase tracking-[0.06em] text-bone-100">
            Sitework
          </span>
          <span className="font-display text-[10px] font-semibold uppercase tracking-[0.32em] text-graphite-300">
            Specialist
          </span>
        </span>
      ) : null}
    </span>
  );

  if (!href) return inner;
  return (
    <Link href={href} aria-label="Sitework Specialist - home" className="inline-flex">
      {inner}
    </Link>
  );
}
