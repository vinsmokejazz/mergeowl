"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Activity, AlertTriangle, GitPullRequest, Search, Circle } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { API_BASE } from "@/lib/config";

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

interface Stats {
  totalReviews: number;
  totalComments: number;
  uniqueRepos: number;
  openReviews: number;
}

type SeverityFilter = "all" | "error" | "warning" | "suggestion";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("all");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const [reviewsRes, statsRes] = await Promise.all([
          fetch(`${API_BASE}/api/reviews?limit=50`).then(r => r.ok ? r.json() : Promise.reject(new Error("Failed to fetch reviews"))),
          fetch(`${API_BASE}/api/stats`).then(r => r.ok ? r.json() : Promise.reject(new Error("Failed to fetch stats"))),
        ]);

        setReviews(reviewsRes);
        setStats(statsRes);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setError("Could not connect to API");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Determine severity based on comment count
  const getSeverity = (commentsCount: number): "error" | "warning" | "suggestion" => {
    if (commentsCount > 5) return "error";
    if (commentsCount > 0) return "warning";
    return "suggestion";
  };

  // Filter reviews based on search and severity
  const filteredReviews = useMemo(() => {
    return reviews.filter(review => {
      // Search filter
      const matchesSearch = searchQuery === "" ||
        review.repoFullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.pullTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.author.toLowerCase().includes(searchQuery.toLowerCase());

      // Severity filter
      const severity = getSeverity(review.commentsCount);
      const matchesSeverity = severityFilter === "all" || severity === severityFilter;

      return matchesSearch && matchesSeverity;
    });
  }, [reviews, searchQuery, severityFilter]);

  // Calculate error count for stats
  const errorCount = reviews.filter(r => getSeverity(r.commentsCount) === "error").length;
  const avgReviewTime = stats && stats.totalReviews > 0
    ? Math.round(stats.totalComments / stats.totalReviews)
    : 0;

  if (loading) {
    return (
      <div className="page-section">
        <div className="grid grid-cols-4 gap-[12px] mb-[20px]">
          {["sk-rev-1", "sk-rev-2", "sk-rev-3", "sk-rev-4"].map((key) => (
            <div key={key} className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] p-[14px_16px] h-[100px] animate-pulse" />
          ))}
        </div>
        <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] h-[400px] animate-pulse mt-8" />
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

  return (
    <div className="page-section" style={{ animation: "fadeIn 0.3s ease both" }}>
      <div className="grid grid-cols-4 gap-[12px] mb-[20px]">
        <StatCard
          title="Total reviews"
          value={stats?.totalReviews.toString() || "0"}
          delta={<><Activity size={12} />All time</>}
          deltaType="up"
        />
        <StatCard
          title="Open PRs"
          value={stats?.openReviews.toString() || "0"}
          delta={<><GitPullRequest size={12} />Active</>}
          deltaType="up"
        />
        <StatCard
          title="Errors caught"
          value={errorCount.toString()}
          delta={<><AlertTriangle size={12} />High severity</>}
          deltaType="down"
        />
        <StatCard
          title="Avg. comments"
          value={avgReviewTime.toString()}
          delta={<><Activity size={12} />Per review</>}
          deltaType="neutral"
        />
      </div>

      <div className="flex items-center gap-[8px] bg-[var(--g3)] border border-[var(--border)] rounded-[var(--rs)] p-[8px_12px] mb-[10px]">
        <Search size={15} className="text-[var(--t5)] shrink-0" />
        <input
          placeholder="Search reviews by repo, PR title, author…"
          className="bg-transparent border-none outline-none text-[13px] text-[var(--t1)] w-full font-[family-name:var(--font-b)]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex gap-[8px] mb-[14px] flex-wrap">
        <button
          onClick={() => setSeverityFilter("all")}
          className={`inline-flex items-center gap-[5px] p-[5px_11px] rounded-full text-[11px] border cursor-pointer transition-all duration-[150ms] font-[family-name:var(--font-b)] ${
            severityFilter === "all"
              ? "border-[rgba(34,197,94,0.3)] text-[var(--em3)] bg-[rgba(34,197,94,0.06)]"
              : "border-[var(--border2)] text-[var(--t4)] hover:border-[rgba(34,197,94,0.3)] hover:text-[var(--em3)] hover:bg-[rgba(34,197,94,0.06)]"
          }`}
        >
          <Circle size={8} fill={severityFilter === "all" ? "currentColor" : "none"} />All
        </button>
        <button
          onClick={() => setSeverityFilter("error")}
          className={`inline-flex items-center gap-[5px] p-[5px_11px] rounded-full text-[11px] border cursor-pointer transition-all duration-[150ms] font-[family-name:var(--font-b)] ${
            severityFilter === "error"
              ? "border-[rgba(239,68,68,0.3)] text-[#fca5a5] bg-[var(--redbg)]"
              : "border-[var(--border2)] text-[var(--t4)] hover:border-[rgba(239,68,68,0.3)] hover:text-[#fca5a5] hover:bg-[var(--redbg)]"
          }`}
        >
          Error
        </button>
        <button
          onClick={() => setSeverityFilter("warning")}
          className={`inline-flex items-center gap-[5px] p-[5px_11px] rounded-full text-[11px] border cursor-pointer transition-all duration-[150ms] font-[family-name:var(--font-b)] ${
            severityFilter === "warning"
              ? "border-[rgba(245,158,11,0.3)] text-[#fcd34d] bg-[var(--yellbg)]"
              : "border-[var(--border2)] text-[var(--t4)] hover:border-[rgba(245,158,11,0.3)] hover:text-[#fcd34d] hover:bg-[var(--yellbg)]"
          }`}
        >
          Warning
        </button>
        <button
          onClick={() => setSeverityFilter("suggestion")}
          className={`inline-flex items-center gap-[5px] p-[5px_11px] rounded-full text-[11px] border cursor-pointer transition-all duration-[150ms] font-[family-name:var(--font-b)] ${
            severityFilter === "suggestion"
              ? "border-[rgba(34,197,94,0.3)] text-[var(--em3)] bg-[rgba(34,197,94,0.06)]"
              : "border-[var(--border2)] text-[var(--t4)] hover:border-[rgba(34,197,94,0.3)] hover:text-[var(--em3)] hover:bg-[rgba(34,197,94,0.06)]"
          }`}
        >
          Suggestion
        </button>
      </div>

      {filteredReviews.length > 0 ? (
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
              {filteredReviews.map((r, i) => {
                const severity = getSeverity(r.commentsCount);
                let sevBadgeClass = "bg-[rgba(34,197,94,0.1)] text-[var(--em3)] border border-[rgba(34,197,94,0.18)]";
                let sevLabel = "Suggestion";

                if (severity === "error") {
                  sevBadgeClass = "bg-[var(--redbg)] text-[#fca5a5] border border-[var(--redbr)]";
                  sevLabel = "Error";
                } else if (severity === "warning") {
                  sevBadgeClass = "bg-[var(--yellbg)] text-[#fcd34d] border border-[var(--yellbr)]";
                  sevLabel = "Warning";
                }

                const statusBadgeClass = r.status === "open"
                  ? "bg-[rgba(34,197,94,0.1)] text-[var(--em3)] border border-[rgba(34,197,94,0.18)]"
                  : "bg-[rgba(107,114,128,0.1)] text-[#9ca3af] border border-[rgba(107,114,128,0.18)]";

                return (
                  <tr key={r.id} className="hover:bg-[rgba(34,197,94,0.02)] transition-colors opacity-0" style={{ animation: `rowIn 0.35s ease ${Math.min(i * 0.07, 2)}s forwards` }}>
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
                      <span className={`inline-flex items-center gap-[3px] text-[10px] font-semibold p-[3px_8px] rounded-[4px] tracking-[.04em] uppercase whitespace-nowrap ${sevBadgeClass}`}>{sevLabel}</span>
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
          <Search size={32} className="text-[var(--t5)] mx-auto mb-3" />
          <h3 className="text-[14px] font-medium text-[var(--t2)] mb-1">No reviews found</h3>
          <p className="text-[12px] text-[var(--t4)]">
            {searchQuery || severityFilter !== "all"
              ? "Try adjusting your filters"
              : "Reviews will appear here once your GitHub App processes pull requests"}
          </p>
        </div>
      )}
    </div>
  );
}
