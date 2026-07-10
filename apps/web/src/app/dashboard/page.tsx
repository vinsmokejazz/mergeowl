"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Activity, AlertTriangle, ShieldAlert, GitPullRequest } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";
import { API_BASE } from "@/lib/config";
import { useSession } from "next-auth/react";

interface Stats {
  totalReviews: number;
  totalComments: number;
  uniqueRepos: number;
  openReviews: number;
}

interface DailyInsight {
  name: string;
  value: number;
  date: string;
}

interface Review {
  id: number;
  repoFullName: string;
  pullNumber: number;
  pullTitle: string;
  author: string;
  commentsCount: number;
  status: string;
  createdAt: string;
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [dailyData, setDailyData] = useState<DailyInsight[]>([]);
  const [recentReviews, setRecentReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const [statsRes, dailyRes, reviewsRes] = await Promise.all([
          fetch(`${API_BASE}/api/stats`).then(r => r.ok ? r.json() : Promise.reject(new Error("Failed to fetch stats"))),
          fetch(`${API_BASE}/api/insights/daily`).then(r => r.ok ? r.json() : Promise.reject(new Error("Failed to fetch insights"))),
          fetch(`${API_BASE}/api/reviews?limit=4`).then(r => r.ok ? r.json() : Promise.reject(new Error("Failed to fetch reviews"))),
        ]);

        setStats(statsRes);
        setDailyData(dailyRes);
        setRecentReviews(reviewsRes);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Could not connect to API");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="page-section">
        <div className="grid grid-cols-4 gap-[12px] mb-[20px]">
          {["sk-card-1", "sk-card-2", "sk-card-3", "sk-card-4"].map((key) => (
            <div key={key} className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] p-[14px_16px] h-[100px] animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-[14px] mb-[20px]">
          {["sk-chart-1", "sk-chart-2"].map((key) => (
            <div key={key} className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] h-[220px] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-section">
        <div className="bg-[var(--redbg)] border border-[var(--redbr)] rounded-[var(--r)] p-4 mb-4">
          <p className="text-[13px] text-[#fca5a5]">{error}</p>
        </div>
      </div>
    );
  }

  const avgReviewTime = stats && stats.totalReviews > 0
    ? Math.round(stats.totalComments / stats.totalReviews)
    : 0;

  return (
    <div className="page-section" style={{ animation: "fadeIn 0.3s ease both" }}>
      <div className="grid grid-cols-4 gap-[12px] mb-[20px]">
        <StatCard
          title="Active PRs"
          value={stats?.openReviews.toString() || "0"}
          delta={<><GitPullRequest size={12} />Open reviews</>}
          deltaType="up"
        />
        <StatCard
          title="Total reviews"
          value={stats?.totalReviews.toString() || "0"}
          delta={<><Activity size={12} />All time</>}
          deltaType="neutral"
        />
        <StatCard
          title="Avg comments"
          value={avgReviewTime.toString()}
          delta={<><Activity size={12} />Per review</>}
          deltaType="neutral"
        />
        <StatCard
          title="Repositories"
          value={stats?.uniqueRepos.toString() || "0"}
          delta={<><ShieldAlert size={12} />Connected</>}
          deltaType="up"
        />
      </div>

      <div className="grid grid-cols-2 gap-[14px] mb-[20px]">
        <ChartCard title="Review activity" subtitle="Last 7 days" height="180px">
          {dailyData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="queueColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 9 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 9 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--g2)", border: "1px solid var(--border)", borderRadius: "var(--rs)", fontSize: "12px", color: "var(--t1)" }}
                  itemStyle={{ color: "var(--t2)" }}
                />
                <Area type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#queueColor)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-[var(--t5)] text-[12px]">
              No data available
            </div>
          )}
        </ChartCard>

        <ChartCard title="Total comments" subtitle="Last 7 days" height="180px">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="font-[family-name:var(--font-d)] text-[48px] text-[var(--em3)]">
              {stats?.totalComments || 0}
            </div>
            <div className="text-[12px] text-[var(--t4)] mt-2">
              Comments posted across all reviews
            </div>
          </div>
        </ChartCard>
      </div>

      <div className="flex items-center justify-between mb-[14px]">
        <h3 className="text-[14px] font-medium text-[var(--t1)] m-0">Recent reviews</h3>
        <a
          href="/dashboard/reviews"
          className="inline-flex items-center gap-[6px] text-[12px] font-[family-name:var(--font-b)] p-[7px_13px] rounded-[var(--rs)] border border-[var(--border2)] bg-transparent text-[var(--t4)] cursor-pointer transition-all duration-[180ms] hover:border-[var(--border3)] hover:text-[var(--t2)]"
        >
          View all
        </a>
      </div>

      {recentReviews.length > 0 ? (
        <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] overflow-hidden">
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr>
                <th className="w-[18%] text-[10px] text-[var(--t5)] font-medium tracking-[.06em] uppercase p-[10px_16px] text-left border-b border-[var(--border)]">Repo</th>
                <th className="w-[30%] text-[10px] text-[var(--t5)] font-medium tracking-[.06em] uppercase p-[10px_16px] text-left border-b border-[var(--border)]">Pull request</th>
                <th className="w-[12%] text-[10px] text-[var(--t5)] font-medium tracking-[.06em] uppercase p-[10px_16px] text-left border-b border-[var(--border)]">Author</th>
                <th className="w-[8%] text-[10px] text-[var(--t5)] font-medium tracking-[.06em] uppercase p-[10px_16px] text-left border-b border-[var(--border)]">Comments</th>
                <th className="w-[11%] text-[10px] text-[var(--t5)] font-medium tracking-[.06em] uppercase p-[10px_16px] text-left border-b border-[var(--border)]">Status</th>
                <th className="w-[11%] text-[10px] text-[var(--t5)] font-medium tracking-[.06em] uppercase p-[10px_16px] text-left border-b border-[var(--border)]"></th>
              </tr>
            </thead>
            <tbody>
              {recentReviews.map((r, i) => {
                const statusBadgeClass = r.status === "open"
                  ? "bg-[rgba(34,197,94,0.1)] text-[var(--em3)] border border-[rgba(34,197,94,0.18)]"
                  : "bg-[rgba(107,114,128,0.1)] text-[#9ca3af] border border-[rgba(107,114,128,0.18)]";

                return (
                  <tr key={r.id} className="hover:bg-[rgba(34,197,94,0.02)] transition-colors opacity-0" style={{ animation: `rowIn 0.35s ease ${i * 0.07}s forwards` }}>
                    <td className="p-[11px_16px] text-[12px] text-[var(--t2)] border-b border-[var(--border)]">
                      <span className="text-[11px] font-[family-name:var(--font-m)] text-[var(--t2)]">{r.repoFullName}</span>
                    </td>
                    <td className="p-[11px_16px] text-[12px] text-[var(--t2)] border-b border-[var(--border)]">
                      <a
                        href={`https://github.com/${r.repoFullName}/pull/${r.pullNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--t4)] text-[11px] hover:text-[var(--em3)] transition-colors"
                      >
                        #{r.pullNumber} · {r.pullTitle}
                      </a>
                    </td>
                    <td className="p-[11px_16px] text-[12px] text-[var(--t2)] border-b border-[var(--border)]">
                      <span className="text-[11px] text-[var(--t4)]">@{r.author}</span>
                    </td>
                    <td className="p-[11px_16px] text-[12px] text-[var(--t2)] border-b border-[var(--border)]">
                      <span className="font-[family-name:var(--font-m)] text-[12px] text-[var(--em)]">{r.commentsCount}</span>
                    </td>
                    <td className="p-[11px_16px] text-[12px] text-[var(--t2)] border-b border-[var(--border)]">
                      <span className={`inline-flex items-center gap-[3px] text-[10px] font-semibold p-[3px_8px] rounded-[4px] tracking-[.04em] uppercase whitespace-nowrap ${statusBadgeClass}`}>{r.status}</span>
                    </td>
                    <td className="p-[11px_16px] text-[12px] text-[var(--t2)] border-b border-[var(--border)]">
                      <Link
                        href={`/dashboard/reviews/detail?id=${r.id}`}
                        className="inline-flex items-center gap-[6px] text-[11px] font-[family-name:var(--font-b)] p-[5px_10px] rounded-[var(--rs)] border border-[var(--border2)] bg-transparent text-[var(--t4)] cursor-pointer transition-all duration-[180ms] hover:border-[var(--border3)] hover:text-[var(--t2)]"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] p-16 text-center">
          <AlertTriangle size={32} className="text-[var(--t5)] mx-auto mb-3" />
          <h3 className="text-[14px] font-medium text-[var(--t2)] mb-1">No reviews yet</h3>
          <p className="text-[12px] text-[var(--t4)]">
            Reviews will appear here once your GitHub App processes pull requests
          </p>
        </div>
      )}
    </div>
  );
}
