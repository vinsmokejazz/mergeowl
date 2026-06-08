"use client";

import { Activity, AlertTriangle, Circle, Plus } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { RepoCard } from "@/components/dashboard/repo-card";

const reposData = [
  { name: "acme/api", lang: "TypeScript", prs: 12, status: "green" as const },
  { name: "acme/web", lang: "React", prs: 5, status: "green" as const },
  { name: "acme/infra", lang: "Terraform", prs: 3, status: "green" as const },
  { name: "acme/mobile", lang: "Swift", prs: 1, status: "green" as const },
  { name: "acme/sdk", lang: "Go", prs: 2, status: "yellow" as const },
  { name: "acme/cli", lang: "Rust", prs: 0, status: "green" as const },
  { name: "acme/docs", lang: "Markdown", prs: 0, status: "gray" as const },
  { name: "acme/analytics", lang: "Python", prs: 4, status: "yellow" as const },
];

export default function ReposPage() {
  return (
    <div className="page-section" style={{ animation: "fadeIn 0.3s ease both" }}>
      <div className="grid grid-cols-3 gap-[14px] mb-[20px]">
        <StatCard title="Connected repos" value="24" delta={<><Activity size={12} />+3 this week</>} deltaType="up" />
        <StatCard title="Active today" value="11" delta={<><Circle size={8} fill="currentColor" /><span className="text-[var(--em3)] font-medium">All healthy</span></>} deltaType="neutral" />
        <StatCard title="Pending setup" value="2" delta={<><AlertTriangle size={12} />Action needed</>} deltaType="warning" />
      </div>

      <div className="flex items-center justify-between mb-[14px]">
        <h3 className="text-[14px] font-medium text-[var(--t1)] m-0">All repositories</h3>
        <button className="inline-flex items-center gap-[6px] text-[12px] font-[family-name:var(--font-b)] p-[7px_13px] rounded-[var(--rs)] border border-[rgba(34,197,94,0.25)] bg-[rgba(34,197,94,0.1)] text-[var(--em3)] cursor-pointer transition-all duration-[180ms] hover:border-[rgba(34,197,94,0.18)] hover:bg-[rgba(34,197,94,0.18)] hover:text-[var(--em4)]">
          <Plus size={13} />
          Add repo
        </button>
      </div>

      <div className="flex flex-col gap-[8px]">
        {reposData.map((repo) => (
          <RepoCard key={repo.name} {...repo} />
        ))}
      </div>
    </div>
  );
}
