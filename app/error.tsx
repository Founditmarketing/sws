"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app/error]", error);
  }, [error]);

  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <h1 className="font-display text-3xl font-extrabold text-bone-100 md:text-4xl">
        Something went wrong
      </h1>
      <p className="max-w-md text-pretty text-graphite-300">
        This page hit a client error. You can try again, or go back once the issue is cleared.
      </p>
      <button
        type="button"
        onClick={reset}
        className="border border-bone-100/20 bg-graphite-900 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-bone-100 transition-colors hover:border-amber-300/60 hover:text-amber-300"
      >
        Try again
      </button>
    </div>
  );
}
