import { ReactNode } from "react";

type BadgeVariant = "error" | "warning" | "suggestion" | "info" | "neutral" | "purple";

const variantStyles: Record<BadgeVariant, string> = {
  error: "bg-[rgba(239,68,68,0.10)] text-[#fca5a5] border-[rgba(239,68,68,0.18)]",
  warning: "bg-[rgba(245,158,11,0.10)] text-[#fcd34d] border-[rgba(245,158,11,0.18)]",
  suggestion: "bg-[rgba(34,197,94,0.10)] text-[#4ade80] border-[rgba(34,197,94,0.18)]",
  info: "bg-[rgba(59,130,246,0.10)] text-[#93c5fd] border-[rgba(59,130,246,0.18)]",
  neutral: "bg-[rgba(107,114,128,0.10)] text-[#9ca3af] border-[rgba(107,114,128,0.18)]",
  purple: "bg-[rgba(168,85,247,0.10)] text-[#d8b4fe] border-[rgba(168,85,247,0.18)]",
};

export function Badge({
  variant = "neutral",
  children,
  className = "",
}: {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-[3px] text-[10px] font-semibold py-[3px] px-[8px] rounded-[4px] tracking-[0.04em] uppercase whitespace-nowrap border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
