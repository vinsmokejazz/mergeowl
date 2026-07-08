"use client";

export function MockupSection() {
  return (
    <div className="px-[40px] pb-[80px] max-w-[900px] mx-auto">
      <div className="text-center text-[11px] text-[var(--t4)] tracking-[0.1em] uppercase font-medium mb-[24px]">
        Live inline review — as it happens
      </div>

      <div className="bg-[var(--g2)] border border-[var(--border)] rounded-[var(--r)] overflow-hidden">
        {/* Browser bar */}
        <div className="bg-[var(--g3)] px-[16px] py-[12px] flex items-center gap-[8px] border-b border-[var(--border)]">
          <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f56]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#27c93f]" />
          <span className="font-[family-name:var(--font-m)] text-[11px] text-[var(--t4)] ml-[8px]">
            github.com / acme / api / pull / 347
          </span>
        </div>

        {/* PR content */}
        <div className="p-[24px]">
          {/* PR header */}
          <div className="flex items-start gap-[12px] mb-[20px]">
            <div className="font-[family-name:var(--font-m)] text-[11px] text-[var(--em)] bg-[rgba(34,197,94,0.1)] px-[8px] py-[3px] rounded-[4px] border border-[rgba(34,197,94,0.2)] whitespace-nowrap mt-[3px]">
              PR #347
            </div>
            <div>
              <div className="text-[15px] font-medium text-[var(--t1)] leading-[1.4]">
                refactor: migrate auth service to JWT rotation
              </div>
              <div className="text-[12px] text-[var(--t4)] mt-[3px]">
                opened by <span className="text-[var(--t2)]">@sarah_dev</span> · 14 files changed · 2h ago
              </div>
            </div>
          </div>

          {/* Code block */}
          <div className="bg-[var(--g)] border border-[var(--border)] rounded-[var(--rs)] font-[family-name:var(--font-m)] text-[12px] overflow-hidden mb-[12px]">
            <div className="flex gap-[16px] px-[16px] py-[3px] leading-[1.7]">
              <span className="text-[var(--t5)] min-w-[24px] text-right select-none">41</span>
              <span className="text-[#a5f3c0]">
                <span className="text-[#c084fc]">const</span> token = <span className="text-[#60a5fa]">sign</span>(payload, process.env.SECRET)
              </span>
            </div>
            <div className="flex gap-[16px] px-[16px] py-[3px] leading-[1.7] bg-[rgba(239,68,68,0.08)] border-l-2 border-[var(--red)]">
              <span className="text-[var(--t5)] min-w-[24px] text-right select-none">42</span>
              <span className="text-[#a5f3c0]">
                <span className="text-[#c084fc]">const</span> expires = <span className="text-[#fbbf24]">'never'</span> <span className="text-[#4b5563]">// TODO: fix later</span>
              </span>
            </div>
            <div className="flex gap-[16px] px-[16px] py-[3px] leading-[1.7]">
              <span className="text-[var(--t5)] min-w-[24px] text-right select-none">43</span>
              <span className="text-[#a5f3c0]">
                <span className="text-[#60a5fa]">res</span>.cookie(<span className="text-[#fbbf24]">'auth'</span>, token, {"{ expires }"})
              </span>
            </div>
          </div>

          {/* Comments - with staggered animation */}
          <div className="space-y-[8px]">
            {[
              {
                type: "error",
                badge: "Error",
                file: "src/auth/tokenService.ts · line 42",
                body: (
                  <>
                    Token expiry set to <code className="bg-[rgba(239,68,68,0.1)] px-[5px] py-[1px] rounded-[3px] text-[11px] font-[family-name:var(--font-m)]">'never'</code> — permanent session token. Use <code className="bg-[rgba(34,197,94,0.08)] px-[5px] py-[1px] rounded-[3px] text-[11px] font-[family-name:var(--font-m)]">expiresIn: '15m'</code> with refresh rotation.
                  </>
                ),
                delay: "1s"
              },
              {
                type: "warning",
                badge: "Warning",
                file: "src/auth/tokenService.ts · line 41",
                body: (
                  <>
                    Signing secret read without validation. Add startup assertion: <code className="bg-[rgba(245,158,11,0.08)] px-[5px] py-[1px] rounded-[3px] text-[11px] font-[family-name:var(--font-m)]">if (!process.env.SECRET) throw new Error(...)</code>
                  </>
                ),
                delay: "1.7s"
              },
              {
                type: "suggestion",
                badge: "Suggestion",
                file: "src/auth/tokenService.ts · line 43",
                body: (
                  <>
                    Add <code className="bg-[rgba(34,197,94,0.06)] px-[5px] py-[1px] rounded-[3px] text-[11px] font-[family-name:var(--font-m)]">httpOnly: true, secure: true, sameSite: 'strict'</code> to harden against XSS.
                  </>
                ),
                delay: "2.4s"
              }
            ].map((comment, i) => (
              <div
                key={i}
                className="bg-[rgba(34,197,94,0.04)] border border-[rgba(34,197,94,0.1)] rounded-[var(--rs)] px-[16px] py-[14px] opacity-0 animate-[slideIn_0.5s_ease_forwards]"
                style={{ animationDelay: comment.delay }}
              >
                <div className="flex items-center gap-[8px] mb-[8px]">
                  <span className={`inline-flex items-center gap-[4px] text-[10px] font-semibold px-[9px] py-[3px] rounded-[4px] tracking-[0.05em] uppercase ${
                    comment.type === "error" ? "bg-[rgba(239,68,68,0.12)] text-[#fca5a5] border border-[rgba(239,68,68,0.2)]" :
                    comment.type === "warning" ? "bg-[rgba(245,158,11,0.12)] text-[#fcd34d] border border-[rgba(245,158,11,0.2)]" :
                    "bg-[rgba(34,197,94,0.1)] text-[#86efac] border border-[rgba(34,197,94,0.15)]"
                  }`}>
                    {comment.badge}
                  </span>
                  <span className="font-[family-name:var(--font-m)] text-[11px] text-[var(--t4)]">
                    {comment.file}
                  </span>
                </div>
                <div className="text-[13px] text-[var(--t3)] leading-[1.6]">
                  {comment.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
