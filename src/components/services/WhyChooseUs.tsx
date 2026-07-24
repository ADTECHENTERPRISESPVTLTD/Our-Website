import {
  CheckCircle2,
  ShieldCheck,
  Clock3,
  Users,
  Sparkles,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: <Users size={22} />,
    title: "Experienced Team",
    description:
      "Skilled developers, designers and AI engineers delivering modern digital products.",
  },
  {
    icon: <Clock3 size={22} />,
    title: "Fast Delivery",
    description:
      "Efficient development process that helps launch projects on time.",
  },
  {
    icon: <Headphones size={22} />,
    title: "24/7 Support",
    description:
      "Reliable support and maintenance whenever your business needs it.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Secure Solutions",
    description:
      "Industry-standard security practices for every application we build.",
  },
  {
    icon: <Sparkles size={22} />,
    title: "Latest Technologies",
    description:
      "React, Next.js, AI, Cloud and modern development stack.",
  },
  {
    icon: <CheckCircle2 size={22} />,
    title: "Customer Satisfaction",
    description:
      "Focused on quality, transparency and long-term business relationships.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-[#0B1120] py-24">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-blue-500/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-400">
            WHY CHOOSE US
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Trusted Partner for Digital Growth
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
            We combine creativity, technology and innovation to build
            scalable solutions that help businesses achieve long-term success.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-800 bg-[#111827] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(34,211,238,0.15)]"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                {feature.icon}
              </div>

              <h3 className="mb-4 text-xl font-semibold text-white">
                {feature.title}
              </h3>

              <p className="leading-7 text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}