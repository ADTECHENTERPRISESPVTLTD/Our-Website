import Hero from "@/components/sections/Hero";
import CompanyOverview from "@/components/sections/CompanyOverview";
import ServicesPreview from "@/components/sections/ServicesPreview";
import WhyChoose from "@/components/sections/WhyChoose";
import Process from "@/components/sections/Process";
import Industries from "@/components/sections/Industries";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";


export default function Home(){
  return(
    <div className="relative bg-[#0B1120]">
      <Hero/>
      <CompanyOverview/>
      <ServicesPreview/>
      <WhyChoose/>
      <Process/>
      <Industries/>
      <Testimonials/>
      <FinalCTA/>
    </div>
  )
}