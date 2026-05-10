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

export const BrandLogo = ({
  variant = "cursive",
  className,
  size = "md",
}: BrandLogoProps) => {
  const sizes = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
    xl: "text-7xl",
  };

  if (variant === "cursive") {
    return (
      <span
        className={cn(
          "font-bold tracking-tight text-slate-900 dark:text-white",
          sizes[size],
          className,
        )}
      >
        welqo
      </span>
    );
  }

  if (variant === "monogram") {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-lg bg-slate-900 text-white font-bold",
          size === "sm"
            ? "w-8 h-8 text-sm"
            : size === "md"
              ? "w-10 h-10 text-lg"
              : size === "lg"
                ? "w-16 h-16 text-2xl"
                : "w-24 h-24 text-4xl",
          className,
        )}
      >
        wq
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-lg bg-slate-900 text-white font-bold",
          size === "sm"
            ? "w-6 h-6 text-xs"
            : size === "md"
              ? "w-8 h-8 text-sm"
              : size === "lg"
                ? "w-12 h-12 text-lg"
                : "w-20 h-20 text-3xl",
        )}
      >
        wq
      </div>
      <span
        className={cn(
          "font-bold tracking-tight text-slate-900 dark:text-white",
          size === "sm"
            ? "text-lg"
            : size === "md"
              ? "text-xl"
              : size === "lg"
                ? "text-3xl"
                : "text-5xl",
        )}
      >
        welqo
      </span>
    </div>
  );
};
