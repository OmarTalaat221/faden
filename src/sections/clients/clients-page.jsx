import PageBanner from "@/components/common/page-banner";
import CtaSection from "@/components/common/cta-section";
import IntroSection from "./intro-section";
import ClientsGridSection from "./clients-grid-section";
import { getClientsPageMeta } from "@/lib/clients/data";

export default async function ClientsPage() {
  const CLIENTS_PAGE_META = await getClientsPageMeta();
  const { banner, cta } = CLIENTS_PAGE_META;

  return (
    <>
      <PageBanner
        title={banner.title}
        subtitle={banner.subtitle}
        backgroundImage={banner.image}
      />

      <IntroSection />

      <ClientsGridSection />

      <CtaSection
        title={cta.title}
        subtitle={cta.subtitle}
        backgroundImage={cta.image}
        primaryButton={cta.primaryButton}
        secondaryButton={null}
      />
    </>
  );
}