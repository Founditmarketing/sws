"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, File, FileText, Trash2, Upload } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing-client";
import type { z } from "zod";
import { fileMetaSchema, type StepDocs } from "@/lib/rfq/schema";
import { cn } from "@/lib/utils";

type FileMeta = z.infer<typeof fileMetaSchema>;

const MAX_FILES = 20;
const ACCEPT = ".pdf,.dwg,.dxf,.zip,.png,.jpg,.jpeg,.tif,.tiff,.docx,.xlsx";

export function StepDocumentsForm({
  defaults,
  onNext,
  onBack,
}: {
  defaults?: Partial<StepDocs>;
  onNext: (values: StepDocs) => void;
  onBack: () => void;
}) {
  const [files, setFiles] = useState<FileMeta[]>(defaults?.files ?? []);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
      setError(err.message ?? "Upload failed.");
    },
  });

  const onPick = useCallback(
    async (chosen: FileList | File[] | null) => {
      if (!chosen) return;
      const list = Array.from(chosen);
      if (!list.length) return;
      setError(null);

      if (!isAvailable) {
        // No UploadThing token configured - record metadata only as a graceful fallback.
        setFiles((prev) => {
          const merged = [
            ...prev,
            ...list.map((f) => ({ name: f.name, size: f.size, type: f.type })),
          ].slice(0, MAX_FILES);
          return merged;
        });
        return;
      }

      try {
        setUploading(true);
        await startUpload(list);
      } catch (e) {
        setUploading(false);
        setError(e instanceof Error ? e.message : "Upload failed.");
      }
    },
    [isAvailable, startUpload],
  );

  function remove(idx: number) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  function submit() {
    onNext({ files });
  }

  return (
    <div className="flex flex-col gap-6">
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
          "relative flex flex-col items-center justify-center gap-3 border border-dashed border-bone-100/25 bg-graphite-900/40 px-8 py-16 text-center transition-colors",
          dragOver && "border-amber-300 bg-amber-300/5",
        )}
      >
        <Upload className="h-8 w-8 text-amber-300" strokeWidth={2} />
        <div>
          <p className="font-display text-lg font-bold text-bone-100">
            Drop plans, specs, and photos here
          </p>
          <p className="mt-1 text-sm text-graphite-300">
            PDF, DWG/DXF, ZIP, images, or Office docs - up to 100MB each, 20 files total.
          </p>
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-2 inline-flex items-center gap-2 border border-amber-300/60 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-amber-300 transition-colors hover:bg-amber-300 hover:text-graphite-950"
        >
          {uploading ? "Uploading..." : "Browse files"}
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPT}
          className="hidden"
          onChange={(e) => onPick(e.target.files)}
        />
      </div>

      {!isAvailable ? (
        <p className="text-xs text-graphite-300">
          File uploads run through UploadThing once <code className="font-mono text-amber-300">UPLOADTHING_TOKEN</code>{" "}
          is set. For now we'll capture the file list and your sales engineer will follow up for the
          documents.
        </p>
      ) : null}

      {error ? <p className="text-sm text-amber-300">{error}</p> : null}

      {files.length ? (
        <ul className="flex flex-col gap-px overflow-hidden border border-bone-100/10 bg-bone-100/10">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center gap-4 bg-graphite-950 px-4 py-3 text-sm"
            >
              {f.type?.startsWith("image/") ? (
                <File className="h-4 w-4 flex-none text-amber-300" />
              ) : (
                <FileText className="h-4 w-4 flex-none text-amber-300" />
              )}
              <span className="flex-1 truncate text-bone-100">{f.name}</span>
              <span className="font-mono text-[11px] text-graphite-300">
                {formatBytes(f.size)}
              </span>
              <button
                type="button"
                onClick={() => remove(i)}
                aria-label={`Remove ${f.name}`}
                className="text-graphite-300 transition-colors hover:text-amber-300"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-graphite-300 transition-colors hover:text-bone-100"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <button
          type="button"
          onClick={submit}
          disabled={uploading}
          className="group inline-flex items-center justify-center gap-2 bg-amber-300 px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.08em] text-graphite-950 transition-[background,transform] hover:-translate-y-px hover:bg-amber-200 disabled:opacity-50"
        >
          {files.length ? "Continue to contact" : "Skip for now"}
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

function formatBytes(b: number) {
  if (!b) return "0 B";
  const u = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(b) / Math.log(1024));
  return `${(b / Math.pow(1024, i)).toFixed(i ? 1 : 0)} ${u[i]}`;
}
