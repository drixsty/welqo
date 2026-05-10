import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LuxuryCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glass" | "outline";
}

export const LuxuryCard = ({
  children,
  className,
  variant = "default",
}: LuxuryCardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg p-6 transition-all duration-200 border",
        variant === "default" &&
          "bg-white dark:bg-welqo-anthracite-dark border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700",
        variant === "glass" &&
          "bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-slate-200/50 dark:border-slate-800/50 shadow-sm",
        variant === "outline" &&
          "border-slate-200 dark:border-slate-800 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900/50",
        className,
      )}
    >
      {children}
    </div>
  );
};
