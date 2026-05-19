"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-graphite-950 px-6 py-16 text-bone-100 antialiased">
        <h1 className="font-display text-2xl font-bold text-amber-300">Something went wrong</h1>
        <p className="mt-4 max-w-md text-sm text-graphite-300">
          {error.message || "An unexpected error occurred while rendering this page."}
        </p>
        {error.digest ? (
          <p className="mt-2 font-mono text-xs text-graphite-400">Digest: {error.digest}</p>
        ) : null}
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 border border-amber-300/60 px-4 py-2 font-mono text-xs uppercase tracking-wider text-amber-300 hover:bg-amber-300/10"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
