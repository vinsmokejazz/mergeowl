"use client";

import { ScrollReveal } from "./ScrollReveal";
import { ShieldCheck, GitPullRequest, Zap, ArrowUpRight } from "lucide-react";

const features = [
  {
    num: "01",
    icon: <ShieldCheck size={22} />,
    title: "Security-first analysis",
    desc: "Detects OWASP-top-10 patterns, secret leaks, and injection vectors across every diff — not just linting rules.",
    tag: "security.scan",
  },
  {
    num: "02",
    icon: <GitPullRequest size={22} />,
    title: "Context-aware comments",
    desc: "Understands your codebase structure, naming conventions, and past decisions to give comments that fit your team's style.",
    tag: "context.engine",
  },
  {
    num: "03",
    icon: <Zap size={22} />,
    title: "Sub-60s turnaround",
    desc: "First review comment posts before your team has opened the PR. No queue, no cold starts — always watching.",
    tag: "latency.avg: 38ms",
  },
];

export function FeaturesSection() {
  return (
    <div className="py-[60px] md:py-[80px] px-[20px] md:px-[40px] relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(180deg, transparent 0%, rgba(34,197,94,0.025) 50%, transparent 100%)",
      }} />
      {/* Grid texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(34,197,94,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.03) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
      }} />

      <div className="w-full flex justify-center relative z-[1]">
        <div className="max-w-[1000px] w-full">
          <ScrollReveal>
            <div className="text-[11px] text-[var(--em)] tracking-[0.12em] uppercase font-medium mb-[14px]">
              Why teams ship with MergeOwl
            </div>
            <div className="font-[family-name:var(--font-display)] text-[36px] md:text-[46px] font-normal text-[var(--t1)] leading-[1.1] md:leading-[1.08] mb-[32px] md:mb-[56px]">
              Reviews that actually<br className="hidden md:block" /><em className="italic text-[var(--em)]">understand</em> your code.
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
            {features.map((f, i) => (
              <ScrollReveal key={f.num} delay={(i + 1) * 0.1}>
                <div className="bg-[var(--g2)] border border-[var(--border)] rounded-[var(--radius-lg)] pt-[30px] px-[28px] pb-[56px] cursor-pointer transition-all duration-350 relative overflow-hidden group hover:border-[rgba(34,197,94,0.28)] hover:-translate-y-[6px] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px] before:bg-[linear-gradient(90deg,transparent_0%,rgba(34,197,94,0.5)_50%,transparent_100%)] before:opacity-0 before:transition-opacity before:duration-350 hover:before:opacity-100 after:content-[''] after:absolute after:-top-[60px] after:-left-[40px] after:w-[180px] after:h-[180px] after:rounded-full after:bg-[radial-gradient(circle,rgba(34,197,94,0.07)_0%,transparent_70%)] after:opacity-0 after:transition-opacity after:duration-350 hover:after:opacity-100">
                  <span className="font-[family-name:var(--font-mono)] text-[10px] text-[rgba(34,197,94,0.35)] tracking-[0.1em] mb-[20px] block">
                    {f.num} ——
                  </span>
                  <div className="w-[46px] h-[46px] bg-[rgba(34,197,94,0.06)] border border-[rgba(34,197,94,0.12)] rounded-[10px] flex items-center justify-center mb-[20px] text-[var(--em)] relative z-[1] transition-all duration-300 group-hover:bg-[rgba(34,197,94,0.12)] group-hover:border-[rgba(34,197,94,0.25)]">
                    {f.icon}
                  </div>
                  <h3 className="text-[17px] font-medium text-[var(--t1)] mb-[11px] tracking-[-0.01em] relative z-[1]">
                    {f.title}
                  </h3>
                  <p className="text-[13px] text-[var(--t4)] leading-[1.75] font-light relative z-[1]">
                    {f.desc}
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 py-[16px] px-[28px] border-t border-[var(--border)] flex items-center justify-between opacity-0 translate-y-[4px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="text-[10px] text-[var(--em)] font-[family-name:var(--font-mono)] tracking-[0.06em]">
                      {f.tag}
                    </span>
                    <ArrowUpRight size={15} className="text-[var(--em)]" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
