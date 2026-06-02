"use client";

import { Badge } from "@/components/ui/Badge";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InlineComment {
  id: string;
  severity: "error" | "warning" | "suggestion";
  sevLabel: string;
  file: string;
  line: number;
  codeLines: { num: number; code: React.ReactNode; flagged?: boolean }[];
  body: React.ReactNode;
}

const comments: InlineComment[] = [
  {
    id: "ic1",
    severity: "error",
    sevLabel: "Error",
    file: "src/auth/tokenService.ts",
    line: 42,
    codeLines: [
      { num: 40, code: <><span className="text-[#c084fc]">const</span> payload = {"{ userId, role }"}</> },
      { num: 41, code: <><span className="text-[#c084fc]">const</span> token = <span className="text-[#60a5fa]">sign</span>(payload, process.env.SECRET)</> },
      { num: 42, code: <><span className="text-[#c084fc]">const</span> expires = <span className="text-[#fbbf24]">&apos;never&apos;</span> <span className="text-[#4b5563]">{"// TODO: fix later"}</span></>, flagged: true },
      { num: 43, code: <><span className="text-[#60a5fa]">res</span>.cookie(<span className="text-[#fbbf24]">&apos;auth&apos;</span>, token, {"{ expires }"})</> },
    ],
    body: <>Token expiry set to <code className="font-[family-name:var(--font-mono)] text-[11px] bg-[rgba(239,68,68,0.1)] py-[1px] px-[5px] rounded-[3px]">&apos;never&apos;</code> creates permanent session tokens vulnerable to replay attacks. Use <code className="font-[family-name:var(--font-mono)] text-[11px] bg-[rgba(34,197,94,0.08)] py-[1px] px-[5px] rounded-[3px]">expiresIn: &apos;15m&apos;</code> with refresh token rotation.</>,
  },
  {
    id: "ic2",
    severity: "warning",
    sevLabel: "Warning",
    file: "src/auth/middleware.ts",
    line: 18,
    codeLines: [
      { num: 18, code: <><span className="text-[#c084fc]">const</span> token = <span className="text-[#60a5fa]">verify</span>(req.headers.authorization, process.env.SECRET)</>, flagged: true },
    ],
    body: <>No error handling around <code className="font-[family-name:var(--font-mono)] text-[11px] bg-[rgba(245,158,11,0.08)] py-[1px] px-[5px] rounded-[3px]">verify()</code> — a malformed token throws and crashes the request. Wrap in try/catch and return 401.</>,
  },
  {
    id: "ic3",
    severity: "suggestion",
    sevLabel: "Suggestion",
    file: "src/auth/tokenService.ts",
    line: 43,
    codeLines: [
      { num: 43, code: <><span className="text-[#60a5fa]">res</span>.cookie(<span className="text-[#fbbf24]">&apos;auth&apos;</span>, token, {"{ expires }"})</>, flagged: true },
    ],
    body: <>Add <code className="font-[family-name:var(--font-mono)] text-[11px] bg-[rgba(34,197,94,0.06)] py-[1px] px-[5px] rounded-[3px]">{"httpOnly: true, secure: true, sameSite: 'strict'"}</code> to harden against XSS and CSRF attacks.</>,
  },
];

function InlineCommentCard({ comment }: { comment: InlineComment }) {
  const [open, setOpen] = useState(comment.id === "ic1");

  return (
    <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] overflow-hidden mb-[10px]">
      <div
        className="flex items-center gap-[10px] py-[10px] px-[14px] cursor-pointer transition-colors duration-150 select-none hover:bg-[rgba(255,255,255,0.02)]"
        onClick={() => setOpen(!open)}
      >
        <Badge variant={comment.severity}>{comment.sevLabel}</Badge>
        <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--t4)]">{comment.file}</span>
        <span className="inline-flex items-center py-[2px] px-[8px] rounded-[4px] text-[10px] font-medium bg-[var(--g4)] border border-[var(--border2)] text-[var(--t4)]">
          line {comment.line}
        </span>
        <span className="ml-auto text-[11px] text-[var(--t4)]">{open ? "" : "Click to expand"}</span>
        <ChevronDown
          size={13}
          className={`text-[var(--t5)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="py-[12px] px-[14px] border-t border-[var(--border)]">
              {/* Code block */}
              <div className="bg-[var(--g)] border border-[var(--border)] rounded-[var(--rs)] overflow-hidden mb-[10px]">
                {comment.codeLines.map((line) => (
                  <div
                    key={line.num}
                    className={`flex gap-[14px] py-[3px] px-[14px] leading-[1.7] font-[family-name:var(--font-mono)] text-[11px] ${
                      line.flagged ? "bg-[rgba(239,68,68,0.07)] border-l-2 border-l-[var(--red)]" : ""
                    }`}
                  >
                    <span className="text-[var(--t5)] min-w-[22px] text-right">{line.num}</span>
                    <span>{line.code}</span>
                  </div>
                ))}
              </div>
              <div className="text-[12px] text-[var(--t3)] leading-[1.7]">{comment.body}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ReviewDetailPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] py-[18px] px-[20px] mb-[14px]">
        <div className="flex items-center gap-[8px] mb-[12px]">
          <Badge variant="error">2 errors</Badge>
          <Badge variant="warning">1 warning</Badge>
          <Badge variant="suggestion">2 suggestions</Badge>
          <span className="ml-auto text-[11px] text-[var(--t4)]">
            PR #347 · opened 2h ago by <span className="text-[var(--t2)]">@sarah_dev</span>
          </span>
        </div>
        <div className="font-[family-name:var(--font-display)] text-[22px] text-[var(--t1)] mb-[6px]">
          refactor: migrate auth service to JWT rotation
        </div>
        <div className="text-[12px] text-[var(--t4)]">
          acme/api · 14 files changed · +342 −89 lines
        </div>

        <div className="h-[1px] bg-[var(--border)] my-[14px]" />

        <div className="text-[12px] text-[var(--t4)] mb-[6px] font-medium tracking-[0.04em] uppercase">AI summary</div>
        <div className="text-[13px] text-[var(--t3)] leading-[1.75] font-light">
          This PR migrates the auth service to JWT. Two critical security issues detected: tokens set to never expire, and no secret validation at startup. Cookie security flags also missing. These must be resolved before merge to prevent session hijacking.
        </div>
      </div>

      {/* Inline comments */}
      {comments.map((c) => (
        <InlineCommentCard key={c.id} comment={c} />
      ))}
    </>
  );
}
