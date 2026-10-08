import PageBanner from "@/components/common/page-banner";
import ContactSection from "@/sections/contact/contact-section";
import MapSection from "@/sections/contact/map-section";
import { getContactPageData } from "@/lib/contact/data";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with FADEN Contracting Company. Visit our office in Riyadh, Saudi Arabia, or send us a message and we'll get back to you.",
};

export default async function ContactPage() {
  const data = await getContactPageData();

  return (
    <>
      <PageBanner
        title={data.banner.title}
        subtitle={data.banner.subtitle}
        backgroundImage={data.banner.image}
      />

      <ContactSection info={data.info} form={data.form} />

      <MapSection map={data.map} />
    </>
  );
}