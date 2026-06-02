export function OwlLogo({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#0e1510" stroke="#22c55e" strokeWidth=".8" />
      <ellipse cx="8.5" cy="11.5" rx="3" ry="3.8" fill="#162016" stroke="#22c55e" strokeWidth=".6" />
      <ellipse cx="15.5" cy="11.5" rx="3" ry="3.8" fill="#162016" stroke="#22c55e" strokeWidth=".6" />
      <circle cx="8.5" cy="11.5" r="1.8" fill="#22c55e" opacity=".9" />
      <circle cx="15.5" cy="11.5" r="1.8" fill="#22c55e" opacity=".9" />
      <circle cx="8.5" cy="11.5" r=".85" fill="#0a0f0a" />
      <circle cx="15.5" cy="11.5" r=".85" fill="#0a0f0a" />
    </svg>
  );
}

export function OwlLogoLarge() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="14" fill="#0b120b" stroke="#22c55e" strokeWidth="1" />
      <ellipse cx="11.5" cy="15" rx="4" ry="5" fill="#141f14" stroke="#22c55e" strokeWidth="0.8" />
      <ellipse cx="20.5" cy="15" rx="4" ry="5" fill="#141f14" stroke="#22c55e" strokeWidth="0.8" />
      <circle cx="11.5" cy="15" r="2.5" fill="#22c55e" opacity="0.9" />
      <circle cx="20.5" cy="15" r="2.5" fill="#22c55e" opacity="0.9" />
      <circle cx="11.5" cy="15" r="1.2" fill="#070c07" />
      <circle cx="20.5" cy="15" r="1.2" fill="#070c07" />
      <path d="M13 21 Q16 23 19 21" stroke="#22c55e" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M12 9 L14 12 L16 10 L18 12 L20 9" stroke="#22c55e" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
