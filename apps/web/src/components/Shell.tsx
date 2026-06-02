import { ReactNode } from "react";

export function Shell({ children }: { children?: ReactNode }) {
  return (
    <div className="flex bg-[#0a0f0a] border border-[#1a2a1a] rounded-[16px] overflow-hidden min-h-[780px] m-4">
        {children}
    </div>
  );
}
