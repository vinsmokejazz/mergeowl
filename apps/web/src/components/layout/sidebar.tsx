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
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="shrink-0">
          <circle cx="16" cy="16" r="14" fill="#0b120b" stroke="#22c55e" strokeWidth="1"/>
          <ellipse cx="11.5" cy="15" rx="4" ry="5" fill="#141f14" stroke="#22c55e" strokeWidth="0.8"/>
          <ellipse cx="20.5" cy="15" rx="4" ry="5" fill="#141f14" stroke="#22c55e" strokeWidth="0.8"/>
          <circle cx="11.5" cy="15" r="2.5" fill="#22c55e" opacity="0.9"/>
          <circle cx="20.5" cy="15" r="2.5" fill="#22c55e" opacity="0.9"/>
          <circle cx="11.5" cy="15" r="1.2" fill="#070c07"/>
          <circle cx="20.5" cy="15" r="1.2" fill="#070c07"/>
          <path d="M13 21 Q16 23 19 21" stroke="#22c55e" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
          <path d="M12 9 L14 12 L16 10 L18 12 L20 9" stroke="#22c55e" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
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
