"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export function ReviewsOverTimeChart() {
  const ref = useRef<HTMLCanvasElement>(null);
  const inst = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    inst.current?.destroy();
    const ctx = ref.current.getContext("2d");
    if (!ctx) return;

    const days = Array.from({ length: 30 }, (_, i) => {
      const d = new Date(2026, 4, 1 + i);
      return `${d.getMonth() + 1}/${d.getDate()}`;
    });
    const vals = days.map(() => Math.round(20 + Math.random() * 35));

    inst.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: days,
        datasets: [{
          label: "Reviews",
          data: vals,
          borderColor: "#22c55e",
          backgroundColor: "rgba(34,197,94,0.07)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: "#6b7280", font: { size: 9 }, maxTicksLimit: 8, autoSkip: true }, grid: { color: "rgba(255,255,255,0.04)" } },
          y: { ticks: { color: "#6b7280", font: { size: 9 } }, grid: { color: "rgba(255,255,255,0.04)" } },
        },
      },
    });
    return () => { inst.current?.destroy(); };
  }, []);

  return <div className="relative w-full h-[220px]"><canvas ref={ref} /></div>;
}

export function SeverityChart() {
  const ref = useRef<HTMLCanvasElement>(null);
  const inst = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    inst.current?.destroy();
    const ctx = ref.current.getContext("2d");
    if (!ctx) return;

    inst.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Errors", "Warnings", "Suggestions"],
        datasets: [{ data: [312, 519, 698], backgroundColor: ["#ef4444", "#f59e0b", "#22c55e"], borderWidth: 0 }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: "68%" },
    });
    return () => { inst.current?.destroy(); };
  }, []);

  return <div className="relative w-full h-[220px]"><canvas ref={ref} /></div>;
}

export function RepoIssuesChart() {
  const ref = useRef<HTMLCanvasElement>(null);
  const inst = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    inst.current?.destroy();
    const ctx = ref.current.getContext("2d");
    if (!ctx) return;

    inst.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["acme/api", "acme/infra", "acme/web", "acme/sdk", "acme/mobile", "acme/cli"],
        datasets: [{
          label: "Issues",
          data: [87, 62, 45, 38, 24, 11],
          backgroundColor: "rgba(34,197,94,0.5)",
          borderColor: "rgba(34,197,94,0.8)",
          borderWidth: 1,
          borderRadius: 3,
        }],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: "#6b7280", font: { size: 9 } }, grid: { color: "rgba(255,255,255,0.04)" } },
          y: { ticks: { color: "#9ca3af", font: { size: 9, family: "'JetBrains Mono', monospace" } }, grid: { display: false } },
        },
      },
    });
    return () => { inst.current?.destroy(); };
  }, []);

  return <div className="relative w-full h-[220px]"><canvas ref={ref} /></div>;
}

export function LatencyChart() {
  const ref = useRef<HTMLCanvasElement>(null);
  const inst = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    inst.current?.destroy();
    const ctx = ref.current.getContext("2d");
    if (!ctx) return;

    const data = [42, 38, 35, 51, 46, 29, 24];
    inst.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
          label: "Seconds",
          data,
          backgroundColor: data.map((_, i) => i === 2 ? "#22c55e" : "rgba(34,197,94,0.35)"),
          borderRadius: 4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: "#6b7280", font: { size: 9 } }, grid: { display: false } },
          y: { ticks: { color: "#6b7280", font: { size: 9 } }, grid: { color: "rgba(255,255,255,0.04)" } },
        },
      },
    });
    return () => { inst.current?.destroy(); };
  }, []);

  return <div className="relative w-full h-[220px]"><canvas ref={ref} /></div>;
}
