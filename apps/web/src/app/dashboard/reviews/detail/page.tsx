"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function ReviewDetailPage() {
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({
    ic1: true,
    ic2: false,
    ic3: false,
  });

  const toggleComment = (id: string) => {
    setOpenComments(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="page-section" style={{ animation: "fadeIn 0.3s ease both" }}>
      <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] p-[18px_20px] mb-[14px]">
        <div className="flex items-center gap-[8px] mb-[12px]">
          <span className="inline-flex items-center gap-[3px] text-[10px] font-semibold px-[8px] py-[3px] rounded-[4px] tracking-[.04em] uppercase whitespace-nowrap bg-[var(--redbg)] text-[#fca5a5] border border-[var(--redbr)]">2 errors</span>
          <span className="inline-flex items-center gap-[3px] text-[10px] font-semibold px-[8px] py-[3px] rounded-[4px] tracking-[.04em] uppercase whitespace-nowrap bg-[var(--yellbg)] text-[#fcd34d] border border-[var(--yellbr)]">1 warning</span>
          <span className="inline-flex items-center gap-[3px] text-[10px] font-semibold px-[8px] py-[3px] rounded-[4px] tracking-[.04em] uppercase whitespace-nowrap bg-[rgba(34,197,94,0.1)] text-[var(--em3)] border border-[rgba(34,197,94,0.18)]">2 suggestions</span>
          
          <span className="ml-auto text-[11px] text-[var(--t4)]">
            PR #347 · opened 2h ago by <span className="text-[var(--t2)]">@sarah_dev</span>
          </span>
        </div>
        <div className="font-[family-name:var(--font-d)] text-[22px] text-[var(--t1)] mb-[6px]">
          refactor: migrate auth service to JWT rotation
        </div>
        <div className="text-[12px] text-[var(--t4)]">
          acme/api · 14 files changed · +342 −89 lines
        </div>
        <div className="h-[1px] bg-[var(--border)] my-[14px]"></div>
        <div className="text-[12px] text-[var(--t4)] mb-[6px] font-medium tracking-[.04em] uppercase">
          AI summary
        </div>
        <div className="text-[13px] text-[var(--t3)] leading-[1.75] font-light">
          This PR migrates the auth service to JWT. Two critical security issues detected: tokens set to never expire, and no secret validation at startup. Cookie security flags also missing. These must be resolved before merge to prevent session hijacking.
        </div>
      </div>

      {/* Inline Comment 1 */}
      <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] overflow-hidden mb-[10px]">
        <button type="button" className="w-full text-left flex items-center gap-[10px] p-[10px_14px] cursor-pointer transition-colors duration-150 hover:bg-[rgba(255,255,255,0.02)] select-none" onClick={() => toggleComment('ic1')}>
          <span className="inline-flex items-center gap-[3px] text-[10px] font-semibold px-[8px] py-[3px] rounded-[4px] tracking-[.04em] uppercase whitespace-nowrap bg-[var(--redbg)] text-[#fca5a5] border border-[var(--redbr)]">Error</span>
          <span className="font-[family-name:var(--font-m)] text-[11px] text-[var(--t4)]">src/auth/tokenService.ts</span>
          <span className="inline-flex items-center p-[2px_8px] rounded-[4px] text-[10px] font-medium bg-[var(--g4)] border border-[var(--border2)] text-[var(--t4)]">line 42</span>
          <span className="ml-auto text-[11px] text-[var(--t4)]">Click to expand</span>
          <ChevronDown size={13} className={`text-[var(--t5)] transition-transform duration-200 ${openComments.ic1 ? "rotate-180" : ""}`} />
        </button>
        
        {openComments.ic1 && (
          <div className="p-[12px_14px] border-t border-[var(--border)]">
            <div className="bg-[var(--g)] border border-[var(--border)] rounded-[var(--rs)] overflow-hidden mb-[10px]">
              <div className="flex gap-[14px] px-[14px] py-[3px] leading-[1.7] font-[family-name:var(--font-m)] text-[11px]">
                <span className="text-[var(--t5)] min-w-[22px] text-right">40</span>
                <span><span className="text-[#c084fc]">const</span> payload = {"{ userId, role }"}</span>
              </div>
              <div className="flex gap-[14px] px-[14px] py-[3px] leading-[1.7] font-[family-name:var(--font-m)] text-[11px]">
                <span className="text-[var(--t5)] min-w-[22px] text-right">41</span>
                <span><span className="text-[#c084fc]">const</span> token = <span className="text-[#60a5fa]">sign</span>(payload, process.env.SECRET)</span>
              </div>
              <div className="flex gap-[14px] px-[14px] py-[3px] leading-[1.7] font-[family-name:var(--font-m)] text-[11px] bg-[rgba(239,68,68,0.07)] border-l-[2px] border-l-[var(--red)] -ml-[2px]">
                <span className="text-[var(--t5)] min-w-[20px] text-right">42</span>
                <span><span className="text-[#c084fc]">const</span> expires = <span className="text-[#fbbf24]">&apos;never&apos;</span> <span className="text-[#4b5563]">{"// TODO: fix later"}</span></span>
              </div>
              <div className="flex gap-[14px] px-[14px] py-[3px] leading-[1.7] font-[family-name:var(--font-m)] text-[11px]">
                <span className="text-[var(--t5)] min-w-[22px] text-right">43</span>
                <span><span className="text-[#60a5fa]">res</span>.cookie(<span className="text-[#fbbf24]">&apos;auth&apos;</span>, token, {"{ expires }"})</span>
              </div>
            </div>
            <div className="text-[12px] text-[var(--t3)] leading-[1.7]">
              Token expiry set to <code className="bg-[rgba(239,68,68,0.1)] px-[5px] py-[1px] rounded-[3px] font-[family-name:var(--font-m)] text-[11px]">&apos;never&apos;</code> creates permanent session tokens vulnerable to replay attacks. Use <code className="bg-[rgba(34,197,94,0.08)] px-[5px] py-[1px] rounded-[3px] font-[family-name:var(--font-m)] text-[11px]">expiresIn: &apos;15m&apos;</code> with refresh token rotation.
            </div>
          </div>
        )}
      </div>

      {/* Inline Comment 2 */}
      <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] overflow-hidden mb-[10px]">
        <button type="button" className="w-full text-left flex items-center gap-[10px] p-[10px_14px] cursor-pointer transition-colors duration-150 hover:bg-[rgba(255,255,255,0.02)] select-none" onClick={() => toggleComment('ic2')}>
          <span className="inline-flex items-center gap-[3px] text-[10px] font-semibold px-[8px] py-[3px] rounded-[4px] tracking-[.04em] uppercase whitespace-nowrap bg-[var(--yellbg)] text-[#fcd34d] border border-[var(--yellbr)]">Warning</span>
          <span className="font-[family-name:var(--font-m)] text-[11px] text-[var(--t4)]">src/auth/middleware.ts</span>
          <span className="inline-flex items-center p-[2px_8px] rounded-[4px] text-[10px] font-medium bg-[var(--g4)] border border-[var(--border2)] text-[var(--t4)]">line 18</span>
          <ChevronDown size={13} className={`ml-auto text-[var(--t5)] transition-transform duration-200 ${openComments.ic2 ? "rotate-180" : ""}`} />
        </button>
        
        {openComments.ic2 && (
          <div className="p-[12px_14px] border-t border-[var(--border)]">
            <div className="bg-[var(--g)] border border-[var(--border)] rounded-[var(--rs)] overflow-hidden mb-[10px]">
              <div className="flex gap-[14px] px-[14px] py-[3px] leading-[1.7] font-[family-name:var(--font-m)] text-[11px] bg-[rgba(239,68,68,0.07)] border-l-[2px] border-l-[var(--red)] -ml-[2px]">
                <span className="text-[var(--t5)] min-w-[20px] text-right">18</span>
                <span><span className="text-[#c084fc]">const</span> token = <span className="text-[#60a5fa]">verify</span>(req.headers.authorization, process.env.SECRET)</span>
              </div>
            </div>
            <div className="text-[12px] text-[var(--t3)] leading-[1.7]">
              No error handling around <code className="bg-[rgba(245,158,11,0.08)] px-[5px] py-[1px] rounded-[3px] font-[family-name:var(--font-m)] text-[11px]">verify()</code> — a malformed token throws and crashes the request. Wrap in try/catch and return 401.
            </div>
          </div>
        )}
      </div>

      {/* Inline Comment 3 */}
      <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] overflow-hidden mb-[10px]">
        <button type="button" className="w-full text-left flex items-center gap-[10px] p-[10px_14px] cursor-pointer transition-colors duration-150 hover:bg-[rgba(255,255,255,0.02)] select-none" onClick={() => toggleComment('ic3')}>
          <span className="inline-flex items-center gap-[3px] text-[10px] font-semibold px-[8px] py-[3px] rounded-[4px] tracking-[.04em] uppercase whitespace-nowrap bg-[rgba(34,197,94,0.1)] text-[var(--em3)] border border-[rgba(34,197,94,0.18)]">Suggestion</span>
          <span className="font-[family-name:var(--font-m)] text-[11px] text-[var(--t4)]">src/auth/tokenService.ts</span>
          <span className="inline-flex items-center p-[2px_8px] rounded-[4px] text-[10px] font-medium bg-[var(--g4)] border border-[var(--border2)] text-[var(--t4)]">line 43</span>
          <ChevronDown size={13} className={`ml-auto text-[var(--t5)] transition-transform duration-200 ${openComments.ic3 ? "rotate-180" : ""}`} />
        </button>
        
        {openComments.ic3 && (
          <div className="p-[12px_14px] border-t border-[var(--border)]">
            <div className="bg-[var(--g)] border border-[var(--border)] rounded-[var(--rs)] overflow-hidden mb-[10px]">
              <div className="flex gap-[14px] px-[14px] py-[3px] leading-[1.7] font-[family-name:var(--font-m)] text-[11px] bg-[rgba(239,68,68,0.07)] border-l-[2px] border-l-[var(--red)] -ml-[2px]">
                <span className="text-[var(--t5)] min-w-[20px] text-right">43</span>
                <span><span className="text-[#60a5fa]">res</span>.cookie(<span className="text-[#fbbf24]">&apos;auth&apos;</span>, token, {"{ expires }"})</span>
              </div>
            </div>
            <div className="text-[12px] text-[var(--t3)] leading-[1.7]">
              Add <code className="bg-[rgba(34,197,94,0.06)] px-[5px] py-[1px] rounded-[3px] font-[family-name:var(--font-m)] text-[11px]">httpOnly: true, secure: true, sameSite: &apos;strict&apos;</code> to harden against XSS and CSRF attacks.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
