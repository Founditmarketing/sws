"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";

import {
  type StepBasics,
  stepBasicsSchema,
  targetStartOptions,
} from "@/lib/rfq/schema";
import { markets } from "@/lib/content/markets";
import { Field, Input, Select } from "@/components/ui/field";

export function StepBasicsForm({
  defaults,
  onNext,
}: {
  defaults?: Partial<StepBasics>;
  onNext: (values: StepBasics) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StepBasics>({
    resolver: zodResolver(stepBasicsSchema),
    defaultValues: { state: "LA", ...defaults },
  });

  return (
    <form
      onSubmit={handleSubmit(onNext)}
      className="grid gap-6 md:grid-cols-2"
      noValidate
    >
      <Field
        label="Market"
        required
        htmlFor="market"
        error={errors.market?.message}
        className="md:col-span-2"
      >
        <Select id="market" {...register("market")}>
          <option value="">Select a market</option>
          {markets.map((m) => (
            <option key={m.slug} value={m.slug}>
              {m.title}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        label="Project name"
        required
        htmlFor="projectName"
        error={errors.projectName?.message}
        hint="A working name is fine - it doesn't have to be the final name."
        className="md:col-span-2"
      >
        <Input
          id="projectName"
          placeholder="e.g. Tioga Distribution Pad - Phase 1"
          {...register("projectName")}
        />
      </Field>

      <Field label="City" required htmlFor="city" error={errors.city?.message}>
        <Input id="city" placeholder="Alexandria" {...register("city")} />
      </Field>

      <Field label="State" required htmlFor="state" error={errors.state?.message}>
        <Input id="state" placeholder="LA" {...register("state")} />
      </Field>

      <Field
        label="Target start"
        required
        htmlFor="targetStart"
        error={errors.targetStart?.message}
        className="md:col-span-2"
      >
        <Select id="targetStart" {...register("targetStart")}>
          <option value="">Select target start</option>
          {targetStartOptions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      </Field>

      <div className="md:col-span-2 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex items-center justify-center gap-2 bg-amber-300 px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.08em] text-graphite-950 transition-[background,transform] hover:-translate-y-px hover:bg-amber-200 disabled:opacity-50"
        >
          Continue to scope
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>
    </form>
  );
}
