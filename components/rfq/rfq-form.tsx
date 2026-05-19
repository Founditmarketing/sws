"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Stepper } from "./stepper";
import { StepBasicsForm } from "./step-basics";
import { StepScopeForm } from "./step-scope";
import { StepDocumentsForm } from "./step-documents";
import { StepContactForm } from "./step-contact";
import { clearDraft, loadDraft, saveDraft } from "@/lib/rfq/storage";
import {
  type StepBasics,
  type StepContact,
  type StepDocs,
  type StepScope,
  STEPS,
} from "@/lib/rfq/schema";

type AllValues = Partial<StepBasics & StepScope & StepDocs & StepContact>;

export function RfqForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<AllValues>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, startSubmit] = useTransition();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setStep(Math.min(Math.max(draft.step, 1), STEPS.length));
      setValues((draft.data as AllValues) ?? {});
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveDraft({ step, data: values, updatedAt: Date.now() });
  }, [step, values, hydrated]);

  function handleBasicsNext(v: StepBasics) {
    setValues((prev) => ({ ...prev, ...v }));
    setStep(2);
    scrollToTop();
  }
  function handleScopeNext(v: StepScope) {
    setValues((prev) => ({ ...prev, ...v }));
    setStep(3);
    scrollToTop();
  }
  function handleDocsNext(v: StepDocs) {
    setValues((prev) => ({ ...prev, ...v }));
    setStep(4);
    scrollToTop();
  }
  function handleContactSubmit(v: StepContact) {
    const merged = { ...values, ...v };
    setError(null);
    startSubmit(async () => {
      try {
        const res = await fetch("/api/rfq", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(merged),
        });
        const json = (await res.json()) as { ok: boolean; reference?: string; error?: string };
        if (!res.ok || !json.ok || !json.reference) {
          throw new Error(json.error ?? "Submission failed.");
        }
        clearDraft();
        router.push(`/rfq/thank-you?ref=${encodeURIComponent(json.reference)}`);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Submission failed.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-12">
      <Stepper current={step} />

      <div className="border border-bone-100/10 bg-graphite-950 p-6 md:p-10">
        {step === 1 ? (
          <StepBasicsForm defaults={values} onNext={handleBasicsNext} />
        ) : null}
        {step === 2 ? (
          <StepScopeForm
            defaults={values}
            onNext={handleScopeNext}
            onBack={() => setStep(1)}
          />
        ) : null}
        {step === 3 ? (
          <StepDocumentsForm
            defaults={values}
            onNext={handleDocsNext}
            onBack={() => setStep(2)}
          />
        ) : null}
        {step === 4 ? (
          <StepContactForm
            defaults={values}
            onSubmit={handleContactSubmit}
            onBack={() => setStep(3)}
            submitting={submitting}
          />
        ) : null}

        {error ? (
          <p className="mt-6 border border-amber-300/40 bg-amber-300/10 p-4 text-sm text-amber-300">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function scrollToTop() {
  if (typeof window === "undefined") return;
  window.scrollTo({ top: 120, behavior: "smooth" });
}
