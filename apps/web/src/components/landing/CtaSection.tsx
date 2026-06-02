"use client";

import { ScrollReveal } from "./ScrollReveal";
import { CtaCanvas } from "./CtaCanvas";
import { Calendar, ShieldCheck, Lock, Clock, Star } from "lucide-react";
import { GitHubIcon } from "@/components/ui/GitHubIcon";

export function CtaSection() {
  return (
    <ScrollReveal className="py-[60px] md:py-[120px] px-[20px] md:px-[40px] text-center border-t border-[var(--border)] relative overflow-hidden">
      <CtaCanvas />

      {/* Glow effects */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] pointer-events-none z-[1]" style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.06) 0%, transparent 65%)",
      }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[200px] pointer-events-none z-[1]" style={{
        background: "radial-gradient(ellipse at 50% 100%, rgba(34,197,94,0.05) 0%, transparent 70%)",
      }} />

      {/* Top border accent */}
      <div className="absolute top-0 left-[10%] right-[10%] h-[1px] z-[2]" style={{
        background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.3), rgba(34,197,94,0.6), rgba(34,197,94,0.3), transparent)",
      }} />

      <div className="relative z-[3]">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-[8px] bg-[rgba(34,197,94,0.06)] border border-[rgba(34,197,94,0.14)] rounded-full py-[6px] px-[16px] text-[11px] font-medium text-[var(--em)] mb-[28px] tracking-[0.08em] uppercase">
          <GitHubIcon size={13} />
          Free forever for small teams
        </div>

        <h2 className="font-[family-name:var(--font-display)] text-[48px] md:text-[60px] font-normal text-[var(--t1)] mb-[16px] leading-[1.05] tracking-[-0.02em]">
          Ship code <em className="italic text-[var(--em)]">you trust.</em>
        </h2>

        <p className="inline-block text-[16px] text-[var(--t4)] mb-[44px] font-light max-w-[400px]">
          Free for teams up to 5 repos. No credit card. Live in 60 seconds.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-[14px] justify-center mb-[56px] w-full sm:w-auto px-[20px] sm:px-0">
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-[10px] bg-[var(--em)] text-[#022c0a] text-[15px] font-semibold py-[15px] px-[32px] rounded-[var(--radius)] border-none cursor-pointer relative overflow-hidden transition-all duration-250 hover:bg-[var(--em3)] hover:-translate-y-[2px] after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)] after:translate-x-[-100%] after:animate-[shimmer_2.8s_infinite]">
            <GitHubIcon size={18} />
            Install MergeOwl — it&apos;s free
          </button>
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-[8px] bg-transparent text-[var(--t2)] text-[15px] font-normal py-[15px] px-[24px] rounded-[var(--radius)] border border-[var(--border2)] cursor-pointer transition-all duration-200 hover:border-[var(--em2)] hover:text-[var(--t1)]">
            <Calendar size={15} />
            Book a demo
          </button>
        </div>

        {/* Trust strip */}
        <div className="flex gap-[12px] justify-center flex-wrap">
          {[
            { icon: <ShieldCheck size={14} />, text: "SOC 2 Type II" },
            { icon: <Lock size={14} />, text: "No code stored" },
            { icon: <Clock size={14} />, text: "60s setup" },
            { icon: <Star size={14} />, text: "4.9 on GitHub Marketplace" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-[8px] bg-[rgba(255,255,255,0.02)] border border-[var(--border)] rounded-[var(--radius-sm)] py-[10px] px-[16px]">
              <span className="text-[var(--em)]">{item.icon}</span>
              <span className="text-[12px] text-[var(--t4)]">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Proof numbers */}
        <div className="flex flex-wrap gap-[32px] md:gap-[48px] justify-center mt-[52px] pt-[44px] border-t border-[var(--border)]">
          {[
            { n: "847", suffix: "K+", label: "PRs reviewed" },
            { n: "3.2", suffix: "K+", label: "teams onboarded" },
            { n: "38", suffix: "ms", label: "avg. latency" },
            { n: "99.9", suffix: "%", label: "uptime SLA" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="font-[family-name:var(--font-display)] text-[30px] text-[var(--t1)]">
                <em className="text-[var(--em)] italic">{item.n}</em>{item.suffix}
              </div>
              <div className="text-[11px] text-[var(--t4)] mt-[4px] tracking-[0.06em] uppercase">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
