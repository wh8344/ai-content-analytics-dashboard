import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "icon";
};

export function Button({
  className,
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-[background-color,border-color,color,transform,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/30 disabled:pointer-events-none disabled:opacity-50",
        variant === "default" &&
          "bg-zinc-950 text-white shadow-sm hover:-translate-y-0.5 hover:bg-zinc-800",
        variant === "outline" &&
          "border border-zinc-200 bg-white text-zinc-900 shadow-sm hover:-translate-y-0.5 hover:bg-zinc-50",
        variant === "ghost" && "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950",
        size === "sm" && "h-8 px-3",
        size === "md" && "h-9 px-4",
        size === "icon" && "h-9 w-9",
        className,
      )}
      {...props}
    />
  );
}
