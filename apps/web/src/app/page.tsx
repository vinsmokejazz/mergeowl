"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { MockupSection } from "@/components/landing/MockupSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { CtaSection } from "@/components/landing/CtaSection";

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            // Do not unobserve if we want them to animate repeatedly,
            // but unobserving once visible is standard for smooth entrance.
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before the section fully enters
      }
    );

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[var(--g)] min-h-screen overflow-x-hidden">
      {/* Navbar starts visible or fades in quickly */}
      <div style={{ animation: "fadeIn 0.6s ease-out both" }}>
        <Navbar />
      </div>

      {/* Hero section loads immediately */}
      <div style={{ animation: "fadeIn 0.8s ease-out 0.1s both" }}>
        <HeroSection />
      </div>

      <div className="scroll-reveal">
        <MockupSection />
      </div>

      <div className="scroll-reveal">
        <FeaturesSection />
      </div>

      <div className="h-[1px] bg-[var(--border)] mx-[40px]" />

      <div className="scroll-reveal">
        <DashboardPreview />
      </div>

      <div className="scroll-reveal">
        <CtaSection />
      </div>
    </div>
  );
}
