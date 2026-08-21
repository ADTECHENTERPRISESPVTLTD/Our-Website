import ServiceCard from "./ServiceCard";
import { services } from "@/data/services";

export default function ServicesGrid() {
  return (
    <section className="relative bg-[#0B1120] py-24">
      {/* Background Glow */}
      <div className="bg-glow-cyan absolute top-0 left-0 h-80 w-80" />
      <div className="bg-glow-blue absolute bottom-0 right-0 h-80 w-80" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm font-medium text-cyan-400">
            Our Expertise
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Services We Offer
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            We deliver innovative digital solutions that help businesses
            accelerate growth, improve efficiency, and create exceptional user
            experiences.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}
        </div>
      </div>
    </section>
  );
}