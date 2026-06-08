"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckSquare, GitBranch, LayoutDashboard, Settings, Users, CreditCard, FileText } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Reviews", href: "/dashboard/reviews", icon: CheckSquare, badge: 12 },
    { name: "Repositories", href: "/dashboard/repos", icon: GitBranch },
    { name: "Insights", href: "/dashboard/insights", icon: LayoutDashboard }, // using dashboard icon for now, html used ti-chart-dots
  ];

  const adminLinks = [
    { name: "Team", href: "/dashboard/team", icon: Users },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
    { name: "Pricing", href: "/dashboard/pricing", icon: CreditCard },
    { name: "Docs", href: "/dashboard/docs", icon: FileText },
  ];

  return (
    <div className="w-[210px] shrink-0 bg-[var(--g2)] border-r border-[var(--border)] flex flex-col h-full">
      {/* Logo */}
      <div className="p-[18px_16px] flex items-center gap-[9px] border-b border-[var(--border)]">
        <div className="w-[24px] h-[24px] rounded-full bg-[var(--em)] flex items-center justify-center shrink-0">
           <div className="w-[12px] h-[12px] border-2 border-white rounded-full"></div>
        </div>
        <div className="font-[family-name:var(--font-d)] text-[19px] text-[var(--t1)]">MergeOwl</div>
      </div>

      {/* Nav */}
      <div className="p-[12px_8px] flex-1 overflow-y-auto">
        <div className="text-[10px] text-[var(--t5)] tracking-[.08em] uppercase p-[10px_8px_4px] font-medium">Overview</div>
        
        {links.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname?.startsWith(link.href));
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-[9px] p-[8px_10px] rounded-[var(--rs)] text-[13px] cursor-pointer transition-all duration-180 mb-[1px] select-none ${
                isActive 
                  ? "bg-[rgba(34,197,94,0.1)] text-[var(--em3)] font-medium" 
                  : "text-[var(--t4)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--t2)]"
              }`}
            >
              <link.icon size={15} className="shrink-0" />
              {link.name}
              {link.badge && (
                <span className="ml-auto text-[10px] bg-[rgba(34,197,94,0.15)] text-[var(--em3)] px-[6px] py-[1px] rounded-[10px]">
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="text-[10px] text-[var(--t5)] tracking-[.08em] uppercase p-[10px_8px_4px] font-medium mt-[10px]">Administration</div>
        
        {adminLinks.map((link) => {
          const isActive = pathname?.startsWith(link.href);
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-[9px] p-[8px_10px] rounded-[var(--rs)] text-[13px] cursor-pointer transition-all duration-180 mb-[1px] select-none ${
                isActive 
                  ? "bg-[rgba(34,197,94,0.1)] text-[var(--em3)] font-medium" 
                  : "text-[var(--t4)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--t2)]"
              }`}
            >
              <link.icon size={15} className="shrink-0" />
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* Bottom user */}
      <div className="p-[12px] border-t border-[var(--border)]">
        <div className="flex items-center gap-[9px] p-[8px_10px] rounded-[var(--rs)] cursor-pointer hover:bg-[rgba(255,255,255,0.04)] transition-all">
          <div className="w-[28px] h-[28px] rounded-full bg-[rgba(34,197,94,0.15)] flex items-center justify-center text-[11px] font-semibold text-[var(--em3)] shrink-0">
            SJ
          </div>
          <div>
            <div className="text-[12px] text-[var(--t2)] font-medium">Sarah Johnson</div>
            <div className="text-[10px] text-[var(--t5)]">sarah@acme.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}
