"use client";

const KEY = "sws-rfq-draft-v1";

export type RfqDraft = {
  step: number;
  data: Record<string, unknown>;
  updatedAt: number;
};

export function loadDraft(): RfqDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RfqDraft;
    if (typeof parsed?.step !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveDraft(draft: RfqDraft) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      KEY,
      JSON.stringify({ ...draft, updatedAt: Date.now() }),
    );
  } catch {
    // sessionStorage can fail in private modes; non-fatal.
  }
}

export function clearDraft() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(KEY);
}
