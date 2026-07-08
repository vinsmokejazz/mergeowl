"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckSquare, GitBranch, LayoutDashboard, Settings, Users, CreditCard, FileText, LogOut, ChevronDown } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/config";

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [openReviewsCount, setOpenReviewsCount] = useState<number>(0);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    async function fetchOpenReviews() {
      try {
        const response = await fetch(`${API_BASE}/api/stats`);
        if (response.ok) {
          const data = await response.json();
          setOpenReviewsCount(data.openReviews || 0);
        }
      } catch (err) {
        console.error("Failed to fetch open reviews count:", err);
      }
    }

    fetchOpenReviews();
  }, []);

  const links = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Reviews", href: "/dashboard/reviews", icon: CheckSquare, badge: openReviewsCount },
    { name: "Repositories", href: "/dashboard/repos", icon: GitBranch },
    { name: "Insights", href: "/dashboard/insights", icon: LayoutDashboard },
  ];

  const adminLinks = [
    { name: "Team", href: "/dashboard/team", icon: Users },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
    { name: "Pricing", href: "/dashboard/pricing", icon: CreditCard },
    { name: "Docs", href: "/dashboard/docs", icon: FileText },
  ];

  const userInitials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : session?.user?.email?.[0]?.toUpperCase() || "U";

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
              {link.badge !== undefined && link.badge > 0 && (
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
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full flex items-center gap-[9px] p-[8px_10px] rounded-[var(--rs)] cursor-pointer hover:bg-[rgba(255,255,255,0.04)] transition-all"
          >
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-[28px] h-[28px] rounded-full shrink-0"
              />
            ) : (
              <div className="w-[28px] h-[28px] rounded-full bg-[rgba(34,197,94,0.15)] flex items-center justify-center text-[11px] font-semibold text-[var(--em3)] shrink-0">
                {userInitials}
              </div>
            )}
            <div className="flex-1 min-w-0 text-left">
              <div className="text-[12px] text-[var(--t2)] font-medium truncate">
                {session?.user?.name || "User"}
              </div>
              <div className="text-[10px] text-[var(--t5)] truncate">
                {session?.user?.email || ""}
              </div>
            </div>
            <ChevronDown
              size={14}
              className={`text-[var(--t5)] shrink-0 transition-transform ${showDropdown ? "rotate-180" : ""}`}
            />
          </button>

          {showDropdown && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowDropdown(false)}
              />
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] overflow-hidden z-20 shadow-lg">
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="w-full flex items-center gap-[9px] p-[10px_12px] text-[13px] text-[var(--t2)] hover:bg-[rgba(255,255,255,0.04)] transition-all cursor-pointer"
                >
                  <LogOut size={15} className="shrink-0" />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
