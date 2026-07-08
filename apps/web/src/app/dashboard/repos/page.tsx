"use client";

import { useEffect, useState } from "react";
import { Activity, AlertTriangle, Circle, Plus } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { RepoCard } from "@/components/dashboard/repo-card";
import { API_BASE } from "@/lib/config";

interface Repo {
  name: string;
  reviewCount: number;
  lastReviewedAt: string;
}

export default function ReposPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE}/api/repos`);
        if (!response.ok) throw new Error("Failed to fetch repos");

        const data = await response.json();
        setRepos(data);
      } catch (err) {
        console.error("Failed to fetch repos:", err);
        setError("Could not connect to API");
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  // Calculate stats from repos
  const connectedRepos = repos.length;
  const activeToday = repos.filter(repo => {
    const lastReviewed = new Date(repo.lastReviewedAt);
    const today = new Date();
    return lastReviewed.toDateString() === today.toDateString();
  }).length;

  if (loading) {
    return (
      <div className="page-section">
        <div className="grid grid-cols-3 gap-[14px] mb-[20px]">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] p-[14px_16px] h-[100px] animate-pulse" />
          ))}
        </div>
        <div className="flex flex-col gap-[8px]">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] h-[80px] animate-pulse" />
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

  return (
    <div className="page-section" style={{ animation: "fadeIn 0.3s ease both" }}>
      <div className="grid grid-cols-3 gap-[14px] mb-[20px]">
        <StatCard
          title="Connected repos"
          value={connectedRepos.toString()}
          delta={<><Activity size={12} />Total repositories</>}
          deltaType="up"
        />
        <StatCard
          title="Active today"
          value={activeToday.toString()}
          delta={
            activeToday > 0 ? (
              <><Circle size={8} fill="currentColor" /><span className="text-[var(--em3)] font-medium">Reviews today</span></>
            ) : (
              <><Circle size={8} /><span className="text-[var(--t4)]">No activity</span></>
            )
          }
          deltaType={activeToday > 0 ? "up" : "neutral"}
        />
        <StatCard
          title="Total reviews"
          value={repos.reduce((sum, r) => sum + r.reviewCount, 0).toString()}
          delta={<><Activity size={12} />All repositories</>}
          deltaType="neutral"
        />
      </div>

      <div className="flex items-center justify-between mb-[14px]">
        <h3 className="text-[14px] font-medium text-[var(--t1)] m-0">All repositories</h3>
        <a
          href="https://github.com/apps/mergeowl/installations/new"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-[6px] text-[12px] font-[family-name:var(--font-b)] p-[7px_13px] rounded-[var(--rs)] border border-[rgba(34,197,94,0.25)] bg-[rgba(34,197,94,0.1)] text-[var(--em3)] cursor-pointer transition-all duration-[180ms] hover:border-[rgba(34,197,94,0.18)] hover:bg-[rgba(34,197,94,0.18)] hover:text-[var(--em4)]"
        >
          <Plus size={13} />
          Add repo
        </a>
      </div>

      {repos.length > 0 ? (
        <div className="flex flex-col gap-[8px]">
          {repos.map((repo) => (
            <RepoCard
              key={repo.name}
              name={repo.name}
              lang="GitHub"
              prs={repo.reviewCount}
              status={repo.reviewCount > 0 ? "green" : "gray"}
              lastReviewedAt={repo.lastReviewedAt}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] p-16 text-center">
          <AlertTriangle size={32} className="text-[var(--t5)] mx-auto mb-3" />
          <h3 className="text-[14px] font-medium text-[var(--t2)] mb-1">No repositories connected</h3>
          <p className="text-[12px] text-[var(--t4)] mb-4">
            Install the MergeOwl GitHub App to start reviewing pull requests
          </p>
          <a
            href="https://github.com/apps/mergeowl/installations/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[6px] text-[12px] font-[family-name:var(--font-b)] p-[7px_13px] rounded-[var(--rs)] border border-[rgba(34,197,94,0.25)] bg-[rgba(34,197,94,0.1)] text-[var(--em3)] cursor-pointer transition-all duration-[180ms] hover:border-[rgba(34,197,94,0.18)] hover:bg-[rgba(34,197,94,0.18)] hover:text-[var(--em4)]"
          >
            <Plus size={13} />
            Add your first repository
          </a>
        </div>
      )}
    </div>
  );
}
