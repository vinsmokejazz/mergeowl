"use client";

import { Activity, AlertTriangle, ShieldAlert, GitPullRequest } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";

const queueData = [
  { name: "Mon", value: 12 },
  { name: "Tue", value: 18 },
  { name: "Wed", value: 14 },
  { name: "Thu", value: 24 },
  { name: "Fri", value: 21 },
  { name: "Sat", value: 8 },
  { name: "Sun", value: 10 },
];

const secData = [
  { name: "Mon", value: 2 },
  { name: "Tue", value: 5 },
  { name: "Wed", value: 3 },
  { name: "Thu", value: 8 },
  { name: "Fri", value: 6 },
  { name: "Sat", value: 1 },
  { name: "Sun", value: 2 },
];

const revData = [
  { repo: "acme/api", pr: "#347 · JWT rotation refactor", author: "sarah_dev", cnt: 12, sev: "be", sevL: "Error", status: "open" },
  { repo: "acme/web", pr: "#201 · Dashboard v2 rewrite", author: "jin_lee", cnt: 5, sev: "bw", sevL: "Warning", status: "open" },
  { repo: "acme/infra", pr: "#89 · Terraform IAM policies", author: "priya_k", cnt: 8, sev: "be", sevL: "Error", status: "open" },
  { repo: "acme/mobile", pr: "#134 · Push notification svc", author: "dev_tom", cnt: 3, sev: "bs", sevL: "Suggestion", status: "merged" },
];

export default function DashboardOverview() {
  return (
    <div className="page-section" style={{ animation: "fadeIn 0.3s ease both" }}>
      <div className="grid grid-cols-4 gap-[12px] mb-[20px]">
        <StatCard
          title="Active PRs"
          value="42"
          delta={<><GitPullRequest size={12} />+8 today</>}
          deltaType="up"
        />
        <StatCard
          title="Issues found"
          value="18"
          delta={<><AlertTriangle size={12} />Needs attention</>}
          deltaType="warning"
        />
        <StatCard
          title="Avg review time"
          value={<>14<span className="text-[16px] text-[var(--t4)]">s</span></>}
          delta={<><Activity size={12} />-2s vs last week</>}
          deltaType="up"
        />
        <StatCard
          title="Security flags"
          value="3"
          delta={<><ShieldAlert size={12} />Action required</>}
          deltaType="down"
        />
      </div>

      <div className="grid grid-cols-2 gap-[14px] mb-[20px]">
        <ChartCard title="Review queue" subtitle="Last 7 days" height="180px">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={queueData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="queueColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 9 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 9 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--g2)", border: "1px solid var(--border)", borderRadius: "var(--rs)", fontSize: "12px", color: "var(--t1)" }}
                itemStyle={{ color: "var(--t2)" }}
              />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#queueColor)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        
        <ChartCard title="Security events" subtitle="Critical & High" height="180px">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={secData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="secColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 9 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 9 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--g2)", border: "1px solid var(--border)", borderRadius: "var(--rs)", fontSize: "12px", color: "var(--t1)" }}
                itemStyle={{ color: "var(--t2)" }}
              />
              <Area type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#secColor)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="flex items-center justify-between mb-[14px]">
        <h3 className="text-[14px] font-medium text-[var(--t1)] m-0">Recent reviews</h3>
        <button className="inline-flex items-center gap-[6px] text-[12px] font-[family-name:var(--font-b)] p-[7px_13px] rounded-[var(--rs)] border border-[var(--border2)] bg-transparent text-[var(--t4)] cursor-pointer transition-all duration-[180ms] hover:border-[var(--border3)] hover:text-[var(--t2)]">
          View all
        </button>
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
                    <button className="inline-flex items-center gap-[6px] text-[11px] font-[family-name:var(--font-b)] p-[5px_10px] rounded-[var(--rs)] border border-[var(--border2)] bg-transparent text-[var(--t4)] cursor-pointer transition-all duration-[180ms] hover:border-[var(--border3)] hover:text-[var(--t2)]">
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