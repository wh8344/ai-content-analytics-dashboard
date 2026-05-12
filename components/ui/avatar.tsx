import { cn } from "@/lib/utils";

export function Avatar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-200 text-xs font-semibold text-zinc-700",
        className,
      )}
      aria-label="User avatar"
    >
      WH
    </div>
  );
}
