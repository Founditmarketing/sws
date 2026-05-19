import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cta = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-display font-semibold uppercase tracking-[0.08em] transition-[transform,background,color,box-shadow] duration-200 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-amber-300 text-graphite-950 hover:bg-amber-200 hover:-translate-y-px active:translate-y-0",
        ghost:
          "border border-bone-100/15 bg-transparent text-bone-100 hover:border-amber-300/60 hover:text-amber-300",
        outline:
          "border border-amber-300/70 bg-transparent text-amber-300 hover:bg-amber-300 hover:text-graphite-950",
        link: "text-amber-300 hover:text-amber-200 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type CtaProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof cta> & {
    href?: string;
    showArrow?: boolean;
    external?: boolean;
  };

export const CtaButton = React.forwardRef<HTMLButtonElement, CtaProps>(function CtaButton(
  { className, variant, size, href, showArrow = true, external, children, ...props },
  ref,
) {
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {showArrow ? (
        <ArrowRight
          className="relative z-10 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
          strokeWidth={2.5}
        />
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(cta({ variant, size }), className)}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button ref={ref} className={cn(cta({ variant, size }), className)} {...props}>
      {inner}
    </button>
  );
});

export { cta as ctaVariants };
