"use client";

import LogoLoop from "@/components/ui/LogoLoop";

const logos = [
  {
    node: (
      <div className="rounded-full border border-[#2A3648] bg-[#1A2233] px-8 py-4 text-white">
        🎓 Schools
      </div>
    ),
    title: "Schools",
    href: "#",
  },
  {
    node: (
      <div className="rounded-full border border-[#2A3648] bg-[#1A2233] px-8 py-4 text-white">
        🏫 Colleges
      </div>
    ),
    title: "Colleges",
    href: "#",
  },
  {
    node: (
      <div className="rounded-full border border-[#2A3648] bg-[#1A2233] px-8 py-4 text-white">
        🏥 Healthcare
      </div>
    ),
    title: "Healthcare",
    href: "#",
  },
  {
    node: (
      <div className="rounded-full border border-[#2A3648] bg-[#1A2233] px-8 py-4 text-white">
        🏭 Manufacturing
      </div>
    ),
    title: "Manufacturing",
    href: "#",
  },
  {
    node: (
      <div className="rounded-full border border-[#2A3648] bg-[#1A2233] px-8 py-4 text-white">
        🛍 Retail
      </div>
    ),
    title: "Retail",
    href: "#",
  },
  {
    node: (
      <div className="rounded-full border border-[#2A3648] bg-[#1A2233] px-8 py-4 text-white">
        🚀 Startups
      </div>
    ),
    title: "Startups",
    href: "#",
  },
  {
    node: (
      <div className="rounded-full border border-[#2A3648] bg-[#1A2233] px-8 py-4 text-white">
        🏢 MSMEs
      </div>
    ),
    title: "MSMEs",
    href: "#",
  },
  {
    node: (
      <div className="rounded-full border border-[#2A3648] bg-[#1A2233] px-8 py-4 text-white">
        💳 Financial Services
      </div>
    ),
    title: "Financial Services",
    href: "#",
  },
];

export default function Industries() {
  return (
    <section className="bg-[#0B1120] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center uppercase tracking-[4px] text-[#94A3B8]">
          Industries We Serve
        </p>

        <h2 className="mt-4 mb-12 text-center text-4xl font-bold text-white">
          Empowering Businesses Across Industries
        </h2>

        <LogoLoop
          logos={logos}
          speed={90}
          direction="left"
          pauseOnHover
          fadeOut
          fadeOutColor="#0B1120"
          gap={30}
          logoHeight={24}
          scaleOnHover
        />
      </div>
    </section>
  );
}