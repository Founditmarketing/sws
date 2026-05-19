"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface LightboxGalleryProps {
  images: string[];
  className?: string;
  imageClassName?: string;
  altPrefix?: string;
}

function isVideo(src: string) {
  return src.toLowerCase().endsWith(".mp4");
}

export function LightboxGallery({
  images,
  className,
  imageClassName,
  altPrefix = "Gallery media",
}: LightboxGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const nextMedia = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  }, [selectedIndex, images.length]);

  const prevMedia = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  }, [selectedIndex, images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        nextMedia();
      } else if (e.key === "ArrowLeft") {
        prevMedia();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    // Prevent scrolling when lightbox is open
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, closeLightbox, nextMedia, prevMedia]);

  return (
    <>
      <ul className={cn("mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
        {images.map((src, i) => {
          const video = isVideo(src);
          return (
            <li key={`${src}-${i}`} className={cn("overflow-hidden border border-bone-100/10", imageClassName)}>
              <button
                type="button"
                className="group relative block w-full h-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-graphite-950"
                onClick={() => setSelectedIndex(i)}
                aria-label={`View ${altPrefix} ${i + 1} in fullscreen`}
              >
                {video ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-graphite-900">
                    <video
                      src={src}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-graphite-950/20 transition-colors duration-300 group-hover:bg-graphite-950/40">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-300/90 text-graphite-950 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                        <Play className="ml-1 h-6 w-6 fill-current" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="aspect-[4/3] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${src}')` }}
                    role="img"
                    aria-label={`${altPrefix} ${i + 1}`}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-graphite-950/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Media lightbox"
        >
          <div className="absolute inset-0" onClick={closeLightbox} aria-hidden="true" />
          
          <div className="relative z-10 flex w-full max-w-7xl flex-col items-center justify-center p-4 md:p-8 h-full pointer-events-none">
            <button
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-50 inline-flex h-12 w-12 items-center justify-center text-bone-100/70 transition-colors hover:text-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 bg-graphite-950/40 md:right-8 md:top-8 pointer-events-auto"
              aria-label="Close lightbox"
            >
              <X className="h-8 w-8" strokeWidth={2} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevMedia(); }}
              className="absolute left-2 top-1/2 z-50 flex h-14 w-14 -translate-y-1/2 items-center justify-center text-bone-100/70 transition-colors hover:text-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 bg-graphite-950/40 md:left-6 pointer-events-auto"
              aria-label="Previous media"
            >
              <ChevronLeft className="h-10 w-10" strokeWidth={2} />
            </button>

            <div className="relative flex h-full max-h-[85vh] w-full max-w-full items-center justify-center pointer-events-auto">
              {isVideo(images[selectedIndex]) ? (
                <video
                  src={images[selectedIndex]}
                  className="max-h-[85vh] max-w-full object-contain shadow-2xl"
                  controls
                  autoPlay
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <img
                  src={images[selectedIndex]}
                  alt={`${altPrefix} ${selectedIndex + 1}`}
                  className="max-h-[85vh] max-w-full object-contain shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>

            <div className="absolute bottom-6 left-0 right-0 z-50 text-center font-mono text-xs tracking-widest text-graphite-300">
              {selectedIndex + 1} / {images.length}
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); nextMedia(); }}
              className="absolute right-2 top-1/2 z-50 flex h-14 w-14 -translate-y-1/2 items-center justify-center text-bone-100/70 transition-colors hover:text-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 bg-graphite-950/40 md:right-6 pointer-events-auto"
              aria-label="Next media"
            >
              <ChevronRight className="h-10 w-10" strokeWidth={2} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
