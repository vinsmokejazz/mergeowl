"use client";

import Link from "next/link";
import { OwlLogoLarge } from "@/components/OwlLogo";
import { motion } from "framer-motion";
import { GitHubIcon } from "@/components/ui/GitHubIcon";

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between py-[16px] md:py-[20px] px-[20px] md:px-[40px] border-b border-[var(--border)] bg-[rgba(7,12,7,0.92)] backdrop-blur-[16px] relative z-[100]"
    >
      <Link href="/" className="flex items-center gap-[10px] font-[family-name:var(--font-display)] text-[22px] text-[var(--t1)] no-underline">
        <OwlLogoLarge />
        MergeOwl
      </Link>

      <div className="hidden md:flex gap-[32px]">
        {["Features", "Pricing", "Docs", "Changelog"].map((label) => (
          <Link
            key={label}
            href="#"
            className="text-[14px] text-[var(--t4)] no-underline font-normal transition-colors duration-200 hover:text-[var(--t1)]"
          >
            {label}
          </Link>
        ))}
      </div>

      <Link
        href="/dashboard"
        className="inline-flex items-center gap-[5px] bg-[var(--em)] text-[#022c0a] text-[13px] font-semibold py-[9px] px-[16px] md:px-[20px] rounded-[var(--radius-sm)] no-underline tracking-[0.02em] transition-all duration-200 hover:bg-[var(--em3)] hover:-translate-y-[1px]"
      >
        <GitHubIcon size={15} />
        Install on GitHub
      </Link>
    </motion.nav>
  );
}
