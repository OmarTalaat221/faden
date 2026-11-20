"use client";

import PageBannerView from "@/components/common/page-banner-view";
import IntroSection from "@/sections/services-listing/intro-section";
import SectorsSection from "@/sections/services-listing/sectors-section";
import ServicesExplorer from "@/sections/services-listing/services-explorer";
import PreviewBadge from "@/sections/preview/preview-badge";
import useDraft from "@/sections/preview/use-draft";

/** The services listing, from the table being edited beside it. */
export default function ServicesListPreviewClient({ meta, items }) {
  const draft = useDraft(null);

  const pageMeta = draft?.meta ?? meta ?? {};
  const services = [...(draft?.items ?? items ?? [])].sort(
    (a, b) => (a.order || 0) - (b.order || 0),
  );

  return (
    <main>
      <PreviewBadge />
      <PageBannerView
        title={pageMeta.banner?.title}
        subtitle={pageMeta.banner?.subtitle}
        backgroundImage={pageMeta.banner?.image}
      />
      <IntroSection intro={pageMeta.intro} />
      <ServicesExplorer heading={pageMeta.coreHeading} services={services} />
      <SectorsSection sectors={pageMeta.sectors} />
    </main>
  );
}
