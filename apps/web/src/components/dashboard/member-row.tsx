import { MoreHorizontal } from "lucide-react";

interface MemberRowProps {
  readonly init: string;
  readonly av: "av-g" | "av-b" | "av-p" | "av-o";
  readonly name: string;
  readonly email: string;
  readonly role: "Admin" | "Member" | "Viewer";
  readonly repos: number;
  readonly isLast?: boolean;
}

export function MemberRow({ init, av, name, email, role, repos, isLast }: MemberRowProps) {
  let avClass = "bg-[rgba(245,158,11,0.15)] text-[#fcd34d]";
  if (av === "av-g") avClass = "bg-[rgba(34,197,94,0.15)] text-[var(--em3)]";
  else if (av === "av-b") avClass = "bg-[rgba(59,130,246,0.15)] text-[#93c5fd]";
  else if (av === "av-p") avClass = "bg-[rgba(168,85,247,0.15)] text-[#d8b4fe]";

  let badgeClass = "bg-[rgba(107,114,128,0.1)] text-[#9ca3af] border border-[rgba(107,114,128,0.18)]";
  if (role === "Admin") badgeClass = "bg-[rgba(34,197,94,0.1)] text-[var(--em3)] border border-[rgba(34,197,94,0.18)]";
  else if (role === "Member") badgeClass = "bg-[var(--bluebg)] text-[#93c5fd] border border-[var(--bluebr)]";

  return (
    <div className={`flex items-center gap-[12px] py-[12px] ${isLast ? "" : "border-b border-[var(--border)]"}`}>
      <div className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0 ${avClass}`}>
        {init}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium text-[var(--t1)]">{name}</div>
        <div className="text-[11px] text-[var(--t4)]">{email}</div>
      </div>
      <div className="flex items-center gap-[8px] shrink-0">
        <span className={`inline-flex items-center gap-[3px] text-[10px] font-semibold px-[8px] py-[3px] rounded-[4px] tracking-[.04em] uppercase whitespace-nowrap ${badgeClass}`}>
          {role}
        </span>
        <span className="text-[var(--t4)] text-[11px]">{repos} repos</span>
        <button className="inline-flex items-center justify-center rounded-[var(--rs)] border border-[var(--border2)] bg-transparent text-[var(--t4)] cursor-pointer transition-all duration-[180ms] hover:border-[var(--border3)] hover:text-[var(--t2)] !p-[4px_9px]">
          <MoreHorizontal size={12} />
        </button>
      </div>
    </div>
  );
}
