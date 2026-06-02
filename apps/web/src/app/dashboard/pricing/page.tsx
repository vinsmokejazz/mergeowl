import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Starter",
    desc: "Perfect for indie devs and small projects.",
    price: "$0",
    period: "/ mo",
    featured: false,
    features: [
      { text: "Up to 3 repos", included: true },
      { text: "50 reviews / month", included: true },
      { text: "Error + warning detection", included: true },
      { text: "GitHub App integration", included: true },
      { text: "Security scan", included: false },
      { text: "Team management", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Get started free",
    ctaStyle: "border border-[var(--border2)] bg-transparent text-[var(--t4)] hover:border-[var(--border3)] hover:text-[var(--t2)]",
  },
  {
    name: "Pro",
    desc: "For growing teams shipping fast and often.",
    price: "$29",
    period: "/ mo",
    featured: true,
    features: [
      { text: "Unlimited repos", included: true },
      { text: "Unlimited reviews", included: true },
      { text: "Security + OWASP scan", included: true },
      { text: "Secret detection", included: true },
      { text: "Team management (20 seats)", included: true },
      { text: "Slack + email alerts", included: true },
      { text: "Priority email support", included: true },
    ],
    cta: "Upgrade to Pro",
    ctaStyle: "bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.25)] text-[var(--em3)] hover:bg-[rgba(34,197,94,0.18)] hover:text-[var(--em4)]",
  },
  {
    name: "Enterprise",
    desc: "Custom deployment, SSO, and SLA for large orgs.",
    price: "Custom",
    period: "",
    featured: false,
    features: [
      { text: "Everything in Pro", included: true },
      { text: "SAML / SSO", included: true },
      { text: "Audit logs", included: true },
      { text: "On-prem deployment option", included: true },
      { text: "Custom AI model tuning", included: true },
      { text: "Dedicated Slack support", included: true },
      { text: "99.9% SLA", included: true },
    ],
    cta: "Talk to sales",
    ctaStyle: "border border-[var(--border2)] bg-transparent text-[var(--t4)] hover:border-[var(--border3)] hover:text-[var(--t2)]",
  },
];

export default function PricingPage() {
  return (
    <>
      <div className="text-center mb-[28px]">
        <div className="font-[family-name:var(--font-display)] text-[28px] text-[var(--t1)] mb-[6px]">
          Simple, honest <em className="italic text-[var(--em)]">pricing.</em>
        </div>
        <div className="text-[13px] text-[var(--t4)]">No per-seat tricks. Cancel any time.</div>
      </div>

      <div className="grid grid-cols-3 gap-[14px] items-start">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-[var(--g3)] border rounded-[var(--rl)] py-[28px] px-[28px] transition-colors duration-200 relative ${
              plan.featured
                ? "border-[rgba(34,197,94,0.35)]"
                : "border-[var(--border)]"
            }`}
          >
            {plan.featured && (
              <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 bg-[var(--em2)] text-[#022c0a] text-[10px] font-bold py-[3px] px-[14px] rounded-b-[8px] tracking-[0.04em] uppercase">
                Most popular
              </div>
            )}
            <div className="text-[16px] font-medium text-[var(--t1)] mb-[6px]">{plan.name}</div>
            <div className="text-[12px] text-[var(--t4)] mb-[20px] leading-[1.6]">{plan.desc}</div>
            <div className="font-[family-name:var(--font-display)] text-[40px] text-[var(--t1)] leading-[1]">
              {plan.price}
              {plan.period && <span className="text-[13px] text-[var(--t4)]"> {plan.period}</span>}
            </div>

            <ul className="list-none flex flex-col gap-[9px] my-[20px]">
              {plan.features.map((f) => (
                <li key={f.text} className={`flex items-start gap-[8px] text-[12px] ${f.included ? "text-[var(--t3)]" : "text-[var(--t5)]"}`}>
                  {f.included ? (
                    <Check size={13} className="text-[var(--em)] mt-[1px] shrink-0" />
                  ) : (
                    <X size={13} className="text-[var(--t5)] mt-[1px] shrink-0" />
                  )}
                  {f.text}
                </li>
              ))}
            </ul>

            <button className={`w-full justify-center inline-flex items-center gap-[6px] text-[12px] py-[7px] px-[13px] rounded-[var(--rs)] cursor-pointer transition-all duration-[180ms] ${plan.ctaStyle}`}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
