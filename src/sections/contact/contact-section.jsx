import DecorativePattern from "@/components/common/decorative-pattern";
import Container from "@/components/layout/container";
import ContactForm from "./contact-form";
import ContactInfo from "./contact-info";

export default function ContactSection({ info, form }) {
  return (
    <section className="relative z-10 overflow-hidden bg-white py-14 sm:py-16 md:py-20 lg:py-24">
      <DecorativePattern
        variant="trianglesRight"
        // opacity={0.35}
        className="pointer-events-none absolute right-0 top-0  -z-1"
      />

      <Container>
        {/* Single card wrapping info + form */}
        <div className="overflow-hidden rounded-xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Info: 2/5 on md+ with subtle bg */}
            <div className="bg-[#F5F7FA] p-6 sm:p-7 md:col-span-2 md:p-8 lg:p-10">
              <ContactInfo info={info} />
            </div>

            {/* Form: 3/5 on md+ */}
            <div className="p-6 sm:p-7 md:col-span-3 md:p-8 lg:p-10">
              <ContactForm form={form} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
