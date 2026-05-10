import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LucideIcon } from "lucide-react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "xs" | "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  href?: string;
  target?: string;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon: Icon,
      iconPosition = "left",
      isLoading,
      children,
      disabled,
      href,
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary: "bg-primary text-white hover:bg-primary-dark/95 border border-primary/10 shadow-sm shadow-primary/5",
      secondary: "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 border border-slate-800 dark:border-slate-200 shadow-sm",
      outline: "border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-white bg-white/50 dark:bg-white/5 shadow-sm shadow-black/[0.02]",
      ghost: "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white",
    };

    const sizes = {
      xs: "px-2 py-1 text-[10px] font-semibold tracking-wide min-h-[28px]",
      sm: "px-3 py-1 text-xs font-semibold tracking-tight min-h-[32px]",
      md: "px-4 py-1.5 text-sm font-semibold tracking-tight min-h-[36px]",
      lg: "px-5 py-2.5 text-base font-semibold tracking-tight min-h-[44px]",
    };

    const commonClasses = cn(
      "inline-flex items-center justify-center gap-1.5 rounded-lg transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none",
      variants[variant],
      sizes[size],
      className,
    );

    const content = (
      <>
        {isLoading ? (
          <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <>
            {Icon && iconPosition === "left" && (
              <Icon className={cn("shrink-0", size === "xs" || size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4")} />
            )}
            <span className="truncate">{children}</span>
            {Icon && iconPosition === "right" && (
              <Icon className={cn("shrink-0", size === "xs" || size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4")} />
            )}
          </>
        )}
      </>
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={commonClasses}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={disabled || isLoading}
        className={commonClasses}
        {...props}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";
