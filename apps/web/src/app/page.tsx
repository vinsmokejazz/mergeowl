import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { MockupSection } from "@/components/landing/MockupSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { CtaSection } from "@/components/landing/CtaSection";

export default function Home() {
  return (
    <div className="bg-[var(--g)] min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <MockupSection />
      <FeaturesSection />
      <div className="h-[1px] bg-[var(--border)] mx-[40px]" />
      <DashboardPreview />
      <CtaSection />
    </div>
  );
}
