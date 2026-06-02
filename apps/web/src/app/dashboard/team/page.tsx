import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/Badge";
import { TrendingUp, Mail, UserPlus, MoreHorizontal } from "lucide-react";

const members = [
  { init: "SJ", av: "bg-[rgba(34,197,94,0.15)] text-[var(--em3)]", name: "Sarah Johnson", email: "sarah@acme.com", role: "Admin", roleVariant: "suggestion" as const, repos: 8 },
  { init: "JL", av: "bg-[rgba(59,130,246,0.15)] text-[#93c5fd]", name: "Jin Lee", email: "jin@acme.com", role: "Member", roleVariant: "info" as const, repos: 4 },
  { init: "PK", av: "bg-[rgba(168,85,247,0.15)] text-[#d8b4fe]", name: "Priya Kumar", email: "priya@acme.com", role: "Member", roleVariant: "info" as const, repos: 6 },
  { init: "TM", av: "bg-[rgba(245,158,11,0.15)] text-[#fcd34d]", name: "Tom Miller", email: "tom@acme.com", role: "Viewer", roleVariant: "neutral" as const, repos: 2 },
  { init: "AM", av: "bg-[rgba(59,130,246,0.15)] text-[#93c5fd]", name: "Alex Martinez", email: "alex@acme.com", role: "Member", roleVariant: "info" as const, repos: 3 },
];

export default function TeamPage() {
  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px] mb-[20px]">
        <StatCard label="Members" value="14" delta="+2 this month" deltaIcon={<TrendingUp size={12} />} />
        <StatCard
          label="Pending invites"
          value="3"
          valueColor="text-[var(--yellow)]"
          delta="Awaiting acceptance"
          deltaColor="text-[var(--yellow)]"
          deltaIcon={<Mail size={12} />}
        />
        <StatCard
          label="Seats used"
          value={<>14<span className="text-[16px] text-[var(--t4)]">/20</span></>}
          delta={
            <div className="w-full mt-[4px]">
              <div className="h-[4px] bg-[var(--border)] rounded-[2px] overflow-hidden">
                <div className="h-full bg-[var(--em)] rounded-[2px]" style={{ width: "70%" }} />
              </div>
            </div>
          }
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-[14px]">
        <h3 className="text-[14px] font-medium text-[var(--t1)]">Team members</h3>
        <button className="inline-flex items-center gap-[6px] text-[12px] py-[7px] px-[13px] rounded-[var(--rs)] cursor-pointer transition-all duration-[180ms] bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.25)] text-[var(--em3)] hover:bg-[rgba(34,197,94,0.18)]">
          <UserPlus size={13} />
          Invite member
        </button>
      </div>

      {/* Member list */}
      <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] py-[4px] px-[12px] md:px-[20px] overflow-x-auto">
        <div className="min-w-[600px]">
        {members.map((m, i) => (
          <div
            key={m.email}
            className={`flex items-center gap-[12px] py-[12px] ${
              i < members.length - 1 ? "border-b border-[var(--border)]" : ""
            }`}
          >
            <div className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0 ${m.av}`}>
              {m.init}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-[var(--t1)]">{m.name}</div>
              <div className="text-[11px] text-[var(--t4)]">{m.email}</div>
            </div>
            <div className="flex items-center gap-[8px] shrink-0">
              <Badge variant={m.roleVariant}>{m.role}</Badge>
              <span className="text-[11px] text-[var(--t4)]">{m.repos} repos</span>
              <button className="inline-flex items-center gap-[6px] text-[11px] py-[4px] px-[9px] rounded-[var(--rs)] border border-[var(--border2)] bg-transparent text-[var(--t4)] cursor-pointer transition-all duration-[180ms] hover:border-[var(--em2)] hover:text-[var(--em3)]">
                <MoreHorizontal size={12} />
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}
