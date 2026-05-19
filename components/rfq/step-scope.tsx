"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  type StepScope,
  stepScopeSchema,
  sizeUnitOptions,
} from "@/lib/rfq/schema";
import { capabilities } from "@/lib/content/capabilities";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export function StepScopeForm({
  defaults,
  onNext,
  onBack,
}: {
  defaults?: Partial<StepScope>;
  onNext: (values: StepScope) => void;
  onBack: () => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<StepScope>({
    resolver: zodResolver(stepScopeSchema),
    defaultValues: {
      capabilities: [],
      sizeUnit: "acres",
      ...defaults,
    },
  });

  const selected = watch("capabilities") ?? [];

  function toggle(slug: string) {
    const next = selected.includes(slug)
      ? selected.filter((s) => s !== slug)
      : [...selected, slug];
    setValue("capabilities", next, { shouldValidate: true, shouldDirty: true });
  }

  return (
    <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-8" noValidate>
      <Field
        label="Capabilities needed"
        required
        error={errors.capabilities?.message as string | undefined}
        hint="Select every scope you'd like us to quote. Pick conservatively - we can refine."
      >
        <input type="hidden" {...register("capabilities")} />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => {
            const on = selected.includes(c.slug);
            return (
              <button
                type="button"
                key={c.slug}
                onClick={() => toggle(c.slug)}
                aria-pressed={on}
                className={cn(
                  "group flex flex-col items-start gap-1 border border-bone-100/15 bg-graphite-900/40 p-4 text-left transition-colors",
                  on
                    ? "border-amber-300 bg-amber-300/10 text-bone-100"
                    : "hover:border-bone-100/35 hover:bg-graphite-900/80",
                )}
              >
                <span className="font-display text-sm font-bold tracking-tight text-bone-100">
                  {c.title}
                </span>
                <span className="text-xs text-graphite-300">{c.outcome}</span>
              </button>
            );
          })}
        </div>
      </Field>

      <div className="grid gap-6 md:grid-cols-3">
        <Field
          label="Size"
          required
          htmlFor="size"
          error={errors.size?.message}
          className="md:col-span-2"
        >
          <Input
            id="size"
            type="number"
            inputMode="decimal"
            step="any"
            placeholder="e.g. 78"
            {...register("size")}
          />
        </Field>
        <Field
          label="Unit"
          required
          htmlFor="sizeUnit"
          error={errors.sizeUnit?.message}
        >
          <Select id="sizeUnit" {...register("sizeUnit")}>
            {sizeUnitOptions.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field
        label="Notes for the estimator"
        htmlFor="notes"
        hint="Anything we should know? Soils, access, schedule risk, owner standards, etc."
        error={errors.notes?.message}
      >
        <Textarea
          id="notes"
          placeholder="e.g. Existing site has 4-6 ft of unsuitable in the building footprint per geotech."
          {...register("notes")}
        />
      </Field>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-graphite-300 transition-colors hover:text-bone-100"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex items-center justify-center gap-2 bg-amber-300 px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.08em] text-graphite-950 transition-[background,transform] hover:-translate-y-px hover:bg-amber-200 disabled:opacity-50"
        >
          Continue to documents
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>
    </form>
  );
}
