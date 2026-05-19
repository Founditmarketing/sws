import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: As = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow ? (
        <span className="heading-eyebrow flex items-center gap-3">
          <span className="inline-block h-px w-6 bg-amber-300" aria-hidden />
          {eyebrow}
        </span>
      ) : null}
      <As className="font-display text-balance text-[clamp(1.75rem,5.5vw+0.4rem,2.25rem)] font-extrabold leading-[1.08] tracking-tight text-bone-100 md:text-5xl md:leading-tight lg:text-6xl">
        {title}
      </As>
      {description ? (
        <p className="text-pretty text-base text-graphite-300 md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
