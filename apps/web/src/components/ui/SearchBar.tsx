import { Search } from "lucide-react";

export function SearchBar({
  placeholder = "Search...",
  className = "",
}: {
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-[8px] bg-[var(--g3)] border border-[var(--border)] rounded-[var(--rs)] py-[8px] px-[12px] ${className}`}>
      <Search size={15} className="text-[var(--t5)] shrink-0" />
      <input
        placeholder={placeholder}
        className="bg-transparent border-none outline-none text-[13px] text-[var(--t1)] w-full font-[family-name:var(--font-body)]"
      />
    </div>
  );
}
