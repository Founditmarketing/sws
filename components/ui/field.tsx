import * as React from "react";
import { cn } from "@/lib/utils";

export function Field({
  label,
  hint,
  error,
  required,
  htmlFor,
  className,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={htmlFor}
        className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-200"
      >
        {label}
        {required ? <span className="ml-1 text-amber-300">*</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <span className="text-xs text-graphite-300">{hint}</span>
      ) : null}
      {error ? <span className="text-xs text-amber-300">{error}</span> : null}
    </div>
  );
}

export const inputBase =
  // Round 5 audit fix #7: aria-invalid:* variants paint a rust-500 border
  // when react-hook-form sets aria-invalid on a failing field. Rust is the
  // existing brand-token error color; amber is reserved for the inline
  // hint text below the field so the two read as different signals.
  "block w-full border border-bone-100/15 bg-graphite-900/60 px-4 py-3 text-base text-bone-100 placeholder:text-graphite-300/60 focus-visible:border-amber-300 focus-visible:outline-none focus-visible:ring-0 aria-invalid:border-rust-500 aria-invalid:focus-visible:border-rust-500";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn(inputBase, className)} {...props} />;
});

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      rows={4}
      className={cn(inputBase, "min-h-[120px] resize-y", className)}
      {...props}
    />
  );
});

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        inputBase,
        "appearance-none bg-[length:14px] bg-no-repeat pr-10",
        className,
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23FFB238' stroke-width='2.5' stroke-linecap='square'><polyline points='6 9 12 15 18 9'/></svg>\")",
        backgroundPosition: "right 1rem center",
      }}
      {...props}
    >
      {children}
    </select>
  );
});
