"use client";

import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

export function ActivityChart() {
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
            type: "bar",
            data: {
                labels: ["M", "T", "W", "T", "F", "S", "S"],
                datasets: [
                    {
                        label: "Commits",
                        data: [12, 19, 3, 5, 2, 3, 9],
                        backgroundColor: "#a855f7",
                        borderRadius: 4,
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
                            display: false,
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
                        display: false,
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
        <div className="relative w-full h-[180px]">
            <canvas ref={chartRef} />
        </div>
    );
}