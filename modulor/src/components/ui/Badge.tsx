import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "accent" | "muted" | "success" | "warning";
  className?: string;
}

export function Badge({ children, variant = "primary", className }: BadgeProps) {
  const variants = {
    primary: "bg-primary-light text-primary",
    accent:  "bg-accent/20 text-dark-green",
    muted:   "bg-muted text-muted-foreground",
    success: "bg-green-100 text-green-700",
    warning: "bg-amber-100 text-amber-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
