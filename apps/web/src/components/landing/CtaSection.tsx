"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { API_BASE } from "@/lib/config";

export function CtaSection() {
  const { data: session } = useSession();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [stats, setStats] = useState({ totalReviews: 0, uniqueRepos: 0 });

  useEffect(() => {
    fetch(`${API_BASE}/api/stats`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Failed to fetch stats"))))
      .then((data) => {
        setStats({
          totalReviews: data.totalReviews || 0,
          uniqueRepos: data.uniqueRepos || 0,
        });
      })
      .catch((err) => {
        console.error("Failed to fetch stats for CtaSection:", err);
      });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = section.offsetWidth);
    let H = (canvas.height = section.offsetHeight);
    let t2 = 0;

    function drawGrid() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      t2++;

      const VP = { x: W / 2, y: H * 0.55 }; // vanishing point
      const gridColor = "rgba(34,197,94,";

      // Horizontal lines — perspective
      const numH = 14;
      for (let i = 0; i < numH; i++) {
        const fy = 0.55 + (i / numH) * 0.55; // only bottom half
        const y = fy * H;
        const spread = (fy - 0.55) / 0.55; // 0 at vp, 1 at bottom
        const x0 = VP.x - spread * (W * 0.7);
        const x1 = VP.x + spread * (W * 0.7);
        const alpha = spread * 0.12;
        ctx.beginPath();
        ctx.moveTo(x0, y);
        ctx.lineTo(x1, y);
        ctx.strokeStyle = gridColor + alpha + ")";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Vertical / radial lines from VP
      const numV = 18;
      for (let i = 0; i < numV; i++) {
        const angle = -70 + (i / (numV - 1)) * 140; // degrees spread
        const rad = angle * (Math.PI / 180);
        const endX = VP.x + Math.sin(rad) * H * 1.2;
        const endY = H * 1.1;
        const alpha = 0.05 + Math.abs(Math.sin(rad)) * 0.03;
        ctx.beginPath();
        ctx.moveTo(VP.x, VP.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gridColor + alpha + ")";
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      // Animated scan line
      const scanY = VP.y + ((t2 * 0.5) % (H - VP.y));
      ctx.beginPath();
      ctx.moveTo(VP.x - (scanY - VP.y) * 1.1, scanY);
      ctx.lineTo(VP.x + (scanY - VP.y) * 1.1, scanY);
      ctx.strokeStyle = "rgba(34,197,94,0.06)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animationFrameRef.current = requestAnimationFrame(drawGrid);
    }

    function handleResize() {
      if (!canvas || !section) return;
      W = canvas.width = section.offsetWidth;
      H = canvas.height = section.offsetHeight;
    }

    drawGrid();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="px-[40px] py-[120px] text-center border-t border-[var(--border)] relative overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Layered glows */}
      <div
        className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.06) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(34,197,94,0.05) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 left-[10%] right-[10%] h-[1px] z-[2]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(34,197,94,0.3), rgba(34,197,94,0.6), rgba(34,197,94,0.3), transparent)",
        }}
      />

      <div className="relative z-[3]">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-[8px] bg-[rgba(34,197,94,0.06)] border border-[rgba(34,197,94,0.14)] rounded-full px-[16px] py-[6px] text-[11px] font-medium text-[var(--em)] mb-[28px] tracking-[0.08em] uppercase">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          Free forever for small teams
        </div>

        {/* Heading */}
        <h2 className="font-[family-name:var(--font-d)] text-[60px] font-normal text-[var(--t1)] mb-[16px] leading-[1.05] tracking-[-0.02em]">
          Ship code <em className="italic text-[var(--em)]">you trust.</em>
        </h2>

        {/* Subtitle */}
        <p className="text-[16px] text-[var(--t4)] mb-[44px] font-light max-w-[400px] mx-auto">
          Free for teams up to 5 repos. No credit card. Live in 60 seconds.
        </p>

        {/* CTA buttons */}
        <div className="flex gap-[14px] justify-center mb-[56px]">
          <Link
            href={session ? "/dashboard" : "/login"}
            className="inline-flex items-center gap-[10px] bg-[var(--em)] text-[#022c0a] text-[15px] font-semibold px-[32px] py-[15px] rounded-[var(--r)] border-none cursor-pointer font-[family-name:var(--font-b)] relative overflow-hidden transition-all duration-[250ms] hover:bg-[var(--em3)] hover:-translate-y-[2px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            {session ? "Go to Dashboard" : "Install MergeOwl — it's free"}
          </Link>
        </div>

        {/* Trust strip */}
        <div className="flex gap-[12px] justify-center flex-wrap">
          {[
            { icon: "shield-check", text: "SOC 2 Type II" },
            { icon: "lock", text: "No code stored" },
            { icon: "clock", text: "60s setup" },
            { icon: "star", text: "4.9 on GitHub Marketplace" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-[8px] bg-[rgba(255,255,255,0.02)] border border-[var(--border)] rounded-[var(--rs)] px-[16px] py-[10px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--em)]"
              >
                {item.icon === "shield-check" && (
                  <>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </>
                )}
                {item.icon === "lock" && (
                  <>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </>
                )}
                {item.icon === "clock" && (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </>
                )}
                {item.icon === "star" && (
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                )}
              </svg>
              <span className="text-[12px] text-[var(--t4)]">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="flex gap-[48px] justify-center mt-[52px] pt-[44px] border-t border-[var(--border)]">
          {[
            { 
              value: stats.totalReviews >= 1000 ? (stats.totalReviews / 1000).toFixed(1) : stats.totalReviews.toString(), 
              suffix: stats.totalReviews >= 1000 ? "K+" : "+", 
              label: "PRs reviewed" 
            },
            { 
              value: stats.uniqueRepos >= 1000 ? (stats.uniqueRepos / 1000).toFixed(1) : stats.uniqueRepos.toString(), 
              suffix: stats.uniqueRepos >= 1000 ? "K+" : "+", 
              label: "teams onboarded" 
            },
            { value: "38", suffix: "ms", label: "avg. latency" },
            { value: "99.9", suffix: "%", label: "uptime SLA" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-[family-name:var(--font-d)] text-[30px] text-[var(--t1)]">
                <em className="text-[var(--em)] italic not-italic">
                  {stat.value}
                </em>
                {stat.suffix}
              </div>
              <div className="text-[11px] text-[var(--t4)] mt-[4px] tracking-[0.06em] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
