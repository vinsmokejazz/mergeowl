"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, Plus, Menu } from "lucide-react";

const pageLabels: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/reviews": "Reviews",
  "/dashboard/reviews/detail": "Review detail",
  "/dashboard/repos": "Repositories",
  "/dashboard/insights": "Insights",
  "/dashboard/team": "Team",
  "/dashboard/settings": "Settings",
  "/dashboard/pricing": "Pricing",
  "/dashboard/docs": "Docs",
};

export function Topbar() {
  const pathname = usePathname();
  const pageTitle = pageLabels[pathname] || "Dashboard";

  return (
    <div className="py-[12px] md:py-[14px] px-[16px] md:px-[24px] border-b border-[var(--border)] flex items-center justify-between bg-[var(--g2)]">
      <div className="flex items-center gap-[10px]">
        <button className="md:hidden inline-flex items-center text-[var(--t4)] hover:text-[var(--t1)] transition-colors">
          <Menu size={16} />
        </button>
        <span className="text-[12px] text-[var(--t5)]">
          MergeOwl <span className="text-[var(--t4)]">/ {pageTitle}</span>
        </span>
      </div>
      <div className="flex items-center gap-[8px]">
        <button className="inline-flex items-center gap-[6px] text-[12px] py-[7px] px-[13px] rounded-[var(--rs)] border border-[var(--border2)] bg-transparent text-[var(--t4)] cursor-pointer transition-all duration-[180ms] hover:border-[var(--border3)] hover:text-[var(--t2)]">
          <Bell size={14} />
        </button>
        <button className="inline-flex items-center gap-[6px] text-[12px] py-[7px] px-[13px] rounded-[var(--rs)] border border-[var(--border2)] bg-transparent text-[var(--t4)] cursor-pointer transition-all duration-[180ms] hover:border-[var(--border3)] hover:text-[var(--t2)]">
          <Search size={14} />
        </button>
        <button className="inline-flex items-center gap-[6px] text-[12px] py-[7px] px-[13px] rounded-[var(--rs)] cursor-pointer transition-all duration-[180ms] bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.25)] text-[var(--em3)] hover:bg-[rgba(34,197,94,0.18)] hover:text-[var(--em4)]">
          <Plus size={13} />
          New
        </button>
      </div>
    </div>
  );
}
