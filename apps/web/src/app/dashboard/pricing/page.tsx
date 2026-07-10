"use client";

export default function PricingPage() {
  return (
    <div className="page-section" style={{ animation: "fadeIn 0.3s ease both" }}>
      {/* Header Section */}
      <div className="text-center mb-[42px] mt-[10px]">
        <h1 className="font-[family-name:var(--font-d)] text-[38px] font-normal text-[var(--t1)] mb-[8px] leading-tight">
          Simple, honest <span className="text-[var(--em3)] italic">pricing.</span>
        </h1>
        <p className="text-[14px] text-[var(--t4)] font-light">
          No per-seat tricks. Cancel any time.
        </p>
      </div>

      {/* Upcoming Feature Banner */}
      <div className="bg-[rgba(34,197,94,0.04)] border border-[rgba(34,197,94,0.15)] rounded-[var(--r)] p-[16px_20px] mb-[24px] max-w-[1100px] mx-auto box-border">
        <div className="flex items-center justify-center gap-[8px] mb-[6px]">
          <span className="inline-flex items-center gap-[4px] text-[10px] font-semibold bg-[rgba(34,197,94,0.1)] text-[var(--em3)] px-[8px] py-[3px] rounded-[4px] tracking-[0.05em] uppercase">
            Upcoming Feature
          </span>
        </div>
        <h4 className="text-[14px] font-medium text-[var(--t1)] m-[0_0_4px_0] text-center">Subscription & Billing</h4>
        <p className="text-[12px] text-[var(--t4)] m-0 leading-relaxed font-light text-center">
          Pro and Enterprise subscriptions are currently in preview. Paid billing plans will be launched shortly. All features are currently free during this preview period.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-3 gap-[20px] items-stretch max-w-[1100px] mx-auto">
        {/* Starter Plan */}
        <div className="bg-[rgba(17,28,17,0.35)] border border-[var(--border)] rounded-[var(--rl)] p-[32px] flex flex-col justify-between transition-colors duration-200">
          <div>
            <h2 className="text-[17px] font-semibold text-[var(--t1)] mb-[6px] tracking-wide">
              Starter
            </h2>
            <p className="text-[12px] text-[var(--t4)] mb-[24px] leading-[1.6]">
              Perfect for indie devs and small projects.
            </p>
            <div className="flex items-baseline font-[family-name:var(--font-d)] text-[44px] text-[var(--t1)] leading-none mb-[28px]">
              $0 <span className="text-[11px] text-[var(--t5)] font-[family-name:var(--font-b)] ml-[4px]">/ mo</span>
            </div>

            <ul className="list-none flex flex-col gap-[11px] p-0 m-0">
              <li className="text-[13px] text-[var(--em3)] font-light">Up to 3 repos</li>
              <li className="text-[13px] text-[var(--em3)] font-light">50 reviews / month</li>
              <li className="text-[13px] text-[var(--em3)] font-light">Error + warning detection</li>
              <li className="text-[13px] text-[var(--em3)] font-light">GitHub App integration</li>
              <li className="text-[13px] text-[var(--t5)] font-light">Security scan</li>
              <li className="text-[13px] text-[var(--t5)] font-light">Team management</li>
              <li className="text-[13px] text-[var(--t5)] font-light">Priority support</li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => alert("You are already using the free Starter plan!")}
            className="w-full mt-[32px] text-[12px] font-[family-name:var(--font-b)] p-[10px_14px] rounded-[var(--rs)] border border-[var(--border2)] bg-transparent text-[var(--t4)] cursor-pointer transition-all duration-[180ms] hover:border-[var(--border3)] hover:text-[var(--t2)] text-center"
          >
            Get started free
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-[rgba(17,28,17,0.35)] border border-[rgba(34,197,94,0.3)] rounded-[var(--rl)] p-[32px] flex flex-col justify-between transition-colors duration-200 relative">
          <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-[var(--em)] text-[#022c0a] text-[10px] font-bold p-[4px_16px] rounded-full tracking-[.06em] uppercase whitespace-nowrap">
            Most Popular
          </div>
          <div>
            <h2 className="text-[17px] font-semibold text-[var(--t1)] mb-[6px] tracking-wide">
              Pro
            </h2>
            <p className="text-[12px] text-[var(--t4)] mb-[24px] leading-[1.6]">
              For growing teams shipping fast and often.
            </p>
            <div className="flex items-baseline font-[family-name:var(--font-d)] text-[44px] text-[var(--t1)] leading-none mb-[28px]">
              $29 <span className="text-[11px] text-[var(--t5)] font-[family-name:var(--font-b)] ml-[4px]">/ mo</span>
            </div>

            <ul className="list-none flex flex-col gap-[11px] p-0 m-0">
              <li className="text-[13px] text-[var(--em3)] font-light">Unlimited repos</li>
              <li className="text-[13px] text-[var(--em3)] font-light">Unlimited reviews</li>
              <li className="text-[13px] text-[var(--em3)] font-light">Security + OWASP scan</li>
              <li className="text-[13px] text-[var(--em3)] font-light">Secret detection</li>
              <li className="text-[13px] text-[var(--em3)] font-light">Team management (20 seats)</li>
              <li className="text-[13px] text-[var(--em3)] font-light">Slack + email alerts</li>
              <li className="text-[13px] text-[var(--em3)] font-light">Priority email support</li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => alert("Subscriptions are in preview! All Pro features are currently free during this preview period.")}
            className="w-full mt-[32px] text-[12px] font-semibold p-[10px_14px] rounded-[var(--rs)] border border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.06)] text-[var(--em3)] cursor-pointer transition-all duration-[180ms] hover:bg-[rgba(34,197,94,0.12)] text-center"
          >
            Upgrade to Pro
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-[rgba(17,28,17,0.35)] border border-[var(--border)] rounded-[var(--rl)] p-[32px] flex flex-col justify-between transition-colors duration-200">
          <div>
            <h2 className="text-[17px] font-semibold text-[var(--t1)] mb-[6px] tracking-wide">
              Enterprise
            </h2>
            <p className="text-[12px] text-[var(--t4)] mb-[24px] leading-[1.6]">
              Custom deployment, SSO, and SLA for large orgs.
            </p>
            <div className="flex items-baseline font-[family-name:var(--font-d)] text-[38px] text-[var(--t1)] leading-none mb-[28px]">
              Custom
            </div>

            <ul className="list-none flex flex-col gap-[11px] p-0 m-0">
              <li className="text-[13px] text-[var(--em3)] font-light">Everything in Pro</li>
              <li className="text-[13px] text-[var(--em3)] font-light">SAML / SSO</li>
              <li className="text-[13px] text-[var(--em3)] font-light">Audit logs</li>
              <li className="text-[13px] text-[var(--em3)] font-light">On-prem deployment option</li>
              <li className="text-[13px] text-[var(--em3)] font-light">Custom AI model tuning</li>
              <li className="text-[13px] text-[var(--em3)] font-light">Dedicated Slack support</li>
              <li className="text-[13px] text-[var(--em3)] font-light">99.9% SLA</li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => alert("Subscriptions are in preview! Enterprise settings will be available shortly.")}
            className="w-full mt-[32px] text-[12px] font-[family-name:var(--font-b)] p-[10px_14px] rounded-[var(--rs)] border border-[var(--border2)] bg-transparent text-[var(--t4)] cursor-pointer transition-all duration-[180ms] hover:border-[var(--border3)] hover:text-[var(--t2)] text-center"
          >
            Talk to sales
          </button>
        </div>
      </div>
    </div>
  );
}
