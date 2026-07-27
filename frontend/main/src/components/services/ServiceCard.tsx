import { ArrowUpRight } from "lucide-react";
import { Service } from "@/types";
import Card from "@/components/ui/Card";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({
  service,
}: ServiceCardProps) {
  return (
    <Card className="group relative h-full overflow-hidden p-8 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">

        {/* Icon */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-cyan-500/10 text-3xl transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-500/20">
          {service.icon}
        </div>

        {/* Title */}
        <h3 className="mb-4 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
          {service.title}
        </h3>

        {/* Description */}
        <p className="mb-8 leading-7 text-slate-400">
          {service.description}
        </p>

        {/* Learn More */}
        <button className="flex items-center gap-2 font-medium text-cyan-400 transition-all duration-300 group-hover:gap-3">
          Learn More
          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 group-hover:rotate-45"
          />
        </button>

      </div>
    </Card>
  );
}