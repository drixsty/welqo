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
  isClickable?: boolean;
}

export const LuxuryCard = ({
  children,
  className,
  variant = "default",
  isClickable = false,
}: LuxuryCardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg transition-all duration-300",
        variant === "default" &&
          "bg-white dark:bg-card border border-slate-100 dark:border-slate-800 shadow-sm",
        variant === "glass" && "glass-card",
        variant === "outline" &&
          "border border-slate-200 dark:border-slate-800 bg-transparent",
        isClickable && "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-primary/20",
        className,
      )}
    >
      {children}
    </div>
  );
};
