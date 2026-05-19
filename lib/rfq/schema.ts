import { z } from "zod";

import { capabilities } from "@/lib/content/capabilities";
import { markets } from "@/lib/content/markets";

export const marketOptions = markets.map((m) => m.slug);
export const capabilityOptions = capabilities.map((c) => c.slug);

export const targetStartOptions = [
  "Within 30 days",
  "30-90 days",
  "90-180 days",
  "180+ days",
  "Budgeting only",
] as const;

export const sizeUnitOptions = ["acres", "sq ft", "cu yd"] as const;

export const roleOptions = [
  "Owner / Developer",
  "General Contractor",
  "Architect / Engineer",
  "Project Manager",
  "Estimator",
  "Other",
] as const;

export const stepBasicsSchema = z.object({
  market: z.enum(marketOptions as [string, ...string[]], {
    errorMap: () => ({ message: "Pick a market." }),
  }),
  projectName: z
    .string()
    .min(2, "Tell us a working name (3+ chars).")
    .max(120, "Keep it under 120 characters."),
  city: z.string().min(2, "Where's the site?"),
  state: z.string().min(2, "Two-letter state code.").max(40),
  targetStart: z.enum(targetStartOptions, {
    errorMap: () => ({ message: "Pick a target start window." }),
  }),
});

export const stepScopeSchema = z.object({
  capabilities: z
    .array(z.enum(capabilityOptions as [string, ...string[]]))
    .min(1, "Pick at least one capability."),
  size: z.coerce
    .number({ invalid_type_error: "Numbers only." })
    .positive("Use a positive number.")
    .max(100_000_000, "That's a big one."),
  sizeUnit: z.enum(sizeUnitOptions),
  notes: z.string().max(2000).optional(),
});

export const fileMetaSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string().optional(),
  url: z.string().url().optional(),
  key: z.string().optional(),
});

export const stepDocsSchema = z.object({
  files: z.array(fileMetaSchema).max(20, "Cap of 20 files for now."),
});

export const stepContactSchema = z.object({
  fullName: z.string().min(2, "Tell us your name."),
  role: z.enum(roleOptions, { errorMap: () => ({ message: "Pick a role." }) }),
  company: z.string().min(2, "Company is required."),
  email: z.string().email("That doesn't look like an email."),
  phone: z
    .string()
    .min(7, "Phone looks short.")
    .max(30, "Phone looks long."),
  bestTime: z.string().max(80).optional(),
  consent: z
    .boolean()
    .refine((v) => v === true, { message: "We need consent to follow up." }),
});

export const rfqSubmissionSchema = stepBasicsSchema
  .merge(stepScopeSchema)
  .merge(stepDocsSchema)
  .merge(stepContactSchema);

/**
 * Lightweight schema for the homepage inline CTA form. We collect just enough
 * to route the lead and have the estimator follow up — every multi-step-only
 * field is optional and back-filled with sensible defaults in the API route.
 */
export const quickRfqSchema = z.object({
  source: z.literal("quick-cta"),
  fullName: z.string().min(2, "Tell us your name."),
  company: z.string().min(2, "Company is required."),
  email: z.string().email("That doesn't look like an email."),
  market: z.enum(marketOptions as [string, ...string[]], {
    errorMap: () => ({ message: "Pick a project type." }),
  }),
  needBy: z
    .string()
    .max(40, "Keep it short.")
    .optional(),
  notes: z.string().max(2000).optional(),
  files: z.array(fileMetaSchema).max(20).optional(),
});

export type StepBasics = z.infer<typeof stepBasicsSchema>;
export type StepScope = z.infer<typeof stepScopeSchema>;
export type StepDocs = z.infer<typeof stepDocsSchema>;
export type StepContact = z.infer<typeof stepContactSchema>;
export type RfqSubmission = z.infer<typeof rfqSubmissionSchema>;
export type QuickRfqSubmission = z.infer<typeof quickRfqSchema>;

export const STEPS = [
  { id: 1, key: "basics", title: "Project basics", description: "Market, location, timing." },
  { id: 2, key: "scope", title: "Scope", description: "What needs to be done, and how big." },
  { id: 3, key: "docs", title: "Documents", description: "Plans, specs, photos. Optional." },
  { id: 4, key: "contact", title: "Contact", description: "How we get back to you." },
] as const;

export type StepKey = (typeof STEPS)[number]["key"];
