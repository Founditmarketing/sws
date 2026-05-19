"use client";

import { useEffect, useState } from "react";

// Global flag to track if the initial site load sequence has finished.
// This persists across page navigations within the same session.
let hasInitialLoadFinished = false;

export function SiteReveal({ children }: { children: React.ReactNode }) {
  // If the load sequence already finished, start visible immediately
  const [isVisible, setIsVisible] = useState(hasInitialLoadFinished);

  useEffect(() => {
    // If we've already done the initial load, do nothing
    if (hasInitialLoadFinished) {
      return;
    }

    // Wait exactly 4.2s (the entire duration of the LoadingScreen + its fade out)
    // before making the main website content visible.
    const timer = setTimeout(() => {
      setIsVisible(true);
      hasInitialLoadFinished = true;
    }, 4200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transition-opacity duration-1000 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
