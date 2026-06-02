import { ReactNode } from "react";

export function StatCard({
  label,
  value,
  delta,
  deltaColor = "text-[#4ade80]",
  deltaIcon,
  valueColor = "text-[var(--t1)]",
  className = "",
}: {
  label: string;
  value: string | number | ReactNode;
  delta?: ReactNode;
  deltaColor?: string;
  deltaIcon?: ReactNode;
  valueColor?: string;
  className?: string;
}) {
  return (
    <div className={`bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] py-[14px] px-[16px] ${className}`}>
      <div className="text-[12px] text-[var(--t4)] font-medium tracking-[0.04em] uppercase mb-[10px]">
        {label}
      </div>
      <div className={`font-[family-name:var(--font-display)] text-[34px] leading-[1] ${valueColor}`}>
        {value}
      </div>
      {delta && (
        <div className={`text-[11px] mt-[6px] flex items-center gap-[4px] ${deltaColor}`}>
          {deltaIcon}
          {delta}
        </div>
      )}
    </div>
  );
}
