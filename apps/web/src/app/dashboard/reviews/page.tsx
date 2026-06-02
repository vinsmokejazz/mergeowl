import { StatCard } from "@/components/ui/StatCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { FilterChip } from "@/components/ui/FilterChip";
import { Badge } from "@/components/ui/Badge";
import { TrendingUp, AlertTriangle, Clock, Circle } from "lucide-react";
import Link from "next/link";

const revData = [
  { repo: "acme/api", pr: "#347 · JWT rotation refactor", author: "sarah_dev", cnt: 12, sev: "error" as const, sevL: "Error", status: "open" },
  { repo: "acme/web", pr: "#201 · Dashboard v2 rewrite", author: "jin_lee", cnt: 5, sev: "warning" as const, sevL: "Warning", status: "open" },
  { repo: "acme/infra", pr: "#89 · Terraform IAM policies", author: "priya_k", cnt: 8, sev: "error" as const, sevL: "Error", status: "open" },
  { repo: "acme/mobile", pr: "#134 · Push notification svc", author: "dev_tom", cnt: 3, sev: "suggestion" as const, sevL: "Suggestion", status: "merged" },
  { repo: "acme/sdk", pr: "#56 · Rate limiting middleware", author: "alex_m", cnt: 6, sev: "warning" as const, sevL: "Warning", status: "merged" },
  { repo: "acme/cli", pr: "#22 · Config parser v2", author: "sarah_dev", cnt: 2, sev: "suggestion" as const, sevL: "Suggestion", status: "open" },
];

export default function ReviewsPage() {
  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-[12px] mb-[20px]">
        <StatCard label="Total reviews" value="1,243" delta="+18% vs last month" deltaIcon={<TrendingUp size={12} />} />
        <StatCard label="Open PRs" value="47" delta="+5 today" deltaIcon={<TrendingUp size={12} />} />
        <StatCard label="Errors caught" value="312" valueColor="text-[var(--red)]" delta="23 critical" deltaColor="text-[var(--red)]" deltaIcon={<AlertTriangle size={12} />} />
        <StatCard label="Avg. review time" value={<>38<span className="text-[16px] text-[var(--t4)]">s</span></>} delta="Fastest ever" deltaIcon={<Clock size={12} />} />
      </div>

      {/* Search */}
      <SearchBar placeholder="Search reviews by repo, PR title, author…" className="mb-[10px]" />

      {/* Filters */}
      <div className="flex gap-[8px] mb-[14px] flex-wrap">
        <FilterChip active><Circle size={8} fill="currentColor" />All</FilterChip>
        <FilterChip className="bg-[var(--redbg)] text-[#fca5a5] border-[var(--redbr)]">Error</FilterChip>
        <FilterChip className="bg-[var(--yellbg)] text-[#fcd34d] border-[var(--yellbr)]">Warning</FilterChip>
        <FilterChip className="bg-[rgba(34,197,94,0.1)] text-[var(--em3)] border-[rgba(34,197,94,0.18)]">Suggestion</FilterChip>
        <FilterChip>Merged</FilterChip>
        <FilterChip>Open</FilterChip>
      </div>

      {/* Table */}
      <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] overflow-hidden">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr>
              <th className="text-[10px] text-[var(--t5)] font-medium tracking-[0.06em] uppercase py-[10px] px-[16px] text-left border-b border-[var(--border)] w-[18%]">Repo</th>
              <th className="text-[10px] text-[var(--t5)] font-medium tracking-[0.06em] uppercase py-[10px] px-[16px] text-left border-b border-[var(--border)] w-[30%]">Pull request</th>
              <th className="text-[10px] text-[var(--t5)] font-medium tracking-[0.06em] uppercase py-[10px] px-[16px] text-left border-b border-[var(--border)] w-[12%]">Author</th>
              <th className="text-[10px] text-[var(--t5)] font-medium tracking-[0.06em] uppercase py-[10px] px-[16px] text-left border-b border-[var(--border)] w-[8%]">Comments</th>
              <th className="text-[10px] text-[var(--t5)] font-medium tracking-[0.06em] uppercase py-[10px] px-[16px] text-left border-b border-[var(--border)] w-[12%]">Severity</th>
              <th className="text-[10px] text-[var(--t5)] font-medium tracking-[0.06em] uppercase py-[10px] px-[16px] text-left border-b border-[var(--border)] w-[11%]">Status</th>
              <th className="text-[10px] text-[var(--t5)] font-medium tracking-[0.06em] uppercase py-[10px] px-[16px] text-left border-b border-[var(--border)] w-[9%]"></th>
            </tr>
          </thead>
          <tbody>
            {revData.map((r, i) => (
              <tr
                key={i}
                className="hover:[&_td]:bg-[rgba(34,197,94,0.02)]"
                style={{ animation: `rowIn 0.35s ease ${i * 0.07}s forwards`, opacity: 0 }}
              >
                <td className="py-[11px] px-[16px] text-[11px] font-[family-name:var(--font-mono)] text-[var(--t2)] border-b border-[var(--border)]">{r.repo}</td>
                <td className="py-[11px] px-[16px] text-[var(--t4)] text-[11px] border-b border-[var(--border)]">{r.pr}</td>
                <td className="py-[11px] px-[16px] text-[11px] text-[var(--t4)] border-b border-[var(--border)]">@{r.author}</td>
                <td className="py-[11px] px-[16px] font-[family-name:var(--font-mono)] text-[12px] text-[var(--em)] border-b border-[var(--border)]">{r.cnt}</td>
                <td className="py-[11px] px-[16px] border-b border-[var(--border)]"><Badge variant={r.sev}>{r.sevL}</Badge></td>
                <td className="py-[11px] px-[16px] border-b border-[var(--border)]">
                  <Badge variant={r.status === "open" ? "suggestion" : "neutral"}>{r.status}</Badge>
                </td>
                <td className="py-[11px] px-[16px] border-b border-[var(--border)]">
                  <Link href="/dashboard/reviews/detail" className="inline-flex items-center gap-[6px] text-[11px] py-[5px] px-[10px] rounded-[var(--rs)] border border-[var(--border2)] bg-transparent text-[var(--t4)] cursor-pointer transition-all duration-[180ms] hover:border-[var(--em2)] hover:text-[var(--em3)] no-underline">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
