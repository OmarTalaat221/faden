import PageBanner from "@/components/common/page-banner";
import CtaSection from "@/components/common/cta-section";
import IntroSection from "@/sections/services-listing/intro-section";
import CoreServicesSection from "@/sections/services-listing/core-services-section";
import SectorsSection from "@/sections/services-listing/sectors-section";
import WhyChooseSection from "@/sections/services-listing/why-choose-section";
import { getAllServices, getServicesPageMeta } from "@/lib/services/data";

export async function generateMetadata() {
  const meta = await getServicesPageMeta();
  return {
    title: meta.banner.title,
    description: meta.banner.subtitle,
    openGraph: {
      title: meta.banner.title,
      description: meta.banner.subtitle,
      images: [meta.banner.image],
    },
  };
}

export default async function ServicesPage() {
  const [meta, servicesResponse] = await Promise.all([
    getServicesPageMeta(),
    getAllServices(),
  ]);

  const services = (servicesResponse?.items || []).sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  return (
    <>
      <PageBanner
        title={meta.banner.title}
        subtitle={meta.banner.subtitle}
        backgroundImage={meta.banner.image}
      />

      <IntroSection intro={meta.intro} />

      <CoreServicesSection heading={meta.coreHeading} services={services} />

      <SectorsSection sectors={meta.sectors} />

      <WhyChooseSection whyChoose={meta.whyChoose} />

      <CtaSection
        title={meta.cta.title}
        subtitle={meta.cta.subtitle}
        backgroundImage={meta.cta.backgroundImage}
        primaryButton={{ label: "Contact Us", href: "/contact" }}
        secondaryButton={{ label: "View Projects", href: "/projects" }}
      />
    </>
  );
}