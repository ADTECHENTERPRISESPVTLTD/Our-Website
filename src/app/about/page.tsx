import AboutHero from "@/components/about/AboutHero";
import WhoWeAre from "@/components/about/WhoWeAre";
import VisionMission from "@/components/about/VisionMission";
import CompanyStory from "@/components/about/CompanyStory";
import CoreValues from "@/components/about/CoreValues";
import WhyChoose from "@/components/about/WhyChoose";
import AISection from "@/components/about/AISection";
import ProcessSection from "@/components/about/ProcessSection";
import StatsSection from "@/components/about/StatsSection";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage() {
  return (
    <main className="bg-[#0B1120] text-white overflow-x-hidden">

      <AboutHero />

      <WhoWeAre />

      <VisionMission />

      <CompanyStory />

      <CoreValues />

      <WhyChoose />

      <AISection />

      <ProcessSection />

      <StatsSection />

      <AboutCTA />

    </main>
  );
}