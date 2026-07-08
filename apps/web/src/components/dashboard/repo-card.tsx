import { GitBranch, Settings } from "lucide-react";

interface RepoCardProps {
  readonly name: string;
  readonly lang: string;
  readonly prs: number;
  readonly status: "green" | "yellow" | "gray";
  readonly lastReviewedAt?: string;
}

export function RepoCard({ name, lang, prs, status, lastReviewedAt }: RepoCardProps) {
  let statusColor = "bg-[rgba(34,197,94,0.2)]";
  if (status === "yellow") statusColor = "bg-[rgba(245,158,11,0.2)]";
  if (status === "gray") statusColor = "bg-[rgba(107,114,128,0.2)]";

  const formatLastReviewed = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] p-[14px_16px] flex items-center gap-[12px] hover:border-[var(--border3)] transition-all duration-[180ms]">
      <div className={`w-[36px] h-[36px] rounded-[var(--rs)] flex items-center justify-center shrink-0 ${statusColor}`}>
        <GitBranch size={16} className="text-[var(--t2)]" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-[family-name:var(--font-m)] text-[13px] text-[var(--t1)] mb-[2px]">
          {name}
        </div>
        <div className="text-[11px] text-[var(--t5)]">
          {lang} • {prs} review{prs !== 1 ? "s" : ""}
          {lastReviewedAt && ` • Last reviewed ${formatLastReviewed(lastReviewedAt)}`}
        </div>
      </div>

      <a
        href={`https://github.com/${name}/settings/installations`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-[6px] text-[11px] font-[family-name:var(--font-b)] p-[6px_11px] rounded-[var(--rs)] border border-[var(--border2)] bg-transparent text-[var(--t4)] cursor-pointer transition-all duration-[180ms] hover:border-[var(--border3)] hover:text-[var(--t2)] shrink-0"
      >
        <Settings size={12} />
        Configure
      </a>
    </div>
  );
}
