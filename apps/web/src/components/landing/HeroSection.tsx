"use client";

import { motion } from "framer-motion";
import { BlueprintCanvas } from "./BlueprintCanvas";
import { AnimatedCounter } from "./AnimatedCounter";
import { Play } from "lucide-react";
import { GitHubIcon } from "@/components/ui/GitHubIcon";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function HeroSection() {
  return (
    <div className="py-[60px] md:py-[110px] px-[20px] md:px-[40px] text-center relative overflow-hidden min-h-[500px] md:min-h-[700px] flex flex-col items-center justify-center">
      <BlueprintCanvas />

      {/* Vignette */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(7,12,7,0.65) 70%, rgba(7,12,7,0.95) 100%)",
      }} />

      {/* Top glow */}
      <div className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none z-[1]" style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.07) 0%, transparent 70%)",
      }} />

      <motion.div
        className="relative z-[2]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-[8px] bg-[rgba(34,197,94,0.07)] border border-[rgba(34,197,94,0.18)] rounded-full py-[7px] px-[16px] text-[11px] font-medium text-[var(--em3)] mb-[36px] tracking-[0.06em] uppercase">
          <span className="w-[6px] h-[6px] rounded-full bg-[var(--em)] animate-[bpulse_2s_infinite]" />
          Now reviewing your PRs in seconds
        </motion.div>

        {/* Heading */}
        <motion.h1 variants={itemVariants} className="font-[family-name:var(--font-display)] text-[48px] sm:text-[60px] md:text-[76px] font-normal leading-[1.05] md:leading-[1.03] text-[var(--t1)] max-w-[820px] mx-auto mb-[16px] tracking-[-0.025em]">
          Code review done<br />by those who <em className="italic text-[var(--em)]">never sleep.</em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={itemVariants} className="text-[16px] md:text-[18px] text-[rgba(107,114,128,0.9)] max-w-[500px] mx-auto mb-[32px] md:mb-[48px] leading-[1.6] md:leading-[1.7] font-light px-[10px] md:px-0">
          MergeOwl watches every pull request. Catches bugs, enforces standards, and posts inline comments — before your team even opens the diff.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-[14px] justify-center items-center w-full sm:w-auto px-[20px] sm:px-0">
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-[10px] bg-[var(--em)] text-[#022c0a] text-[15px] font-semibold py-[14px] px-[28px] rounded-[var(--radius)] border-none cursor-pointer relative overflow-hidden transition-all duration-250 hover:bg-[var(--em3)] hover:-translate-y-[2px] after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)] after:translate-x-[-100%] after:animate-[shimmer_2.8s_infinite]">
            <GitHubIcon size={17} />
            Install free on GitHub
          </button>
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-[8px] bg-transparent text-[var(--t2)] text-[15px] font-normal py-[14px] px-[24px] rounded-[var(--radius)] border border-[var(--border2)] cursor-pointer transition-all duration-200 hover:border-[var(--em2)] hover:text-[var(--t1)]">
            <Play size={15} />
            Watch it work
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-[32px] sm:gap-[48px] justify-center mt-[48px] md:mt-[64px] pt-[32px] md:pt-[48px] border-t border-[rgba(31,45,31,0.6)] w-full sm:w-auto">
          <div className="text-center">
            <div className="font-[family-name:var(--font-display)] text-[32px] md:text-[36px] text-[var(--t1)]">
              <AnimatedCounter target={847} duration={1800} suffix="K+" />
            </div>
            <div className="text-[11px] text-[var(--t4)] mt-[5px] tracking-[0.07em] uppercase font-medium">PRs reviewed</div>
          </div>
          <div className="text-center">
            <div className="font-[family-name:var(--font-display)] text-[32px] md:text-[36px] text-[var(--t1)]">
              <AnimatedCounter target={3200} duration={2000} suffix="+" />
            </div>
            <div className="text-[11px] text-[var(--t4)] mt-[5px] tracking-[0.07em] uppercase font-medium">teams using it</div>
          </div>
          <div className="text-center">
            <div className="font-[family-name:var(--font-display)] text-[32px] md:text-[36px] text-[var(--t1)]">
              <AnimatedCounter target={58} duration={1400} suffix="ms" />
            </div>
            <div className="text-[11px] text-[var(--t4)] mt-[5px] tracking-[0.07em] uppercase font-medium">avg. first comment</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
