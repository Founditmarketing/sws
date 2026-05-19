"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Send } from "lucide-react";

import {
  type StepContact,
  stepContactSchema,
  roleOptions,
} from "@/lib/rfq/schema";
import { Field, Input, Select } from "@/components/ui/field";

export function StepContactForm({
  defaults,
  onSubmit,
  onBack,
  submitting,
}: {
  defaults?: Partial<StepContact>;
  onSubmit: (values: StepContact) => void;
  onBack: () => void;
  submitting?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepContact>({
    resolver: zodResolver(stepContactSchema),
    defaultValues: defaults,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-6 md:grid-cols-2"
      noValidate
    >
      <Field
        label="Full name"
        required
        htmlFor="fullName"
        error={errors.fullName?.message}
      >
        <Input id="fullName" autoComplete="name" {...register("fullName")} />
      </Field>

      <Field label="Role" required htmlFor="role" error={errors.role?.message}>
        <Select id="role" {...register("role")}>
          <option value="">Select a role</option>
          {roleOptions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        label="Company"
        required
        htmlFor="company"
        error={errors.company?.message}
      >
        <Input id="company" autoComplete="organization" {...register("company")} />
      </Field>

      <Field
        label="Best time to call"
        htmlFor="bestTime"
        hint="Optional - we'll call when it works for you."
        error={errors.bestTime?.message}
      >
        <Input
          id="bestTime"
          placeholder="e.g. Weekdays 8-10 a.m. CT"
          {...register("bestTime")}
        />
      </Field>

      <Field label="Email" required htmlFor="email" error={errors.email?.message}>
        <Input id="email" type="email" autoComplete="email" {...register("email")} />
      </Field>

      <Field label="Phone" required htmlFor="phone" error={errors.phone?.message}>
        <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
      </Field>

      <div className="md:col-span-2 border border-bone-100/10 bg-graphite-900/40 p-4">
        <label className="flex items-start gap-3 text-sm text-graphite-200">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 flex-none accent-amber-300"
            {...register("consent")}
          />
          <span>
            I consent to Sitework Specialist contacting me about this project. We don't share your
            information.
          </span>
        </label>
        {errors.consent ? (
          <p className="mt-2 text-xs text-amber-300">{errors.consent.message}</p>
        ) : null}
      </div>

      <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-graphite-300 transition-colors hover:text-bone-100 disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex items-center justify-center gap-2 bg-amber-300 px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.08em] text-graphite-950 transition-[background,transform] hover:-translate-y-px hover:bg-amber-200 disabled:opacity-50"
        >
          {submitting ? "Sending..." : "Submit Request"}
          <Send className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>
    </form>
  );
}
