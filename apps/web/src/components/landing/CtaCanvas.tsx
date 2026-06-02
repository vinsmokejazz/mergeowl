"use client";

import { useEffect, useRef } from "react";

export function CtaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = parentRef.current;
    if (!canvas || !parent) return;

    let W: number, H: number;

    function resize() {
      W = canvas!.width = parent!.offsetWidth;
      H = canvas!.height = parent!.offsetHeight;
    }

    function drawGrid() {
      const ctx = canvas!.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      tRef.current++;
      const t2 = tRef.current;

      const VP = { x: W / 2, y: H * 0.55 };
      const gridColor = "rgba(34,197,94,";

      // Horizontal lines — perspective
      const numH = 14;
      for (let i = 0; i < numH; i++) {
        const fy = 0.55 + (i / numH) * 0.55;
        const y = fy * H;
        const spread = (fy - 0.55) / 0.55;
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
        const angle = -70 + (i / (numV - 1)) * 140;
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

      animRef.current = requestAnimationFrame(drawGrid);
    }

    resize();
    window.addEventListener("resize", resize);
    animRef.current = requestAnimationFrame(drawGrid);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={parentRef} className="absolute inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
    </div>
  );
}
