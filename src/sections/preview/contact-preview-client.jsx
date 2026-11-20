"use client";

import PageBannerView from "@/components/common/page-banner-view";
import ContactSection from "@/sections/contact/contact-section";
import MapSection from "@/sections/contact/map-section";
import PartnerContactSection from "@/sections/contact/partner-contact-section";
import PreviewBadge from "@/sections/preview/preview-badge";
import useDraft from "@/sections/preview/use-draft";

export default function ContactPreviewClient({ initial, partnerLogo }) {
  const data = useDraft(initial);
  if (!data) return null;

  return (
    <main>
      <PreviewBadge />
      <PageBannerView
        title={data.banner?.title}
        subtitle={data.banner?.subtitle}
        backgroundImage={data.banner?.image}
      />
      <ContactSection info={data.info} form={data.form} />
      <PartnerContactSection logo={partnerLogo} />
      <MapSection map={data.map} />
    </main>
  );
}
