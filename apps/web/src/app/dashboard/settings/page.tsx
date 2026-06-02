"use client";

import { Toggle } from "@/components/ui/Toggle";
import { useState } from "react";
import { Trash2 } from "lucide-react";

interface ToggleSetting {
  title: string;
  desc: string;
  defaultChecked: boolean;
}

function SettingRow({ title, desc, checked, onChange }: { title: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-[14px] border-b border-[var(--border)] last:border-b-0">
      <div>
        <h4 className="text-[13px] font-medium text-[var(--t1)]">{title}</h4>
        <p className="text-[11px] text-[var(--t4)] mt-[2px]">{desc}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

function SettingsCard({ title, settings }: { title: string; settings: ToggleSetting[] }) {
  const [values, setValues] = useState(settings.map(s => s.defaultChecked));
  return (
    <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] py-[18px] px-[20px]">
      <div className="text-[12px] text-[var(--t4)] font-medium tracking-[0.04em] uppercase mb-[4px]">{title}</div>
      {settings.map((s, i) => (
        <SettingRow
          key={s.title}
          title={s.title}
          desc={s.desc}
          checked={values[i]}
          onChange={(v) => {
            const copy = [...values];
            copy[i] = v;
            setValues(copy);
          }}
        />
      ))}
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="grid grid-cols-2 gap-[14px] items-start">
      {/* Left column */}
      <div className="flex flex-col gap-[14px]">
        {/* General form */}
        <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] py-[18px] px-[20px]">
          <div className="text-[12px] text-[var(--t4)] font-medium tracking-[0.04em] uppercase mb-[14px]">General</div>
          <div className="mb-[16px]">
            <label className="text-[12px] text-[var(--t4)] mb-[5px] block font-medium">Organization name</label>
            <input
              className="bg-[var(--g4)] border border-[var(--border2)] rounded-[var(--rs)] py-[8px] px-[12px] text-[13px] text-[var(--t1)] w-full outline-none transition-colors duration-[180ms] focus:border-[var(--em2)]"
              defaultValue="Acme Engineering"
            />
          </div>
          <div className="mb-[16px]">
            <label className="text-[12px] text-[var(--t4)] mb-[5px] block font-medium">Default branch</label>
            <input
              className="bg-[var(--g4)] border border-[var(--border2)] rounded-[var(--rs)] py-[8px] px-[12px] text-[13px] text-[var(--t1)] w-full outline-none transition-colors duration-[180ms] focus:border-[var(--em2)]"
              defaultValue="main"
            />
          </div>
          <div className="mb-[16px]">
            <label className="text-[12px] text-[var(--t4)] mb-[5px] block font-medium">Webhook URL</label>
            <input
              className="bg-[var(--g4)] border border-[var(--border2)] rounded-[var(--rs)] py-[8px] px-[12px] text-[13px] text-[var(--t1)] w-full outline-none transition-colors duration-[180ms] focus:border-[var(--em2)] font-[family-name:var(--font-mono)]"
              defaultValue="https://hooks.mergeowl.dev/acme/xyz"
            />
          </div>
          <button className="inline-flex items-center gap-[6px] text-[12px] py-[7px] px-[13px] rounded-[var(--rs)] cursor-pointer transition-all duration-[180ms] bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.25)] text-[var(--em3)] hover:bg-[rgba(34,197,94,0.18)] mt-[4px]">
            Save changes
          </button>
        </div>

        {/* Notifications */}
        <SettingsCard
          title="Notifications"
          settings={[
            { title: "Email digest", desc: "Daily summary of all reviews", defaultChecked: true },
            { title: "Slack alerts", desc: "Post to #code-review on error", defaultChecked: true },
            { title: "PR comment auto-resolve", desc: "Collapse fixed comments automatically", defaultChecked: false },
          ]}
        />
      </div>

      {/* Right column */}
      <div className="flex flex-col gap-[14px]">
        {/* Review behaviour */}
        <SettingsCard
          title="Review behaviour"
          settings={[
            { title: "Review on draft PRs", desc: "Analyse drafts before review request", defaultChecked: false },
            { title: "Block merge on errors", desc: "Require resolution before merging", defaultChecked: true },
            { title: "Security scan", desc: "OWASP top-10 detection enabled", defaultChecked: true },
            { title: "Secret detection", desc: "Flag API keys, tokens, passwords", defaultChecked: true },
          ]}
        />

        {/* Danger zone */}
        <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] py-[18px] px-[20px]">
          <div className="text-[12px] text-[var(--red)] font-medium tracking-[0.04em] uppercase mb-[8px]">Danger zone</div>
          <div className="text-[12px] text-[var(--t4)] mb-[12px] leading-[1.6]">
            Deleting the organisation removes all connected repositories, review history, and team members permanently.
          </div>
          <button className="inline-flex items-center gap-[6px] text-[12px] py-[7px] px-[13px] rounded-[var(--rs)] cursor-pointer transition-all duration-[180ms] bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] text-[#fca5a5]">
            <Trash2 size={13} />
            Delete organisation
          </button>
        </div>
      </div>
    </div>
  );
}
