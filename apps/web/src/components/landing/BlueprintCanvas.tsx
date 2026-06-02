"use client";

import { useEffect, useRef } from "react";

const LABEL_POOL = [
  "auth.validate()", "jwt.sign()", "middleware", "rate_limit", "PR #347",
  "security_scan", "lint.check()", "OWASP", "token.verify", ".mergeowl.yml",
  "webhook", "error: 0x4f", "review.post()", "merge_gate", "secret_detect",
  "acme/api", "src/auth", "diff.parse()", "comment.thread", "severity: ERROR",
];

interface Node {
  x: number; y: number; r: number; pulse: number; speed: number; born: number; opacity: number;
}
interface Edge {
  a: number; b: number; progress: number; speed: number; delay: number; done: boolean;
}
interface Label {
  text: string; x: number; y: number; opacity: number; targetOpacity: number; delay: number;
}

export function BlueprintCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const stateRef = useRef<{ nodes: Node[]; edges: Edge[]; labels: Label[]; t: number }>({
    nodes: [], edges: [], labels: [], t: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = parentRef.current;
    if (!canvas || !parent) return;

    const LINE = "rgba(34,197,94,0.13)";

    function init() {
      const W = canvas!.width = parent!.offsetWidth;
      const H = canvas!.height = parent!.offsetHeight;
      const nodes: Node[] = [];
      const edges: Edge[] = [];
      const labels: Label[] = [];

      const positions = [
        [0.12, 0.18], [0.28, 0.12], [0.5, 0.08], [0.72, 0.15], [0.88, 0.22],
        [0.08, 0.45], [0.22, 0.52], [0.42, 0.38], [0.6, 0.42], [0.78, 0.35], [0.92, 0.5],
        [0.15, 0.72], [0.35, 0.65], [0.55, 0.75], [0.75, 0.68], [0.88, 0.78],
        [0.04, 0.88], [0.48, 0.92], [0.82, 0.88],
      ];

      positions.forEach((p, i) => {
        nodes.push({
          x: p[0] * W, y: p[1] * H,
          r: 2 + Math.random() * 2.5,
          pulse: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 0.5,
          born: i * 18,
          opacity: 0,
        });
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < W * 0.28 && Math.random() > 0.35) {
            edges.push({
              a: i, b: j, progress: 0,
              speed: 0.004 + Math.random() * 0.004,
              delay: Math.min(nodes[i].born, nodes[j].born) + 20,
              done: false,
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
          delay: 60 + i * 25,
        });
      }

      stateRef.current = { nodes, edges, labels, t: 0 };
    }

    function drawRulers(ctx: CanvasRenderingContext2D, W: number, H: number) {
      ctx.save();
      [0.12, 0.35, 0.58, 0.8].forEach((fy) => {
        ctx.beginPath();
        ctx.moveTo(0, fy * H);
        ctx.lineTo(W, fy * H);
        ctx.strokeStyle = "rgba(34,197,94,0.04)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 12]);
        ctx.stroke();
      });
      [0.15, 0.38, 0.62, 0.85].forEach((fx) => {
        ctx.beginPath();
        ctx.moveTo(fx * W, 0);
        ctx.lineTo(fx * W, H);
        ctx.strokeStyle = "rgba(34,197,94,0.04)";
        ctx.stroke();
      });
      ctx.setLineDash([]);
      ctx.restore();
    }

    function draw() {
      const ctx = canvas!.getContext("2d");
      if (!ctx) return;
      const W = canvas!.width;
      const H = canvas!.height;
      const { nodes, edges, labels } = stateRef.current;
      stateRef.current.t++;
      const t = stateRef.current.t;

      ctx.clearRect(0, 0, W, H);
      drawRulers(ctx, W, H);

      // Edges
      ctx.save();
      edges.forEach((e) => {
        if (t < e.delay) return;
        if (!e.done) e.progress = Math.min(1, e.progress + e.speed);
        if (e.progress >= 1) e.done = true;
        const na = nodes[e.a], nb = nodes[e.b];
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
          ctx.fillStyle = "rgba(34,197,94,0.4)";
          ctx.fill();
        }
      });
      ctx.restore();

      // Nodes
      nodes.forEach((n) => {
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
          ctx.beginPath(); ctx.moveTo(n.x - 10, n.y); ctx.lineTo(n.x + 10, n.y); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(n.x, n.y - 10); ctx.lineTo(n.x, n.y + 10); ctx.stroke();
          ctx.restore();
        }
      });

      // Labels
      ctx.save();
      ctx.font = "400 10px 'JetBrains Mono', monospace";
      labels.forEach((l) => {
        if (t < l.delay) return;
        l.opacity = Math.min(l.targetOpacity, l.opacity + 0.008);
        ctx.fillStyle = `rgba(34,197,94,${l.opacity})`;
        ctx.fillText(l.text, l.x, l.y);
      });
      ctx.restore();

      animRef.current = requestAnimationFrame(draw);
    }

    init();

    const handleResize = () => {
      cancelAnimationFrame(animRef.current);
      init();
    };

    window.addEventListener("resize", handleResize);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={parentRef} className="absolute inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
    </div>
  );
}
