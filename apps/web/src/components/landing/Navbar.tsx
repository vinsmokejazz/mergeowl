"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between px-[40px] py-[20px] border-b border-[var(--border)] bg-[rgba(7,12,7,0.92)] backdrop-blur-[16px] relative z-[100]">
      <Link href="/" className="flex items-center gap-[10px] font-[family-name:var(--font-d)] text-[22px] text-[var(--t1)] no-underline">
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="14" fill="#0b120b" stroke="#22c55e" strokeWidth="1"/>
          <ellipse cx="11.5" cy="15" rx="4" ry="5" fill="#141f14" stroke="#22c55e" strokeWidth="0.8"/>
          <ellipse cx="20.5" cy="15" rx="4" ry="5" fill="#141f14" stroke="#22c55e" strokeWidth="0.8"/>
          <circle cx="11.5" cy="15" r="2.5" fill="#22c55e" opacity="0.9"/>
          <circle cx="20.5" cy="15" r="2.5" fill="#22c55e" opacity="0.9"/>
          <circle cx="11.5" cy="15" r="1.2" fill="#070c07"/>
          <circle cx="20.5" cy="15" r="1.2" fill="#070c07"/>
          <path d="M13 21 Q16 23 19 21" stroke="#22c55e" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
          <path d="M12 9 L14 12 L16 10 L18 12 L20 9" stroke="#22c55e" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        MergeOwl
      </Link>

      <div className="flex gap-[32px]">
        <a href="#features" className="text-[14px] text-[var(--t4)] no-underline font-normal transition-colors duration-200 hover:text-[var(--t1)]">
          Features
        </a>
        <a href="#pricing" className="text-[14px] text-[var(--t4)] no-underline font-normal transition-colors duration-200 hover:text-[var(--t1)]">
          Pricing
        </a>
        <Link href="/dashboard/docs" className="text-[14px] text-[var(--t4)] no-underline font-normal transition-colors duration-200 hover:text-[var(--t1)]">
          Docs
        </Link>
        <a href="#changelog" className="text-[14px] text-[var(--t4)] no-underline font-normal transition-colors duration-200 hover:text-[var(--t1)]">
          Changelog
        </a>
      </div>

      {session ? (
        <Link
          href="/dashboard"
          className="bg-[var(--em)] text-[#022c0a] text-[13px] font-semibold px-[20px] py-[9px] rounded-[var(--rs)] border-none cursor-pointer font-[family-name:var(--font-b)] tracking-[0.02em] transition-all duration-200 hover:bg-[var(--em3)] hover:-translate-y-[1px] inline-block"
        >
          Go to Dashboard
        </Link>
      ) : (
        <Link
          href="/login"
          className="bg-[var(--em)] text-[#022c0a] text-[13px] font-semibold px-[20px] py-[9px] rounded-[var(--rs)] border-none cursor-pointer font-[family-name:var(--font-b)] tracking-[0.02em] transition-all duration-200 hover:bg-[var(--em3)] hover:-translate-y-[1px] inline-flex items-center gap-[5px]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="-translate-y-[2px]">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Install on GitHub
        </Link>
      )}
    </nav>
  );
}
