import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BrandLogoProps {
  variant?: "cursive" | "monogram" | "full";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

/**
 * SVG trace of the wQ handwritten monogram.
 * Uses currentColor so it adapts to any parent text-color class.
 */
const WQMark = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 210 82"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Welqo"
    role="img"
  >
    {/* ── Cursive 'w' with distinctive centre loop ── */}
    <path
      d="M15 18 C12 32 10 48 14 63 C18 72 28 74 34 66 C40 58 41 45 46 37
         C51 28 58 24 62 31 C66 38 65 51 59 57
         C54 62 51 67 55 69 C59 72 68 69 73 61
         C78 52 81 38 80 25"
      stroke="currentColor"
      strokeWidth="5.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* ── 'Q' circle ── */}
    <circle cx="152" cy="40" r="30" stroke="currentColor" strokeWidth="5.5" />
    {/* ── 'Q' diagonal tail ── */}
    <path
      d="M168 56 C174 63 184 71 193 77"
      stroke="currentColor"
      strokeWidth="5.5"
      strokeLinecap="round"
    />
  </svg>
);

export const BrandLogo = ({
  variant = "cursive",
  className,
  size = "md",
}: BrandLogoProps) => {
  const heights: Record<string, string> = {
    sm: "h-7",
    md: "h-9",
    lg: "h-14",
    xl: "h-20",
  };

  if (variant === "cursive" || variant === "full") {
    return (
      <WQMark
        className={cn(
          heights[size],
          "w-auto transition-colors duration-300",
          className,
        )}
      />
    );
  }

  /* monogram — icon badge */
  const boxSizes: Record<string, string> = {
    sm: "w-8 h-8 p-1",
    md: "w-10 h-10 p-1.5",
    lg: "w-16 h-16 p-2.5",
    xl: "w-24 h-24 p-4",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl",
        "bg-welqo-anthracite text-white",
        "border border-white/10 shadow-lg",
        boxSizes[size],
        className,
      )}
    >
      <WQMark className="w-full h-full" />
    </div>
  );
};
