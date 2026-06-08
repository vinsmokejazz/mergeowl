"use client";

import { useState } from "react";

type TabId = "getting-started" | "configuration" | "api-reference" | "ci-cd" | "faq";

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("getting-started");

  const menuItems: { id: TabId; label: string }[] = [
    { id: "getting-started", label: "Getting started" },
    { id: "configuration", label: "Configuration" },
    { id: "api-reference", label: "API reference" },
    { id: "ci-cd", label: "CI / CD integration" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <div className="page-section" style={{ animation: "fadeIn 0.3s ease both" }}>
      <div className="grid grid-cols-[260px_1fr] gap-[30px] items-start">
        {/* Left Column: Navigation */}
        <div className="flex flex-col gap-[20px]">
          <div>
            <div className="text-[11px] text-[var(--t5)] font-semibold tracking-[.08em] uppercase mb-[12px] px-[12px]">
              Documentation
            </div>
            <nav className="flex flex-col gap-[4px]">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id || (activeTab === "getting-started" && item.id === "configuration"); // Styling both active-looking as in the user's design reference
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`text-left text-[13px] py-[8px] px-[12px] w-full rounded-[var(--rs)] transition-all duration-150 border cursor-pointer ${
                      isActive
                        ? "text-[var(--em3)] bg-[rgba(34,197,94,0.02)] border-[rgba(34,197,94,0.12)] hover:bg-[rgba(34,197,94,0.04)]"
                        : "text-[var(--t4)] border-transparent bg-transparent hover:text-[var(--t2)] hover:bg-[rgba(255,255,255,0.01)]"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Links Card */}
          <div className="bg-[rgba(17,28,17,0.4)] border border-[rgba(34,197,94,0.08)] rounded-[var(--r)] p-[18px_20px]">
            <div className="text-[10px] text-[var(--t5)] font-semibold tracking-[.08em] uppercase mb-[14px]">
              Quick Links
            </div>
            <div className="flex flex-col gap-[12px]">
              <a
                href="#"
                className="text-[12px] text-[var(--em3)] hover:text-[var(--em4)] transition-colors no-underline flex items-center gap-[6px]"
              >
                GitHub App install page
              </a>
              <a
                href="#"
                className="text-[12px] text-[var(--em3)] hover:text-[var(--em4)] transition-colors no-underline flex items-center gap-[6px]"
              >
                API playground
              </a>
              <a
                href="#"
                className="text-[12px] text-[var(--em3)] hover:text-[var(--em4)] transition-colors no-underline flex items-center gap-[6px]"
              >
                Join Discord community
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="bg-[#0b120b] border border-[rgba(34,197,94,0.1)] rounded-[var(--rl)] p-[32px_36px] min-h-[500px]">
          {activeTab === "getting-started" && (
            <div style={{ animation: "fadeIn 0.2s ease both" }}>
              <h1 className="font-[family-name:var(--font-d)] text-[34px] font-normal text-[var(--t1)] mb-[16px] leading-tight">
                Getting started
              </h1>
              <p className="text-[13px] text-[var(--t3)] leading-[1.7] mb-[28px] font-light">
                MergeOwl is a GitHub App — install it in 60 seconds with no code changes required. It reviews every PR
                automatically and posts inline comments.
              </p>

              <h2 className="text-[15px] font-semibold text-[var(--t1)] mb-[18px] tracking-wide">
                Installation
              </h2>

              <div className="flex flex-col gap-[22px] mb-[32px]">
                {/* Step 1 */}
                <div className="flex gap-[16px]">
                  <div className="flex-shrink-0 w-[22px] h-[22px] rounded-full bg-[rgba(34,197,94,0.06)] border border-[rgba(34,197,94,0.2)] flex items-center justify-center text-[10px] font-semibold text-[var(--em3)]">
                    1
                  </div>
                  <div>
                    <h3 className="text-[13px] font-medium text-[var(--t2)] mb-[4px]">
                      Install the GitHub App
                    </h3>
                    <p className="text-[12px] text-[var(--t4)] leading-[1.6]">
                      Visit the GitHub Marketplace and click <span className="italic text-[var(--t3)]">Install</span>. Select the repositories you want reviewed.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-[16px]">
                  <div className="flex-shrink-0 w-[22px] h-[22px] rounded-full bg-[rgba(34,197,94,0.06)] border border-[rgba(34,197,94,0.2)] flex items-center justify-center text-[10px] font-semibold text-[var(--em3)]">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[13px] font-medium text-[var(--t2)] mb-[4px]">
                      Verify the webhook
                    </h3>
                    <p className="text-[12px] text-[var(--t4)] leading-[1.6] mb-[10px]">
                      MergeOwl automatically registers a webhook on your org. Confirm it appears under Settings &rarr; Webhooks.
                    </p>
                    <div className="bg-[#050805] border border-[var(--border)] rounded-[var(--rs)] p-[10px_14px] font-[family-name:var(--font-m)] text-[11px] text-[var(--em3)] overflow-x-auto">
                      POST https://hooks.mergeowl.dev/{"{your-org}"}/webhook
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-[16px]">
                  <div className="flex-shrink-0 w-[22px] h-[22px] rounded-full bg-[rgba(34,197,94,0.06)] border border-[rgba(34,197,94,0.2)] flex items-center justify-center text-[10px] font-semibold text-[var(--em3)]">
                    3
                  </div>
                  <div>
                    <h3 className="text-[13px] font-medium text-[var(--t2)] mb-[4px]">
                      Open a pull request
                    </h3>
                    <p className="text-[12px] text-[var(--t4)] leading-[1.6]">
                      Push a branch and open a PR. MergeOwl will comment within 60 seconds.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-[15px] font-semibold text-[var(--t1)] mb-[18px] tracking-wide">
                Optional config file
              </h2>

              <div className="bg-[#050805] border border-[var(--border)] rounded-[var(--r)] p-[16px_20px] font-[family-name:var(--font-m)] text-[11px] text-[#86efac] leading-[1.7] overflow-x-auto">
                <div className="text-[var(--t5)]"># .mergeowl.yml</div>
                <div>severity_threshold: <span className="text-[var(--em3)]">warning</span></div>
                <div>security_scan: <span className="text-[var(--em3)]">true</span></div>
                <div>block_merge_on: <span className="text-[var(--em3)]">error</span></div>
                <div>ignore_paths:</div>
                <div className="pl-[12px]">- <span className="text-[#fbbf24]">&quot;**/*.test.ts&quot;</span></div>
                <div className="pl-[12px]">- <span className="text-[#fbbf24]">&quot;docs/**&quot;</span></div>
              </div>
            </div>
          )}

          {activeTab === "configuration" && (
            <div style={{ animation: "fadeIn 0.2s ease both" }}>
              <h1 className="font-[family-name:var(--font-d)] text-[34px] font-normal text-[var(--t1)] mb-[16px] leading-tight">
                Configuration
              </h1>
              <p className="text-[13px] text-[var(--t3)] leading-[1.7] mb-[28px] font-light">
                Fine-tune your code reviews using a <code className="bg-[rgba(34,197,94,0.08)] px-[5px] py-[1px] rounded-[3px] font-[family-name:var(--font-m)] text-[11px]">.mergeowl.yml</code> file placed at the root of your project.
              </p>
              
              <div className="flex flex-col gap-[20px]">
                <div>
                  <h3 className="text-[13px] font-semibold text-[var(--t2)] mb-[4px]">severity_threshold</h3>
                  <p className="text-[12px] text-[var(--t4)] leading-[1.6]">
                    Set the minimum issue severity to report. Values: <code className="text-[var(--em3)] font-[family-name:var(--font-m)]">info</code>, <code className="text-[var(--em3)] font-[family-name:var(--font-m)]">warning</code>, <code className="text-[var(--em3)] font-[family-name:var(--font-m)]">error</code>.
                  </p>
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-[var(--t2)] mb-[4px]">security_scan</h3>
                  <p className="text-[12px] text-[var(--t4)] leading-[1.6]">
                    Enable or disable OWASP Top 10 security audits and secret detection. Defaults to <code className="text-[var(--em3)] font-[family-name:var(--font-m)]">true</code>.
                  </p>
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-[var(--t2)] mb-[4px]">block_merge_on</h3>
                  <p className="text-[12px] text-[var(--t4)] leading-[1.6]">
                    Specify the severity level that triggers blocking status checks on pull requests.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "api-reference" && (
            <div style={{ animation: "fadeIn 0.2s ease both" }}>
              <h1 className="font-[family-name:var(--font-d)] text-[34px] font-normal text-[var(--t1)] mb-[16px] leading-tight">
                API Reference
              </h1>
              <p className="text-[13px] text-[var(--t3)] leading-[1.7] mb-[28px] font-light">
                Integrate MergeOwl reviews directly into your internal tooling or custom dashboards using the REST API.
              </p>
              
              <div className="border border-[var(--border)] rounded-[var(--r)] overflow-hidden">
                <div className="bg-[#050805] p-[12px_16px] border-b border-[var(--border)] flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[var(--em3)] bg-[rgba(34,197,94,0.1)] px-[6px] py-[2px] rounded-[4px]">POST</span>
                  <code className="text-[12px] text-[var(--t2)] font-[family-name:var(--font-m)]">/api/v1/reviews/trigger</code>
                </div>
                <div className="p-[16px] text-[12px] text-[var(--t4)] leading-[1.6]">
                  Trigger a manual AI code review for a specified commit hash or pull request branch.
                </div>
              </div>
            </div>
          )}

          {activeTab === "ci-cd" && (
            <div style={{ animation: "fadeIn 0.2s ease both" }}>
              <h1 className="font-[family-name:var(--font-d)] text-[34px] font-normal text-[var(--t1)] mb-[16px] leading-tight">
                CI / CD Integration
              </h1>
              <p className="text-[13px] text-[var(--t3)] leading-[1.7] mb-[28px] font-light">
                Run MergeOwl security scans as part of your existing CI/CD pipelines.
              </p>
              <p className="text-[12px] text-[var(--t4)] leading-[1.6]">
                Configure GitHub Actions, GitLab CI, or Jenkins to trigger security validation checks automatically on every code push.
              </p>
            </div>
          )}

          {activeTab === "faq" && (
            <div style={{ animation: "fadeIn 0.2s ease both" }}>
              <h1 className="font-[family-name:var(--font-d)] text-[34px] font-normal text-[var(--t1)] mb-[16px] leading-tight">
                Frequently Asked Questions
              </h1>
              
              <div className="flex flex-col gap-[24px] mt-[16px]">
                <div>
                  <h3 className="text-[13px] font-semibold text-[var(--t2)] mb-[6px]">Does MergeOwl store my code?</h3>
                  <p className="text-[12px] text-[var(--t4)] leading-[1.6]">
                    No. All repositories are analyzed in-memory. Reviews are performed statelessly, and we do not persist your codebase or proprietary intellectual property.
                  </p>
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-[var(--t2)] mb-[6px]">What programming languages are supported?</h3>
                  <p className="text-[12px] text-[var(--t4)] leading-[1.6]">
                    MergeOwl supports TypeScript, JavaScript, Python, Go, Rust, Java, C#, and Ruby out of the box.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
