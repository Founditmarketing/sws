"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function AnimatedNumber({
  value,
  decimals = 0,
  delay = 0,
}: {
  value: number;
  decimals?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  
  // margin "0px 0px -50px 0px" ensures the animation starts when the element is slightly visible from the bottom,
  // without shrinking the left/right bounds (which causes bugs for elements near the screen edge on mobile).
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  useEffect(() => {
    if (isInView) {
      if (delay > 0) {
        const timeout = setTimeout(() => {
          motionValue.set(value);
        }, delay * 1000);
        return () => clearTimeout(timeout);
      } else {
        motionValue.set(value);
      }
    }
  }, [motionValue, isInView, value, delay]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(latest);
      }
    });
  }, [springValue, decimals]);

  // Render the initial 0 or 0.00 to avoid layout shift before hydration
  const initialValue = Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(0);

  return <span ref={ref}>{initialValue}</span>;
}
