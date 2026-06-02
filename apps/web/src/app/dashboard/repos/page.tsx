import { StatCard } from "@/components/ui/StatCard";
import { TrendingUp, AlertCircle, Circle, GitBranch, Plus } from "lucide-react";

const repos = [
  { name: "acme/api", lang: "TypeScript", prs: 12, status: "green" },
  { name: "acme/web", lang: "React", prs: 5, status: "green" },
  { name: "acme/infra", lang: "Terraform", prs: 3, status: "green" },
  { name: "acme/mobile", lang: "Swift", prs: 1, status: "green" },
  { name: "acme/sdk", lang: "Go", prs: 2, status: "yellow" },
  { name: "acme/cli", lang: "Rust", prs: 0, status: "green" },
  { name: "acme/docs", lang: "Markdown", prs: 0, status: "gray" },
  { name: "acme/analytics", lang: "Python", prs: 4, status: "yellow" },
];

const statusColors: Record<string, string> = {
  green: "bg-[var(--em)]",
  yellow: "bg-[var(--yellow)]",
  gray: "bg-[var(--t5)]",
};

const statusLabels: Record<string, string> = {
  green: "Active",
  yellow: "Setup needed",
  gray: "Paused",
};

export default function ReposPage() {
  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-[14px] mb-[20px]">
        <StatCard label="Connected repos" value="24" delta="+3 this week" deltaIcon={<TrendingUp size={12} />} />
        <StatCard
          label="Active today"
          value="11"
          delta="All healthy"
          deltaIcon={<Circle size={8} fill="currentColor" className="text-[var(--em)]" />}
          deltaColor="text-[var(--em3)]"
        />
        <StatCard
          label="Pending setup"
          value="2"
          valueColor="text-[var(--yellow)]"
          delta="Action needed"
          deltaColor="text-[var(--yellow)]"
          deltaIcon={<AlertCircle size={12} />}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-[14px]">
        <h3 className="text-[14px] font-medium text-[var(--t1)]">All repositories</h3>
        <button className="inline-flex items-center gap-[6px] text-[12px] py-[7px] px-[13px] rounded-[var(--rs)] cursor-pointer transition-all duration-[180ms] bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.25)] text-[var(--em3)] hover:bg-[rgba(34,197,94,0.18)]">
          <Plus size={13} />
          Add repo
        </button>
      </div>

      {/* Repo list */}
      <div className="flex flex-col gap-[8px]">
        {repos.map((r) => (
          <div
            key={r.name}
            className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] py-[16px] px-[18px] flex items-center gap-[14px] transition-all duration-200 hover:border-[var(--border3)] hover:-translate-y-[1px]"
          >
            <div className="w-[38px] h-[38px] rounded-[8px] bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.15)] flex items-center justify-center text-[18px] text-[var(--em)] shrink-0">
              <GitBranch size={18} />
            </div>
            <div>
              <div className="text-[13px] font-medium text-[var(--t1)]">{r.name}</div>
              <div className="text-[11px] text-[var(--t4)] mt-[2px]">{r.lang} · {r.prs} open PRs</div>
            </div>
            <div className="ml-auto flex items-center gap-[8px]">
              <div className={`w-[7px] h-[7px] rounded-full ${statusColors[r.status]}`} />
              <span className="text-[11px] text-[var(--t4)]">{statusLabels[r.status]}</span>
              <button className="inline-flex items-center gap-[6px] text-[11px] py-[5px] px-[10px] rounded-[var(--rs)] border border-[var(--border2)] bg-transparent text-[var(--t4)] cursor-pointer transition-all duration-[180ms] hover:border-[var(--em2)] hover:text-[var(--em3)]">
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
