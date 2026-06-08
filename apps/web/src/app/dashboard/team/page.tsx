"use client";

import { Activity, Mail, UserPlus } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { MemberRow } from "@/components/dashboard/member-row";

const members = [
  { init: "SJ", av: "av-g" as const, name: "Sarah Johnson", email: "sarah@acme.com", role: "Admin" as const, repos: 8 },
  { init: "JL", av: "av-b" as const, name: "Jin Lee", email: "jin@acme.com", role: "Member" as const, repos: 4 },
  { init: "PK", av: "av-p" as const, name: "Priya Kumar", email: "priya@acme.com", role: "Member" as const, repos: 6 },
  { init: "TM", av: "av-o" as const, name: "Tom Miller", email: "tom@acme.com", role: "Viewer" as const, repos: 2 },
  { init: "AM", av: "av-b" as const, name: "Alex Martinez", email: "alex@acme.com", role: "Member" as const, repos: 3 },
];

export default function TeamPage() {
  return (
    <div className="page-section" style={{ animation: "fadeIn 0.3s ease both" }}>
      <div className="grid grid-cols-3 gap-[14px] mb-[20px]">
        <StatCard title="Members" value="14" delta={<><Activity size={12} />+2 this month</>} deltaType="up" />
        <StatCard title="Pending invites" value="3" delta={<><Mail size={12} />Awaiting acceptance</>} deltaType="warning" />
        
        <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] p-[14px_16px]">
          <div className="text-[12px] text-[var(--t4)] font-medium tracking-[.04em] uppercase mb-[10px]">
            Seats used
          </div>
          <div className="font-[family-name:var(--font-d)] text-[34px] leading-none text-[var(--t1)]">
            14<span className="text-[16px] text-[var(--t4)]">/20</span>
          </div>
          <div className="h-[4px] bg-[var(--border)] rounded-[2px] overflow-hidden mt-[10px]">
            <div className="h-full bg-[var(--em)] rounded-[2px] transition-all duration-400 ease-in" style={{ width: "70%" }}></div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-[14px]">
        <h3 className="text-[14px] font-medium text-[var(--t1)] m-0">Team members</h3>
        <button className="inline-flex items-center gap-[6px] text-[12px] font-[family-name:var(--font-b)] p-[7px_13px] rounded-[var(--rs)] border border-[rgba(34,197,94,0.25)] bg-[rgba(34,197,94,0.1)] text-[var(--em3)] cursor-pointer transition-all duration-[180ms] hover:border-[rgba(34,197,94,0.18)] hover:bg-[rgba(34,197,94,0.18)] hover:text-[var(--em4)]">
          <UserPlus size={13} />
          Invite member
        </button>
      </div>

      <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] p-[18px_20px]">
        {members.map((m, i) => (
          <MemberRow key={m.email} {...m} isLast={i === members.length - 1} />
        ))}
      </div>
    </div>
  );
}
