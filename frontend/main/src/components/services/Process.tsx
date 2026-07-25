import { processSteps } from "@/data/services";

export default function Process() {
  return (
    <section className="relative overflow-hidden bg-[#0B1120] py-24">
      {/* Background Glow */}
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute right-0 bottom-20 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-400">
            OUR PROCESS
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            How We Work
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            We follow a streamlined development process to deliver
            high-quality digital solutions with speed, transparency,
            and reliability.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-slate-700 lg:block" />

          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <div
                key={step.step}
                className={`flex flex-col items-center gap-8 lg:flex-row ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Card */}
                <div className="w-full lg:w-5/12">
                  <div className="rounded-2xl border border-slate-800 bg-[#111827] p-8 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">
                    <h3 className="mb-4 text-2xl font-bold text-white">
                      {step.title}
                    </h3>

                    <p className="leading-7 text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Step Circle */}
                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-4 border-cyan-500 bg-[#0B1120] text-2xl font-bold text-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                  {step.step}
                </div>

                {/* Empty */}
                <div className="hidden lg:block lg:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}