"use client";

import { Activity, Clock, ShieldCheck, TrendingDown } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie } from "recharts";

const revVals = Array.from({ length: 30 }, (_, i) => ({
  name: `${Math.floor(i / 30) + 5}/${(i % 30) + 1}`,
  value: Math.round(20 + Math.random() * 35),
}));

const severityData = [
  { name: "Errors", value: 312, fill: "#ef4444" },
  { name: "Warnings", value: 519, fill: "#f59e0b" },
  { name: "Suggestions", value: 698, fill: "#22c55e" },
];

const repoChartData = [
  { name: "acme/api", issues: 87 },
  { name: "acme/infra", issues: 62 },
  { name: "acme/web", issues: 45 },
  { name: "acme/sdk", issues: 38 },
  { name: "acme/mobile", issues: 24 },
  { name: "acme/cli", issues: 11 },
];

const latencyData = [
  { name: "Mon", value: 42, isCurrent: false, fill: "rgba(34,197,94,0.35)" },
  { name: "Tue", value: 38, isCurrent: false, fill: "rgba(34,197,94,0.35)" },
  { name: "Wed", value: 35, isCurrent: true, fill: "#22c55e" },
  { name: "Thu", value: 51, isCurrent: false, fill: "rgba(34,197,94,0.35)" },
  { name: "Fri", value: 46, isCurrent: false, fill: "rgba(34,197,94,0.35)" },
  { name: "Sat", value: 29, isCurrent: false, fill: "rgba(34,197,94,0.35)" },
  { name: "Sun", value: 24, isCurrent: false, fill: "rgba(34,197,94,0.35)" },
];

export default function InsightsPage() {
  return (
    <div className="page-section" style={{ animation: "fadeIn 0.3s ease both" }}>
      <div className="grid grid-cols-4 gap-[12px] mb-[20px]">
        <StatCard title="Reviews / day" value="41" delta={<><Activity size={12} />+12%</>} deltaType="up" />
        <StatCard title="Bugs prevented" value="847" delta={<><ShieldCheck size={12} />Critical: 63</>} deltaType="up" />
        <StatCard title="Time saved" value={<>312<span className="text-[16px] text-[var(--t4)]">h</span></>} delta={<><Clock size={12} />vs manual review</>} deltaType="up" />
        <StatCard title="Avg severity" value="2.4" delta={<><TrendingDown size={12} />−0.3 vs last month</>} deltaType="warning" />
      </div>

      <div className="grid grid-cols-2 gap-[14px] mb-[14px]">
        <ChartCard title="Reviews over time" subtitle="Last 30 days">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revVals} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
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
        </ChartCard>

        <ChartCard title="Issues by severity" subtitle="All time">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={severityData}
                innerRadius="68%"
                outerRadius="95%"
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--g2)", border: "1px solid var(--border)", borderRadius: "var(--rs)", fontSize: "12px", color: "var(--t1)" }}
                itemStyle={{ color: "var(--t2)" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-2 gap-[14px]">
        <ChartCard title="Issues by repo" subtitle="Top 6">
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
        </ChartCard>

        <ChartCard title="Review latency" subtitle="Avg. seconds to first comment">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={latencyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 9 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 9 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--g2)", border: "1px solid var(--border)", borderRadius: "var(--rs)", fontSize: "12px", color: "var(--t1)" }}
                cursor={{ fill: "rgba(255,255,255,0.02)" }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
