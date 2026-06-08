"use client";

import { Activity, AlertTriangle, GitPullRequest, Search, Circle } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { useRouter } from "next/navigation";

const revData = [
  { repo: "acme/api", pr: "#347 · JWT rotation refactor", author: "sarah_dev", cnt: 12, sev: "be", sevL: "Error", status: "open" },
  { repo: "acme/web", pr: "#201 · Dashboard v2 rewrite", author: "jin_lee", cnt: 5, sev: "bw", sevL: "Warning", status: "open" },
  { repo: "acme/infra", pr: "#89 · Terraform IAM policies", author: "priya_k", cnt: 8, sev: "be", sevL: "Error", status: "open" },
  { repo: "acme/mobile", pr: "#134 · Push notification svc", author: "dev_tom", cnt: 3, sev: "bs", sevL: "Suggestion", status: "merged" },
  { repo: "acme/sdk", pr: "#56 · Rate limiting middleware", author: "alex_m", cnt: 6, sev: "bw", sevL: "Warning", status: "merged" },
  { repo: "acme/cli", pr: "#22 · Config parser v2", author: "sarah_dev", cnt: 2, sev: "bs", sevL: "Suggestion", status: "open" },
];

export default function ReviewsPage() {
  const router = useRouter();

  return (
    <div className="page-section" style={{ animation: "fadeIn 0.3s ease both" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[12px] mb-[20px]">
        <StatCard title="Total reviews" value="1,243" delta={<><Activity size={12} />+18% vs last month</>} deltaType="up" />
        <StatCard title="Open PRs" value="47" delta={<><GitPullRequest size={12} />+5 today</>} deltaType="up" />
        <StatCard title="Errors caught" value="312" delta={<><AlertTriangle size={12} />23 critical</>} deltaType="down" />
        <StatCard title="Avg. review time" value={<>38<span className="text-[16px] text-[var(--t4)]">s</span></>} delta={<><Activity size={12} />Fastest ever</>} deltaType="up" />
      </div>

      <div className="flex items-center gap-[8px] bg-[var(--g3)] border border-[var(--border)] rounded-[var(--rs)] p-[8px_12px] mb-[10px]">
        <Search size={15} className="text-[var(--t5)] shrink-0" />
        <input 
          placeholder="Search reviews by repo, PR title, author…" 
          className="bg-transparent border-none outline-none text-[13px] text-[var(--t1)] w-full font-[family-name:var(--font-b)]"
        />
      </div>

      <div className="flex gap-[8px] mb-[14px] flex-wrap">
        <div className="inline-flex items-center gap-[5px] p-[5px_11px] rounded-full text-[11px] border border-[rgba(34,197,94,0.3)] text-[var(--em3)] bg-[rgba(34,197,94,0.06)] cursor-pointer transition-all duration-[150ms] font-[family-name:var(--font-b)]">
          <Circle size={8} fill="currentColor" />All
        </div>
        <div className="inline-flex items-center gap-[5px] p-[5px_11px] rounded-full text-[11px] border border-[var(--border2)] text-[var(--t4)] cursor-pointer transition-all duration-[150ms] font-[family-name:var(--font-b)] hover:border-[rgba(34,197,94,0.3)] hover:text-[var(--em3)] hover:bg-[rgba(34,197,94,0.06)]">
          Error
        </div>
        <div className="inline-flex items-center gap-[5px] p-[5px_11px] rounded-full text-[11px] border border-[var(--border2)] text-[var(--t4)] cursor-pointer transition-all duration-[150ms] font-[family-name:var(--font-b)] hover:border-[rgba(34,197,94,0.3)] hover:text-[var(--em3)] hover:bg-[rgba(34,197,94,0.06)]">
          Warning
        </div>
        <div className="inline-flex items-center gap-[5px] p-[5px_11px] rounded-full text-[11px] border border-[var(--border2)] text-[var(--t4)] cursor-pointer transition-all duration-[150ms] font-[family-name:var(--font-b)] hover:border-[rgba(34,197,94,0.3)] hover:text-[var(--em3)] hover:bg-[rgba(34,197,94,0.06)]">
          Suggestion
        </div>
        <div className="inline-flex items-center gap-[5px] p-[5px_11px] rounded-full text-[11px] border border-[var(--border2)] text-[var(--t4)] cursor-pointer transition-all duration-[150ms] font-[family-name:var(--font-b)] hover:border-[rgba(34,197,94,0.3)] hover:text-[var(--em3)] hover:bg-[rgba(34,197,94,0.06)]">
          Merged
        </div>
        <div className="inline-flex items-center gap-[5px] p-[5px_11px] rounded-full text-[11px] border border-[var(--border2)] text-[var(--t4)] cursor-pointer transition-all duration-[150ms] font-[family-name:var(--font-b)] hover:border-[rgba(34,197,94,0.3)] hover:text-[var(--em3)] hover:bg-[rgba(34,197,94,0.06)]">
          Open
        </div>
      </div>

      <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] overflow-hidden">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr>
              <th className="w-[18%] text-[10px] text-[var(--t5)] font-medium tracking-[.06em] uppercase p-[10px_16px] text-left border-b border-[var(--border)]">Repo</th>
              <th className="w-[30%] text-[10px] text-[var(--t5)] font-medium tracking-[.06em] uppercase p-[10px_16px] text-left border-b border-[var(--border)]">Pull request</th>
              <th className="w-[12%] text-[10px] text-[var(--t5)] font-medium tracking-[.06em] uppercase p-[10px_16px] text-left border-b border-[var(--border)]">Author</th>
              <th className="w-[8%] text-[10px] text-[var(--t5)] font-medium tracking-[.06em] uppercase p-[10px_16px] text-left border-b border-[var(--border)]">Comments</th>
              <th className="w-[12%] text-[10px] text-[var(--t5)] font-medium tracking-[.06em] uppercase p-[10px_16px] text-left border-b border-[var(--border)]">Severity</th>
              <th className="w-[11%] text-[10px] text-[var(--t5)] font-medium tracking-[.06em] uppercase p-[10px_16px] text-left border-b border-[var(--border)]">Status</th>
              <th className="w-[9%] text-[10px] text-[var(--t5)] font-medium tracking-[.06em] uppercase p-[10px_16px] text-left border-b border-[var(--border)]"></th>
            </tr>
          </thead>
          <tbody>
            {revData.map((r, i) => {
              let sevBadgeClass = "bg-[rgba(34,197,94,0.1)] text-[var(--em3)] border border-[rgba(34,197,94,0.18)]";
              if (r.sev === "be") sevBadgeClass = "bg-[var(--redbg)] text-[#fca5a5] border border-[var(--redbr)]";
              else if (r.sev === "bw") sevBadgeClass = "bg-[var(--yellbg)] text-[#fcd34d] border border-[var(--yellbr)]";
              
              const statusBadgeClass = r.status === "open"
                ? "bg-[rgba(34,197,94,0.1)] text-[var(--em3)] border border-[rgba(34,197,94,0.18)]"
                : "bg-[rgba(107,114,128,0.1)] text-[#9ca3af] border border-[rgba(107,114,128,0.18)]";

              return (
                <tr key={r.pr} className="hover:bg-[rgba(34,197,94,0.02)] transition-colors opacity-0" style={{ animation: `rowIn 0.35s ease ${i * 0.07}s forwards` }}>
                  <td className="p-[11px_16px] text-[12px] text-[var(--t2)] border-b border-[var(--border)]">
                    <span className="text-[11px] font-[family-name:var(--font-m)] text-[var(--t2)]">{r.repo}</span>
                  </td>
                  <td className="p-[11px_16px] text-[12px] text-[var(--t2)] border-b border-[var(--border)]">
                    <span className="text-[var(--t4)] text-[11px]">{r.pr}</span>
                  </td>
                  <td className="p-[11px_16px] text-[12px] text-[var(--t2)] border-b border-[var(--border)]">
                    <span className="text-[11px] text-[var(--t4)]">@{r.author}</span>
                  </td>
                  <td className="p-[11px_16px] text-[12px] text-[var(--t2)] border-b border-[var(--border)]">
                    <span className="font-[family-name:var(--font-m)] text-[12px] text-[var(--em)]">{r.cnt}</span>
                  </td>
                  <td className="p-[11px_16px] text-[12px] text-[var(--t2)] border-b border-[var(--border)]">
                    <span className={`inline-flex items-center gap-[3px] text-[10px] font-semibold p-[3px_8px] rounded-[4px] tracking-[.04em] uppercase whitespace-nowrap ${sevBadgeClass}`}>{r.sevL}</span>
                  </td>
                  <td className="p-[11px_16px] text-[12px] text-[var(--t2)] border-b border-[var(--border)]">
                    <span className={`inline-flex items-center gap-[3px] text-[10px] font-semibold p-[3px_8px] rounded-[4px] tracking-[.04em] uppercase whitespace-nowrap ${statusBadgeClass}`}>{r.status}</span>
                  </td>
                  <td className="p-[11px_16px] text-[12px] text-[var(--t2)] border-b border-[var(--border)]">
                    <button 
                      onClick={() => router.push("/dashboard/reviews/detail")}
                      className="inline-flex items-center gap-[6px] text-[11px] font-[family-name:var(--font-b)] p-[5px_10px] rounded-[var(--rs)] border border-[var(--border2)] bg-transparent text-[var(--t4)] cursor-pointer transition-all duration-[180ms] hover:border-[var(--border3)] hover:text-[var(--t2)]"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
