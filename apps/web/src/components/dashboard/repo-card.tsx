import { GitBranch } from "lucide-react";

interface RepoCardProps {
  readonly name: string;
  readonly lang: string;
  readonly prs: number;
  readonly status: "green" | "yellow" | "gray";
}

export function RepoCard({ name, lang, prs, status }: RepoCardProps) {
  let statusLabel = "Paused";
  if (status === "green") statusLabel = "Active";
  else if (status === "yellow") statusLabel = "Setup needed";

  let statusColor = "bg-[var(--t5)]";
  if (status === "green") statusColor = "bg-[var(--em)]";
  else if (status === "yellow") statusColor = "bg-[var(--yellow)]";

  return (
    <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] p-[16px_18px] flex items-center gap-[14px] transition-all duration-200 hover:border-[var(--border3)] hover:-translate-y-[1px]">
      <div className="w-[38px] h-[38px] rounded-[8px] bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.15)] flex items-center justify-center text-[var(--em)] shrink-0">
        <GitBranch size={18} />
      </div>
      <div>
        <div className="text-[13px] font-medium text-[var(--t1)]">{name}</div>
        <div className="text-[11px] text-[var(--t4)] mt-[2px]">{lang} · {prs} open PRs</div>
      </div>
      <div className="ml-auto flex items-center gap-[8px]">
        <div className={`w-[7px] h-[7px] rounded-full ${statusColor}`} />
        <span className="text-[11px] text-[var(--t4)]">{statusLabel}</span>
        <button className="inline-flex items-center gap-[6px] text-[11px] font-[family-name:var(--font-b)] p-[5px_10px] rounded-[var(--rs)] border border-[var(--border2)] bg-transparent text-[var(--t4)] cursor-pointer transition-all duration-[180ms] hover:border-[var(--border3)] hover:text-[var(--t2)]">
          Configure
        </button>
      </div>
    </div>
  );
}
