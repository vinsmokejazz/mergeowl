"use client";

export default function SettingsPage() {
  return (
    <div className="page-section" style={{ animation: "fadeIn 0.3s ease both" }}>
      <div className="grid grid-cols-2 gap-[14px] items-start">
        <div>
          <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] p-[18px_20px] mb-[14px]">
            <div className="text-[12px] text-[var(--t4)] font-medium tracking-[.04em] uppercase mb-[14px]">GENERAL</div>
            
            <div className="mb-[16px]">
              <div className="text-[12px] text-[var(--t4)] font-medium mb-[5px]">Organization name</div>
              <input 
                className="bg-[var(--g4)] border border-[var(--border2)] rounded-[var(--rs)] p-[8px_12px] text-[13px] text-[var(--t1)] font-[family-name:var(--font-b)] w-full box-border outline-none transition-colors duration-180 focus:border-[var(--em2)] placeholder-[var(--t5)]" 
                defaultValue="Acme Engineering" 
              />
            </div>
            
            <div className="mb-[16px]">
              <div className="text-[12px] text-[var(--t4)] font-medium mb-[5px]">Default branch</div>
              <input 
                className="bg-[var(--g4)] border border-[var(--border2)] rounded-[var(--rs)] p-[8px_12px] text-[13px] text-[var(--t1)] font-[family-name:var(--font-b)] w-full box-border outline-none transition-colors duration-180 focus:border-[var(--em2)] placeholder-[var(--t5)]" 
                defaultValue="main" 
              />
            </div>
            
            <div className="mb-[16px]">
              <div className="text-[12px] text-[var(--t4)] font-medium mb-[5px]">Webhook URL</div>
              <input 
                className="bg-[var(--g4)] border border-[var(--border2)] rounded-[var(--rs)] p-[8px_12px] text-[13px] text-[var(--t1)] font-[family-name:var(--font-b)] w-full box-border outline-none transition-colors duration-180 focus:border-[var(--em2)] placeholder-[var(--t5)]" 
                defaultValue="https://hooks.mergeowl.dev/acme/xyz" 
              />
            </div>
            
            <button className="inline-flex items-center gap-[6px] text-[12px] font-[family-name:var(--font-b)] p-[7px_13px] rounded-[var(--rs)] border border-[rgba(34,197,94,0.25)] bg-[rgba(34,197,94,0.1)] text-[var(--em3)] cursor-pointer transition-all duration-[180ms] hover:border-[rgba(34,197,94,0.18)] hover:bg-[rgba(34,197,94,0.18)] hover:text-[var(--em4)] mt-[4px]">
              Save changes
            </button>
          </div>

          <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] p-[18px_20px]">
            <div className="text-[12px] text-[var(--t4)] font-medium tracking-[.04em] uppercase mb-[4px]">NOTIFICATIONS</div>
            
            <div className="flex items-center justify-between py-[14px] border-b border-[var(--border)]">
              <div>
                <h4 className="text-[13px] font-medium text-[var(--t1)] m-0">Email digest</h4>
                <p className="text-[11px] text-[var(--t4)] mt-[2px] m-0">Daily summary of all reviews</p>
              </div>
              <label aria-label="Toggle Email digest" className="relative w-[36px] h-[20px] shrink-0 cursor-pointer">
                <input type="checkbox" className="peer sr-only" defaultChecked />
                <div className="absolute inset-0 bg-[var(--border3)] peer-checked:bg-[var(--em2)] rounded-[10px] transition-colors duration-200"></div>
                <div className="absolute w-[14px] h-[14px] left-[3px] top-[3px] bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-[16px]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between py-[14px] border-b border-[var(--border)]">
              <div>
                <h4 className="text-[13px] font-medium text-[var(--t1)] m-0">Slack alerts</h4>
                <p className="text-[11px] text-[var(--t4)] mt-[2px] m-0">Post to #code-review on error</p>
              </div>
              <label aria-label="Toggle Slack alerts" className="relative w-[36px] h-[20px] shrink-0 cursor-pointer">
                <input type="checkbox" className="peer sr-only" defaultChecked />
                <div className="absolute inset-0 bg-[var(--border3)] peer-checked:bg-[var(--em2)] rounded-[10px] transition-colors duration-200"></div>
                <div className="absolute w-[14px] h-[14px] left-[3px] top-[3px] bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-[16px]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between py-[14px]">
              <div>
                <h4 className="text-[13px] font-medium text-[var(--t1)] m-0">PR comment auto-resolve</h4>
                <p className="text-[11px] text-[var(--t4)] mt-[2px] m-0">Collapse fixed comments automatically</p>
              </div>
              <label aria-label="Toggle PR comment auto-resolve" className="relative w-[36px] h-[20px] shrink-0 cursor-pointer">
                <input type="checkbox" className="peer sr-only" />
                <div className="absolute inset-0 bg-[var(--border3)] peer-checked:bg-[var(--em2)] rounded-[10px] transition-colors duration-200"></div>
                <div className="absolute w-[14px] h-[14px] left-[3px] top-[3px] bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-[16px]"></div>
              </label>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] p-[18px_20px] mb-[14px]">
            <div className="text-[12px] text-[var(--t4)] font-medium tracking-[.04em] uppercase mb-[4px]">REVIEW BEHAVIOUR</div>
            
            <div className="flex items-center justify-between py-[14px] border-b border-[var(--border)]">
              <div>
                <h4 className="text-[13px] font-medium text-[var(--t1)] m-0">Review on draft PRs</h4>
                <p className="text-[11px] text-[var(--t4)] mt-[2px] m-0">Analyse drafts before review request</p>
              </div>
              <label aria-label="Toggle Review on draft PRs" className="relative w-[36px] h-[20px] shrink-0 cursor-pointer">
                <input type="checkbox" className="peer sr-only" />
                <div className="absolute inset-0 bg-[var(--border3)] peer-checked:bg-[var(--em2)] rounded-[10px] transition-colors duration-200"></div>
                <div className="absolute w-[14px] h-[14px] left-[3px] top-[3px] bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-[16px]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between py-[14px] border-b border-[var(--border)]">
              <div>
                <h4 className="text-[13px] font-medium text-[var(--t1)] m-0">Block merge on errors</h4>
                <p className="text-[11px] text-[var(--t4)] mt-[2px] m-0">Require resolution before merging</p>
              </div>
              <label aria-label="Toggle Block merge on errors" className="relative w-[36px] h-[20px] shrink-0 cursor-pointer">
                <input type="checkbox" className="peer sr-only" defaultChecked />
                <div className="absolute inset-0 bg-[var(--border3)] peer-checked:bg-[var(--em2)] rounded-[10px] transition-colors duration-200"></div>
                <div className="absolute w-[14px] h-[14px] left-[3px] top-[3px] bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-[16px]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between py-[14px] border-b border-[var(--border)]">
              <div>
                <h4 className="text-[13px] font-medium text-[var(--t1)] m-0">Security scan</h4>
                <p className="text-[11px] text-[var(--t4)] mt-[2px] m-0">OWASP top-10 detection enabled</p>
              </div>
              <label aria-label="Toggle Security scan" className="relative w-[36px] h-[20px] shrink-0 cursor-pointer">
                <input type="checkbox" className="peer sr-only" defaultChecked />
                <div className="absolute inset-0 bg-[var(--border3)] peer-checked:bg-[var(--em2)] rounded-[10px] transition-colors duration-200"></div>
                <div className="absolute w-[14px] h-[14px] left-[3px] top-[3px] bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-[16px]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between py-[14px]">
              <div>
                <h4 className="text-[13px] font-medium text-[var(--t1)] m-0">Secret detection</h4>
                <p className="text-[11px] text-[var(--t4)] mt-[2px] m-0">Flag API keys, tokens, passwords</p>
              </div>
              <label aria-label="Toggle Secret detection" className="relative w-[36px] h-[20px] shrink-0 cursor-pointer">
                <input type="checkbox" className="peer sr-only" defaultChecked />
                <div className="absolute inset-0 bg-[var(--border3)] peer-checked:bg-[var(--em2)] rounded-[10px] transition-colors duration-200"></div>
                <div className="absolute w-[14px] h-[14px] left-[3px] top-[3px] bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-[16px]"></div>
              </label>
            </div>
          </div>

          <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] p-[18px_20px]">
            <div className="text-[12px] text-[var(--red)] font-medium tracking-[.04em] uppercase mb-[8px]">DANGER ZONE</div>
            <div className="text-[12px] text-[var(--t4)] mb-[12px] leading-[1.6]">
              Deleting the organisation removes all connected repositories, review history, and team members permanently.
            </div>
            <button className="inline-flex items-center text-[12px] font-[family-name:var(--font-b)] p-[7px_13px] rounded-[var(--rs)] border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.08)] text-[#fca5a5] cursor-pointer transition-all duration-[180ms] hover:border-[rgba(239,68,68,0.35)] hover:bg-[rgba(239,68,68,0.14)] hover:text-[#f87171]">
              Delete organisation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
