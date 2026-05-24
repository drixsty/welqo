"use client";

export function GrainOverlay({ opacity = 0.035 }: { opacity?: number }) {
  return (
    <svg
      className="pointer-events-none fixed inset-0 z-[9990] h-full w-full"
      style={{ opacity }}
      aria-hidden="true"
    >
      <filter id="grain-filter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter)" />
    </svg>
  );
}
