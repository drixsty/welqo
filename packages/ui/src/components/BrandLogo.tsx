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

const WELQO_PATH =
  "M707.08,596.81v15.11c-14.17,3.66-28.34.7-41.44-5.16-5.6-2.5-18.7-12.36-22.12-13.14-3.69-.84-10.95.91-15.77.65-14.81-.79-32.66-7.8-44.1-17.19-4.43-3.63-15-14.47-16.42-19.73-1.28-4.72,5.73-17.37,6.78-22.69,16.31,58.96,100.71,58.2,115.72-1.82,18.17-72.69-83.99-113.44-115.71-34.26-8.32,20.78-20.05,74.86-34.42,88.17-22.18,20.54-41.43-3.43-52.33-21.6-2.81-4.69-5.97-10.34-7.73-15.37l-1.72.51c-9.89,17.49-25.55,51.25-50.92,42.48-14.6-5.05-19.72-21.1-24.61-34.17-11.15-29.8-19.74-60.8-29.37-91.11h15.95l28.53,86.92c5.41,14.38,13.03,36.48,29.74,16.26,8.9-10.77,15.84-25.49,22.78-37.63-6.26-15.89-21.4-38.56-10.68-55.22,8.03-12.48,26.99-15.69,36.62-3.54,9.44,11.92,4.89,26.51.06,39.38-1.9,5.04-8.67,15.96-7.79,20.38.47,2.35,4.95,10.25,6.4,12.94,3.9,7.24,15.12,26.76,22.06,29.99,13.94,6.5,18.93-12.8,22.6-22.57,16.24-43.25,24.43-108.32,82.79-113.68,88.27-8.1,117.43,107.84,41.47,146.41,12.77,9.52,28.02,12.53,43.64,9.66ZM477.88,514.52c1,.75,6.38-13.35,6.75-14.65,1.61-5.8,4.27-17.5-4.67-18.14-16.68-1.21-5.08,24.99-2.08,32.79Z";

export function WelqoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1080 1080"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d={WELQO_PATH} />
    </svg>
  );
}

export const BrandLogo = ({
  variant = "cursive",
  className,
  size = "md",
}: BrandLogoProps) => {
  const markSizes = {
    sm: "w-6 h-6",
    md: "w-9 h-9",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  };

  const textSizes = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
    xl: "text-7xl",
  };

  if (variant === "cursive") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <WelqoMark
          className={cn(markSizes[size], "text-welqo-terracotta shrink-0")}
        />
        <span
          className={cn(
            "font-serif tracking-tight transition-colors duration-300",
            textSizes[size],
          )}
        >
          wel<span className="text-welqo-terracotta">Qo</span>
        </span>
      </div>
    );
  }

  if (variant === "monogram") {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-xl bg-welqo-anthracite border border-white/10 shadow-lg",
          size === "sm"
            ? "w-8 h-8 p-1.5"
            : size === "md"
              ? "w-10 h-10 p-2"
              : size === "lg"
                ? "w-16 h-16 p-3"
                : "w-24 h-24 p-4",
          className,
        )}
      >
        <WelqoMark className="w-full h-full text-welqo-terracotta" />
      </div>
    );
  }

  // full variant
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-xl bg-welqo-anthracite border border-white/10 shadow-md shrink-0",
          size === "sm"
            ? "w-6 h-6 p-1"
            : size === "md"
              ? "w-9 h-9 p-1.5"
              : size === "lg"
                ? "w-14 h-14 p-2.5"
                : "w-20 h-20 p-3",
        )}
      >
        <WelqoMark className="w-full h-full text-welqo-terracotta" />
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
