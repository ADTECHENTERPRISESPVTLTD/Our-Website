import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import Map from "@/components/contact/Map";

export default function ContactPage() {
  return (
    <main className="overflow-hidden bg-[#0B1120]">
      <ContactHero />

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:px-8">
        <ContactInfo />
        <ContactForm />
      </section>

      <Map />
    </main>
  );
}