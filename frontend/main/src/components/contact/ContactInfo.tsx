import { contactInfo } from "@/data/contact";
import Card from "@/components/ui/Card";

export default function ContactInfo() {
  return (
    <section className="bg-[#0B1120] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="grid gap-6 md:grid-cols-2">

          {contactInfo.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className="p-6 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
              >
                <div className="flex items-start gap-5">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Icon size={24} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>

                    <a
                      href={item.link}
                      className="mt-2 block text-slate-400 transition hover:text-cyan-400"
                    >
                      {item.value}
                    </a>
                  </div>

                </div>
              </Card>
            );
          })}

        </div>

      </div>
    </section>
  );
}