import { StatCard } from "@/components/ui/StatCard";
import { TrendingUp, TrendingDown, ShieldCheck, Clock } from "lucide-react";
import { ReviewsOverTimeChart, SeverityChart, RepoIssuesChart, LatencyChart } from "@/components/charts/InsightsCharts";

export default function InsightsPage() {
  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[12px] mb-[20px]">
        <StatCard label="Reviews / day" value="41" delta="+12%" deltaIcon={<TrendingUp size={12} />} />
        <StatCard label="Bugs prevented" value="847" delta="Critical: 63" deltaIcon={<ShieldCheck size={12} />} />
        <StatCard label="Time saved" value={<>312<span className="text-[16px] text-[var(--t4)]">h</span></>} delta="vs manual review" deltaIcon={<Clock size={12} />} />
        <StatCard
          label="Avg severity"
          value="2.4"
          valueColor="text-[var(--yellow)]"
          delta="−0.3 vs last month"
          deltaColor="text-[var(--yellow)]"
          deltaIcon={<TrendingDown size={12} />}
        />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px] mb-[14px]">
        <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] py-[18px] px-[20px]">
          <div className="flex items-center justify-between mb-[10px]">
            <h3 className="text-[14px] font-medium text-[var(--t1)]">Reviews over time</h3>
            <span className="text-[11px] text-[var(--t4)]">Last 30 days</span>
          </div>
          <ReviewsOverTimeChart />
        </div>
        <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] py-[18px] px-[20px]">
          <div className="flex items-center justify-between mb-[10px]">
            <h3 className="text-[14px] font-medium text-[var(--t1)]">Issues by severity</h3>
            <span className="text-[11px] text-[var(--t4)]">All time</span>
          </div>
          <SeverityChart />
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
        <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] py-[18px] px-[20px]">
          <div className="flex items-center justify-between mb-[10px]">
            <h3 className="text-[14px] font-medium text-[var(--t1)]">Issues by repo</h3>
            <span className="text-[11px] text-[var(--t4)]">Top 6</span>
          </div>
          <RepoIssuesChart />
        </div>
        <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] py-[18px] px-[20px]">
          <div className="flex items-center justify-between mb-[10px]">
            <h3 className="text-[14px] font-medium text-[var(--t1)]">Review latency</h3>
            <span className="text-[11px] text-[var(--t4)]">Avg. seconds to first comment</span>
          </div>
          <LatencyChart />
        </div>
      </div>
    </>
  );
}
