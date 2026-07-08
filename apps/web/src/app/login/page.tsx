"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[var(--g)] flex items-center justify-center p-4">
      <div className="w-full max-w-[420px]">
        {/* Logo and branding */}
        <div className="flex flex-col items-center mb-8">
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="mb-4">
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

          <h1 className="font-[family-name:var(--font-d)] text-[32px] text-[var(--t1)] mb-2">
            MergeOwl
          </h1>

          <p className="text-[14px] text-[var(--t4)] text-center">
            AI-powered code reviews for your team
          </p>
        </div>

        {/* Login card */}
        <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] p-8">
          <h2 className="text-[18px] font-medium text-[var(--t1)] mb-2">
            Sign in to continue
          </h2>

          <p className="text-[13px] text-[var(--t4)] mb-6">
            Connect your GitHub account to access your dashboard
          </p>

          <button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="w-full inline-flex items-center justify-center gap-3 text-[14px] font-[family-name:var(--font-b)] p-[12px_20px] rounded-[var(--rs)] border border-[rgba(34,197,94,0.25)] bg-[rgba(34,197,94,0.1)] text-[var(--em3)] cursor-pointer transition-all duration-[180ms] hover:border-[rgba(34,197,94,0.4)] hover:bg-[rgba(34,197,94,0.15)] hover:text-[var(--em4)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Sign in with GitHub
          </button>

          <p className="text-[11px] text-[var(--t5)] text-center mt-6">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        {/* Footer info */}
        <div className="text-center mt-6">
          <p className="text-[12px] text-[var(--t5)]">
            Don't have a GitHub account?{" "}
            <a
              href="https://github.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--em3)] hover:text-[var(--em4)] transition-colors"
            >
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
