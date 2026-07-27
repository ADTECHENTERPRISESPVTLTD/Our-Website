import RequirementForm from "@/components/requirement/RequirementForm";

export default function SubmitRequirement() {
  return (
    <main className="page-shell min-h-screen">

      <section className="pt-32 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Submit Your Requirement
        </h1>

        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Share your project details with us and our experts will
          connect with you to provide the right technology solution.
        </p>
      </section>

      <RequirementForm />

    </main>
  );
}