"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface AnimatedCounterProps {
  to: number;
  from?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
  delay?: number;
  decimals?: number;
}

export function AnimatedCounter({
  to,
  from = 0,
  suffix = "",
  prefix = "",
  className,
  duration = 2,
  delay = 0,
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      const controls = animate(from, to, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) =>
          setValue(
            decimals > 0 ? parseFloat(v.toFixed(decimals)) : Math.round(v),
          ),
      });
      return () => controls.stop();
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, from, to, duration, delay, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
