import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import Map from "@/components/contact/Map";

export default function ContactPage() {
  return (
    <main className="page-shell overflow-hidden">
      <ContactHero />

      {/* Info Cards */}
      <ContactInfo />

      {/* Contact Form */}
      <ContactForm />

      <Map />
    </main>
  );
}

