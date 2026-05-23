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
          "font-serif tracking-tight text-welqo-anthracite dark:text-white transition-colors duration-300",
          sizes[size],
          className,
        )}
      >
        wel<span className="text-welqo-terracotta">Qo</span>
      </span>
    );
  }

  if (variant === "monogram") {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-xl bg-welqo-anthracite text-white font-serif border border-white/10 shadow-lg",
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
        w<span className="text-welqo-terracotta">Q</span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-xl bg-welqo-anthracite text-white font-serif border border-white/10 shadow-md",
          size === "sm"
            ? "w-6 h-6 text-xs"
            : size === "md"
              ? "w-9 h-9 text-base"
              : size === "lg"
                ? "w-14 h-14 text-xl"
                : "w-20 h-20 text-3xl",
        )}
      >
        w<span className="text-welqo-terracotta">Q</span>
      </div>
      <span
        className={cn(
          "font-serif tracking-tight text-welqo-anthracite dark:text-white",
          size === "sm"
            ? "text-lg"
            : size === "md"
              ? "text-2xl"
              : size === "lg"
                ? "text-4xl"
                : "text-6xl",
        )}
      >
        wel<span className="text-welqo-terracotta">Qo</span>
      </span>
    </div>
  );
};
