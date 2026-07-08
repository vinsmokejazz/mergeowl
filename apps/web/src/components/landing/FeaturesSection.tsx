"use client";

import { useEffect, useRef } from "react";

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll(".scroll-reveal");
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      num: "01",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      title: "Security-first analysis",
      description: "Detects OWASP-top-10 patterns, secret leaks, and injection vectors across every diff — not just linting rules.",
      tag: "security.scan"
    },
    {
      num: "02",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="18" r="3"/>
          <circle cx="6" cy="6" r="3"/>
          <path d="M13 6h3a2 2 0 0 1 2 2v7"/>
          <path d="M6 9v12"/>
        </svg>
      ),
      title: "Context-aware comments",
      description: "Understands your codebase structure, naming conventions, and past decisions to give comments that fit your team's style.",
      tag: "context.engine"
    },
    {
      num: "03",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
          <path d="M16.2 7.8l2.9-2.9"/>
        </svg>
      ),
      title: "Sub-60s turnaround",
      description: "First review comment posts before your team has opened the PR. No queue, no cold starts — always watching.",
      tag: "latency.avg: 38ms"
    }
  ];

  return (
    <div ref={sectionRef} className="px-[40px] py-[80px] relative overflow-hidden" id="features">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(34,197,94,0.025)_50%,transparent_100%)] pointer-events-none" />

      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-100"
        style={{
          backgroundImage: "linear-gradient(rgba(34,197,94,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)"
        }}
      />

      <div className="max-w-[1000px] mx-auto relative z-[1]">
        <div className="text-[11px] text-[var(--em)] tracking-[0.12em] uppercase font-medium mb-[14px]">
          Why teams ship with MergeOwl
        </div>
        <div className="font-[family-name:var(--font-d)] text-[46px] font-normal text-[var(--t1)] leading-[1.08] mb-[56px]">
          Reviews that actually<br /><em className="italic text-[var(--em)]">understand</em> your code.
        </div>

        <div className="grid grid-cols-3 gap-[16px]">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`scroll-reveal opacity-0 translate-y-[36px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] bg-[var(--g2)] border border-[var(--border)] rounded-[var(--r)] p-[30px_28px_56px] cursor-pointer relative overflow-hidden group`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-[linear-gradient(90deg,transparent_0%,rgba(34,197,94,0.5)_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-[350ms]" />

              {/* Inner glow blob */}
              <div className="absolute top-[-60px] left-[-40px] w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.07)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-[350ms]" />

              <span className="font-[family-name:var(--font-m)] text-[10px] text-[rgba(34,197,94,0.35)] tracking-[0.1em] mb-[20px] block">
                {feature.num} ——
              </span>

              <div className="w-[46px] h-[46px] bg-[rgba(34,197,94,0.06)] border border-[rgba(34,197,94,0.12)] rounded-[10px] flex items-center justify-center mb-[20px] text-[21px] text-[var(--em)] transition-all duration-300 relative z-[1] group-hover:bg-[rgba(34,197,94,0.12)] group-hover:border-[rgba(34,197,94,0.25)]">
                {feature.icon}
              </div>

              <h3 className="text-[17px] font-medium text-[var(--t1)] mb-[11px] tracking-[-0.01em] relative z-[1]">
                {feature.title}
              </h3>

              <p className="text-[13px] text-[var(--t4)] leading-[1.75] font-light relative z-[1]">
                {feature.description}
              </p>

              {/* Footer that appears on hover */}
              <div className="absolute bottom-0 left-0 right-0 px-[28px] py-[16px] border-t border-[var(--border)] flex items-center justify-between opacity-0 translate-y-[4px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <span className="text-[10px] text-[var(--em)] font-[family-name:var(--font-m)] tracking-[0.06em]">
                  {feature.tag}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--em)]">
                  <path d="M7 7h10v10"/>
                  <path d="M7 17 17 7"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scroll-reveal.visible {
          opacity: 1;
          transform: none;
        }
      `}</style>
    </div>
  );
}
