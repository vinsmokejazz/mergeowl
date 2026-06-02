"use client";

import { ReactNode } from "react";

export function FilterChip({
  active = false,
  children,
  onClick,
  className = "",
}: {
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-[5px] py-[5px] px-[11px] rounded-full text-[11px] border cursor-pointer transition-all duration-150 font-[family-name:var(--font-body)] ${
        active
          ? "border-[rgba(34,197,94,0.3)] text-[var(--em3)] bg-[rgba(34,197,94,0.06)]"
          : "border-[var(--border2)] text-[var(--t4)] bg-transparent hover:border-[rgba(34,197,94,0.3)] hover:text-[var(--em3)] hover:bg-[rgba(34,197,94,0.06)]"
      } ${className}`}
    >
      {children}
    </button>
  );
}
