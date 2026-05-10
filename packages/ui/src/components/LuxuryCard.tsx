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
        "rounded-2xl p-8 transition-all duration-500",
        variant === "default" &&
          "bg-white dark:bg-welqo-anthracite-dark border border-welqo-cream-dark/50 shadow-card hover:shadow-card-hover",
        variant === "glass" &&
          "bg-white/80 dark:bg-welqo-anthracite/80 backdrop-blur-xl border border-white/20 shadow-xl",
        variant === "outline" &&
          "border border-welqo-anthracite/10 bg-transparent hover:border-welqo-anthracite/20 hover:bg-welqo-cream/30",
        className,
      )}
    >
      {children}
    </div>
  );
};
