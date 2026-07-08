"use client";

import { useEffect, useRef, useState } from "react";

export function DashboardPreview() {
  const [counters, setCounters] = useState({ reviews: 0, comments: 0, repos: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            // Animate counters
            const animateCounter = (target: number, key: 'reviews' | 'comments' | 'repos', duration: number) => {
              let start = 0;
              const step = target / (duration / 16);
              const tick = () => {
                start = Math.min(start + step, target);
                setCounters(prev => ({ ...prev, [key]: Math.round(start) }));
                if (start < target) requestAnimationFrame(tick);
              };
              requestAnimationFrame(tick);
            };

            animateCounter(1243, 'reviews', 1800);
            animateCounter(8471, 'comments', 2200);
            animateCounter(24, 'repos', 1200);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="px-[40px] py-[80px]">
      <h2 className="font-[family-name:var(--font-d)] text-[38px] font-normal text-[var(--t1)] mb-[8px] text-center">
        Your review <em className="italic text-[var(--em)]">command centre.</em>
      </h2>
      <p className="text-[15px] text-[var(--t4)] text-center mb-[48px] font-light">
        Everything your team needs to track, triage, and act on review activity.
      </p>

      <div className="bg-[var(--g2)] border border-[var(--border)] rounded-[var(--r)] overflow-hidden flex min-h-[560px]">
        {/* Sidebar */}
        <div className="w-[220px] bg-[var(--g3)] border-r border-[var(--border)] pt-[24px] pb-0 flex-shrink-0">
          <div className="px-[20px] pb-[24px] flex items-center gap-[10px] border-b border-[var(--border)]">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" fill="#0b120b" stroke="#22c55e" strokeWidth="0.8"/>
              <ellipse cx="8.5" cy="11.5" rx="3" ry="3.8" fill="#141f14" stroke="#22c55e" strokeWidth="0.6"/>
              <ellipse cx="15.5" cy="11.5" rx="3" ry="3.8" fill="#141f14" stroke="#22c55e" strokeWidth="0.6"/>
              <circle cx="8.5" cy="11.5" r="1.8" fill="#22c55e" opacity="0.9"/>
              <circle cx="15.5" cy="11.5" r="1.8" fill="#22c55e" opacity="0.9"/>
              <circle cx="8.5" cy="11.5" r="0.8" fill="#070c07"/>
              <circle cx="15.5" cy="11.5" r="0.8" fill="#070c07"/>
            </svg>
            <span className="font-[family-name:var(--font-d)] text-[18px] text-[var(--t1)]">MergeOwl</span>
          </div>

          <div className="px-[12px] py-[16px]">
            <div className="flex items-center gap-[10px] px-[12px] py-[9px] rounded-[var(--rs)] text-[13px] text-[var(--em3)] cursor-pointer mb-[2px] bg-[rgba(34,197,94,0.08)] font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
              Overview
            </div>
            {['Reviews', 'Repositories'].map((link) => (
              <div key={link} className="flex items-center gap-[10px] px-[12px] py-[9px] rounded-[var(--rs)] text-[13px] text-[var(--t4)] cursor-pointer transition-all duration-200 mb-[2px] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--t2)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="18" r="3"/>
                  <circle cx="6" cy="6" r="3"/>
                  <path d="M13 6h3a2 2 0 0 1 2 2v7"/>
                  <path d="M6 9v12"/>
                </svg>
                {link}
              </div>
            ))}

            <div className="text-[10px] text-[var(--t5)] tracking-[0.08em] uppercase px-[12px] pt-[12px] pb-[6px] font-medium">
              Analytics
            </div>
            {['Insights', 'Trends'].map((link) => (
              <div key={link} className="flex items-center gap-[10px] px-[12px] py-[9px] rounded-[var(--rs)] text-[13px] text-[var(--t4)] cursor-pointer transition-all duration-200 mb-[2px] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--t2)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18"/>
                  <path d="m19 9-5 5-4-4-3 3"/>
                </svg>
                {link}
              </div>
            ))}

            <div className="text-[10px] text-[var(--t5)] tracking-[0.08em] uppercase px-[12px] pt-[12px] pb-[6px] font-medium">
              Settings
            </div>
            {['Config', 'Team'].map((link) => (
              <div key={link} className="flex items-center gap-[10px] px-[12px] py-[9px] rounded-[var(--rs)] text-[13px] text-[var(--t4)] cursor-pointer transition-all duration-200 mb-[2px] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--t2)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6m0 6v6"/>
                </svg>
                {link}
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Topbar */}
          <div className="px-[24px] py-[16px] border-b border-[var(--border)] flex items-center justify-between">
            <div>
              <div className="text-[15px] font-medium text-[var(--t1)]">Overview</div>
              <div className="text-[12px] text-[var(--t4)]">Last 30 days · Acme Engineering</div>
            </div>
            <div className="flex gap-[8px]">
              <button className="bg-transparent border border-[var(--border2)] text-[var(--t4)] text-[11px] px-[10px] py-[4px] rounded-[6px] cursor-pointer font-[family-name:var(--font-b)] transition-all duration-200 hover:border-[var(--em2)] hover:text-[var(--em3)]">
                Sync
              </button>
              <button className="bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.2)] text-[var(--em3)] text-[11px] px-[10px] py-[4px] rounded-[6px] cursor-pointer font-[family-name:var(--font-b)] transition-all duration-200">
                + Add repo
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-[24px] py-[24px] flex-1">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-[14px] mb-[28px]">
              {[
                { label: 'Total reviews', value: counters.reviews, delta: '+18% this month' },
                { label: 'Comments posted', value: counters.comments, delta: '+24% this month' },
                { label: 'Repos connected', value: counters.repos, delta: 'All active' }
              ].map((stat, i) => (
                <div key={i} className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] px-[20px] py-[18px]">
                  <div className="text-[11px] text-[var(--t4)] tracking-[0.06em] uppercase font-medium mb-[10px]">
                    {stat.label}
                  </div>
                  <div className="font-[family-name:var(--font-d)] text-[32px] text-[var(--t1)] leading-none">
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-[var(--em)] mt-[6px] flex items-center gap-[4px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                      <polyline points="17 6 23 6 23 12"/>
                    </svg>
                    {stat.delta}
                  </div>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] overflow-hidden">
              <div className="flex items-center justify-between px-[18px] py-[14px] border-b border-[var(--border)]">
                <span className="text-[13px] font-medium text-[var(--t1)]">Recent reviews</span>
                <span className="text-[11px] text-[var(--t4)]">Updated 2m ago</span>
              </div>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-[10px] text-[var(--t5)] font-medium tracking-[0.06em] uppercase px-[18px] py-[10px] text-left border-b border-[var(--border)]">Repository</th>
                    <th className="text-[10px] text-[var(--t5)] font-medium tracking-[0.06em] uppercase px-[18px] py-[10px] text-left border-b border-[var(--border)]">Pull request</th>
                    <th className="text-[10px] text-[var(--t5)] font-medium tracking-[0.06em] uppercase px-[18px] py-[10px] text-left border-b border-[var(--border)]">Comments</th>
                    <th className="text-[10px] text-[var(--t5)] font-medium tracking-[0.06em] uppercase px-[18px] py-[10px] text-left border-b border-[var(--border)]">Severity</th>
                    <th className="text-[10px] text-[var(--t5)] font-medium tracking-[0.06em] uppercase px-[18px] py-[10px] text-left border-b border-[var(--border)]"></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { repo: 'acme/api', pr: 'PR #347 · JWT rotation refactor', comments: 12, severity: 'Error', severityClass: 'bg-[rgba(239,68,68,0.12)] text-[#fca5a5] border border-[rgba(239,68,68,0.2)]' },
                    { repo: 'acme/web', pr: 'PR #201 · Dashboard v2 rewrite', comments: 5, severity: 'Warning', severityClass: 'bg-[rgba(245,158,11,0.12)] text-[#fcd34d] border border-[rgba(245,158,11,0.2)]' },
                    { repo: 'acme/infra', pr: 'PR #89 · Terraform IAM policies', comments: 8, severity: 'Error', severityClass: 'bg-[rgba(239,68,68,0.12)] text-[#fca5a5] border border-[rgba(239,68,68,0.2)]' },
                    { repo: 'acme/mobile', pr: 'PR #134 · Push notification service', comments: 3, severity: 'Suggestion', severityClass: 'bg-[rgba(34,197,94,0.1)] text-[#86efac] border border-[rgba(34,197,94,0.15)]' },
                    { repo: 'acme/sdk', pr: 'PR #56 · Rate limiting middleware', comments: 6, severity: 'Warning', severityClass: 'bg-[rgba(245,158,11,0.12)] text-[#fcd34d] border border-[rgba(245,158,11,0.2)]' }
                  ].map((row, i) => (
                    <tr key={i} className="opacity-0 animate-[rowIn_0.4s_ease_forwards] hover:bg-[rgba(34,197,94,0.02)]" style={{ animationDelay: `${i * 0.1}s` }}>
                      <td className="px-[18px] py-[11px] text-[12px] text-[var(--t2)] border-b border-[rgba(25,38,25,0.5)]">
                        <div className="flex items-center gap-[8px]">
                          <div className="w-[6px] h-[6px] rounded-full bg-[var(--em)]" />
                          {row.repo}
                        </div>
                      </td>
                      <td className="px-[18px] py-[11px] text-[12px] text-[var(--t4)] font-[family-name:var(--font-m)] text-[11px] border-b border-[rgba(25,38,25,0.5)]">
                        {row.pr}
                      </td>
                      <td className="px-[18px] py-[11px] text-[12px] font-[family-name:var(--font-m)] text-[13px] text-[var(--em)] border-b border-[rgba(25,38,25,0.5)]">
                        {row.comments}
                      </td>
                      <td className="px-[18px] py-[11px] text-[12px] text-[var(--t2)] border-b border-[rgba(25,38,25,0.5)]">
                        <span className={`inline-flex items-center gap-[3px] text-[10px] font-semibold px-[9px] py-[3px] rounded-[4px] tracking-[0.05em] uppercase ${row.severityClass}`}>
                          {row.severity}
                        </span>
                      </td>
                      <td className="px-[18px] py-[11px] text-[12px] text-[var(--t2)] border-b border-[rgba(25,38,25,0.5)]">
                        <button className="bg-transparent border border-[var(--border2)] text-[var(--t4)] text-[11px] px-[10px] py-[4px] rounded-[6px] cursor-pointer font-[family-name:var(--font-b)] transition-all duration-200 hover:border-[var(--em2)] hover:text-[var(--em3)]">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes rowIn {
          from {
            opacity: 0;
            transform: translateX(-6px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
