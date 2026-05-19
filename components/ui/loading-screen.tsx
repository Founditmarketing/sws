"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // 2.8s for animations + 0.7s to hold = 3.5s total before fade out begins
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 3500);

    // After 0.6s fade out duration, unmount the component
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 4100);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-graphite-950 transition-opacity duration-700 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex w-full max-w-[8rem] flex-col items-center justify-center sm:max-w-[10rem] md:max-w-[12rem]">
        {/* The 3 logo parts */}
        <div className="relative w-full aspect-[2/1]">
          <Image
            src="/loadscreen/loadscreen-s1.png"
            alt="Sitework Specialist Logo Part 1"
            fill
            className="animate-pan-left-to-right object-contain"
            priority
          />
          <Image
            src="/loadscreen/loadscreens-w.png"
            alt="Sitework Specialist Logo Part 2"
            fill
            className="animate-pan-bottom-to-top object-contain"
            priority
          />
          <Image
            src="/loadscreen/loadscreens-s2.png"
            alt="Sitework Specialist Logo Part 3"
            fill
            className="animate-pan-right-to-left object-contain"
            priority
          />
        </div>

        {/* The text below */}
        <div className="mt-1 animate-fade-in-delayed text-center">
          <span className="whitespace-nowrap font-display text-[10px] font-medium uppercase tracking-[0.25em] text-graphite-400 md:text-xs">
            Sitework Specialist
          </span>
        </div>
      </div>
    </div>
  );
}
