"use client";

import { useEffect, useRef } from "react";

type Direction = "up" | "left" | "scale";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  as?: keyof JSX.IntrinsicElements;
}

const directionClass: Record<Direction, string> = {
  up: "sr-hidden",
  left: "sr-hidden-left",
  scale: "sr-hidden-scale",
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => el.classList.add("sr-visible"), delay);
          obs.unobserve(el);
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  const Comp = Tag as any;

  return (
    <Comp
      ref={ref}
      className={`${directionClass[direction]} ${className}`}
    >
      {children}
    </Comp>
  );
}
