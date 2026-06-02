import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[var(--g)] border border-[var(--border)] rounded-[var(--rl)] overflow-hidden min-h-[780px]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <div className="flex-1 p-[16px] md:p-[24px] overflow-auto animate-[fadeIn_0.3s_ease]">
          {children}
        </div>
      </div>
    </div>
  );
}
