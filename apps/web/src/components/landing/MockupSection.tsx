"use client";

import { ScrollReveal } from "./ScrollReveal";
import { AlertTriangle, AlertCircle, Lightbulb } from "lucide-react";

export function MockupSection() {
  return (
    <div className="w-full flex justify-center">
      <ScrollReveal className="px-[20px] md:px-[40px] pb-[40px] md:pb-[80px] max-w-[900px] w-full">
        <div className="text-center text-[11px] text-[var(--t4)] tracking-[0.1em] uppercase font-medium mb-[24px]">
        Live inline review — as it happens
      </div>

      <div className="bg-[var(--g2)] border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden">
        {/* Browser bar */}
        <div className="bg-[var(--g3)] py-[12px] px-[16px] flex items-center gap-[8px] border-b border-[var(--border)] overflow-hidden">
          <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f56] shrink-0" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e] shrink-0" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#27c93f] shrink-0" />
          <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--t4)] ml-[8px] truncate">
            github.com / acme / api / pull / 347
          </span>
        </div>

        {/* Body */}
        <div className="p-[16px] md:p-[24px] overflow-hidden">
          {/* PR Header */}
          <div className="flex items-start gap-[12px] mb-[20px]">
            <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--em)] bg-[rgba(34,197,94,0.1)] py-[3px] px-[8px] rounded-[4px] border border-[rgba(34,197,94,0.2)] whitespace-nowrap mt-[3px]">
              PR #347
            </span>
            <div>
              <div className="text-[15px] font-medium text-[var(--t1)] leading-[1.4]">
                refactor: migrate auth service to JWT rotation
              </div>
              <div className="text-[12px] text-[var(--t4)] mt-[3px]">
                opened by <span className="text-[var(--t2)]">@sarah_dev</span> · 14 files changed · 2h ago
              </div>
            </div>
          </div>

          {/* Code block */}
          <div className="bg-[var(--g)] border border-[var(--border)] rounded-[var(--radius-sm)] font-[family-name:var(--font-mono)] text-[11px] md:text-[12px] overflow-x-auto overflow-y-hidden mb-[12px]">
            <div className="flex gap-[12px] md:gap-[16px] py-[3px] px-[12px] md:px-[16px] leading-[1.7] min-w-max">
              <span className="text-[var(--t5)] min-w-[24px] text-right select-none">41</span>
              <span className="text-[#a5f3c0]">
                <span className="text-[#c084fc]">const</span> token = <span className="text-[#60a5fa]">sign</span>(payload, process.env.SECRET)
              </span>
            </div>
            <div className="flex gap-[12px] md:gap-[16px] py-[3px] px-[12px] md:px-[16px] leading-[1.7] bg-[rgba(239,68,68,0.08)] border-l-2 border-l-[var(--red)] min-w-max">
              <span className="text-[var(--t5)] min-w-[24px] text-right select-none">42</span>
              <span className="text-[#a5f3c0]">
                <span className="text-[#c084fc]">const</span> expires = <span className="text-[#fbbf24]">&apos;never&apos;</span>{" "}
                <span className="text-[#4b5563]">{"// TODO: fix later"}</span>
              </span>
            </div>
            <div className="flex gap-[12px] md:gap-[16px] py-[3px] px-[12px] md:px-[16px] leading-[1.7] min-w-max">
              <span className="text-[var(--t5)] min-w-[24px] text-right select-none">43</span>
              <span className="text-[#a5f3c0]">
                <span className="text-[#60a5fa]">res</span>.cookie(<span className="text-[#fbbf24]">&apos;auth&apos;</span>, token, {"{ expires }"})
              </span>
            </div>
          </div>

          {/* Comment cards */}
          <div className="bg-[rgba(34,197,94,0.04)] border border-[rgba(34,197,94,0.1)] rounded-[var(--radius-sm)] py-[14px] px-[16px] mt-[8px] animate-[slideIn_0.5s_ease_1s_forwards] opacity-0">
            <div className="flex items-center gap-[8px] mb-[8px]">
              <span className="inline-flex items-center gap-[4px] text-[10px] font-semibold py-[3px] px-[9px] rounded-[4px] tracking-[0.05em] uppercase bg-[rgba(239,68,68,0.12)] text-[#fca5a5] border border-[rgba(239,68,68,0.2)]">
                <AlertTriangle size={10} /> Error
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--t4)]">src/auth/tokenService.ts · line 42</span>
            </div>
            <div className="text-[13px] text-[var(--t3)] leading-[1.6]">
              Token expiry set to <code className="bg-[rgba(239,68,68,0.1)] py-[1px] px-[5px] rounded-[3px] text-[11px] font-[family-name:var(--font-mono)]">&apos;never&apos;</code> — permanent session token. Use <code className="bg-[rgba(34,197,94,0.08)] py-[1px] px-[5px] rounded-[3px] text-[11px] font-[family-name:var(--font-mono)]">expiresIn: &apos;15m&apos;</code> with refresh rotation.
            </div>
          </div>

          <div className="bg-[rgba(34,197,94,0.04)] border border-[rgba(34,197,94,0.1)] rounded-[var(--radius-sm)] py-[14px] px-[16px] mt-[8px] animate-[slideIn_0.5s_ease_1.7s_forwards] opacity-0">
            <div className="flex items-center gap-[8px] mb-[8px]">
              <span className="inline-flex items-center gap-[4px] text-[10px] font-semibold py-[3px] px-[9px] rounded-[4px] tracking-[0.05em] uppercase bg-[rgba(245,158,11,0.12)] text-[#fcd34d] border border-[rgba(245,158,11,0.2)]">
                <AlertCircle size={10} /> Warning
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--t4)]">src/auth/tokenService.ts · line 41</span>
            </div>
            <div className="text-[13px] text-[var(--t3)] leading-[1.6]">
              Signing secret read without validation. Add startup assertion: <code className="bg-[rgba(245,158,11,0.08)] py-[1px] px-[5px] rounded-[3px] text-[11px] font-[family-name:var(--font-mono)]">{"if (!process.env.SECRET) throw new Error(...)"}</code>
            </div>
          </div>

          <div className="bg-[rgba(34,197,94,0.04)] border border-[rgba(34,197,94,0.1)] rounded-[var(--radius-sm)] py-[14px] px-[16px] mt-[8px] animate-[slideIn_0.5s_ease_2.4s_forwards] opacity-0">
            <div className="flex items-center gap-[8px] mb-[8px]">
              <span className="inline-flex items-center gap-[4px] text-[10px] font-semibold py-[3px] px-[9px] rounded-[4px] tracking-[0.05em] uppercase bg-[rgba(34,197,94,0.1)] text-[#86efac] border border-[rgba(34,197,94,0.15)]">
                <Lightbulb size={10} /> Suggestion
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--t4)]">src/auth/tokenService.ts · line 43</span>
            </div>
            <div className="text-[13px] text-[var(--t3)] leading-[1.6]">
              Add <code className="bg-[rgba(34,197,94,0.06)] py-[1px] px-[5px] rounded-[3px] text-[11px] font-[family-name:var(--font-mono)]">{"httpOnly: true, secure: true, sameSite: 'strict'"}</code> to harden against XSS.
            </div>
          </div>
        </div>
      </div>
      </ScrollReveal>
    </div>
  );
}
