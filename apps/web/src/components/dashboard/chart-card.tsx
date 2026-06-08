import { ReactNode } from "react";

interface ChartCardProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly height?: string;
  readonly children: ReactNode;
}

export function ChartCard({ title, subtitle, height = "220px", children }: ChartCardProps) {
  return (
    <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] p-[18px_20px]">
      <div className="flex items-center justify-between mb-[14px]">
        <h3 className="text-[14px] font-medium text-[var(--t1)] m-0">{title}</h3>
        {subtitle && <span className="text-[var(--t4)] text-[12px]">{subtitle}</span>}
      </div>
      <div className="relative w-full" style={{ height }}>
        {children}
      </div>
    </div>
  );
}
