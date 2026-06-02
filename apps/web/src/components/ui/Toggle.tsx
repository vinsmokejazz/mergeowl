"use client";

export function Toggle({
  checked = false,
  onChange,
}: {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <label className="relative w-[36px] h-[20px] shrink-0 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="opacity-0 w-0 h-0 absolute"
      />
      <div
        className={`absolute inset-0 rounded-[10px] transition-colors duration-200 ${
          checked ? "bg-[var(--em2)]" : "bg-[var(--border3)]"
        }`}
      >
        <div
          className={`absolute h-[14px] w-[14px] left-[3px] top-[3px] bg-white rounded-full transition-transform duration-200 ${
            checked ? "translate-x-[16px]" : "translate-x-0"
          }`}
        />
      </div>
    </label>
  );
}
