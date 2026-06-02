"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export function DashboardChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Reviews",
            data: [4, 6, 3, 8, 5, 2, 7],
            borderColor: "#22c55e",
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              color: "rgba(26, 42, 26, 0.4)",
            },
            ticks: {
              color: "#6b7280",
              font: {
                family: "'Inter', sans-serif",
                size: 10,
              },
            },
          },
          y: {
            grid: {
              color: "rgba(26, 42, 26, 0.4)",
            },
            ticks: {
              color: "#6b7280",
              font: {
                family: "'Inter', sans-serif",
                size: 10,
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[220px]">
      <canvas ref={chartRef} />
    </div>
  );
}
