"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { OwlLogo } from "@/components/OwlLogo";
import {
  ListChecks,
  Eye,
  GitBranch,
  BarChart3,
  Users,
  Settings,
  CreditCard,
  BookOpen,
} from "lucide-react";
import { ReactNode } from "react";

interface NavItem {
  href: string;
  icon: ReactNode;
  label: string;
  badge?: string;
}

interface NavSection {
  section: string;
}

type SidebarItem = NavItem | NavSection;

const items: SidebarItem[] = [
  { href: "/dashboard/reviews", icon: <ListChecks size={15} />, label: "Reviews", badge: "12" },
  { href: "/dashboard/reviews/detail", icon: <Eye size={15} />, label: "Review detail" },
  { href: "/dashboard/repos", icon: <GitBranch size={15} />, label: "Repositories" },
  { href: "/dashboard/insights", icon: <BarChart3 size={15} />, label: "Insights" },
  { section: "Workspace" },
  { href: "/dashboard/team", icon: <Users size={15} />, label: "Team" },
  { href: "/dashboard/settings", icon: <Settings size={15} />, label: "Settings" },
  { section: "Account" },
  { href: "/dashboard/pricing", icon: <CreditCard size={15} />, label: "Pricing" },
  { href: "/dashboard/docs", icon: <BookOpen size={15} />, label: "Docs" },
];

function isSection(item: SidebarItem): item is NavSection {
  return "section" in item;
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex w-[210px] shrink-0 bg-[var(--g2)] border-r border-[var(--border)] flex-col">
      {/* Logo */}
      <div className="py-[18px] px-[16px] flex items-center gap-[9px] border-b border-[var(--border)]">
        <OwlLogo size={24} />
        <span className="font-[family-name:var(--font-display)] text-[19px] text-[var(--t1)]">MergeOwl</span>
      </div>

      {/* Nav */}
      <div className="py-[12px] px-[8px] flex-1">
        {items.map((item, i) => {
          if (isSection(item)) {
            return (
              <div key={i} className="text-[10px] text-[var(--t5)] tracking-[0.08em] uppercase py-[10px] px-[8px] pb-[4px] font-medium">
                {item.section}
              </div>
            );
          }

          const isActive = pathname === item.href || (item.href === "/dashboard/reviews" && pathname === "/dashboard");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-[9px] py-[8px] px-[10px] rounded-[var(--rs)] text-[13px] cursor-pointer transition-all duration-[180ms] mb-[1px] select-none no-underline ${
                isActive
                  ? "bg-[rgba(34,197,94,0.1)] text-[var(--em3)] font-medium"
                  : "text-[var(--t4)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--t2)]"
              }`}
            >
              {item.icon}
              {item.label}
              {item.badge && (
                <span className="ml-auto text-[10px] bg-[rgba(34,197,94,0.15)] text-[var(--em3)] py-[1px] px-[6px] rounded-[10px]">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* User */}
      <div className="py-[12px] px-[12px] border-t border-[var(--border)]">
        <div className="flex items-center gap-[9px] py-[8px] px-[10px] rounded-[var(--rs)]">
          <div className="w-[28px] h-[28px] rounded-full bg-[rgba(34,197,94,0.15)] flex items-center justify-center text-[11px] font-semibold text-[var(--em3)] shrink-0">
            AC
          </div>
          <div>
            <div className="text-[12px] text-[var(--t2)] font-medium">Acme Corp</div>
            <div className="text-[10px] text-[var(--t5)]">pro plan</div>
          </div>
        </div>
      </div>
    </div>
  );
}
