"use client";

import { useState } from "react";
import { ExternalLink, MessageCircle } from "lucide-react";
import { GitHubIcon } from "@/components/ui/GitHubIcon";

const docs: Record<string, React.ReactNode> = {
  intro: (
    <>
      <div className="font-[family-name:var(--font-display)] text-[26px] text-[var(--t1)] mb-[8px]">Getting started</div>
      <p className="text-[13px] text-[var(--t3)] leading-[1.75] mb-[12px] font-light">
        MergeOwl is a GitHub App — install it in 60 seconds with no code changes required. It reviews every PR automatically and posts inline comments.
      </p>
      <h3 className="text-[16px] font-medium text-[var(--t1)] mt-[20px] mb-[8px]">Installation</h3>

      <div className="flex gap-[14px] mb-[18px] items-start">
        <div className="w-[26px] h-[26px] rounded-full bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.2)] flex items-center justify-center text-[11px] font-semibold text-[var(--em3)] shrink-0 mt-[1px]">1</div>
        <div>
          <div className="text-[13px] font-medium text-[var(--t1)] mb-[4px]">Install the GitHub App</div>
          <p className="text-[13px] text-[var(--t3)] leading-[1.75] font-light">
            Visit the GitHub Marketplace and click <em className="text-[var(--em3)]">Install</em>. Select the repositories you want reviewed.
          </p>
        </div>
      </div>

      <div className="flex gap-[14px] mb-[18px] items-start">
        <div className="w-[26px] h-[26px] rounded-full bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.2)] flex items-center justify-center text-[11px] font-semibold text-[var(--em3)] shrink-0 mt-[1px]">2</div>
        <div>
          <div className="text-[13px] font-medium text-[var(--t1)] mb-[4px]">Verify the webhook</div>
          <p className="text-[13px] text-[var(--t3)] leading-[1.75] mb-[6px] font-light">
            MergeOwl automatically registers a webhook on your org. Confirm it appears under Settings → Webhooks.
          </p>
          <div className="bg-[var(--g)] border border-[var(--border)] rounded-[var(--rs)] py-[14px] px-[16px] font-[family-name:var(--font-mono)] text-[12px] text-[#86efac]">
            {"POST https://hooks.mergeowl.dev/{your-org}/webhook"}
          </div>
        </div>
      </div>

      <div className="flex gap-[14px] mb-[18px] items-start">
        <div className="w-[26px] h-[26px] rounded-full bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.2)] flex items-center justify-center text-[11px] font-semibold text-[var(--em3)] shrink-0 mt-[1px]">3</div>
        <div>
          <div className="text-[13px] font-medium text-[var(--t1)] mb-[4px]">Open a pull request</div>
          <p className="text-[13px] text-[var(--t3)] leading-[1.75] font-light">
            Push a branch and open a PR. MergeOwl will comment within 60 seconds.
          </p>
        </div>
      </div>

      <h3 className="text-[16px] font-medium text-[var(--t1)] mt-[20px] mb-[8px]">Optional config file</h3>
      <div className="bg-[var(--g)] border border-[var(--border)] rounded-[var(--rs)] py-[14px] px-[16px] font-[family-name:var(--font-mono)] text-[12px] text-[#86efac] whitespace-pre-line">
{`# .mergeowl.yml
severity_threshold: warning
security_scan: true
block_merge_on: error
ignore_paths:
  - "**/*.test.ts"
  - "docs/**"`}
      </div>
    </>
  ),
  config: (
    <>
      <div className="font-[family-name:var(--font-display)] text-[26px] text-[var(--t1)] mb-[8px]">Configuration</div>
      <p className="text-[13px] text-[var(--t3)] leading-[1.75] mb-[12px] font-light">
        Drop a <code className="font-[family-name:var(--font-mono)] text-[11px] bg-[rgba(34,197,94,0.06)] py-[1px] px-[5px] rounded-[3px]">.mergeowl.yml</code> file in your repository root to customise review behaviour.
      </p>
      <h3 className="text-[16px] font-medium text-[var(--t1)] mt-[20px] mb-[8px]">Full config reference</h3>
      <div className="bg-[var(--g)] border border-[var(--border)] rounded-[var(--rs)] py-[14px] px-[16px] font-[family-name:var(--font-mono)] text-[12px] text-[#86efac] whitespace-pre-line mb-[12px]">
{`# .mergeowl.yml
severity_threshold: warning   # info | warning | error
security_scan: true
block_merge_on: error         # warning | error | never
languages: [typescript, python, go]
ignore_paths:
  - "**/*.test.ts"
  - "migrations/**"
  - "docs/**"
comment_style: inline         # inline | summary
max_comments_per_pr: 20`}
      </div>
      <p className="text-[13px] text-[var(--t3)] leading-[1.75] font-light">
        All config fields are optional. Defaults are applied when a field is omitted.
      </p>
    </>
  ),
  api: (
    <>
      <div className="font-[family-name:var(--font-display)] text-[26px] text-[var(--t1)] mb-[8px]">API reference</div>
      <p className="text-[13px] text-[var(--t3)] leading-[1.75] mb-[12px] font-light">
        The MergeOwl REST API lets you query review history, trigger re-reviews, and manage repositories programmatically.
      </p>
      <h3 className="text-[16px] font-medium text-[var(--t1)] mt-[20px] mb-[8px]">Authentication</h3>
      <div className="bg-[var(--g)] border border-[var(--border)] rounded-[var(--rs)] py-[14px] px-[16px] font-[family-name:var(--font-mono)] text-[12px] text-[#86efac] mb-[12px]">
        Authorization: Bearer mo_live_xxxxxxxxxxxxxxxx
      </div>
      <h3 className="text-[16px] font-medium text-[var(--t1)] mt-[20px] mb-[8px]">List reviews</h3>
      <div className="bg-[var(--g)] border border-[var(--border)] rounded-[var(--rs)] py-[14px] px-[16px] font-[family-name:var(--font-mono)] text-[12px] text-[#86efac] mb-[12px]">
        {"GET /v1/reviews?repo=acme/api&limit=50"}
      </div>
      <h3 className="text-[16px] font-medium text-[var(--t1)] mt-[20px] mb-[8px]">Trigger re-review</h3>
      <div className="bg-[var(--g)] border border-[var(--border)] rounded-[var(--rs)] py-[14px] px-[16px] font-[family-name:var(--font-mono)] text-[12px] text-[#86efac] whitespace-pre-line">
{`POST /v1/reviews/trigger
{ "pr_number": 347, "repo": "acme/api" }`}
      </div>
    </>
  ),
  ci: (
    <>
      <div className="font-[family-name:var(--font-display)] text-[26px] text-[var(--t1)] mb-[8px]">CI / CD integration</div>
      <p className="text-[13px] text-[var(--t3)] leading-[1.75] mb-[12px] font-light">
        Block merges in GitHub Actions until MergeOwl clears all errors.
      </p>
      <h3 className="text-[16px] font-medium text-[var(--t1)] mt-[20px] mb-[8px]">GitHub Actions example</h3>
      <div className="bg-[var(--g)] border border-[var(--border)] rounded-[var(--rs)] py-[14px] px-[16px] font-[family-name:var(--font-mono)] text-[12px] text-[#86efac] whitespace-pre-line">
{`- name: Wait for MergeOwl
  uses: mergeowl/await-action@v1
  with:
    token: \${{ secrets.GITHUB_TOKEN }}
    block_on: error
    timeout_minutes: 5`}
      </div>
    </>
  ),
  faq: (
    <>
      <div className="font-[family-name:var(--font-display)] text-[26px] text-[var(--t1)] mb-[8px]">FAQ</div>
      <h3 className="text-[16px] font-medium text-[var(--t1)] mt-[20px] mb-[8px]">Does MergeOwl store my code?</h3>
      <p className="text-[13px] text-[var(--t3)] leading-[1.75] mb-[12px] font-light">
        No. Code is streamed through our review pipeline and never persisted to disk. Only metadata (repo name, PR number, comment content) is stored.
      </p>
      <h3 className="text-[16px] font-medium text-[var(--t1)] mt-[20px] mb-[8px]">Which languages are supported?</h3>
      <p className="text-[13px] text-[var(--t3)] leading-[1.75] mb-[12px] font-light">
        TypeScript, JavaScript, Python, Go, Rust, Ruby, Java, C#, PHP, Swift, Kotlin, and Terraform. More added monthly.
      </p>
      <h3 className="text-[16px] font-medium text-[var(--t1)] mt-[20px] mb-[8px]">Can I customise the AI model?</h3>
      <p className="text-[13px] text-[var(--t3)] leading-[1.75] font-light">
        Enterprise plans support custom model fine-tuning on your codebase. Contact sales for details.
      </p>
    </>
  ),
};

const navItems = [
  { key: "intro", label: "Getting started" },
  { key: "config", label: "Configuration" },
  { key: "api", label: "API reference" },
  { key: "ci", label: "CI / CD integration" },
  { key: "faq", label: "FAQ" },
];

export default function DocsPage() {
  const [active, setActive] = useState("intro");

  return (
    <div className="flex flex-col md:grid md:grid-cols-[240px_1fr] gap-[14px] items-start">
      {/* Sidebar */}
      <div>
        <div className="text-[12px] text-[var(--t4)] font-medium tracking-[0.04em] uppercase mb-[10px]">Documentation</div>
        <div className="flex flex-col gap-[2px] mb-[20px]">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`py-[7px] px-[12px] rounded-[var(--rs)] text-[13px] text-left cursor-pointer transition-all duration-150 border-none ${
                active === item.key
                  ? "bg-[rgba(34,197,94,0.08)] text-[var(--em3)]"
                  : "text-[var(--t4)] bg-transparent hover:bg-[rgba(34,197,94,0.08)] hover:text-[var(--em3)]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Quick links */}
        <div className="bg-[rgba(34,197,94,0.05)] border border-[rgba(34,197,94,0.15)] rounded-[var(--r)] py-[14px] px-[16px]">
          <div className="text-[11px] text-[var(--t4)] mb-[8px] font-medium uppercase tracking-[0.04em]">Quick links</div>
          <div className="flex flex-col gap-[6px]">
            <div className="text-[12px] text-[var(--em3)] cursor-pointer flex items-center gap-[5px]">
              <GitHubIcon size={13} /> GitHub App install page
            </div>
            <div className="text-[12px] text-[var(--em3)] cursor-pointer flex items-center gap-[5px]">
              <ExternalLink size={13} /> API playground
            </div>
            <div className="text-[12px] text-[var(--em3)] cursor-pointer flex items-center gap-[5px]">
              <MessageCircle size={13} /> Join Discord community
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] py-[24px] px-[24px] animate-[fadeIn_0.3s_ease]" key={active}>
        {docs[active]}
      </div>
    </div>
  );
}
