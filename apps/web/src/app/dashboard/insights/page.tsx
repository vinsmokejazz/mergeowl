"use client";

import { useEffect, useState } from "react";
import { Activity, Clock, ShieldCheck, TrendingDown } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { API_BASE } from "@/lib/config";

interface DailyInsight {
  name: string;
  value: number;
  date: string;
}

interface SeverityData {
  name: string;
  value: number;
  fill: string;
}

interface Review {
  id: number;
  repoFullName: string;
  commentsCount: number;
  createdAt: string;
}

export default function InsightsPage() {
  const [dailyData, setDailyData] = useState<DailyInsight[]>([]);
  const [severityData, setSeverityData] = useState<SeverityData[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const [dailyRes, severityRes, reviewsRes] = await Promise.all([
          fetch(`${API_BASE}/api/insights/daily`).then(r => r.ok ? r.json() : Promise.reject(r)),
          fetch(`${API_BASE}/api/insights/severity`).then(r => r.ok ? r.json() : Promise.reject(r)),
          fetch(`${API_BASE}/api/reviews`).then(r => r.ok ? r.json() : Promise.reject(r)),
        ]);

        setDailyData(dailyRes);
        setSeverityData(severityRes);
        setReviews(reviewsRes);
      } catch (err) {
        console.error("Failed to fetch insights:", err);
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
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] p-[14px_16px] h-[100px] animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-[14px]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] h-[240px] animate-pulse" />
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

  // Calculate stats from reviews
  const totalReviews = reviews.length;
  const reviewsPerDay = dailyData.length > 0
    ? Math.round(dailyData.reduce((sum, d) => sum + d.value, 0) / dailyData.length)
    : 0;

  const errorReviews = severityData.find(s => s.name === "Errors")?.value || 0;
  const totalComments = reviews.reduce((sum, r) => sum + r.commentsCount, 0);
  const avgCommentsPerReview = totalReviews > 0 ? (totalComments / totalReviews).toFixed(1) : "0";

  // Estimate time saved (assume 2 minutes per comment manually)
  const timeSavedHours = Math.round((totalComments * 2) / 60);

  // Calculate issues by repo (top 6)
  const repoIssues = new Map<string, number>();
  reviews.forEach(review => {
    const count = repoIssues.get(review.repoFullName) || 0;
    repoIssues.set(review.repoFullName, count + review.commentsCount);
  });

  const repoChartData = Array.from(repoIssues.entries())
    .map(([name, issues]) => ({ name, issues }))
    .sort((a, b) => b.issues - a.issues)
    .slice(0, 6);

  // Extend daily data to 30 days if needed (pad with zeros)
  const extendedDailyData = [...dailyData];
  while (extendedDailyData.length < 30) {
    const lastDate = extendedDailyData.length > 0
      ? new Date(extendedDailyData[extendedDailyData.length - 1].date)
      : new Date();
    lastDate.setDate(lastDate.getDate() - 1);

    extendedDailyData.unshift({
      name: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][lastDate.getDay()],
      value: 0,
      date: lastDate.toISOString().split("T")[0],
    });
  }
  const last30Days = extendedDailyData.slice(-30);

  return (
    <div className="page-section" style={{ animation: "fadeIn 0.3s ease both" }}>
      <div className="grid grid-cols-4 gap-[12px] mb-[20px]">
        <StatCard
          title="Reviews / day"
          value={reviewsPerDay.toString()}
          delta={<><Activity size={12} />Last 7 days</>}
          deltaType="up"
        />
        <StatCard
          title="Issues caught"
          value={totalComments.toString()}
          delta={<><ShieldCheck size={12} />Critical: {errorReviews}</>}
          deltaType="up"
        />
        <StatCard
          title="Time saved"
          value={<>{timeSavedHours}<span className="text-[16px] text-[var(--t4)]">h</span></>}
          delta={<><Clock size={12} />vs manual review</>}
          deltaType="up"
        />
        <StatCard
          title="Avg comments"
          value={avgCommentsPerReview}
          delta={<><TrendingDown size={12} />Per review</>}
          deltaType="neutral"
        />
      </div>

      <div className="grid grid-cols-2 gap-[14px] mb-[14px]">
        <ChartCard title="Reviews over time" subtitle="Last 30 days">
          {last30Days.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={last30Days} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.07} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 9 }} minTickGap={30} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 9 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--g2)", border: "1px solid var(--border)", borderRadius: "var(--rs)", fontSize: "12px", color: "var(--t1)" }}
                  itemStyle={{ color: "var(--t2)" }}
                />
                <Area type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#revColor)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-[var(--t5)] text-[12px]">
              No data available
            </div>
          )}
        </ChartCard>

        <ChartCard title="Issues by severity" subtitle="All time">
          {severityData.length > 0 && severityData.some(d => d.value > 0) ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  innerRadius="68%"
                  outerRadius="95%"
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--g2)", border: "1px solid var(--border)", borderRadius: "var(--rs)", fontSize: "12px", color: "var(--t1)" }}
                  itemStyle={{ color: "var(--t2)" }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-[var(--t5)] text-[12px]">
              No severity data available
            </div>
          )}
        </ChartCard>
      </div>

      <div className="grid grid-cols-2 gap-[14px]">
        <ChartCard title="Issues by repo" subtitle={`Top ${repoChartData.length}`}>
          {repoChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={repoChartData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 9 }} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 9, fontFamily: "var(--font-m)" }} width={90} />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--g2)", border: "1px solid var(--border)", borderRadius: "var(--rs)", fontSize: "12px", color: "var(--t1)" }}
                  cursor={{ fill: "rgba(255,255,255,0.02)" }}
                />
                <Bar dataKey="issues" fill="rgba(34,197,94,0.5)" stroke="rgba(34,197,94,0.8)" strokeWidth={1} radius={[0, 3, 3, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-[var(--t5)] text-[12px]">
              No repository data available
            </div>
          )}
        </ChartCard>

        <ChartCard title="Comment distribution" subtitle="Total comments posted">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="font-[family-name:var(--font-d)] text-[56px] text-[var(--em3)] leading-none">
              {totalComments}
            </div>
            <div className="text-[13px] text-[var(--t4)] mt-3">
              Across {totalReviews} review{totalReviews !== 1 ? "s" : ""}
            </div>
            {totalReviews > 0 && (
              <div className="text-[11px] text-[var(--t5)] mt-1">
                Avg {avgCommentsPerReview} comments per review
              </div>
            )}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
