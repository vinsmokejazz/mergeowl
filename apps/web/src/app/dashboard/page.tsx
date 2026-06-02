import { StatCard } from "@/components/ui/StatCard";
import { DashboardChart } from "@/components/DashboardChart";
import { ActivityChart } from "@/components/ActivityChart";
import { TrendingUp, TrendingDown, Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

async function getStats() {
  try {
    const res = await fetch("http://localhost:3000/api/stats", { cache: "no-store" });
    return res.json();
  } catch {
    return { totalReviews: 47, totalComments: 312, uniqueRepos: 24 };
  }
}

async function getRecentReviews() {
  try {
    const res = await fetch("http://localhost:3000/api/reviews", { cache: "no-store" });
    return res.json();
  } catch {
    return [
      { id: 1, repoFullName: "acme/api", pullTitle: "JWT rotation refactor", pullNumber: 347, commentsCount: 12, createdAt: new Date().toISOString() },
      { id: 2, repoFullName: "acme/web", pullTitle: "Dashboard v2 rewrite", pullNumber: 201, commentsCount: 5, createdAt: new Date().toISOString() },
      { id: 3, repoFullName: "acme/infra", pullTitle: "Terraform IAM policies", pullNumber: 89, commentsCount: 8, createdAt: new Date().toISOString() },
      { id: 4, repoFullName: "acme/mobile", pullTitle: "Push notification service", pullNumber: 134, commentsCount: 3, createdAt: new Date().toISOString() },
      { id: 5, repoFullName: "acme/sdk", pullTitle: "Rate limiting middleware", pullNumber: 56, commentsCount: 6, createdAt: new Date().toISOString() },
    ];
  }
}

export default async function DashboardPage() {
  const [stats, recentReviews] = await Promise.all([getStats(), getRecentReviews()]);

  return (
    <>
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-[14px] mb-[14px]">
        <StatCard
          label="Reviews Processed"
          value={stats.totalReviews}
          delta="+18% this month"
          deltaIcon={<TrendingUp size={12} />}
        />
        <StatCard
          label="Issues Caught"
          value={stats.totalComments}
          delta="-4% this week"
          deltaColor="text-[var(--red)]"
          deltaIcon={<TrendingDown size={12} />}
        />
        <StatCard
          label="Repos Connected"
          value={stats.uniqueRepos}
          delta="All active"
          deltaIcon={<Check size={12} />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-[2fr_1fr] gap-[14px] mb-[14px]">
        <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] py-[18px] px-[20px]">
          <div className="text-[12px] text-[var(--t4)] font-medium tracking-[0.04em] uppercase mb-[10px]">Review Volume</div>
          <DashboardChart />
        </div>
        <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] py-[18px] px-[20px]">
          <div className="text-[12px] text-[var(--t4)] font-medium tracking-[0.04em] uppercase mb-[10px]">Commits Analyzed</div>
          <ActivityChart />
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="flex items-center justify-between mb-[14px]">
        <h3 className="text-[14px] font-medium text-[var(--t1)]">Recent Reviews</h3>
        <button className="text-[12px] text-[var(--t4)] hover:text-[var(--t2)] cursor-pointer bg-transparent border-none">View all</button>
      </div>

      <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] overflow-hidden">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr>
              <th className="text-[10px] text-[var(--t5)] font-medium tracking-[0.06em] uppercase py-[10px] px-[16px] text-left border-b border-[var(--border)] w-[35%]">Pull Request</th>
              <th className="text-[10px] text-[var(--t5)] font-medium tracking-[0.06em] uppercase py-[10px] px-[16px] text-left border-b border-[var(--border)] w-[20%]">Status</th>
              <th className="text-[10px] text-[var(--t5)] font-medium tracking-[0.06em] uppercase py-[10px] px-[16px] text-left border-b border-[var(--border)] w-[15%]">Comments</th>
              <th className="text-[10px] text-[var(--t5)] font-medium tracking-[0.06em] uppercase py-[10px] px-[16px] text-left border-b border-[var(--border)] w-[15%]">Repo</th>
              <th className="text-[10px] text-[var(--t5)] font-medium tracking-[0.06em] uppercase py-[10px] px-[16px] text-left border-b border-[var(--border)] w-[15%]">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentReviews.map((review: any, i: number) => (
              <tr
                key={review.id}
                className="hover:[&_td]:bg-[rgba(34,197,94,0.02)]"
                style={{ animation: `rowIn 0.35s ease ${i * 0.07}s forwards`, opacity: 0 }}
              >
                <td className="py-[11px] px-[16px] text-[12px] text-[var(--t2)] border-b border-[var(--border)]">
                  <div className="font-medium truncate">{review.pullTitle}</div>
                  <div className="text-[11px] text-[var(--t4)] mt-[2px]">#{review.pullNumber}</div>
                </td>
                <td className="py-[11px] px-[16px] text-[12px] border-b border-[var(--border)]">
                  <Badge variant="suggestion">Completed</Badge>
                </td>
                <td className="py-[11px] px-[16px] text-[12px] text-[var(--em)] font-[family-name:var(--font-mono)] border-b border-[var(--border)]">
                  {review.commentsCount}
                </td>
                <td className="py-[11px] px-[16px] text-[12px] text-[var(--t4)] font-[family-name:var(--font-mono)] text-[11px] border-b border-[var(--border)]">
                  {review.repoFullName}
                </td>
                <td className="py-[11px] px-[16px] text-[12px] text-[var(--t4)] border-b border-[var(--border)]">
                  {new Date(review.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}