export default function Map() {
  return (
    <section className="bg-[#0B1120] pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="overflow-hidden rounded-3xl border border-slate-800">
          <iframe
            title="AdTech Location"
            src="https://maps.google.com/maps?q=Nagpur%20Maharashtra&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="h-[400px] w-full border-0"
            loading="lazy"
          />
        </div>

      </div>
    </section>
  );
}