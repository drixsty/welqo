import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-lg group/bento transition duration-200 shadow-sm dark:bg-slate-900 dark:border-slate-800 bg-white border border-slate-100 justify-between flex flex-col space-y-4 p-5",
        className,
      )}
    >
      {header}
      <div>
        {icon}
        <div className="font-bold text-slate-900 dark:text-white mb-1 mt-2 tracking-tight">
          {title}
        </div>
        <div className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};
