"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export function HeroSection() {
  const { data: session } = useSession();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState({ c1: 0, c2: 0, c3: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = canvas.width = hero.offsetWidth;
    let H = canvas.height = hero.offsetHeight;
    let nodes: any[] = [];
    let edges: any[] = [];
    let labels: any[] = [];
    let t = 0;

    const EM = '#22c55e';
    const LINE = 'rgba(34,197,94,0.13)';
    const TEXT = 'rgba(34,197,94,0.22)';

    const LABEL_POOL = [
      'auth.validate()', 'jwt.sign()', 'middleware', 'rate_limit', 'PR #347',
      'security_scan', 'lint.check()', 'OWASP', 'token.verify', '.mergeowl.yml',
      'webhook', 'error: 0x4f', 'review.post()', 'merge_gate', 'secret_detect',
      'acme/api', 'src/auth', 'diff.parse()', 'comment.thread', 'severity: ERROR'
    ];

    function init() {
      nodes = [];
      edges = [];
      labels = [];

      const positions = [
        [0.12, 0.18], [0.28, 0.12], [0.5, 0.08], [0.72, 0.15], [0.88, 0.22],
        [0.08, 0.45], [0.22, 0.52], [0.42, 0.38], [0.6, 0.42], [0.78, 0.35], [0.92, 0.5],
        [0.15, 0.72], [0.35, 0.65], [0.55, 0.75], [0.75, 0.68], [0.88, 0.78],
        [0.04, 0.88], [0.48, 0.92], [0.82, 0.88]
      ];

      positions.forEach((p, i) => {
        nodes.push({
          x: p[0] * W,
          y: p[1] * H,
          r: 2 + Math.random() * 2.5,
          pulse: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 0.5,
          born: i * 18,
          opacity: 0
        });
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < W * 0.28 && Math.random() > 0.35) {
            edges.push({
              a: i,
              b: j,
              progress: 0,
              speed: 0.004 + Math.random() * 0.004,
              delay: Math.min(nodes[i].born, nodes[j].born) + 20,
              done: false
            });
          }
        }
      }

      for (let i = 0; i < 10; i++) {
        labels.push({
          text: LABEL_POOL[i % LABEL_POOL.length],
          x: (0.05 + Math.random() * 0.9) * W,
          y: (0.05 + Math.random() * 0.9) * H,
          opacity: 0,
          targetOpacity: 0.18 + Math.random() * 0.12,
          delay: 60 + i * 25
        });
      }
    }

    function drawRulers(ctx: CanvasRenderingContext2D) {
      ctx.save();
      [0.12, 0.35, 0.58, 0.8].forEach(fy => {
        ctx.beginPath();
        ctx.moveTo(0, fy * H);
        ctx.lineTo(W, fy * H);
        ctx.strokeStyle = 'rgba(34,197,94,0.04)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 12]);
        ctx.stroke();
      });
      [0.15, 0.38, 0.62, 0.85].forEach(fx => {
        ctx.beginPath();
        ctx.moveTo(fx * W, 0);
        ctx.lineTo(fx * W, H);
        ctx.strokeStyle = 'rgba(34,197,94,0.04)';
        ctx.stroke();
      });
      ctx.setLineDash([]);
      ctx.restore();
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      t++;

      drawRulers(ctx);

      // Edges
      ctx.save();
      edges.forEach(e => {
        if (t < e.delay) return;
        if (!e.done) e.progress = Math.min(1, e.progress + e.speed);
        if (e.progress >= 1) e.done = true;
        const na = nodes[e.a];
        const nb = nodes[e.b];
        const ex = na.x + (nb.x - na.x) * e.progress;
        const ey = na.y + (nb.y - na.y) * e.progress;
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = LINE;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        if (e.done) {
          const pt = (t * 0.003 + e.delay * 0.01) % 1;
          const px = na.x + (nb.x - na.x) * pt;
          const py = na.y + (nb.y - na.y) * pt;
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(34,197,94,0.4)';
          ctx.fill();
        }
      });
      ctx.restore();

      // Nodes
      nodes.forEach((n, i) => {
        if (t < n.born) return;
        n.opacity = Math.min(1, n.opacity + 0.04);
        const pulse = Math.sin(t * n.speed * 0.04 + n.pulse);
        const rr = n.r + pulse * 0.8;

        ctx.beginPath();
        ctx.arc(n.x, n.y, rr + 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(34,197,94,${0.08 * n.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(n.x, n.y, rr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,197,94,${0.5 * n.opacity})`;
        ctx.fill();

        if (n.r > 3) {
          ctx.save();
          ctx.strokeStyle = `rgba(34,197,94,${0.2 * n.opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(n.x - 10, n.y);
          ctx.lineTo(n.x + 10, n.y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(n.x, n.y - 10);
          ctx.lineTo(n.x, n.y + 10);
          ctx.stroke();
          ctx.restore();
        }
      });

      // Labels
      ctx.save();
      ctx.font = "400 10px 'JetBrains Mono', monospace";
      labels.forEach(l => {
        if (t < l.delay) return;
        l.opacity = Math.min(l.targetOpacity, l.opacity + 0.008);
        ctx.fillStyle = `rgba(34,197,94,${l.opacity})`;
        ctx.fillText(l.text, l.x, l.y);
      });
      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(draw);
    }

    function handleResize() {
      if (!canvas || !hero) return;
      W = canvas.width = hero.offsetWidth;
      H = canvas.height = hero.offsetHeight;
      init();
    }

    init();
    draw();
    window.addEventListener('resize', handleResize);

    // Animate counters
    if (!hasAnimated.current) {
      hasAnimated.current = true;
      setTimeout(() => {
        const animateCounter = (target: number, key: 'c1' | 'c2' | 'c3', duration: number) => {
          let start = 0;
          const step = target / (duration / 16);
          const tick = () => {
            start = Math.min(start + step, target);
            setCounters(prev => ({ ...prev, [key]: Math.round(start) }));
            if (start < target) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        };

        animateCounter(847, 'c1', 1800);
        animateCounter(3200, 'c2', 2000);
        animateCounter(58, 'c3', 1400);
      }, 500);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="px-[40px] pt-[110px] pb-[90px] text-center relative overflow-hidden min-h-[700px] flex flex-col items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(7,12,7,0.65) 70%, rgba(7,12,7,0.95) 100%)'
        }}
      />

      {/* Top glow */}
      <div
        className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.07) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-[2]">
        {/* Badge */}
        <div className="inline-flex items-center gap-[8px] bg-[rgba(34,197,94,0.07)] border border-[rgba(34,197,94,0.18)] rounded-full px-[16px] py-[7px] text-[11px] font-medium text-[var(--em3)] mb-[36px] tracking-[0.06em] uppercase">
          <span className="w-[6px] h-[6px] rounded-full bg-[var(--em)] animate-pulse" />
          Now reviewing your PRs in seconds
        </div>

        {/* Heading */}
        <h1 className="font-[family-name:var(--font-d)] text-[76px] font-normal leading-[1.03] text-[var(--t1)] max-w-[820px] mx-auto mb-[16px] tracking-[-0.025em]">
          Code review done<br />by those who <em className="italic text-[var(--em)]">never sleep.</em>
        </h1>

        {/* Subtitle */}
        <p className="text-[18px] text-[rgba(107,114,128,0.9)] max-w-[500px] mx-auto mb-[48px] leading-[1.7] font-light">
          MergeOwl watches every pull request. Catches bugs, enforces standards, and posts inline comments — before your team even opens the diff.
        </p>

        {/* CTAs */}
        <div className="flex gap-[14px] justify-center items-center mb-[64px]">
          <Link
            href={session ? "/dashboard" : "/login"}
            className="inline-flex items-center gap-[10px] bg-[var(--em)] text-[#022c0a] text-[15px] font-semibold px-[28px] py-[14px] rounded-[var(--r)] border-none cursor-pointer font-[family-name:var(--font-b)] relative overflow-hidden transition-all duration-[250ms] hover:bg-[var(--em3)] hover:-translate-y-[2px]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            {session ? "Go to Dashboard" : "Install free on GitHub"}
          </Link>
          <button className="inline-flex items-center gap-[8px] bg-transparent text-[var(--t2)] text-[15px] font-normal px-[24px] py-[14px] rounded-[var(--r)] border border-[var(--border2)] cursor-pointer font-[family-name:var(--font-b)] transition-all duration-200 hover:border-[var(--em2)] hover:text-[var(--t1)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Watch it work
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-[48px] justify-center pt-[48px] border-t border-[rgba(31,45,31,0.6)]">
          {[
            { value: counters.c1, suffix: 'K+', label: 'PRs reviewed' },
            { value: counters.c2, suffix: '+', label: 'teams using it' },
            { value: counters.c3, suffix: 'ms', label: 'avg. first comment' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-[family-name:var(--font-d)] text-[36px] text-[var(--t1)]">
                <span className="text-[var(--em)] italic">{stat.value}</span>{stat.suffix}
              </div>
              <div className="text-[11px] text-[var(--t4)] mt-[5px] tracking-[0.07em] uppercase font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(220%); }
        }
      `}</style>
    </div>
  );
}
