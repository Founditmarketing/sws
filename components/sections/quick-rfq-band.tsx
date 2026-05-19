"use client";

import { useCallback, useRef, useState, useTransition, type FormEvent } from "react";
import { ArrowRight, Check, FileText, Loader2, Trash2, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUploadThing } from "@/lib/uploadthing-client";
import { markets } from "@/lib/content/markets";
import {
  fileMetaSchema,
  quickRfqSchema,
  type QuickRfqSubmission,
} from "@/lib/rfq/schema";
import { Field, Input, Select } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import type { z } from "zod";

type FileMeta = z.infer<typeof fileMetaSchema>;

type FormValues = Omit<QuickRfqSubmission, "source" | "files">;

type ConfirmationState = {
  reference: string;
  receivedAtLabel: string;
  promiseLabel: string;
};

const MAX_FILES = 8;
const ACCEPT = ".pdf,.dwg,.dxf,.zip,.png,.jpg,.jpeg,.tif,.tiff,.docx,.xlsx";

export function QuickRfqBand({
  eyebrow = "Ready to break ground?",
  title = "Send us your plans. We'll have a number on your desk in 48 hours.",
  description = "Drop your drawings or RFP — a project-ready estimator owns it from there.",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(
      quickRfqSchema.omit({ source: true, files: true }),
    ),
    defaultValues: { fullName: "", company: "", email: "" },
  });

  const [files, setFiles] = useState<FileMeta[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<ConfirmationState | null>(null);
  const [submitting, startSubmit] = useTransition();
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { startUpload, isAvailable } = useUploadThing("rfqDocs", {
    onClientUploadComplete: (res) => {
      setUploading(false);
      if (!res) return;
      const newOnes: FileMeta[] = res.map((r) => ({
        name: r.name,
        size: r.size,
        type: r.type,
        url: r.url ?? r.ufsUrl,
        key: r.key,
      }));
      setFiles((prev) => [...prev, ...newOnes].slice(0, MAX_FILES));
    },
    onUploadError: (err) => {
      setUploading(false);
      setUploadError(err.message ?? "Upload failed.");
    },
  });

  const onPick = useCallback(
    async (chosen: FileList | File[] | null) => {
      if (!chosen) return;
      const list = Array.from(chosen);
      if (!list.length) return;
      setUploadError(null);

      if (!isAvailable) {
        setFiles((prev) =>
          [
            ...prev,
            ...list.map((f) => ({ name: f.name, size: f.size, type: f.type })),
          ].slice(0, MAX_FILES),
        );
        return;
      }

      try {
        setUploading(true);
        await startUpload(list);
      } catch (e) {
        setUploading(false);
        setUploadError(e instanceof Error ? e.message : "Upload failed.");
      }
    },
    [isAvailable, startUpload],
  );

  function removeFile(idx: number) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  function onSubmit(values: FormValues) {
    setSubmitError(null);
    const payload: QuickRfqSubmission = {
      source: "quick-cta",
      ...values,
      files,
    };

    startSubmit(async () => {
      try {
        const res = await fetch("/api/rfq", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = (await res.json()) as {
          ok: boolean;
          reference?: string;
          error?: string;
        };
        if (!res.ok || !json.ok || !json.reference) {
          throw new Error(json.error ?? "Submission failed.");
        }

        setConfirmation({
          reference: json.reference,
          receivedAtLabel: formatReceivedAt(new Date()),
          promiseLabel: formatPromiseDeadline(values.needBy),
        });
        setFiles([]);
        reset();
      } catch (e) {
        setSubmitError(e instanceof Error ? e.message : "Submission failed.");
      }
    });
  }

  return (
    <section
      aria-labelledby="quick-rfq-heading"
      data-cta-band
      className="relative isolate overflow-hidden bg-graphite-950 py-20 md:py-32"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(6,7,9,0.78) 0%, rgba(6,7,9,0.96) 100%), url('/newsiteworkpics/siteworkprojectpic10.jpeg')",
        }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 grid-noise opacity-[0.06]" />

      <div className="container-page relative">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div className="lg:pt-3">
            <span className="heading-eyebrow inline-flex items-center gap-3">
              <span className="inline-block h-px w-6 bg-amber-300" aria-hidden />
              {eyebrow}
            </span>
            <h2
              id="quick-rfq-heading"
              className="mt-6 font-display text-balance text-[clamp(1.75rem,5vw+0.4rem,2.25rem)] font-extrabold leading-[1.1] tracking-tight text-bone-100 md:text-4xl md:leading-[1.05] lg:text-5xl"
            >
              {title}
            </h2>
            <p className="mt-5 max-w-md text-pretty text-graphite-300 md:mt-6 md:text-lg">
              {description}
            </p>
            <ul className="mt-8 flex flex-col gap-3 text-sm text-graphite-300">
              {[
                "Real numbers from a project-ready estimator.",
                "Files stay private. Used only to scope your work.",
                "Prefer the long form? Use ",
              ].map((line, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check
                    className="mt-0.5 h-4 w-4 flex-none text-amber-300"
                    strokeWidth={2.5}
                  />
                  <span>
                    {line}
                    {i === 2 ? (
                      <a
                        href="/rfq"
                        className="text-amber-300 underline-offset-4 hover:underline"
                      >
                        the full RFQ
                      </a>
                    ) : null}
                    {i === 2 ? "." : ""}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {confirmation ? (
            <ConfirmationPanel
              confirmation={confirmation}
              onAnother={() => setConfirmation(null)}
            />
          ) : (
            <form
              onSubmit={
                handleSubmit(onSubmit) as (e: FormEvent<HTMLFormElement>) => void
              }
              noValidate
              className="border border-bone-100/10 bg-graphite-950/85 p-6 backdrop-blur-md md:p-8"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Your name"
                  required
                  htmlFor="quick-fullName"
                  error={errors.fullName?.message}
                >
                  <Input
                    id="quick-fullName"
                    autoComplete="name"
                    placeholder="Jane Estimator"
                    aria-invalid={errors.fullName ? true : undefined}
                    {...register("fullName")}
                  />
                </Field>

                <Field
                  label="Company"
                  required
                  htmlFor="quick-company"
                  error={errors.company?.message}
                >
                  <Input
                    id="quick-company"
                    autoComplete="organization"
                    placeholder="Acme Construction"
                    aria-invalid={errors.company ? true : undefined}
                    {...register("company")}
                  />
                </Field>

                <Field
                  label="Work email"
                  required
                  htmlFor="quick-email"
                  error={errors.email?.message}
                  className="md:col-span-2"
                >
                  <Input
                    id="quick-email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@acme.com"
                    aria-invalid={errors.email ? true : undefined}
                    {...register("email")}
                  />
                </Field>

                <Field
                  label="Project type"
                  required
                  htmlFor="quick-market"
                  error={errors.market?.message}
                >
                  <Select
                    id="quick-market"
                    defaultValue=""
                    aria-invalid={errors.market ? true : undefined}
                    {...register("market")}
                  >
                    <option value="" disabled>
                      Select a project type
                    </option>
                    {markets.map((m) => (
                      <option key={m.slug} value={m.slug}>
                        {m.title}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field
                  label="Need it back by"
                  htmlFor="quick-needBy"
                  hint="Optional. Default: 48 hours."
                  error={errors.needBy?.message}
                >
                  <Input
                    id="quick-needBy"
                    type="date"
                    min={isoDate(new Date())}
                    aria-label="Need it back by - pick a date"
                    aria-invalid={errors.needBy ? true : undefined}
                    className="input-date tabular-nums"
                    {...register("needBy")}
                  />
                </Field>

                <div className="md:col-span-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-200">
                    Drawings, RFP, or scope
                  </span>
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      onPick(e.dataTransfer.files);
                    }}
                    className={cn(
                      "mt-2 flex flex-col items-center justify-center gap-2 border border-dashed border-bone-100/20 bg-graphite-900/40 px-4 py-6 text-center transition-colors",
                      dragOver && "border-amber-300 bg-amber-300/5",
                    )}
                  >
                    <Upload className="h-5 w-5 text-amber-300" strokeWidth={2} />
                    <p className="text-sm text-graphite-200">
                      Drop PDF / DWG / ZIP, or
                      <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="ml-2 font-mono text-xs uppercase tracking-[0.18em] text-amber-300 underline-offset-4 hover:underline"
                      >
                        {uploading ? "uploading..." : "browse"}
                      </button>
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-graphite-400">
                      Optional. Up to 8 files.
                    </p>
                    <input
                      ref={inputRef}
                      type="file"
                      multiple
                      accept={ACCEPT}
                      className="hidden"
                      onChange={(e) => onPick(e.target.files)}
                    />
                  </div>
                  {uploadError ? (
                    <p className="mt-2 text-xs text-amber-300">{uploadError}</p>
                  ) : null}
                  {files.length ? (
                    <ul className="mt-3 flex flex-col gap-px overflow-hidden border border-bone-100/10 bg-bone-100/10">
                      {files.map((f, i) => (
                        <li
                          key={`${f.name}-${i}`}
                          className="flex items-center gap-3 bg-graphite-950 px-3 py-2 text-xs"
                        >
                          <FileText
                            className="h-3.5 w-3.5 flex-none text-amber-300"
                            strokeWidth={2.2}
                          />
                          <span className="flex-1 truncate text-bone-100">
                            {f.name}
                          </span>
                          <span className="font-mono text-[10px] text-graphite-300">
                            {formatBytes(f.size)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(i)}
                            aria-label={`Remove ${f.name}`}
                            className="text-graphite-300 transition-colors hover:text-amber-300"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>

              {submitError ? (
                <p className="mt-5 border border-amber-300/40 bg-amber-300/10 p-3 text-xs text-amber-300">
                  {submitError}
                </p>
              ) : null}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite-400">
                  Response within {SLA_HOURS}h.
                </p>
                <button
                  type="submit"
                  disabled={submitting || uploading}
                  aria-busy={submitting || uploading}
                  className="group inline-flex items-center justify-center gap-2 bg-amber-300 px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.08em] text-graphite-950 transition-[background,transform] hover:-translate-y-px hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2
                        className="h-4 w-4 animate-spin motion-reduce:animate-none"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send to estimator
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        strokeWidth={2.5}
                      />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

const SLA_HOURS = 48;

function ConfirmationPanel({
  confirmation,
  onAnother,
}: {
  confirmation: ConfirmationState;
  onAnother: () => void;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col gap-6 border border-amber-300/40 bg-graphite-950/85 p-8 backdrop-blur-md md:p-10"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center bg-amber-300 text-graphite-950">
        <Check className="h-5 w-5" strokeWidth={3} />
      </span>
      <div>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300">
          Thanks - your scope is in.
        </span>
        <p className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight text-bone-100 md:text-3xl">
          We received your scope at {confirmation.receivedAtLabel}.
        </p>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.22em] text-amber-300">
          Reference: {confirmation.reference}
        </p>
        <p className="mt-3 text-sm text-graphite-200 md:text-base">
          {confirmation.promiseLabel}
        </p>
      </div>
      <div className="border-t border-bone-100/10 pt-4">
        <button
          type="button"
          onClick={onAnother}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-300 transition-colors hover:text-amber-300"
        >
          Send another
        </button>
      </div>
    </div>
  );
}

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function formatBytes(b: number) {
  if (!b) return "0 B";
  const u = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(b) / Math.log(1024));
  return `${(b / Math.pow(1024, i)).toFixed(i ? 1 : 0)} ${u[i]}`;
}

function formatReceivedAt(d: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Chicago",
    timeZoneName: "short",
  }).format(d);
}

function formatPromiseDeadline(needBy: string | undefined) {
  const base = new Date();
  let deadline: Date;
  if (needBy) {
    const [yyyy, mm, dd] = needBy.split("-").map(Number);
    if (yyyy && mm && dd) {
      deadline = new Date(Date.UTC(yyyy, mm - 1, dd, 22, 0));
    } else {
      deadline = new Date(base.getTime() + SLA_HOURS * 60 * 60 * 1000);
    }
  } else {
    deadline = new Date(base.getTime() + SLA_HOURS * 60 * 60 * 1000);
  }

  const dateLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "America/Chicago",
  }).format(deadline);
  const timeLabel = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: true,
    timeZone: "America/Chicago",
    timeZoneName: "short",
  }).format(deadline);

  return `Number on your desk by ${dateLabel}, ${timeLabel}.`;
}
