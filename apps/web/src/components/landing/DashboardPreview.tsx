"use client";

import { ScrollReveal } from "./ScrollReveal";
import { AnimatedCounter } from "./AnimatedCounter";
import { OwlLogo } from "@/components/OwlLogo";
import { Badge } from "@/components/ui/Badge";
import { LayoutDashboard, GitPullRequest, GitBranch, BarChart3, TrendingUp, Settings, Users, RefreshCw, Plus, TrendingUp as TrendUp, Check } from "lucide-react";

const sidebarLinks = [
  { icon: <LayoutDashboard size={16} />, label: "Overview", active: true },
  { icon: <GitPullRequest size={16} />, label: "Reviews" },
  { icon: <GitBranch size={16} />, label: "Repositories" },
  { section: "Analytics" },
  { icon: <BarChart3 size={16} />, label: "Insights" },
  { icon: <TrendingUp size={16} />, label: "Trends" },
  { section: "Settings" },
  { icon: <Settings size={16} />, label: "Config" },
  { icon: <Users size={16} />, label: "Team" },
];

const tableData = [
  { repo: "acme/api", pr: "PR #347 · JWT rotation refactor", count: 12, severity: "error" as const, sevLabel: "Error" },
  { repo: "acme/web", pr: "PR #201 · Dashboard v2 rewrite", count: 5, severity: "warning" as const, sevLabel: "Warning" },
  { repo: "acme/infra", pr: "PR #89 · Terraform IAM policies", count: 8, severity: "error" as const, sevLabel: "Error" },
  { repo: "acme/mobile", pr: "PR #134 · Push notification service", count: 3, severity: "suggestion" as const, sevLabel: "Suggestion" },
  { repo: "acme/sdk", pr: "PR #56 · Rate limiting middleware", count: 6, severity: "warning" as const, sevLabel: "Warning" },
];

export function DashboardPreview() {
  return (
    <div className="w-full flex justify-center">
      <ScrollReveal className="py-[60px] md:py-[80px] px-[20px] md:px-[40px] max-w-[1200px] w-full">
        <h2 className="font-[family-name:var(--font-display)] text-[32px] md:text-[38px] font-normal text-[var(--t1)] mb-[8px] text-center">
        Your review <em className="italic text-[var(--em)]">command centre.</em>
      </h2>
      <p className="text-[15px] text-[var(--t4)] text-center mb-[48px] font-light">
        Everything your team needs to track, triage, and act on review activity.
      </p>

      <div className="bg-[var(--g2)] border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden flex min-h-[560px]">
        {/* Sidebar */}
        <div className="w-[220px] bg-[var(--g3)] border-r border-[var(--border)] py-[24px] shrink-0">
          <div className="px-[20px] pb-[24px] flex items-center gap-[10px] border-b border-[var(--border)]">
            <OwlLogo size={22} />
            <span className="font-[family-name:var(--font-display)] text-[18px] text-[var(--t1)]">MergeOwl</span>
          </div>
          <div className="py-[16px] px-[12px]">
            {sidebarLinks.map((item, i) => {
              if ("section" in item) {
                return <div key={i} className="text-[10px] text-[var(--t5)] tracking-[0.08em] uppercase py-[12px] px-[12px] pb-[6px] font-medium">{item.section}</div>;
              }
              return (
                <div key={i} className={`flex items-center gap-[10px] py-[9px] px-[12px] rounded-[var(--radius-sm)] text-[13px] cursor-pointer transition-all duration-200 mb-[2px] ${
                  item.active
                    ? "bg-[rgba(34,197,94,0.08)] text-[var(--em3)] font-medium"
                    : "text-[var(--t4)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--t2)]"
                }`}>
                  {item.icon}
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Topbar */}
          <div className="py-[16px] px-[24px] border-b border-[var(--border)] flex items-center justify-between">
            <div>
              <div className="text-[15px] font-medium text-[var(--t1)]">Overview</div>
              <div className="text-[12px] text-[var(--t4)]">Last 30 days · Acme Engineering</div>
            </div>
            <div className="flex gap-[8px]">
              <button className="inline-flex items-center gap-[4px] bg-transparent border border-[var(--border2)] text-[var(--t4)] text-[11px] py-[4px] px-[10px] rounded-[6px] cursor-pointer transition-all duration-200 hover:border-[var(--em2)] hover:text-[var(--em3)]">
                <RefreshCw size={12} />Sync
              </button>
              <button className="inline-flex items-center gap-[4px] bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.2)] text-[var(--em3)] text-[11px] py-[4px] px-[10px] rounded-[6px] cursor-pointer transition-all duration-200">
                <Plus size={12} />Add repo
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-[24px] flex-1">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-[14px] mb-[28px]">
              <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--radius)] py-[18px] px-[20px]">
                <div className="text-[11px] text-[var(--t4)] tracking-[0.06em] uppercase font-medium mb-[10px]">Total reviews</div>
                <div className="font-[family-name:var(--font-display)] text-[32px] text-[var(--t1)] leading-[1]">
                  <AnimatedCounter target={1243} duration={1800} />
                </div>
                <div className="text-[11px] text-[var(--em)] mt-[6px] flex items-center gap-[4px]">
                  <TrendUp size={12} /> +18% this month
                </div>
              </div>
              <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--radius)] py-[18px] px-[20px]">
                <div className="text-[11px] text-[var(--t4)] tracking-[0.06em] uppercase font-medium mb-[10px]">Comments posted</div>
                <div className="font-[family-name:var(--font-display)] text-[32px] text-[var(--t1)] leading-[1]">
                  <AnimatedCounter target={8471} duration={2200} />
                </div>
                <div className="text-[11px] text-[var(--em)] mt-[6px] flex items-center gap-[4px]">
                  <TrendUp size={12} /> +24% this month
                </div>
              </div>
              <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--radius)] py-[18px] px-[20px]">
                <div className="text-[11px] text-[var(--t4)] tracking-[0.06em] uppercase font-medium mb-[10px]">Repos connected</div>
                <div className="font-[family-name:var(--font-display)] text-[32px] text-[var(--t1)] leading-[1]">
                  <AnimatedCounter target={24} duration={1200} />
                </div>
                <div className="text-[11px] text-[var(--em)] mt-[6px] flex items-center gap-[4px]">
                  <Check size={12} /> All active
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
              <div className="flex items-center justify-between py-[14px] px-[18px] border-b border-[var(--border)]">
                <span className="text-[13px] font-medium text-[var(--t1)]">Recent reviews</span>
                <span className="text-[11px] text-[var(--t4)]">Updated 2m ago</span>
              </div>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-[10px] text-[var(--t5)] font-medium tracking-[0.06em] uppercase py-[10px] px-[18px] text-left border-b border-[var(--border)]">Repository</th>
                    <th className="text-[10px] text-[var(--t5)] font-medium tracking-[0.06em] uppercase py-[10px] px-[18px] text-left border-b border-[var(--border)]">Pull request</th>
                    <th className="text-[10px] text-[var(--t5)] font-medium tracking-[0.06em] uppercase py-[10px] px-[18px] text-left border-b border-[var(--border)]">Comments</th>
                    <th className="text-[10px] text-[var(--t5)] font-medium tracking-[0.06em] uppercase py-[10px] px-[18px] text-left border-b border-[var(--border)]">Severity</th>
                    <th className="text-[10px] text-[var(--t5)] font-medium tracking-[0.06em] uppercase py-[10px] px-[18px] text-left border-b border-[var(--border)]"></th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, i) => (
                    <tr
                      key={i}
                      className="hover:[&_td]:bg-[rgba(34,197,94,0.02)]"
                      style={{
                        animation: `rowIn 0.4s ease forwards`,
                        animationDelay: `${(i + 1) * 0.1}s`,
                        opacity: 0,
                      }}
                    >
                      <td className="py-[11px] px-[18px] text-[12px] text-[var(--t2)] border-b border-[rgba(25,38,25,0.5)]">
                        <div className="flex items-center gap-[8px]">
                          <div className="w-[6px] h-[6px] rounded-full bg-[var(--em)]" />
                          {row.repo}
                        </div>
                      </td>
                      <td className="py-[11px] px-[18px] text-[var(--t4)] font-[family-name:var(--font-mono)] text-[11px] border-b border-[rgba(25,38,25,0.5)]">{row.pr}</td>
                      <td className="py-[11px] px-[18px] font-[family-name:var(--font-mono)] text-[13px] text-[var(--em)] border-b border-[rgba(25,38,25,0.5)]">{row.count}</td>
                      <td className="py-[11px] px-[18px] border-b border-[rgba(25,38,25,0.5)]">
                        <Badge variant={row.severity}>{row.sevLabel}</Badge>
                      </td>
                      <td className="py-[11px] px-[18px] border-b border-[rgba(25,38,25,0.5)]">
                        <button className="bg-transparent border border-[var(--border2)] text-[var(--t4)] text-[11px] py-[4px] px-[10px] rounded-[6px] cursor-pointer transition-all duration-200 hover:border-[var(--em2)] hover:text-[var(--em3)]">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
