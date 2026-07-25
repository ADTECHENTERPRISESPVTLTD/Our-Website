import ServicesHero from "@/components/services/ServicesHero";
import ServicesGrid from "@/components/services/ServicesGrid";
import Process from "@/components/services/Process";
import WhyChooseUs from "@/components/services/WhyChooseUs";
import CTA from "@/components/services/CTA";

export default function ServicesPage() {
  return (
    <main className="bg-[#0B1120] overflow-hidden">
      <ServicesHero />
      <ServicesGrid />
      <Process />
      <WhyChooseUs />
      <CTA />
    </main>
  );
}