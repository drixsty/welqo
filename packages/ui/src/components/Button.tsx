import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LucideIcon } from "lucide-react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cream";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  href?: string;
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
      primary:
        "bg-welqo-terracotta text-white hover:bg-welqo-terracotta-dark shadow-sm hover:shadow-md",
      secondary:
        "bg-welqo-anthracite text-white hover:bg-welqo-anthracite-dark shadow-sm",
      outline:
        "border-2 border-welqo-anthracite text-welqo-anthracite hover:bg-welqo-anthracite hover:text-white",
      ghost: "text-welqo-anthracite hover:bg-welqo-anthracite/5",
      cream:
        "bg-welqo-cream text-welqo-anthracite hover:bg-welqo-cream-dark border border-welqo-anthracite/10",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-8 py-3.5 text-lg font-serif",
    };

    const commonClasses = cn(
      "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
      variants[variant],
      sizes[size],
      className,
    );

    const content = (
      <>
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <>
            {Icon && iconPosition === "left" && (
              <Icon className={cn("shrink-0", size === "sm" ? "w-4 h-4" : "w-5 h-5")} />
            )}
            {children}
            {Icon && iconPosition === "right" && (
              <Icon className={cn("shrink-0", size === "sm" ? "w-4 h-4" : "w-5 h-5")} />
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
