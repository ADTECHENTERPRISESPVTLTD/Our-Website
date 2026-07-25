import RequirementForm from "@/components/requirement/RequirementForm";

export default function RequirementPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07101f] text-white">
      <div className="pointer-events-none absolute -right-32 top-16 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-28 bottom-16 h-[360px] w-[360px] rounded-full bg-blue-500/10 blur-3xl" />

      <section className="relative z-10 pt-28 pb-8">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm uppercase tracking-[0.24em] text-cyan-300">
            Requirement Intake
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Share your vision. We’ll shape the perfect project proposal.
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            Use this frontend-only requirement page to send us your project brief. No backend work is required here.
          </p>
        </div>
      </section>

      <RequirementForm />
    </main>
  );
}
