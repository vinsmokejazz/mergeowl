"use client";

import { Bell, Plus, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/reviews": "Reviews",
  "/dashboard/repos": "Repositories",
  "/dashboard/insights": "Insights",
  "/dashboard/team": "Team",
  "/dashboard/settings": "Settings",
  "/dashboard/pricing": "Pricing",
  "/dashboard/docs": "Docs",
};

export function Topbar() {
  const pathname = usePathname();
  let title = "Dashboard";
  
  // Find matching title even for nested routes like /dashboard/reviews/detail
  for (const [path, name] of Object.entries(titles)) {
    if (pathname === path || (path !== "/dashboard" && pathname?.startsWith(path))) {
      title = name;
      break;
    }
  }

  return (
    <div className="p-[14px_24px] border-b border-[var(--border)] flex items-center justify-between bg-[var(--g2)] shrink-0">
      <div className="flex items-center gap-[10px]">
        <div className="text-[12px] text-[var(--t5)]">
          MergeOwl <span className="text-[var(--t4)]">/ {title}</span>
        </div>
      </div>

      <div className="flex items-center gap-[8px]">
        <button className="inline-flex items-center justify-center gap-[6px] text-[12px] font-[family-name:var(--font-b)] p-[7px_13px] rounded-[var(--rs)] border border-[var(--border2)] bg-transparent text-[var(--t4)] cursor-pointer transition-all duration-[180ms] hover:border-[var(--border3)] hover:text-[var(--t2)] !p-[7px_8px]">
          <Bell size={14} />
        </button>
        <button className="inline-flex items-center justify-center gap-[6px] text-[12px] font-[family-name:var(--font-b)] p-[7px_13px] rounded-[var(--rs)] border border-[var(--border2)] bg-transparent text-[var(--t4)] cursor-pointer transition-all duration-[180ms] hover:border-[var(--border3)] hover:text-[var(--t2)] !p-[7px_8px]">
          <Search size={14} />
        </button>
        <button className="inline-flex items-center gap-[6px] text-[12px] font-[family-name:var(--font-b)] p-[7px_13px] rounded-[var(--rs)] cursor-pointer transition-all duration-[180ms] bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.25)] text-[var(--em3)] hover:bg-[rgba(34,197,94,0.18)] hover:text-[var(--em4)]">
          <Plus size={13} />
          New
        </button>
      </div>
    </div>
  );
}
