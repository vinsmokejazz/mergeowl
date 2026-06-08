import { ReactNode } from "react";

interface StatCardProps {
  readonly title: string;
  readonly value: ReactNode;
  readonly delta?: ReactNode;
  readonly deltaType?: "up" | "down" | "neutral" | "warning";
}

export function StatCard({ title, value, delta, deltaType = "neutral" }: StatCardProps) {
  let deltaColor = "text-[var(--t4)]";
  if (deltaType === "up") deltaColor = "text-[var(--em3)]";
  if (deltaType === "down") deltaColor = "text-[var(--red)]";
  if (deltaType === "warning") deltaColor = "text-[var(--yellow)]";

  return (
    <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] p-[14px_16px]">
      <div className="text-[12px] text-[var(--t4)] font-medium tracking-[.04em] uppercase mb-[10px]">
        {title}
      </div>
      <div className={`font-[family-name:var(--font-d)] text-[34px] leading-none ${deltaType === "warning" ? "text-[var(--yellow)]" : "text-[var(--t1)]"}`}>
        {value}
      </div>
      {delta && (
        <div className={`text-[11px] mt-[6px] flex items-center gap-[4px] ${deltaColor}`}>
          {delta}
        </div>
      )}
    </div>
  );
}
